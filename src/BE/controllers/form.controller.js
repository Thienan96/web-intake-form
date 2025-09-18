const formService = require("../services/form.service");

const getAllFormData = async (req, res) => {
  try {
    const result = await formService.getAllFormData(req.params.formId);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { getAllFormData };
