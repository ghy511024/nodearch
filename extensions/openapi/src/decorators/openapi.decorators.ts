import { ClassMethodDecorator } from '@ghy_test_nodearch/core/utils';
import OAISchema from 'openapi3-ts';
import { OpenApiDecorator } from '../enums.js';
import { ComponentFactory } from '@ghy_test_nodearch/core/components';


export const Servers = (options: OAISchema.ServerObject[]): ClassDecorator =>
ComponentFactory.classDecorator({ 
    id: OpenApiDecorator.SERVERS, 
    fn: () => {
      return options;
    }
  });

export const Tags = (options: string[]): ClassMethodDecorator =>
  ComponentFactory.classMethodDecorator({ 
    id: OpenApiDecorator.TAGS, 
    fn: () => {
      return options;
    }
  });

export const Responses = (options: OAISchema.ResponsesObject): MethodDecorator =>
  ComponentFactory.methodDecorator({ 
    id: OpenApiDecorator.RESPONSES, 
    fn: () => {
      return options;
    }
  });

export const RequestBody = (options: OAISchema.RequestBodyObject): MethodDecorator =>
  ComponentFactory.methodDecorator({ 
    id: OpenApiDecorator.REQUEST_BODY, 
    fn: () => {
      return options;
    }
  });

export const RouteInfo = (options: Partial<OAISchema.OperationObject>): MethodDecorator =>
  ComponentFactory.methodDecorator({ 
    id: OpenApiDecorator.ROUTE_INFO, 
    fn: () => {
      return options;
    }
  });

// export const OpenAPISchema = (options: Partial<OAISchema.OpenAPIObject>): ClassMethodDecorator =>
//   ComponentFactory.classMethodDecorator({ 
//     id: OpenApiDecorator.RouteInfo, 
//     fn: () => {
//       return options;
//     }
//   });