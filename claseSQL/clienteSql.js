
const { getConfig } = require('./knexConfig.js');
const crearKnex = require('knex');

const clienteSqlAdmin = crearKnex(getConfig('ADMIN'))
const clienteSqlUser = crearKnex(getConfig('USER'))

module.exports = {
    clienteSqlAdmin,
    clienteSqlUser
} 