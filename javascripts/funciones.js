(function ($) {
	jQuery(document).ready(function () {
		/*-----------------------------------------------------------------------------------*/
		/*  Slides Navigation Effect
		/*-----------------------------------------------------------------------------------*/

		if (jQuery().slides) {
			jQuery("#slides").hover( function() {
				jQuery('.prev').fadeIn(200);
				jQuery('.next').fadeIn(200);
			}, function () {
				jQuery('.prev').fadeOut(200);
				jQuery('.next').fadeOut(200);
			});
		}

		$('.colaboradorIcono').live('click', function() {
			if($(this).parent().children('.subcategoryPopUp').css('display') == 'none'){
				$('.subcategoryPopUp').fadeOut('fast'); // to transparent
				$(this).parent().children('.subcategoryPopUp').fadeIn('fast'); // to opaque
			}else{
				$(this).parent().children('.subcategoryPopUp').fadeOut('fast'); // to transparent
			}
			return false;
		});
		$('.reaccionesIcono').live('click', function() {
			if($(this).parent().children('.subcategoryPopUp2').css('display') == 'none'){
				$('.subcategoryPopUp2').fadeOut('fast'); // to transparent
				$(this).parent().children('.subcategoryPopUp2').fadeIn('fast'); // to opaque
			}else{
				$(this).parent().children('.subcategoryPopUp2').fadeOut('fast'); // to transparent
			}
			return false;
		});

		$("body").emailSpamProtection("email");
		// Apaño para colocar el titulo de la pagina correcto cuando filtro por terminos en la pagina de proyectos

	});
	})(jQuery);