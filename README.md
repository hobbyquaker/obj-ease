# obj-ease

[![Build Status](https://travis-ci.org/hobbyquaker/obj-ease.svg?branch=master)](https://travis-ci.org/hobbyquaker/obj-ease) [![NPM version](https://badge.fury.io/js/obj-ease.svg)](http://badge.fury.io/js/obj-ease)

> handle javascript objects with ease :surfer:


## Purpose

get/set/delete properties by dot-notation, clone, extend and compare objects.

> Why reinvent the wheel? There are more than enough modules solving the same problems!

Most of the implementations I found didn't suite my needs at 100% (e.g. useful return values, see below) and this module has also some educational purpose - I want to improve my js skills, so I would be glad and thankful to hear your opinion and critics on this implementation or - even better - get some pull requests that help to optimize performance, function, tooling, style and documentation of this module.


## Usage Examples

```Javascript
var oe = require('obj-ease');

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
```

## Advanced usage

### Return values

#### setProp 

setProp tells you if it really did a change on the object. So ```oe.setProp({a:1}, 'a', 1)``` will return false and ```oe.setProp({a:1}, 'a', 2)``` will return true. 

#### extend
extend returns an object containing all properties that changed on the target or undefined if no change happened. So ```oe.extend({a: {b: {x: 1, y: 2}}}, {a: {b: {x: 1, y: 3}}})``` will return ```{ a: { b: { y: 3 } } }```

### alternative usage on objects

You can attach the methods of obj-ease as non-enumerable properties to an object or an object prototype:

```Javascript
var db = {};
require('obj-ease').attach(db);

db.setProp('a.b.c', 'test!');
console.log(db); // { a: { b: { c: 'test!' } } }
```
Obviously the first param of all methods has to be omitted if used on an object.

One could also extend Object.prototype (really?): ```require('obj-ease').attach(Object.prototype);```


### Escaping

You can access properties with dots in their names simply by escaping them with backslashes.

```Javascript
var oe = require('obj-ease');

oe.setProp(obj, 'key\\.containing\\.dots.key\\\\containing\\\\backslashes\\.and\\.dots', 'test!');
console.log(obj); // { 'key.containing.dots': { 'key\\containing\\backslashes.and.dots': 'test!' } }
```


### Special Objects

This module works with Array and Buffer objects too. 

Until now it can not handle Function objects (see Todo). Handling of Date and RegExp objects is untested also.

## Methods

* *mixed* **getProp(** *Object* **obj,** *String* **prop )**

returns the properties value or undefined.

* *Boolean* **setProp(** *Object* **obj,** *String* **prop,** *mixed* **val )**

returns true if a change on `obj` happened, false otherwise.

* *Boolean* **delProp**( *Object* **obj,** *String* **prop )**

returns true if a change on `obj` happened, false otherwise.

* *Object* **clone(** *Object* **obj )**

returns a clone of `obj`.

* *mixed* **extend(** *Object* **that**, *Object* **obj** )

returns an object containing all changed properties or undefined if no change on `that` happened.

* *Boolean* **equal(** *Object* **that,** *Object* **obj )**

returns true if `that` and `obj` are equal (comparison is done recursively with strict equality).


## Todo

* Clearify Browser support, publish on bower
* Handling of Date and RegExp objects
* Handle function objects in a useful manner
* Gulp task bumping version and publishing to npm and bower
* More and better tests
* Better Readme
* optimize get/set/delProp performance by integrated split method (could break prop string loop earlier)
* Auto-generate markdown from jsdoc and insert into Readme
* jshint?, idea?
* Auto-generate markdown from benchmark results and insert into Readme
* More and better benchmarks


## License

MIT © [Sebastian Raff](https://github.com/hobbyquaker)
