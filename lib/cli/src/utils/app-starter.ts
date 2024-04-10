import { AppLoader, AppLoadMode } from '@ghy_test_nodearch/core/fs';

let rootDir = process.argv.find(x => x.startsWith('rootDir='));

if (rootDir) {
  rootDir = rootDir.replace('rootDir=', '');

  await (new AppLoader({ loadMode: AppLoadMode.TS, cwd: new URL(rootDir), initMode: 'start' })).load();
}