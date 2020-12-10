const express = require("express"),
  multer = require("multer"),
  uuidv4 = require("uuid/v4"),
  path = require("path"),
  router = express.Router();
passport = require("passport");

// const authenticateToken = require("../middleware/authenticateToken");
const BookController = require("../controllers/BookController");

const DIR = "/home/ic/Documents/Translat/public/";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR + file.fieldname);
    // cb(null, DIR)
  },
  filename: function (req, file, cb) {
    console.log(file.mimetype);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  BookController.testBooks
);

router.post(
  "/uploadbook",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  BookController.uploadBook
);

router.post(
  "/addDetails",
  passport.authenticate("jwt", { session: false }),
  BookController.addDetails
);

router.get(
  "/selfbooks",
  passport.authenticate("jwt", { session: false }),
  BookController.getUserBooks
);

router.post("/deletebook/:bookId", BookController.deleteBook);

router.get("/getone/:bookId", BookController.getOne);

//Publishing

router.post("/publishbook/:bookId", BookController.publishBook);

router.get(
  "/tempget",
  passport.authenticate("jwt", { session: false }),
  BookController.temporarlyGet
);
// translatebooks;
router.get("/browserbooks", BookController.getBrowserBooks);
router.get("/translatebooks", BookController.BookForTranslation);
router.get("/getbylanguage", BookController.getByLanguage);
router.get("/searchbook/:name", BookController.searchBook);

router.post("/updatefield", BookController.updateBookField);

module.exports = router;
