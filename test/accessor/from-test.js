var vows = require('vows'),
    assert = require('assert')
    suite = vows.describe('CBuffer');

require('../env.js');

suite.addBatch({
	'from' : {
		'topic' : function () {
			return CBuffer;
		},
		'from array' : function (CBuffer) {
      var arr = Array.from(Array(5).keys())
			assert.deepEqual(CBuffer.from(arr).toArray(), [0,1,2,3,4]);
		},
		'from set' : function (CBuffer) {
      var arr = new Set(Array.from(Array(5).keys()))
			assert.deepEqual(CBuffer.from(arr).toArray(), [0,1,2,3,4]);
		}
	}
});

suite.export(module);
