

$(document).ready(function(e) {

    $('#main-nav ul li a').bind('click', function(e) {
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

    $.getJSON("shows.json",function(result){
        $.each(result.shows, function(i, field){
            $("#shows ul").append("<li class='list-group-item'><span>" + field.date + "</span> - <span>" + field.description + "</span></li>");
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
            'width'     : 680,
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