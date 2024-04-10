import { IComponentOptions } from '@ghy_test_nodearch/core';
import { ExpressDecorator } from '../express/enums.js';
import { ComponentFactory } from '@ghy_test_nodearch/core/components';


export function Middleware(options?: IComponentOptions): ClassDecorator {
  return ComponentFactory.componentDecorator({ id: ExpressDecorator.MIDDLEWARE, options });
}