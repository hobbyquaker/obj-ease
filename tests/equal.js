var oe = require('./../index.js');
var should = require('should');

describe('equal(obj1, obj2)', function () {

    it('should return true on equal primitives', function () {

        oe.equal(0, 0).should.eql(true);
        oe.equal(1, 1).should.eql(true);
        oe.equal(1.5, 1.5).should.eql(true);
        oe.equal(8, 010).should.eql(true);
        oe.equal(15, 0xf).should.eql(true);
        oe.equal('', '').should.eql(true);
        oe.equal('test', 'test').should.eql(true);
        oe.equal(false, false).should.eql(true);
        oe.equal(undefined, undefined).should.eql(true);
        oe.equal(null, null).should.eql(true);
        oe.equal(Infinity, Infinity).should.eql(true);
        oe.equal(NaN, NaN).should.eql(true);


    });

    it('should return false on non-equal primitives', function () {

        oe.equal(0, 1).should.eql(false);
        oe.equal(1, 1.5).should.eql(false);
        oe.equal(1.5, 2).should.eql(false);
        oe.equal(8, 011).should.eql(false);
        oe.equal(15, 0xe).should.eql(false);
        oe.equal('', '_').should.eql(false);
        oe.equal('', 0).should.eql(false);
        oe.equal('', undefined).should.eql(false);
        oe.equal('', null).should.eql(false);
        oe.equal('abc', 1).should.eql(false);
        oe.equal('abc', '').should.eql(false);
        oe.equal('test1', 'test2').should.eql(false);
        oe.equal(false, undefined).should.eql(false);
        oe.equal(undefined, null).should.eql(false);
        oe.equal(null, NaN).should.eql(false);
        oe.equal(Infinity, -Infinity).should.eql(false);
        oe.equal(NaN, 0).should.eql(false);

    });

    it('should return true on equal Buffers', function () {

        oe.equal(new Buffer(''), new Buffer('')).should.eql(true);
        oe.equal(new Buffer('muh'), new Buffer('muh')).should.eql(true);
        oe.equal(new Buffer('muh'), new Buffer([0x6d, 0x75, 0x68])).should.eql(true);

    });

    it('should return false on non-equal Buffers', function () {

        oe.equal(new Buffer(''), new Buffer('0')).should.eql(false);
        oe.equal(new Buffer('muh'), new Buffer('muh!')).should.eql(false);
        oe.equal(new Buffer('mäh'), new Buffer([0x6d, 0x75, 0x68])).should.eql(false);

    });

    it('should return true on equal objects', function () {

        oe.equal({}, {}).should.eql(true);
        oe.equal({a:1}, {a:1}).should.eql(true);
        oe.equal({a:1,b:2,c:3}, {a:1,c:3,b:2}).should.eql(true);
        oe.equal({a:{b:{c:1}}}, {a:{b:{c:1}}}).should.eql(true);
        oe.equal({a:{b:{c:null}}}, {a:{b:{c:null}}}).should.eql(true);
        oe.equal({a:{b:{c:[1,2,3]}}}, {a:{b:{c:[1,2,3]}}}).should.eql(true);
        oe.equal({a:{b:{c:new Buffer([1,2,3])}}}, {a:{b:{c:new Buffer([1,2,3])}}}).should.eql(true);

    });




    it('should return false on non-equal objects', function () {

        oe.equal({}, {a:1}).should.eql(false);
        oe.equal({a:1}, {a:2}).should.eql(false);
        oe.equal({a:{b:{c:1}}}, {a:{b:{d:1}}}).should.eql(false);
        oe.equal({a:{b:{c:1}}}, {a:{b:{c:1,d:2}}}).should.eql(false);
        oe.equal({a:{b:{c:null}}}, {a:{b:{c:undefined}}}).should.eql(false);
        oe.equal({a:{b:{c:[1,2,3]}}}, {a:{b:{c:[1,2]}}}).should.eql(false);
        oe.equal({a:{b:{c:new Buffer([1,2,3])}}}, {a:{b:{c:new Buffer([1,2,4])}}}).should.eql(false);
        oe.equal({a:{b:{c:new Buffer([1,2,3])}}}, {a:{b:{c:new Buffer([1,2])}}}).should.eql(false);

    });


    it('should return true on equal arrays', function () {

        oe.equal([], []).should.eql(true);
        oe.equal([1,2,3], [1,2,3]).should.eql(true);
        oe.equal([1,null,false,''], [1,null,false,'']).should.eql(true);

    });

    it('should return false on non-equal arrays', function () {

        oe.equal([], [undefined]).should.eql(false);
        oe.equal([], ['']).should.eql(false);
        oe.equal([], [0]).should.eql(false);
        oe.equal([1,2,3], [1,2,3,4]).should.eql(false);
        oe.equal([1,2,3,4], [1,2,3]).should.eql(false);
        oe.equal([1,null,false,''], [1,undefined,false,'']).should.eql(false);
        oe.equal([1,null,false,''], [1,null,null,'']).should.eql(false);

    });


});
