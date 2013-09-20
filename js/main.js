////Initialize function
//var init = function () {
//    // TODO:: Do your initialization job
//    console.log("init() called");
//
//    // add eventListener for tizenhwkey
//    document.addEventListener('tizenhwkey', function(e) {
//        if(e.keyName == "back")
//            tizen.application.getCurrentApplication().exit();
//    });
//};
//// window.onload can work without <body onload="">
//window.onload = init;

var cats = [
    "hiss",
	"grumpy",
	"moustache",
	"poo",
	"cage",
	"purr",
	"box",
	"fight",
	"tied",
	"drunk",
	"walk",
	"fish",
	"eyes",
	"clean",
	"slippers"
];

$(function(){
	//o_O ?
	$("#splash_purr")[0].play();
	$("#page_splash_screen").show();
	setTimeout(function(){
		$("#page_splash_screen").hide();
		$("#page_game").show();
		game_init();
	}, 300);
	
});

function game_init() {
	
}

