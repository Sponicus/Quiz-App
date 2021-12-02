const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user = req.session.user_id;
    db.query(`
      SELECT quizzes.id AS quiz_id, quizzes.name AS quiz_name, quizzes.description AS description, users.name AS user_name
      FROM quizzes
      JOIN users ON users.id = creator_id
      WHERE users.id = $1;
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
    res.render("user_quizzes")
  });

  return router;
};
