import { model, Schema } from 'mongoose';

export const UserSchema = new Schema({
	email: {
		type: String,
		$exists: true,
		unique: true,
	},
	username: {
		type: String,
		$exists: true,
		unique: true,
	},
	confirmationCode: {
		type: String,
		$exists: true,
		unique: true,
	},
	isAccountConfirmed: {
		type: Boolean,
		$exists: true,
	},
	password:{
		type: String,
		$exists: true
	}
});

export const UserModel = model('User', UserSchema);
