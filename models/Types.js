const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Type = sequelize.define("types", {

    id: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    nombre: {

        type: Sequelize.STRING,
        allowNull: false,

    },

});

module.exports = Type;