import { Command, ICommand } from '@ghy_test_nodearch/command';
import { Logger } from '@ghy_test_nodearch/core';
import { TscService } from './tsc.service.js';

@Command()
export class BuildCommand implements ICommand {
  command = 'build';
  describe = 'Builds the application';
  aliases = 'b';

  constructor(
    private readonly tscService: TscService,
    private readonly logger: Logger
  ) {}

  async handler() {
    this.logger.info('Building the app using tsc...');

    await this.tscService.run([], process.cwd());
    
    this.logger.info('Build completed');
  }
}