const { generateRandomString } = require('../helpers');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.post("/", async (req, res) => {
    const genShortURL = generateRandomString();

    console.log(req.body);

    const results = req.body;
    let sum = 0;
    try {
      for (let questionID in results) {
        const count = await db.query(`
          SELECT COUNT(*) FROM answers
          WHERE question_id = $1 AND answer_text = $2 AND correct_answer = TRUE;
        `, [questionID, results[questionID]]);
        console.log('count:', count);

        if (count.rows[0].count == 1) {
            sum++;
          }

        }
    } catch (error) {
      console.log(error);
    }

    console.log(sum);

    db.query(`
      INSERT INTO results (quiz_id, user_id, total_correct)
      VALUES (?, 1, ${sum});;
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
      res.redirect("/");
      //res.redirect(`/prev/${genShortURL}`);*/
  });

  return router;
};
