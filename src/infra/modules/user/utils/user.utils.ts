import { Injectable } from '@nestjs/common';
import { UserRequestDTO } from '../dto/user-request.dto';
import UserEntity from 'src/domain/user.entity';
import RoleEntity from 'src/domain/role.entity';
import { RoleEnum } from 'src/domain/role.enum';
import UserRoleRequestDTO from '../dto/user-role-request.dto';

@Injectable()
export class UserUtils {
  constructor() {}

  public async generateRandomPassword(): Promise<string> {
    return Math.random().toString(36).slice(-8);
  }

  public userToDomain(data: UserRequestDTO): UserEntity {
    return UserEntity.create({
      name: data.name,
      email: data.email,
      password: data.password,
      roles: [RoleEnum.USER],
    });
  }

  toRoleDomain(data: UserRoleRequestDTO): RoleEntity {
    return RoleEntity.create({
      name: data.role,
    });
  }
}
