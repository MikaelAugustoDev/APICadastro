const { Sequelize, sequelize } = require("../db");

const User = sequelize.define("users", {
    email: {
        type: Sequelize.STRING
    },
    senha: {
        type: Sequelize.STRING
    }
});

User.sync();

module.exports = User;