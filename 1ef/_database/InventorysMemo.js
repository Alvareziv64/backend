const Persona = require('./Products.js');

class InventorysMemo{
    constructor(){
        this.inventory = [];
    }

    save(product){
        this.inventory.push(product);
    }

    getAll(){
      return [...this.inventory];
    }

    getById(id){
        return(this.inventory.find(product => product.id == id));
    }

    deleteAll(){
        this.inventory = [];
    }

    deleteById(id) {
        const indice = this.inventory.findIndex(product => product.id === id)
        if (indice !== -1) {
            this.inventory.splice(indice, 1)
            this._guardar()
        }
    }

}

module.exports = InventorysMemo;