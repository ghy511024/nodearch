import { App } from '@ghy_test_nodearch/core';
import { ICommandAppOptions } from './components/interfaces.js';


export class CommandApp extends App {
  constructor(config: ICommandAppOptions) {
    super({
      components: {
        url: new URL('components', import.meta.url)
      },
      config
    });
  }
}