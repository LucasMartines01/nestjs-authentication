import UserEntity from 'src/domain/user.entity';
import { IUserRepository } from '../interface/user.repository';

export class GetAllUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(): Promise<UserEntity[]> {
    return await this.userRepository.getAll();
  }
}
