import { App, ComponentScope } from '@ghy_test_nodearch/core';
import { RedisOptions } from 'ioredis';


export class IORedisApp extends App {
  constructor(options?: RedisOptions) {
    super({
      components: {
        url: new URL('components', import.meta.url),
        scope: ComponentScope.SINGLETON
      },
      config: { options },
      logs: {
        prefix: 'IO Redis'
      }
    });
  }
}
