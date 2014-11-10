(function(){
    function spec(q, _) {
        function makeError(message) {
            return new Error(message);
        };

        var asserts = {
            
            equals:function(actual, expected){
                return expected === actual ? 
                    q.resolve(actual) : 
                    q.reject(makeError("expeted ["+actual+"] to be ["+expected+"]"));
            },
            all:function(){
                return q.all(_.toArray(arguments));
            }
        };

        function makeSpec(name, specs){
            return specs;
        };
        makeSpec.assert = asserts;
        return makeSpec;
    }

    if (typeof define !== 'undefined') {
        define(['q', 'lodash'], spec);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = spec(require('q'), require('lodash'));
    }
})();
