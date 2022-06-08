
const { knexConfig, sqliteConfig } = require('./knexConfig.js');
const crearKnex = require('knex');


const clienteSql = crearKnex(knexConfig);
const clienteSqlite = crearKnex(sqliteConfig);

module.exports = { clienteSql, clienteSqlite }; 