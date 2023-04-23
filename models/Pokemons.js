const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Pokemons = sequelize.define(

    "Pokemon", {

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

let FiltroRegion = (region, callback) => {


    const poki = Pokemons.filter((poke) => poke.regionId === region);
    callback(poki);

}


module.exports = FiltroRegion;


module.exports = Pokemons;