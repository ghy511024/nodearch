import { AppContext, IExtensionProvider, Service } from '@ghy_test_nodearch/core';
import { IOpenAPIProvider, IOpenAPIProviderData } from '@ghy_test_nodearch/openapi';
import { ValidationMiddleware } from './validation.middleware.js';
import { ExpressDecorator } from '@ghy_test_nodearch/express';
import { JoiOpenApiService } from './joi-openapi.service.js';


@Service({ export: true })
export class JoiOpenApiProvider implements IOpenAPIProvider, IExtensionProvider {

  constructor(
    private readonly appContext: AppContext,
    private readonly joiOpenApiService: JoiOpenApiService
  ) { }

  get(): IOpenAPIProviderData {

    const useMiddleware = this.appContext.getComponentRegistry().getDecorators({ useId: ExpressDecorator.MIDDLEWARE });

    const useDecorators = useMiddleware.filter(decorator => decorator.data.component === ValidationMiddleware);

    const routes = useDecorators
      .filter(decorator => decorator.method)
      .map(decorator => {
        return {
          app: {
            component: decorator.componentInfo.getClass(),
            method: decorator.method as string
          },
          schema: {
            data: this.joiOpenApiService.getRouteInfo(decorator.data.options)
          }
        };
      });


    return {
      routes
    };
  }

}