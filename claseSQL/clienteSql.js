
const { knexConfig } = require('./knexConfig.js');
const crearKnex = require('knex');


const clienteSql = crearKnex(knexConfig);

module.exports = { clienteSql } 