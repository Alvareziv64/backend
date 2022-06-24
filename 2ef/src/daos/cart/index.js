import config from '../../config.js'

let cartDao;

switch (config.MODO_PERSISTENCIA) {
    case 'json':
        const { default: CartDaoArchivo } = await import('./cartDaoArchivo.js')
        cartDao = new CartDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const { default: CartDaoFirebase } = await import('./cartDaoFirebase.js')
        cartDao = new CartDaoFirebase()
        break
    case 'mongodb':
        const { default: CartDaoMongo } = await import('./cartDaoMongo.js')
        cartDao = new CartDaoMongo()
        break
}

export { cartDao }