/*
        obj-ease - handle javascript objects with ease
        https://github.com/hobbyquaker/obj-ease
        See README and LICENSE
 */
(function () {

    // dummy-polyfill for non-nodejs environments
    if (typeof Buffer === 'undefined') Buffer = function () {}; // implicitly by intention

    /**
     * @Class objease
     * */
    var objease = {
        /**
         * @method attach
         * extends an object (prototype) with the obj-ease functions (non-enumerable)
         * @param {object} obj object to extend
         */
        attach: function attach(obj) {
            Object.defineProperty(obj, 'getProp', {
                enumerable: false,
                value: function (prop) {
                    return objease.getProp(this, prop);
                }
            });
            Object.defineProperty(obj, 'delProp', {
                enumerable: false,
                value: function (prop) {
                    return objease.delProp(this, prop);
                }
            });
            Object.defineProperty(obj, 'setProp', {
                enumerable: false,
                value: function (prop, val) {
                    return objease.setProp(this, prop, val);
                }
            });
            Object.defineProperty(obj, 'extend', {
                enumerable: false,
                value: function (obj) {
                    return objease.extend(this, obj);
                }
            });
            Object.defineProperty(obj, 'clone', {
                enumerable: false,
                value: function () {
                    return objease.clone(this);
                }
            });
            Object.defineProperty(obj, 'equal', {
                enumerable: false,
                value: function (obj) {
                    return objease.equal(this, obj);
                }
            });
        },
        /**
         * @method split
         * Split str by '.' - supports backslash escaped delimiters
         * @param {string} str
         * @returns {Array.<string>}
         */
        split: function split(str) {
            str = '' + str;

            // use native split if possible
            if (str.indexOf('\\') === -1) return str.split('.');

            var res = []; // the result array
            var pos = 0;  // starting position of current chunk

            function chunk(start, end) {
                // slice, unescape and push onto result array.
                res.push(str.slice(start, end).replace(/\\\\/g, '\\').replace(/\\\./g, '.'));
                // set starting position of next chunk.
                pos = end + 1;
            }

            var esc; // boolean indicating if a dot is escaped
            var j;
            for (var i = 0, l = str.length; i < l; i++) {
                if (str[i] === '.') {
                    esc = false;
                    // walk over preceding backslashes in reverse direction
                    for (j = i - 1; str[j] === '\\'; j--) esc = !esc;
                    // dot is escaped only if preceded by an odd number of backslashes
                    if (!esc) chunk(pos, i);
                }
            }

            chunk(pos, i);

            return res;
        },
        /**
         * @method delProp
         * delete an objects property. supports nested properties through dot-notation, dots may be escaped by backslash.
         * @param {Object} obj
         * @param {string} prop
         * @return {boolean} - true if property was found and deleted
         */
        delProp: function delProp(obj, prop) {
            var arr = this.split(prop);
            var p = obj;
            var changed = false;
            for (var i = 0, l = arr.length; i < l; i++) {
                if (p && p.hasOwnProperty(arr[i])) {
                    if ((i + 1) == l) {
                        delete p[arr[i]];
                        changed = true;
                    } else {
                        p = p[arr[i]];
                    }
                } else {
                    break;
                }
            }
            return changed;
        },
        /**
         * @method setProp
         * set an objects property. supports nested properties through dot-notation, dots may be escaped by backslash.
         * @param {Object} obj
         * @param {string} prop
         * @param {all} val
         * @returns {boolean} - true if a change on obj happened
         */
        setProp: function setProp(obj, prop, val) {
            var arr = this.split(prop);
            var changed = false;

            if (!obj || ((typeof obj !== 'object') && (typeof obj !== 'function'))) {
                throw new TypeError('setProp argument obj invalid');
            }

            var p = obj;
            var type;
            for (var i = 0, l = arr.length; i < l; i++) {

                if ((i + 1) < l) {
                    type = typeof p[arr[i]];

                    if (!p[arr[i]] || ((type !== 'object')) && (type !== 'function')) {
                        p[arr[i]] = {};
                        changed = true;
                    }

                    p = p[arr[i]];

                } else {

                    if ((typeof val === 'object' && val) || typeof val === 'function') {
                        val = this.clone(val);
                        if (!this.equal(p[arr[i]], val)) {
                            p[arr[i]] = val;
                            changed = true;
                        }
                    } else {
                        if (p[arr[i]] !== val) {
                            p[arr[i]] = val;
                            changed = true;
                        }
                    }

                }

            }

            return changed;
        },
        /**
         * @method getProp
         * get an objects property. supports nested properties through dot-notation, dots may be escaped by backslash
         * @param {Object} obj
         * @param {string} prop
         * @returns {all} the properties value or undefined
         */
        getProp: function getProp(obj, prop) {
            var type = typeof obj;
            if (type !== 'object' && type !== 'function') {
                if (typeof prop === 'undefined') {
                    return obj;
                } else {
                    return undefined;
                }
            }
            var arr = this.split('' + prop);
            var res = obj;
            for (var i = 0, l = arr.length; i < l; i++) {
                if (res) res = res[arr[i]];
            }
            return res;
        },
        /**
         * @method equal
         * compare objects by value
         * @param {object} obj1
         * @param {object} obj2
         * @returns {boolean} true if both objects are equal
         */
        equal: function equal(obj1, obj2) {
            var that = this;

            if (obj1 === obj2) return true;

            var type1 = typeof obj1;
            var type2 = typeof obj2;
            var keys1;
            var keys2;

            var equal = true;

            if (type1 !== type2) return false;

            if (type1 !== 'object' && type1 !== 'function') {

                if (type1 === 'number' && type2 === 'number' && isNaN(obj1) && isNaN(obj2)) {
                    return true;
                } else {
                    return obj1 === obj2;
                }

            } else if (!obj1 || !obj2) {

                return obj1 === obj2;

            } else {

                keys1 = Object.keys(obj1);
                keys2 = Object.keys(obj2);

                if (keys1.length !== keys2.length) return false;

                if (type1 === 'object') {

                    keys1.forEach(function (key) {
                        if (!equal) return;
                        if (obj1 instanceof Buffer) {
                            if (key === 'parent' || key === 'offset') return;
                        }
                        if (!obj2.hasOwnProperty(key)) {
                            equal = false;
                        } else if (!that.equal(obj1[key], obj2[key])) {
                            equal = false;
                        }
                    });
                    return equal;

                } else if (type1 === 'function') {
                    // TODO?!
                }

            }

        },
        /**
         * @method clone
         * clone obj
         * @param {Object|Array} obj
         * @returns {Object|Array} the cloned object
         */
        clone: function clone(obj) {
            var tmp;
            if (obj instanceof Array) {
                tmp = [];
            } else {
                tmp = {};
            }
            this.extend(tmp, obj);
            return tmp;
        },
        /**
         * @method extend
         * extend that by obj. observes if a change happens while extending
         * @param {Object} that
         * @param {Object} obj
         * @returns {undefined|Object} undefined if no change happened - otherwise an object containing the changes is returned
         */
        extend: function extend(that, obj) {
            var res;
            var type = typeof obj;

            if (type === 'object' && obj instanceof Array) {
                if (typeof that === 'object' && that instanceof Array) {
                    this.equal(that, obj) ? res = [] : res = that;
                } else {
                    res = [];
                }
            } else if (type === 'object') {
                res = {};
            }
            Object.keys(obj).forEach(function (key) {
                switch (typeof obj[key]) {
                    case 'string':
                    case 'number':
                    case 'boolean':
                        if (that[key] !== obj[key]) {
                            res[key] = that[key] = obj[key];
                        }
                        break;

                    case 'object':
                        // Todo clearify: do Date and RegExp objects need a special handling?
                        if (obj[key] === null) {
                            if (that[key] !== null) {
                                res[key] = that[key] = null;
                            }
                        } else if (obj[key] instanceof Buffer) {
                            if (that[key] instanceof Buffer) {
                                if (that[key].compare(obj[key] !== 0)) {
                                    res[key] = that[key] = new Buffer(obj[key]);
                                }
                            } else {
                                res[key] = new Buffer(obj[key]);
                            }
                        } else if (obj[key] instanceof Array) {

                            if (typeof that[key] !== 'object' || (!(that[key] instanceof Array))) {

                                res[key] = that[key] = [];
                            }
                            res[key] = objease.extend(that[key], obj[key]);
                            if (res[key] === undefined) delete res[key];

                        } else {
                            if (typeof that[key] !== 'object') {
                                res[key] = that[key] = {};
                            }
                            res[key] = objease.extend(that[key], obj[key]);
                            if (typeof res[key] === 'object'
                                && Object.keys(res[key]).length === 0
                                && Object.keys(obj[key]).length !== 0
                            ) {
                                delete res[key]; // = undefined;
                            } else if (typeof res[key] === 'undefined' && Object.keys(obj[key]).length !== 0) {
                                delete res[key];
                            }
                        }
                        break;

                    case 'undefined':
                        if (typeof that[key] !== 'undefined') {
                            res[key] = that[key] = undefined;
                        }
                        break;

                    case 'function':
                        // Todo ?!
                        console.log('function! todo?!');
                        break;

                    default:
                        throw new Error('unkown type', typeof obj[key], 'in', key);
                        break;
                }
            });
            if (typeof res === 'object' && Object.keys(res).length === 0 && Object.keys(obj).length !== 0) {
                return;
            }
            return res;
        }
    };

    if (typeof define === 'function' && define.amd) {
        // export as AMD module
        define(objease);
    } else if (typeof module !== 'undefined') {
        // export as node module
        module.exports = objease;
    } else {
        window.oe = objease;
    }

})();
