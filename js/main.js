/*
 * JavaScript Pretty Date
 * Copyright (c) 2011 John Resig (ejohn.org)
 * Licensed under the MIT and GPL licenses.
 */

// Takes an ISO time and returns a string representing how
// long ago the date represents.
function prettyDate(date){
    var diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);
            
    if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
        return;
            
    return day_diff == 0 && (
            diff < 60 && "just now" ||
            diff < 120 && "1 minute ago" ||
            diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
            diff < 7200 && "1 hour ago" ||
            diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
        day_diff == 1 && "Yesterday" ||
        day_diff < 7 && day_diff + " days ago" ||
        day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}

// If jQuery is included in the page, adds a jQuery plugin to handle it as well
if ( typeof jQuery != "undefined" ){
    jQuery.fn.prettyDate = function(){
        return this.each(function(){
            var date = prettyDate(this.title);
            if ( date )
                jQuery(this).text( date );
        });
    };
}

$(document).ready(function(e) {


    $('#main-nav ul.nav-links li a').bind('click', function(e) {
         // prevent default anchor click behavior
       e.preventDefault();

       // animate
       $('html, body').animate({
           scrollTop: $(this.hash).offset().top - 49
         }, 400, function(){

           // when done, add hash to url
           // (default click behaviour)
           window.location.hash = this.hash;
         });
    });

    $('#shows a.expand').click(function(e){
        e.preventDefault();
        $(this).toggleClass('expanded');
        $("#shows").toggleClass('minimized');
        $("#shows h3").toggleClass("hidden");
    });

    $.getJSON("shows.json",function(result){
        $(result.shows).each(function(){
            this.date = new Date(this.date);
        });
        result.shows.sort(function (a,b) {
            if(a.date > b.date)
                return 1;
            else if(b.date > a.date)
                return -1;
            else
                return 0;
        });
        result.shows.reverse();
        $.each(result.shows, function(i, field){
            var options = {
                weekday: "long", year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            };
            var diff = (((new Date()).getTime() - field.date.getTime()) / 1000),
                day_diff = Math.floor(diff / 86400),
                dateText;
                if(day_diff > 31 || diff < 0){
                    dateText = field.date.toLocaleTimeString("en-us", options)
                }else{
                    dateText = prettyDate(field.date)
                }
            $("#shows ul").append("<li class='list-group-item'><div class='show-item'><span>" + dateText + "</span> - <span>" + field.description + "</span></div></li>");
        });
    });

    $("#play").click(function(e){
        e.preventDefault();
        $.fancybox({
            'padding'       : 0,
            'autoScale'     : false,
            'transitionIn'  : 'fade',
            'transitionOut' : 'fade',
            'title'         : this.title,
            'width'         : 680,
            'height'        : 495,
            'href'          : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
            'type'          : 'swf',
            'swf'           : {
                 'wmode'        : 'transparent',
                'allowfullscreen'   : 'true'
            }
        });

        return false;
    });

    

    $("#bio a.album").fancybox();
});