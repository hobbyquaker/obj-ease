var oe = require('./../index.js');
var should = require('should');

describe('extend(that, obj)', function () {
    var obj1 = {
        a: 1,
        b: 2,
        c: {
            d: 3,
            e: 4
        }
    };
    var obj2 = {
        b: 2,
        c: {
            d: 3,
            e: 5,
            f: 6
        }
    };

    it('should return undefined when nothing changes', function () {

        should.equal(oe.extend(obj1, {
            a: 1,
            b: 2,
            c: {
                d: 3
            }
        }), undefined);

    });

    var res = oe.extend(obj1, obj2)


    it('should return an object containing the changed properties', function () {
        res.should.have.properties({
            c: {e: 5, f: 6}
        });
    });

    it('should return an object not containing the unchanged properties', function () {
        should.equal(res.a, undefined);
        should.equal(res.b, undefined);
        should.equal(res.c.d, undefined);
    });

    it('should extend that by obj', function () {
        obj1.should.have.properties({
            a: 1,
            b: 2,
            c: {
                d: 3,
                e: 5,
                f: 6
            }
        });
    });




});
