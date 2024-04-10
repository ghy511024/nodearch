import { App } from '@ghy_test_nodearch/core';
import { IOpenAPIAppOptions } from './interfaces.js';


export class OpenAPIApp extends App {
  constructor(config?: IOpenAPIAppOptions) {
    super({
      components: {
        url: new URL('components', import.meta.url)
      },
      config
    });
  }
}