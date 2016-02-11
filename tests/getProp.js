var oe = require('./../index.js');
var should = require('should');

describe('getProp(obj, prop)', function () {
    var obj = {
        a: {
            aa: {
                aaa: 'test'
            },
            ab: [1, 2, 4],
            ac: null,
            ad: '',
            ae: [],
            af: 0
        }
    };

    it('should return undefined on non-existant properties', function () {

        should.equal(oe.getProp({}, undefined), undefined);
        should.equal(oe.getProp({}, 0), undefined);
        should.equal(oe.getProp({}, 1), undefined);
        should.equal(oe.getProp({}, null), undefined);
        should.equal(oe.getProp({}, false), undefined);
        should.equal(oe.getProp({}, true), undefined);
        should.equal(oe.getProp({}, NaN), undefined);
        should.equal(oe.getProp({}, Infinity), undefined);
        should.equal(oe.getProp({}, function () {}), undefined);
        should.equal(oe.getProp({}, ''), undefined);
        should.equal(oe.getProp({}, 'a.b.c'), undefined);

    });

    it('should return obj on non-object', function () {
        should.equal(oe.getProp(), undefined);
        should.equal(oe.getProp(0), 0);
        should.equal(oe.getProp(1), 1);
        should.equal(oe.getProp(null), null);
        should.equal(oe.getProp(false), false);
        should.equal(oe.getProp(true), true);
        should.equal(isNaN(oe.getProp(NaN)), true);
        should.equal(oe.getProp(Infinity), Infinity);
        should.equal(oe.getProp(''), '');
        should.equal(oe.getProp('xyz'), 'xyz');
    });


    it('should return undefined on non-existant properties of non-object', function () {
        should.equal(oe.getProp('', 'a.b.c'), undefined);
        should.equal(oe.getProp(NaN, 'a.b.c'), undefined);
        should.equal(oe.getProp(null, 'a.b.c'), undefined);
        should.equal(oe.getProp(undefined, 'a.b.c'), undefined);
    });


    it('should return undefined on non-existant nested property', function () {
        should.equal(oe.getProp(obj, 'a.undef.x'), undefined);
        should.equal(oe.getProp(obj, 'a.ac.x'), undefined);
    });

    it('should return the property', function () {
        oe.getProp(obj, 'a.aa.aaa').should.eql('test');
        (oe.getProp(obj, 'a.ac') === null).should.eql(true);
    });

    it('should return an array (element)', function () {
        oe.getProp(obj, 'a.ab').should.eql([1, 2, 4]);
        oe.getProp(obj, 'a.ab.0').should.eql(1);
        oe.getProp(obj, 'a.ab.2').should.eql(4);
        (oe.getProp(obj, 'a.ab.3') === undefined).should.eql(true);

    });


    it('should return the property', function () {
        oe.getProp(obj, 'a').should.eql(obj.a);
    });

});
