(function(){
    var basics = require('./basics-spec');
    var events = require('./foliage-event-spec');
    function run(nodeRunner){
        nodeRunner.run([basics, events]);
    }

    module.exports = run( require('tattler/js/node-runner'));
})();
