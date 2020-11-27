const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
const path = require("path");
const storage = require("node-persist");

// Set up a whitelist and check against it:
// var whitelist = ['http://localhost:3000', 'http://localhost:5000']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

let data = {};

// storage.init({
//     dir: 'data',
//     stringify: JSON.stringify,
//     parse: JSON.parse,
//     encoding: 'utf8'
// }).then(() => {
//     console.log('storage initialized')
// }).catch((e) => {
//     console.log('sotrage initialization failed')
//     console.log(e);
// });

app.use(cors());

app.use(express.static("public"));

mongoose
  .connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello Trans!");
});

require("./models/User");
require("./models/Book");
require("./models/Chapter");
require("./models/Page");
require("./models/Library");
require("./models/Profile");

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.use("/api/books", require("./routes/books"));

app.use("/api/users", require("./routes/users"));
app.use("/api/library", require("./routes/library"));
app.use("/api/profile", require("./routes/profile"));
// app.use('/uploadfile', require('./routes/api/books'));

app.listen(port, () => console.log(`App listening at port ${port}`));

module.exports = app;
