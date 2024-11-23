import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class UserRequestDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  name: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'email@example.com' })
  email: string;
  @MinLength(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)([A-Za-z\d\W]|[^ ]){6,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
