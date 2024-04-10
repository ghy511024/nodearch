import { Middleware } from '@ghy_test_nodearch/express';

@Middleware()
export class UserMiddleware {
  async handler() {
    // Do something
  }
}