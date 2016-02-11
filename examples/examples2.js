var oe = require('./../index.js');

console.log(oe.setProp({a:1}, 'a', 1)); // false;
console.log(oe.setProp({a:1}, 'a', 2)); // true;

console.log(oe.extend({a: {b: {x: 1, y: 2}}}, {a: {b: {x: 1, y: 3}}}));