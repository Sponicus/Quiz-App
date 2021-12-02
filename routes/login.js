const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      user: null
    };
    res.render("login", templateVars);
  })

  router.post("/", (req,res) => {
    const {username, password} = req.body;
    db.query(`SELECT id, username, password FROM users WHERE username = $1 AND password = $2`, [username, password])
    .then(userRes => {
      console.log(userRes.rows[0].id);
      console.table(userRes.rows[0]);
      if (userRes.rows[0].id) {
        req.session.user_id = userRes.rows[0].id
      }
      res.redirect("/");
    })
    .catch((err) => {
      res.send("something went wrong");
    })
  })

  return router;
};
