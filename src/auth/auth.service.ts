import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { UserEntity } from 'src/model/user.entity';
import { PasswordService } from 'src/users/password.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService
  ) {}

  async validateUser(userDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findOne(userDto.email);

    if (user && await this.passwordService.compare(userDto.password, user.password)) {
      const { password, email, ...reset } = user;
      return reset;
    }

    return null;
  }

  async register(userDto: CreateUserDto): Promise<UserEntity | undefined> {
    if (await this.usersService.isUserExists(userDto.email)) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    if (userDto.password !== userDto.confirmationPassword) {
      throw new BadRequestException(
        'Password and Confirmation Password must match'
      );
    }

    return await this.usersService.createUser(userDto);
  }
}
