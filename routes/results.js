/*
 * All routes for results are defined here
 * Since this file is loaded in server.js into api/results,
 *   these routes are mounted onto /results
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log('The req.body is equal to:', req.body);

    /*let query = `SELECT results.total_correct,  FROM results
      JOIN quizzes ON quizzes.id = quiz_id
      JOIN users ON users.id = user_id
      WHERE quiz_id = 2 AND users.id = 3`;
    console.log(query);
    db.query(query)
      .then(data => {
        const results = data.rows;
        res.json({ results });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });*/


      /*const templateVars = {
        quizName: ,
        shortURL: ,
        numberOfcorrect: ,
        total:
      };*/

      res.render("quiz_result", templateVars);
  });
  return router;
};
