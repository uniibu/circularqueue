
module.exports = function(CBuffer,bench) {
  const suite = new bench.Suite();
  const SIZE = 1e4;
  var arr = Array.from(new Array(SIZE),(d,i) => i)
  var cb = new CBuffer(arr);

  suite.add('shift 1e4 - CBuffer', function() {
    for (var i = SIZE; i >= 0; i--) {
      cb.shift();
    }
  });

  suite.add('shift 1e4 - Array  ', function() {
    for (var i = SIZE; i >= 0; i--) {
      arr.shift();
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