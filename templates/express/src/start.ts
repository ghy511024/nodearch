import MainApp from './main';

async function main() {
  const app = new MainApp();
  await app.run();
  await app.init();
  await app.start();
}

main().catch(console.log);