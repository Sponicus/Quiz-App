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
        <form method="GET" action="/take/${quiz.quiz_id}">
          <header class="public-quiz-title">${escape(quiz.quiz_name)}</header>
          <p class="public-quiz-header">Description: ${escape(quiz.description)}</p>
          <footer class="public-quiz-header">Created by: ${escape(quiz.user_name)}</footer>
          <button type="submit" class="submit-quiz btn btn-primary">Take quiz</button>
        </form>
      </article>
    `;
  };

  const createMyQuizElement = (quiz) => {
    return `
      <article class="single-quiz">
        <form method="GET" action="/take/${quiz.quiz_id}">
          <header class="public-quiz-title">${escape(quiz.quiz_name)}</header>
          <p class="public-quiz-header">Description: ${escape(quiz.description)}</p>
          <footer class="public-quiz-header">Created by: ${escape(quiz.user_name)}</footer>
          <button type="submit" class="submit-quiz btn btn-primary">Take quiz</button>
        </form>
        <button class="make-public submit-quiz btn btn-primary" data-quiz-id="${quiz.quiz_id}">Make ${quiz.is_private?"public":"private"}</button>
      </article>
    `;
  };

  const createRecentResultsElement = (results) => {
    return `
      <article class="single-result">
        <form method="GET" action="/api/${results.quiz_id}">
        <p>${results.name}</p>
        <p>${results.score}%</p>
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

  const renderMyQuizzes = (quizzes) => {
    // console.log(quizzes)
    const container = $('#user-quizzes-container');
    container.empty(); // Make sure the element with with id="user-quizzes-container" has no text inside it

    for (let quizData of quizzes.quizzes) {
      const $quiz = createMyQuizElement(quizData);
      container.prepend($quiz); // To add it to the page by prepending it inside element with id="user-quizzes-container"
    }

  };

  const renderRecentQuizzes = (results) => {
    const container = $('#recent-results-container');
    for (let resultData of results.results) {
      const $result = createRecentResultsElement(resultData);
      container.prepend($result)
    };
  };

  const loadRecentResults = () => {
    $.ajax({
      method: 'GET',
      url: '/api/recentResults',
      success: function(data) {
        renderRecentQuizzes(data)
      },
      error: function(err) {
        console.log(err);
      }
    });
  };
  loadRecentResults();

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

  const loadMyQuizzes = () => {
    $.ajax({
      method: 'GET',
      url: '/api/myQuizzes',
      success: function(data) {
        renderMyQuizzes(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  };
  loadMyQuizzes()

  $('#user-quizzes-container').on("click", "button.make-public", (event)=>{
    const quiz_id = $(event.target).data("quiz-id")
    // console.log("toggling", quiz_id);
    $.ajax({
      method: 'PATCH',
      url:`/api/myQuizzes/${quiz_id}/toggle`
    }) .then(()=>{
      loadMyQuizzes();
      loadQuizzes();
    })
  })

  let questionTotal = 0;

  const createQuestionElement = () => {
    return `
    <div>
      <label for="question-text">What question would you like to add to the quiz?</label><br>
      <input name="question[${questionTotal}]" placeholder="question"></input><br>
      <label for="answer-text">What answer would you like to add to the question?</label><br>
      <input name="answer[${questionTotal}][]" placeholder="answer"></input><br>
      <label for="correct">correct answer</label>
      <select name="correct[${questionTotal}][]">
        <option value=false>No</option>
        <option value=true>Yes</option>
      </select><br>
      <button type="button" class="submit-quiz btn btn-success hide addAnswer" >Add Answer</button><br>
    </div>`
  };


  const addQuestion = () => {
    const container = $('.quiz-element-container');
    const $question = $($.parseHTML(createQuestionElement()));
    container.append($question);
    const currentQuestionTotal = questionTotal;
    questionTotal++;
    const $answerButton = $question.find('.addAnswer');
    $answerButton.off();
    $answerButton.click((event) => {
      addAnswer(event, currentQuestionTotal);
    });
  }
  const listenQuestion = $(".addQuestion");
  listenQuestion.click(addQuestion);

  const createAnswerElement = (index) => {
    return `
    <div>
      <input name="answer[${index}][]" placeholder="answer"></input><br>
      <label for="correct">correct answer</label>
      <select name="correct[${index}][]">
        <option value=false>No</option>
        <option value=true>Yes</option>
      </select><br>
    </div>`
  };

  const addAnswer = (event, index) => {
    // const button = $('.addAnswer');
    const $answer = createAnswerElement(index);
    $(event.target).before($answer)
  }

  const $answerButton = $('.addAnswer');
  $answerButton.click(addAnswer);
});
