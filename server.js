// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const questionsRoutes = require("./routes/questions");
const answersRoutes = require("./routes/answers");
const resultsRoutes = require("./routes/results");
const quizzesRoutes = require("./routes/quizzes");
const categoriesRoutes = require("./routes/categories");
const createRoutes = require("./routes/create");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/questions", questionsRoutes(db));
app.use("/api/answers", answersRoutes(db));
app.use("/api/results", resultsRoutes(db));
app.use("/api/quizzes", quizzesRoutes(db));
app.use("/api/categories", categoriesRoutes(db));
app.use("/create", createRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// app.get("/create", (req, res) => {
//   const templateVars = {
//     // quizId: req.params.id
//   };
//   res.render("create_quiz", templateVars);
// });
