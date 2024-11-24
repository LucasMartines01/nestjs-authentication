import { Injectable } from '@nestjs/common';
import UserEntity from 'src/domain/user.entity';
import { UserRequestDTO } from '../dto/user-request.dto';
import UserResponseDto from '../dto/user-reponse.dto';
import { RoleEnum } from 'src/domain/role.enum';

@Injectable()
export class UserUtils {
  usersToDTO(domainUser: UserEntity): UserResponseDto  {
    return {
      id: domainUser.id,
      name: domainUser.name,
      email: domainUser.email,
      active: domainUser.active,
      roles: domainUser.roles.map((role) => role),
      createdAt: domainUser.createdAt,
      updatedAt: domainUser.updatedAt,
    };
  }
  constructor() {}
  
  public userToDomain(data: UserRequestDTO): UserEntity {
    return UserEntity.create({
      name: data.name,
      email: data.email,
      password: data.password,
      roles: [RoleEnum.USER],
    });
  }
}
