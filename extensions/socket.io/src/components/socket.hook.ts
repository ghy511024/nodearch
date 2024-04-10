import { Hook, Logger } from '@ghy_test_nodearch/core';
import { SocketService } from './socket.service.js';


@Hook({ export: true })
export class SocketIOHook {

  constructor(
    private readonly logger: Logger,
    private readonly socketService: SocketService
  ) {}

  async onStart() {
    try {
      await this.socketService.start();
    }
    catch(error: any) {
      this.logger.error(error);
      throw error;
    }
  }
  
}