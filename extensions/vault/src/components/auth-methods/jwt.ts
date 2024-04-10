import axios from 'axios';
import { Service } from '@ghy_test_nodearch/core';
import { VaultConfig } from '../vault.config.js';
import { IJWTAuthOptions, IAuthResponse } from '../../interfaces.js';
import { VaultError } from '../../vault.error.js';


@Service({ export: true })
export class JWTAuthMethod {
  constructor(private vaultConfig: VaultConfig) {} 

  async login(options: IJWTAuthOptions): Promise<IAuthResponse> {
    try {
      const result = await axios.request<IAuthResponse>({
        method: 'POST',
        url: `${this.vaultConfig.hostname}/v1/auth/${options.engine}/login`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          role: options.role,
          jwt: options.jwt
        }
      });

      return result.data;
    }
    catch (error: any) {
      if (error.response) {
        throw new VaultError(error.response);
      }
      else {
        throw new VaultError({ data: error.message, status: 500 });
      }
    }
}
}