DROP TABLE IF EXISTS answers CASCADE;


CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  correct_answer BOOLEAN DEFAULT false
);

