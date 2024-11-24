
import { RoleEnum } from './role.enum';

export default class UserEntity {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
  roles: RoleEnum[];

  private constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }

  static create(data: Partial<UserEntity>): UserEntity {
    return new UserEntity(data);
  }

  removeRole(role: RoleEnum): void {
    const index = this.roles.findIndex((r) => r === role);
    if (index !== -1) {
      this.roles.splice(index, 1);
    }
  }

  hasRole(role: RoleEnum): boolean {
    return this.roles.some((r) => r === role);
  }

  changeActiveStatus(): void {
    this.active = !this.active;
  }
}
