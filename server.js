const express = require('express')
const path = require("path");
const mongoose = require("mongoose")
const cors = require("cors");
const dotenv = require("dotenv").config('./env')
const genRes = require('./api/services/genre')
const bodyParser = require('body-parser');

const app = express()

const validator = require("express-joi-validation").createValidator({
    passError: true,
  });
  

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
require('./routes/routes')(app, validator);


app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
    return   res.send(genRes.generateResponse( 400, err.error.message, false, null));
    }
  });
  
  //connecting Data
  mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    })
    .then(() => {
      app.listen(process.env.APP_PORT, () => {
        console.log("server started");
      });
    })
    .catch((err) => {
      console.log(err);
    });