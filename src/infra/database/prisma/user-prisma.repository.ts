import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/application/interface/user.repository';
import UserEntity from 'src/domain/user.entity';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserRepositoryPrisma implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  
  async getAll(): Promise<UserEntity[]> {
    return (await this.prisma.user.findMany()).map((user) =>
      UserEntity.create(user),
    );
  }

  async register(user: UserEntity): Promise<void> {
    await this.prisma.user.create({
      data: {
        ...user,
        roles: {
          connect: user.roles.map((role) => ({ name: role })),
        },
      },
    });
  }
}
