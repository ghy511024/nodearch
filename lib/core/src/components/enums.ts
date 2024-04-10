export enum ComponentScope {
  REQUEST = 'Request',
  SINGLETON = 'Singleton',
  TRANSIENT = 'Transient'
}

export enum CoreDecorator {
  COMPONENT = '@ghy_test_nodearch/core/decorators/component',
  COMMAND = '@ghy_test_nodearch/core/decorators/command',
  HOOK = '@ghy_test_nodearch/core/decorators/hook',
  CONFIG = '@ghy_test_nodearch/core/decorators/config',
  SERVICE = '@ghy_test_nodearch/core/decorators/service',
  REPOSITORY = '@ghy_test_nodearch/core/decorators/repository',
  INTERCEPTOR = '@ghy_test_nodearch/core/decorators/interceptor',
  CONTROLLER = '@ghy_test_nodearch/core/decorators/controller',
  USE = '@ghy_test_nodearch/core/decorators/use',
}

export enum DecoratorType {
  CLASS = 'class',
  CLASS_METHOD = 'classMethod',
  METHOD = 'method',
  PARAMETER = 'parameter'
}