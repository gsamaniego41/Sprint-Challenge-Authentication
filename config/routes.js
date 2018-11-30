const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticate} = require("./middlewares");
const db = require("../database/dbConfig");

const secret = require("../_secrets/keys");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  console.log(secret.jwtKey);
  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret.jwtKey, options);
}

function register(req, res) {
  // implement user registration
  // console.log(req.body);
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  console.log("creds: line 19", creds);
  // axios
  // .post("/api/register", creds)
  db("users")
    .insert(creds)
    .then(id => res.status(200).json(id))
    .catch(err => console.log(err));
}

function login(req, res) {
  // implement user login
  const creds = req.body;

  db("users")
    .where({username: creds.username}) // why not id: creds.id??
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        console.log("token line 54:", token);
        res.status(200).json({welcome: user.username, token});
      } else {
        res.status(401).json({access: "denied"});
      }
    })
    .catch(err => res.status(500).json({oops: "something went wrong"}));
}

function getJokes(req, res) {
  axios
    .get(
      // "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
      "https://safe-falls-22549.herokuapp.com/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({message: "Error Fetching Jokes", error: err});
    });
}
