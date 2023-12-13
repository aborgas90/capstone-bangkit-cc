const express = require("express");
const path = require("path");
const cors = require("cors");

const usersRouter = require('./routes/routes.js');
const { handleError } = require('./utils/error.js');
const auth = require('./middleware/auth.js');

const dbConnect = require("./databases/databases.js");
require("dotenv").config()

const app = express();

dbConnect();

app.use(cors());

app.use((req, res, next) => {
  const { method, path } = req;
  console.log(
    `New request to: ${method} ${path} at ${new Date().toISOString()}`
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", usersRouter);

app.use(handleError);

app.get("/api/v1/users",(req, res) => {
  try {
    res.status(200).json({
      status: "succes",
      data: [],
      message: "Welcome to our API homepage!",
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
  });
  }
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

