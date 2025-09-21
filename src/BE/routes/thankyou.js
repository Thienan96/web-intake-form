const express = require("express");
const router = express.Router();
const thankyouController = require("../controllers/thankyou.controller");

router.get("/step-thankyou/:formId", thankyouController.getFormData);

module.exports = router;
