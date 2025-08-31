
$(document).ready(function () {
  let ticking = false;

  function toggleFixedHeader() {
    const scrollTop = $(window).scrollTop();

    if (scrollTop >= 350) {
      $('.web-header-fixed').addClass('fixed-header');
    } else {
      $('.web-header-fixed').removeClass('fixed-header');
    }
  }

  $(window).on('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        toggleFixedHeader();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Run once on page load
  toggleFixedHeader();
});



// menu bar

$(".navbar-toggler").click(function () {
    $(".navbar-collapse").toggleClass("menu-visible");
    $(".menu_overlay").toggleClass("menu-visible");
    $("body").css("overflow", "hidden");
  });
  
  $(".menu_close_btn").click(function () {
    $(".navbar-collapse").removeClass("menu-visible");
    $(".navbar-collapse").removeClass("show");
    $(".menu_overlay").removeClass("menu-visible");
    $("body").css("overflow", "auto");
  });
  
  $(".menu_overlay").click(function () {
    $(".menu_overlay").removeClass("menu-visible");
    $(".navbar-collapse").removeClass("show");
    $(".navbar-collapse").removeClass("menu-visible");
    $("body").css("overflow", "auto");
  });
  
  
  
  $( ".web-header .navbar .navbar-nav li ul" ).find( "li" ) .closest("ul") .parent("li") .addClass( 'dropdown_menu' );
  $(".web-header .navbar .navbar-nav li").click(function(){
    $(this).toggleClass("curent");
    $('.web-header .navbar .navbar-nav li').not($(this)).removeClass('curent');
  });




$('.productListingSlider').owlCarousel({
    nav:false,
    margin:10,
	autoplay:false,
    loop:false,
    dots:false,
    smartSpeed:	500,
	navText: [
    "<span><i class='fa-light fa-arrow-left'></i></span>",
    "<span><i class='fa-light fa-arrow-right'></i></span>"
  ],
	
	//animateOut: 'fadeOut',
    //animateIn: 'fadeIn',
    responsive:{
      0:{
        items:2
      },
	  480:{
        items:2
      },
      600:{
        items:2
      },
      767:{
        items:3
      },
      992:{
        items:4
      },
      1200:{
        items:6
      },
      1440:{
        items:6
      }
    }
  });






$('.scanCategorySlider').owlCarousel({
    nav:false,
    margin:10,
	autoplay:false,
    loop:false,
    dots:false,
    smartSpeed:	500,
	navText: [
    "<span><i class='fa-light fa-arrow-left'></i></span>",
    "<span><i class='fa-light fa-arrow-right'></i></span>"
  ],
	
	/*animateOut: 'fadeOut',
       animateIn: 'fadeIn',*/
    responsive:{
      0:{
        items:2,
		margin:5,
		stagePadding: 20,	
      },
	  480:{
        items:2,
		margin:5,
		stagePadding: 20,	
      },
	  
      600:{
        items:3,
		margin:5,
      },
      767:{
        items:3
      },
      992:{
        items:3
      },
      1200:{
        items:3
      },
      1440:{
        items:3
      }
    }
  });
  
  $('.highlightBannerSlider').owlCarousel({
    nav:false,
    margin:10,
	autoplay:true,
    loop:true,
    dots:true,
    smartSpeed:	500,
	navText: [
    "<span><i class='fa-light fa-arrow-left'></i></span>",
    "<span><i class='fa-light fa-arrow-right'></i></span>"
  ],
	
	/*animateOut: 'fadeOut',
       animateIn: 'fadeIn',*/
    responsive:{
      0:{
        items:1
      },
	  480:{
        items:1
      },
      600:{
        items:1
      },
      767:{
        items:1
      },
      992:{
        items:2
      },
      1200:{
        items:2
      },
      1440:{
        items:2
      }
    }
  });
  
  
  $('.reviewTestimonialSlider').owlCarousel({
    nav:false,
    margin:0,
	autoplay:false,
    loop:false,
    dots:true,
    smartSpeed:	500,
	navText: [
    "<span><i class='fa-light fa-arrow-left'></i></span>",
    "<span><i class='fa-light fa-arrow-right'></i></span>"
  ],
	
	/*animateOut: 'fadeOut',
       animateIn: 'fadeIn',*/
    responsive:{
      0:{
        items:1,		
		stagePadding: 40,		
		 
      },
	  480:{
        items:1,
		stagePadding: 40,		
		 
      },
      600:{
        items:1
      },
      767:{
        items:1
      },
      992:{
        items:2
      },
      1200:{
        items:3
      },
      1440:{
        items:3
      }
    }
  });
  
  
 /*=============================================*/
/*--------------- [ScanPrice_Accordion] ----------------*/
/*=============================================*/
$('.scanPriceAccordian').find('.scanPriceAccordianHeader').on('click', function () {
  // Adds Active Class
  $(this).toggleClass('active');
  // Expand or Collapse This Panel
  $(this).next().slideToggle(300, "swing");
  // Hide The Other Panels
  $('.scanPriceAccordianBody').not($(this).next()).slideUp(300, "swing");
  // Removes Active Class From Other Titles
  $('.scanPriceAccordianHeader').not($(this)).removeClass('active');
});  
  
/*=============================================*/
/*--------------- [ViewDetails_Content_Accordion] ----------------*/
/*=============================================*/
$('.viewDetailsContentAccordian').find('.viewDetailsContentAccordianHeader').on('click', function () {
  // Adds Active Class
  $(this).toggleClass('active');
  // Expand or Collapse This Panel
  $(this).next().slideToggle(300, "swing");
  // Hide The Other Panels
  $('.viewDetailsContentAccordianBody').not($(this).next()).slideUp(300, "swing");
  // Removes Active Class From Other Titles
  $('.viewDetailsContentAccordianHeader').not($(this)).removeClass('active');
});  
    
 /*=============================================*/
/*--------------- [_Accordion] ----------------*/
/*=============================================*/
$('.faqAccordian').find('.faqAccordianHeader').on('click', function () {
  // Adds Active Class
  $(this).toggleClass('active');
  // Expand or Collapse This Panel
  $(this).next().slideToggle(300, "swing");
  // Hide The Other Panels
  $('.faqAccordianBody').not($(this).next()).slideUp(300, "swing");
  // Removes Active Class From Other Titles
  $('.faqAccordianHeader').not($(this)).removeClass('active');
});
		

// Re-initialize on window resize
$(window).on('resize', function () {
  initSlick();
});
/*
$('.scanCategoryContent').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.scanCategoryNavList'
});
$('.scanCategoryNavList').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.scanCategoryContent',
   infinite: false,
  //dots: true,
  //centerMode: true,
  focusOnSelect: true
});
*/


		var SwiperTop = new Swiper('.marquee-right', {
		  spaceBetween: 0,
		  centeredSlides: true,
		  speed: 8000,
		  autoplay: {
			delay: 1,
		  },
		  loop: true,
		  slidesPerView:'auto',
		  allowTouchMove: true,
		  disableOnInteraction: true
		});

       
 
    

 $(document).ready(function () {
  $('#searchInput').on('input', function () {
    let value = $(this).val().toLowerCase();
    if (value) {
      $('#suggestionList').show();
      $('#suggestionList li').each(function () {
        const text = $(this).text().toLowerCase();
        $(this).toggle(text.includes(value));
      });
    } else {
      $('#suggestionList').hide();
    }
  });

  $('#suggestionList li').on('click', function () {
    $('#searchInput').val($(this).text());
    $('#suggestionList').hide();
  });

  // Hide suggestion list when clicking outside
  $(document).on('click', function (e) {
    if (
      !$(e.target).closest('#suggestionList').length &&
      !$(e.target).closest('.searchMedicineArea').length
    ) {
      $('#suggestionList').hide();
    }
  });

  // Hide suggestion list on .addDeliveryBtn click
  $('.addDeliveryBtn').on('click', function () {
    $('#suggestionList').hide();
  });
});


//$( ".searchPanelArea" ).appendTo( ".web-header-fixed-inner .midlePart" );


// Save original parent before moving
let originalParent = $(".searchPanelArea").parent();

function moveSearchPanel() {
  if ($(window).width() < 767) {
    if ($(window).scrollTop() >= 300) {
      // Move to .midlePart if not already there
      if (!$('.web-header-fixed-inner .midlePart .searchPanelArea').length) {
        $(".searchPanelArea").appendTo(".web-header-fixed-inner .midlePart");        
      }
    } else {
      // Move back to original position
      if (!$(".searchPanelArea").parent().is(originalParent)) {
        $(".searchPanelArea").appendTo(originalParent);		
      }
    }	
  }  
  
}
$(document).ready(function () {
  moveSearchPanel();

  $(window).on('scroll resize', function () {
    moveSearchPanel();
  });
});

$(document).ready(function () {
  // Store the original parent of .rightPartList
  var originalParent = $(".rightPartList").parent();

  function moveSearchPanel() {
    if ($(window).width() < 767) {
      if ($(window).scrollTop() >= 300) {
        // Move only if it's not already moved
        if (!$('.web-header-fixed-inner .midlePart .rightPartList').length) {
          $(".rightPartList").appendTo(".web-header-fixed-inner .rightPart");
        }
      } else {
        // Move back to original parent
        if (!$(".rightPartList").parent().is(originalParent)) {
          $(".rightPartList").appendTo(originalParent);
        }
      }
    } else {
      // On wider screens, always move back to original
      if (!$(".rightPartList").parent().is(originalParent)) {
        $(".rightPartList").appendTo(originalParent);
      }
    }
  }

  // Run once and on scroll/resize
  moveSearchPanel();
  $(window).on('scroll resize', function () {
    moveSearchPanel();
  });
});


  


$(document).ready(function () {
  // Store original parents
  const $overlayPanel = $(".overlaychoosloactionPanelArea");
  const $choosPanel = $(".choosloactionPanelArea");

  const $overlayOriginalParent = $overlayPanel.parent();
  const $choosOriginalParent = $choosPanel.parent();

  function updatePanelPosition() {
    if ($(window).width() < 767) {
      // Move after footer
      $overlayPanel.insertAfter(".web-foter");
      $choosPanel.insertAfter(".web-foter");
    } else {
      // Move back to original parents
      $overlayPanel.appendTo($overlayOriginalParent);
      $choosPanel.appendTo($choosOriginalParent);
    }
  }

  // Run on load
  updatePanelPosition();

  // Run on window resize
  $(window).resize(function () {
    updatePanelPosition();
  });
});



$(document).ready(function(){
  $(".scanPriceBox_1").slice(0, 4).show();
  $("#loadMore").on("click", function(e){
    e.preventDefault();
    $(".scanPriceBox_1:hidden").slice(0, 4).slideDown();
    if($(".scanPriceBox_1:hidden").length == 0) {
      $("#loadMore").text("No Content").addClass("noContent");
    }
  });
  
})
$(document).ready(function(){
  $(".scanPriceBox_2").slice(0, 4).show();
  $("#loadMore2").on("click", function(e){
    e.preventDefault();
    $(".scanPriceBox_2:hidden").slice(0, 4).slideDown();
    if($(".scanPriceBox_2:hidden").length == 0) {
      $("#loadMore2").text("No Content").addClass("noContent");
    }
  });
  
})


$(document).ready(function () {
  // Toggle open class on click
  $(".addDeliveryBtn").on("click", function (e) {
    e.stopPropagation(); // prevent bubbling to document
    $(".choosloactionPanelArea").toggleClass("open");
	$(".overlaychoosloactionPanelArea").toggleClass("open");
	 //$("body").css("overflow", "hidden");
  });

  // Clicking outside or on .searchMedicineFormArea closes the panel
  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(".choosloactionPanelArea").length ||
      $(e.target).closest(".searchMedicineFormArea").length
    ) {
      $(".choosloactionPanelArea").removeClass("open");
	  $(".overlaychoosloactionPanelArea").removeClass("open");
	  //$("body").css("overflow", "auto");
    }
  });

  // Optional: clicking on search area itself also removes open
  $(".searchMedicineFormArea").on("click", function () {
    $(".choosloactionPanelArea").removeClass("open");
	$(".overlaychoosloactionPanelArea").removeClass("open");
	//$("body").css("overflow", "auto");
  });
});

