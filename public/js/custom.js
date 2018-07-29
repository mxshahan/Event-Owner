
$(document).ready(function(){
    $(".owl2").owlCarousel({
        items:6,
        loop:true,
        autoplay:true,
        autoplayHoverPause:true,
        autoplayTimeout:3000
    });
    $(".owl-carousel").owlCarousel({
        items:4,
        loop:true,
        autoplay:true,
        autoplayHoverPause:true,
        autoplayTimeout:3000
    })
    
  });

  var mixer = mixitup('.mix-container');
  var mixer = mixitup(containerEl);
  var mixer = mixitup(containerEl, {
      selectors: {
          target: '.blog-item'
      },
      animation: {
          duration: 300
      }
  });
  