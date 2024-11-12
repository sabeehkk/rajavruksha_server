
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "uploads/"});
require('dotenv').config();
const port = process.env.PORT || 3000;
const { createNewForm } = require('./controlller/userController');

const usersRouter = require("./Routes/userRoutes");

app.use(express.json());
app.use(express.static("public"));
app.use(express.static("uploads"));

mongoose
.connect(process.env.mongo_URL)
.then(() => console.log("database connected"))
.catch((err) => console.log(err));

// Middleware  
app.use(
  cors({
    origin: "http://localhost:3038",
  })
);


app.use('/',usersRouter)
app.post("/careerForm", upload.single("file"), createNewForm);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
  