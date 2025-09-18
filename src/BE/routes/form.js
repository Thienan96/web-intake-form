const express = require("express");
const router = express.Router();
const formController = require("../controllers/form.controller");

router.get("/form/:formId", formController.getAllFormData);

module.exports = router;
