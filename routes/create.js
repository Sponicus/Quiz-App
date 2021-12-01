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
    // console.log(req.body.question);
    // const questions = req.body.question;
    // const answers = req.body.answers;
    // const userVals = '3' //placeholder
    // const currentUser = db.query(`SELECT users.id FROM users WHERE users.id = 1$`, [userVals])
    // const currentQuiz = db.query(`INSERT INTO quizzes VALUES () `)
    // for (const question of questions) {INSERT INTO questions VALUES ()}    //loop through qArray
    //   //insert questions in DB
    //   //Query its ID
    //   //.then
    //   //For EachLoop through Questions
    //     //insert answers into DB
    res.redirect("/create");
  })

  return router;
};



// router.get("/", (req, res) => {
//   db.query(`SELECT * FROM categories;`)
//     .then(data => {
//       const categories = data.rows;
//       res.json({ categories });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });
// return router;
// };
