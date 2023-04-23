const express = require("express");
const path = require("path");

const router = express.Router();

const typesControler = require("../Controller/TypesController");

router.get("/types", typesControler.GetTypes);

router.get("/save-types", typesControler.GetSaveTypes);

router.post("/save-types", typesControler.PostSaveType);
router.post("/delete-type", typesControler.PostDeleteTypes);
router.get("/edit-type/:typeId", typesControler.GetEditType);
router.post("/edit-type", typesControler.PostEditType);

module.exports = router;