import { App, LogLevel } from '@ghy_test_nodearch/core';
import { SocketIOApp, SocketIOServerProvider } from '@ghy_test_nodearch/socket.io';
import { SocketIOAdminUIApp, getSocketAdminUiUrl } from '@ghy_test_nodearch/socket.io-admin-ui';
import { ExpressApp, HttpServerProvider } from '@ghy_test_nodearch/express';


export default class SocketIOTemplate extends App {
  constructor() {
    super({
      components: {
        url: new URL('components', import.meta.url)
      },
      logs: {
        logLevel: LogLevel.Debug,
        prefix: 'SocketIO App'
      },
      extensions: [
        new SocketIOAdminUIApp({
          server: SocketIOServerProvider,
          enable: true
        }),
        new SocketIOApp({
          httpServer: HttpServerProvider
        }),
        new ExpressApp({
          static: [
            {
              filePath: getSocketAdminUiUrl(),
              httpPath: '/socket-admin'
            }
          ]
        })
      ]
    });
  }
}