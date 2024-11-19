import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserRequestDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  name: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'email@example.com' })
  email: string;
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
