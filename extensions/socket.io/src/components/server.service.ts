import { Service } from '@ghy_test_nodearch/core';
import { SocketService } from './socket.service.js';
import * as IO from 'socket.io';


@Service({ export: true })
export class Server {
  constructor(
    private readonly socketService: SocketService
  ) { }

  get(): IO.Server {
    return this.socketService.getServer();
  }
}