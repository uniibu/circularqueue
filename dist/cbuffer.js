!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CBuffer=e():t.CBuffer=e()}("undefined"!=typeof self?self:this,function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t){return function(t){if(Array.isArray(t))return t}(t)||a(t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function h(t){return function(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}(t)||a(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function a(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function o(t,e,i){return(o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}()?Reflect.construct:function(t,e,i){var n=[null];n.push.apply(n,e);var r=new(Function.bind.apply(t,n));return i&&u(r,i.prototype),r}).apply(null,arguments)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function l(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var f=i(1),c=f.resolve,y=f.join,d=i(2),g=d.readFileSync,v=d.writeFileSync,p=d.mkdirSync,b=d.existsSync,m=function(){function e(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n];if(0===i.length)throw new Error("Missing Argument: You must pass a valid buffer size");return this.length=0,this.start=0,this.overflow=null,i.length>1||"number"!=typeof i[0]?Array.isArray(i[0])?(this.data=o(Array,i),this.end=(this.size=i[0].length)-1):(this.data=new Array(i.length),this.end=(this.size=i.length)-1,this.push.apply(this,i)):(this.data=new Array(i[0]),this.end=(this.size=i[0])-1),this.cachePath=c(process.cwd(),".cache"),this}var i,a,u;return i=e,u=[{key:"from",value:function(t,i){var n=o(e,h(r(t).slice(0)));return i&&"function"==typeof i&&n.map(i),n}}],(a=[{key:"pop",value:function(){var t;if(0!==this.length)return t=this.data[this.end],this.end=(this.end-1)%this.size,this.length--,t}},{key:"push",value:function(){var t=0;if(this.overflow&&this.length+arguments.length>this.size)for(;t<this.length+arguments.length-this.size;t++)this.overflow(this.data[(this.end+t+1)%this.size],this);for(t=0;t<arguments.length;t++)this.data[(this.end+t+1)%this.size]=t<0||arguments.length<=t?void 0:arguments[t];return this.length<this.size&&(this.length+t>this.size?this.length=this.size:this.length+=t),this.end=(this.end+t)%this.size,this.start=(this.size+this.end-this.length+1)%this.size,this.length}},{key:"reverse",value:function(){if(0===this.length)return this;for(var t,e=0,i=this.length-1,n=this.length/2|0;e<n;e++){var r=(this.start+e)%this.size;t=this.data[r],this.data[r]=this.data[i-r],this.data[i-r]=t}return this}},{key:"rotateLeft",value:function(t){if(void 0===t&&(t=1),"number"!=typeof t)throw new Error("Argument must be a number");for(;--t>=0;)this.push(this.shift());return this}},{key:"rotateRight",value:function(t){if(void 0===t&&(t=1),"number"!=typeof t)throw new Error("Argument must be a number");for(;--t>=0;)this.unshift(this.pop());return this}},{key:"shift",value:function(){var t;if(0!==this.length)return t=this.data[this.start],this.start=(this.start+1)%this.size,this.length--,t}},{key:"sort",value:function(t){return this.data.sort(t||z),this.start=0,this.end=this.length-1,this}},{key:"unshift",value:function(){var t=0;if(this.overflow&&this.length+arguments.length>this.size)for(;t<this.length+arguments.length-this.size;t++)this.overflow(this.data[this.end-t%this.size],this);for(t=0;t<arguments.length;t++)this.data[(this.size+this.start-t%this.size-1)%this.size]=t<0||arguments.length<=t?void 0:arguments[t];return this.size-this.length-t<0&&(this.end+=this.size-this.length-t,this.end<0&&(this.end=this.size+this.end%this.size)),this.length<this.size&&(this.length+t>this.size?this.length=this.size:this.length+=t),this.start-=arguments.length,this.start<0&&(this.start=this.size+this.start%this.size),this.length}},{key:"indexOf",value:function(t,e){for(e||(e=0);e<this.length;e++)if(this.data[(this.start+e)%this.size]===t)return e;return-1}},{key:"lastIndexOf",value:function(t,e){for(e||(e=this.length-1);e>=0;e--)if(this.data[(this.start+e)%this.size]===t)return e;return-1}},{key:"sortedIndex",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:z,i=arguments.length>2?arguments[2]:void 0,n=this.length===this.size,r=this.start,s=n?this.length-1:this.length;for(r&&e.call(i,t,this.data[s])>0&&(r=0,s=this.end);r<s;){var h=r+s>>>1;e.call(i,t,this.data[h])>0?r=h+1:s=h}return n?((r-this.start)%this.length+this.length)%this.length:r}},{key:"every",value:function(t,e){for(var i=0;i<this.length;i++)if(!t.call(e,this.data[(this.start+i)%this.size],i,this))return!1;return!0}},{key:"forEach",value:function(t,e){for(var i=0;i<this.length;i++)t.call(e,this.data[(this.start+i)%this.size],i,this)}},{key:"filter",value:function(t,e){for(var i=[],n=0;n<this.length;n++){var r=(this.start+n)%this.size;t.call(e,this.data[r],this)&&i.push(this.data[r])}return this.length=i.length,this.end=this.length-1,this.data=i,this}},{key:"map",value:function(t,e){for(var i=0;i<this.length;i++){var n=(this.start+i)%this.size;this.data[n]=t.call(e,this.data[n],this)}return this}},{key:"some",value:function(t,e){for(var i=0;i<this.length;i++)if(t.call(e,this.data[(this.start+i)%this.size],i,this))return!0;return!1}},{key:"avg",value:function(){return 0==this.length?0:this.sum()/this.length}},{key:"sum",value:function(){for(var t=this.length,e=0;t--;)e+=this.data[t];return e}},{key:"median",value:function(){if(0===this.length)return 0;var t=this.slice().sort(z),e=Math.floor(t.length/2);return t.length%2?t[e]:(t[e-1]+t[e])/2}},{key:"empty",value:function(){return this.length=this.start=0,this.end=this.size-1,this}},{key:"clear",value:function(){return this.fill(void 0).empty(),this}},{key:"fill",value:function(t){var e=0;if("function"==typeof t)for(;this.data[e]=t(),++e<this.size;);else for(;this.data[e]=t,++e<this.size;);return this.start=0,this.end=this.size-1,this.length=this.size,this}},{key:"first",value:function(){return this.data[this.start]}},{key:"last",value:function(){return this.data[this.end]}},{key:"get",value:function(t){return this.data[(this.start+t)%this.size]}},{key:"isFull",value:function(t){return this.size===this.length}},{key:"set",value:function(t,e){return this.data[(this.start+t)%this.size]=e}},{key:"toArray",value:function(){return this.slice()}},{key:"slice",value:function(t,e){var i=this.length;if((t=+t||0)<0){if(t>=e)return[];t=-t>i?0:i+t}null==e||e>i?e=i:e<0?e+=i:e=+e||0,i=t<e?e-t:0;for(var n=Array(i),r=0;r<i;r++)n[r]=this.data[(this.start+t+r)%this.size];return n}},{key:"load",value:function(e){if(t.exports){if(!e)throw new Error("Missing filename");var i=y(this.cachePath,e+".json");if(!b(i))throw new Error("File does not exists");var n=g(i,{encoding:"utf8"});(n=JSON.parse(n)).length&&(this.data=new Array(n.length),this.end=(this.size=n.length)-1,this.push.apply(this,n))}}},{key:"save",value:function(e){if(t.exports){if(!e)throw new Error("Missing filename");var i=y(this.cachePath,e+".json");b(this.cachePath)||p(this.cachePath,{recursive:!0}),v(i,JSON.stringify(this.slice()))}}},{key:"toArrayClone",get:function(){return Array.from(this.slice(),function(t){return function(t){return null!=t&&"string"==typeof t}(t)?t:Array.isArray(t)?h(t):function(t){return null!=t&&"object"===n(t)&&!1===Array.isArray(t)}(t)?function(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},n=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),n.forEach(function(e){s(t,e,i[e])})}return t}({},t):t})}},{key:"array",get:function(){return this.slice()}}])&&l(i.prototype,a),u&&l(i,u),e}();function z(t,e){return t==e?0:t>e?1:-1}t.exports=m},function(t,e){t.exports=require("path")},function(t,e){t.exports=require("fs")}])});