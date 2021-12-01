const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      // quizId: req.params.id
    };
    res.render("create_quiz", templateVars);
  })
  return router;
};

// module.exports = (db) => {
//   router.get("/create", (req, res) => {
//     db.query(``)
//       .then(data => {
//         const quizzes = data.rows;
//         res.json({ create });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });

//   return router;
// };
