import { getBaseSchema, IBaseDocument, defineModel } from './base';

export interface IUserDocument extends IBaseDocument {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  status: 'active' | 'banned';
  permissions: {
    [key: string]: string[] | boolean;
  };
  fullName(): string;
  hasPermission(permission: string): boolean;
}

export const UserSchema = getBaseSchema().add({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, required: true},
  password: { type: String, required: true },
  permissions: { type: Object, required: true, default: {} },
  status: { type: String, required: true, enum: ['active', 'banned'], default: 'active' },
});

UserSchema.methods.fullName = function() {
  return this.firstName + ' ' + this.lastName;
}

UserSchema.methods.hasPermission = function(permission: string) {
  // example: 'user:read,write'
  if (permission.includes(':')) {
    const [scope, action] = permission.split(':', 2);
    const actions = action.split(',');
    if (actions.length > 1) {
      return actions.every(action => this.hasPermission(`${scope}:${action}`));
    }
    if (action === '*' || action === 'all' || action === '') {
      return this.permissions[scope] === true;
    }
    return this.permissions[scope] === true || this.permissions[scope].includes(action);
  }
  return this.permissions[permission] === true;
}

export default defineModel<IUserDocument>("User", UserSchema);