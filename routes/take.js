const { generateRandomString } = require('../public/scripts/helpers');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.post("/", async (req, res) => {
    const genShortURL = generateRandomString();
    const user = req.session.user_id;

    const results = req.body;
    const firstQuestionID = Object.keys(results)[0];

    // To get the quiz ID for these questions
    const quizId = await db.query(`
      SELECT quiz_id FROM questions
      WHERE id = ${firstQuestionID};
    `);

    let sum = 0;
    try {
      for (let questionID in results) {
        const count = await db.query(`
          SELECT COUNT(*) FROM answers
          WHERE question_id = $1 AND answer_text = $2 AND correct_answer = TRUE;
        `, [questionID, results[questionID]]);

        if (count.rows[0].count == 1) {
            sum++;
          }

        }
    } catch (error) {
      console.log(error);
    }

    db.query(`
      INSERT INTO results (quiz_id, user_id, short_url, total_correct)
      VALUES (${quizId.rows[0].quiz_id}, $1, '${genShortURL}', ${sum});
    `, [user])
      .then(data => {
        const quizzes = data.rows;
        res.json({ quizzes });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

      res.redirect(`/results/${genShortURL}`);
  });

  return router;
};
