import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  confirmationCode: string;
  isAccountActivated: boolean;
  username: string;
}
