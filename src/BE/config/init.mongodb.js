const mongoose = require("mongoose");
const config = require("./config.mongodb");

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    if (this.connection) {
      return this.connection;
    }

    try {
      const { host, port, username, password, dbname, params } = config.db;
      let uri = `mongodb://${host}:${port}/${dbname}`;
      if (params) {
        uri += `?${params}`;
      }
      if (username && password) {
        uri = `mongodb://${username}:${password}@${host}:${port}/${dbname}${
          params ? `?${params}` : ""
        }`;
      }

      this.connection = await mongoose.connect(uri);
      console.log("MongoDB connected successfully");
      return this.connection;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1);
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

module.exports = Database.getInstance();
