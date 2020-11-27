const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const passport = require("passport");
const Book = require("../models/Book");
const Library = require("../models/Library");
const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("This is the temporaly library api");
});

//@route  GET api/library/:userId
//@desc   Get user library
//@access Public temporary
router.get("/:userId", (req, res) => {
  Library.findOne({ userId: req.params.userId })
    .then((lib) => {
      res.send(lib);
    })
    .catch((err) => console.log(err));
});

//@route  GET api/library/:username
//@desc   Get user library //first searching the name then id
//@access Public temporary
router.get("/getbyname/:handle", (req, res) => {
  User.findOne({ name: req.params.handle })
    .then((user) => {
      Library.findOne({ userId: user._id })
        .then((lib) => {
          res.send(lib);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

//@route  POST api/library/:userId
//@desc   add book to user library
//@access Private
router.post(
  "/:bookId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Library.findOne({ userId: req.user._id })
      .then((user) => {
        let newBooks = [...user.books];
        newBooks.push(req.params.bookId);
        Library.findByIdAndUpdate(
          { _id: user.id },
          { books: newBooks },
          { new: true }
        )
          .then((lib) => {
            console.log("New book added!");
            res.send(lib);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);

//@route  POST api/library
//@desc   new lib
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // let newLib = {
    //     userId: req.body.userId,
    //     books: []
    // }
    const newLib = new Library({
      userId: req.user.id,
      books: [],
    });

    newLib
      .save()
      .then((lib) => res.send(lib))
      .catch((err) => console.log(err));
  }
);

//@route  POST api/library/:bookId
//@desc   new lib
//@access Private
// router.post("/")

module.exports = router;

//library
//
//
