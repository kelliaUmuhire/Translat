const mongoose = require("mongoose");
const fs = require("fs");
const _ = require("lodash");

const Book = require("../models/Book");
const User = require("../models/User");
const Chapter = require("../models/Chapter");
const Page = require("../models/Page");

// const path = require('../public/')

let newUpBook = new Book({});
let newWriteBook = new Book();

const getFileName = (str) => {
  return str.split("\\").pop().split("/").pop();
};

//{ content: { blocks: [ [Object] ], entityMap: {} } }
// app.post('/content', (req, res) => {
//     data = req.body.content;
//     console.log(data.blocks[0].text)
//     res.send('OK');
// });

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
    newUpBook.uploaded = true;
    User.findOne({ _id: req.user.id })
      .then((user) => {
        newUpBook.userId = user._id;
        console.log(newUpBook);
        newUpBook
          .save()
          .then((book) => res.send(book))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },

  getUserBooks(req, res) {
    Book.find({ userId: req.user.id })
      .then((books) => res.send(books))
      .catch((err) => console.log(err));
  },

  getCover(req, res) {
    let file = req.files[0];
    newWriteBook.bookCover = file.path;
    console.log(file);
    res.send(file);
  },

  createBook(req, res) {
    (newWriteBook.title = req.body.title),
      (newWriteBook.bookURL = "db"),
      (newWriteBook.author = req.body.author),
      (newWriteBook.uploaded = false);

    User.findOne({ _id: req.user.id })
      .then((user) => {
        newWriteBook.userId = user._id;
        const saveBook = new Book(newWriteBook);
        console.log(newWriteBook);
        saveBook
          .save()
          .then((book) => res.send(book))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },

  createChapter(req, res) {
    const newChapter = new Chapter({
      name: req.body.name,
    });
    Book.findOne({ _id: req.body.bookId }).then((book) => {
      if (book) {
        newChapter.book_id = book._id;
        Chapter.findOne({
          book_id: newChapter.book_id,
          name: req.body.name,
        }).then((chap) => {
          ////update
          if (chap) {
            console.log("Updating chapter");
            Chapter.findOneAndUpdate(
              { _id: chap._id },
              { name: req.body.name },
              { new: true }
            )
              .then((chap) => {
                console.log("Chapter updated");
                res.send(chap);
              })
              .catch((err) => console.log(err));
          } else {
            // create new chapter
            Chapter.count({ book_id: book._id }).then((cont) => {
              newChapter.num = cont + 1;
              newChapter
                .save()
                .then((chap) => {
                  let tempChap = {
                    name: chap.name,
                    chapterId: chap._id,
                    pages: [],
                  };
                  console.log("Added new chapter");
                  console.log(tempChap);
                  res.send(tempChap);
                })
                .catch((err) => console.log(err));
            });
          }
        });
      } else {
        res.send("OOps");
      }
    });
  },

  updateChapter(req, res) {
    Chapter.findOneAndUpdate(
      { _id: req.params.chapterId, book_id: req.body.bookId },
      { name: req.body.name },
      { new: true }
    )
      .then((chap) => {
        console.log(chap);
        res.send(chap);
      })
      .catch((err) => console.log(err));
  },

  createPage(req, res) {
    const newPage = new Page({
      content: JSON.stringify(req.body.content),
    });
    //need book_id and chapter_id, got chap_name
    Chapter.findOne({ _id: req.body.chapterId })
      .then((chap) => {
        newPage.chapter_id = chap._id;
        newPage.book_id = chap.book_id;
        newPage.num = ++chap.pageNumber;
        newPage
          .save()
          .then((page) => {
            console.log(page);
            let tempPage = _.pick(page, ["_id", "num"]);
            Chapter.findByIdAndUpdate(
              { _id: req.body.chapterId },
              { pageNumber: chap.pageNumber },
              { new: true }
            )
              .then((ans) => res.send(tempPage))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => res.send(err));
  },

  updatePage(req, res) {
    //body bookId, chapterId, pageNum
    const update = { content: JSON.stringify(req.body.content) };
    // console.log(update);
    Page.findByIdAndUpdate(req.params.pageId, update)
      .then((page) => {
        res.send(page);
      })
      .catch((err) => console.log(err));
  },

  getBook(req, res) {
    //bookId,
    const data = {};
    Book.findById({ _id: req.params.id })
      .then((book) => {
        if (book) {
          data.book = book;
          Chapter.find({ book_id: book._id }).then((chaps) => {
            if (chaps) {
              data.chaps = chaps;
              Page.find({
                chapter_id: chaps[0]._id,
                book_id: chaps[0].book_id,
              }).then((pages) => {
                data.pages = pages;
                res.send(data);
              });
            } else {
              res.send("no chapters");
            }
          });
        } else {
          res.send("Book not found");
        }
      })
      .catch((err) => console.log(err));
  },

  getPagesOfChapter(req, res) {
    //body, bookId, chapNum, pageNum
    Chapter.findById({ _id: req.params.chapterId }).then((chap) => {
      //temp
      Page.find({ chapter_id: chap._id })
        .then((pages) => res.send(pages))
        .catch((err) => console.log(err));
    });
  },

  getPage(req, res) {
    Page.findById({ _id: req.params.pageId })
      .then((page) => res.send(page))
      .catch((err) => console.log(err));
  },

  getEverything(req, res) {
    //bookId
    const data = {
      book: {},
      chapters: [],
    };

    let temp = {};
    Book.findById({ _id: req.params.bookId })
      .then((book) => {
        data.book.name = book.title;
        data.book.author = book.author;
        data.book.bookId = book._id;
        Chapter.find({ book_id: req.params.bookId })
          .then((chaps) => {
            // data.chapters = chaps;
            for (let i = 0; i < chaps.length; i++) {
              Page.find({ chapter_id: chaps[i]._id })
                .then((page) => {
                  //   data.chapters[i].pages = page;
                  //   data.pages = page;
                  temp = {
                    name: chaps[i].name,
                    chapterId: chaps[i]._id,
                    pages: page,
                  };
                  data.chapters.push(temp);
                  //   console.log(i);
                  if (i == chaps.length - 1) {
                    console.log(`${i}==${chaps.length - 1}`);
                    res.send(data);
                  }
                })
                .catch((err) => console.log(err));
            }
            // res.send(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },

  deleteBook(req, res) {
    Book.findByIdAndRemove({ _id: req.params.bookId })
      .then((book) => {
        res.send(book);
        fs.unlinkSync("public/bookCover/" + getFileName(book.bookCover));
        //  console.log('deleting!!!!!!!!!!!!!!')
        if (book.bookURL !== "db") {
          return fs.unlinkSync("public/book/" + getFileName(book.bookURL));
        } else {
          Chapter.deleteMany({ book_id: req.params.bookId }).then((chapter) => {
            console.log("Deleting chapters");
            Page.deleteMany({ book_id: req.params.bookId })
              .then((page) => {
                console.log("Book deleted!");
                res.send({ success: true });
              })
              .catch((err) => console.log(err));
          });
        }
      })
      .catch((err) => console.log(err));
  },

  deleteChapter(req, res) {
    Chapter.findOneAndRemove({ _id: req.params.chapId })
      .then((chap) => {
        Page.deleteMany({ chapter_id: req.params.chapId })
          .then((page) => {
            console.log("Chapter removed!");
            res.send(chap);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },

  deletePage(req, res) {
    Page.findByIdAndRemove({ _id: req.params.pageId })
      .then((page) => {
        // Chapter.update({ _id: page.chapter_id }, { $inc: { pageNumber: +1 } });
        // Page.update({ chapter_id: page.chapter_id }, { $inc: { num: -1 } });
        Chapter.findByIdAndUpdate(
          { _id: page.chapter_id },
          { $inc: { pageNumber: -1 } }
        ).then((chap) => {
          for (let i = 0; i < chap.pageNumber; i++) {
            Page.findOneAndUpdate(
              { chapter_id: page.chapter_id, num: i + 1 },
              { $inc: { num: -1 } }
            );
          }
          console.log("All set");
          res.send(page);
        });
      })
      .catch((err) => console.log(err));
  },

  bookContent(req, res) {
    let content = {
      book: {},
      chapters: [],
    };
    Book.findById({ _id: req.params.bookId })
      .then((book) => {
        if (book) {
          content.book.bookName = book.title;
          content.book.author = book.author;
          content.book.bookId = book._id;
          Chapter.find({ book_id: book._id }).then((chaps) => {
            for (let i = 0; i < chaps.length; i++) {
              Page.find({ chapter_id: chaps[i]._id })
                .then((pages) => {
                  //   data.chapters[i].pages = page;
                  //   data.pages = page;
                  let tempPages = pages.map((x) => _.pick(x, ["_id", "num"]));
                  let temp = {
                    name: chaps[i].name,
                    chapterId: chaps[i]._id,
                    pages: tempPages,
                  };
                  // content.chapters.splice(content.chapters.length, 0, temp);
                  let len = content.chapters.length;
                  content.chapters[len] = temp;
                  if (i === chaps.length - 1) {
                    console.log(content);
                    res.send(content);
                  }
                })
                .catch((err) => console.log(err));
            }
            // res.send(content);
          });
        }
      })
      .catch((err) => console.log(err));
  },
};

module.exports = BookController;
