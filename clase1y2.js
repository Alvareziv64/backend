/*te ayudo un poco, en el constructor podes crear un contenedor: 
this.produtos = [];
y despues para guardar un producto el metodo: save(producto){
this.produtos.push(producto);
}

obtener por id: getById(id){
return this.produtos.find(el \=> el.id == id);
}
fijate que siempre lo buscamos en el array del constructor
para borrar en lugar de usar find usas filter
para borrar por id
y para borrar todo le asignas a this.productos el valor []


y para mostrar los productos:
this.produtos.forEach(function(producto){
console.log(producto);
});

*/

class Contenedor {
    
    constructor(id, title, price, thumbnail){
        this.id = id;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.productos = [];
    }

    save(producto){
        this.productos.push(producto);
    }

    getById(id){
        console.log(this.productos.find(producto => producto.id == id));
    }

    deleteById(id){
        this.productos = this.productos.filter(producto => producto.id != id);
    }

    deleteAll(){
        this.productos = [];
    }

    getAll(){
        this.productos.forEach(function(producto){
            console.log(producto);
        });
    }

}

const producto1 = new Contenedor(1, "Laptop", "500", "img/laptop.jpg");

producto1.save(new Contenedor(2, "Mouse", "50", "img/mouse.jpg"));

console.log(producto1)

producto1.getById(2);

producto1.getAll();



