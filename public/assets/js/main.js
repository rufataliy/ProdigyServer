(function ($)
  { "use strict"
  

/* 1. Proloder */
    $(window).on('load', function () {
      $('#preloader-active').delay(450).fadeOut('slow');
      $('body').delay(450).css({
        'overflow': 'visible'
      });
    });

/* 2. sticky And Scroll UP */
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 400) {
        $(".header-sticky").removeClass("sticky-bar");
        $('#back-top').fadeOut(500);
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $('#back-top').fadeIn(500);
      }
    });

  // Scroll Up
    $('#back-top a').on("click", function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  

/* 3. slick Nav */
// mobile_menu
    var menu = $('ul#navigation');
    if(menu.length){
      menu.slicknav({
        prependTo: ".mobile_menu",
        closedSymbol: '+',
        openedSymbol:'-'
      });
    };

 // Brand Active
 $('.brand-active').slick({
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed:700,
  speed: 1000,
  arrows: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      }
    },
    {
      breakpoint: 992,
      settings: {
        autoplaySpeed:1000,
        Speed:700,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      }
    },
    {
      breakpoint: 768,
      settings: {
        autoplaySpeed:1000,
        Speed:700,
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        autoplaySpeed:1000,
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },

    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

  $(".opacity-0").css({opacity:0})
  
  $("#service-2").waypoint(function () {
    $("#service-2").addClass("slide-in-left")
    $("#service-3").addClass("animate__fadeInRight")
    $("#service-1").addClass("slide-in-left")
  },
{offset: '70%' })

  $("#about-1").waypoint(function () {
    $("#about-1-1").addClass("animate__fadeInUp")
    $("#about-1-2").addClass("animate__fadeInDown")
  },
{offset: '100%' })

  $("#about-2").waypoint(function () {
    $("#about-2-1").addClass("animate__fadeInUp")
    $("#about-2-2").addClass("animate__fadeInDown")
  },
{offset: '100%' })

})(jQuery);
