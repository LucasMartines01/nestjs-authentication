import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUseCase } from 'src/application/usecase/register.usecase';
import { UserRequestDTO } from './dto/user-request.dto';
import { UserUtils } from './utils/user.utils';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterRoleUseCase } from 'src/application/usecase/register-role.usecase';
import { RoleEnum } from 'src/domain/role.enum';
import UserRoleRequestDTO from './dto/user-role-request.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userUtils: UserUtils,
    private readonly registerUseCase: RegisterUseCase,
    private readonly registerRoleUseCase: RegisterRoleUseCase,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiBody({
    description: 'User data',
    type: UserRequestDTO,
  })
  async register(@Body() data: UserRequestDTO): Promise<void> {
    await this.registerUseCase.execute(this.userUtils.userToDomain(data));
  }
}
