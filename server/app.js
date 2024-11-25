const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const consultationRoutes = require("./routes/consultationRoutes");
require("dotenv").config();
const db = require("./models");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/", authRoutes);
app.use("/api/consultation", consultationRoutes);
app.use("/api/consultation-schedule", scheduleRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
