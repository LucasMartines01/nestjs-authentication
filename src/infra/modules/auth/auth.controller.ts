import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { LoginUseCase } from 'src/application/usecase/login.usecase';
import { PasswordHashPipe } from 'src/infra/pipes/password-hash.pipe';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'Login success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async login(
    @Body() data: LoginRequestDto,
  ): Promise<{ access_token: string }> {
    return await this.loginUseCase.execute(data.email, data.password);
  }
}
