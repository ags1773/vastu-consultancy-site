var breakpointMobile = 768,
    intViewportWidth,
    screenType,
    slider,
    slider_api;


window.addEventListener("DOMContentLoaded", function(event) {
  if($('#landingPage').length && getScreenType() == 'desktop'){
    document.querySelector('nav').classList.add('fixed');
  }
  if($('#contactUs').length){
    if(getScreenType() == 'desktop'){
      $('#userInput .ui.grid > div').addClass('eight').addClass('wide');
    } else if(getScreenType() == 'mobile'){
      $('#userInput .ui.grid > div').addClass('sixteen').addClass('wide');
    }
  }
  if($('#landingPage').length){
    sliderInit();
    $('.ui.accordion').accordion();
  }
});

$(window).resize(function(e){
  e.preventDefault();
  if($('#landingPage').length){
    navStickyToggle();
    slider_api.destroy();
    sliderInit();
  }
  if($('#contactUs').length){
    setFormWidth();
  }
});

function getScreenType(){
  intViewportWidth = window.innerWidth;
  (intViewportWidth < breakpointMobile) ? (screenType = 'mobile') : (screenType = 'desktop');
  return screenType;
}

function setFormWidth(){
  if(getScreenType() == 'mobile' && $('#userInput .ui.grid > div').hasClass('eight')){
    $('#userInput .ui.grid > div').removeClass('eight').removeClass('wide').addClass('sixteen').addClass('wide');
  } else if(getScreenType() == 'desktop' && $('#userInput .ui.grid > div').hasClass('sixteen')){
    $('#userInput .ui.grid > div').removeClass('sixteen').removeClass('wide').addClass('eight').addClass('wide');
  }
}
// makes navbar fixed for large screens
function navStickyToggle(){
  if(getScreenType() == 'mobile' && $('nav').hasClass('fixed')){
    $('nav').removeClass('fixed');
  } else if(getScreenType() == 'desktop' && !($('nav').hasClass('fixed'))){
    $('nav').addClass('fixed');
  }
}

// $('.ui.accordion').accordion();

// ============================
// ==      Glide JS          ==
// ============================
// Calculates appropriate value for "paddings" parameter for glide carousel
function glidePaddingsCal(){
  let n = 0.5*(window.innerWidth) - 200;
  if(n < 10){
    n = 10;
  }
  return n;
}
function sliderInit(){
  slider = $('#Glide').glide({
    type: "carousel",
    mode: "horizontal",
    paddings: glidePaddingsCal(),
    hoverpause: true,
    autoplay: 3500
  });
	slider_api = slider.data('glide_api');
}

// ============================
// ==      page scrolling    ==
// ============================
$(".scrollLink").click(function(e) {
      // Prevent a page reload when a link is pressed
    e.preventDefault();
      // Call the scroll function
    goToByScroll(this.id);
});
function goToByScroll(id){
      // Remove "link" from the ID
    id = id.replace("Link", "");
      // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        300);
}

// ========================
// ==   scroll events    ==
// ========================
if($('#landingPage').length){
  // var target =  $('nav').outerHeight();
  var target =  $("#landingPage main div:first-child + div").offset().top;
  var timeout = null;

  $(window).scroll(function () {
    //adds, removes shadow to navbar
    var navbar = $('.ui.secondary.menu');
    var distToTop = $(window).scrollTop();

    if(!(navbar.hasClass('navShadow')) && distToTop >= 1){
      navbar.addClass('navShadow');
    } else if(navbar.hasClass('navShadow') && distToTop == 0){
      navbar.removeClass('navShadow');
    }
    //runs once, 250ms after the first time a user scrolls
    if (!timeout) {
      timeout = setTimeout(function () {
        clearTimeout(timeout);
        timeout = null;
        console.log('test');
        //shows, hides buttonbar
        if (distToTop >= target) {
            if($('.buttonBar').hasClass('hideElement')){
              $('.buttonBar').addClass('showElement').removeClass('hideElement');
            }
        } else{
          if($('.buttonBar').hasClass('showElement')){
            $('.buttonBar').addClass('hideElement').removeClass('showElement');
          }
        }
      }, 250);
    }
  });
}
