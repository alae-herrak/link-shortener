const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const LinkRouter = require("./routes/link.js");

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.get("/", (_, res) => {
  res.send("Hello world!");
});

app.use("/links", LinkRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on: http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection error:", err));
