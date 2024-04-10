import { JoiDecorator } from '../enums.js';
import { IValidateOptions } from '../interfaces.js';
import { ComponentFactory } from '@ghy_test_nodearch/core/components';


export const Validate = (schema: IValidateOptions): MethodDecorator => {
  return ComponentFactory.methodDecorator({
    id: JoiDecorator.VALIDATE,
    fn(target, propKey, descriptor) {

      const data = {
        fn: () => {}
      };

      const method = descriptor.value;

      descriptor.value = function (...args: any) {

        data.fn();

        return method.apply(this, arguments);
      }

      return data;


      // const method = descriptor.value;

      // descriptor.value = function (...args: any) {
      //   if (schema.input) {

      //     const inputData: any = {};

      //     Object.keys(schema.input).forEach((key, index) => {
      //       inputData[key] = args[index];
      //     });

      //     const result = Joi.object({
      //       ...schema.input
      //     })
      //       .validate(inputData);

      //     if (result.error) {
      //       throw result.error;
      //     }
      //   }

      //   // TODO: Add output validation

      //   return method.apply(this, arguments);

      // }
    }
  });
}