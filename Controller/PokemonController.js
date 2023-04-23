const Pokemon = require("../models/Pokemons");
const Region = require("../models/Regions");
const Type = require("../models/Types");
const TypeSec = require("../models/TypesSec");

exports.GetIndex = (req, res, next) => {
    Region.findAll()
        .then((result) => {
            const region = result.map((result) => result.dataValues);
            Pokemon.findAll({ include: [{ model: Type }, { model: TypeSec }, { model: Region }] })
                .then((result) => {
                    const pokemon = result.map((result) => result.dataValues);
                    res.render("pokemons/index", {
                        pageTitle: "Home",
                        homeActive: true,
                        pokemon: pokemon,
                        hasPokemon: pokemon.length > 0,
                        region: region,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        });
};


exports.GetAdminPokemon = (req, res, next) => {

    Pokemon.findAll({ include: [{ model: Type }, { model: TypeSec }, { model: Region }] })
        .then((result) => {
            const pokemon = result.map((result) => result.dataValues);
            res.render("pokemons/admin-pokemon", {
                pageTitle: "Administra pokemon",
                pokemon: pokemon,
                hasPokemon: pokemon.length > 0

            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.GetSavePokemon = (req, res, next) => {

    Region.findAll()
        .then((result) => {
            const region = result.map((result) => result.dataValues);
            Type.findAll()
                .then((result) => {
                    const types = result.map((result) => result.dataValues);
                    TypeSec.findAll()
                        .then((result) => {
                            const typesec = result.map((result) => result.dataValues);
                            res.render("pokemons/save-pokemon", {
                                pageTitle: "Crear Pokemon",
                                homeActive: false,
                                editMode: false,
                                regions: region,
                                hasRegions: region.length > 0,
                                type: types,
                                typesec: typesec,
                                hasTypes: types.length > 0,
                            });

                        })

                })
                .catch((err) => {
                    console.log(err);

                }).catch((err) => {
                    console.log(err);
                });
        });

}

exports.PostSavePokemon = (req, res, next) => {
    const pokeName = req.body.Name;
    const pokeImage = req.body.Image;
    const pokeRegion = req.body.Region;
    const pokeType = req.body.Type;
    let pokeTypeSec = req.body.Typesec;

    if (pokeTypeSec == "") {
        pokeTypeSec = null;
    }

    Pokemon.create({
            nombre: pokeName,
            imagen: pokeImage,
            regionId: pokeRegion,
            typeId: pokeType,
            typesecId: pokeTypeSec,
        })
        .then((result) => {
            res.redirect("/admin-pokemon");
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/");
        });
};

exports.PostDeletePokemon = (req, res, next) => {
    const pokemonId = req.body.pokemonId;

    Pokemon.destroy({ where: { id: pokemonId } })
        .then((result) => {
            return res.redirect("/admin-pokemon");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.GetEditPokemon = (req, res, next) => {
    const edit = req.query.edit;
    const pokemonId = req.params.pokemonId;

    if (!edit) {
        return res.redirect("/admin-pokemon");
    }

    Pokemon.findOne({ where: { id: pokemonId } })
        .then((result) => {
            const pokemon = result.dataValues;

            if (!pokemon) {
                return res.redirect("/");
            }


            Region.findAll()
                .then((result) => {
                    const region = result.map((result) => result.dataValues);
                    Type.findAll()
                        .then((result) => {
                            const types = result.map((result) => result.dataValues);
                            TypeSec.findAll()
                                .then((result) => {
                                    const typesec = result.map((result) => result.dataValues);

                                    res.render("pokemons/save-pokemon", {
                                        pageTitle: "Editar pokemon",
                                        pokemonActive: true,
                                        editMode: edit,
                                        pokemon: pokemon,
                                        regions: region,
                                        hasRegions: region.length > 0,
                                        type: types,
                                        typesec: typesec,
                                        hasTypes: types.length > 0,


                                    });
                                })
                                .catch((err) => {
                                    console.log(err);
                                });

                        });
                });
        });
};

exports.PostEditPokemon = (req, res, next) => {
    const pokeName = req.body.Name;
    const pokeImage = req.body.Image;
    const pokeRegion = req.body.Region;
    const pokeType = req.body.Type;
    let pokeTypeSec = req.body.Typesec;
    const pokeId = req.body.pokemonId;

    if (pokeTypeSec == "") {
        pokeTypeSec = null;
    }

    Pokemon.update({ nombre: pokeName, imagen: pokeImage, regionId: pokeRegion, typeId: pokeType, typesecId: pokeTypeSec }, { where: { id: pokeId } })
        .then((result) => {
            return res.redirect("/admin-pokemon");
        })
        .catch((err) => {
            console.log(err);
        });
};


exports.FiltroRegion = (req, res, next) => {

    const region = req.body.Region;
    let determina = true;
    const reg = req.body.RegionName;

    Pokemon.findAll({ include: [{ model: Type }, { model: TypeSec }, { model: Region }], where: [{ regionId: region }] })
        .then((result) => {
            const pokemonF = result.map((result) => result.dataValues);

            Region.findOne({ where: [{ id: region }] })
                .then((result) => {
                    const reg = result.dataValues.nombre;



                    res.status(200).render("pokemons/filtro", {
                        pageTitle: "Pokemons de " + reg,
                        region: reg,
                        pokemonsF: pokemonF,
                        filtro: determina,
                        hasPokemonF: pokemonF.length > 0

                    });
                }).catch((err) => {
                    console.log(err);
                });

        });

}

exports.FiltroNombre = (req, res, next) => {

    const nombre1 = req.body.Nombre;
    let determina = true;



    Pokemon.findAll({ include: [{ model: Type }, { model: TypeSec }, { model: Region }], where: [{ nombre: nombre1 }] })
        .then((result) => {
            const poke = result.map((result) => result.dataValues);


            res.status(200).render("pokemons/filtro-nombre", {
                pageTitle: "" + nombre1,
                nombre: nombre1,
                pokemonsF2: poke,
                filtro: determina,
                hasPokemonF2: poke.length > 0
            });
        }).catch((err) => {
            console.log(err);
        });

};