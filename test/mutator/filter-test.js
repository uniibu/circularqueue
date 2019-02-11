var vows = require('vows'),
    assert = require('assert')
    suite = vows.describe('CBuffer');

require('../env');

suite.addBatch({
	'filter' : {
		'topic' : function () {
			return CBuffer;
		},
		'filter items' : function (CBuffer) {
			var tmp;

			tmp = new CBuffer(1, 2, 3);
			assert.deepEqual(tmp.filter(v => v !== 2).toArray(), [1,3]);

			tmp = new CBuffer(1, null, 3);
			tmp.filter(Boolean);
			assert.deepEqual(tmp.toArray(), [1, 3]);

			tmp = new CBuffer(3);
			assert.deepEqual(tmp.filter(v => v !== 3).toArray(),[]);
		},
		'filter properties' : function (CBuffer) {
			var tmp;

			tmp = new CBuffer(1, 2, 3);
			tmp.filter(v => v !== 3);
			assert.equal(tmp.end, 1);
			assert.equal(tmp.length, 2);
		}
	}
});

suite.export(module);
