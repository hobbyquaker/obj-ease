var oe = require('./../index.js');

var db = {};
oe.attach(db);

db.setProp('a.b.c', 'test!');
console.log(db); // { a: { b: { c: 'test!' } } }
