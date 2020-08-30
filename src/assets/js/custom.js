/* ----------------------------------

Name: custom.js

------------------------------------- */


/*====================================================


	Table of Contents
	
		01. Loading Screen
		
		02. Animation on Scroll
		
		03. Custom Cursor
		
		04. Scroll to Top
		
*/



jQuery(document).ready(function($) {
	"use strict";

/*======================

	01. Loading Screen

========================*/

	setTimeout(function(){
		$('body').addClass('loaded');
	}, 0);
	
/*======================

	02. Animation on Scroll

========================*/
	
	AOS.init({
	  duration: 500,
	  easing: 'ease-out-quart',
	  once: true
	});

/*======================

	03. Custom Cursor

========================*/

	var cursor = $(".cursor"),
		follower = $(".cursor-follower");

	var posX = 0,
		posY = 0,
		mouseX = 0,
		mouseY = 0;

		TweenMax.to({}, 0.016, {
			repeat: -1,
			onRepeat: function() {
				posX += (mouseX - posX) / 4;
				posY += (mouseY - posY) / 4;

				TweenMax.set(follower, {
					css: {
						left: posX - 20,
						top: posY - 20
					}
				});

				TweenMax.set(cursor, {
					css: {
						left: mouseX,
						top: mouseY
					}
				});
			}
		});

	$(document).on("mousemove", function(e) {
		mouseX = e.pageX;
		mouseY = e.pageY;
	});

	$("a").on("mouseenter", function() {
		cursor.addClass("active");
		follower.addClass("active");
	});

	$("a").on("mouseleave", function() {
		cursor.removeClass("active");
		follower.removeClass("active");
	});


/*======================

	04. Scroll to Top

========================*/

	$(window).scroll(function() {
			50 <= $(this).scrollTop() ? $("#return-to-top, #return-to-top-2").fadeIn(200) : $("#return-to-top, #return-to-top-2").fadeOut(200)
		}), $("#return-to-top, #return-to-top-2").on("click", function() {
			$("body,html").animate({
			scrollTop: 0
		}, 500)
	});
	
	
});