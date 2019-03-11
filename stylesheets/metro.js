/*
 * Metro 4 Components Library v4.2.36 build 717 (https://metroui.org.ua)
 * Copyright 2018 Sergey Pimenov
 * Licensed under MIT
 */
 (function( factory ) {
    if ( typeof define === 'function' && define.amd ) {
        define([ 'jquery' ], factory );
    } else {
        factory( jQuery );
    }
}(function( jQuery ) {

'use strict';

var $ = jQuery;

'use strict';

var $ = jQuery;

if (typeof jQuery === 'undefined') {
    throw new Error('Metro 4 requires jQuery!');
}

if ('MutationObserver' in window === false) {
    throw new Error('Metro 4 requires MutationObserver!');
}

var meta_init = $("meta[name='metro4:init']").attr("content");
var meta_locale = $("meta[name='metro4:locale']").attr("content");
var meta_week_start = $("meta[name='metro4:week_start']").attr("content");
var meta_date_format = $("meta[name='metro4:date_format']").attr("content");
var meta_date_format_input = $("meta[name='metro4:date_format_input']").attr("content");
var meta_animation_duration = $("meta[name='metro4:animation_duration']").attr("content");
var meta_callback_timeout = $("meta[name='metro4:callback_timeout']").attr("content");
var meta_timeout = $("meta[name='metro4:timeout']").attr("content");
var meta_scroll_multiple = $("meta[name='metro4:scroll_multiple']").attr("content");
var meta_cloak = $("meta[name='metro4:cloak']").attr("content"); //default or fade
var meta_cloak_duration = $("meta[name='metro4:cloak_duration']").attr("content"); //100

if (window.METRO_INIT === undefined) {
    window.METRO_INIT = meta_init !== undefined ? JSON.parse(meta_init) : true;
}
if (window.METRO_DEBUG === undefined) {window.METRO_DEBUG = true;}

if (window.METRO_WEEK_START === undefined) {
    window.METRO_WEEK_START = meta_week_start !== undefined ? parseInt(meta_week_start) : 0;
}
if (window.METRO_DATE_FORMAT === undefined) {
    window.METRO_DATE_FORMAT = meta_date_format !== undefined ? meta_date_format : "%Y-%m-%d";
}
if (window.METRO_DATE_FORMAT_INPUT === undefined) {
    window.METRO_DATE_FORMAT_INPUT = meta_date_format_input !== undefined ? meta_date_format_input : "%Y-%m-%d";
}
if (window.METRO_LOCALE === undefined) {
    window.METRO_LOCALE = meta_locale !== undefined ? meta_locale : 'en-US';
}
if (window.METRO_ANIMATION_DURATION === undefined) {
    window.METRO_ANIMATION_DURATION = meta_animation_duration !== undefined ? parseInt(meta_animation_duration) : 300;
}
if (window.METRO_CALLBACK_TIMEOUT === undefined) {
    window.METRO_CALLBACK_TIMEOUT = meta_callback_timeout !== undefined ? parseInt(meta_callback_timeout) : 500;
}
if (window.METRO_TIMEOUT === undefined) {
    window.METRO_TIMEOUT = meta_timeout !== undefined ? parseInt(meta_timeout) : 2000;
}
if (window.METRO_SCROLL_MULTIPLE === undefined) {
    window.METRO_SCROLL_MULTIPLE = meta_scroll_multiple !== undefined ? parseInt(meta_scroll_multiple) : 20;
}
if (window.METRO_CLOAK_REMOVE === undefined) {
    window.METRO_CLOAK_REMOVE = meta_cloak !== undefined ? (""+meta_cloak).toLowerCase() : "fade";
}
if (window.METRO_CLOAK_DURATION === undefined) {
    window.METRO_CLOAK_DURATION = meta_cloak_duration !== undefined ? parseInt(meta_cloak_duration) : 500;
}
if (window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE === undefined) {window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE = true;}
if (window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS === undefined) {window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS = true;}
if (window.METRO_HOTKEYS_FILTER_TEXT_INPUTS === undefined) {window.METRO_HOTKEYS_FILTER_TEXT_INPUTS = true;}
if (window.METRO_HOTKEYS_BUBBLE_UP === undefined) {window.METRO_HOTKEYS_BUBBLE_UP = false;}
if (window.METRO_THROWS === undefined) {window.METRO_THROWS = true;}

window.METRO_MEDIA = [];

if ( typeof Object.create !== 'function' ) {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

if (typeof Object.values !== 'function') {
    Object.values = function(obj) {
        return Object.keys(obj).map(function(e) {
            return obj[e]
        });
    }
}

var isTouch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

var Metro = {

    version: "4.2.36",
    versionFull: "4.2.36.717 ",
    isTouchable: isTouch,
    fullScreenEnabled: document.fullscreenEnabled,
    sheet: null,

    controlsPosition: {
        INSIDE: "inside",
        OUTSIDE: "outside"
    },

    groupMode: {
        ONE: "one",
        MULTI: "multi"
    },

    aspectRatio: {
        HD: "hd",
        SD: "sd",
        CINEMA: "cinema"
    },

    fullScreenMode: {
        WINDOW: "window",
        DESKTOP: "desktop"
    },

    position: {
        TOP: "top",
        BOTTOM: "bottom",
        LEFT: "left",
        RIGHT: "right",
        TOP_RIGHT: "top-right",
        TOP_LEFT: "top-left",
        BOTTOM_LEFT: "bottom-left",
        BOTTOM_RIGHT: "bottom-right",
        LEFT_BOTTOM: "left-bottom",
        LEFT_TOP: "left-top",
        RIGHT_TOP: "right-top",
        RIGHT_BOTTOM: "right-bottom"
    },

    popoverEvents: {
        CLICK: "click",
        HOVER: "hover",
        FOCUS: "focus"
    },

    stepperView: {
        SQUARE: "square",
        CYCLE: "cycle",
        DIAMOND: "diamond"
    },

    listView: {
        LIST: "list",
        CONTENT: "content",
        ICONS: "icons",
        ICONS_MEDIUM: "icons-medium",
        ICONS_LARGE: "icons-large",
        TILES: "tiles",
        TABLE: "table"
    },

    events: {
        click: 'click.metro',
        start: isTouch ? 'touchstart.metro' : 'mousedown.metro',
        stop: isTouch ? 'touchend.metro' : 'mouseup.metro',
        move: isTouch ? 'touchmove.metro' : 'mousemove.metro',
        enter: isTouch ? 'touchstart.metro' : 'mouseenter.metro',
        leave: 'mouseleave.metro',
        focus: 'focus.metro',
        blur: 'blur.metro',
        resize: 'resize.metro',
        keyup: 'keyup.metro',
        keydown: 'keydown.metro',
        keypress: 'keypredd.metro',
        dblclick: 'dblclick.metro',
        input: 'input.metro',
        change: 'change.metro',
        cut: 'cut.metro',
        paste: 'paste.metro',
        scroll: 'scroll.metro',
        scrollStart: 'scrollstart.metro',
        scrollStop: 'scrollstop.metro',
        mousewheel: 'mousewheel.metro',
        inputchange: "change.metro input.metro propertychange.metro cut.metro paste.metro copy.metro",
        dragstart: "dragstart.metro",
        dragend: "dragend.metro",
        dragenter: "dragenter.metro",
        dragover: "dragover.metro",
        dragleave: "dragleave.metro",
        drop: 'drop.metro',
        drag: 'drag.metro'
    },

    keyCode: {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        BREAK: 19,
        CAPS: 20,
        ESCAPE: 27,
        SPACE: 32,
        PAGEUP: 33,
        PAGEDOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        COMMA: 188
    },

    media_queries: {
        FS: "(min-width: 0px)",
        XS: "(min-width: 360px)",
        SM: "(min-width: 576px)",
        MD: "(min-width: 768px)",
        LG: "(min-width: 992px)",
        XL: "(min-width: 1200px)",
        XXL: "(min-width: 1452px)"
    },

    media_sizes: {
        FS: 0,
        XS: 360,
        SM: 576,
        LD: 640,
        MD: 768,
        LG: 992,
        XL: 1200,
        XXL: 1452
    },

    media_mode: {
        FS: "fs",
        XS: "xs",
        SM: "sm",
        MD: "md",
        LG: "lg",
        XL: "xl",
        XXL: "xxl"
    },

    media_modes: ["fs","xs","sm","md","lg","xl","xxl"],

    actions: {
        REMOVE: 1,
        HIDE: 2
    },

    hotkeys: [],

    about: function(f){
        console.log("Metro 4 - v" + (f === true ? this.versionFull : this.version));
    },

    aboutDlg: function(f){
        alert("Metro 4 - v" + (f === true ? this.versionFull : this.version));
    },

    ver: function(f){
        return (f === true ? this.versionFull : this.version);
    },

    observe: function(){
        'use strict';
        var observer, observerCallback;
        var observerConfig = {
            childList: true,
            attributes: true,
            subtree: true
        };
        observerCallback = function(mutations){
            mutations.map(function(mutation){

                if (mutation.type === 'attributes' && mutation.attributeName !== "data-role") {
                    var element = $(mutation.target);
                    var mc = element.data('metroComponent');
                    if (mc !== undefined) {
                        $.each(mc, function(){
                            'use strict';
                            var plug = element.data(this);
                            if (plug) plug.changeAttribute(mutation.attributeName);
                        });
                    }
                } else

                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    var i, obj, widgets = {}, plugins = {};
                    var nodes = mutation.addedNodes;

                    for(i = 0; i < nodes.length; i++) {

                        var node = mutation.addedNodes[i];

                        if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') {
                            continue ;
                        }
                        obj = $(mutation.addedNodes[i]);

                        plugins = obj.find("[data-role]");
                        if (obj.data('role') !== undefined) {
                            widgets = $.merge(plugins, obj);
                        } else {
                            widgets = plugins;
                        }
                        if (widgets.length) {
                            Metro.initWidgets(widgets);
                        }
                    }

                } else  {
                    //console.log(mutation);
                }
            });
        };
        observer = new MutationObserver(observerCallback);
        observer.observe($("html")[0], observerConfig);
    },

    init: function(){
        var widgets = $("[data-role]");
        var hotkeys = $("[data-hotkey]");
        var html = $("html");

        if (isTouch === true) {
            html.addClass("metro-touch-device");
        } else {
            html.addClass("metro-no-touch-device");
        }

        this.sheet = Utils.newCssSheet();


        window.METRO_MEDIA = [];
        $.each(Metro.media_queries, function(key, query){
            if (Utils.media(query)) {
                METRO_MEDIA.push(Metro.media_mode[key]);
            }
        });

        this.observe();

        this.initHotkeys(hotkeys);
        this.initWidgets(widgets);

        this.about(true);

        if (METRO_CLOAK_REMOVE !== "fade") {
            $(".m4-cloak").removeClass("m4-cloak");
        } else {
            $(".m4-cloak").animate({
                opacity: 1
            }, METRO_CLOAK_REMOVE, function(){
                $(".m4-cloak").removeClass("m4-cloak");
            })
        }

        return this;
    },

    initHotkeys: function(hotkeys){
        $.each(hotkeys, function(){
            'use strict';
            var element = $(this);
            var hotkey = element.data('hotkey') ? element.data('hotkey').toLowerCase() : false;

            if (hotkey === false) {
                return;
            }

            if (element.data('hotKeyBonded') === true ) {
                return;
            }

            Metro.hotkeys.push(hotkey);

            $(document).on(Metro.events.keyup, null, hotkey, function(e){
                if (element === undefined) return;

                if (element[0].tagName === 'A' &&
                    element.attr('href') !== undefined &&
                    element.attr('href').trim() !== '' &&
                    element.attr('href').trim() !== '#') {
                    document.location.href = element.attr('href');
                } else {
                    element.click();
                }
                return METRO_HOTKEYS_BUBBLE_UP;
            });

            element.data('hotKeyBonded', true);
        });
    },

    initWidgets: function(widgets) {
        var that = this;

        $.each(widgets, function () {
            'use strict';
            var $this = $(this), w = this;
            var roles = $this.data('role').split(/\s*,\s*/);
            roles.map(function (func) {
                if ($.fn[func] !== undefined && $this.attr("data-role-"+func) === undefined) {
                    $.fn[func].call($this);
                    $this.attr("data-role-"+func, true);

                    var mc = $this.data('metroComponent');

                    if (mc === undefined) {
                        mc = [func];
                    } else {
                        mc.push(func);
                    }
                    $this.data('metroComponent', mc);
                }
            });
        });
    },

    plugin: function(name, object){
        'use strict';
        $.fn[name] = function( options ) {
            return this.each(function() {
                $.data( this, name, Object.create(object).init(options, this ));
            });
        };
    },

    destroyPlugin: function(element, name){
        var p, mc;
        element = Utils.isJQueryObject(element) ? element[0] : element;
        p = $(element).data(name);

        if (!Utils.isValue(p)) {
            throw new Error("Component can not be destroyed: the element is not a Metro 4 component.");
        }

        if (!Utils.isFunc(p['destroy'])) {
            throw new Error("Component can not be destroyed: method destroy not found.");
        }

        p['destroy']();
        mc = $(element).data("metroComponent");
        Utils.arrayDelete(mc, name);
        $(element).data("metroComponent", mc);
        $.removeData(element, name);
        $(element).removeAttr("data-role-"+name);
    },

    destroyPluginAll: function(element){
        element = Utils.isJQueryObject(element) ? element[0] : element;
        var mc = $(element).data("metroComponent");

        if (mc !== undefined && mc.length > 0) $.each(mc, function(){
            'use strict';
            Metro.destroyPlugin(element, this);
        });
    },

    initPlugin: function(element, name){
        element = $(element);
        try {
            if ($.fn[name] !== undefined && element.attr("data-role-"+name) === undefined) {
                $.fn[name].call(element);
                element.attr("data-role-"+name, true);

                var mc = element.data('metroComponent');

                if (mc === undefined) {
                    mc = [name];
                } else {
                    mc.push(name);
                }
                element.data('metroComponent', mc);
            }
        } catch (e) {
            console.log(e.message, e.stack);
        }
    },

    reinitPlugin: function(element, name){
        this.destroyPlugin(element, name);
        this.initPlugin(element, name);
    },

    reinitPluginAll: function(element){
        var mc = $(element).data("metroComponent");

        if (mc !== undefined && mc.length > 0) $.each(mc, function(){
            'use strict';
            Metro.reinitPlugin(element, this);
        });
    },

    noop: function(){},
    noop_true: function(){return true;},
    noop_false: function(){return false;},

    stop: function(e){
        e.stopPropagation();
        e.preventDefault();
    },

    requestFullScreen: function(element){
        if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else {
            element.requestFullscreen();
        }
    },

    exitFullScreen: function(){
        if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else {
            document.exitFullscreen();
        }
    },

    inFullScreen: function(){
        var fsm = (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
        return fsm !== undefined;
    }
};

window['Metro'] = Metro;

$(window).on(Metro.events.resize, function(){
    window.METRO_MEDIA = [];
    $.each(Metro.media_queries, function(key, query){
        if (Utils.media(query)) {
            METRO_MEDIA.push(Metro.media_mode[key]);
        }
    });
});



$.fn.extend({
    toggleAttr: function(a, v){
        return this.each(function(){
            var el = $(this);
            if (v !== undefined) {
                el.attr(a, v);
            } else {
                if (el.attr(a) !== undefined) {
                    el.removeAttr(a);
                } else {
                    el.attr(a, ""+a);
                }
            }
        });
    },
    clearClasses: function(){
        return this.each(function(){
            this.className = "";
        });
    }
});

Array.prototype.shuffle = function () {
    var currentIndex = this.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = this[currentIndex];
        this[currentIndex] = this[randomIndex];
        this[randomIndex] = temporaryValue;
    }

    return this;
};

Array.prototype.clone = function () {
    return this.slice(0);
};

Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

if (!Array.from) {
    Array.from = function(val) {
        var i, a = [];

        if (val.length === undefined && typeof val === "object") {
            return Object.values(val);
        }

        if (val.length !== undefined) {
            for(i = 0; i < val.length; i++) {
                a.push(val[i]);
            }
            return a;
        }

        throw new Error("Value can not be converted to array");
    };
}

if (typeof Array.contains !== "function") {
    Array.prototype.contains = function(val, from){
        return this.indexOf(val, from) > -1;
    }
}

/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param  n: length of decimal
 * @param  x: length of whole part
 * @param  s: sections delimiter
 * @param  c: decimal delimiter
 */
Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.contains = function() {
    return !!~String.prototype.indexOf.apply(this, arguments);
};

String.prototype.toDate = function(format, locale) {
    var result;
    var normalized, normalizedFormat, formatItems, dateItems, checkValue;
    var monthIndex, dayIndex, yearIndex, hourIndex, minutesIndex, secondsIndex;
    var year, month, day, hour, minute, second;
    var parsedMonth;

    locale = locale || "en-US";

    var monthNameToNumber = function(month){
        var d, months, index, i;

        month = month.substr(0, 3);

        if (
               locale !== undefined
            && locale !== "en-US"
            && Locales !== undefined
            && Locales[locale] !== undefined
            && Locales[locale]['calendar'] !== undefined
            && Locales[locale]['calendar']['months'] !== undefined
        ) {
            months = Locales[locale]['calendar']['months'];
            for(i = 12; i < months.length; i++) {
                if (months[i].toLowerCase() === month.toLowerCase()) {
                    index = i - 12;
                    break;
                }
            }
            month = Locales["en-US"]['calendar']['months'][index];
        }

        d = Date.parse(month + " 1, 1972");
        if(!isNaN(d)){
            return new Date(d).getMonth() + 1;
        }
        return -1;
    };

    if (format === undefined || format === null || format === "") {
        return new Date(this);
    }

    // normalized      = this.replace(/[^a-zA-Z0-9%]/g, '-');
    normalized      = this.replace(/[\/,.:\s]/g, '-');
    normalizedFormat= format.toLowerCase().replace(/[^a-zA-Z0-9%]/g, '-');
    formatItems     = normalizedFormat.split('-');
    dateItems       = normalized.split('-');
    checkValue      = normalized.replace(/\-/g,"");

    if (checkValue.trim() === "") {
        return "Invalid Date";
    }

    monthIndex  = formatItems.indexOf("mm") > -1 ? formatItems.indexOf("mm") : formatItems.indexOf("%m");
    dayIndex    = formatItems.indexOf("dd") > -1 ? formatItems.indexOf("dd") : formatItems.indexOf("%d");
    yearIndex   = formatItems.indexOf("yyyy") > -1 ? formatItems.indexOf("yyyy") : formatItems.indexOf("yy") > -1 ? formatItems.indexOf("yy") : formatItems.indexOf("%y");
    hourIndex     = formatItems.indexOf("hh") > -1 ? formatItems.indexOf("hh") : formatItems.indexOf("%h");
    minutesIndex  = formatItems.indexOf("ii") > -1 ? formatItems.indexOf("ii") : formatItems.indexOf("mi") > -1 ? formatItems.indexOf("mi") : formatItems.indexOf("%i");
    secondsIndex  = formatItems.indexOf("ss") > -1 ? formatItems.indexOf("ss") : formatItems.indexOf("%s");

    if (monthIndex > -1 && dateItems[monthIndex] !== "") {
        if (isNaN(parseInt(dateItems[monthIndex]))) {
            dateItems[monthIndex] = monthNameToNumber(dateItems[monthIndex]);
            if (dateItems[monthIndex] === -1) {
                return "Invalid Date";
            }
        } else {
            parsedMonth = parseInt(dateItems[monthIndex]);
            if (parsedMonth < 1 || parsedMonth > 12) {
                return "Invalid Date";
            }
        }
    } else {
        return "Invalid Date";
    }

    year  = yearIndex >-1 && dateItems[yearIndex] !== "" ? dateItems[yearIndex] : null;
    month = monthIndex >-1 && dateItems[monthIndex] !== "" ? dateItems[monthIndex] : null;
    day   = dayIndex >-1 && dateItems[dayIndex] !== "" ? dateItems[dayIndex] : null;

    hour    = hourIndex >-1 && dateItems[hourIndex] !== "" ? dateItems[hourIndex] : null;
    minute  = minutesIndex>-1 && dateItems[minutesIndex] !== "" ? dateItems[minutesIndex] : null;
    second  = secondsIndex>-1 && dateItems[secondsIndex] !== "" ? dateItems[secondsIndex] : null;

    result = new Date(year,month-1,day,hour,minute,second);

    return result;
};

String.prototype.toArray = function(delimiter, type, format){
    var str = this;
    var a;

    type = type || "string";
    delimiter = delimiter || ",";
    format = format === undefined || format === null ? false : format;

    a = (""+str).split(delimiter);

    return a.map(function(s){
        var result;

        switch (type) {
            case "int":
            case "integer": result = parseInt(s); break;
            case "number":
            case "float": result = parseFloat(s); break;
            case "date": result = !format ? new Date(s) : s.toDate(format); break;
            default: result = s.trim();
        }

        return result;
    });
};

Date.prototype.getWeek = function (dowOffset) {
    var nYear, nday, newYear, day, daynum, weeknum;

    dowOffset = !Utils.isValue(dowOffset) ? METRO_WEEK_START : typeof dowOffset === 'number' ? parseInt(dowOffset) : 0;
    newYear = new Date(this.getFullYear(),0,1);
    day = newYear.getDay() - dowOffset;
    day = (day >= 0 ? day : day + 7);
    daynum = Math.floor((this.getTime() - newYear.getTime() -
        (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;

    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};

Date.prototype.getYear = function(){
    return this.getFullYear().toString().substr(-2);
};

Date.prototype.format = function(format, locale){

    if (locale === undefined) {
        locale = "en-US";
    }

    var cal = (Metro.locales !== undefined && Metro.locales[locale] !== undefined ? Metro.locales[locale] : Metro.locales["en-US"])['calendar'];

    var date = this;
    var nDay = date.getDay(),
        nDate = date.getDate(),
        nMonth = date.getMonth(),
        nYear = date.getFullYear(),
        nHour = date.getHours(),
        aDays = cal['days'],
        aMonths = cal['months'],
        aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
        isLeapYear = function() {
            return (nYear%4===0 && nYear%100!==0) || nYear%400===0;
        },
        getThursday = function() {
            var target = new Date(date);
            target.setDate(nDate - ((nDay+6)%7) + 3);
            return target;
        },
        zeroPad = function(nNum, nPad) {
            return ('' + (Math.pow(10, nPad) + nNum)).slice(1);
        };
    return format.replace(/(%[a-z])/gi, function(sMatch) {
        return {
            '%a': aDays[nDay].slice(0,3),
            '%A': aDays[nDay],
            '%b': aMonths[nMonth].slice(0,3),
            '%B': aMonths[nMonth],
            '%c': date.toUTCString(),
            '%C': Math.floor(nYear/100),
            '%d': zeroPad(nDate, 2),
            'dd': zeroPad(nDate, 2),
            '%e': nDate,
            '%F': date.toISOString().slice(0,10),
            '%G': getThursday().getFullYear(),
            '%g': ('' + getThursday().getFullYear()).slice(2),
            '%H': zeroPad(nHour, 2),
            // 'HH': zeroPad(nHour, 2),
            '%I': zeroPad((nHour+11)%12 + 1, 2),
            '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth>1 && isLeapYear()) ? 1 : 0), 3),
            '%k': '' + nHour,
            '%l': (nHour+11)%12 + 1,
            '%m': zeroPad(nMonth + 1, 2),
            // 'mm': zeroPad(nMonth + 1, 2),
            '%M': zeroPad(date.getMinutes(), 2),
            // 'MM': zeroPad(date.getMinutes(), 2),
            '%p': (nHour<12) ? 'AM' : 'PM',
            '%P': (nHour<12) ? 'am' : 'pm',
            '%s': Math.round(date.getTime()/1000),
            // 'ss': Math.round(date.getTime()/1000),
            '%S': zeroPad(date.getSeconds(), 2),
            // 'SS': zeroPad(date.getSeconds(), 2),
            '%u': nDay || 7,
            '%V': (function() {
                var target = getThursday(),
                    n1stThu = target.valueOf();
                target.setMonth(0, 1);
                var nJan1 = target.getDay();
                if (nJan1!==4) target.setMonth(0, 1 + ((4-nJan1)+7)%7);
                return zeroPad(1 + Math.ceil((n1stThu-target)/604800000), 2);
            })(),
            '%w': '' + nDay,
            '%x': date.toLocaleDateString(),
            '%X': date.toLocaleTimeString(),
            '%y': ('' + nYear).slice(2),
            // 'yy': ('' + nYear).slice(2),
            '%Y': nYear,
            // 'YYYY': nYear,
            '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
            '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
        }[sMatch] || sMatch;
    });
};

Date.prototype.addHours = function(n) {
    this.setTime(this.getTime() + (n*60*60*1000));
    return this;
};

Date.prototype.addDays = function(n) {
    this.setDate(this.getDate() + (n));
    return this;
};

Date.prototype.addMonths = function(n) {
    this.setMonth(this.getMonth() + (n));
    return this;
};

Date.prototype.addYears = function(n) {
    this.setFullYear(this.getFullYear() + (n));
    return this;
};


var Utils = {
    isUrl: function (val) {
        return /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?/.test(val);
    },

    isTag: function(val){
        return /^<\/?[\w\s="/.':;#-\/\?]+>/gi.test(val);
    },

    isColor: function (val) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(val);
    },

    isEmbedObject: function(val){
        var embed = ["iframe", "object", "embed", "video"];
        var result = false;
        $.each(embed, function(i, v){
            'use strict';
            if (typeof val === "string" && val.toLowerCase() === v) {
                result = true;
            } else if (val.nodeType !== undefined && val.tagName.toLowerCase() === v) {
                result = true;
            }
        });
        return result;
    },

    isVideoUrl: function(val){
        return /youtu\.be|youtube|vimeo/gi.test(val);
    },

    isDate: function(val, format){
        var result;

        if (typeof val === "object" && Utils.isFunc(val['getMonth'])) {
            return true;
        }

        if (Utils.isValue(format)) {
            result = String(val).toDate(format);
        } else {
            result = String(new Date(val));
        }

        return result !== "Invalid Date";
    },

    isDateObject: function(v){
        return typeof v === 'object' && v['getMonth'] !== undefined;
    },

    isInt: function(n){
        return Number(n) === n && n % 1 === 0;
    },

    isFloat: function(n){
        return Number(n) === n && n % 1 !== 0;
    },

    isTouchDevice: function() {
        return (('ontouchstart' in window)
            || (navigator.MaxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0));
    },

    isFunc: function(f){
        return Utils.isType(f, 'function');
    },

    isObject: function(o){
        return Utils.isType(o, 'object')
    },

    isArray: function(a){
        return Array.isArray(a);
    },

    isType: function(o, t){
        if (o === undefined || o === null) {
            return false;
        }

        if (typeof o === t) {
            return o;
        }

        if (Utils.isTag(o) || Utils.isUrl(o)) {
            return false;
        }

        if (typeof window[o] === t) {
            return window[o];
        }

        if (typeof o === 'string' && o.indexOf(".") === -1) {
            return false;
        }

        if (typeof o === 'string' && o.indexOf(" ") !== -1) {
            return false;
        }

        if (typeof o === 'string' && o.indexOf("(") !== -1) {
            return false;
        }

        if (typeof o === 'string' && o.indexOf("[") !== -1) {
            return false;
        }

        if (typeof o === "number" && t.toLowerCase() !== "number") {
            return false;
        }

        var ns = o.split(".");
        var i, context = window;

        for(i = 0; i < ns.length; i++) {
            context = context[ns[i]];
        }

        return typeof context === t ? context : false;
    },

    isMetroObject: function(el, type){
        var $el = $(el), el_obj = $el.data(type);
        if ($el.length === 0) {
            console.log(type + ' ' + el + ' not found!');
            return false;
        }

        if (el_obj === undefined) {
            console.log('Element not contain role '+ type +'! Please add attribute data-role="'+type+'" to element ' + el);
            return false;
        }

        return true;
    },

    isJQueryObject: function(el){
        return (typeof jQuery === "function" && el instanceof jQuery);
    },

    embedObject: function(val){
        if (typeof  val !== "string" ) {
            val = Utils.isJQueryObject(val) ? val.html() : val.innerHTML;
        }
        return "<div class='embed-container'>" + val + "</div>";
    },

    embedUrl: function(val){
        if (val.indexOf("youtu.be") !== -1) {
            val = "https://www.youtube.com/embed/" + val.split("/").pop();
        }
        return "<div class='embed-container'><iframe src='"+val+"'></iframe></div>";
    },

    secondsToTime: function(secs) {
        var hours = Math.floor(secs / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

        return {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
    },

    hex2rgba: function(hex, alpha){
        var c;
        alpha = isNaN(alpha) ? 1 : alpha;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length=== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
        }
        throw new Error('Hex2rgba error. Bad Hex value');
    },

    random: function(from, to){
        return Math.floor(Math.random()*(to-from+1)+from);
    },

    uniqueId: function () {
        "use strict";
        var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },

    elementId: function(prefix){
        return prefix+"-"+(new Date()).getTime()+Utils.random(1, 1000);
    },

    secondsToFormattedString: function(time){
        var sec_num = parseInt(time, 10);
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        return [hours, minutes, seconds].join(":");
    },

    callback: function(f, args, context){
        return Utils.exec(f, args, context);
    },

    func: function(f){
        return new Function("a", f);
    },

    exec: function(f, args, context){
        var result;
        if (f === undefined || f === null) {return false;}
        var func = Utils.isFunc(f);
        if (func === false) {
            func = Utils.func(f);
        }

        try {
            result = func.apply(context, args);
        } catch (err) {
            result = null;
            if (METRO_THROWS === true) {
                throw err;
            }
        }
        return result;
    },

    isOutsider: function(el) {
        el = Utils.isJQueryObject(el) ? el : $(el);
        var rect;
        var clone = el.clone();

        clone.removeAttr("data-role").css({
            visibility: "hidden",
            position: "absolute",
            display: "block"
        });
        el.parent().append(clone);

        rect = clone[0].getBoundingClientRect();
        clone.remove();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    inViewport: function(el){
        var rect = Utils.rect(el);

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    rect: function(el){
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        return el.getBoundingClientRect();
    },

    getCursorPosition: function(el, e){
        var a = Utils.rect(el);
        return {
            x: Utils.pageXY(e).x - a.left - window.pageXOffset,
            y: Utils.pageXY(e).y - a.top - window.pageYOffset
        };
    },

    getCursorPositionX: function(el, e){
        return Utils.getCursorPosition(el, e).x;
    },

    getCursorPositionY: function(el, e){
        return Utils.getCursorPosition(el, e).y;
    },

    objectLength: function(obj){
        return Object.keys(obj).length;
    },

    percent: function(total, part, round_value){
        if (total === 0) {
            return 0;
        }
        var result = part * 100 / total;
        return round_value === true ? Math.round(result) : Math.round(result * 100) / 100;
    },

    camelCase: function(str){
        return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    },

    dashedName: function(str){
        return str.replace(/([A-Z])/g, function(u) { return "-" + u.toLowerCase(); });
    },

    objectShift: function(obj){
        var min = 0;
        $.each(obj, function(i){
            if (min === 0) {
                min = i;
            } else {
                if (min > i) {
                    min = i;
                }
            }
        });
        delete obj[min];

        return obj;
    },

    objectDelete: function(obj, key){
        if (obj[key] !== undefined) delete obj[key];
    },

    arrayDeleteByMultipleKeys: function(arr, keys){
        keys.forEach(function(ind){
            delete arr[ind];
        });
        return arr.filter(function(item){
            return item !== undefined;
        })
    },

    arrayDelete: function(arr, val){
        arr.splice(arr.indexOf(val), 1);
    },

    arrayDeleteByKey: function(arr, key){
        arr.splice(key, 1);
    },

    nvl: function(data, other){
        return data === undefined || data === null ? other : data;
    },

    objectClone: function(obj){
        var copy = {};
        for(var key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = obj[key];
            }
        }
        return copy;
    },

    github: function(repo, callback){
        var that = this;
        $.ajax({
            url: 'https://api.github.com/repos/' + repo,
            dataType: 'jsonp'
        })
        .done(function(data){
            that.callback(callback, [data.data]);
        });
    },

    detectIE: function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    },

    detectChrome: function(){
        return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    },

    md5: function(s){
        return hex_md5(s);
    },

    encodeURI: function(str){
        return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
    },

    pageHeight: function(){
        var body = document.body,
            html = document.documentElement;

        return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    },

    cleanPreCode: function(selector){
        var els = Array.prototype.slice.call(document.querySelectorAll(selector), 0);

        els.forEach(function(el){
            var txt = el.textContent
                .replace(/^[\r\n]+/, "")	// strip leading newline
                .replace(/\s+$/g, "");

            if (/^\S/gm.test(txt)) {
                el.textContent = txt;
                return;
            }

            var mat, str, re = /^[\t ]+/gm, len, min = 1e3;

            while (mat = re.exec(txt)) {
                len = mat[0].length;

                if (len < min) {
                    min = len;
                    str = mat[0];
                }
            }

            if (min === 1e3)
                return;

            el.textContent = txt.replace(new RegExp("^" + str, 'gm'), "");
        });
    },

    coords: function(el){
        if (Utils.isJQueryObject(el)) {
            el = el[0];
        }

        var box = el.getBoundingClientRect();

        return {
            top: box.top + window.pageYOffset,
            left: box.left + window.pageXOffset
        };
    },

    positionXY: function(e, t){
        switch (t) {
            case 'client': return Utils.clientXY(e);
            case 'screen': return Utils.screenXY(e);
            case 'page': return Utils.pageXY(e);
            default: return {x: 0, y: 0}
        }
    },

    clientXY: function(e){
        return {
            x: e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
            y: e.changedTouches ? e.changedTouches[0].clientY : e.clientY
        };
    },

    screenXY: function(e){
        return {
            x: e.changedTouches ? e.changedTouches[0].screenX : e.screenX,
            y: e.changedTouches ? e.changedTouches[0].screenY : e.screenY
        };
    },

    pageXY: function(e){
        return {
            x: e.changedTouches ? e.changedTouches[0].pageX : e.pageX,
            y: e.changedTouches ? e.changedTouches[0].pageY : e.pageY
        };
    },

    isRightMouse: function(e){
        return "which" in e ? e.which === 3 : "button" in e ? e.button === 2 : undefined;
    },

    hiddenElementSize: function(el, includeMargin){
        var clone = $(el).clone();
        clone.removeAttr("data-role").css({
            visibility: "hidden",
            position: "absolute",
            display: "block"
        });
        $("body").append(clone);

        if (includeMargin === undefined) {
            includeMargin = false;
        }

        var width = clone.outerWidth(includeMargin);
        var height = clone.outerHeight(includeMargin);
        clone.remove();
        return {
            width: width,
            height: height
        }
    },

    getStyle: function(el, pseudo){
        if (Utils.isJQueryObject(el) === true) {
            el  = el[0];
        }
        return window.getComputedStyle(el, pseudo);
    },

    getStyleOne: function(el, property){
        return Utils.getStyle(el).getPropertyValue(property);
    },

    getTransformMatrix: function(el, returnArray){
        var computedMatrix = Utils.getStyleOne(el, "transform");
        var a = computedMatrix
            .replace("matrix(", '')
            .slice(0, -1)
            .split(',');
        return returnArray !== true ? {
            a: a[0],
            b: a[1],
            c: a[2],
            d: a[3],
            tx: a[4],
            ty: a[5]
        } : a;
    },

    computedRgbToHex: function(rgb){
        var a = rgb.replace(/[^\d,]/g, '').split(',');
        var result = "#", i;

        for(i = 0; i < 3; i++) {
            var h = parseInt(a[i]).toString(16);
            result += h.length === 1 ? "0" + h : h;
        }

        return result;
    },

    computedRgbToRgba: function(rgb, alpha){
        var a = rgb.replace(/[^\d,]/g, '').split(',');
        if (alpha === undefined) {
            alpha = 1;
        }
        a.push(alpha);
        return "rgba("+a.join(",")+")";
    },

    computedRgbToArray: function(rgb){
        return rgb.replace(/[^\d,]/g, '').split(',');
    },

    hexColorToArray: function(hex){
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length === 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return [(c>>16)&255, (c>>8)&255, c&255];
        }
        return [0,0,0];
    },

    hexColorToRgbA: function(hex, alpha){
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length === 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255, alpha ? alpha : 1].join(',')+')';
        }
        return 'rgba(0,0,0,1)';
    },

    getInlineStyles: function(el){
        var styles = {};
        if (Utils.isJQueryObject(el)) {
            el = el[0];
        }
        for (var i = 0, l = el.style.length; i < l; i++) {
            var s = el.style[i];
            styles[s] = el.style[s];
        }

        return styles;
    },

    updateURIParameter: function(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    },

    getURIParameter: function(url, name){
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    getLocales: function(){
        return Object.keys(Metro.locales);
    },

    addLocale: function(locale){
        Metro.locales = $.extend( {}, Metro.locales, locale );
    },

    strToArray: function(str, delimiter, type, format){
        var a;

        if (!Utils.isValue(delimiter)) {
            delimiter = ",";
        }

        if (!Utils.isValue(type)) {
            type = "string";
        }

        a = (""+str).split(delimiter);

        return a.map(function(s){
            var result;

            switch (type) {
                case "int":
                case "integer": result = parseInt(s); break;
                case "number":
                case "float": result = parseFloat(s); break;
                case "date": result = !Utils.isValue(format) ? new Date(s) : s.toDate(format); break;
                default: result = s.trim();
            }

            return result;
        })
    },

    aspectRatioH: function(width, a){
        if (a === "16/9") return width * 9 / 16;
        if (a === "21/9") return width * 9 / 21;
        if (a === "4/3") return width * 3 / 4;
    },

    aspectRatioW: function(height, a){
        if (a === "16/9") return height * 16 / 9;
        if (a === "21/9") return height * 21 / 9;
        if (a === "4/3") return height * 4 / 3;
    },

    valueInObject: function(obj, value){
        return Object.values(obj).indexOf(value) > -1;
    },

    keyInObject: function(){
        return Object.keys(obj).indexOf(value) > -1;
    },

    inObject: function(obj, key, val){
        return obj[key] !== undefined && obj[key] === val;
    },

    newCssSheet: function(media){
        var style = document.createElement("style");

        if (media !== undefined) {
            style.setAttribute("media", media);
        }

        style.appendChild(document.createTextNode(""));

        document.head.appendChild(style);

        return style.sheet;
    },

    addCssRule: function(sheet, selector, rules, index){
        if("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else if("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
        }
    },

    media: function(query){
        return window.matchMedia(query).matches
    },

    mediaModes: function(){
        return METRO_MEDIA;
    },

    mediaExist: function(media){
        return METRO_MEDIA.indexOf(media) > -1;
    },

    inMedia: function(media){
        return METRO_MEDIA.indexOf(media) > -1 && METRO_MEDIA.indexOf(media) === METRO_MEDIA.length - 1;
    },

    isValue: function(val){
        return val !== undefined && val !== null && val !== "";
    },

    isNull: function(val){
        return val === undefined || val === null;
    },

    isNegative: function(val){
        return parseFloat(val) < 0;
    },

    isPositive: function(val){
        return parseFloat(val) > 0;
    },

    isZero: function(val){
        return (parseFloat(val.toFixed(2))) === 0.00;
    },

    between: function(val, bottom, top, equals){
        return equals === true ? val >= bottom && val <= top : val > bottom && val < top;
    },

    parseMoney: function(val){
        return Number(parseFloat(val.replace(/[^0-9-.]/g, '')));
    },

    parseCard: function(val){
        return val.replace(/[^0-9]/g, '');
    },

    parsePhone: function(val){
        return Utils.parseCard(val);
    },

    isVisible: function(el){
        if (Utils.isJQueryObject(el)) {
            el = el[0];
        }

        return Utils.getStyleOne(el, "display") !== "none" && Utils.getStyleOne(el, "visibility") !== "hidden" && el.offsetParent !== null;
    },

    parseNumber: function(val, thousand, decimal){
        return val.replace(new RegExp('\\'+thousand, "g"), "").replace(new RegExp('\\'+decimal, 'g'), ".");
    },

    nearest: function(val, precision, down){
        val /= precision;
        val = Math[down === true ? 'floor' : 'ceil'](val) * precision;
        return val;
    },

    bool: function(value){
        switch(value){
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    },

    copy: function(el){
        var body = document.body, range, sel;

        if (Utils.isJQueryObject(el)) {
            el = el[0];
        }

        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            sel.removeAllRanges();
            try {
                range.selectNodeContents(el);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(el);
                sel.addRange(range);
            }
        } else if (body.createTextRange) {
            range = body.createTextRange();
            range.moveToElementText(el);
            range.select();
        }

        document.execCommand("Copy");

        if (window.getSelection) {
            if (window.getSelection().empty) {  // Chrome
                window.getSelection().empty();
            } else if (window.getSelection().removeAllRanges) {  // Firefox
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {  // IE?
            document.selection.empty();
        }
    },

    isLocalhost: function(){
        return (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "")
    },

    formData: function(form){
        if (Utils.isNull(form)) {
            return ;
        }
        if (Utils.isJQueryObject(form)) {
            form = form[0];
        }
        if (!form || form.nodeName !== "FORM") {
            return;
        }
        var i, j, q = {};
        for (i = form.elements.length - 1; i >= 0; i = i - 1) {
            if (form.elements[i].name === "") {
                continue;
            }
            switch (form.elements[i].nodeName) {
                case 'INPUT':
                    switch (form.elements[i].type) {
                        case 'text':
                        case 'hidden':
                        case 'password':
                        case 'button':
                        case 'reset':
                        case 'submit':
                            q[form.elements[i].name] = form.elements[i].value;
                            break;
                        case 'checkbox':
                        case 'radio':
                            if (form.elements[i].checked) {
                                q[form.elements[i].name] = form.elements[i].value;
                            }
                            break;
                    }
                    break;
                case 'file':
                    break;
                case 'TEXTAREA':
                    q[form.elements[i].name] = form.elements[i].value;
                    break;
                case 'SELECT':
                    switch (form.elements[i].type) {
                        case 'select-one':
                            q[form.elements[i].name] = form.elements[i].value;
                            break;
                        case 'select-multiple':
                            q[form.elements[i].name] = [];
                            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                if (form.elements[i].options[j].selected) {
                                    q[form.elements[i].name].push(form.elements[i].options[j].value);
                                }
                            }
                            break;
                    }
                    break;
                case 'BUTTON':
                    switch (form.elements[i].type) {
                        case 'reset':
                        case 'submit':
                        case 'button':
                            q[form.elements[i].name] = form.elements[i].value;
                            break;
                    }
                    break;
            }
        }
        return q;
    }
};

Metro['utils'] = Utils;

var Tile = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.effectInterval = false;
        this.images = [];
        this.slides = [];
        this.currentSlide = -1;
        this.unload = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        size: "medium",
        cover: "",
        effect: "",
        effectInterval: 3000,
        effectDuration: 500,
        target: null,
        canTransform: true,
        onClick: Metro.noop,
        onTileCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createTile();
        this._createEvents();

        Utils.exec(o.onTileCreate, [element]);
    },

    _createTile: function(){
        function switchImage(el, img_src){
            setTimeout(function(){
                el.fadeOut(500, function(){
                    el.css("background-image", "url(" + img_src + ")");
                    el.fadeIn();
                });
            }, Utils.random(0,1000));
        }

        var that = this, element = this.element, o = this.options;
        var slides = element.find(".slide");
        var slides2 = element.find(".slide-front, .slide-back");

        element.addClass("tile-" + o.size);

        if (o.effect.indexOf("hover-") > -1) {
            element.addClass("effect-" + o.effect);
            $.each(slides2, function(){
                var slide = $(this);

                if (slide.data("cover") !== undefined) {
                    that._setCover(slide, slide.data("cover"));
                }
            })
        }

        if (o.effect.indexOf("animate-") > -1 && slides.length > 1) {
            $.each(slides, function(i){
                var slide = $(this);

                that.slides.push(this);

                if (slide.data("cover") !== undefined) {
                    that._setCover(slide, slide.data("cover"));
                }

                if (i > 0) {
                    if (["animate-slide-up", "animate-slide-down"].indexOf(o.effect) > -1) slide.css("top", "100%");
                    if (["animate-slide-left", "animate-slide-right"].indexOf(o.effect) > -1) slide.css("left", "100%");
                    if (["animate-fade"].indexOf(o.effect) > -1) slide.css("opacity", 0);
                }
            });

            this.currentSlide = 0;

            this._runEffects();
        }

        if (o.cover !== "") {
            this._setCover(element, o.cover);
        }

        if (o.effect === "image-set") {
            element.addClass("image-set");
            $.each(element.children("img"), function(){
                var img = $(this);
                var src = this.src;
                var div = $("<div>").addClass("img");

                if (img.hasClass("icon")) {
                    return ;
                }

                that.images.push(this);

                div.css("background-image", "url("+src+")");
                element.prepend(div);
                img.remove();
            });

            setInterval(function(){
                var temp = that.images.slice();
                for(var i = 0; i < element.find(".img").length; i++) {
                    var rnd_index = Utils.random(0, temp.length - 1);
                    var div = $(element.find(".img").get(i));
                    switchImage(div, temp[rnd_index].src);
                    temp.splice(rnd_index, 1);
                }
            }, 3000);
        }
    },

    _runEffects: function(){
        var that = this, o = this.options;

        if (this.effectInterval === false) this.effectInterval = setInterval(function(){
            var current, next;

            current = $(that.slides[that.currentSlide]);

            that.currentSlide++;
            if (that.currentSlide === that.slides.length) {
                that.currentSlide = 0;
            }

            next = that.slides[that.currentSlide];

            if (o.effect === "animate-slide-up") Animation.slideUp($(current), $(next), o.effectDuration);
            if (o.effect === "animate-slide-down") Animation.slideDown($(current), $(next), o.effectDuration);
            if (o.effect === "animate-slide-left") Animation.slideLeft($(current), $(next), o.effectDuration);
            if (o.effect === "animate-slide-right") Animation.slideRight($(current), $(next), o.effectDuration);
            if (o.effect === "animate-fade") Animation.fade($(current), $(next), o.effectDuration);

        }, o.effectInterval);
    },

    _stopEffects: function(){
        clearInterval(this.effectInterval);
        this.effectInterval = false;
    },

    _setCover: function(to, src){
        to.css({
            backgroundImage: "url("+src+")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.start, function(e){
            var tile = $(this);
            var dim = {w: element.width(), h: element.height()};
            var X = Utils.pageXY(e).x - tile.offset().left,
                Y = Utils.pageXY(e).y - tile.offset().top;
            var side;

            if (Utils.isRightMouse(e) === false) {

                if (X < dim.w * 1 / 3 && (Y < dim.h * 1 / 2 || Y > dim.h * 1 / 2)) {
                    side = 'left';
                } else if (X > dim.w * 2 / 3 && (Y < dim.h * 1 / 2 || Y > dim.h * 1 / 2)) {
                    side = 'right';
                } else if (X > dim.w * 1 / 3 && X < dim.w * 2 / 3 && Y > dim.h / 2) {
                    side = 'bottom';
                } else {
                    side = "top";
                }

                if (o.canTransform === true) tile.addClass("transform-" + side);

                if (o.target !== null) {
                    setTimeout(function(){
                        document.location.href = o.target;
                    }, 100);
                }

                Utils.exec(o.onClick, [tile]);
            }
        });

        element.on([Metro.events.stop, Metro.events.leave].join(" "), function(e){
            $(this)
                .removeClass("transform-left")
                .removeClass("transform-right")
                .removeClass("transform-top")
                .removeClass("transform-bottom");
        });

        $(window).on(Metro.events.blur, function(){
            that._stopEffects();
        });
        $(window).on(Metro.events.focus, function(){
            that._runEffects();
        });
    },

    changeAttribute: function(attributeName){

    }
};

Metro.plugin('tile', Tile);



return METRO_INIT === true ? Metro.init() : Metro;
}));