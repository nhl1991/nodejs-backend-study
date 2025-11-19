import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto): Promise<CreateUserDto> {
    return this.userRepository.save(user);
  }

  async getUser(email: string) {
    // findOne(options: FindOneOptions<User>): Promise<User | null>
    const result = await this.userRepository.findOne({
      where: { email },
    });

    return result;
  }

  async updateUser(email: string, _user: UpdateUserDto) {
    const user: UpdateUserDto | null = await this.getUser(email);

    if (user) {
      user.username = _user.username;
      user.password = _user.password;
    } else return;

    return this.userRepository.save(user);
  }

  deleteUser(email: string) {
    return this.userRepository.delete({ email });
  }
}
