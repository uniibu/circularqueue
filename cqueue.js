const { resolve, join } = require('path');
const { readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const EventEmitter = require('events');

class CQueue extends EventEmitter {
  constructor(...args) {
    super();
    if (args.length === 0)
      args = [16]
    // this is the same in either scenario
    this.length = 0;
    this.start = 0;

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
    // need to `return this` so `return CQueue.apply` works
    return this;
  }

  /* mutator methods */
  //from
  static from(arrLike, mapFn) {
    const [...arr] = arrLike;
    const newBuffer = new CQueue(...arr);
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
    // check if data is about to be overwritten
    if (this.length + args.length > this.size) {
      // emit data that's about to be overwritten
      for (; i < this.length + args.length - this.size; i++) {
        this.emit('overflow', this.data[(this.end + i + 1) % this.size]);
      }
    }
    for (i = 0; i < args.length; i++) {
      this.data[(this.end + i + 1) % this.size] = args[i];
    }
    // recalculate length
    this._recalculateLength(i)
    // recalculate end
    this.end = (this.end + i) % this.size;
    this.start = (this.size + this.end - this.length + 1) % this.size;
    return this.length;
  }

  shift() {
    if (this.length === 0) return undefined;
    // store first item for return
    const item = this.data[this.start];
    this.start = (this.start + 1) % this.size;
    this.length--;
    return item;
  }
  // add item to beginning of buffer
  unshift(...args) {
    let i = 0;
    // check if overflow is set, and if data is about to be overwritten
    if (this.length + args.length > this.size) {
      // call overflow function and send data that's about to be overwritten
      for (; i < this.length + args.length - this.size; i++) {
        this.emit('overflow', this.data[this.end - (i % this.size)]);
      }
    }
    for (i = 0; i < args.length; i++) {
      this.data[(this.size + this.start - (i % this.size) - 1) % this.size] = args[i];
    }
    if (this.size - this.length - i < 0) {
      this.end += this.size - this.length - i;
      if (this.end < 0) this.end = this.size + (this.end % this.size);
    }
    this._recalculateLength(i)
    this.start -= args.length;
    if (this.start < 0) this.start = this.size + (this.start % this.size);
    return this.length;
  }

  _recalculateLength(i) {
    if (this.length < this.size) {
      if (this.length + i > this.size) this.length = this.size;
      else this.length += i;
    }
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

  /* utility methods */
  // reset pointers to buffer with zero items
  // note: this will not remove values in cqueue, so if for security values
  //       need to be overwritten, run `.fill(null).empty()`
  empty() {
    this.length = this.start = 0;
    this.end = this.size - 1;
    return this;
  }
  clear() {
    this.fill(undefined).empty();
    return this;
  }

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
      if (data.length) {
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
      if (!existsSync(this.cachePath)) {
        mkdirSync(this.cachePath, { recursive: true });
      }
      writeFileSync(file, JSON.stringify(this.slice()));
    }
  }
}

module.exports = CQueue;