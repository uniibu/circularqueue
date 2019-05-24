const tests = ['pop', 'push', 'shift', 'unshift', 'shiftpush'];
(async () => {
  for (let msg of tests) {
    await require(`./mutator/${msg}`)(require('../dist/cqueue'), require('benchmark'), require('denque'))
  }
})()




