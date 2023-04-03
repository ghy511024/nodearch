import { HttpMethod, RouteHandlerParam } from './enums.js';
import { IMiddlewareInfo } from '../middleware/interfaces.js';
import { IHttpErrorsOptions } from '../errors/interfaces.js';
import http from 'node:http';
import https from 'node:https';
import express from 'express';
import { Stats } from 'node:fs';
import { ComponentInfo } from '@nodearch/core/decorators';


export interface IExpressAppOptions {
  hostname?: string;
  port?: number;

  http?: http.ServerOptions;
  https?: https.ServerOptions;

  httpErrors?: IHttpErrorsOptions;

  static?: IExpressStatic[];
}

export interface IExpressStatic {
  httpPath: string;
  filePath: string;
  options?: {
    dotfiles?: string;
    etag?: boolean;
    extensions?: string[];
    fallthrough?: boolean;
    immutable?: boolean;
    index?: string | boolean;
    lastModified?: boolean;
    maxAge?: number | string;
    redirect?: boolean;
    setHeaders?: (res: express.Response, path: string, stat: Stats) => void;
  }; 
}

export interface IExpressInfo {
  routers: IExpressRouter[];
}

export interface IExpressRouter {
  controllerInfo: ComponentInfo;
  path: string;
  routes: IExpressRoute[];
  middleware: IMiddlewareInfo[];
}

export interface IExpressRoute {
  controllerMethod: string;
  path: string;
  method: HttpMethod;
  middleware: IMiddlewareInfo[];
  inputs: IExpressRouteHandlerInput[];
}

export interface IExpressRouteHandlerInput {
  index: number;
  type: RouteHandlerParam;
  key?: string;
}


export interface IHttpMethodInfo {
  name: string;
  httpMethod: HttpMethod;
  httpPath: string;
}