import InventorysMemo from '../database/InventorysMemo.js';
import { productsGenerator } from '../Generators/productsGenerator.js';
import { idGenerator } from '../Generators/idGenerator.js';

class ApiProductsMock extends InventorysMemo {
    constructor() { super() }

    create(cant = 5) {
        const nuevos = []
        for (let i = 0; i < cant; i++) {
            const newProduct = productsGenerator(idGenerator())
            const guardado = this.save(newProduct)
            nuevos.push(guardado)
        }
        return nuevos
    }
}

export default ApiProductsMock