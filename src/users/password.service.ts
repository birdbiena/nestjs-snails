import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class PasswordService {
  async generate(password: string): Promise<string> {
    return await hash(password, 10);
  }

  async compare(requestPassword: string, hash: string): Promise<boolean> {
    return await compare(requestPassword, hash);
  }
}
