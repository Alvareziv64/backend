import config from '../../config.js'

let productsDao

switch (config.MODO_PERSISTENCIA) {
    case 'json':
        const { default: ProductsDaoArchivo } = await import('./productsDaoArchivo.js')
        prodcutsDao = new ProductsDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: ProductsDaoFirebase } = await import('./productsDaoFirebase.js')
        personasDao = new ProductsDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductsDaoMongo } = await import('./productsDaoMongo.js')
        personasDao = new ProductsDaoMongo()
        break
}

export { productsDao }