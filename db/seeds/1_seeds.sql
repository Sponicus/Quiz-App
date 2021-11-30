INSERT INTO users (name, username, email, password)
VALUES ('name1', 'username1', 'email1', 'password1'), ('name2', 'username2', 'email2', 'password2'), ('name3', 'username3', 'email3', 'password3'), ('name4', 'username4', 'email4', 'password4'), ('name5', 'username5', 'email5', 'password5');

INSERT INTO categories (name, description)
VALUES ('Math', 'This category is comprised of quizzes that are focused around a mathematical solution'), ('Trivia', 'This category is comprised of quizzes that are focused around popular culture trivia');

INSERT INTO quizzes (category_id, name, description, is_private,creator_id)
VALUES (1,'Math for dummies', 'simple math', false,2), (2, 'Trivia for dummies','simple trivia', true, 5);

INSERT INTO questions (quiz_id, question_text)
VALUES (1, '3-1x2 = ?'), (1, '5-(-2/3) = ?'), (2, 'Who played Danny in the movie "Greese"?'), (2, 'What hit Sci-Fi Horror movie franchise was chronicling the story of Lt. Ripley played by Sigourney Weaver?'), (2, 'What is the name of the novel series adapted into films by J.K. Rowling?');

INSERT INTO answers (question_id, answer_text, correct_answer)
VALUES (1, '4', false), (1, '0', false), (1, '1', true), (2, '4 1/3', false), (2, '4 2/3', false), (2, '5 1/3', false), (2, '5 2/3', true), (3, 'Will Smith', false), (3, 'Robert Downey Jr.', false), (3, 'John Travolta', true), (3, 'Tom Cruise', false), (4, 'Aliens', true), (4, 'Independence Day', false), (4, 'Firefly', false), (4, 'Serenity', false), (5, 'Lord of the Flies', false), (5, 'The Hunger Games', false), (5, 'Lord of the Rings', false), (5, 'Harry Potter', true);

INSERT INTO results (quiz_id, user_id, total_correct)
VALUES (1, 4, 2), (2, 3, 2), (1, 2, 1), (2, 2, 1);
