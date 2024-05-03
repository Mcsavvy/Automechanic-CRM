import mongoose from 'mongoose';
import { getBaseSchema, IBaseDocument, defineModel } from './base';

interface IUserDocument extends IBaseDocument {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;

  fullName(): string;
}

const UserSchema = getBaseSchema().add({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, required: true},
  password: { type: String, required: true },
});

UserSchema.methods.fullName = function() {
  return this.firstName + ' ' + this.lastName;
}

export default defineModel<IUserDocument>("User", UserSchema);