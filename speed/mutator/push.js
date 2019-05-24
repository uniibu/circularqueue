
module.exports = function(CBuffer, bench, denque) {
  return new Promise(resolve => {
    const suite = new bench.Suite();
    const SIZE = 2e6;
    console.log('PUSH')
    var cb = new CBuffer(SIZE),
      dq = new denque()
    arr = [];

    suite.add('push 2e6 - CQueue', function() {
      cb.empty();
    }, function() {
      var i = SIZE;
      while (cb.push(i * 0.1), --i >= 0);
    });

    suite.add('push 2e6 - Array  ', function() {
      arr.length = 0;
    }, function() {
      var i = SIZE;
      while (arr.push(i * 0.1), --i >= 0);
    });

    suite.add('push 2e6 - Denque  ', function() {
      dq.clear();
    }, function() {
      var i = SIZE;
      while (dq.push(i * 0.1), --i >= 0);
    });

    suite.on('cycle', function(event) {
      console.log(String(event.target));
    })
      .on('complete', function() {
         console.log(cb.length)
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        resolve()
      })
      .run({ 'async': true });
  })
}