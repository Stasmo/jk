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