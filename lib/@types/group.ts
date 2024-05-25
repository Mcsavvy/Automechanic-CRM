export default interface Group {
    id: string;
    name: string;
    permissions: {
        [scope: string]: string[] | boolean;
    };
    members: string[];
}