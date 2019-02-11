
module.exports = function(CBuffer,bench) {
  const suite = new bench.Suite();
  const SIZE = 1e5;
  var arr = Array.from(new Array(SIZE),(d,i) => i)
  var cb = new CBuffer(arr);

  suite.add('pop 1e5 - CBuffer', function() {
    for (var i = SIZE; i >= 0; i--) {
      cb.pop();
    }
  });

  suite.add('pop 1e5 - Array  ', function() {
    for (var i = SIZE; i >= 0; i--) {
      arr.pop();
    }
  });
  suite.on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    process.send('Fastest is ' + this.filter('fastest').map('name'));
    process.exit()
  })
  .run({ 'async': true });
}
