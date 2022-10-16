
$(document).ready(function(){
	$('.boton_play_ticker').click(function(){
	    if($('.contMover').css("animation-play-state") === "paused"){
	    	$('.contMover').css("animation-play-state", "running");
			$('div.boton_play_ticker > img').attr("src",$("#img_pause").val());
		} else {
			$('.contMover').css("animation-play-state", "paused");
			$('div.boton_play_ticker > img').attr("src",$("#img_play").val());
		}
	    if($('.contMoverDesktop').css("animation-play-state") === "paused"){
	    	$('.contMoverDesktop').css("animation-play-state", "running");
		} else {
			$('.contMoverDesktop').css("animation-play-state", "paused");
		}
	});
});