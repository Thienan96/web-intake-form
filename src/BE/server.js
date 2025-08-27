const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/init.mongodb");
const formRoutes = require("./routes/form");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(process.env.UPLOAD_DIR || "./uploads"));

connectDB.connect();

app.use(formRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: "File upload error: " + err.message });
  }
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
