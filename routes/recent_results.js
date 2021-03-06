const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user = req.session.user_id
    console.log(user);
    let query = `
    SELECT quizzes.name, (100*results.total_correct/test1.total_questions) as score
    FROM results
    JOIN (SELECT quiz_id, count(questions.*) as total_questions FROM questions GROUP BY quiz_id) test1 ON results.quiz_id = test1.quiz_id
    JOIN quizzes ON quizzes.id = results.quiz_id
    JOIN users ON users.id = results.user_id
    WHERE results.user_id = $1
    ORDER BY results.id
    LIMIT 3;`
    db.query(query, [user])
      .then(data => {
        const results = data.rows;
        res.json({ results });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};


