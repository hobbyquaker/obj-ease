var oe = require('./../index.js');
var should = require('should');

describe('split(str)', function () {
    it('should return the correct Array', function () {
        oe.split('').should.eql(['']);
        oe.split('.').should.eql(['','']);
        oe.split('..').should.eql(['', '', '']);
        oe.split('...').should.eql(['', '', '', '']);
        oe.split('.......').should.eql(['', '', '', '', '', '', '', '']);
        oe.split('a').should.eql(['a']);
        oe.split('a.a').should.eql(['a', 'a']);
        oe.split('a.a.a').should.eql(['a', 'a', 'a']);
        oe.split('a.a.a.a').should.eql(['a', 'a', 'a', 'a']);
        oe.split('a.a.a.a.a.a.a.a').should.eql(['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a']);
    });
    it('should return the correct unescaped Array', function () {
        oe.split('\\........').should.eql(['.', '', '', '', '', '', '', '']);
        oe.split('..\\......').should.eql(['', '', '.', '', '', '', '', '']);
        oe.split('.....\\...').should.eql(['', '', '', '', '', '.', '', '']);
        oe.split('.......\\.').should.eql(['', '', '', '', '', '', '', '.']);
        oe.split('\\.....\\....\\.').should.eql(['.', '', '', '', '.', '', '', '.']);
        oe.split('a\\.a.b.c.d.e.f.g.h').should.eql(['a.a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
        oe.split('a.b.c.d.e.f.g.h\\.h').should.eql(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h.h']);
        oe.split('a\\.a.b.c.d.e\\.e.f.g.h\\.h').should.eql(['a.a', 'b', 'c', 'd', 'e.e', 'f', 'g', 'h.h']);
        oe.split('a\\\\.b.c.d.e\\.e.f.g.h\\.h').should.eql(['a\\', 'b', 'c', 'd', 'e.e', 'f', 'g', 'h.h']);
        oe.split('\\\\a\\\\.b.c.d.e\\.e.f.g.h\\.h\\\\').should.eql(['\\a\\', 'b', 'c', 'd', 'e.e', 'f', 'g', 'h.h\\']);
    });
    it('should do unescaping', function () {
        oe.split('a\\\\a.bb').should.eql(['a\\a', 'bb']);
        oe.split('a\\\\a.b\\.b').should.eql(['a\\a', 'b.b']);
    });
});
