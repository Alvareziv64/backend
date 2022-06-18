import config from '../../config.js'

let cartDao

switch (config.MODO_PERSISTENCIA) {
    case 'json':
        const { default: CartDaoArchivo } = await import('./cartDaoArchivo.js')
        prodcutsDao = new CartDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: CartDaoFirebase } = await import('./cartDaoFirebase.js')
        personasDao = new CartDaoFirebase()
        break
    case 'mongodb':
        const { default: CartDaoMongo } = await import('./cartDaoMongo.js')
        personasDao = new CartDaoMongo()
        break
}

export { cartDao }