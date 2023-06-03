const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgres://mikael:35mnFkyn2wTXkMFiXjfbt2JpmdRbchWy@dpg-chr77f9mbg5e1f0g47tg-a.oregon-postgres.render.com/users_wwzx",
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;