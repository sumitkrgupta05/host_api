require("dotenv").config();
const express = require("express");
const app = express();

// connecting db
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

const products_routes = require("./routes/products");

app.get("/", (req, res) => {
  res.send("Hiii, Server is responding");
});

// Middleware
app.use("/api/product", products_routes);

app.get("/sumit", (req, res) => {
  res.send("Hiii, Sumit is responding 🔥🔥");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Running on port ${PORT} !!`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
