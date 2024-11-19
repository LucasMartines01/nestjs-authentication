import UserEntity from 'src/domain/user.entity';
import { IUserRepository } from '../interface/user.repository';

export class RegisterUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(user: UserEntity): Promise<void> {
    await this.userRepository.register(user);
  }
}
