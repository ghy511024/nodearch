import { Config, ConfigManager } from '@ghy_test_nodearch/core';
import { RedisOptions } from 'ioredis';

@Config()
export class RedisConfig {
  options?: RedisOptions;

  constructor(config: ConfigManager) {
    this.options = config.env({
      external: 'options'
    });
  }
}