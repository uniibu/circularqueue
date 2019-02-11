
module.exports = function(CBuffer,bench) {
  const suite = new bench.Suite();
  const SIZE = 1e5;
  var arr = Array.from(new Array(SIZE),(d,i) => i)

  var cb = new CBuffer(arr);


  suite.add('reverse - CBuffer', function() {
    cb.reverse();
  });

  suite.add('reverse - Array  ', function() {
    arr.reverse();
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