## JavaScript [Circular Queue](http://en.wikipedia.org/wiki/Circular_queue) Utility

[![Build Status](https://travis-ci.com/uniibu/circularqueue.svg?branch=master)](https://travis-ci.com/uniibu/circularqueue)

A circular buffer, circular queue, cyclic buffer or ring buffer is a data structure that uses a single, fixed-size buffer as if it were connected end-to-end.

### Installation

- `npm install circularqueue` or `yarn add circularqueue`

### Usage

It's simple. Just use it like you would use an Array.

```javascript
new CQueue() // default buffer size of 16
new CQueue(10);      // empty buffer with size of 10
new CQueue(1,2,3,4); // buffer with size 4
new CQueue([1,2,3,4,5]);           // buffer with size 5
```

### Event

When the queue reached its max size, it will emit and remove the oldest item aka (FIFO).

* `overflow` - Emitted along with the removed item when the queue reached its max size.

```javascript
var myBuff = new CQueue(4);
myBuff.on('overflow', (item) => {
    console.log(item) // the removed item: 1
})
myBuff.push(1,2,3,4); // nothing shows up yet
myBuff.push(5);       // log: 1
```

### API

#### Mutator Methods

* pop         - Removes the last element from a circular buffer and returns that element.
* push        - Adds one or more elements to the end of a circular buffer and returns the new length.
* shift       - Removes the first element from a circular buffer and returns that element.
* unshift     - Adds one or more elements to the front of a circular buffer and returns the new length.

#### Accessor Methods

* indexOf     - Returns the first (least) index of an element within the circular buffer equal to the specified value, or -1 if none is found.
* lastIndexOf - Returns the last (greatest) index of an element within the circular buffer equal to the specified value, or -1 if none is found.
* sortedIndex - Returns the position some `value` would be inserted into a sorted circular buffer ranked by an optional comparitor.
* from        - Creates and returns a new Buffer instance using the arguments.

#### Utility Methods

* empty       - Equivalent to setting `Array.length = 0`.
* clear       - Equivalent to `CQueue.fill(undefined).empty()`
* first       - Returns first value in circular buffer.
* last        - Returns last value in circular buffer.
* get         - Get value at specific index.
* set         - Set value as specific index.
* toArray     - Return clean ordered array of buffer.
* slice       - Return a slice of the buffer as an array.

#### Benchmark
- run `node speed/index`

```
POP
pop 2e6 - CQueue x 179,685,350 ops/sec ±0.24% (93 runs sampled)
pop 2e6 - Array   x 576,095,100 ops/sec ±1.10% (86 runs sampled)
pop 2e6 - Denque   x 209,573,254 ops/sec ±1.02% (87 runs sampled)
Fastest is pop 2e6 - Array
PUSH
push 2e6 - CQueue x 561,612,085 ops/sec ±0.26% (90 runs sampled)
push 2e6 - Array   x 10,843,893 ops/sec ±0.70% (90 runs sampled)
push 2e6 - Denque   x 562,300,966 ops/sec ±0.63% (93 runs sampled)
Fastest is push 2e6 - *CQueue*
SHIFT
shift 2e6 - CQueue x 178,336,928 ops/sec ±0.23% (91 runs sampled)
shift 2e6 - Array   x 167 ops/sec ±0.28% (82 runs sampled)
shift 2e6 - Denque   x 165,908,212 ops/sec ±0.34% (92 runs sampled)
Fastest is shift 2e6 - *CQueue*
UNSHIFT
unshift 2e6 - CQueue x 631,085,421 ops/sec ±0.24% (94 runs sampled)
unshift 2e6 - Array   x 11,546,479 ops/sec ±1.34% (90 runs sampled)
unshift 2e6 - Denque   x 563,363,964 ops/sec ±0.21% (89 runs sampled)
Fastest is unshift 2e6 - *CQueue*
SHIFT PUSH
shiftpush 2e6 - CQueue x 7,538,429 ops/sec ±2.45% (86 runs sampled)
shiftpush 2e6 - Array   x 155 ops/sec ±0.34% (84 runs sampled)
shiftpush 2e6 - Denque   x 31,071,026 ops/sec ±0.31% (89 runs sampled)
Fastest is shiftpush 2e6 - Denque
```