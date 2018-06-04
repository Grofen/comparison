$(document).ready(function(){
  function setHeight() {
    var windowHeight = $(window).height();
    var elementHeight = (windowHeight - 60);
    // console.log(windowHeight);
    $("#sliderr").css('height', windowHeight);
    $('.home_slider_section').css('height', (elementHeight / 1.5));
    $(".home_slider_section.aboutFeel").css('height', (windowHeight));
    // $("body").css("overflow", "hidden");
  };
  setHeight();

  $(window).resize(function() {
    setHeight();
  });

  // Date of the fesival
  var countDownDate = new Date("Apr 2, 2018 15:37:25").getTime();
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var dateFestival = document.getElementById("date__festivasl");

    if (typeof dateFestival !== "undefined" && dateFestival !== null) {
      document.getElementById("date__festivasl").innerHTML = days + " <strong>days</strong> " + hours + " <strong>hours</strong> " + minutes + " <strong>minutes</strong> " + seconds + " <strong>seconds</strong> ";
      $('#date__festivasl').css('display', 'none');
      $('#date__festivasl').fadeIn();
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("date__festivasl").innerHTML = "EXPIRED";
      }
    } else {
      return;
    }
  }, 1000);

  //News Slider
  $('.quote-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: true,
    pauseOnHover: false,
    responsive: [{
    breakpoint: 768,
    settings: {
      slidesToShow: 1
    }},
    {
    breakpoint: 520,
    settings: {
      slidesToShow: 1
    },
    breakpoint: 375,
    settings: {
      slidesToShow: 1
    }
    }]
  });

  //Searching
  $('#searchM').keyup(function() {
      $('.item').hide();

      var txt = $('#searchM').val();
      $('.item').each(function(){
         if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
             $(this).show();
         }
      });
  });

  // The Calendar
  $('.date-btn.date').on( "click", function(e) {
      $('.item').hide();
      $(".date-btn.date").removeClass("active");
      $(this).addClass("active");
      var date = e.target.innerHTML;
      $('.item').each(function(){
        var MovieDate = $(this).contents().find('.dateOfMovie').html();
        if(date === MovieDate){
           $(this).show();
        }
     });
  });

  // $('.BB-btn').on("click", function() {
  //   $('#BB').css('display', 'block');
  // });
  // var modal = $('#BB')
});

$(document).on('click', '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

// Show and hide calendar in home page
var calendarWidth = $('.calendar_width');
var fullWidthMovie = $('.full_width_movie');
var fullWidthMovie_items = $('.full_width_movie .item');
var calendarBtn = $('.calendar_btn');
var collectionBtn = $('.collection_btn');

function showCalendar() {
  calendarWidth.css('display', 'flex');
  fullWidthMovie.css('display', 'none');
  calendarBtn.addClass('active');
  collectionBtn.removeClass('active');
}
function showCollection() {
  calendarWidth.css('display', 'none');
  fullWidthMovie.css('display', 'flex');
  fullWidthMovie_items.show();
  collectionBtn.addClass('active');
  calendarBtn.removeClass('active');
}
