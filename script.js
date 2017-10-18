console.log('test');

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
    id = id.replace("link", "");
      // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        300);
}

// ====================================
// ==   show/hide buttons on scroll  ==
// ====================================
// Function only runs once, 250ms after the first time a user scrolls

var target = $(".myPara").offset().top,
    timeout = null;

// $(window).scroll(function () {
//     if (!timeout) {
//         timeout = setTimeout(function () {
//             console.log('scroll');
//             clearTimeout(timeout);
//             timeout = null;
//             if ($(window).scrollTop() >= target) {
//                 alert('made it');
//             }
//         }, 250);
//     }
// });

//Make this code more elegant if possible
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
