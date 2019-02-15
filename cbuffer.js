const {resolve, join} = require('path');
const {readFileSync,writeFileSync,mkdirSync,existsSync} = require('fs');
class CBuffer {
  constructor(...args) {

    // if no arguments, then nothing needs to be set
    if (args.length === 0)
      throw new Error('Missing Argument: You must pass a valid buffer size');
    // this is the same in either scenario
    this.length = 0;
    this.start = 0;
    // set to callback fn if data is about to be overwritten
    this.overflow = null;
    // emulate Array based on passed arguments
    if (args.length > 1 || typeof args[0] !== 'number') {
      if (Array.isArray(args[0])) {
        this.data = new Array(...args);
        this.end = (this.size = args[0].length) - 1;
      } else {
        this.data = new Array(args.length);
        this.end = (this.size = args.length) - 1;
        this.push.apply(this, args);
      }
    } else {
      this.data = new Array(args[0]);
      this.end = (this.size = args[0]) - 1;
    }
    this.cachePath = resolve(process.cwd(), '.cache');
    // need to `return this` so `return CBuffer.apply` works
    return this;
  }

  /* mutator methods */
  //from
  static from(arrLike, mapFn) {
    const [...arr] = arrLike;
    const newBuffer = new CBuffer(...arr);
    if (mapFn && typeof mapFn == 'function') {
      newBuffer.map(mapFn)
    }
    return newBuffer
  }
  // pop last item
  pop() {
    let item;
    if (this.length === 0) return;
    item = this.data[this.end];
    // remove the reference to the object so it can be garbage collected
    // delete this.data[this.end];
    this.end = (this.end - 1) % this.size;
    this.length--;
    return item;
  }
  // push item to the end

  push(...args) {
    let i = 0;
    // check if overflow is set, and if data is about to be overwritten
    if (this.overflow && this.length + args.length > this.size) {
      // call overflow function and send data that's about to be overwritten
      for (; i < this.length + args.length - this.size; i++) {
        this.overflow(this.data[(this.end + i + 1) % this.size], this);
      }
    }
    // push items to the end, wrapping and erasing existing items
    // using arguments variable directly to reduce gc footprint
    for (i = 0; i < args.length; i++) {
      this.data[(this.end + i + 1) % this.size] = args[i];
    }
    // recalculate length
    if (this.length < this.size) {
      if (this.length + i > this.size) this.length = this.size;
      else this.length += i;
    }
    // recalculate end
    this.end = (this.end + i) % this.size;
    // recalculate start
    this.start = (this.size + this.end - this.length + 1) % this.size;
    // return number current number of items in CBuffer
    return this.length;
  }
  // reverse order of the buffer

  reverse() {
    if (this.length === 0) return this;
    var i = 0, j = this.length - 1;
    var k, tmp, mid = this.length / 2 | 0; // same as Math.floor

    for (; i < mid; i++) {
      const n = (this.start + i) % this.size
      tmp = this.data[n];
      this.data[n] = this.data[j - n];
      this.data[j - n] = tmp;
    }
    return this;

  }
  // rotate buffer to the left by cntr, or by 1

  rotateLeft(cntr) {
    if (typeof cntr === 'undefined') cntr = 1;
    if (typeof cntr !== 'number') throw new Error("Argument must be a number");
    while (--cntr >= 0) {
      this.push(this.shift());
    }
    return this;
  }
  // rotate buffer to the right by cntr, or by 1

  rotateRight(cntr) {
    if (typeof cntr === 'undefined') cntr = 1;
    if (typeof cntr !== 'number') throw new Error("Argument must be a number");
    while (--cntr >= 0) {
      this.unshift(this.pop());
    }
    return this;
  }
  // remove and return first item

  shift() {
    let item;
    // check if there are any items in CBuff
    if (this.length === 0) return;
    // store first item for return
    item = this.data[this.start];
    // recalculate start of CBuffer
    this.start = (this.start + 1) % this.size;
    // decrement length
    this.length--;
    return item;
  }
  // sort items

