
(function($){$("body").on('click','.modal__trigger',function(){$(this).closest(".modal").find(".modal__inner").show()
$(this).closest(".modal").find(".modal__overlay").show()});$("body").on('click','.modal__close',function(){$(this).closest(".modal").find(".modal__inner").hide()
$(this).closest(".modal").find(".modal__overlay").hide()});$("body").on('click','.modal__overlay',function(){$(this).closest(".modal").find(".modal__inner").hide()
$(this).hide()});})(jQuery);