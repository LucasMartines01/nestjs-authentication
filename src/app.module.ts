import { Module } from '@nestjs/common';
import { UserModule } from './infra/modules/user/user.module';
import { AuthModule } from './infra/modules/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
