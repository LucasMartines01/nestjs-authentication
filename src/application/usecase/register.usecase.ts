import UserEntity from 'src/domain/user.entity';
import { IUserGateway } from '../interface/user.gateway';

export class RegisterUseCase {
  constructor(private readonly userRepository: IUserGateway) {}
  async execute(user: UserEntity): Promise<void> {
    await this.userRepository.register(user);
  }
}
