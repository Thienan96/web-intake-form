const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/init.mongodb");
const formRoutes = require("./routes/form");
const step1Routes = require("./routes/step-1");
const step2Routes = require("./routes/step-2");
const step3Routes = require("./routes/step-3");
const step4Routes = require("./routes/step-4");
const step5Routes = require("./routes/step-5");
const step6Routes = require("./routes/step-6");
const thankyouRoutes = require("./routes/step-thankyou");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(process.env.UPLOAD_DIR || "./uploads"));

connectDB.connect();

app.use(formRoutes);
app.use(step1Routes);
app.use(step2Routes);
app.use(step3Routes);
app.use(step4Routes);
app.use(step5Routes);
app.use(step6Routes);
app.use(thankyouRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: "File upload error: " + err.message });
  }
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
