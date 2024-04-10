import { App, AppContext, Service } from '@ghy_test_nodearch/core';
import { ComponentInfo, Container } from '@ghy_test_nodearch/core/components';
import { TestBox } from '../test-box.js';
import { MochaAnnotation, TestMode } from '../annotation/test.enums.js';
import { ITestCaseOptions, ITestSuiteOptions, TestHook } from '../annotation/test.interfaces.js';
import { AppLoader, AppLoadMode } from '@ghy_test_nodearch/core/fs';


@Service()
export class TestService {

  constructor(
    private readonly appContext: AppContext
  ) { }

  async getTestSuitesInfo(testModes: TestMode[]) {
    try {
      const testComponents = this.appContext.getComponentRegistry().get<any, ITestSuiteOptions>({ id: MochaAnnotation.Test });
      const mockComponents = this.appContext.getComponentRegistry().get({ id: MochaAnnotation.Mock });

      const suiteInfo = testComponents
        .filter((componentInfo) => {
          return testModes.includes(componentInfo.getData()?.mode || TestMode.UNIT);
        })
        .map(componentInfo => {

          // Create a clone from the original container
          const cloneContainer = this.appContext.getContainer().clone();

          // Bind an instance of the TestBox to the cloned container
          cloneContainer.bindConstant(TestBox, new TestBox(cloneContainer));

          this.applyMocks(componentInfo, mockComponents, cloneContainer);

          const compInstance = cloneContainer.get(componentInfo.getClass());

          const suiteOptions = componentInfo.getData() || {
            title: componentInfo.getName(),
            timeout: 2000
          };

          return {
            name: suiteOptions.title as string,
            timeout: suiteOptions.timeout,
            beforeEach: this.getBeforeEach(componentInfo, compInstance),
            afterEach: this.getAfterEach(componentInfo, compInstance),
            beforeAll: this.getBeforeAll(componentInfo, compInstance),
            afterAll: this.getAfterAll(componentInfo, compInstance),
            testCases: this.getCases(componentInfo, compInstance)
          };

        });

      return suiteInfo;

    }
    catch (e: any) {
      e.message = `Error while loading test suites: ${e.message}`;  
      throw e;
    }
  }

  private applyMocks(testComponentInfo: ComponentInfo, mockComponents: ComponentInfo[], container: Container) {
    testComponentInfo.getDecorators({ id: MochaAnnotation.Override })
      .forEach(({ data }) => {

        const mockComp = mockComponents
          .find(
            comp => comp.getClass() === data!.component
          ) as ComponentInfo;

        const mockInstance = container.get(mockComp.getClass());

        container.override(mockComp.getData().component, mockInstance);

      });
  }

  private getCases(componentInfo: ComponentInfo, compInstance: any) {
    return componentInfo.getDecorators({ id: MochaAnnotation.Case })
      .map(({ method, data }) => {
        const { title, active, params } = data as Required<ITestCaseOptions>;
        return {
          title,
          fn: active ? compInstance[method as string].bind(compInstance, params) : undefined
        };
      });
  }

  private getBeforeAll(componentInfo: ComponentInfo, compInstance: any): TestHook[] {
    return componentInfo.getDecorators({ id: MochaAnnotation.BeforeAll })
      .map(({ method, data }) => {
        const { title } = data as { title: string };
        return {
          title,
          fn: compInstance[method as string].bind(compInstance)
        };
      });
  }

  private getAfterAll(componentInfo: ComponentInfo, compInstance: any): TestHook[] {
    return componentInfo.getDecorators({ id: MochaAnnotation.AfterAll })
      .map(({ method, data }) => {
        const { title } = data as { title: string };
        return {
          title,
          fn: compInstance[method as string].bind(compInstance)
        };
      });
  }

  private getBeforeEach(componentInfo: ComponentInfo, compInstance: any): TestHook[] {
    return componentInfo.getDecorators({ id: MochaAnnotation.BeforeEach })
      .map(({ method, data }) => {
        const { title } = data as { title: string };
        return {
          title,
          fn: compInstance[method as string].bind(compInstance)
        };
      });
  }

  private getAfterEach(componentInfo: ComponentInfo, compInstance: any): TestHook[] {
    return componentInfo.getDecorators({ id: MochaAnnotation.AfterEach })
      .map(({ method, data }) => {
        const { title } = data as { title: string };
        return {
          title,
          fn: compInstance[method as string].bind(compInstance)
        };
      });
  }
}