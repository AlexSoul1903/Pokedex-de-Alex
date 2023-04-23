const express = require("express");
const path = require("path");

const router = express.Router();

const regionControler = require("../Controller/RegionsController");

router.get("/regions", regionControler.GetRegion);

router.get("/save-region", regionControler.GetSaveRegion);
router.post("/save-region", regionControler.PostSaveRegion);
router.post("/delete-region", regionControler.PostDeleteRegions);
router.get("/edit-region/:regionId", regionControler.GetEditRegion);
router.post("/edit-region", regionControler.PostEditRegion);

module.exports = router;