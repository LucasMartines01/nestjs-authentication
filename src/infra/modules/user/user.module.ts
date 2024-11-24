import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from 'src/infra/database/prisma/user-prisma.repository';
import { RegisterUseCase } from 'src/application/usecase/register.usecase';
import { IUserGateway } from 'src/application/interface/user.gateway';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { UserUtils } from './utils/user.utils';
import { UserService } from './user.service';
import { GetAllUsersUseCase } from 'src/application/usecase/get-all-users.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: RegisterUseCase,
      useFactory: (userGateway: IUserGateway) =>
        new RegisterUseCase(userGateway),
      inject: ['IUserGateway'],
    },
    {
      provide: GetAllUsersUseCase,
      useFactory: (userGateway: IUserGateway) =>
        new GetAllUsersUseCase(userGateway),
      inject: ['IUserGateway'],
    },
    {
      provide: 'IUserGateway',
      useClass: UserService,
    },
    UserUtils,
    UserService,
    UserRepository,
  ],
  exports: ['IUserGateway'],
})
export class UserModule {}
