import { Injectable } from '@nestjs/common';
import { UserRequestDTO } from '../dto/user-request.dto';
import UserEntity from 'src/domain/user.entity';

@Injectable()
export class UserUtils {
  constructor() {}

  public async generateRandomPassword(): Promise<string> {
    return Math.random().toString(36).slice(-8);
  }

  public toDomain(data: UserRequestDTO): UserEntity {
    return new UserEntity({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }
}
