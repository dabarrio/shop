import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private ID = 1;

  private users: User[] = [
    {
      id: 1,
      username: 'dabarrio',
      password: 'dabarrio',
      email: 'dabarrio@h.com',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => {
      return user.id === id;
    });

    if (!user) throw new NotFoundException(`User ${id} not found`);

    return user;
  }

  create(payload: CreateUserDto) {
    this.ID++;

    const newUser = { id: this.ID, ...payload };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);

    if (!user) return null;

    const index = this.users.findIndex((user) => {
      return user.id === id;
    });
    this.users[index] = { ...user, ...payload };

    return this.users[index];
  }

  delete(id: number) {
    const index = this.users.findIndex((user) => {
      return user.id === id;
    });

    if (index === -1) throw new NotFoundException(`User ${id} not found`);

    this.users.splice(index, 1);

    return 'Success';
  }
}
