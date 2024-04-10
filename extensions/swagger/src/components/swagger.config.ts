import { Config, ConfigManager } from '@ghy_test_nodearch/core';

@Config()
export class SwaggerConfig {
  
  url: string;

  constructor(config: ConfigManager) {
    this.url = config.env({
      external: 'url'
    });
  }
}