const express = require("express");
const router = express.Router();
const formController = require("../controllers/form");

router.get("/form/:formId", formController.getAllFormData);

module.exports = router;
