// usuario root
const adminDbConfig = {
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: 'mysqlpassword',
    database: 'coderhouse'
}

// export function getConfig(modo) {
//     if (modo === 'ADMIN') {
//         return {
//             client: 'mysql2',
//             connection: adminDbConfig
//         }
//     } else {
//         return {
//             client: 'mysql2',
//             connection: userDbConfig
//         }
//     }
// }

function getConfig(modo) {
    return {
        client: 'sqlite3',
        connection: { filename: './DB/db.sqlite' },
        useNullAsDefault: true
    } 
}

module.exports = {
    getConfig
} 