import { Service, IExtensionProvider } from '@ghy_test_nodearch/core';
import { ExpressServer } from './express-server.js';


@Service({ export: true })
export class HttpServerProvider implements IExtensionProvider {
  constructor(
    private readonly expressServer: ExpressServer
  ) {}

  get() {
    return this.expressServer.getServer();
  }
}