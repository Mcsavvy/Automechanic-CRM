import User from '../common/models/user';
import { faker } from '@faker-js/faker';
import UserDAO from '../common/dao/user';

export default async function populateUsers(number: number) {
    const users = [];
    for (let i = 0; i < number; i++) {
        const email = faker.internet.email();
        const user = await UserDAO.addUser({
            email,
            password: email,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            phone: faker.phone.number(),
        });
        users.push(user);
    }
    return users;
}