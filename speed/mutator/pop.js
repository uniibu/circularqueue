
module.exports = function(CBuffer, bench, denque) {
  return new Promise(resolve => {
    const suite = new bench.Suite();
    const SIZE = 2e6;
    console.log('POP')
    var arr = Array.from(new Array(SIZE), (d, i) => i)
    var cb = new CBuffer(arr);
    var dq = new denque(arr)
    suite.add('pop 2e6 - CQueue', function() {
      cb.pop();
      cb.pop();
      cb.pop();
    }).add('pop 2e6 - Array  ', function() {
      arr.pop();
      arr.pop();
      arr.pop();
    }).add('pop 2e6 - Denque  ', function() {
      dq.pop();
      dq.pop();
      dq.pop();
    }).on('cycle', function(event) {
      console.log(String(event.target));
    }).on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
      resolve();
    }).run({ 'async': true });
  })
}
