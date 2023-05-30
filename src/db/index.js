const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("users", "postgres", "777", {
    host: "localhost",
    dialect: "postgresql"
});

sequelize.authenticate()
    .then(() => {
        console.log("Sucesso ao se conectar com o banco");
    })
    .catch((err) => {
        console.log(`Erro ao se conectar: ${err}`);
    });


const { Client } = require("pg");


const connectionString = "postgres://mikael:35mnFkyn2wTXkMFiXjfbt2JpmdRbchWy@dpg-chr77f9mbg5e1f0g47tg-a.oregon-postgres.render.com/users_wwzx";
const client = new Client({
    connectionString: connectionString
});

client.connect()
    .then(() => {
        console.log("Conexão bem-sucedida ao banco de dados!");
        // Realize operações no banco de dados
    })
    .catch((err) => {
        console.error("Erro ao conectar ao banco de dados:", err);
    });

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};
