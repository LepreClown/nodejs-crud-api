import { User } from './types/user.types';
import { v4 as uuidv4 } from 'uuid';

export class UsersService {
  private users: User[] = [];

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async create(
    username: string,
    age: number,
    hobbies: string[],
  ): Promise<User> {
    const newUser: User = { id: uuidv4(), username, age, hobbies };
    this.users.push(newUser);
    return newUser;
  }

  async update(
    id: string,
    username: string,
    age: number,
    hobbies: string[],
  ): Promise<User | undefined> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      const updatedUser: User = { id, username, age, hobbies };
      this.users[userIndex] = updatedUser;
      return updatedUser;
    }
    return undefined;
  }

  async delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      return true;
    }
    return false;
  }
}
