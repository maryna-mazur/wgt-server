"use strict";

function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime =
    function _regeneratorRuntime() {
      return exports;
    };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return (
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
        obj[key]
    );
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return (obj[key] = value);
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator =
        outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return (
      (generator._invoke = (function (innerFn, self, context) {
        var state = "suspendedStart";
        return function (method, arg) {
          if ("executing" === state)
            throw new Error("Generator is already running");
          if ("completed" === state) {
            if ("throw" === method) throw arg;
            return doneResult();
          }
          for (context.method = method, context.arg = arg; ; ) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }
            if ("next" === context.method)
              context.sent = context._sent = context.arg;
            else if ("throw" === context.method) {
              if ("suspendedStart" === state)
                throw ((state = "completed"), context.arg);
              context.dispatchException(context.arg);
            } else
              "return" === context.method &&
              context.abrupt("return", context.arg);
            state = "executing";
            var record = tryCatch(innerFn, self, context);
            if ("normal" === record.type) {
              if (
                ((state = context.done ? "completed" : "suspendedYield"),
                record.arg === ContinueSentinel)
              )
                continue;
              return { value: record.arg, done: context.done };
            }
            "throw" === record.type &&
            ((state = "completed"),
              (context.method = "throw"),
              (context.arg = record.arg));
          }
        };
      })(innerFn, self, context)),
        generator
    );
  }
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype &&
  NativeIteratorPrototype !== Op &&
  hasOwn.call(NativeIteratorPrototype, iteratorSymbol) &&
  (IteratorPrototype = NativeIteratorPrototype);
  var Gp =
    (GeneratorFunctionPrototype.prototype =
      Generator.prototype =
        Object.create(IteratorPrototype));
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value &&
        "object" == _typeof(value) &&
        hasOwn.call(value, "__await")
          ? PromiseImpl.resolve(value.__await).then(
            function (value) {
              invoke("next", value, resolve, reject);
            },
            function (err) {
              invoke("throw", err, resolve, reject);
            }
          )
          : PromiseImpl.resolve(value).then(
            function (unwrapped) {
              (result.value = unwrapped), resolve(result);
            },
            function (error) {
              return invoke("throw", error, resolve, reject);
            }
          );
      }
      reject(record.arg);
    }
    var previousPromise;
    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }
      return (previousPromise = previousPromise
        ? previousPromise.then(
          callInvokeWithMethodAndArg,
          callInvokeWithMethodAndArg
        )
        : callInvokeWithMethodAndArg());
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (((context.delegate = null), "throw" === context.method)) {
        if (
          delegate.iterator["return"] &&
          ((context.method = "return"),
            (context.arg = undefined),
            maybeInvokeDelegate(delegate, context),
          "throw" === context.method)
        )
          return ContinueSentinel;
        (context.method = "throw"),
          (context.arg = new TypeError(
            "The iterator does not provide a 'throw' method"
          ));
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type)
      return (
        (context.method = "throw"),
          (context.arg = record.arg),
          (context.delegate = null),
          ContinueSentinel
      );
    var info = record.arg;
    return info
      ? info.done
        ? ((context[delegate.resultName] = info.value),
          (context.next = delegate.nextLoc),
        "return" !== context.method &&
        ((context.method = "next"), (context.arg = undefined)),
          (context.delegate = null),
          ContinueSentinel)
        : info
      : ((context.method = "throw"),
        (context.arg = new TypeError("iterator result is not an object")),
        (context.delegate = null),
        ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };
    1 in locs && (entry.catchLoc = locs[1]),
    2 in locs && ((entry.finallyLoc = locs[2]), (entry.afterLoc = locs[3])),
      this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    (record.type = "normal"), delete record.arg, (entry.completion = record);
  }
  function Context(tryLocsList) {
    (this.tryEntries = [{ tryLoc: "root" }]),
      tryLocsList.forEach(pushTryEntry, this),
      this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length; ) {
              if (hasOwn.call(iterable, i))
                return (next.value = iterable[i]), (next.done = !1), next;
            }
            return (next.value = undefined), (next.done = !0), next;
          };
        return (next.next = next);
      }
    }
    return { next: doneResult };
  }
  function doneResult() {
    return { value: undefined, done: !0 };
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
      define(Gp, "constructor", GeneratorFunctionPrototype),
      define(GeneratorFunctionPrototype, "constructor", GeneratorFunction),
      (GeneratorFunction.displayName = define(
        GeneratorFunctionPrototype,
        toStringTagSymbol,
        "GeneratorFunction"
      )),
      (exports.isGeneratorFunction = function (genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return (
          !!ctor &&
          (ctor === GeneratorFunction ||
            "GeneratorFunction" === (ctor.displayName || ctor.name))
        );
      }),
      (exports.mark = function (genFun) {
        return (
          Object.setPrototypeOf
            ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
            : ((genFun.__proto__ = GeneratorFunctionPrototype),
              define(genFun, toStringTagSymbol, "GeneratorFunction")),
            (genFun.prototype = Object.create(Gp)),
            genFun
        );
      }),
      (exports.awrap = function (arg) {
        return { __await: arg };
      }),
      defineIteratorMethods(AsyncIterator.prototype),
      define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
        return this;
      }),
      (exports.AsyncIterator = AsyncIterator),
      (exports.async = function (
        innerFn,
        outerFn,
        self,
        tryLocsList,
        PromiseImpl
      ) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(
          wrap(innerFn, outerFn, self, tryLocsList),
          PromiseImpl
        );
        return exports.isGeneratorFunction(outerFn)
          ? iter
          : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
          });
      }),
      defineIteratorMethods(Gp),
      define(Gp, toStringTagSymbol, "Generator"),
      define(Gp, iteratorSymbol, function () {
        return this;
      }),
      define(Gp, "toString", function () {
        return "[object Generator]";
      }),
      (exports.keys = function (object) {
        var keys = [];
        for (var key in object) {
          keys.push(key);
        }
        return (
          keys.reverse(),
            function next() {
              for (; keys.length; ) {
                var key = keys.pop();
                if (key in object)
                  return (next.value = key), (next.done = !1), next;
              }
              return (next.done = !0), next;
            }
        );
      }),
      (exports.values = values),
      (Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          if (
            ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = undefined),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = undefined),
              this.tryEntries.forEach(resetTryEntry),
              !skipTempReset)
          )
            for (var name in this) {
              "t" === name.charAt(0) &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1)) &&
              (this[name] = undefined);
            }
        },
        stop: function stop() {
          this.done = !0;
          var rootRecord = this.tryEntries[0].completion;
          if ("throw" === rootRecord.type) throw rootRecord.arg;
          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) throw exception;
          var context = this;
          function handle(loc, caught) {
            return (
              (record.type = "throw"),
                (record.arg = exception),
                (context.next = loc),
              caught && ((context.method = "next"), (context.arg = undefined)),
                !!caught
            );
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i],
              record = entry.completion;
            if ("root" === entry.tryLoc) return handle("end");
            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc"),
                hasFinally = hasOwn.call(entry, "finallyLoc");
              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              } else {
                if (!hasFinally)
                  throw new Error("try statement without catch or finally");
                if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (
              entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc
            ) {
              var finallyEntry = entry;
              break;
            }
          }
          finallyEntry &&
          ("break" === type || "continue" === type) &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc &&
          (finallyEntry = null);
          var record = finallyEntry ? finallyEntry.completion : {};
          return (
            (record.type = type),
              (record.arg = arg),
              finallyEntry
                ? ((this.method = "next"),
                  (this.next = finallyEntry.finallyLoc),
                  ContinueSentinel)
                : this.complete(record)
          );
        },
        complete: function complete(record, afterLoc) {
          if ("throw" === record.type) throw record.arg;
          return (
            "break" === record.type || "continue" === record.type
              ? (this.next = record.arg)
              : "return" === record.type
                ? ((this.rval = this.arg = record.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === record.type && afterLoc && (this.next = afterLoc),
              ContinueSentinel
          );
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc)
              return (
                this.complete(entry.completion, entry.afterLoc),
                  resetTryEntry(entry),
                  ContinueSentinel
              );
          }
        },
        catch: function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if ("throw" === record.type) {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          return (
            (this.delegate = {
              iterator: values(iterable),
              resultName: resultName,
              nextLoc: nextLoc,
            }),
            "next" === this.method && (this.arg = undefined),
              ContinueSentinel
          );
        },
      }),
      exports
  );
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf.bind()
    : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
  return _getPrototypeOf(o);
}

