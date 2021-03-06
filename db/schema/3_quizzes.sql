DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  short_url TEXT,
  is_private BOOLEAN DEFAULT true,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
