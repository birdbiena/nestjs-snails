import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PasswordService } from './password.service';

import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserEntity } from 'src/model/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService
  ) {}

  async isUserExists(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const userPayload = {
      email: userDto.email.toLowerCase(),
      password: await this.passwordService.generate(userDto.password),
      firstName: userDto.firstName,
      secondName: userDto.secondName,
    };

    let user = this.userRepository.create(userPayload);

    return await this.userRepository.save(user);
  }

  async updateUser(newUser: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<UserEntity | undefined> {
    return await this.isUserExists(email);
  }
}
