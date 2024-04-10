import { Config, ConfigManager } from "@ghy_test_nodearch/core";

@Config()
export class VaultConfig {
  hostname: string;

  constructor(config: ConfigManager) {
    this.hostname = config.env({
      defaults: { all: 'http://localhost:8200' },
      external: 'hostname'
    });  
  }
}