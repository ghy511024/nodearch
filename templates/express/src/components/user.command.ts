import { Command, ICommand } from '@ghy_test_nodearch/command';

@Command()
export class UserCommand implements ICommand {
  command = 'user';
  describe = 'User command description';

  async handler(args: any) {
    console.log('User command handler');
  }
}