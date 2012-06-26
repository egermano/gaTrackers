/**
 * Author: Bruno Germano
 * Date: 2012-06-26 17:40
 */

/**
 * GA Trackers plugin
 * @param  object $ jQuery variable 
 * @return object
 */
(function($){
    var methods = {
        init: function(options){
            var settings = $.extend({
                UA : '',
                initialTrackers : ['_trackPageview']
            }, options);

            if(settings.UA==''){
                $.error('[GA Trackers] -- Please fill the UA in options arguments.' );
                return false;
            }

            window._gaq=[['_setAccount', settings.UA], settings.initialTrackers];

            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
                s.parentNode.insertBefore(g,s)
            }(document,'script'));

            return $(this);
        },
        pageView: function(action, event){
            event = event?event:'click';
            return this.each(function(index, item){
                if(event == 'now'){
                    _gaq.push(['_trackPageview', action]);
                    return $(this);
                } else {
                    return $(item).bind(event, function(){
                        _gaq.push(['_trackPageview', action]);
                    });
                }
                
            });
        },
        event: function(category, action, label, event){
            label = label?label:'';
            event = event?event:'click';

            return this.each(function(index, item){
                if(event == 'now'){
                    _gaq.push(['_trackEvent', category, action, label]);
                    return $(this);
                } else {
                    return $(item).bind(event, function(){
                        _gaq.push(['_trackEvent', category, action, label]);
                    })
                }
            });
        }
    };

    $.fn.gaTrackers = function() {  
        if ( ( arguments.length > 0 && arguments.length <= 2 ) && ( typeof arguments[0] != 'object' ) ) {
            return methods['pageView'].apply( this, arguments );
        } else if( arguments.length >= 3 && arguments.length <= 4 ){
            return methods['event'].apply( this, arguments );
        } else if ( typeof arguments[0] === 'object') {
            return methods.init.apply( this, arguments );
        } else {
            $.error('[GA Trackers] -- Method does not exist on jQuery.gaTrackers' );
        } 
    };

}(jQuery))