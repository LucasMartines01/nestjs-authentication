import UserEntity from 'src/domain/user.entity';
import { IUserGateway } from '../interface/user.gateway';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserGateway) {}
  async execute(): Promise<UserEntity[]> {
    return await this.userRepository.getAll();
  }
}
