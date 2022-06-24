import config from '../../config.js'

let productsDao

switch (config.MODO_PERSISTENCIA) {
    case 'json':
        const { default: ProductsDaoArchivo } = await import('./productsDaoArchivo.js')
        productsDao = new ProductsDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: ProductsDaoFirebase } = await import('./productsDaoFirebase.js')
        productsDao = new ProductsDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductsDaoMongo } = await import('./productsDaoMongo.js')
        productsDao = new ProductsDaoMongo()
        break
}

export { productsDao }