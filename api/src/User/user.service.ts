import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { CreateUserDTO } from './Dto/User.dto';
import { User } from './interface/User';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  public async createUser(model: CreateUserDTO): Promise<User> {
    model.confirmationCode = crypto
      .createHash('sha256')
      .update(model.email)
      .digest('hex');

    model.isAccountActivated = false;
    try {
      const user: User = new this.userModel(model);
      return await user.save();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async activateAccount(code: string) {
    const user = await this.userModel.findOne({ confirmationCode: code });
    if (user) {
      user.isAccountActivated = true;
      return await user.save();
    } else {
      return null;
    }
  }
}
