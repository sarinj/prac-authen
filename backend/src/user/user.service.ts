import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);
    await this.repo.save(user);
    const { password, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.repo.update(id, updateUserDto);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    return await this.repo.findOne({ where: { id } });
  }

  async findOneWithUserName(username: string) {
    return await this.repo.findOne({ where: { email: username } });
  }

  async find(email: string, name: string) {
    return await this.repo.find({ where: { email, name } });
  }
}
