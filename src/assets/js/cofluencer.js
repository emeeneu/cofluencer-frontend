$(document).ready(function() {
  console.log('cofluencer js ready');

  $(window).scroll(function() {
    var topPos = $(this).scrollTop();
    var nav = $('nav');

    if (nav.hasClass('bigNav')) {
      if (topPos > 600) {
        nav.addClass('gradient-reverse-smooth');
        nav.removeClass('navbar-transparent');  
      }
      if (topPos < 600) {
        nav.addClass('navbar-transparent');
        nav.removeClass('gradient-reverse-smooth');
      }
    } else {
      if (topPos > 100) {
        nav.addClass('gradient-reverse-smooth');
        nav.removeClass('navbar-transparent');
      }
      if (topPos < 100) {
        nav.addClass('navbar-transparent');
        nav.removeClass('gradient-reverse-smooth');
      }
    }
  });

  var words = [
    'work.',
    'win.',
    'flow.',
    'be.',
  ];
  var i = 0;

  setInterval(function() {
    $('#changingWord').fadeOut(function() {
      $(this).html(words[i=(i+1)%words.length]).fadeIn();
    });
  }, 2000 );
  
  
  
  


});