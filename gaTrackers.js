(function($){


/**
 * Initialize gaTrackers
 * @param  {String}  options.UA         UA account
 * @param  {Boolean} options.debug      debug option
 */
function gaTrackers(options){
    this.options = options;

    if(!options){
        console.warn('[gaTrackers] UA not set.')
        console.log('To use gaTrackers, please set the UA code. Ex:')
        console.log('var Tracker = new gaTrackers({UA: "UA-123456"});');
        console.log('    Tracker.pv("page/to/track"); //Track now');
        console.log('    Tracker.when("click", "body").pv("page/to/track/when/click/body"); //Track when clicked on body');
        console.log('    Tracker.event("event_category", "event_action", "event_label"); //Track now');
        console.log('    Tracker.when("click", "body").event("event_category", "event_action", "event_label"); //Track when clicked on body');

        return;
    }

    if(this.options.debug) console.log('[gaTrackers] Initialized. UA: ' + options.UA);

    window._gaq=[['_setAccount', options.UA]];
    this.initialized = true;

    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)
    }(document,'script'));

    return this;
}


/**
 * Track pageView
 * @return {Object} gaTrackers
 */
gaTrackers.prototype.pv = function(){
    if(!this.initialized) return;

    var name = (typeof arguments[0] === 'object') ? arguments[0].data.name : arguments[0];

    window._gaq.push(['_trackPageview', name]);

    if(this.options.debug){
        console.log('[gaTrackers] PageView: "'+ name + '"');
    }
};

/**
 * Track Event
 * @return {Object} gaTrackers
 */
gaTrackers.prototype.event = function(){
    if(!this.initialized) return;

    var data = (typeof arguments[0] === 'object') ? arguments[0].data : {category: arguments[0], action: arguments[1], label: arguments[2]};

    _gaq.push(['_trackEvent', data.category, data.action, data.label]);

    if(this.options.debug){
        console.log('[gaTrackers] Event: ["'+ data.category + '", "'+ data.action + '", "'+ data.label + '"]');
    }
};


/**
 * Wait an event before call track
 * @param  {String} event    jQuery event name
 * @param  {String} selector jQuery selector
 * @return {Object}          mapped events
 */
gaTrackers.prototype.when = function(event, selector){
    var that = this;

    return {
        pv: function(){
            $(selector).on(event, {name: arguments[0]}, $.proxy(that.pv, that));
        },
        event: function(){
            $(selector).on(event, {category: arguments[0], action: arguments[1], label: arguments[2]}, $.proxy(that.event, that));
        }
    };
};


/**
 * Bind more than one event
 * @param  {Object} data Array of data
 * @return undefined
 */
gaTrackers.prototype.bind = function(data){
    var that = this;

    $.each(data, function(key, val){
        var e = key.split(" ")[0],
            s = key.split(" ")[1]
            that.when(e, s).event.apply(that, val);
    })

}


window.gaTrackers = gaTrackers;

})(jQuery)