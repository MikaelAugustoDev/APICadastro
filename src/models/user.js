const { Sequelize, sequelize } = require("../db");

const User = sequelize.define("user", {
    email: {
        type: Sequelize.STRING
    },
    senha: {
        type: Sequelize.STRING
    }
});

User.sync({force: true});

module.exports = User;