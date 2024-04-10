import { ComponentScope } from '@ghy_test_nodearch/core';
import { ComponentFactory } from '@ghy_test_nodearch/core/components';
import { camelToTitle, ClassConstructor } from '@ghy_test_nodearch/core/utils';
import { MochaAnnotation, TestMode } from './test.enums.js';
import { ITestCaseOptions, ITestSuiteMetadata, ITestSuiteOptions } from './test.interfaces.js';



export function Test(): ClassDecorator;
export function Test(title: string): ClassDecorator;
export function Test(options: ITestSuiteOptions): ClassDecorator;
export function Test(title: string, options: Omit<ITestSuiteOptions, 'title'>): ClassDecorator;
export function Test(...args: (string | ITestSuiteOptions | Omit<ITestSuiteOptions, 'title'>)[]): ClassDecorator {
  return ComponentFactory.componentDecorator({ 
    id: MochaAnnotation.Test,
    options: {
      export: false,
      scope: ComponentScope.SINGLETON
    },
    fn(target) {
      
      let options: ITestSuiteMetadata = {
        mode: TestMode.UNIT,
        title: camelToTitle(<string>target.name),
        timeout: 2000
      };
  
      args.forEach(arg => {
        if (typeof arg === 'string') options.title = arg;
        else if (typeof arg === 'object') Object.assign(options, arg);
      });

      return options;
    }
  });
}

export function Mock(component: ClassConstructor): ClassDecorator {
  return ComponentFactory.componentDecorator({ 
    id: MochaAnnotation.Mock,
    options: {
      export: false,
      scope: ComponentScope.TRANSIENT
    },
    fn() {
      return { component };
    }
  });
}

export function Override(component: ClassConstructor): ClassDecorator {
  return ComponentFactory.classDecorator({
    id: MochaAnnotation.Override,
    fn() {
      return { component };
    },
  });
}

export function BeforeAll(title?: string): MethodDecorator {
  return ComponentFactory.methodDecorator({
    id: MochaAnnotation.BeforeAll,
    fn() {
      return { title };
    }
  });
}

export function AfterAll(title?: string): MethodDecorator {
  return ComponentFactory.methodDecorator({
    id: MochaAnnotation.AfterAll,
    fn() {
      return { title };
    }
  });
}

export function BeforeEach(title?: string): MethodDecorator {
  return ComponentFactory.methodDecorator({
    id: MochaAnnotation.BeforeEach,
    fn() {
      return { title };
    }
  });
}

export function AfterEach(title?: string): MethodDecorator {
  return ComponentFactory.methodDecorator({
    id: MochaAnnotation.AfterEach,
    fn() {
      return { title };
    }
  });
}

export function Case(): MethodDecorator;
export function Case(title: string): MethodDecorator;
export function Case(options: ITestCaseOptions): MethodDecorator;
export function Case(title: string, options: Omit<ITestCaseOptions, 'title'>): MethodDecorator;
export function Case(...args: (string | ITestCaseOptions | Omit<ITestCaseOptions, 'title'>)[]): MethodDecorator {
  return ComponentFactory.methodDecorator({
    id: MochaAnnotation.Case,
    fn(target, propKey) {
      let options: Required<ITestCaseOptions> = {
        title: camelToTitle(<string>propKey),
        active: true,
        params: {}
      };
  
      args.forEach(arg => {
        if (typeof arg === 'string') options.title = arg;
        else if (typeof arg === 'object') Object.assign(options, arg);
      });
  
      return options;        
    },
  });
}