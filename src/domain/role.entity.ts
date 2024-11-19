import { RoleEnum } from '@prisma/client';

export default class RoleEntity {
  id?: number;
  name: RoleEnum;
  createdAt?: Date;
  updatedAt?: Date;
  active?: boolean;

  private constructor(data: Partial<RoleEntity>) {
    Object.assign(this, data);
  }

  static create(data: Partial<RoleEntity>): RoleEntity {
    return new RoleEntity(data);
  }

  changeActivateStatus(): void {
    this.active = !this.active;
  }
}
