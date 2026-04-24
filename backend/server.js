const express = require("express");
const bodyParser = require("body-parser");
const client = require("prom-client");

const app = express();
app.use(bodyParser.json());

// Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
});

register.registerMetric(httpRequestCounter);

// In-memory users
let users = [];

// Register API
app.post("/register", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("Invalid input");
  }

  users.push({ name, email });
  httpRequestCounter.inc();

  res.send("User registered");
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
