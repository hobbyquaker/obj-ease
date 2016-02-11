var oe = require('./../index.js');
var obj = {};
oe.setProp(obj, 'key\\.containing\\.dots.key\\\\containing\\\\backslashes\\.and\\.dots', 'test!');
console.log(obj); // { 'key.containing.dots': { 'key\\containing\\backslashes.and.dots': 'test!' } }

