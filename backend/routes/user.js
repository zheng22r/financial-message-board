const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(200).json({
          message: "User created successfully!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Failed to create user"
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let returnedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Invalid Password or Email"
        });
      }
      returnedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Invalid Password or Email"
        });
      }
      // Generate Token to keep login status for one hour
      const token = jwt.sign(
        { email: returnedUser.email, userId: returnedUser._id },
        "private_key_testing-asd-asd-asd-asd-asd-asd--sdk-sdk",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: returnedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
});

module.exports = router;
