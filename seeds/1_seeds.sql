INSERT INTO users (name, username, email, password)
VALUES ('name1', 'username1', 'email1', 'password1'), ('name2', 'username2', 'email2', 'password2'), ('name3', 'username3', 'email3', 'password3'), ('name4', 'username4', 'email4', 'password4'), ('name5', 'username5', 'email5', 'password5');

INSERT INTO catagories (name, description)
VALUES ('Math', 'This catagory is comprised of quizzes that are focused around a mathematical solution'), ('Trivia', 'This category is comprised of quizzes that are focused around popular culture trivia');

INSERT INTO quizzes (catagory_id, name, description, is_private,creator_id)
VALUES (1,'Math for dummies', 'simple math', false,2), (2, 'Trivia for dummies','simple trivia', true, 5);

INSERT INTO questions (quiz_id, question_text, correct_answer_id)
VALUES (1, '3-1x2 = ?', 3), (1, '5-(-2/3) = ?', 7), (2, 'Who played Danny in the movie "Greese"?', 10), (2, 'What hit Sci-Fi Horror movie franchise was chronicling the story of Lt. Ripley played by Sigourney Weaver?', 12), (2, 'What is the name of the novel series adapted into films by J.K. Rowling?', 19);

INSERT INTO answers (question_id, answer_text)
VALUES (1, '4'), (1, '0'), (1, '1'), (2, '4 1/3'), (2, '4 2/3'), (2, '5 1/3'), (2, '5 2/3'), (3, 'Will Smith'), (3, 'Robert Downey Jr.'), (3, 'John Travolta'), (3, 'Tom Cruise'), (4, 'Aliens'), (4, 'Independence Day'), (4, 'Firefly'), (4, 'Serenity'), (5, 'Lord of the Flies'), (5, 'The Hunger Games'), (5, 'Lord of the Rings'), (5, 'Harry Potter');

INSERT INTO results (quiz_id, user_id, correct_answers)
VALUES (1, 4, 2), (2, 3, 2), (1, 2, 1), (2, 2, 1);
