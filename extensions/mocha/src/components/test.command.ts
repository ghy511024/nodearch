import { toCamelCase } from '@ghy_test_nodearch/core/utils';
import { Command, ICommandBuilder, ICommand } from '@ghy_test_nodearch/command';
import { MochaService } from './mocha.service.js';
import { testOptions } from './test.options.js';


@Command({ export: true })
export class TestCommand implements ICommand {
  command: string; 
  describe: string;
  aliases: string[];
  builder: ICommandBuilder;
  
  constructor(
    private readonly mochaService: MochaService
  ) {
    this.command = 'test';
    this.describe = 'Run automated test cases using mocha';
    this.aliases = ['t'];
    this.builder = testOptions;
  }

  async handler(options: Record<string, any>) {
    const code = await this.mochaService.run({
      mode: options.mode,
      mochaOptions: { ...(this.getOptionsInCamelCase(options)) }
    });

    process.exit(code);
  }

  private getOptionsInCamelCase(options: Record<string, any>) {
    const commandOptions: any = {};

    Object
      .keys(options)
      .forEach(op => {
        commandOptions[toCamelCase(op, '-')] = options[op];
      });

    return commandOptions;
  }
}
