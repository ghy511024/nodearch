import { Controller, Use } from '@ghy_test_nodearch/core';
import { HttpBody, HttpGet, HttpParam, HttpPath, HttpPost, HttpQuery } from "@ghy_test_nodearch/express";
import { ValidationMiddleware } from '@ghy_test_nodearch/joi-express';
import { Tags } from '@ghy_test_nodearch/openapi';
import { UserMiddleware } from './user.middleware.js';
import { IUser } from './user.interface.js';
import { UserService } from './user.service.js';
import { createUserValidation } from './user-inputs.validation.js';


@Controller()
@Tags(['User Management'])
@Use(UserMiddleware)
@HttpPath('users')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @HttpGet('/')
  async getUsers(@HttpQuery() user?: Partial<IUser>) {
    return await this.userService.getUsers(user);
  }

  @HttpGet('/:id')
  async getUserById(@HttpParam('id') id: string) {
    return (await this.userService.getUsers({ id: parseInt(id) }))[0] || {};
  }

  @HttpPost('/')
  @Use(ValidationMiddleware, createUserValidation)
  async addUser(@HttpBody() user: Omit<IUser, 'id'>) {
    await this.userService.addUser(user);
    return 'ok';
  }

} 
