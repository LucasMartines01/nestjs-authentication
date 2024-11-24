import { ConflictException, Injectable } from '@nestjs/common';
import { IUserGateway } from 'src/application/interface/user.gateway';
import UserEntity from 'src/domain/user.entity';
import { UserRepository } from 'src/infra/database/prisma/user-prisma.repository';

@Injectable()
export class UserService implements IUserGateway {
  constructor(private readonly repository: UserRepository) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.repository.getAll();
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.repository.getUserByEmail(email);
  }

  async register(user: UserEntity): Promise<void> {
    const userAlreadyExists = await this.repository.verifyIfUserExists(
      user.email,
    );
    if (userAlreadyExists) {
      throw new ConflictException('User already exists');
    }
    await this.repository.register(user);
  }
}
