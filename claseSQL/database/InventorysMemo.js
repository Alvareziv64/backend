class InventorysMemo {
    constructor() {
        this.inventory = [];
    }

    save(product) {
        this.inventory.push(product);
        return product;
    }

    getAll() {
        return this.inventory;
    }

    getById(id) {
        return this.inventory.find((o) => o.id == id);
    }

    deleteAll() {
        this.inventory = [];
    }

    deleteById(id) {
        this.inventory = this.inventory.filter((o) => o.id !== id);
    }
}

export default InventorysMemo;