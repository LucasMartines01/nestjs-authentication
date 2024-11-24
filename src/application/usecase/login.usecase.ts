import { IAuthGateway } from '../interface/auth.gateway';

export class LoginUseCase {
  constructor(private readonly authGateway: IAuthGateway) {}

  async execute(email: string, password: string): Promise<{ access_token: string; }> {
    return this.authGateway.login(email, password);
  }
}
