const { pool } = require("../config/db");
const fs = require("fs");
const path = require("path");

const initDB = async () => {
  try {
    const schema = fs.readFileSync(
      path.join(__dirname, "../config/schema.sql"),
      "utf8"
    );
    await pool.query(schema);
    console.log("Database tables created successfully");
  } catch (error) {
    console.error("Error creating database tables:", error);
    throw error;
  }
};

module.exports = { initDB };
