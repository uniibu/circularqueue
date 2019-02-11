## JavaScript [Circular Buffer](http://en.wikipedia.org/wiki/Circular_buffer) Utility

[![Build Status](https://travis-ci.com/uniibu/better-cbuffer.svg?branch=master)](https://travis-ci.com/uniibu/better-cbuffer)

Forked from [CBuffer](https://github.com/trevnorris/cbuffer/) with additional enhancements

Note: This is called a circular buffer because of what this library accomplishes, but is implemented
as an Array. This may be confusing for Node users, which may want to use a true Buffer.

Below is the currently implemented API.

### Installation

- `npm install better-cbuffer` or `yarn add better-cbuffer`

### Usage

It's simple. Just use it like you would use an Array.

```javascript
new CBuffer(10);      // empty buffer with size of 10
new CBuffer(1,2,3,4); // buffer with size 4
new CBuffer([1,2,3,4,5]);           // buffer with size 5
```

Included are several non-standard niceties. Like if you want to catch when data is overwritten,
just assign a function to the `overflow` variable and it will be called whenever a value is about
to be overwritten and it will pass the value as the first argument:

```javascript
var myBuff = new CBuffer(4);
myBuff.overflow = function(data) {
    console.log(data);
};

myBuff.push(1,2,3,4); // nothing shows up yet
myBuff.push(5);       // log: 1
```


### API

#### Mutator Methods

* pop         - Removes the last element from a circular buffer and returns that element.
* push        - Adds one or more elements to the end of a circular buffer and returns the new length.
* reverse     - Reverses the order of the elements of a circular buffer.
* rotateLeft  - Rotates all elements left 1, or n, times.
* rotateRight - Rotates all elements right 1, or n, times.
* shift       - Removes the first element from a circular buffer and returns that element.
* sort        - Sorts the elements of a circular buffer. Unlike native `sort`, the default comparitor sorts by `a > b`.
* unshift     - Adds one or more elements to the front of a circular buffer and returns the new length.
* filter      - Removes the elements that does not pass the condition. **Mutates the Buffer**
* map         - Iterate over each element and mutates them. **Mutates the Buffer**

#### Accessor Methods

* indexOf     - Returns the first (least) index of an element within the circular buffer equal to the specified value, or -1 if none is found.
* lastIndexOf - Returns the last (greatest) index of an element within the circular buffer equal to the specified value, or -1 if none is found.
* sortedIndex - Returns the position some `value` would be inserted into a sorted circular buffer ranked by an optional comparitor.
* from        - Creates and returns a new Buffer instance using the arguments.

#### Iteration Methods

* every       - Returns true if every element in the circular buffer satisfies the provided testing function.
* forEach     - Calls a function for each element in the circular buffer.
* some        - Returns true if at least one element in the circular buffer satisfies the provided testing function.

#### Utility Methods

* empty       - Equivalent to setting `Array.length = 0`.
* clear       - Equivalent to `CBuffer.fill(undefined).empty()`
* fill        - Fill with passed argument. Also supports functions.
* first       - Returns first value in circular buffer.
* last        - Returns last value in circular buffer.
* get         - Get value at specific index.
* set         - Set value as specific index.
* toArray     - Return clean ordered array of buffer.
* overflow    - Set to function and will be called when data is about to be overwritten.
* slice       - Return a slice of the buffer as an array.


#### Benchmark
- run `node speed/index`

```
shift 1e4 - CBuffer x 80,594 ops/sec ±4.19% (82 runs sampled)
pop 1e5 - CBuffer x 8,424 ops/sec ±3.61% (88 runs sampled)
filter - CBuffer x 14,883,389 ops/sec ±2.06% (79 runs sampled)
reverse - CBuffer x 99,982,055 ops/sec ±2.24% (87 runs sampled)
push 1e5 - CBuffer x 377,083,872 ops/sec ±2.87% (86 runs sampled)
unshift 1e5 - CBuffer x 366,588,191 ops/sec ±3.29% (80 runs sampled)

shift 1e4 - Array   x 64,866 ops/sec ±6.62% (80 runs sampled)
pop 1e5 - Array   x 6,204 ops/sec ±6.85% (65 runs sampled)
filter - Array   x 335 ops/sec ±5.64% (69 runs sampled)
reverse - Array   x 9,094 ops/sec ±5.21% (82 runs sampled)
push 1e5 - Array   x 6,327,845 ops/sec ±3.83% (77 runs sampled)
unshift 1e5 - Array   x 6,876,578 ops/sec ±4.29% (79 runs sampled)

Fastest is pop 1e5 - CBuffer
Fastest is shift 1e4 - CBuffer
Fastest is filter - CBuffer
Fastest is reverse - CBuffer
Fastest is push 1e5 - CBuffer
Fastest is unshift 1e5 - CBuffer
```