var oe = require('./../index.js');

var obj1 = {a: {b: {c: true}}};
console.log(oe.getProp(obj1, 'a.b.c')); // true
console.log(oe.getProp(obj1, 'a.b.missing')); // undefined

var obj2 = oe.clone(obj1);
console.log(oe.equal(obj1, obj2)); // true

oe.setProp(obj2, 'a.b.c', false);
console.log(oe.equal(obj1, obj2)); // false
console.log(oe.getProp(obj1, 'a.b.c')); // true

oe.extend(obj1, {a: {b: {bla: 'blub'}}});
console.log(obj1); // { a: { b: { c: true, bla: 'blub' } } }

oe.setProp(obj1, 'a.b', {c: null});
console.log(obj1); // { a: { b: { c: null } } }

oe.delProp(obj1, 'a.b');
console.log(obj1); // { a: {} }
