var breakpointMobile = 768,
    intViewportWidth,
    screenType,
    slider,
    slider_api;


window.addEventListener("DOMContentLoaded", function(event) {
  if($('#landingPage').length && getScreenType() == 'desktop'){
    document.querySelector('nav').classList.add('fixed');
    sliderInit();
  }
});

$(window).resize(function(e){
  // e.preventDefault();
  if($('#landingPage').length){
    navStickyToggle();
    slider_api.destroy();
    sliderInit();
  }
});

function getScreenType(){
  intViewportWidth = window.innerWidth;
  (intViewportWidth < breakpointMobile) ? (screenType = 'mobile') : (screenType = 'desktop');
  return screenType;
}

// makes navbar fixed for large screens
function navStickyToggle(){
  if(getScreenType() == 'mobile' && $('nav').hasClass('fixed')){
    $('nav').removeClass('fixed');
  } else if(getScreenType() == 'desktop' && !($('nav').hasClass('fixed'))){
    $('nav').addClass('fixed');
  }
}

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

// $('.slider').glide({
//   // autoplay: 3500,
//   autoplay: false,
//   hoverpause: true, // set to false for nonstop rotate
//   arrowsWrapperClass: 'slider-arrows',
//   // arrowRightText: '',
//   // arrowLeftText: '',
//   arrowRightText: '&rarr;',
//   arrowLeftText: '&larr;'
// });

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

// ====================================
// ==   show/hide buttons on scroll  ==
// ====================================
// Function only runs once, 250ms after the first time a user scrolls
// Runs only on landing page
if($('#landingPage').length){
  // var target =  $('nav').outerHeight();
  var target =  $("#landingPage main div:first-child + div").offset().top;
  var timeout = null;

  $(window).scroll(function () {
      if (!timeout) {
          timeout = setTimeout(function () {
              clearTimeout(timeout);
              timeout = null;
              //adds, removes shadow to navbar
              if(!($('.ui.secondary.menu').hasClass('navShadow')) && $(window).scrollTop() >= 1){
                $('.ui.secondary.menu').addClass('navShadow');
              } else if($('.ui.secondary.menu').hasClass('navShadow') && $(window).scrollTop() == 0){
                $('.ui.secondary.menu').removeClass('navShadow');
              }
              //shows, hides buttonbar
              if ($(window).scrollTop() >= target) {
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
