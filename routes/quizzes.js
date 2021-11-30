const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`
      SELECT quizzes.id AS quiz_id,quizzes.name AS quiz_name, quizzes.description AS description, users.name AS user_name, questions.id AS qid, questions.question_text as question FROM quizzes
      JOIN users ON users.id = creator_id
      JOIN questions ON quizzes.id = quiz_id;
    `)
      .then(data => {
        const quizzes = data.rows;
        res.json({ quizzes });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/take", (req, res) => {
    db.query(`
      SELECT answers.answer_text AS answer FROM questions
      JOIN answers ON questions.id = question_id
      WHERE question_id = ;
    `)
      .then(data => {
        const quiz = data.rows;
        res.json({ quiz });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

/*
SELECT quizzes.id AS quiz_id,quizzes.name AS quiz_name, quizzes.description AS description, users.name AS user_name FROM quizzes
      JOIN users ON users.id = creator_id;
*/
