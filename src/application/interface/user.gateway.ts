import UserEntity from 'src/domain/user.entity';

export interface IUserGateway {
  getAll(): UserEntity[] | Promise<UserEntity[]>;
  getUserByEmail(email: string): Promise<UserEntity>;
  register(user: UserEntity): Promise<void>;
}
