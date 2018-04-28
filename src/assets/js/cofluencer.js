$(document).ready(function() {
  console.log('cofluencer js ready');

  $(window).scroll(function() {
    var topPos = $(this).scrollTop();
    var nav = $('#home-nav');
    if (topPos > 100) {
      nav.addClass('gradient-reverse-smooth');
      nav.removeClass('navbar-transparent');
    }
    if (topPos < 100) {
      nav.addClass('navbar-transparent');
      nav.removeClass('gradient-reverse-smooth');
    }
  });
  
  
  
  


});