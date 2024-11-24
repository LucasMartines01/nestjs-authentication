import { Injectable } from '@nestjs/common';
import UserEntity from 'src/domain/user.entity';
import { PrismaService } from './prisma.service';
import { RoleEnum } from 'src/domain/role.enum';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      include: {
        roles: true,
      },
    });

    return users.map((user) =>
      UserEntity.create({
        ...user,
        roles: user.roles.map((role) => RoleEnum[role.name]),
      }),
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

  async getUserByEmail(email: string): Promise<UserEntity> {
    return UserEntity.create(
      await this.prisma.user.findUnique({
        where: {
          email,
        },
      }),
    );
  }

  async verifyIfUserExists(email: string): Promise<boolean> {
    return Boolean(await this.prisma.user.findUnique({ where: { email } }));
  }
}
