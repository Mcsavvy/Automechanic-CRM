import { getBaseSchema, IBaseDocument, defineModel } from './base';

type Role = 'admin' | 'mechanic' | 'teller' | 'owner';
interface IUserDocument extends IBaseDocument {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  roles: Role[];
  status: 'active' | 'banned';
  fullName(): string;
}

const UserSchema = getBaseSchema().add({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, required: true},
  password: { type: String, required: true },
  status: { type: String, required: true, enum: ['active', 'banned'], default: 'active' },
  roles: { type: [String], required: true, default: ['teller'] }
});

UserSchema.methods.fullName = function() {
  return this.firstName + ' ' + this.lastName;
}

export default defineModel<IUserDocument>("User", UserSchema);