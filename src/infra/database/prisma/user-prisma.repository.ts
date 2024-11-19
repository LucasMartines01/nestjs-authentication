import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/application/interface/user.repository';
import UserEntity from 'src/domain/user.entity';
import { PrismaService } from './prisma.service';
import RoleEntity from 'src/domain/role.entity';

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

  async getRoles(): Promise<RoleEntity[]> {
    var result = (await this.prisma.role.findMany()).map((role) =>
      RoleEntity.create(role),
    );

    return result;
  }

  async createRole(role: RoleEntity): Promise<void> {
    await this.prisma.role.create({
      data: {
        name: role.name,
      },
    });
  }
}
