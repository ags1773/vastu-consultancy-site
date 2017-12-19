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
  if($('#customerData').length || $('#archivesPage').length || $('#trashPage').length){
    let idsQueue = new Array();
    var sendDataOverPipeline = function(dataObj, formAction, pipelineAction){
      idsQueue.length = 0;
      let j = 0;
      for(let i=0; i<dataObj.length; i++){
        if($($("tbody tr input[type='checkbox']")[i]).hasClass('checked')){
          idsQueue[j] = dataObj[i]._id;
          j++;
        }
      }
      if(idsQueue.length){
        $("#pipeline").attr("method", "POST");
        $("#pipeline").attr("action", (formAction + "?_method=PUT"));
        $("#pipeline input:nth-child(1)").val(idsQueue);
        $("#pipeline input:nth-child(2)").val(pipelineAction);
        $("#pipeline").submit();
      }
    }

    //adds and removes "checked" class to checkboxes
      $('tbody tr input[type="checkbox"]').click(function(){
        if(this.checked){
          $(this).addClass('checked');
        } else{
          $(this).removeClass('checked');
        }
      });

    // checkbox select all
      $('thead tr:nth-child(1) input[type="checkbox"]').click(function(){
        if(this.checked){
          $('tbody tr input[type="checkbox"]').addClass('checked').prop( "checked", true );
        } else{
          $('tbody tr input[type="checkbox"]').removeClass('checked').prop( "checked", false );
        }
      });

    //calendar settings
    let today = new Date();
    $('#rangeStart').calendar({
      type: 'date',
      today: true,
      monthFirst: false,
      formatter: {
        date: function (date, settings) {
          if (!date) return '';
          let dd = date.getDate();
          let mm = date.getMonth() + 1;
          let yyyy = date.getFullYear();
          return yyyy + '-' + mm + '-' + dd;
        }
      },
      endCalendar: $('#rangeEnd'),
      maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
    });
    $('#rangeEnd').calendar({
      type: 'date',
      today: true,
      monthFirst: false,
      formatter: {
        date: function (date, settings) {
          if (!date) return '';
          let dd = date.getDate();
          let mm = date.getMonth() + 1;
          let yyyy = date.getFullYear();
          return yyyy + '-' + mm + '-' + dd;
        }
      },
      startCalendar: $('#rangeStart'),
      maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
    });

    if($('#customerData').length){
      if("custRecord" in mainGlobalObject){
        $("#cust2trash").on("click", function(){
          sendDataOverPipeline(mainGlobalObject.custRecord, "/customerdata/trash", "custToTrash");
        });
        $("#cust2arch").on("click", function(){
          sendDataOverPipeline(mainGlobalObject.custRecord, "/customerdata/archives", "custToArchive");
        });
      } else{
        console.log("'custRecord' property of 'mainGlobalObject' not found!")
      }
    }
    if($('#archivesPage').length){
      if("archivedRecord" in mainGlobalObject){
        $("#arch2trash").on("click", function(){
          sendDataOverPipeline(mainGlobalObject.archivedRecord, "/customerdata/trash", "archiveToTrash");
        });
        $("#arch2cust").on("click", function(){
          sendDataOverPipeline(mainGlobalObject.archivedRecord, "/customerdata", "archiveToCust");
        });
      } else{
        console.log("'archivedRecord' property of 'mainGlobalObject' not found!")
      }
    }
    if($('#trashPage').length){
      if("trashRecord" in mainGlobalObject){
        $("#trash2cust").on("click", function(){
          sendDataOverPipeline(mainGlobalObject.trashRecord, "/customerdata", "trashToCust");
        });
        $("#trash2arch").on("click", function(){
          sendDataOverPipeline(mainGlobalObject.trashRecord, "/customerdata/archives", "trashToArchive");
        });
        $("#deleteForever").on("click", function(){
          sendDataOverPipeline(mainGlobalObject.trashRecord, "/customerdata/trash", "deleteForever");
        });
      } else{
        console.log("'trashRecord' property of 'mainGlobalObject' not found!")
      }
    }
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
  let target =  $("#landingPage main div:first-child + div").offset().top;
  let timeout = null;

  $(window).scroll(function () {
    //adds, removes shadow to navbar
    let navbar = $('.ui.secondary.menu');
    let distToTop = $(window).scrollTop();

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
