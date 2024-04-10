import { App, LogLevel } from '@ghy_test_nodearch/core';
import { CommandApp } from '@ghy_test_nodearch/command';

export class Cli extends App {
  constructor() {
    super({
      components: {
        url: new URL('components', import.meta.url)
      },
      logs: { logLevel: LogLevel.Info, prefix: 'CLI' },
      extensions: [
        new CommandApp({
          name: 'nodearch',
          usage: 'Usage: nodearch <command> [options]',
          options: {
            loadMode:{
              choices: ['ts', 'js'],
              describe: 'Load mode [ts, js]'
            }
          }
        })
      ]
    });
  }
}
