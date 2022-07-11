import { ClassLoader } from '../loader';
import { 
  TestMode, IConfigOptions, TestManager, 
  ComponentManager, HookContext, 
  CoreComponentId, IHook, ConfigManager 
} from '../component';
import { IAppInfo, IAppOptions, IRunOptions } from './app.interfaces';
import { ILogger, ILogOptions, Logger } from '../log';
// import pkg from '../../package.json';
// const pkg = require('../../package.json');

// TODO: This class requires some refactoring especially the run methods
export class App {
  // TODO check if we need those to be public still
  componentManager: ComponentManager;
  appInfo: IAppInfo;
  
  private extensions?: App[];
  private logOptions?: ILogOptions;
  private configOptions?: IConfigOptions;
  private classLoader: ClassLoader;
  private hookContext: HookContext;
  private logger!: ILogger;


  constructor(options: IAppOptions) {
    this.classLoader = new ClassLoader(options.classLoader);
    this.componentManager = new ComponentManager({ defaultScope: options.defaultScope });
    this.hookContext = new HookContext(this.componentManager);
    this.appInfo = options.appInfo;
    this.extensions = options.extensions;
    this.logOptions = options.log;
    this.configOptions = options.config;
  }

  private loadCoreComponents() {
    if (!this.logger) {
      this.logger = new Logger(this.logOptions);
    }

    this.componentManager.registerCoreComponent(Logger, this.logger);
    this.componentManager.registerCoreComponent(ConfigManager, new ConfigManager(this.configOptions));
  }

  private async loadExtensions (exclude?: string[]) {
    if (this.extensions) {
      this.logger.debug(`Found ${this.extensions.length} Extensions!`);

      // TODO: consider making this Promise.all
      for (const extension of this.extensions) {
        try {
          await extension.run({
            exclude,
            extExclude: exclude,
            logger: this.logger
          });
        }
        catch (e: any) {
          throw new Error(`While trying to register Extension - ${e.message}`);
        }
      }
    }
  } 

  private async loadComponents(excludeIds?: string[]) {
    this.logger.info(`Load App: ${this.appInfo.name} version: ${this.appInfo.version}`);

    await this.classLoader.load();
    const { registered, hooks, exported } = this.componentManager.load(this.classLoader.classes, excludeIds);
    this.logger.debug(`${registered} Components Loaded`);
    this.logger.debug(`${hooks} Hooks registered`);
    this.logger.debug(`${exported} Component exported`);
  }

  private registerExtensions() {
    if (this.extensions) {
      this.componentManager.registerExternalComponents(this.extensions.map(ext => ext.componentManager));
    }
  }

  async init() {
    const hooks: any[] = this.componentManager.findHooks() || [];
      
    for (const hook of hooks) {
      if (hook.onInit) {
        await hook.onInit(this.hookContext);
      }
    }
  }

  async start() {
    const hooks: any[] = this.componentManager.findHooks() || [];

    for (const hook of hooks) {
      if (hook.onStart) {
        await hook.onStart(this.hookContext);
      }
    }
  }
  
  // private async runTest(runOptions: IRunTest) {
  //   this.loadCoreComponents();

  //   if (runOptions.testMode.includes(TestMode.INTEGRATION) || runOptions.testMode.includes(TestMode.E2E)) {
  //     await this.loadExtensions(false);
  //   }

  //   await this.loadComponents([
  //     CoreComponentId.Cli,
  //     CoreComponentId.Component,
  //     CoreComponentId.Config,
  //     CoreComponentId.Controller,
  //     CoreComponentId.Hook,
  //     CoreComponentId.Interceptor,
  //     CoreComponentId.Repository,
  //     CoreComponentId.Service,
  //     CoreComponentId.Test
  //   ]);

  //   if (runOptions.testMode.includes(TestMode.INTEGRATION) || runOptions.testMode.includes(TestMode.E2E)) {
  //     this.registerExtensions();
  //   }

  //   const testComponents = this.componentManager.getComponents(CoreComponentId.Test);
    
  //   if (testComponents) {
  //     const testManager = new TestManager(runOptions.testRunner, testComponents, runOptions.testMode, this.componentManager.container);      
  //     testManager.init();
      
  //     if (runOptions.testMode.includes(TestMode.INTEGRATION) || runOptions.testMode.includes(TestMode.E2E)) {
  //       await this.init();
  //     }
      
  //     if (runOptions.testMode.includes(TestMode.E2E)) {
  //       await this.start();
  //     }

  //     await runOptions.testRunner.run();
      
  //     if (runOptions.testMode.includes(TestMode.E2E)) {
  //       await this.stop();
  //     }
  //   }

  // }

  async run(options: IRunOptions = {}) {
    options = {
      exclude: [
        CoreComponentId.Cli,
        CoreComponentId.Test
      ],
      ...options 
    };

    if (options.logger) this.logger = options.logger;

    this.loadCoreComponents();
    await this.loadExtensions(options.extExclude);
    await this.loadComponents(options.exclude);
    this.registerExtensions();
  }

  async stop() {
    try {
      const hooks = this.componentManager.getAll<IHook>(CoreComponentId.Hook);

      if (hooks) {
        await Promise.all(hooks.filter(x => x.onStop).map(x => (<any>x.onStop)(this.hookContext)));
      }
    }
    catch (e: any) {
      if (e.message !== 'No matching bindings found for serviceIdentifier: hook') {
        throw e;
      }
    }
  }
}