  sort(fn) {
    this.data.sort(fn || defaultComparitor);
    this.start = 0;
    this.end = this.length - 1;
    return this;
  }
  // add item to beginning of buffer

  unshift(...args) {
    let i = 0;
    // check if overflow is set, and if data is about to be overwritten
    if (this.overflow && this.length + args.length > this.size) {
      // call overflow function and send data that's about to be overwritten
      for (; i < this.length + args.length - this.size; i++) {
        this.overflow(this.data[this.end - (i % this.size)], this);
      }
    }
    for (i = 0; i < args.length; i++) {
      this.data[(this.size + this.start - (i % this.size) - 1) % this.size] = args[i];
    }
    if (this.size - this.length - i < 0) {
      this.end += this.size - this.length - i;
      if (this.end < 0) this.end = this.size + (this.end % this.size);
    }
    if (this.length < this.size) {
      if (this.length + i > this.size) this.length = this.size;
      else this.length += i;
    }
    this.start -= args.length;
    if (this.start < 0) this.start = this.size + (this.start % this.size);
    return this.length;
  }

  /* accessor methods */
  // return index of first matched element
  indexOf(arg, idx) {
    if (!idx) idx = 0;
    for (; idx < this.length; idx++) {
      if (this.data[(this.start + idx) % this.size] === arg) return idx;
    }
    return -1;
  }
  // return last index of the first match

  lastIndexOf(arg, idx) {
    if (!idx) idx = this.length - 1;
    for (; idx >= 0; idx--) {
      if (this.data[(this.start + idx) % this.size] === arg) return idx;
    }
    return -1;
  }

  // return the index an item would be inserted to if this
  // is a sorted circular buffer

  sortedIndex(value, comparitor = defaultComparitor, context) {
    const isFull = this.length === this.size;
    let low = this.start;
    let high = isFull ? this.length - 1 : this.length;

    // Tricky part is finding if its before or after the pivot
    // we can get this info by checking if the target is less than
    // the last item. After that it's just a typical binary search.
    if (low && comparitor.call(context, value, this.data[high]) > 0) {
      low = 0, high = this.end;
    }

    while (low < high) {
      const mid = (low + high) >>> 1;
      if (comparitor.call(context, value, this.data[mid]) > 0) low = mid + 1;
      else high = mid;
    }
    return !isFull ? low :
      // http://stackoverflow.com/a/18618273/1517919
      (((low - this.start) % this.length) + this.length) % this.length;
  }

  /* iteration methods */
  // check every item in the array against a test
  every(callback, context) {
    let i = 0;
    for (; i < this.length; i++) {
      if (!callback.call(context, this.data[(this.start + i) % this.size], i, this))
        return false;
    }
    return true;
  }
  // loop through each item in buffer
  // TODO: figure out how to emulate Array use better

  forEach(callback, context) {
    let i = 0;
    for (; i < this.length; i++) {
      callback.call(context, this.data[(this.start + i) % this.size], i, this);
    }
  }
  filter(callback, context) {
    const result = [];
    for (var i = 0; i < this.length; i++) {
      var n = (this.start + i) % this.size;
      if (callback.call(context, this.data[n], this)) {
        result.push(this.data[n]);
      }
    }
    this.length = result.length;
    this.end = this.length - 1;
    this.data = result;
    return this;
  }
  map(callback, context) {
    for (var i = 0; i < this.length; i++) {
      var n = (this.start + i) % this.size;
      this.data[n] = callback.call(context, this.data[n], this)
    }
    return this;
  }
  // check items agains test until one returns true
  // TODO: figure out how to emuldate Array use better

  some(callback, context) {
    let i = 0;
    for (; i < this.length; i++) {
      if (callback.call(context, this.data[(this.start + i) % this.size], i, this))
        return true;
    }
    return false;
  }
  // calculate the average value of a circular buffer

