import { App } from '@ghy_test_nodearch/core';


export class MochaApp extends App {
  constructor() {
    super({
      components: {
        url: new URL('components', import.meta.url)
      }
    });
  }
}
