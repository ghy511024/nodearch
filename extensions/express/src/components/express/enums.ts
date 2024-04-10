export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  HEAD = 'head',
  PATCH = 'patch',
  OPTIONS = 'options',
}

export enum RouteHandlerParam {
  BODY = 'body',
  QUERY = 'query',
  HEADERS = 'headers',
  PARAMS = 'params',
  REQ = 'req',
  RES = 'res'
}

export enum ExpressDecorator {
  HTTP_PATH = '@ghy_test_nodearch/express/decorators/http-path',
  HTTP_METHOD = '@ghy_test_nodearch/express/decorators/http-method',
  HTTP_PARAM = '@ghy_test_nodearch/express/decorators/http-param',
  MIDDLEWARE = '@ghy_test_nodearch/express/decorators/middleware',
  USE = '@ghy_test_nodearch/express/decorators/use',
}