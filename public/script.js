var breakpointMobile = 768,
    intViewportWidth,
    screenType,
    slider,
    slider_api;


window.addEventListener("DOMContentLoaded", function(e) {
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
    var clearFilters = function(formAction){
      $("#pipeline").attr("method", "POST");
      $("#pipeline").attr("action", formAction);
      $("#pipeline input:nth-child(1)").val(["0"]);
      $("#pipeline input:nth-child(2)").val(2);
      $("#pipeline").submit();
    }
    var pagination = function(currentPg,pgCount,filters,formAction){
      $("#pageNavi" + currentPg).addClass("active");

      $(".ui.pagination.menu a").click(function(e){
        let temp = [$(this).attr('id').slice(8), pgCount, filters.nameSrch, filters.startDate, filters.endDate];
        $("#pipeline").attr("method", "POST");
        $("#pipeline").attr("action", formAction);
        $("#pipeline input:nth-child(1)").val(temp);
        $("#pipeline input:nth-child(2)").val(2);
        $("#pipeline").submit();
      });

      $("#filterBar button[type='reset']").click(function(){
        clearFilters(formAction);
      });

      //display appropriate buttons in pagination menu depending on the number of pages
      if(pgCount>5){
         if(currentPg-3 > 0){
           $(".pageNavi.start").show();
         } else{
            $(".pageNavi.start").hide();
         }
         if((pgCount - currentPg) > 2){
           $(".pageNavi.end").show();
         } else{
           $(".pageNavi.end").hide();
         }
         for(let i=1; i<(pgCount+1); i++){
           if((i < (currentPg - 2)) || (i > (currentPg + 2))){
             $("#pageNavi" + i).hide();
           } else{
             $("#pageNavi" + i).show();
           }
           switch (currentPg) {
             case 1:
               $("#pageNavi4, #pageNavi5").show();
               break;
             case 2:
               $("#pageNavi5").show();
               break;
             case pgCount:
               $("#pageNavi" + (pgCount - 3)).show();
               $("#pageNavi" + (pgCount - 4)).show();
               break;
             case (pgCount - 1):
               $("#pageNavi" + (pgCount - 4)).show();
               break;
           }
         }
      } else{
        $(".pageNavi.start, .pageNavi.end").hide();
      }
    }

    //adds and removes "checked" class to checkboxes
      $('tbody tr input[type="checkbox"]').click(function(e){
        if(this.checked){
          $(this).addClass('checked');
        } else{
          $(this).removeClass('checked');
        }
      });

    // checkbox select all
      $('thead tr:nth-child(1) input[type="checkbox"]').click(function(e){
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
      if("customerdataPg" in mainGlobalObject){
        let pgCount = Number(mainGlobalObject.customerdataPg[3]);
        let currentPg = Number(mainGlobalObject.customerdataPg[1]);
        let filters = {
          nameSrch: mainGlobalObject.customerdataPg[4][0],
          startDate: mainGlobalObject.customerdataPg[4][1],
          endDate: mainGlobalObject.customerdataPg[4][2]
        }
        pagination(currentPg,pgCount,filters,"/customerdata");

        //move records from customerdata to trash and archive pages
        $("#cust2trash").on("click", function(e){
          sendDataOverPipeline(mainGlobalObject.customerdataPg[0], "/customerdata/trash", "custToTrash");
        });
        $("#cust2arch").on("click", function(e){
          sendDataOverPipeline(mainGlobalObject.customerdataPg[0], "/customerdata/archives", "custToArchive");
        });
      } else{
        console.log("'customerdataPg' property of 'mainGlobalObject' not found!")
      }
    }
    if($('#archivesPage').length){
      if("archivesPg" in mainGlobalObject){
        let pgCount = Number(mainGlobalObject.archivesPg[3]);
        let currentPg = Number(mainGlobalObject.archivesPg[1]);
        let filters = {
          nameSrch: mainGlobalObject.archivesPg[4][0],
          startDate: mainGlobalObject.archivesPg[4][1],
          endDate: mainGlobalObject.archivesPg[4][2]
        }
        pagination(currentPg,pgCount,filters,"/customerdata/archives");
        $("#arch2trash").on("click", function(e){
          sendDataOverPipeline(mainGlobalObject.archivesPg[0], "/customerdata/trash", "archiveToTrash");
        });
        $("#arch2cust").on("click", function(e){
          sendDataOverPipeline(mainGlobalObject.archivesPg[0], "/customerdata", "archiveToCust");
        });
      } else{
        console.log("'archivesPg' property of 'mainGlobalObject' not found!")
      }
    }
    if($('#trashPage').length){
      if("trashPg" in mainGlobalObject){
        let pgCount = Number(mainGlobalObject.trashPg[3]);
        let currentPg = Number(mainGlobalObject.trashPg[1]);
        let filters = {
          nameSrch: mainGlobalObject.trashPg[4][0],
          startDate: mainGlobalObject.trashPg[4][1],
          endDate: mainGlobalObject.trashPg[4][2]
        }
        pagination(currentPg,pgCount,filters,"/customerdata/trash");
        $("#trash2cust").on("click", function(e){
          sendDataOverPipeline(mainGlobalObject.trashPg[0], "/customerdata", "trashToCust");
        });
        $("#trash2arch").on("click", function(e){
          sendDataOverPipeline(mainGlobalObject.trashPg[0], "/customerdata/archives", "trashToArchive");
        });
        $("#deleteForever").on("click", function(e){
          sendDataOverPipeline(mainGlobalObject.trashPg[0], "/customerdata/trash", "deleteForever");
        });
      } else{
        console.log("'trashPg' property of 'mainGlobalObject' not found!")
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
