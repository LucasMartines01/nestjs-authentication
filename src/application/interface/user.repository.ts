import RoleEntity from 'src/domain/role.entity';
import UserEntity from 'src/domain/user.entity';

export interface IUserRepository {
  createRole(role: RoleEntity): Promise<void>;
  getAll(): UserEntity[] | Promise<UserEntity[]>;
  register(user: UserEntity): Promise<void>;
  getRoles(): Promise<RoleEntity[]>
}
