export class User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: string;
    token: string;
    salt: string;   //added to password in case of duplicates
    hash: string;
}