import MongoCotainer from "../../containers/mongoContainer.js";

class ProductsDaoMongo extends MongoCotainer {

    constructor() {
        super('products')
    }
}

export default ProductsDaoMongo
