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
var user1;
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

app.post("/checkin", async (req, res) => {
  // console.log(user1);
  console.log(req.body);
  // const exist = await User.findOne({ email: user1 });
  // var id = exist.id;
  // console.log("id", id);

  // User.updateOne({ _id: id }, { checkIn: req.body.checkInTime }).then(
  //   console.log("Data Updated")
  // );
});
app.post("/checkout", (req, res) => {
  console.log(user1);
  console.log(req.body);
});

app.post("/request", (req, res) => {
  console.log(req.body);
});

app.post("/report", (req, res) => {
  console.log(req.body);
});
app.post("/break", (req, res) => {
  console.log(req.body);
});

app.post("/register", async (req, res) => {
  console.log("Got the register request");
  console.log(req.body);
  const { username, password, firstName1, lastName1 } = req.body;
  const exist = await User.findOne({ email: username });
  if (exist) return res.status(400).send("Email alredy exists");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  console.log("HashPassword: ", hashPassword);

  if (!exist) {
    const newEmploye = new User({
      firstName: firstName1,
      lastName: lastName1,
      email: username,
      password: hashPassword,
      checkIn: "00:00:00",
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
  user1 = username;

  // database authenticate username and password
  const exist = await User.findOne({ email: username });
  if (!exist) {
    res.sendStatus(403);
  }

  const vrify = await bcrypt.compare(password, exist.password);
  if (exist && vrify) {
    const user = {
      username,
      firstName: exist.firstName,
      lastName: exist.lastName,
    };
    jwt.sign({ user }, SECRETKEY, (err, token) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          token,
          firstName: exist.firstName,
          lastName: exist.lastName,
        });
      }
    });
  } else {
    res.sendStatus(403);
    console.log("Error");
  }
});

app.listen(8080, () => {
  console.log("Server started at port 8080");
});
