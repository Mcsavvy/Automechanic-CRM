import { Permission } from "./base";
import { IUserDocument } from "../common/models/user";

const isAdmin = Permission.create({
    hasPermission: async (user: IUserDocument, request) => {
        return user.roles.includes('admin');
    },
    hasObjectPermission: async (user: IUserDocument, object, request) => {
        return user.roles.includes('admin');
    }
});


const isOwner = Permission.create({
    hasPermission: async (user: IUserDocument, request) => {
        return user.roles.includes('owner');
    },
    hasObjectPermission: async (user: IUserDocument, object, request) => {
        return user.roles.includes('owner');
    }
});

const isBanned = Permission.create({
    hasPermission: async (user: IUserDocument, request) => {
        return user.status !== 'banned';
    },
    hasObjectPermission: async (user: IUserDocument, object, request) => {
        return user.status !== 'banned';
    }
});

const isTeller = Permission.create({
    hasPermission: async (user: IUserDocument, request) => {
        return user.roles.includes('teller');
    },
    hasObjectPermission: async (user: IUserDocument, object, request) => {
        return user.roles.includes('teller');
    }
});

const isMechanic = Permission.create({
    hasPermission: async (user: IUserDocument, request) => {
        return user.roles.includes('mechanic');
    },
    hasObjectPermission: async (user: IUserDocument, object, request) => {
        return user.roles.includes('mechanic');
    }
});

export {
    isAdmin,
    isOwner,
    isBanned,
    isTeller,
    isMechanic
};