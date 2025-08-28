"use strict";
const API_URL = 'http://localhost:3000';
const express = require("express");
const router = express.Router();
const path = require("path");
// Serve the JavaScript loader
router.get("/loader.js", (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    res.send(`
      (function() {
        if (!document.getElementById("app")) {
            var app = document.createElement("div");
            app.id = "app";
            document.body.appendChild(app);
        }
        if (!document.getElementById("custom-form-script")) {
          var script = document.createElement("script");
          script.id = "custom-form-script";
          script.src = "${API_URL}/js/main.js"; 
          script.type = "module";
          script.async = true;

          var script2 = document.createElement("script");
          script2.src = "${API_URL}/js/constant.js"; 
          script2.type = "module";
          script2.async = true;
  
          var link = document.createElement("link");
          link.href = "${API_URL}/styles.css"; 
          link.type = "text/css";
          link.rel = "stylesheet";
  
          var script3 = document.createElement("script");
          script3.src = "https://maps.googleapis.com/maps/api/js?key=''&libraries=places"; 
          script3.async = true;
  
          document.body.appendChild(script);
          document.body.appendChild(script2);
          document.body.appendChild(link);
          document.body.appendChild(script3);
        }
      })();
    `);
  });
  
  router.get("/js/main.js", (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.sendFile(path.join(__dirname, "../../public/js/main.js"));
  });

  router.get("/js/constant.js", (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    res.send(`
      export const API_URL = "${API_URL}";      
    `);
  });


  router.get("/styles.css", (req, res) => {
    res.setHeader("Content-Type", "text/css");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    
    res.sendFile(path.join(__dirname, "../../public/styles.css"));
  });

module.exports = router;
