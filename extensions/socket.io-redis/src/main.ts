import { App } from '@ghy_test_nodearch/core';
import { IRedisAdapterOptions } from './interfaces.js';


export class SocketIORedisApp extends App {
  constructor(options: IRedisAdapterOptions) {
    super({
      components: {
        url: new URL('components', import.meta.url)
      },
      config: options,
      logs: {
        prefix: 'SocketIO - Redis Adapter'
      }
    });
  }
}
