import {faker} from '@faker-js/faker';
faker.locale = "es"

const productsGenerator = (id) => {
    return {
        id,
        title: faker.commerce.productName(), 
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }
}

export { productsGenerator };