// Client facing scripts here

// To show/hide extra menus when hamburger is clicked
$('#hamburger').click(() => {
  if ($('.navbar-pages').css('display') === 'none') {
    $('.navbar-pages').css('display', 'block');
  } else {
    $('.navbar-pages').css('display', 'none');
  }
});
