import { Injectable } from '@nestjs/common';
import { User } from 'src/model/user.type';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '1',
      email: 'john.cat@gmail.com',
      password: '123123',
      firstName: 'john',
      secondName: 'cat',
    },
    {
      id: '2',
      email: 'minnie.zhou@gmail.com',
      password: '123123',
      firstName: 'minnie',
      secondName: 'zhou',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
