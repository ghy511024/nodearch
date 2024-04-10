import { Config, ConfigManager } from '@ghy_test_nodearch/core';
import { AdminUIOptions, SocketIOAdminUIOptions } from '../interfaces.js';
import { ISocketIOServerProvider } from '@ghy_test_nodearch/socket.io';

@Config()
export class SocketIOAdminUIConfig implements SocketIOAdminUIOptions {
  server: ISocketIOServerProvider;
  options: AdminUIOptions;
  enable: boolean;

  constructor(config: ConfigManager) {
    this.server = config.env({
      external: 'server'
    });
  
    this.options = config.env({
      external: 'options',
      defaults: {
        all: {
          auth: false
        }
      }
    });

    this.enable = config.env({
      external: 'enable',
      defaults: {
        all: false
      }
    });
  }
}