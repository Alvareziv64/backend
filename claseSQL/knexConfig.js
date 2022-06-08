// usuario root
const adminDbConfig = {
  host: "127.0.0.1",
  port: 3307,
  user: "root",
  password: "mysqlpassword",
  database: "coderhouse",
};


const knexConfig = {
    client : "mysql2",
    connection: adminDbConfig,
}

/*function getConfig(modo) {
    return {
        client: 'sqlite3',
        connection: { filename: './DB/db.sqlite' },
        useNullAsDefault: true
    } 
}*/

module.exports =  {knexConfig} ;
