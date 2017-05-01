var oe = require('./../index.js');
var should = require('should');

var db = {};

describe('clone(obj)', function () {
    it('should clone an object', function () {
        var o1 = {a: true, b: false};
        var o2 = oe.clone(o1);
        o2.should.deepEqual(o1);
    });
    it('should clone an array', function () {
        var o1 = [1, 2, 3];
        var o2 = oe.clone(o1);
        o2.should.deepEqual(o1);
    });
});