$(".overlaychoosloactionPanelArea").click(function () {
    $(".overlaychoosloactionPanelArea").removeClass("menu-visible");
    $(".choosloactionPanelArea").removeClass("show");   
    //$("body").css("overflow", "auto");
  });


$(window).on('scroll', function () {
  if ($(this).scrollTop() > 100) {
    $('.floatWhatsappBtnArea, .floatCallNowBtnArea').stop(true, true).slideDown();
  } else {
    $('.floatWhatsappBtnArea, .floatCallNowBtnArea').stop(true, true).slideUp();
  }
});



function openPopupById(id) {
  $('#' + id).addClass('open');
  $('#overlay_' + id).addClass('open');
  $('body').addClass('pageBodyhiden');
}

function closePopupById(id) {
  $('#' + id).removeClass('open');
  $('#overlay_' + id).removeClass('open');
  $('body').removeClass('pageBodyhiden');
}

// Optional: Click on overlay to close
$('.customeOverlayPopup').on('click', function () {
  var popupId = this.id.replace('overlay_', '');
  closePopupById(popupId);
});


$(".alertPopup").on("click", function () {
    $(".customeOverlayAlertPopup").removeClass("open");
	$(".alertPopup").removeClass("open");
});





$(document).ready(function () {
  function toggleFocusClass(input) {
    const value = $(input).val();
    const wrapper = $(input).closest('.inputFieldTextField');

    if (document.activeElement === input || value.trim() !== '') {
      wrapper.addClass('focused');
    } else {
      wrapper.removeClass('focused');
    }
  }

  // Bind all events
  $('.textMain').on('focus input blur', function () {
    toggleFocusClass(this);
  });

  // Trigger on load for pre-filled values
  $('.textMain').each(function () {
    toggleFocusClass(this);
  });
});
$(document).ready(function () {
  function toggleInputState(input) {
    const wrapper = $(input).closest('.inputFieldTextField');
    const clearBtn = wrapper.find('.clearInputBtn');
    const hasValue = $(input).val().trim() !== '';

    // Toggle 'focused' class
    if (document.activeElement === input || hasValue) {
      wrapper.addClass('focused');
    } else {
      wrapper.removeClass('focused');
    }

    // Show or hide clear button
    clearBtn.toggle(hasValue);
  }

  // Handle input, focus, and blur events
  $('.textMain').on('input focus blur', function () {
    toggleInputState(this);
  });

  // Handle clear button click
  $('.clearInputBtn').on('click', function () {
    const wrapper = $(this).closest('.inputFieldTextField');
    const input = wrapper.find('.textMain');

    input.val('');
    input.focus(); // optional: keep focus after clearing
    toggleInputState(input[0]);
  });

  // Initialize state on page load
  $('.textMain').each(function () {
    toggleInputState(this);
  });
});







let digitValidate = function(ele){
  console.log(ele.value);
  ele.value = ele.value.replace(/[^0-9]/g,'');
}

let tabChange = function(val){
    let ele = document.querySelectorAll('.otp-input');
    if(ele[val-1].value != ''){
      ele[val].focus()
    }else if(ele[val-1].value == ''){
      ele[val-2].focus()
    }   
 }

