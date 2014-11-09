(function(){
    function run(tattler, q, _,  basics){
        var results = tattler.run(basics);
        var summary = tattler.streamsFn.fold(results, function(acc, current){
            return q([acc, current]).spread(function(racc, rcurrent){
                process.stdout.write(rcurrent.passed ? '.' : 'E');
                if(rcurrent.passed) {
                    racc.passed = racc.passed + 1;
                }
                else {
                    racc.failed = racc.failed.concat([rcurrent]);
                }
                return racc;
            });
        }, q({
            failed: [],
            passed: 0
        }));
        
        summary.done(function(rsummary){
            process.stdout.write('\n');
            _.each(rsummary.failed, function(res){
                process.stdout.write(''+res.name);
                process.stdout.write(': ');
                process.stdout.write(''+res.result)
                process.stdout.write('\n');
                if(res.result.stack){
                    process.stdout.write(res.result.stack);
                    process.stdout.write('\n');
                }
            });
            process.stdout.write('----------\n');
            process.stdout.write('passed: ');
            process.stdout.write(''+rsummary.passed);
            process.stdout.write('\n');
            process.stdout.write('failed: ');
            process.stdout.write(''+rsummary.failed.length);
            process.stdout.write('\n');
        });

    }

    if (typeof define !== 'undefined') {
        define(['tattler', 'q', 'lodash', './basics-spec'], run);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = run(require('tattler'), require('q'), require('lodash'), require('./basics-spec'));
    }
})();
