(function(){
    function events(_) {
        var result = function(event, handler) {
            var res = {};
            if(_.isObject(event)) {
                _(event).pairs().each(function(e){
                    res['on'+e[0]] = e[1];
                });
            }
            else {
                res[('on'+event)] = handler;
            }
	    return res;
        };

        return _.reduce([
            'click',
            'dblclick',
            'focusin',
            'focusout',
            'hover',
            'mousedown',
            'mouseenter',
            'mouseleave',
            'mousemove',
            'mouseout',
            'mouseover',
            'mouseup',
            'change',
            'input',
            'keyup',
            'keypress'
        ], function(acc, current) {
	    acc[current] = function(handler) {
                return result(current, handler)};
	    return acc;
        }, result);
        return result;
    }

    if (typeof define !== 'undefined') {
        define(['lodash'], events);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = events(require('lodash'));
    }
})();
