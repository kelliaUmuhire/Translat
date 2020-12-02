const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");

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
