import { Hook, IHook } from '@ghy_test_nodearch/core';
import { SwaggerOptions } from './swagger-options.js';


@Hook({ export: true })
export class SwaggerHook implements IHook {

  constructor(
    private readonly swaggerOptions: SwaggerOptions
  ) {}

  async onStart() {
    await this.swaggerOptions.set();
  }
}