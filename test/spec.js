(function(){
    function spec() {
        var asserts = {};
        function makeSpec(name, specs){
            return specs;
        };
        makeSpec.assert = asserts;
        return makeSpec;
    }

    if (typeof define !== 'undefined') {
        define([], spec);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = spec();
    }
})();
