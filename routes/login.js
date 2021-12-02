const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      // userID: req.params.id
    };
    res.render("login", templateVars);
  })
  return router;
};
