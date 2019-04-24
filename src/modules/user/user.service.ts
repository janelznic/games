import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { userList } from './user.consts';

@Injectable()
export class UserService {
  async findOneByToken(token: string): Promise<User | null> {
      return await userList.find(user => user.token === token);
  }
}
