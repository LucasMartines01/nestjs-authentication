import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

import { RegisterUseCase } from 'src/application/usecase/register.usecase';
import { UserRequestDTO } from './dto/user-request.dto';
import { PasswordHashPipe } from 'src/infra/pipes/password-hash.pipe';
import { UserUtils } from './utils/user.utils';
import { GetAllUsersUseCase } from 'src/application/usecase/get-all-users.usecase';
import UserResponseDto from './dto/user-reponse.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userUtils: UserUtils,
    private readonly registerUseCase: RegisterUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
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
  async register(@Body(PasswordHashPipe) data: UserRequestDTO): Promise<void> {
    await this.registerUseCase.execute(this.userUtils.userToDomain(data));
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Users found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getAll(): Promise<UserResponseDto[]> {
    const users = await this.getAllUsersUseCase.execute();
    console.log(users);
    return users.map((user) => this.userUtils.usersToDTO(user));
  }
}
