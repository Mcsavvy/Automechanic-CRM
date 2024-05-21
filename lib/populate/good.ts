import { faker } from "@faker-js/faker";
import Good from "../inventory/models/good";
import { goodCategories } from "../stores/good-store";


export default async function populateGoods(number: number) {
    const goods = [];
    for (let i = 0; i < number; i++) {
        const good = new Good({
            name: faker.commerce.productName(),
            costPrice: faker.commerce.price(),
            qty: Math.floor(Math.random() * 100), // Random number between 0 and 100
            description: faker.commerce.productDescription(),
            minQty: Math.floor(Math.random() * 10), // Random number between 0 and 10
            productId: faker.string.uuid(),
            categories: [goodCategories[Math.floor(Math.random() * goodCategories.length)]],
        });
        await good.save();
        goods.push(good);
    }
    return goods;
}