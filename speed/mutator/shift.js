
module.exports = function(CBuffer, bench, denque) {
  return new Promise(resolve => {
    const suite = new bench.Suite();
    const SIZE = 2e6;
    console.log('SHIFT')
    var arr = Array.from(new Array(SIZE), (d, i) => i)
    var cb = new CBuffer(arr);
    var dq = new denque(arr)
    suite.add('shift 2e6 - CQueue', function() {
      cb.shift();
      cb.shift();
      cb.shift();
    }).add('shift 2e6 - Array  ', function() {
      arr.shift();
      arr.shift();
      arr.shift();
    }).add('shift 2e6 - Denque  ', function() {
      dq.shift();
      dq.shift();
      dq.shift();
    }).on('cycle', function(event) {
      console.log(String(event.target));
    }).on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
      resolve();
    }).run({ 'async': true });
  })
}