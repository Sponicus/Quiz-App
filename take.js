const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const genShortURL = generateRandomString();



    db.query(`
      INSERT INTO results (quiz_id, user_id, total_correct)
      VALUES (?, 1, ?);;
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

  return router;
};
