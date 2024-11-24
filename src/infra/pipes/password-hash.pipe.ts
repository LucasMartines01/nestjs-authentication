import { Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHashPipe implements PipeTransform {
  async transform(value: any): Promise<any> {
    if (value.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(value.password, salt);
      return { ...value, password: hashedPassword };
    }
  }
}
