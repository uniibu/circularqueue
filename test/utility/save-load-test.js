var fs = require('fs');
var rimraf = require('rimraf');
var path = require('path');
var vows = require('vows'),
    assert = require('assert'),
    suite = vows.describe('CBuffer');

require('../env.js');

suite.addBatch({
	'utility' : {
		'topic' : function () {
			return CBuffer;
		},
		'save' : function (CBuffer) {
			var tmp;
			tmp = new CBuffer(1,2,3);
			tmp.save('tmp.json');
			assert.equal(fs.existsSync(path.resolve(process.cwd(), 'tmp.json')), true);
		},
    'load' : function (CBuffer) {
			var tmp;
			tmp = new CBuffer(1);
			tmp.load('tmp.json');
			assert.equal(tmp.size, 3);
      assert.deepEqual(tmp.toArray(), [1,2,3])
      rimraf.sync(path.resolve(process.cwd(), 'tmp.json'));
		}
	}
});