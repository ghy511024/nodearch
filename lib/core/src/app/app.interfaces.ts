import { ComponentScope } from '../registry/enums.js';
import { IClassLoaderOptions } from '../fs/interfaces.js';
import { ILogger, ILogOptions } from '../log/interfaces.js';
import { AppContext } from './app-context.js';
import { App } from './app.js';


export interface IAppConstructor {
  new(...args: any): App;
}

export type IAppOptions = {
  components: IClassLoaderOptions & { 
    scope?: ComponentScope; 
  };
  logs?: ILogOptions;
  config?: Record<string, any>;
  extensions?: App[];
};

export type IInitOptions = {
  mode: 'app';
  appInfo: IAppInfo;
} | {
  mode: 'ext';
  logger: ILogger;
  appContext: AppContext;
};

export interface IAppInfo {
  name: string;
  version: string;
  paths: IAppPaths;
}

export interface IAppPaths {
  rootDir: URL;
  nodeModulesDir: URL;
  pkg: URL;
  tsConfig: URL;
  appDir: URL;
  app: URL;
}

export interface IPackageJSON {
  name: string;
  version: string;
  [key: string]: any;
}

export interface ITsConfig {
  compilerOptions: {
    [key: string]: any;
    rootDir: string;
    outDir: string;
  };
  [key: string]: any;
}