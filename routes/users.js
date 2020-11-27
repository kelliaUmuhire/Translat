const express = require("express");
const app = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const keys = require("../config/keys");
const _ = require("lodash");

// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

require("../config/passport")(passport);

// User model
const User = require("../models/User");
const { isEmpty } = require("lodash");

app.get("/", (req, res) => {
  res.send("User");
});

//@route  POST api/users/register
//@desc   Register user
//@access Public
app.post("/register", (req, res) => {
  const { errors } = validateRegisterInput(req.body);
  if (!_.isEmpty(errors)) {
    return res.status(400).send(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).send(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.send(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//@route  POST api/users/login
//@desc   Login user
//@access Public
app.post("/login", (req, res) => {
  const { errors } = validateLoginInput(req.body);
  if (!_.isEmpty(errors)) {
    return res.status(400).send(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  //Find user by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).send(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        const payload = { id: user.id, name: user.name }; // Jwt payload
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: "24h" },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).send(errors);
      }
    });
  });
});

//@route  POST api/users/current
//@desc   return currentuser
//@access Private
app.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

//test post
// app.post('/test',[
//     body('name').not().isEmpty(),
//     body('email').isEmail(),
//     body('password')
//         .isLength({ min: 5 })
//         .custom((value,{req, loc, path}) => {
//             if (value !== req.body.password2) {
//                 // trow error if passwords do not match
//                 throw new Error("Passwords don't match");
//             } else {
//                 return value;
//             }
//         })
// ], (req,res)=>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         console.log(errors);
//         return res.status(400).send(errors);
//     }
//     const user = {
//         name : req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     }
//     res.send(user)
// })

module.exports = app;
