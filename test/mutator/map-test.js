var vows = require('vows'),
    assert = require('assert')
    suite = vows.describe('CBuffer');

require('../env');

suite.addBatch({
	'map' : {
		'topic' : function () {
			return CBuffer;
		},
		'map items' : function (CBuffer) {
			var tmp;

			tmp = new CBuffer(1, 2, 3);
			assert.deepEqual(tmp.map(v => parseInt(v) + 1).toArray(), [2,3,4]);

			tmp = new CBuffer(1, 3);
			tmp.map(v => parseInt(v) * 10);
			assert.deepEqual(tmp.toArray(), [10, 30]);

			tmp = new CBuffer(3);
			assert.deepEqual(tmp.map(v => parseInt(v) + 1).toArray(),[]);
		},
		'map properties' : function (CBuffer) {
			var tmp;

			tmp = new CBuffer(1, 2, 3);
			tmp.map(v => parseInt(v) + 3);
			assert.equal(tmp.end, 2);
      assert.equal(tmp.last(), 6);
			assert.equal(tmp.length, 3);
		}
	}
});

suite.export(module);
