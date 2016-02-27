var oe = require('./../index.js');
var should = require('should');

describe('extend(that, obj)', function () {

    it('should return undefined when nothing changes', function () {

        var obj1 = {
            a: 1,
            b: 2,
            c: {
                d: 3,
                e: 4
            }
        };

        should.equal(oe.extend(obj1, {
            a: 1
        }), undefined);

        should.equal(oe.extend(obj1, {
            a: 1,
            b: 2
        }), undefined);

        should.equal(oe.extend(obj1, {
            a: 1,
            b: 2,
            c: {
                d: 3
            }
        }), undefined);

        should.equal(oe.extend(obj1, {
            a: 1,
            b: 2,
            c: {
                e: 4
            }
        }), undefined);

        should.equal(oe.extend(obj1, {
            a: 1,
            b: 2,
            c: {
                d: 3,
                e: 4
            }
        }), undefined);
    });

    it('should return undefined when nothing changes', function () {

        var obj1 = {
            a: 'muh',
            b: false,
            c: {
                d: [1, 2, 3],
                e: null
            }
        };

        should.equal(oe.extend(obj1, {
            a: 'muh'
        }), undefined);

        should.equal(oe.extend(obj1, {
            a: 'muh',
            b: false
        }), undefined);

        should.equal(oe.extend(obj1, {
            a: 'muh',
            b: false,
            c: {
                d: [1, 2, 3]
            }
        }), undefined);

        should.equal(oe.extend(obj1, {
            a: 'muh',
            b: false,
            c: {
                e: null
            }
        }), undefined);

        should.equal(oe.extend(obj1, {
            a: 'muh',
            b: false,
            c: {
                d: [1, 2, 3],
                e: null
            }
        }), undefined);

    });


    it('should return undefined when nothing changes', function () {
        var obj1 = {a: [0.5, 0.7]};
        var tmp = oe.extend(obj1, {a: [0.5, 0.7]});
        should.equal(tmp, undefined);
    });


    it('should return undefined when nothing changes', function () {
        var obj1 = {a: {b: {c: [0.5, 0.7]}}};
        var tmp = oe.extend(obj1, {a: {b: {c: [0.5, 0.7]}}});
        should.equal(tmp, undefined);
    });


    it('should return an object containing the changed properties', function () {
        var obj1 = {a: {b: {c: [0.5, 0.7]}}};
        var tmp = oe.extend(obj1, {a: {b: {c: [0.5, 0.8]}}});
        tmp.should.have.properties({
            a: {b: {c: [0.5, 0.8]}}
        });
    });


    it('should return an object containing the changed properties', function () {
        var obj1 = {a: {b: {c: [0.5, 0.7]}}, aa: true};
        var tmp = oe.extend(obj1, {a: {b: {c: [0.5, 0.8]}}});
        tmp.should.have.properties({
            a: {b: {c: [0.5, 0.8]}}
        });
    });


    it('should return an object containing the changed properties', function () {
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

        var res = oe.extend(obj1, obj2);
        res.should.have.properties({
            c: {e: 5, f: 6}
        });
    });


    it('should return an object not containing the unchanged properties', function () {
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

        var res = oe.extend(obj1, obj2);
        res.should.have.properties({
            c: {e: 5, f: 6}
        });

        should.equal(res.a, undefined);
        should.equal(res.b, undefined);
        should.equal(res.c.d, undefined);
    });


    it('should extend that by obj', function () {
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

        var res = oe.extend(obj1, obj2);
        res.should.have.properties({
            c: {e: 5, f: 6}
        });

        oe.extend(obj1, obj2);

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
