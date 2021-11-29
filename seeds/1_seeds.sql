INSERT INTO users (name, username, email, password, type)
VALUE ('name1', 'username1', 'email1', 'password1', 'admin'), ('name2', 'username2', 'email2', 'password2', 'user'), ('name3', 'username3', 'email3', 'password3', 'user'), ('name4', 'username4', 'email4', 'password4', 'user'), ('name5', 'username5', 'email5', 'password5', 'user5');

INSERT INTO catagories (name, description, status)
VALUE ('Math', 'This catagory is comprised of quizzes that are focused around a mathematical solution', 'active'), ('Trivia', 'This category is comprised of quizzes that are focused around popular culture trivia', 'active');

INSERT INTO quizzes (catagory_id, name description, status, max_time_allowed, destination_email, creator_id)
VALUE (1, 'simple math', 'public', 300000, 'example_email', 2), (2, 'simple trivia', 'private', 300000, 'example_email', 5);


-- // I have zero idea where we are pulling this data from. total_attempts is some kind of wierd join from multiple tables with the count() function. total_a through total_f is a count of some kind of scoring procedure which is also a stat derived from another set of joins.
-- INSERT INTO quiz_statistics (quiz_id, total_attempts, total_a, total_b, total_c, total_d, total_f)
-- VALUE ();


-- //No idea how to implement the following seed. I believe this should have the foreign key question_id instead of quiz_id
-- INSERT INTO question_difficulties (quiz_id, level, number)
-- VALUE ();

-- //////////ORIGINAL QUESTIONS//////////////
-- //I believe this should have foreign key quiz_id instead of question_difficulty_id. I also have no idea where we are storying the wrong answers and how they join with this table
-- INSERT INTO questions (question_difficulty_id, question_text, correct_answer_id)
-- VALUE ();

-- ////////SUGESTED QUESTIONS//////////

INSERT INTO questions (quiz_id, question_text, correct_answer_id)
VALUE (1, '3-1x2 = ?', 3), (1, '5-(-2/3) = ?', 7), (2, 'Who played Danny in the movie "Greese"?', 10), (2, 'What hit Sci-Fi Horror movie franchise was chronicling the story of Lt. Ripley played by Sigourney Weaver?', 12), (2, 'What is the name of the novel series adapted into films by J.K. Rowling?', 19);

INSERT INTO answers (question_id, answer_text)
VALUE (1, '4'), (1, '0'), (1, '1'), (2, '4 1/3'), (2, '4 2/3'), (2, '5 1/3'), (2, '5 2/3'), (3, 'Will Smith'), (3, 'Robert Downey Jr.'), (3, 'John Travolta'), (3, 'Tom Cruise'), (4, 'Aliens'), (4, 'Independence Day'), (4, 'Firefly'), (4, 'Serenity'), (5, 'Lord of the Flies'), (5, 'The Hunger Games'), (5, 'Lord of the Rings'), (5, 'Harry Potter');

INSERT INTO results (quiz_id, user_id, attempt_number, start_date, end_date, correct_answers, total_questions)
VALUE (1, 4, 2, '2021-11-28', '2021-11-28', 2, 2 ), (2, 3, 1, '2021-11-28', '2021-11-28', 2, 3), (1, 2, 1, '2021-11-28', '2021-11-28', 1, 2), (2, 2, 3, '2021-11-28', '2021-11-28', 1, 3);

INSERT INTO result_questions (result_id, question_id, answer_id, correct, answer_date)
VALUE (1, 1, 3, true, '2021-11-28'), (1, 2, 7, true, '2021-11-28'), (2, 3, 10, true, '2021-11-28'), (2, 4, 12, true, '2021-11-28'), (2, 5, 18, false, '2021-11-28'), (3, 1, 1, false, '2021-11-28'), (3, 2, 7, true, '2021-11-28'), (4, 3, 11, false, '2021-11-28'), (4, 4, 15, false, '2021-11-28'), (4, 5, 19, true, '2021-11-28');
