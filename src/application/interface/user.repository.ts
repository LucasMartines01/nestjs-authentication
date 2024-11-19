import UserEntity from 'src/domain/user.entity';

export interface IUserRepository {
  getAll(): UserEntity[] | Promise<UserEntity[]>;
  register(user: UserEntity): Promise<void>;
}
