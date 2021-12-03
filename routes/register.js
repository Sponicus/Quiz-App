const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      cookieUser: null
    };
    res.render("register", templateVars);
  })

  router.post("/", (req,res) => {
    const {name, username, email, password} = req.body;
    console.log({name, username, email, password})
    db.query(`INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4)`, [name, username, email, password])
    .then(userRes => {
      res.redirect("/");
    })
    .catch((err) => {
      res.send("something went wrong");
    })
  })

  return router;
};
