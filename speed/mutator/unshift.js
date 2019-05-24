
module.exports = function(CQueue, bench, denque) {
  return new Promise(resolve => {
    const suite = new bench.Suite();
    const SIZE = 2e6;
    console.log('UNSHIFT')
    var cb = new CQueue(SIZE),
      arr = [],
      dq = new denque();

    suite.add('unshift 2e6 - CQueue', function() {
      cb.empty();
    }, function() {
      var i = SIZE;
      while (cb.unshift(i), --i >= 0);
    });

    suite.add('unshift 2e6 - Array  ', function() {
      arr.length = 0;
    }, function() {
      var i = SIZE;
      while (arr.unshift(i), --i >= 0);
    });
    suite.add('unshift 2e6 - Denque  ', function() {
      dq.clear();
    }, function() {
      var i = SIZE;
      while (dq.unshift(i), --i >= 0);
    });
    suite.on('cycle', function(event) {
      console.log(String(event.target));
    })
      .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        resolve()
      })
      .run({ 'async': true });
  })
}