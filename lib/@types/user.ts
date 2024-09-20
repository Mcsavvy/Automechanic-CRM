export interface Group {
    id: string;
    name: string;
    permissions: {
        [key: string]: string[] | boolean;
    };
}

export interface User {
    id: string;
    email?: string;
    firstName: string;
    lastName: string;
    phone?: string;
    permissions: {
        [key: string]: string[] | boolean;
    };
    groups: Group[];
}

export interface AnonymousUser {
    id: null;
    email: null;
    firstName: null;
    lastName: null;
    phone: null;
    permissions: {
        [key: string]: string[] | boolean;
    };
    groups: Group[];
}
