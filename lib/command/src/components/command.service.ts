import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { AppContext, Service } from '@ghy_test_nodearch/core';
import { CommandParser } from './command-parser.js';
import { CommandConfig } from './command.config.js';
import { CommandDecorator, ICommand } from '../index.js';


@Service({ export: true })
export class CommandService {
  constructor(
    private readonly commandConfig: CommandConfig,
    private readonly commandParser: CommandParser,
    private readonly appContext: AppContext
  ) {}

  async start(options?: { commands?: ICommand[], exclude?: (RegExp | string)[] }) {    
    // Get all commands from app context (Parent's app commands)
    const commands: ICommand[] = this.appContext.getContainer().getById(CommandDecorator.COMMAND);

    // Add local app commands if any
    if (options?.commands) commands.push(...options.commands);

    // Filter out commands that are not allowed
    let filteredCommands: ICommand[] = [],
      exclude: (RegExp | string)[] = options?.exclude || [];

    filteredCommands = commands.filter(cmd => {
      if (typeof cmd.command !== 'string') return true;

      return !exclude.some(ex => ex instanceof RegExp ? ex.test(cmd.command as string) : ex === cmd.command);
    });

    // Get yargs commands
    const yargsCommands = this.commandParser.getYargsCommands(filteredCommands);

    // Initialize yargs
    const args = yargs(hideBin(process.argv))
      .scriptName(this.commandConfig.name)
      .usage(this.commandConfig.usage);

    if (this.commandConfig.options) {
      args.options(this.commandConfig.options);
    }

    args.demandCommand();

    // Pass all yargs commands
    yargsCommands
      .forEach(cmd => args.command(cmd));

    args.alias('h', 'help')
      .alias('v', 'version');

    args.argv;
  }
}