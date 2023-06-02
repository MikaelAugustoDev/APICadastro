const { Pool } = require("pg");

const dbConfig = {
    user: "mikael",
    host: "dpg-chr77f9mbg5e1f0g47tg-a",
    database: "users_wwzx",
    password: "35mnFkyn2wTXkMFiXjfbt2JpmdRbchWy",
    port: 5432,
};

const pooli = new Pool(dbConfig);

pooli.connect()
    .then(() => {
        console.log("Conexão bem-sucedida ao banco de dados!");
        // Realize operações no banco de dados
    })
    .catch((err) => {
        console.error("Erro ao conectar ao banco de dados:", err);
    });

module.exports = pooli;