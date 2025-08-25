const config = {
  db: {
    host: process.env.MONGODB_HOST || "localhost",
    port: process.env.MONGODB_PORT || "27017",
    username: process.env.MONGODB_USERNAME || "",
    password: process.env.MONGODB_PASSWORD || "",
    dbname: process.env.MONGODB_DBNAME || "web_intake_form",
    params: process.env.MONGODB_PARAMS || "",
  },
};

module.exports = config;
