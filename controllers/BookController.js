const mongoose = require("mongoose");
const fs = require("fs");
const _ = require("lodash");

const Book = require("../models/Book");
const User = require("../models/User");
const { isArray, toArray } = require("lodash");
const { resolveNaptr } = require("dns");

// const path = require('../public/')

let newUpBook = new Book({});

const getFileName = (str) => {
  return str.split("\\").pop().split("/").pop();
};

const BookController = {
  testBooks(req, res) {
    console.log(req.user);
    res.send("Working");
  },

  uploadBook(req, res) {
    let file = req.files[0];
    if (file.fieldname == "book") {
      newUpBook.bookURL = file.path;
    } else if (file.fieldname == "bookCover") {
      newUpBook.bookCover = file.path;
    }

    console.log(newUpBook);
    res.send(req.files);
  },

  addDetails(req, res) {
    newUpBook.author = req.body.author;
    newUpBook.title = req.body.title;
    newUpBook.translate = req.body.translate;
    User.findOne({ _id: req.user.id })
      .then((user) => {
        newUpBook.userId = user._id;
        console.log(newUpBook);
        newUpBook
          .save()
          .then((book) => {
            console.log(book);
            res.send(book);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },

  getUserBooks(req, res) {
    Book.find({ userId: req.user.id })
      .then((books) => res.send(books))
      .catch((err) => console.log(err));
  },

  deleteBook(req, res) {
    Book.findByIdAndDelete({ _id: req.params.bookId })
      .then((book) => {
        if (book) {
          // res.send(book);
          fs.unlinkSync("public/bookCover/" + getFileName(book.bookCover));
          //  console.log('deleting!!!!!!!!!!!!!!')
          if (book.bookURL !== "db") {
            fs.unlinkSync("public/book/" + getFileName(book.bookURL));
            res.send(book);
          } else {
            Chapter.deleteMany({ book_id: req.params.bookId }).then(
              (chapter) => {
                console.log("Deleting chapters");
                Page.deleteMany({ book_id: req.params.bookId })
                  .then((page) => {
                    console.log("Book deleted!");
                    res.send({ success: true });
                  })
                  .catch((err) => console.log(err));
              }
            );
          }
        } else {
          res.send("book not found");
        }
      })
      .catch((err) => console.log(err));
  },

  async getOne(req, res) {
    await Book.findById(
      { _id: req.params.bookId },
      "_id userId title author bookCover bookURL date bookLanguage translateLang"
    )
      .then((book) => {
        if (book) {
          res.send(book);
        } else {
          res.send("not");
        }
      })
      .catch((err) => console.log(err));
  },

  ///Publishing///////
  publishBook(req, res) {
    Book.findByIdAndUpdate(
      { _id: req.params.bookId },
      { published: true }
    ).then((book) => {
      console.log("Book published!");
      res.send(book);
    });
  },

  temporarlyGet(req, res) {
    let data = [];
    Book.find({ userId: req.user.id })
      .then((books) => {
        res.send(books);
      })
      .catch((err) => console.log(err));
  },

  getBrowserBooks(req, res) {
    Book.find({ published: true })
      .then((books) => res.send(books))
      .catch((err) => console.log(err));
  },
  BookForTranslation(req, res) {
    Book.find({ published: true, translate: true })
      .then((books) => {
        console.log(books);
        res.send(books);
      })
      .catch((err) => console.log(err));
  },

  async getByLanguage(req, res) {
    let len = req.query.languages.length;

    let data = [];
    for (let i = 0; i < len; i++) {
      await Book.find({
        published: true,
        bookLanguage: req.query.languages[i],
      })
        .then((books) => {
          // console.log(book);
          data = data.concat(books);
        })
        .catch((err) => console.log(err));
    }
    // console.log(data);
    res.send(data);
  },

  async searchBook(req, res) {
    var regex = new RegExp(req.params.name, "i");
    Book.find({ published: true, title: regex })
      .then((book) => res.send(book))
      .catch((err) => console.log(err));
  },

  updateBookField(req, res) {
    Book.findByIdAndUpdate(
      { _id: req.body.bookId },
      { [req.body.field]: req.body.newvalue },
      { new: true }
    )
      .then((book) => {
        console.log(book);
        res.send(book);
      })
      .catch((err) => console.log(err));
  },
};

module.exports = BookController;
