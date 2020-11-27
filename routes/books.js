const express = require("express"),
  multer = require("multer"),
  uuidv4 = require("uuid/v4"),
  path = require("path"),
  router = express.Router();
passport = require("passport");

const authenticateToken = require("../middleware/authenticateToken");
const BookController = require("../controllers/BookController");
const Book = require("../models/Book");

const DIR = "/home/ic/Documents/Translat/public/";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR + file.fieldname);
    // cb(null, DIR)
  },
  filename: function (req, file, cb) {
    console.log(file.mimetype);
    // cb(null, file.fieldname + '-' + Date.now())
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

router.post(
  "/sendcover",
  passport.authenticate("jwt", { session: false }),
  upload.any(),
  BookController.getCover
);

router.post(
  "/createbook",
  passport.authenticate("jwt", { session: false }),
  BookController.createBook
);

router.post(
  "/addchapter",
  passport.authenticate("jwt", { session: false }),
  BookController.createChapter
);

router.post(
  "/addpage",
  passport.authenticate("jwt", { session: false }),
  BookController.createPage
);

router.get("/getbook/:id", BookController.getBook);

router.get("/getpagesinchap/:chapterId", BookController.getPagesOfChapter);

router.post("/updatepage/:pageId", BookController.updatePage);

router.post("/deletebook/:bookId", BookController.deleteBook);

router.post("/deletechapter/:chapId", BookController.deleteChapter);

router.post("/deletepage/:pageId", BookController.deletePage);

router.get("/getall/:bookId", BookController.getEverything);

router.get("/bookcontent/:bookId", BookController.bookContent);

router.get("/getpage/:pageId", BookController.getPage);

router.post("/updatechapter/:chapterId", BookController.updateChapter);

router.get("/getone/:bookId", BookController.getOne);

//Publishing
router.post("/publishpage/:pageId", BookController.publishPage);
router.post("/publishchapter/:chapterId", BookController.publishChapter);
router.post("/publishbook/:bookId", BookController.publishBook);

router.get(
  "/tempget",
  passport.authenticate("jwt", { session: false }),
  BookController.temporarlyGet
);

router.get("/browserbooks", BookController.getBrowserBooks);

module.exports = router;
