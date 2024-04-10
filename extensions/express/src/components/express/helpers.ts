import { ComponentFactory } from '@ghy_test_nodearch/core/components';
import { ExpressDecorator, HttpMethod, RouteHandlerParam } from './enums.js';
import { IHttpMethodInfo } from './interfaces.js';


export function httpPathFactory(path: string) {
  return ComponentFactory.classDecorator({
    id: ExpressDecorator.HTTP_PATH,
    fn: (target: any) => {
      return {
        httpPath: getPath(path)
      };
    }
  });
}

export function httpMethodFactory(httpMethod: HttpMethod, path?: string) {
  return ComponentFactory.methodDecorator<IHttpMethodInfo>({
    id: ExpressDecorator.HTTP_METHOD,
    fn: (target: any, propKey: string | symbol) => {
      return {
        name: <string>propKey,
        httpMethod,
        httpPath: getPath(path)
      };
    }
  });
}

export function handlerParamFactory (paramType: RouteHandlerParam, key?: string) {
  return ComponentFactory.parameterDecorator({
    id: ExpressDecorator.HTTP_PARAM,
    fn: (target, propKey, paramIndex) => {
      return {
        index: paramIndex,
        type: paramType,
        key
      };
    }
  });
}

export function getPath(path?: string): string {
  let routePath = '/';

  if (path) {
    routePath = path.charAt(0) === '/' ? path : '/' + path;
  }

  return routePath;
}

export function getRouterPrefix(path: string): string {

  if (path === '') {
    return path;
  }
  else {
    let routePath = path.charAt(path.length - 1) === '/' ? path.slice(0, path.length - 1) : path;
    routePath = routePath.charAt(0) === '/' ? routePath : '/' + routePath;

    return routePath;
  }
}