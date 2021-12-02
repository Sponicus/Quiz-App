DROP TABLE IF EXISTS results CASCADE;

CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  short_url TEXT,
  total_correct  INTEGER DEFAULT 0
);
