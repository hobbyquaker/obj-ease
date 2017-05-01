var oe = require('./../index.js');
var should = require('should');

describe('setProp(obj, prop)', function () {
    var obj = {
        a: {
            aa: {
                aaa: 'test'
            },
            ab: {
                abb: 'muh',
                abc: 'maeh',
                abd: 'blub'
            }
        }
    };

    it('should return false if no change on obj happens', function () {

        oe.setProp(obj, 'a.aa.aaa', 'test').should.eql(false);
        oe.setProp(obj, 'a.aa', {aaa: 'test'}).should.eql(false);


    });

    it('should return true and change a property', function () {
        oe.setProp(obj, 'a.aa.aaa', 'test2').should.eql(true);
        obj.should.have.properties({
            a: {
                aa: {
                    aaa: 'test2'
                },
                ab: {
                    abb: 'muh',
                    abc: 'maeh',
                    abd: 'blub'
                }
            }
        })
    });

    it('should overwrite a property', function () {
        oe.setProp(obj, 'a', {aa: {aaa: 'test2'}}).should.eql(true);
        obj.should.have.properties({
            a: {
                aa: {
                    aaa: 'test2'
                }
            }
        });
    });


    it('should return true and create nested properties', function () {
        var obj2 = {b:1};
        oe.setProp(obj2, 'a.aa.aaa', 'test2').should.eql(true);
        obj2.should.have.properties({
            a: {
                aa: {
                    aaa: 'test2'
                }
            },
            b: 1
        });

        var obj3 = {a:{bla:'blub'},b:1};
        oe.setProp(obj3, 'a.aa.aaa', 'test2').should.eql(true);
        obj3.should.have.properties({
            a: {
                aa: {
                    aaa: 'test2'
                },
                bla: 'blub'
            },
            b: 1
        })
    });

    it('should return true and create a nested null property', function () {
        var obj2 = {b:1};
        oe.setProp(obj2, 'a.aa.aaa', null).should.eql(true);
        obj2.should.have.properties({
            a: {
                aa: {
                    aaa: null
                }
            },
            b: 1
        });
    });

    it('should throw an error if obj is not of type object', function () {
        (function () {
            oe.setProp(null, 'a.aa.aaa', null)
        }).should.throw();
    });


});
