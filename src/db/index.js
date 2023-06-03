require("dotenv").config();
const { Pool } = require("pg");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbDatabase = process.env.DB_DATABASE;

const pool = new Pool({
    connectionString: `postgres://${dbUser}:${dbPassword}@${dbHost}.oregon-postgres.render.com/${dbDatabase}`,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;