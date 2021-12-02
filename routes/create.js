const express = require('express');
const {generateRandomString} = require("../public/scripts/helpers");
const router  = express.Router();



module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      // userID: req.params.id
    };
    res.render("create_quiz", templateVars);
  })

  router.post("/", async (req,res) => {
    //set constants for data to be queried
    const newURL = generateRandomString();
    const {question, answer, description, name, correct} = req.body;
    console.log({question, answer, description, name, correct})
    let val = 0;
    if (correct) {
      val = 1;
    }
    const userID= '3'; //placeholder
    try {
      const resQuiz = await db.query(`INSERT INTO quizzes (name, description, short_url, is_private, creator_id) VALUES ($1, $2, $3, true, $4) RETURNING id`, [name, description, newURL, userID])
        console.log({res: resQuiz})
        const quizID = resQuiz.rows[0].id;
        try {
          for (const q in question) {
            const resQuestions = await db.query(`INSERT INTO questions (quiz_id, question_text) VALUES ($1,$2) RETURNING id`, [quizID, question[q]])
              const questionID = resQuestions.rows[0].id
              try {
                for (const a in answer[q]) {
                  console.log(correct[q][a])
                  await db.query(`INSERT INTO answers (question_id, answer_text, correct_answer) VALUES ($1, $2, $3)`, [questionID, answer[q][a], correct[q][a]])
                }
              } catch (err) {
                console.log(err.stack)
              }
          }
        } catch (err) {
          console.log(err.stack)
        }
      ;
      res.redirect("/");
    } catch (err) {
      console.log(err.stack)
      res.send('something went wrong!!! :(')
    }
  })

  return router;
};
