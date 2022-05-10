const InventorysArchive = require('./InventorysArchive');
const InventorysMemo = require('./InventorysMemo');

const main = async () => {
    const inventory = new InventorysArchive(".products.txt");

    const product1 = {
        id: 1,
        title: "Laptop",
        price: 500,
        thumbnail: "img/laptop.jpg"
    }

    await inventory.save(product1);

    const product2 = {
        id: 2,
        title: "Mouse",
        price: 50,
        thumbnail: "img/mouse.jpg"
    }

    await inventory.save(product2);

    const product3 = {
        id: 3,
        title: "Monitor",
        price: 200,
        thumbnail: "img/monitor.jpg"
    }

    await inventory.save(product3);


    //await inventory.getAll()

    await inventory.deleteById(2);

   // console.log(await inventory.getAll());

    

}



module.exports = {main}





