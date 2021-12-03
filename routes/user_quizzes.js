
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      cookieUser: req.session.user_id
    };

    res.render("user_quizzes", templateVars);
  });

  return router;
};
