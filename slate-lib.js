define("slate-lib", ["react","react-dom"], function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_68__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 114);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.Immutable = factory();
})(undefined, function () {
  'use strict';
  var SLICE$0 = Array.prototype.slice;

  function createClass(ctor, superClass) {
    if (superClass) {
      ctor.prototype = Object.create(superClass.prototype);
    }
    ctor.prototype.constructor = ctor;
  }

  function Iterable(value) {
    return isIterable(value) ? value : Seq(value);
  }

  createClass(KeyedIterable, Iterable);
  function KeyedIterable(value) {
    return isKeyed(value) ? value : KeyedSeq(value);
  }

  createClass(IndexedIterable, Iterable);
  function IndexedIterable(value) {
    return isIndexed(value) ? value : IndexedSeq(value);
  }

  createClass(SetIterable, Iterable);
  function SetIterable(value) {
    return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
  }

  function isIterable(maybeIterable) {
    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
  }

  function isKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
  }

  function isIndexed(maybeIndexed) {
    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
  }

  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  function isOrdered(maybeOrdered) {
    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
  }

  Iterable.isIterable = isIterable;
  Iterable.isKeyed = isKeyed;
  Iterable.isIndexed = isIndexed;
  Iterable.isAssociative = isAssociative;
  Iterable.isOrdered = isOrdered;

  Iterable.Keyed = KeyedIterable;
  Iterable.Indexed = IndexedIterable;
  Iterable.Set = SetIterable;

  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  // Used for setting prototype methods that IE8 chokes on.
  var DELETE = 'delete';

  // Constants describing the size of trie nodes.
  var SHIFT = 5; // Resulted in best performance after ______?
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;

  // A consistent shared value representing "not set" which equals nothing other
  // than itself, and nothing that could be provided externally.
  var NOT_SET = {};

  // Boolean references, Rough equivalent of `bool &`.
  var CHANGE_LENGTH = { value: false };
  var DID_ALTER = { value: false };

  function MakeRef(ref) {
    ref.value = false;
    return ref;
  }

  function SetRef(ref) {
    ref && (ref.value = true);
  }

  // A function which returns a value representing an "owner" for transient writes
  // to tries. The return value will only ever equal itself, and will not equal
  // the return of any subsequent call of this function.
  function OwnerID() {}

  // http://jsperf.com/copy-array-inline
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }

  function ensureSize(iter) {
    if (iter.size === undefined) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }

  function wrapIndex(iter, index) {
    // This implements "is array index" which the ECMAString spec defines as:
    //
    //     A String property name P is an array index if and only if
    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
    //     to 2^32−1.
    //
    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
    if (typeof index !== 'number') {
      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
      if ('' + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }

  function returnTrue() {
    return true;
  }

  function wholeSlice(begin, end, size) {
    return (begin === 0 || size !== undefined && begin <= -size) && (end === undefined || size !== undefined && end >= size);
  }

  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }

  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }

  function resolveIndex(index, size, defaultIndex) {
    return index === undefined ? defaultIndex : index < 0 ? Math.max(0, size + index) : size === undefined ? index : Math.min(size, index);
  }

  /* global Symbol */

  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;

  function Iterator(next) {
    this.next = next;
  }

  Iterator.prototype.toString = function () {
    return '[Iterator]';
  };

  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect = Iterator.prototype.toSource = function () {
    return this.toString();
  };
  Iterator.prototype[ITERATOR_SYMBOL] = function () {
    return this;
  };

  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult ? iteratorResult.value = value : iteratorResult = {
      value: value, done: false
    };
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  function hasIterator(maybeIterable) {
    return !!getIteratorFn(maybeIterable);
  }

  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === 'function';
  }

  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }

  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  function isArrayLike(value) {
    return value && typeof value.length === 'number';
  }

  createClass(Seq, Iterable);
  function Seq(value) {
    return value === null || value === undefined ? emptySequence() : isIterable(value) ? value.toSeq() : seqFromValue(value);
  }

  Seq.of = function () /*...values*/{
    return Seq(arguments);
  };

  Seq.prototype.toSeq = function () {
    return this;
  };

  Seq.prototype.toString = function () {
    return this.__toString('Seq {', '}');
  };

  Seq.prototype.cacheResult = function () {
    if (!this._cache && this.__iterateUncached) {
      this._cache = this.entrySeq().toArray();
      this.size = this._cache.length;
    }
    return this;
  };

  // abstract __iterateUncached(fn, reverse)

  Seq.prototype.__iterate = function (fn, reverse) {
    return seqIterate(this, fn, reverse, true);
  };

  // abstract __iteratorUncached(type, reverse)

  Seq.prototype.__iterator = function (type, reverse) {
    return seqIterator(this, type, reverse, true);
  };

  createClass(KeyedSeq, Seq);
  function KeyedSeq(value) {
    return value === null || value === undefined ? emptySequence().toKeyedSeq() : isIterable(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : keyedSeqFromValue(value);
  }

  KeyedSeq.prototype.toKeyedSeq = function () {
    return this;
  };

  createClass(IndexedSeq, Seq);
  function IndexedSeq(value) {
    return value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
  }

  IndexedSeq.of = function () /*...values*/{
    return IndexedSeq(arguments);
  };

  IndexedSeq.prototype.toIndexedSeq = function () {
    return this;
  };

  IndexedSeq.prototype.toString = function () {
    return this.__toString('Seq [', ']');
  };

  IndexedSeq.prototype.__iterate = function (fn, reverse) {
    return seqIterate(this, fn, reverse, false);
  };

  IndexedSeq.prototype.__iterator = function (type, reverse) {
    return seqIterator(this, type, reverse, false);
  };

  createClass(SetSeq, Seq);
  function SetSeq(value) {
    return (value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value).toSetSeq();
  }

  SetSeq.of = function () /*...values*/{
    return SetSeq(arguments);
  };

  SetSeq.prototype.toSetSeq = function () {
    return this;
  };

  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;

  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

  Seq.prototype[IS_SEQ_SENTINEL] = true;

  createClass(ArraySeq, IndexedSeq);
  function ArraySeq(array) {
    this._array = array;
    this.size = array.length;
  }

  ArraySeq.prototype.get = function (index, notSetValue) {
    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
  };

  ArraySeq.prototype.__iterate = function (fn, reverse) {
    var array = this._array;
    var maxIndex = array.length - 1;
    for (var ii = 0; ii <= maxIndex; ii++) {
      if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
        return ii + 1;
      }
    }
    return ii;
  };

  ArraySeq.prototype.__iterator = function (type, reverse) {
    var array = this._array;
    var maxIndex = array.length - 1;
    var ii = 0;
    return new Iterator(function () {
      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++]);
    });
  };

  createClass(ObjectSeq, KeyedSeq);
  function ObjectSeq(object) {
    var keys = Object.keys(object);
    this._object = object;
    this._keys = keys;
    this.size = keys.length;
  }

  ObjectSeq.prototype.get = function (key, notSetValue) {
    if (notSetValue !== undefined && !this.has(key)) {
      return notSetValue;
    }
    return this._object[key];
  };

  ObjectSeq.prototype.has = function (key) {
    return this._object.hasOwnProperty(key);
  };

  ObjectSeq.prototype.__iterate = function (fn, reverse) {
    var object = this._object;
    var keys = this._keys;
    var maxIndex = keys.length - 1;
    for (var ii = 0; ii <= maxIndex; ii++) {
      var key = keys[reverse ? maxIndex - ii : ii];
      if (fn(object[key], key, this) === false) {
        return ii + 1;
      }
    }
    return ii;
  };

  ObjectSeq.prototype.__iterator = function (type, reverse) {
    var object = this._object;
    var keys = this._keys;
    var maxIndex = keys.length - 1;
    var ii = 0;
    return new Iterator(function () {
      var key = keys[reverse ? maxIndex - ii : ii];
      return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, key, object[key]);
    });
  };

  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;

  createClass(IterableSeq, IndexedSeq);
  function IterableSeq(iterable) {
    this._iterable = iterable;
    this.size = iterable.length || iterable.size;
  }

  IterableSeq.prototype.__iterateUncached = function (fn, reverse) {
    if (reverse) {
      return this.cacheResult().__iterate(fn, reverse);
    }
    var iterable = this._iterable;
    var iterator = getIterator(iterable);
    var iterations = 0;
    if (isIterator(iterator)) {
      var step;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
    }
    return iterations;
  };

  IterableSeq.prototype.__iteratorUncached = function (type, reverse) {
    if (reverse) {
      return this.cacheResult().__iterator(type, reverse);
    }
    var iterable = this._iterable;
    var iterator = getIterator(iterable);
    if (!isIterator(iterator)) {
      return new Iterator(iteratorDone);
    }
    var iterations = 0;
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, iterations++, step.value);
    });
  };

  createClass(IteratorSeq, IndexedSeq);
  function IteratorSeq(iterator) {
    this._iterator = iterator;
    this._iteratorCache = [];
  }

  IteratorSeq.prototype.__iterateUncached = function (fn, reverse) {
    if (reverse) {
      return this.cacheResult().__iterate(fn, reverse);
    }
    var iterator = this._iterator;
    var cache = this._iteratorCache;
    var iterations = 0;
    while (iterations < cache.length) {
      if (fn(cache[iterations], iterations++, this) === false) {
        return iterations;
      }
    }
    var step;
    while (!(step = iterator.next()).done) {
      var val = step.value;
      cache[iterations] = val;
      if (fn(val, iterations++, this) === false) {
        break;
      }
    }
    return iterations;
  };

  IteratorSeq.prototype.__iteratorUncached = function (type, reverse) {
    if (reverse) {
      return this.cacheResult().__iterator(type, reverse);
    }
    var iterator = this._iterator;
    var cache = this._iteratorCache;
    var iterations = 0;
    return new Iterator(function () {
      if (iterations >= cache.length) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        cache[iterations] = step.value;
      }
      return iteratorValue(type, iterations, cache[iterations++]);
    });
  };

  // # pragma Helper functions

  function isSeq(maybeSeq) {
    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
  }

  var EMPTY_SEQ;

  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }

  function keyedSeqFromValue(value) {
    var seq = Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() : isIterator(value) ? new IteratorSeq(value).fromEntrySeq() : hasIterator(value) ? new IterableSeq(value).fromEntrySeq() : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? new ObjectSeq(value) : undefined;
    if (!seq) {
      throw new TypeError('Expected Array or iterable object of [k, v] entries, ' + 'or keyed object: ' + value);
    }
    return seq;
  }

  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (!seq) {
      throw new TypeError('Expected Array or iterable object of values: ' + value);
    }
    return seq;
  }

  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value) || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && new ObjectSeq(value);
    if (!seq) {
      throw new TypeError('Expected Array or iterable object of values, or keyed object: ' + value);
    }
    return seq;
  }

  function maybeIndexedSeqFromValue(value) {
    return isArrayLike(value) ? new ArraySeq(value) : isIterator(value) ? new IteratorSeq(value) : hasIterator(value) ? new IterableSeq(value) : undefined;
  }

  function seqIterate(seq, fn, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var entry = cache[reverse ? maxIndex - ii : ii];
        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
          return ii + 1;
        }
      }
      return ii;
    }
    return seq.__iterateUncached(fn, reverse);
  }

  function seqIterator(seq, type, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      var ii = 0;
      return new Iterator(function () {
        var entry = cache[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
      });
    }
    return seq.__iteratorUncached(type, reverse);
  }

  function fromJS(json, converter) {
    return converter ? fromJSWith(converter, json, '', { '': json }) : fromJSDefault(json);
  }

  function fromJSWith(converter, json, key, parentJSON) {
    if (Array.isArray(json)) {
      return converter.call(parentJSON, key, IndexedSeq(json).map(function (v, k) {
        return fromJSWith(converter, v, k, json);
      }));
    }
    if (isPlainObj(json)) {
      return converter.call(parentJSON, key, KeyedSeq(json).map(function (v, k) {
        return fromJSWith(converter, v, k, json);
      }));
    }
    return json;
  }

  function fromJSDefault(json) {
    if (Array.isArray(json)) {
      return IndexedSeq(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
      return KeyedSeq(json).map(fromJSDefault).toMap();
    }
    return json;
  }

  function isPlainObj(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
  }

  /**
   * An extension of the "same-value" algorithm as [described for use by ES6 Map
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
   *
   * NaN is considered the same as NaN, however -0 and 0 are considered the same
   * value, which is different from the algorithm described by
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
   *
   * This is extended further to allow Objects to describe the values they
   * represent, by way of `valueOf` or `equals` (and `hashCode`).
   *
   * Note: because of this extension, the key equality of Immutable.Map and the
   * value equality of Immutable.Set will differ from ES6 Map and Set.
   *
   * ### Defining custom values
   *
   * The easiest way to describe the value an object represents is by implementing
   * `valueOf`. For example, `Date` represents a value by returning a unix
   * timestamp for `valueOf`:
   *
   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
   *     var date2 = new Date(1234567890000);
   *     date1.valueOf(); // 1234567890000
   *     assert( date1 !== date2 );
   *     assert( Immutable.is( date1, date2 ) );
   *
   * Note: overriding `valueOf` may have other implications if you use this object
   * where JavaScript expects a primitive, such as implicit string coercion.
   *
   * For more complex types, especially collections, implementing `valueOf` may
   * not be performant. An alternative is to implement `equals` and `hashCode`.
   *
   * `equals` takes another object, presumably of similar type, and returns true
   * if the it is equal. Equality is symmetrical, so the same result should be
   * returned if this and the argument are flipped.
   *
   *     assert( a.equals(b) === b.equals(a) );
   *
   * `hashCode` returns a 32bit integer number representing the object which will
   * be used to determine how to store the value object in a Map or Set. You must
   * provide both or neither methods, one must not exist without the other.
   *
   * Also, an important relationship between these methods must be upheld: if two
   * values are equal, they *must* return the same hashCode. If the values are not
   * equal, they might have the same hashCode; this is called a hash collision,
   * and while undesirable for performance reasons, it is acceptable.
   *
   *     if (a.equals(b)) {
   *       assert( a.hashCode() === b.hashCode() );
   *     }
   *
   * All Immutable collections implement `equals` and `hashCode`.
   *
   */
  function is(valueA, valueB) {
    if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === 'function' && typeof valueB.valueOf === 'function') {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    if (typeof valueA.equals === 'function' && typeof valueB.equals === 'function' && valueA.equals(valueB)) {
      return true;
    }
    return false;
  }

  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (!isIterable(b) || a.size !== undefined && b.size !== undefined && a.size !== b.size || a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
      return false;
    }

    if (a.size === 0 && b.size === 0) {
      return true;
    }

    var notAssociative = !isAssociative(a);

    if (isOrdered(a)) {
      var entries = a.entries();
      return b.every(function (v, k) {
        var entry = entries.next().value;
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) && entries.next().done;
    }

    var flipped = false;

    if (a.size === undefined) {
      if (b.size === undefined) {
        if (typeof a.cacheResult === 'function') {
          a.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a;
        a = b;
        b = _;
      }
    }

    var allEqual = true;
    var bSize = b.__iterate(function (v, k) {
      if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
        allEqual = false;
        return false;
      }
    });

    return allEqual && a.size === bSize;
  }

  createClass(Repeat, IndexedSeq);

  function Repeat(value, times) {
    if (!(this instanceof Repeat)) {
      return new Repeat(value, times);
    }
    this._value = value;
    this.size = times === undefined ? Infinity : Math.max(0, times);
    if (this.size === 0) {
      if (EMPTY_REPEAT) {
        return EMPTY_REPEAT;
      }
      EMPTY_REPEAT = this;
    }
  }

  Repeat.prototype.toString = function () {
    if (this.size === 0) {
      return 'Repeat []';
    }
    return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
  };

  Repeat.prototype.get = function (index, notSetValue) {
    return this.has(index) ? this._value : notSetValue;
  };

  Repeat.prototype.includes = function (searchValue) {
    return is(this._value, searchValue);
  };

  Repeat.prototype.slice = function (begin, end) {
    var size = this.size;
    return wholeSlice(begin, end, size) ? this : new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
  };

  Repeat.prototype.reverse = function () {
    return this;
  };

  Repeat.prototype.indexOf = function (searchValue) {
    if (is(this._value, searchValue)) {
      return 0;
    }
    return -1;
  };

  Repeat.prototype.lastIndexOf = function (searchValue) {
    if (is(this._value, searchValue)) {
      return this.size;
    }
    return -1;
  };

  Repeat.prototype.__iterate = function (fn, reverse) {
    for (var ii = 0; ii < this.size; ii++) {
      if (fn(this._value, ii, this) === false) {
        return ii + 1;
      }
    }
    return ii;
  };

  Repeat.prototype.__iterator = function (type, reverse) {
    var this$0 = this;
    var ii = 0;
    return new Iterator(function () {
      return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone();
    });
  };

  Repeat.prototype.equals = function (other) {
    return other instanceof Repeat ? is(this._value, other._value) : deepEqual(other);
  };

  var EMPTY_REPEAT;

  function invariant(condition, error) {
    if (!condition) throw new Error(error);
  }

  createClass(Range, IndexedSeq);

  function Range(start, end, step) {
    if (!(this instanceof Range)) {
      return new Range(start, end, step);
    }
    invariant(step !== 0, 'Cannot step a Range by 0');
    start = start || 0;
    if (end === undefined) {
      end = Infinity;
    }
    step = step === undefined ? 1 : Math.abs(step);
    if (end < start) {
      step = -step;
    }
    this._start = start;
    this._end = end;
    this._step = step;
    this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
    if (this.size === 0) {
      if (EMPTY_RANGE) {
        return EMPTY_RANGE;
      }
      EMPTY_RANGE = this;
    }
  }

  Range.prototype.toString = function () {
    if (this.size === 0) {
      return 'Range []';
    }
    return 'Range [ ' + this._start + '...' + this._end + (this._step !== 1 ? ' by ' + this._step : '') + ' ]';
  };

  Range.prototype.get = function (index, notSetValue) {
    return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
  };

  Range.prototype.includes = function (searchValue) {
    var possibleIndex = (searchValue - this._start) / this._step;
    return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
  };

  Range.prototype.slice = function (begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    begin = resolveBegin(begin, this.size);
    end = resolveEnd(end, this.size);
    if (end <= begin) {
      return new Range(0, 0);
    }
    return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
  };

  Range.prototype.indexOf = function (searchValue) {
    var offsetValue = searchValue - this._start;
    if (offsetValue % this._step === 0) {
      var index = offsetValue / this._step;
      if (index >= 0 && index < this.size) {
        return index;
      }
    }
    return -1;
  };

  Range.prototype.lastIndexOf = function (searchValue) {
    return this.indexOf(searchValue);
  };

  Range.prototype.__iterate = function (fn, reverse) {
    var maxIndex = this.size - 1;
    var step = this._step;
    var value = reverse ? this._start + maxIndex * step : this._start;
    for (var ii = 0; ii <= maxIndex; ii++) {
      if (fn(value, ii, this) === false) {
        return ii + 1;
      }
      value += reverse ? -step : step;
    }
    return ii;
  };

  Range.prototype.__iterator = function (type, reverse) {
    var maxIndex = this.size - 1;
    var step = this._step;
    var value = reverse ? this._start + maxIndex * step : this._start;
    var ii = 0;
    return new Iterator(function () {
      var v = value;
      value += reverse ? -step : step;
      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
    });
  };

  Range.prototype.equals = function (other) {
    return other instanceof Range ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
  };

  var EMPTY_RANGE;

  createClass(Collection, Iterable);
  function Collection() {
    throw TypeError('Abstract');
  }

  createClass(KeyedCollection, Collection);function KeyedCollection() {}

  createClass(IndexedCollection, Collection);function IndexedCollection() {}

  createClass(SetCollection, Collection);function SetCollection() {}

  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  var imul = typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ? Math.imul : function imul(a, b) {
    a = a | 0; // int
    b = b | 0; // int
    var c = a & 0xffff;
    var d = b & 0xffff;
    // Shift by 0 fixes the sign on the high part.
    return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0; // int
  };

  // v8 has an optimization for storing 31-bit signed numbers.
  // Values which have either 00 or 11 as the high order bits qualify.
  // This function drops the highest order bit in a signed number, maintaining
  // the sign bit.
  function smi(i32) {
    return i32 >>> 1 & 0x40000000 | i32 & 0xBFFFFFFF;
  }

  function hash(o) {
    if (o === false || o === null || o === undefined) {
      return 0;
    }
    if (typeof o.valueOf === 'function') {
      o = o.valueOf();
      if (o === false || o === null || o === undefined) {
        return 0;
      }
    }
    if (o === true) {
      return 1;
    }
    var type = typeof o === 'undefined' ? 'undefined' : _typeof(o);
    if (type === 'number') {
      if (o !== o || o === Infinity) {
        return 0;
      }
      var h = o | 0;
      if (h !== o) {
        h ^= o * 0xFFFFFFFF;
      }
      while (o > 0xFFFFFFFF) {
        o /= 0xFFFFFFFF;
        h ^= o;
      }
      return smi(h);
    }
    if (type === 'string') {
      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
    }
    if (typeof o.hashCode === 'function') {
      return o.hashCode();
    }
    if (type === 'object') {
      return hashJSObj(o);
    }
    if (typeof o.toString === 'function') {
      return hashString(o.toString());
    }
    throw new Error('Value type ' + type + ' cannot be hashed.');
  }

  function cachedHashString(string) {
    var hash = stringHashCache[string];
    if (hash === undefined) {
      hash = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hash;
    }
    return hash;
  }

  // http://jsperf.com/hashing-strings
  function hashString(string) {
    // This is the hash from JVM
    // The hash code for a string is computed as
    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
    // where s[i] is the ith character of the string and n is the length of
    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
    // (exclusive) by dropping high bits.
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
  }

  function hashJSObj(obj) {
    var hash;
    if (usingWeakMap) {
      hash = weakMap.get(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = obj[UID_HASH_KEY];
    if (hash !== undefined) {
      return hash;
    }

    if (!canDefineProperty) {
      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hash !== undefined) {
        return hash;
      }

      hash = getIENodeHash(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = ++objHashUID;
    if (objHashUID & 0x40000000) {
      objHashUID = 0;
    }

    if (usingWeakMap) {
      weakMap.set(obj, hash);
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        'enumerable': false,
        'configurable': false,
        'writable': false,
        'value': hash
      });
    } else if (obj.propertyIsEnumerable !== undefined && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
      // Since we can't define a non-enumerable property on the object
      // we'll hijack one of the less-used non-enumerable properties to
      // save our hash on it. Since this is a function it will not show up in
      // `JSON.stringify` which is what we want.
      obj.propertyIsEnumerable = function () {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
    } else if (obj.nodeType !== undefined) {
      // At this point we couldn't get the IE `uniqueID` to use as a hash
      // and we couldn't use a non-enumerable property to exploit the
      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
      // itself.
      obj[UID_HASH_KEY] = hash;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }

    return hash;
  }

  // Get references to ES5 object methods.
  var isExtensible = Object.isExtensible;

  // True if Object.defineProperty works as expected. IE8 fails this test.
  var canDefineProperty = function () {
    try {
      Object.defineProperty({}, '@', {});
      return true;
    } catch (e) {
      return false;
    }
  }();

  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
  // and avoid memory leaks from the IE cloneNode bug.
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1:
          // Element
          return node.uniqueID;
        case 9:
          // Document
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }

  // If possible, use a WeakMap.
  var usingWeakMap = typeof WeakMap === 'function';
  var weakMap;
  if (usingWeakMap) {
    weakMap = new WeakMap();
  }

  var objHashUID = 0;

  var UID_HASH_KEY = '__immutablehash__';
  if (typeof Symbol === 'function') {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }

  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};

  function assertNotInfinite(size) {
    invariant(size !== Infinity, 'Cannot perform this action with an infinite size.');
  }

  createClass(Map, KeyedCollection);

  // @pragma Construction

  function Map(value) {
    return value === null || value === undefined ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function (map) {
      var iter = KeyedIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v, k) {
        return map.set(k, v);
      });
    });
  }

  Map.of = function () {
    var keyValues = SLICE$0.call(arguments, 0);
    return emptyMap().withMutations(function (map) {
      for (var i = 0; i < keyValues.length; i += 2) {
        if (i + 1 >= keyValues.length) {
          throw new Error('Missing value for key: ' + keyValues[i]);
        }
        map.set(keyValues[i], keyValues[i + 1]);
      }
    });
  };

  Map.prototype.toString = function () {
    return this.__toString('Map {', '}');
  };

  // @pragma Access

  Map.prototype.get = function (k, notSetValue) {
    return this._root ? this._root.get(0, undefined, k, notSetValue) : notSetValue;
  };

  // @pragma Modification

  Map.prototype.set = function (k, v) {
    return updateMap(this, k, v);
  };

  Map.prototype.setIn = function (keyPath, v) {
    return this.updateIn(keyPath, NOT_SET, function () {
      return v;
    });
  };

  Map.prototype.remove = function (k) {
    return updateMap(this, k, NOT_SET);
  };

  Map.prototype.deleteIn = function (keyPath) {
    return this.updateIn(keyPath, function () {
      return NOT_SET;
    });
  };

  Map.prototype.update = function (k, notSetValue, updater) {
    return arguments.length === 1 ? k(this) : this.updateIn([k], notSetValue, updater);
  };

  Map.prototype.updateIn = function (keyPath, notSetValue, updater) {
    if (!updater) {
      updater = notSetValue;
      notSetValue = undefined;
    }
    var updatedValue = updateInDeepMap(this, forceIterator(keyPath), notSetValue, updater);
    return updatedValue === NOT_SET ? undefined : updatedValue;
  };

  Map.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._root = null;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyMap();
  };

  // @pragma Composition

  Map.prototype.merge = function () /*...iters*/{
    return mergeIntoMapWith(this, undefined, arguments);
  };

  Map.prototype.mergeWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoMapWith(this, merger, iters);
  };

  Map.prototype.mergeIn = function (keyPath) {
    var iters = SLICE$0.call(arguments, 1);
    return this.updateIn(keyPath, emptyMap(), function (m) {
      return typeof m.merge === 'function' ? m.merge.apply(m, iters) : iters[iters.length - 1];
    });
  };

  Map.prototype.mergeDeep = function () /*...iters*/{
    return mergeIntoMapWith(this, deepMerger, arguments);
  };

  Map.prototype.mergeDeepWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoMapWith(this, deepMergerWith(merger), iters);
  };

  Map.prototype.mergeDeepIn = function (keyPath) {
    var iters = SLICE$0.call(arguments, 1);
    return this.updateIn(keyPath, emptyMap(), function (m) {
      return typeof m.mergeDeep === 'function' ? m.mergeDeep.apply(m, iters) : iters[iters.length - 1];
    });
  };

  Map.prototype.sort = function (comparator) {
    // Late binding
    return OrderedMap(sortFactory(this, comparator));
  };

  Map.prototype.sortBy = function (mapper, comparator) {
    // Late binding
    return OrderedMap(sortFactory(this, comparator, mapper));
  };

  // @pragma Mutability

  Map.prototype.withMutations = function (fn) {
    var mutable = this.asMutable();
    fn(mutable);
    return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
  };

  Map.prototype.asMutable = function () {
    return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
  };

  Map.prototype.asImmutable = function () {
    return this.__ensureOwner();
  };

  Map.prototype.wasAltered = function () {
    return this.__altered;
  };

  Map.prototype.__iterator = function (type, reverse) {
    return new MapIterator(this, type, reverse);
  };

  Map.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    var iterations = 0;
    this._root && this._root.iterate(function (entry) {
      iterations++;
      return fn(entry[1], entry[0], this$0);
    }, reverse);
    return iterations;
  };

  Map.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeMap(this.size, this._root, ownerID, this.__hash);
  };

  function isMap(maybeMap) {
    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
  }

  Map.isMap = isMap;

  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

  var MapPrototype = Map.prototype;
  MapPrototype[IS_MAP_SENTINEL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeIn = MapPrototype.deleteIn;

  // #pragma Trie Nodes


  function ArrayMapNode(ownerID, entries) {
    this.ownerID = ownerID;
    this.entries = entries;
  }

  ArrayMapNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    var entries = this.entries;
    for (var ii = 0, len = entries.length; ii < len; ii++) {
      if (is(key, entries[ii][0])) {
        return entries[ii][1];
      }
    }
    return notSetValue;
  };

  ArrayMapNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    var removed = value === NOT_SET;

    var entries = this.entries;
    var idx = 0;
    for (var len = entries.length; idx < len; idx++) {
      if (is(key, entries[idx][0])) {
        break;
      }
    }
    var exists = idx < len;

    if (exists ? entries[idx][1] === value : removed) {
      return this;
    }

    SetRef(didAlter);
    (removed || !exists) && SetRef(didChangeSize);

    if (removed && entries.length === 1) {
      return; // undefined
    }

    if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
      return createNodes(ownerID, entries, key, value);
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newEntries = isEditable ? entries : arrCopy(entries);

    if (exists) {
      if (removed) {
        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
      } else {
        newEntries[idx] = [key, value];
      }
    } else {
      newEntries.push([key, value]);
    }

    if (isEditable) {
      this.entries = newEntries;
      return this;
    }

    return new ArrayMapNode(ownerID, newEntries);
  };

  function BitmapIndexedNode(ownerID, bitmap, nodes) {
    this.ownerID = ownerID;
    this.bitmap = bitmap;
    this.nodes = nodes;
  }

  BitmapIndexedNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
    var bitmap = this.bitmap;
    return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(shift + SHIFT, keyHash, key, notSetValue);
  };

  BitmapIndexedNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var bit = 1 << keyHashFrag;
    var bitmap = this.bitmap;
    var exists = (bitmap & bit) !== 0;

    if (!exists && value === NOT_SET) {
      return this;
    }

    var idx = popCount(bitmap & bit - 1);
    var nodes = this.nodes;
    var node = exists ? nodes[idx] : undefined;
    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

    if (newNode === node) {
      return this;
    }

    if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
      return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
    }

    if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
      return nodes[idx ^ 1];
    }

    if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
      return newNode;
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
    var newNodes = exists ? newNode ? setIn(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);

    if (isEditable) {
      this.bitmap = newBitmap;
      this.nodes = newNodes;
      return this;
    }

    return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
  };

  function HashArrayMapNode(ownerID, count, nodes) {
    this.ownerID = ownerID;
    this.count = count;
    this.nodes = nodes;
  }

  HashArrayMapNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var node = this.nodes[idx];
    return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
  };

  HashArrayMapNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var removed = value === NOT_SET;
    var nodes = this.nodes;
    var node = nodes[idx];

    if (removed && !node) {
      return this;
    }

    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
    if (newNode === node) {
      return this;
    }

    var newCount = this.count;
    if (!node) {
      newCount++;
    } else if (!newNode) {
      newCount--;
      if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
        return packNodes(ownerID, nodes, newCount, idx);
      }
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newNodes = setIn(nodes, idx, newNode, isEditable);

    if (isEditable) {
      this.count = newCount;
      this.nodes = newNodes;
      return this;
    }

    return new HashArrayMapNode(ownerID, newCount, newNodes);
  };

  function HashCollisionNode(ownerID, keyHash, entries) {
    this.ownerID = ownerID;
    this.keyHash = keyHash;
    this.entries = entries;
  }

  HashCollisionNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    var entries = this.entries;
    for (var ii = 0, len = entries.length; ii < len; ii++) {
      if (is(key, entries[ii][0])) {
        return entries[ii][1];
      }
    }
    return notSetValue;
  };

  HashCollisionNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }

    var removed = value === NOT_SET;

    if (keyHash !== this.keyHash) {
      if (removed) {
        return this;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
    }

    var entries = this.entries;
    var idx = 0;
    for (var len = entries.length; idx < len; idx++) {
      if (is(key, entries[idx][0])) {
        break;
      }
    }
    var exists = idx < len;

    if (exists ? entries[idx][1] === value : removed) {
      return this;
    }

    SetRef(didAlter);
    (removed || !exists) && SetRef(didChangeSize);

    if (removed && len === 2) {
      return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newEntries = isEditable ? entries : arrCopy(entries);

    if (exists) {
      if (removed) {
        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
      } else {
        newEntries[idx] = [key, value];
      }
    } else {
      newEntries.push([key, value]);
    }

    if (isEditable) {
      this.entries = newEntries;
      return this;
    }

    return new HashCollisionNode(ownerID, this.keyHash, newEntries);
  };

  function ValueNode(ownerID, keyHash, entry) {
    this.ownerID = ownerID;
    this.keyHash = keyHash;
    this.entry = entry;
  }

  ValueNode.prototype.get = function (shift, keyHash, key, notSetValue) {
    return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
  };

  ValueNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    var removed = value === NOT_SET;
    var keyMatch = is(key, this.entry[0]);
    if (keyMatch ? value === this.entry[1] : removed) {
      return this;
    }

    SetRef(didAlter);

    if (removed) {
      SetRef(didChangeSize);
      return; // undefined
    }

    if (keyMatch) {
      if (ownerID && ownerID === this.ownerID) {
        this.entry[1] = value;
        return this;
      }
      return new ValueNode(ownerID, this.keyHash, [key, value]);
    }

    SetRef(didChangeSize);
    return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
  };

  // #pragma Iterators

  ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function (fn, reverse) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  };

  BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function (fn, reverse) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  };

  ValueNode.prototype.iterate = function (fn, reverse) {
    return fn(this.entry);
  };

  createClass(MapIterator, Iterator);

  function MapIterator(map, type, reverse) {
    this._type = type;
    this._reverse = reverse;
    this._stack = map._root && mapIteratorFrame(map._root);
  }

  MapIterator.prototype.next = function () {
    var type = this._type;
    var stack = this._stack;
    while (stack) {
      var node = stack.node;
      var index = stack.index++;
      var maxIndex;
      if (node.entry) {
        if (index === 0) {
          return mapIteratorValue(type, node.entry);
        }
      } else if (node.entries) {
        maxIndex = node.entries.length - 1;
        if (index <= maxIndex) {
          return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
        }
      } else {
        maxIndex = node.nodes.length - 1;
        if (index <= maxIndex) {
          var subNode = node.nodes[this._reverse ? maxIndex - index : index];
          if (subNode) {
            if (subNode.entry) {
              return mapIteratorValue(type, subNode.entry);
            }
            stack = this._stack = mapIteratorFrame(subNode, stack);
          }
          continue;
        }
      }
      stack = this._stack = this._stack.__prev;
    }
    return iteratorDone();
  };

  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }

  function mapIteratorFrame(node, prev) {
    return {
      node: node,
      index: 0,
      __prev: prev
    };
  }

  function makeMap(size, root, ownerID, hash) {
    var map = Object.create(MapPrototype);
    map.size = size;
    map._root = root;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }

  function updateMap(map, k, v) {
    var newRoot;
    var newSize;
    if (!map._root) {
      if (v === NOT_SET) {
        return map;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
    } else {
      var didChangeSize = MakeRef(CHANGE_LENGTH);
      var didAlter = MakeRef(DID_ALTER);
      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
      if (!didAlter.value) {
        return map;
      }
      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
    }
    if (map.__ownerID) {
      map.size = newSize;
      map._root = newRoot;
      map.__hash = undefined;
      map.__altered = true;
      return map;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }

  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
  }

  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }

  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }

    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

    var newNode;
    var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);

    return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
  }

  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
    }
    return node;
  }

  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== undefined && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }

  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }

  function mergeIntoMapWith(map, merger, iterables) {
    var iters = [];
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = KeyedIterable(value);
      if (!isIterable(value)) {
        iter = iter.map(function (v) {
          return fromJS(v);
        });
      }
      iters.push(iter);
    }
    return mergeIntoCollectionWith(map, merger, iters);
  }

  function deepMerger(existing, value, key) {
    return existing && existing.mergeDeep && isIterable(value) ? existing.mergeDeep(value) : is(existing, value) ? existing : value;
  }

  function deepMergerWith(merger) {
    return function (existing, value, key) {
      if (existing && existing.mergeDeepWith && isIterable(value)) {
        return existing.mergeDeepWith(merger, value);
      }
      var nextValue = merger(existing, value, key);
      return is(existing, nextValue) ? existing : nextValue;
    };
  }

  function mergeIntoCollectionWith(collection, merger, iters) {
    iters = iters.filter(function (x) {
      return x.size !== 0;
    });
    if (iters.length === 0) {
      return collection;
    }
    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function (collection) {
      var mergeIntoMap = merger ? function (value, key) {
        collection.update(key, NOT_SET, function (existing) {
          return existing === NOT_SET ? value : merger(existing, value, key);
        });
      } : function (value, key) {
        collection.set(key, value);
      };
      for (var ii = 0; ii < iters.length; ii++) {
        iters[ii].forEach(mergeIntoMap);
      }
    });
  }

  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
    var isNotSet = existing === NOT_SET;
    var step = keyPathIter.next();
    if (step.done) {
      var existingValue = isNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    invariant(isNotSet || existing && existing.set, 'invalid keyPath');
    var key = step.value;
    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
    var nextUpdated = updateInDeepMap(nextExisting, keyPathIter, notSetValue, updater);
    return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? existing.remove(key) : (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
  }

  function popCount(x) {
    x = x - (x >> 1 & 0x55555555);
    x = (x & 0x33333333) + (x >> 2 & 0x33333333);
    x = x + (x >> 4) & 0x0f0f0f0f;
    x = x + (x >> 8);
    x = x + (x >> 16);
    return x & 0x7f;
  }

  function setIn(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }

  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }

  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }

  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

  createClass(List, IndexedCollection);

  // @pragma Construction

  function List(value) {
    var empty = emptyList();
    if (value === null || value === undefined) {
      return empty;
    }
    if (isList(value)) {
      return value;
    }
    var iter = IndexedIterable(value);
    var size = iter.size;
    if (size === 0) {
      return empty;
    }
    assertNotInfinite(size);
    if (size > 0 && size < SIZE) {
      return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
    }
    return empty.withMutations(function (list) {
      list.setSize(size);
      iter.forEach(function (v, i) {
        return list.set(i, v);
      });
    });
  }

  List.of = function () /*...values*/{
    return this(arguments);
  };

  List.prototype.toString = function () {
    return this.__toString('List [', ']');
  };

  // @pragma Access

  List.prototype.get = function (index, notSetValue) {
    index = wrapIndex(this, index);
    if (index >= 0 && index < this.size) {
      index += this._origin;
      var node = listNodeFor(this, index);
      return node && node.array[index & MASK];
    }
    return notSetValue;
  };

  // @pragma Modification

  List.prototype.set = function (index, value) {
    return updateList(this, index, value);
  };

  List.prototype.remove = function (index) {
    return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
  };

  List.prototype.insert = function (index, value) {
    return this.splice(index, 0, value);
  };

  List.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = this._origin = this._capacity = 0;
      this._level = SHIFT;
      this._root = this._tail = null;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyList();
  };

  List.prototype.push = function () /*...values*/{
    var values = arguments;
    var oldSize = this.size;
    return this.withMutations(function (list) {
      setListBounds(list, 0, oldSize + values.length);
      for (var ii = 0; ii < values.length; ii++) {
        list.set(oldSize + ii, values[ii]);
      }
    });
  };

  List.prototype.pop = function () {
    return setListBounds(this, 0, -1);
  };

  List.prototype.unshift = function () /*...values*/{
    var values = arguments;
    return this.withMutations(function (list) {
      setListBounds(list, -values.length);
      for (var ii = 0; ii < values.length; ii++) {
        list.set(ii, values[ii]);
      }
    });
  };

  List.prototype.shift = function () {
    return setListBounds(this, 1);
  };

  // @pragma Composition

  List.prototype.merge = function () /*...iters*/{
    return mergeIntoListWith(this, undefined, arguments);
  };

  List.prototype.mergeWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoListWith(this, merger, iters);
  };

  List.prototype.mergeDeep = function () /*...iters*/{
    return mergeIntoListWith(this, deepMerger, arguments);
  };

  List.prototype.mergeDeepWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return mergeIntoListWith(this, deepMergerWith(merger), iters);
  };

  List.prototype.setSize = function (size) {
    return setListBounds(this, 0, size);
  };

  // @pragma Iteration

  List.prototype.slice = function (begin, end) {
    var size = this.size;
    if (wholeSlice(begin, end, size)) {
      return this;
    }
    return setListBounds(this, resolveBegin(begin, size), resolveEnd(end, size));
  };

  List.prototype.__iterator = function (type, reverse) {
    var index = 0;
    var values = iterateList(this, reverse);
    return new Iterator(function () {
      var value = values();
      return value === DONE ? iteratorDone() : iteratorValue(type, index++, value);
    });
  };

  List.prototype.__iterate = function (fn, reverse) {
    var index = 0;
    var values = iterateList(this, reverse);
    var value;
    while ((value = values()) !== DONE) {
      if (fn(value, index++, this) === false) {
        break;
      }
    }
    return index;
  };

  List.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      this.__ownerID = ownerID;
      return this;
    }
    return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
  };

  function isList(maybeList) {
    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
  }

  List.isList = isList;

  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SENTINEL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.setIn = MapPrototype.setIn;
  ListPrototype.deleteIn = ListPrototype.removeIn = MapPrototype.removeIn;
  ListPrototype.update = MapPrototype.update;
  ListPrototype.updateIn = MapPrototype.updateIn;
  ListPrototype.mergeIn = MapPrototype.mergeIn;
  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  ListPrototype.withMutations = MapPrototype.withMutations;
  ListPrototype.asMutable = MapPrototype.asMutable;
  ListPrototype.asImmutable = MapPrototype.asImmutable;
  ListPrototype.wasAltered = MapPrototype.wasAltered;

  function VNode(array, ownerID) {
    this.array = array;
    this.ownerID = ownerID;
  }

  // TODO: seems like these methods are very similar

  VNode.prototype.removeBefore = function (ownerID, level, index) {
    if (index === level ? 1 << level : 0 || this.array.length === 0) {
      return this;
    }
    var originIndex = index >>> level & MASK;
    if (originIndex >= this.array.length) {
      return new VNode([], ownerID);
    }
    var removingFirst = originIndex === 0;
    var newChild;
    if (level > 0) {
      var oldChild = this.array[originIndex];
      newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
      if (newChild === oldChild && removingFirst) {
        return this;
      }
    }
    if (removingFirst && !newChild) {
      return this;
    }
    var editable = editableVNode(this, ownerID);
    if (!removingFirst) {
      for (var ii = 0; ii < originIndex; ii++) {
        editable.array[ii] = undefined;
      }
    }
    if (newChild) {
      editable.array[originIndex] = newChild;
    }
    return editable;
  };

  VNode.prototype.removeAfter = function (ownerID, level, index) {
    if (index === (level ? 1 << level : 0) || this.array.length === 0) {
      return this;
    }
    var sizeIndex = index - 1 >>> level & MASK;
    if (sizeIndex >= this.array.length) {
      return this;
    }

    var newChild;
    if (level > 0) {
      var oldChild = this.array[sizeIndex];
      newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
      if (newChild === oldChild && sizeIndex === this.array.length - 1) {
        return this;
      }
    }

    var editable = editableVNode(this, ownerID);
    editable.array.splice(sizeIndex + 1);
    if (newChild) {
      editable.array[sizeIndex] = newChild;
    }
    return editable;
  };

  var DONE = {};

  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;

    return iterateNodeOrLeaf(list._root, list._level, 0);

    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
    }

    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function () {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }

    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : left - offset >> level;
      var to = (right - offset >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function () {
        do {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(array && array[idx], level - SHIFT, offset + (idx << level));
        } while (true);
      };
    }
  }

  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash;
    list.__altered = false;
    return list;
  }

  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }

  function updateList(list, index, value) {
    index = wrapIndex(list, index);

    if (index !== index) {
      return list;
    }

    if (index >= list.size || index < 0) {
      return list.withMutations(function (list) {
        index < 0 ? setListBounds(list, index).set(0, value) : setListBounds(list, 0, index + 1).set(index, value);
      });
    }

    index += list._origin;

    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef(DID_ALTER);
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
    }

    if (!didAlter.value) {
      return list;
    }

    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }

  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = index >>> level & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === undefined) {
      return node;
    }

    var newNode;

    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }

    if (nodeHas && node.array[idx] === value) {
      return node;
    }

    SetRef(didAlter);

    newNode = editableVNode(node, ownerID);
    if (value === undefined && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }

  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }

  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << list._level + SHIFT) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[rawIndex >>> level & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }

  function setListBounds(list, begin, end) {
    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }

    // If it's going to end after it starts, it's empty.
    if (newOrigin >= newCapacity) {
      return list.clear();
    }

    var newLevel = list._level;
    var newRoot = list._root;

    // New origin might need creating a higher root.
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }

    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);

    // New size might need creating a higher root.
    while (newTailOffset >= 1 << newLevel + SHIFT) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
      newLevel += SHIFT;
    }

    // Locate or create the new tail.
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

    // Merge Tail into tree.
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = oldTailOffset >>> level & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
    }

    // If the size has been reduced, there's a chance the tail needs to be trimmed.
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }

    // If the new origin is within the tail, then we do not need a root.
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

      // Otherwise, if the root has been trimmed, garbage collect.
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;

      // Identify the new top root node of the subtree of the old root.
      while (newRoot) {
        var beginIndex = newOrigin >>> newLevel & MASK;
        if (beginIndex !== newTailOffset >>> newLevel & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }

      // Trim the new sides of the new root.
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }

    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }

  function mergeIntoListWith(list, merger, iterables) {
    var iters = [];
    var maxSize = 0;
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = IndexedIterable(value);
      if (iter.size > maxSize) {
        maxSize = iter.size;
      }
      if (!isIterable(value)) {
        iter = iter.map(function (v) {
          return fromJS(v);
        });
      }
      iters.push(iter);
    }
    if (maxSize > list.size) {
      list = list.setSize(maxSize);
    }
    return mergeIntoCollectionWith(list, merger, iters);
  }

  function getTailOffset(size) {
    return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
  }

  createClass(OrderedMap, Map);

  // @pragma Construction

  function OrderedMap(value) {
    return value === null || value === undefined ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function (map) {
      var iter = KeyedIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v, k) {
        return map.set(k, v);
      });
    });
  }

  OrderedMap.of = function () /*...values*/{
    return this(arguments);
  };

  OrderedMap.prototype.toString = function () {
    return this.__toString('OrderedMap {', '}');
  };

  // @pragma Access

  OrderedMap.prototype.get = function (k, notSetValue) {
    var index = this._map.get(k);
    return index !== undefined ? this._list.get(index)[1] : notSetValue;
  };

  // @pragma Modification

  OrderedMap.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._map.clear();
      this._list.clear();
      return this;
    }
    return emptyOrderedMap();
  };

  OrderedMap.prototype.set = function (k, v) {
    return updateOrderedMap(this, k, v);
  };

  OrderedMap.prototype.remove = function (k) {
    return updateOrderedMap(this, k, NOT_SET);
  };

  OrderedMap.prototype.wasAltered = function () {
    return this._map.wasAltered() || this._list.wasAltered();
  };

  OrderedMap.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._list.__iterate(function (entry) {
      return entry && fn(entry[1], entry[0], this$0);
    }, reverse);
  };

  OrderedMap.prototype.__iterator = function (type, reverse) {
    return this._list.fromEntrySeq().__iterator(type, reverse);
  };

  OrderedMap.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    var newList = this._list.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._map = newMap;
      this._list = newList;
      return this;
    }
    return makeOrderedMap(newMap, newList, ownerID, this.__hash);
  };

  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }

  OrderedMap.isOrderedMap = isOrderedMap;

  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;

  function makeOrderedMap(map, list, ownerID, hash) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map ? map.size : 0;
    omap._map = map;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash;
    return omap;
  }

  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }

  function updateOrderedMap(omap, k, v) {
    var map = omap._map;
    var list = omap._list;
    var i = map.get(k);
    var has = i !== undefined;
    var newMap;
    var newList;
    if (v === NOT_SET) {
      // removed
      if (!has) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map.size * 2) {
        newList = list.filter(function (entry, idx) {
          return entry !== undefined && i !== idx;
        });
        newMap = newList.toKeyedSeq().map(function (entry) {
          return entry[0];
        }).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map.remove(k);
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
      }
    } else {
      if (has) {
        if (v === list.get(i)[1]) {
          return omap;
        }
        newMap = map;
        newList = list.set(i, [k, v]);
      } else {
        newMap = map.set(k, list.size);
        newList = list.set(list.size, [k, v]);
      }
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = undefined;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }

  createClass(ToKeyedSequence, KeyedSeq);
  function ToKeyedSequence(indexed, useKeys) {
    this._iter = indexed;
    this._useKeys = useKeys;
    this.size = indexed.size;
  }

  ToKeyedSequence.prototype.get = function (key, notSetValue) {
    return this._iter.get(key, notSetValue);
  };

  ToKeyedSequence.prototype.has = function (key) {
    return this._iter.has(key);
  };

  ToKeyedSequence.prototype.valueSeq = function () {
    return this._iter.valueSeq();
  };

  ToKeyedSequence.prototype.reverse = function () {
    var this$0 = this;
    var reversedSequence = reverseFactory(this, true);
    if (!this._useKeys) {
      reversedSequence.valueSeq = function () {
        return this$0._iter.toSeq().reverse();
      };
    }
    return reversedSequence;
  };

  ToKeyedSequence.prototype.map = function (mapper, context) {
    var this$0 = this;
    var mappedSequence = mapFactory(this, mapper, context);
    if (!this._useKeys) {
      mappedSequence.valueSeq = function () {
        return this$0._iter.toSeq().map(mapper, context);
      };
    }
    return mappedSequence;
  };

  ToKeyedSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    var ii;
    return this._iter.__iterate(this._useKeys ? function (v, k) {
      return fn(v, k, this$0);
    } : (ii = reverse ? resolveSize(this) : 0, function (v) {
      return fn(v, reverse ? --ii : ii++, this$0);
    }), reverse);
  };

  ToKeyedSequence.prototype.__iterator = function (type, reverse) {
    if (this._useKeys) {
      return this._iter.__iterator(type, reverse);
    }
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    var ii = reverse ? resolveSize(this) : 0;
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, reverse ? --ii : ii++, step.value, step);
    });
  };

  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;

  createClass(ToIndexedSequence, IndexedSeq);
  function ToIndexedSequence(iter) {
    this._iter = iter;
    this.size = iter.size;
  }

  ToIndexedSequence.prototype.includes = function (value) {
    return this._iter.includes(value);
  };

  ToIndexedSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    var iterations = 0;
    return this._iter.__iterate(function (v) {
      return fn(v, iterations++, this$0);
    }, reverse);
  };

  ToIndexedSequence.prototype.__iterator = function (type, reverse) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    var iterations = 0;
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, iterations++, step.value, step);
    });
  };

  createClass(ToSetSequence, SetSeq);
  function ToSetSequence(iter) {
    this._iter = iter;
    this.size = iter.size;
  }

  ToSetSequence.prototype.has = function (key) {
    return this._iter.includes(key);
  };

  ToSetSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._iter.__iterate(function (v) {
      return fn(v, v, this$0);
    }, reverse);
  };

  ToSetSequence.prototype.__iterator = function (type, reverse) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    return new Iterator(function () {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, step.value, step.value, step);
    });
  };

  createClass(FromEntriesSequence, KeyedSeq);
  function FromEntriesSequence(entries) {
    this._iter = entries;
    this.size = entries.size;
  }

  FromEntriesSequence.prototype.entrySeq = function () {
    return this._iter.toSeq();
  };

  FromEntriesSequence.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._iter.__iterate(function (entry) {
      // Check if entry exists first so array access doesn't throw for holes
      // in the parent iteration.
      if (entry) {
        validateEntry(entry);
        var indexedIterable = isIterable(entry);
        return fn(indexedIterable ? entry.get(1) : entry[1], indexedIterable ? entry.get(0) : entry[0], this$0);
      }
    }, reverse);
  };

  FromEntriesSequence.prototype.__iterator = function (type, reverse) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
    return new Iterator(function () {
      while (true) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedIterable = isIterable(entry);
          return iteratorValue(type, indexedIterable ? entry.get(0) : entry[0], indexedIterable ? entry.get(1) : entry[1], step);
        }
      }
    });
  };

  ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;

  function flipFactory(iterable) {
    var flipSequence = makeSequence(iterable);
    flipSequence._iter = iterable;
    flipSequence.size = iterable.size;
    flipSequence.flip = function () {
      return iterable;
    };
    flipSequence.reverse = function () {
      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
      reversedSequence.flip = function () {
        return iterable.reverse();
      };
      return reversedSequence;
    };
    flipSequence.has = function (key) {
      return iterable.includes(key);
    };
    flipSequence.includes = function (key) {
      return iterable.has(key);
    };
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      return iterable.__iterate(function (v, k) {
        return fn(k, v, this$0) !== false;
      }, reverse);
    };
    flipSequence.__iteratorUncached = function (type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = iterable.__iterator(type, reverse);
        return new Iterator(function () {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return iterable.__iterator(type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES, reverse);
    };
    return flipSequence;
  }

  function mapFactory(iterable, mapper, context) {
    var mappedSequence = makeSequence(iterable);
    mappedSequence.size = iterable.size;
    mappedSequence.has = function (key) {
      return iterable.has(key);
    };
    mappedSequence.get = function (key, notSetValue) {
      var v = iterable.get(key, NOT_SET);
      return v === NOT_SET ? notSetValue : mapper.call(context, v, key, iterable);
    };
    mappedSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      return iterable.__iterate(function (v, k, c) {
        return fn(mapper.call(context, v, k, c), k, this$0) !== false;
      }, reverse);
    };
    mappedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function () {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(type, key, mapper.call(context, entry[1], key, iterable), step);
      });
    };
    return mappedSequence;
  }

  function reverseFactory(iterable, useKeys) {
    var reversedSequence = makeSequence(iterable);
    reversedSequence._iter = iterable;
    reversedSequence.size = iterable.size;
    reversedSequence.reverse = function () {
      return iterable;
    };
    if (iterable.flip) {
      reversedSequence.flip = function () {
        var flipSequence = flipFactory(iterable);
        flipSequence.reverse = function () {
          return iterable.flip();
        };
        return flipSequence;
      };
    }
    reversedSequence.get = function (key, notSetValue) {
      return iterable.get(useKeys ? key : -1 - key, notSetValue);
    };
    reversedSequence.has = function (key) {
      return iterable.has(useKeys ? key : -1 - key);
    };
    reversedSequence.includes = function (value) {
      return iterable.includes(value);
    };
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function (fn, reverse) {
      var this$0 = this;
      return iterable.__iterate(function (v, k) {
        return fn(v, k, this$0);
      }, !reverse);
    };
    reversedSequence.__iterator = function (type, reverse) {
      return iterable.__iterator(type, !reverse);
    };
    return reversedSequence;
  }

  function filterFactory(iterable, predicate, context, useKeys) {
    var filterSequence = makeSequence(iterable);
    if (useKeys) {
      filterSequence.has = function (key) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
      };
      filterSequence.get = function (key, notSetValue) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && predicate.call(context, v, key, iterable) ? v : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function (v, k, c) {
        if (predicate.call(context, v, k, c)) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function () {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, iterable)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    };
    return filterSequence;
  }

  function countByFactory(iterable, grouper, context) {
    var groups = Map().asMutable();
    iterable.__iterate(function (v, k) {
      groups.update(grouper.call(context, v, k, iterable), 0, function (a) {
        return a + 1;
      });
    });
    return groups.asImmutable();
  }

  function groupByFactory(iterable, grouper, context) {
    var isKeyedIter = isKeyed(iterable);
    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
    iterable.__iterate(function (v, k) {
      groups.update(grouper.call(context, v, k, iterable), function (a) {
        return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
      });
    });
    var coerce = iterableClass(iterable);
    return groups.map(function (arr) {
      return reify(iterable, coerce(arr));
    });
  }

  function sliceFactory(iterable, begin, end, useKeys) {
    var originalSize = iterable.size;

    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      if (end === Infinity) {
        end = originalSize;
      } else {
        end = end | 0;
      }
    }

    if (wholeSlice(begin, end, originalSize)) {
      return iterable;
    }

    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);

    // begin or end will be NaN if they were provided as negative numbers and
    // this iterable's size is unknown. In that case, cache first so there is
    // a known size and these do not resolve to NaN.
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
    }

    // Note: resolvedEnd is undefined when the original sequence's length is
    // unknown and this slice did not supply an end and should contain all
    // elements after resolvedBegin.
    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }

    var sliceSeq = makeSequence(iterable);

    // If iterable.size is undefined, the size of the realized sliceSeq is
    // unknown at this point unless the number of items to slice is 0
    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
      sliceSeq.get = function (index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize ? iterable.get(index + resolvedBegin, notSetValue) : notSetValue;
      };
    }

    sliceSeq.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function (v, k) {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0) !== false && iterations !== sliceSize;
        }
      });
      return iterations;
    };

    sliceSeq.__iteratorUncached = function (type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      // Don't bother instantiating parent iterator if taking 0.
      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function () {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES) {
          return step;
        } else if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, undefined, step);
        } else {
          return iteratorValue(type, iterations - 1, step.value[1], step);
        }
      });
    };

    return sliceSeq;
  }

  function takeWhileFactory(iterable, predicate, context) {
    var takeSequence = makeSequence(iterable);
    takeSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      iterable.__iterate(function (v, k, c) {
        return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0);
      });
      return iterations;
    };
    takeSequence.__iteratorUncached = function (type, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function () {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v = entry[1];
        if (!predicate.call(context, v, k, this$0)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
      });
    };
    return takeSequence;
  }

  function skipWhileFactory(iterable, predicate, context, useKeys) {
    var skipSequence = makeSequence(iterable);
    skipSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function (v, k, c) {
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function (type, reverse) {
      var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function () {
        var step, k, v;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            } else if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, undefined, step);
            } else {
              return iteratorValue(type, iterations++, step.value[1], step);
            }
          }
          var entry = step.value;
          k = entry[0];
          v = entry[1];
          skipping && (skipping = predicate.call(context, v, k, this$0));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
      });
    };
    return skipSequence;
  }

  function concatFactory(iterable, values) {
    var isKeyedIterable = isKeyed(iterable);
    var iters = [iterable].concat(values).map(function (v) {
      if (!isIterable(v)) {
        v = isKeyedIterable ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
      } else if (isKeyedIterable) {
        v = KeyedIterable(v);
      }
      return v;
    }).filter(function (v) {
      return v.size !== 0;
    });

    if (iters.length === 0) {
      return iterable;
    }

    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === iterable || isKeyedIterable && isKeyed(singleton) || isIndexed(iterable) && isIndexed(singleton)) {
        return singleton;
      }
    }

    var concatSeq = new ArraySeq(iters);
    if (isKeyedIterable) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(iterable)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(function (sum, seq) {
      if (sum !== undefined) {
        var size = seq.size;
        if (size !== undefined) {
          return sum + size;
        }
      }
    }, 0);
    return concatSeq;
  }

  function flattenFactory(iterable, depth, useKeys) {
    var flatSequence = makeSequence(iterable);
    flatSequence.__iterateUncached = function (fn, reverse) {
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {
        var this$0 = this;
        iter.__iterate(function (v, k) {
          if ((!depth || currentDepth < depth) && isIterable(v)) {
            flatDeep(v, currentDepth + 1);
          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
            stopped = true;
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(iterable, 0);
      return iterations;
    };
    flatSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function () {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v = step.value;
          if (type === ITERATE_ENTRIES) {
            v = v[1];
          }
          if ((!depth || stack.length < depth) && isIterable(v)) {
            stack.push(iterator);
            iterator = v.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v, step);
          }
        }
        return iteratorDone();
      });
    };
    return flatSequence;
  }

  function flatMapFactory(iterable, mapper, context) {
    var coerce = iterableClass(iterable);
    return iterable.toSeq().map(function (v, k) {
      return coerce(mapper.call(context, v, k, iterable));
    }).flatten(true);
  }

  function interposeFactory(iterable, separator) {
    var interposedSequence = makeSequence(iterable);
    interposedSequence.size = iterable.size && iterable.size * 2 - 1;
    interposedSequence.__iterateUncached = function (fn, reverse) {
      var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function (v, k) {
        return (!iterations || fn(separator, iterations++, this$0) !== false) && fn(v, iterations++, this$0) !== false;
      }, reverse);
      return iterations;
    };
    interposedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function () {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }

  function sortFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedIterable = isKeyed(iterable);
    var index = 0;
    var entries = iterable.toSeq().map(function (v, k) {
      return [k, v, index++, mapper ? mapper(v, k, iterable) : v];
    }).toArray();
    entries.sort(function (a, b) {
      return comparator(a[3], b[3]) || a[2] - b[2];
    }).forEach(isKeyedIterable ? function (v, i) {
      entries[i].length = 2;
    } : function (v, i) {
      entries[i] = v[1];
    });
    return isKeyedIterable ? KeyedSeq(entries) : isIndexed(iterable) ? IndexedSeq(entries) : SetSeq(entries);
  }

  function maxFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = iterable.toSeq().map(function (v, k) {
        return [v, mapper(v, k, iterable)];
      }).reduce(function (a, b) {
        return maxCompare(comparator, a[1], b[1]) ? b : a;
      });
      return entry && entry[0];
    } else {
      return iterable.reduce(function (a, b) {
        return maxCompare(comparator, a, b) ? b : a;
      });
    }
  }

  function maxCompare(comparator, a, b) {
    var comp = comparator(b, a);
    // b is considered the new max if the comparator declares them equal, but
    // they are not equal and b is in fact a nullish value.
    return comp === 0 && b !== a && (b === undefined || b === null || b !== b) || comp > 0;
  }

  function zipWithFactory(keyIter, zipper, iters) {
    var zipSequence = makeSequence(keyIter);
    zipSequence.size = new ArraySeq(iters).map(function (i) {
      return i.size;
    }).min();
    // Note: this a generic base implementation of __iterate in terms of
    // __iterator which may be more generically useful in the future.
    zipSequence.__iterate = function (fn, reverse) {
      /* generic:
      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        iterations++;
        if (fn(step.value[1], step.value[0], this) === false) {
          break;
        }
      }
      return iterations;
      */
      // indexed:
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function (type, reverse) {
      var iterators = iters.map(function (i) {
        return i = Iterable(i), getIterator(reverse ? i.reverse() : i);
      });
      var iterations = 0;
      var isDone = false;
      return new Iterator(function () {
        var steps;
        if (!isDone) {
          steps = iterators.map(function (i) {
            return i.next();
          });
          isDone = steps.some(function (s) {
            return s.done;
          });
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(type, iterations++, zipper.apply(null, steps.map(function (s) {
          return s.value;
        })));
      });
    };
    return zipSequence;
  }

  // #pragma Helper Functions

  function reify(iter, seq) {
    return isSeq(iter) ? seq : iter.constructor(seq);
  }

  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError('Expected [K, V] tuple: ' + entry);
    }
  }

  function resolveSize(iter) {
    assertNotInfinite(iter.size);
    return ensureSize(iter);
  }

  function iterableClass(iterable) {
    return isKeyed(iterable) ? KeyedIterable : isIndexed(iterable) ? IndexedIterable : SetIterable;
  }

  function makeSequence(iterable) {
    return Object.create((isKeyed(iterable) ? KeyedSeq : isIndexed(iterable) ? IndexedSeq : SetSeq).prototype);
  }

  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    } else {
      return Seq.prototype.cacheResult.call(this);
    }
  }

  function defaultComparator(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  function forceIterator(keyPath) {
    var iter = getIterator(keyPath);
    if (!iter) {
      // Array might not be iterable in this environment, so we need a fallback
      // to our wrapped type.
      if (!isArrayLike(keyPath)) {
        throw new TypeError('Expected iterable or array-like: ' + keyPath);
      }
      iter = getIterator(Iterable(keyPath));
    }
    return iter;
  }

  createClass(Record, KeyedCollection);

  function Record(defaultValues, name) {
    var hasInitialized;

    var RecordType = function Record(values) {
      if (values instanceof RecordType) {
        return values;
      }
      if (!(this instanceof RecordType)) {
        return new RecordType(values);
      }
      if (!hasInitialized) {
        hasInitialized = true;
        var keys = Object.keys(defaultValues);
        setProps(RecordTypePrototype, keys);
        RecordTypePrototype.size = keys.length;
        RecordTypePrototype._name = name;
        RecordTypePrototype._keys = keys;
        RecordTypePrototype._defaultValues = defaultValues;
      }
      this._map = Map(values);
    };

    var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
    RecordTypePrototype.constructor = RecordType;

    return RecordType;
  }

  Record.prototype.toString = function () {
    return this.__toString(recordName(this) + ' {', '}');
  };

  // @pragma Access

  Record.prototype.has = function (k) {
    return this._defaultValues.hasOwnProperty(k);
  };

  Record.prototype.get = function (k, notSetValue) {
    if (!this.has(k)) {
      return notSetValue;
    }
    var defaultVal = this._defaultValues[k];
    return this._map ? this._map.get(k, defaultVal) : defaultVal;
  };

  // @pragma Modification

  Record.prototype.clear = function () {
    if (this.__ownerID) {
      this._map && this._map.clear();
      return this;
    }
    var RecordType = this.constructor;
    return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
  };

  Record.prototype.set = function (k, v) {
    if (!this.has(k)) {
      throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
    }
    if (this._map && !this._map.has(k)) {
      var defaultVal = this._defaultValues[k];
      if (v === defaultVal) {
        return this;
      }
    }
    var newMap = this._map && this._map.set(k, v);
    if (this.__ownerID || newMap === this._map) {
      return this;
    }
    return makeRecord(this, newMap);
  };

  Record.prototype.remove = function (k) {
    if (!this.has(k)) {
      return this;
    }
    var newMap = this._map && this._map.remove(k);
    if (this.__ownerID || newMap === this._map) {
      return this;
    }
    return makeRecord(this, newMap);
  };

  Record.prototype.wasAltered = function () {
    return this._map.wasAltered();
  };

  Record.prototype.__iterator = function (type, reverse) {
    var this$0 = this;
    return KeyedIterable(this._defaultValues).map(function (_, k) {
      return this$0.get(k);
    }).__iterator(type, reverse);
  };

  Record.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return KeyedIterable(this._defaultValues).map(function (_, k) {
      return this$0.get(k);
    }).__iterate(fn, reverse);
  };

  Record.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map && this._map.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._map = newMap;
      return this;
    }
    return makeRecord(this, newMap, ownerID);
  };

  var RecordPrototype = Record.prototype;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn = RecordPrototype.removeIn = MapPrototype.removeIn;
  RecordPrototype.merge = MapPrototype.merge;
  RecordPrototype.mergeWith = MapPrototype.mergeWith;
  RecordPrototype.mergeIn = MapPrototype.mergeIn;
  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  RecordPrototype.setIn = MapPrototype.setIn;
  RecordPrototype.update = MapPrototype.update;
  RecordPrototype.updateIn = MapPrototype.updateIn;
  RecordPrototype.withMutations = MapPrototype.withMutations;
  RecordPrototype.asMutable = MapPrototype.asMutable;
  RecordPrototype.asImmutable = MapPrototype.asImmutable;

  function makeRecord(likeRecord, map, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._map = map;
    record.__ownerID = ownerID;
    return record;
  }

  function recordName(record) {
    return record._name || record.constructor.name || 'Record';
  }

  function setProps(prototype, names) {
    try {
      names.forEach(setProp.bind(undefined, prototype));
    } catch (error) {
      // Object.defineProperty failed. Probably IE8.
    }
  }

  function setProp(prototype, name) {
    Object.defineProperty(prototype, name, {
      get: function get() {
        return this.get(name);
      },
      set: function set(value) {
        invariant(this.__ownerID, 'Cannot set on an immutable record.');
        this.set(name, value);
      }
    });
  }

  createClass(Set, SetCollection);

  // @pragma Construction

  function Set(value) {
    return value === null || value === undefined ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function (set) {
      var iter = SetIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v) {
        return set.add(v);
      });
    });
  }

  Set.of = function () /*...values*/{
    return this(arguments);
  };

  Set.fromKeys = function (value) {
    return this(KeyedIterable(value).keySeq());
  };

  Set.prototype.toString = function () {
    return this.__toString('Set {', '}');
  };

  // @pragma Access

  Set.prototype.has = function (value) {
    return this._map.has(value);
  };

  // @pragma Modification

  Set.prototype.add = function (value) {
    return updateSet(this, this._map.set(value, true));
  };

  Set.prototype.remove = function (value) {
    return updateSet(this, this._map.remove(value));
  };

  Set.prototype.clear = function () {
    return updateSet(this, this._map.clear());
  };

  // @pragma Composition

  Set.prototype.union = function () {
    var iters = SLICE$0.call(arguments, 0);
    iters = iters.filter(function (x) {
      return x.size !== 0;
    });
    if (iters.length === 0) {
      return this;
    }
    if (this.size === 0 && !this.__ownerID && iters.length === 1) {
      return this.constructor(iters[0]);
    }
    return this.withMutations(function (set) {
      for (var ii = 0; ii < iters.length; ii++) {
        SetIterable(iters[ii]).forEach(function (value) {
          return set.add(value);
        });
      }
    });
  };

  Set.prototype.intersect = function () {
    var iters = SLICE$0.call(arguments, 0);
    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function (iter) {
      return SetIterable(iter);
    });
    var originalSet = this;
    return this.withMutations(function (set) {
      originalSet.forEach(function (value) {
        if (!iters.every(function (iter) {
          return iter.includes(value);
        })) {
          set.remove(value);
        }
      });
    });
  };

  Set.prototype.subtract = function () {
    var iters = SLICE$0.call(arguments, 0);
    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function (iter) {
      return SetIterable(iter);
    });
    var originalSet = this;
    return this.withMutations(function (set) {
      originalSet.forEach(function (value) {
        if (iters.some(function (iter) {
          return iter.includes(value);
        })) {
          set.remove(value);
        }
      });
    });
  };

  Set.prototype.merge = function () {
    return this.union.apply(this, arguments);
  };

  Set.prototype.mergeWith = function (merger) {
    var iters = SLICE$0.call(arguments, 1);
    return this.union.apply(this, iters);
  };

  Set.prototype.sort = function (comparator) {
    // Late binding
    return OrderedSet(sortFactory(this, comparator));
  };

  Set.prototype.sortBy = function (mapper, comparator) {
    // Late binding
    return OrderedSet(sortFactory(this, comparator, mapper));
  };

  Set.prototype.wasAltered = function () {
    return this._map.wasAltered();
  };

  Set.prototype.__iterate = function (fn, reverse) {
    var this$0 = this;
    return this._map.__iterate(function (_, k) {
      return fn(k, k, this$0);
    }, reverse);
  };

  Set.prototype.__iterator = function (type, reverse) {
    return this._map.map(function (_, k) {
      return k;
    }).__iterator(type, reverse);
  };

  Set.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._map = newMap;
      return this;
    }
    return this.__make(newMap, ownerID);
  };

  function isSet(maybeSet) {
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
  }

  Set.isSet = isSet;

  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

  var SetPrototype = Set.prototype;
  SetPrototype[IS_SET_SENTINEL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.mergeDeep = SetPrototype.merge;
  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
  SetPrototype.withMutations = MapPrototype.withMutations;
  SetPrototype.asMutable = MapPrototype.asMutable;
  SetPrototype.asImmutable = MapPrototype.asImmutable;

  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;

  function updateSet(set, newMap) {
    if (set.__ownerID) {
      set.size = newMap.size;
      set._map = newMap;
      return set;
    }
    return newMap === set._map ? set : newMap.size === 0 ? set.__empty() : set.__make(newMap);
  }

  function makeSet(map, ownerID) {
    var set = Object.create(SetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }

  createClass(OrderedSet, Set);

  // @pragma Construction

  function OrderedSet(value) {
    return value === null || value === undefined ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function (set) {
      var iter = SetIterable(value);
      assertNotInfinite(iter.size);
      iter.forEach(function (v) {
        return set.add(v);
      });
    });
  }

  OrderedSet.of = function () /*...values*/{
    return this(arguments);
  };

  OrderedSet.fromKeys = function (value) {
    return this(KeyedIterable(value).keySeq());
  };

  OrderedSet.prototype.toString = function () {
    return this.__toString('OrderedSet {', '}');
  };

  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }

  OrderedSet.isOrderedSet = isOrderedSet;

  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;

  function makeOrderedSet(map, ownerID) {
    var set = Object.create(OrderedSetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }

  createClass(Stack, IndexedCollection);

  // @pragma Construction

  function Stack(value) {
    return value === null || value === undefined ? emptyStack() : isStack(value) ? value : emptyStack().unshiftAll(value);
  }

  Stack.of = function () /*...values*/{
    return this(arguments);
  };

  Stack.prototype.toString = function () {
    return this.__toString('Stack [', ']');
  };

  // @pragma Access

  Stack.prototype.get = function (index, notSetValue) {
    var head = this._head;
    index = wrapIndex(this, index);
    while (head && index--) {
      head = head.next;
    }
    return head ? head.value : notSetValue;
  };

  Stack.prototype.peek = function () {
    return this._head && this._head.value;
  };

  // @pragma Modification

  Stack.prototype.push = function () /*...values*/{
    if (arguments.length === 0) {
      return this;
    }
    var newSize = this.size + arguments.length;
    var head = this._head;
    for (var ii = arguments.length - 1; ii >= 0; ii--) {
      head = {
        value: arguments[ii],
        next: head
      };
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  Stack.prototype.pushAll = function (iter) {
    iter = IndexedIterable(iter);
    if (iter.size === 0) {
      return this;
    }
    assertNotInfinite(iter.size);
    var newSize = this.size;
    var head = this._head;
    iter.reverse().forEach(function (value) {
      newSize++;
      head = {
        value: value,
        next: head
      };
    });
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  Stack.prototype.pop = function () {
    return this.slice(1);
  };

  Stack.prototype.unshift = function () /*...values*/{
    return this.push.apply(this, arguments);
  };

  Stack.prototype.unshiftAll = function (iter) {
    return this.pushAll(iter);
  };

  Stack.prototype.shift = function () {
    return this.pop.apply(this, arguments);
  };

  Stack.prototype.clear = function () {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._head = undefined;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return emptyStack();
  };

  Stack.prototype.slice = function (begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    var resolvedBegin = resolveBegin(begin, this.size);
    var resolvedEnd = resolveEnd(end, this.size);
    if (resolvedEnd !== this.size) {
      // super.slice(begin, end);
      return IndexedCollection.prototype.slice.call(this, begin, end);
    }
    var newSize = this.size - resolvedBegin;
    var head = this._head;
    while (resolvedBegin--) {
      head = head.next;
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = undefined;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };

  // @pragma Mutability

  Stack.prototype.__ensureOwner = function (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeStack(this.size, this._head, ownerID, this.__hash);
  };

  // @pragma Iteration

  Stack.prototype.__iterate = function (fn, reverse) {
    if (reverse) {
      return this.reverse().__iterate(fn);
    }
    var iterations = 0;
    var node = this._head;
    while (node) {
      if (fn(node.value, iterations++, this) === false) {
        break;
      }
      node = node.next;
    }
    return iterations;
  };

  Stack.prototype.__iterator = function (type, reverse) {
    if (reverse) {
      return this.reverse().__iterator(type);
    }
    var iterations = 0;
    var node = this._head;
    return new Iterator(function () {
      if (node) {
        var value = node.value;
        node = node.next;
        return iteratorValue(type, iterations++, value);
      }
      return iteratorDone();
    });
  };

  function isStack(maybeStack) {
    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
  }

  Stack.isStack = isStack;

  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SENTINEL] = true;
  StackPrototype.withMutations = MapPrototype.withMutations;
  StackPrototype.asMutable = MapPrototype.asMutable;
  StackPrototype.asImmutable = MapPrototype.asImmutable;
  StackPrototype.wasAltered = MapPrototype.wasAltered;

  function makeStack(size, head, ownerID, hash) {
    var map = Object.create(StackPrototype);
    map.size = size;
    map._head = head;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }

  /**
   * Contributes additional methods to a constructor
   */
  function mixin(ctor, methods) {
    var keyCopier = function keyCopier(key) {
      ctor.prototype[key] = methods[key];
    };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }

  Iterable.Iterator = Iterator;

  mixin(Iterable, {

    // ### Conversion to other types

    toArray: function toArray() {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      this.valueSeq().__iterate(function (v, i) {
        array[i] = v;
      });
      return array;
    },

    toIndexedSeq: function toIndexedSeq() {
      return new ToIndexedSequence(this);
    },

    toJS: function toJS() {
      return this.toSeq().map(function (value) {
        return value && typeof value.toJS === 'function' ? value.toJS() : value;
      }).__toJS();
    },

    toJSON: function toJSON() {
      return this.toSeq().map(function (value) {
        return value && typeof value.toJSON === 'function' ? value.toJSON() : value;
      }).__toJS();
    },

    toKeyedSeq: function toKeyedSeq() {
      return new ToKeyedSequence(this, true);
    },

    toMap: function toMap() {
      // Use Late Binding here to solve the circular dependency.
      return Map(this.toKeyedSeq());
    },

    toObject: function toObject() {
      assertNotInfinite(this.size);
      var object = {};
      this.__iterate(function (v, k) {
        object[k] = v;
      });
      return object;
    },

    toOrderedMap: function toOrderedMap() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedMap(this.toKeyedSeq());
    },

    toOrderedSet: function toOrderedSet() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },

    toSet: function toSet() {
      // Use Late Binding here to solve the circular dependency.
      return Set(isKeyed(this) ? this.valueSeq() : this);
    },

    toSetSeq: function toSetSeq() {
      return new ToSetSequence(this);
    },

    toSeq: function toSeq() {
      return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
    },

    toStack: function toStack() {
      // Use Late Binding here to solve the circular dependency.
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },

    toList: function toList() {
      // Use Late Binding here to solve the circular dependency.
      return List(isKeyed(this) ? this.valueSeq() : this);
    },

    // ### Common JavaScript methods and properties

    toString: function toString() {
      return '[Iterable]';
    },

    __toString: function __toString(head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
    },

    // ### ES6 Collection methods (ES6 Array and Map)

    concat: function concat() {
      var values = SLICE$0.call(arguments, 0);
      return reify(this, concatFactory(this, values));
    },

    includes: function includes(searchValue) {
      return this.some(function (value) {
        return is(value, searchValue);
      });
    },

    entries: function entries() {
      return this.__iterator(ITERATE_ENTRIES);
    },

    every: function every(predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function (v, k, c) {
        if (!predicate.call(context, v, k, c)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },

    filter: function filter(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },

    find: function find(predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },

    forEach: function forEach(sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },

    join: function join(separator) {
      assertNotInfinite(this.size);
      separator = separator !== undefined ? '' + separator : ',';
      var joined = '';
      var isFirst = true;
      this.__iterate(function (v) {
        isFirst ? isFirst = false : joined += separator;
        joined += v !== null && v !== undefined ? v.toString() : '';
      });
      return joined;
    },

    keys: function keys() {
      return this.__iterator(ITERATE_KEYS);
    },

    map: function map(mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },

    reduce: function reduce(reducer, initialReduction, context) {
      assertNotInfinite(this.size);
      var reduction;
      var useFirst;
      if (arguments.length < 2) {
        useFirst = true;
      } else {
        reduction = initialReduction;
      }
      this.__iterate(function (v, k, c) {
        if (useFirst) {
          useFirst = false;
          reduction = v;
        } else {
          reduction = reducer.call(context, reduction, v, k, c);
        }
      });
      return reduction;
    },

    reduceRight: function reduceRight(reducer, initialReduction, context) {
      var reversed = this.toKeyedSeq().reverse();
      return reversed.reduce.apply(reversed, arguments);
    },

    reverse: function reverse() {
      return reify(this, reverseFactory(this, true));
    },

    slice: function slice(begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },

    some: function some(predicate, context) {
      return !this.every(not(predicate), context);
    },

    sort: function sort(comparator) {
      return reify(this, sortFactory(this, comparator));
    },

    values: function values() {
      return this.__iterator(ITERATE_VALUES);
    },

    // ### More sequential methods

    butLast: function butLast() {
      return this.slice(0, -1);
    },

    isEmpty: function isEmpty() {
      return this.size !== undefined ? this.size === 0 : !this.some(function () {
        return true;
      });
    },

    count: function count(predicate, context) {
      return ensureSize(predicate ? this.toSeq().filter(predicate, context) : this);
    },

    countBy: function countBy(grouper, context) {
      return countByFactory(this, grouper, context);
    },

    equals: function equals(other) {
      return deepEqual(this, other);
    },

    entrySeq: function entrySeq() {
      var iterable = this;
      if (iterable._cache) {
        // We cache as an entries array, so we can just return the cache!
        return new ArraySeq(iterable._cache);
      }
      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function () {
        return iterable.toSeq();
      };
      return entriesSequence;
    },

    filterNot: function filterNot(predicate, context) {
      return this.filter(not(predicate), context);
    },

    findEntry: function findEntry(predicate, context, notSetValue) {
      var found = notSetValue;
      this.__iterate(function (v, k, c) {
        if (predicate.call(context, v, k, c)) {
          found = [k, v];
          return false;
        }
      });
      return found;
    },

    findKey: function findKey(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },

    findLast: function findLast(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },

    findLastEntry: function findLastEntry(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
    },

    findLastKey: function findLastKey(predicate, context) {
      return this.toKeyedSeq().reverse().findKey(predicate, context);
    },

    first: function first() {
      return this.find(returnTrue);
    },

    flatMap: function flatMap(mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },

    flatten: function flatten(depth) {
      return reify(this, flattenFactory(this, depth, true));
    },

    fromEntrySeq: function fromEntrySeq() {
      return new FromEntriesSequence(this);
    },

    get: function get(searchKey, notSetValue) {
      return this.find(function (_, key) {
        return is(key, searchKey);
      }, undefined, notSetValue);
    },

    getIn: function getIn(searchKeyPath, notSetValue) {
      var nested = this;
      // Note: in an ES6 environment, we would prefer:
      // for (var key of searchKeyPath) {
      var iter = forceIterator(searchKeyPath);
      var step;
      while (!(step = iter.next()).done) {
        var key = step.value;
        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
        if (nested === NOT_SET) {
          return notSetValue;
        }
      }
      return nested;
    },

    groupBy: function groupBy(grouper, context) {
      return groupByFactory(this, grouper, context);
    },

    has: function has(searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },

    hasIn: function hasIn(searchKeyPath) {
      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
    },

    isSubset: function isSubset(iter) {
      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
      return this.every(function (value) {
        return iter.includes(value);
      });
    },

    isSuperset: function isSuperset(iter) {
      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
      return iter.isSubset(this);
    },

    keyOf: function keyOf(searchValue) {
      return this.findKey(function (value) {
        return is(value, searchValue);
      });
    },

    keySeq: function keySeq() {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },

    last: function last() {
      return this.toSeq().reverse().first();
    },

    lastKeyOf: function lastKeyOf(searchValue) {
      return this.toKeyedSeq().reverse().keyOf(searchValue);
    },

    max: function max(comparator) {
      return maxFactory(this, comparator);
    },

    maxBy: function maxBy(mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },

    min: function min(comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
    },

    minBy: function minBy(mapper, comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
    },

    rest: function rest() {
      return this.slice(1);
    },

    skip: function skip(amount) {
      return this.slice(Math.max(0, amount));
    },

    skipLast: function skipLast(amount) {
      return reify(this, this.toSeq().reverse().skip(amount).reverse());
    },

    skipWhile: function skipWhile(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },

    skipUntil: function skipUntil(predicate, context) {
      return this.skipWhile(not(predicate), context);
    },

    sortBy: function sortBy(mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },

    take: function take(amount) {
      return this.slice(0, Math.max(0, amount));
    },

    takeLast: function takeLast(amount) {
      return reify(this, this.toSeq().reverse().take(amount).reverse());
    },

    takeWhile: function takeWhile(predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },

    takeUntil: function takeUntil(predicate, context) {
      return this.takeWhile(not(predicate), context);
    },

    valueSeq: function valueSeq() {
      return this.toIndexedSeq();
    },

    // ### Hashable Object

    hashCode: function hashCode() {
      return this.__hash || (this.__hash = hashIterable(this));
    }

    // ### Internal

    // abstract __iterate(fn, reverse)

    // abstract __iterator(type, reverse)
  });

  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

  var IterablePrototype = Iterable.prototype;
  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
  IterablePrototype.__toJS = IterablePrototype.toArray;
  IterablePrototype.__toStringMapper = quoteString;
  IterablePrototype.inspect = IterablePrototype.toSource = function () {
    return this.toString();
  };
  IterablePrototype.chain = IterablePrototype.flatMap;
  IterablePrototype.contains = IterablePrototype.includes;

  mixin(KeyedIterable, {

    // ### More sequential methods

    flip: function flip() {
      return reify(this, flipFactory(this));
    },

    mapEntries: function mapEntries(mapper, context) {
      var this$0 = this;
      var iterations = 0;
      return reify(this, this.toSeq().map(function (v, k) {
        return mapper.call(context, [k, v], iterations++, this$0);
      }).fromEntrySeq());
    },

    mapKeys: function mapKeys(mapper, context) {
      var this$0 = this;
      return reify(this, this.toSeq().flip().map(function (k, v) {
        return mapper.call(context, k, v, this$0);
      }).flip());
    }

  });

  var KeyedIterablePrototype = KeyedIterable.prototype;
  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
  KeyedIterablePrototype.__toStringMapper = function (v, k) {
    return JSON.stringify(k) + ': ' + quoteString(v);
  };

  mixin(IndexedIterable, {

    // ### Conversion to other types

    toKeyedSeq: function toKeyedSeq() {
      return new ToKeyedSequence(this, false);
    },

    // ### ES6 Collection methods (ES6 Array and Map)

    filter: function filter(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },

    findIndex: function findIndex(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    indexOf: function indexOf(searchValue) {
      var key = this.keyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    lastIndexOf: function lastIndexOf(searchValue) {
      var key = this.lastKeyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    reverse: function reverse() {
      return reify(this, reverseFactory(this, false));
    },

    slice: function slice(begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },

    splice: function splice(index, removeNum /*, ...values*/) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum | 0, 0);
      if (numArgs === 0 || numArgs === 2 && !removeNum) {
        return this;
      }
      // If index is negative, it should resolve relative to the size of the
      // collection. However size may be expensive to compute if not cached, so
      // only call count() if the number is in fact negative.
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(this, numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum)));
    },

    // ### More collection methods

    findLastIndex: function findLastIndex(predicate, context) {
      var entry = this.findLastEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    first: function first() {
      return this.get(0);
    },

    flatten: function flatten(depth) {
      return reify(this, flattenFactory(this, depth, false));
    },

    get: function get(index, notSetValue) {
      index = wrapIndex(this, index);
      return index < 0 || this.size === Infinity || this.size !== undefined && index > this.size ? notSetValue : this.find(function (_, key) {
        return key === index;
      }, undefined, notSetValue);
    },

    has: function has(index) {
      index = wrapIndex(this, index);
      return index >= 0 && (this.size !== undefined ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
    },

    interpose: function interpose(separator) {
      return reify(this, interposeFactory(this, separator));
    },

    interleave: function interleave() /*...iterables*/{
      var iterables = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * iterables.length;
      }
      return reify(this, interleaved);
    },

    keySeq: function keySeq() {
      return Range(0, this.size);
    },

    last: function last() {
      return this.get(-1);
    },

    skipWhile: function skipWhile(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },

    zip: function zip() /*, ...iterables */{
      var iterables = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, iterables));
    },

    zipWith: function zipWith(zipper /*, ...iterables */) {
      var iterables = arrCopy(arguments);
      iterables[0] = this;
      return reify(this, zipWithFactory(this, zipper, iterables));
    }

  });

  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;

  mixin(SetIterable, {

    // ### ES6 Collection methods (ES6 Array and Map)

    get: function get(value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },

    includes: function includes(value) {
      return this.has(value);
    },

    // ### More sequential methods

    keySeq: function keySeq() {
      return this.valueSeq();
    }

  });

  SetIterable.prototype.has = IterablePrototype.includes;
  SetIterable.prototype.contains = SetIterable.prototype.includes;

  // Mixin subclasses

  mixin(KeyedSeq, KeyedIterable.prototype);
  mixin(IndexedSeq, IndexedIterable.prototype);
  mixin(SetSeq, SetIterable.prototype);

  mixin(KeyedCollection, KeyedIterable.prototype);
  mixin(IndexedCollection, IndexedIterable.prototype);
  mixin(SetCollection, SetIterable.prototype);

  // #pragma Helper functions

  function keyMapper(v, k) {
    return k;
  }

  function entryMapper(v, k) {
    return [k, v];
  }

  function not(predicate) {
    return function () {
      return !predicate.apply(this, arguments);
    };
  }

  function neg(predicate) {
    return function () {
      return -predicate.apply(this, arguments);
    };
  }

  function quoteString(value) {
    return typeof value === 'string' ? JSON.stringify(value) : String(value);
  }

  function defaultZipper() {
    return arrCopy(arguments);
  }

  function defaultNegComparator(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function hashIterable(iterable) {
    if (iterable.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(iterable);
    var keyed = isKeyed(iterable);
    var h = ordered ? 1 : 0;
    var size = iterable.__iterate(keyed ? ordered ? function (v, k) {
      h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
    } : function (v, k) {
      h = h + hashMerge(hash(v), hash(k)) | 0;
    } : ordered ? function (v) {
      h = 31 * h + hash(v) | 0;
    } : function (v) {
      h = h + hash(v) | 0;
    });
    return murmurHashOfSize(size, h);
  }

  function murmurHashOfSize(size, h) {
    h = imul(h, 0xCC9E2D51);
    h = imul(h << 15 | h >>> -15, 0x1B873593);
    h = imul(h << 13 | h >>> -13, 5);
    h = (h + 0xE6546B64 | 0) ^ size;
    h = imul(h ^ h >>> 16, 0x85EBCA6B);
    h = imul(h ^ h >>> 13, 0xC2B2AE35);
    h = smi(h ^ h >>> 16);
    return h;
  }

  function hashMerge(a, b) {
    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
  }

  var Immutable = {

    Iterable: Iterable,

    Seq: Seq,
    Collection: Collection,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,

    Record: Record,
    Range: Range,
    Repeat: Repeat,

    is: is,
    fromJS: fromJS

  };

  return Immutable;
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-console */

/**
 * Is in development?
 *
 * @type {Boolean}
 */

var IS_DEV = typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production';

/**
 * Has console?
 *
 * @type {Boolean}
 */

var HAS_CONSOLE = typeof console != 'undefined' && typeof console.log == 'function' && typeof console.warn == 'function' && typeof console.error == 'function';

/**
 * Log a `message` at `level`.
 *
 * @param {String} level
 * @param {String} message
 * @param {Any} ...args
 */

function log(level, message) {
  if (!IS_DEV) {
    return;
  }

  if (HAS_CONSOLE) {
    var _console;

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    (_console = console)[level].apply(_console, [message].concat(args));
  }
}

/**
 * Log an error `message`.
 *
 * @param {String} message
 * @param {Any} ...args
 */

function error(message) {
  if (HAS_CONSOLE) {
    var _console2;

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    (_console2 = console).error.apply(_console2, [message].concat(args));
  }
}

/**
 * Log a warning `message` in development only.
 *
 * @param {String} message
 * @param {Any} ...args
 */

function warn(message) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  log.apply(undefined, ['warn', 'Warning: ' + message].concat(args));
}

/**
 * Log a deprecation warning `message`, with helpful `version` number in
 * development only.
 *
 * @param {String} version
 * @param {String} message
 * @param {Any} ...args
 */

function deprecate(version, message) {
  for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
    args[_key4 - 2] = arguments[_key4];
  }

  log.apply(undefined, ['warn', 'Deprecation (' + version + '): ' + message].concat(args));
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = {
  deprecate: deprecate,
  error: error,
  warn: warn
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(117);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

/**
 * Colors.
 */

exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch (e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(124);

function isObjectObject(o) {
  return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor, prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Slate-specific model types.
 *
 * @type {Object}
 */

var MODEL_TYPES = {
  BLOCK: '@@__SLATE_BLOCK__@@',
  CHANGE: '@@__SLATE_CHANGE__@@',
  CHARACTER: '@@__SLATE_CHARACTER__@@',
  DOCUMENT: '@@__SLATE_DOCUMENT__@@',
  HISTORY: '@@__SLATE_HISTORY__@@',
  INLINE: '@@__SLATE_INLINE__@@',
  LEAF: '@@__SLATE_LEAF__@@',
  MARK: '@@__SLATE_MARK__@@',
  RANGE: '@@__SLATE_RANGE__@@',
  SCHEMA: '@@__SLATE_SCHEMA__@@',
  STACK: '@@__SLATE_STACK__@@',
  STATE: '@@__SLATE_STATE__@@',
  TEXT: '@@__SLATE_TEXT__@@'
};

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = MODEL_TYPES;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(22);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(120)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(123)();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setKeyGenerator = exports.resetKeyGenerator = exports.coreSchema = exports.Text = exports.State = exports.Stack = exports.Selection = exports.Schema = exports.Range = exports.Operations = exports.Node = exports.Mark = exports.Leaf = exports.Inline = exports.History = exports.Document = exports.Data = exports.Character = exports.Changes = exports.Block = undefined;

var _block = __webpack_require__(20);

var _block2 = _interopRequireDefault(_block);

var _changes = __webpack_require__(79);

var _changes2 = _interopRequireDefault(_changes);

var _character = __webpack_require__(50);

var _character2 = _interopRequireDefault(_character);

var _data = __webpack_require__(32);

var _data2 = _interopRequireDefault(_data);

var _document = __webpack_require__(24);

var _document2 = _interopRequireDefault(_document);

var _history = __webpack_require__(99);

var _history2 = _interopRequireDefault(_history);

var _inline = __webpack_require__(21);

var _inline2 = _interopRequireDefault(_inline);

var _leaf = __webpack_require__(78);

var _leaf2 = _interopRequireDefault(_leaf);

var _mark = __webpack_require__(15);

var _mark2 = _interopRequireDefault(_mark);

var _node = __webpack_require__(17);

var _node2 = _interopRequireDefault(_node);

var _operations = __webpack_require__(283);

var _operations2 = _interopRequireDefault(_operations);

var _range = __webpack_require__(30);

var _range2 = _interopRequireDefault(_range);

var _schema = __webpack_require__(37);

var _schema2 = _interopRequireDefault(_schema);

var _selection = __webpack_require__(284);

var _selection2 = _interopRequireDefault(_selection);

var _stack = __webpack_require__(285);

var _stack2 = _interopRequireDefault(_stack);

var _state = __webpack_require__(98);

var _state2 = _interopRequireDefault(_state);

var _text = __webpack_require__(49);

var _text2 = _interopRequireDefault(_text);

var _core = __webpack_require__(36);

var _core2 = _interopRequireDefault(_core);

var _generateKey = __webpack_require__(23);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Export.
 *
 * @type {Object}
 */

exports.Block = _block2.default;
exports.Changes = _changes2.default;
exports.Character = _character2.default;
exports.Data = _data2.default;
exports.Document = _document2.default;
exports.History = _history2.default;
exports.Inline = _inline2.default;
exports.Leaf = _leaf2.default;
exports.Mark = _mark2.default;
exports.Node = _node2.default;
exports.Operations = _operations2.default;
exports.Range = _range2.default;
exports.Schema = _schema2.default;
exports.Selection = _selection2.default;
exports.Stack = _stack2.default;
exports.State = _state2.default;
exports.Text = _text2.default;
exports.coreSchema = _core2.default;
exports.resetKeyGenerator = _generateKey.resetKeyGenerator;
exports.setKeyGenerator = _generateKey.setKeyGenerator;
exports.default = {
  Block: _block2.default,
  Changes: _changes2.default,
  Character: _character2.default,
  Data: _data2.default,
  Document: _document2.default,
  History: _history2.default,
  Inline: _inline2.default,
  Leaf: _leaf2.default,
  Mark: _mark2.default,
  Node: _node2.default,
  Operations: _operations2.default,
  Range: _range2.default,
  Schema: _schema2.default,
  Selection: _selection2.default,
  Stack: _stack2.default,
  State: _state2.default,
  Text: _text2.default,
  coreSchema: _core2.default,
  resetKeyGenerator: _generateKey.resetKeyGenerator,
  setKeyGenerator: _generateKey.setKeyGenerator
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var freeGlobal = __webpack_require__(85);

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var getDocument = __webpack_require__(288);

/**
 * Module exports.
 */

module.exports = getWindow;

var needsIEFallback = __webpack_require__(289);

/**
 * Returns `true` if `w` is a Window object, or `false` otherwise.
 *
 * @param {Mixed} w - Window object, maybe
 * @return {Boolean}
 * @private
 */

function isWindow(w) {
  return w && w.window === w;
}

/**
 * Returns the `window` object associated with the given `node`, which may be
 * a DOM element, the Window object, a Selection, a Range. Basically any DOM
 * object that references the Window in some way, this function will find it.
 *
 * @param {Mixed} node - DOM node, selection, or range in which to find the `window` object
 * @return {Window} the `window` object associated with `node`
 * @public
 */

function getWindow(node) {
  if (isWindow(node)) {
    return node;
  }

  var doc = getDocument(node);

  if (needsIEFallback) {
    // In IE 6-8, only the variable 'window' can be used to connect events (others
    // may be only copies).
    doc.parentWindow.execScript('document._parentWindow = window;', 'Javascript');
    var win = doc._parentWindow;
    // to prevent memory leak, unset it after use
    // another possibility is to add an onUnload handler,
    // (which seems overkill to @liucougar)
    doc._parentWindow = null;
    return win;
  } else {
    // standards-compliant and newer IE
    return doc.defaultView || doc.parentWindow;
  }
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slate = __webpack_require__(8);

/**
 * Create a prop type checker for Slate objects with `name` and `validate`.
 *
 * @param {String} name
 * @param {Function} validate
 * @return {Function}
 */

function create(name, validate) {
  function check(isRequired, props, propName, componentName, location) {
    var value = props[propName];
    if (value == null && !isRequired) return null;
    if (value == null && isRequired) return new Error('The ' + location + ' `' + propName + '` is marked as required in `' + componentName + '`, but it was not supplied.');
    if (validate(value)) return null;
    return new Error('Invalid ' + location + ' `' + propName + '` supplied to `' + componentName + '`, expected a Slate `' + name + '` but received: ' + value);
  }

  function propType() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return check.apply(undefined, [false].concat(args));
  }

  propType.isRequired = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return check.apply(undefined, [true].concat(args));
  };

  return propType;
}

/**
 * Prop type checkers.
 *
 * @type {Object}
 */

var Types = {
  block: create('Block', function (v) {
    return _slate.Block.isBlock(v);
  }),
  blocks: create('List<Block>', function (v) {
    return _slate.Block.isBlockList(v);
  }),
  change: create('Change', function (v) {
    return _slate.Change.isChange(v);
  }),
  character: create('Character', function (v) {
    return _slate.Character.isCharacter(v);
  }),
  characters: create('List<Character>', function (v) {
    return _slate.Character.isCharacterList(v);
  }),
  data: create('Data', function (v) {
    return _slate.Data.isData(v);
  }),
  document: create('Document', function (v) {
    return _slate.Document.isDocument(v);
  }),
  history: create('History', function (v) {
    return _slate.History.isHistory(v);
  }),
  inline: create('Inline', function (v) {
    return _slate.Inline.isInline(v);
  }),
  inlines: create('Inline', function (v) {
    return _slate.Inline.isInlineList(v);
  }),
  leaf: create('Leaf', function (v) {
    return _slate.Leaf.isLeaf(v);
  }),
  leaves: create('List<Leaf>', function (v) {
    return _slate.Leaf.isLeafList(v);
  }),
  mark: create('Mark', function (v) {
    return _slate.Mark.isMark(v);
  }),
  marks: create('Set<Mark>', function (v) {
    return _slate.Mark.isMarkSet(v);
  }),
  node: create('Node', function (v) {
    return _slate.Node.isNode(v);
  }),
  nodes: create('List<Node>', function (v) {
    return _slate.Node.isNodeList(v);
  }),
  range: create('Range', function (v) {
    return _slate.Range.isRange(v);
  }),
  ranges: create('List<Range>', function (v) {
    return _slate.Range.isRangeList(v);
  }),
  schema: create('Schema', function (v) {
    return _slate.Schema.isSchema(v);
  }),
  stack: create('Stack', function (v) {
    return _slate.Stack.isStack(v);
  }),
  state: create('State', function (v) {
    return _slate.State.isState(v);
  }),
  text: create('Text', function (v) {
    return _slate.Text.isText(v);
  }),
  texts: create('List<Text>', function (v) {
    return _slate.Text.isTextList(v);
  })
};

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = Types;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _isPlainObject = __webpack_require__(3);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _immutable = __webpack_require__(0);

var _modelTypes = __webpack_require__(4);

var _modelTypes2 = _interopRequireDefault(_modelTypes);

var _data = __webpack_require__(32);

var _data2 = _interopRequireDefault(_data);

var _memoize = __webpack_require__(51);

var _memoize2 = _interopRequireDefault(_memoize);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  data: new _immutable.Map(),
  type: undefined
};

/**
 * Mark.
 *
 * @type {Mark}
 */

var Mark = function (_Record) {
  _inherits(Mark, _Record);

  function Mark() {
    _classCallCheck(this, Mark);

    return _possibleConstructorReturn(this, (Mark.__proto__ || Object.getPrototypeOf(Mark)).apply(this, arguments));
  }

  _createClass(Mark, [{
    key: 'getComponent',

    /**
     * Get the component for the node from a `schema`.
     *
     * @param {Schema} schema
     * @return {Component|Void}
     */

    value: function getComponent(schema) {
      return schema.__getComponent(this);
    }

    /**
     * Return a JSON representation of the mark.
     *
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var object = {
        data: this.data.toJSON(),
        kind: this.kind,
        type: this.type
      };

      return object;
    }

    /**
     * Alias `toJS`.
     */

  }, {
    key: 'toJS',
    value: function toJS() {
      return this.toJSON();
    }
  }, {
    key: 'kind',

    /**
     * Get the kind.
     */

    get: function get() {
      return 'mark';
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Mark` with `attrs`.
     *
     * @param {Object|Mark} attrs
     * @return {Mark}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Mark.isMark(attrs)) {
        return attrs;
      }

      if (typeof attrs == 'string') {
        attrs = { type: attrs };
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        return Mark.fromJSON(attrs);
      }

      throw new Error('`Mark.create` only accepts objects, strings or marks, but you passed it: ' + attrs);
    }

    /**
     * Create a set of marks.
     *
     * @param {Array<Object|Mark>} elements
     * @return {Set<Mark>}
     */

  }, {
    key: 'createSet',
    value: function createSet(elements) {
      if (_immutable.Set.isSet(elements) || Array.isArray(elements)) {
        var marks = new _immutable.Set(elements.map(Mark.create));
        return marks;
      }

      if (elements == null) {
        return new _immutable.Set();
      }

      throw new Error('`Mark.createSet` only accepts sets, arrays or null, but you passed it: ' + elements);
    }

    /**
     * Create a dictionary of settable mark properties from `attrs`.
     *
     * @param {Object|String|Mark} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Mark.isMark(attrs)) {
        return {
          data: attrs.data,
          type: attrs.type
        };
      }

      if (typeof attrs == 'string') {
        return { type: attrs };
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        var props = {};
        if ('type' in attrs) props.type = attrs.type;
        if ('data' in attrs) props.data = _data2.default.create(attrs.data);
        return props;
      }

      throw new Error('`Mark.createProperties` only accepts objects, strings or marks, but you passed it: ' + attrs);
    }

    /**
     * Create a `Mark` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Mark}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var _object$data = object.data,
          data = _object$data === undefined ? {} : _object$data,
          type = object.type;

      if (typeof type != 'string') {
        throw new Error('`Mark.fromJS` requires a `type` string.');
      }

      var mark = new Mark({
        type: type,
        data: new _immutable.Map(data)
      });

      return mark;
    }

    /**
     * Alias `fromJS`.
     */

  }, {
    key: 'isMark',

    /**
     * Check if a `value` is a `Mark`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

    value: function isMark(value) {
      return !!(value && value[_modelTypes2.default.MARK]);
    }

    /**
     * Check if a `value` is a set of marks.
     *
     * @param {Any} value
     * @return {Boolean}
     */

  }, {
    key: 'isMarkSet',
    value: function isMarkSet(value) {
      return _immutable.Set.isSet(value) && value.every(function (item) {
        return Mark.isMark(item);
      });
    }
  }]);

  return Mark;
}((0, _immutable.Record)(DEFAULTS));

/**
 * Attach a pseudo-symbol for type checking.
 */

Mark.fromJS = Mark.fromJSON;
Mark.prototype[_modelTypes2.default.MARK] = true;

/**
 * Memoize read methods.
 */

(0, _memoize2.default)(Mark.prototype, ['getComponent'], {
  takesArguments: true
});

/**
 * Export.
 *
 * @type {Mark}
 */

exports.default = Mark;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(148)() ? Symbol : __webpack_require__(149);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _direction = __webpack_require__(125);

var _direction2 = _interopRequireDefault(_direction);

var _isPlainObject = __webpack_require__(3);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _immutable = __webpack_require__(0);

var _block = __webpack_require__(20);

var _block2 = _interopRequireDefault(_block);

var _data = __webpack_require__(32);

var _data2 = _interopRequireDefault(_data);

var _document = __webpack_require__(24);

var _document2 = _interopRequireDefault(_document);

var _inline = __webpack_require__(21);

var _inline2 = _interopRequireDefault(_inline);

var _text = __webpack_require__(49);

var _text2 = _interopRequireDefault(_text);

var _generateKey = __webpack_require__(23);

var _generateKey2 = _interopRequireDefault(_generateKey);

var _isIndexInRange = __webpack_require__(170);

var _isIndexInRange2 = _interopRequireDefault(_isIndexInRange);

var _memoize = __webpack_require__(51);

var _memoize2 = _interopRequireDefault(_memoize);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Node.
 *
 * And interface that `Document`, `Block` and `Inline` all implement, to make
 * working with the recursive node tree easier.
 *
 * @type {Node}
 */

var Node = function () {
  function Node() {
    _classCallCheck(this, Node);
  }

  _createClass(Node, [{
    key: 'areDescendantsSorted',

    /**
     * True if the node has both descendants in that order, false otherwise. The
     * order is depth-first, post-order.
     *
     * @param {String} first
     * @param {String} second
     * @return {Boolean}
     */

    value: function areDescendantsSorted(first, second) {
      first = normalizeKey(first);
      second = normalizeKey(second);

      var keys = this.getKeysAsArray();
      var firstIndex = keys.indexOf(first);
      var secondIndex = keys.indexOf(second);
      if (firstIndex == -1 || secondIndex == -1) return null;

      return firstIndex < secondIndex;
    }

    /**
     * Assert that a node has a child by `key` and return it.
     *
     * @param {String} key
     * @return {Node}
     */

  }, {
    key: 'assertChild',
    value: function assertChild(key) {
      var child = this.getChild(key);

      if (!child) {
        key = normalizeKey(key);
        throw new Error('Could not find a child node with key "' + key + '".');
      }

      return child;
    }

    /**
     * Assert that a node has a descendant by `key` and return it.
     *
     * @param {String} key
     * @return {Node}
     */

  }, {
    key: 'assertDescendant',
    value: function assertDescendant(key) {
      var descendant = this.getDescendant(key);

      if (!descendant) {
        key = normalizeKey(key);
        throw new Error('Could not find a descendant node with key "' + key + '".');
      }

      return descendant;
    }

    /**
     * Assert that a node's tree has a node by `key` and return it.
     *
     * @param {String} key
     * @return {Node}
     */

  }, {
    key: 'assertNode',
    value: function assertNode(key) {
      var node = this.getNode(key);

      if (!node) {
        key = normalizeKey(key);
        throw new Error('Could not find a node with key "' + key + '".');
      }

      return node;
    }

    /**
     * Assert that a node exists at `path` and return it.
     *
     * @param {Array} path
     * @return {Node}
     */

  }, {
    key: 'assertPath',
    value: function assertPath(path) {
      var descendant = this.getDescendantAtPath(path);

      if (!descendant) {
        throw new Error('Could not find a descendant at path "' + path + '".');
      }

      return descendant;
    }

    /**
     * Recursively filter all descendant nodes with `iterator`.
     *
     * @param {Function} iterator
     * @return {List<Node>}
     */

  }, {
    key: 'filterDescendants',
    value: function filterDescendants(iterator) {
      var matches = [];

      this.forEachDescendant(function (node, i, nodes) {
        if (iterator(node, i, nodes)) matches.push(node);
      });

      return (0, _immutable.List)(matches);
    }

    /**
     * Recursively find all descendant nodes by `iterator`.
     *
     * @param {Function} iterator
     * @return {Node|Null}
     */

  }, {
    key: 'findDescendant',
    value: function findDescendant(iterator) {
      var found = null;

      this.forEachDescendant(function (node, i, nodes) {
        if (iterator(node, i, nodes)) {
          found = node;
          return false;
        }
      });

      return found;
    }

    /**
     * Recursively iterate over all descendant nodes with `iterator`. If the
     * iterator returns false it will break the loop.
     *
     * @param {Function} iterator
     */

  }, {
    key: 'forEachDescendant',
    value: function forEachDescendant(iterator) {
      var ret = void 0;

      this.nodes.forEach(function (child, i, nodes) {
        if (iterator(child, i, nodes) === false) {
          ret = false;
          return false;
        }

        if (child.kind != 'text') {
          ret = child.forEachDescendant(iterator);
          return ret;
        }
      });

      return ret;
    }

    /**
     * Get the path of ancestors of a descendant node by `key`.
     *
     * @param {String|Node} key
     * @return {List<Node>|Null}
     */

  }, {
    key: 'getAncestors',
    value: function getAncestors(key) {
      key = normalizeKey(key);

      if (key == this.key) return (0, _immutable.List)();
      if (this.hasChild(key)) return (0, _immutable.List)([this]);

      var ancestors = void 0;
      this.nodes.find(function (node) {
        if (node.kind == 'text') return false;
        ancestors = node.getAncestors(key);
        return ancestors;
      });

      if (ancestors) {
        return ancestors.unshift(this);
      } else {
        return null;
      }
    }

    /**
     * Get the leaf block descendants of the node.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getBlocks',
    value: function getBlocks() {
      var array = this.getBlocksAsArray();
      return new _immutable.List(array);
    }

    /**
     * Get the leaf block descendants of the node.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getBlocksAsArray',
    value: function getBlocksAsArray() {
      return this.nodes.reduce(function (array, child) {
        if (child.kind != 'block') return array;
        if (!child.isLeafBlock()) return array.concat(child.getBlocksAsArray());
        array.push(child);
        return array;
      }, []);
    }

    /**
     * Get the leaf block descendants in a `range`.
     *
     * @param {Range} range
     * @return {List<Node>}
     */

  }, {
    key: 'getBlocksAtRange',
    value: function getBlocksAtRange(range) {
      var array = this.getBlocksAtRangeAsArray(range);
      // Eliminate duplicates by converting to an `OrderedSet` first.
      return new _immutable.List(new _immutable.OrderedSet(array));
    }

    /**
     * Get the leaf block descendants in a `range` as an array
     *
     * @param {Range} range
     * @return {Array}
     */

  }, {
    key: 'getBlocksAtRangeAsArray',
    value: function getBlocksAtRangeAsArray(range) {
      range = range.normalize(this);
      if (range.isUnset) return [];

      var _range = range,
          startKey = _range.startKey,
          endKey = _range.endKey;

      var startBlock = this.getClosestBlock(startKey);

      // PERF: the most common case is when the range is in a single block node,
      // where we can avoid a lot of iterating of the tree.
      if (startKey == endKey) return [startBlock];

      var endBlock = this.getClosestBlock(endKey);
      var blocks = this.getBlocksAsArray();
      var start = blocks.indexOf(startBlock);
      var end = blocks.indexOf(endBlock);
      return blocks.slice(start, end + 1);
    }

    /**
     * Get all of the leaf blocks that match a `type`.
     *
     * @param {String} type
     * @return {List<Node>}
     */

  }, {
    key: 'getBlocksByType',
    value: function getBlocksByType(type) {
      var array = this.getBlocksByTypeAsArray(type);
      return new _immutable.List(array);
    }

    /**
     * Get all of the leaf blocks that match a `type` as an array
     *
     * @param {String} type
     * @return {Array}
     */

  }, {
    key: 'getBlocksByTypeAsArray',
    value: function getBlocksByTypeAsArray(type) {
      return this.nodes.reduce(function (array, node) {
        if (node.kind != 'block') {
          return array;
        } else if (node.isLeafBlock() && node.type == type) {
          array.push(node);
          return array;
        } else {
          return array.concat(node.getBlocksByTypeAsArray(type));
        }
      }, []);
    }

    /**
     * Get all of the characters for every text node.
     *
     * @return {List<Character>}
     */

  }, {
    key: 'getCharacters',
    value: function getCharacters() {
      var array = this.getCharactersAsArray();
      return new _immutable.List(array);
    }

    /**
     * Get all of the characters for every text node as an array
     *
     * @return {Array}
     */

  }, {
    key: 'getCharactersAsArray',
    value: function getCharactersAsArray() {
      return this.nodes.reduce(function (arr, node) {
        return node.kind == 'text' ? arr.concat(node.characters.toArray()) : arr.concat(node.getCharactersAsArray());
      }, []);
    }

    /**
     * Get a list of the characters in a `range`.
     *
     * @param {Range} range
     * @return {List<Character>}
     */

  }, {
    key: 'getCharactersAtRange',
    value: function getCharactersAtRange(range) {
      var array = this.getCharactersAtRangeAsArray(range);
      return new _immutable.List(array);
    }

    /**
     * Get a list of the characters in a `range` as an array.
     *
     * @param {Range} range
     * @return {Array}
     */

  }, {
    key: 'getCharactersAtRangeAsArray',
    value: function getCharactersAtRangeAsArray(range) {
      range = range.normalize(this);
      if (range.isUnset) return [];

      return this.getTextsAtRange(range).reduce(function (arr, text) {
        var chars = text.characters.filter(function (char, i) {
          return (0, _isIndexInRange2.default)(i, text, range);
        }).toArray();

        return arr.concat(chars);
      }, []);
    }

    /**
     * Get a child node by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getChild',
    value: function getChild(key) {
      key = normalizeKey(key);
      return this.nodes.find(function (node) {
        return node.key == key;
      });
    }

    /**
     * Get closest parent of node by `key` that matches `iterator`.
     *
     * @param {String} key
     * @param {Function} iterator
     * @return {Node|Null}
     */

  }, {
    key: 'getClosest',
    value: function getClosest(key, iterator) {
      key = normalizeKey(key);
      var ancestors = this.getAncestors(key);
      if (!ancestors) {
        throw new Error('Could not find a descendant node with key "' + key + '".');
      }

      // Exclude this node itself.
      return ancestors.rest().findLast(iterator);
    }

    /**
     * Get the closest block parent of a `node`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getClosestBlock',
    value: function getClosestBlock(key) {
      return this.getClosest(key, function (parent) {
        return parent.kind == 'block';
      });
    }

    /**
     * Get the closest inline parent of a `node`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getClosestInline',
    value: function getClosestInline(key) {
      return this.getClosest(key, function (parent) {
        return parent.kind == 'inline';
      });
    }

    /**
     * Get the closest void parent of a `node`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getClosestVoid',
    value: function getClosestVoid(key) {
      return this.getClosest(key, function (parent) {
        return parent.isVoid;
      });
    }

    /**
     * Get the common ancestor of nodes `one` and `two` by keys.
     *
     * @param {String} one
     * @param {String} two
     * @return {Node}
     */

  }, {
    key: 'getCommonAncestor',
    value: function getCommonAncestor(one, two) {
      one = normalizeKey(one);
      two = normalizeKey(two);

      if (one == this.key) return this;
      if (two == this.key) return this;

      this.assertDescendant(one);
      this.assertDescendant(two);
      var ancestors = new _immutable.List();
      var oneParent = this.getParent(one);
      var twoParent = this.getParent(two);

      while (oneParent) {
        ancestors = ancestors.push(oneParent);
        oneParent = this.getParent(oneParent.key);
      }

      while (twoParent) {
        if (ancestors.includes(twoParent)) return twoParent;
        twoParent = this.getParent(twoParent.key);
      }
    }

    /**
     * Get the component for the node from a `schema`.
     *
     * @param {Schema} schema
     * @return {Component|Void}
     */

  }, {
    key: 'getComponent',
    value: function getComponent(schema) {
      return schema.__getComponent(this);
    }

    /**
     * Get the decorations for the node from a `schema`.
     *
     * @param {Schema} schema
     * @return {Array}
     */

  }, {
    key: 'getDecorations',
    value: function getDecorations(schema) {
      return schema.__getDecorations(this);
    }

    /**
     * Get the depth of a child node by `key`, with optional `startAt`.
     *
     * @param {String} key
     * @param {Number} startAt (optional)
     * @return {Number} depth
     */

  }, {
    key: 'getDepth',
    value: function getDepth(key) {
      var startAt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      this.assertDescendant(key);
      if (this.hasChild(key)) return startAt;
      return this.getFurthestAncestor(key).getDepth(key, startAt + 1);
    }

    /**
     * Get a descendant node by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getDescendant',
    value: function getDescendant(key) {
      key = normalizeKey(key);
      var descendantFound = null;

      var found = this.nodes.find(function (node) {
        if (node.key === key) {
          return node;
        } else if (node.kind !== 'text') {
          descendantFound = node.getDescendant(key);
          return descendantFound;
        } else {
          return false;
        }
      });

      return descendantFound || found;
    }

    /**
     * Get a descendant by `path`.
     *
     * @param {Array} path
     * @return {Node|Null}
     */

  }, {
    key: 'getDescendantAtPath',
    value: function getDescendantAtPath(path) {
      var descendant = this;

      for (var i = 0; i < path.length; i++) {
        var index = path[i];
        if (!descendant) return;
        if (!descendant.nodes) return;
        descendant = descendant.nodes.get(index);
      }

      return descendant;
    }

    /**
     * Get the first child text node.
     *
     * @return {Node|Null}
     */

  }, {
    key: 'getFirstText',
    value: function getFirstText() {
      var descendantFound = null;

      var found = this.nodes.find(function (node) {
        if (node.kind == 'text') return true;
        descendantFound = node.getFirstText();
        return descendantFound;
      });

      return descendantFound || found;
    }

    /**
     * Get a fragment of the node at a `range`.
     *
     * @param {Range} range
     * @return {Document}
     */

  }, {
    key: 'getFragmentAtRange',
    value: function getFragmentAtRange(range) {
      range = range.normalize(this);
      if (range.isUnset) return _document2.default.create();

      var node = this;

      // Make sure the children exist.
      var _range2 = range,
          startKey = _range2.startKey,
          startOffset = _range2.startOffset,
          endKey = _range2.endKey,
          endOffset = _range2.endOffset;

      var startText = node.assertDescendant(startKey);
      var endText = node.assertDescendant(endKey);

      // Split at the start and end.
      var child = startText;
      var previous = void 0;
      var parent = void 0;

      while (parent = node.getParent(child.key)) {
        var index = parent.nodes.indexOf(child);
        var position = child.kind == 'text' ? startOffset : child.nodes.indexOf(previous);

        parent = parent.splitNode(index, position);
        node = node.updateNode(parent);
        previous = parent.nodes.get(index + 1);
        child = parent;
      }

      child = startKey == endKey ? node.getNextText(startKey) : endText;

      while (parent = node.getParent(child.key)) {
        var _index = parent.nodes.indexOf(child);
        var _position = child.kind == 'text' ? startKey == endKey ? endOffset - startOffset : endOffset : child.nodes.indexOf(previous);

        parent = parent.splitNode(_index, _position);
        node = node.updateNode(parent);
        previous = parent.nodes.get(_index + 1);
        child = parent;
      }

      // Get the start and end nodes.
      var startNode = node.getNextSibling(node.getFurthestAncestor(startKey).key);
      var endNode = startKey == endKey ? node.getNextSibling(node.getNextSibling(node.getFurthestAncestor(endKey).key).key) : node.getNextSibling(node.getFurthestAncestor(endKey).key);

      // Get children range of nodes from start to end nodes
      var startIndex = node.nodes.indexOf(startNode);
      var endIndex = node.nodes.indexOf(endNode);
      var nodes = node.nodes.slice(startIndex, endIndex);

      // Return a new document fragment.
      return _document2.default.create({ nodes: nodes });
    }

    /**
     * Get the furthest parent of a node by `key` that matches an `iterator`.
     *
     * @param {String} key
     * @param {Function} iterator
     * @return {Node|Null}
     */

  }, {
    key: 'getFurthest',
    value: function getFurthest(key, iterator) {
      var ancestors = this.getAncestors(key);
      if (!ancestors) {
        key = normalizeKey(key);
        throw new Error('Could not find a descendant node with key "' + key + '".');
      }

      // Exclude this node itself
      return ancestors.rest().find(iterator);
    }

    /**
     * Get the furthest block parent of a node by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getFurthestBlock',
    value: function getFurthestBlock(key) {
      return this.getFurthest(key, function (node) {
        return node.kind == 'block';
      });
    }

    /**
     * Get the furthest inline parent of a node by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getFurthestInline',
    value: function getFurthestInline(key) {
      return this.getFurthest(key, function (node) {
        return node.kind == 'inline';
      });
    }

    /**
     * Get the furthest ancestor of a node by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getFurthestAncestor',
    value: function getFurthestAncestor(key) {
      key = normalizeKey(key);
      return this.nodes.find(function (node) {
        if (node.key == key) return true;
        if (node.kind == 'text') return false;
        return node.hasDescendant(key);
      });
    }

    /**
     * Get the furthest ancestor of a node by `key` that has only one child.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getFurthestOnlyChildAncestor',
    value: function getFurthestOnlyChildAncestor(key) {
      var ancestors = this.getAncestors(key);

      if (!ancestors) {
        key = normalizeKey(key);
        throw new Error('Could not find a descendant node with key "' + key + '".');
      }

      return ancestors
      // Skip this node...
      .skipLast()
      // Take parents until there are more than one child...
      .reverse().takeUntil(function (p) {
        return p.nodes.size > 1;
      })
      // And pick the highest.
      .last();
    }

    /**
     * Get the closest inline nodes for each text node in the node.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getInlines',
    value: function getInlines() {
      var array = this.getInlinesAsArray();
      return new _immutable.List(array);
    }

    /**
     * Get the closest inline nodes for each text node in the node, as an array.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getInlinesAsArray',
    value: function getInlinesAsArray() {
      var array = [];

      this.nodes.forEach(function (child) {
        if (child.kind == 'text') return;
        if (child.isLeafInline()) {
          array.push(child);
        } else {
          array = array.concat(child.getInlinesAsArray());
        }
      });

      return array;
    }

    /**
     * Get the closest inline nodes for each text node in a `range`.
     *
     * @param {Range} range
     * @return {List<Node>}
     */

  }, {
    key: 'getInlinesAtRange',
    value: function getInlinesAtRange(range) {
      var array = this.getInlinesAtRangeAsArray(range);
      // Remove duplicates by converting it to an `OrderedSet` first.
      return new _immutable.List(new _immutable.OrderedSet(array));
    }

    /**
     * Get the closest inline nodes for each text node in a `range` as an array.
     *
     * @param {Range} range
     * @return {Array}
     */

  }, {
    key: 'getInlinesAtRangeAsArray',
    value: function getInlinesAtRangeAsArray(range) {
      var _this = this;

      range = range.normalize(this);
      if (range.isUnset) return [];

      return this.getTextsAtRangeAsArray(range).map(function (text) {
        return _this.getClosestInline(text.key);
      }).filter(function (exists) {
        return exists;
      });
    }

    /**
     * Get all of the leaf inline nodes that match a `type`.
     *
     * @param {String} type
     * @return {List<Node>}
     */

  }, {
    key: 'getInlinesByType',
    value: function getInlinesByType(type) {
      var array = this.getInlinesByTypeAsArray(type);
      return new _immutable.List(array);
    }

    /**
     * Get all of the leaf inline nodes that match a `type` as an array.
     *
     * @param {String} type
     * @return {Array}
     */

  }, {
    key: 'getInlinesByTypeAsArray',
    value: function getInlinesByTypeAsArray(type) {
      return this.nodes.reduce(function (inlines, node) {
        if (node.kind == 'text') {
          return inlines;
        } else if (node.isLeafInline() && node.type == type) {
          inlines.push(node);
          return inlines;
        } else {
          return inlines.concat(node.getInlinesByTypeAsArray(type));
        }
      }, []);
    }

    /**
     * Return a set of all keys in the node as an array.
     *
     * @return {Array<String>}
     */

  }, {
    key: 'getKeysAsArray',
    value: function getKeysAsArray() {
      var keys = [];

      this.forEachDescendant(function (desc) {
        keys.push(desc.key);
      });

      return keys;
    }

    /**
     * Return a set of all keys in the node.
     *
     * @return {Set<String>}
     */

  }, {
    key: 'getKeys',
    value: function getKeys() {
      var keys = this.getKeysAsArray();
      return new _immutable.Set(keys);
    }

    /**
     * Get the last child text node.
     *
     * @return {Node|Null}
     */

  }, {
    key: 'getLastText',
    value: function getLastText() {
      var descendantFound = null;

      var found = this.nodes.findLast(function (node) {
        if (node.kind == 'text') return true;
        descendantFound = node.getLastText();
        return descendantFound;
      });

      return descendantFound || found;
    }

    /**
     * Get all of the marks for all of the characters of every text node.
     *
     * @return {Set<Mark>}
     */

  }, {
    key: 'getMarks',
    value: function getMarks() {
      var array = this.getMarksAsArray();
      return new _immutable.Set(array);
    }

    /**
     * Get all of the marks for all of the characters of every text node.
     *
     * @return {OrderedSet<Mark>}
     */

  }, {
    key: 'getOrderedMarks',
    value: function getOrderedMarks() {
      var array = this.getMarksAsArray();
      return new _immutable.OrderedSet(array);
    }

    /**
     * Get all of the marks as an array.
     *
     * @return {Array}
     */

  }, {
    key: 'getMarksAsArray',
    value: function getMarksAsArray() {
      return this.nodes.reduce(function (marks, node) {
        return marks.concat(node.getMarksAsArray());
      }, []);
    }

    /**
     * Get a set of the marks in a `range`.
     *
     * @param {Range} range
     * @return {Set<Mark>}
     */

  }, {
    key: 'getMarksAtRange',
    value: function getMarksAtRange(range) {
      var array = this.getMarksAtRangeAsArray(range);
      return new _immutable.Set(array);
    }

    /**
     * Get a set of the marks in a `range`.
     *
     * @param {Range} range
     * @return {OrderedSet<Mark>}
     */

  }, {
    key: 'getOrderedMarksAtRange',
    value: function getOrderedMarksAtRange(range) {
      var array = this.getMarksAtRangeAsArray(range);
      return new _immutable.OrderedSet(array);
    }

    /**
     * Get a set of the active marks in a `range`.
     *
     * @param {Range} range
     * @return {Set<Mark>}
     */

  }, {
    key: 'getActiveMarksAtRange',
    value: function getActiveMarksAtRange(range) {
      var array = this.getActiveMarksAtRangeAsArray(range);
      return new _immutable.Set(array);
    }

    /**
     * Get a set of the marks in a `range`, by unioning.
     *
     * @param {Range} range
     * @return {Array}
     */

  }, {
    key: 'getMarksAtRangeAsArray',
    value: function getMarksAtRangeAsArray(range) {
      range = range.normalize(this);
      if (range.isUnset) return [];

      var _range3 = range,
          startKey = _range3.startKey,
          startOffset = _range3.startOffset;

      // If the range is collapsed at the start of the node, check the previous.

      if (range.isCollapsed && startOffset == 0) {
        var previous = this.getPreviousText(startKey);
        if (!previous || previous.text.length == 0) return [];
        var char = previous.characters.get(previous.text.length - 1);
        return char.marks.toArray();
      }

      // If the range is collapsed, check the character before the start.
      if (range.isCollapsed) {
        var text = this.getDescendant(startKey);
        var _char = text.characters.get(range.startOffset - 1);
        return _char.marks.toArray();
      }

      // Otherwise, get a set of the marks for each character in the range.
      return this.getCharactersAtRange(range).reduce(function (memo, char) {
        char.marks.toArray().forEach(function (c) {
          return memo.push(c);
        });
        return memo;
      }, []);
    }

    /**
     * Get a set of marks in a `range`, by intersecting.
     *
     * @param {Range} range
     * @return {Array}
     */

  }, {
    key: 'getActiveMarksAtRangeAsArray',
    value: function getActiveMarksAtRangeAsArray(range) {
      range = range.normalize(this);
      if (range.isUnset) return [];

      var _range4 = range,
          startKey = _range4.startKey,
          startOffset = _range4.startOffset;

      // If the range is collapsed at the start of the node, check the previous.

      if (range.isCollapsed && startOffset == 0) {
        var previous = this.getPreviousText(startKey);
        if (!previous || !previous.length) return [];
        var char = previous.characters.get(previous.length - 1);
        return char.marks.toArray();
      }

      // If the range is collapsed, check the character before the start.
      if (range.isCollapsed) {
        var text = this.getDescendant(startKey);
        var _char2 = text.characters.get(range.startOffset - 1);
        return _char2.marks.toArray();
      }

      // Otherwise, get a set of the marks for each character in the range.
      var chars = this.getCharactersAtRange(range);
      var first = chars.first();
      if (!first) return [];

      var memo = first.marks;

      chars.slice(1).forEach(function (char) {
        memo = memo.intersect(char.marks);
        return memo.size != 0;
      });

      return memo.toArray();
    }

    /**
     * Get all of the marks that match a `type`.
     *
     * @param {String} type
     * @return {Set<Mark>}
     */

  }, {
    key: 'getMarksByType',
    value: function getMarksByType(type) {
      var array = this.getMarksByTypeAsArray(type);
      return new _immutable.Set(array);
    }

    /**
     * Get all of the marks that match a `type`.
     *
     * @param {String} type
     * @return {OrderedSet<Mark>}
     */

  }, {
    key: 'getOrderedMarksByType',
    value: function getOrderedMarksByType(type) {
      var array = this.getMarksByTypeAsArray(type);
      return new _immutable.OrderedSet(array);
    }

    /**
     * Get all of the marks that match a `type` as an array.
     *
     * @param {String} type
     * @return {Array}
     */

  }, {
    key: 'getMarksByTypeAsArray',
    value: function getMarksByTypeAsArray(type) {
      return this.nodes.reduce(function (array, node) {
        return node.kind == 'text' ? array.concat(node.getMarksAsArray().filter(function (m) {
          return m.type == type;
        })) : array.concat(node.getMarksByTypeAsArray(type));
      }, []);
    }

    /**
     * Get the block node before a descendant text node by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getNextBlock',
    value: function getNextBlock(key) {
      var child = this.assertDescendant(key);
      var last = void 0;

      if (child.kind == 'block') {
        last = child.getLastText();
      } else {
        var block = this.getClosestBlock(key);
        last = block.getLastText();
      }

      var next = this.getNextText(last.key);
      if (!next) return null;

      return this.getClosestBlock(next.key);
    }

    /**
     * Get the node after a descendant by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getNextSibling',
    value: function getNextSibling(key) {
      key = normalizeKey(key);

      var parent = this.getParent(key);
      var after = parent.nodes.skipUntil(function (child) {
        return child.key == key;
      });

      if (after.size == 0) {
        throw new Error('Could not find a child node with key "' + key + '".');
      }
      return after.get(1);
    }

    /**
     * Get the text node after a descendant text node by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getNextText',
    value: function getNextText(key) {
      key = normalizeKey(key);
      return this.getTexts().skipUntil(function (text) {
        return text.key == key;
      }).get(1);
    }

    /**
     * Get a node in the tree by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getNode',
    value: function getNode(key) {
      key = normalizeKey(key);
      return this.key == key ? this : this.getDescendant(key);
    }

    /**
     * Get a node in the tree by `path`.
     *
     * @param {Array} path
     * @return {Node|Null}
     */

  }, {
    key: 'getNodeAtPath',
    value: function getNodeAtPath(path) {
      return path.length ? this.getDescendantAtPath(path) : this;
    }

    /**
     * Get the offset for a descendant text node by `key`.
     *
     * @param {String} key
     * @return {Number}
     */

  }, {
    key: 'getOffset',
    value: function getOffset(key) {
      this.assertDescendant(key);

      // Calculate the offset of the nodes before the highest child.
      var child = this.getFurthestAncestor(key);
      var offset = this.nodes.takeUntil(function (n) {
        return n == child;
      }).reduce(function (memo, n) {
        return memo + n.text.length;
      }, 0);

      // Recurse if need be.
      return this.hasChild(key) ? offset : offset + child.getOffset(key);
    }

    /**
     * Get the offset from a `range`.
     *
     * @param {Range} range
     * @return {Number}
     */

  }, {
    key: 'getOffsetAtRange',
    value: function getOffsetAtRange(range) {
      range = range.normalize(this);

      if (range.isUnset) {
        throw new Error('The range cannot be unset to calculcate its offset.');
      }

      if (range.isExpanded) {
        throw new Error('The range must be collapsed to calculcate its offset.');
      }

      var _range5 = range,
          startKey = _range5.startKey,
          startOffset = _range5.startOffset;

      return this.getOffset(startKey) + startOffset;
    }

    /**
     * Get the parent of a child node by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getParent',
    value: function getParent(key) {
      if (this.hasChild(key)) return this;

      var node = null;

      this.nodes.find(function (child) {
        if (child.kind == 'text') {
          return false;
        } else {
          node = child.getParent(key);
          return node;
        }
      });

      return node;
    }

    /**
     * Get the path of a descendant node by `key`.
     *
     * @param {String|Node} key
     * @return {Array}
     */

  }, {
    key: 'getPath',
    value: function getPath(key) {
      var child = this.assertNode(key);
      var ancestors = this.getAncestors(key);
      var path = [];

      ancestors.reverse().forEach(function (ancestor) {
        var index = ancestor.nodes.indexOf(child);
        path.unshift(index);
        child = ancestor;
      });

      return path;
    }

    /**
     * Get the placeholder for the node from a `schema`.
     *
     * @param {Schema} schema
     * @return {Component|Void}
     */

  }, {
    key: 'getPlaceholder',
    value: function getPlaceholder(schema) {
      return schema.__getPlaceholder(this);
    }

    /**
     * Get the block node before a descendant text node by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getPreviousBlock',
    value: function getPreviousBlock(key) {
      var child = this.assertDescendant(key);
      var first = void 0;

      if (child.kind == 'block') {
        first = child.getFirstText();
      } else {
        var block = this.getClosestBlock(key);
        first = block.getFirstText();
      }

      var previous = this.getPreviousText(first.key);
      if (!previous) return null;

      return this.getClosestBlock(previous.key);
    }

    /**
     * Get the node before a descendant node by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getPreviousSibling',
    value: function getPreviousSibling(key) {
      key = normalizeKey(key);
      var parent = this.getParent(key);
      var before = parent.nodes.takeUntil(function (child) {
        return child.key == key;
      });

      if (before.size == parent.nodes.size) {
        throw new Error('Could not find a child node with key "' + key + '".');
      }

      return before.last();
    }

    /**
     * Get the text node before a descendant text node by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getPreviousText',
    value: function getPreviousText(key) {
      key = normalizeKey(key);
      return this.getTexts().takeUntil(function (text) {
        return text.key == key;
      }).last();
    }

    /**
     * Get the indexes of the selection for a `range`, given an extra flag for
     * whether the node `isSelected`, to determine whether not finding matches
     * means everything is selected or nothing is.
     *
     * @param {Range} range
     * @param {Boolean} isSelected
     * @return {Object|Null}
     */

  }, {
    key: 'getSelectionIndexes',
    value: function getSelectionIndexes(range) {
      var isSelected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var startKey = range.startKey,
          endKey = range.endKey;

      // PERF: if we're not selected, or the range is blurred, we can exit early.

      if (!isSelected || range.isBlurred) {
        return null;
      }

      // PERF: if the start and end keys are the same, just check for the child
      // that contains that single key.
      if (startKey == endKey) {
        var child = this.getFurthestAncestor(startKey);
        var index = child ? this.nodes.indexOf(child) : null;
        return { start: index, end: index + 1 };
      }

      // Otherwise, check all of the children...
      var start = null;
      var end = null;

      this.nodes.forEach(function (child, i) {
        if (child.kind == 'text') {
          if (start == null && child.key == startKey) start = i;
          if (end == null && child.key == endKey) end = i + 1;
        } else {
          if (start == null && child.hasDescendant(startKey)) start = i;
          if (end == null && child.hasDescendant(endKey)) end = i + 1;
        }

        // PERF: exit early if both start and end have been found.
        return start == null || end == null;
      });

      if (isSelected && start == null) start = 0;
      if (isSelected && end == null) end = this.nodes.size;
      return start == null ? null : { start: start, end: end };
    }

    /**
     * Get the concatenated text string of all child nodes.
     *
     * @return {String}
     */

  }, {
    key: 'getText',
    value: function getText() {
      return this.nodes.reduce(function (string, node) {
        return string + node.text;
      }, '');
    }

    /**
     * Get the descendent text node at an `offset`.
     *
     * @param {String} offset
     * @return {Node|Null}
     */

  }, {
    key: 'getTextAtOffset',
    value: function getTextAtOffset(offset) {
      // PERF: Add a few shortcuts for the obvious cases.
      if (offset == 0) return this.getFirstText();
      if (offset == this.text.length) return this.getLastText();
      if (offset < 0 || offset > this.text.length) return null;

      var length = 0;

      return this.getTexts().find(function (node, i, nodes) {
        length += node.text.length;
        return length > offset;
      });
    }

    /**
     * Get the direction of the node's text.
     *
     * @return {String}
     */

  }, {
    key: 'getTextDirection',
    value: function getTextDirection() {
      var dir = (0, _direction2.default)(this.text);
      return dir == 'neutral' ? undefined : dir;
    }

    /**
     * Recursively get all of the child text nodes in order of appearance.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getTexts',
    value: function getTexts() {
      var array = this.getTextsAsArray();
      return new _immutable.List(array);
    }

    /**
     * Recursively get all the leaf text nodes in order of appearance, as array.
     *
     * @return {List<Node>}
     */

  }, {
    key: 'getTextsAsArray',
    value: function getTextsAsArray() {
      var array = [];

      this.nodes.forEach(function (node) {
        if (node.kind == 'text') {
          array.push(node);
        } else {
          array = array.concat(node.getTextsAsArray());
        }
      });

      return array;
    }

    /**
     * Get all of the text nodes in a `range`.
     *
     * @param {Range} range
     * @return {List<Node>}
     */

  }, {
    key: 'getTextsAtRange',
    value: function getTextsAtRange(range) {
      var array = this.getTextsAtRangeAsArray(range);
      return new _immutable.List(array);
    }

    /**
     * Get all of the text nodes in a `range` as an array.
     *
     * @param {Range} range
     * @return {Array}
     */

  }, {
    key: 'getTextsAtRangeAsArray',
    value: function getTextsAtRangeAsArray(range) {
      range = range.normalize(this);
      if (range.isUnset) return [];

      var _range6 = range,
          startKey = _range6.startKey,
          endKey = _range6.endKey;

      var startText = this.getDescendant(startKey);

      // PERF: the most common case is when the range is in a single text node,
      // where we can avoid a lot of iterating of the tree.
      if (startKey == endKey) return [startText];

      var endText = this.getDescendant(endKey);
      var texts = this.getTextsAsArray();
      var start = texts.indexOf(startText);
      var end = texts.indexOf(endText);
      return texts.slice(start, end + 1);
    }

    /**
     * Check if a child node exists by `key`.
     *
     * @param {String} key
     * @return {Boolean}
     */

  }, {
    key: 'hasChild',
    value: function hasChild(key) {
      return !!this.getChild(key);
    }

    /**
     * Recursively check if a child node exists by `key`.
     *
     * @param {String} key
     * @return {Boolean}
     */

  }, {
    key: 'hasDescendant',
    value: function hasDescendant(key) {
      return !!this.getDescendant(key);
    }

    /**
     * Recursively check if a node exists by `key`.
     *
     * @param {String} key
     * @return {Boolean}
     */

  }, {
    key: 'hasNode',
    value: function hasNode(key) {
      return !!this.getNode(key);
    }

    /**
     * Check if a node has a void parent by `key`.
     *
     * @param {String} key
     * @return {Boolean}
     */

  }, {
    key: 'hasVoidParent',
    value: function hasVoidParent(key) {
      return !!this.getClosest(key, function (parent) {
        return parent.isVoid;
      });
    }

    /**
     * Insert a `node` at `index`.
     *
     * @param {Number} index
     * @param {Node} node
     * @return {Node}
     */

  }, {
    key: 'insertNode',
    value: function insertNode(index, node) {
      var keys = this.getKeys();

      if (keys.contains(node.key)) {
        node = node.regenerateKey();
      }

      if (node.kind != 'text') {
        node = node.mapDescendants(function (desc) {
          return keys.contains(desc.key) ? desc.regenerateKey() : desc;
        });
      }

      var nodes = this.nodes.insert(index, node);
      return this.set('nodes', nodes);
    }

    /**
     * Check whether the node is in a `range`.
     *
     * @param {Range} range
     * @return {Boolean}
     */

  }, {
    key: 'isInRange',
    value: function isInRange(range) {
      range = range.normalize(this);

      var node = this;
      var _range7 = range,
          startKey = _range7.startKey,
          endKey = _range7.endKey,
          isCollapsed = _range7.isCollapsed;

      // PERF: solve the most common cast where the start or end key are inside
      // the node, for collapsed selections.

      if (node.key == startKey || node.key == endKey || node.hasDescendant(startKey) || node.hasDescendant(endKey)) {
        return true;
      }

      // PERF: if the selection is collapsed and the previous check didn't return
      // true, then it must be false.
      if (isCollapsed) {
        return false;
      }

      // Otherwise, look through all of the leaf text nodes in the range, to see
      // if any of them are inside the node.
      var texts = node.getTextsAtRange(range);
      var memo = false;

      texts.forEach(function (text) {
        if (node.hasDescendant(text.key)) memo = true;
        return memo;
      });

      return memo;
    }

    /**
     * Check whether the node is a leaf block.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isLeafBlock',
    value: function isLeafBlock() {
      return this.kind == 'block' && this.nodes.every(function (n) {
        return n.kind != 'block';
      });
    }

    /**
     * Check whether the node is a leaf inline.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isLeafInline',
    value: function isLeafInline() {
      return this.kind == 'inline' && this.nodes.every(function (n) {
        return n.kind != 'inline';
      });
    }

    /**
     * Merge a children node `first` with another children node `second`.
     * `first` and `second` will be concatenated in that order.
     * `first` and `second` must be two Nodes or two Text.
     *
     * @param {Node} first
     * @param {Node} second
     * @return {Node}
     */

  }, {
    key: 'mergeNode',
    value: function mergeNode(withIndex, index) {
      var node = this;
      var one = node.nodes.get(withIndex);
      var two = node.nodes.get(index);

      if (one.kind != two.kind) {
        throw new Error('Tried to merge two nodes of different kinds: "' + one.kind + '" and "' + two.kind + '".');
      }

      // If the nodes are text nodes, concatenate their characters together.
      if (one.kind == 'text') {
        var characters = one.characters.concat(two.characters);
        one = one.set('characters', characters);
      }

      // Otherwise, concatenate their child nodes together.
      else {
          var nodes = one.nodes.concat(two.nodes);
          one = one.set('nodes', nodes);
        }

      node = node.removeNode(index);
      node = node.removeNode(withIndex);
      node = node.insertNode(withIndex, one);
      return node;
    }

    /**
     * Map all child nodes, updating them in their parents. This method is
     * optimized to not return a new node if no changes are made.
     *
     * @param {Function} iterator
     * @return {Node}
     */

  }, {
    key: 'mapChildren',
    value: function mapChildren(iterator) {
      var _this2 = this;

      var nodes = this.nodes;

      nodes.forEach(function (node, i) {
        var ret = iterator(node, i, _this2.nodes);
        if (ret != node) nodes = nodes.set(ret.key, ret);
      });

      return this.set('nodes', nodes);
    }

    /**
     * Map all descendant nodes, updating them in their parents. This method is
     * optimized to not return a new node if no changes are made.
     *
     * @param {Function} iterator
     * @return {Node}
     */

  }, {
    key: 'mapDescendants',
    value: function mapDescendants(iterator) {
      var _this3 = this;

      var nodes = this.nodes;

      nodes.forEach(function (node, i) {
        var ret = node;
        if (ret.kind != 'text') ret = ret.mapDescendants(iterator);
        ret = iterator(ret, i, _this3.nodes);
        if (ret == node) return;

        var index = nodes.indexOf(node);
        nodes = nodes.set(index, ret);
      });

      return this.set('nodes', nodes);
    }

    /**
     * Regenerate the node's key.
     *
     * @return {Node}
     */

  }, {
    key: 'regenerateKey',
    value: function regenerateKey() {
      var key = (0, _generateKey2.default)();
      return this.set('key', key);
    }

    /**
     * Remove a `node` from the children node map.
     *
     * @param {String} key
     * @return {Node}
     */

  }, {
    key: 'removeDescendant',
    value: function removeDescendant(key) {
      key = normalizeKey(key);

      var node = this;
      var parent = node.getParent(key);
      if (!parent) throw new Error('Could not find a descendant node with key "' + key + '".');

      var index = parent.nodes.findIndex(function (n) {
        return n.key === key;
      });
      var nodes = parent.nodes.splice(index, 1);

      parent = parent.set('nodes', nodes);
      node = node.updateNode(parent);
      return node;
    }

    /**
     * Remove a node at `index`.
     *
     * @param {Number} index
     * @return {Node}
     */

  }, {
    key: 'removeNode',
    value: function removeNode(index) {
      var nodes = this.nodes.splice(index, 1);
      return this.set('nodes', nodes);
    }

    /**
     * Split a child node by `index` at `position`.
     *
     * @param {Number} index
     * @param {Number} position
     * @return {Node}
     */

  }, {
    key: 'splitNode',
    value: function splitNode(index, position) {
      var node = this;
      var child = node.nodes.get(index);
      var one = void 0;
      var two = void 0;

      // If the child is a text node, the `position` refers to the text offset at
      // which to split it.
      if (child.kind == 'text') {
        var befores = child.characters.take(position);
        var afters = child.characters.skip(position);
        one = child.set('characters', befores);
        two = child.set('characters', afters).regenerateKey();
      }

      // Otherwise, if the child is not a text node, the `position` refers to the
      // index at which to split its children.
      else {
          var _befores = child.nodes.take(position);
          var _afters = child.nodes.skip(position);
          one = child.set('nodes', _befores);
          two = child.set('nodes', _afters).regenerateKey();
        }

      // Remove the old node and insert the newly split children.
      node = node.removeNode(index);
      node = node.insertNode(index, two);
      node = node.insertNode(index, one);
      return node;
    }

    /**
     * Set a new value for a child node by `key`.
     *
     * @param {Node} node
     * @return {Node}
     */

  }, {
    key: 'updateNode',
    value: function updateNode(node) {
      if (node.key == this.key) {
        return node;
      }

      var child = this.assertDescendant(node.key);
      var ancestors = this.getAncestors(node.key);

      ancestors.reverse().forEach(function (parent) {
        var _parent = parent,
            nodes = _parent.nodes;

        var index = nodes.indexOf(child);
        child = parent;
        nodes = nodes.set(index, node);
        parent = parent.set('nodes', nodes);
        node = parent;
      });

      return node;
    }

    /**
     * Validate the node against a `schema`.
     *
     * @param {Schema} schema
     * @return {Object|Null}
     */

  }, {
    key: 'validate',
    value: function validate(schema) {
      return schema.__validate(this);
    }

    /**
     * True if the node has both descendants in that order, false otherwise. The
     * order is depth-first, post-order.
     *
     * @param {String} first
     * @param {String} second
     * @return {Boolean}
     */

  }, {
    key: 'areDescendantSorted',
    value: function areDescendantSorted(first, second) {
      _slateDevLogger2.default.deprecate('0.19.0', 'The Node.areDescendantSorted(first, second) method is deprecated, please use `Node.areDescendantsSorted(first, second) instead.');
      return this.areDescendantsSorted(first, second);
    }

    /**
     * Concat children `nodes` on to the end of the node.
     *
     * @param {List<Node>} nodes
     * @return {Node}
     */

  }, {
    key: 'concatChildren',
    value: function concatChildren(nodes) {
      _slateDevLogger2.default.deprecate('0.19.0', 'The `Node.concatChildren(nodes)` method is deprecated.');
      nodes = this.nodes.concat(nodes);
      return this.set('nodes', nodes);
    }

    /**
     * Decorate all of the text nodes with a `decorator` function.
     *
     * @param {Function} decorator
     * @return {Node}
     */

  }, {
    key: 'decorateTexts',
    value: function decorateTexts(decorator) {
      _slateDevLogger2.default.deprecate('0.19.0', 'The `Node.decorateTexts(decorator) method is deprecated.');
      return this.mapDescendants(function (child) {
        return child.kind == 'text' ? child.decorateCharacters(decorator) : child;
      });
    }

    /**
     * Recursively filter all descendant nodes with `iterator`, depth-first.
     * It is different from `filterDescendants` in regard of the order of results.
     *
     * @param {Function} iterator
     * @return {List<Node>}
     */

  }, {
    key: 'filterDescendantsDeep',
    value: function filterDescendantsDeep(iterator) {
      _slateDevLogger2.default.deprecate('0.19.0', 'The Node.filterDescendantsDeep(iterator) method is deprecated.');
      return this.nodes.reduce(function (matches, child, i, nodes) {
        if (child.kind != 'text') matches = matches.concat(child.filterDescendantsDeep(iterator));
        if (iterator(child, i, nodes)) matches = matches.push(child);
        return matches;
      }, new _immutable.List());
    }

    /**
     * Recursively find all descendant nodes by `iterator`. Depth first.
     *
     * @param {Function} iterator
     * @return {Node|Null}
     */

  }, {
    key: 'findDescendantDeep',
    value: function findDescendantDeep(iterator) {
      _slateDevLogger2.default.deprecate('0.19.0', 'The Node.findDescendantDeep(iterator) method is deprecated.');
      var found = void 0;

      this.forEachDescendant(function (node) {
        if (iterator(node)) {
          found = node;
          return false;
        }
      });

      return found;
    }

    /**
     * Get children between two child keys.
     *
     * @param {String} start
     * @param {String} end
     * @return {Node}
     */

  }, {
    key: 'getChildrenBetween',
    value: function getChildrenBetween(start, end) {
      _slateDevLogger2.default.deprecate('0.19.0', 'The `Node.getChildrenBetween(start, end)` method is deprecated.');
      start = this.assertChild(start);
      start = this.nodes.indexOf(start);
      end = this.assertChild(end);
      end = this.nodes.indexOf(end);
      return this.nodes.slice(start + 1, end);
    }

    /**
     * Get children between two child keys, including the two children.
     *
     * @param {String} start
     * @param {String} end
     * @return {Node}
     */

  }, {
    key: 'getChildrenBetweenIncluding',
    value: function getChildrenBetweenIncluding(start, end) {
      _slateDevLogger2.default.deprecate('0.19.0', 'The `Node.getChildrenBetweenIncluding(start, end)` method is deprecated.');
      start = this.assertChild(start);
      start = this.nodes.indexOf(start);
      end = this.assertChild(end);
      end = this.nodes.indexOf(end);
      return this.nodes.slice(start, end + 1);
    }

    /**
     * Get the highest child ancestor of a node by `key`.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getHighestChild',
    value: function getHighestChild(key) {
      _slateDevLogger2.default.deprecate('0.19.0', 'The `Node.getHighestChild(key) method is deprecated, please use `Node.getFurthestAncestor(key) instead.');
      return this.getFurthestAncestor(key);
    }

    /**
     * Get the highest parent of a node by `key` which has an only child.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getHighestOnlyChildParent',
    value: function getHighestOnlyChildParent(key) {
      _slateDevLogger2.default.deprecate('0.19.0', 'The `Node.getHighestOnlyChildParent(key)` method is deprecated, please use `Node.getFurthestOnlyChildAncestor` instead.');
      return this.getFurthestOnlyChildAncestor(key);
    }

    /**
     * Check if the inline nodes are split at a `range`.
     *
     * @param {Range} range
     * @return {Boolean}
     */

  }, {
    key: 'isInlineSplitAtRange',
    value: function isInlineSplitAtRange(range) {
      _slateDevLogger2.default.deprecate('0.19.0', 'The `Node.isInlineSplitAtRange(range)` method is deprecated.');
      range = range.normalize(this);
      if (range.isExpanded) throw new Error();

      var _range8 = range,
          startKey = _range8.startKey;

      var start = this.getFurthestInline(startKey) || this.getDescendant(startKey);
      return range.isAtStartOf(start) || range.isAtEndOf(start);
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Node` with `attrs`.
     *
     * @param {Object|Node} attrs
     * @return {Node}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Node.isNode(attrs)) {
        return attrs;
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        switch (attrs.kind) {
          case 'block':
            return _block2.default.create(attrs);
          case 'document':
            return _document2.default.create(attrs);
          case 'inline':
            return _inline2.default.create(attrs);
          case 'text':
            return _text2.default.create(attrs);
          default:
            {
              throw new Error('`Node.create` requires a `kind` string.');
            }
        }
      }

      throw new Error('`Node.create` only accepts objects or nodes but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Nodes` from an array.
     *
     * @param {Array<Object|Node>} elements
     * @return {List<Node>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (_immutable.List.isList(elements) || Array.isArray(elements)) {
        var list = new _immutable.List(elements.map(Node.create));
        return list;
      }

      throw new Error('`Node.createList` only accepts lists or arrays, but you passed it: ' + elements);
    }

    /**
     * Create a dictionary of settable node properties from `attrs`.
     *
     * @param {Object|String|Node} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (_block2.default.isBlock(attrs) || _inline2.default.isInline(attrs)) {
        return {
          data: attrs.data,
          isVoid: attrs.isVoid,
          type: attrs.type
        };
      }

      if (typeof attrs == 'string') {
        return { type: attrs };
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        var props = {};
        if ('type' in attrs) props.type = attrs.type;
        if ('data' in attrs) props.data = _data2.default.create(attrs.data);
        if ('isVoid' in attrs) props.isVoid = attrs.isVoid;
        return props;
      }

      throw new Error('`Node.createProperties` only accepts objects, strings, blocks or inlines, but you passed it: ' + attrs);
    }

    /**
     * Create a `Node` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Node}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var kind = object.kind;

      switch (kind) {
        case 'block':
          return _block2.default.fromJSON(object);
        case 'document':
          return _document2.default.fromJSON(object);
        case 'inline':
          return _inline2.default.fromJSON(object);
        case 'text':
          return _text2.default.fromJSON(object);
        default:
          {
            throw new Error('`Node.fromJSON` requires a `kind` of either \'block\', \'document\', \'inline\' or \'text\', but you passed: ' + kind);
          }
      }
    }

    /**
     * Alias `fromJS`.
     */

  }, {
    key: 'isNode',

    /**
     * Check if a `value` is a `Node`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

    value: function isNode(value) {
      return _block2.default.isBlock(value) || _document2.default.isDocument(value) || _inline2.default.isInline(value) || _text2.default.isText(value);
    }

    /**
     * Check if a `value` is a list of nodes.
     *
     * @param {Any} value
     * @return {Boolean}
     */

  }, {
    key: 'isNodeList',
    value: function isNodeList(value) {
      return _immutable.List.isList(value) && value.every(function (item) {
        return Node.isNode(item);
      });
    }
  }]);

  return Node;
}();

/**
 * Normalize a key argument `value`.
 *
 * @param {String|Node} value
 * @return {String}
 */

Node.fromJS = Node.fromJSON;
function normalizeKey(value) {
  if (typeof value == 'string') return value;

  _slateDevLogger2.default.deprecate('0.14.0', 'An object was passed to a Node method instead of a `key` string. This was previously supported, but is being deprecated because it can have a negative impact on performance. The object in question was:', value);

  if (Node.isNode(value)) {
    return value.key;
  }

  throw new Error('Invalid `key` argument! It must be either a block, an inline, a text, or a string. You passed: ' + value);
}

/**
 * Memoize read methods.
 */

(0, _memoize2.default)(Node.prototype, ['getBlocks', 'getBlocksAsArray', 'getCharacters', 'getCharactersAsArray', 'getFirstText', 'getInlines', 'getInlinesAsArray', 'getKeys', 'getKeysAsArray', 'getLastText', 'getMarks', 'getOrderedMarks', 'getMarksAsArray', 'getText', 'getTextDirection', 'getTexts', 'getTextsAsArray', 'isLeafBlock', 'isLeafInline'], {
  takesArguments: false
});

(0, _memoize2.default)(Node.prototype, ['areDescendantsSorted', 'getActiveMarksAtRange', 'getActiveMarksAtRangeAsArray', 'getAncestors', 'getBlocksAtRange', 'getBlocksAtRangeAsArray', 'getBlocksByType', 'getBlocksByTypeAsArray', 'getCharactersAtRange', 'getCharactersAtRangeAsArray', 'getChild', 'getChildrenBetween', 'getChildrenBetweenIncluding', 'getClosestBlock', 'getClosestInline', 'getClosestVoid', 'getCommonAncestor', 'getComponent', 'getDecorations', 'getDepth', 'getDescendant', 'getDescendantAtPath', 'getFragmentAtRange', 'getFurthestBlock', 'getFurthestInline', 'getFurthestAncestor', 'getFurthestOnlyChildAncestor', 'getInlinesAtRange', 'getInlinesAtRangeAsArray', 'getInlinesByType', 'getInlinesByTypeAsArray', 'getMarksAtRange', 'getOrderedMarksAtRange', 'getMarksAtRangeAsArray', 'getMarksByType', 'getOrderedMarksByType', 'getMarksByTypeAsArray', 'getNextBlock', 'getNextSibling', 'getNextText', 'getNode', 'getNodeAtPath', 'getOffset', 'getOffsetAtRange', 'getParent', 'getPath', 'getPlaceholder', 'getPreviousBlock', 'getPreviousSibling', 'getPreviousText', 'getTextAtOffset', 'getTextsAtRange', 'getTextsAtRangeAsArray', 'hasChild', 'hasDescendant', 'hasNode', 'hasVoidParent', 'isInlineSplitAtRange', 'validate'], {
  takesArguments: true
});

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = Node;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(52),
    normalizeOpts = __webpack_require__(75),
    isCallable = __webpack_require__(144),
    contains = __webpack_require__(76),
    d;

d = module.exports = function (dscr, value /*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== 'string') {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set /*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsNative = __webpack_require__(189),
    getValue = __webpack_require__(194);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

__webpack_require__(24);

var _isPlainObject = __webpack_require__(3);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _immutable = __webpack_require__(0);

var _modelTypes = __webpack_require__(4);

var _modelTypes2 = _interopRequireDefault(_modelTypes);

var _node = __webpack_require__(17);

var _node2 = _interopRequireDefault(_node);

var _generateKey = __webpack_require__(23);

var _generateKey2 = _interopRequireDefault(_generateKey);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
/**
 * Prevent circular dependencies.
 */

/**
 * Dependencies.
 */

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  data: new _immutable.Map(),
  isVoid: false,
  key: undefined,
  nodes: new _immutable.List(),
  type: undefined
};

/**
 * Block.
 *
 * @type {Block}
 */

var Block = function (_Record) {
  _inherits(Block, _Record);

  function Block() {
    _classCallCheck(this, Block);

    return _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).apply(this, arguments));
  }

  _createClass(Block, [{
    key: 'toJSON',

    /**
     * Return a JSON representation of the block.
     *
     * @param {Object} options
     * @return {Object}
     */

    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        data: this.data.toJSON(),
        key: this.key,
        kind: this.kind,
        isVoid: this.isVoid,
        type: this.type,
        nodes: this.nodes.toArray().map(function (n) {
          return n.toJSON(options);
        })
      };

      if (!options.preserveKeys) {
        delete object.key;
      }

      return object;
    }

    /**
     * Alias `toJS`.
     */

  }, {
    key: 'toJS',
    value: function toJS(options) {
      return this.toJSON(options);
    }
  }, {
    key: 'kind',

    /**
     * Get the node's kind.
     *
     * @return {String}
     */

    get: function get() {
      return 'block';
    }

    /**
     * Check if the block is empty.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isEmpty',
    get: function get() {
      return this.text == '';
    }

    /**
     * Get the concatenated text of all the block's children.
     *
     * @return {String}
     */

  }, {
    key: 'text',
    get: function get() {
      return this.getText();
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Block` from `value`.
     *
     * @param {Object|String|Block} value
     * @return {Block}
     */

    value: function create() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Block.isBlock(value)) {
        return value;
      }

      if (typeof value == 'string') {
        value = { type: value };
      }

      if ((0, _isPlainObject2.default)(value)) {
        return Block.fromJSON(value);
      }

      throw new Error('`Block.create` only accepts objects, strings or blocks, but you passed it: ' + value);
    }

    /**
     * Create a list of `Blocks` from `value`.
     *
     * @param {Array<Block|Object>|List<Block|Object>} value
     * @return {List<Block>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (_immutable.List.isList(value) || Array.isArray(value)) {
        var list = new _immutable.List(value.map(Block.create));
        return list;
      }

      throw new Error('`Block.createList` only accepts arrays or lists, but you passed it: ' + value);
    }

    /**
     * Create a `Block` from a JSON `object`.
     *
     * @param {Object|Block} object
     * @return {Block}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Block.isBlock(object)) {
        return object;
      }

      var _object$data = object.data,
          data = _object$data === undefined ? {} : _object$data,
          _object$isVoid = object.isVoid,
          isVoid = _object$isVoid === undefined ? false : _object$isVoid,
          _object$key = object.key,
          key = _object$key === undefined ? (0, _generateKey2.default)() : _object$key,
          _object$nodes = object.nodes,
          nodes = _object$nodes === undefined ? [] : _object$nodes,
          type = object.type;

      if (typeof type != 'string') {
        throw new Error('`Block.fromJSON` requires a `type` string.');
      }

      var block = new Block({
        key: key,
        type: type,
        isVoid: !!isVoid,
        data: new _immutable.Map(data),
        nodes: new _immutable.List(nodes.map(_node2.default.fromJSON))
      });

      return block;
    }

    /**
     * Alias `fromJS`.
     */

  }, {
    key: 'isBlock',

    /**
     * Check if a `value` is a `Block`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

    value: function isBlock(value) {
      return !!(value && value[_modelTypes2.default.BLOCK]);
    }

    /**
     * Check if a `value` is a block list.
     *
     * @param {Any} value
     * @return {Boolean}
     */

  }, {
    key: 'isBlockList',
    value: function isBlockList(value) {
      return _immutable.List.isList(value) && value.every(function (item) {
        return Block.isBlock(item);
      });
    }
  }]);

  return Block;
}((0, _immutable.Record)(DEFAULTS));

/**
 * Attach a pseudo-symbol for type checking.
 */

Block.fromJS = Block.fromJSON;
Block.prototype[_modelTypes2.default.BLOCK] = true;

/**
 * Mix in `Node` methods.
 */

Object.getOwnPropertyNames(_node2.default.prototype).forEach(function (method) {
  if (method == 'constructor') return;
  Block.prototype[method] = _node2.default.prototype[method];
});

/**
 * Export.
 *
 * @type {Block}
 */

exports.default = Block;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

__webpack_require__(24);

var _isPlainObject = __webpack_require__(3);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _immutable = __webpack_require__(0);

var _node = __webpack_require__(17);

var _node2 = _interopRequireDefault(_node);

var _modelTypes = __webpack_require__(4);

var _modelTypes2 = _interopRequireDefault(_modelTypes);

var _generateKey = __webpack_require__(23);

var _generateKey2 = _interopRequireDefault(_generateKey);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
/**
 * Prevent circular dependencies.
 */

/**
 * Dependencies.
 */

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  data: new _immutable.Map(),
  isVoid: false,
  key: undefined,
  nodes: new _immutable.List(),
  type: undefined
};

/**
 * Inline.
 *
 * @type {Inline}
 */

var Inline = function (_Record) {
  _inherits(Inline, _Record);

  function Inline() {
    _classCallCheck(this, Inline);

    return _possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).apply(this, arguments));
  }

  _createClass(Inline, [{
    key: 'toJSON',

    /**
     * Return a JSON representation of the inline.
     *
     * @param {Object} options
     * @return {Object}
     */

    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        data: this.data.toJSON(),
        key: this.key,
        kind: this.kind,
        isVoid: this.isVoid,
        type: this.type,
        nodes: this.nodes.toArray().map(function (n) {
          return n.toJSON(options);
        })
      };

      if (!options.preserveKeys) {
        delete object.key;
      }

      return object;
    }

    /**
     * Alias `toJS`.
     */

  }, {
    key: 'toJS',
    value: function toJS(options) {
      return this.toJSON(options);
    }
  }, {
    key: 'kind',

    /**
     * Get the node's kind.
     *
     * @return {String}
     */

    get: function get() {
      return 'inline';
    }

    /**
     * Check if the inline is empty.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isEmpty',
    get: function get() {
      return this.text == '';
    }

    /**
     * Get the concatenated text of all the inline's children.
     *
     * @return {String}
     */

  }, {
    key: 'text',
    get: function get() {
      return this.getText();
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Inline` with `attrs`.
     *
     * @param {Object|String|Inline} attrs
     * @return {Inline}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Inline.isInline(attrs)) {
        return attrs;
      }

      if (typeof attrs == 'string') {
        attrs = { type: attrs };
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        return Inline.fromJSON(attrs);
      }

      throw new Error('`Inline.create` only accepts objects, strings or inlines, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Inlines` from an array.
     *
     * @param {Array<Inline|Object>|List<Inline|Object>} elements
     * @return {List<Inline>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (_immutable.List.isList(elements) || Array.isArray(elements)) {
        var list = new _immutable.List(elements.map(Inline.create));
        return list;
      }

      throw new Error('`Inline.createList` only accepts arrays or lists, but you passed it: ' + elements);
    }

    /**
     * Create a `Inline` from a JSON `object`.
     *
     * @param {Object|Inline} object
     * @return {Inline}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Inline.isInline(object)) {
        return object;
      }

      var _object$data = object.data,
          data = _object$data === undefined ? {} : _object$data,
          _object$isVoid = object.isVoid,
          isVoid = _object$isVoid === undefined ? false : _object$isVoid,
          _object$key = object.key,
          key = _object$key === undefined ? (0, _generateKey2.default)() : _object$key,
          _object$nodes = object.nodes,
          nodes = _object$nodes === undefined ? [] : _object$nodes,
          type = object.type;

      if (typeof type != 'string') {
        throw new Error('`Inline.fromJS` requires a `type` string.');
      }

      var inline = new Inline({
        key: key,
        type: type,
        isVoid: !!isVoid,
        data: new _immutable.Map(data),
        nodes: new _immutable.List(nodes.map(_node2.default.fromJSON))
      });

      return inline;
    }

    /**
     * Alias `fromJS`.
     */

  }, {
    key: 'isInline',

    /**
     * Check if a `value` is a `Inline`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

    value: function isInline(value) {
      return !!(value && value[_modelTypes2.default.INLINE]);
    }

    /**
     * Check if a `value` is a list of inlines.
     *
     * @param {Any} value
     * @return {Boolean}
     */

  }, {
    key: 'isInlineList',
    value: function isInlineList(value) {
      return _immutable.List.isList(value) && value.every(function (item) {
        return Inline.isInline(item);
      });
    }
  }]);

  return Inline;
}((0, _immutable.Record)(DEFAULTS));

/**
 * Attach a pseudo-symbol for type checking.
 */

Inline.fromJS = Inline.fromJSON;
Inline.prototype[_modelTypes2.default.INLINE] = true;

/**
 * Mix in `Node` methods.
 */

Object.getOwnPropertyNames(_node2.default.prototype).forEach(function (method) {
  if (method == 'constructor') return;
  Inline.prototype[method] = _node2.default.prototype[method];
});

/**
 * Export.
 *
 * @type {Inline}
 */

exports.default = Inline;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__(71)(); // Support ES3 engines

module.exports = function (val) {
  return val !== _undefined && val !== null;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * An auto-incrementing index for generating keys.
 *
 * @type {Number}
 */

var n = void 0;

/**
 * The global key generating function.
 *
 * @type {Function}
 */

var generate = void 0;

/**
 * Generate a key.
 *
 * @return {String}
 */

function generateKey() {
  return generate();
}

/**
 * Set a different unique ID generating `function`.
 *
 * @param {Function} func
 */

function setKeyGenerator(func) {
  generate = func;
}

/**
 * Reset the key generating function to its initial state.
 */

function resetKeyGenerator() {
  n = 0;
  generate = function generate() {
    return "" + n++;
  };
}

/**
 * Set the initial state.
 */

resetKeyGenerator();

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = generateKey;
exports.setKeyGenerator = setKeyGenerator;
exports.resetKeyGenerator = resetKeyGenerator;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

__webpack_require__(20);

__webpack_require__(21);

var _isPlainObject = __webpack_require__(3);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _immutable = __webpack_require__(0);

var _node = __webpack_require__(17);

var _node2 = _interopRequireDefault(_node);

var _modelTypes = __webpack_require__(4);

var _modelTypes2 = _interopRequireDefault(_modelTypes);

var _generateKey = __webpack_require__(23);

var _generateKey2 = _interopRequireDefault(_generateKey);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
/**
 * Prevent circular dependencies.
 */

/**
 * Dependencies.
 */

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  data: new _immutable.Map(),
  key: undefined,
  nodes: new _immutable.List()
};

/**
 * Document.
 *
 * @type {Document}
 */

var Document = function (_Record) {
  _inherits(Document, _Record);

  function Document() {
    _classCallCheck(this, Document);

    return _possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).apply(this, arguments));
  }

  _createClass(Document, [{
    key: 'toJSON',

    /**
     * Return a JSON representation of the document.
     *
     * @param {Object} options
     * @return {Object}
     */

    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        data: this.data.toJSON(),
        key: this.key,
        kind: this.kind,
        nodes: this.nodes.toArray().map(function (n) {
          return n.toJSON(options);
        })
      };

      if (!options.preserveKeys) {
        delete object.key;
      }

      return object;
    }

    /**
     * Alias `toJS`.
     */

  }, {
    key: 'toJS',
    value: function toJS(options) {
      return this.toJSON(options);
    }
  }, {
    key: 'kind',

    /**
     * Get the node's kind.
     *
     * @return {String}
     */

    get: function get() {
      return 'document';
    }

    /**
     * Check if the document is empty.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isEmpty',
    get: function get() {
      return this.text == '';
    }

    /**
     * Get the concatenated text of all the document's children.
     *
     * @return {String}
     */

  }, {
    key: 'text',
    get: function get() {
      return this.getText();
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Document` with `attrs`.
     *
     * @param {Object|Array|List|Text} attrs
     * @return {Document}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Document.isDocument(attrs)) {
        return attrs;
      }

      if (_immutable.List.isList(attrs) || Array.isArray(attrs)) {
        attrs = { nodes: attrs };
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        return Document.fromJSON(attrs);
      }

      throw new Error('`Document.create` only accepts objects, arrays, lists or documents, but you passed it: ' + attrs);
    }

    /**
     * Create a `Document` from a JSON `object`.
     *
     * @param {Object|Document} object
     * @return {Document}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Document.isDocument(object)) {
        return object;
      }

      var _object$data = object.data,
          data = _object$data === undefined ? {} : _object$data,
          _object$key = object.key,
          key = _object$key === undefined ? (0, _generateKey2.default)() : _object$key,
          _object$nodes = object.nodes,
          nodes = _object$nodes === undefined ? [] : _object$nodes;

      var document = new Document({
        key: key,
        data: new _immutable.Map(data),
        nodes: new _immutable.List(nodes.map(_node2.default.fromJSON))
      });

      return document;
    }

    /**
     * Alias `fromJS`.
     */

  }, {
    key: 'isDocument',

    /**
     * Check if a `value` is a `Document`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

    value: function isDocument(value) {
      return !!(value && value[_modelTypes2.default.DOCUMENT]);
    }
  }]);

  return Document;
}((0, _immutable.Record)(DEFAULTS));

/**
 * Attach a pseudo-symbol for type checking.
 */

Document.fromJS = Document.fromJSON;
Document.prototype[_modelTypes2.default.DOCUMENT] = true;

/**
 * Mix in `Node` methods.
 */

Object.getOwnPropertyNames(_node2.default.prototype).forEach(function (method) {
  if (method == 'constructor') return;
  Document.prototype[method] = _node2.default.prototype[method];
});

/**
 * Export.
 *
 * @type {Document}
 */

exports.default = Document;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(26),
    getRawTag = __webpack_require__(190),
    objectToString = __webpack_require__(191);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

module.exports = baseGetTag;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(10);

/** Built-in value references. */
var _Symbol = root.Symbol;

module.exports = _Symbol;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

module.exports = isObjectLike;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(43);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

module.exports = toKey;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _isPlainObject = __webpack_require__(3);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _immutable = __webpack_require__(0);

var _modelTypes = __webpack_require__(4);

var _modelTypes2 = _interopRequireDefault(_modelTypes);

var _mark = __webpack_require__(15);

var _mark2 = _interopRequireDefault(_mark);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  anchorKey: null,
  anchorOffset: 0,
  focusKey: null,
  focusOffset: 0,
  isBackward: null,
  isFocused: false,
  marks: null
};

/**
 * Range.
 *
 * @type {Range}
 */

var Range = function (_Record) {
  _inherits(Range, _Record);

  function Range() {
    _classCallCheck(this, Range);

    return _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).apply(this, arguments));
  }

  _createClass(Range, [{
    key: 'hasAnchorAtStartOf',

    /**
     * Check whether anchor point of the range is at the start of a `node`.
     *
     * @param {Node} node
     * @return {Boolean}
     */

    value: function hasAnchorAtStartOf(node) {
      // PERF: Do a check for a `0` offset first since it's quickest.
      if (this.anchorOffset != 0) return false;
      var first = getFirst(node);
      return this.anchorKey == first.key;
    }

    /**
     * Check whether anchor point of the range is at the end of a `node`.
     *
     * @param {Node} node
     * @return {Boolean}
     */

  }, {
    key: 'hasAnchorAtEndOf',
    value: function hasAnchorAtEndOf(node) {
      var last = getLast(node);
      return this.anchorKey == last.key && this.anchorOffset == last.text.length;
    }

    /**
     * Check whether the anchor edge of a range is in a `node` and at an
     * offset between `start` and `end`.
     *
     * @param {Node} node
     * @param {Number} start
     * @param {Number} end
     * @return {Boolean}
     */

  }, {
    key: 'hasAnchorBetween',
    value: function hasAnchorBetween(node, start, end) {
      return this.anchorOffset <= end && start <= this.anchorOffset && this.hasAnchorIn(node);
    }

    /**
     * Check whether the anchor edge of a range is in a `node`.
     *
     * @param {Node} node
     * @return {Boolean}
     */

  }, {
    key: 'hasAnchorIn',
    value: function hasAnchorIn(node) {
      return node.kind == 'text' ? node.key == this.anchorKey : this.anchorKey != null && node.hasDescendant(this.anchorKey);
    }

    /**
     * Check whether focus point of the range is at the end of a `node`.
     *
     * @param {Node} node
     * @return {Boolean}
     */

  }, {
    key: 'hasFocusAtEndOf',
    value: function hasFocusAtEndOf(node) {
      var last = getLast(node);
      return this.focusKey == last.key && this.focusOffset == last.text.length;
    }

    /**
     * Check whether focus point of the range is at the start of a `node`.
     *
     * @param {Node} node
     * @return {Boolean}
     */

  }, {
    key: 'hasFocusAtStartOf',
    value: function hasFocusAtStartOf(node) {
      if (this.focusOffset != 0) return false;
      var first = getFirst(node);
      return this.focusKey == first.key;
    }

    /**
     * Check whether the focus edge of a range is in a `node` and at an
     * offset between `start` and `end`.
     *
     * @param {Node} node
     * @param {Number} start
     * @param {Number} end
     * @return {Boolean}
     */

  }, {
    key: 'hasFocusBetween',
    value: function hasFocusBetween(node, start, end) {
      return start <= this.focusOffset && this.focusOffset <= end && this.hasFocusIn(node);
    }

    /**
     * Check whether the focus edge of a range is in a `node`.
     *
     * @param {Node} node
     * @return {Boolean}
     */

  }, {
    key: 'hasFocusIn',
    value: function hasFocusIn(node) {
      return node.kind == 'text' ? node.key == this.focusKey : this.focusKey != null && node.hasDescendant(this.focusKey);
    }

    /**
     * Check whether the range is at the start of a `node`.
     *
     * @param {Node} node
     * @return {Boolean}
     */

  }, {
    key: 'isAtStartOf',
    value: function isAtStartOf(node) {
      return this.isCollapsed && this.hasAnchorAtStartOf(node);
    }

    /**
     * Check whether the range is at the end of a `node`.
     *
     * @param {Node} node
     * @return {Boolean}
     */

  }, {
    key: 'isAtEndOf',
    value: function isAtEndOf(node) {
      return this.isCollapsed && this.hasAnchorAtEndOf(node);
    }

    /**
     * Focus the range.
     *
     * @return {Range}
     */

  }, {
    key: 'focus',
    value: function focus() {
      return this.merge({
        isFocused: true
      });
    }

    /**
     * Blur the range.
     *
     * @return {Range}
     */

  }, {
    key: 'blur',
    value: function blur() {
      return this.merge({
        isFocused: false
      });
    }

    /**
     * Unset the range.
     *
     * @return {Range}
     */

  }, {
    key: 'deselect',
    value: function deselect() {
      return this.merge({
        anchorKey: null,
        anchorOffset: 0,
        focusKey: null,
        focusOffset: 0,
        isFocused: false,
        isBackward: false
      });
    }

    /**
     * Flip the range.
     *
     * @return {Range}
     */

  }, {
    key: 'flip',
    value: function flip() {
      return this.merge({
        anchorKey: this.focusKey,
        anchorOffset: this.focusOffset,
        focusKey: this.anchorKey,
        focusOffset: this.anchorOffset,
        isBackward: this.isBackward == null ? null : !this.isBackward
      });
    }

    /**
     * Move the anchor offset `n` characters.
     *
     * @param {Number} n (optional)
     * @return {Range}
     */

  }, {
    key: 'moveAnchor',
    value: function moveAnchor() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var anchorKey = this.anchorKey,
          focusKey = this.focusKey,
          focusOffset = this.focusOffset,
          isBackward = this.isBackward;

      var anchorOffset = this.anchorOffset + n;
      return this.merge({
        anchorOffset: anchorOffset,
        isBackward: anchorKey == focusKey ? anchorOffset > focusOffset : isBackward
      });
    }

    /**
     * Move the anchor offset `n` characters.
     *
     * @param {Number} n (optional)
     * @return {Range}
     */

  }, {
    key: 'moveFocus',
    value: function moveFocus() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var anchorKey = this.anchorKey,
          anchorOffset = this.anchorOffset,
          focusKey = this.focusKey,
          isBackward = this.isBackward;

      var focusOffset = this.focusOffset + n;
      return this.merge({
        focusOffset: focusOffset,
        isBackward: focusKey == anchorKey ? anchorOffset > focusOffset : isBackward
      });
    }

    /**
     * Move the range's anchor point to a `key` and `offset`.
     *
     * @param {String} key
     * @param {Number} offset
     * @return {Range}
     */

  }, {
    key: 'moveAnchorTo',
    value: function moveAnchorTo(key, offset) {
      var anchorKey = this.anchorKey,
          focusKey = this.focusKey,
          focusOffset = this.focusOffset,
          isBackward = this.isBackward;

      return this.merge({
        anchorKey: key,
        anchorOffset: offset,
        isBackward: key == focusKey ? offset > focusOffset : key == anchorKey ? isBackward : null
      });
    }

    /**
     * Move the range's focus point to a `key` and `offset`.
     *
     * @param {String} key
     * @param {Number} offset
     * @return {Range}
     */

  }, {
    key: 'moveFocusTo',
    value: function moveFocusTo(key, offset) {
      var focusKey = this.focusKey,
          anchorKey = this.anchorKey,
          anchorOffset = this.anchorOffset,
          isBackward = this.isBackward;

      return this.merge({
        focusKey: key,
        focusOffset: offset,
        isBackward: key == anchorKey ? anchorOffset > offset : key == focusKey ? isBackward : null
      });
    }

    /**
     * Move the range to `anchorOffset`.
     *
     * @param {Number} anchorOffset
     * @return {Range}
     */

  }, {
    key: 'moveAnchorOffsetTo',
    value: function moveAnchorOffsetTo(anchorOffset) {
      return this.merge({
        anchorOffset: anchorOffset,
        isBackward: this.anchorKey == this.focusKey ? anchorOffset > this.focusOffset : this.isBackward
      });
    }

    /**
     * Move the range to `focusOffset`.
     *
     * @param {Number} focusOffset
     * @return {Range}
     */

  }, {
    key: 'moveFocusOffsetTo',
    value: function moveFocusOffsetTo(focusOffset) {
      return this.merge({
        focusOffset: focusOffset,
        isBackward: this.anchorKey == this.focusKey ? this.anchorOffset > focusOffset : this.isBackward
      });
    }

    /**
     * Move the range to `anchorOffset` and `focusOffset`.
     *
     * @param {Number} anchorOffset
     * @param {Number} focusOffset (optional)
     * @return {Range}
     */

  }, {
    key: 'moveOffsetsTo',
    value: function moveOffsetsTo(anchorOffset) {
      var focusOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : anchorOffset;

      return this.moveAnchorOffsetTo(anchorOffset).moveFocusOffsetTo(focusOffset);
    }

    /**
     * Move the focus point to the anchor point.
     *
     * @return {Range}
     */

  }, {
    key: 'moveToAnchor',
    value: function moveToAnchor() {
      return this.moveFocusTo(this.anchorKey, this.anchorOffset);
    }

    /**
     * Move the anchor point to the focus point.
     *
     * @return {Range}
     */

  }, {
    key: 'moveToFocus',
    value: function moveToFocus() {
      return this.moveAnchorTo(this.focusKey, this.focusOffset);
    }

    /**
     * Move the range's anchor point to the start of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveAnchorToStartOf',
    value: function moveAnchorToStartOf(node) {
      node = getFirst(node);
      return this.moveAnchorTo(node.key, 0);
    }

    /**
     * Move the range's anchor point to the end of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveAnchorToEndOf',
    value: function moveAnchorToEndOf(node) {
      node = getLast(node);
      return this.moveAnchorTo(node.key, node.text.length);
    }

    /**
     * Move the range's focus point to the start of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveFocusToStartOf',
    value: function moveFocusToStartOf(node) {
      node = getFirst(node);
      return this.moveFocusTo(node.key, 0);
    }

    /**
     * Move the range's focus point to the end of a `node`.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'moveFocusToEndOf',
    value: function moveFocusToEndOf(node) {
      node = getLast(node);
      return this.moveFocusTo(node.key, node.text.length);
    }

    /**
     * Move to the entire range of `start` and `end` nodes.
     *
     * @param {Node} start
     * @param {Node} end (optional)
     * @return {Range}
     */

  }, {
    key: 'moveToRangeOf',
    value: function moveToRangeOf(start) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : start;

      return this.moveAnchorToStartOf(start).moveFocusToEndOf(end);
    }

    /**
     * Normalize the range, relative to a `node`, ensuring that the anchor
     * and focus nodes of the range always refer to leaf text nodes.
     *
     * @param {Node} node
     * @return {Range}
     */

  }, {
    key: 'normalize',
    value: function normalize(node) {
      var range = this;
      var anchorKey = range.anchorKey,
          anchorOffset = range.anchorOffset,
          focusKey = range.focusKey,
          focusOffset = range.focusOffset,
          isBackward = range.isBackward;

      // If the range is unset, make sure it is properly zeroed out.

      if (anchorKey == null || focusKey == null) {
        return range.merge({
          anchorKey: null,
          anchorOffset: 0,
          focusKey: null,
          focusOffset: 0,
          isBackward: false
        });
      }

      // Get the anchor and focus nodes.
      var anchorNode = node.getDescendant(anchorKey);
      var focusNode = node.getDescendant(focusKey);

      // If the range is malformed, warn and zero it out.
      if (!anchorNode || !focusNode) {
        _slateDevLogger2.default.warn('The range was invalid and was reset. The range in question was:', range);
        var first = node.getFirstText();
        return range.merge({
          anchorKey: first ? first.key : null,
          anchorOffset: 0,
          focusKey: first ? first.key : null,
          focusOffset: 0,
          isBackward: false
        });
      }

      // If the anchor node isn't a text node, match it to one.
      if (anchorNode.kind != 'text') {
        _slateDevLogger2.default.warn('The range anchor was set to a Node that is not a Text node. This should not happen and can degrade performance. The node in question was:', anchorNode);
        var anchorText = anchorNode.getTextAtOffset(anchorOffset);
        var offset = anchorNode.getOffset(anchorText.key);
        anchorOffset = anchorOffset - offset;
        anchorNode = anchorText;
      }

      // If the focus node isn't a text node, match it to one.
      if (focusNode.kind != 'text') {
        _slateDevLogger2.default.warn('The range focus was set to a Node that is not a Text node. This should not happen and can degrade performance. The node in question was:', focusNode);
        var focusText = focusNode.getTextAtOffset(focusOffset);
        var _offset = focusNode.getOffset(focusText.key);
        focusOffset = focusOffset - _offset;
        focusNode = focusText;
      }

      // If `isBackward` is not set, derive it.
      if (isBackward == null) {
        if (anchorNode.key === focusNode.key) {
          isBackward = anchorOffset > focusOffset;
        } else {
          isBackward = !node.areDescendantsSorted(anchorNode.key, focusNode.key);
        }
      }

      // Merge in any updated properties.
      return range.merge({
        anchorKey: anchorNode.key,
        anchorOffset: anchorOffset,
        focusKey: focusNode.key,
        focusOffset: focusOffset,
        isBackward: isBackward
      });
    }

    /**
     * Return a JSON representation of the range.
     *
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var object = {
        anchorKey: this.anchorKey,
        anchorOffset: this.anchorOffset,
        focusKey: this.focusKey,
        focusOffset: this.focusOffset,
        isBackward: this.isBackward,
        isFocused: this.isFocused,
        kind: this.kind,
        marks: this.marks == null ? null : this.marks.toArray().map(function (m) {
          return m.toJSON();
        })
      };

      return object;
    }

    /**
     * Alias `toJS`.
     */

  }, {
    key: 'toJS',
    value: function toJS() {
      return this.toJSON();
    }

    /**
     * Unset the range.
     *
     * @return {Range}
     */

  }, {
    key: 'unset',
    value: function unset() {
      _slateDevLogger2.default.deprecate('0.17.0', 'The `Range.unset` method is deprecated, please switch to using `Range.deselect` instead.');
      return this.deselect();
    }

    /**
     * Move the range forward `n` characters.
     *
     * @param {Number} n (optional)
     * @return {Range}
     */

  }, {
    key: 'moveForward',
    value: function moveForward() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      _slateDevLogger2.default.deprecate('0.17.0', 'The `Range.moveForward(n)` method is deprecated, please switch to using `Range.move(n)` instead.');
      return this.move(n);
    }

    /**
     * Move the range backward `n` characters.
     *
     * @param {Number} n (optional)
     * @return {Range}
     */

  }, {
    key: 'moveBackward',
    value: function moveBackward() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      _slateDevLogger2.default.deprecate('0.17.0', 'The `Range.moveBackward(n)` method is deprecated, please switch to using `Range.move(-n)` (with a negative number) instead.');
      return this.move(0 - n);
    }

    /**
     * Move the anchor offset `n` characters.
     *
     * @param {Number} n (optional)
     * @return {Range}
     */

  }, {
    key: 'moveAnchorOffset',
    value: function moveAnchorOffset() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      _slateDevLogger2.default.deprecate('0.17.0', 'The `Range.moveAnchorOffset(n)` method is deprecated, please switch to using `Range.moveAnchor(n)` instead.');
      return this.moveAnchor(n);
    }

    /**
     * Move the focus offset `n` characters.
     *
     * @param {Number} n (optional)
     * @return {Range}
     */

  }, {
    key: 'moveFocusOffset',
    value: function moveFocusOffset() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      _slateDevLogger2.default.deprecate('0.17.0', 'The `Range.moveFocusOffset(n)` method is deprecated, please switch to using `Range.moveFocus(n)` instead.');
      return this.moveFocus(n);
    }

    /**
     * Move the start offset `n` characters.
     *
     * @param {Number} n (optional)
     * @return {Range}
     */

  }, {
    key: 'moveStartOffset',
    value: function moveStartOffset() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      _slateDevLogger2.default.deprecate('0.17.0', 'The `Range.moveStartOffset(n)` method is deprecated, please switch to using `Range.moveStart(n)` instead.');
      return this.moveStart(n);
    }

    /**
     * Move the focus offset `n` characters.
     *
     * @param {Number} n (optional)
     * @return {Range}
     */

  }, {
    key: 'moveEndOffset',
    value: function moveEndOffset() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      _slateDevLogger2.default.deprecate('0.17.0', 'The `Range.moveEndOffset(n)` method is deprecated, please switch to using `Range.moveEnd(n)` instead.');
      return this.moveEnd(n);
    }

    /**
     * Extend the focus point forward `n` characters.
     *
     * @param {Number} n (optional)
     * @return {Range}
     */

  }, {
    key: 'extendForward',
    value: function extendForward() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      _slateDevLogger2.default.deprecate('0.17.0', 'The `Range.extendForward(n)` method is deprecated, please switch to using `Range.extend(n)` instead.');
      return this.extend(n);
    }

    /**
     * Extend the focus point backward `n` characters.
     *
     * @param {Number} n (optional)
     * @return {Range}
     */

  }, {
    key: 'extendBackward',
    value: function extendBackward() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      _slateDevLogger2.default.deprecate('0.17.0', 'The `Range.extendBackward(n)` method is deprecated, please switch to using `Range.extend(-n)` (with a negative number) instead.');
      return this.extend(0 - n);
    }

    /**
     * Move the range to `anchorOffset` and `focusOffset`.
     *
     * @param {Number} anchorOffset
     * @param {Number} focusOffset (optional)
     * @return {Range}
     */

  }, {
    key: 'moveToOffsets',
    value: function moveToOffsets(anchorOffset) {
      var focusOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : anchorOffset;

      _slateDevLogger2.default.deprecate('0.17.0', 'The `Range.moveToOffsets` method is deprecated, please switch to using `Range.moveOffsetsTo` instead.');
      return this.moveOffsetsTo(anchorOffset, focusOffset);
    }
  }, {
    key: 'kind',

    /**
     * Get the kind.
     *
     * @return {String}
     */

    get: function get() {
      return 'range';
    }

    /**
     * Check whether the range is blurred.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isBlurred',
    get: function get() {
      return !this.isFocused;
    }

    /**
     * Check whether the range is collapsed.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isCollapsed',
    get: function get() {
      return this.anchorKey == this.focusKey && this.anchorOffset == this.focusOffset;
    }

    /**
     * Check whether the range is expanded.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isExpanded',
    get: function get() {
      return !this.isCollapsed;
    }

    /**
     * Check whether the range is forward.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isForward',
    get: function get() {
      return this.isBackward == null ? null : !this.isBackward;
    }

    /**
     * Check whether the range's keys are set.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isSet',
    get: function get() {
      return this.anchorKey != null && this.focusKey != null;
    }

    /**
     * Check whether the range's keys are not set.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isUnset',
    get: function get() {
      return !this.isSet;
    }

    /**
     * Get the start key.
     *
     * @return {String}
     */

  }, {
    key: 'startKey',
    get: function get() {
      return this.isBackward ? this.focusKey : this.anchorKey;
    }

    /**
     * Get the start offset.
     *
     * @return {String}
     */

  }, {
    key: 'startOffset',
    get: function get() {
      return this.isBackward ? this.focusOffset : this.anchorOffset;
    }

    /**
     * Get the end key.
     *
     * @return {String}
     */

  }, {
    key: 'endKey',
    get: function get() {
      return this.isBackward ? this.anchorKey : this.focusKey;
    }

    /**
     * Get the end offset.
     *
     * @return {String}
     */

  }, {
    key: 'endOffset',
    get: function get() {
      return this.isBackward ? this.anchorOffset : this.focusOffset;
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Range` with `attrs`.
     *
     * @param {Object|Range} attrs
     * @return {Range}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Range.isRange(attrs)) {
        return attrs;
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        return Range.fromJSON(attrs);
      }

      throw new Error('`Range.create` only accepts objects or ranges, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Ranges` from a `value`.
     *
     * @param {Array<Range|Object>|List<Range|Object>} value
     * @return {List<Range>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (_immutable.List.isList(value) || Array.isArray(value)) {
        var list = new _immutable.List(value.map(Range.create));
        return list;
      }

      throw new Error('`Range.createList` only accepts arrays or lists, but you passed it: ' + value);
    }

    /**
     * Create a dictionary of settable range properties from `attrs`.
     *
     * @param {Object|String|Range} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Range.isRange(attrs)) {
        return {
          anchorKey: attrs.anchorKey,
          anchorOffset: attrs.anchorOffset,
          focusKey: attrs.focusKey,
          focusOffset: attrs.focusOffset,
          isBackward: attrs.isBackward,
          isFocused: attrs.isFocused,
          marks: attrs.marks
        };
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        var props = {};
        if ('anchorKey' in attrs) props.anchorKey = attrs.anchorKey;
        if ('anchorOffset' in attrs) props.anchorOffset = attrs.anchorOffset;
        if ('focusKey' in attrs) props.focusKey = attrs.focusKey;
        if ('focusOffset' in attrs) props.focusOffset = attrs.focusOffset;
        if ('isBackward' in attrs) props.isBackward = attrs.isBackward;
        if ('isFocused' in attrs) props.isFocused = attrs.isFocused;
        if ('marks' in attrs) props.marks = attrs.marks;
        return props;
      }

      throw new Error('`Range.createProperties` only accepts objects or ranges, but you passed it: ' + attrs);
    }

    /**
     * Create a `Range` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Range}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var _object$anchorKey = object.anchorKey,
          anchorKey = _object$anchorKey === undefined ? null : _object$anchorKey,
          _object$anchorOffset = object.anchorOffset,
          anchorOffset = _object$anchorOffset === undefined ? 0 : _object$anchorOffset,
          _object$focusKey = object.focusKey,
          focusKey = _object$focusKey === undefined ? null : _object$focusKey,
          _object$focusOffset = object.focusOffset,
          focusOffset = _object$focusOffset === undefined ? 0 : _object$focusOffset,
          _object$isBackward = object.isBackward,
          isBackward = _object$isBackward === undefined ? null : _object$isBackward,
          _object$isFocused = object.isFocused,
          isFocused = _object$isFocused === undefined ? false : _object$isFocused,
          _object$marks = object.marks,
          marks = _object$marks === undefined ? null : _object$marks;

      var range = new Range({
        anchorKey: anchorKey,
        anchorOffset: anchorOffset,
        focusKey: focusKey,
        focusOffset: focusOffset,
        isBackward: isBackward,
        isFocused: isFocused,
        marks: marks == null ? null : new _immutable.Set(marks.map(_mark2.default.fromJSON))
      });

      return range;
    }

    /**
     * Alias `fromJS`.
     */

  }, {
    key: 'isRange',

    /**
     * Check if a `value` is a `Range`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

    value: function isRange(value) {
      return !!(value && value[_modelTypes2.default.RANGE]);
    }
  }]);

  return Range;
}((0, _immutable.Record)(DEFAULTS));

/**
 * Attach a pseudo-symbol for type checking.
 */

Range.fromJS = Range.fromJSON;
Range.prototype[_modelTypes2.default.RANGE] = true;

/**
 * Mix in some "move" convenience methods.
 */

var MOVE_METHODS = [['move', ''], ['move', 'To'], ['move', 'ToStartOf'], ['move', 'ToEndOf']];

MOVE_METHODS.forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      p = _ref2[0],
      s = _ref2[1];

  Range.prototype['' + p + s] = function () {
    var _ref3;

    return (_ref3 = this[p + 'Anchor' + s].apply(this, arguments))[p + 'Focus' + s].apply(_ref3, arguments);
  };
});

/**
 * Mix in the "start", "end" and "edge" convenience methods.
 */

var EDGE_METHODS = [['has', 'AtStartOf', true], ['has', 'AtEndOf', true], ['has', 'Between', true], ['has', 'In', true], ['collapseTo', ''], ['move', ''], ['moveTo', ''], ['move', 'To'], ['move', 'OffsetTo']];

EDGE_METHODS.forEach(function (_ref4) {
  var _ref5 = _slicedToArray(_ref4, 3),
      p = _ref5[0],
      s = _ref5[1],
      hasEdge = _ref5[2];

  var anchor = p + 'Anchor' + s;
  var focus = p + 'Focus' + s;

  Range.prototype[p + 'Start' + s] = function () {
    return this.isBackward ? this[focus].apply(this, arguments) : this[anchor].apply(this, arguments);
  };

  Range.prototype[p + 'End' + s] = function () {
    return this.isBackward ? this[anchor].apply(this, arguments) : this[focus].apply(this, arguments);
  };

  if (hasEdge) {
    Range.prototype[p + 'Edge' + s] = function () {
      return this[anchor].apply(this, arguments) || this[focus].apply(this, arguments);
    };
  }
});

/**
 * Mix in some aliases for convenience / parallelism with the browser APIs.
 */

var ALIAS_METHODS = [['collapseTo', 'moveTo'], ['collapseToAnchor', 'moveToAnchor'], ['collapseToFocus', 'moveToFocus'], ['collapseToStart', 'moveToStart'], ['collapseToEnd', 'moveToEnd'], ['collapseToStartOf', 'moveToStartOf'], ['collapseToEndOf', 'moveToEndOf'], ['extend', 'moveFocus'], ['extendTo', 'moveFocusTo'], ['extendToStartOf', 'moveFocusToStartOf'], ['extendToEndOf', 'moveFocusToEndOf']];

ALIAS_METHODS.forEach(function (_ref6) {
  var _ref7 = _slicedToArray(_ref6, 2),
      alias = _ref7[0],
      method = _ref7[1];

  Range.prototype[alias] = function () {
    return this[method].apply(this, arguments);
  };
});

/**
 * Get the first text of a `node`.
 *
 * @param {Node} node
 * @return {Text}
 */

function getFirst(node) {
  return node.kind == 'text' ? node : node.getFirstText();
}

/**
 * Get the last text of a `node`.
 *
 * @param {Node} node
 * @return {Text}
 */

function getLast(node) {
  return node.kind == 'text' ? node : node.getLastText();
}

/**
 * Export.
 *
 * @type {Range}
 */

exports.default = Range;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUPPORTED_EVENTS = exports.IS_WINDOWS = exports.IS_MAC = exports.IS_IOS = exports.IS_IE = exports.IS_SAFARI = exports.IS_FIREFOX = exports.IS_CHROME = undefined;

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _isInBrowser = __webpack_require__(291);

var _isInBrowser2 = _interopRequireDefault(_isInBrowser);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Browser matching rules.
 *
 * @type {Array}
 */

var BROWSER_RULES = [['edge', /Edge\/([0-9\._]+)/], ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/], ['opera', /Opera\/([0-9\.]+)(?:\s|$)/], ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/], ['ie', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/], ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/], ['ie', /MSIE\s(7\.0)/], ['android', /Android\s([0-9\.]+)/], ['safari', /Version\/([0-9\._]+).*Safari/]];

/**
 * DOM event matching rules.
 *
 * @type {Array}
 */

var EVENT_RULES = [['beforeinput', function (el) {
  return 'onbeforeinput' in el;
}]];

/**
 * Operating system matching rules.
 *
 * @type {Array}
 */

var OS_RULES = [['macos', /mac os x/i], ['ios', /os ([\.\_\d]+) like mac os/i], ['android', /android/i], ['firefoxos', /mozilla\/[a-z\.\_\d]+ \((?:mobile)|(?:tablet)/i], ['windows', /windows\s*(?:nt)?\s*([\.\_\d]+)/i]];

/**
 * Define variables to store the result.
 */

var BROWSER = void 0;
var EVENTS = {};
var OS = void 0;

/**
 * Run the matchers when in browser.
 */

if (_isInBrowser2.default) {
  var userAgent = window.navigator.userAgent;

  for (var i = 0; i < BROWSER_RULES.length; i++) {
    var _BROWSER_RULES$i = _slicedToArray(BROWSER_RULES[i], 2),
        name = _BROWSER_RULES$i[0],
        regexp = _BROWSER_RULES$i[1];

    if (regexp.test(userAgent)) {
      BROWSER = name;
      break;
    }
  }

  for (var _i = 0; _i < OS_RULES.length; _i++) {
    var _OS_RULES$_i = _slicedToArray(OS_RULES[_i], 2),
        name = _OS_RULES$_i[0],
        regexp = _OS_RULES$_i[1];

    if (regexp.test(userAgent)) {
      OS = name;
      break;
    }
  }

  var testEl = window.document.createElement('div');
  testEl.contentEditable = true;

  for (var _i2 = 0; _i2 < EVENT_RULES.length; _i2++) {
    var _EVENT_RULES$_i = _slicedToArray(EVENT_RULES[_i2], 2),
        name = _EVENT_RULES$_i[0],
        testFn = _EVENT_RULES$_i[1];

    EVENTS[name] = testFn(testEl);
  }
}

/**
 * Export.
 *
 * @type {Object}
 */

var IS_CHROME = exports.IS_CHROME = BROWSER === 'chrome';
var IS_FIREFOX = exports.IS_FIREFOX = BROWSER === 'firefox';
var IS_SAFARI = exports.IS_SAFARI = BROWSER === 'safari';
var IS_IE = exports.IS_IE = BROWSER === 'ie';

var IS_IOS = exports.IS_IOS = OS === 'ios';
var IS_MAC = exports.IS_MAC = OS === 'macos';
var IS_WINDOWS = exports.IS_WINDOWS = OS === 'windows';

var SUPPORTED_EVENTS = exports.SUPPORTED_EVENTS = EVENTS;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _isPlainObject = __webpack_require__(3);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _immutable = __webpack_require__(0);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Data.
 *
 * This isn't an immutable record, it's just a thin wrapper around `Map` so that
 * we can allow for more convenient creation.
 *
 * @type {Object}
 */

var Data = function () {
  function Data() {
    _classCallCheck(this, Data);
  }

  _createClass(Data, null, [{
    key: 'create',

    /**
     * Create a new `Data` with `attrs`.
     *
     * @param {Object|Data|Map} attrs
     * @return {Data} data
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (_immutable.Map.isMap(attrs)) {
        return attrs;
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        return Data.fromJSON(attrs);
      }

      throw new Error('`Data.create` only accepts objects or maps, but you passed it: ' + attrs);
    }

    /**
     * Create a `Data` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Data}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      return new _immutable.Map(object);
    }

    /**
     * Alias `fromJS`.
     */

  }]);

  return Data;
}();

/**
 * Export.
 *
 * @type {Object}
 */

Data.fromJS = Data.fromJSON;
exports.default = Data;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(73)() ? Object.setPrototypeOf : __webpack_require__(74);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objToString = Object.prototype.toString,
    id = objToString.call(function () {
	return arguments;
}());

module.exports = function (value) {
	return objToString.call(value) === id;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var objToString = Object.prototype.toString,
    id = objToString.call("");

module.exports = function (value) {
	return typeof value === "string" || value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && (value instanceof String || objToString.call(value) === id) || false;
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = __webpack_require__(0);

var _schema = __webpack_require__(37);

var _schema2 = _interopRequireDefault(_schema);

var _text = __webpack_require__(49);

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Options object with normalize set to `false`.
 *
 * @type {Object}
 */

var OPTS = { normalize: false };

/**
 * Define the core schema rules, order-sensitive.
 *
 * @type {Array}
 */

var rules = [

/**
 * Only allow block nodes in documents.
 *
 * @type {Object}
 */

{
  match: function match(node) {
    return node.kind == 'document';
  },
  validate: function validate(document) {
    var invalids = document.nodes.filter(function (n) {
      return n.kind != 'block';
    });
    return invalids.size ? invalids : null;
  },
  normalize: function normalize(change, document, invalids) {
    invalids.forEach(function (node) {
      change.removeNodeByKey(node.key, OPTS);
    });
  }
},

/**
 * Only allow block nodes or inline and text nodes in blocks.
 *
 * @type {Object}
 */

{
  match: function match(node) {
    return node.kind == 'block';
  },
  validate: function validate(block) {
    var first = block.nodes.first();
    if (!first) return null;

    var kinds = first.kind == 'block' ? ['block'] : ['inline', 'text'];

    var invalids = block.nodes.filter(function (n) {
      return !kinds.includes(n.kind);
    });
    return invalids.size ? invalids : null;
  },
  normalize: function normalize(change, block, invalids) {
    invalids.forEach(function (node) {
      change.removeNodeByKey(node.key, OPTS);
    });
  }
},

/**
 * Only allow inline and text nodes in inlines.
 *
 * @type {Object}
 */

{
  match: function match(object) {
    return object.kind == 'inline';
  },
  validate: function validate(inline) {
    var invalids = inline.nodes.filter(function (n) {
      return n.kind != 'inline' && n.kind != 'text';
    });
    return invalids.size ? invalids : null;
  },
  normalize: function normalize(change, inline, invalids) {
    invalids.forEach(function (node) {
      change.removeNodeByKey(node.key, OPTS);
    });
  }
},

/**
 * Ensure that block and inline nodes have at least one text child.
 *
 * @type {Object}
 */

{
  match: function match(object) {
    return object.kind == 'block' || object.kind == 'inline';
  },
  validate: function validate(node) {
    return node.nodes.size == 0;
  },
  normalize: function normalize(change, node) {
    var text = _text2.default.create();
    change.insertNodeByKey(node.key, 0, text, OPTS);
  }
},

/**
 * Ensure that void nodes contain a text node with a single space of text.
 *
 * @type {Object}
 */

{
  match: function match(object) {
    return (object.kind == 'inline' || object.kind == 'block') && object.isVoid;
  },
  validate: function validate(node) {
    return node.text !== ' ' || node.nodes.size !== 1;
  },
  normalize: function normalize(change, node, result) {
    var text = _text2.default.create(' ');
    var index = node.nodes.size;

    change.insertNodeByKey(node.key, index, text, OPTS);

    node.nodes.forEach(function (child) {
      change.removeNodeByKey(child.key, OPTS);
    });
  }
},

/**
 * Ensure that inline nodes are never empty.
 *
 * This rule is applied to all blocks, because when they contain an empty
 * inline, we need to remove the inline from that parent block. If `validate`
 * was to be memoized, it should be against the parent node, not the inline
 * themselves.
 *
 * @type {Object}
 */

{
  match: function match(object) {
    return object.kind == 'block';
  },
  validate: function validate(block) {
    var invalids = block.nodes.filter(function (n) {
      return n.kind == 'inline' && n.text == '';
    });
    return invalids.size ? invalids : null;
  },
  normalize: function normalize(change, block, invalids) {
    // If all of the block's nodes are invalid, insert an empty text node so
    // that the selection will be preserved when they are all removed.
    if (block.nodes.size == invalids.size) {
      var text = _text2.default.create();
      change.insertNodeByKey(block.key, 1, text, OPTS);
    }

    invalids.forEach(function (node) {
      change.removeNodeByKey(node.key, OPTS);
    });
  }
},

/**
 * Ensure that inline void nodes are surrounded by text nodes, by adding extra
 * blank text nodes if necessary.
 *
 * @type {Object}
 */

{
  match: function match(object) {
    return object.kind == 'block' || object.kind == 'inline';
  },
  validate: function validate(node) {
    var invalids = node.nodes.reduce(function (list, child, index) {
      if (child.kind !== 'inline') return list;

      var prev = index > 0 ? node.nodes.get(index - 1) : null;
      var next = node.nodes.get(index + 1);
      // We don't test if "prev" is inline, since it has already been processed in the loop
      var insertBefore = !prev;
      var insertAfter = !next || next.kind == 'inline';

      if (insertAfter || insertBefore) {
        list = list.push({ insertAfter: insertAfter, insertBefore: insertBefore, index: index });
      }

      return list;
    }, new _immutable.List());

    return invalids.size ? invalids : null;
  },
  normalize: function normalize(change, block, invalids) {
    // Shift for every text node inserted previously.
    var shift = 0;

    invalids.forEach(function (_ref) {
      var index = _ref.index,
          insertAfter = _ref.insertAfter,
          insertBefore = _ref.insertBefore;

      if (insertBefore) {
        change.insertNodeByKey(block.key, shift + index, _text2.default.create(), OPTS);
        shift++;
      }

      if (insertAfter) {
        change.insertNodeByKey(block.key, shift + index + 1, _text2.default.create(), OPTS);
        shift++;
      }
    });
  }
},

/**
 * Merge adjacent text nodes.
 *
 * @type {Object}
 */

{
  match: function match(object) {
    return object.kind == 'block' || object.kind == 'inline';
  },
  validate: function validate(node) {
    var invalids = node.nodes.map(function (child, i) {
      var next = node.nodes.get(i + 1);
      if (child.kind != 'text') return;
      if (!next || next.kind != 'text') return;
      return next;
    }).filter(Boolean);

    return invalids.size ? invalids : null;
  },
  normalize: function normalize(change, node, invalids) {
    // Reverse the list to handle consecutive merges, since the earlier nodes
    // will always exist after each merge.
    invalids.reverse().forEach(function (n) {
      change.mergeNodeByKey(n.key, OPTS);
    });
  }
},

/**
 * Prevent extra empty text nodes, except when adjacent to inline void nodes.
 *
 * @type {Object}
 */

{
  match: function match(object) {
    return object.kind == 'block' || object.kind == 'inline';
  },
  validate: function validate(node) {
    var nodes = node.nodes;

    if (nodes.size <= 1) return;

    var invalids = nodes.filter(function (desc, i) {
      if (desc.kind != 'text') return;
      if (desc.text.length > 0) return;

      var prev = i > 0 ? nodes.get(i - 1) : null;
      var next = nodes.get(i + 1);

      // If it's the first node, and the next is a void, preserve it.
      if (!prev && next.kind == 'inline') return;

      // It it's the last node, and the previous is an inline, preserve it.
      if (!next && prev.kind == 'inline') return;

      // If it's surrounded by inlines, preserve it.
      if (next && prev && next.kind == 'inline' && prev.kind == 'inline') return;

      // Otherwise, remove it.
      return true;
    });

    return invalids.size ? invalids : null;
  },
  normalize: function normalize(change, node, invalids) {
    invalids.forEach(function (text) {
      change.removeNodeByKey(text.key, OPTS);
    });
  }
}];

/**
 * Create the core schema.
 *
 * @type {Schema}
 */

var SCHEMA = _schema2.default.create({ rules: rules });

/**
 * Export.
 *
 * @type {Schema}
 */

exports.default = SCHEMA;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _find = __webpack_require__(175);

var _find2 = _interopRequireDefault(_find);

var _isPlainObject = __webpack_require__(3);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _typeOf = __webpack_require__(258);

var _typeOf2 = _interopRequireDefault(_typeOf);

var _immutable = __webpack_require__(0);

var _modelTypes = __webpack_require__(4);

var _modelTypes2 = _interopRequireDefault(_modelTypes);

var _range = __webpack_require__(30);

var _range2 = _interopRequireDefault(_range);

var _isReactComponent = __webpack_require__(259);

var _isReactComponent2 = _interopRequireDefault(_isReactComponent);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  rules: []
};

/**
 * Schema.
 *
 * @type {Schema}
 */

var Schema = function (_Record) {
  _inherits(Schema, _Record);

  function Schema() {
    _classCallCheck(this, Schema);

    return _possibleConstructorReturn(this, (Schema.__proto__ || Object.getPrototypeOf(Schema)).apply(this, arguments));
  }

  _createClass(Schema, [{
    key: '__getComponent',

    /**
     * Return the component for an `object`.
     *
     * This method is private, because it should always be called on one of the
     * often-changing immutable objects instead, since it will be memoized for
     * much better performance.
     *
     * @param {Mixed} object
     * @return {Component|Null}
     */

    value: function __getComponent(object) {
      var match = (0, _find2.default)(this.rules, function (rule) {
        return rule.render && rule.match(object);
      });
      if (!match) return null;
      return match.render;
    }

    /**
     * Return the placeholder for an `object`.
     *
     * This method is private, because it should always be called on one of the
     * often-changing immutable objects instead, since it will be memoized for
     * much better performance.
     *
     * @param {Mixed} object
     * @return {Component|Null}
     */

  }, {
    key: '__getPlaceholder',
    value: function __getPlaceholder(object) {
      var match = (0, _find2.default)(this.rules, function (rule) {
        return rule.placeholder && rule.match(object);
      });
      if (!match) return null;
      return match.placeholder;
    }

    /**
     * Return the decorations for an `object`.
     *
     * This method is private, because it should always be called on one of the
     * often-changing immutable objects instead, since it will be memoized for
     * much better performance.
     *
     * @param {Mixed} object
     * @return {List<Range>}
     */

  }, {
    key: '__getDecorations',
    value: function __getDecorations(object) {
      var array = [];

      this.rules.forEach(function (rule) {
        if (!rule.decorate) return;
        if (!rule.match(object)) return;

        var decorations = rule.decorate(object);
        if (!decorations.length) return;

        decorations.forEach(function (dec) {
          array.push(dec);
        });
      });

      var list = _range2.default.createList(array);
      return list;
    }

    /**
     * Validate an `object` against the schema, returning the failing rule and
     * value if the object is invalid, or void if it's valid.
     *
     * This method is private, because it should always be called on one of the
     * often-changing immutable objects instead, since it will be memoized for
     * much better performance.
     *
     * @param {Mixed} object
     * @return {Object|Void}
     */

  }, {
    key: '__validate',
    value: function __validate(object) {
      var value = void 0;

      var match = (0, _find2.default)(this.rules, function (rule) {
        if (!rule.validate) return;
        if (!rule.match(object)) return;

        value = rule.validate(object);
        return value;
      });

      if (!value) return;

      return {
        rule: match,
        value: value
      };
    }
  }, {
    key: 'kind',

    /**
     * Get the kind.
     *
     * @return {String}
     */

    get: function get() {
      return 'schema';
    }

    /**
     * Return true if one rule can normalize the document
     *
     * @return {Boolean}
     */

  }, {
    key: 'hasValidators',
    get: function get() {
      var rules = this.rules;

      return rules.some(function (rule) {
        return rule.validate;
      });
    }

    /**
     * Return true if one rule can decorate text nodes
     *
     * @return {Boolean}
     */

  }, {
    key: 'hasDecorators',
    get: function get() {
      var rules = this.rules;

      return rules.some(function (rule) {
        return rule.decorate;
      });
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Schema` with `attrs`.
     *
     * @param {Object|Schema} attrs
     * @return {Schema}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Schema.isSchema(attrs)) {
        return attrs;
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        return Schema.fromJSON(attrs);
      }

      throw new Error('`Schema.create` only accepts objects or schemas, but you passed it: ' + attrs);
    }

    /**
     * Check if a `value` is a `Schema`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

  }, {
    key: 'isSchema',
    value: function isSchema(value) {
      return !!(value && value[_modelTypes2.default.SCHEMA]);
    }

    /**
     * Create a `Schema` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Schema}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      object = normalizeProperties(object);
      var schema = new Schema(object);
      return schema;
    }

    /**
     * Alias `fromJS`.
     */

  }]);

  return Schema;
}((0, _immutable.Record)(DEFAULTS));

/**
 * Normalize the `properties` of a schema.
 *
 * @param {Object} properties
 * @return {Object}
 */

Schema.fromJS = Schema.fromJSON;
function normalizeProperties(properties) {
  var _properties$rules = properties.rules,
      rules = _properties$rules === undefined ? [] : _properties$rules,
      nodes = properties.nodes,
      marks = properties.marks;

  if (nodes) {
    var array = normalizeNodes(nodes);
    rules = rules.concat(array);
  }

  if (marks) {
    var _array = normalizeMarks(marks);
    rules = rules.concat(_array);
  }

  if (properties.transform) {
    _slateDevLogger2.default.deprecate('0.22.0', 'The `schema.transform` property has been deprecated in favor of `schema.change`.');
    properties.change = properties.transform;
    delete properties.transform;
  }

  return { rules: rules };
}

/**
 * Normalize a `nodes` shorthand argument.
 *
 * @param {Object} nodes
 * @return {Array}
 */

function normalizeNodes(nodes) {
  var rules = [];

  var _loop = function _loop(key) {
    var rule = nodes[key];

    if ((0, _typeOf2.default)(rule) == 'function' || (0, _isReactComponent2.default)(rule)) {
      rule = { render: rule };
    }

    rule.match = function (object) {
      return (object.kind == 'block' || object.kind == 'inline') && object.type == key;
    };

    rules.push(rule);
  };

  for (var key in nodes) {
    _loop(key);
  }

  return rules;
}

/**
 * Normalize a `marks` shorthand argument.
 *
 * @param {Object} marks
 * @return {Array}
 */

function normalizeMarks(marks) {
  var rules = [];

  var _loop2 = function _loop2(key) {
    var rule = marks[key];

    if (!rule.render && !rule.decorator && !rule.validate) {
      rule = { render: rule };
    }

    rule.render = normalizeMarkComponent(rule.render);
    rule.match = function (object) {
      return object.kind == 'mark' && object.type == key;
    };
    rules.push(rule);
  };

  for (var key in marks) {
    _loop2(key);
  }

  return rules;
}

/**
 * Normalize a mark `render` property.
 *
 * @param {Component|Function|Object|String} render
 * @return {Component}
 */

function normalizeMarkComponent(render) {
  if ((0, _isReactComponent2.default)(render)) return render;

  switch ((0, _typeOf2.default)(render)) {
    case 'function':
      return render;
    case 'object':
      return function (props) {
        return _react2.default.createElement('span', { style: render }, props.children);
      };
    case 'string':
      return function (props) {
        return _react2.default.createElement('span', { className: render }, props.children);
      };
  }
}

/**
 * Attach a pseudo-symbol for type checking.
 */

Schema.prototype[_modelTypes2.default.SCHEMA] = true;

/**
 * Export.
 *
 * @type {Schema}
 */

exports.default = Schema;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var listCacheClear = __webpack_require__(179),
    listCacheDelete = __webpack_require__(180),
    listCacheGet = __webpack_require__(181),
    listCacheHas = __webpack_require__(182),
    listCacheSet = __webpack_require__(183);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var eq = __webpack_require__(55);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(19);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isKeyable = __webpack_require__(203);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

module.exports = getMapData;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(11),
    isKey = __webpack_require__(64),
    stringToPath = __webpack_require__(242),
    toString = __webpack_require__(245);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var baseGetTag = __webpack_require__(25),
    isObjectLike = __webpack_require__(28);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}

module.exports = isSymbol;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slate = __webpack_require__(8);

/**
 * Find the DOM node for a `key`.
 *
 * @param {String|Node} key
 * @return {Element}
 */

function findDOMNode(key) {
  if (_slate.Node.isNode(key)) {
    key = key.key;
  }

  var el = window.document.querySelector('[data-key="' + key + '"]');

  if (!el) {
    throw new Error('Unable to find a DOM node for "' + key + '". This is often because of forgetting to add `props.attributes` to a custom component.');
  }

  return el;
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = findDOMNode;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getWindow = __webpack_require__(12);

var _getWindow2 = _interopRequireDefault(_getWindow);

var _selectionIsBackward = __webpack_require__(107);

var _selectionIsBackward2 = _interopRequireDefault(_selectionIsBackward);

var _slate = __webpack_require__(8);

var _findPoint = __webpack_require__(108);

var _findPoint2 = _interopRequireDefault(_findPoint);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Find a Slate range from a DOM `native` selection.
 *
 * @param {Selection} native
 * @param {State} state
 * @return {Range}
 */

function findRange(native, state) {
  var el = native.anchorNode || native.startContainer;
  if (!el) return null;

  var window = (0, _getWindow2.default)(el);

  // If the `native` object is a DOM `Range` or `StaticRange` object, change it
  // into something that looks like a DOM `Selection` instead.
  if (native instanceof window.Range || window.StaticRange && native instanceof window.StaticRange) {
    native = {
      anchorNode: native.startContainer,
      anchorOffset: native.startOffset,
      focusNode: native.endContainer,
      focusOffset: native.endOffset
    };
  }

  var _native = native,
      anchorNode = _native.anchorNode,
      anchorOffset = _native.anchorOffset,
      focusNode = _native.focusNode,
      focusOffset = _native.focusOffset,
      isCollapsed = _native.isCollapsed;

  var anchor = (0, _findPoint2.default)(anchorNode, anchorOffset, state);
  var focus = isCollapsed ? anchor : (0, _findPoint2.default)(focusNode, focusOffset, state);
  if (!anchor || !focus) return null;

  var range = _slate.Range.create({
    anchorKey: anchor.key,
    anchorOffset: anchor.offset,
    focusKey: focus.key,
    focusOffset: focus.offset,
    isBackward: isCollapsed ? false : (0, _selectionIsBackward2.default)(native),
    isFocused: true
  });

  return range;
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = findRange;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _isPlainObject = __webpack_require__(3);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _immutable = __webpack_require__(0);

var _character = __webpack_require__(50);

var _character2 = _interopRequireDefault(_character);

var _mark = __webpack_require__(15);

var _mark2 = _interopRequireDefault(_mark);

var _leaf = __webpack_require__(78);

var _leaf2 = _interopRequireDefault(_leaf);

var _modelTypes = __webpack_require__(4);

var _modelTypes2 = _interopRequireDefault(_modelTypes);

var _generateKey = __webpack_require__(23);

var _generateKey2 = _interopRequireDefault(_generateKey);

var _memoize = __webpack_require__(51);

var _memoize2 = _interopRequireDefault(_memoize);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  characters: new _immutable.List(),
  key: undefined
};

/**
 * Text.
 *
 * @type {Text}
 */

var Text = function (_Record) {
  _inherits(Text, _Record);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
  }

  _createClass(Text, [{
    key: 'addMark',

    /**
     * Add a `mark` at `index` and `length`.
     *
     * @param {Number} index
     * @param {Number} length
     * @param {Mark} mark
     * @return {Text}
     */

    value: function addMark(index, length, mark) {
      var marks = new _immutable.Set([mark]);
      return this.addMarks(index, length, marks);
    }

    /**
     * Add a `set` of marks at `index` and `length`.
     *
     * @param {Number} index
     * @param {Number} length
     * @param {Set<Mark>} set
     * @return {Text}
     */

  }, {
    key: 'addMarks',
    value: function addMarks(index, length, set) {
      var characters = this.characters.map(function (char, i) {
        if (i < index) return char;
        if (i >= index + length) return char;
        var _char = char,
            marks = _char.marks;

        marks = marks.union(set);
        char = char.set('marks', marks);
        return char;
      });

      return this.set('characters', characters);
    }

    /**
     * Derive a set of decorated characters with `decorations`.
     *
     * @param {List<Decoration>} decorations
     * @return {List<Character>}
     */

  }, {
    key: 'getDecoratedCharacters',
    value: function getDecoratedCharacters(decorations) {
      var node = this;
      var _node = node,
          key = _node.key,
          characters = _node.characters;

      // PERF: Exit early if there are no characters to be decorated.

      if (characters.size == 0) return characters;

      decorations.forEach(function (range) {
        var startKey = range.startKey,
            endKey = range.endKey,
            startOffset = range.startOffset,
            endOffset = range.endOffset,
            marks = range.marks;

        var hasStart = startKey == key;
        var hasEnd = endKey == key;
        var index = hasStart ? startOffset : 0;
        var length = hasEnd ? endOffset - index : characters.size;
        node = node.addMarks(index, length, marks);
      });

      return node.characters;
    }

    /**
     * Get the decorations for the node from a `schema`.
     *
     * @param {Schema} schema
     * @return {Array}
     */

  }, {
    key: 'getDecorations',
    value: function getDecorations(schema) {
      return schema.__getDecorations(this);
    }

    /**
     * Derive the leaves for a list of `characters`.
     *
     * @param {Array|Void} decorations (optional)
     * @return {List<Leaf>}
     */

  }, {
    key: 'getLeaves',
    value: function getLeaves() {
      var decorations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var characters = this.getDecoratedCharacters(decorations);
      var leaves = [];

      // PERF: cache previous values for faster lookup.
      var prevChar = void 0;
      var prevLeaf = void 0;

      // If there are no characters, return one empty range.
      if (characters.size == 0) {
        leaves.push({});
      }

      // Otherwise, loop the characters and build the leaves...
      else {
          characters.forEach(function (char, i) {
            var marks = char.marks,
                text = char.text;

            // The first one can always just be created.

            if (i == 0) {
              prevChar = char;
              prevLeaf = { text: text, marks: marks };
              leaves.push(prevLeaf);
              return;
            }

            // Otherwise, compare the current and previous marks.
            var prevMarks = prevChar.marks;
            var isSame = (0, _immutable.is)(marks, prevMarks);

            // If the marks are the same, add the text to the previous range.
            if (isSame) {
              prevChar = char;
              prevLeaf.text += text;
              return;
            }

            // Otherwise, create a new range.
            prevChar = char;
            prevLeaf = { text: text, marks: marks };
            leaves.push(prevLeaf);
          }, []);
        }

      // PERF: convert the leaves to immutable objects after iterating.
      leaves = new _immutable.List(leaves.map(function (object) {
        return new _leaf2.default(object);
      }));

      // Return the leaves.
      return leaves;
    }

    /**
     * Get all of the marks on the text.
     *
     * @return {OrderedSet<Mark>}
     */

  }, {
    key: 'getMarks',
    value: function getMarks() {
      var array = this.getMarksAsArray();
      return new _immutable.OrderedSet(array);
    }

    /**
     * Get all of the marks on the text as an array
     *
     * @return {Array}
     */

  }, {
    key: 'getMarksAsArray',
    value: function getMarksAsArray() {
      return this.characters.reduce(function (array, char) {
        return array.concat(char.marks.toArray());
      }, []);
    }

    /**
     * Get the marks on the text at `index`.
     *
     * @param {Number} index
     * @return {Set<Mark>}
     */

  }, {
    key: 'getMarksAtIndex',
    value: function getMarksAtIndex(index) {
      if (index == 0) return _mark2.default.createSet();
      var characters = this.characters;

      var char = characters.get(index - 1);
      if (!char) return _mark2.default.createSet();
      return char.marks;
    }

    /**
     * Get a node by `key`, to parallel other nodes.
     *
     * @param {String} key
     * @return {Node|Null}
     */

  }, {
    key: 'getNode',
    value: function getNode(key) {
      return this.key == key ? this : null;
    }

    /**
     * Check if the node has a node by `key`, to parallel other nodes.
     *
     * @param {String} key
     * @return {Boolean}
     */

  }, {
    key: 'hasNode',
    value: function hasNode(key) {
      return !!this.getNode(key);
    }

    /**
     * Insert `text` at `index`.
     *
     * @param {Numbder} index
     * @param {String} text
     * @param {String} marks (optional)
     * @return {Text}
     */

  }, {
    key: 'insertText',
    value: function insertText(index, text, marks) {
      var characters = this.characters;

      var chars = _character2.default.createList(text.split('').map(function (char) {
        return { text: char, marks: marks };
      }));

      characters = characters.slice(0, index).concat(chars).concat(characters.slice(index));

      return this.set('characters', characters);
    }

    /**
     * Regenerate the node's key.
     *
     * @return {Text}
     */

  }, {
    key: 'regenerateKey',
    value: function regenerateKey() {
      var key = (0, _generateKey2.default)();
      return this.set('key', key);
    }

    /**
     * Remove a `mark` at `index` and `length`.
     *
     * @param {Number} index
     * @param {Number} length
     * @param {Mark} mark
     * @return {Text}
     */

  }, {
    key: 'removeMark',
    value: function removeMark(index, length, mark) {
      var characters = this.characters.map(function (char, i) {
        if (i < index) return char;
        if (i >= index + length) return char;
        var _char2 = char,
            marks = _char2.marks;

        marks = marks.remove(mark);
        char = char.set('marks', marks);
        return char;
      });

      return this.set('characters', characters);
    }

    /**
     * Remove text from the text node at `index` for `length`.
     *
     * @param {Number} index
     * @param {Number} length
     * @return {Text}
     */

  }, {
    key: 'removeText',
    value: function removeText(index, length) {
      var characters = this.characters;

      var start = index;
      var end = index + length;
      characters = characters.filterNot(function (char, i) {
        return start <= i && i < end;
      });
      return this.set('characters', characters);
    }

    /**
     * Return a JSON representation of the text.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        key: this.key,
        kind: this.kind,
        leaves: this.getLeaves().toArray().map(function (r) {
          return r.toJSON();
        })
      };

      if (!options.preserveKeys) {
        delete object.key;
      }

      return object;
    }

    /**
     * Alias `toJS`.
     */

  }, {
    key: 'toJS',
    value: function toJS(options) {
      return this.toJSON(options);
    }

    /**
     * Update a `mark` at `index` and `length` with `properties`.
     *
     * @param {Number} index
     * @param {Number} length
     * @param {Mark} mark
     * @param {Object} properties
     * @return {Text}
     */

  }, {
    key: 'updateMark',
    value: function updateMark(index, length, mark, properties) {
      var newMark = mark.merge(properties);

      var characters = this.characters.map(function (char, i) {
        if (i < index) return char;
        if (i >= index + length) return char;
        var _char3 = char,
            marks = _char3.marks;

        if (!marks.has(mark)) return char;
        marks = marks.remove(mark);
        marks = marks.add(newMark);
        char = char.set('marks', marks);
        return char;
      });

      return this.set('characters', characters);
    }

    /**
     * Validate the text node against a `schema`.
     *
     * @param {Schema} schema
     * @return {Object|Void}
     */

  }, {
    key: 'validate',
    value: function validate(schema) {
      return schema.__validate(this);
    }

    /**
     * Deprecated.
     */

  }, {
    key: 'getRanges',
    value: function getRanges() {
      _slateDevLogger2.default.deprecate('0.27.0', 'The `Text.getRanges()` method was renamed to `Text.getLeaves`.');
      return this.getLeaves.apply(this, arguments);
    }
  }, {
    key: 'kind',

    /**
     * Get the node's kind.
     *
     * @return {String}
     */

    get: function get() {
      return 'text';
    }

    /**
     * Is the node empty?
     *
     * @return {Boolean}
     */

  }, {
    key: 'isEmpty',
    get: function get() {
      return this.text == '';
    }

    /**
     * Get the concatenated text of the node.
     *
     * @return {String}
     */

  }, {
    key: 'text',
    get: function get() {
      return this.characters.reduce(function (string, char) {
        return string + char.text;
      }, '');
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Text` with `attrs`.
     *
     * @param {Object|Array|List|String|Text} attrs
     * @return {Text}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Text.isText(attrs)) {
        return attrs;
      }

      if (typeof attrs == 'string') {
        attrs = { leaves: [{ text: attrs }] };
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        if (attrs.text) {
          var _attrs = attrs,
              text = _attrs.text,
              marks = _attrs.marks,
              key = _attrs.key;

          attrs = { key: key, leaves: [{ text: text, marks: marks }] };
        }

        return Text.fromJSON(attrs);
      }

      throw new Error('`Text.create` only accepts objects, arrays, strings or texts, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Texts` from a `value`.
     *
     * @param {Array<Text|Object>|List<Text|Object>} value
     * @return {List<Text>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (_immutable.List.isList(value) || Array.isArray(value)) {
        var list = new _immutable.List(value.map(Text.create));
        return list;
      }

      throw new Error('`Text.createList` only accepts arrays or lists, but you passed it: ' + value);
    }

    /**
     * Create a `Text` from a JSON `object`.
     *
     * @param {Object|Text} object
     * @return {Text}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      if (Text.isText(object)) {
        return object;
      }

      var _object$leaves = object.leaves,
          leaves = _object$leaves === undefined ? [] : _object$leaves,
          _object$key = object.key,
          key = _object$key === undefined ? (0, _generateKey2.default)() : _object$key;

      if (object.ranges) {
        _slateDevLogger2.default.deprecate('0.27.0', 'Passing `object.ranges` to `Text.fromJSON` has been renamed to `object.leaves`.');
        leaves = object.ranges;
      }

      if (object.text) {
        _slateDevLogger2.default.deprecate('0.23.0', 'Passing `object.text` to `Text.fromJSON` has been deprecated, please use `object.leaves` instead.');
        leaves = [{ text: object.text }];
      }

      var characters = leaves.map(_leaf2.default.fromJSON).reduce(function (l, r) {
        return l.concat(r.getCharacters());
      }, new _immutable.List());

      var node = new Text({
        characters: characters,
        key: key
      });

      return node;
    }

    /**
     * Alias `fromJS`.
     */

  }, {
    key: 'isText',

    /**
     * Check if a `value` is a `Text`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

    value: function isText(value) {
      return !!(value && value[_modelTypes2.default.TEXT]);
    }

    /**
     * Check if a `value` is a list of texts.
     *
     * @param {Any} value
     * @return {Boolean}
     */

  }, {
    key: 'isTextList',
    value: function isTextList(value) {
      return _immutable.List.isList(value) && value.every(function (item) {
        return Text.isText(item);
      });
    }

    /**
     * Deprecated.
     */

  }, {
    key: 'createFromString',
    value: function createFromString(string) {
      _slateDevLogger2.default.deprecate('0.22.0', 'The `Text.createFromString(string)` method is deprecated, use `Text.create(string)` instead.');
      return Text.create(string);
    }

    /**
     * Deprecated.
     */

  }, {
    key: 'createFromRanges',
    value: function createFromRanges(ranges) {
      _slateDevLogger2.default.deprecate('0.22.0', 'The `Text.createFromRanges(ranges)` method is deprecated, use `Text.create(ranges)` instead.');
      return Text.create(ranges);
    }
  }]);

  return Text;
}((0, _immutable.Record)(DEFAULTS));

/**
 * Attach a pseudo-symbol for type checking.
 */

Text.fromJS = Text.fromJSON;
Text.prototype[_modelTypes2.default.TEXT] = true;

/**
 * Memoize read methods.
 */

(0, _memoize2.default)(Text.prototype, ['getMarks', 'getMarksAsArray'], {
  takesArguments: false
});

(0, _memoize2.default)(Text.prototype, ['getDecoratedCharacters', 'getDecorations', 'getLeaves', 'getMarksAtIndex', 'validate'], {
  takesArguments: true
});

/**
 * Export.
 *
 * @type {Text}
 */

exports.default = Text;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _isPlainObject = __webpack_require__(3);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _immutable = __webpack_require__(0);

var _modelTypes = __webpack_require__(4);

var _modelTypes2 = _interopRequireDefault(_modelTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  marks: new _immutable.Set(),
  text: ''
};

/**
 * Character.
 *
 * @type {Character}
 */

var Character = function (_Record) {
  _inherits(Character, _Record);

  function Character() {
    _classCallCheck(this, Character);

    return _possibleConstructorReturn(this, (Character.__proto__ || Object.getPrototypeOf(Character)).apply(this, arguments));
  }

  _createClass(Character, [{
    key: 'toJSON',

    /**
     * Return a JSON representation of the character.
     *
     * @return {Object}
     */

    value: function toJSON() {
      var object = {
        kind: this.kind,
        marks: this.marks.toArray().map(function (m) {
          return m.toJSON();
        }),
        text: this.text
      };

      return object;
    }

    /**
     * Alias `toJS`.
     */

  }, {
    key: 'toJS',
    value: function toJS() {
      return this.toJSON();
    }
  }, {
    key: 'kind',

    /**
     * Get the kind.
     *
     * @return {String}
     */

    get: function get() {
      return 'character';
    }
  }], [{
    key: 'create',

    /**
     * Create a `Character` with `attrs`.
     *
     * @param {Object|String|Character} attrs
     * @return {Character}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Character.isCharacter(attrs)) {
        return attrs;
      }

      if (typeof attrs == 'string') {
        attrs = { text: attrs };
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        return Character.fromJSON(attrs);
      }

      throw new Error('`Character.create` only accepts objects, strings or characters, but you passed it: ' + attrs);
    }

    /**
     * Create a list of `Characters` from `elements`.
     *
     * @param {String|Array<Object|Character|String>|List<Object|Character|String>} elements
     * @return {List<Character>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (typeof elements == 'string') {
        elements = elements.split('');
      }

      if (_immutable.List.isList(elements) || Array.isArray(elements)) {
        var list = new _immutable.List(elements.map(Character.create));
        return list;
      }

      throw new Error('`Block.createList` only accepts strings, arrays or lists, but you passed it: ' + elements);
    }

    /**
     * Create a `Character` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Character}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var text = object.text,
          _object$marks = object.marks,
          marks = _object$marks === undefined ? [] : _object$marks;

      if (typeof text != 'string') {
        throw new Error('`Character.fromJSON` requires a block `text` string.');
      }

      var character = new Character({
        text: text,
        marks: new _immutable.Set(marks)
      });

      return character;
    }

    /**
     * Alias `fromJS`.
     */

  }, {
    key: 'isCharacter',

    /**
     * Check if a `value` is a `Character`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

    value: function isCharacter(value) {
      return !!(value && value[_modelTypes2.default.CHARACTER]);
    }

    /**
     * Check if a `value` is a character list.
     *
     * @param {Any} value
     * @return {Boolean}
     */

  }, {
    key: 'isCharacterList',
    value: function isCharacterList(value) {
      return _immutable.List.isList(value) && value.every(function (item) {
        return Character.isCharacter(item);
      });
    }

    /**
     * Deprecated.
     */

  }, {
    key: 'createListFromText',
    value: function createListFromText(string) {
      _slateDevLogger2.default.deprecate('0.22.0', 'The `Character.createListFromText(string)` method is deprecated, use `Character.createList(string)` instead.');
      return this.createList(string);
    }
  }]);

  return Character;
}((0, _immutable.Record)(DEFAULTS));

/**
 * Attach a pseudo-symbol for type checking.
 */

Character.fromJS = Character.fromJSON;
Character.prototype[_modelTypes2.default.CHARACTER] = true;

/**
 * Export.
 *
 * @type {Character}
 */

exports.default = Character;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__enable = exports.__clear = exports.default = undefined;

var _es6Map = __webpack_require__(126);

var _es6Map2 = _interopRequireDefault(_es6Map);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Is in development?
 *
 * @type {Boolean}
 */

var IS_DEV = typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production';

/**
 * GLOBAL: True if memoization should is enabled. Only effective when `IS_DEV`.
 *
 * @type {Boolean}
 */

var ENABLED = true;

/**
 * GLOBAL: Changing this cache key will clear all previous cached results.
 * Only effective when `IS_DEV`.
 *
 * @type {Number}
 */

var CACHE_KEY = 0;

/**
 * The leaf node of a cache tree. Used to support variable argument length. A
 * unique object, so that native Maps will key it by reference.
 *
 * @type {Object}
 */

var LEAF = {};

/**
 * A value to represent a memoized undefined value. Allows efficient value
 * retrieval using Map.get only.
 *
 * @type {Object}
 */

var UNDEFINED = {};

/**
 * Default value for unset keys in native Maps
 *
 * @type {Undefined}
 */

var UNSET = undefined;

/**
 * Memoize all of the `properties` on a `object`.
 *
 * @param {Object} object
 * @param {Array} properties
 * @return {Record}
 */

function memoize(object, properties) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$takesArgumen = options.takesArguments,
      takesArguments = _options$takesArgumen === undefined ? true : _options$takesArgumen;

  var _loop = function _loop(i) {
    var property = properties[i];
    var original = object[property];

    if (!original) {
      throw new Error('Object does not have a property named "' + property + '".');
    }

    object[property] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (IS_DEV) {
        // If memoization is disabled, call into the original method.
        if (!ENABLED) return original.apply(this, args);

        // If the cache key is different, previous caches must be cleared.
        if (CACHE_KEY !== this.__cache_key) {
          this.__cache_key = CACHE_KEY;
          this.__cache = new _es6Map2.default();
        }
      }

      if (!this.__cache) {
        this.__cache = new _es6Map2.default();
      }

      var cachedValue = void 0;
      var keys = void 0;

      if (takesArguments) {
        keys = [property].concat(args);
        cachedValue = getIn(this.__cache, keys);
      } else {
        cachedValue = this.__cache.get(property);
      }

      // If we've got a result already, return it.
      if (cachedValue !== UNSET) {
        return cachedValue === UNDEFINED ? undefined : cachedValue;
      }

      // Otherwise calculate what it should be once and cache it.
      var value = original.apply(this, args);
      var v = value === undefined ? UNDEFINED : value;

      if (takesArguments) {
        this.__cache = setIn(this.__cache, keys, v);
      } else {
        this.__cache.set(property, v);
      }

      return value;
    };
  };

  for (var i = 0; i < properties.length; i++) {
    _loop(i);
  }
}

/**
 * Get a value at a key path in a tree of Map.
 *
 * If not set, returns UNSET.
 * If the set value is undefined, returns UNDEFINED.
 *
 * @param {Map} map
 * @param {Array} keys
 * @return {Any|UNSET|UNDEFINED}
 */

function getIn(map, keys) {
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    map = map.get(key);
    if (map === UNSET) return UNSET;
  }

  return map.get(LEAF);
}

/**
 * Set a value at a key path in a tree of Map, creating Maps on the go.
 *
 * @param {Map} map
 * @param {Array} keys
 * @param {Any} value
 * @return {Map}
 */

function setIn(map, keys, value) {
  var parent = map;
  var child = void 0;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    child = parent.get(key);

    // If the path was not created yet...
    if (child === UNSET) {
      child = new _es6Map2.default();
      parent.set(key, child);
    }

    parent = child;
  }

  // The whole path has been created, so set the value to the bottom most map.
  child.set(LEAF, value);
  return map;
}

/**
 * In DEV mode, clears the previously memoized values, globally.
 *
 * @return {Void}
 */

function __clear() {
  CACHE_KEY++;

  if (CACHE_KEY >= Number.MAX_SAFE_INTEGER) {
    CACHE_KEY = 0;
  }
}

/**
 * In DEV mode, enable or disable the use of memoize values, globally.
 *
 * @param {Boolean} enabled
 * @return {Void}
 */

function __enable(enabled) {
  ENABLED = enabled;
}

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = memoize;
exports.__clear = __clear;
exports.__enable = __enable;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(139)() ? Object.assign : __webpack_require__(140);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clear = __webpack_require__(70),
    assign = __webpack_require__(52),
    callable = __webpack_require__(9),
    value = __webpack_require__(6),
    d = __webpack_require__(18),
    autoBind = __webpack_require__(156),
    _Symbol = __webpack_require__(16);

var defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties,
    _Iterator;

module.exports = _Iterator = function Iterator(list, context) {
	if (!(this instanceof _Iterator)) throw new TypeError("Constructor requires 'new'");
	defineProperties(this, {
		__list__: d("w", value(list)),
		__context__: d("w", context),
		__nextIndex__: d("w", 0)
	});
	if (!context) return;
	callable(context.on);
	context.on("_add", this._onAdd);
	context.on("_delete", this._onDelete);
	context.on("_clear", this._onClear);
};

// Internal %IteratorPrototype% doesn't expose its constructor
delete _Iterator.prototype.constructor;

defineProperties(_Iterator.prototype, assign({
	_next: d(function () {
		var i;
		if (!this.__list__) return undefined;
		if (this.__redo__) {
			i = this.__redo__.shift();
			if (i !== undefined) return i;
		}
		if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
		this._unBind();
		return undefined;
	}),
	next: d(function () {
		return this._createResult(this._next());
	}),
	_createResult: d(function (i) {
		if (i === undefined) return { done: true, value: undefined };
		return { done: false, value: this._resolve(i) };
	}),
	_resolve: d(function (i) {
		return this.__list__[i];
	}),
	_unBind: d(function () {
		this.__list__ = null;
		delete this.__redo__;
		if (!this.__context__) return;
		this.__context__.off("_add", this._onAdd);
		this.__context__.off("_delete", this._onDelete);
		this.__context__.off("_clear", this._onClear);
		this.__context__ = null;
	}),
	toString: d(function () {
		return "[object " + (this[_Symbol.toStringTag] || "Object") + "]";
	})
}, autoBind({
	_onAdd: d(function (index) {
		if (index >= this.__nextIndex__) return;
		++this.__nextIndex__;
		if (!this.__redo__) {
			defineProperty(this, "__redo__", d("c", [index]));
			return;
		}
		this.__redo__.forEach(function (redo, i) {
			if (redo >= index) this.__redo__[i] = ++redo;
		}, this);
		this.__redo__.push(index);
	}),
	_onDelete: d(function (index) {
		var i;
		if (index >= this.__nextIndex__) return;
		--this.__nextIndex__;
		if (!this.__redo__) return;
		i = this.__redo__.indexOf(index);
		if (i !== -1) this.__redo__.splice(i, 1);
		this.__redo__.forEach(function (redo, j) {
			if (redo > index) this.__redo__[j] = --redo;
		}, this);
	}),
	_onClear: d(function () {
		if (this.__redo__) clear.call(this.__redo__);
		this.__nextIndex__ = 0;
	})
})));

defineProperty(_Iterator.prototype, _Symbol.iterator, d(function () {
	return this;
}));

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

module.exports = eq;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(19),
    root = __webpack_require__(10);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mapCacheClear = __webpack_require__(195),
    mapCacheDelete = __webpack_require__(202),
    mapCacheGet = __webpack_require__(204),
    mapCacheHas = __webpack_require__(205),
    mapCacheSet = __webpack_require__(206);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsEqualDeep = __webpack_require__(207),
    isObjectLike = __webpack_require__(28);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayLikeKeys = __webpack_require__(223),
    baseKeys = __webpack_require__(230),
    isArrayLike = __webpack_require__(91);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsArguments = __webpack_require__(225),
    isObjectLike = __webpack_require__(28);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function () {
    return arguments;
}()) ? baseIsArguments : function (value) {
    return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var castPath = __webpack_require__(42),
    toKey = __webpack_require__(29);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : undefined;
}

module.exports = baseGet;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isArray = __webpack_require__(11),
    isSymbol = __webpack_require__(43);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

module.exports = isKey;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var basePick = __webpack_require__(263),
    flatRest = __webpack_require__(268);

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function (object, paths) {
  return object == null ? {} : basePick(object, paths);
});

module.exports = pick;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Event handlers used by Slate plugins.
 *
 * @type {Array}
 */

var EVENT_HANDLERS = ['onBeforeInput', 'onBlur', 'onClick', 'onCompositionEnd', 'onCompositionStart', 'onCopy', 'onCut', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onInput', 'onFocus', 'onKeyDown', 'onKeyUp', 'onPaste', 'onSelect'];

/**
 * Export.
 *
 * @type {Array}
 */

exports.default = EVENT_HANDLERS;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Find the closest ancestor of a DOM `element` that matches a given selector.
 *
 * COMPAT: In IE11, the `Node.closest` method doesn't exist natively, so we
 * have to polyfill it. (2017/09/06)
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 *
 * @param {Element} node
 * @param {String} selector
 * @return {Element}
 */

function findClosestNode(node, selector) {
  if (typeof node.closest === 'function') return node.closest(selector);

  var matches = (node.document || node.ownerDocument).querySelectorAll(selector);
  var parentNode = node;
  var i = void 0;

  do {
    i = matches.length;
    while (--i >= 0 && matches.item(i) !== parentNode) {}
  } while (i < 0 && (parentNode = parentNode.parentElement));

  return parentNode;
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = findClosestNode;

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_68__;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(46);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear



var value = __webpack_require__(6);

module.exports = function () {
	value(this).length = 0;
	return this;
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function

module.exports = function () {};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(133),
    max = Math.max;

module.exports = function (value) {
  return max(0, toInteger(value));
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var create = Object.create,
    getPrototypeOf = Object.getPrototypeOf,
    plainObject = {};

module.exports = function () /* CustomCreate*/{
	var setPrototypeOf = Object.setPrototypeOf,
	    customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== "function") return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint no-proto: "off" */

// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554



var isObject = __webpack_require__(137),
    value = __webpack_require__(6),
    objIsPrototypOf = Object.prototype.isPrototypeOf,
    defineProperty = Object.defineProperty,
    nullDesc = {
	configurable: true,
	enumerable: false,
	writable: true,
	value: undefined
},
    validate;

validate = function validate(obj, prototype) {
	value(obj);
	if (prototype === null || isObject(prototype)) return obj;
	throw new TypeError("Prototype must be null or an object");
};

module.exports = function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function fn(obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function fn(obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = objIsPrototypOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, "__proto__", nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, "level", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: status.level
	});
}(function () {
	var tmpObj1 = Object.create(null),
	    tmpObj2 = {},
	    set,
	    desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");

	if (desc) {
		try {
			set = desc.set; // Opera crashes at this point
			set.call(tmpObj1, tmpObj2);
		} catch (ignore) {}
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { set: set, level: 2 };
	}

	tmpObj1.__proto__ = tmpObj2;
	if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 2 };

	tmpObj1 = {};
	tmpObj1.__proto__ = tmpObj2;
	if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 1 };

	return false;
}());

__webpack_require__(138);

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(22);

var forEach = Array.prototype.forEach,
    create = Object.create;

var process = function process(src, obj) {
	var key;
	for (key in src) {
		obj[key] = src[key];
	}
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(145)() ? String.prototype.contains : __webpack_require__(146);

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isIterable = __webpack_require__(152);

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _isPlainObject = __webpack_require__(3);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _immutable = __webpack_require__(0);

var _modelTypes = __webpack_require__(4);

var _modelTypes2 = _interopRequireDefault(_modelTypes);

var _character = __webpack_require__(50);

var _character2 = _interopRequireDefault(_character);

var _mark = __webpack_require__(15);

var _mark2 = _interopRequireDefault(_mark);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  marks: new _immutable.Set(),
  text: ''
};

/**
 * Leaf.
 *
 * @type {Leaf}
 */

var Leaf = function (_Record) {
  _inherits(Leaf, _Record);

  function Leaf() {
    _classCallCheck(this, Leaf);

    return _possibleConstructorReturn(this, (Leaf.__proto__ || Object.getPrototypeOf(Leaf)).apply(this, arguments));
  }

  _createClass(Leaf, [{
    key: 'getCharacters',

    /**
     * Return leaf as a list of characters
     *
     * @return {List<Character>}
     */

    value: function getCharacters() {
      var marks = this.marks;

      var characters = _character2.default.createList(this.text.split('').map(function (char) {
        return _character2.default.create({
          text: char,
          marks: marks
        });
      }));

      return characters;
    }

    /**
     * Return a JSON representation of the leaf.
     *
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var object = {
        kind: this.kind,
        marks: this.marks.toArray().map(function (m) {
          return m.toJSON();
        }),
        text: this.text
      };

      return object;
    }

    /**
     * Alias `toJS`.
     */

  }, {
    key: 'toJS',
    value: function toJS() {
      return this.toJSON();
    }
  }, {
    key: 'kind',

    /**
     * Get the node's kind.
     *
     * @return {String}
     */

    get: function get() {
      return 'leaf';
    }
  }], [{
    key: 'create',

    /**
     * Create a new `Leaf` with `attrs`.
     *
     * @param {Object|Leaf} attrs
     * @return {Leaf}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Leaf.isLeaf(attrs)) {
        return attrs;
      }

      if (typeof attrs == 'string') {
        attrs = { text: attrs };
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        return Leaf.fromJSON(attrs);
      }

      throw new Error('`Leaf.create` only accepts objects, strings or leaves, but you passed it: ' + attrs);
    }

    /**
     * Create a `Leaf` list from `value`.
     *
     * @param {Array<Leaf|Object>|List<Leaf|Object>} value
     * @return {List<Leaf>}
     */

  }, {
    key: 'createList',
    value: function createList() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (_immutable.List.isList(value) || Array.isArray(value)) {
        var list = new _immutable.List(value.map(Leaf.create));
        return list;
      }

      throw new Error('`Leaf.createList` only accepts arrays or lists, but you passed it: ' + value);
    }

    /**
     * Create a `Leaf` from a JSON `object`.
     *
     * @param {Object} object
     * @return {Leaf}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var _object$text = object.text,
          text = _object$text === undefined ? '' : _object$text,
          _object$marks = object.marks,
          marks = _object$marks === undefined ? [] : _object$marks;

      var leaf = new Leaf({
        text: text,
        marks: new _immutable.Set(marks.map(_mark2.default.fromJSON))
      });

      return leaf;
    }

    /**
     * Alias `fromJS`.
     */

  }, {
    key: 'isLeaf',

    /**
     * Check if a `value` is a `Leaf`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

    value: function isLeaf(value) {
      return !!(value && value[_modelTypes2.default.LEAF]);
    }

    /**
     * Check if a `value` is a list of leaves.
     *
     * @param {Any} value
     * @return {Boolean}
     */

  }, {
    key: 'isLeafList',
    value: function isLeafList(value) {
      return _immutable.List.isList(value) && value.every(function (item) {
        return Leaf.isLeaf(item);
      });
    }
  }]);

  return Leaf;
}((0, _immutable.Record)(DEFAULTS));

/**
 * Attach a pseudo-symbol for type checking.
 */

Leaf.fromJS = Leaf.fromJSON;
Leaf.prototype[_modelTypes2.default.LEAF] = true;

/**
 * Export.
 *
 * @type {Leaf}
 */

exports.default = Leaf;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _atCurrentRange = __webpack_require__(171);

var _atCurrentRange2 = _interopRequireDefault(_atCurrentRange);

var _atRange = __webpack_require__(172);

var _atRange2 = _interopRequireDefault(_atRange);

var _byKey = __webpack_require__(260);

var _byKey2 = _interopRequireDefault(_byKey);

var _normalize = __webpack_require__(261);

var _normalize2 = _interopRequireDefault(_normalize);

var _onHistory = __webpack_require__(262);

var _onHistory2 = _interopRequireDefault(_onHistory);

var _onSelection = __webpack_require__(278);

var _onSelection2 = _interopRequireDefault(_onSelection);

var _onState = __webpack_require__(280);

var _onState2 = _interopRequireDefault(_onState);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = _extends({}, _atCurrentRange2.default, _atRange2.default, _byKey2.default, _normalize2.default, _onHistory2.default, _onSelection2.default, _onState2.default);

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 81 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var baseMatches = __webpack_require__(177),
    baseMatchesProperty = __webpack_require__(240),
    identity = __webpack_require__(95),
    isArray = __webpack_require__(11),
    property = __webpack_require__(250);

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ListCache = __webpack_require__(38),
    stackClear = __webpack_require__(184),
    stackDelete = __webpack_require__(185),
    stackGet = __webpack_require__(186),
    stackHas = __webpack_require__(187),
    stackSet = __webpack_require__(188);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(25),
    isObject = __webpack_require__(27);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
    if (!isObject(value)) {
        return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(80)))

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SetCache = __webpack_require__(208),
    arraySome = __webpack_require__(211),
    cacheHas = __webpack_require__(212);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function (othValue, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var root = __webpack_require__(10),
    stubFalse = __webpack_require__(226);

/** Detect free variable `exports`. */
var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)(module)))

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsTypedArray = __webpack_require__(227),
    baseUnary = __webpack_require__(228),
    nodeUtil = __webpack_require__(229);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__(84),
    isLength = __webpack_require__(62);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(27);

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function (object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
  };
}

module.exports = matchesStrictComparable;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseHasIn = __webpack_require__(248),
    hasPath = __webpack_require__(249);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

var _pick = __webpack_require__(65);

var _pick2 = _interopRequireDefault(_pick);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:operation:invert');

/**
 * Invert an `op`.
 *
 * @param {Object} op
 * @return {Object}
 */

function invertOperation(op) {
  var type = op.type;

  debug(type, op);

  /**
   * Insert node.
   */

  if (type == 'insert_node') {
    return _extends({}, op, {
      type: 'remove_node'
    });
  }

  /**
   * Remove node.
   */

  if (type == 'remove_node') {
    return _extends({}, op, {
      type: 'insert_node'
    });
  }

  /**
   * Move node.
   */

  if (type == 'move_node') {
    return _extends({}, op, {
      path: op.newPath,
      newPath: op.path
    });
  }

  /**
   * Merge node.
   */

  if (type == 'merge_node') {
    var path = op.path;
    var length = path.length;

    var last = length - 1;
    return _extends({}, op, {
      type: 'split_node',
      path: path.slice(0, last).concat([path[last] - 1])
    });
  }

  /**
   * Split node.
   */

  if (type == 'split_node') {
    var _path = op.path;
    var _length = _path.length;

    var _last = _length - 1;
    return _extends({}, op, {
      type: 'merge_node',
      path: _path.slice(0, _last).concat([_path[_last] + 1])
    });
  }

  /**
   * Set node.
   */

  if (type == 'set_node') {
    var properties = op.properties,
        node = op.node;

    return _extends({}, op, {
      node: node.merge(properties),
      properties: (0, _pick2.default)(node, Object.keys(properties))
    });
  }

  /**
   * Insert text.
   */

  if (type == 'insert_text') {
    return _extends({}, op, {
      type: 'remove_text'
    });
  }

  /**
   * Remove text.
   */

  if (type == 'remove_text') {
    return _extends({}, op, {
      type: 'insert_text'
    });
  }

  /**
   * Add mark.
   */

  if (type == 'add_mark') {
    return _extends({}, op, {
      type: 'remove_mark'
    });
  }

  /**
   * Remove mark.
   */

  if (type == 'remove_mark') {
    return _extends({}, op, {
      type: 'add_mark'
    });
  }

  /**
   * Set mark.
   */

  if (type == 'set_mark') {
    var _properties = op.properties,
        mark = op.mark;

    return _extends({}, op, {
      mark: mark.merge(_properties),
      properties: (0, _pick2.default)(mark, Object.keys(_properties))
    });
  }

  /**
   * Set selection.
   */

  if (type == 'set_selection') {
    var _properties2 = op.properties,
        selection = op.selection;

    var inverse = _extends({}, op, {
      selection: _extends({}, selection, _properties2),
      properties: (0, _pick2.default)(selection, Object.keys(_properties2))
    });

    return inverse;
  }

  /**
   * Set state.
   */

  if (type == 'set_state') {
    var _properties3 = op.properties,
        state = op.state;

    return _extends({}, op, {
      state: state.merge(_properties3),
      properties: (0, _pick2.default)(state, Object.keys(_properties3))
    });
  }

  /**
   * Unknown.
   */

  throw new Error('Unknown op type: "' + type + '".');
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = invertOperation;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(19);

var defineProperty = function () {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

module.exports = defineProperty;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _isPlainObject = __webpack_require__(3);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _immutable = __webpack_require__(0);

var _modelTypes = __webpack_require__(4);

var _modelTypes2 = _interopRequireDefault(_modelTypes);

var _core = __webpack_require__(36);

var _core2 = _interopRequireDefault(_core);

var _data = __webpack_require__(32);

var _data2 = _interopRequireDefault(_data);

var _document = __webpack_require__(24);

var _document2 = _interopRequireDefault(_document);

var _history = __webpack_require__(99);

var _history2 = _interopRequireDefault(_history);

var _range = __webpack_require__(30);

var _range2 = _interopRequireDefault(_range);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  document: _document2.default.create(),
  selection: _range2.default.create(),
  history: _history2.default.create(),
  data: new _immutable.Map(),
  decorations: null
};

/**
 * State.
 *
 * @type {State}
 */

var State = function (_Record) {
  _inherits(State, _Record);

  function State() {
    _classCallCheck(this, State);

    return _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).apply(this, arguments));
  }

  _createClass(State, [{
    key: 'change',

    /**
     * Create a new `Change` with the current state as a starting point.
     *
     * @param {Object} attrs
     * @return {Change}
     */

    value: function change() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var Change = __webpack_require__(282).default;
      return new Change(_extends({}, attrs, { state: this }));
    }

    /**
     * Deprecated.
     *
     * @return {Change}
     */

  }, {
    key: 'transform',
    value: function transform() {
      _slateDevLogger2.default.deprecate('0.22.0', 'The `state.transform()` method has been deprecated in favor of `state.change()`.');
      return this.change.apply(this, arguments);
    }

    /**
     * Return a JSON representation of the state.
     *
     * @param {Object} options
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var object = {
        kind: this.kind,
        data: this.data.toJSON(),
        document: this.document.toJSON(options),
        selection: this.selection.toJSON(),
        decorations: this.decorations ? this.decorations.toArray().map(function (d) {
          return d.toJSON();
        }) : null,
        history: this.history.toJSON()
      };

      if ('preserveStateData' in options) {
        _slateDevLogger2.default.deprecate('0.26.0', 'The `preserveStateData` option to `state.toJSON` has been deprecated in favor of `options.preserveData`.');
        options.preserveData = options.preserveStateData;
      }

      if (!options.preserveData) {
        delete object.data;
      }

      if (!options.preserveDecorations) {
        delete object.decorations;
      }

      if (!options.preserveHistory) {
        delete object.history;
      }

      if (!options.preserveSelection) {
        delete object.selection;
      }

      if (options.preserveSelection && !options.preserveKeys) {
        var document = this.document,
            selection = this.selection;

        object.selection.anchorPath = selection.isSet ? document.getPath(selection.anchorKey) : null;
        object.selection.focusPath = selection.isSet ? document.getPath(selection.focusKey) : null;
        delete object.selection.anchorKey;
        delete object.selection.focusKey;
      }

      return object;
    }

    /**
     * Alias `toJS`.
     */

  }, {
    key: 'toJS',
    value: function toJS(options) {
      return this.toJSON(options);
    }
  }, {
    key: 'kind',

    /**
     * Get the kind.
     *
     * @return {String}
     */

    get: function get() {
      return 'state';
    }

    /**
     * Are there undoable events?
     *
     * @return {Boolean}
     */

  }, {
    key: 'hasUndos',
    get: function get() {
      return this.history.undos.size > 0;
    }

    /**
     * Are there redoable events?
     *
     * @return {Boolean}
     */

  }, {
    key: 'hasRedos',
    get: function get() {
      return this.history.redos.size > 0;
    }

    /**
     * Is the current selection blurred?
     *
     * @return {Boolean}
     */

  }, {
    key: 'isBlurred',
    get: function get() {
      return this.selection.isBlurred;
    }

    /**
     * Is the current selection focused?
     *
     * @return {Boolean}
     */

  }, {
    key: 'isFocused',
    get: function get() {
      return this.selection.isFocused;
    }

    /**
     * Is the current selection collapsed?
     *
     * @return {Boolean}
     */

  }, {
    key: 'isCollapsed',
    get: function get() {
      return this.selection.isCollapsed;
    }

    /**
     * Is the current selection expanded?
     *
     * @return {Boolean}
     */

  }, {
    key: 'isExpanded',
    get: function get() {
      return this.selection.isExpanded;
    }

    /**
     * Is the current selection backward?
     *
     * @return {Boolean} isBackward
     */

  }, {
    key: 'isBackward',
    get: function get() {
      return this.selection.isBackward;
    }

    /**
     * Is the current selection forward?
     *
     * @return {Boolean}
     */

  }, {
    key: 'isForward',
    get: function get() {
      return this.selection.isForward;
    }

    /**
     * Get the current start key.
     *
     * @return {String}
     */

  }, {
    key: 'startKey',
    get: function get() {
      return this.selection.startKey;
    }

    /**
     * Get the current end key.
     *
     * @return {String}
     */

  }, {
    key: 'endKey',
    get: function get() {
      return this.selection.endKey;
    }

    /**
     * Get the current start offset.
     *
     * @return {String}
     */

  }, {
    key: 'startOffset',
    get: function get() {
      return this.selection.startOffset;
    }

    /**
     * Get the current end offset.
     *
     * @return {String}
     */

  }, {
    key: 'endOffset',
    get: function get() {
      return this.selection.endOffset;
    }

    /**
     * Get the current anchor key.
     *
     * @return {String}
     */

  }, {
    key: 'anchorKey',
    get: function get() {
      return this.selection.anchorKey;
    }

    /**
     * Get the current focus key.
     *
     * @return {String}
     */

  }, {
    key: 'focusKey',
    get: function get() {
      return this.selection.focusKey;
    }

    /**
     * Get the current anchor offset.
     *
     * @return {String}
     */

  }, {
    key: 'anchorOffset',
    get: function get() {
      return this.selection.anchorOffset;
    }

    /**
     * Get the current focus offset.
     *
     * @return {String}
     */

  }, {
    key: 'focusOffset',
    get: function get() {
      return this.selection.focusOffset;
    }

    /**
     * Get the current start text node's closest block parent.
     *
     * @return {Block}
     */

  }, {
    key: 'startBlock',
    get: function get() {
      return this.startKey && this.document.getClosestBlock(this.startKey);
    }

    /**
     * Get the current end text node's closest block parent.
     *
     * @return {Block}
     */

  }, {
    key: 'endBlock',
    get: function get() {
      return this.endKey && this.document.getClosestBlock(this.endKey);
    }

    /**
     * Get the current anchor text node's closest block parent.
     *
     * @return {Block}
     */

  }, {
    key: 'anchorBlock',
    get: function get() {
      return this.anchorKey && this.document.getClosestBlock(this.anchorKey);
    }

    /**
     * Get the current focus text node's closest block parent.
     *
     * @return {Block}
     */

  }, {
    key: 'focusBlock',
    get: function get() {
      return this.focusKey && this.document.getClosestBlock(this.focusKey);
    }

    /**
     * Get the current start text node's closest inline parent.
     *
     * @return {Inline}
     */

  }, {
    key: 'startInline',
    get: function get() {
      return this.startKey && this.document.getClosestInline(this.startKey);
    }

    /**
     * Get the current end text node's closest inline parent.
     *
     * @return {Inline}
     */

  }, {
    key: 'endInline',
    get: function get() {
      return this.endKey && this.document.getClosestInline(this.endKey);
    }

    /**
     * Get the current anchor text node's closest inline parent.
     *
     * @return {Inline}
     */

  }, {
    key: 'anchorInline',
    get: function get() {
      return this.anchorKey && this.document.getClosestInline(this.anchorKey);
    }

    /**
     * Get the current focus text node's closest inline parent.
     *
     * @return {Inline}
     */

  }, {
    key: 'focusInline',
    get: function get() {
      return this.focusKey && this.document.getClosestInline(this.focusKey);
    }

    /**
     * Get the current start text node.
     *
     * @return {Text}
     */

  }, {
    key: 'startText',
    get: function get() {
      return this.startKey && this.document.getDescendant(this.startKey);
    }

    /**
     * Get the current end node.
     *
     * @return {Text}
     */

  }, {
    key: 'endText',
    get: function get() {
      return this.endKey && this.document.getDescendant(this.endKey);
    }

    /**
     * Get the current anchor node.
     *
     * @return {Text}
     */

  }, {
    key: 'anchorText',
    get: function get() {
      return this.anchorKey && this.document.getDescendant(this.anchorKey);
    }

    /**
     * Get the current focus node.
     *
     * @return {Text}
     */

  }, {
    key: 'focusText',
    get: function get() {
      return this.focusKey && this.document.getDescendant(this.focusKey);
    }

    /**
     * Get the next block node.
     *
     * @return {Block}
     */

  }, {
    key: 'nextBlock',
    get: function get() {
      return this.endKey && this.document.getNextBlock(this.endKey);
    }

    /**
     * Get the previous block node.
     *
     * @return {Block}
     */

  }, {
    key: 'previousBlock',
    get: function get() {
      return this.startKey && this.document.getPreviousBlock(this.startKey);
    }

    /**
     * Get the next inline node.
     *
     * @return {Inline}
     */

  }, {
    key: 'nextInline',
    get: function get() {
      return this.endKey && this.document.getNextInline(this.endKey);
    }

    /**
     * Get the previous inline node.
     *
     * @return {Inline}
     */

  }, {
    key: 'previousInline',
    get: function get() {
      return this.startKey && this.document.getPreviousInline(this.startKey);
    }

    /**
     * Get the next text node.
     *
     * @return {Text}
     */

  }, {
    key: 'nextText',
    get: function get() {
      return this.endKey && this.document.getNextText(this.endKey);
    }

    /**
     * Get the previous text node.
     *
     * @return {Text}
     */

  }, {
    key: 'previousText',
    get: function get() {
      return this.startKey && this.document.getPreviousText(this.startKey);
    }

    /**
     * Get the characters in the current selection.
     *
     * @return {List<Character>}
     */

  }, {
    key: 'characters',
    get: function get() {
      return this.selection.isUnset ? new _immutable.List() : this.document.getCharactersAtRange(this.selection);
    }

    /**
     * Get the marks of the current selection.
     *
     * @return {Set<Mark>}
     */

  }, {
    key: 'marks',
    get: function get() {
      return this.selection.isUnset ? new _immutable.Set() : this.selection.marks || this.document.getMarksAtRange(this.selection);
    }

    /**
     * Get the active marks of the current selection.
     *
     * @return {Set<Mark>}
     */

  }, {
    key: 'activeMarks',
    get: function get() {
      return this.selection.isUnset ? new _immutable.Set() : this.selection.marks || this.document.getActiveMarksAtRange(this.selection);
    }

    /**
     * Get the block nodes in the current selection.
     *
     * @return {List<Block>}
     */

  }, {
    key: 'blocks',
    get: function get() {
      return this.selection.isUnset ? new _immutable.List() : this.document.getBlocksAtRange(this.selection);
    }

    /**
     * Get the fragment of the current selection.
     *
     * @return {Document}
     */

  }, {
    key: 'fragment',
    get: function get() {
      return this.selection.isUnset ? _document2.default.create() : this.document.getFragmentAtRange(this.selection);
    }

    /**
     * Get the inline nodes in the current selection.
     *
     * @return {List<Inline>}
     */

  }, {
    key: 'inlines',
    get: function get() {
      return this.selection.isUnset ? new _immutable.List() : this.document.getInlinesAtRange(this.selection);
    }

    /**
     * Get the text nodes in the current selection.
     *
     * @return {List<Text>}
     */

  }, {
    key: 'texts',
    get: function get() {
      return this.selection.isUnset ? new _immutable.List() : this.document.getTextsAtRange(this.selection);
    }

    /**
     * Check whether the selection is empty.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isEmpty',
    get: function get() {
      if (this.isCollapsed) return true;
      if (this.endOffset != 0 && this.startOffset != 0) return false;
      return this.fragment.text.length == 0;
    }

    /**
     * Check whether the selection is collapsed in a void node.
     *
     * @return {Boolean}
     */

  }, {
    key: 'isInVoid',
    get: function get() {
      if (this.isExpanded) return false;
      return this.document.hasVoidParent(this.startKey);
    }
  }], [{
    key: 'create',

    /**
     * Create a new `State` with `attrs`.
     *
     * @param {Object|State} attrs
     * @param {Object} options
     * @return {State}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (State.isState(attrs)) {
        return attrs;
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        return State.fromJSON(attrs);
      }

      throw new Error('`State.create` only accepts objects or states, but you passed it: ' + attrs);
    }

    /**
     * Create a dictionary of settable state properties from `attrs`.
     *
     * @param {Object|State} attrs
     * @return {Object}
     */

  }, {
    key: 'createProperties',
    value: function createProperties() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (State.isState(attrs)) {
        return {
          data: attrs.data,
          decorations: attrs.decorations
        };
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        var props = {};
        if ('data' in attrs) props.data = _data2.default.create(attrs.data);
        if ('decorations' in attrs) props.decorations = _range2.default.createList(attrs.decorations);
        return props;
      }

      throw new Error('`State.createProperties` only accepts objects or states, but you passed it: ' + attrs);
    }

    /**
     * Create a `State` from a JSON `object`.
     *
     * @param {Object} object
     * @param {Object} options
     *   @property {Boolean} normalize
     *   @property {Array} plugins
     * @return {State}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _object$document = object.document,
          document = _object$document === undefined ? {} : _object$document,
          _object$selection = object.selection,
          selection = _object$selection === undefined ? {} : _object$selection;

      var data = new _immutable.Map();

      document = _document2.default.fromJSON(document);
      selection = _range2.default.fromJSON(selection);

      // Allow plugins to set a default value for `data`.
      if (options.plugins) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = options.plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var plugin = _step.value;

            if (plugin.data) data = data.merge(plugin.data);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      // Then merge in the `data` provided.
      if ('data' in object) {
        data = data.merge(object.data);
      }

      if (selection.isUnset) {
        var text = document.getFirstText();
        if (text) selection = selection.collapseToStartOf(text);
      }

      var state = new State({
        data: data,
        document: document,
        selection: selection
      });

      if (options.normalize !== false) {
        state = state.change({ save: false }).normalize(_core2.default).state;
      }

      return state;
    }

    /**
     * Alias `fromJS`.
     */

  }, {
    key: 'isState',

    /**
     * Check if a `value` is a `State`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

    value: function isState(value) {
      return !!(value && value[_modelTypes2.default.STATE]);
    }
  }]);

  return State;
}((0, _immutable.Record)(DEFAULTS));

/**
 * Attach a pseudo-symbol for type checking.
 */

State.fromJS = State.fromJSON;
State.prototype[_modelTypes2.default.STATE] = true;

/**
 * Export.
 */

exports.default = State;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

var _isEqual = __webpack_require__(281);

var _isEqual2 = _interopRequireDefault(_isEqual);

var _isPlainObject = __webpack_require__(3);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _immutable = __webpack_require__(0);

var _modelTypes = __webpack_require__(4);

var _modelTypes2 = _interopRequireDefault(_modelTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:history');

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  redos: new _immutable.Stack(),
  undos: new _immutable.Stack()
};

/**
 * History.
 *
 * @type {History}
 */

var History = function (_Record) {
  _inherits(History, _Record);

  function History() {
    _classCallCheck(this, History);

    return _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).apply(this, arguments));
  }

  _createClass(History, [{
    key: 'save',

    /**
     * Save an `operation` into the history.
     *
     * @param {Object} operation
     * @param {Object} options
     * @return {History}
     */

    value: function save(operation) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var history = this;
      var _history = history,
          undos = _history.undos,
          redos = _history.redos;
      var merge = options.merge,
          skip = options.skip;

      var prevBatch = undos.peek();
      var prevOperation = prevBatch && prevBatch[prevBatch.length - 1];

      if (skip == null) {
        skip = shouldSkip(operation, prevOperation);
      }

      if (skip) {
        return history;
      }

      if (merge == null) {
        merge = shouldMerge(operation, prevOperation);
      }

      debug('save', { operation: operation, merge: merge });

      // If the `merge` flag is true, add the operation to the previous batch.
      if (merge) {
        var batch = prevBatch.slice();
        batch.push(operation);
        undos = undos.pop();
        undos = undos.push(batch);
      }

      // Otherwise, create a new batch with the operation.
      else {
          var _batch = [operation];
          undos = undos.push(_batch);
        }

      // Constrain the history to 100 entries for memory's sake.
      if (undos.length > 100) {
        undos = undos.take(100);
      }

      // Clear the redos and update the history.
      redos = redos.clear();
      history = history.set('undos', undos).set('redos', redos);
      return history;
    }

    /**
     * Return a JSON representation of the history.
     *
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var object = {
        kind: this.kind,
        redos: this.redos.toJSON(),
        undos: this.undos.toJSON()
      };

      return object;
    }

    /**
     * Alias `toJS`.
     */

  }, {
    key: 'toJS',
    value: function toJS() {
      return this.toJSON();
    }
  }, {
    key: 'kind',

    /**
     * Get the kind.
     *
     * @return {String}
     */

    get: function get() {
      return 'history';
    }
  }], [{
    key: 'create',

    /**
     * Create a new `History` with `attrs`.
     *
     * @param {Object|History} attrs
     * @return {History}
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (History.isHistory(attrs)) {
        return attrs;
      }

      if ((0, _isPlainObject2.default)(attrs)) {
        return History.fromJSON(attrs);
      }

      throw new Error('`History.create` only accepts objects or histories, but you passed it: ' + attrs);
    }

    /**
     * Create a `History` from a JSON `object`.
     *
     * @param {Object} object
     * @return {History}
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(object) {
      var _object$redos = object.redos,
          redos = _object$redos === undefined ? [] : _object$redos,
          _object$undos = object.undos,
          undos = _object$undos === undefined ? [] : _object$undos;

      var history = new History({
        redos: new _immutable.Stack(redos),
        undos: new _immutable.Stack(undos)
      });

      return history;
    }

    /**
     * Alias `fromJS`.
     */

  }, {
    key: 'isHistory',

    /**
     * Check if a `value` is a `History`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

    value: function isHistory(value) {
      return !!(value && value[_modelTypes2.default.HISTORY]);
    }
  }]);

  return History;
}((0, _immutable.Record)(DEFAULTS));

/**
 * Attach a pseudo-symbol for type checking.
 */

History.fromJS = History.fromJSON;
History.prototype[_modelTypes2.default.HISTORY] = true;

/**
 * Check whether to merge a new operation `o` into the previous operation `p`.
 *
 * @param {Object} o
 * @param {Object} p
 * @return {Boolean}
 */

function shouldMerge(o, p) {
  if (!p) return false;

  var merge = o.type == 'set_selection' && p.type == 'set_selection' || o.type == 'insert_text' && p.type == 'insert_text' && o.offset == p.offset + p.text.length && (0, _isEqual2.default)(o.path, p.path) || o.type == 'remove_text' && p.type == 'remove_text' && o.offset + o.text.length == p.offset && (0, _isEqual2.default)(o.path, p.path);

  return merge;
}

/**
 * Check whether to skip a new operation `o`, given previous operation `p`.
 *
 * @param {Object} o
 * @param {Object} p
 * @return {Boolean}
 */

function shouldSkip(o, p) {
  if (!p) return false;

  var skip = o.type == 'set_selection' && p.type == 'set_selection';

  return skip;
}

/**
 * Export.
 *
 * @type {History}
 */

exports.default = History;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _node = __webpack_require__(17);

var _node2 = _interopRequireDefault(_node);

var _mark = __webpack_require__(15);

var _mark2 = _interopRequireDefault(_mark);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:operation:apply');

/**
 * Applying functions.
 *
 * @type {Object}
 */

var APPLIERS = {

  /**
   * Add mark to text at `offset` and `length` in node by `path`.
   *
   * @param {State} state
   * @param {Object} operation
   * @return {State}
   */

  add_mark: function add_mark(state, operation) {
    var path = operation.path,
        offset = operation.offset,
        length = operation.length;

    var mark = _mark2.default.create(operation.mark);
    var _state = state,
        document = _state.document;

    var node = document.assertPath(path);
    node = node.addMark(offset, length, mark);
    document = document.updateNode(node);
    state = state.set('document', document);
    return state;
  },

  /**
   * Insert a `node` at `index` in a node by `path`.
   *
   * @param {State} state
   * @param {Object} operation
   * @return {State}
   */

  insert_node: function insert_node(state, operation) {
    var path = operation.path;

    var node = _node2.default.create(operation.node);
    var index = path[path.length - 1];
    var rest = path.slice(0, -1);
    var _state2 = state,
        document = _state2.document;

    var parent = document.assertPath(rest);
    parent = parent.insertNode(index, node);
    document = document.updateNode(parent);
    state = state.set('document', document);
    return state;
  },

  /**
   * Insert `text` at `offset` in node by `path`.
   *
   * @param {State} state
   * @param {Object} operation
   * @return {State}
   */

  insert_text: function insert_text(state, operation) {
    var path = operation.path,
        offset = operation.offset,
        text = operation.text;
    var marks = operation.marks;

    if (Array.isArray(marks)) marks = _mark2.default.createSet(marks);

    var _state3 = state,
        document = _state3.document,
        selection = _state3.selection;
    var _selection = selection,
        anchorKey = _selection.anchorKey,
        focusKey = _selection.focusKey,
        anchorOffset = _selection.anchorOffset,
        focusOffset = _selection.focusOffset;

    var node = document.assertPath(path);

    // Update the document
    node = node.insertText(offset, text, marks);
    document = document.updateNode(node);

    // Update the selection
    if (anchorKey == node.key && anchorOffset >= offset) {
      selection = selection.moveAnchor(text.length);
    }
    if (focusKey == node.key && focusOffset >= offset) {
      selection = selection.moveFocus(text.length);
    }

    state = state.set('document', document).set('selection', selection);
    return state;
  },

  /**
   * Merge a node at `path` with the previous node.
   *
   * @param {State} state
   * @param {Object} operation
   * @return {State}
   */

  merge_node: function merge_node(state, operation) {
    var path = operation.path;

    var withPath = path.slice(0, path.length - 1).concat([path[path.length - 1] - 1]);
    var _state4 = state,
        document = _state4.document,
        selection = _state4.selection;

    var one = document.assertPath(withPath);
    var two = document.assertPath(path);
    var parent = document.getParent(one.key);
    var oneIndex = parent.nodes.indexOf(one);
    var twoIndex = parent.nodes.indexOf(two);

    // Perform the merge in the document.
    parent = parent.mergeNode(oneIndex, twoIndex);
    document = document.updateNode(parent);

    // If the nodes are text nodes and the selection is inside the second node
    // update it to refer to the first node instead.
    if (one.kind == 'text') {
      var _selection2 = selection,
          anchorKey = _selection2.anchorKey,
          anchorOffset = _selection2.anchorOffset,
          focusKey = _selection2.focusKey,
          focusOffset = _selection2.focusOffset;

      var normalize = false;

      if (anchorKey == two.key) {
        selection = selection.moveAnchorTo(one.key, one.text.length + anchorOffset);
        normalize = true;
      }

      if (focusKey == two.key) {
        selection = selection.moveFocusTo(one.key, one.text.length + focusOffset);
        normalize = true;
      }

      if (normalize) {
        selection = selection.normalize(document);
      }
    }

    // Update the document and selection.
    state = state.set('document', document).set('selection', selection);
    return state;
  },

  /**
   * Move a node by `path` to `newPath`.
   *
   * @param {State} state
   * @param {Object} operation
   * @return {State}
   */

  move_node: function move_node(state, operation) {
    var path = operation.path,
        newPath = operation.newPath;

    var newIndex = newPath[newPath.length - 1];
    var newParentPath = newPath.slice(0, -1);
    var oldParentPath = path.slice(0, -1);
    var oldIndex = path[path.length - 1];
    var _state5 = state,
        document = _state5.document;

    var node = document.assertPath(path);

    // Remove the node from its current parent.
    var parent = document.getParent(node.key);
    parent = parent.removeNode(oldIndex);
    document = document.updateNode(parent);

    // Find the new target...
    var target = void 0;

    // If the old path and the rest of the new path are the same, then the new
    // target is the old parent.
    if (oldParentPath.every(function (x, i) {
      return x === newParentPath[i];
    }) && oldParentPath.length === newParentPath.length) {
      target = parent;
    }

    // Otherwise, if the old path removal resulted in the new path being no longer
    // correct, we need to decrement the new path at the old path's last index.
    else if (oldParentPath.every(function (x, i) {
        return x === newParentPath[i];
      }) && oldIndex < newParentPath[oldParentPath.length]) {
        newParentPath[oldParentPath.length]--;
        target = document.assertPath(newParentPath);
      }

      // Otherwise, we can just grab the target normally...
      else {
          target = document.assertPath(newParentPath);
        }

    // Insert the new node to its new parent.
    target = target.insertNode(newIndex, node);
    document = document.updateNode(target);
    state = state.set('document', document);
    return state;
  },

  /**
   * Remove mark from text at `offset` and `length` in node by `path`.
   *
   * @param {State} state
   * @param {Object} operation
   * @return {State}
   */

  remove_mark: function remove_mark(state, operation) {
    var path = operation.path,
        offset = operation.offset,
        length = operation.length;

    var mark = _mark2.default.create(operation.mark);
    var _state6 = state,
        document = _state6.document;

    var node = document.assertPath(path);
    node = node.removeMark(offset, length, mark);
    document = document.updateNode(node);
    state = state.set('document', document);
    return state;
  },

  /**
   * Remove a node by `path`.
   *
   * @param {State} state
   * @param {Object} operation
   * @return {State}
   */

  remove_node: function remove_node(state, operation) {
    var path = operation.path;
    var _state7 = state,
        document = _state7.document,
        selection = _state7.selection;
    var _selection3 = selection,
        startKey = _selection3.startKey,
        endKey = _selection3.endKey;

    var node = document.assertPath(path);
    // If the selection is set, check to see if it needs to be updated.
    if (selection.isSet) {
      var hasStartNode = node.hasNode(startKey);
      var hasEndNode = node.hasNode(endKey);
      var first = node.kind == 'text' ? node : node.getFirstText() || node;
      var last = node.kind == 'text' ? node : node.getLastText() || node;
      var prev = document.getPreviousText(first.key);
      var next = document.getNextText(last.key);

      // If the start point was in this node, update it to be just before/after.
      if (hasStartNode) {
        if (prev) {
          selection = selection.moveStartTo(prev.key, prev.text.length);
        } else if (next) {
          selection = selection.moveStartTo(next.key, 0);
        } else {
          selection = selection.deselect();
        }
      }

      // If the end point was in this node, update it to be just before/after.
      if (selection.isSet && hasEndNode) {
        if (prev) {
          selection = selection.moveEndTo(prev.key, prev.text.length);
        } else if (next) {
          selection = selection.moveEndTo(next.key, 0);
        } else {
          selection = selection.deselect();
        }
      }

      // If the selection wasn't deselected, normalize it.
      if (selection.isSet) {
        selection = selection.normalize(document);
      }
    }

    // Remove the node from the document.
    var parent = document.getParent(node.key);
    var index = parent.nodes.indexOf(node);
    parent = parent.removeNode(index);
    document = document.updateNode(parent);

    // Update the document and selection.
    state = state.set('document', document).set('selection', selection);
    return state;
  },

  /**
   * Remove `text` at `offset` in node by `path`.
   *
   * @param {State} state
   * @param {Object} operation
   * @return {State}
   */

  remove_text: function remove_text(state, operation) {
    var path = operation.path,
        offset = operation.offset,
        text = operation.text;
    var length = text.length;

    var rangeOffset = offset + length;
    var _state8 = state,
        document = _state8.document,
        selection = _state8.selection;
    var _selection4 = selection,
        anchorKey = _selection4.anchorKey,
        focusKey = _selection4.focusKey,
        anchorOffset = _selection4.anchorOffset,
        focusOffset = _selection4.focusOffset;

    var node = document.assertPath(path);

    // Update the selection.
    if (anchorKey == node.key && anchorOffset >= rangeOffset) {
      selection = selection.moveAnchor(-length);
    }

    if (focusKey == node.key && focusOffset >= rangeOffset) {
      selection = selection.moveFocus(-length);
    }

    node = node.removeText(offset, length);
    document = document.updateNode(node);
    state = state.set('document', document).set('selection', selection);
    return state;
  },

  /**
   * Set `properties` on mark on text at `offset` and `length` in node by `path`.
   *
   * @param {State} state
   * @param {Object} operation
   * @return {State}
   */

  set_mark: function set_mark(state, operation) {
    var path = operation.path,
        offset = operation.offset,
        length = operation.length,
        properties = operation.properties;

    var mark = _mark2.default.create(operation.mark);
    var _state9 = state,
        document = _state9.document;

    var node = document.assertPath(path);
    node = node.updateMark(offset, length, mark, properties);
    document = document.updateNode(node);
    state = state.set('document', document);
    return state;
  },

  /**
   * Set `properties` on a node by `path`.
   *
   * @param {State} state
   * @param {Object} operation
   * @return {State}
   */

  set_node: function set_node(state, operation) {
    var path = operation.path,
        properties = operation.properties;
    var _state10 = state,
        document = _state10.document;

    var node = document.assertPath(path);

    if ('nodes' in properties) {
      _slateDevLogger2.default.warn('Updating a Node\'s `nodes` property via `setNode()` is not allowed. Use the appropriate insertion and removal methods instead. The operation in question was:', operation);
      delete properties.nodes;
    }

    if ('key' in properties) {
      _slateDevLogger2.default.warn('Updating a Node\'s `key` property via `setNode()` is not allowed. There should be no reason to do this. The operation in question was:', operation);
      delete properties.key;
    }

    node = node.merge(properties);
    document = document.updateNode(node);
    state = state.set('document', document);
    return state;
  },

  /**
   * Set `properties` on the selection.
   *
   * @param {State} state
   * @param {Object} operation
   * @return {State}
   */

  set_selection: function set_selection(state, operation) {
    var properties = _extends({}, operation.properties);
    var _state11 = state,
        document = _state11.document,
        selection = _state11.selection;

    if (properties.marks != null) {
      properties.marks = _mark2.default.createSet(properties.marks);
    }

    if (properties.anchorPath !== undefined) {
      properties.anchorKey = properties.anchorPath === null ? null : document.assertPath(properties.anchorPath).key;
      delete properties.anchorPath;
    }

    if (properties.focusPath !== undefined) {
      properties.focusKey = properties.focusPath === null ? null : document.assertPath(properties.focusPath).key;
      delete properties.focusPath;
    }

    selection = selection.merge(properties);
    selection = selection.normalize(document);
    state = state.set('selection', selection);
    return state;
  },

  /**
   * Set `properties` on `state`.
   *
   * @param {State} state
   * @param {Object} operation
   * @return {State}
   */

  set_state: function set_state(state, operation) {
    var properties = operation.properties;

    if ('document' in properties) {
      _slateDevLogger2.default.warn('Updating `state.document` property via `setState()` is not allowed. Use the appropriate document updating methods instead. The operation in question was:', operation);
      delete properties.document;
    }

    if ('selection' in properties) {
      _slateDevLogger2.default.warn('Updating `state.selection` property via `setState()` is not allowed. Use the appropriate selection updating methods instead. The operation in question was:', operation);
      delete properties.selection;
    }

    if ('history' in properties) {
      _slateDevLogger2.default.warn('Updating `state.history` property via `setState()` is not allowed. Use the appropriate history updating methods instead. The operation in question was:', operation);
      delete properties.history;
    }

    state = state.merge(properties);
    return state;
  },

  /**
   * Split a node by `path` at `offset`.
   *
   * @param {State} state
   * @param {Object} operation
   * @return {State}
   */

  split_node: function split_node(state, operation) {
    var path = operation.path,
        position = operation.position;
    var _state12 = state,
        document = _state12.document,
        selection = _state12.selection;

    // Calculate a few things...

    var node = document.assertPath(path);
    var parent = document.getParent(node.key);
    var index = parent.nodes.indexOf(node);

    // Split the node by its parent.
    parent = parent.splitNode(index, position);
    document = document.updateNode(parent);

    // Determine whether we need to update the selection...
    var _selection5 = selection,
        startKey = _selection5.startKey,
        endKey = _selection5.endKey,
        startOffset = _selection5.startOffset,
        endOffset = _selection5.endOffset;

    var next = document.getNextText(node.key);
    var normalize = false;

    // If the start point is after or equal to the split, update it.
    if (node.key == startKey && position <= startOffset) {
      selection = selection.moveStartTo(next.key, startOffset - position);
      normalize = true;
    }

    // If the end point is after or equal to the split, update it.
    if (node.key == endKey && position <= endOffset) {
      selection = selection.moveEndTo(next.key, endOffset - position);
      normalize = true;
    }

    // Normalize the selection if we changed it, since the methods we use might
    // leave it in a non-normalized state.
    if (normalize) {
      selection = selection.normalize(document);
    }

    // Return the updated state.
    state = state.set('document', document).set('selection', selection);
    return state;
  }
};

/**
 * Apply an `operation` to a `state`.
 *
 * @param {State} state
 * @param {Object} operation
 * @return {State} state
 */

function applyOperation(state, operation) {
  var type = operation.type;

  var apply = APPLIERS[type];

  if (!apply) {
    throw new Error('Unknown operation type: "' + type + '".');
  }

  debug(type, operation);
  state = apply(state, operation);
  return state;
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = applyOperation;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slate = __webpack_require__(8);

/**
 * Encode a JSON `object` as base-64 `string`.
 *
 * @param {Object} object
 * @return {String}
 */

function encode(object) {
  var string = JSON.stringify(object);
  var encoded = window.btoa(window.encodeURIComponent(string));
  return encoded;
}

/**
 * Decode a base-64 `string` to a JSON `object`.
 *
 * @param {String} string
 * @return {Object}
 */

function decode(string) {
  var decoded = window.decodeURIComponent(window.atob(string));
  var object = JSON.parse(decoded);
  return object;
}

/**
 * Deserialize a State `string`.
 *
 * @param {String} string
 * @return {State}
 */

function deserialize(string, options) {
  var raw = decode(string);
  var state = _slate.State.fromJSON(raw, options);
  return state;
}

/**
 * Deserialize a Node `string`.
 *
 * @param {String} string
 * @return {Node}
 */

function deserializeNode(string, options) {
  var _require = __webpack_require__(8),
      Node = _require.Node;

  var raw = decode(string);
  var node = Node.fromJSON(raw, options);
  return node;
}

/**
 * Serialize a `state`.
 *
 * @param {State} state
 * @return {String}
 */

function serialize(state, options) {
  var raw = state.toJSON(options);
  var encoded = encode(raw);
  return encoded;
}

/**
 * Serialize a `node`.
 *
 * @param {Node} node
 * @return {String}
 */

function serializeNode(node, options) {
  var raw = node.toJSON(options);
  var encoded = encode(raw);
  return encoded;
}

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = {
  deserialize: deserialize,
  deserializeNode: deserializeNode,
  serialize: serialize,
  serializeNode: serializeNode
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isHotkey = __webpack_require__(290);

var _environment = __webpack_require__(31);

/**
 * Hotkeys.
 *
 * @type {Function}
 */

var BOLD = (0, _isHotkey.isKeyHotkey)('mod+b');
var ITALIC = (0, _isHotkey.isKeyHotkey)('mod+i');

var ENTER = (0, _isHotkey.isKeyHotkey)('enter');
var SHIFT_ENTER = (0, _isHotkey.isKeyHotkey)('shift+enter');
var SPLIT_BLOCK = function SPLIT_BLOCK(e) {
  return ENTER(e) || SHIFT_ENTER(e);
};

var BACKSPACE = (0, _isHotkey.isKeyHotkey)('backspace');
var SHIFT_BACKSPACE = (0, _isHotkey.isKeyHotkey)('shift+backspace');
var DELETE = (0, _isHotkey.isKeyHotkey)('delete');
var SHIFT_DELETE = (0, _isHotkey.isKeyHotkey)('shift+delete');
var DELETE_BACKWARD = function DELETE_BACKWARD(e) {
  return BACKSPACE(e) || SHIFT_BACKSPACE(e);
};
var DELETE_FORWARD = function DELETE_FORWARD(e) {
  return DELETE(e) || SHIFT_DELETE(e);
};

var DELETE_CHAR_BACKWARD_MAC = (0, _isHotkey.isKeyHotkey)('ctrl+h');
var DELETE_CHAR_FORWARD_MAC = (0, _isHotkey.isKeyHotkey)('ctrl+d');
var DELETE_CHAR_BACKWARD = function DELETE_CHAR_BACKWARD(e) {
  return DELETE_BACKWARD(e) || _environment.IS_MAC && DELETE_CHAR_BACKWARD_MAC(e);
};
var DELETE_CHAR_FORWARD = function DELETE_CHAR_FORWARD(e) {
  return DELETE_FORWARD(e) || _environment.IS_MAC && DELETE_CHAR_FORWARD_MAC(e);
};

var DELETE_LINE_BACKWARD_MAC = (0, _isHotkey.isKeyHotkey)('cmd+backspace');
var DELETE_LINE_FORWARD_MAC = (0, _isHotkey.isKeyHotkey)('ctrl+k');
var DELETE_LINE_BACKWARD = function DELETE_LINE_BACKWARD(e) {
  return _environment.IS_MAC && DELETE_LINE_BACKWARD_MAC(e);
};
var DELETE_LINE_FORWARD = function DELETE_LINE_FORWARD(e) {
  return _environment.IS_MAC && DELETE_LINE_FORWARD_MAC(e);
};

var DELETE_WORD_BACKWARD_MAC = (0, _isHotkey.isKeyHotkey)('option+backspace');
var DELETE_WORD_BACKWARD_PC = (0, _isHotkey.isKeyHotkey)('ctrl+backspace');
var DELETE_WORD_FORWARD_MAC = (0, _isHotkey.isKeyHotkey)('option+delete');
var DELETE_WORD_FORWARD_PC = (0, _isHotkey.isKeyHotkey)('ctrl+delete');
var DELETE_WORD_BACKWARD = function DELETE_WORD_BACKWARD(e) {
  return _environment.IS_MAC ? DELETE_WORD_BACKWARD_MAC(e) : DELETE_WORD_BACKWARD_PC(e);
};
var DELETE_WORD_FORWARD = function DELETE_WORD_FORWARD(e) {
  return _environment.IS_MAC ? DELETE_WORD_FORWARD_MAC(e) : DELETE_WORD_FORWARD_PC(e);
};

var COLLAPSE_CHAR_FORWARD = (0, _isHotkey.isKeyHotkey)('right');
var COLLAPSE_CHAR_BACKWARD = (0, _isHotkey.isKeyHotkey)('left');

var COLLAPSE_LINE_BACKWARD_MAC = (0, _isHotkey.isKeyHotkey)('option+up');
var COLLAPSE_LINE_FORWARD_MAC = (0, _isHotkey.isKeyHotkey)('option+down');
var COLLAPSE_LINE_BACKWARD = function COLLAPSE_LINE_BACKWARD(e) {
  return _environment.IS_MAC && COLLAPSE_LINE_BACKWARD_MAC(e);
};
var COLLAPSE_LINE_FORWARD = function COLLAPSE_LINE_FORWARD(e) {
  return _environment.IS_MAC && COLLAPSE_LINE_FORWARD_MAC(e);
};

var EXTEND_CHAR_FORWARD = (0, _isHotkey.isKeyHotkey)('shift+right');
var EXTEND_CHAR_BACKWARD = (0, _isHotkey.isKeyHotkey)('shift+left');

var EXTEND_LINE_BACKWARD_MAC = (0, _isHotkey.isKeyHotkey)('option+shift+up');
var EXTEND_LINE_FORWARD_MAC = (0, _isHotkey.isKeyHotkey)('option+shift+down');
var EXTEND_LINE_BACKWARD = function EXTEND_LINE_BACKWARD(e) {
  return _environment.IS_MAC && EXTEND_LINE_BACKWARD_MAC(e);
};
var EXTEND_LINE_FORWARD = function EXTEND_LINE_FORWARD(e) {
  return _environment.IS_MAC && EXTEND_LINE_FORWARD_MAC(e);
};

var UNDO = (0, _isHotkey.isKeyHotkey)('mod+z');
var REDO_MAC = (0, _isHotkey.isKeyHotkey)('mod+shift+z');
var REDO_PC = (0, _isHotkey.isKeyHotkey)('mod+y');
var REDO = function REDO(e) {
  return _environment.IS_MAC ? REDO_MAC(e) : REDO_PC(e);
};

var TRANSPOSE_CHARACTER_MAC = (0, _isHotkey.isKeyHotkey)('ctrl+t');
var TRANSPOSE_CHARACTER = function TRANSPOSE_CHARACTER(e) {
  return _environment.IS_MAC && TRANSPOSE_CHARACTER_MAC(e);
};

var CONTENTEDITABLE = function CONTENTEDITABLE(e) {
  return BOLD(e) || DELETE_CHAR_BACKWARD(e) || DELETE_CHAR_FORWARD(e) || DELETE_LINE_BACKWARD(e) || DELETE_LINE_FORWARD(e) || DELETE_WORD_BACKWARD(e) || DELETE_WORD_FORWARD(e) || ITALIC(e) || REDO(e) || SPLIT_BLOCK(e) || TRANSPOSE_CHARACTER(e) || UNDO(e);
};

var COMPOSING = function COMPOSING(e) {
  return e.key == 'ArrowDown' || e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'ArrowUp';
};

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = {
  BOLD: BOLD,
  COLLAPSE_LINE_BACKWARD: COLLAPSE_LINE_BACKWARD,
  COLLAPSE_LINE_FORWARD: COLLAPSE_LINE_FORWARD,
  COLLAPSE_CHAR_FORWARD: COLLAPSE_CHAR_FORWARD,
  COLLAPSE_CHAR_BACKWARD: COLLAPSE_CHAR_BACKWARD,
  COMPOSING: COMPOSING,
  CONTENTEDITABLE: CONTENTEDITABLE,
  DELETE_CHAR_BACKWARD: DELETE_CHAR_BACKWARD,
  DELETE_CHAR_FORWARD: DELETE_CHAR_FORWARD,
  DELETE_LINE_BACKWARD: DELETE_LINE_BACKWARD,
  DELETE_LINE_FORWARD: DELETE_LINE_FORWARD,
  DELETE_WORD_BACKWARD: DELETE_WORD_BACKWARD,
  DELETE_WORD_FORWARD: DELETE_WORD_FORWARD,
  EXTEND_LINE_BACKWARD: EXTEND_LINE_BACKWARD,
  EXTEND_LINE_FORWARD: EXTEND_LINE_FORWARD,
  EXTEND_CHAR_FORWARD: EXTEND_CHAR_FORWARD,
  EXTEND_CHAR_BACKWARD: EXTEND_CHAR_BACKWARD,
  ITALIC: ITALIC,
  REDO: REDO,
  SPLIT_BLOCK: SPLIT_BLOCK,
  UNDO: UNDO
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * This is a straight rip-off of the React.js ReactPropTypes.js proptype validators,
 * modified to make it possible to validate Immutable.js data.
 *     ImmutableTypes.listOf is patterned after React.PropTypes.arrayOf, but for Immutable.List
 *     ImmutableTypes.shape  is based on React.PropTypes.shape, but for any Immutable.Iterable
 */


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Immutable = __webpack_require__(0);

var ANONYMOUS = "<<anonymous>>";

var ImmutablePropTypes = {
  listOf: createListOfTypeChecker,
  mapOf: createMapOfTypeChecker,
  orderedMapOf: createOrderedMapOfTypeChecker,
  setOf: createSetOfTypeChecker,
  orderedSetOf: createOrderedSetOfTypeChecker,
  stackOf: createStackOfTypeChecker,
  iterableOf: createIterableOfTypeChecker,
  recordOf: createRecordOfTypeChecker,
  shape: createShapeChecker,
  contains: createShapeChecker,
  mapContains: createMapContainsChecker,
  // Primitive Types
  list: createImmutableTypeChecker("List", Immutable.List.isList),
  map: createImmutableTypeChecker("Map", Immutable.Map.isMap),
  orderedMap: createImmutableTypeChecker("OrderedMap", Immutable.OrderedMap.isOrderedMap),
  set: createImmutableTypeChecker("Set", Immutable.Set.isSet),
  orderedSet: createImmutableTypeChecker("OrderedSet", Immutable.OrderedSet.isOrderedSet),
  stack: createImmutableTypeChecker("Stack", Immutable.Stack.isStack),
  seq: createImmutableTypeChecker("Seq", Immutable.Seq.isSeq),
  record: createImmutableTypeChecker("Record", function (isRecord) {
    return isRecord instanceof Immutable.Record;
  }),
  iterable: createImmutableTypeChecker("Iterable", Immutable.Iterable.isIterable)
};

function getPropType(propValue) {
  var propType = typeof propValue === "undefined" ? "undefined" : _typeof(propValue);
  if (Array.isArray(propValue)) {
    return "array";
  }
  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return "object";
  }
  if (propValue instanceof Immutable.Iterable) {
    return "Immutable." + propValue.toSource().split(" ")[0];
  }
  return propType;
}

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    for (var _len = arguments.length, rest = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      rest[_key - 6] = arguments[_key];
    }

    propFullName = propFullName || propName;
    componentName = componentName || ANONYMOUS;
    if (props[propName] == null) {
      var locationName = location;
      if (isRequired) {
        return new Error("Required " + locationName + " `" + propFullName + "` was not specified in " + ("`" + componentName + "`."));
      }
    } else {
      return validate.apply(undefined, [props, propName, componentName, location, propFullName].concat(rest));
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createImmutableTypeChecker(immutableClassName, immutableClassTypeValidator) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    if (!immutableClassTypeValidator(propValue)) {
      var propType = getPropType(propValue);
      return new Error("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `" + immutableClassName + "`."));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createIterableTypeChecker(typeChecker, immutableClassName, immutableClassTypeValidator) {

  function validate(props, propName, componentName, location, propFullName) {
    for (var _len = arguments.length, rest = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      rest[_key - 5] = arguments[_key];
    }

    var propValue = props[propName];
    if (!immutableClassTypeValidator(propValue)) {
      var locationName = location;
      var propType = getPropType(propValue);
      return new Error("Invalid " + locationName + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an Immutable.js " + immutableClassName + "."));
    }

    if (typeof typeChecker !== "function") {
      return new Error("Invalid typeChecker supplied to `" + componentName + "` " + ("for propType `" + propFullName + "`, expected a function."));
    }

    var propValues = propValue.toArray();
    for (var i = 0, len = propValues.length; i < len; i++) {
      var error = typeChecker.apply(undefined, [propValues, i, componentName, location, "" + propFullName + "[" + i + "]"].concat(rest));
      if (error instanceof Error) {
        return error;
      }
    }
  }
  return createChainableTypeChecker(validate);
}

function createKeysTypeChecker(typeChecker) {

  function validate(props, propName, componentName, location, propFullName) {
    for (var _len = arguments.length, rest = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      rest[_key - 5] = arguments[_key];
    }

    var propValue = props[propName];
    if (typeof typeChecker !== "function") {
      return new Error("Invalid keysTypeChecker (optional second argument) supplied to `" + componentName + "` " + ("for propType `" + propFullName + "`, expected a function."));
    }

    var keys = propValue.keySeq().toArray();
    for (var i = 0, len = keys.length; i < len; i++) {
      var error = typeChecker.apply(undefined, [keys, i, componentName, location, "" + propFullName + " -> key(" + keys[i] + ")"].concat(rest));
      if (error instanceof Error) {
        return error;
      }
    }
  }
  return createChainableTypeChecker(validate);
}

function createListOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, "List", Immutable.List.isList);
}

function createMapOfTypeCheckerFactory(valuesTypeChecker, keysTypeChecker, immutableClassName, immutableClassTypeValidator) {
  function validate() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return createIterableTypeChecker(valuesTypeChecker, immutableClassName, immutableClassTypeValidator).apply(undefined, args) || keysTypeChecker && createKeysTypeChecker(keysTypeChecker).apply(undefined, args);
  }

  return createChainableTypeChecker(validate);
}

function createMapOfTypeChecker(valuesTypeChecker, keysTypeChecker) {
  return createMapOfTypeCheckerFactory(valuesTypeChecker, keysTypeChecker, "Map", Immutable.Map.isMap);
}

function createOrderedMapOfTypeChecker(valuesTypeChecker, keysTypeChecker) {
  return createMapOfTypeCheckerFactory(valuesTypeChecker, keysTypeChecker, "OrderedMap", Immutable.OrderedMap.isOrderedMap);
}

function createSetOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, "Set", Immutable.Set.isSet);
}

function createOrderedSetOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, "OrderedSet", Immutable.OrderedSet.isOrderedSet);
}

function createStackOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, "Stack", Immutable.Stack.isStack);
}

function createIterableOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, "Iterable", Immutable.Iterable.isIterable);
}

function createRecordOfTypeChecker(recordKeys) {
  function validate(props, propName, componentName, location, propFullName) {
    for (var _len = arguments.length, rest = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      rest[_key - 5] = arguments[_key];
    }

    var propValue = props[propName];
    if (!(propValue instanceof Immutable.Record)) {
      var propType = getPropType(propValue);
      var locationName = location;
      return new Error("Invalid " + locationName + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected an Immutable.js Record."));
    }
    for (var key in recordKeys) {
      var checker = recordKeys[key];
      if (!checker) {
        continue;
      }
      var mutablePropValue = propValue.toObject();
      var error = checker.apply(undefined, [mutablePropValue, key, componentName, location, "" + propFullName + "." + key].concat(rest));
      if (error) {
        return error;
      }
    }
  }
  return createChainableTypeChecker(validate);
}

// there is some irony in the fact that shapeTypes is a standard hash and not an immutable collection
function createShapeTypeChecker(shapeTypes) {
  var immutableClassName = arguments[1] === undefined ? "Iterable" : arguments[1];
  var immutableClassTypeValidator = arguments[2] === undefined ? Immutable.Iterable.isIterable : arguments[2];

  function validate(props, propName, componentName, location, propFullName) {
    for (var _len = arguments.length, rest = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      rest[_key - 5] = arguments[_key];
    }

    var propValue = props[propName];
    if (!immutableClassTypeValidator(propValue)) {
      var propType = getPropType(propValue);
      var locationName = location;
      return new Error("Invalid " + locationName + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected an Immutable.js " + immutableClassName + "."));
    }
    var mutablePropValue = propValue.toObject();
    for (var key in shapeTypes) {
      var checker = shapeTypes[key];
      if (!checker) {
        continue;
      }
      var error = checker.apply(undefined, [mutablePropValue, key, componentName, location, "" + propFullName + "." + key].concat(rest));
      if (error) {
        return error;
      }
    }
  }
  return createChainableTypeChecker(validate);
}

function createShapeChecker(shapeTypes) {
  return createShapeTypeChecker(shapeTypes);
}

function createMapContainsChecker(shapeTypes) {
  return createShapeTypeChecker(shapeTypes, "Map", Immutable.Map.isMap);
}

module.exports = ImmutablePropTypes;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

var _reactImmutableProptypes = __webpack_require__(103);

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _slatePropTypes = __webpack_require__(14);

var _slatePropTypes2 = _interopRequireDefault(_slatePropTypes);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _leaf = __webpack_require__(295);

var _leaf2 = _interopRequireDefault(_leaf);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:node');

/**
 * Text.
 *
 * @type {Component}
 */

var Text = function (_React$Component) {
  _inherits(Text, _React$Component);

  function Text() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Text);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Text.__proto__ || Object.getPrototypeOf(Text)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Property types.
   *
   * @type {Object}
   */

  /**
   * Default prop types.
   *
   * @type {Object}
   */

  /**
   * Debug.
   *
   * @param {String} message
   * @param {Mixed} ...args
   */

  /**
   * Should the node update?
   *
   * @param {Object} nextProps
   * @param {Object} state
   * @return {Boolean}
   */

  _createClass(Text, [{
    key: 'render',

    /**
     * Render.
     *
     * @return {Element}
     */

    value: function render() {
      var _this2 = this;

      var props = this.props;

      this.debug('render', { props: props });

      var decorations = props.decorations,
          node = props.node,
          state = props.state,
          style = props.style;
      var document = state.document;
      var key = node.key;

      var decs = decorations.filter(function (d) {
        var startKey = d.startKey,
            endKey = d.endKey;

        if (startKey == key || endKey == key) return true;
        var startsBefore = document.areDescendantsSorted(startKey, key);
        var endsAfter = document.areDescendantsSorted(key, endKey);
        return startsBefore && endsAfter;
      });

      var leaves = node.getLeaves(decs);
      var offset = 0;

      var children = leaves.map(function (leaf, i) {
        var child = _this2.renderLeaf(leaves, leaf, i, offset);
        offset += leaf.text.length;
        return child;
      });

      return _react2.default.createElement('span', { 'data-key': key, style: style }, children);
    }

    /**
     * Render a single leaf given a `leaf` and `offset`.
     *
     * @param {List<Leaf>} leaves
     * @param {Leaf} leaf
     * @param {Number} index
     * @param {Number} offset
     * @return {Element} leaf
     */

  }]);

  return Text;
}(_react2.default.Component);

/**
 * Export.
 *
 * @type {Component}
 */

Text.propTypes = {
  block: _slatePropTypes2.default.block,
  decorations: _reactImmutableProptypes2.default.list.isRequired,
  editor: _propTypes2.default.object.isRequired,
  node: _slatePropTypes2.default.node.isRequired,
  parent: _slatePropTypes2.default.node.isRequired,
  schema: _slatePropTypes2.default.schema.isRequired,
  state: _slatePropTypes2.default.state.isRequired,
  style: _propTypes2.default.object
};
Text.defaultProps = {
  style: null
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.debug = function (message) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var node = _this3.props.node;
    var key = node.key;

    debug.apply(undefined, [message, key + ' (text)'].concat(args));
  };

  this.shouldComponentUpdate = function (nextProps) {
    var props = _this3.props;

    var n = nextProps;
    var p = props;

    // If the node has changed, update. PERF: There are cases where it will have
    // changed, but it's properties will be exactly the same (eg. copy-paste)
    // which this won't catch. But that's rare and not a drag on performance, so
    // for simplicity we just let them through.
    if (n.node != p.node) return true;

    // If the node parent is a block node, and it was the last child of the
    // block, re-render to cleanup extra `<br/>` or `\n`.
    if (n.parent.kind == 'block') {
      var pLast = p.parent.nodes.last();
      var nLast = n.parent.nodes.last();
      if (p.node == pLast && n.node != nLast) return true;
    }

    // Re-render if the current decorations have changed.
    if (!n.decorations.equals(p.decorations)) return true;

    // Otherwise, don't update.
    return false;
  };

  this.renderLeaf = function (leaves, leaf, index, offset) {
    var _props = _this3.props,
        block = _props.block,
        node = _props.node,
        parent = _props.parent,
        schema = _props.schema,
        state = _props.state,
        editor = _props.editor;
    var text = leaf.text,
        marks = leaf.marks;

    return _react2.default.createElement(_leaf2.default, {
      key: node.key + '-' + index,
      block: block,
      editor: editor,
      index: index,
      marks: marks,
      node: node,
      offset: offset,
      parent: parent,
      leaves: leaves,
      schema: schema,
      state: state,
      text: text
    });
  };
};

exports.default = Text;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/**
 * Offset key parser regex.
 *
 * @type {RegExp}
 */

var PARSER = /^(\w+)(?:-(\d+))?$/;

/**
 * Parse an offset key `string`.
 *
 * @param {String} string
 * @return {Object}
 */

function parse(string) {
  var matches = PARSER.exec(string);
  if (!matches) throw new Error("Invalid offset key string \"" + string + "\".");

  var _matches = _slicedToArray(matches, 3),
      original = _matches[0],
      key = _matches[1],
      index = _matches[2]; // eslint-disable-line no-unused-vars


  return {
    key: key,
    index: parseInt(index, 10)
  };
}

/**
 * Stringify an offset key `object`.
 *
 * @param {Object} object
 *   @property {String} key
 *   @property {Number} index
 * @return {String}
 */

function stringify(object) {
  return object.key + "-" + object.index;
}

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = {
  parse: parse,
  stringify: stringify
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getWindow = __webpack_require__(12);

var _getWindow2 = _interopRequireDefault(_getWindow);

var _findDomPoint = __webpack_require__(296);

var _findDomPoint2 = _interopRequireDefault(_findDomPoint);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Find a native DOM range Slate `range`.
 *
 * @param {Range} range
 * @return {Object|Null}
 */

function findDOMRange(range) {
  var anchorKey = range.anchorKey,
      anchorOffset = range.anchorOffset,
      focusKey = range.focusKey,
      focusOffset = range.focusOffset,
      isBackward = range.isBackward,
      isCollapsed = range.isCollapsed;

  var anchor = (0, _findDomPoint2.default)(anchorKey, anchorOffset);
  var focus = isCollapsed ? anchor : (0, _findDomPoint2.default)(focusKey, focusOffset);
  if (!anchor || !focus) return null;

  var window = (0, _getWindow2.default)(anchor.node);
  var r = window.document.createRange();
  var start = isBackward ? focus : anchor;
  var end = isBackward ? anchor : focus;
  r.setStart(start.node, start.offset);
  r.setEnd(end.node, end.offset);
  return r;
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = findDOMRange;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isBackward(selection) {
    var startNode = selection.anchorNode;
    var startOffset = selection.anchorOffset;
    var endNode = selection.focusNode;
    var endOffset = selection.focusOffset;

    var position = startNode.compareDocumentPosition(endNode);

    return !(position === 4 || position === 0 && startOffset < endOffset);
}

module.exports = isBackward;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getWindow = __webpack_require__(12);

var _getWindow2 = _interopRequireDefault(_getWindow);

var _offsetKey = __webpack_require__(105);

var _offsetKey2 = _interopRequireDefault(_offsetKey);

var _findClosestNode = __webpack_require__(67);

var _findClosestNode2 = _interopRequireDefault(_findClosestNode);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Constants.
 *
 * @type {String}
 */

var OFFSET_KEY_ATTRIBUTE = 'data-offset-key';
var RANGE_SELECTOR = '[' + OFFSET_KEY_ATTRIBUTE + ']';
var TEXT_SELECTOR = '[data-key]';
var VOID_SELECTOR = '[data-slate-void]';

/**
 * Find a Slate point from a DOM selection's `nativeNode` and `nativeOffset`.
 *
 * @param {Element} nativeNode
 * @param {Number} nativeOffset
 * @param {State} state
 * @return {Object}
 */

function findPoint(nativeNode, nativeOffset, state) {
  var _normalizeNodeAndOffs = normalizeNodeAndOffset(nativeNode, nativeOffset),
      nearestNode = _normalizeNodeAndOffs.node,
      nearestOffset = _normalizeNodeAndOffs.offset;

  var window = (0, _getWindow2.default)(nativeNode);
  var parentNode = nearestNode.parentNode;

  var rangeNode = (0, _findClosestNode2.default)(parentNode, RANGE_SELECTOR);
  var offset = void 0;
  var node = void 0;

  // Calculate how far into the text node the `nearestNode` is, so that we can
  // determine what the offset relative to the text node is.
  if (rangeNode) {
    var range = window.document.createRange();
    var textNode = (0, _findClosestNode2.default)(rangeNode, TEXT_SELECTOR);
    range.setStart(textNode, 0);
    range.setEnd(nearestNode, nearestOffset);
    node = textNode;
    offset = range.toString().length;
  }

  // For void nodes, the element with the offset key will be a cousin, not an
  // ancestor, so find it by going down from the nearest void parent.
  else {
      var voidNode = (0, _findClosestNode2.default)(parentNode, VOID_SELECTOR);
      if (!voidNode) return null;
      rangeNode = voidNode.querySelector(RANGE_SELECTOR);
      node = rangeNode;
      offset = node.textContent.length;
    }

  // Get the string value of the offset key attribute.
  var offsetKey = rangeNode.getAttribute(OFFSET_KEY_ATTRIBUTE);
  if (!offsetKey) return null;

  var _OffsetKey$parse = _offsetKey2.default.parse(offsetKey),
      key = _OffsetKey$parse.key;

  // COMPAT: If someone is clicking from one Slate editor into another, the
  // select event fires twice, once for the old editor's `element` first, and
  // then afterwards for the correct `element`. (2017/03/03)


  if (!state.document.hasDescendant(key)) return null;

  return {
    key: key,
    offset: offset
  };
}

/**
 * From a DOM selection's `node` and `offset`, normalize so that it always
 * refers to a text node.
 *
 * @param {Element} node
 * @param {Number} offset
 * @return {Object}
 */

function normalizeNodeAndOffset(node, offset) {
  // If it's an element node, its offset refers to the index of its children
  // including comment nodes, so try to find the right text child node.
  if (node.nodeType == 1 && node.childNodes.length) {
    var isLast = offset == node.childNodes.length;
    var direction = isLast ? 'backward' : 'forward';
    var index = isLast ? offset - 1 : offset;
    node = getEditableChild(node, index, direction);

    // If the node has children, traverse until we have a leaf node. Leaf nodes
    // can be either text nodes, or other void DOM nodes.
    while (node.nodeType == 1 && node.childNodes.length) {
      var i = isLast ? node.childNodes.length - 1 : 0;
      node = getEditableChild(node, i, direction);
    }

    // Determine the new offset inside the text node.
    offset = isLast ? node.textContent.length : 0;
  }

  // Return the node and offset.
  return { node: node, offset: offset };
}

/**
 * Get the nearest editable child at `index` in a `parent`, preferring
 * `direction`.
 *
 * @param {Element} parent
 * @param {Number} index
 * @param {String} direction ('forward' or 'backward')
 * @return {Element|Null}
 */

function getEditableChild(parent, index, direction) {
  var childNodes = parent.childNodes;

  var child = childNodes[index];
  var i = index;
  var triedForward = false;
  var triedBackward = false;

  // While the child is a comment node, or an element node with no children,
  // keep iterating to find a sibling non-void, non-comment node.
  while (child.nodeType == 8 || child.nodeType == 1 && child.childNodes.length == 0 || child.nodeType == 1 && child.getAttribute('contenteditable') == 'false') {
    if (triedForward && triedBackward) break;

    if (i >= childNodes.length) {
      triedForward = true;
      i = index - 1;
      direction = 'backward';
      continue;
    }

    if (i < 0) {
      triedBackward = true;
      i = index + 1;
      direction = 'forward';
      continue;
    }

    child = childNodes[i];
    if (direction == 'forward') i++;
    if (direction == 'backward') i--;
  }

  return child || null;
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = findPoint;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findClosestNode = __webpack_require__(67);

var _findClosestNode2 = _interopRequireDefault(_findClosestNode);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Find a Slate node from a DOM `element`.
 *
 * @param {Element} element
 * @return {Node|Null}
 */

function findNode(element, state) {
  var closest = (0, _findClosestNode2.default)(element, '[data-key]');
  if (!closest) return null;

  var key = closest.getAttribute('data-key');
  if (!key) return null;

  var node = state.document.getNode(key);
  return node || null;
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = findNode;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getWindow = __webpack_require__(12);

var _getWindow2 = _interopRequireDefault(_getWindow);

var _findDomNode = __webpack_require__(44);

var _findDomNode2 = _interopRequireDefault(_findDomNode);

var _findRange = __webpack_require__(45);

var _findRange2 = _interopRequireDefault(_findRange);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Get the target range from a DOM `event`.
 *
 * @param {Event} event
 * @param {State} state
 * @return {Range}
 */

function getEventRange(event, state) {
  if (event.nativeEvent) {
    event = event.nativeEvent;
  }

  var _event = event,
      x = _event.x,
      y = _event.y;

  if (x == null || y == null) return null;

  // Resolve a range from the caret position where the drop occured.
  var window = (0, _getWindow2.default)(event.target);
  var r = void 0;

  // COMPAT: In Firefox, `caretRangeFromPoint` doesn't exist. (2016/07/25)
  if (window.document.caretRangeFromPoint) {
    r = window.document.caretRangeFromPoint(x, y);
  } else {
    var position = window.document.caretPositionFromPoint(x, y);
    r = window.document.createRange();
    r.setStart(position.offsetNode, position.offset);
    r.setEnd(position.offsetNode, position.offset);
  }

  // Resolve a Slate range from the DOM range.
  var range = (0, _findRange2.default)(r, state);
  if (!range) return null;

  var document = state.document;

  var node = document.getNode(range.anchorKey);
  var parent = document.getParent(node.key);
  var el = (0, _findDomNode2.default)(parent);

  // If the drop target is inside a void node, move it into either the next or
  // previous node, depending on which side the `x` and `y` coordinates are
  // closest to.
  if (parent.isVoid) {
    var rect = el.getBoundingClientRect();
    var isPrevious = parent.kind == 'inline' ? x - rect.left < rect.left + rect.width - x : y - rect.top < rect.top + rect.height - y;

    range = isPrevious ? range.moveToEndOf(document.getPreviousText(node.key)) : range.moveToStartOf(document.getNextText(node.key));
  }

  return range;
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = getEventRange;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _slateBase64Serializer = __webpack_require__(101);

var _slateBase64Serializer2 = _interopRequireDefault(_slateBase64Serializer);

var _transferTypes = __webpack_require__(112);

var _transferTypes2 = _interopRequireDefault(_transferTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Trasnfer types.
 *
 * @type {String}
 */

var FRAGMENT = _transferTypes2.default.FRAGMENT,
    HTML = _transferTypes2.default.HTML,
    NODE = _transferTypes2.default.NODE,
    RICH = _transferTypes2.default.RICH,
    TEXT = _transferTypes2.default.TEXT;

/**
 * Fragment matching regexp for HTML nodes.
 *
 * @type {RegExp}
 */

var FRAGMENT_MATCHER = / data-slate-fragment="([^\s"]+)"/;

/**
 * Get the transfer data from an `event`.
 *
 * @param {Event} event
 * @return {Object}
 */

function getEventTransfer(event) {
  if (event.nativeEvent) {
    event = event.nativeEvent;
  }

  var transfer = event.dataTransfer || event.clipboardData;
  var fragment = getType(transfer, FRAGMENT);
  var node = getType(transfer, NODE);
  var html = getType(transfer, HTML);
  var rich = getType(transfer, RICH);
  var text = getType(transfer, TEXT);
  var files = void 0;

  // If there isn't a fragment, but there is HTML, check to see if the HTML is
  // actually an encoded fragment.
  if (!fragment && html && ~html.indexOf(' data-slate-fragment="')) {
    var matches = FRAGMENT_MATCHER.exec(html);

    var _matches = _slicedToArray(matches, 2),
        full = _matches[0],
        encoded = _matches[1]; // eslint-disable-line no-unused-vars


    if (encoded) fragment = encoded;
  }

  // COMPAT: Edge doesn't handle custom data types
  // These will be embedded in text/plain in this case (2017/7/12)
  if (text) {
    var embeddedTypes = getEmbeddedTypes(text);

    if (embeddedTypes[FRAGMENT]) fragment = embeddedTypes[FRAGMENT];
    if (embeddedTypes[NODE]) node = embeddedTypes[NODE];
    if (embeddedTypes[TEXT]) text = embeddedTypes[TEXT];
  }

  // Decode a fragment or node if they exist.
  if (fragment) fragment = _slateBase64Serializer2.default.deserializeNode(fragment);
  if (node) node = _slateBase64Serializer2.default.deserializeNode(node);

  // COMPAT: Edge sometimes throws 'NotSupportedError'
  // when accessing `transfer.items` (2017/7/12)
  try {
    // Get and normalize files if they exist.
    if (transfer.items && transfer.items.length) {
      files = Array.from(transfer.items).map(function (item) {
        return item.kind == 'file' ? item.getAsFile() : null;
      }).filter(function (exists) {
        return exists;
      });
    } else if (transfer.files && transfer.files.length) {
      files = Array.from(transfer.files);
    }
  } catch (err) {
    if (transfer.files && transfer.files.length) {
      files = Array.from(transfer.files);
    }
  }

  // Determine the type of the data.
  var data = { files: files, fragment: fragment, html: html, node: node, rich: rich, text: text };
  data.type = getTransferType(data);
  return data;
}

/**
 * Takes text input, checks whether contains embedded data
 * and returns object with original text +/- additional data
 *
 * @param {String} text
 * @return {Object}
 */

function getEmbeddedTypes(text) {
  var prefix = 'SLATE-DATA-EMBED::';

  if (text.substring(0, prefix.length) != prefix) {
    return { TEXT: text };
  }

  // Attempt to parse, if fails then just standard text/plain
  // Otherwise, already had data embedded
  try {
    return JSON.parse(text.substring(prefix.length));
  } catch (err) {
    throw new Error('Unable to parse custom embedded drag data');
  }
}

/**
 * Get the type of a transfer from its `data`.
 *
 * @param {Object} data
 * @return {String}
 */

function getTransferType(data) {
  if (data.fragment) return 'fragment';
  if (data.node) return 'node';

  // COMPAT: Microsoft Word adds an image of the selected text to the data.
  // Since files are preferred over HTML or text, this would cause the type to
  // be considered `files`. But it also adds rich text data so we can check
  // for that and properly set the type to `html` or `text`. (2016/11/21)
  if (data.rich && data.html) return 'html';
  if (data.rich && data.text) return 'text';

  if (data.files && data.files.length) return 'files';
  if (data.html) return 'html';
  if (data.text) return 'text';
  return 'unknown';
}

/**
 * Get one of types `TYPES.FRAGMENT`, `TYPES.NODE`, `text/html`, `text/rtf` or
 * `text/plain` from transfers's `data` if possible, otherwise return null.
 *
 * @param {Object} transfer
 * @param {String} type
 * @return {String}
 */

function getType(transfer, type) {
  if (!transfer.types || !transfer.types.length) {
    // COMPAT: In IE 11, there is no `types` field but `getData('Text')`
    // is supported`. (2017/06/23)
    return type == TEXT ? transfer.getData('Text') || null : null;
  }

  return transfer.types.indexOf(type) !== -1 ? transfer.getData(type) || null : null;
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = getEventTransfer;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * The transfer types that Slate recognizes.
 *
 * @type {Object}
 */

var TRANSFER_TYPES = {
  FRAGMENT: 'application/x-slate-fragment',
  HTML: 'text/html',
  NODE: 'application/x-slate-node',
  RICH: 'text/rtf',
  TEXT: 'text/plain'
};

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = TRANSFER_TYPES;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transferTypes = __webpack_require__(112);

var _transferTypes2 = _interopRequireDefault(_transferTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * The default plain text transfer type.
 *
 * @type {String}
 */

var TEXT = _transferTypes2.default.TEXT;

/**
 * Set data with `type` and `content` on an `event`.
 *
 * COMPAT: In Edge, custom types throw errors, so embed all non-standard
 * types in text/plain compound object. (2017/7/12)
 *
 * @param {Event} event
 * @param {String} type
 * @param {String} content
 */

function setEventTransfer(event, type, content) {
  var mime = _transferTypes2.default[type.toUpperCase()];

  if (!mime) {
    throw new Error('Cannot set unknown transfer type "' + mime + '"');
  }

  if (event.nativeEvent) {
    event = event.nativeEvent;
  }

  var transfer = event.dataTransfer || event.clipboardData;

  try {
    transfer.setData(mime, content);
  } catch (err) {
    var prefix = 'SLATE-DATA-EMBED::';
    var text = transfer.getData(TEXT);
    var obj = {};

    // If the existing plain text data is prefixed, it's Slate JSON data.
    if (text.substring(0, prefix.length) === prefix) {
      try {
        obj = JSON.parse(text.substring(prefix.length));
      } catch (e) {
        throw new Error('Failed to parse Slate data from `DataTransfer` object.');
      }
    }

    // Otherwise, it's just set it as is.
    else {
        obj[TEXT] = text;
      }

    obj[mime] = content;
    var string = '' + prefix + JSON.stringify(obj);
    transfer.setData(TEXT, string);
  }
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = setEventTransfer;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  Editor: __webpack_require__(115),
  Slate: __webpack_require__(8)
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setEventTransfer = exports.getEventTransfer = exports.getEventRange = exports.findRange = exports.findNode = exports.findDOMRange = exports.findDOMNode = exports.Editor = undefined;

var _editor = __webpack_require__(116);

var _editor2 = _interopRequireDefault(_editor);

var _findDomNode = __webpack_require__(44);

var _findDomNode2 = _interopRequireDefault(_findDomNode);

var _findDomRange = __webpack_require__(106);

var _findDomRange2 = _interopRequireDefault(_findDomRange);

var _findNode = __webpack_require__(109);

var _findNode2 = _interopRequireDefault(_findNode);

var _findRange = __webpack_require__(45);

var _findRange2 = _interopRequireDefault(_findRange);

var _getEventRange = __webpack_require__(110);

var _getEventRange2 = _interopRequireDefault(_getEventRange);

var _getEventTransfer = __webpack_require__(111);

var _getEventTransfer2 = _interopRequireDefault(_getEventTransfer);

var _setEventTransfer = __webpack_require__(113);

var _setEventTransfer2 = _interopRequireDefault(_setEventTransfer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Export.
 *
 * @type {Object}
 */

exports.Editor = _editor2.default;
exports.findDOMNode = _findDomNode2.default;
exports.findDOMRange = _findDomRange2.default;
exports.findNode = _findNode2.default;
exports.findRange = _findRange2.default;
exports.getEventRange = _getEventRange2.default;
exports.getEventTransfer = _getEventTransfer2.default;
exports.setEventTransfer = _setEventTransfer2.default;
exports.default = {
  Editor: _editor2.default,
  findDOMNode: _findDomNode2.default,
  findDOMRange: _findDomRange2.default,
  findNode: _findNode2.default,
  findRange: _findRange2.default,
  getEventRange: _getEventRange2.default,
  getEventTransfer: _getEventTransfer2.default,
  setEventTransfer: _setEventTransfer2.default
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

var _reactPortal = __webpack_require__(119);

var _reactPortal2 = _interopRequireDefault(_reactPortal);

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _slatePropTypes = __webpack_require__(14);

var _slatePropTypes2 = _interopRequireDefault(_slatePropTypes);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _slate = __webpack_require__(8);

var _eventHandlers = __webpack_require__(66);

var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

var _after = __webpack_require__(286);

var _after2 = _interopRequireDefault(_after);

var _before = __webpack_require__(300);

var _before2 = _interopRequireDefault(_before);

var _noop = __webpack_require__(301);

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:editor');

/**
 * Plugin-related properties of the editor.
 *
 * @type {Array}
 */

var PLUGINS_PROPS = [].concat(_toConsumableArray(_eventHandlers2.default), ['placeholder', 'placeholderClassName', 'placeholderStyle', 'plugins', 'schema']);

/**
 * Editor.
 *
 * @type {Component}
 */

var Editor = function (_React$Component) {
  _inherits(Editor, _React$Component);

  /**
   * When constructed, create a new `Stack` and run `onBeforeChange`.
   *
   * @param {Object} props
   */

  /**
   * Property types.
   *
   * @type {Object}
   */

  function Editor(props) {
    _classCallCheck(this, Editor);

    var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {};
    _this.tmp = {};

    // Create a new `Stack`, omitting the `onChange` property since that has
    // special significance on the editor itself.
    var plugins = resolvePlugins(props);
    var stack = _slate.Stack.create({ plugins: plugins });
    _this.state.stack = stack;

    // Run `onBeforeChange` on the passed-in state because we need to ensure
    // that it is normalized, and queue the resulting change.
    var change = props.state.change();
    stack.handle('onBeforeChange', change, _this);
    var state = change.state;

    _this.queueChange(change);
    _this.cacheState(state);
    _this.state.state = state;

    // Create a bound event handler for each event.
    _eventHandlers2.default.forEach(function (handler) {
      _this[handler] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this.onEvent.apply(_this, [handler].concat(args));
      };
    });

    if (props.onDocumentChange) {
      _slateDevLogger2.default.deprecate('0.22.10', 'The `onDocumentChange` prop is deprecated because it led to confusing UX issues, see https://github.com/ianstormtaylor/slate/issues/614#issuecomment-327868679');
    }

    if (props.onSelectionChange) {
      _slateDevLogger2.default.deprecate('0.22.10', 'The `onSelectionChange` prop is deprecated because it led to confusing UX issues, see https://github.com/ianstormtaylor/slate/issues/614#issuecomment-327868679');
    }
    return _this;
  }

  /**
   * When the `props` are updated, create a new `Stack` if necessary and run
   * `onBeforeChange` to ensure the state is normalized.
   *
   * @param {Object} props
   */

  /**
   * Default properties.
   *
   * @type {Object}
   */

  /**
   * When the component first mounts, flush any temporary changes.
   */

  /**
   * When the component updates, flush any temporary change.
   */

  /**
   * Cache a `state` object to be able to compare against it later.
   *
   * @param {State} state
   */

  /**
   * Queue a `change` object, to be able to flush it later. This is required for
   * when a change needs to be applied to the state, but because of the React
   * lifecycle we can't apply that change immediately. So we cache it here and
   * later can call `this.flushChange()` to flush it.
   *
   * @param {Change} change
   */

  /**
   * Flush a temporarily stored `change` object, for when a change needed to be
   * made but couldn't because of React's lifecycle.
   */

  /**
   * Programmatically blur the editor.
   */

  /**
   * Programmatically focus the editor.
   */

  /**
   * Get the editor's current schema.
   *
   * @return {Schema}
   */

  /**
   * Get the editor's current state.
   *
   * @return {State}
   */

  /**
   * Perform a change on the editor, passing `...args` to `change.call`.
   *
   * @param {Mixed} ...args
   */

  /**
   * On event.
   *
   * @param {String} handler
   * @param {Mixed} ...args
   */

  /**
   * On change.
   *
   * @param {Change} change
   */

  _createClass(Editor, [{
    key: 'render',

    /**
     * Render the editor.
     *
     * @return {Element}
     */

    value: function render() {
      var props = this.props,
          state = this.state;
      var stack = state.stack;

      var children = stack.renderPortal(state.state, this).map(function (child, i) {
        return _react2.default.createElement(_reactPortal2.default, { key: i, isOpened: true }, child);
      });

      debug('render', { props: props, state: state });

      var tree = stack.render(state.state, this, _extends({}, props, {
        children: children
      }));

      return tree;
    }
  }]);

  return Editor;
}(_react2.default.Component);

/**
 * Resolve an array of plugins from `props`.
 *
 * In addition to the plugins provided in `props.plugins`, this will create
 * two other plugins:
 *
 * - A plugin made from the top-level `props` themselves, which are placed at
 * the beginning of the stack. That way, you can add a `onKeyDown` handler,
 * and it will override all of the existing plugins.
 *
 * - A "core" functionality plugin that handles the most basic events in
 * Slate, like deleting characters, splitting blocks, etc.
 *
 * @param {Object} props
 * @return {Array}
 */

Editor.propTypes = {
  autoCorrect: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  onBeforeChange: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  placeholder: _propTypes2.default.any,
  placeholderClassName: _propTypes2.default.string,
  placeholderStyle: _propTypes2.default.object,
  plugins: _propTypes2.default.array,
  readOnly: _propTypes2.default.bool,
  role: _propTypes2.default.string,
  schema: _propTypes2.default.object,
  spellCheck: _propTypes2.default.bool,
  state: _slatePropTypes2.default.state.isRequired,
  style: _propTypes2.default.object,
  tabIndex: _propTypes2.default.number
};
Editor.defaultProps = {
  autoFocus: false,
  autoCorrect: true,
  onChange: _noop2.default,
  plugins: [],
  readOnly: false,
  schema: {},
  spellCheck: true
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.componentWillReceiveProps = function (props) {
    var stack = _this2.state.stack;

    // If any plugin-related properties will change, create a new `Stack`.

    for (var _i = 0; _i < PLUGINS_PROPS.length; _i++) {
      var prop = PLUGINS_PROPS[_i];
      if (props[prop] == _this2.props[prop]) continue;
      var plugins = resolvePlugins(props);
      stack = _slate.Stack.create({ plugins: plugins });
      _this2.setState({ stack: stack });
    }

    // Run `onBeforeChange` on the passed-in state because we need to ensure
    // that it is normalized, and queue the resulting change.
    var change = props.state.change();
    stack.handle('onBeforeChange', change, _this2);
    var state = change.state;

    _this2.queueChange(change);
    _this2.cacheState(state);
    _this2.setState({ state: state });
  };

  this.componentDidMount = function () {
    _this2.flushChange();
  };

  this.componentDidUpdate = function () {
    _this2.flushChange();
  };

  this.cacheState = function (state) {
    _this2.tmp.document = state.document;
    _this2.tmp.selection = state.selection;
  };

  this.queueChange = function (change) {
    if (change.operations.length) {
      debug('queueChange', { change: change });
      _this2.tmp.change = change;
    }
  };

  this.flushChange = function () {
    var change = _this2.tmp.change;

    if (change) {
      debug('flushChange', { change: change });
      _this2.props.onChange(change);
      delete _this2.tmp.change;
    }
  };

  this.blur = function () {
    _this2.change(function (c) {
      return c.blur();
    });
  };

  this.focus = function () {
    _this2.change(function (c) {
      return c.focus();
    });
  };

  this.getSchema = function () {
    return _this2.state.stack.schema;
  };

  this.getState = function () {
    return _this2.state.state;
  };

  this.change = function () {
    var _state$change;

    var state = _this2.state.state;

    var change = (_state$change = state.change()).call.apply(_state$change, arguments);
    debug('change', { change: change });
    _this2.onChange(change);
  };

  this.onEvent = function (handler) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var _state = _this2.state,
        stack = _state.stack,
        state = _state.state;

    var change = state.change();
    stack.handle.apply(stack, [handler, change, _this2].concat(args));
    _this2.onChange(change);
  };

  this.onChange = function (change) {
    if (_slate.State.isState(change)) {
      throw new Error('As of slate@0.22.0 the `editor.onChange` method must be passed a `Change` object not a `State` object.');
    }

    var stack = _this2.state.stack;

    stack.handle('onBeforeChange', change, _this2);
    stack.handle('onChange', change, _this2);

    var state = change.state;
    var _tmp = _this2.tmp,
        document = _tmp.document,
        selection = _tmp.selection;
    var _props = _this2.props,
        onChange = _props.onChange,
        onDocumentChange = _props.onDocumentChange,
        onSelectionChange = _props.onSelectionChange;

    if (state == _this2.state.state) return;

    debug('onChange', { change: change });
    onChange(change);
    if (onDocumentChange && state.document != document) onDocumentChange(state.document, change);
    if (onSelectionChange && state.selection != selection) onSelectionChange(state.selection, change);
  };
};

function resolvePlugins(props) {
  // eslint-disable-next-line no-unused-vars
  var state = props.state,
      onChange = props.onChange,
      _props$plugins = props.plugins,
      plugins = _props$plugins === undefined ? [] : _props$plugins,
      overridePlugin = _objectWithoutProperties(props, ['state', 'onChange', 'plugins']);

  var beforePlugin = (0, _before2.default)(props);
  var afterPlugin = (0, _after2.default)(props);
  return [beforePlugin, overridePlugin].concat(_toConsumableArray(plugins), [afterPlugin]);
}

/**
 * Mix in the property types for the event handlers.
 */

for (var i = 0; i < _eventHandlers2.default.length; i++) {
  var property = _eventHandlers2.default[i];
  Editor.propTypes[property] = _propTypes2.default.func;
}

/**
 * Export.
 *
 * @type {Component}
 */

exports.default = Editor;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(118);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0,
      i;

  for (i in namespace) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(68);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var KEYCODES = {
  ESCAPE: 27
};

var Portal = function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    _classCallCheck(this, Portal);

    var _this = _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).call(this));

    _this.state = { active: false };
    _this.handleWrapperClick = _this.handleWrapperClick.bind(_this);
    _this.closePortal = _this.closePortal.bind(_this);
    _this.handleOutsideMouseClick = _this.handleOutsideMouseClick.bind(_this);
    _this.handleKeydown = _this.handleKeydown.bind(_this);
    _this.portal = null;
    _this.node = null;
    return _this;
  }

  _createClass(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.closeOnEsc) {
        document.addEventListener('keydown', this.handleKeydown);
      }

      if (this.props.closeOnOutsideClick) {
        document.addEventListener('mouseup', this.handleOutsideMouseClick);
        document.addEventListener('touchstart', this.handleOutsideMouseClick);
      }

      if (this.props.isOpened) {
        this.openPortal();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      // portal's 'is open' state is handled through the prop isOpened
      if (typeof newProps.isOpened !== 'undefined') {
        if (newProps.isOpened) {
          if (this.state.active) {
            this.renderPortal(newProps);
          } else {
            this.openPortal(newProps);
          }
        }
        if (!newProps.isOpened && this.state.active) {
          this.closePortal();
        }
      }

      // portal handles its own 'is open' state
      if (typeof newProps.isOpened === 'undefined' && this.state.active) {
        this.renderPortal(newProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.closeOnEsc) {
        document.removeEventListener('keydown', this.handleKeydown);
      }

      if (this.props.closeOnOutsideClick) {
        document.removeEventListener('mouseup', this.handleOutsideMouseClick);
        document.removeEventListener('touchstart', this.handleOutsideMouseClick);
      }

      this.closePortal(true);
    }
  }, {
    key: 'handleWrapperClick',
    value: function handleWrapperClick(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.state.active) {
        return;
      }
      this.openPortal();
    }
  }, {
    key: 'openPortal',
    value: function openPortal() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      this.setState({ active: true });
      this.renderPortal(props);
      this.props.onOpen(this.node);
    }
  }, {
    key: 'closePortal',
    value: function closePortal() {
      var _this2 = this;

      var isUnmounted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var resetPortalState = function resetPortalState(overrideIsUnmounted) {
        if (_this2.node) {
          _reactDom2.default.unmountComponentAtNode(_this2.node);
          document.body.removeChild(_this2.node);
        }
        _this2.portal = null;
        _this2.node = null;

        var finalIsUnmounted = overrideIsUnmounted === undefined ? isUnmounted : overrideIsUnmounted;

        if (finalIsUnmounted !== true) {
          _this2.setState({ active: false });
        }
      };

      if (this.state.active) {
        if (this.props.beforeClose) {
          this.props.beforeClose(this.node, resetPortalState);
        } else {
          resetPortalState();
        }

        this.props.onClose();
      }
    }
  }, {
    key: 'handleOutsideMouseClick',
    value: function handleOutsideMouseClick(e) {
      if (!this.state.active) {
        return;
      }

      var root = (0, _reactDom.findDOMNode)(this.portal);
      if (root.contains(e.target) || e.button && e.button !== 0) {
        return;
      }

      e.stopPropagation();
      this.closePortal();
    }
  }, {
    key: 'handleKeydown',
    value: function handleKeydown(e) {
      if (e.keyCode === KEYCODES.ESCAPE && this.state.active) {
        this.closePortal();
      }
    }
  }, {
    key: 'renderPortal',
    value: function renderPortal(props) {
      if (!this.node) {
        this.node = document.createElement('div');
        document.body.appendChild(this.node);
      }

      var children = props.children;
      // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
      if (typeof props.children.type === 'function') {
        children = _react2.default.cloneElement(props.children, { closePortal: this.closePortal });
      }

      this.portal = _reactDom2.default.unstable_renderSubtreeIntoContainer(this, children, this.node, this.props.onUpdate);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.openByClickOn) {
        return _react2.default.cloneElement(this.props.openByClickOn, { onClick: this.handleWrapperClick });
      }
      return null;
    }
  }]);

  return Portal;
}(_react2.default.Component);

exports.default = Portal;

Portal.propTypes = {
  children: _propTypes2.default.element.isRequired,
  openByClickOn: _propTypes2.default.element,
  closeOnEsc: _propTypes2.default.bool,
  closeOnOutsideClick: _propTypes2.default.bool,
  isOpened: _propTypes2.default.bool,
  onOpen: _propTypes2.default.func,
  onClose: _propTypes2.default.func,
  beforeClose: _propTypes2.default.func,
  onUpdate: _propTypes2.default.func
};

Portal.defaultProps = {
  onOpen: function onOpen() {},
  onClose: function onClose() {},
  onUpdate: function onUpdate() {}
};
module.exports = exports['default'];

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var emptyFunction = __webpack_require__(46);
var invariant = __webpack_require__(47);
var warning = __webpack_require__(69);
var assign = __webpack_require__(121);

var ReactPropTypesSecret = __webpack_require__(48);
var checkPropTypes = __webpack_require__(122);

module.exports = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(false, 'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received %s at index %s.', getPostfixForTypeWarning(checker), i);
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(47);
  var warning = __webpack_require__(69);
  var ReactPropTypesSecret = __webpack_require__(48);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, _typeof(typeSpecs[typeSpecName]));
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(46);
var invariant = __webpack_require__(47);
var ReactPropTypesSecret = __webpack_require__(48);

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function isObject(val) {
  return val != null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && Array.isArray(val) === false;
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GROUP_LEFT_TO_RIGHT, GROUP_RIGHT_TO_LEFT, EXPRESSION_LEFT_TO_RIGHT, EXPRESSION_RIGHT_TO_LEFT;

/*
 * Character ranges of left-to-right characters.
 */

GROUP_LEFT_TO_RIGHT = 'A-Za-z\xC0-\xD6\xD8-\xF6' + '\xF8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C' + '\uFE00-\uFE6F\uFEFD-\uFFFF';

/*
 * Character ranges of right-to-left characters.
 */

GROUP_RIGHT_TO_LEFT = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';

/*
 * Expression to match a left-to-right string.
 *
 * Matches the start of a string, followed by zero or
 * more non-right-to-left characters, followed by a
 * left-to-right character.
 */

EXPRESSION_LEFT_TO_RIGHT = new RegExp('^[^' + GROUP_RIGHT_TO_LEFT + ']*[' + GROUP_LEFT_TO_RIGHT + ']');

/*
 * Expression to match a right-to-left string.
 *
 * Matches the start of a string, followed by zero or
 * more non-left-to-right characters, followed by a
 * right-to-left character.
 */

EXPRESSION_RIGHT_TO_LEFT = new RegExp('^[^' + GROUP_LEFT_TO_RIGHT + ']*[' + GROUP_RIGHT_TO_LEFT + ']');

/**
 * Detect the direction of text.
 *
 * @param {string} value - value to stringify and check.
 * @return {string} - One of `"rtl"`, `"ltr"`, or
 *   `"neutral"`.
 */
function direction(value) {
    value = value.toString();

    if (EXPRESSION_RIGHT_TO_LEFT.test(value)) {
        return 'rtl';
    }

    if (EXPRESSION_LEFT_TO_RIGHT.test(value)) {
        return 'ltr';
    }

    return 'neutral';
}

/*
 * Expose `direction`.
 */

module.exports = direction;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(127)() ? Map : __webpack_require__(128);

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var map, iterator, result;
	if (typeof Map !== 'function') return false;
	try {
		// WebKit doesn't support arguments and crashes
		map = new Map([['raz', 'one'], ['dwa', 'two'], ['trzy', 'three']]);
	} catch (e) {
		return false;
	}
	if (String(map) !== '[object Map]') return false;
	if (map.size !== 3) return false;
	if (typeof map.clear !== 'function') return false;
	if (typeof map.delete !== 'function') return false;
	if (typeof map.entries !== 'function') return false;
	if (typeof map.forEach !== 'function') return false;
	if (typeof map.get !== 'function') return false;
	if (typeof map.has !== 'function') return false;
	if (typeof map.keys !== 'function') return false;
	if (typeof map.set !== 'function') return false;
	if (typeof map.values !== 'function') return false;

	iterator = map.entries();
	result = iterator.next();
	if (result.done !== false) return false;
	if (!result.value) return false;
	if (result.value[0] !== 'raz') return false;
	if (result.value[1] !== 'one') return false;

	return true;
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clear = __webpack_require__(70),
    eIndexOf = __webpack_require__(129),
    setPrototypeOf = __webpack_require__(33),
    callable = __webpack_require__(9),
    validValue = __webpack_require__(6),
    d = __webpack_require__(18),
    ee = __webpack_require__(147),
    _Symbol = __webpack_require__(16),
    iterator = __webpack_require__(77),
    forOf = __webpack_require__(153),
    Iterator = __webpack_require__(166),
    isNative = __webpack_require__(169),
    call = Function.prototype.call,
    defineProperties = Object.defineProperties,
    getPrototypeOf = Object.getPrototypeOf,
    _MapPoly;

module.exports = _MapPoly = function MapPoly() /*iterable*/{
	var iterable = arguments[0],
	    keys,
	    values,
	    self;
	if (!(this instanceof _MapPoly)) throw new TypeError('Constructor requires \'new\'');
	if (isNative && setPrototypeOf && Map !== _MapPoly) {
		self = setPrototypeOf(new Map(), getPrototypeOf(this));
	} else {
		self = this;
	}
	if (iterable != null) iterator(iterable);
	defineProperties(self, {
		__mapKeysData__: d('c', keys = []),
		__mapValuesData__: d('c', values = [])
	});
	if (!iterable) return self;
	forOf(iterable, function (value) {
		var key = validValue(value)[0];
		value = value[1];
		if (eIndexOf.call(keys, key) !== -1) return;
		keys.push(key);
		values.push(value);
	}, self);
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(_MapPoly, Map);
	_MapPoly.prototype = Object.create(Map.prototype, {
		constructor: d(_MapPoly)
	});
}

ee(defineProperties(_MapPoly.prototype, {
	clear: d(function () {
		if (!this.__mapKeysData__.length) return;
		clear.call(this.__mapKeysData__);
		clear.call(this.__mapValuesData__);
		this.emit('_clear');
	}),
	delete: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) return false;
		this.__mapKeysData__.splice(index, 1);
		this.__mapValuesData__.splice(index, 1);
		this.emit('_delete', index, key);
		return true;
	}),
	entries: d(function () {
		return new Iterator(this, 'key+value');
	}),
	forEach: d(function (cb /*, thisArg*/) {
		var thisArg = arguments[1],
		    iterator,
		    result;
		callable(cb);
		iterator = this.entries();
		result = iterator._next();
		while (result !== undefined) {
			call.call(cb, thisArg, this.__mapValuesData__[result], this.__mapKeysData__[result], this);
			result = iterator._next();
		}
	}),
	get: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) return;
		return this.__mapValuesData__[index];
	}),
	has: d(function (key) {
		return eIndexOf.call(this.__mapKeysData__, key) !== -1;
	}),
	keys: d(function () {
		return new Iterator(this, 'key');
	}),
	set: d(function (key, value) {
		var index = eIndexOf.call(this.__mapKeysData__, key),
		    emit;
		if (index === -1) {
			index = this.__mapKeysData__.push(key) - 1;
			emit = true;
		}
		this.__mapValuesData__[index] = value;
		if (emit) this.emit('_add', index, key);
		return this;
	}),
	size: d.gs(function () {
		return this.__mapKeysData__.length;
	}),
	values: d(function () {
		return new Iterator(this, 'value');
	}),
	toString: d(function () {
		return '[object Map]';
	})
}));
Object.defineProperty(_MapPoly.prototype, _Symbol.iterator, d(function () {
	return this.entries();
}));
Object.defineProperty(_MapPoly.prototype, _Symbol.toStringTag, d('c', 'Map'));

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var numberIsNaN = __webpack_require__(130),
    toPosInt = __webpack_require__(72),
    value = __webpack_require__(6),
    indexOf = Array.prototype.indexOf,
    objHasOwnProperty = Object.prototype.hasOwnProperty,
    abs = Math.abs,
    floor = Math.floor;

module.exports = function (searchElement /*, fromIndex*/) {
	var i, length, fromIndex, val;
	if (!numberIsNaN(searchElement)) return indexOf.apply(this, arguments);

	length = toPosInt(value(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = 0;else if (fromIndex >= 0) fromIndex = floor(fromIndex);else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i < length; ++i) {
		if (objHasOwnProperty.call(this, i)) {
			val = this[i];
			if (numberIsNaN(val)) return i; // Jslint: ignore
		}
	}
	return -1;
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(131)() ? Number.isNaN : __webpack_require__(132);

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var numberIsNaN = Number.isNaN;
	if (typeof numberIsNaN !== "function") return false;
	return !numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34);
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	// eslint-disable-next-line no-self-compare
	return value !== value;
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sign = __webpack_require__(134),
    abs = Math.abs,
    floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if (value === 0 || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(135)() ? Math.sign : __webpack_require__(136);

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== "function") return false;
	return sign(10) === 1 && sign(-20) === -1;
};

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || value === 0) return value;
	return value > 0 ? 1 : -1;
};

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isValue = __webpack_require__(22);

var map = { function: true, object: true };

module.exports = function (value) {
	return isValue(value) && map[typeof value === "undefined" ? "undefined" : _typeof(value)] || false;
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804



var create = Object.create,
    shim;

if (!__webpack_require__(73)()) {
	shim = __webpack_require__(74);
}

module.exports = function () {
	var nullObject, polyProps, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	polyProps = {};
	desc = {
		configurable: false,
		enumerable: false,
		writable: true,
		value: undefined
	};
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === "__proto__") {
			polyProps[name] = {
				configurable: true,
				enumerable: false,
				writable: true,
				value: undefined
			};
			return;
		}
		polyProps[name] = desc;
	});
	Object.defineProperties(nullObject, polyProps);

	Object.defineProperty(shim, "nullPolyfill", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: nullObject
	});

	return function (prototype, props) {
		return create(prototype === null ? nullObject : prototype, props);
	};
}();

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign,
	    obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(141),
    value = __webpack_require__(6),
    max = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error,
	    i,
	    length = max(arguments.length, 2),
	    assign;
	dest = Object(value(dest));
	assign = function assign(key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(142)() ? Object.keys : __webpack_require__(143);

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(22);

var keys = Object.keys;

module.exports = function (object) {
	return keys(isValue(object) ? Object(object) : object);
};

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) {
  return typeof obj === "function";
};

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString /*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var d = __webpack_require__(18),
    callable = __webpack_require__(9),
    apply = Function.prototype.apply,
    call = Function.prototype.call,
    create = Object.create,
    defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    descriptor = { configurable: true, enumerable: false, writable: true },
    on,
    _once2,
    off,
    emit,
    methods,
    descriptors,
    base;

on = function on(type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;else if (_typeof(data[type]) === 'object') data[type].push(listener);else data[type] = [data[type], listener];

	return this;
};

_once2 = function once(type, listener) {
	var _once, self;

	callable(listener);
	self = this;
	on.call(this, type, _once = function once() {
		off.call(self, type, _once);
		apply.call(listener, this, arguments);
	});

	_once.__eeOnceListener__ = listener;
	return this;
};

off = function off(type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
		for (i = 0; candidate = listeners[i]; ++i) {
			if (candidate === listener || candidate.__eeOnceListener__ === listener) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];else listeners.splice(i, 1);
			}
		}
	} else {
		if (listeners === listener || listeners.__eeOnceListener__ === listener) {
			delete data[type];
		}
	}

	return this;
};

emit = function emit(type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) {
			args[i - 1] = arguments[i];
		}listeners = listeners.slice();
		for (i = 0; listener = listeners[i]; ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: _once2,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(_once2),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function exports(o) {
	return o == null ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try {
		String(symbol);
	} catch (e) {
		return false;
	}

	// Return 'true' also for polyfills
	if (!validTypes[_typeof(Symbol.iterator)]) return false;
	if (!validTypes[_typeof(Symbol.toPrimitive)]) return false;
	if (!validTypes[_typeof(Symbol.toStringTag)]) return false;

	return true;
};

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// ES2015 Symbol polyfill for environments that do not (or partially) support it



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var d = __webpack_require__(18),
    validateSymbol = __webpack_require__(150),
    create = Object.create,
    defineProperties = Object.defineProperties,
    defineProperty = Object.defineProperty,
    objPrototype = Object.prototype,
    NativeSymbol,
    SymbolPolyfill,
    HiddenSymbol,
    globalSymbols = create(null),
    isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0,
		    name,
		    ie11BugWorkaround;
		while (created[desc + (postfix || '')]) {
			++postfix;
		}desc += postfix || '';
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}();

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function _Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function _Symbol2(description) {
	var symbol;
	if (this instanceof _Symbol2) throw new TypeError('Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = description === undefined ? '' : String(description);
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return globalSymbols[key] = SymbolPolyfill(String(key));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) {
			if (globalSymbols[key] === s) return key;
		}
	}),

	// To ensure proper interoperability with other native functions (e.g. Array.from)
	// fallback to eventual native implementation of given symbol
	hasInstance: d('', NativeSymbol && NativeSymbol.hasInstance || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', NativeSymbol && NativeSymbol.isConcatSpreadable || SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', NativeSymbol && NativeSymbol.iterator || SymbolPolyfill('iterator')),
	match: d('', NativeSymbol && NativeSymbol.match || SymbolPolyfill('match')),
	replace: d('', NativeSymbol && NativeSymbol.replace || SymbolPolyfill('replace')),
	search: d('', NativeSymbol && NativeSymbol.search || SymbolPolyfill('search')),
	species: d('', NativeSymbol && NativeSymbol.species || SymbolPolyfill('species')),
	split: d('', NativeSymbol && NativeSymbol.split || SymbolPolyfill('split')),
	toPrimitive: d('', NativeSymbol && NativeSymbol.toPrimitive || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', NativeSymbol && NativeSymbol.toStringTag || SymbolPolyfill('toStringTag')),
	unscopables: d('', NativeSymbol && NativeSymbol.unscopables || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () {
		return this.__name__;
	})
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () {
		return 'Symbol (' + validateSymbol(this).__description__ + ')';
	}),
	valueOf: d(function () {
		return validateSymbol(this);
	})
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if ((typeof symbol === 'undefined' ? 'undefined' : _typeof(symbol)) === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag, d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive, d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(151);

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (x) {
	if (!x) return false;
	if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return x[x.constructor.toStringTag] === 'Symbol';
};

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments = __webpack_require__(34),
    isValue = __webpack_require__(22),
    isString = __webpack_require__(35);

var iteratorSymbol = __webpack_require__(16).iterator,
    isArray = Array.isArray;

module.exports = function (value) {
		if (!isValue(value)) return false;
		if (isArray(value)) return true;
		if (isString(value)) return true;
		if (isArguments(value)) return true;
		return typeof value[iteratorSymbol] === "function";
};

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments = __webpack_require__(34),
    callable = __webpack_require__(9),
    isString = __webpack_require__(35),
    get = __webpack_require__(154);

var isArray = Array.isArray,
    call = Function.prototype.call,
    some = Array.prototype.some;

module.exports = function (iterable, cb /*, thisArg*/) {
	var mode,
	    thisArg = arguments[2],
	    result,
	    doBreak,
	    broken,
	    i,
	    length,
	    char,
	    code;
	if (isArray(iterable) || isArguments(iterable)) mode = "array";else if (isString(iterable)) mode = "string";else iterable = get(iterable);

	callable(cb);
	doBreak = function doBreak() {
		broken = true;
	};
	if (mode === "array") {
		some.call(iterable, function (value) {
			call.call(cb, thisArg, value, doBreak);
			return broken;
		});
		return;
	}
	if (mode === "string") {
		length = iterable.length;
		for (i = 0; i < length; ++i) {
			char = iterable[i];
			if (i + 1 < length) {
				code = char.charCodeAt(0);
				if (code >= 0xd800 && code <= 0xdbff) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments = __webpack_require__(34),
    isString = __webpack_require__(35),
    ArrayIterator = __webpack_require__(155),
    StringIterator = __webpack_require__(165),
    iterable = __webpack_require__(77),
    iteratorSymbol = __webpack_require__(16).iterator;

module.exports = function (obj) {
  if (typeof iterable(obj)[iteratorSymbol] === "function") return obj[iteratorSymbol]();
  if (isArguments(obj)) return new ArrayIterator(obj);
  if (isString(obj)) return new StringIterator(obj);
  return new ArrayIterator(obj);
};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf = __webpack_require__(33),
    contains = __webpack_require__(76),
    d = __webpack_require__(18),
    _Symbol = __webpack_require__(16),
    Iterator = __webpack_require__(53);

var defineProperty = Object.defineProperty,
    ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) throw new TypeError("Constructor requires 'new'");
	Iterator.call(this, arr);
	if (!kind) kind = "value";else if (contains.call(kind, "key+value")) kind = "key+value";else if (contains.call(kind, "key")) kind = "key";else kind = "value";
	defineProperty(this, "__kind__", d("", kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

// Internal %ArrayIteratorPrototype% doesn't expose its constructor
delete ArrayIterator.prototype.constructor;

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	_resolve: d(function (i) {
		if (this.__kind__ === "value") return this.__list__[i];
		if (this.__kind__ === "key+value") return [i, this.__list__[i]];
		return i;
	})
});
defineProperty(ArrayIterator.prototype, _Symbol.toStringTag, d("c", "Array Iterator"));

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copy = __webpack_require__(157),
    normalizeOptions = __webpack_require__(75),
    ensureCallable = __webpack_require__(9),
    map = __webpack_require__(162),
    callable = __webpack_require__(9),
    validValue = __webpack_require__(6),
    bind = Function.prototype.bind,
    defineProperty = Object.defineProperty,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    define;

define = function define(name, desc, options) {
	var value = validValue(desc) && callable(desc.value),
	    dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props /*, options*/) {
	var options = normalizeOptions(arguments[1]);
	if (options.resolveContext != null) ensureCallable(options.resolveContext);
	return map(props, function (desc, name) {
		return define(name, desc, options);
	});
};

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFrom = __webpack_require__(158),
    assign = __webpack_require__(52),
    value = __webpack_require__(6);

module.exports = function (obj /*, propertyNames, options*/) {
	var copy = Object(value(obj)),
	    propertyNames = arguments[1],
	    options = Object(arguments[2]);
	if (copy !== obj && !propertyNames) return copy;
	var result = {};
	if (propertyNames) {
		aFrom(propertyNames, function (propertyName) {
			if (options.ensure || propertyName in obj) result[propertyName] = obj[propertyName];
		});
	} else {
		assign(result, obj);
	}
	return result;
};

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(159)() ? Array.from : __webpack_require__(160);

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var from = Array.from,
	    arr,
	    result;
	if (typeof from !== "function") return false;
	arr = ["raz", "dwa"];
	result = from(arr);
	return Boolean(result && result !== arr && result[1] === "dwa");
};

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var iteratorSymbol = __webpack_require__(16).iterator,
    isArguments = __webpack_require__(34),
    isFunction = __webpack_require__(161),
    toPosInt = __webpack_require__(72),
    callable = __webpack_require__(9),
    validValue = __webpack_require__(6),
    isValue = __webpack_require__(22),
    isString = __webpack_require__(35),
    isArray = Array.isArray,
    call = Function.prototype.call,
    desc = { configurable: true, enumerable: true, writable: true, value: null },
    defineProperty = Object.defineProperty;

// eslint-disable-next-line complexity
module.exports = function (arrayLike /*, mapFn, thisArg*/) {
	var mapFn = arguments[1],
	    thisArg = arguments[2],
	    Context,
	    i,
	    j,
	    arr,
	    length,
	    code,
	    iterator,
	    result,
	    getIterator,
	    value;

	arrayLike = Object(validValue(arrayLike));

	if (isValue(mapFn)) callable(mapFn);
	if (!this || this === Array || !isFunction(this)) {
		// Result: Plain array
		if (!mapFn) {
			if (isArguments(arrayLike)) {
				// Source: Arguments
				length = arrayLike.length;
				if (length !== 1) return Array.apply(null, arrayLike);
				arr = new Array(1);
				arr[0] = arrayLike[0];
				return arr;
			}
			if (isArray(arrayLike)) {
				// Source: Array
				arr = new Array(length = arrayLike.length);
				for (i = 0; i < length; ++i) {
					arr[i] = arrayLike[i];
				}return arr;
			}
		}
		arr = [];
	} else {
		// Result: Non plain array
		Context = this;
	}

	if (!isArray(arrayLike)) {
		if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
			// Source: Iterator
			iterator = callable(getIterator).call(arrayLike);
			if (Context) arr = new Context();
			result = iterator.next();
			i = 0;
			while (!result.done) {
				value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, i, desc);
				} else {
					arr[i] = value;
				}
				result = iterator.next();
				++i;
			}
			length = i;
		} else if (isString(arrayLike)) {
			// Source: String
			length = arrayLike.length;
			if (Context) arr = new Context();
			for (i = 0, j = 0; i < length; ++i) {
				value = arrayLike[i];
				if (i + 1 < length) {
					code = value.charCodeAt(0);
					// eslint-disable-next-line max-depth
					if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
				}
				value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, j, desc);
				} else {
					arr[j] = value;
				}
				++j;
			}
			length = j;
		}
	}
	if (length === undefined) {
		// Source: array or array-like
		length = toPosInt(arrayLike.length);
		if (Context) arr = new Context(length);
		for (i = 0; i < length; ++i) {
			value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
			if (Context) {
				desc.value = value;
				defineProperty(arr, i, desc);
			} else {
				arr[i] = value;
			}
		}
	}
	if (Context) {
		desc.value = null;
		arr.length = length;
	}
	return arr;
};

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objToString = Object.prototype.toString,
    id = objToString.call(__webpack_require__(71));

module.exports = function (value) {
	return typeof value === "function" && objToString.call(value) === id;
};

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callable = __webpack_require__(9),
    forEach = __webpack_require__(163),
    call = Function.prototype.call;

module.exports = function (obj, cb /*, thisArg*/) {
	var result = {},
	    thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, targetObj, index) {
		result[key] = call.call(cb, thisArg, value, key, targetObj, index);
	});
	return result;
};

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(164)("forEach");

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order



var callable = __webpack_require__(9),
    value = __webpack_require__(6),
    bind = Function.prototype.bind,
    call = Function.prototype.call,
    keys = Object.keys,
    objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb /*, thisArg, compareFn*/) {
		var list,
		    thisArg = arguments[2],
		    compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== "function") method = list[method];
		return call.call(method, list, function (key, index) {
			if (!objPropertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols



var setPrototypeOf = __webpack_require__(33),
    d = __webpack_require__(18),
    _Symbol = __webpack_require__(16),
    Iterator = __webpack_require__(53);

var defineProperty = Object.defineProperty,
    StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) throw new TypeError("Constructor requires 'new'");
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, "__length__", d("", str.length));
};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

// Internal %ArrayIteratorPrototype% doesn't expose its constructor
delete StringIterator.prototype.constructor;

StringIterator.prototype = Object.create(Iterator.prototype, {
	_next: d(function () {
		if (!this.__list__) return undefined;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
		return undefined;
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i],
		    code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if (code >= 0xd800 && code <= 0xdbff) return char + this.__list__[this.__nextIndex__++];
		return char;
	})
});
defineProperty(StringIterator.prototype, _Symbol.toStringTag, d("c", "String Iterator"));

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf = __webpack_require__(33),
    d = __webpack_require__(18),
    Iterator = __webpack_require__(53),
    toStringTagSymbol = __webpack_require__(16).toStringTag,
    kinds = __webpack_require__(167),
    defineProperties = Object.defineProperties,
    unBind = Iterator.prototype._unBind,
    MapIterator;

MapIterator = module.exports = function (map, kind) {
	if (!(this instanceof MapIterator)) return new MapIterator(map, kind);
	Iterator.call(this, map.__mapKeysData__, map);
	if (!kind || !kinds[kind]) kind = 'key+value';
	defineProperties(this, {
		__kind__: d('', kind),
		__values__: d('w', map.__mapValuesData__)
	});
};
if (setPrototypeOf) setPrototypeOf(MapIterator, Iterator);

MapIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(MapIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__values__[i];
		if (this.__kind__ === 'key') return this.__list__[i];
		return [this.__list__[i], this.__values__[i]];
	}),
	_unBind: d(function () {
		this.__values__ = null;
		unBind.call(this);
	}),
	toString: d(function () {
		return '[object Map Iterator]';
	})
});
Object.defineProperty(MapIterator.prototype, toStringTagSymbol, d('c', 'Map Iterator'));

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(168)('key', 'value', 'key+value');

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = Array.prototype.forEach,
    create = Object.create;

// eslint-disable-next-line no-unused-vars
module.exports = function (arg /*, …args*/) {
	var set = create(null);
	forEach.call(arguments, function (name) {
		set[name] = true;
	});
	return set;
};

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Exports true if environment provides native `Map` implementation,
// whatever that is.



module.exports = function () {
	if (typeof Map === 'undefined') return false;
	return Object.prototype.toString.call(new Map()) === '[object Map]';
}();

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Check if an `index` of a `text` node is in a `range`.
 *
 * @param {Number} index
 * @param {Text} text
 * @param {Range} range
 * @return {Boolean}
 */

function isIndexInRange(index, text, range) {
  var startKey = range.startKey,
      startOffset = range.startOffset,
      endKey = range.endKey,
      endOffset = range.endOffset;

  if (text.key == startKey && text.key == endKey) {
    return startOffset <= index && index < endOffset;
  } else if (text.key == startKey) {
    return startOffset <= index;
  } else if (text.key == endKey) {
    return index < endOffset;
  } else {
    return true;
  }
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = isIndexInRange;

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _block = __webpack_require__(20);

var _block2 = _interopRequireDefault(_block);

var _inline = __webpack_require__(21);

var _inline2 = _interopRequireDefault(_inline);

var _mark = __webpack_require__(15);

var _mark2 = _interopRequireDefault(_mark);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Changes.
 *
 * @type {Object}
 */

var Changes = {};

/**
 * Mix in the changes that pass through to their at-range equivalents because
 * they don't have any effect on the selection.
 */

var PROXY_TRANSFORMS = ['deleteBackward', 'deleteCharBackward', 'deleteLineBackward', 'deleteWordBackward', 'deleteForward', 'deleteCharForward', 'deleteWordForward', 'deleteLineForward', 'setBlock', 'setInline', 'splitInline', 'unwrapBlock', 'unwrapInline', 'wrapBlock', 'wrapInline'];

PROXY_TRANSFORMS.forEach(function (method) {
  Changes[method] = function (change) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var state = change.state;
    var selection = state.selection;

    var methodAtRange = method + 'AtRange';
    change[methodAtRange].apply(change, [selection].concat(args));
  };
});

/**
 * Add a `mark` to the characters in the current selection.
 *
 * @param {Change} change
 * @param {Mark} mark
 */

Changes.addMark = function (change, mark) {
  mark = _mark2.default.create(mark);
  var state = change.state;
  var document = state.document,
      selection = state.selection;

  if (selection.isExpanded) {
    change.addMarkAtRange(selection, mark);
  } else if (selection.marks) {
    var marks = selection.marks.add(mark);
    var sel = selection.set('marks', marks);
    change.select(sel);
  } else {
    var _marks = document.getActiveMarksAtRange(selection).add(mark);
    var _sel = selection.set('marks', _marks);
    change.select(_sel);
  }
};

/**
 * Delete at the current selection.
 *
 * @param {Change} change
 */

Changes.delete = function (change) {
  var state = change.state;
  var selection = state.selection;

  change.deleteAtRange(selection);

  // Ensure that the selection is collapsed to the start, because in certain
  // cases when deleting across inline nodes, when splitting the inline node the
  // end point of the selection will end up after the split point.
  change.collapseToStart();
};

/**
 * Insert a `block` at the current selection.
 *
 * @param {Change} change
 * @param {String|Object|Block} block
 */

Changes.insertBlock = function (change, block) {
  block = _block2.default.create(block);
  var state = change.state;
  var selection = state.selection;

  change.insertBlockAtRange(selection, block);

  // If the node was successfully inserted, update the selection.
  var node = change.state.document.getNode(block.key);
  if (node) change.collapseToEndOf(node);
};

/**
 * Insert a `fragment` at the current selection.
 *
 * @param {Change} change
 * @param {Document} fragment
 */

Changes.insertFragment = function (change, fragment) {
  if (!fragment.nodes.size) return;

  var state = change.state;
  var _state = state,
      document = _state.document,
      selection = _state.selection;
  var _state2 = state,
      startText = _state2.startText,
      endText = _state2.endText,
      startInline = _state2.startInline;

  var lastText = fragment.getLastText();
  var lastInline = fragment.getClosestInline(lastText.key);
  var keys = document.getTexts().map(function (text) {
    return text.key;
  });
  var isAppending = !startInline || selection.hasEdgeAtStartOf(startText) || selection.hasEdgeAtEndOf(endText);

  change.insertFragmentAtRange(selection, fragment);
  state = change.state;
  document = state.document;

  var newTexts = document.getTexts().filter(function (n) {
    return !keys.includes(n.key);
  });
  var newText = isAppending ? newTexts.last() : newTexts.takeLast(2).first();

  if (newText && lastInline) {
    change.select(selection.collapseToEndOf(newText));
  } else if (newText) {
    change.select(selection.collapseToStartOf(newText).move(lastText.text.length));
  } else {
    change.select(selection.collapseToStart().move(lastText.text.length));
  }
};

/**
 * Insert an `inline` at the current selection.
 *
 * @param {Change} change
 * @param {String|Object|Inline} inline
 */

Changes.insertInline = function (change, inline) {
  inline = _inline2.default.create(inline);
  var state = change.state;
  var selection = state.selection;

  change.insertInlineAtRange(selection, inline);

  // If the node was successfully inserted, update the selection.
  var node = change.state.document.getNode(inline.key);
  if (node) change.collapseToEndOf(node);
};

/**
 * Insert a string of `text` with optional `marks` at the current selection.
 *
 * @param {Change} change
 * @param {String} text
 * @param {Set<Mark>} marks (optional)
 */

Changes.insertText = function (change, text, marks) {
  var state = change.state;
  var document = state.document,
      selection = state.selection;

  marks = marks || selection.marks;
  change.insertTextAtRange(selection, text, marks);

  // If the text was successfully inserted, and the selection had marks on it,
  // unset the selection's marks.
  if (selection.marks && document != change.state.document) {
    change.select({ marks: null });
  }
};

/**
 * Split the block node at the current selection, to optional `depth`.
 *
 * @param {Change} change
 * @param {Number} depth (optional)
 */

Changes.splitBlock = function (change) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var state = change.state;
  var selection = state.selection;

  change.splitBlockAtRange(selection, depth).collapseToEnd();
};

/**
 * Remove a `mark` from the characters in the current selection.
 *
 * @param {Change} change
 * @param {Mark} mark
 */

Changes.removeMark = function (change, mark) {
  mark = _mark2.default.create(mark);
  var state = change.state;
  var document = state.document,
      selection = state.selection;

  if (selection.isExpanded) {
    change.removeMarkAtRange(selection, mark);
  } else if (selection.marks) {
    var marks = selection.marks.remove(mark);
    var sel = selection.set('marks', marks);
    change.select(sel);
  } else {
    var _marks2 = document.getActiveMarksAtRange(selection).remove(mark);
    var _sel2 = selection.set('marks', _marks2);
    change.select(_sel2);
  }
};

/**
 * Add or remove a `mark` from the characters in the current selection,
 * depending on whether it's already there.
 *
 * @param {Change} change
 * @param {Mark} mark
 */

Changes.toggleMark = function (change, mark) {
  mark = _mark2.default.create(mark);
  var state = change.state;

  var exists = state.activeMarks.has(mark);

  if (exists) {
    change.removeMark(mark);
  } else {
    change.addMark(mark);
  }
};

/**
 * Wrap the current selection with prefix/suffix.
 *
 * @param {Change} change
 * @param {String} prefix
 * @param {String} suffix
 */

Changes.wrapText = function (change, prefix) {
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : prefix;
  var state = change.state;
  var selection = state.selection;

  change.wrapTextAtRange(selection, prefix, suffix);

  // If the selection was collapsed, it will have moved the start offset too.
  if (selection.isCollapsed) {
    change.moveStart(0 - prefix.length);
  }

  // Adding the suffix will have pushed the end of the selection further on, so
  // we need to move it back to account for this.
  change.moveEnd(0 - suffix.length);

  // There's a chance that the selection points moved "through" each other,
  // resulting in a now-incorrect selection direction.
  if (selection.isForward != change.state.selection.isForward) {
    change.flip();
  }
};

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = Changes;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = __webpack_require__(0);

var _block = __webpack_require__(20);

var _block2 = _interopRequireDefault(_block);

var _inline = __webpack_require__(21);

var _inline2 = _interopRequireDefault(_inline);

var _mark = __webpack_require__(15);

var _mark2 = _interopRequireDefault(_mark);

var _node = __webpack_require__(17);

var _node2 = _interopRequireDefault(_node);

var _string = __webpack_require__(173);

var _string2 = _interopRequireDefault(_string);

var _core = __webpack_require__(36);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Changes.
 *
 * @type {Object}
 */

var Changes = {};

/**
 * Add a new `mark` to the characters at `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Mixed} mark
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.addMarkAtRange = function (change, range, mark) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (range.isCollapsed) return;

  var _options$normalize = options.normalize,
      normalize = _options$normalize === undefined ? true : _options$normalize;
  var state = change.state;
  var document = state.document;
  var startKey = range.startKey,
      startOffset = range.startOffset,
      endKey = range.endKey,
      endOffset = range.endOffset;

  var texts = document.getTextsAtRange(range);

  texts.forEach(function (node) {
    var key = node.key;

    var index = 0;
    var length = node.text.length;

    if (key == startKey) index = startOffset;
    if (key == endKey) length = endOffset;
    if (key == startKey && key == endKey) length = endOffset - startOffset;

    change.addMarkByKey(key, index, length, mark, { normalize: normalize });
  });
};

/**
 * Delete everything in a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.deleteAtRange = function (change, range) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (range.isCollapsed) return;

  // Snapshot the selection, which creates an extra undo save point, so that
  // when you undo a delete, the expanded selection will be retained.
  change.snapshotSelection();

  var _options$normalize2 = options.normalize,
      normalize = _options$normalize2 === undefined ? true : _options$normalize2;
  var state = change.state;
  var startKey = range.startKey,
      startOffset = range.startOffset,
      endKey = range.endKey,
      endOffset = range.endOffset;
  var document = state.document;

  var isStartVoid = document.hasVoidParent(startKey);
  var isEndVoid = document.hasVoidParent(endKey);
  var startBlock = document.getClosestBlock(startKey);
  var endBlock = document.getClosestBlock(endKey);

  // Check if we have a "hanging" selection case where the even though the
  // selection extends into the start of the end node, we actually want to
  // ignore that for UX reasons.
  var isHanging = startOffset == 0 && endOffset == 0 && isStartVoid == false && startKey == startBlock.getFirstText().key && endKey == endBlock.getFirstText().key;

  // If it's a hanging selection, nudge it back to end in the previous text.
  if (isHanging && isEndVoid) {
    var prevText = document.getPreviousText(endKey);
    endKey = prevText.key;
    endOffset = prevText.text.length;
    isEndVoid = document.hasVoidParent(endKey);
  }

  // If the start node is inside a void node, remove the void node and update
  // the starting point to be right after it, continuously until the start point
  // is not a void, or until the entire range is handled.
  while (isStartVoid) {
    var startVoid = document.getClosestVoid(startKey);
    var nextText = document.getNextText(startKey);
    change.removeNodeByKey(startVoid.key, { normalize: false });

    // If the start and end keys are the same, we're done.
    if (startKey == endKey) return;

    // If there is no next text node, we're done.
    if (!nextText) return;

    // Continue...
    document = change.state.document;
    startKey = nextText.key;
    startOffset = 0;
    isStartVoid = document.hasVoidParent(startKey);
  }

  // If the end node is inside a void node, do the same thing but backwards. But
  // we don't need any aborting checks because if we've gotten this far there
  // must be a non-void node that will exit the loop.
  while (isEndVoid) {
    var endVoid = document.getClosestVoid(endKey);
    var _prevText = document.getPreviousText(endKey);
    change.removeNodeByKey(endVoid.key, { normalize: false });

    // Continue...
    document = change.state.document;
    endKey = _prevText.key;
    endOffset = _prevText.text.length;
    isEndVoid = document.hasVoidParent(endKey);
  }

  // If the start and end key are the same, and it was a hanging selection, we
  // can just remove the entire block.
  if (startKey == endKey && isHanging) {
    change.removeNodeByKey(startBlock.key, { normalize: normalize });
    return;
  }

  // Otherwise, if it wasn't hanging, we're inside a single text node, so we can
  // simply remove the text in the range.
  else if (startKey == endKey) {
      var index = startOffset;
      var length = endOffset - startOffset;
      change.removeTextByKey(startKey, index, length, { normalize: normalize });
      return;
    }

    // Otherwise, we need to recursively remove text and nodes inside the start
    // block after the start offset and inside the end block before the end
    // offset. Then remove any blocks that are in between the start and end
    // blocks. Then finally merge the start and end nodes.
    else {
        startBlock = document.getClosestBlock(startKey);
        endBlock = document.getClosestBlock(endKey);
        var startText = document.getNode(startKey);
        var endText = document.getNode(endKey);
        var startLength = startText.text.length - startOffset;
        var endLength = endOffset;

        var ancestor = document.getCommonAncestor(startKey, endKey);
        var startChild = ancestor.getFurthestAncestor(startKey);
        var endChild = ancestor.getFurthestAncestor(endKey);

        var startParent = document.getParent(startBlock.key);
        var startParentIndex = startParent.nodes.indexOf(startBlock);
        var endParentIndex = startParent.nodes.indexOf(endBlock);

        var child = void 0;

        // Iterate through all of the nodes in the tree after the start text node
        // but inside the end child, and remove them.
        child = startText;

        while (child.key != startChild.key) {
          var parent = document.getParent(child.key);
          var _index = parent.nodes.indexOf(child);
          var afters = parent.nodes.slice(_index + 1);

          afters.reverse().forEach(function (node) {
            change.removeNodeByKey(node.key, { normalize: false });
          });

          child = parent;
        }

        // Remove all of the middle children.
        var startChildIndex = ancestor.nodes.indexOf(startChild);
        var endChildIndex = ancestor.nodes.indexOf(endChild);
        var middles = ancestor.nodes.slice(startChildIndex + 1, endChildIndex);

        middles.reverse().forEach(function (node) {
          change.removeNodeByKey(node.key, { normalize: false });
        });

        // Remove the nodes before the end text node in the tree.
        child = endText;

        while (child.key != endChild.key) {
          var _parent = document.getParent(child.key);
          var _index2 = _parent.nodes.indexOf(child);
          var befores = _parent.nodes.slice(0, _index2);

          befores.reverse().forEach(function (node) {
            change.removeNodeByKey(node.key, { normalize: false });
          });

          child = _parent;
        }

        // Remove any overlapping text content from the leaf text nodes.
        if (startLength != 0) {
          change.removeTextByKey(startKey, startOffset, startLength, { normalize: false });
        }

        if (endLength != 0) {
          change.removeTextByKey(endKey, 0, endOffset, { normalize: false });
        }

        // If the start and end blocks aren't the same, move and merge the end block
        // into the start block.
        if (startBlock.key != endBlock.key) {
          document = change.state.document;
          var lonely = document.getFurthestOnlyChildAncestor(endBlock.key);

          // Move the end block to be right after the start block.
          if (endParentIndex != startParentIndex + 1) {
            change.moveNodeByKey(endBlock.key, startParent.key, startParentIndex + 1);
          }

          // If the selection is hanging, just remove the start block, otherwise
          // merge the end block into it.
          if (isHanging) {
            change.removeNodeByKey(startBlock.key, { normalize: false });
          } else {
            change.mergeNodeByKey(endBlock.key, { normalize: false });
          }

          // If nested empty blocks are left over above the end block, remove them.
          if (lonely) {
            change.removeNodeByKey(lonely.key, { normalize: false });
          }
        }

        // If we should normalize, do it now after everything.
        if (normalize) {
          change.normalizeNodeByKey(ancestor.key, _core2.default);
        }
      }
};

/**
 * Delete backward until the character boundary at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.deleteCharBackwardAtRange = function (change, range, options) {
  var state = change.state;
  var document = state.document;
  var startKey = range.startKey,
      startOffset = range.startOffset;

  var startBlock = document.getClosestBlock(startKey);
  var offset = startBlock.getOffset(startKey);
  var o = offset + startOffset;
  var text = startBlock.text;

  var n = _string2.default.getCharOffsetBackward(text, o);
  change.deleteBackwardAtRange(range, n, options);
};

/**
 * Delete backward until the line boundary at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.deleteLineBackwardAtRange = function (change, range, options) {
  var state = change.state;
  var document = state.document;
  var startKey = range.startKey,
      startOffset = range.startOffset;

  var startBlock = document.getClosestBlock(startKey);
  var offset = startBlock.getOffset(startKey);
  var o = offset + startOffset;
  change.deleteBackwardAtRange(range, o, options);
};

/**
 * Delete backward until the word boundary at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.deleteWordBackwardAtRange = function (change, range, options) {
  var state = change.state;
  var document = state.document;
  var startKey = range.startKey,
      startOffset = range.startOffset;

  var startBlock = document.getClosestBlock(startKey);
  var offset = startBlock.getOffset(startKey);
  var o = offset + startOffset;
  var text = startBlock.text;

  var n = _string2.default.getWordOffsetBackward(text, o);
  change.deleteBackwardAtRange(range, n, options);
};

/**
 * Delete backward `n` characters at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Number} n (optional)
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.deleteBackwardAtRange = function (change, range) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$normalize3 = options.normalize,
      normalize = _options$normalize3 === undefined ? true : _options$normalize3;
  var state = change.state;
  var document = state.document;
  var _range = range,
      startKey = _range.startKey,
      focusOffset = _range.focusOffset;

  // If the range is expanded, perform a regular delete instead.

  if (range.isExpanded) {
    change.deleteAtRange(range, { normalize: normalize });
    return;
  }

  var block = document.getClosestBlock(startKey);

  // If the closest block is void, delete it.
  if (block && block.isVoid) {
    change.removeNodeByKey(block.key, { normalize: normalize });
    return;
  }

  // If the closest is not void, but empty, remove it
  if (block && !block.isVoid && block.isEmpty && document.nodes.size !== 1) {
    change.removeNodeByKey(block.key, { normalize: normalize });
    return;
  }

  // If the closest inline is void, delete it.
  var inline = document.getClosestInline(startKey);
  if (inline && inline.isVoid) {
    change.removeNodeByKey(inline.key, { normalize: normalize });
    return;
  }

  // If the range is at the start of the document, abort.
  if (range.isAtStartOf(document)) {
    return;
  }

  // If the range is at the start of the text node, we need to figure out what
  // is behind it to know how to delete...
  var text = document.getDescendant(startKey);
  if (range.isAtStartOf(text)) {
    var prev = document.getPreviousText(text.key);
    var prevBlock = document.getClosestBlock(prev.key);
    var prevInline = document.getClosestInline(prev.key);

    // If the previous block is void, remove it.
    if (prevBlock && prevBlock.isVoid) {
      change.removeNodeByKey(prevBlock.key, { normalize: normalize });
      return;
    }

    // If the previous inline is void, remove it.
    if (prevInline && prevInline.isVoid) {
      change.removeNodeByKey(prevInline.key, { normalize: normalize });
      return;
    }

    // If we're deleting by one character and the previous text node is not
    // inside the current block, we need to merge the two blocks together.
    if (n == 1 && prevBlock != block) {
      range = range.merge({
        anchorKey: prev.key,
        anchorOffset: prev.text.length
      });

      change.deleteAtRange(range, { normalize: normalize });
      return;
    }
  }

  // If the focus offset is farther than the number of characters to delete,
  // just remove the characters backwards inside the current node.
  if (n < focusOffset) {
    range = range.merge({
      focusOffset: focusOffset - n,
      isBackward: true
    });

    change.deleteAtRange(range, { normalize: normalize });
    return;
  }

  // Otherwise, we need to see how many nodes backwards to go.
  var node = text;
  var offset = 0;
  var traversed = focusOffset;

  while (n > traversed) {
    node = document.getPreviousText(node.key);
    var next = traversed + node.text.length;
    if (n <= next) {
      offset = next - n;
      break;
    } else {
      traversed = next;
    }
  }

  // If the focus node is inside a void, go up until right after it.
  if (document.hasVoidParent(node.key)) {
    var parent = document.getClosestVoid(node.key);
    node = document.getNextText(parent.key);
    offset = 0;
  }

  range = range.merge({
    focusKey: node.key,
    focusOffset: offset,
    isBackward: true
  });

  change.deleteAtRange(range, { normalize: normalize });
};

/**
 * Delete forward until the character boundary at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.deleteCharForwardAtRange = function (change, range, options) {
  var state = change.state;
  var document = state.document;
  var startKey = range.startKey,
      startOffset = range.startOffset;

  var startBlock = document.getClosestBlock(startKey);
  var offset = startBlock.getOffset(startKey);
  var o = offset + startOffset;
  var text = startBlock.text;

  var n = _string2.default.getCharOffsetForward(text, o);
  change.deleteForwardAtRange(range, n, options);
};

/**
 * Delete forward until the line boundary at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.deleteLineForwardAtRange = function (change, range, options) {
  var state = change.state;
  var document = state.document;
  var startKey = range.startKey,
      startOffset = range.startOffset;

  var startBlock = document.getClosestBlock(startKey);
  var offset = startBlock.getOffset(startKey);
  var o = offset + startOffset;
  change.deleteForwardAtRange(range, o, options);
};

/**
 * Delete forward until the word boundary at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.deleteWordForwardAtRange = function (change, range, options) {
  var state = change.state;
  var document = state.document;
  var startKey = range.startKey,
      startOffset = range.startOffset;

  var startBlock = document.getClosestBlock(startKey);
  var offset = startBlock.getOffset(startKey);
  var o = offset + startOffset;
  var text = startBlock.text;

  var n = _string2.default.getWordOffsetForward(text, o);
  change.deleteForwardAtRange(range, n, options);
};

/**
 * Delete forward `n` characters at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Number} n (optional)
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.deleteForwardAtRange = function (change, range) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$normalize4 = options.normalize,
      normalize = _options$normalize4 === undefined ? true : _options$normalize4;
  var state = change.state;
  var document = state.document;
  var _range2 = range,
      startKey = _range2.startKey,
      focusOffset = _range2.focusOffset;

  // If the range is expanded, perform a regular delete instead.

  if (range.isExpanded) {
    change.deleteAtRange(range, { normalize: normalize });
    return;
  }

  var block = document.getClosestBlock(startKey);

  // If the closest block is void, delete it.
  if (block && block.isVoid) {
    change.removeNodeByKey(block.key, { normalize: normalize });
    return;
  }

  // If the closest is not void, but empty, remove it
  if (block && !block.isVoid && block.isEmpty && document.nodes.size !== 1) {
    change.removeNodeByKey(block.key, { normalize: normalize });
    return;
  }

  // If the closest inline is void, delete it.
  var inline = document.getClosestInline(startKey);
  if (inline && inline.isVoid) {
    change.removeNodeByKey(inline.key, { normalize: normalize });
    return;
  }

  // If the range is at the start of the document, abort.
  if (range.isAtEndOf(document)) {
    return;
  }

  // If the range is at the start of the text node, we need to figure out what
  // is behind it to know how to delete...
  var text = document.getDescendant(startKey);
  if (range.isAtEndOf(text)) {
    var next = document.getNextText(text.key);
    var nextBlock = document.getClosestBlock(next.key);
    var nextInline = document.getClosestInline(next.key);

    // If the previous block is void, remove it.
    if (nextBlock && nextBlock.isVoid) {
      change.removeNodeByKey(nextBlock.key, { normalize: normalize });
      return;
    }

    // If the previous inline is void, remove it.
    if (nextInline && nextInline.isVoid) {
      change.removeNodeByKey(nextInline.key, { normalize: normalize });
      return;
    }

    // If we're deleting by one character and the previous text node is not
    // inside the current block, we need to merge the two blocks together.
    if (n == 1 && nextBlock != block) {
      range = range.merge({
        focusKey: next.key,
        focusOffset: 0
      });

      change.deleteAtRange(range, { normalize: normalize });
      return;
    }
  }

  // If the remaining characters to the end of the node is greater than or equal
  // to the number of characters to delete, just remove the characters forwards
  // inside the current node.
  if (n <= text.text.length - focusOffset) {
    range = range.merge({
      focusOffset: focusOffset + n
    });

    change.deleteAtRange(range, { normalize: normalize });
    return;
  }

  // Otherwise, we need to see how many nodes forwards to go.
  var node = text;
  var offset = focusOffset;
  var traversed = text.text.length - focusOffset;

  while (n > traversed) {
    node = document.getNextText(node.key);
    var _next = traversed + node.text.length;
    if (n <= _next) {
      offset = n - traversed;
      break;
    } else {
      traversed = _next;
    }
  }

  // If the focus node is inside a void, go up until right before it.
  if (document.hasVoidParent(node.key)) {
    var parent = document.getClosestVoid(node.key);
    node = document.getPreviousText(parent.key);
    offset = node.text.length;
  }

  range = range.merge({
    focusKey: node.key,
    focusOffset: offset
  });

  change.deleteAtRange(range, { normalize: normalize });
};

/**
 * Insert a `block` node at `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Block|String|Object} block
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.insertBlockAtRange = function (change, range, block) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  block = _block2.default.create(block);
  var _options$normalize5 = options.normalize,
      normalize = _options$normalize5 === undefined ? true : _options$normalize5;

  if (range.isExpanded) {
    change.deleteAtRange(range);
    range = range.collapseToStart();
  }

  var state = change.state;
  var document = state.document;
  var _range3 = range,
      startKey = _range3.startKey,
      startOffset = _range3.startOffset;

  var startBlock = document.getClosestBlock(startKey);
  var parent = document.getParent(startBlock.key);
  var index = parent.nodes.indexOf(startBlock);

  if (startBlock.isVoid) {
    var extra = range.isAtEndOf(startBlock) ? 1 : 0;
    change.insertNodeByKey(parent.key, index + extra, block, { normalize: normalize });
  } else if (startBlock.isEmpty) {
    change.insertNodeByKey(parent.key, index + 1, block, { normalize: normalize });
  } else if (range.isAtStartOf(startBlock)) {
    change.insertNodeByKey(parent.key, index, block, { normalize: normalize });
  } else if (range.isAtEndOf(startBlock)) {
    change.insertNodeByKey(parent.key, index + 1, block, { normalize: normalize });
  } else {
    change.splitDescendantsByKey(startBlock.key, startKey, startOffset, { normalize: false });
    change.insertNodeByKey(parent.key, index + 1, block, { normalize: normalize });
  }

  if (normalize) {
    change.normalizeNodeByKey(parent.key, _core2.default);
  }
};

/**
 * Insert a `fragment` at a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Document} fragment
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.insertFragmentAtRange = function (change, range, fragment) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$normalize6 = options.normalize,
      normalize = _options$normalize6 === undefined ? true : _options$normalize6;

  // If the range is expanded, delete it first.

  if (range.isExpanded) {
    change.deleteAtRange(range, { normalize: false });
    range = range.collapseToStart();
  }

  // If the fragment is empty, there's nothing to do after deleting.
  if (!fragment.nodes.size) return;

  // Regenerate the keys for all of the fragments nodes, so that they're
  // guaranteed not to collide with the existing keys in the document. Otherwise
  // they will be rengerated automatically and we won't have an easy way to
  // reference them.
  fragment = fragment.mapDescendants(function (child) {
    return child.regenerateKey();
  });

  // Calculate a few things...
  var _range4 = range,
      startKey = _range4.startKey,
      startOffset = _range4.startOffset;
  var state = change.state;
  var document = state.document;

  var startText = document.getDescendant(startKey);
  var startBlock = document.getClosestBlock(startText.key);
  var startChild = startBlock.getFurthestAncestor(startText.key);
  var isAtStart = range.isAtStartOf(startBlock);
  var parent = document.getParent(startBlock.key);
  var index = parent.nodes.indexOf(startBlock);
  var blocks = fragment.getBlocks();
  var firstBlock = blocks.first();
  var lastBlock = blocks.last();

  // If the fragment only contains a void block, use `insertBlock` instead.
  if (firstBlock == lastBlock && firstBlock.isVoid) {
    change.insertBlockAtRange(range, firstBlock, options);
    return;
  }

  // If the first and last block aren't the same, we need to insert all of the
  // nodes after the fragment's first block at the index.
  if (firstBlock != lastBlock) {
    var lonelyParent = fragment.getFurthest(firstBlock.key, function (p) {
      return p.nodes.size == 1;
    });
    var lonelyChild = lonelyParent || firstBlock;
    var startIndex = parent.nodes.indexOf(startBlock);
    fragment = fragment.removeDescendant(lonelyChild.key);

    fragment.nodes.forEach(function (node, i) {
      var newIndex = startIndex + i + 1;
      change.insertNodeByKey(parent.key, newIndex, node, { normalize: false });
    });
  }

  // Check if we need to split the node.
  if (startOffset != 0) {
    change.splitDescendantsByKey(startChild.key, startKey, startOffset, { normalize: false });
  }

  // Update our variables with the new state.
  document = change.state.document;
  startText = document.getDescendant(startKey);
  startBlock = document.getClosestBlock(startKey);
  startChild = startBlock.getFurthestAncestor(startText.key);

  // If the first and last block aren't the same, we need to move any of the
  // starting block's children after the split into the last block of the
  // fragment, which has already been inserted.
  if (firstBlock != lastBlock) {
    var nextChild = isAtStart ? startChild : startBlock.getNextSibling(startChild.key);
    var nextNodes = nextChild ? startBlock.nodes.skipUntil(function (n) {
      return n.key == nextChild.key;
    }) : (0, _immutable.List)();
    var lastIndex = lastBlock.nodes.size;

    nextNodes.forEach(function (node, i) {
      var newIndex = lastIndex + i;
      change.moveNodeByKey(node.key, lastBlock.key, newIndex, { normalize: false });
    });
  }

  // If the starting block is empty, we replace it entirely with the first block
  // of the fragment, since this leads to a more expected behavior for the user.
  if (startBlock.isEmpty) {
    change.removeNodeByKey(startBlock.key, { normalize: false });
    change.insertNodeByKey(parent.key, index, firstBlock, { normalize: false });
  }

  // Otherwise, we maintain the starting block, and insert all of the first
  // block's inline nodes into it at the split point.
  else {
      var inlineChild = startBlock.getFurthestAncestor(startText.key);
      var inlineIndex = startBlock.nodes.indexOf(inlineChild);

      firstBlock.nodes.forEach(function (inline, i) {
        var o = startOffset == 0 ? 0 : 1;
        var newIndex = inlineIndex + i + o;
        change.insertNodeByKey(startBlock.key, newIndex, inline, { normalize: false });
      });
    }

  // Normalize if requested.
  if (normalize) {
    change.normalizeNodeByKey(parent.key, _core2.default);
  }
};

/**
 * Insert an `inline` node at `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Inline|String|Object} inline
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.insertInlineAtRange = function (change, range, inline) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$normalize7 = options.normalize,
      normalize = _options$normalize7 === undefined ? true : _options$normalize7;

  inline = _inline2.default.create(inline);

  if (range.isExpanded) {
    change.deleteAtRange(range, { normalize: false });
    range = range.collapseToStart();
  }

  var state = change.state;
  var document = state.document;
  var _range5 = range,
      startKey = _range5.startKey,
      startOffset = _range5.startOffset;

  var parent = document.getParent(startKey);
  var startText = document.assertDescendant(startKey);
  var index = parent.nodes.indexOf(startText);

  if (parent.isVoid) return;

  change.splitNodeByKey(startKey, startOffset, { normalize: false });
  change.insertNodeByKey(parent.key, index + 1, inline, { normalize: false });

  if (normalize) {
    change.normalizeNodeByKey(parent.key, _core2.default);
  }
};

/**
 * Insert `text` at a `range`, with optional `marks`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {String} text
 * @param {Set<Mark>} marks (optional)
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.insertTextAtRange = function (change, range, text, marks) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var normalize = options.normalize;
  var state = change.state;
  var document = state.document;
  var startKey = range.startKey,
      startOffset = range.startOffset;

  var parent = document.getParent(startKey);

  if (parent.isVoid) return;

  if (range.isExpanded) {
    change.deleteAtRange(range, { normalize: false });
  }

  // PERF: Unless specified, don't normalize if only inserting text.
  if (normalize !== undefined) {
    normalize = range.isExpanded;
  }

  change.insertTextByKey(startKey, startOffset, text, marks, { normalize: normalize });
};

/**
 * Remove an existing `mark` to the characters at `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Mark|String} mark (optional)
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.removeMarkAtRange = function (change, range, mark) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (range.isCollapsed) return;

  var _options$normalize8 = options.normalize,
      normalize = _options$normalize8 === undefined ? true : _options$normalize8;
  var state = change.state;
  var document = state.document;

  var texts = document.getTextsAtRange(range);
  var startKey = range.startKey,
      startOffset = range.startOffset,
      endKey = range.endKey,
      endOffset = range.endOffset;

  texts.forEach(function (node) {
    var key = node.key;

    var index = 0;
    var length = node.text.length;

    if (key == startKey) index = startOffset;
    if (key == endKey) length = endOffset;
    if (key == startKey && key == endKey) length = endOffset - startOffset;

    change.removeMarkByKey(key, index, length, mark, { normalize: normalize });
  });
};

/**
 * Set the `properties` of block nodes in a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Object|String} properties
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.setBlockAtRange = function (change, range, properties) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$normalize9 = options.normalize,
      normalize = _options$normalize9 === undefined ? true : _options$normalize9;
  var state = change.state;
  var document = state.document;

  var blocks = document.getBlocksAtRange(range);

  blocks.forEach(function (block) {
    change.setNodeByKey(block.key, properties, { normalize: normalize });
  });
};

/**
 * Set the `properties` of inline nodes in a `range`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Object|String} properties
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.setInlineAtRange = function (change, range, properties) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$normalize10 = options.normalize,
      normalize = _options$normalize10 === undefined ? true : _options$normalize10;
  var state = change.state;
  var document = state.document;

  var inlines = document.getInlinesAtRange(range);

  inlines.forEach(function (inline) {
    change.setNodeByKey(inline.key, properties, { normalize: normalize });
  });
};

/**
 * Split the block nodes at a `range`, to optional `height`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Number} height (optional)
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.splitBlockAtRange = function (change, range) {
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$normalize11 = options.normalize,
      normalize = _options$normalize11 === undefined ? true : _options$normalize11;

  if (range.isExpanded) {
    change.deleteAtRange(range, { normalize: normalize });
    range = range.collapseToStart();
  }

  var _range6 = range,
      startKey = _range6.startKey,
      startOffset = _range6.startOffset;
  var state = change.state;
  var document = state.document;

  var node = document.assertDescendant(startKey);
  var parent = document.getClosestBlock(node.key);
  var h = 0;

  while (parent && parent.kind == 'block' && h < height) {
    node = parent;
    parent = document.getClosestBlock(parent.key);
    h++;
  }

  change.splitDescendantsByKey(node.key, startKey, startOffset, { normalize: normalize });
};

/**
 * Split the inline nodes at a `range`, to optional `height`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Number} height (optional)
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.splitInlineAtRange = function (change, range) {
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$normalize12 = options.normalize,
      normalize = _options$normalize12 === undefined ? true : _options$normalize12;

  if (range.isExpanded) {
    change.deleteAtRange(range, { normalize: normalize });
    range = range.collapseToStart();
  }

  var _range7 = range,
      startKey = _range7.startKey,
      startOffset = _range7.startOffset;
  var state = change.state;
  var document = state.document;

  var node = document.assertDescendant(startKey);
  var parent = document.getClosestInline(node.key);
  var h = 0;

  while (parent && parent.kind == 'inline' && h < height) {
    node = parent;
    parent = document.getClosestInline(parent.key);
    h++;
  }

  change.splitDescendantsByKey(node.key, startKey, startOffset, { normalize: normalize });
};

/**
 * Add or remove a `mark` from the characters at `range`, depending on whether
 * it's already there.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Mixed} mark
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.toggleMarkAtRange = function (change, range, mark) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (range.isCollapsed) return;

  mark = _mark2.default.create(mark);

  var _options$normalize13 = options.normalize,
      normalize = _options$normalize13 === undefined ? true : _options$normalize13;
  var state = change.state;
  var document = state.document;

  var marks = document.getActiveMarksAtRange(range);
  var exists = marks.some(function (m) {
    return m.equals(mark);
  });

  if (exists) {
    change.removeMarkAtRange(range, mark, { normalize: normalize });
  } else {
    change.addMarkAtRange(range, mark, { normalize: normalize });
  }
};

/**
 * Unwrap all of the block nodes in a `range` from a block with `properties`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {String|Object} properties
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.unwrapBlockAtRange = function (change, range, properties) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  properties = _node2.default.createProperties(properties);

  var _options$normalize14 = options.normalize,
      normalize = _options$normalize14 === undefined ? true : _options$normalize14;
  var state = change.state;
  var document = state.document;

  var blocks = document.getBlocksAtRange(range);
  var wrappers = blocks.map(function (block) {
    return document.getClosest(block.key, function (parent) {
      if (parent.kind != 'block') return false;
      if (properties.type != null && parent.type != properties.type) return false;
      if (properties.isVoid != null && parent.isVoid != properties.isVoid) return false;
      if (properties.data != null && !parent.data.isSuperset(properties.data)) return false;
      return true;
    });
  }).filter(function (exists) {
    return exists;
  }).toOrderedSet().toList();

  wrappers.forEach(function (block) {
    var first = block.nodes.first();
    var last = block.nodes.last();
    var parent = document.getParent(block.key);
    var index = parent.nodes.indexOf(block);

    var children = block.nodes.filter(function (child) {
      return blocks.some(function (b) {
        return child == b || child.hasDescendant(b.key);
      });
    });

    var firstMatch = children.first();
    var lastMatch = children.last();

    if (first == firstMatch && last == lastMatch) {
      block.nodes.forEach(function (child, i) {
        change.moveNodeByKey(child.key, parent.key, index + i, { normalize: false });
      });

      change.removeNodeByKey(block.key, { normalize: false });
    } else if (last == lastMatch) {
      block.nodes.skipUntil(function (n) {
        return n == firstMatch;
      }).forEach(function (child, i) {
        change.moveNodeByKey(child.key, parent.key, index + 1 + i, { normalize: false });
      });
    } else if (first == firstMatch) {
      block.nodes.takeUntil(function (n) {
        return n == lastMatch;
      }).push(lastMatch).forEach(function (child, i) {
        change.moveNodeByKey(child.key, parent.key, index + i, { normalize: false });
      });
    } else {
      var firstText = firstMatch.getFirstText();
      change.splitDescendantsByKey(block.key, firstText.key, 0, { normalize: false });
      document = change.state.document;

      children.forEach(function (child, i) {
        if (i == 0) {
          var extra = child;
          child = document.getNextBlock(child.key);
          change.removeNodeByKey(extra.key, { normalize: false });
        }

        change.moveNodeByKey(child.key, parent.key, index + 1 + i, { normalize: false });
      });
    }
  });

  // TODO: optmize to only normalize the right block
  if (normalize) {
    change.normalizeDocument(_core2.default);
  }
};

/**
 * Unwrap the inline nodes in a `range` from an inline with `properties`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {String|Object} properties
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.unwrapInlineAtRange = function (change, range, properties) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  properties = _node2.default.createProperties(properties);

  var _options$normalize15 = options.normalize,
      normalize = _options$normalize15 === undefined ? true : _options$normalize15;
  var state = change.state;
  var document = state.document;

  var texts = document.getTextsAtRange(range);
  var inlines = texts.map(function (text) {
    return document.getClosest(text.key, function (parent) {
      if (parent.kind != 'inline') return false;
      if (properties.type != null && parent.type != properties.type) return false;
      if (properties.isVoid != null && parent.isVoid != properties.isVoid) return false;
      if (properties.data != null && !parent.data.isSuperset(properties.data)) return false;
      return true;
    });
  }).filter(function (exists) {
    return exists;
  }).toOrderedSet().toList();

  inlines.forEach(function (inline) {
    var parent = change.state.document.getParent(inline.key);
    var index = parent.nodes.indexOf(inline);

    inline.nodes.forEach(function (child, i) {
      change.moveNodeByKey(child.key, parent.key, index + i, { normalize: false });
    });
  });

  // TODO: optmize to only normalize the right block
  if (normalize) {
    change.normalizeDocument(_core2.default);
  }
};

/**
 * Wrap all of the blocks in a `range` in a new `block`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Block|Object|String} block
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.wrapBlockAtRange = function (change, range, block) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  block = _block2.default.create(block);
  block = block.set('nodes', block.nodes.clear());

  var _options$normalize16 = options.normalize,
      normalize = _options$normalize16 === undefined ? true : _options$normalize16;
  var state = change.state;
  var document = state.document;

  var blocks = document.getBlocksAtRange(range);
  var firstblock = blocks.first();
  var lastblock = blocks.last();
  var parent = void 0,
      siblings = void 0,
      index = void 0;

  // If there is only one block in the selection then we know the parent and
  // siblings.
  if (blocks.length === 1) {
    parent = document.getParent(firstblock.key);
    siblings = blocks;
  }

  // Determine closest shared parent to all blocks in selection.
  else {
      parent = document.getClosest(firstblock.key, function (p1) {
        return !!document.getClosest(lastblock.key, function (p2) {
          return p1 == p2;
        });
      });
    }

  // If no shared parent could be found then the parent is the document.
  if (parent == null) parent = document;

  // Create a list of direct children siblings of parent that fall in the
  // selection.
  if (siblings == null) {
    var indexes = parent.nodes.reduce(function (ind, node, i) {
      if (node == firstblock || node.hasDescendant(firstblock.key)) ind[0] = i;
      if (node == lastblock || node.hasDescendant(lastblock.key)) ind[1] = i;
      return ind;
    }, []);

    index = indexes[0];
    siblings = parent.nodes.slice(indexes[0], indexes[1] + 1);
  }

  // Get the index to place the new wrapped node at.
  if (index == null) {
    index = parent.nodes.indexOf(siblings.first());
  }

  // Inject the new block node into the parent.
  change.insertNodeByKey(parent.key, index, block, { normalize: false });

  // Move the sibling nodes into the new block node.
  siblings.forEach(function (node, i) {
    change.moveNodeByKey(node.key, block.key, i, { normalize: false });
  });

  if (normalize) {
    change.normalizeNodeByKey(parent.key, _core2.default);
  }
};

/**
 * Wrap the text and inlines in a `range` in a new `inline`.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {Inline|Object|String} inline
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.wrapInlineAtRange = function (change, range, inline) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var state = change.state;
  var document = state.document;
  var _options$normalize17 = options.normalize,
      normalize = _options$normalize17 === undefined ? true : _options$normalize17;
  var startKey = range.startKey,
      startOffset = range.startOffset,
      endKey = range.endKey,
      endOffset = range.endOffset;

  if (range.isCollapsed) {
    // Wrapping an inline void
    var inlineParent = document.getClosestInline(startKey);
    if (!inlineParent.isVoid) {
      return;
    }

    return change.wrapInlineByKey(inlineParent.key, inline, options);
  }

  inline = _inline2.default.create(inline);
  inline = inline.set('nodes', inline.nodes.clear());

  var blocks = document.getBlocksAtRange(range);
  var startBlock = document.getClosestBlock(startKey);
  var endBlock = document.getClosestBlock(endKey);
  var startChild = startBlock.getFurthestAncestor(startKey);
  var endChild = endBlock.getFurthestAncestor(endKey);

  change.splitDescendantsByKey(endChild.key, endKey, endOffset, { normalize: false });
  change.splitDescendantsByKey(startChild.key, startKey, startOffset, { normalize: false });

  document = change.state.document;
  startBlock = document.getDescendant(startBlock.key);
  endBlock = document.getDescendant(endBlock.key);
  startChild = startBlock.getFurthestAncestor(startKey);
  endChild = endBlock.getFurthestAncestor(endKey);
  var startIndex = startBlock.nodes.indexOf(startChild);
  var endIndex = endBlock.nodes.indexOf(endChild);

  if (startBlock == endBlock) {
    document = change.state.document;
    startBlock = document.getClosestBlock(startKey);
    startChild = startBlock.getFurthestAncestor(startKey);

    var startInner = document.getNextSibling(startChild.key);
    var startInnerIndex = startBlock.nodes.indexOf(startInner);
    var endInner = startKey == endKey ? startInner : startBlock.getFurthestAncestor(endKey);
    var inlines = startBlock.nodes.skipUntil(function (n) {
      return n == startInner;
    }).takeUntil(function (n) {
      return n == endInner;
    }).push(endInner);

    var node = inline.regenerateKey();

    change.insertNodeByKey(startBlock.key, startInnerIndex, node, { normalize: false });

    inlines.forEach(function (child, i) {
      change.moveNodeByKey(child.key, node.key, i, { normalize: false });
    });

    if (normalize) {
      change.normalizeNodeByKey(startBlock.key, _core2.default);
    }
  } else {
    var startInlines = startBlock.nodes.slice(startIndex + 1);
    var endInlines = endBlock.nodes.slice(0, endIndex + 1);
    var startNode = inline.regenerateKey();
    var endNode = inline.regenerateKey();

    change.insertNodeByKey(startBlock.key, startIndex - 1, startNode, { normalize: false });
    change.insertNodeByKey(endBlock.key, endIndex, endNode, { normalize: false });

    startInlines.forEach(function (child, i) {
      change.moveNodeByKey(child.key, startNode.key, i, { normalize: false });
    });

    endInlines.forEach(function (child, i) {
      change.moveNodeByKey(child.key, endNode.key, i, { normalize: false });
    });

    if (normalize) {
      change.normalizeNodeByKey(startBlock.key, _core2.default).normalizeNodeByKey(endBlock.key, _core2.default);
    }

    blocks.slice(1, -1).forEach(function (block) {
      var node = inline.regenerateKey();
      change.insertNodeByKey(block.key, 0, node, { normalize: false });

      block.nodes.forEach(function (child, i) {
        change.moveNodeByKey(child.key, node.key, i, { normalize: false });
      });

      if (normalize) {
        change.normalizeNodeByKey(block.key, _core2.default);
      }
    });
  }
};

/**
 * Wrap the text in a `range` in a prefix/suffix.
 *
 * @param {Change} change
 * @param {Range} range
 * @param {String} prefix
 * @param {String} suffix (optional)
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.wrapTextAtRange = function (change, range, prefix) {
  var suffix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : prefix;
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var _options$normalize18 = options.normalize,
      normalize = _options$normalize18 === undefined ? true : _options$normalize18;
  var startKey = range.startKey,
      endKey = range.endKey;

  var start = range.collapseToStart();
  var end = range.collapseToEnd();

  if (startKey == endKey) {
    end = end.move(prefix.length);
  }

  change.insertTextAtRange(start, prefix, [], { normalize: normalize });
  change.insertTextAtRange(end, suffix, [], { normalize: normalize });
};

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = Changes;

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _esrever = __webpack_require__(174);

/**
 * Surrogate pair start and end points.
 *
 * @type {Number}
 */

var SURROGATE_START = 0xD800;
var SURROGATE_END = 0xDFFF;

/**
 * A regex to match space characters.
 *
 * @type {RegExp}
 */

var SPACE = /\s/;

/**
 * A regex to match chameleon characters, that count as word characters as long
 * as they are inside of a word.
 *
 * @type {RegExp}
 */

var CHAMELEON = /['\u2018\u2019]/;

/**
 * A regex that matches punctuation.
 *
 * @type {RegExp}
 */

var PUNCTUATION = /[\u0021-\u0023\u0025-\u002A\u002C-\u002F\u003A\u003B\u003F\u0040\u005B-\u005D\u005F\u007B\u007D\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E3B\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;

/**
 * Is a character `code` in a surrogate character.
 *
 * @param {Number} code
 * @return {Boolean}
 */

function isSurrogate(code) {
  return SURROGATE_START <= code && code <= SURROGATE_END;
}

/**
 * Is a character a word character? Needs the `remaining` characters too.
 *
 * @param {String} char
 * @param {String|Void} remaining
 * @return {Boolean}
 */

function isWord(char, remaining) {
  if (SPACE.test(char)) return false;

  // If it's a chameleon character, recurse to see if the next one is or not.
  if (CHAMELEON.test(char)) {
    var next = remaining.charAt(0);
    var length = getCharLength(next);
    next = remaining.slice(0, length);
    var rest = remaining.slice(length);
    if (isWord(next, rest)) return true;
  }

  if (PUNCTUATION.test(char)) return false;
  return true;
}

/**
 * Get the length of a `character`.
 *
 * @param {String} char
 * @return {Number}
 */

function getCharLength(char) {
  return isSurrogate(char.charCodeAt(0)) ? 2 : 1;
}

/**
 * Get the offset to the end of the first character in `text`.
 *
 * @param {String} text
 * @return {Number}
 */

function getCharOffset(text) {
  var char = text.charAt(0);
  return getCharLength(char);
}

/**
 * Get the offset to the end of the character before an `offset` in `text`.
 *
 * @param {String} text
 * @param {Number} offset
 * @return {Number}
 */

function getCharOffsetBackward(text, offset) {
  text = text.slice(0, offset);
  text = (0, _esrever.reverse)(text);
  return getCharOffset(text);
}

/**
 * Get the offset to the end of the character after an `offset` in `text`.
 *
 * @param {String} text
 * @param {Number} offset
 * @return {Number}
 */

function getCharOffsetForward(text, offset) {
  text = text.slice(offset);
  return getCharOffset(text);
}

/**
 * Get the offset to the end of the first word in `text`.
 *
 * @param {String} text
 * @return {Number}
 */

function getWordOffset(text) {
  var length = 0;
  var i = 0;
  var started = false;
  var char = void 0;

  while (char = text.charAt(i)) {
    var l = getCharLength(char);
    char = text.slice(i, i + l);
    var rest = text.slice(i + l);

    if (isWord(char, rest)) {
      started = true;
      length += l;
    } else if (!started) {
      length += l;
    } else {
      break;
    }

    i += l;
  }

  return length;
}

/**
 * Get the offset to the end of the word before an `offset` in `text`.
 *
 * @param {String} text
 * @param {Number} offset
 * @return {Number}
 */

function getWordOffsetBackward(text, offset) {
  text = text.slice(0, offset);
  text = (0, _esrever.reverse)(text);
  var o = getWordOffset(text);
  return o;
}

/**
 * Get the offset to the end of the word after an `offset` in `text`.
 *
 * @param {String} text
 * @param {Number} offset
 * @return {Number}
 */

function getWordOffsetForward(text, offset) {
  text = text.slice(offset);
  var o = getWordOffset(text);
  return o;
}

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = {
  getCharOffsetForward: getCharOffsetForward,
  getCharOffsetBackward: getCharOffsetBackward,
  getWordOffsetBackward: getWordOffsetBackward,
  getWordOffsetForward: getWordOffsetForward
};

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! https://mths.be/esrever v0.2.0 by @mathias */
;(function (root) {

	// Detect free variables `exports`
	var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports;

	// Detect free variable `module`
	var freeModule = ( false ? 'undefined' : _typeof(module)) == 'object' && module && module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var regexSymbolWithCombiningMarks = /([\0-\u02FF\u0370-\u1AAF\u1B00-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uE000-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])([\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g;
	var regexSurrogatePair = /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g;

	var reverse = function reverse(string) {
		// Step 1: deal with combining marks and astral symbols (surrogate pairs)
		string = string
		// Swap symbols with their combining marks so the combining marks go first
		.replace(regexSymbolWithCombiningMarks, function ($0, $1, $2) {
			// Reverse the combining marks so they will end up in the same order
			// later on (after another round of reversing)
			return reverse($2) + $1;
		})
		// Swap high and low surrogates so the low surrogates go first
		.replace(regexSurrogatePair, '$2$1');
		// Step 2: reverse the code units in the string
		var result = '';
		var index = string.length;
		while (index--) {
			result += string.charAt(index);
		}
		return result;
	};

	/*--------------------------------------------------------------------------*/

	var esrever = {
		'version': '0.2.0',
		'reverse': reverse
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if ("function" == 'function' && _typeof(__webpack_require__(81)) == 'object' && __webpack_require__(81)) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return esrever;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && !freeExports.nodeType) {
		if (freeModule) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = esrever;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (var key in esrever) {
				esrever.hasOwnProperty(key) && (freeExports[key] = esrever[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.esrever = esrever;
	}
})(undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)(module), __webpack_require__(80)))

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createFind = __webpack_require__(176),
    findIndex = __webpack_require__(253);

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */
var find = createFind(findIndex);

module.exports = find;

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIteratee = __webpack_require__(82),
    isArrayLike = __webpack_require__(91),
    keys = __webpack_require__(59);

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function (collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate, 3);
      collection = keys(collection);
      predicate = function predicate(key) {
        return iteratee(iterable[key], key, iterable);
      };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

module.exports = createFind;

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsMatch = __webpack_require__(178),
    getMatchData = __webpack_require__(239),
    matchesStrictComparable = __webpack_require__(93);

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function (object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Stack = __webpack_require__(83),
    baseIsEqual = __webpack_require__(58);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assocIndexOf = __webpack_require__(39);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assocIndexOf = __webpack_require__(39);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assocIndexOf = __webpack_require__(39);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assocIndexOf = __webpack_require__(39);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ListCache = __webpack_require__(38);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}

module.exports = stackClear;

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ListCache = __webpack_require__(38),
    Map = __webpack_require__(56),
    MapCache = __webpack_require__(57);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__(84),
    isMasked = __webpack_require__(192),
    isObject = __webpack_require__(27),
    toSource = __webpack_require__(86);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(26);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreJsData = __webpack_require__(193);

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

module.exports = isMasked;

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(10);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Hash = __webpack_require__(196),
    ListCache = __webpack_require__(38),
    Map = __webpack_require__(56);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

module.exports = mapCacheClear;

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hashClear = __webpack_require__(197),
    hashDelete = __webpack_require__(198),
    hashGet = __webpack_require__(199),
    hashHas = __webpack_require__(200),
    hashSet = __webpack_require__(201);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nativeCreate = __webpack_require__(40);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nativeCreate = __webpack_require__(40);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nativeCreate = __webpack_require__(40);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nativeCreate = __webpack_require__(40);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getMapData = __webpack_require__(41);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

module.exports = isKeyable;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getMapData = __webpack_require__(41);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getMapData = __webpack_require__(41);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getMapData = __webpack_require__(41);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Stack = __webpack_require__(83),
    equalArrays = __webpack_require__(87),
    equalByTag = __webpack_require__(213),
    equalObjects = __webpack_require__(217),
    getTag = __webpack_require__(234),
    isArray = __webpack_require__(11),
    isBuffer = __webpack_require__(89),
    isTypedArray = __webpack_require__(90);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MapCache = __webpack_require__(57),
    setCacheAdd = __webpack_require__(209),
    setCacheHas = __webpack_require__(210);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
    var index = -1,
        length = values == null ? 0 : values.length;

    this.__data__ = new MapCache();
    while (++index < length) {
        this.add(values[index]);
    }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(26),
    Uint8Array = __webpack_require__(214),
    eq = __webpack_require__(55),
    equalArrays = __webpack_require__(87),
    mapToArray = __webpack_require__(215),
    setToArray = __webpack_require__(216);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(10);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getAllKeys = __webpack_require__(218);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetAllKeys = __webpack_require__(219),
    getSymbols = __webpack_require__(220),
    keys = __webpack_require__(59);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayPush = __webpack_require__(88),
    isArray = __webpack_require__(11);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayFilter = __webpack_require__(221),
    stubArray = __webpack_require__(222);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseTimes = __webpack_require__(224),
    isArguments = __webpack_require__(60),
    isArray = __webpack_require__(11),
    isBuffer = __webpack_require__(89),
    isIndex = __webpack_require__(61),
    isTypedArray = __webpack_require__(90);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (
    // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' ||
    // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') ||
    // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') ||
    // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(25),
    isObjectLike = __webpack_require__(28);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(25),
    isLength = __webpack_require__(62),
    isObjectLike = __webpack_require__(28);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

module.exports = baseUnary;

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var freeGlobal = __webpack_require__(85);

/** Detect free variable `exports`. */
var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = function () {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();

module.exports = nodeUtil;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)(module)))

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isPrototype = __webpack_require__(231),
    nativeKeys = __webpack_require__(232);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

  return value === proto;
}

module.exports = isPrototype;

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var overArg = __webpack_require__(233);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DataView = __webpack_require__(235),
    Map = __webpack_require__(56),
    Promise = __webpack_require__(236),
    Set = __webpack_require__(237),
    WeakMap = __webpack_require__(238),
    baseGetTag = __webpack_require__(25),
    toSource = __webpack_require__(86);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
    getTag = function getTag(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
            switch (ctorString) {
                case dataViewCtorString:
                    return dataViewTag;
                case mapCtorString:
                    return mapTag;
                case promiseCtorString:
                    return promiseTag;
                case setCtorString:
                    return setTag;
                case weakMapCtorString:
                    return weakMapTag;
            }
        }
        return result;
    };
}

module.exports = getTag;

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(19),
    root = __webpack_require__(10);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(19),
    root = __webpack_require__(10);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(19),
    root = __webpack_require__(10);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(19),
    root = __webpack_require__(10);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isStrictComparable = __webpack_require__(92),
    keys = __webpack_require__(59);

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
    var result = keys(object),
        length = result.length;

    while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
    }
    return result;
}

module.exports = getMatchData;

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsEqual = __webpack_require__(58),
    get = __webpack_require__(241),
    hasIn = __webpack_require__(94),
    isKey = __webpack_require__(64),
    isStrictComparable = __webpack_require__(92),
    matchesStrictComparable = __webpack_require__(93),
    toKey = __webpack_require__(29);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function (object) {
    var objValue = get(object, path);
    return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGet = __webpack_require__(63);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var memoizeCapped = __webpack_require__(243);

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function (string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

module.exports = stringToPath;

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var memoize = __webpack_require__(244);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MapCache = __webpack_require__(57);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseToString = __webpack_require__(246);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(26),
    arrayMap = __webpack_require__(247),
    isArray = __webpack_require__(11),
    isSymbol = __webpack_require__(43);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

module.exports = baseToString;

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var castPath = __webpack_require__(42),
    isArguments = __webpack_require__(60),
    isArray = __webpack_require__(11),
    isIndex = __webpack_require__(61),
    isLength = __webpack_require__(62),
    toKey = __webpack_require__(29);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}

module.exports = hasPath;

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseProperty = __webpack_require__(251),
    basePropertyDeep = __webpack_require__(252),
    isKey = __webpack_require__(64),
    toKey = __webpack_require__(29);

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGet = __webpack_require__(63);

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function (object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseFindIndex = __webpack_require__(254),
    baseIteratee = __webpack_require__(82),
    toInteger = __webpack_require__(255);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

module.exports = findIndex;

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toFinite = __webpack_require__(256);

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? remainder ? result - remainder : result : 0;
}

module.exports = toInteger;

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toNumber = __webpack_require__(257);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(27),
    isSymbol = __webpack_require__(43);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

module.exports = toNumber;

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var toString = Object.prototype.toString;

module.exports = function (val) {
  switch (toString.call(val)) {
    case '[object Function]':
      return 'function';
    case '[object Date]':
      return 'date';
    case '[object RegExp]':
      return 'regexp';
    case '[object Arguments]':
      return 'arguments';
    case '[object Array]':
      return 'array';
    case '[object String]':
      return 'string';
  }

  if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) == 'object' && val && typeof val.length == 'number') {
    try {
      if (typeof val.callee == 'function') return 'arguments';
    } catch (ex) {
      if (ex instanceof TypeError) {
        return 'arguments';
      }
    }
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val && val.nodeType === 1) return 'element';
  if (val === Object(val)) return 'object';

  return typeof val === 'undefined' ? 'undefined' : _typeof(val);
};

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Check if an `object` is a React component.
 *
 * @param {Object} object
 * @return {Boolean}
 */

function isReactComponent(object) {
  return object && object.prototype && object.prototype.isReactComponent;
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = isReactComponent;

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _block = __webpack_require__(20);

var _block2 = _interopRequireDefault(_block);

var _inline = __webpack_require__(21);

var _inline2 = _interopRequireDefault(_inline);

var _mark = __webpack_require__(15);

var _mark2 = _interopRequireDefault(_mark);

var _node = __webpack_require__(17);

var _node2 = _interopRequireDefault(_node);

var _core = __webpack_require__(36);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

/**
 * Changes.
 *
 * @type {Object}
 */

var Changes = {};

/**
 * Add mark to text at `offset` and `length` in node by `key`.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Number} offset
 * @param {Number} length
 * @param {Mixed} mark
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.addMarkByKey = function (change, key, offset, length, mark) {
  var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

  mark = _mark2.default.create(mark);
  var _options$normalize = options.normalize,
      normalize = _options$normalize === undefined ? true : _options$normalize;
  var state = change.state;
  var document = state.document;

  var path = document.getPath(key);
  var node = document.getNode(key);
  var leaves = node.getLeaves();

  var operations = [];
  var bx = offset;
  var by = offset + length;
  var o = 0;

  leaves.forEach(function (leaf) {
    var ax = o;
    var ay = ax + leaf.text.length;

    o += leaf.text.length;

    // If the leaf doesn't overlap with the operation, continue on.
    if (ay < bx || by < ax) return;

    // If the leaf already has the mark, continue on.
    if (leaf.marks.has(mark)) return;

    // Otherwise, determine which offset and characters overlap.
    var start = Math.max(ax, bx);
    var end = Math.min(ay, by);

    operations.push({
      type: 'add_mark',
      path: path,
      offset: start,
      length: end - start,
      mark: mark
    });
  });

  change.applyOperations(operations);

  if (normalize) {
    var parent = document.getParent(key);
    change.normalizeNodeByKey(parent.key, _core2.default);
  }
};

/**
 * Insert a `fragment` at `index` in a node by `key`.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Number} index
 * @param {Fragment} fragment
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.insertFragmentByKey = function (change, key, index, fragment) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var _options$normalize2 = options.normalize,
      normalize = _options$normalize2 === undefined ? true : _options$normalize2;

  fragment.nodes.forEach(function (node, i) {
    change.insertNodeByKey(key, index + i, node);
  });

  if (normalize) {
    change.normalizeNodeByKey(key, _core2.default);
  }
};

/**
 * Insert a `node` at `index` in a node by `key`.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Number} index
 * @param {Node} node
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.insertNodeByKey = function (change, key, index, node) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var _options$normalize3 = options.normalize,
      normalize = _options$normalize3 === undefined ? true : _options$normalize3;
  var state = change.state;
  var document = state.document;

  var path = document.getPath(key);

  change.applyOperation({
    type: 'insert_node',
    path: [].concat(_toConsumableArray(path), [index]),
    node: node
  });

  if (normalize) {
    change.normalizeNodeByKey(key, _core2.default);
  }
};

/**
 * Insert `text` at `offset` in node by `key`.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Number} offset
 * @param {String} text
 * @param {Set<Mark>} marks (optional)
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.insertTextByKey = function (change, key, offset, text, marks) {
  var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var _options$normalize4 = options.normalize,
      normalize = _options$normalize4 === undefined ? true : _options$normalize4;
  var state = change.state;
  var document = state.document;

  var path = document.getPath(key);
  var node = document.getNode(key);
  marks = marks || node.getMarksAtIndex(offset);

  change.applyOperation({
    type: 'insert_text',
    path: path,
    offset: offset,
    text: text,
    marks: marks
  });

  if (normalize) {
    var parent = document.getParent(key);
    change.normalizeNodeByKey(parent.key, _core2.default);
  }
};

/**
 * Merge a node by `key` with the previous node.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.mergeNodeByKey = function (change, key) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$normalize5 = options.normalize,
      normalize = _options$normalize5 === undefined ? true : _options$normalize5;
  var state = change.state;
  var document = state.document;

  var path = document.getPath(key);
  var previous = document.getPreviousSibling(key);

  if (!previous) {
    throw new Error('Unable to merge node with key "' + key + '", no previous key.');
  }

  var position = previous.kind == 'text' ? previous.text.length : previous.nodes.size;

  change.applyOperation({
    type: 'merge_node',
    path: path,
    position: position
  });

  if (normalize) {
    var parent = document.getParent(key);
    change.normalizeNodeByKey(parent.key, _core2.default);
  }
};

/**
 * Move a node by `key` to a new parent by `newKey` and `index`.
 * `newKey` is the key of the container (it can be the document itself)
 *
 * @param {Change} change
 * @param {String} key
 * @param {String} newKey
 * @param {Number} index
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.moveNodeByKey = function (change, key, newKey, newIndex) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var _options$normalize6 = options.normalize,
      normalize = _options$normalize6 === undefined ? true : _options$normalize6;
  var state = change.state;
  var document = state.document;

  var path = document.getPath(key);
  var newPath = document.getPath(newKey);

  change.applyOperation({
    type: 'move_node',
    path: path,
    newPath: [].concat(_toConsumableArray(newPath), [newIndex])
  });

  if (normalize) {
    var parent = document.getCommonAncestor(key, newKey);
    change.normalizeNodeByKey(parent.key, _core2.default);
  }
};

/**
 * Remove mark from text at `offset` and `length` in node by `key`.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Number} offset
 * @param {Number} length
 * @param {Mark} mark
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.removeMarkByKey = function (change, key, offset, length, mark) {
  var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

  mark = _mark2.default.create(mark);
  var _options$normalize7 = options.normalize,
      normalize = _options$normalize7 === undefined ? true : _options$normalize7;
  var state = change.state;
  var document = state.document;

  var path = document.getPath(key);
  var node = document.getNode(key);
  var leaves = node.getLeaves();

  var operations = [];
  var bx = offset;
  var by = offset + length;
  var o = 0;

  leaves.forEach(function (leaf) {
    var ax = o;
    var ay = ax + leaf.text.length;

    o += leaf.text.length;

    // If the leaf doesn't overlap with the operation, continue on.
    if (ay < bx || by < ax) return;

    // If the leaf already has the mark, continue on.
    if (!leaf.marks.has(mark)) return;

    // Otherwise, determine which offset and characters overlap.
    var start = Math.max(ax, bx);
    var end = Math.min(ay, by);

    operations.push({
      type: 'remove_mark',
      path: path,
      offset: start,
      length: end - start,
      mark: mark
    });
  });

  change.applyOperations(operations);

  if (normalize) {
    var parent = document.getParent(key);
    change.normalizeNodeByKey(parent.key, _core2.default);
  }
};

/**
 * Remove a node by `key`.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.removeNodeByKey = function (change, key) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$normalize8 = options.normalize,
      normalize = _options$normalize8 === undefined ? true : _options$normalize8;
  var state = change.state;
  var document = state.document;

  var path = document.getPath(key);
  var node = document.getNode(key);

  change.applyOperation({
    type: 'remove_node',
    path: path,
    node: node
  });

  if (normalize) {
    var parent = document.getParent(key);
    change.normalizeNodeByKey(parent.key, _core2.default);
  }
};

/**
 * Remove text at `offset` and `length` in node by `key`.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Number} offset
 * @param {Number} length
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.removeTextByKey = function (change, key, offset, length) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var _options$normalize9 = options.normalize,
      normalize = _options$normalize9 === undefined ? true : _options$normalize9;
  var state = change.state;
  var document = state.document;

  var path = document.getPath(key);
  var node = document.getNode(key);
  var leaves = node.getLeaves();
  var text = node.text;

  var removals = [];
  var bx = offset;
  var by = offset + length;
  var o = 0;

  leaves.forEach(function (leaf) {
    var ax = o;
    var ay = ax + leaf.text.length;

    o += leaf.text.length;

    // If the leaf doesn't overlap with the removal, continue on.
    if (ay < bx || by < ax) return;

    // Otherwise, determine which offset and characters overlap.
    var start = Math.max(ax, bx);
    var end = Math.min(ay, by);
    var string = text.slice(start, end);

    removals.push({
      type: 'remove_text',
      path: path,
      offset: start,
      text: string,
      marks: leaf.marks
    });
  });

  // Apply in reverse order, so subsequent removals don't impact previous ones.
  change.applyOperations(removals.reverse());

  if (normalize) {
    var block = document.getClosestBlock(key);
    change.normalizeNodeByKey(block.key, _core2.default);
  }
};

/**
`* Replace a `node` with another `node`
 *
 * @param {Change} change
 * @param {String} key
 * @param {Object|Node} node
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.replaceNodeByKey = function (change, key, newNode) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  newNode = _node2.default.create(newNode);
  var _options$normalize10 = options.normalize,
      normalize = _options$normalize10 === undefined ? true : _options$normalize10;
  var state = change.state;
  var document = state.document;

  var node = document.getNode(key);
  var parent = document.getParent(key);
  var index = parent.nodes.indexOf(node);
  change.removeNodeByKey(key, { normalize: false });
  change.insertNodeByKey(parent.key, index, newNode, options);
  if (normalize) {
    change.normalizeNodeByKey(parent.key, _core2.default);
  }
};

/**
 * Set `properties` on mark on text at `offset` and `length` in node by `key`.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Number} offset
 * @param {Number} length
 * @param {Mark} mark
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.setMarkByKey = function (change, key, offset, length, mark, properties) {
  var options = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};

  mark = _mark2.default.create(mark);
  properties = _mark2.default.createProperties(properties);
  var _options$normalize11 = options.normalize,
      normalize = _options$normalize11 === undefined ? true : _options$normalize11;
  var state = change.state;
  var document = state.document;

  var path = document.getPath(key);

  change.applyOperation({
    type: 'set_mark',
    path: path,
    offset: offset,
    length: length,
    mark: mark,
    properties: properties
  });

  if (normalize) {
    var parent = document.getParent(key);
    change.normalizeNodeByKey(parent.key, _core2.default);
  }
};

/**
 * Set `properties` on a node by `key`.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Object|String} properties
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.setNodeByKey = function (change, key, properties) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  properties = _node2.default.createProperties(properties);
  var _options$normalize12 = options.normalize,
      normalize = _options$normalize12 === undefined ? true : _options$normalize12;
  var state = change.state;
  var document = state.document;

  var path = document.getPath(key);
  var node = document.getNode(key);

  change.applyOperation({
    type: 'set_node',
    path: path,
    node: node,
    properties: properties
  });

  if (normalize) {
    change.normalizeNodeByKey(node.key, _core2.default);
  }
};

/**
 * Split a node by `key` at `position`.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Number} position
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.splitNodeByKey = function (change, key, position) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$normalize13 = options.normalize,
      normalize = _options$normalize13 === undefined ? true : _options$normalize13,
      _options$target = options.target,
      target = _options$target === undefined ? null : _options$target;
  var state = change.state;
  var document = state.document;

  var path = document.getPath(key);

  change.applyOperation({
    type: 'split_node',
    path: path,
    position: position,
    target: target
  });

  if (normalize) {
    var parent = document.getParent(key);
    change.normalizeNodeByKey(parent.key, _core2.default);
  }
};

/**
 * Split a node deeply down the tree by `key`, `textKey` and `textOffset`.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Number} position
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.splitDescendantsByKey = function (change, key, textKey, textOffset) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  if (key == textKey) {
    change.splitNodeByKey(textKey, textOffset, options);
    return;
  }

  var _options$normalize14 = options.normalize,
      normalize = _options$normalize14 === undefined ? true : _options$normalize14;
  var state = change.state;
  var document = state.document;

  var text = document.getNode(textKey);
  var ancestors = document.getAncestors(textKey);
  var nodes = ancestors.skipUntil(function (a) {
    return a.key == key;
  }).reverse().unshift(text);
  var previous = void 0;
  var index = void 0;

  nodes.forEach(function (node) {
    var prevIndex = index == null ? null : index;
    index = previous ? node.nodes.indexOf(previous) + 1 : textOffset;
    previous = node;
    change.splitNodeByKey(node.key, index, { normalize: false, target: prevIndex });
  });

  if (normalize) {
    var parent = document.getParent(key);
    change.normalizeNodeByKey(parent.key, _core2.default);
  }
};

/**
 * Unwrap content from an inline parent with `properties`.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Object|String} properties
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.unwrapInlineByKey = function (change, key, properties, options) {
  var state = change.state;
  var document = state.document,
      selection = state.selection;

  var node = document.assertDescendant(key);
  var first = node.getFirstText();
  var last = node.getLastText();
  var range = selection.moveToRangeOf(first, last);
  change.unwrapInlineAtRange(range, properties, options);
};

/**
 * Unwrap content from a block parent with `properties`.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Object|String} properties
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.unwrapBlockByKey = function (change, key, properties, options) {
  var state = change.state;
  var document = state.document,
      selection = state.selection;

  var node = document.assertDescendant(key);
  var first = node.getFirstText();
  var last = node.getLastText();
  var range = selection.moveToRangeOf(first, last);
  change.unwrapBlockAtRange(range, properties, options);
};

/**
 * Unwrap a single node from its parent.
 *
 * If the node is surrounded with siblings, its parent will be
 * split. If the node is the only child, the parent is removed, and
 * simply replaced by the node itself.  Cannot unwrap a root node.
 *
 * @param {Change} change
 * @param {String} key
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.unwrapNodeByKey = function (change, key) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$normalize15 = options.normalize,
      normalize = _options$normalize15 === undefined ? true : _options$normalize15;
  var state = change.state;
  var document = state.document;

  var parent = document.getParent(key);
  var node = parent.getChild(key);

  var index = parent.nodes.indexOf(node);
  var isFirst = index === 0;
  var isLast = index === parent.nodes.size - 1;

  var parentParent = document.getParent(parent.key);
  var parentIndex = parentParent.nodes.indexOf(parent);

  if (parent.nodes.size === 1) {
    change.moveNodeByKey(key, parentParent.key, parentIndex, { normalize: false });
    change.removeNodeByKey(parent.key, options);
  } else if (isFirst) {
    // Just move the node before its parent.
    change.moveNodeByKey(key, parentParent.key, parentIndex, options);
  } else if (isLast) {
    // Just move the node after its parent.
    change.moveNodeByKey(key, parentParent.key, parentIndex + 1, options);
  } else {
    // Split the parent.
    change.splitNodeByKey(parent.key, index, { normalize: false });

    // Extract the node in between the splitted parent.
    change.moveNodeByKey(key, parentParent.key, parentIndex + 1, { normalize: false });

    if (normalize) {
      change.normalizeNodeByKey(parentParent.key, _core2.default);
    }
  }
};

/**
 * Wrap a node in an inline with `properties`.
 *
 * @param {Change} change
 * @param {String} key The node to wrap
 * @param {Block|Object|String} inline The wrapping inline (its children are discarded)
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.wrapInlineByKey = function (change, key, inline, options) {
  inline = _inline2.default.create(inline);
  inline = inline.set('nodes', inline.nodes.clear());

  var document = change.state.document;

  var node = document.assertDescendant(key);
  var parent = document.getParent(node.key);
  var index = parent.nodes.indexOf(node);

  change.insertNodeByKey(parent.key, index, inline, { normalize: false });
  change.moveNodeByKey(node.key, inline.key, 0, options);
};

/**
 * Wrap a node in a block with `properties`.
 *
 * @param {Change} change
 * @param {String} key The node to wrap
 * @param {Block|Object|String} block The wrapping block (its children are discarded)
 * @param {Object} options
 *   @property {Boolean} normalize
 */

Changes.wrapBlockByKey = function (change, key, block, options) {
  block = _block2.default.create(block);
  block = block.set('nodes', block.nodes.clear());

  var document = change.state.document;

  var node = document.assertDescendant(key);
  var parent = document.getParent(node.key);
  var index = parent.nodes.indexOf(node);

  change.insertNodeByKey(parent.key, index, block, { normalize: false });
  change.moveNodeByKey(node.key, block.key, 0, options);
};

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = Changes;

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = __webpack_require__(0);

var _schema = __webpack_require__(37);

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Changes.
 *
 * @type {Object}
 */

var Changes = {};

/**
 * Normalize the document and selection with a `schema`.
 *
 * @param {Change} change
 * @param {Schema} schema
 */

Changes.normalize = function (change, schema) {
  change.normalizeDocument(schema);
};

/**
 * Normalize the document with a `schema`.
 *
 * @param {Change} change
 * @param {Schema} schema
 */

Changes.normalizeDocument = function (change, schema) {
  var state = change.state;
  var document = state.document;

  change.normalizeNodeByKey(document.key, schema);
};

/**
 * Normalize a `node` and its children with a `schema`.
 *
 * @param {Change} change
 * @param {Node|String} key
 * @param {Schema} schema
 */

Changes.normalizeNodeByKey = function (change, key, schema) {
  assertSchema(schema);

  // If the schema has no validation rules, there's nothing to normalize.
  if (!schema.hasValidators) return;

  var state = change.state;
  var document = state.document;

  var node = document.assertNode(key);
  normalizeNodeAndChildren(change, node, schema);
};

/**
 * Normalize a `node` and its children with a `schema`.
 *
 * @param {Change} change
 * @param {Node} node
 * @param {Schema} schema
 */

function normalizeNodeAndChildren(change, node, schema) {
  if (node.kind == 'text') {
    normalizeNode(change, node, schema);
    return;
  }

  // We can't just loop the children and normalize them, because in the process
  // of normalizing one child, we might end up creating another. Instead, we
  // have to normalize one at a time, and check for new children along the way.
  // PERF: use a mutable array here instead of an immutable stack.
  var keys = node.nodes.toArray().map(function (n) {
    return n.key;
  });

  // While there is still a child key that hasn't been normalized yet...

  var _loop = function _loop() {
    var ops = change.operations.length;
    var key = void 0;

    // PERF: use a mutable set here since we'll be add to it a lot.
    var set = new _immutable.Set().asMutable();

    // Unwind the stack, normalizing every child and adding it to the set.
    while (key = keys[0]) {
      var child = node.getChild(key);
      normalizeNodeAndChildren(change, child, schema);
      set.add(key);
      keys.shift();
    }

    // Turn the set immutable to be able to compare against it.
    set = set.asImmutable();

    // PERF: Only re-find the node and re-normalize any new children if
    // operations occured that might have changed it.
    if (change.operations.length != ops) {
      node = refindNode(change, node);

      // Add any new children back onto the stack.
      node.nodes.forEach(function (n) {
        if (set.has(n.key)) return;
        keys.unshift(n.key);
      });
    }
  };

  while (keys.length) {
    _loop();
  }

  // Normalize the node itself if it still exists.
  if (node) {
    normalizeNode(change, node, schema);
  }
}

/**
 * Re-find a reference to a node that may have been modified or removed
 * entirely by a change.
 *
 * @param {Change} change
 * @param {Node} node
 * @return {Node}
 */

function refindNode(change, node) {
  var state = change.state;
  var document = state.document;

  return node.kind == 'document' ? document : document.getDescendant(node.key);
}

/**
 * Normalize a `node` with a `schema`, but not its children.
 *
 * @param {Change} change
 * @param {Node} node
 * @param {Schema} schema
 */

function normalizeNode(change, node, schema) {
  var max = schema.rules.length;
  var iterations = 0;

  function iterate(t, n) {
    var failure = n.validate(schema);
    if (!failure) return;

    // Run the `normalize` function for the rule with the invalid value.
    var value = failure.value,
        rule = failure.rule;

    rule.normalize(t, n, value);

    // Re-find the node reference, in case it was updated. If the node no longer
    // exists, we're done for this branch.
    n = refindNode(t, n);
    if (!n) return;

    // Increment the iterations counter, and check to make sure that we haven't
    // exceeded the max. Without this check, it's easy for the `validate` or
    // `normalize` function of a schema rule to be written incorrectly and for
    // an infinite invalid loop to occur.
    iterations++;

    if (iterations > max) {
      throw new Error('A schema rule could not be validated after sufficient iterations. This is usually due to a `rule.validate` or `rule.normalize` function of a schema being incorrectly written, causing an infinite loop.');
    }

    // Otherwise, iterate again.
    iterate(t, n);
  }

  iterate(change, node);
}

/**
 * Assert that a `schema` exists.
 *
 * @param {Schema} schema
 */

function assertSchema(schema) {
  if (_schema2.default.isSchema(schema)) {
    return;
  } else if (schema == null) {
    throw new Error('You must pass a `schema` object.');
  } else {
    throw new Error('You passed an invalid `schema` object: ' + schema + '.');
  }
}

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = Changes;

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invert = __webpack_require__(96);

var _invert2 = _interopRequireDefault(_invert);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Changes.
 *
 * @type {Object}
 */

var Changes = {};

/**
 * Redo to the next state in the history.
 *
 * @param {Change} change
 */

Changes.redo = function (change) {
  var state = change.state;
  var _state = state,
      history = _state.history;

  if (!history) return;

  var _history = history,
      undos = _history.undos,
      redos = _history.redos;

  var next = redos.peek();
  if (!next) return;

  // Shift the next state into the undo stack.
  redos = redos.pop();
  undos = undos.push(next);

  // Replay the next operations.
  next.forEach(function (op) {
    change.applyOperation(op, { save: false });
  });

  // Update the history.
  state = change.state;
  history = history.set('undos', undos).set('redos', redos);
  state = state.set('history', history);
  change.state = state;
};

/**
 * Undo the previous operations in the history.
 *
 * @param {Change} change
 */

Changes.undo = function (change) {
  var state = change.state;
  var _state2 = state,
      history = _state2.history;

  if (!history) return;

  var _history2 = history,
      undos = _history2.undos,
      redos = _history2.redos;

  var previous = undos.peek();
  if (!previous) return;

  // Shift the previous operations into the redo stack.
  undos = undos.pop();
  redos = redos.push(previous);

  // Replay the inverse of the previous operations.
  previous.slice().reverse().map(_invert2.default).forEach(function (inverse) {
    change.applyOperation(inverse, { save: false });
  });

  // Update the history.
  state = change.state;
  history = history.set('undos', undos).set('redos', redos);
  state = state.set('history', history);
  change.state = state;
};

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = Changes;

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var basePickBy = __webpack_require__(264),
    hasIn = __webpack_require__(94);

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function (value, path) {
    return hasIn(object, path);
  });
}

module.exports = basePick;

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGet = __webpack_require__(63),
    baseSet = __webpack_require__(265),
    castPath = __webpack_require__(42);

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
    var index = -1,
        length = paths.length,
        result = {};

    while (++index < length) {
        var path = paths[index],
            value = baseGet(object, path);

        if (predicate(value, path)) {
            baseSet(result, castPath(path, object), value);
        }
    }
    return result;
}

module.exports = basePickBy;

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assignValue = __webpack_require__(266),
    castPath = __webpack_require__(42),
    isIndex = __webpack_require__(61),
    isObject = __webpack_require__(27),
    toKey = __webpack_require__(29);

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseAssignValue = __webpack_require__(267),
    eq = __webpack_require__(55);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineProperty = __webpack_require__(97);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var flatten = __webpack_require__(269),
    overRest = __webpack_require__(272),
    setToString = __webpack_require__(274);

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseFlatten = __webpack_require__(270);

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayPush = __webpack_require__(88),
    isFlattenable = __webpack_require__(271);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(26),
    isArguments = __webpack_require__(60),
    isArray = __webpack_require__(11);

/** Built-in value references. */
var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
    return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apply = __webpack_require__(273);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseSetToString = __webpack_require__(275),
    shortOut = __webpack_require__(277);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var constant = __webpack_require__(276),
    defineProperty = __webpack_require__(97),
    identity = __webpack_require__(95);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function (func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function () {
    return value;
  };
}

module.exports = constant;

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function () {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _isEmpty = __webpack_require__(279);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _pick = __webpack_require__(65);

var _pick2 = _interopRequireDefault(_pick);

var _range = __webpack_require__(30);

var _range2 = _interopRequireDefault(_range);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Changes.
 *
 * @type {Object}
 */

var Changes = {};

/**
 * Set `properties` on the selection.
 *
 * @param {Change} change
 * @param {Object} properties
 */

Changes.select = function (change, properties) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  properties = _range2.default.createProperties(properties);

  var _options$snapshot = options.snapshot,
      snapshot = _options$snapshot === undefined ? false : _options$snapshot;
  var state = change.state;
  var document = state.document,
      selection = state.selection;

  var props = {};
  var sel = selection.toJSON();
  var next = selection.merge(properties).normalize(document);
  properties = (0, _pick2.default)(next, Object.keys(properties));

  // Remove any properties that are already equal to the current selection. And
  // create a dictionary of the previous values for all of the properties that
  // are being changed, for the inverse operation.
  for (var k in properties) {
    if (snapshot == false && properties[k] == sel[k]) continue;
    props[k] = properties[k];
  }

  // Resolve the selection keys into paths.
  sel.anchorPath = sel.anchorKey == null ? null : document.getPath(sel.anchorKey);
  delete sel.anchorKey;

  if (props.anchorKey) {
    props.anchorPath = props.anchorKey == null ? null : document.getPath(props.anchorKey);
    delete props.anchorKey;
  }

  sel.focusPath = sel.focusKey == null ? null : document.getPath(sel.focusKey);
  delete sel.focusKey;

  if (props.focusKey) {
    props.focusPath = props.focusKey == null ? null : document.getPath(props.focusKey);
    delete props.focusKey;
  }

  // If the selection moves, clear any marks, unless the new selection
  // properties change the marks in some way.
  var moved = ['anchorPath', 'anchorOffset', 'focusPath', 'focusOffset'].some(function (p) {
    return props.hasOwnProperty(p);
  });

  if (sel.marks && properties.marks == sel.marks && moved) {
    props.marks = null;
  }

  // If there are no new properties to set, abort.
  if ((0, _isEmpty2.default)(props)) {
    return;
  }

  // Apply the operation.
  change.applyOperation({
    type: 'set_selection',
    properties: props,
    selection: sel
  }, snapshot ? { skip: false, merge: false } : {});
};

/**
 * Select the whole document.
 *
 * @param {Change} change
 */

Changes.selectAll = function (change) {
  var state = change.state;
  var document = state.document,
      selection = state.selection;

  var next = selection.moveToRangeOf(document);
  change.select(next);
};

/**
 * Snapshot the current selection.
 *
 * @param {Change} change
 */

Changes.snapshotSelection = function (change) {
  var state = change.state;
  var selection = state.selection;

  change.select(selection, { snapshot: true });
};

/**
 * Move the anchor point backward, accounting for being at the start of a block.
 *
 * @param {Change} change
 */

Changes.moveAnchorCharBackward = function (change) {
  var state = change.state;
  var document = state.document,
      selection = state.selection,
      anchorText = state.anchorText,
      anchorBlock = state.anchorBlock;
  var anchorOffset = selection.anchorOffset;

  var previousText = document.getPreviousText(anchorText.key);
  var isInVoid = document.hasVoidParent(anchorText.key);
  var isPreviousInVoid = previousText && document.hasVoidParent(previousText.key);

  if (!isInVoid && anchorOffset > 0) {
    change.moveAnchor(-1);
    return;
  }

  if (!previousText) {
    return;
  }

  change.moveAnchorToEndOf(previousText);

  if (!isInVoid && !isPreviousInVoid && anchorBlock.hasNode(previousText.key)) {
    change.moveAnchor(-1);
  }
};

/**
 * Move the anchor point forward, accounting for being at the end of a block.
 *
 * @param {Change} change
 */

Changes.moveAnchorCharForward = function (change) {
  var state = change.state;
  var document = state.document,
      selection = state.selection,
      anchorText = state.anchorText,
      anchorBlock = state.anchorBlock;
  var anchorOffset = selection.anchorOffset;

  var nextText = document.getNextText(anchorText.key);
  var isInVoid = document.hasVoidParent(anchorText.key);
  var isNextInVoid = nextText && document.hasVoidParent(nextText.key);

  if (!isInVoid && anchorOffset < anchorText.text.length) {
    change.moveAnchor(1);
    return;
  }

  if (!nextText) {
    return;
  }

  change.moveAnchorToStartOf(nextText);

  if (!isInVoid && !isNextInVoid && anchorBlock.hasNode(nextText.key)) {
    change.moveAnchor(1);
  }
};

/**
 * Move the focus point backward, accounting for being at the start of a block.
 *
 * @param {Change} change
 */

Changes.moveFocusCharBackward = function (change) {
  var state = change.state;
  var document = state.document,
      selection = state.selection,
      focusText = state.focusText,
      focusBlock = state.focusBlock;
  var focusOffset = selection.focusOffset;

  var previousText = document.getPreviousText(focusText.key);
  var isInVoid = document.hasVoidParent(focusText.key);
  var isPreviousInVoid = previousText && document.hasVoidParent(previousText.key);

  if (!isInVoid && focusOffset > 0) {
    change.moveFocus(-1);
    return;
  }

  if (!previousText) {
    return;
  }

  change.moveFocusToEndOf(previousText);

  if (!isInVoid && !isPreviousInVoid && focusBlock.hasNode(previousText.key)) {
    change.moveFocus(-1);
  }
};

/**
 * Move the focus point forward, accounting for being at the end of a block.
 *
 * @param {Change} change
 */

Changes.moveFocusCharForward = function (change) {
  var state = change.state;
  var document = state.document,
      selection = state.selection,
      focusText = state.focusText,
      focusBlock = state.focusBlock;
  var focusOffset = selection.focusOffset;

  var nextText = document.getNextText(focusText.key);
  var isInVoid = document.hasVoidParent(focusText.key);
  var isNextInVoid = nextText && document.hasVoidParent(nextText.key);

  if (!isInVoid && focusOffset < focusText.text.length) {
    change.moveFocus(1);
    return;
  }

  if (!nextText) {
    return;
  }

  change.moveFocusToStartOf(nextText);

  if (!isInVoid && !isNextInVoid && focusBlock.hasNode(nextText.key)) {
    change.moveFocus(1);
  }
};

/**
 * Mix in move methods.
 */

var MOVE_DIRECTIONS = ['Forward', 'Backward'];

MOVE_DIRECTIONS.forEach(function (direction) {
  var anchor = 'moveAnchorChar' + direction;
  var focus = 'moveFocusChar' + direction;

  Changes['moveChar' + direction] = function (change) {
    change[anchor]()[focus]();
  };

  Changes['moveStartChar' + direction] = function (change) {
    if (change.state.isBackward) {
      change[focus]();
    } else {
      change[anchor]();
    }
  };

  Changes['moveEndChar' + direction] = function (change) {
    if (change.state.isBackward) {
      change[anchor]();
    } else {
      change[focus]();
    }
  };

  Changes['extendChar' + direction] = function (change) {
    change['moveFocusChar' + direction]();
  };

  Changes['collapseChar' + direction] = function (change) {
    var collapse = direction == 'Forward' ? 'collapseToEnd' : 'collapseToStart';
    change[collapse]()['moveChar' + direction]();
  };
});

/**
 * Mix in alias methods.
 */

var ALIAS_METHODS = [['collapseLineBackward', 'collapseToStartOfBlock'], ['collapseLineForward', 'collapseToEndOfBlock'], ['extendLineBackward', 'extendToStartOfBlock'], ['extendLineForward', 'extendToEndOfBlock']];

ALIAS_METHODS.forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      alias = _ref2[0],
      method = _ref2[1];

  Changes[alias] = function (change) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    change[method].apply(change, [change].concat(args));
  };
});

/**
 * Mix in selection changes that are just a proxy for the selection method.
 */

var PROXY_TRANSFORMS = ['blur', 'collapseTo', 'collapseToAnchor', 'collapseToEnd', 'collapseToEndOf', 'collapseToFocus', 'collapseToStart', 'collapseToStartOf', 'extend', 'extendTo', 'extendToEndOf', 'extendToStartOf', 'flip', 'focus', 'move', 'moveAnchor', 'moveAnchorOffsetTo', 'moveAnchorTo', 'moveAnchorToEndOf', 'moveAnchorToStartOf', 'moveEnd', 'moveEndOffsetTo', 'moveEndTo', 'moveFocus', 'moveFocusOffsetTo', 'moveFocusTo', 'moveFocusToEndOf', 'moveFocusToStartOf', 'moveOffsetsTo', 'moveStart', 'moveStartOffsetTo', 'moveStartTo',
// 'moveTo', Commented out for now, since it conflicts with a deprecated one.
'moveToEnd', 'moveToEndOf', 'moveToRangeOf', 'moveToStart', 'moveToStartOf', 'deselect'];

PROXY_TRANSFORMS.forEach(function (method) {
  Changes[method] = function (change) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var normalize = method != 'deselect';
    var state = change.state;
    var document = state.document,
        selection = state.selection;

    var next = selection[method].apply(selection, args);
    if (normalize) next = next.normalize(document);
    change.select(next);
  };
});

/**
 * Mix in node-related changes.
 */

var PREFIXES = ['moveTo', 'moveAnchorTo', 'moveFocusTo', 'moveStartTo', 'moveEndTo', 'collapseTo', 'extendTo'];

var DIRECTIONS = ['Next', 'Previous'];

var KINDS = ['Block', 'Inline', 'Text'];

PREFIXES.forEach(function (prefix) {
  var edges = ['Start', 'End'];

  if (prefix == 'moveTo') {
    edges.push('Range');
  }

  edges.forEach(function (edge) {
    var method = '' + prefix + edge + 'Of';

    KINDS.forEach(function (kind) {
      var getNode = kind == 'Text' ? 'getNode' : 'getClosest' + kind;

      Changes['' + method + kind] = function (change) {
        var state = change.state;
        var document = state.document,
            selection = state.selection;

        var node = document[getNode](selection.startKey);
        if (!node) return;
        change[method](node);
      };

      DIRECTIONS.forEach(function (direction) {
        var getDirectionNode = 'get' + direction + kind;
        var directionKey = direction == 'Next' ? 'startKey' : 'endKey';

        Changes['' + method + direction + kind] = function (change) {
          var state = change.state;
          var document = state.document,
              selection = state.selection;

          var node = document[getNode](selection[directionKey]);
          if (!node) return;
          var target = document[getDirectionNode](node.key);
          if (!target) return;
          change[method](target);
        };
      });
    });
  });
});

/**
 * Set `properties` on the selection.
 *
 * @param {Mixed} ...args
 * @param {Change} change
 */

Changes.moveTo = function (change, properties) {
  _slateDevLogger2.default.deprecate('0.17.0', 'The `moveTo()` change is deprecated, please use `select()` instead.');
  change.select(properties);
};

/**
 * Unset the selection's marks.
 *
 * @param {Change} change
 */

Changes.unsetMarks = function (change) {
  _slateDevLogger2.default.deprecate('0.17.0', 'The `unsetMarks()` change is deprecated.');
  change.select({ marks: null });
};

/**
 * Unset the selection, removing an association to a node.
 *
 * @param {Change} change
 */

Changes.unsetSelection = function (change) {
  _slateDevLogger2.default.deprecate('0.17.0', 'The `unsetSelection()` change is deprecated, please use `deselect()` instead.');
  change.select({
    anchorKey: null,
    anchorOffset: 0,
    focusKey: null,
    focusOffset: 0,
    isFocused: false,
    isBackward: false
  });
};

/**
 * Mix in deprecated changes with a warning.
 */

var DEPRECATED_TRANSFORMS = [['extendBackward', 'extend', 'The `extendBackward(n)` change is deprecated, please use `extend(n)` instead with a negative offset.'], ['extendForward', 'extend', 'The `extendForward(n)` change is deprecated, please use `extend(n)` instead.'], ['moveBackward', 'move', 'The `moveBackward(n)` change is deprecated, please use `move(n)` instead with a negative offset.'], ['moveForward', 'move', 'The `moveForward(n)` change is deprecated, please use `move(n)` instead.'], ['moveStartOffset', 'moveStart', 'The `moveStartOffset(n)` change is deprecated, please use `moveStart(n)` instead.'], ['moveEndOffset', 'moveEnd', 'The `moveEndOffset(n)` change is deprecated, please use `moveEnd()` instead.'], ['moveToOffsets', 'moveOffsetsTo', 'The `moveToOffsets()` change is deprecated, please use `moveOffsetsTo()` instead.'], ['flipSelection', 'flip', 'The `flipSelection()` change is deprecated, please use `flip()` instead.']];

DEPRECATED_TRANSFORMS.forEach(function (_ref3) {
  var _ref4 = _slicedToArray(_ref3, 3),
      old = _ref4[0],
      current = _ref4[1],
      warning = _ref4[2];

  Changes[old] = function (change) {
    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    _slateDevLogger2.default.deprecate('0.17.0', warning);
    var state = change.state;
    var document = state.document,
        selection = state.selection;

    var sel = selection[current].apply(selection, args).normalize(document);
    change.select(sel);
  };
});

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = Changes;

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Has own property.
 *
 * @type {Function}
 */

var has = Object.prototype.hasOwnProperty;

/**
 * To string.
 *
 * @type {Function}
 */

var toString = Object.prototype.toString;

/**
 * Test whether a value is "empty".
 *
 * @param {Mixed} val
 * @return {Boolean}
 */

function isEmpty(val) {
  // Null and Undefined...
  if (val == null) return true;

  // Booleans...
  if ('boolean' == typeof val) return false;

  // Numbers...
  if ('number' == typeof val) return val === 0;

  // Strings...
  if ('string' == typeof val) return val.length === 0;

  // Functions...
  if ('function' == typeof val) return val.length === 0;

  // Arrays...
  if (Array.isArray(val)) return val.length === 0;

  // Errors...
  if (val instanceof Error) return val.message === '';

  // Objects...
  if (val.toString == toString) {
    switch (val.toString()) {

      // Maps, Sets, Files and Errors...
      case '[object File]':
      case '[object Map]':
      case '[object Set]':
        {
          return val.size === 0;
        }

      // Plain objects...
      case '[object Object]':
        {
          for (var key in val) {
            if (has.call(val, key)) return false;
          }

          return true;
        }
    }
  }

  // Anything else...
  return false;
}

/**
 * Export `isEmpty`.
 *
 * @type {Function}
 */

module.exports = isEmpty;

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _state = __webpack_require__(98);

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Changes.
 *
 * @type {Object}
 */

var Changes = {};

/**
 * Set `properties` on the state.
 *
 * @param {Change} change
 * @param {Object|State} properties
 */

Changes.setState = function (change, properties) {
  properties = _state2.default.createProperties(properties);
  var state = change.state;

  change.applyOperation({
    type: 'set_state',
    properties: properties,
    state: state
  });
};

/**
 * Deprecated.
 */

Changes.setData = function (change, data) {
  _slateDevLogger2.default.deprecate('0.26.0', 'The `change.setData` method is deprecated, use `change.setState` instead.');
  change.setState({ data: data });
};

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = Changes;

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsEqual = __webpack_require__(58);

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _pick = __webpack_require__(65);

var _pick2 = _interopRequireDefault(_pick);

var _modelTypes = __webpack_require__(4);

var _modelTypes2 = _interopRequireDefault(_modelTypes);

var _changes = __webpack_require__(79);

var _changes2 = _interopRequireDefault(_changes);

var _apply = __webpack_require__(100);

var _apply2 = _interopRequireDefault(_apply);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:change');

/**
 * Change.
 *
 * @type {Change}
 */

var Change = function () {
  _createClass(Change, null, [{
    key: 'isChange',

    /**
     * Check if a `value` is a `Change`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

    value: function isChange(value) {
      return !!(value && value[_modelTypes2.default.CHANGE]);
    }

    /**
     * Create a new `Change` with `attrs`.
     *
     * @param {Object} attrs
     *   @property {State} state
     */

  }]);

  function Change(attrs) {
    _classCallCheck(this, Change);

    var state = attrs.state;

    this.state = state;
    this.operations = [];
    this.flags = (0, _pick2.default)(attrs, ['merge', 'save']);
  }

  /**
   * Get the kind.
   *
   * @return {String}
   */

  _createClass(Change, [{
    key: 'applyOperation',

    /**
     * Apply an `operation` to the current state, saving the operation to the
     * history if needed.
     *
     * @param {Object} operation
     * @param {Object} options
     * @return {Change}
     */

    value: function applyOperation(operation) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var operations = this.operations,
          flags = this.flags;
      var state = this.state;
      var _state = state,
          history = _state.history;

      // Default options to the change-level flags, this allows for setting
      // specific options for all of the operations of a given change.

      options = _extends({}, flags, options);

      // Derive the default option values.
      var _options = options,
          _options$merge = _options.merge,
          merge = _options$merge === undefined ? operations.length == 0 ? null : true : _options$merge,
          _options$save = _options.save,
          save = _options$save === undefined ? true : _options$save,
          _options$skip = _options.skip,
          skip = _options$skip === undefined ? null : _options$skip;

      // Apply the operation to the state.

      debug('apply', { operation: operation, save: save, merge: merge });
      state = (0, _apply2.default)(state, operation);

      // If needed, save the operation to the history.
      if (history && save) {
        history = history.save(operation, { merge: merge, skip: skip });
        state = state.set('history', history);
      }

      // Update the mutable change object.
      this.state = state;
      this.operations.push(operation);
      return this;
    }

    /**
     * Apply a series of `operations` to the current state.
     *
     * @param {Array} operations
     * @param {Object} options
     * @return {Change}
     */

  }, {
    key: 'applyOperations',
    value: function applyOperations(operations, options) {
      var _this = this;

      operations.forEach(function (op) {
        return _this.applyOperation(op, options);
      });
      return this;
    }

    /**
     * Call a change `fn` with arguments.
     *
     * @param {Function} fn
     * @param {Mixed} ...args
     * @return {Change}
     */

  }, {
    key: 'call',
    value: function call(fn) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn.apply(undefined, [this].concat(args));
      return this;
    }

    /**
     * Set an operation flag by `key` to `value`.
     *
     * @param {String} key
     * @param {Any} value
     * @return {Change}
     */

  }, {
    key: 'setOperationFlag',
    value: function setOperationFlag(key, value) {
      this.flags[key] = value;
      return this;
    }

    /**
     * Unset an operation flag by `key`.
     *
     * @param {String} key
     * @return {Change}
     */

  }, {
    key: 'unsetOperationFlag',
    value: function unsetOperationFlag(key) {
      delete this.flags[key];
      return this;
    }

    /**
     * Deprecated.
     *
     * @return {State}
     */

  }, {
    key: 'apply',
    value: function apply() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _slateDevLogger2.default.deprecate('0.22.0', 'The `change.apply()` method is deprecrated and no longer necessary, as all operations are applied immediately when invoked. You can access the change\'s state, which is already pre-computed, directly via `change.state` instead.');
      return this.state;
    }
  }, {
    key: 'kind',
    get: function get() {
      return 'change';
    }
  }]);

  return Change;
}();

/**
 * Attach a pseudo-symbol for type checking.
 */

Change.prototype[_modelTypes2.default.CHANGE] = true;

/**
 * Add a change method for each of the changes.
 */

Object.keys(_changes2.default).forEach(function (type) {
  Change.prototype[type] = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    debug(type, { args: args });
    this.call.apply(this, [_changes2.default[type]].concat(args));
    return this;
  };
})

/**
 * Add deprecation warnings in case people try to access a change as a state.
 */

;['hasUndos', 'hasRedos', 'isBlurred', 'isFocused', 'isCollapsed', 'isExpanded', 'isBackward', 'isForward', 'startKey', 'endKey', 'startOffset', 'endOffset', 'anchorKey', 'focusKey', 'anchorOffset', 'focusOffset', 'startBlock', 'endBlock', 'anchorBlock', 'focusBlock', 'startInline', 'endInline', 'anchorInline', 'focusInline', 'startText', 'endText', 'anchorText', 'focusText', 'characters', 'marks', 'blocks', 'fragment', 'inlines', 'texts', 'isEmpty'].forEach(function (getter) {
  Object.defineProperty(Change.prototype, getter, {
    get: function get() {
      _slateDevLogger2.default.deprecate('0.22.0', 'You attempted to access the `' + getter + '` property of what was previously a `state` object but is now a `change` object. This syntax has been deprecated as plugins are now passed `change` objects instead of `state` objects.');
      return this.state[getter];
    }
  });
});

Change.prototype.transform = function () {
  _slateDevLogger2.default.deprecate('0.22.0', 'You attempted to call `.transform()` on what was previously a `state` object but is now already a `change` object. This syntax has been deprecated as plugins are now passed `change` objects instead of `state` objects.');
  return this;
};

/**
 * Export.
 *
 * @type {Change}
 */

exports.default = Change;

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apply = __webpack_require__(100);

var _apply2 = _interopRequireDefault(_apply);

var _invert = __webpack_require__(96);

var _invert2 = _interopRequireDefault(_invert);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = {
  apply: _apply2.default,
  invert: _invert2.default
};

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _range = __webpack_require__(30);

var _range2 = _interopRequireDefault(_range);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Deprecated.
 */

var Selection = {
  create: function create() {
    _slateDevLogger2.default.deprecate('0.27.0', 'The `Selection` model has been renamed to `Range`.');
    return _range2.default.create.apply(_range2.default, arguments);
  },
  createList: function createList() {
    _slateDevLogger2.default.deprecate('0.27.0', 'The `Selection` model has been renamed to `Range`.');
    return _range2.default.createList.apply(_range2.default, arguments);
  },
  createProperties: function createProperties() {
    _slateDevLogger2.default.deprecate('0.27.0', 'The `Selection` model has been renamed to `Range`.');
    return _range2.default.createProperties.apply(_range2.default, arguments);
  },
  fromJSON: function fromJSON() {
    _slateDevLogger2.default.deprecate('0.27.0', 'The `Selection` model has been renamed to `Range`.');
    return _range2.default.fromJSON.apply(_range2.default, arguments);
  },
  fromJS: function fromJS() {
    _slateDevLogger2.default.deprecate('0.27.0', 'The `Selection` model has been renamed to `Range`.');
    return _range2.default.fromJS.apply(_range2.default, arguments);
  },
  isSelection: function isSelection() {
    _slateDevLogger2.default.deprecate('0.27.0', 'The `Selection` model has been renamed to `Range`.');
    return _range2.default.isRange.apply(_range2.default, arguments);
  }
};

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = Selection;

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

var _immutable = __webpack_require__(0);

var _modelTypes = __webpack_require__(4);

var _modelTypes2 = _interopRequireDefault(_modelTypes);

var _schema2 = __webpack_require__(37);

var _schema3 = _interopRequireDefault(_schema2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:stack');

/**
 * Default properties.
 *
 * @type {Object}
 */

var DEFAULTS = {
  plugins: [],
  schema: new _schema3.default()
};

/**
 * Stack.
 *
 * @type {Stack}
 */

var Stack = function (_Record) {
  _inherits(Stack, _Record);

  function Stack() {
    _classCallCheck(this, Stack);

    return _possibleConstructorReturn(this, (Stack.__proto__ || Object.getPrototypeOf(Stack)).apply(this, arguments));
  }

  _createClass(Stack, [{
    key: 'handle',

    /**
     * Invoke an event `handler` on all of the plugins, until one of them decides
     * to stop propagation.
     *
     * @param {String} handler
     * @param {Change} change
     * @param {Editor} editor
     * @param {Mixed} ...args
     */

    value: function handle(handler, change, editor) {
      debug(handler);

      for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        args[_key - 3] = arguments[_key];
      }

      for (var k = 0; k < this.plugins.length; k++) {
        var plugin = this.plugins[k];
        if (!plugin[handler]) continue;
        var next = plugin[handler].apply(plugin, args.concat([change, editor]));
        if (next != null) break;
      }
    }

    /**
     * Invoke `render` on all of the plugins in reverse, building up a tree of
     * higher-order components.
     *
     * @param {State} state
     * @param {Editor} editor
     * @param {Object} children
     * @param {Object} props
     * @return {Component}
     */

  }, {
    key: 'render',
    value: function render(state, editor, props) {
      debug('render');
      var plugins = this.plugins.slice().reverse();
      var children = void 0;

      for (var i = 0; i < plugins.length; i++) {
        var plugin = plugins[i];
        if (!plugin.render) continue;
        children = plugin.render(props, state, editor);
        props.children = children;
      }

      return children;
    }

    /**
     * Invoke `renderPortal` on all of the plugins, building a list of portals.
     *
     * @param {State} state
     * @param {Editor} editor
     * @return {Array}
     */

  }, {
    key: 'renderPortal',
    value: function renderPortal(state, editor) {
      debug('renderPortal');
      var portals = [];

      for (var i = 0; i < this.plugins.length; i++) {
        var plugin = this.plugins[i];
        if (!plugin.renderPortal) continue;
        var portal = plugin.renderPortal(state, editor);
        if (portal) portals.push(portal);
      }

      return portals;
    }
  }, {
    key: 'kind',

    /**
     * Get the kind.
     *
     * @return {String}
     */

    get: function get() {
      return 'stack';
    }
  }], [{
    key: 'create',

    /**
     * Constructor.
     *
     * @param {Object} attrs
     *   @property {Array} plugins
     *   @property {Schema|Object} schema
     *   @property {Function} ...handlers
     */

    value: function create() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var plugins = attrs.plugins;

      var schema = resolveSchema(plugins);
      var stack = new Stack({ plugins: plugins, schema: schema });
      return stack;
    }

    /**
     * Check if a `value` is a `Stack`.
     *
     * @param {Any} value
     * @return {Boolean}
     */

  }, {
    key: 'isStack',
    value: function isStack(value) {
      return !!(value && value[_modelTypes2.default.STACK]);
    }
  }]);

  return Stack;
}((0, _immutable.Record)(DEFAULTS));

/**
 * Attach a pseudo-symbol for type checking.
 */

Stack.prototype[_modelTypes2.default.STACK] = true;

/**
 * Resolve a schema from a set of `plugins`.
 *
 * @param {Array} plugins
 * @return {Schema}
 */

function resolveSchema(plugins) {
  var rules = [];

  for (var i = 0; i < plugins.length; i++) {
    var plugin = plugins[i];
    if (plugin.schema == null) continue;
    var _schema = _schema3.default.create(plugin.schema);
    rules = rules.concat(_schema.rules);
  }

  var schema = _schema3.default.create({ rules: rules });
  return schema;
}

/**
 * Export.
 *
 * @type {Stack}
 */

exports.default = Stack;

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _slateBase64Serializer = __webpack_require__(101);

var _slateBase64Serializer2 = _interopRequireDefault(_slateBase64Serializer);

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

var _slatePlainSerializer = __webpack_require__(287);

var _slatePlainSerializer2 = _interopRequireDefault(_slatePlainSerializer);

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _getWindow = __webpack_require__(12);

var _getWindow2 = _interopRequireDefault(_getWindow);

var _slate = __webpack_require__(8);

var _eventHandlers = __webpack_require__(66);

var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

var _hotkeys = __webpack_require__(102);

var _hotkeys2 = _interopRequireDefault(_hotkeys);

var _content = __webpack_require__(292);

var _content2 = _interopRequireDefault(_content);

var _defaultNode = __webpack_require__(298);

var _defaultNode2 = _interopRequireDefault(_defaultNode);

var _defaultPlaceholder = __webpack_require__(299);

var _defaultPlaceholder2 = _interopRequireDefault(_defaultPlaceholder);

var _findDomNode = __webpack_require__(44);

var _findDomNode2 = _interopRequireDefault(_findDomNode);

var _findNode = __webpack_require__(109);

var _findNode2 = _interopRequireDefault(_findNode);

var _findPoint = __webpack_require__(108);

var _findPoint2 = _interopRequireDefault(_findPoint);

var _findRange = __webpack_require__(45);

var _findRange2 = _interopRequireDefault(_findRange);

var _getEventRange = __webpack_require__(110);

var _getEventRange2 = _interopRequireDefault(_getEventRange);

var _getEventTransfer = __webpack_require__(111);

var _getEventTransfer2 = _interopRequireDefault(_getEventTransfer);

var _setEventTransfer = __webpack_require__(113);

var _setEventTransfer2 = _interopRequireDefault(_setEventTransfer);

var _environment = __webpack_require__(31);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:core:after');

/**
 * The after plugin.
 *
 * @param {Object} options
 * @return {Object}
 */

function AfterPlugin() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var isDraggingInternally = null;

  /**
   * On before change, enforce the editor's schema.
   *
   * @param {Change} change
   * @param {Editor} editor
   */

  function onBeforeChange(change, editor) {
    var state = change.state;

    var schema = editor.getSchema();
    var prevState = editor.getState();

    // PERF: Skip normalizing if the document hasn't changed, since schemas only
    // normalize changes to the document, not selection.
    if (prevState && state.document == prevState.document) return;

    debug('onBeforeChange');

    change.normalize(_slate.coreSchema);
    change.normalize(schema);
  }

  /**
   * On before input, correct any browser inconsistencies.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onBeforeInput(event, change, editor) {
    debug('onBeforeInput', { event: event });

    event.preventDefault();
    change.insertText(event.data);
  }

  /**
   * On blur.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onBlur(event, change, editor) {
    debug('onBlur', { event: event });

    change.blur();
  }

  /**
   * On click.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onClick(event, change, editor) {
    if (editor.props.readOnly) return true;

    var state = change.state;
    var document = state.document;

    var node = (0, _findNode2.default)(event.target, state);
    var isVoid = node && (node.isVoid || document.hasVoidParent(node.key));

    if (isVoid) {
      // COMPAT: In Chrome & Safari, selections that are at the zero offset of
      // an inline node will be automatically replaced to be at the last offset
      // of a previous inline node, which screws us up, so we always want to set
      // it to the end of the node. (2016/11/29)
      change.focus().collapseToEndOf(node);
    }

    debug('onClick', { event: event });
  }

  /**
   * On copy.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onCopy(event, change, editor) {
    debug('onCopy', { event: event });

    onCutOrCopy(event, change);
  }

  /**
   * On cut.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onCut(event, change, editor) {
    debug('onCut', { event: event });

    onCutOrCopy(event, change);
    var window = (0, _getWindow2.default)(event.target);

    // Once the fake cut content has successfully been added to the clipboard,
    // delete the content in the current selection.
    window.requestAnimationFrame(function () {
      editor.change(function (c) {
        return c.delete();
      });
    });
  }

  /**
   * On cut or copy.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onCutOrCopy(event, change, editor) {
    var window = (0, _getWindow2.default)(event.target);
    var native = window.getSelection();
    var state = change.state;
    var startKey = state.startKey,
        endKey = state.endKey,
        startText = state.startText,
        endBlock = state.endBlock,
        endInline = state.endInline;

    var isVoidBlock = endBlock && endBlock.isVoid;
    var isVoidInline = endInline && endInline.isVoid;
    var isVoid = isVoidBlock || isVoidInline;

    // If the selection is collapsed, and it isn't inside a void node, abort.
    if (native.isCollapsed && !isVoid) return;

    // Create a fake selection so that we can add a Base64-encoded copy of the
    // fragment to the HTML, to decode on future pastes.
    var fragment = state.fragment;

    var encoded = _slateBase64Serializer2.default.serializeNode(fragment);
    var range = native.getRangeAt(0);
    var contents = range.cloneContents();
    var attach = contents.childNodes[0];

    // If the end node is a void node, we need to move the end of the range from
    // the void node's spacer span, to the end of the void node's content.
    if (isVoid) {
      var _r = range.cloneRange();
      var n = isVoidBlock ? endBlock : endInline;
      var node = (0, _findDomNode2.default)(n);
      _r.setEndAfter(node);
      contents = _r.cloneContents();
      attach = contents.childNodes[contents.childNodes.length - 1].firstChild;
    }

    // COMPAT: in Safari and Chrome when selecting a single marked word,
    // marks are not preserved when copying.
    // If the attatched is not void, and the startKey and endKey is the same,
    // check if there is marks involved. If so, set the range start just before the
    // startText node
    if ((_environment.IS_CHROME || _environment.IS_SAFARI) && !isVoid && startKey === endKey) {
      var hasMarks = startText.characters.slice(state.selection.anchorOffset, state.selection.focusOffset).filter(function (char) {
        return char.marks.size !== 0;
      }).size !== 0;
      if (hasMarks) {
        var _r2 = range.cloneRange();
        var _node = (0, _findDomNode2.default)(startText);
        _r2.setStartBefore(_node);
        contents = _r2.cloneContents();
        attach = contents.childNodes[contents.childNodes.length - 1].firstChild;
      }
    }

    // Remove any zero-width space spans from the cloned DOM so that they don't
    // show up elsewhere when pasted.
    var zws = [].slice.call(contents.querySelectorAll('[data-slate-zero-width]'));
    zws.forEach(function (zw) {
      return zw.parentNode.removeChild(zw);
    });

    // COMPAT: In Chrome and Safari, if the last element in the selection to
    // copy has `contenteditable="false"` the copy will fail, and nothing will
    // be put in the clipboard. So we remove them all. (2017/05/04)
    if (_environment.IS_CHROME || _environment.IS_SAFARI) {
      var els = [].slice.call(contents.querySelectorAll('[contenteditable="false"]'));
      els.forEach(function (el) {
        return el.removeAttribute('contenteditable');
      });
    }

    // Set a `data-slate-fragment` attribute on a non-empty node, so it shows up
    // in the HTML, and can be used for intra-Slate pasting. If it's a text
    // node, wrap it in a `<span>` so we have something to set an attribute on.
    if (attach.nodeType == 3) {
      var span = window.document.createElement('span');

      // COMPAT: In Chrome and Safari, if we don't add the `white-space` style
      // then leading and trailing spaces will be ignored. (2017/09/21)
      span.style.whiteSpace = 'pre';

      span.appendChild(attach);
      contents.appendChild(span);
      attach = span;
    }

    attach.setAttribute('data-slate-fragment', encoded);

    // Add the phony content to the DOM, and select it, so it will be copied.
    var body = window.document.querySelector('body');
    var div = window.document.createElement('div');
    div.setAttribute('contenteditable', true);
    div.style.position = 'absolute';
    div.style.left = '-9999px';
    div.appendChild(contents);
    body.appendChild(div);

    // COMPAT: In Firefox, trying to use the terser `native.selectAllChildren`
    // throws an error, so we use the older `range` equivalent. (2016/06/21)
    var r = window.document.createRange();
    r.selectNodeContents(div);
    native.removeAllRanges();
    native.addRange(r);

    // Revert to the previous selection right after copying.
    window.requestAnimationFrame(function () {
      body.removeChild(div);
      native.removeAllRanges();
      native.addRange(range);
    });
  }

  /**
   * On drag end.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragEnd(event, change, editor) {
    debug('onDragEnd', { event: event });

    isDraggingInternally = null;
  }

  /**
   * On drag over.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragOver(event, change, editor) {
    debug('onDragOver', { event: event });

    isDraggingInternally = false;
  }

  /**
   * On drag start.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragStart(event, change, editor) {
    debug('onDragStart', { event: event });

    isDraggingInternally = true;

    var state = change.state;
    var document = state.document;

    var node = (0, _findNode2.default)(event.target, state);
    var isVoid = node && (node.isVoid || document.hasVoidParent(node.key));

    if (isVoid) {
      var encoded = _slateBase64Serializer2.default.serializeNode(node, { preserveKeys: true });
      (0, _setEventTransfer2.default)(event, 'node', encoded);
    } else {
      var fragment = state.fragment;

      var _encoded = _slateBase64Serializer2.default.serializeNode(fragment);
      (0, _setEventTransfer2.default)(event, 'fragment', _encoded);
    }
  }

  /**
   * On drop.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDrop(event, change, editor) {
    debug('onDrop', { event: event });

    var state = change.state;
    var document = state.document,
        selection = state.selection;

    var target = (0, _getEventRange2.default)(event, state);
    if (!target) return;

    var transfer = (0, _getEventTransfer2.default)(event);
    var type = transfer.type,
        fragment = transfer.fragment,
        node = transfer.node,
        text = transfer.text;

    change.focus();

    // If the drag is internal and the target is after the selection, it
    // needs to account for the selection's content being deleted.
    if (isDraggingInternally && selection.endKey == target.endKey && selection.endOffset < target.endOffset) {
      target = target.move(selection.startKey == selection.endKey ? 0 - selection.endOffset + selection.startOffset : 0 - selection.endOffset);
    }

    if (isDraggingInternally) {
      change.delete();
    }

    change.select(target);

    if (type == 'text' || type == 'html') {
      var _target = target,
          anchorKey = _target.anchorKey;

      var hasVoidParent = document.hasVoidParent(anchorKey);

      if (hasVoidParent) {
        var n = document.getNode(anchorKey);

        while (hasVoidParent) {
          n = document.getNextText(n.key);
          if (!n) break;
          hasVoidParent = document.hasVoidParent(n.key);
        }

        if (n) change.collapseToStartOf(n);
      }

      text.split('\n').forEach(function (line, i) {
        if (i > 0) change.splitBlock();
        change.insertText(line);
      });
    }

    if (type == 'fragment') {
      change.insertFragment(fragment);
    }

    if (type == 'node' && _slate.Block.isBlock(node)) {
      change.insertBlock(node).removeNodeByKey(node.key);
    }

    if (type == 'node' && _slate.Inline.isInline(node)) {
      change.insertInline(node).removeNodeByKey(node.key);
    }
  }

  /**
   * On input.
   *
   * @param {Event} eventvent
   * @param {Change} change
   */

  function onInput(event, change, editor) {
    debug('onInput', { event: event });

    var window = (0, _getWindow2.default)(event.target);
    var state = change.state;

    // Get the selection point.

    var native = window.getSelection();
    var anchorNode = native.anchorNode,
        anchorOffset = native.anchorOffset;

    var point = (0, _findPoint2.default)(anchorNode, anchorOffset, state);
    if (!point) return;

    // Get the text node and leaf in question.
    var document = state.document,
        selection = state.selection;

    var node = document.getDescendant(point.key);
    var leaves = node.getLeaves();
    var start = 0;
    var end = 0;

    var leaf = leaves.find(function (r) {
      end += r.text.length;
      if (end >= point.offset) return true;
      start = end;
    });

    // Get the text information.
    var text = leaf.text;
    var textContent = anchorNode.textContent;

    var block = document.getClosestBlock(node.key);
    var lastText = block.getLastText();
    var lastLeaf = leaves.last();
    var lastChar = textContent.charAt(textContent.length - 1);
    var isLastText = node == lastText;
    var isLastLeaf = leaf == lastLeaf;

    // COMPAT: If this is the last leaf, and the DOM text ends in a new line,
    // we will have added another new line in <Leaf>'s render method to account
    // for browsers collapsing a single trailing new lines, so remove it.
    if (isLastText && isLastLeaf && lastChar == '\n') {
      textContent = textContent.slice(0, -1);
    }

    // If the text is no different, abort.
    if (textContent == text) return;

    // Determine what the selection should be after changing the text.
    var delta = textContent.length - text.length;
    var corrected = selection.collapseToEnd().move(delta);
    var entire = selection.moveAnchorTo(point.key, start).moveFocusTo(point.key, end);

    // Change the current state to have the leaf's text replaced.
    change.select(entire).delete().insertText(textContent, leaf.marks).select(corrected);
  }

  /**
   * On key down.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onKeyDown(event, change, editor) {
    debug('onKeyDown', { event: event });

    var state = change.state;

    if (_hotkeys2.default.SPLIT_BLOCK(event)) {
      return state.isInVoid ? change.collapseToStartOfNextText() : change.splitBlock();
    }

    if (_hotkeys2.default.DELETE_CHAR_BACKWARD(event)) {
      return change.deleteCharBackward();
    }

    if (_hotkeys2.default.DELETE_CHAR_FORWARD(event)) {
      return change.deleteCharForward();
    }

    if (_hotkeys2.default.DELETE_LINE_BACKWARD(event)) {
      return change.deleteLineBackward();
    }

    if (_hotkeys2.default.DELETE_LINE_FORWARD(event)) {
      return change.deleteLineForward();
    }

    if (_hotkeys2.default.DELETE_WORD_BACKWARD(event)) {
      return change.deleteWordBackward();
    }

    if (_hotkeys2.default.DELETE_WORD_FORWARD(event)) {
      return change.deleteWordForward();
    }

    if (_hotkeys2.default.REDO(event)) {
      return change.redo();
    }

    if (_hotkeys2.default.UNDO(event)) {
      return change.undo();
    }

    // COMPAT: Certain browsers don't handle the selection updates properly. In
    // Chrome, the selection isn't properly extended. And in Firefox, the
    // selection isn't properly collapsed. (2017/10/17)
    if (_hotkeys2.default.COLLAPSE_LINE_BACKWARD(event)) {
      event.preventDefault();
      return change.collapseLineBackward();
    }

    if (_hotkeys2.default.COLLAPSE_LINE_FORWARD(event)) {
      event.preventDefault();
      return change.collapseLineForward();
    }

    if (_hotkeys2.default.EXTEND_LINE_BACKWARD(event)) {
      event.preventDefault();
      return change.extendLineBackward();
    }

    if (_hotkeys2.default.EXTEND_LINE_FORWARD(event)) {
      event.preventDefault();
      return change.extendLineForward();
    }

    // COMPAT: If a void node is selected, or a zero-width text node adjacent to
    // an inline is selected, we need to handle these hotkeys manually because
    // browsers won't know what to do.
    if (_hotkeys2.default.COLLAPSE_CHAR_BACKWARD(event)) {
      var isInVoid = state.isInVoid,
          previousText = state.previousText,
          document = state.document;

      var isPreviousInVoid = previousText && document.hasVoidParent(previousText.key);
      if (isInVoid || isPreviousInVoid) {
        event.preventDefault();
        return change.collapseCharBackward();
      }
    }

    if (_hotkeys2.default.COLLAPSE_CHAR_FORWARD(event)) {
      var _isInVoid = state.isInVoid,
          nextText = state.nextText,
          _document = state.document;

      var isNextInVoid = nextText && _document.hasVoidParent(nextText.key);
      if (_isInVoid || isNextInVoid) {
        event.preventDefault();
        return change.collapseCharForward();
      }
    }

    if (_hotkeys2.default.EXTEND_CHAR_BACKWARD(event)) {
      var _isInVoid2 = state.isInVoid,
          _previousText = state.previousText,
          _document2 = state.document;

      var _isPreviousInVoid = _previousText && _document2.hasVoidParent(_previousText.key);
      if (_isInVoid2 || _isPreviousInVoid) {
        event.preventDefault();
        return change.extendCharBackward();
      }
    }

    if (_hotkeys2.default.EXTEND_CHAR_FORWARD(event)) {
      var _isInVoid3 = state.isInVoid,
          _nextText = state.nextText,
          _document3 = state.document;

      var _isNextInVoid = _nextText && _document3.hasVoidParent(_nextText.key);
      if (_isInVoid3 || _isNextInVoid) {
        event.preventDefault();
        return change.extendCharForward();
      }
    }
  }

  /**
   * On paste.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onPaste(event, change, editor) {
    debug('onPaste', { event: event });

    var transfer = (0, _getEventTransfer2.default)(event);
    var type = transfer.type,
        fragment = transfer.fragment,
        text = transfer.text;

    if (type == 'fragment') {
      change.insertFragment(fragment);
    }

    if (type == 'text' || type == 'html') {
      var state = change.state;
      var document = state.document,
          selection = state.selection,
          startBlock = state.startBlock;

      if (startBlock.isVoid) return;

      var defaultBlock = startBlock;
      var defaultMarks = document.getMarksAtRange(selection.collapseToStart());
      var frag = _slatePlainSerializer2.default.deserialize(text, { defaultBlock: defaultBlock, defaultMarks: defaultMarks }).document;
      change.insertFragment(frag);
    }
  }

  /**
   * On select.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onSelect(event, change, editor) {
    debug('onSelect', { event: event });

    var window = (0, _getWindow2.default)(event.target);
    var state = change.state;
    var document = state.document;

    var native = window.getSelection();

    // If there are no ranges, the editor was blurred natively.
    if (!native.rangeCount) {
      change.blur();
      return;
    }

    // Otherwise, determine the Slate selection from the native one.
    var range = (0, _findRange2.default)(native, state);
    if (!range) return;

    var _range = range,
        anchorKey = _range.anchorKey,
        anchorOffset = _range.anchorOffset,
        focusKey = _range.focusKey,
        focusOffset = _range.focusOffset;

    var anchorText = document.getNode(anchorKey);
    var focusText = document.getNode(focusKey);
    var anchorInline = document.getClosestInline(anchorKey);
    var focusInline = document.getClosestInline(focusKey);
    var focusBlock = document.getClosestBlock(focusKey);
    var anchorBlock = document.getClosestBlock(anchorKey);

    // COMPAT: If the anchor point is at the start of a non-void, and the
    // focus point is inside a void node with an offset that isn't `0`, set
    // the focus offset to `0`. This is due to void nodes <span>'s being
    // positioned off screen, resulting in the offset always being greater
    // than `0`. Since we can't know what it really should be, and since an
    // offset of `0` is less destructive because it creates a hanging
    // selection, go with `0`. (2017/09/07)
    if (anchorBlock && !anchorBlock.isVoid && anchorOffset == 0 && focusBlock && focusBlock.isVoid && focusOffset != 0) {
      range = range.set('focusOffset', 0);
    }

    // COMPAT: If the selection is at the end of a non-void inline node, and
    // there is a node after it, put it in the node after instead. This
    // standardizes the behavior, since it's indistinguishable to the user.
    if (anchorInline && !anchorInline.isVoid && anchorOffset == anchorText.text.length) {
      var block = document.getClosestBlock(anchorKey);
      var next = block.getNextText(anchorKey);
      if (next) range = range.moveAnchorTo(next.key, 0);
    }

    if (focusInline && !focusInline.isVoid && focusOffset == focusText.text.length) {
      var _block = document.getClosestBlock(focusKey);
      var _next = _block.getNextText(focusKey);
      if (_next) range = range.moveFocusTo(_next.key, 0);
    }

    range = range.normalize(document);
    change.select(range);
  }

  /**
   * Render.
   *
   * @param {Object} props
   * @param {State} state
   * @param {Editor} editor
   * @return {Object}
   */

  function render(props, state, editor) {
    var handlers = _eventHandlers2.default.reduce(function (obj, handler) {
      obj[handler] = editor[handler];
      return obj;
    }, {});

    return _react2.default.createElement(_content2.default, _extends({}, handlers, {
      autoCorrect: props.autoCorrect,
      autoFocus: props.autoFocus,
      className: props.className,
      children: props.children,
      editor: editor,
      readOnly: props.readOnly,
      role: props.role,
      schema: editor.getSchema(),
      spellCheck: props.spellCheck,
      state: state,
      style: props.style,
      tabIndex: props.tabIndex,
      tagName: props.tagName
    }));
  }

  /**
   * Add default rendering rules to the schema.
   *
   * @type {Object}
   */

  var schema = {
    rules: [{
      match: function match(obj) {
        return obj.kind == 'block' || obj.kind == 'inline';
      },
      render: _defaultNode2.default
    }, {
      match: function match(obj) {
        return obj.kind == 'block' && _slate.Text.isTextList(obj.nodes) && obj.text == '';
      },
      placeholder: _defaultPlaceholder2.default
    }]
  };

  /**
   * Return the plugin.
   *
   * @type {Object}
   */

  return {
    onBeforeChange: onBeforeChange,
    onBeforeInput: onBeforeInput,
    onBlur: onBlur,
    onClick: onClick,
    onCopy: onCopy,
    onCut: onCut,
    onDragEnd: onDragEnd,
    onDragOver: onDragOver,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onInput: onInput,
    onKeyDown: onKeyDown,
    onPaste: onPaste,
    onSelect: onSelect,
    render: render,
    schema: schema
  };
}

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = AfterPlugin;

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _slate = __webpack_require__(8);

var _immutable = __webpack_require__(0);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Deserialize a plain text `string` to a state.
 *
 * @param {String} string
 * @param {Object} options
 *   @property {Boolean} toJSON
 *   @property {String|Object|Block} defaultBlock
 *   @property {Array|Set} defaultMarks
 * @return {State}
 */

function deserialize(string) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$defaultBlock = options.defaultBlock,
      defaultBlock = _options$defaultBlock === undefined ? 'line' : _options$defaultBlock,
      _options$defaultMarks = options.defaultMarks,
      defaultMarks = _options$defaultMarks === undefined ? [] : _options$defaultMarks,
      _options$toJSON = options.toJSON,
      toJSON = _options$toJSON === undefined ? false : _options$toJSON;

  if (options.toRaw) {
    _slateDevLogger2.default.deprecate('0.23.0', 'The `options.toRaw` argument of the `Plain` serializer is deprecated, use `options.toJSON` instead.');
    toJSON = options.toRaw;
  }

  if (_immutable.Set.isSet(defaultMarks)) {
    defaultMarks = defaultMarks.toArray();
  }

  defaultBlock = _slate.Node.createProperties(defaultBlock);
  defaultMarks = defaultMarks.map(_slate.Mark.createProperties);

  var json = {
    kind: 'state',
    document: {
      kind: 'document',
      data: {},
      nodes: string.split('\n').map(function (line) {
        return _extends({}, defaultBlock, {
          kind: 'block',
          isVoid: false,
          data: {},
          nodes: [{
            kind: 'text',
            leaves: [{
              kind: 'leaf',
              text: line,
              marks: defaultMarks
            }]
          }]
        });
      })
    }
  };

  var ret = toJSON ? json : _slate.State.fromJSON(json);
  return ret;
}

/**
 * Serialize a `state` to plain text.
 *
 * @param {State} state
 * @return {String}
 */

function serialize(state) {
  return serializeNode(state.document);
}

/**
 * Serialize a `node` to plain text.
 *
 * @param {Node} node
 * @return {String}
 */

function serializeNode(node) {
  if (node.kind == 'document' || node.kind == 'block' && _slate.Block.isBlockList(node.nodes)) {
    return node.nodes.map(serializeNode).join('\n');
  } else {
    return node.text;
  }
}

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = {
  deserialize: deserialize,
  serialize: serialize
};

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module exports.
 */

module.exports = getDocument;

// defined by w3c
var DOCUMENT_NODE = 9;

/**
 * Returns `true` if `w` is a Document object, or `false` otherwise.
 *
 * @param {?} d - Document object, maybe
 * @return {Boolean}
 * @private
 */

function isDocument(d) {
  return d && d.nodeType === DOCUMENT_NODE;
}

/**
 * Returns the `document` object associated with the given `node`, which may be
 * a DOM element, the Window object, a Selection, a Range. Basically any DOM
 * object that references the Document in some way, this function will find it.
 *
 * @param {Mixed} node - DOM node, selection, or range in which to find the `document` object
 * @return {Document} the `document` object associated with `node`
 * @public
 */

function getDocument(node) {
  if (isDocument(node)) {
    return node;
  } else if (isDocument(node.ownerDocument)) {
    return node.ownerDocument;
  } else if (isDocument(node.document)) {
    return node.document;
  } else if (node.parentNode) {
    return getDocument(node.parentNode);

    // Range support
  } else if (node.commonAncestorContainer) {
    return getDocument(node.commonAncestorContainer);
  } else if (node.startContainer) {
    return getDocument(node.startContainer);

    // Selection support
  } else if (node.anchorNode) {
    return getDocument(node.anchorNode);
  }
}

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// this is a browser-only module. There is a non-browser equivalent in the same
// directory. This is done using a `package.json` browser field.
// old-IE fallback logic: http://stackoverflow.com/a/10260692
module.exports = !!document.attachEvent && window !== document.parentWindow;

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Constants.
 */

var IS_MAC = typeof window != 'undefined' && /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

var MODIFIERS = {
  alt: 'altKey',
  control: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey'
};

var ALIASES = {
  add: '+',
  break: 'pause',
  cmd: 'meta',
  command: 'meta',
  ctl: 'control',
  ctrl: 'control',
  del: 'delete',
  down: 'arrowdown',
  esc: 'escape',
  ins: 'insert',
  left: 'arrowleft',
  mod: IS_MAC ? 'meta' : 'control',
  opt: 'alt',
  option: 'alt',
  return: 'enter',
  right: 'arrowright',
  space: ' ',
  spacebar: ' ',
  up: 'arrowup',
  win: 'meta',
  windows: 'meta'
};

var CODES = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  control: 17,
  alt: 18,
  pause: 19,
  capslock: 20,
  escape: 27,
  ' ': 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  arrowleft: 37,
  arrowup: 38,
  arrowright: 39,
  arrowdown: 40,
  insert: 45,
  delete: 46,
  meta: 91,
  numlock: 144,
  scrolllock: 145,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  '\'': 222
};

for (var f = 1; f < 20; f++) {
  CODES['f' + f] = 111 + f;
}

/**
 * Is hotkey?
 */

function isHotkey(hotkey, options, event) {
  if (options && !('byKey' in options)) {
    event = options;
    options = null;
  }

  var object = parseHotkey(hotkey, options);
  var ret = event == null ? function (e) {
    return compareHotkey(object, e);
  } : compareHotkey(object, event);

  return ret;
}

function isCodeHotkey(hotkey, event) {
  return isHotkey(hotkey, event);
}

function isKeyHotkey(hotkey, event) {
  return isHotkey(hotkey, { byKey: true }, event);
}

/**
 * Parse.
 */

function parseHotkey(hotkey, options) {
  var byKey = options && options.byKey;
  var ret = {};

  // Special case to handle the `+` key since we use it as a separator.
  hotkey = hotkey.replace('++', '+add');
  var values = hotkey.split('+');
  var length = values.length;

  // Ensure that all the modifiers are set to false unless the hotkey has them.

  for (var k in MODIFIERS) {
    ret[MODIFIERS[k]] = false;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      var name = toKeyName(value);
      var modifier = MODIFIERS[name];

      if (length == 1 || !modifier) {
        if (byKey) {
          ret.key = name;
        } else {
          ret.which = toKeyCode(value);
        }
      }

      if (modifier) {
        ret[modifier] = true;
      }

      // If there's only one key, and it's not a modifier, ignore the shift key
      // because it will already be taken into accout by the `event.key` value.
      if (length == 1 && !modifier && byKey) {
        ret.shiftKey = null;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return ret;
}

/**
 * Compare.
 */

function compareHotkey(object, event) {
  for (var key in object) {
    var expected = object[key];
    var actual = void 0;

    if (expected == null) continue;

    if (key == 'key') {
      actual = event.key.toLowerCase();
    } else if (key == 'which') {
      actual = expected == 91 && event.which == 93 ? 91 : event.which;
    } else {
      actual = event[key];
    }

    if (actual != expected) return false;
  }

  return true;
}

/**
 * Utils.
 */

function toKeyCode(name) {
  name = toKeyName(name);
  var code = CODES[name] || name.toUpperCase().charCodeAt(0);
  return code;
}

function toKeyName(name) {
  name = name.toLowerCase();
  name = ALIASES[name] || name;
  return name;
}

/**
 * Export.
 */

exports.default = isHotkey;
exports.isHotkey = isHotkey;
exports.isCodeHotkey = isCodeHotkey;
exports.isKeyHotkey = isKeyHotkey;
exports.parseHotkey = parseHotkey;
exports.compareHotkey = compareHotkey;
exports.toKeyCode = toKeyCode;
exports.toKeyName = toKeyName;

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var isBrowser = exports.isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' && document.nodeType === 9;

exports.default = isBrowser;

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _slatePropTypes = __webpack_require__(14);

var _slatePropTypes2 = _interopRequireDefault(_slatePropTypes);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _getWindow = __webpack_require__(12);

var _getWindow2 = _interopRequireDefault(_getWindow);

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _eventHandlers = __webpack_require__(66);

var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

var _node = __webpack_require__(293);

var _node2 = _interopRequireDefault(_node);

var _findClosestNode = __webpack_require__(67);

var _findClosestNode2 = _interopRequireDefault(_findClosestNode);

var _findDomRange = __webpack_require__(106);

var _findDomRange2 = _interopRequireDefault(_findDomRange);

var _findRange = __webpack_require__(45);

var _findRange2 = _interopRequireDefault(_findRange);

var _scrollToSelection = __webpack_require__(297);

var _scrollToSelection2 = _interopRequireDefault(_scrollToSelection);

var _environment = __webpack_require__(31);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:content');

/**
 * Content.
 *
 * @type {Component}
 */

var Content = function (_React$Component) {
  _inherits(Content, _React$Component);

  /**
   * Constructor.
   *
   * @param {Object} props
   */

  /**
   * Property types.
   *
   * @type {Object}
   */

  function Content(props) {
    _classCallCheck(this, Content);

    var _this = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

    _this.componentDidMount = function () {
      if (_environment.SUPPORTED_EVENTS.beforeinput) {
        _this.element.addEventListener('beforeinput', _this.onNativeBeforeInput);
      }

      _this.updateSelection();

      if (_this.props.autoFocus) {
        _this.element.focus();
      }
    };

    _this.componentDidUpdate = function () {
      _this.updateSelection();
    };

    _this.updateSelection = function () {
      var state = _this.props.state;
      var selection = state.selection;

      var window = (0, _getWindow2.default)(_this.element);
      var native = window.getSelection();
      var rangeCount = native.rangeCount;

      // If both selections are blurred, do nothing.

      if (!rangeCount && selection.isBlurred) return;

      // If the selection has been blurred, but is still inside the editor in the
      // DOM, blur it manually.
      if (selection.isBlurred) {
        if (!_this.isInEditor(native.anchorNode)) return;
        native.removeAllRanges();
        _this.element.blur();
        debug('updateSelection', { selection: selection, native: native });
        return;
      }

      // If the selection isn't set, do nothing.
      if (selection.isUnset) return;

      // Otherwise, figure out which DOM nodes should be selected...
      var current = !!rangeCount && native.getRangeAt(0);
      var range = (0, _findDomRange2.default)(selection);

      if (!range) {
        _slateDevLogger2.default.error('Unable to find a native DOM range from the current selection.', { selection: selection });
        return;
      }

      // If the new range matches the current selection, do nothing.
      if (current && range.startContainer == current.startContainer && range.startOffset == current.startOffset && range.endContainer == current.endContainer && range.endOffset == current.endOffset) {
        return;
      }

      // Otherwise, set the `isUpdatingSelection` flag and update the selection.
      _this.tmp.isUpdatingSelection = true;
      native.removeAllRanges();
      native.addRange(range);
      (0, _scrollToSelection2.default)(native);

      // Then unset the `isUpdatingSelection` flag after a delay.
      setTimeout(function () {
        // COMPAT: In Firefox, it's not enough to create a range, you also need to
        // focus the contenteditable element too. (2016/11/16)
        if (_environment.IS_FIREFOX) _this.element.focus();
        _this.tmp.isUpdatingSelection = false;
      });

      debug('updateSelection', { selection: selection, native: native });
    };

    _this.ref = function (element) {
      _this.element = element;
    };

    _this.isInEditor = function (target) {
      var element = _this.element;
      // COMPAT: Text nodes don't have `isContentEditable` property. So, when
      // `target` is a text node use its parent node for check.

      var el = target.nodeType === 3 ? target.parentNode : target;
      return el.isContentEditable && (el === element || (0, _findClosestNode2.default)(el, '[data-slate-editor]') === element);
    };

    _this.onNativeBeforeInput = function (event) {
      if (_this.props.readOnly) return;
      if (!_this.isInEditor(event.target)) return;

      var inputType = event.inputType;

      if (inputType !== 'insertText' && inputType !== 'insertReplacementText') return;

      var _event$getTargetRange = event.getTargetRanges(),
          _event$getTargetRange2 = _slicedToArray(_event$getTargetRange, 1),
          targetRange = _event$getTargetRange2[0];

      if (!targetRange) return;

      // `data` should have the text for the `insertText` input type and
      // `dataTransfer` should have the text for the `insertReplacementText` input
      // type, but Safari uses `insertText` for spell check replacements and sets
      // `data` to `null`.
      var text = event.data == null ? event.dataTransfer.getData('text/plain') : event.data;

      if (text == null) return;

      event.preventDefault();

      var _this$props = _this.props,
          editor = _this$props.editor,
          state = _this$props.state;

      var range = (0, _findRange2.default)(targetRange, state);

      editor.change(function (change) {
        change.insertTextAtRange(range, text);
      });
    };

    _this.renderNode = function (child, isSelected) {
      var _this$props2 = _this.props,
          editor = _this$props2.editor,
          readOnly = _this$props2.readOnly,
          schema = _this$props2.schema,
          state = _this$props2.state;
      var document = state.document,
          decorations = state.decorations;

      var decs = document.getDecorations(schema);
      if (decorations) decs = decorations.concat(decs);
      return _react2.default.createElement(_node2.default, {
        block: null,
        editor: editor,
        decorations: decs,
        isSelected: isSelected,
        key: child.key,
        node: child,
        parent: document,
        readOnly: readOnly,
        schema: schema,
        state: state
      });
    };

    _this.tmp = {};
    _this.tmp.key = 0;
    _this.tmp.isUpdatingSelection = false;

    _eventHandlers2.default.forEach(function (handler) {
      _this[handler] = function (event) {
        _this.onEvent(handler, event);
      };
    });
    return _this;
  }

  /**
   * When the editor first mounts in the DOM we need to:
   *
   *   - Add native DOM event listeners.
   *   - Update the selection, in case it starts focused.
   *   - Focus the editor if `autoFocus` is set.
   */

  /**
   * Default properties.
   *
   * @type {Object}
   */

  _createClass(Content, [{
    key: 'componentWillUnmount',

    /**
     * When unmounting, remove DOM event listeners.
     */

    value: function componentWillUnmount() {
      if (_environment.SUPPORTED_EVENTS.beforeinput) {
        this.element.removeEventListener('beforeinput', this.onNativeBeforeInput);
      }
    }

    /**
     * On update, update the selection.
     */

    /**
     * Update the native DOM selection to reflect the internal model.
     */

    /**
     * The React ref method to set the root content element locally.
     *
     * @param {Element} element
     */

    /**
     * Check if an event `target` is fired from within the contenteditable
     * element. This should be false for edits happening in non-contenteditable
     * children, such as void nodes and other nested Slate editors.
     *
     * @param {Element} target
     * @return {Boolean}
     */

  }, {
    key: 'onEvent',

    /**
     * On `event` with `handler`.
     *
     * @param {String} handler
     * @param {Event} event
     */

    value: function onEvent(handler, event) {
      // COMPAT: Composition events can change the DOM out of under React, so we
      // increment this key to ensure that a full re-render happens. (2017/10/16)
      if (handler == 'onCompositionEnd') {
        this.tmp.key++;
      }

      // If the `onSelect` handler fires while the `isUpdatingSelection` flag is
      // set it's a result of updating the selection manually, so skip it.
      if (handler == 'onSelect' && this.tmp.isUpdatingSelection) {
        return;
      }

      // COMPAT: There are situations where a select event will fire with a new
      // native selection that resolves to the same internal position. In those
      // cases we don't need to trigger any changes, since our internal model is
      // already up to date, but we do want to update the native selection again
      // to make sure it is in sync. (2017/10/16)
      if (handler == 'onSelect') {
        var state = this.props.state;
        var selection = state.selection;

        var window = (0, _getWindow2.default)(event.target);
        var native = window.getSelection();
        var range = (0, _findRange2.default)(native, state);

        if (range && range.equals(selection)) {
          this.updateSelection();
          return;
        }
      }

      // Some events require being in editable in the editor, so if the event
      // target isn't, ignore them.
      if (handler == 'onBeforeInput' || handler == 'onBlur' || handler == 'onCompositionEnd' || handler == 'onCompositionStart' || handler == 'onCopy' || handler == 'onCut' || handler == 'onFocus' || handler == 'onInput' || handler == 'onKeyDown' || handler == 'onKeyUp' || handler == 'onPaste' || handler == 'onSelect') {
        if (!this.isInEditor(event.target)) return;
      }

      this.props[handler](event);
    }

    /**
     * On a native `beforeinput` event, use the additional range information
     * provided by the event to insert text exactly as the browser would.
     *
     * @param {InputEvent} event
     */

  }, {
    key: 'render',

    /**
     * Render the editor content.
     *
     * @return {Element}
     */

    value: function render() {
      var _this2 = this;

      var props = this.props;
      var className = props.className,
          readOnly = props.readOnly,
          state = props.state,
          tabIndex = props.tabIndex,
          role = props.role,
          tagName = props.tagName;

      var Container = tagName;
      var document = state.document,
          selection = state.selection;

      var indexes = document.getSelectionIndexes(selection, selection.isFocused);
      var children = document.nodes.toArray().map(function (child, i) {
        var isSelected = !!indexes && indexes.start <= i && i < indexes.end;
        return _this2.renderNode(child, isSelected);
      });

      var handlers = _eventHandlers2.default.reduce(function (obj, handler) {
        obj[handler] = _this2[handler];
        return obj;
      }, {});

      var style = _extends({
        // Prevent the default outline styles.
        outline: 'none',
        // Preserve adjacent whitespace and new lines.
        whiteSpace: 'pre-wrap',
        // Allow words to break if they are too long.
        wordWrap: 'break-word'
      }, readOnly ? {} : { WebkitUserModify: 'read-write-plaintext-only' }, props.style);

      // COMPAT: In Firefox, spellchecking can remove entire wrapping elements
      // including inline ones like `<a>`, which is jarring for the user but also
      // causes the DOM to get into an irreconcilable state. (2016/09/01)
      var spellCheck = _environment.IS_FIREFOX ? false : props.spellCheck;

      debug('render', { props: props });

      return _react2.default.createElement(Container, _extends({}, handlers, {
        'data-slate-editor': true,
        key: this.tmp.key,
        ref: this.ref,
        'data-key': document.key,
        contentEditable: readOnly ? null : true,
        suppressContentEditableWarning: true,
        className: className,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        onCompositionEnd: this.onCompositionEnd,
        onCompositionStart: this.onCompositionStart,
        onCopy: this.onCopy,
        onCut: this.onCut,
        onDragEnd: this.onDragEnd,
        onDragOver: this.onDragOver,
        onDragStart: this.onDragStart,
        onDrop: this.onDrop,
        onInput: this.onInput,
        onKeyDown: this.onKeyDown,
        onKeyUp: this.onKeyUp,
        onPaste: this.onPaste,
        onSelect: this.onSelect,
        autoCorrect: props.autoCorrect ? 'on' : 'off',
        spellCheck: spellCheck,
        style: style,
        role: readOnly ? null : role || 'textbox',
        tabIndex: tabIndex
        // COMPAT: The Grammarly Chrome extension works by changing the DOM out
        // from under `contenteditable` elements, which leads to weird behaviors
        // so we have to disable it like this. (2017/04/24)
        , 'data-gramm': false
      }), children, this.props.children);
    }

    /**
     * Render a `child` node of the document.
     *
     * @param {Node} child
     * @param {Boolean} isSelected
     * @return {Element}
     */

  }]);

  return Content;
}(_react2.default.Component);

/**
 * Mix in handler prop types.
 */

Content.propTypes = {
  autoCorrect: _propTypes2.default.bool.isRequired,
  autoFocus: _propTypes2.default.bool.isRequired,
  children: _propTypes2.default.array.isRequired,
  className: _propTypes2.default.string,
  editor: _propTypes2.default.object.isRequired,
  readOnly: _propTypes2.default.bool.isRequired,
  role: _propTypes2.default.string,
  schema: _slatePropTypes2.default.schema.isRequired,
  spellCheck: _propTypes2.default.bool.isRequired,
  state: _slatePropTypes2.default.state.isRequired,
  style: _propTypes2.default.object,
  tabIndex: _propTypes2.default.number,
  tagName: _propTypes2.default.string
};
Content.defaultProps = {
  style: {},
  tagName: 'div'
};
_eventHandlers2.default.forEach(function (handler) {
  Content.propTypes[handler] = _propTypes2.default.func.isRequired;
});

/**
 * Export.
 *
 * @type {Component}
 */

exports.default = Content;

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

var _reactImmutableProptypes = __webpack_require__(103);

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _slatePropTypes = __webpack_require__(14);

var _slatePropTypes2 = _interopRequireDefault(_slatePropTypes);

var _slateDevLogger = __webpack_require__(1);

var _slateDevLogger2 = _interopRequireDefault(_slateDevLogger);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _void = __webpack_require__(294);

var _void2 = _interopRequireDefault(_void);

var _text = __webpack_require__(104);

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:node');

/**
 * Node.
 *
 * @type {Component}
 */

var Node = function (_React$Component) {
  _inherits(Node, _React$Component);

  /**
   * Constructor.
   *
   * @param {Object} props
   */

  function Node(props) {
    _classCallCheck(this, Node);

    var _this = _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this, props));

    _initialiseProps.call(_this);

    var node = props.node,
        schema = props.schema;

    _this.state = {};
    _this.state.Component = node.getComponent(schema);
    _this.state.Placeholder = node.getPlaceholder(schema);
    return _this;
  }

  /**
   * Debug.
   *
   * @param {String} message
   * @param {Mixed} ...args
   */

  /**
   * Property types.
   *
   * @type {Object}
   */

  /**
   * On receiving new props, update the `Component` renderer.
   *
   * @param {Object} props
   */

  /**
   * Should the node update?
   *
   * @param {Object} nextProps
   * @param {Object} state
   * @return {Boolean}
   */

  _createClass(Node, [{
    key: 'render',

    /**
     * Render.
     *
     * @return {Element}
     */

    value: function render() {
      var _this2 = this;

      var props = this.props;

      this.debug('render', { props: props });

      var editor = props.editor,
          isSelected = props.isSelected,
          node = props.node,
          parent = props.parent,
          readOnly = props.readOnly,
          state = props.state;
      var _state = this.state,
          Component = _state.Component,
          Placeholder = _state.Placeholder;
      var selection = state.selection;

      var indexes = node.getSelectionIndexes(selection, isSelected);
      var children = node.nodes.toArray().map(function (child, i) {
        var isChildSelected = !!indexes && indexes.start <= i && i < indexes.end;
        return _this2.renderNode(child, isChildSelected);
      });

      // Attributes that the developer must to mix into the element in their
      // custom node renderer component.
      var attributes = { 'data-key': node.key };

      // If it's a block node with inline children, add the proper `dir` attribute
      // for text direction.
      if (node.kind == 'block' && node.nodes.first().kind != 'block') {
        var direction = node.getTextDirection();
        if (direction == 'rtl') attributes.dir = 'rtl';
      }

      var p = {
        editor: editor,
        isSelected: isSelected,
        key: node.key,
        node: node,
        parent: parent,
        readOnly: readOnly,
        state: state
      };

      var element = _react2.default.createElement(Component, _extends({}, p, { attributes: attributes }), Placeholder && _react2.default.createElement(Placeholder, p), children);

      return node.isVoid ? _react2.default.createElement(_void2.default, this.props, element) : element;
    }

    /**
     * Render a `child` node.
     *
     * @param {Node} child
     * @param {Boolean} isSelected
     * @return {Element}
     */

  }]);

  return Node;
}(_react2.default.Component);

/**
 * Export.
 *
 * @type {Component}
 */

Node.propTypes = {
  block: _slatePropTypes2.default.block,
  decorations: _reactImmutableProptypes2.default.list.isRequired,
  editor: _propTypes2.default.object.isRequired,
  isSelected: _propTypes2.default.bool.isRequired,
  node: _slatePropTypes2.default.node.isRequired,
  parent: _slatePropTypes2.default.node.isRequired,
  readOnly: _propTypes2.default.bool.isRequired,
  schema: _slatePropTypes2.default.schema.isRequired,
  state: _slatePropTypes2.default.state.isRequired
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.debug = function (message) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var node = _this3.props.node;
    var key = node.key,
        type = node.type;

    debug.apply(undefined, [message, key + ' (' + type + ')'].concat(args));
  };

  this.componentWillReceiveProps = function (props) {
    if (props.node == _this3.props.node) return;
    var Component = props.node.getComponent(props.schema);
    var Placeholder = props.node.getPlaceholder(props.schema);
    _this3.setState({ Component: Component, Placeholder: Placeholder });
  };

  this.shouldComponentUpdate = function (nextProps) {
    var props = _this3.props;
    var Component = _this3.state.Component;

    var n = nextProps;
    var p = props;

    // If the `Component` has enabled suppression of update checking, always
    // return true so that it can deal with update checking itself.
    if (Component && Component.suppressShouldComponentUpdate) {
      _slateDevLogger2.default.deprecate('2.2.0', 'The `suppressShouldComponentUpdate` property is deprecated because it led to an important performance loss, use `shouldNodeComponentUpdate` instead.');
      return true;
    }

    // If the `Component` has a custom logic to determine whether the component
    // needs to be updated or not, return true if it returns true.
    // If it returns false, we still want to benefit from the
    // performance gain of the rest of the logic.
    if (Component && Component.shouldNodeComponentUpdate) {
      var shouldUpdate = Component.shouldNodeComponentUpdate(p, n);

      if (shouldUpdate) {
        return true;
      }

      if (shouldUpdate === false) {
        _slateDevLogger2.default.warn('Returning false in `shouldNodeComponentUpdate` does not disable Slate\'s internal `shouldComponentUpdate` logic. If you want to prevent updates, use React\'s `shouldComponentUpdate` instead.');
      }
    }

    // If the `readOnly` status has changed, re-render in case there is any
    // user-land logic that depends on it, like nested editable contents.
    if (n.readOnly != p.readOnly) return true;

    // If the node has changed, update. PERF: There are cases where it will have
    // changed, but it's properties will be exactly the same (eg. copy-paste)
    // which this won't catch. But that's rare and not a drag on performance, so
    // for simplicity we just let them through.
    if (n.node != p.node) return true;

    // If the selection state of the node or of some of its children has changed,
    // re-render in case there is any user-land logic depends on it to render.
    // if the node is selected update it, even if it was already selected: the
    // selection state of some of its children could have been changed and they
    // need to be rendered again.
    if (n.isSelected || p.isSelected) return true;

    // If the decorations have changed, update.
    if (!n.decorations.equals(p.decorations)) return true;

    // Otherwise, don't update.
    return false;
  };

  this.renderNode = function (child, isSelected) {
    var _props = _this3.props,
        block = _props.block,
        decorations = _props.decorations,
        editor = _props.editor,
        node = _props.node,
        readOnly = _props.readOnly,
        schema = _props.schema,
        state = _props.state;

    var Component = child.kind === 'text' ? _text2.default : Node;
    var decs = decorations.concat(node.getDecorations(schema));
    return _react2.default.createElement(Component, {
      block: node.kind == 'block' ? node : block,
      decorations: decs,
      editor: editor,
      isSelected: isSelected,
      key: child.key,
      node: child,
      parent: node,
      readOnly: readOnly,
      schema: schema,
      state: state
    });
  };
};

exports.default = Node;

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _slatePropTypes = __webpack_require__(14);

var _slatePropTypes2 = _interopRequireDefault(_slatePropTypes);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _text = __webpack_require__(104);

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:void');

/**
 * Void.
 *
 * @type {Component}
 */

var Void = function (_React$Component) {
  _inherits(Void, _React$Component);

  function Void() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Void);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Void.__proto__ || Object.getPrototypeOf(Void)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Property types.
   *
   * @type {Object}
   */

  /**
   * Debug.
   *
   * @param {String} message
   * @param {Mixed} ...args
   */

  _createClass(Void, [{
    key: 'render',

    /**
     * Render.
     *
     * @return {Element}
     */

    value: function render() {
      var props = this.props;
      var children = props.children,
          node = props.node,
          readOnly = props.readOnly;

      var Tag = node.kind == 'block' ? 'div' : 'span';
      var style = {
        height: '0',
        color: 'transparent'
      };

      this.debug('render', { props: props });

      return _react2.default.createElement(Tag, { 'data-slate-void': true, 'data-key': node.key, draggable: readOnly ? null : true }, !readOnly && _react2.default.createElement(Tag, { style: style }, this.renderText()), _react2.default.createElement(Tag, { contentEditable: readOnly ? null : false }, children));
    }

    /**
     * Render the void node's text node, which will catch the cursor when it the
     * void node is navigated to with the arrow keys.
     *
     * Having this text node there means the browser continues to manage the
     * selection natively, so it keeps track of the right offset when moving
     * across the block.
     *
     * @return {Element}
     */

  }]);

  return Void;
}(_react2.default.Component);

/**
 * Export.
 *
 * @type {Component}
 */

Void.propTypes = {
  block: _slatePropTypes2.default.block,
  children: _propTypes2.default.any.isRequired,
  editor: _propTypes2.default.object.isRequired,
  node: _slatePropTypes2.default.node.isRequired,
  parent: _slatePropTypes2.default.node.isRequired,
  readOnly: _propTypes2.default.bool.isRequired,
  schema: _slatePropTypes2.default.schema.isRequired,
  state: _slatePropTypes2.default.state.isRequired
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.debug = function (message) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var node = _this2.props.node;
    var key = node.key,
        type = node.type;

    var id = key + ' (' + type + ')';
    debug.apply(undefined, [message, '' + id].concat(args));
  };

  this.renderText = function () {
    var _props = _this2.props,
        block = _props.block,
        decorations = _props.decorations,
        isSelected = _props.isSelected,
        node = _props.node,
        readOnly = _props.readOnly,
        schema = _props.schema,
        state = _props.state,
        editor = _props.editor;

    var child = node.getFirstText();
    return _react2.default.createElement(_text2.default, {
      block: node.kind == 'block' ? node : block,
      decorations: decorations,
      editor: editor,
      isSelected: isSelected,
      key: child.key,
      node: child,
      parent: node,
      readOnly: readOnly,
      schema: schema,
      state: state
    });
  };
};

exports.default = Void;

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _slatePropTypes = __webpack_require__(14);

var _slatePropTypes2 = _interopRequireDefault(_slatePropTypes);

var _offsetKey = __webpack_require__(105);

var _offsetKey2 = _interopRequireDefault(_offsetKey);

var _environment = __webpack_require__(31);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Debugger.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:leaves');

/**
 * Leaf.
 *
 * @type {Component}
 */

var Leaf = function (_React$Component) {
  _inherits(Leaf, _React$Component);

  function Leaf() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Leaf);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Leaf.__proto__ || Object.getPrototypeOf(Leaf)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Property types.
   *
   * @type {Object}
   */

  /**
   * Debug.
   *
   * @param {String} message
   * @param {Mixed} ...args
   */

  _createClass(Leaf, [{
    key: 'shouldComponentUpdate',

    /**
     * Should component update?
     *
     * @param {Object} props
     * @return {Boolean}
     */

    value: function shouldComponentUpdate(props) {
      // If any of the regular properties have changed, re-render.
      if (props.index != this.props.index || props.marks != this.props.marks || props.schema != this.props.schema || props.text != this.props.text || props.parent != this.props.parent) {
        return true;
      }

      // Otherwise, don't update.
      return false;
    }

    /**
     * Render the leaf.
     *
     * @return {Element}
     */

  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var node = props.node,
          index = props.index;

      var offsetKey = _offsetKey2.default.stringify({
        key: node.key,
        index: index
      });

      this.debug('render', { props: props });

      return _react2.default.createElement('span', { 'data-offset-key': offsetKey }, this.renderMarks(props));
    }

    /**
     * Render all of the leaf's mark components.
     *
     * @param {Object} props
     * @return {Element}
     */

  }, {
    key: 'renderMarks',
    value: function renderMarks(props) {
      var marks = props.marks,
          schema = props.schema,
          node = props.node,
          offset = props.offset,
          text = props.text,
          state = props.state,
          editor = props.editor;

      var children = this.renderText(props);

      return marks.reduce(function (memo, mark) {
        var Component = mark.getComponent(schema);
        if (!Component) return memo;
        return _react2.default.createElement(Component, {
          editor: editor,
          mark: mark,
          marks: marks,
          node: node,
          offset: offset,
          schema: schema,
          state: state,
          text: text
        }, memo);
      }, children);
    }

    /**
     * Render the text content of the leaf, accounting for browsers.
     *
     * @param {Object} props
     * @return {Element}
     */

  }, {
    key: 'renderText',
    value: function renderText(props) {
      var block = props.block,
          node = props.node,
          parent = props.parent,
          text = props.text,
          index = props.index,
          leaves = props.leaves;

      // COMPAT: If the text is empty and it's the only child, we need to render a
      // <br/> to get the block to have the proper height.

      if (text == '' && parent.kind == 'block' && parent.text == '') return _react2.default.createElement('br', null);

      // COMPAT: If the text is empty otherwise, it's because it's on the edge of
      // an inline void node, so we render a zero-width space so that the
      // selection can be inserted next to it still.
      if (text == '') {
        // COMPAT: In Chrome, zero-width space produces graphics glitches, so use
        // hair space in place of it. (2017/02/12)
        var space = _environment.IS_FIREFOX ? "\u200B" : "\u200A";
        return _react2.default.createElement('span', { 'data-slate-zero-width': true }, space);
      }

      // COMPAT: Browsers will collapse trailing new lines at the end of blocks,
      // so we need to add an extra trailing new lines to prevent that.
      var lastText = block.getLastText();
      var lastChar = text.charAt(text.length - 1);
      var isLastText = node == lastText;
      var isLastLeaf = index == leaves.size - 1;
      if (isLastText && isLastLeaf && lastChar == '\n') return text + '\n';

      // Otherwise, just return the text.
      return text;
    }
  }]);

  return Leaf;
}(_react2.default.Component);

/**
 * Export.
 *
 * @type {Component}
 */

Leaf.propTypes = {
  block: _slatePropTypes2.default.block.isRequired,
  editor: _propTypes2.default.object.isRequired,
  index: _propTypes2.default.number.isRequired,
  leaves: _slatePropTypes2.default.leaves.isRequired,
  marks: _slatePropTypes2.default.marks.isRequired,
  node: _slatePropTypes2.default.node.isRequired,
  offset: _propTypes2.default.number.isRequired,
  parent: _slatePropTypes2.default.node.isRequired,
  schema: _slatePropTypes2.default.schema.isRequired,
  state: _slatePropTypes2.default.state.isRequired,
  text: _propTypes2.default.string.isRequired
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.debug = function (message) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    debug.apply(undefined, [message, _this2.props.node.key + '-' + _this2.props.index].concat(args));
  };
};

exports.default = Leaf;

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getWindow = __webpack_require__(12);

var _getWindow2 = _interopRequireDefault(_getWindow);

var _findDomNode = __webpack_require__(44);

var _findDomNode2 = _interopRequireDefault(_findDomNode);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Find a native DOM selection point from a Slate `key` and `offset`.
 *
 * @param {Element} root
 * @param {String} key
 * @param {Number} offset
 * @return {Object}
 */

function findDOMPoint(key, offset) {
  var el = (0, _findDomNode2.default)(key);
  var window = (0, _getWindow2.default)(el);
  var iterator = window.document.createNodeIterator(el, NodeFilter.SHOW_TEXT);
  var start = 0;
  var n = void 0;

  while (n = iterator.nextNode()) {
    var length = n.textContent.length;

    var end = start + length;

    if (offset <= end) {
      var o = offset - start;
      return { node: n, offset: o };
    }

    start = end;
  }

  // COMPAT: For empty blocks with only a single empty text node, we will have
  // rendered a `<br/>` instead of a text node.
  if (el.childNodes.length == 1 && el.childNodes[0].childNodes.length == 1 && el.childNodes[0].childNodes[0].tagName == 'BR') {
    return { node: el.childNodes[0], offset: 0 };
  }

  return null;
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = findDOMPoint;

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getWindow = __webpack_require__(12);

var _getWindow2 = _interopRequireDefault(_getWindow);

var _selectionIsBackward = __webpack_require__(107);

var _selectionIsBackward2 = _interopRequireDefault(_selectionIsBackward);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Scroll the current selection's focus point into view if needed.
 *
 * @param {Selection} selection
 */

function scrollToSelection(selection) {
  if (!selection.anchorNode) return;

  var window = (0, _getWindow2.default)(selection.anchorNode);
  var backward = (0, _selectionIsBackward2.default)(selection);
  var range = selection.getRangeAt(0);
  var rect = range.getBoundingClientRect();
  var innerWidth = window.innerWidth,
      innerHeight = window.innerHeight,
      pageYOffset = window.pageYOffset,
      pageXOffset = window.pageXOffset;

  var top = (backward ? rect.top : rect.bottom) + pageYOffset;
  var left = (backward ? rect.left : rect.right) + pageXOffset;

  var x = left < pageXOffset || innerWidth + pageXOffset < left ? left - innerWidth / 2 : pageXOffset;

  var y = top < pageYOffset || innerHeight + pageYOffset < top ? top - innerHeight / 2 : pageYOffset;

  window.scrollTo(x, y);
}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = scrollToSelection;

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _slatePropTypes = __webpack_require__(14);

var _slatePropTypes2 = _interopRequireDefault(_slatePropTypes);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Default node.
 *
 * @type {Component}
 */

var DefaultNode = function (_React$Component) {
  _inherits(DefaultNode, _React$Component);

  function DefaultNode() {
    _classCallCheck(this, DefaultNode);

    return _possibleConstructorReturn(this, (DefaultNode.__proto__ || Object.getPrototypeOf(DefaultNode)).apply(this, arguments));
  }

  _createClass(DefaultNode, [{
    key: 'render',

    /**
     * Render.
     *
     * @return {Element}
     */

    value: function render() {
      var _props = this.props,
          attributes = _props.attributes,
          children = _props.children,
          node = _props.node;

      var Tag = node.kind == 'block' ? 'div' : 'span';
      var style = { position: 'relative' };
      return _react2.default.createElement(Tag, _extends({}, attributes, { style: style }), children);
    }

    /**
     * Prop types.
     *
     * @type {Object}
     */

  }]);

  return DefaultNode;
}(_react2.default.Component);

/**
 * Export.
 *
 * @type {Component}
 */

DefaultNode.propTypes = {
  attributes: _propTypes2.default.object.isRequired,
  editor: _propTypes2.default.object.isRequired,
  isSelected: _propTypes2.default.bool.isRequired,
  node: _slatePropTypes2.default.node.isRequired,
  parent: _slatePropTypes2.default.node.isRequired,
  readOnly: _propTypes2.default.bool.isRequired,
  state: _slatePropTypes2.default.state.isRequired
};
exports.default = DefaultNode;

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _slatePropTypes = __webpack_require__(14);

var _slatePropTypes2 = _interopRequireDefault(_slatePropTypes);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * Default placeholder.
 *
 * @type {Component}
 */

var DefaultPlaceholder = function (_React$Component) {
  _inherits(DefaultPlaceholder, _React$Component);

  function DefaultPlaceholder() {
    _classCallCheck(this, DefaultPlaceholder);

    return _possibleConstructorReturn(this, (DefaultPlaceholder.__proto__ || Object.getPrototypeOf(DefaultPlaceholder)).apply(this, arguments));
  }

  _createClass(DefaultPlaceholder, [{
    key: 'render',

    /**
     * Render.
     *
     * @return {Element}
     */

    value: function render() {
      var _props = this.props,
          editor = _props.editor,
          state = _props.state;

      if (!editor.props.placeholder) return null;
      if (state.document.getBlocks().size > 1) return null;

      var style = {
        pointerEvents: 'none',
        display: 'inline-block',
        width: '0',
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        opacity: '0.333'
      };

      return _react2.default.createElement('span', { contentEditable: false, style: style }, editor.props.placeholder);
    }

    /**
     * Property types.
     *
     * @type {Object}
     */

  }]);

  return DefaultPlaceholder;
}(_react2.default.Component);

/**
 * Export.
 *
 * @type {Component}
 */

DefaultPlaceholder.propTypes = {
  editor: _propTypes2.default.object.isRequired,
  isSelected: _propTypes2.default.bool.isRequired,
  node: _slatePropTypes2.default.node.isRequired,
  parent: _slatePropTypes2.default.node.isRequired,
  readOnly: _propTypes2.default.bool.isRequired,
  state: _slatePropTypes2.default.state.isRequired
};
exports.default = DefaultPlaceholder;

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug = __webpack_require__(2);

var _debug2 = _interopRequireDefault(_debug);

var _getWindow = __webpack_require__(12);

var _getWindow2 = _interopRequireDefault(_getWindow);

var _reactDom = __webpack_require__(68);

var _hotkeys = __webpack_require__(102);

var _hotkeys2 = _interopRequireDefault(_hotkeys);

var _environment = __webpack_require__(31);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Debug.
 *
 * @type {Function}
 */

var debug = (0, _debug2.default)('slate:core:before');

/**
 * The core before plugin.
 *
 * @return {Object}
 */

function BeforePlugin() {
  var compositionCount = 0;
  var isComposing = false;
  var isCopying = false;
  var isDragging = false;

  /**
   * On before input.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onBeforeInput(event, change, editor) {
    if (editor.props.readOnly) return true;

    // COMPAT: React's `onBeforeInput` synthetic event is based on the native
    // `keypress` and `textInput` events. In browsers that support the native
    // `beforeinput` event, we instead use that event to trigger text insertion,
    // since it provides more useful information about the range being affected
    // and also preserves compatibility with iOS autocorrect, which would be
    // broken if we called `preventDefault()` on React's synthetic event here.
    if (_environment.SUPPORTED_EVENTS.beforeinput) return true;

    debug('onBeforeInput', { event: event });
  }

  /**
   * On blur.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onBlur(event, change, editor) {
    if (isCopying) return true;
    if (editor.props.readOnly) return true;

    // If the active element is still the editor, the blur event is due to the
    // window itself being blurred (eg. when changing tabs) so we should ignore
    // the event, since we want to maintain focus when returning.
    var el = (0, _reactDom.findDOMNode)(editor);
    var window = (0, _getWindow2.default)(el);
    if (window.document.activeElement == el) return true;

    debug('onBlur', { event: event });
  }

  /**
   * On composition end.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onCompositionEnd(event, change, editor) {
    var n = compositionCount;

    // The `count` check here ensures that if another composition starts
    // before the timeout has closed out this one, we will abort unsetting the
    // `isComposing` flag, since a composition is still in affect.
    setTimeout(function () {
      if (compositionCount > n) return;
      isComposing = false;
    });

    debug('onCompositionEnd', { event: event });
  }

  /**
   * On composition start.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onCompositionStart(event, change, editor) {
    isComposing = true;
    compositionCount++;

    debug('onCompositionStart', { event: event });
  }

  /**
   * On copy.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onCopy(event, change, editor) {
    var window = (0, _getWindow2.default)(event.target);
    isCopying = true;
    window.requestAnimationFrame(function () {
      return isCopying = false;
    });

    debug('onCopy', { event: event });
  }

  /**
   * On cut.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onCut(event, change, editor) {
    if (editor.props.readOnly) return true;

    var window = (0, _getWindow2.default)(event.target);
    isCopying = true;
    window.requestAnimationFrame(function () {
      return isCopying = false;
    });

    debug('onCut', { event: event });
  }

  /**
   * On drag end.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragEnd(event, change, editor) {
    // Stop propagation so the event isn't visible to parent editors.
    event.stopPropagation();

    isDragging = false;

    debug('onDragEnd', { event: event });
  }

  /**
   * On drag enter.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragEnter(event, change, editor) {
    // Stop propagation so the event isn't visible to parent editors.
    event.stopPropagation();

    debug('onDragEnter', { event: event });
  }

  /**
   * On drag exit.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragExit(event, change, editor) {
    // Stop propagation so the event isn't visible to parent editors.
    event.stopPropagation();

    debug('onDragExit', { event: event });
  }

  /**
   * On drag leave.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragLeave(event, change, editor) {
    // Stop propagation so the event isn't visible to parent editors.
    event.stopPropagation();

    debug('onDragLeave', { event: event });
  }

  /**
   * On drag over.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragOver(event, change, editor) {
    // Stop propagation so the event isn't visible to parent editors.
    event.stopPropagation();

    // If a drag is already in progress, don't do this again.
    if (!isDragging) return true;

    isDragging = true;
    event.nativeEvent.dataTransfer.dropEffect = 'move';

    // You must call `preventDefault` to signal that drops are allowed.
    event.preventDefault();

    debug('onDragOver', { event: event });
  }

  /**
   * On drag start.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDragStart(event, change, editor) {
    // Stop propagation so the event isn't visible to parent editors.
    event.stopPropagation();

    isDragging = true;

    debug('onDragStart', { event: event });
  }

  /**
   * On drop.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onDrop(event, change, editor) {
    // Stop propagation so the event isn't visible to parent editors.
    event.stopPropagation();

    // Nothing happens in read-only mode.
    if (editor.props.readOnly) return true;

    // Prevent default so the DOM's state isn't corrupted.
    event.preventDefault();

    debug('onDrop', { event: event });
  }

  /**
   * On focus.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onFocus(event, change, editor) {
    if (isCopying) return true;
    if (editor.props.readOnly) return true;

    var el = (0, _reactDom.findDOMNode)(editor);

    // COMPAT: If the editor has nested editable elements, the focus can go to
    // those elements. In Firefox, this must be prevented because it results in
    // issues with keyboard navigation. (2017/03/30)
    if (_environment.IS_FIREFOX && event.target != el) {
      el.focus();
      return true;
    }

    debug('onFocus', { event: event });
  }

  /**
   * On input.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onInput(event, change, editor) {
    if (isComposing) return true;
    if (change.state.isBlurred) return true;

    debug('onInput', { event: event });
  }

  /**
   * On key down.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onKeyDown(event, change, editor) {
    if (editor.props.readOnly) return true;

    // When composing, these characters commit the composition but also move the
    // selection before we're able to handle it, so prevent their default,
    // selection-moving behavior.
    if (isComposing && _hotkeys2.default.COMPOSING(event)) {
      event.preventDefault();
      return true;
    }

    // Certain hotkeys have native behavior in contenteditable elements which
    // will cause our state to be out of sync, so prevent them.
    if (_hotkeys2.default.CONTENTEDITABLE(event)) {
      event.preventDefault();
    }

    debug('onKeyDown', { event: event });
  }

  /**
   * On paste.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onPaste(event, change, editor) {
    if (editor.props.readOnly) return true;

    // Prevent defaults so the DOM state isn't corrupted.
    event.preventDefault();

    debug('onPaste', { event: event });
  }

  /**
   * On select.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  function onSelect(event, change, editor) {
    if (isCopying) return true;
    if (isComposing) return true;
    if (editor.props.readOnly) return true;

    debug('onSelect', { event: event });
  }

  /**
   * Return the plugin.
   *
   * @type {Object}
   */

  return {
    onBeforeInput: onBeforeInput,
    onBlur: onBlur,
    onCompositionEnd: onCompositionEnd,
    onCompositionStart: onCompositionStart,
    onCopy: onCopy,
    onCut: onCut,
    onDragEnd: onDragEnd,
    onDragEnter: onDragEnter,
    onDragExit: onDragExit,
    onDragLeave: onDragLeave,
    onDragOver: onDragOver,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onFocus: onFocus,
    onInput: onInput,
    onKeyDown: onKeyDown,
    onPaste: onPaste,
    onSelect: onSelect
  };
}

/**
 * Export.
 *
 * @type {Object}
 */

exports.default = BeforePlugin;

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Noop.
 *
 * @return {Void}
 */

function noop() {}

/**
 * Export.
 *
 * @type {Function}
 */

exports.default = noop;

/***/ })
/******/ ])});;