function _typeof(obj) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (obj) {
          return typeof obj;
        }
        : function (obj) {
          return obj &&
          "function" == typeof Symbol &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
            ? "symbol"
            : typeof obj;
        }),
      _typeof(obj)
  );
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e3) {
          throw _e3;
        },
        f: F,
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e4) {
      didErr = true;
      err = _e4;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

(function () {
  var fe = Object.create;
  var J = Object.defineProperty;
  var pe = Object.getOwnPropertyDescriptor;
  var de = Object.getOwnPropertyNames,
    G = Object.getOwnPropertySymbols,
    _e = Object.getPrototypeOf,
    V = Object.prototype.hasOwnProperty,
    be = Object.prototype.propertyIsEnumerable;

  var Q = function Q(o, s, e) {
      return s in o
        ? J(o, s, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: e,
        })
        : (o[s] = e);
    },
    q = function q(o, s) {
      for (var e in s || (s = {})) {
        V.call(s, e) && Q(o, e, s[e]);
      }

      if (G) {
        var _iterator = _createForOfIteratorHelper(G(s)),
          _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var e = _step.value;
            be.call(s, e) && Q(o, e, s[e]);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return o;
    };

  var me = function me(o, s) {
    return function () {
      return (
        s ||
        o(
          (s = {
            exports: {},
          }).exports,
          s
        ),
          s.exports
      );
    };
  };

  var ge = function ge(o, s, e, t) {
    if ((s && _typeof(s) == "object") || typeof s == "function") {
      var _iterator2 = _createForOfIteratorHelper(de(s)),
        _step2;

      try {
        var _loop = function _loop() {
          var n = _step2.value;
          !V.call(o, n) &&
          n !== e &&
          J(o, n, {
            get: function get() {
              return s[n];
            },
            enumerable: !(t = pe(s, n)) || t.enumerable,
          });
        };

        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    return o;
  };

  var X = function X(o, s, e) {
    return (
      (e = o != null ? fe(_e(o)) : {}),
        ge(
          s || !o || !o.__esModule
            ? J(e, "default", {
              value: o,
              enumerable: !0,
            })
            : e,
          o
        )
    );
  };

  var T = function T(o, s, e) {
    return new Promise(function (t, n) {
      var i = function i(c) {
          try {
            a(e.next(c));
          } catch (l) {
            n(l);
          }
        },
        r = function r(c) {
          try {
            a(e["throw"](c));
          } catch (l) {
            n(l);
          }
        },
        a = function a(c) {
          return c.done ? t(c.value) : Promise.resolve(c.value).then(i, r);
        };

      a((e = e.apply(o, s)).next());
    });
  };

  var H = me(function (Re, F) {
    "use strict";

    var y =
        (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) ==
        "object"
          ? Reflect
          : null,
      Y =
        y && typeof y.apply == "function"
          ? y.apply
          : function (s, e, t) {
            return Function.prototype.apply.call(s, e, t);
          },
      R;
    y && typeof y.ownKeys == "function"
      ? (R = y.ownKeys)
      : Object.getOwnPropertySymbols
        ? (R = function R(s) {
          return Object.getOwnPropertyNames(s).concat(
            Object.getOwnPropertySymbols(s)
          );
        })
        : (R = function R(s) {
          return Object.getOwnPropertyNames(s);
        });

    function ve(o) {
      console && console.warn && console.warn(o);
    }

    var $ =
      Number.isNaN ||
      function (s) {
        return s !== s;
      };

    function u() {
      u.init.call(this);
    }

    F.exports = u;
    F.exports.once = Ce;
    u.EventEmitter = u;
    u.prototype._events = void 0;
    u.prototype._eventsCount = 0;
    u.prototype._maxListeners = void 0;
    var Z = 10;

    function k(o) {
      if (typeof o != "function")
        throw new TypeError(
          'The "listener" argument must be of type Function. Received type ' +
          _typeof(o)
        );
    }

    Object.defineProperty(u, "defaultMaxListeners", {
      enumerable: !0,
      get: function get() {
        return Z;
      },
      set: function set(o) {
        if (typeof o != "number" || o < 0 || $(o))
          throw new RangeError(
            'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
            o +
            "."
          );
        Z = o;
      },
    });

    u.init = function () {
      (this._events === void 0 ||
        this._events === Object.getPrototypeOf(this)._events) &&
      ((this._events = Object.create(null)), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0);
    };

    u.prototype.setMaxListeners = function (s) {
      if (typeof s != "number" || s < 0 || $(s))
        throw new RangeError(
          'The value of "n" is out of range. It must be a non-negative number. Received ' +
          s +
          "."
        );
      return (this._maxListeners = s), this;
    };

    function ee(o) {
      return o._maxListeners === void 0
        ? u.defaultMaxListeners
        : o._maxListeners;
    }

    u.prototype.getMaxListeners = function () {
      return ee(this);
    };

    u.prototype.emit = function (s) {
      for (var e = [], t = 1; t < arguments.length; t++) {
        e.push(arguments[t]);
      }

      var n = s === "error",
        i = this._events;
      if (i !== void 0) n = n && i.error === void 0;
      else if (!n) return !1;

      if (n) {
        var r;
        if ((e.length > 0 && (r = e[0]), r instanceof Error)) throw r;
        var a = new Error(
          "Unhandled error." + (r ? " (" + r.message + ")" : "")
        );
        throw ((a.context = r), a);
      }

      var c = i[s];
      if (c === void 0) return !1;
      if (typeof c == "function") Y(c, this, e);
      else
        for (var l = c.length, b = re(c, l), t = 0; t < l; ++t) {
          Y(b[t], this, e);
        }
      return !0;
    };

    function te(o, s, e, t) {
      var n, i, r;
      if (
        (k(e),
          (i = o._events),
          i === void 0
            ? ((i = o._events = Object.create(null)), (o._eventsCount = 0))
            : (i.newListener !== void 0 &&
            (o.emit("newListener", s, e.listener ? e.listener : e),
              (i = o._events)),
              (r = i[s])),
        r === void 0)
      )
        (r = i[s] = e), ++o._eventsCount;
      else if (
        (typeof r == "function"
          ? (r = i[s] = t ? [e, r] : [r, e])
          : t
            ? r.unshift(e)
            : r.push(e),
          (n = ee(o)),
        n > 0 && r.length > n && !r.warned)
      ) {
        r.warned = !0;
        var a = new Error(
          "Possible EventEmitter memory leak detected. " +
          r.length +
          " " +
          String(s) +
          " listeners added. Use emitter.setMaxListeners() to increase limit"
        );
        (a.name = "MaxListenersExceededWarning"),
          (a.emitter = o),
          (a.type = s),
          (a.count = r.length),
          ve(a);
      }
      return o;
    }

    u.prototype.addListener = function (s, e) {
      return te(this, s, e, !1);
    };

    u.prototype.on = u.prototype.addListener;

    u.prototype.prependListener = function (s, e) {
      return te(this, s, e, !0);
    };

    function ye() {
      if (!this.fired)
        return (
          this.target.removeListener(this.type, this.wrapFn),
            (this.fired = !0),
            arguments.length === 0
              ? this.listener.call(this.target)
              : this.listener.apply(this.target, arguments)
        );
    }

    function ne(o, s, e) {
      var t = {
          fired: !1,
          wrapFn: void 0,
          target: o,
          type: s,
          listener: e,
        },
        n = ye.bind(t);
      return (n.listener = e), (t.wrapFn = n), n;
    }

    u.prototype.once = function (s, e) {
      return k(e), this.on(s, ne(this, s, e)), this;
    };

    u.prototype.prependOnceListener = function (s, e) {
      return k(e), this.prependListener(s, ne(this, s, e)), this;
    };

    u.prototype.removeListener = function (s, e) {
      var t, n, i, r, a;
      if ((k(e), (n = this._events), n === void 0)) return this;
      if (((t = n[s]), t === void 0)) return this;
      if (t === e || t.listener === e)
        --this._eventsCount === 0
          ? (this._events = Object.create(null))
          : (delete n[s],
          n.removeListener &&
          this.emit("removeListener", s, t.listener || e));
      else if (typeof t != "function") {
        for (i = -1, r = t.length - 1; r >= 0; r--) {
          if (t[r] === e || t[r].listener === e) {
            (a = t[r].listener), (i = r);
            break;
          }
        }

        if (i < 0) return this;
        i === 0 ? t.shift() : Se(t, i),
        t.length === 1 && (n[s] = t[0]),
        n.removeListener !== void 0 && this.emit("removeListener", s, a || e);
      }
      return this;
    };

    u.prototype.off = u.prototype.removeListener;

    u.prototype.removeAllListeners = function (s) {
      var e, t, n;
      if (((t = this._events), t === void 0)) return this;
      if (t.removeListener === void 0)
        return (
          arguments.length === 0
            ? ((this._events = Object.create(null)), (this._eventsCount = 0))
            : t[s] !== void 0 &&
            (--this._eventsCount === 0
              ? (this._events = Object.create(null))
              : delete t[s]),
            this
        );

      if (arguments.length === 0) {
        var i = Object.keys(t),
          r;

        for (n = 0; n < i.length; ++n) {
          (r = i[n]), r !== "removeListener" && this.removeAllListeners(r);
        }

        return (
          this.removeAllListeners("removeListener"),
            (this._events = Object.create(null)),
            (this._eventsCount = 0),
            this
        );
      }

      if (((e = t[s]), typeof e == "function")) this.removeListener(s, e);
      else if (e !== void 0)
        for (n = e.length - 1; n >= 0; n--) {
          this.removeListener(s, e[n]);
        }
      return this;
    };

    function se(o, s, e) {
      var t = o._events;
      if (t === void 0) return [];
      var n = t[s];
      return n === void 0
        ? []
        : typeof n == "function"
          ? e
            ? [n.listener || n]
            : [n]
          : e
            ? xe(n)
            : re(n, n.length);
    }

    u.prototype.listeners = function (s) {
      return se(this, s, !0);
    };

    u.prototype.rawListeners = function (s) {
      return se(this, s, !1);
    };

    u.listenerCount = function (o, s) {
      return typeof o.listenerCount == "function"
        ? o.listenerCount(s)
        : ie.call(o, s);
    };

    u.prototype.listenerCount = ie;

    function ie(o) {
      var s = this._events;

      if (s !== void 0) {
        var e = s[o];
        if (typeof e == "function") return 1;
        if (e !== void 0) return e.length;
      }

      return 0;
    }

    u.prototype.eventNames = function () {
      return this._eventsCount > 0 ? R(this._events) : [];
    };

    function re(o, s) {
      for (var e = new Array(s), t = 0; t < s; ++t) {
        e[t] = o[t];
      }

      return e;
    }

    function Se(o, s) {
      for (; s + 1 < o.length; s++) {
        o[s] = o[s + 1];
      }

      o.pop();
    }

    function xe(o) {
      for (var s = new Array(o.length), e = 0; e < s.length; ++e) {
        s[e] = o[e].listener || o[e];
      }

      return s;
    }

    function Ce(o, s) {
      return new Promise(function (e, t) {
        function n(r) {
          o.removeListener(s, i), t(r);
        }

        function i() {
          typeof o.removeListener == "function" && o.removeListener("error", n),
            e([].slice.call(arguments));
        }

        oe(o, s, i, {
          once: !0,
        }),
        s !== "error" &&
        Te(o, n, {
          once: !0,
        });
      });
    }

    function Te(o, s, e) {
      typeof o.on == "function" && oe(o, "error", s, e);
    }

    function oe(o, s, e, t) {
      if (typeof o.on == "function") t.once ? o.once(s, e) : o.on(s, e);
      else if (typeof o.addEventListener == "function")
        o.addEventListener(s, function n(i) {
          t.once && o.removeEventListener(s, n), e(i);
        });
      else
        throw new TypeError(
          'The "emitter" argument must be of type EventEmitter. Received type ' +
          _typeof(o)
        );
    }
  });
  var le = X(H());
  var p = {
      timeout: 1,
      transportClosed: 2,
      clientDisconnected: 3,
      clientClosed: 4,
      clientConnectToken: 5,
      clientRefreshToken: 6,
      subscriptionUnsubscribed: 7,
      subscriptionSubscribeToken: 8,
      subscriptionRefreshToken: 9,
      transportWriteError: 10,
      connectionClosed: 11,
    },
    v = {
      connectCalled: 0,
      transportClosed: 1,
      noPing: 2,
      subscribeTimeout: 3,
      unsubscribeError: 4,
    },
    O = {
      disconnectCalled: 0,
      unauthorized: 1,
      badProtocol: 2,
      messageSizeLimit: 3,
    },
    L = {
      subscribeCalled: 0,
      transportClosed: 1,
    },
    B = {
      unsubscribeCalled: 0,
      unauthorized: 1,
      clientClosed: 2,
    };

  var j = (function (t) {
      return (
        (t.Disconnected = "disconnected"),
          (t.Connecting = "connecting"),
          (t.Connected = "connected"),
          t
      );
    })(j || {}),
    D = (function (t) {
      return (
        (t.Unsubscribed = "unsubscribed"),
          (t.Subscribing = "subscribing"),
          (t.Subscribed = "subscribed"),
          t
      );
    })(D || {});

  function ae(o, s) {
    return o.lastIndexOf(s, 0) === 0;
  }

  function K(o) {
    return o == null ? !1 : typeof o == "function";
  }

  function ce(o, s) {
    if (window.console) {
      var e = window.console[o];
      K(e) && e.apply(window.console, s);
    }
  }

  function Ee(o, s) {
    return Math.floor(Math.random() * (s - o + 1) + o);
  }

  function S(o, s, e) {
    o > 31 && (o = 31);
    var t = Ee(0, Math.min(e, s * Math.pow(2, o)));
    return Math.min(e, s + t);
  }

  function ue(o) {
    return "error" in o && o.error !== null;
  }

  function x(o) {
    return Math.min(o * 1e3, 2147483647);
  }

  var I = /*#__PURE__*/ (function (_le$default) {
    _inherits(I, _le$default);

    var _super = _createSuper(I);

    function I(e, t, n) {
      var _this;

      _classCallCheck(this, I);

      _this = _super.call(this);
      _this._resubscribeTimeout = null;
      _this._refreshTimeout = null;
      (_this.channel = t),
        (_this.state = "unsubscribed"),
        (_this._centrifuge = e),
        (_this._token = null),
        (_this._getToken = null),
        (_this._data = null),
        (_this._recover = !1),
        (_this._offset = null),
        (_this._epoch = null),
        (_this._recoverable = !1),
        (_this._positioned = !1),
        (_this._joinLeave = !1),
        (_this._minResubscribeDelay = 500),
        (_this._maxResubscribeDelay = 2e4),
        (_this._resubscribeTimeout = null),
        (_this._resubscribeAttempts = 0),
        (_this._promises = {}),
        (_this._promiseId = 0),
        (_this._inflight = !1),
        (_this._refreshTimeout = null),
        _this._setOptions(n),
        _this._centrifuge._debugEnabled
          ? (_this.on("state", function (i) {
            _this._centrifuge._debug(
              "subscription state",
              t,
              i.oldState,
              "->",
              i.newState
            );
          }),
            _this.on("error", function (i) {
              _this._centrifuge._debug("subscription error", t, i);
            }))
          : _this.on("error", function () {
            Function.prototype();
          });
      return _this;
    }

    _createClass(I, [
      {
        key: "ready",
        value: function ready(e) {
          var _this2 = this;

          return this.state === "unsubscribed"
            ? Promise.reject({
              code: p.subscriptionUnsubscribed,
              message: this.state,
            })
            : this.state === "subscribed"
              ? Promise.resolve()
              : new Promise(function (t, n) {
                var i = {
                  resolve: t,
                  reject: n,
                };
                e &&
                (i.timeout = setTimeout(function () {
                  n({
                    code: p.timeout,
                    message: "timeout",
                  });
                }, e)),
                  (_this2._promises[_this2._nextPromiseId()] = i);
              });
        },
      },
      {
        key: "subscribe",
        value: function subscribe() {
          this._isSubscribed() ||
          ((this._resubscribeAttempts = 0),
            this._setSubscribing(L.subscribeCalled, "subscribe called"));
        },
      },
      {
        key: "unsubscribe",
        value: function unsubscribe() {
          this._setUnsubscribed(B.unsubscribeCalled, "unsubscribe called", !0);
        },
      },
      {
        key: "publish",
        value: function publish(e) {
          var t = this;
          return this._methodCall().then(function () {
            return t._centrifuge.publish(t.channel, e);
          });
        },
      },
      {
        key: "presence",
        value: function presence() {
          var e = this;
          return this._methodCall().then(function () {
            return e._centrifuge.presence(e.channel);
          });
        },
      },
      {
        key: "presenceStats",
        value: function presenceStats() {
          var e = this;
          return this._methodCall().then(function () {
            return e._centrifuge.presenceStats(e.channel);
          });
        },
      },
      {
        key: "history",
        value: function history(e) {
          var t = this;
          return this._methodCall().then(function () {
            return t._centrifuge.history(t.channel, e);
          });
        },
      },
      {
        key: "_methodCall",
        value: function _methodCall() {
          var _this3 = this;

          return this._isSubscribed()
            ? Promise.resolve()
            : this._isUnsubscribed()
              ? Promise.reject({
                code: p.subscriptionUnsubscribed,
                message: this.state,
              })
              : new Promise(function (e, t) {
                var n = setTimeout(function () {
                  t({
                    code: p.timeout,
                    message: "timeout",
                  });
                }, _this3._centrifuge._config.timeout);
                _this3._promises[_this3._nextPromiseId()] = {
                  timeout: n,
                  resolve: e,
                  reject: t,
                };
              });
        },
      },
      {
        key: "_nextPromiseId",
        value: function _nextPromiseId() {
          return ++this._promiseId;
        },
      },
      {
        key: "_needRecover",
        value: function _needRecover() {
          return this._recover === !0;
        },
      },
      {
        key: "_isUnsubscribed",
        value: function _isUnsubscribed() {
          return this.state === "unsubscribed";
        },
      },
      {
        key: "_isSubscribing",
        value: function _isSubscribing() {
          return this.state === "subscribing";
        },
      },
      {
        key: "_isSubscribed",
        value: function _isSubscribed() {
          return this.state === "subscribed";
        },
      },
      {
        key: "_setState",
        value: function _setState(e) {
          if (this.state !== e) {
            var t = this.state;
            return (
              (this.state = e),
                this.emit("state", {
                  newState: e,
                  oldState: t,
                  channel: this.channel,
                }),
                !0
            );
          }

          return !1;
        },
      },
      {
        key: "_usesToken",
        value: function _usesToken() {
          return this._token !== null || this._getToken !== null;
        },
      },
      {
        key: "_clearSubscribingState",
        value: function _clearSubscribingState() {
          (this._resubscribeAttempts = 0), this._clearResubscribeTimeout();
        },
      },
      {
        key: "_clearSubscribedState",
        value: function _clearSubscribedState() {
          this._clearRefreshTimeout();
        },
      },
      {
        key: "_setSubscribed",
        value: function _setSubscribed(e) {
          var _this4 = this;

          if (!this._isSubscribing()) return;
          this._clearSubscribingState(),
          e.recoverable &&
          ((this._recover = !0),
            (this._offset = e.offset || 0),
            (this._epoch = e.epoch || "")),
            this._setState("subscribed");

          var t = this._centrifuge._getSubscribeContext(this.channel, e);

          this.emit("subscribed", t), this._resolvePromises();
          var n = e.publications;
          if (n && n.length > 0)
            for (var i in n) {
              !n.hasOwnProperty(i) || this._handlePublication(n[i]);
            }
          e.expires === !0 &&
          (this._refreshTimeout = setTimeout(function () {
            return _this4._refresh();
          }, x(e.ttl)));
        },
      },
      {
        key: "_setSubscribing",
        value: function _setSubscribing(e, t) {
          this._isSubscribing() ||
          (this._isSubscribed() && this._clearSubscribedState(),
          this._setState("subscribing") &&
          this.emit("subscribing", {
            channel: this.channel,
            code: e,
            reason: t,
          }),
            this._subscribe(!1, !1));
        },
      },
      {
        key: "_subscribe",
        value: function _subscribe(e, t) {
          if (
            (this._centrifuge._debug("subscribing on", this.channel),
            this._centrifuge.state !== "connected" && !e)
          )
            return (
              this._centrifuge._debug(
                "delay subscribe on",
                this.channel,
                "till connected"
              ),
                null
            );

          if (this._usesToken()) {
            if (this._token) return this._sendSubscribe(this._token, t);
            {
              if (e) return null;
              var n = this;
              return (
                this._getSubscriptionToken()
                  .then(function (i) {
                    if (!!n._isSubscribing()) {
                      if (!i) {
                        n._failUnauthorized();

                        return;
                      }

                      (n._token = i), n._sendSubscribe(i, !1);
                    }
                  })
                  ["catch"](function (i) {
                  !n._isSubscribing() ||
                  (n.emit("error", {
                    type: "subscribeToken",
                    channel: n.channel,
                    error: {
                      code: p.subscriptionSubscribeToken,
                      message: i !== void 0 ? i.toString() : "",
                    },
                  }),
                    n._scheduleResubscribe());
                }),
                  null
              );
            }
          } else return this._sendSubscribe("", t);
        },
      },
      {
        key: "_sendSubscribe",
        value: function _sendSubscribe(e, t) {
          var _this5 = this;

          var i = {
            channel: this.channel,
          };

          if (
            (e && (i.token = e),
            this._data && (i.data = this._data),
            this._positioned && (i.positioned = !0),
            this._recoverable && (i.recoverable = !0),
            this._joinLeave && (i.join_leave = !0),
              this._needRecover())
          ) {
            i.recover = !0;

            var a = this._getOffset();

            a && (i.offset = a);

            var c = this._getEpoch();

            c && (i.epoch = c);
          }

          var r = {
            subscribe: i,
          };
          return (
            (this._inflight = !0),
              this._centrifuge._call(r, t).then(
                function (a) {
                  _this5._inflight = !1;
                  var c = a.reply.subscribe;
                  _this5._handleSubscribeResponse(c), a.next && a.next();
                },
                function (a) {
                  (_this5._inflight = !1),
                    _this5._handleSubscribeError(a.error),
                  a.next && a.next();
                }
              ),
              r
          );
        },
      },
      {
        key: "_handleSubscribeError",
        value: function _handleSubscribeError(e) {
          if (!!this._isSubscribing()) {
            if (e.code === p.timeout) {
              this._centrifuge._disconnect(
                v.subscribeTimeout,
                "subscribe timeout",
                !0
              );

              return;
            }

            this._subscribeError(e);
          }
        },
      },
      {
        key: "_handleSubscribeResponse",
        value: function _handleSubscribeResponse(e) {
          !this._isSubscribing() || this._setSubscribed(e);
        },
      },
      {
        key: "_setUnsubscribed",
        value: function _setUnsubscribed(e, t, n) {
          this._isUnsubscribed() ||
          (this._isSubscribed() &&
          (n && this._centrifuge._unsubscribe(this),
            this._clearSubscribedState()),
          this._isSubscribing() && this._clearSubscribingState(),
          this._setState("unsubscribed") &&
          this.emit("unsubscribed", {
            channel: this.channel,
            code: e,
            reason: t,
          }),
            this._rejectPromises({
              code: p.subscriptionUnsubscribed,
              message: this.state,
            }));
        },
      },
      {
        key: "_handlePublication",
        value: function _handlePublication(e) {
          var t = this._centrifuge._getPublicationContext(this.channel, e);

          this.emit("publication", t), e.offset && (this._offset = e.offset);
        },
      },
      {
        key: "_handleJoin",
        value: function _handleJoin(e) {
          var t = this._centrifuge._getJoinLeaveContext(e.info);

          this.emit("join", {
            channel: this.channel,
            info: t,
          });
        },
      },
      {
        key: "_handleLeave",
        value: function _handleLeave(e) {
          var t = this._centrifuge._getJoinLeaveContext(e.info);

          this.emit("leave", {
            channel: this.channel,
            info: t,
          });
        },
      },
      {
        key: "_resolvePromises",
        value: function _resolvePromises() {
          for (var e in this._promises) {
            this._promises[e].timeout &&
            clearTimeout(this._promises[e].timeout),
              this._promises[e].resolve(),
              delete this._promises[e];
          }
        },
      },
      {
        key: "_rejectPromises",
        value: function _rejectPromises(e) {
          for (var t in this._promises) {
            this._promises[t].timeout &&
            clearTimeout(this._promises[t].timeout),
              this._promises[t].reject(e),
              delete this._promises[t];
          }
        },
      },
      {
        key: "_scheduleResubscribe",
        value: function _scheduleResubscribe() {
          var e = this,
            t = this._getResubscribeDelay();

          this._resubscribeTimeout = setTimeout(function () {
            e._isSubscribing() && e._subscribe(!1, !1);
          }, t);
        },
      },
      {
        key: "_subscribeError",
        value: function _subscribeError(e) {
          if (!!this._isSubscribing())
            if (e.code < 100 || e.code === 109 || e.temporary === !0) {
              e.code === 109 && (this._token = null);
              var t = {
                channel: this.channel,
                type: "subscribe",
                error: e,
              };
              this._centrifuge.state === "connected" && this.emit("error", t),
                this._scheduleResubscribe();
            } else this._setUnsubscribed(e.code, e.message, !1);
        },
      },
      {
        key: "_getResubscribeDelay",
        value: function _getResubscribeDelay() {
          var e = S(
            this._resubscribeAttempts,
            this._minResubscribeDelay,
            this._maxResubscribeDelay
          );
          return this._resubscribeAttempts++, e;
        },
      },
      {
        key: "_setOptions",
        value: function _setOptions(e) {
          !e ||
          (e.since &&
          ((this._offset = e.since.offset),
            (this._epoch = e.since.epoch),
            (this._recover = !0)),
          e.data && (this._data = e.data),
          e.minResubscribeDelay !== void 0 &&
          (this._minResubscribeDelay = e.minResubscribeDelay),
          e.maxResubscribeDelay !== void 0 &&
          (this._maxResubscribeDelay = e.maxResubscribeDelay),
          e.token && (this._token = e.token),
          e.getToken && (this._getToken = e.getToken),
          e.positioned === !0 && (this._positioned = !0),
          e.recoverable === !0 && (this._recoverable = !0),
          e.joinLeave === !0 && (this._joinLeave = !0));
        },
      },
      {
        key: "_getOffset",
        value: function _getOffset() {
          var e = this._offset;
          return e !== null ? e : 0;
        },
      },
      {
        key: "_getEpoch",
        value: function _getEpoch() {
          var e = this._epoch;
          return e !== null ? e : "";
        },
      },
      {
        key: "_clearRefreshTimeout",
        value: function _clearRefreshTimeout() {
          this._refreshTimeout !== null &&
          (clearTimeout(this._refreshTimeout), (this._refreshTimeout = null));
        },
      },
      {
        key: "_clearResubscribeTimeout",
        value: function _clearResubscribeTimeout() {
          this._resubscribeTimeout !== null &&
          (clearTimeout(this._resubscribeTimeout),
            (this._resubscribeTimeout = null));
        },
      },
      {
        key: "_getSubscriptionToken",
        value: function _getSubscriptionToken() {
          this._centrifuge._debug(
            "get subscription token for channel",
            this.channel
          );

          var e = {
              channel: this.channel,
            },
            t = this._getToken;
          if (t === null)
            throw new Error(
              "provide a function to get channel subscription token"
            );
          return t(e);
        },
      },
      {
        key: "_refresh",
        value: function _refresh() {
          this._clearRefreshTimeout();

          var e = this;

          this._getSubscriptionToken()
            .then(function (t) {
              if (!e._isSubscribed()) return;

              if (!t) {
                e._failUnauthorized();

                return;
              }

              e._token = t;
              var i = {
                sub_refresh: {
                  channel: e.channel,
                  token: t,
                },
              };

              e._centrifuge._call(i).then(
                function (r) {
                  var a = r.reply.sub_refresh;
                  e._refreshResponse(a), r.next && r.next();
                },
                function (r) {
                  e._refreshError(r.error), r.next && r.next();
                }
              );
            })
            ["catch"](function (t) {
            e.emit("error", {
              type: "refreshToken",
              channel: e.channel,
              error: {
                code: p.subscriptionRefreshToken,
                message: t !== void 0 ? t.toString() : "",
              },
            }),
              (e._refreshTimeout = setTimeout(function () {
                return e._refresh();
              }, e._getRefreshRetryDelay()));
          });
        },
      },
      {
        key: "_refreshResponse",
        value: function _refreshResponse(e) {
          var _this6 = this;

          !this._isSubscribed() ||
          (this._centrifuge._debug(
            "subscription token refreshed, channel",
            this.channel
          ),
            this._clearRefreshTimeout(),
          e.expires === !0 &&
          (this._refreshTimeout = setTimeout(function () {
            return _this6._refresh();
          }, x(e.ttl))));
        },
      },
      {
        key: "_refreshError",
        value: function _refreshError(e) {
          var _this7 = this;

          !this._isSubscribed() ||
          (e.code < 100 || e.temporary === !0
            ? (this.emit("error", {
              type: "refresh",
              channel: this.channel,
              error: e,
            }),
              (this._refreshTimeout = setTimeout(function () {
                return _this7._refresh();
              }, this._getRefreshRetryDelay())))
            : this._setUnsubscribed(e.code, e.message, !0));
        },
      },
      {
        key: "_getRefreshRetryDelay",
        value: function _getRefreshRetryDelay() {
          return S(0, 1e4, 2e4);
        },
      },
      {
        key: "_failUnauthorized",
        value: function _failUnauthorized() {
          this._setUnsubscribed(B.unauthorized, "unauthorized", !0);
        },
      },
    ]);

    return I;
  })(le["default"]);

  var U = /*#__PURE__*/ (function () {
    function U(s, e) {
      _classCallCheck(this, U);

      (this.endpoint = s), (this.options = e), (this._transport = null);
    }

    _createClass(U, [
      {
        key: "name",
        value: function name() {
          return "sockjs";
        },
      },
      {
        key: "subName",
        value: function subName() {
          return "sockjs-" + this._transport.transport;
        },
      },
      {
        key: "emulation",
        value: function emulation() {
          return !1;
        },
      },
      {
        key: "supported",
        value: function supported() {
          return this.options.sockjs !== null;
        },
      },
      {
        key: "initialize",
        value: function initialize(s, e) {
          (this._transport = new this.options.sockjs(
            this.endpoint,
            null,
            this.options.sockjsOptions
          )),
            (this._transport.onopen = function () {
              e.onOpen();
            }),
            (this._transport.onerror = function (t) {
              e.onError(t);
            }),
            (this._transport.onclose = function (t) {
              e.onClose(t);
            }),
            (this._transport.onmessage = function (t) {
              e.onMessage(t.data);
            });
        },
      },
      {
        key: "close",
        value: function close() {
          this._transport.close();
        },
      },
      {
        key: "send",
        value: function send(s) {
          this._transport.send(s);
        },
      },
    ]);

    return U;
  })();

  var E = /*#__PURE__*/ (function () {
    function E(s, e) {
      _classCallCheck(this, E);

      (this.endpoint = s), (this.options = e), (this._transport = null);
    }

    _createClass(E, [
      {
        key: "name",
        value: function name() {
          return "websocket";
        },
      },
      {
        key: "subName",
        value: function subName() {
          return "websocket";
        },
      },
      {
        key: "emulation",
        value: function emulation() {
          return !1;
        },
      },
      {
        key: "supported",
        value: function supported() {
          return (
            this.options.websocket !== void 0 && this.options.websocket !== null
          );
        },
      },
      {
        key: "initialize",
        value: function initialize(s, e) {
          var t = "";
          s === "protobuf" && (t = "centrifuge-protobuf"),
            t !== ""
              ? (this._transport = new this.options.websocket(this.endpoint, t))
              : (this._transport = new this.options.websocket(this.endpoint)),
          s === "protobuf" && (this._transport.binaryType = "arraybuffer"),
            (this._transport.onopen = function () {
              e.onOpen();
            }),
            (this._transport.onerror = function (n) {
              e.onError(n);
            }),
            (this._transport.onclose = function (n) {
              e.onClose(n);
            }),
            (this._transport.onmessage = function (n) {
              e.onMessage(n.data);
            });
        },
      },
      {
        key: "close",
        value: function close() {
          this._transport.close();
        },
      },
      {
        key: "send",
        value: function send(s) {
          this._transport.send(s);
        },
      },
    ]);

    return E;
  })();

  var A = /*#__PURE__*/ (function () {
    function A(s, e) {
      _classCallCheck(this, A);

      (this.endpoint = s),
        (this.options = e),
        (this._abortController = null),
        (this._utf8decoder = new TextDecoder()),
        (this._protocol = "json");
    }

    _createClass(A, [
      {
        key: "name",
        value: function name() {
          return "http_stream";
        },
      },
      {
        key: "subName",
        value: function subName() {
          return "http_stream";
        },
      },
      {
        key: "emulation",
        value: function emulation() {
          return !0;
        },
      },
      {
        key: "_handleErrors",
        value: function _handleErrors(s) {
          if (!s.ok) throw new Error(s.status);
          return s;
        },
      },
      {
        key: "_fetchEventTarget",
        value: function _fetchEventTarget(s, e, t) {
          var n = new EventTarget();
          return (
            s.options
              .fetch(e, t)
              .then(s._handleErrors)
              .then(function (r) {
                n.dispatchEvent(new Event("open"));
                var a = "",
                  c = 0,
                  l = new Uint8Array(),
                  b = r.body.getReader();
                return new s.options.readableStream({
                  start: function start(m) {
                    function w() {
                      return b
                        .read()
                        .then(function (_ref) {
                          var h = _ref.done,
                            _ = _ref.value;

                          if (h) {
                            n.dispatchEvent(new Event("close")), m.close();
                            return;
                          }

                          try {
                            if (s._protocol === "json")
                              for (
                                a += s._utf8decoder.decode(_);
                                c < a.length;

                              ) {
                                if (a[c] === "\n") {
                                  var f = a.substring(0, c);
                                  n.dispatchEvent(
                                    new MessageEvent("message", {
                                      data: f,
                                    })
                                  ),
                                    (a = a.substring(c + 1)),
                                    (c = 0);
                                } else ++c;
                              }
                            else {
                              var _f = new Uint8Array(l.length + _.length);

                              for (_f.set(l), _f.set(_, l.length), l = _f; ; ) {
                                var d = s.options.decoder.decodeReply(l);

                                if (d.ok) {
                                  var P = l.slice(0, d.pos);
                                  n.dispatchEvent(
                                    new MessageEvent("message", {
                                      data: P,
                                    })
                                  ),
                                    (l = l.slice(d.pos));
                                  continue;
                                }

                                break;
                              }
                            }
                          } catch (f) {
                            n.dispatchEvent(
                              new Event("error", {
                                detail: f,
                              })
                            ),
                              n.dispatchEvent(new Event("close")),
                              m.close();
                            return;
                          }

                          w();
                        })
                        ["catch"](function (h) {
                        n.dispatchEvent(
                          new Event("error", {
                            detail: h,
                          })
                        ),
                          n.dispatchEvent(new Event("close")),
                          m.close();
                      });
                    }

                    return w();
                  },
                });
              })
              ["catch"](function (r) {
              n.dispatchEvent(
                new Event("error", {
                  detail: r,
                })
              ),
                n.dispatchEvent(new Event("close"));
            }),
              n
          );
        },
      },
      {
        key: "supported",
        value: function supported() {
          return (
            this.options.fetch !== null &&
            this.options.readableStream !== null &&
            typeof TextDecoder != "undefined" &&
            typeof AbortController != "undefined" &&
            typeof EventTarget != "undefined" &&
            typeof Event != "undefined" &&
            typeof MessageEvent != "undefined" &&
            typeof Error != "undefined"
          );
        },
      },
      {
        key: "initialize",
        value: function initialize(s, e, t) {
          var _this8 = this;

          (this._protocol = s), (this._abortController = new AbortController());
          var n, i;
          s === "json"
            ? ((n = {
              Accept: "application/json",
              "Content-Type": "application/json",
            }),
              (i = t))
            : ((n = {
              Accept: "application/octet-stream",
              "Content-Type": "application/octet-stream",
            }),
              (i = t));

          var r = {
              method: "POST",
              headers: n,
              body: i,
              mode: "cors",
              credentials: "same-origin",
              cache: "no-cache",
              signal: this._abortController.signal,
            },
            a = this._fetchEventTarget(this, this.endpoint, r);

          a.addEventListener("open", function () {
            e.onOpen();
          }),
            a.addEventListener("error", function (c) {
              _this8._abortController.abort(), e.onError(c);
            }),
            a.addEventListener("close", function () {
              _this8._abortController.abort(),
                e.onClose({
                  code: 4,
                  reason: "connection closed",
                });
            }),
            a.addEventListener("message", function (c) {
              e.onMessage(c.data);
            });
        },
      },
      {
        key: "close",
        value: function close() {
          this._abortController.abort();
        },
      },
      {
        key: "send",
        value: function send(s, e, t) {
          var n,
            i,
            r = {
              session: e,
              node: t,
              data: s,
            };
          this._protocol === "json"
            ? ((n = {
              "Content-Type": "application/json",
            }),
              (i = JSON.stringify(r)))
            : ((n = {
              "Content-Type": "application/octet-stream",
            }),
              (i = this.options.encoder.encodeEmulationRequest(r)));
          var a = this.options.fetch,
            c = {
              method: "POST",
              headers: n,
              body: i,
              mode: "cors",
              credentials: "same-origin",
              cache: "no-cache",
            };
          a(this.options.emulationEndpoint, c);
        },
      },
    ]);

    return A;
  })();

  var M = /*#__PURE__*/ (function () {
    function M(s, e) {
      _classCallCheck(this, M);

      (this.endpoint = s),
        (this.options = e),
        (this._protocol = "json"),
        (this._transport = null),
        (this._onClose = null);
    }

    _createClass(M, [
      {
        key: "name",
        value: function name() {
          return "sse";
        },
      },
      {
        key: "subName",
        value: function subName() {
          return "sse";
        },
      },
      {
        key: "emulation",
        value: function emulation() {
          return !0;
        },
      },
      {
        key: "supported",
        value: function supported() {
          return (
            this.options.eventsource !== null && this.options.fetch !== null
          );
        },
      },
      {
        key: "initialize",
        value: function initialize(s, e, t) {
          var n;
          window && window.document && window.document.baseURI
            ? (n = new URL(this.endpoint, window.document.baseURI))
            : (n = new URL(this.endpoint)),
            n.searchParams.append("cf_connect", t);
          var i = {},
            r = new this.options.eventsource(n.toString(), i);
          this._transport = r;
          var a = this;
          (r.onopen = function () {
            e.onOpen();
          }),
            (r.onerror = function (c) {
              r.close(),
                e.onError(c),
                e.onClose({
                  code: 4,
                  reason: "connection closed",
                });
            }),
            (r.onmessage = function (c) {
              e.onMessage(c.data);
            }),
            (a._onClose = function () {
              e.onClose({
                code: 4,
                reason: "connection closed",
              });
            });
        },
      },
      {
        key: "close",
        value: function close() {
          this._transport.close(), this._onClose !== null && this._onClose();
        },
      },
      {
        key: "send",
        value: function send(s, e, t) {
          var n = {
              session: e,
              node: t,
              data: s,
            },
            i = {
              "Content-Type": "application/json",
            },
            r = JSON.stringify(n),
            a = this.options.fetch,
            c = {
              method: "POST",
              headers: i,
              body: r,
              mode: "cors",
              credentials: "same-origin",
              cache: "no-cache",
            };
          a(this.options.emulationEndpoint, c);
        },
      },
    ]);

    return M;
  })();

  var N = /*#__PURE__*/ (function () {
    function N(s, e) {
      _classCallCheck(this, N);

      (this.endpoint = s),
        (this.options = e),
        (this._transport = null),
        (this._stream = null),
        (this._writer = null),
        (this._utf8decoder = new TextDecoder()),
        (this._protocol = "json");
    }

    _createClass(N, [
      {
        key: "name",
        value: function name() {
          return "webtransport";
        },
      },
      {
        key: "subName",
        value: function subName() {
          return "webtransport";
        },
      },
      {
        key: "emulation",
        value: function emulation() {
          return !1;
        },
      },
      {
        key: "supported",
        value: function supported() {
          return (
            this.options.webtransport !== void 0 &&
            this.options.webtransport !== null
          );
        },
      },
      {
        key: "initialize",
        value: function initialize(s, e) {
          return T(
            this,
            null,
            /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
              var t, n, i;
              return _regeneratorRuntime().wrap(
                function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        window &&
                        window.document &&
                        window.document.baseURI
                          ? (t = new URL(
                            this.endpoint,
                            window.document.baseURI
                          ))
                          : (t = new URL(this.endpoint)),
                        s === "protobuf" &&
                        t.searchParams.append("cf_protocol", "protobuf"),
                          (this._protocol = s);
                        n = new EventTarget();
                        (this._transport = new this.options.webtransport(
                          t.toString()
                        )),
                          this._transport.closed
                            .then(function () {
                              e.onClose({
                                code: 4,
                                reason: "connection closed",
                              });
                            })
                            ["catch"](function () {
                            e.onClose({
                              code: 4,
                              reason: "connection closed",
                            });
                          });
                        _context.prev = 3;
                        _context.next = 6;
                        return this._transport.ready;

                      case 6:
                        _context.next = 12;
                        break;

                      case 8:
                        _context.prev = 8;
                        _context.t0 = _context["catch"](3);
                        this.close();
                        return _context.abrupt("return");

                      case 12:
                        _context.prev = 12;
                        _context.next = 15;
                        return this._transport.createBidirectionalStream();

                      case 15:
                        i = _context.sent;
                        _context.next = 22;
                        break;

                      case 18:
                        _context.prev = 18;
                        _context.t1 = _context["catch"](12);
                        this.close();
                        return _context.abrupt("return");

                      case 22:
                        (this._stream = i),
                          (this._writer = this._stream.writable.getWriter()),
                          n.addEventListener("close", function () {
                            e.onClose({
                              code: 4,
                              reason: "connection closed",
                            });
                          }),
                          n.addEventListener("message", function (r) {
                            e.onMessage(r.data);
                          }),
                          this._startReading(n),
                          e.onOpen();

                      case 23:
                      case "end":
                        return _context.stop();
                    }
                  }
                },
                _callee,
                this,
                [
                  [3, 8],
                  [12, 18],
                ]
              );
            })
          );
        },
      },
      {
        key: "_startReading",
        value: function _startReading(s) {
          return T(
            this,
            null,
            /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2() {
              var e, t, n, i, _yield$e$read, r, a, c, _c, l, b;

              return _regeneratorRuntime().wrap(
                function _callee2$(_context2) {
                  while (1) {
                    switch ((_context2.prev = _context2.next)) {
                      case 0:
                        (e = this._stream.readable.getReader()),
                          (t = ""),
                          (n = 0),
                          (i = new Uint8Array());
                        _context2.prev = 1;

                      case 2:
                        _context2.next = 4;
                        return e.read();

                      case 4:
                        _yield$e$read = _context2.sent;
                        r = _yield$e$read.done;
                        a = _yield$e$read.value;

                        if (!(a.length > 0)) {
                          _context2.next = 22;
                          break;
                        }

                        if (!(this._protocol === "json")) {
                          _context2.next = 12;
                          break;
                        }

                        for (t += this._utf8decoder.decode(a); n < t.length; ) {
                          if (t[n] === "\n") {
                            c = t.substring(0, n);
                            s.dispatchEvent(
                              new MessageEvent("message", {
                                data: c,
                              })
                            ),
                              (t = t.substring(n + 1)),
                              (n = 0);
                          } else ++n;
                        }

                        _context2.next = 22;
                        break;

                      case 12:
                        _c = new Uint8Array(i.length + a.length);
                        _c.set(i), _c.set(a, i.length), (i = _c);

                      case 14:
                        l = this.options.decoder.decodeReply(i);

                        if (!l.ok) {
                          _context2.next = 19;
                          break;
                        }

                        b = i.slice(0, l.pos);
                        s.dispatchEvent(
                          new MessageEvent("message", {
                            data: b,
                          })
                        ),
                          (i = i.slice(l.pos));
                        return _context2.abrupt("continue", 20);

                      case 19:
                        return _context2.abrupt("break", 22);

                      case 20:
                        _context2.next = 14;
                        break;

                      case 22:
                        if (!r) {
                          _context2.next = 24;
                          break;
                        }

                        return _context2.abrupt("break", 26);

                      case 24:
                        _context2.next = 2;
                        break;

                      case 26:
                        _context2.next = 31;
                        break;

                      case 28:
                        _context2.prev = 28;
                        _context2.t0 = _context2["catch"](1);
                        s.dispatchEvent(new Event("close"));

                      case 31:
                      case "end":
                        return _context2.stop();
                    }
                  }
                },
                _callee2,
                this,
                [[1, 28]]
              );
            })
          );
        },
      },
      {
        key: "close",
        value: function close() {
          return T(
            this,
            null,
            /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3() {
              return _regeneratorRuntime().wrap(
                function _callee3$(_context3) {
                  while (1) {
                    switch ((_context3.prev = _context3.next)) {
                      case 0:
                        _context3.prev = 0;
                        _context3.t0 = this._writer;

                        if (!_context3.t0) {
                          _context3.next = 5;
                          break;
                        }

                        _context3.next = 5;
                        return this._writer.close();

                      case 5:
                        this._transport.close();

                        _context3.next = 10;
                        break;

                      case 8:
                        _context3.prev = 8;
                        _context3.t1 = _context3["catch"](0);

                      case 10:
                      case "end":
                        return _context3.stop();
                    }
                  }
                },
                _callee3,
                this,
                [[0, 8]]
              );
            })
          );
        },
      },
      {
        key: "send",
        value: function send(s) {
          return T(
            this,
            null,
            /*#__PURE__*/ _regeneratorRuntime().mark(function _callee4() {
              var e;
              return _regeneratorRuntime().wrap(
                function _callee4$(_context4) {
                  while (1) {
                    switch ((_context4.prev = _context4.next)) {
                      case 0:
                        this._protocol === "json"
                          ? (e = new TextEncoder().encode(s + "\n"))
                          : (e = s);
                        _context4.prev = 1;
                        _context4.next = 4;
                        return this._writer.write(e);

                      case 4:
                        _context4.next = 9;
                        break;

                      case 6:
                        _context4.prev = 6;
                        _context4.t0 = _context4["catch"](1);
                        this.close();

                      case 9:
                      case "end":
                        return _context4.stop();
                    }
                  }
                },
                _callee4,
                this,
                [[1, 6]]
              );
            })
          );
        },
      },
    ]);

    return N;
  })();

  var z = /*#__PURE__*/ (function () {
      function z() {
        _classCallCheck(this, z);
      }

      _createClass(z, [
        {
          key: "encodeCommands",
          value: function encodeCommands(s) {
            return s
              .map(function (e) {
                return JSON.stringify(e);
              })
              .join("\n");
          },
        },
      ]);

      return z;
    })(),
    W = /*#__PURE__*/ (function () {
      function W() {
        _classCallCheck(this, W);
      }

      _createClass(W, [
        {
          key: "decodeReplies",
          value: function decodeReplies(s) {
            return s
              .trim()
              .split("\n")
              .map(function (e) {
                return JSON.parse(e);
              });
          },
        },
      ]);

      return W;
    })();

  var he = X(H()),
    we = {
      protocol: "json",
      token: null,
      getToken: null,
      data: null,
      debug: !1,
      name: "js",
      version: "",
      fetch: null,
      readableStream: null,
      websocket: null,
      eventsource: null,
      sockjs: null,
      sockjsOptions: {},
      emulationEndpoint: "/emulation",
      minReconnectDelay: 500,
      maxReconnectDelay: 2e4,
      timeout: 5e3,
      maxServerPingDelay: 1e4,
    },
    C = /*#__PURE__*/ (function (_he$default) {
      _inherits(C, _he$default);

      var _super2 = _createSuper(C);

      function C(e, t) {
        var _this9;

        _classCallCheck(this, C);

        _this9 = _super2.call(this);
        _this9._reconnectTimeout = null;
        _this9._refreshTimeout = null;
        _this9._serverPingTimeout = null;
        (_this9.state = "disconnected"),
          (_this9._endpoint = e),
          (_this9._emulation = !1),
          (_this9._transports = []),
          (_this9._currentTransportIndex = 0),
          (_this9._triedAllTransports = !1),
          (_this9._transportWasOpen = !1),
          (_this9._transport = null),
          (_this9._transportClosed = !0),
          (_this9._encoder = null),
          (_this9._decoder = null),
          (_this9._reconnectTimeout = null),
          (_this9._reconnectAttempts = 0),
          (_this9._client = null),
          (_this9._session = ""),
          (_this9._node = ""),
          (_this9._subs = {}),
          (_this9._serverSubs = {}),
          (_this9._commandId = 0),
          (_this9._commands = []),
          (_this9._batching = !1),
          (_this9._refreshRequired = !1),
          (_this9._refreshTimeout = null),
          (_this9._callbacks = {}),
          (_this9._token = void 0),
          (_this9._dispatchPromise = Promise.resolve()),
          (_this9._serverPing = 0),
          (_this9._serverPingTimeout = null),
          (_this9._sendPong = !1),
          (_this9._promises = {}),
          (_this9._promiseId = 0),
          (_this9._debugEnabled = !1),
          (_this9._config = q(q({}, we), t)),
          _this9._configure(),
          _this9._debugEnabled
            ? (_this9.on("state", function (n) {
              _this9._debug("client state", n.oldState, "->", n.newState);
            }),
              _this9.on("error", function (n) {
                _this9._debug("client error", n);
              }))
            : _this9.on("error", function () {
              Function.prototype();
            });
        return _this9;
      }

      _createClass(C, [
        {
          key: "newSubscription",
          value: function newSubscription(e, t) {
            if (this.getSubscription(e) !== null)
              throw new Error(
                "Subscription to the channel " + e + " already exists"
              );
            var n = new I(this, e, t);
            return (this._subs[e] = n), n;
          },
        },
        {
          key: "getSubscription",
          value: function getSubscription(e) {
            return this._getSub(e);
          },
        },
        {
          key: "removeSubscription",
          value: function removeSubscription(e) {
            !e ||
            (e.state !== "unsubscribed" && e.unsubscribe(),
              this._removeSubscription(e));
          },
        },
        {
          key: "subscriptions",
          value: function subscriptions() {
            return this._subs;
          },
        },
        {
          key: "ready",
          value: function ready(e) {
            var _this10 = this;

            return this.state === "disconnected"
              ? Promise.reject({
                code: p.clientDisconnected,
                message: "client disconnected",
              })
              : this.state === "connected"
                ? Promise.resolve()
                : new Promise(function (t, n) {
                  var i = {
                    resolve: t,
                    reject: n,
                  };
                  e &&
                  (i.timeout = setTimeout(function () {
                    n({
                      code: p.timeout,
                      message: "timeout",
                    });
                  }, e)),
                    (_this10._promises[_this10._nextPromiseId()] = i);
                });
          },
        },
        {
          key: "connect",
          value: function connect() {
            if (this._isConnected()) {
              this._debug("connect called when already connected");

              return;
            }

            if (this._isConnecting()) {
              this._debug("connect called when already connecting");

              return;
            }

            (this._reconnectAttempts = 0), this._startConnecting();
          },
        },
        {
          key: "disconnect",
          value: function disconnect() {
            this._disconnect(O.disconnectCalled, "disconnect called", !1);
          },
        },
        {
          key: "send",
          value: function send(e) {
            var t = {
                send: {
                  data: e,
                },
              },
              n = this;
            return this._methodCall().then(function () {
              return n._transportSendCommands([t])
                ? Promise.resolve()
                : Promise.reject(
                  n._createErrorObject(
                    p.transportWriteError,
                    "transport write error"
                  )
                );
            });
          },
        },
        {
          key: "rpc",
          value: function rpc(e, t) {
            var n = {
                rpc: {
                  method: e,
                  data: t,
                },
              },
              i = this;
            return this._methodCall().then(function () {
              return i._callPromise(n, function (r) {
                return {
                  data: r.rpc.data,
                };
              });
            });
          },
        },
        {
          key: "publish",
          value: function publish(e, t) {
            var n = {
                publish: {
                  channel: e,
                  data: t,
                },
              },
              i = this;
            return this._methodCall().then(function () {
              return i._callPromise(n, function () {
                return {};
              });
            });
          },
        },
        {
          key: "history",
          value: function history(e, t) {
            var n = {
                history: this._getHistoryRequest(e, t),
              },
              i = this;
            return this._methodCall().then(function () {
              return i._callPromise(n, function (r) {
                var a = r.history,
                  c = [];
                if (a.publications)
                  for (var l = 0; l < a.publications.length; l++) {
                    c.push(i._getPublicationContext(e, a.publications[l]));
                  }
                return {
                  publications: c,
                  epoch: a.epoch || "",
                  offset: a.offset || 0,
                };
              });
            });
          },
        },
        {
          key: "presence",
          value: function presence(e) {
            var t = {
                presence: {
                  channel: e,
                },
              },
              n = this;
            return this._methodCall().then(function () {
              return n._callPromise(t, function (i) {
                return {
                  clients: i.presence.presence,
                };
              });
            });
          },
        },
        {
          key: "presenceStats",
          value: function presenceStats(e) {
            var t = {
                presence_stats: {
                  channel: e,
                },
              },
              n = this;
            return this._methodCall().then(function () {
              return n._callPromise(t, function (i) {
                var r = i.presence_stats;
                return {
                  numUsers: r.num_users,
                  numClients: r.num_clients,
                };
              });
            });
          },
        },
        {
          key: "startBatching",
          value: function startBatching() {
            this._batching = !0;
          },
        },
        {
          key: "stopBatching",
          value: function stopBatching() {
            var e = this;
            Promise.resolve().then(function () {
              Promise.resolve().then(function () {
                (e._batching = !1), e._flush();
              });
            });
          },
        },
        {
          key: "_debug",
          value: function _debug() {
            for (
              var _len = arguments.length, e = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              e[_key] = arguments[_key];
            }

            !this._debugEnabled || ce("debug", e);
          },
        },
        {
          key: "_setFormat",
          value: function _setFormat(e) {
            if (!this._formatOverride(e)) {
              if (e === "protobuf")
                throw new Error(
                  "not implemented by JSON-only Centrifuge client, use client with Protobuf support"
                );
              (this._encoder = new z()), (this._decoder = new W());
            }
          },
        },
        {
          key: "_formatOverride",
          value: function _formatOverride(e) {
            return !1;
          },
        },
        {
          key: "_configure",
          value: function _configure() {
            if (!("Promise" in window))
              throw new Error("Promise polyfill required");
            if (!this._endpoint)
              throw new Error("endpoint configuration required");
            if (
              this._config.protocol !== "json" &&
              this._config.protocol !== "protobuf"
            )
              throw new Error("unsupported protocol " + this._config.protocol);
            if (
              (this._config.token !== null &&
              (this._token = this._config.token),
                this._setFormat("json"),
              this._config.protocol === "protobuf" &&
              this._setFormat("protobuf"),
              (this._config.debug === !0 ||
                (typeof localStorage != "undefined" &&
                  localStorage.getItem("centrifuge.debug"))) &&
              (this._debugEnabled = !0),
                this._debug("config", this._config),
              typeof this._endpoint != "string")
            )
              if (
                _typeof(this._endpoint) == "object" &&
                this._endpoint instanceof Array
              ) {
                (this._transports = this._endpoint), (this._emulation = !0);

                for (var e in this._transports) {
                  var t = this._transports[e];
                  if (!t.endpoint || !t.transport)
                    throw new Error("malformed transport configuration");
                  var n = t.transport;
                  if (
                    [
                      "websocket",
                      "http_stream",
                      "sse",
                      "sockjs",
                      "webtransport",
                    ].indexOf(n) < 0
                  )
                    throw new Error("unsupported transport name: " + n);
                }
              } else
                throw new Error(
                  "unsupported url configuration type: only string or array of objects are supported"
                );
          },
        },
        {
          key: "_setState",
          value: function _setState(e) {
            if (this.state !== e) {
              var t = this.state;
              return (
                (this.state = e),
                  this.emit("state", {
                    newState: e,
                    oldState: t,
                  }),
                  !0
              );
            }

            return !1;
          },
        },
        {
          key: "_isDisconnected",
          value: function _isDisconnected() {
            return this.state === "disconnected";
          },
        },
        {
          key: "_isConnecting",
          value: function _isConnecting() {
            return this.state === "connecting";
          },
        },
        {
          key: "_isConnected",
          value: function _isConnected() {
            return this.state === "connected";
          },
        },
        {
          key: "_nextCommandId",
          value: function _nextCommandId() {
            return ++this._commandId;
          },
        },
        {
          key: "_getReconnectDelay",
          value: function _getReconnectDelay() {
            var e = S(
              this._reconnectAttempts,
              this._config.minReconnectDelay,
              this._config.maxReconnectDelay
            );
            return (this._reconnectAttempts += 1), e;
          },
        },
        {
          key: "_clearOutgoingRequests",
          value: function _clearOutgoingRequests() {
            for (var e in this._callbacks) {
              if (this._callbacks.hasOwnProperty(e)) {
                var t = this._callbacks[e];
                clearTimeout(t.timeout);
                var n = t.errback;
                if (!n) continue;
                n({
                  error: this._createErrorObject(
                    p.connectionClosed,
                    "connection closed"
                  ),
                });
              }
            }

            this._callbacks = {};
          },
        },
        {
          key: "_clearConnectedState",
          value: function _clearConnectedState() {
            (this._client = null),
              this._clearServerPingTimeout(),
              this._clearRefreshTimeout();

            for (var e in this._subs) {
              if (!this._subs.hasOwnProperty(e)) continue;
              var t = this._subs[e];
              t.state === "subscribed" &&
              t._setSubscribing(L.transportClosed, "transport closed");
            }

            for (var _e2 in this._serverSubs) {
              this._serverSubs.hasOwnProperty(_e2) &&
              this.emit("subscribing", {
                channel: _e2,
              });
            }
          },
        },
        {
          key: "_handleWriteError",
          value: function _handleWriteError(e) {
            var _iterator3 = _createForOfIteratorHelper(e),
              _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                var t = _step3.value;
                var n = t.id;
                if (!(n in this._callbacks)) continue;
                var i = this._callbacks[n];
                clearTimeout(this._callbacks[n].timeout),
                  delete this._callbacks[n],
                  i.errback({
                    error: this._createErrorObject(
                      p.transportWriteError,
                      "transport write error"
                    ),
                  });
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          },
        },
        {
          key: "_transportSendCommands",
          value: function _transportSendCommands(e) {
            if (!e.length) return !0;
            if (!this._transport) return !1;

            try {
              this._transport.send(
                this._encoder.encodeCommands(e),
                this._session,
                this._node
              );
            } catch (t) {
              return (
                this._debug("error writing commands", t),
                  this._handleWriteError(e),
                  !1
              );
            }

            return !0;
          },
        },
        {
          key: "_initializeTransport",
          value: function _initializeTransport() {
            var e;
            this._config.websocket !== null
              ? (e = this._config.websocket)
              : (typeof window.WebSocket != "function" &&
                _typeof(window.WebSocket) != "object") ||
              (e = window.WebSocket);
            var t = null;
            this._config.sockjs !== null
              ? (t = this._config.sockjs)
              : typeof window.SockJS != "undefined" &&
              (t = window.SockJS);
            var n = null;
            this._config.eventsource !== null
              ? (n = this._config.eventsource)
              : typeof window.EventSource != "undefined" &&
              (n = window.EventSource);
            var i = null;
            this._config.fetch !== null
              ? (i = this._config.fetch)
              : typeof window.fetch != "undefined" &&
              (i = window.fetch);
            var r = null;

            if (
              (this._config.readableStream !== null
                ? (r = this._config.readableStream)
                : typeof window.ReadableStream != "undefined" &&
                (r = window.ReadableStream),
                this._emulation)
            ) {
              this._currentTransportIndex >= this._transports.length &&
              ((this._triedAllTransports = !0),
                (this._currentTransportIndex = 0));
              var h = 0;

              for (;;) {
                if (h >= this._transports.length)
                  throw new Error("no supported transport found");
                var _ = this._transports[this._currentTransportIndex],
                  f = _.transport,
                  d = _.endpoint;

                if (f === "websocket") {
                  if (
                    (this._debug("trying websocket transport"),
                      (this._transport = new E(d, {
                        websocket: e,
                      })),
                      !this._transport.supported())
                  ) {
                    this._debug("websocket transport not available"),
                      this._currentTransportIndex++,
                      h++;
                    continue;
                  }
                } else if (f === "webtransport") {
                  if (
                    (this._debug("trying webtransport transport"),
                      (this._transport = new N(d, {
                        webtransport: window.WebTransport,
                        decoder: this._decoder,
                        encoder: this._encoder,
                      })),
                      !this._transport.supported())
                  ) {
                    this._debug("webtransport transport not available"),
                      this._currentTransportIndex++,
                      h++;
                    continue;
                  }
                } else if (f === "http_stream") {
                  if (
                    (this._debug("trying http_stream transport"),
                      (this._transport = new A(d, {
                        fetch: i,
                        readableStream: r,
                        emulationEndpoint: this._config.emulationEndpoint,
                        decoder: this._decoder,
                        encoder: this._encoder,
                      })),
                      !this._transport.supported())
                  ) {
                    this._debug("http_stream transport not available"),
                      this._currentTransportIndex++,
                      h++;
                    continue;
                  }
                } else if (f === "sse") {
                  if (
                    (this._debug("trying sse transport"),
                      (this._transport = new M(d, {
                        eventsource: n,
                        fetch: i,
                        emulationEndpoint: this._config.emulationEndpoint,
                      })),
                      !this._transport.supported())
                  ) {
                    this._debug("sse transport not available"),
                      this._currentTransportIndex++,
                      h++;
                    continue;
                  }
                } else if (f === "sockjs") {
                  if (
                    (this._debug("trying sockjs"),
                      (this._transport = new U(d, {
                        sockjs: t,
                        sockjsOptions: this._config.sockjsOptions,
                      })),
                      !this._transport.supported())
                  ) {
                    this._debug("sockjs transport not available"),
                      this._currentTransportIndex++,
                      h++;
                    continue;
                  }
                } else throw new Error("unknown transport " + f);

                break;
              }
            } else {
              if (ae(this._endpoint, "http"))
                throw new Error(
                  "Provide explicit transport endpoints configuration in case of using HTTP (i.e. using array of TransportEndpoint instead of a single string), or use ws(s):// scheme in an endpoint if you aimed using WebSocket transport"
                );
              if (
                (this._debug("client will use websocket"),
                  (this._transport = new E(this._endpoint, {
                    websocket: e,
                  })),
                  !this._transport.supported())
              )
                throw new Error("WebSocket not available");
            }

            var a = this,
              c,
              l = !1,
              b = !0;
            this._transport.name() === "sse" && (b = !1);
            var m = [];

            if (this._transport.emulation()) {
              var _h = a._sendConnect(!0);

              if ((m.push(_h), b)) {
                var _2 = a._sendSubscribeCommands(!0, !0);

                for (var _f2 in _2) {
                  m.push(_2[_f2]);
                }
              }
            }

            var w = this._encoder.encodeCommands(m);

            this._transport.initialize(
              this._config.protocol,
              {
                onOpen: function onOpen() {
                  (l = !0),
                    (c = a._transport.subName()),
                    a._debug(c, "transport open"),
                    (a._transportWasOpen = !0),
                    (a._transportClosed = !1),
                  !a._transport.emulation() &&
                  (a.startBatching(),
                    a._sendConnect(!1),
                  b && a._sendSubscribeCommands(!0, !1),
                    a.stopBatching());
                },
                onError: function onError(h) {
                  a._debug("transport level error", h);
                },
                onClose: function onClose(h) {
                  a._debug(a._transport.name(), "transport closed"),
                    (a._transportClosed = !0);
                  var _ = "connection closed",
                    f = !0,
                    d = 0;
                  if (
                    (h && "code" in h && h.code && (d = h.code), h && h.reason)
                  )
                    try {
                      var g = JSON.parse(h.reason);
                      (_ = g.reason), (f = g.reconnect);
                    } catch (g) {
                      (_ = h.reason),
                      ((d >= 3500 && d < 4e3) || (d >= 4500 && d < 5e3)) &&
                      (f = !1);
                    }
                  d < 3e3
                    ? (d === 1009
                      ? ((d = O.messageSizeLimit),
                        (_ = "message size limit exceeded"),
                        (f = !1))
                      : ((d = v.transportClosed), (_ = "transport closed")),
                    a._emulation &&
                    !a._transportWasOpen &&
                    (a._currentTransportIndex++,
                    a._currentTransportIndex >= a._transports.length &&
                    ((a._triedAllTransports = !0),
                      (a._currentTransportIndex = 0))))
                    : (a._transportWasOpen = !0);
                  var P = !1;

                  if (
                    (a._emulation &&
                    !a._transportWasOpen &&
                    !a._triedAllTransports &&
                    (P = !0),
                    a._isConnecting() &&
                    !l &&
                    a.emit("error", {
                      type: "transport",
                      error: {
                        code: p.transportClosed,
                        message: "transport closed",
                      },
                      transport: a._transport.name(),
                    }),
                      a._disconnect(d, _, f),
                      a._isConnecting())
                  ) {
                    var _g = a._getReconnectDelay();

                    P && (_g = 0),
                      a._debug("reconnect after " + _g + " milliseconds"),
                      (a._reconnectTimeout = setTimeout(function () {
                        a._startReconnecting();
                      }, _g));
                  }
                },
                onMessage: function onMessage(h) {
                  a._dataReceived(h);
                },
              },
              w
            );
          },
        },
        {
          key: "_sendConnect",
          value: function _sendConnect(e) {
            var t = this._constructConnectCommand(),
              n = this;

            return (
              this._call(t, e).then(
                function (i) {
                  var r = i.reply.connect;
                  n._connectResponse(r), i.next && i.next();
                },
                function (i) {
                  n._connectError(i.error), i.next && i.next();
                }
              ),
                t
            );
          },
        },
        {
          key: "_startReconnecting",
          value: function _startReconnecting() {
            if (!this._isConnecting()) return;

            if (
              !(
                this._refreshRequired ||
                (!this._token && this._config.getToken !== null)
              )
            ) {
              this._initializeTransport();

              return;
            }

            var t = this;

            this._getToken()
              .then(function (n) {
                if (!!t._isConnecting()) {
                  if (!n) {
                    t._failUnauthorized();

                    return;
                  }

                  (t._token = n),
                    t._debug("connection token refreshed"),
                    t._initializeTransport();
                }
              })
              ["catch"](function (n) {
              if (!t._isConnecting()) return;
              t.emit("error", {
                type: "connectToken",
                error: {
                  code: p.clientConnectToken,
                  message: n !== void 0 ? n.toString() : "",
                },
              });

              var i = t._getReconnectDelay();

              t._debug(
                "error on connection token refresh, reconnect after " +
                i +
                " milliseconds",
                n
              ),
                (t._reconnectTimeout = setTimeout(function () {
                  t._startReconnecting();
                }, i));
            });
          },
        },
        {
          key: "_connectError",
          value: function _connectError(e) {
            this.state === "connecting" &&
            (e.code === 109 && (this._refreshRequired = !0),
              e.code < 100 || e.temporary === !0 || e.code === 109
                ? (this.emit("error", {
                  type: "connect",
                  error: e,
                }),
                this._transport &&
                !this._transportClosed &&
                ((this._transportClosed = !0), this._transport.close()))
                : this._disconnect(e.code, e.message, !1));
          },
        },
        {
          key: "_constructConnectCommand",
          value: function _constructConnectCommand() {
            var e = {};
            this._token && (e.token = this._token),
            this._config.data && (e.data = this._config.data),
            this._config.name && (e.name = this._config.name),
            this._config.version && (e.version = this._config.version);
            var t = {},
              n = !1;

            for (var i in this._serverSubs) {
              if (
                this._serverSubs.hasOwnProperty(i) &&
                this._serverSubs[i].recoverable
              ) {
                n = !0;
                var r = {
                  recover: !0,
                };
                this._serverSubs[i].offset &&
                (r.offset = this._serverSubs[i].offset),
                this._serverSubs[i].epoch &&
                (r.epoch = this._serverSubs[i].epoch),
                  (t[i] = r);
              }
            }

            return (
              n && (e.subs = t),
                {
                  connect: e,
                }
            );
          },
        },
        {
          key: "_getHistoryRequest",
          value: function _getHistoryRequest(e, t) {
            var n = {
              channel: e,
            };
            return (
              t !== void 0 &&
              (t.since &&
              ((n.since = {
                offset: t.since.offset,
              }),
              t.since.epoch && (n.since.epoch = t.since.epoch)),
              t.limit !== void 0 && (n.limit = t.limit),
              t.reverse === !0 && (n.reverse = !0)),
                n
            );
          },
        },
        {
          key: "_methodCall",
          value: function _methodCall() {
            var _this11 = this;

            return this._isConnected()
              ? Promise.resolve()
              : new Promise(function (e, t) {
                var n = setTimeout(function () {
                  t({
                    code: p.timeout,
                    message: "timeout",
                  });
                }, _this11._config.timeout);
                _this11._promises[_this11._nextPromiseId()] = {
                  timeout: n,
                  resolve: e,
                  reject: t,
                };
              });
          },
        },
        {
          key: "_callPromise",
          value: function _callPromise(e, t) {
            var _this12 = this;

            return new Promise(function (n, i) {
              _this12._call(e, !1).then(
                function (r) {
                  n(t(r.reply)), r.next && r.next();
                },
                function (r) {
                  i(r.error), r.next && r.next();
                }
              );
            });
          },
        },
        {
          key: "_dataReceived",
          value: function _dataReceived(e) {
            var _this13 = this;

            this._serverPing > 0 && this._waitServerPing();

            var t = this._decoder.decodeReplies(e);

            this._dispatchPromise = this._dispatchPromise.then(function () {
              var n;
              (_this13._dispatchPromise = new Promise(function (i) {
                n = i;
              })),
                _this13._dispatchSynchronized(t, n);
            });
          },
        },
        {
          key: "_dispatchSynchronized",
          value: function _dispatchSynchronized(e, t) {
            var _this14 = this;

            var n = Promise.resolve();

            var _loop2 = function _loop2(i) {
              e.hasOwnProperty(i) &&
              (n = n.then(function () {
                return _this14._dispatchReply(e[i]);
              }));
            };

            for (var i in e) {
              _loop2(i);
            }

            n = n.then(function () {
              t();
            });
          },
        },
        {
          key: "_dispatchReply",
          value: function _dispatchReply(e) {
            var t,
              n = new Promise(function (r) {
                t = r;
              });
            if (e == null)
              return (
                this._debug("dispatch: got undefined or null reply"), t(), n
              );
            var i = e.id;
            return (
              i && i > 0
                ? this._handleReply(e, t)
                : e.push
                  ? this._handlePush(e.push, t)
                  : this._handleServerPing(t),
                n
            );
          },
        },
        {
          key: "_call",
          value: function _call(e, t) {
            var _this15 = this;

            return new Promise(function (n, i) {
              (e.id = _this15._nextCommandId()),
                _this15._registerCall(e.id, n, i),
              t || _this15._addCommand(e);
            });
          },
        },
        {
          key: "_startConnecting",
          value: function _startConnecting() {
            this._debug("start connecting"),
            this._setState("connecting") &&
            this.emit("connecting", {
              code: v.connectCalled,
              reason: "connect called",
            }),
              (this._client = null),
              this._startReconnecting();
          },
        },
        {
          key: "_disconnect",
          value: function _disconnect(e, t, n) {
            if (this._isDisconnected()) return;
            var i = this.state,
              r = {
                code: e,
                reason: t,
              },
              a = !1;
            n
              ? (a = this._setState("connecting"))
              : ((a = this._setState("disconnected")),
                this._rejectPromises({
                  code: p.clientDisconnected,
                  message: "disconnected",
                })),
              this._clearOutgoingRequests(),
            i === "connecting" && this._clearReconnectTimeout(),
            i === "connected" && this._clearConnectedState(),
            a &&
            (this._isConnecting()
              ? this.emit("connecting", r)
              : this.emit("disconnected", r)),
            this._transport &&
            !this._transportClosed &&
            ((this._transportClosed = !0), this._transport.close());
          },
        },
        {
          key: "_failUnauthorized",
          value: function _failUnauthorized() {
            this._disconnect(O.unauthorized, "unauthorized", !1);
          },
        },
        {
          key: "_getToken",
          value: function _getToken() {
            if ((this._debug("get connection token"), !this._config.getToken))
              throw new Error("provide a function to get connection token");
            return this._config.getToken({});
          },
        },
        {
          key: "_refresh",
          value: function _refresh() {
            var e = this._client,
              t = this;

            this._getToken()
              .then(function (n) {
                if (e !== t._client) return;

                if (!n) {
                  t._failUnauthorized();

                  return;
                }

                if (
                  ((t._token = n),
                    t._debug("connection token refreshed"),
                    !t._isConnected())
                )
                  return;
                var i = {
                  refresh: {
                    token: t._token,
                  },
                };

                t._call(i, !1).then(
                  function (r) {
                    var a = r.reply.refresh;
                    t._refreshResponse(a), r.next && r.next();
                  },
                  function (r) {
                    t._refreshError(r.error), r.next && r.next();
                  }
                );
              })
              ["catch"](function (n) {
              t.emit("error", {
                type: "refreshToken",
                error: {
                  code: p.clientRefreshToken,
                  message: n !== void 0 ? n.toString() : "",
                },
              }),
                (t._refreshTimeout = setTimeout(function () {
                  return t._refresh();
                }, t._getRefreshRetryDelay()));
            });
          },
        },
        {
          key: "_refreshError",
          value: function _refreshError(e) {
            var _this16 = this;

            e.code < 100 || e.temporary === !0
              ? (this.emit("error", {
                type: "refresh",
                error: e,
              }),
                (this._refreshTimeout = setTimeout(function () {
                  return _this16._refresh();
                }, this._getRefreshRetryDelay())))
              : this._disconnect(e.code, e.message, !1);
          },
        },
        {
          key: "_getRefreshRetryDelay",
          value: function _getRefreshRetryDelay() {
            return S(0, 5e3, 1e4);
          },
        },
        {
          key: "_refreshResponse",
          value: function _refreshResponse(e) {
            var _this17 = this;

            this._refreshTimeout &&
            (clearTimeout(this._refreshTimeout),
              (this._refreshTimeout = null)),
            e.expires &&
            ((this._client = e.client),
              (this._refreshTimeout = setTimeout(function () {
                return _this17._refresh();
              }, x(e.ttl))));
          },
        },
        {
          key: "_removeSubscription",
          value: function _removeSubscription(e) {
            e !== null && delete this._subs[e.channel];
          },
        },
        {
          key: "_unsubscribe",
          value: function _unsubscribe(e) {
            if (!this._isConnected()) return;
            var n = {
                unsubscribe: {
                  channel: e.channel,
                },
              },
              i = this;

            this._call(n, !1).then(
              function (r) {
                r.next && r.next();
              },
              function (r) {
                r.next && r.next(),
                  i._disconnect(v.unsubscribeError, "unsubscribe error", !0);
              }
            );
          },
        },
        {
          key: "_getSub",
          value: function _getSub(e) {
            var t = this._subs[e];
            return t || null;
          },
        },
        {
          key: "_isServerSub",
          value: function _isServerSub(e) {
            return this._serverSubs[e] !== void 0;
          },
        },
        {
          key: "_sendSubscribeCommands",
          value: function _sendSubscribeCommands(e, t) {
            var n = [];

            for (var i in this._subs) {
              if (!this._subs.hasOwnProperty(i)) continue;
              var r = this._subs[i];

              if (r._inflight !== !0 && r.state === "subscribing") {
                var a = r._subscribe(e, t);

                a && n.push(a);
              }
            }

            return n;
          },
        },
        {
          key: "_connectResponse",
          value: function _connectResponse(e) {
            var _this18 = this;

            if (
              ((this._transportWasOpen = !0),
                (this._reconnectAttempts = 0),
                (this._refreshRequired = !1),
                this._isConnected())
            )
              return;
            (this._client = e.client),
              this._setState("connected"),
            this._refreshTimeout && clearTimeout(this._refreshTimeout),
            e.expires &&
            (this._refreshTimeout = setTimeout(function () {
              return _this18._refresh();
            }, x(e.ttl))),
              (this._session = e.session),
              (this._node = e.node),
              this.startBatching(),
              this._sendSubscribeCommands(!1, !1),
              this.stopBatching();
            var t = {
              client: e.client,
              transport: this._transport.subName(),
            };
            e.data && (t.data = e.data),
              this.emit("connected", t),
              this._resolvePromises(),
              this._processServerSubs(e.subs || {}),
              e.ping && e.ping > 0
                ? ((this._serverPing = e.ping * 1e3),
                  (this._sendPong = e.pong === !0),
                  this._waitServerPing())
                : (this._serverPing = 0);
          },
        },
        {
          key: "_processServerSubs",
          value: function _processServerSubs(e) {
            for (var t in e) {
              if (!e.hasOwnProperty(t)) continue;
              var n = e[t];
              this._serverSubs[t] = {
                offset: n.offset,
                epoch: n.epoch,
                recoverable: n.recoverable || !1,
              };

              var i = this._getSubscribeContext(t, n);

              this.emit("subscribed", i);
            }

            for (var _t in e) {
              if (!e.hasOwnProperty(_t)) continue;
              var _n = e[_t];

              if (_n.recovered) {
                var _i = _n.publications;
                if (_i && _i.length > 0)
                  for (var r in _i) {
                    _i.hasOwnProperty(r) && this._handlePublication(_t, _i[r]);
                  }
              }
            }

            for (var _t2 in this._serverSubs) {
              !this._serverSubs.hasOwnProperty(_t2) ||
              e[_t2] ||
              (this.emit("unsubscribed", {
                channel: _t2,
              }),
                delete this._serverSubs[_t2]);
            }
          },
        },
        {
          key: "_clearRefreshTimeout",
          value: function _clearRefreshTimeout() {
            this._refreshTimeout !== null &&
            (clearTimeout(this._refreshTimeout),
              (this._refreshTimeout = null));
          },
        },
        {
          key: "_clearReconnectTimeout",
          value: function _clearReconnectTimeout() {
            this._reconnectTimeout !== null &&
            (clearTimeout(this._reconnectTimeout),
              (this._reconnectTimeout = null));
          },
        },
        {
          key: "_clearServerPingTimeout",
          value: function _clearServerPingTimeout() {
            this._serverPingTimeout !== null &&
            (clearTimeout(this._serverPingTimeout),
              (this._serverPingTimeout = null));
          },
        },
        {
          key: "_waitServerPing",
          value: function _waitServerPing() {
            var _this19 = this;

            this._config.maxServerPingDelay !== 0 &&
            (!this._isConnected() ||
              (this._clearServerPingTimeout(),
                (this._serverPingTimeout = setTimeout(function () {
                  !_this19._isConnected() ||
                  _this19._disconnect(v.noPing, "no ping", !0);
                }, this._serverPing + this._config.maxServerPingDelay))));
          },
        },
        {
          key: "_getSubscribeContext",
          value: function _getSubscribeContext(e, t) {
            var n = {
              channel: e,
              positioned: !1,
              recoverable: !1,
              wasRecovering: !1,
              recovered: !1,
            };
            t.recovered && (n.recovered = !0),
            t.positioned && (n.positioned = !0),
            t.recoverable && (n.recoverable = !0),
            t.was_recovering && (n.wasRecovering = !0);
            var i = "";
            "epoch" in t && (i = t.epoch);
            var r = 0;
            return (
              "offset" in t && (r = t.offset),
              (n.positioned || n.recoverable) &&
              (n.streamPosition = {
                offset: r,
                epoch: i,
              }),
              t.data && (n.data = t.data),
                n
            );
          },
        },
        {
          key: "_handleReply",
          value: function _handleReply(e, t) {
            var n = e.id;

            if (!(n in this._callbacks)) {
              t();
              return;
            }

            var i = this._callbacks[n];

            if (
              (clearTimeout(this._callbacks[n].timeout),
                delete this._callbacks[n],
                ue(e))
            ) {
              var r = i.errback;

              if (!r) {
                t();
                return;
              }

              var a = e.error;
              r({
                error: a,
                next: t,
              });
            } else {
              var _r = i.callback;
              if (!_r) return;

              _r({
                reply: e,
                next: t,
              });
            }
          },
        },
        {
          key: "_handleJoin",
          value: function _handleJoin(e, t) {
            var n = this._getSub(e);

            if (!n) {
              if (this._isServerSub(e)) {
                var i = {
                  channel: e,
                  info: this._getJoinLeaveContext(t.info),
                };
                this.emit("join", i);
              }

              return;
            }

            n._handleJoin(t);
          },
        },
        {
          key: "_handleLeave",
          value: function _handleLeave(e, t) {
            var n = this._getSub(e);

            if (!n) {
              if (this._isServerSub(e)) {
                var i = {
                  channel: e,
                  info: this._getJoinLeaveContext(t.info),
                };
                this.emit("leave", i);
              }

              return;
            }

            n._handleLeave(t);
          },
        },
        {
          key: "_handleUnsubscribe",
          value: function _handleUnsubscribe(e, t) {
            var n = this._getSub(e);

            if (!n) {
              this._isServerSub(e) &&
              (delete this._serverSubs[e],
                this.emit("unsubscribed", {
                  channel: e,
                }));
              return;
            }

            t.code < 2500
              ? n._setUnsubscribed(t.code, t.reason, !1)
              : n._setSubscribing(t.code, t.reason);
          },
        },
        {
          key: "_handleSubscribe",
          value: function _handleSubscribe(e, t) {
            (this._serverSubs[e] = {
              offset: t.offset,
              epoch: t.epoch,
              recoverable: t.recoverable || !1,
            }),
              this.emit("subscribed", this._getSubscribeContext(e, t));
          },
        },
        {
          key: "_handleDisconnect",
          value: function _handleDisconnect(e) {
            var t = e.code,
              n = !0;
            ((t >= 3500 && t < 4e3) || (t >= 4500 && t < 5e3)) && (n = !1),
              this._disconnect(t, e.reason, n);
          },
        },
        {
          key: "_getPublicationContext",
          value: function _getPublicationContext(e, t) {
            var n = {
              channel: e,
              data: t.data,
            };
            return (
              t.offset && (n.offset = t.offset),
              t.info && (n.info = this._getJoinLeaveContext(t.info)),
              t.tags && (n.tags = t.tags),
                n
            );
          },
        },
        {
          key: "_getJoinLeaveContext",
          value: function _getJoinLeaveContext(e) {
            var t = {
              client: e.client,
              user: e.user,
            };
            return (
              e.conn_info && (t.connInfo = e.conn_info),
              e.chan_info && (t.chanInfo = e.chan_info),
                t
            );
          },
        },
        {
          key: "_handlePublication",
          value: function _handlePublication(e, t) {
            var n = this._getSub(e);

            if (!n) {
              if (this._isServerSub(e)) {
                var i = this._getPublicationContext(e, t);

                this.emit("publication", i),
                t.offset !== void 0 &&
                (this._serverSubs[e].offset = t.offset);
              }

              return;
            }

            n._handlePublication(t);
          },
        },
        {
          key: "_handleMessage",
          value: function _handleMessage(e) {
            this.emit("message", {
              data: e.data,
            });
          },
        },
        {
          key: "_handleServerPing",
          value: function _handleServerPing(e) {
            if (this._sendPong) {
              var t = {};

              this._transportSendCommands([t]);
            }

            e();
          },
        },
        {
          key: "_handlePush",
          value: function _handlePush(e, t) {
            var n = e.channel;
            e.pub
              ? this._handlePublication(n, e.pub)
              : e.message
                ? this._handleMessage(e.message)
                : e.join
                  ? this._handleJoin(n, e.join)
                  : e.leave
                    ? this._handleLeave(n, e.leave)
                    : e.unsubscribe
                      ? this._handleUnsubscribe(n, e.unsubscribe)
                      : e.subscribe
                        ? this._handleSubscribe(n, e.subscribe)
                        : e.disconnect && this._handleDisconnect(e.disconnect),
              t();
          },
        },
        {
          key: "_flush",
          value: function _flush() {
            var e = this._commands.slice(0);

            (this._commands = []), this._transportSendCommands(e);
          },
        },
        {
          key: "_createErrorObject",
          value: function _createErrorObject(e, t, n) {
            var i = {
              code: e,
              message: t,
            };
            return n && (i.temporary = !0), i;
          },
        },
        {
          key: "_registerCall",
          value: function _registerCall(e, t, n) {
            var _this20 = this;

            (this._callbacks[e] = {
              callback: t,
              errback: n,
              timeout: null,
            }),
              (this._callbacks[e].timeout = setTimeout(function () {
                delete _this20._callbacks[e],
                K(n) &&
                n({
                  error: _this20._createErrorObject(p.timeout, "timeout"),
                });
              }, this._config.timeout));
          },
        },
        {
          key: "_addCommand",
          value: function _addCommand(e) {
            this._batching
              ? this._commands.push(e)
              : this._transportSendCommands([e]);
          },
        },
        {
          key: "_nextPromiseId",
          value: function _nextPromiseId() {
            return ++this._promiseId;
          },
        },
        {
          key: "_resolvePromises",
          value: function _resolvePromises() {
            for (var e in this._promises) {
              this._promises[e].timeout &&
              clearTimeout(this._promises[e].timeout),
                this._promises[e].resolve(),
                delete this._promises[e];
            }
          },
        },
        {
          key: "_rejectPromises",
          value: function _rejectPromises(e) {
            for (var t in this._promises) {
              this._promises[t].timeout &&
              clearTimeout(this._promises[t].timeout),
                this._promises[t].reject(e),
                delete this._promises[t];
            }
          },
        },
      ]);

      return C;
    })(he["default"]);

  C.SubscriptionState = D;
  C.State = j;
  window.Centrifuge = C;
})();
