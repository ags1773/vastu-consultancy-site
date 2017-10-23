var breakpointMobile = 768,
    intViewportWidth,
    screenType;

window.addEventListener("DOMContentLoaded", function(event) {
  if($('#landingPage').length && getScreenType() == 'desktop'){
    document.querySelector('nav').classList.add('fixed');
  }
});

$(window).resize(function(){
  if($('#landingPage').length){
    navStickyToggle();
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
if($('#landingPage').length){
  // var target =  $('nav').outerHeight();
  var target =  $("#landingPage main div:first-child + div").offset().top;
  var timeout = null;

  $(window).scroll(function () {
      if (!timeout) {
          timeout = setTimeout(function () {
              clearTimeout(timeout);
              timeout = null;
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
