import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RoleEnum } from 'src/domain/role.enum';

export default class UserRoleRequestDTO {
  @ApiProperty()
  @IsEnum(RoleEnum)
  @ApiProperty({
    description: 'The role of the user',
    enum: RoleEnum,
    example: RoleEnum.USER,
  })
  role: RoleEnum;
}
