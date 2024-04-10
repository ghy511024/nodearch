import { IComponentOptions } from '@ghy_test_nodearch/core';
import { CommandDecorator } from './enums.js';
import { ComponentFactory } from '@ghy_test_nodearch/core/components';


export const Command = (options?: IComponentOptions): ClassDecorator => 
  ComponentFactory.componentDecorator({ id: CommandDecorator.COMMAND, options });