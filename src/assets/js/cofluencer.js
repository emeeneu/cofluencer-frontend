$(document).ready(function() {
  console.log('cofluencer js ready');
  
  // Nav scroll background color change
  $(window).scroll(function() {
    var pathname = window.location.pathname;
    var topPos = $(this).scrollTop();
    var navPos = $('nav').offset();
    var wrapperHeight = $('header').height();
    var nav = $('#nav');
    var homeNav = $('#home-nav');
    var gradientDiv = $('#gradient');
    var menuLinks = $('.menuLink');
    // Get the background-image of the wrapper only if the path is not the homePage
    var bgWrapper = document.getElementById('bgWrapper');
    if (bgWrapper != null) {
      var style = window.getComputedStyle(bgWrapper, null);
      var bgValue = style.backgroundImage;
      var bgUrl = bgValue.substring(bgValue.indexOf('(') + 1, bgValue.indexOf(')'));
    }

    if (nav.hasClass('bigNav')) {
      if (navPos.top >= wrapperHeight - 200) {
        // nav.addClass('gradient-reverse-smooth');
        nav.removeClass('navbar-transparent');
        gradientDiv.addClass('gradient-opacity');
        nav.css('background-image', 'url(' + bgUrl + ')');
        menuLinks.css('color', 'white');
      }
      if (navPos.top < wrapperHeight - 200) {
        nav.addClass('navbar-transparent');
        gradientDiv.removeClass('gradient-opacity');
        nav.css('background-image', "url('')");
        menuLinks.css('color', '');
      }
    } else if (homeNav.hasClass('smallNav')) {
      if (topPos > 100) {
        homeNav.addClass('gradient-reverse-smooth');
        homeNav.removeClass('navbar-transparent');
        menuLinks.css('color', 'white');
      }
      if (topPos < 100) {
        homeNav.addClass('navbar-transparent');
        homeNav.removeClass('gradient-reverse-smooth');
        menuLinks.css('color', '');
      }
    }
  });

  // Text animation in home page
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
  }, 3000 );

  

  
  
  


});