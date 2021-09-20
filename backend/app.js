const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/Login",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (_) => console.log("Db Connected")
);

const User = require("./model/User");

const app = express();
const SECRETKEY = "qwerty@321";
app.use(bodyParser.json());

const verifyTheToken = (req, res, next) => {
  // getting the token from the header
  const bearer = req.headers["authorization"];
  if (bearer) {
    const bearerToken = bearer.split(" ");
    const token = bearerToken[1];

    jwt.verify(token, SECRETKEY, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.userData = data;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

app.post("/checkin", (req, res) => {
  console.log(req.body);
});

app.post("/delete-user", verifyTheToken, (req, res) => {
  // bloack 2
  console.log("User data block 2:", req.userData);
  res.send("User deleted");
});

app.post("/register", async (req, res) => {
  console.log("Got the register request");
  const { username, password } = req.body;
  const exist = await User.findOne({ email: username });
  if (exist) return res.status(400).send("Email alredy exists");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  console.log("HashPassword: ", hashPassword);

  if (!exist) {
    const newEmploye = new User({
      email: username,
      password: hashPassword,
    });
    const result = await newEmploye.save();
    console.log("Result", result);
    res.send("Email saved");
  }

  console.log(req.body);
});

app.post("/login", async (req, res) => {
  console.log("got the request");
  // check for the username and password
  console.log(req.body);
  const { username, password } = req.body;

  // database authenticate username and password
  const exist = await User.findOne({ email: username });
  if (!exist) {
    res.sendStatus(403);
  }

  const vrify = await bcrypt.compare(password, exist.password);
  if (exist && vrify) {
    const user = {
      username,
      age: 22,
    };
    jwt.sign({ user }, SECRETKEY, (err, token) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          token,
        });
      }
    });
  } else {
    res.sendStatus(403);
    console.log("Error");
  }

  // if (username === "akbarkamran121" && password === "lahore123") {
  //   const user = {
  //     username,
  //     age: 22,
  //   };
  //   jwt.sign({ user }, SECRETKEY, (err, token) => {
  //     if (err) {
  //       res.sendStatus(403);
  //     } else {
  //       res.json({
  //         token,
  //       });
  //     }
  //   });
  // } else {
  //   res.sendStatus(403);
  // }
});

app.listen(8080, () => {
  console.log("Server started at port 8080");
});

/**
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiY29kZXJzaW5naCIsImFnZSI6MjJ9LCJpYXQiOjE1NzQyNDUwODh9.WI4JkvIMVer45766QyMQrdJgpGKurtB5TQeuyIcQQk0
 */
