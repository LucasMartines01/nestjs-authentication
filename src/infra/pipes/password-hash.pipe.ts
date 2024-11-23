import { Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRequestDTO } from '../modules/user/dto/user-request.dto';

@Injectable()
export class PasswordHashPipe implements PipeTransform {
  async transform(value: UserRequestDTO): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    value.password = await bcrypt.hash(value.password, salt);

    return value;
  }
}
