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

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};
