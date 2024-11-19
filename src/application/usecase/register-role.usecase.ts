import RoleEntity from "src/domain/role.entity";
import { IUserRepository } from "../interface/user.repository";

export class RegisterRoleUseCase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(role: RoleEntity): Promise<void> {
    await this.repository.createRole(role);
  }
}
