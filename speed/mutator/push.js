
module.exports = function(CBuffer,bench) {
  const suite = new bench.Suite();
  const SIZE = 1e5;

   var cb = new CBuffer(SIZE),
    arr = [];

  suite.add('push 1e5 - CBuffer', function() {
    cb.empty();
  }, function() {
    var i = SIZE;
    while (cb.push(i * 0.1), --i >= 0);
  });

  suite.add('push 1e5 - Array  ', function() {
    arr.length = 0;
  }, function() {
    var i = SIZE;
    while (arr.push(i * 0.1), --i >= 0);
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