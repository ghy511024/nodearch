import { App } from '@ghy_test_nodearch/core';
import { IJoiExpressAppOptions } from './interfaces.js';


export class JoiExpressApp extends App {
  constructor(options?: IJoiExpressAppOptions) {
    super({
      components: {
        url: new URL('components', import.meta.url)
      },
      config: options
    });
  }
}