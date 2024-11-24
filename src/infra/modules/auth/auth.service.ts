import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthGateway } from 'src/application/interface/auth.gateway';
import { IUserGateway } from 'src/application/interface/user.gateway';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthGateway {
  constructor(
    @Inject('IUserGateway') private readonly userGateway: IUserGateway,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userGateway.getUserByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = { email: user.email, sub: user.id, roles: user.roles };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
