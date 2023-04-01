
import { CoreAnnotation } from '../../registry/enums.js';
import { IComponentOptions } from '../../registry/interfaces.js';
import { ComponentFactory } from '../../registry/factory.js';

export const Interceptor = (options?: IComponentOptions): ClassDecorator => 
  ComponentFactory.componentDecorator({ id: CoreAnnotation.Interceptor, options});