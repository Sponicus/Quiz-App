const express = require('express');
const router  = express.Router();



module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      // quizId: req.params.id
    };
    res.render("create_quiz", templateVars);
  })

  router.post("/", async (req,res) => {
    //set constants for data to be queried
    const {question, answer, description, name="a cool name for quiz"} = req.body;
    console.log({question, answer, description, name})
    const userID= '3'; //placeholder
    try {
      const resQuiz = await db.query(`INSERT INTO quizzes (name, description, is_private, creator_id) VALUES ($1, $2, true, $3) RETURNING id`, [name, description, userID])
        console.log({res: resQuiz})
        const quizID = resQuiz.rows[0].id;
        try {
          for (const q in question) {
            const resQuestions = await db.query(`INSERT INTO questions (quiz_id, question_text) VALUES ($1,$2) RETURNING id`, [quizID, question[q]])
              const questionID = resQuestions.rows[0].id
              try {
                for (const a in answer[q]) {
                  await db.query(`INSERT INTO answers (question_id, answer_text) VALUES ($1, $2)`, [questionID, answer[q][a]])
                }
              } catch (err) {
                console.log(err.stack)
              }
          }
        } catch (err) {
          console.log(err.stack)
        }
      ;
      res.redirect("/create");
    } catch (err) {
      console.log(err.stack)
      res.send('something went wrong!!! :(')
    }
  })

  return router;
};
