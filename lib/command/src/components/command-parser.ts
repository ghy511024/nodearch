import { Logger, Service } from '@ghy_test_nodearch/core';
import { Arguments, CommandModule } from 'yargs';
import { CommandQuestion, ICommand } from '../decorators/interfaces.js';
import inquirer from 'inquirer';


@Service()
export class CommandParser {
  constructor(
    private readonly logger: Logger
  ) {}

  getYargsCommands(commands: ICommand[]): CommandModule[] {
    return commands.map(cmd => {
      const { handler, questions, ...commandOptions } = cmd;
      const handlerFn = (args: Arguments) => this.handlerFactory(cmd, args);

      if (commandOptions.builder && typeof commandOptions.builder === 'function') {
        commandOptions.builder = commandOptions.builder.bind(cmd);
      }

      return {
        ...commandOptions,
        handler: handlerFn
      };
    });
  }

  private async handlerFactory(command: ICommand, args: Arguments) {
    try {
      const validQuestions: CommandQuestion<any>[]= [];
      let answers;
  
      if (command.questions) {
        for (const question of command.questions) {
          if (!args || (question.name && !args[question.name])) validQuestions.push(question);
        }
      }
  
      if (validQuestions) answers = await inquirer.prompt(validQuestions);
  
      const data = { ...args, ...answers };
  
      await command.handler.bind(command)(data);
    }
    catch(e: any) {
      this.logger.error(e);
      process.exit(1);
    }
  }
}