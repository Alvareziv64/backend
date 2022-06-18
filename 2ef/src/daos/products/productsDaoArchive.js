import ArchiveContainer from "../../containers/archiveContainer.js";

class ProductsDaoArchivo extends ArchiveContainer {

    constructor(rutaDir) {
        super(`${rutaDir}/products.json`)
    }
}

export default ProductsDaoArchivo