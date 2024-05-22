export default interface Staff {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    permissions: {
        [key: string]: string[] | boolean;
    };
    status: 'active' | 'banned';
}