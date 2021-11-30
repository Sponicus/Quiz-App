// Client facing scripts here

$(document).ready(function() {

  // To show/hide extra menus when hamburger is clicked
  $('#hamburger').click(() => {
    if ($('.navbar-pages').css('display') === 'none') {
      $('.navbar-pages').css('display', 'block');
    } else {
      $('.navbar-pages').css('display', 'none');
    }
  });

  // Use to prevent cross-site scripting
  const escape = function(puts) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(puts));
    return div.innerHTML;
  };

  const createQuizElement = (quiz) => {
    return `
      <article class="single-quiz">
        <form method="GET" action="/${quiz.quiz_id}">
          <header class="public-quiz-title">${escape(quiz.quiz_name)}</header>
          <p class="public-quiz-header">Description: ${escape(quiz.description)}</p>
          <p class="public-quiz-header">Question: ${escape(quiz.question)}</p>
          <footer class="public-quiz-header">Created by: ${escape(quiz.user_name)}</footer>
          <button type="submit" class="submit-quiz btn btn-primary">Take quiz</button>
          <div id="quiz-cont${quiz.quiz_id}"></div>
        </form>
      </article>
    `;
  };

  const renderQuizzes = (quizzes) => {
    const container = $('#quizzes-container');
    container.empty(); // Make sure the element with with id="quizzes-container" has no text inside it

    for (let quizData of quizzes.quizzes) {
      const $quiz = createQuizElement(quizData);
      container.prepend($quiz); // To add it to the page by prepending it inside element with id="quizzes-container"
    }
  };

  const loadQuizzes = () => {
    $.ajax({
      method: 'GET',
      url: '/api/quizzes',
      success: function(data) {
        renderQuizzes(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  };

  loadQuizzes();

  const renderSingleQuiz = (quizzes) => {
    const container = $('#quizzes-container');
    container.empty(); // Make sure the element with with id="quizzes-container" has no text inside it

    for (let quizData of quizzes.quizzes) {
      const $quiz = createQuizElement(quizData);
      container.prepend($quiz); // To add it to the page by prepending it inside element with id="quizzes-container"
    }
  };

  const loadSingleQuiz = () => {
    $.ajax({
      method: 'GET',
      url: '/api/quizzes',
      success: function(data) {
        renderSingleQuiz(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  };
});
