export default class RoleEntity {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  active: boolean;

  private constructor(data: Partial<RoleEntity>) {
    Object.assign(this, data);
  }

  static create(data: Partial<RoleEntity>): RoleEntity {
    return new RoleEntity(data);
  }
}
