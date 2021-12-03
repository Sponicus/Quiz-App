const { generateRandomString } = require('./public/scripts/helpers');

// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");
const bcrypt = require('bcrypt');

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
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const questionsRoutes = require("./routes/questions");
const answersRoutes = require("./routes/answers");
const resultsRoutes = require("./routes/results");
const quizzesRoutes = require("./routes/quizzes");
const submitQuizResult = require ("./routes/take");
const createRoutes = require("./routes/create");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const registerRoutes = require("./routes/register");
const userQuizzesRoutes = require("./routes/user_quizzes");
const myQuizzesRoutes= require("./routes/my_quizzes")
const myRecentRoutes= require("./routes/recent_results")

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/questions", questionsRoutes(db));
app.use("/api/answers", answersRoutes(db));
app.use("/api/results", resultsRoutes(db));
app.use("/results", resultsRoutes(db));
app.use("/api/quizzes", quizzesRoutes(db));
//app.use("/take/:id",)
app.use("/submitResult", submitQuizResult(db));
app.use("/api/myQuizzes", myQuizzesRoutes(db));
app.use("/api/recentResults", myRecentRoutes(db));
app.use("/create", createRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/logout", logoutRoutes());
app.use("/register", registerRoutes(db));
app.use("/prev", userQuizzesRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/take/:id", async (req, res) => {
  const cookieUserID = req.session.user_id;

  const queryString1 = `
    SELECT quizzes.id AS quiz_id, questions.id AS question_id, quizzes.name AS quiz_name, question_text AS question FROM quizzes
    JOIN users ON users.id = creator_id
    JOIN questions ON quizzes.id = quiz_id
    WHERE questions.quiz_id = ${req.params.id};
  `;

  const queryQuestions = await db.query(queryString1)
  /*.then(res => templateVars['question'] = res.rows)
  .catch(err => console.error('query error', err.message));*/

  // Get the question IDs range related to this quiz ID
  const firstQuestionID = queryQuestions.rows[0].question_id;
  // Number of questions per quiz
  const len = queryQuestions.rows.length;
  const answerOptions = [];

  for (let i = firstQuestionID; i < firstQuestionID + len; i++) {
    const queryString = `
      SELECT answers.* FROM questions
      JOIN answers ON question_id = questions.id
      WHERE questions.id = ${i};
    `;

    const queryAnswers = await db.query(queryString)
    /*.then(res => res.rows)
    .catch(err => console.error('query error', err.message));*/

    answerOptions.push(queryAnswers.rows);
  }

  const templateVars = {
    cookieUser: req.session.user_id,
    quizID: req.params.id,
    quiz_name: queryQuestions.rows[0].quiz_name,
    questions: queryQuestions.rows,
    answers: answerOptions,
    noOfQuestion: len
  };

  res.render("take_quiz", templateVars);
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Quizzle listening on port ${PORT}`);
});

// app.get("/create", (req, res) => {
//   const templateVars = {
//     // quizId: req.params.id
//   };
//   res.render("create_quiz", templateVars);
// });
