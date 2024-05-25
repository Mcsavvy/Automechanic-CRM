import { faker } from '@faker-js/faker';
import UserDAO from '../common/dao/user';
import Group from '../common/models/group';
import UserModel from '../common/models/user';
import GroupDAO from '../common/dao/group';
import { AnyArray } from 'mongoose';

export async function assignGroups() {
    const groups = await Group.find({ name: {$ne: "all"}}).exec();
    const all: any = await Group.findOne({name: "all"});
    const users = await UserModel.find();
    for (const user of users) {
        await GroupDAO.addMember(all._id, user._id);
        const userGroups = groups.filter(() => Math.random() > 0.5);
        for (const group of userGroups) {
            await GroupDAO.addMember(group.id, user.id);
        }
    }
}

export default async function populateUsers(number: number) {
    const users = [];
    for (let i = 0; i < number; i++) {
        const email = faker.internet.email();
        const user = await UserDAO.addUser({
            email,
            password: email,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            phone: `+234${faker.string.numeric(10)}`,
        });
        users.push(user);
    }
    return users;
}


