var breakpointMobile = 768,
    intViewportWidth,
    screenType,
    slider,
    slider_api;


window.addEventListener("DOMContentLoaded", function(event) {
  $('.ui.dropdown').dropdown();

  if($('#landingPage').length && getScreenType() == 'desktop'){
    document.querySelector('nav').classList.add('fixed');
  }
  if($('#landingPage').length){
    sliderInit();
    $('.ui.accordion').accordion();
  }
  if($('#customerData').length){
    var today = new Date();
    $('#rangeStart').calendar({
      type: 'date',
      today: true,
      endCalendar: $('#rangeEnd'),
      // minDate:,
      maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
    });
    $('#rangeEnd').calendar({
      type: 'date',
      today: true,
      startCalendar: $('#rangeStart'),
      //minDate:
      maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
    });
  }
});

$(window).resize(function(e){
  e.preventDefault();
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

// enable/disable form submit button on contact-us page
$('#contactUs #userInput .ui.checkbox input').change(function(){
  if(this.checked && $('#userInput .ui.button').hasClass('disabled')){
    $('#userInput .ui.button').removeClass('disabled');
  } else if(!this.checked && !($('#userInput .ui.button').hasClass('disabled'))){
    $('#userInput .ui.button').addClass('disabled');
  }
});

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

// ==============================
// ==  Click auto scrolling    ==
// ==============================
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

    // if(getScreenType() == "desktop"){
    //   if(!(navbar.hasClass('navShadow')) && distToTop >= 1){
    //     navbar.addClass('navShadow');
    //   } else if(navbar.hasClass('navShadow') && distToTop == 0){
    //     navbar.removeClass('navShadow');
    //   }
    // }
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
