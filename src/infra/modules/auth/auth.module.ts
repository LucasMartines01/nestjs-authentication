import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoginUseCase } from 'src/application/usecase/login.usecase';
import { IAuthGateway } from 'src/application/interface/auth.gateway';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: LoginUseCase,
      useFactory: (authGateway: IAuthGateway) => new LoginUseCase(authGateway),
      inject: ['IAuthGateway'],
    },
    {
      provide: 'IAuthGateway',
      useClass: AuthService,
    },
    AuthService,
  ],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: "SECRET",
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
