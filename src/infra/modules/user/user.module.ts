import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepositoryPrisma } from 'src/infra/database/prisma/user-prisma.repository';
import { RegisterUseCase } from 'src/application/usecase/register.usecase';
import { IUserRepository } from 'src/application/interface/user.repository';
import { UserUtils } from './utils/user.utils';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: RegisterUseCase,
      useFactory: (userRepository: IUserRepository) =>
        new RegisterUseCase(userRepository),
      inject: ['IUserRepository'],
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryPrisma,
    },
    UserUtils,
  ],
})
export class UserModule {}
