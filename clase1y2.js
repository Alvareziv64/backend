class Contenedor {
    constructor(id, title, price, thumbnail){
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }

    save(){};

    getById(id) {
        if (id == this.id) {
            console.log(this);
        }
        else{
            console.log(null);
        }
    }

    getAll() {
        console.log(this);
    }

    deleteById(id) {
        if (id == this.id) {
            return {}
        }
    }

    deleteAll() {
        return {}
    }
    
}

const producto1 = new Contenedor (1, "Producto 1", 100, "img/producto1.jpg");
const producto2 = new Contenedor (2, "Producto 2", 200, "img/producto2.jpg");



