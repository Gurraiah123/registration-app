const express = require("express");
const bodyParser = require("body-parser");
const client = require("prom-client");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const registerCounter = new client.Counter({
  name: "register_requests_total",
  help: "Total registration requests"
});

// 🔴 DB CONNECTION
const pool = new Pool({
  user: "admin",
  host: "db",
  database: "usersdb",
  password: "admin",
  port: 5432,
});

// 🔴 CREATE TABLE
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT
  );
`);

// 🔴 INSERT DATA
app.post("/register", async (req, res) => {
  const { name, email } = req.body;

  await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email]
  );

  registerCounter.inc();
  res.send("User registered");
});

// 🔴 GET DATA
app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

// 🔴 METRICS
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(3000, () => console.log("Server running"));
