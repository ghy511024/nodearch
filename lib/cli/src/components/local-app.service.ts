import { Logger, Service } from '@ghy_test_nodearch/core';
import { AppLoader } from '@ghy_test_nodearch/core/fs';
import { cwd } from 'node:process';
import { pathToFileURL } from 'node:url';
import { getLoadMode } from '../utils/load-mode.js';


@Service()
export class LocalAppService {

  hasLoadError: boolean;

  private logger: Logger;
  private appLoader: AppLoader;

  constructor(logger: Logger) {
    this.hasLoadError = false;
    this.logger = logger;
    this.appLoader = new AppLoader({ cwd: pathToFileURL(cwd()), loadMode: getLoadMode(), initMode: 'init' });
  }

  async init() {
    await this.load();
  }

  private async load() {
    try {
      await this.appLoader.load();
    }
    catch(e: any) {
      if (this.appLoader.isAppDir) {
        if (e.message)
          this.logger.error('Error when trying to load a NodeArch app from the local directory\nMessage:', e.message, '\nTrace:', e.stack);
        else
          console.log('Error when trying to load a NodeArch app from the local directory\nError:', e);
      }
      this.hasLoadError = true;
    }
  }

  get app() {
    return this.appLoader.app;
  }

  get info() {
    return this.appLoader.appSettings;
  }

  get isAppDir() {
    return this.appLoader.isAppDir;
  }
}