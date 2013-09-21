var App = Backbone.Model.extend({
    defaults: function() {
        return {
            all_cats : ["hiss", "grumpy", "moustache", "poo", "cage", "box",
			"fight", "tied", "drunk", "walk", "fish", "eyes", "clean",
			"slippers" ], //"purr",
            cats_array : [],
            cats_map : {},
            cell1: null,
            cell2: null,
            enabled: false
        };
    },

    localStorage: new Backbone.LocalStorage("cats"),
    
    toggle: function() {
//      this.save({done: !this.get("done")});
    },
    
    init: function() {
        $("#splash_purr")[0].play();
        $("#page_splash_screen").show();
        setTimeout(this.initGame, 3000);
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
        app.set("cats_array", c);
//        this.app.set("cats_map", _.map(c));
//        console.log(this.app.get("cats"));
        var j = 0; var i = 0;
        var cats = app.get("cats_array");
        for (var n=0; n<cats.length; n++) {
            i = n % 3;
            var cell = $("#cell_"+j.valueOf()+i.valueOf());
//            cell.attr("src", "images/cat_"+cats[n]+".png");
            cell.attr("src", "images/tizen.png");
            cell.attr("cat_name", cats[n]);
            cell.attr("cat_id", "cell_"+j.valueOf()+i.valueOf());
            cell.click(app.onClickCell);
//            console.log("#cell_"+j.valueOf()+i.valueOf()+" img  images/cat_"+cats[n]+".png");
            if (i == 2) {
                j++;
            }
        }
        app.set("enabled", true);
    },
    
    getIndexByCat : function(name) {
        return this.get("cats_map").name;
    },
    
    onClickCell : function(e) {
        console.log("enabled="+app.get("enabled"));
        var cell = $("#"+this.getAttribute("id"));
        if (!app.get("enabled")) {
            return;
        }
        console.log(cell);
        if (app.get("cell1") != null && this.getAttribute("cat_id") == app.get("cell1")) {
            return;
        }
        console.log(cell.attr("disabled"));
        if (this.getAttribute("disabled") != null) {
            return;
        }
        app.set("enabled", false);
        console.log(this);
//        console.log(e);
//        e.currentTarget.hide();
//        $("#"+this.getAttribute("id")).hide();
//        $("#"+this.getAttribute("id")).attr("src", "images/tizen_32.png");
        
        cell.animateRotate(360, 300, null, function() {
            cell.attr("src", "images/cat_"+cell.attr("cat_name")+".png");
            app.set("enabled", true);
//            console.log("cell1="+app.get("cell1")+" cell2="+app.get("cell2"));
            if (app.get("cell1") == null) {
                app.set("cell1", cell.attr("cat_id"));
            } else {
                app.set("cell2", cell.attr("cat_id"));
                setTimeout(app.onClearCells , 500);
            }
        });
//        console.log("c="+this.app.getIndexByCat(this.getAttribute("id")));
    },
    
    onClearCells: function() {
        console.log("Clear cells!");
        console.log("cell1="+app.get("cell1")+" cell2="+app.get("cell2"));
        
        var cell1 = $("#"+app.get("cell1"));
        var cell2 = $("#"+app.get("cell2"));
        
        if (cell1.attr("cat_name") == cell2.attr("cat_name")) {
            console.log("Find one matched!");
            $("#"+app.get("cell1")).attr("disabled", true);
            $("#"+app.get("cell2")).attr("disabled", true);
        }
        
        _.each($("img[id^='cell']"), function(e) {
            if (e.getAttribute("disabled") == null) {
                e.setAttribute("src", "images/tizen.png");
                e.removeAttribute("disabled");
            }
        });
        app.set("cell1", null);
        app.set("cell2", null);
        app.set("enabled", true);
        
        var i = 0;
        _.each($("img[id^='cell']"), function(e) {
            if (e.getAttribute("disabled") != null) {
                i++;
            }
        });
        if (i == 8) {
//            $("#page_splash_screen").show();
            _.each($("img[id^='cell']"), function(e) {
                e.removeAttribute("disabled");
            });
            $("#page_game").hide();
            app.init();
        }
    }

});

$.fn.animateRotate = function(angle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(this, arguments);
        };

        $({deg: 0}).animate({deg: angle}, args);
    });
};

var app

$(function(){
	app = new App();
    app.init();
});