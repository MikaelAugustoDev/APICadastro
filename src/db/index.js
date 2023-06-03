const { Pool } = require("pg");

// const dbConfig = {
//     user: "mikael",
//     host: "dpg-chr77f9mbg5e1f0g47tg-a",
//     database: "users_wwzx",
//     password: "35mnFkyn2wTXkMFiXjfbt2JpmdRbchWy",
//     port: 5432,
// };

const poll = new Pool({
    connectionString: "postgres://mikael:35mnFkyn2wTXkMFiXjfbt2JpmdRbchWy@dpg-chr77f9mbg5e1f0g47tg-a.oregon-postgres.render.com/users_wwzx",
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = poll;