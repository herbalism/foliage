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
            'Copy',
            'Cut',
            'Paste',
            'KeyDown',
            'KeyUp',
            'KeyPress',
            'Focus',
            'Blur',
            'Change',
            'Input',
            'Submit',
            'Click',
            'DoubleClick',
            'Drag',
            'DragEnd',
            'DragEnter',
            'DragExit',
            'DragLeave',
            'DragOver',
            'DragStart',
            'Drop',
            'MouseDown',
            'MouseEnter',
            'MouseLeave',
            'MouseMove',
            'MouseOut',
            'MouseOver',
            'MouseUp',
            'TouchCancel',
            'TouchEnd',
            'TouchMove',
            'TouchStart',
            'Scroll',
            'Wheel'
        ], function(acc, current) {
            var methodName = current.charAt(0).toLowerCase()+current.slice(1);
	    acc[methodName] = function(handler) {
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
