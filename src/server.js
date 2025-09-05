const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./BE/config/init.mongodb");
const formRoutes = require("./BE/routes/form");
const step1Routes = require("./BE/routes/step-1");
const step2Routes = require("./BE/routes/step-2");
const step3Routes = require("./BE/routes/step-3");
const step4Routes = require("./BE/routes/step-4");
const step5Routes = require("./BE/routes/step-5");
const step6Routes = require("./BE/routes/step-6");
const thankyouRoutes = require("./BE/routes/thankyou");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(process.env.UPLOAD_DIR || "./uploads"));

// connectDB.connect();
connectDB.connect();

app.use("", require("./BE/routes/index"));
app.use(formRoutes);
app.use(step1Routes);
app.use(step2Routes);
app.use(step3Routes);
app.use(step4Routes);
app.use(step5Routes);
app.use(step6Routes);
app.use(thankyouRoutes);

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "BE/views"));

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);
// Global CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use((req, res, next) => {
  res.render("index", { host: "http://localhost:3000" });
});
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: "File upload error: " + err.message });
  }
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
