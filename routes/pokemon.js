const express = require("express");
const path = require("path");

const router = express.Router();


const pokemonController = require("../Controller/PokemonController");

router.get("/", pokemonController.GetIndex);
router.get("/adminPoke", pokemonController.GetIndex);
router.get("/save-pokemon", pokemonController.GetSavePokemon);
router.get("/admin-pokemon", pokemonController.GetAdminPokemon);
router.post("/save-pokemon", pokemonController.PostSavePokemon);
router.post("/delete-pokemon", pokemonController.PostDeletePokemon);
router.get("/edit-pokemon/:pokemonId", pokemonController.GetEditPokemon);
router.post("/edit-pokemon", pokemonController.PostEditPokemon);
router.post("/", pokemonController.FiltroRegion);
router.post("/index", pokemonController.FiltroNombre);

module.exports = router;