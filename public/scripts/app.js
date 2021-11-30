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
        <form method="POST" action="/result">
          <header class="public-quiz-title">${escape(quiz.name)}</header>
          <p class="public-quiz-header">Description: ${escape(quiz.description)}</p>
          <footer class="public-quiz-header">Created by creator_id: ${escape(quiz.creator_id)}</footer>
          <button type="submit" class="submit-quiz btn btn-primary">Submit</button>
        </form>
      </article>
    `;
  };

  const renderQuizzes = (quizzes) => {
    const container = $('#quizzes-container');
    container.empty(); // Make sure the element with with id="quizzes-container" has no text inside it
    for (let quizData of quizzes.quizzes) {
      console.log(quizData);
      const $quiz = createQuizElement(quizData);
      container.prepend($quiz); // To add it to the page by prepending it inside element with id="tweets-container"
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
});
