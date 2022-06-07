const { clienteSqlAdmin } = require('./clienteSql.js')

try {
    const exists = await clienteSqlAdmin.schema.hasTable('personas')
    if (!exists) {
        await clienteSqlAdmin.schema.createTable('personas', tabla => {
            tabla.increments('id'),
                tabla.string('nombre'),
                tabla.integer('edad')
        })
        console.log('tabla "personas" creada!')
    } else {
        console.log('la tabla "personas" ya existe. no se realizaron cambios.')
    }
} catch (error) {
    console.log(`fallo la operacion: ${error.message}`)
} finally {
    clienteSqlAdmin.destroy()
}