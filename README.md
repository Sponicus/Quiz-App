Quizzle Quiz App
=========

Full stack web app built in 6 days as the midterm group project (85% completed). The app lets you create and take quizzes as well as share your quiz results with friends. Users can make their created quizzes public which appears on the home page of all users or private.

## Final Product

!["Screenshot of the home page"](https://github.com/Sponicus/Quiz-App/blob/master/docs/home-page.png?raw=true)

!["Screenshot of the trivia quiz"](https://github.com/Sponicus/Quiz-App/blob/master/docs/trivia-quiz.png?raw=true)

!["Screenshot of your trivia quiz results"](https://github.com/Sponicus/Quiz-App/blob/master/docs/trivia-results.png?raw=true)

!["Screenshot of your friend's trivia quiz results"](https://github.com/Sponicus/Quiz-App/blob/master/docs/trivia-results-logged-out.png?raw=true)

!["Screenshot of the create quiz page"](https://github.com/Sponicus/Quiz-App/blob/master/docs/create-spider-man-quiz.png?raw=true)

!["Screenshot of my quizzes page"](https://github.com/Sponicus/Quiz-App/blob/master/docs/my-quizzes.png?raw=true)

!["Screenshot of the Spider-Man quiz"](https://github.com/Sponicus/Quiz-App/blob/master/docs/spider-man-quiz.png?raw=true)

<p align="center">
  <img src="https://github.com/Sponicus/Quiz-App/blob/master/docs/mobile-view.png?raw=true" width=50% height=50% alt="Screenshot of mobile view of the home page">
</p>

## Getting Started

1. Fork the repository to your GitHub account
2. Clone the repository onto your local device
3. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
4. Update the .env file with your correct local information including:
  - Database username 
  - Database password
  - Database name
5. Install dependencies: `npm i`
6. Fix to binaries for sass: `npm rebuild node-sass`
7. Reset database: `npm run db:reset`
8. Run the server: `npm run local`
9. Visit `http://localhost:8080/` in your browser

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG
- bcrypt
- cookie-parser
- cookie-session
- EJS
- Express
- Sass
