var array, _Emitter;

array = require('utila/scripts/js/lib/array');

module.exports = _Emitter = (function() {
  function _Emitter() {
    this._listeners = {};
    this._listenersForAnyEvent = [];
    this._disabledEmitters = {};
  }

  _Emitter.prototype.on = function(eventName, listener) {
    if (this._listeners[eventName] == null) {
      this._listeners[eventName] = [];
    }
    this._listeners[eventName].push(listener);
    return this;
  };

  _Emitter.prototype.onAnyEvent = function(listener) {
    this._listenersForAnyEvent.push(listener);
    return this;
  };

  _Emitter.prototype.removeEvent = function(eventName, listener) {
    if (this._listeners[eventName] == null) {
      return this;
    }
    array.pluckOneItem(this._listeners[eventName], listener);
    return this;
  };

  _Emitter.prototype.removeListeners = function(eventName) {
    if (this._listeners[eventName] == null) {
      return this;
    }
    this._listeners[eventName].length = 0;
    return this;
  };

  _Emitter.prototype.removeAllListeners = function() {
    var listeners, name, _ref;
    _ref = this._listeners;
    for (name in _ref) {
      listeners = _ref[name];
      listeners.length = 0;
    }
    return this;
  };

  _Emitter.prototype._emit = function(eventName, data) {
    var listener, _i, _j, _len, _len1, _ref, _ref1;
    _ref = this._listenersForAnyEvent;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      listener = _ref[_i];
      listener(data, eventName);
    }
    if (this._listeners[eventName] == null) {
      return;
    }
    _ref1 = this._listeners[eventName];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      listener = _ref1[_j];
      listener(data);
    }
  };

  _Emitter.prototype._throttleEmitterMethod = function(fnName, time) {
    var lastCallArgs, originalFn, pend, pending, runIt, timer;
    if (time == null) {
      time = 1000;
    }
    originalFn = this[fnName];
    if (typeof originalFn !== 'function') {
      throw Error("this class does not have a method called '" + fnName + "'");
    }
    lastCallArgs = null;
    pending = false;
    timer = null;
    this[fnName] = (function(_this) {
      return function() {
        lastCallArgs = arguments;
        return pend();
      };
    })(this);
    pend = (function(_this) {
      return function() {
        if (pending) {
          clearTimeout(timer);
        }
        timer = setTimeout(runIt, time);
        return pending = true;
      };
    })(this);
    return runIt = (function(_this) {
      return function() {
        pending = false;
        return originalFn.apply(_this, lastCallArgs);
      };
    })(this);
  };

  _Emitter.prototype._disableEmitter = function(fnName) {
    if (this._disabledEmitters[fnName] != null) {
      throw Error("" + fnName + " is already a disabled emitter");
    }
    this._disabledEmitters[fnName] = this[fnName];
    return this[fnName] = function() {};
  };

  _Emitter.prototype._enableEmitter = function(fnName) {
    var fn;
    fn = this._disabledEmitters[fnName];
    if (fn == null) {
      throw Error("" + fnName + " is not a disabled emitter");
    }
    this[fnName] = fn;
    return delete this._disabledEmitters[fnName];
  };

  return _Emitter;

})();

/*
//@ sourceMappingURL=_Emitter.map
*/
