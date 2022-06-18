import ArchiveContainer from "../../containers/archiveContainer.js";

class CartDaoArchivo extends ArchiveContainer {

    constructor(rutaDir) {
        super(`${rutaDir}/cart.json`)
    }
}

export default CartDaoArchivo