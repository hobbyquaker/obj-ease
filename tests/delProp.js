var oe = require('./../index.js');
var should = require('should');

describe('delProp(obj, prop)', function () {

    it('should return false when trying to delete a non-existant property and leave the object unchanged', function () {
        var obj = {
            a: {
                aa: {
                    aaa: 'test'
                },
                ab: [1, 2, 4],
                ac: null
            }
        };
        oe.delProp(obj, 'a.undef.x').should.be.false;
        obj.should.have.properties({
            a: {
                aa: {
                    aaa: 'test'
                },
                ab: [1, 2, 4],
                ac: null
            }
        });
    });


    it('should return true and delete a property', function () {
        var obj = {
            a: {
                aa: {
                    aaa: 'test'
                },
                ab: [1, 2, 4],
                ac: null
            }
        };
        oe.delProp(obj, 'a.ac').should.eql(true);
        obj.should.have.properties({
            a: {
                aa: {
                    aaa: 'test'
                },
                ab: [1, 2, 4]
            }
        });
    });



});
