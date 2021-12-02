const express = require('express');
const router  = express.Router();

module.exports = () => {
  // do I need a router.get????
    // router.post should handle the post request for POST /logout
      //redirect to either "/login" or "/"
  router.post("/", (req, res) => {
    console.log("look at me!");
    req.session = null;
    res.redirect("/");
  })
  return router;

};
