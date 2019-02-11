const cluster = require('cluster');
const tests = ['pop','push','reverse','shift','unshift','filter']
if (cluster.isMaster) {
  const msgs = []
  let count  = 0
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < tests.length; i++) {
    cluster.fork();
  }
  for (const id in cluster.workers) {
    const worker = cluster.workers[id];
    worker.on('message',function(msg){
      msgs.push(msg);
    })
    worker.on('online', function(){
      count++
      worker.send(tests[id-1])
    });
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} exited`);
    count--;
    if(!count) {
      console.log('\n-------------------------------\n')
      console.log(msgs.join('\n'));
    }
  });
} else {

  const CbufferOriginal = require('../dist/cbuffer');
  process.on('message', (msg) => {
    console.log('Starting', msg)

    require(`./mutator/${msg}`)(CbufferOriginal,require('benchmark'))
  });

  console.log(`Worker ${process.pid} started`);
}



