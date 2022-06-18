import FirebaseContainer from "../../containers/firebaseContainer.js";

class ProductsDaoFirebase extends FirebaseContainer {

    constructor() {
        super('products')
    }
}

export default ProductsDaoFirebase