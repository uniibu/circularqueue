
module.exports = function(CQueue, bench, denque) {
  return new Promise(resolve => {
    const suite = new bench.Suite();
    const SIZE = 2e6;
    console.log('SHIFT PUSH')
    var arr = Array.from(new Array(SIZE), (d, i) => i)
    var cb = new CQueue(arr);
    var dq = new denque(arr)
    suite.add('shiftpush 2e6 - CQueue', function() {
      var a = cb.shift();
      var b = cb.shift();
      var c = cb.shift();

      cb.push(a);
      cb.push(b);
      cb.push(c);
    });

    suite.add('shiftpush 2e6 - Array  ', function() {
      var a = arr.shift();
      var b = arr.shift();
      var c = arr.shift();

      arr.push(a);
      arr.push(b);
      arr.push(c)
    });
    suite.add('shiftpush 2e6 - Denque  ', function() {
      var a = dq.shift();
      var b = dq.shift();
      var c = dq.shift();

      dq.push(a);
      dq.push(b);
      dq.push(c);
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