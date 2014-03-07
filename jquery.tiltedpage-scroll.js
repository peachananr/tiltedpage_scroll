/* ===========================================================
 * jquery-tiltedpage-scroll.js v1.2.1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create a beautiful 3D tilted effect on scroll
 * with Tilted Page Scroll plugin
 *
 * https://github.com/peachananr/tiltedpage-scroll
 * 
 * License: GPL v3
 *
 * ========================================================== */

!function($){
  
  var defaults = {
    sectionContainer: "> section",
    angle: 50,
    opacity: true,
    scale: true,
    outAnimation: true
	};
	

  $.fn.tiltedpage_scroll = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this);
        
    el.find(settings.sectionContainer).addClass("tps-section");
    
    el.find('.tps-section').each(function(){
      var el2 = $(this); 
      el2.wrapInner("<div class='tps-wrapper'></div>");
    });
    
    function isElementInViewport (el3) {
      var docViewTop = $(window).scrollTop(),
          docViewBottom = docViewTop + $(window).height(),
          elemTop = el3.offset().top,
          elemBottom = elemTop + el3.outerHeight(true);
          
      return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) );
    }
  
    function elementVisibilityMayChange (el4) {
      
      if ( isElementInViewport(el4) ) {
        el4.addClass("tps-inview")
      } else {
        el4.removeClass("tps-inview")
      }
    }
    
   
  
    $(window).on('DOMContentLoaded load resize scroll', function() {
      el.find(settings.sectionContainer).each(function(){
        elementVisibilityMayChange($(this));
      });

      
      el.find('.tps-section.tps-inview > .tps-wrapper').each(function(index){
        var el2 = $(this),
            opacity = 0,
            st = $(window).scrollTop(),
            deg = ((el2.parent().offset().top - el2.parent().height()) - st) / $(window).height() * (settings.angle * 3),
            scale = ((st + $(window).height() - (el2.parent().offset().top - el2.parent().height())) / ($(window).height() )) ;
            if(scale > 1) scale = 1;
            if(deg < 0) deg = 0;
            
        if(st > el2.parent().offset().top) {

          if (settings.outAnimation == false) {
            opacity = 1;
            if(opacity < 0) opacity = 0;
            if (deg < 0) deg = 0;
          } else {
            opacity = ((el2.parent().offset().top + ($(window).height() * 1.2) - st)) / ($(window).height());	
            opacity = Math.pow(opacity,25);
            deg = (el2.parent().offset().top - st) / $(window).height() * (settings.angle * 3);
            scale = ((st + $(window).height() - el2.parent().offset().top ) / ($(window).height() )) ;
          }
          
          
        } else {
        	if(index != 0) {
          	var opacity = ((st + $(window).height() - el2.parent().offset().top + (el2.height()/2))/ $(window).height());

        		if(opacity > 1) { opacity = 1; }
				
        	} else {
        		opacity = 1;
            deg = 0;
            scale = 1;
        	}
        }
        
        if (settings.scale == false) scale = 1;
        if (settings.angle == false) deg = 0;
        if (settings.opacity == false) opacity = 1;
        
        el2.css({
          'transform': 'rotateX(' + deg + 'deg) scale('+scale+', '+scale+')',
          opacity: opacity
        });
      });
    }); 

  }
  
  
}(window.jQuery);
