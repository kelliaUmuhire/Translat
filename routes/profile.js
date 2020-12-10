const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const DIR = "/home/ic/Documents/Translat/public/profilePics";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
    // cb(null, DIR)
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

/////////
const getFileName = (str) => {
  return str.split("\\").pop().split("/").pop();
};

/////////////////////
router.get("/", (req, res) => {
  console.log("testing");
  res.send("Testing profile");
});

//get current user profile
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Profile.findOne({ userId: req.user.id })
      .then((profile) => res.send(profile))
      .catch((err) => console.log(err));
  }
);

//create profile after register
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ userId: req.user.id }).then((profile) => {
      if (profile) {
        res.send("Profile already exists");
      }
      const newProfile = new Profile({
        userId: req.user.id,
        image: "default",
        location: "",
        hobbies: [],
        handle: req.user.name,
        names: req.user.firstName + " " + req.user.lastName,
        email: req.user.email,
        social: {
          youtube: "",
          instagram: "",
          facebook: "",
          twitter: "",
        },
      });
      newProfile
        .save()
        .then((profile) => res.send(profile))
        .catch((err) => console.log(err));
    });
  }
);

//find user by handle
router.get("/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .then((profile) => {
      res.send(profile);
    })
    .catch((err) => console.log(err));
});

//search profiles
router.get("/searchprofile/:name", (req, res) => {
  const regex = new RegExp(req.params.name, "i");
  Profile.find({ handle: regex })
    .then((profiles) => {
      console.log(profiles);
      res.send(profiles);
    })
    .catch((err) => console.log(err));
});

//edit profile
router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Profile.findOneAndUpdate(
      { userId: req.user.id },
      { $set: req.body },
      { new: true }
    )
      .then((profile) => {
        console.log("Got it");
        res.send(profile);
      })
      .catch((err) => console.log(err));
  }
);

//edit profile pic
router.post(
  "/change-pic",
  passport.authenticate("jwt", { session: false }),
  upload.single("profile-pic"),
  async (req, res) => {
    Profile.findOne({ userId: req.user.id })
      .then((profile) => {
        if (profile.image !== "default") {
          fs.unlinkSync("public/profilePics/" + getFileName(profile.image));
        }
        Profile.findByIdAndUpdate(
          { _id: profile._id },
          { image: req.file.path },
          { new: true }
        )
          .then((profile) => {
            console.log(profile.image);
            res.send(profile);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    // Profile.findOneAndUpdate({ userId: req.user.id }, { image: req.file.path })
    //   .then((profile) => res.send(profile))
    //   .catch((err) => console.log(err));
    // Profile.findOne({userId: req.user.id})
  }
);

module.exports = router;
