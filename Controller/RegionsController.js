const Region = require("../models/Regions");


exports.GetRegion = (req, res, next) => {


    Region.findAll()
        .then((result) => {
            const regions = result.map((result) => result.dataValues);

            res.render("regions/regions-lists", {
                pageTitle: "Regions",
                regionActive: true,
                regions: regions,
                hasRegions: regions.length > 0
            });

        })
        .catch((err) => {
            console.log(err);
        });


};


exports.GetSaveRegion = (req, res, next) => {

    res.render("regions/save-region", {

        pageTitle: "Administra regiones",


    });


};

exports.PostSaveRegion = (req, res, next) => {

    const nombre = req.body.Nombre;
    const imagen = req.body.Imagen;

    Region.create({
        nombre: nombre,
        imagen: imagen,
    }).then((result) => {

        return res.redirect("/regions");

    }).catch((error) => {


        console.log(error);

    });




};

exports.PostDeleteRegions = (req, res, next) => {

    const regionId = req.body.regionId;

    Region.destroy({ where: { id: regionId } })
        .then((result) => {
            return res.redirect("/regions");
        })
        .catch((err) => {
            console.log(err);
        });
};




exports.GetEditRegion = (req, res, next) => {
    const edit = req.query.edit;
    const regionId = req.params.regionId;

    if (!edit) {
        return res.redirect("/regions");
    }

    Region.findOne({ where: { id: regionId } })
        .then((result) => {
            const region = result.dataValues;

            if (!region) {
                return res.redirect("/regions");
            }
            res.render("regions/save-region", {
                pageTitle: "Editar region",
                regionActive: true,
                editMode: edit,
                region: region,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.PostEditRegion = (req, res, next) => {
    const regionName = req.body.Nombre;
    const regionId = req.body.regionId;
    const imagen = req.body.Imagen;

    Region.update({ nombre: regionName, imagen: imagen }, { where: { id: regionId } })
        .then((result) => {
            return res.redirect("/regions");
        })
        .catch((err) => {
            console.log(err);
        });
};