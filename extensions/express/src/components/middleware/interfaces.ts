import express from 'express';
import { IUseProvider, IUseProviderClass } from '@ghy_test_nodearch/core/components';


export type IExpressMiddlewareHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => void;

export type IMiddlewareArgs = { req: express.Request; res: express.Response; };

export type IMiddleware<T = any> = IUseProvider<IMiddlewareArgs, T>;

export type IMiddlewareClass<T = undefined> = IUseProviderClass<T>;

export interface IMiddlewareInfo {
  component: IMiddlewareClass;
  options?: any;
  dependencyKey?: string;
}

export interface IExpressMiddlewareHandlerOptions {
  args: { 
    req: express.Request;
    res: express.Response; 
  };
  options: IExpressMiddlewareHandler;
}