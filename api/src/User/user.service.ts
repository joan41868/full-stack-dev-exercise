import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { CreateUserDTO } from './Dto/User.dto';
import { User } from './interface/User';

@Injectable()
export class UserService {
	constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

	public async createUser(
		model: CreateUserDTO,
	): Promise<{ message: string; user: User; reason: string }> {
		// TODO json validator?
		if (!model.email || !model.username) {
			return {
				message: 'FAILED',
				reason: 'Missing required property email/username',
				user: undefined,
			};
		}

		model.confirmationCode = crypto
			.createHash('sha256')
			.update(model.email)
			.digest('hex');

		model.isAccountActivated = false;
		try {
			const user: User = new this.userModel(model);
			const savedUser = await user.save();
			return {
				message: 'OK',
				user: savedUser,
				reason: undefined,
			};
		} catch (err) {
			return {
				message: 'FAILED',
				reason: 'Account already exists',
				user: undefined,
			};
		}
	}

	public async activateAccount(
		code: string,
	): Promise<{
		message: string;
		user: User;
	}> {
		const user = await this.userModel.findOne({
			confirmationCode: code,
		});
		if (user) {
			if (!user.isAccountConfirmed) {
				user.isAccountConfirmed = true;
				const updatedUser = await user.save();
				// await this.userModel.updateOne(
				// 	{ _id: user._id },
				// 	{ $set: { isAccountConfirmed: true } },
				// );
				return {
					message: 'OK',
					user: updatedUser,
				};
			} else {
				return {
					message: 'User already active',
					user: undefined,
				};
			}
		} else {
			return {
				message: 'User not found',
				user: undefined,
			};
		}
	}
}
