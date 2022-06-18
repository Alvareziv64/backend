import MongoCotainer from "../../containers/mongoContainer.js";

class CartDaoMongo extends MongoCotainer {

    constructor() {
        super('cart')
    }
}

export default CartDaoMongo
