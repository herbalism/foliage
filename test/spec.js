(function(){
    function spec(q) {
        function makeError(message) {
            return new Error(message);
        };

        var asserts = {
            
            equals:function(actual, expected){
                return expected === actual ? 
                    q.resolve(actual) : 
                    q.reject(makeError("expeted ["+actual+"] to be ["+expected+"]"));
            }
        };

        function makeSpec(name, specs){
            return specs;
        };
        makeSpec.assert = asserts;
        return makeSpec;
    }

    if (typeof define !== 'undefined') {
        define(['q'], spec);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = spec(require('q'));
    }
})();
