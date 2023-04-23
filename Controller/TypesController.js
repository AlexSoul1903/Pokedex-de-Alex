const Type = require("../models/Types");
const TypeSec = require("../models/TypesSec");

exports.GetTypes = (req, res, next) => {

    Type.findAll()
        .then((result) => {
            const types = result.map((result) => result.dataValues);

            res.render("types/types-lists", {
                pageTitle: "Tipos",
                typeActive: true,
                type: types,
                hasTypes: types.length > 0
            });

        })
        .catch((err) => {
            console.log(err);
        });

};


exports.GetSaveTypes = (req, res, next) => {

    res.render("types/save-types", {

        pageTitle: "Administra tipos",
    });

};


exports.PostSaveType = (req, res, next) => {

    const nombre = req.body.Name;

    Type.create({
        nombre: nombre,

    }).then((result) => {

        TypeSec.create({
            nombre: nombre,
        })
        return res.redirect("/types");


    }).catch((error) => {


        console.log(error);

    });




};

exports.PostDeleteTypes = (req, res, next) => {

    const typeId = req.body.typeId;

    Type.destroy({ where: { id: typeId } })
        .then((result) => {
            TypeSec.destroy({ where: { id: typeId } })
            return res.redirect("/types");
        })
        .catch((err) => {
            console.log(err);
        });
};




exports.GetEditType = (req, res, next) => {
    const edit = req.query.edit;
    const typeId = req.params.typeId;

    if (!edit) {
        return res.redirect("/types");
    }

    Type.findOne({ where: { id: typeId } })
        .then((result) => {
            const type = result.dataValues;

            if (!type) {
                return res.redirect("/types");
            }
            res.render("types/save-types", {
                pageTitle: "Editar tipo",
                typeActive: true,
                editMode: edit,
                tipo: type,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.PostEditType = (req, res, next) => {
    const typeName = req.body.Name;
    const typeId = req.body.typeId;

    Type.update({ nombre: typeName }, { where: { id: typeId } })
        .then((result) => {

            TypeSec.update({ nombre: typeName }, { where: { id: typeId } }).then((result) => {

                return res.redirect("/types");
            })

        })
        .catch((err) => {
            console.log(err);
        });
};