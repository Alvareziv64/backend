const { clienteSql } = require('./clienteSql.js')

    clienteSql.schema.hasTable('products')
    .then(exists => {
        if (!exists) {
         clienteSql.schema.createTable('products', tabla => {
            tabla.increments('id'),
                tabla.string('title'),
                tabla.integer('price')
                tabla.string('thumbnail')
        })
        .then(() => {
        console.log('Product table created')
        })
    } else {
        console.log('Product table already exists')
    }
    })
   .finally(() => {
    clienteSql.destroy()
})