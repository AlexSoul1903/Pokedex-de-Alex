const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const TypeSec = sequelize.define("typesec", {

    id: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    nombre: {

        type: Sequelize.STRING,
        allowNull: true,
    },

});

module.exports = TypeSec;