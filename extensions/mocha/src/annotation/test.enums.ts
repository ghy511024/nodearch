export enum TestMode {
  UNIT = 'unit',
  E2E = 'e2e'
}

export enum MochaAnnotation {
  Test = '@ghy_test_nodearch/mocha/annotation/test',
  Mock = '@ghy_test_nodearch/mocha/annotation/mock',
  Override = '@ghy_test_nodearch/mocha/annotation/override',
  BeforeAll = '@ghy_test_nodearch/mocha/annotation/before-all',
  AfterAll = '@ghy_test_nodearch/mocha/annotation/after-all',
  BeforeEach = '@ghy_test_nodearch/mocha/annotation/before-each',
  AfterEach = '@ghy_test_nodearch/mocha/annotation/after-each',
  Case = '@ghy_test_nodearch/mocha/annotation/case'
}