const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const passport = require("passport");

router.get("/", (req, res) => {
  console.log("testing");
  res.send("Testing profile");
});

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

module.exports = router;
