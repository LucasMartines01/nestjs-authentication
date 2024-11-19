import BusinessRuleException from './errors/business-rule.exception';
import RoleEntity from './role.entity';

export default class UserEntity {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;
  roles: RoleEntity[];

  private constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }

  static create(data: Partial<UserEntity>): UserEntity {
    this.validateName(data.name);
    this.validateEmail(data.email);
    this.validatePassword(data.password);
    return new UserEntity(data);
  }

  private static validateName(name?: string): void {
    if (!name || name.trim().length === 0) {
      throw new BusinessRuleException('Name is required and cannot be empty.');
    }
  }

  private static validateEmail(email?: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new BusinessRuleException('Invalid email format.');
    }
  }

  private static validatePassword(password?: string): void {
    if (!password || password.length < 6) {
      throw new BusinessRuleException(
        'Password must be at least 6 characters long.',
      );
    }
  }

  removeRole(role: RoleEntity): void {
    const index = this.roles.findIndex((r) => r.id === role.id);
    if (index !== -1) {
      this.roles.splice(index, 1);
    }
  }

  hasRole(role: RoleEntity): boolean {
    return this.roles.some((r) => r.id === role.id);
  }

  changeActiveStatus(): void {
    this.active = !this.active;
  }
}