  avg() {
    return this.length == 0 ? 0 : (this.sum() / this.length);
  }
  // loop through each item in buffer and calculate sum

  sum() {
    let index = this.length;
    let s = 0;
    while (index--) s += this.data[index];
    return s;
  }
  // loop through each item in buffer and calculate median

  median() {
    if (this.length === 0)
      return 0;
    const values = this.slice().sort(defaultComparitor);
    const half = Math.floor(values.length / 2);
    if (values.length % 2)
      return values[half];
    else
      return (values[half - 1] + values[half]) / 2.0;
  }

  /* utility methods */
  // reset pointers to buffer with zero items
  // note: this will not remove values in cbuffer, so if for security values
  //       need to be overwritten, run `.fill(null).empty()`
  empty() {
    const i = 0;
    this.length = this.start = 0;
    this.end = this.size - 1;
    return this;
  }
  clear() {
    this.fill(undefined).empty();
    return this;
  }
  // fill all places with passed value or function

  fill(arg) {
    let i = 0;
    if (typeof arg === 'function') {
      while (this.data[i] = arg(), ++i < this.size);
    } else {
      while (this.data[i] = arg, ++i < this.size);
    }
    // reposition start/end
    this.start = 0;
    this.end = this.size - 1;
    this.length = this.size;
    return this;
  }
  // return first item in buffer

  first() {
    return this.data[this.start];
  }
  // return last item in buffer

  last() {
    return this.data[this.end];
  }
  // return specific index in buffer

  get(arg) {
    return this.data[(this.start + arg) % this.size];
  }

  isFull(arg) {
    return this.size === this.length;
  }
  // set value at specified index

  set(idx, arg) {
    return this.data[(this.start + idx) % this.size] = arg;
  }
  // return clone array of values
  get toArrayClone() {
    return Array.from(this.slice(), (val) => {
      if (isString(val)) return val;
      if (Array.isArray(val)) return [...val];
      if (isObject(val)) return { ...val };
      return val;
    })
  }
  get array() {
    return this.slice();
  }
  // return clean array of values
  toArray() {
    return this.slice();
  }
  // slice the buffer to an arraay

  slice(start, end) {
    let size = this.length;

    start = +start || 0;

    if (start < 0) {
      if (start >= end)
        return [];
      start = (-start > size) ? 0 : size + start;
    }

    if (end == null || end > size)
      end = size;
    else if (end < 0)
      end += size;
    else
      end = +end || 0;

    size = start < end ? end - start : 0;

    const result = Array(size);
    for (let index = 0; index < size; index++) {
      result[index] = this.data[(this.start + start + index) % this.size];
    }
    return result;
  }
  load(filename) {
    if (typeof module !== 'undefined' && module.exports) {
      if (!filename) throw new Error('Missing filename');
      const file = join(this.cachePath, filename + '.json');
      if (!existsSync(file)) {
        throw new Error('File does not exists');
      }
      let data = readFileSync(file, { encoding: 'utf8' });
      data = JSON.parse(data);
      if(data.length) {
        this.data = new Array(this.size);
        this.start = 0;
        this.length = 0;
        this.end = this.size - 1;
        this.push.apply(this, data);
      }
    }
  }
  save(filename) {
    if (typeof module !== 'undefined' && module.exports) {
      if (!filename) throw new Error('Missing filename');
      const file = join(this.cachePath, filename + '.json');
      if(!existsSync(this.cachePath)) {
        mkdirSync(this.cachePath,{recursive:true});
      }
      writeFileSync(file, JSON.stringify(this.slice()));
    }
  }
}

function defaultComparitor(a, b) {
  return a == b ? 0 : a > b ? 1 : -1;
}
function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}
function isString(val) {
  return val != null && typeof val === 'string';
}

module.exports = CBuffer;