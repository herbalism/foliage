(function(){
    function eventSpecs(spec, f, _, on, dom) {
	var assert = spec.assert;
	function elemTest(test) {
	    return _.bind(test, this, dom);
	}

	return spec('events', {
	    'event can be assigned by name' : elemTest(function(dom) {
		var value;
		var armed = f.p(on('click', function(){value = 'clicked'}))(dom);
		dom.trigger(armed, 'click');
		return assert.equals(value, 'clicked');
	    }),
	    'many events can be assigned at once' : elemTest(function(dom) {
		var value = '';
		var armed = f.p(on({'click': function(){value = value + 'clicked'},
		    'blur': function(){value = value + 'blurred'}
		   }))(dom);
		dom.trigger(armed, 'click');
		dom.trigger(armed, 'blur');
		dom.trigger(armed, 'click');
		return assert.equals(value, 'clickedblurredclicked');
	    }),
	    'events can be assigned with sugar' : elemTest(function(dom) {
		var value = '';
		var armed = f.p(on.click(function(){value = value + 'clicked'}))(dom);
		dom.trigger(armed, 'click');
		return assert.equals(value, 'clicked');
	    })
        });
    }
    if (typeof define !== 'undefined') {
        define(['spec', 'foliage', 'lodash', 'foliage-event', 'foliage-dom'], eventSpecs);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = eventSpecs(
            require('./spec'), 
            require('../foliage'), 
            require('lodash'),
            require('../foliage-event'),
            require('../foliage-dom'));
    };
})()
