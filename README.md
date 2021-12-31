Quizzle Quiz App
=========

Full stack web app built in 6 days as the midterm group project (85% completed). The app lets you create and take quizzes as well as share your quiz results with friends. Users can make their created quizzes public which appears on the home page of all users or private.

## Final Product

!["Screenshot of the home page"]()

!["Screenshot of the trivia quiz"]()

!["Screenshot of your trivia quiz results"]()

!["Screenshot of your friend's trivia quiz results"]()

!["Screenshot of the create quiz page"]()

!["Screenshot of my quizzes page"]()

!["Screenshot of the Spider-Man quiz"]()

!["Screenshot of mobile view of the home page"]()

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
