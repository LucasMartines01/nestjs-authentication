import { Injectable } from '@nestjs/common';
import { RoleEnum } from 'src/domain/role.enum';
import UserEntity from 'src/domain/user.entity';
import { UserRequestDTO } from '../dto/user-request.dto';

@Injectable()
export class UserUtils {
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
