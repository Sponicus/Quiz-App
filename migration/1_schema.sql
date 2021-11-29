CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(255),username VARCHAR(255), email VARCHAR(255), password VARCHAR(255));

CREATE TABLE catagories (id SERIAL PRIMARY KEY, name VARCHAR(255), description TEXT);

CREATE TABLE quizzes (id SERIAL PRIMARY KEY, catagory_id INTEGER, name VARCHAR(255), description TEXT, is_private BOOLEAN, creator_id VARCHAR(255));

CREATE TABLE questions (id SERIAL PRIMARY KEY, quiz_id INTEGER,  question_text TEXT, correct_answer_id INTEGER);

CREATE TABLE answers (id SERIAL PRIMARY KEY, question_id INTEGER, answer_text TEXT);

CREATE TABLE results (id SERIAL PRIMARY KEY, quiz_id INTEGER, user_id INTEGER, correct_answers INTEGER);

