import FirebaseContainer from "../../containers/firebaseContainer.js";

class CartDaoFirebase extends FirebaseContainer {

    constructor() {
        super('cart')
    }
}

export default CartDaoFirebase