/*
 * All routes for results are defined here
 * Since this file is loaded in server.js into api/results,
 *   these routes are mounted onto /results
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:shortURL", (req, res) => {
    let newestQuizResult;
    const shortURL = req.params.shortURL; // THIS IS CORRECT AND USE AS REFERENCE ON OTHER PAGES
    const user = req.session.user_id;

    db.query(
      `SELECT results.*, quizzes.name, users.name AS username
      FROM results
      JOIN quizzes ON quizzes.id = quiz_id
      JOIN users ON users.id = user_id
      WHERE results.short_url = $1
      ORDER BY results.id DESC
      LIMIT 1;`
      ,[shortURL])
      .then(quizRes => {
        newestQuizResult = quizRes.rows[0];

        let query2 = `SELECT COUNT(questions.id) FROM questions
        JOIN quizzes ON quizzes.id = quiz_id
        WHERE quizzes.id = ${newestQuizResult.quiz_id}`;

        db.query(query2)
          .then(data => {
            const noOfQuestions = data.rows[0];

            const templateVars = {
              user: user,
              quizTakerID: newestQuizResult.user_id,
              quizTaker: newestQuizResult.username,
              quizName: newestQuizResult.name,
              shortURL: newestQuizResult.short_url,
              resultID: newestQuizResult.id,
              numberOfcorrect: newestQuizResult.total_correct,
              total: noOfQuestions.count
            };

            console.log('templateVars is following:', templateVars);
            res.render("quiz_result", templateVars);
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
