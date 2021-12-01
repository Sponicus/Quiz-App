const express = require('express');
const router  = express.Router();



module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      // quizId: req.params.id
    };
    res.render("create_quiz", templateVars);
  })

  router.post("/", (req,res) => {
    res.redirect("/create");
  })

  return router;
};



