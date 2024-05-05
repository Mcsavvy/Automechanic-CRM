import mongoose from "mongoose";
import UserModel from "./models/user";

type User = typeof UserModel;
function isAdmin(user: User): boolean {
  return user.roles.include('admin');
}
function isOwner(user: User): boolean {
  return user.roles.include('owner');
}
function isNotBanned(user: User): boolean {
  return user.status !== 'banned';
}

function isTeller(user: User): boolean {
  return user.roles.include('teller');
}

function isMechanic(user: User): boolean {
    return user.roles.include('mechanic');
}

function isEntityOwner(user: User, ownerId: mongoose.Types.ObjectId): boolean {
  return user._id === ownerId;
}

function hasAdminClaim(user: User): boolean {
  return isAdmin(user) || isOwner(user);
}

function hasMechanicClaim(user: User): boolean {
  return isMechanic(user) || isAdmin(user) || isOwner(user);
}

function hasTellerClaim(user: User): boolean {
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
