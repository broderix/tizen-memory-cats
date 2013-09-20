var App = Backbone.Model.extend({
    defaults: function() {
        return {
            all_cats : ["hiss", "grumpy", "moustache", "poo", "cage", "box",
			"fight", "tied", "drunk", "walk", "fish", "eyes", "clean",
			"slippers" ], //"purr",
            cats : []
        };
    },

    localStorage: new Backbone.LocalStorage("cats"),
    
    toggle: function() {
//      this.save({done: !this.get("done")});
    },
    
    init: function() {
        $("#splash_purr")[0].play();
        $("#page_splash_screen").show();
        setTimeout(this.initGame, 300);
    },
    
    initGame: function() {
        $("#page_splash_screen").hide();
        $("#page_game").show();
        var all_cats = _.shuffle(this.app.get("all_cats"));
        
        var c = all_cats.slice(0,4);
        c = c.concat(c, ["purr"]);
        c = _.shuffle(c);
        console.log(c);
        
//        this.app.set("cats", all_cats.slice(0,9));
        this.app.set("cats", c);
//        console.log(this.app.get("cats"));
        var j = 0; var i = 0;
        var cats = this.app.get("cats");
        for (var n=0; n<cats.length; n++) {
            i = n % 3;
            $("#cell_"+j.valueOf()+i.valueOf()+" img").attr("src", "images/cat_"+cats[n]+".png");
//            console.log("#cell_"+j.valueOf()+i.valueOf()+" img  images/cat_"+cats[n]+".png");
            if (i == 2) {
                j++;
            }
        }
    }

});

var app

$(function(){
	app = new App();
    app.init();
});