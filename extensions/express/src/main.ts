import { App } from '@ghy_test_nodearch/core';
import { IExpressAppOptions } from './components/express/interfaces.js';


export class ExpressApp extends App {
  constructor(options?: IExpressAppOptions) {
    super({
      components: {
        url: new URL('components', import.meta.url)
      },
      config: options,
      logs: {
        prefix: 'Express'
      }
    });
  }
}
