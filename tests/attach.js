var oe = require('./../index.js');
var should = require('should');

var db = {};

describe('attach', function () {
    it('should attach to the object without error', function () {
        oe.attach(db);
    });
    it('should have the setProp method', function () {
        db.setProp('a', 1).should.equal(true);
    });
    it('should have the getProp method', function () {
        db.getProp('a').should.equal(1);
    });
    it('should have the delProp method', function () {
        db.delProp('a').should.equal(true);
    });
    it('should have the extend method', function () {
        db.extend({'foo': 'bar'}).should.deepEqual({'foo': 'bar'});
    });
    it('should have the equal method', function () {
        db.equal({'foo': 'bar'}).should.equal(true);
    });
});