import User from '../common/models/user';
import { faker } from '@faker-js/faker';

export default async function populateUsers(number: number) {
    const users = [];
    for (let i = 0; i < number; i++) {
        const user = new User({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            phoneNumber: faker.phone.number()
        });
        await user.save();
        users.push(user);
    }
    return users;
}