import mongoose from "mongoose";
import {IUserDocument} from "./models/user";

function isAdmin(user: IUserDocument): boolean {
  return user.roles.includes('admin');
}
function isOwner(user: IUserDocument): boolean {
  return user.roles.includes('owner');
}
function isNotBanned(user: IUserDocument): boolean {
  return user.status !== 'banned';
}

function isTeller(user: IUserDocument): boolean {
  return user.roles.includes('teller');
}

function isMechanic(user: IUserDocument): boolean {
    return user.roles.includes('mechanic');
}

function isEntityOwner(user: IUserDocument, ownerId: mongoose.Types.ObjectId): boolean {
  return user._id === ownerId;
}

function hasAdminClaim(user: IUserDocument): boolean {
  return isAdmin(user) || isOwner(user);
}

function hasMechanicClaim(user: IUserDocument): boolean {
  return isMechanic(user) || isAdmin(user) || isOwner(user);
}

function hasTellerClaim(user: IUserDocument): boolean {
  return isTeller(user) || isAdmin(user) || isOwner(user);
}
const Permissions = {
    isAdmin,
    isOwner,
    isNotBanned,
    isTeller,
    isMechanic,
    isEntityOwner,
    hasAdminClaim,
    hasMechanicClaim,
    hasTellerClaim
};
export default Permissions;
