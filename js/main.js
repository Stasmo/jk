

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
            $("#shows ul").append("<li class='list-group-item'><div class='show-item'><span>"
                + moment(field.date).format("MMM Do YYYY")
                + "</span> - <span>" + field.description + "</span></div></li>");
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