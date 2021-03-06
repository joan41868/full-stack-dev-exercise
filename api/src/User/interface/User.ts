import { Document } from 'mongoose';

export interface User extends Document {
	email: string;
	confirmationCode: string;
	isAccountConfirmed: boolean;
	username: string;
	passHash: string;
}
