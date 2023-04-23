const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Region = sequelize.define("regions", {

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

    imagen: {

        type: Sequelize.STRING,
        allowNull: true,
    },

});

module.exports = Region;