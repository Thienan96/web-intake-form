const exportService = require("../services/service-export");
const path = require("path");

const exportFormToPDF = async (req, res) => {
  try {
    const { formId } = req.params;
    const result = await exportService.exportFormToPDF(formId);
    res.download(
      result.filePath,
      path.basename(result.filePath),
      async (err) => {
        if (err) {
          res.status(500).json({ error: "Download failed" });
          return;
        }

        await require("fs-extra").remove(result.filePath);
      }
    );
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = { exportFormToPDF };
