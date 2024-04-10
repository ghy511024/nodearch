import { Service, IExtensionProvider } from '@ghy_test_nodearch/core';
import { IOpenAPIProvider } from '@ghy_test_nodearch/openapi';
import { OpenAPIParser } from './parser.js';

@Service({ export: true })
export class ExpressOAIProvider implements IOpenAPIProvider, IExtensionProvider {
  constructor(
    private readonly openAPIParser: OpenAPIParser
  ) {}

  get() {
    return this.openAPIParser.parse();
  }
}