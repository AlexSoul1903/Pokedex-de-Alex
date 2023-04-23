const express = require("express");
const path = require("path");
const app = express();
const expressHbs = require("express-handlebars");
const ErrorController = require("./Controller/ErrorController");
const sequelize = require("./util/database");

const Region = require("./models/Regions");
const Types = require("./models/Types");
const TypesSec = require("./models/TypesSec");
const Pokemons = require("./models/Pokemons");

const home = require("./routes/pokemon");
const region = require("./routes/regions");
const tipos = require("./routes/types");

const comparador = require("./util/helpers/hbs/comarar");

app.engine('hbs', expressHbs({

    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {

        IgualValor: comparador.IgualValor,
    },
}));

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));


app.use(home);
app.use(region);
app.use(tipos);


app.use("/", ErrorController.Get404);


Pokemons.belongsTo(Region, { constraint: true, onDelete: "CASCADE" });
Region.hasMany(Pokemons);


Pokemons.belongsTo(Types, { constraint: true, onDelete: "CASCADE" });
Types.hasMany(Pokemons);

Pokemons.belongsTo(TypesSec, { constraint: true, onDelete: "CASCADE" });
TypesSec.hasMany(Pokemons);



sequelize.sync().then(function(result) {

    app.listen(44197);

}).catch(err => {

    console.log(err);

})