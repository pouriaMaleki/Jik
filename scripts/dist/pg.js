!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.pg=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var Transformation, copyStack, emptyStack;

emptyStack = function() {
  var a;
  a = new Float32Array(20);
  a[3] = 1;
  a[4] = 1;
  a[5] = 1;
  a[6] = 10000;
  a.movement = a.subarray(0, 3);
  a.scale = a.subarray(3, 6);
  a.rotation = a.subarray(7, 10);
  a.localMovement = a.subarray(10, 13);
  a.localRotation = a.subarray(13, 16);
  a.rotate3d = a.subarray(16, 20);
  return a;
};

copyStack = function(from, to) {
  to.set(from);
};

module.exports = Transformation = (function() {
  Transformation._emptyStack = emptyStack;

  function Transformation() {
    this._main = emptyStack();
    this._temp = emptyStack();
    this._current = this._main;
    this._has = {
      movement: false,
      perspective: false,
      rotation: false,
      rotate3d: false,
      scale: false,
      localMovement: false,
      localRotation: false
    };
    this._tempMode = false;
  }

  Transformation.prototype.temporarily = function() {
    copyStack(this._main, this._temp);
    this._current = this._temp;
    this._tempMode = true;
    return this;
  };

  Transformation.prototype.commit = function() {
    if (this._tempMode) {
      copyStack(this._temp, this._main);
      this._current = this._main;
      this._tempMode = false;
    }
    return this;
  };

  Transformation.prototype.rollBack = function() {
    if (this._tempMode) {
      this._current = this._main;
      this._tempMode = false;
    }
    return this;
  };


  /*
  	Movement
   */

  Transformation.prototype.resetMovement = function() {
    this._has.movement = false;
    this._current[0] = 0;
    this._current[1] = 0;
    this._current[2] = 0;
    return this;
  };

  Transformation.prototype.getMovement = function() {
    return this._current.movement;
  };

  Transformation.prototype.moveTo = function(x, y, z) {
    this._has.movement = true;
    this._current[0] = x;
    this._current[1] = y;
    this._current[2] = z;
    return this;
  };

  Transformation.prototype.moveXTo = function(x) {
    this._has.movement = true;
    this._current[0] = x;
    return this;
  };

  Transformation.prototype.moveYTo = function(y) {
    this._has.movement = true;
    this._current[1] = y;
    return this;
  };

  Transformation.prototype.moveZTo = function(z) {
    this._has.movement = true;
    this._current[2] = z;
    return this;
  };

  Transformation.prototype.move = function(x, y, z) {
    this._has.movement = true;
    this._current[0] += x;
    this._current[1] += y;
    this._current[2] += z;
    return this;
  };

  Transformation.prototype.moveX = function(x) {
    this._has.movement = true;
    this._current[0] += x;
    return this;
  };

  Transformation.prototype.moveY = function(y) {
    this._has.movement = true;
    this._current[1] += y;
    return this;
  };

  Transformation.prototype.moveZ = function(z) {
    this._has.movement = true;
    this._current[2] += z;
    return this;
  };


  /*
  	Scale
   */

  Transformation.prototype.resetScale = function() {
    this._has.scale = false;
    this._current[3] = 1;
    this._current[4] = 1;
    this._current[5] = 1;
    return this;
  };

  Transformation.prototype.getScale = function() {
    return this._current.scale;
  };

  Transformation.prototype.scaleTo = function(x, y, z) {
    this._has.scale = true;
    this._current[3] = x;
    this._current[4] = y;
    this._current[5] = z;
    return this;
  };

  Transformation.prototype.scaleXTo = function(x) {
    this._has.scale = true;
    this._current[3] = x;
    return this;
  };

  Transformation.prototype.scaleYTo = function(y) {
    this._has.scale = true;
    this._current[4] = y;
    return this;
  };

  Transformation.prototype.scaleZTo = function(z) {
    this._has.scale = true;
    this._current[5] = z;
    return this;
  };

  Transformation.prototype.scale = function(x, y, z) {
    this._has.scale = true;
    this._current[3] *= x;
    this._current[4] *= y;
    this._current[5] *= z;
    return this;
  };

  Transformation.prototype.scaleAllTo = function(x) {
    if (x === 1) {
      this._has.scale = false;
    } else {
      this._has.scale = true;
    }
    this._current[3] = this._current[4] = this._current[5] = x;
    return this;
  };

  Transformation.prototype.scaleX = function(x) {
    this._has.scale = true;
    this._current[3] *= x;
    return this;
  };

  Transformation.prototype.scaleY = function(y) {
    this._has.scale = true;
    this._current[4] *= y;
    return this;
  };

  Transformation.prototype.scaleZ = function(z) {
    this._has.scale = true;
    this._current[5] *= z;
    return this;
  };


  /*
  	Perspective
   */

  Transformation.prototype.resetPerspective = function() {
    this._current[6] = 0;
    this._has.perspective = false;
    return this;
  };

  Transformation.prototype.perspective = function(d) {
    this._current[6] = d;
    if (d) {
      this._has.perspective = true;
    }
    return this;
  };

  Transformation.prototype.getPerspective = function() {
    return this._current[6];
  };


  /*
  	Rotation
   */

  Transformation.prototype.resetRotation = function() {
    this._has.rotation = false;
    this._current[7] = 0;
    this._current[8] = 0;
    this._current[9] = 0;
    return this;
  };

  Transformation.prototype.getRotation = function() {
    return this._current.rotation;
  };

  Transformation.prototype.rotateTo = function(x, y, z) {
    this._has.rotation = true;
    this._current[7] = x;
    this._current[8] = y;
    this._current[9] = z;
    return this;
  };

  Transformation.prototype.rotateXTo = function(x) {
    this._has.rotation = true;
    this._current[7] = x;
    return this;
  };

  Transformation.prototype.rotateYTo = function(y) {
    this._has.rotation = true;
    this._current[8] = y;
    return this;
  };

  Transformation.prototype.rotateZTo = function(z) {
    this._has.rotation = true;
    this._current[9] = z;
    return this;
  };

  Transformation.prototype.rotate = function(x, y, z) {
    this._has.rotation = true;
    this._current[7] += x;
    this._current[8] += y;
    this._current[9] += z;
    return this;
  };

  Transformation.prototype.rotateX = function(x) {
    this._has.rotation = true;
    this._current[7] += x;
    return this;
  };

  Transformation.prototype.rotateY = function(y) {
    this._has.rotation = true;
    this._current[8] += y;
    return this;
  };

  Transformation.prototype.rotateZ = function(z) {
    this._has.rotation = true;
    this._current[9] += z;
    return this;
  };


  /*
  	rotate3d
   */

  Transformation.prototype.rotate3d = function(x, y, z, amount) {
    this._has.rotate3d = true;
    this._current[16] = x;
    this._current[17] = y;
    this._current[18] = z;
    this._current[19] = amount;
    return this;
  };

  Transformation.prototype.getRotate3d = function() {
    return this._current.rotate3d;
  };


  /*
  	Local Movement
   */

  Transformation.prototype.resetLocalMovement = function() {
    this._has.localMovement = false;
    this._current[10] = 0;
    this._current[11] = 0;
    this._current[12] = 0;
    return this;
  };

  Transformation.prototype.getLocalMovement = function() {
    return this._current.localMovement;
  };

  Transformation.prototype.localMoveTo = function(x, y, z) {
    this._has.localMovement = true;
    this._current[10] = x;
    this._current[11] = y;
    this._current[12] = z;
    return this;
  };

  Transformation.prototype.localMoveXTo = function(x) {
    this._has.localMovement = true;
    this._current[10] = x;
    return this;
  };

  Transformation.prototype.localMoveYTo = function(y) {
    this._has.localMovement = true;
    this._current[11] = y;
    return this;
  };

  Transformation.prototype.localMoveZTo = function(z) {
    this._has.localMovement = true;
    this._current[12] = z;
    return this;
  };

  Transformation.prototype.localMove = function(x, y, z) {
    this._has.localMovement = true;
    this._current[10] += x;
    this._current[11] += y;
    this._current[12] += z;
    return this;
  };

  Transformation.prototype.localMoveX = function(x) {
    this._has.localMovement = true;
    this._current[10] += x;
    return this;
  };

  Transformation.prototype.localMoveY = function(y) {
    this._has.localMovement = true;
    this._current[11] += y;
    return this;
  };

  Transformation.prototype.localMoveZ = function(z) {
    this._has.localMovement = true;
    this._current[12] += z;
    return this;
  };


  /*
  	Local Rotation
   */

  Transformation.prototype.resetLocalRotation = function() {
    this._has.localRotation = false;
    this._current[13] = 0;
    this._current[14] = 0;
    this._current[15] = 0;
    return this;
  };

  Transformation.prototype.getLocalRotation = function() {
    return this._current.localRotation;
  };

  Transformation.prototype.localRotateTo = function(x, y, z) {
    this._has.localRotation = true;
    this._current[13] = x;
    this._current[14] = y;
    this._current[15] = z;
    return this;
  };

  Transformation.prototype.localRotateXTo = function(x) {
    this._has.localRotation = true;
    this._current[13] = x;
    return this;
  };

  Transformation.prototype.localRotateYTo = function(y) {
    this._has.localRotation = true;
    this._current[14] = y;
    return this;
  };

  Transformation.prototype.localRotateZTo = function(z) {
    this._has.localRotation = true;
    this._current[15] = z;
    return this;
  };

  Transformation.prototype.localRotate = function(x, y, z) {
    this._has.localRotation = true;
    this._current[13] += x;
    this._current[14] += y;
    this._current[15] += z;
    return this;
  };

  Transformation.prototype.localRotateX = function(x) {
    this._has.localRotation = true;
    this._current[13] += x;
    return this;
  };

  Transformation.prototype.localRotateY = function(y) {
    this._has.localRotation = true;
    this._current[14] += y;
    return this;
  };

  Transformation.prototype.localRotateZ = function(z) {
    this._has.localRotation = true;
    this._current[15] += z;
    return this;
  };

  Transformation.prototype.resetAll = function() {
    this.resetMovement();
    this.resetScale();
    this.resetPerspective();
    this.resetRotation();
    this.resetLocalMovement();
    return this.resetLocalRotation();
  };

  return Transformation;

})();


},{}],2:[function(_dereq_,module,exports){
// Generated by CoffeeScript 1.6.3
var CSSColor;

module.exports = CSSColor = (function() {
  function CSSColor(h, s, l) {
    this.h = h;
    this.s = s;
    this.l = l;
  }

  CSSColor.prototype.setHue = function(deg) {
    this.h = deg / 360;
    return this;
  };

  CSSColor.prototype.rotateHue = function(deg) {
    deg /= 360;
    this.h = this.h + deg;
    return this;
  };

  CSSColor.prototype.setSaturation = function(amount) {
    this.s = amount / 100;
    return this;
  };

  CSSColor.prototype.saturate = function(amount) {
    this.s += amount / 100;
    return this;
  };

  CSSColor.prototype.setLightness = function(amount) {
    this.l = amount / 100;
    return this;
  };

  CSSColor.prototype.lighten = function(amount) {
    this.l += amount / 100;
    return this;
  };

  CSSColor.prototype.toCss = function() {
    var h, l, s;
    h = Math.round(this.h * 360);
    s = Math.round(this.s * 100);
    l = Math.round(this.l * 100);
    return "hsl(" + h + ", " + s + "%, " + l + "%)";
  };

  CSSColor.prototype.fromHsl = function(h, s, l) {
    this.h = h / 360;
    this.s = s / 100;
    this.l = l / 100;
    return this;
  };

  CSSColor.prototype.toRgb = function() {
    var b, g, p, q, r;
    r = 0;
    g = 0;
    b = 0;
    if (this.s === 0) {
      r = g = b = this.l;
    } else {
      q = (this.l < 0.5 ? this.l * (1 + this.s) : this.l + this.s - this.l * this.s);
      p = 2 * this.l - q;
      r = CSSColor._hue2rgb(p, q, this.h + 1 / 3);
      g = CSSColor._hue2rgb(p, q, this.h);
      b = CSSColor._hue2rgb(p, q, this.h - 1 / 3);
    }
    return [r * 255, g * 255, b * 255];
  };

  CSSColor.prototype.fromRgb = function(r, g, b) {
    var d, h, l, max, min, s;
    r /= 255;
    g /= 255;
    b /= 255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    h = 0;
    s = 0;
    l = (max + min) / 2;
    if (max !== min) {
      d = max - min;
      s = (l > 0.5 ? d / (2 - max - min) : d / (max + min));
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
      }
      h /= 6;
    }
    this.h = h;
    this.s = s;
    this.l = l;
    return this;
  };

  CSSColor.prototype.clone = function() {
    return new CSSColor(this.h, this.s, this.l);
  };

  CSSColor.hsl = function(h, s, l) {
    return new CSSColor(h, s, l);
  };

  CSSColor.rgb = function(r, g, b) {
    var d, h, l, max, min, s;
    r /= 255;
    g /= 255;
    b /= 255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    h = 0;
    s = 0;
    l = (max + min) / 2;
    if (max !== min) {
      d = max - min;
      s = (l > 0.5 ? d / (2 - max - min) : d / (max + min));
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
      }
      h /= 6;
    }
    return new CSSColor(h, s, l);
  };

  CSSColor._hue2rgb = function(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  };

  return CSSColor;

})();

},{}],3:[function(_dereq_,module,exports){
// Generated by CoffeeScript 1.6.3
var CSSFilter, blur, brightness, contrast, filters, grayscale, hueRotate, invert, opacity, saturate, sepia;

blur = _dereq_('./filter/blur');

brightness = _dereq_('./filter/brightness');

contrast = _dereq_('./filter/contrast');

grayscale = _dereq_('./filter/grayscale');

hueRotate = _dereq_('./filter/hueRotate');

invert = _dereq_('./filter/invert');

opacity = _dereq_('./filter/opacity');

saturate = _dereq_('./filter/saturate');

sepia = _dereq_('./filter/sepia');

filters = {
  blur: blur,
  brightness: brightness,
  contrast: contrast,
  grayscale: grayscale,
  hueRotate: hueRotate,
  invert: invert,
  opacity: opacity,
  saturate: saturate,
  sepia: sepia
};

module.exports = CSSFilter = (function() {
  function CSSFilter() {
    this._filters = {};
  }

  CSSFilter.prototype.setBlur = function(d) {
    this._filters.blur = d;
    return this;
  };

  CSSFilter.prototype.setBrightness = function(d) {
    this._filters.brightness = d;
    return this;
  };

  CSSFilter.prototype.setContrast = function(d) {
    this._filters.contrast = d;
    return this;
  };

  CSSFilter.prototype.setGrayscale = function(d) {
    this._filters.grayscale = d;
    return this;
  };

  CSSFilter.prototype.rotateHue = function(d) {
    this._filters.hueRotate = d;
    return this;
  };

  CSSFilter.prototype.invertColors = function(d) {
    this._filters.invert = d;
    return this;
  };

  CSSFilter.prototype.setOpacity = function(d) {
    this._filters.opacity = d;
    return this;
  };

  CSSFilter.prototype.setSaturation = function(d) {
    this._filters.saturate = d;
    return this;
  };

  CSSFilter.prototype.setSepia = function(d) {
    this._filters.sepia = d;
    return this;
  };

  CSSFilter.prototype.toCss = function() {
    var key, str, value, _ref;
    str = '';
    _ref = this._filters;
    for (key in _ref) {
      value = _ref[key];
      str += filters[key].toCss(value) + ' ';
    }
    return str;
  };

  return CSSFilter;

})();

},{"./filter/blur":4,"./filter/brightness":5,"./filter/contrast":6,"./filter/grayscale":7,"./filter/hueRotate":8,"./filter/invert":9,"./filter/opacity":10,"./filter/saturate":11,"./filter/sepia":12}],4:[function(_dereq_,module,exports){
// Generated by CoffeeScript 1.6.3
var blur;

module.exports = blur = {
  toCss: function(radius) {
    return "blur(" + radius + "px)";
  }
};

},{}],5:[function(_dereq_,module,exports){
// Generated by CoffeeScript 1.6.3
var brightness;

module.exports = brightness = {
  toCss: function(amount) {
    return "brightness(" + amount + ")";
  }
};

},{}],6:[function(_dereq_,module,exports){
// Generated by CoffeeScript 1.6.3
var contrast;

module.exports = contrast = {
  toCss: function(amount) {
    return "contrast(" + amount + "%)";
  }
};

},{}],7:[function(_dereq_,module,exports){
// Generated by CoffeeScript 1.6.3
var grayscale;

module.exports = grayscale = {
  toCss: function(amount) {
    return "grayscale(" + amount + "%)";
  }
};

},{}],8:[function(_dereq_,module,exports){
// Generated by CoffeeScript 1.6.3
var hueRotate;

module.exports = hueRotate = {
  toCss: function(angle) {
    return "hue-rotate(" + angle + "deg)";
  }
};

},{}],9:[function(_dereq_,module,exports){
// Generated by CoffeeScript 1.6.3
var invert;

module.exports = invert = {
  toCss: function(amount) {
    return "invert(" + amount + "%)";
  }
};

},{}],10:[function(_dereq_,module,exports){
// Generated by CoffeeScript 1.6.3
var opacity;

module.exports = opacity = {
  toCss: function(amount) {
    return "opacity(" + amount + "%)";
  }
};

},{}],11:[function(_dereq_,module,exports){
// Generated by CoffeeScript 1.6.3
var saturate;

module.exports = saturate = {
  toCss: function(amount) {
    return "saturate(" + amount + "%)";
  }
};

},{}],12:[function(_dereq_,module,exports){
// Generated by CoffeeScript 1.6.3
var sepia;

module.exports = sepia = {
  toCss: function(amount) {
    return "sepia(" + amount + "%)";
  }
};

},{}],13:[function(_dereq_,module,exports){
var MethodChain, _Interface,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Interface = _dereq_('./_Interface');

module.exports = MethodChain = (function() {
  function MethodChain() {
    var I, _ref;
    this._methods = {};
    this._Interface = I = (function(_super) {
      __extends(I, _super);

      function I() {
        _ref = I.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return I;

    })(_Interface);
  }

  MethodChain.prototype.addMethod = function(name) {
    this._Interface.prototype[name] = function() {
      this._queue.push({
        method: name,
        args: Array.prototype.slice.call(arguments)
      });
      return this;
    };
    return this;
  };

  MethodChain.prototype.getInterface = function() {
    return new this._Interface;
  };

  MethodChain.prototype.run = function(_interface, context, transform) {
    var args, item, _i, _len, _ref;
    if (transform == null) {
      transform = null;
    }
    _ref = _interface._queue;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if (transform != null) {
        args = transform(item.args);
      } else {
        args = args;
      }
      context = context[item.method].apply(context, args);
    }
    return context;
  };

  return MethodChain;

})();


},{"./_Interface":14}],14:[function(_dereq_,module,exports){
var _Interface;

module.exports = _Interface = (function() {
  function _Interface() {
    this._queue = [];
  }

  return _Interface;

})();


},{}],15:[function(_dereq_,module,exports){
(function() {
  var Priority, array;

  array = _dereq_('utila/scripts/js/lib/array');

  module.exports = Priority = (function() {
    function Priority() {
      this._singles = [];
      this._series = [];
      this._toCancelFromEachTick = [];
    }

    Priority.prototype.onNextTick = function(fn) {
      this._singles.push(fn);
    };

    Priority.prototype.cancelNextTick = function(fn) {
      array.pluckOneItem(this._singles, fn);
    };

    Priority.prototype._callSingles = function(t) {
      var fn, toCallNow, _i, _len;
      if (this._singles.length < 1) {
        return;
      }
      toCallNow = this._singles;
      this._singles = [];
      for (_i = 0, _len = toCallNow.length; _i < _len; _i++) {
        fn = toCallNow[_i];
        fn(t);
      }
    };

    Priority.prototype.onEachTick = function(fn) {
      this._series.push(fn);
    };

    Priority.prototype.cancelEachTick = function(fn) {
      this._toCancelFromEachTick.push(fn);
    };

    Priority.prototype._callSeries = function(t) {
      var fn, toCancel, _i, _j, _len, _len1, _ref, _ref1;
      if (this._series.length < 1) {
        return;
      }
      _ref = this._toCancelFromEachTick;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        toCancel = _ref[_i];
        array.pluckOneItem(this._series, toCancel);
      }
      this._toCancelFromEachTick.length = 0;
      _ref1 = this._series;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        fn = _ref1[_j];
        fn(t);
      }
    };

    Priority.prototype.tick = function(t) {
      this._callSingles(t);
      this._callSeries(t);
    };

    return Priority;

  })();

}).call(this);

},{"utila/scripts/js/lib/array":27}],16:[function(_dereq_,module,exports){
(function() {
  var Priority, Timing, Waiter, cancelAnimationFrame, nextTick, requestAnimationFrame, _ref;

  Waiter = _dereq_('./Waiter');

  nextTick = _dereq_('./nextTick');

  Priority = _dereq_('./Priority');

  _ref = _dereq_('./raf'), requestAnimationFrame = _ref.requestAnimationFrame, cancelAnimationFrame = _ref.cancelAnimationFrame;

  module.exports = Timing = (function() {
    var self;

    self = Timing;

    Timing.requestAnimationFrame = requestAnimationFrame;

    Timing.cancelAnimationFrame = cancelAnimationFrame;

    function Timing() {
      this.nanoTime = 0;
      this.time = 0;
      this.speed = 1;
      this.tickNumber = 0;
      this._rafId = 0;
      this._waiter = new Waiter;
      this._boundLoop = (function(_this) {
        return function(t) {
          _this._loop(t);
        };
      })(this);
      this._started = false;
      this._before = new Priority;
      this._on = new Priority;
      this._after = new Priority;
    }

    Timing.prototype.nextTick = function(fn) {
      nextTick(fn);
    };

    Timing.prototype.wait = function(ms, fn) {
      var callTime;
      callTime = this.time + ms + 8;
      this._waiter.setTimeout(callTime, fn);
    };

    Timing.prototype.every = function(ms, fn) {
      this._waiter.setInterval(ms, fn, this.time);
    };

    Timing.prototype.cancelEvery = function(fn) {
      this._waiter.cancelInterval(fn);
    };

    Timing.prototype.beforeNextFrame = function(fn) {
      this._before.onNextTick(fn);
    };

    Timing.prototype.cancelBeforeNextFrame = function(fn) {
      this._before.cancelNextTick(fn);
    };

    Timing.prototype.beforeEachFrame = function(fn) {
      this._before.onEachTick(fn);
    };

    Timing.prototype.cancelBeforeEachFrame = function(fn) {
      this._before.cancelEachTick(fn);
    };

    Timing.prototype.onNextFrame = function(fn) {
      this._on.onNextTick(fn);
    };

    Timing.prototype.cancelOnNextFrame = function(fn) {
      this._on.cancelNextTick(fn);
    };

    Timing.prototype.onEachFrame = function(fn) {
      this._on.onEachTick(fn);
    };

    Timing.prototype.cancelOnEachFrame = function(fn) {
      this._on.cancelEachTick(fn);
    };

    Timing.prototype.afterNextFrame = function(fn) {
      this._after.onNextTick(fn);
    };

    Timing.prototype.cancelAfterNextFrame = function(fn) {
      this._after.cancelNextTick(fn);
    };

    Timing.prototype.afterEachFrame = function(fn) {
      this._after.onEachTick(fn);
    };

    Timing.prototype.cancelAfterEachFrame = function(fn) {
      this._after.cancelEachTick(fn);
    };

    Timing.prototype._loop = function(t) {
      this._rafId = requestAnimationFrame(this._boundLoop);
      this.tick(t);
    };

    Timing.prototype.tick = function(t) {
      this.tickNumber++;
      t = t * this.speed;
      this.nanoTime = t;
      t = parseInt(t);
      this.time = t;
      this._waiter.tick(t);
      this._before.tick(t);
      this._on.tick(t);
      this._after.tick(t);
    };

    Timing.prototype.start = function() {
      if (this._started) {
        return;
      }
      this._rafId = requestAnimationFrame(this._boundLoop);
    };

    Timing.prototype.stop = function() {
      if (!this._started) {
        return;
      }
      cancelAnimationFrame(this._rafId);
    };

    return Timing;

  })();

}).call(this);

},{"./Priority":15,"./Waiter":17,"./nextTick":18,"./raf":21}],17:[function(_dereq_,module,exports){
(function() {
  var Waiter, array, intervalPool, shouldInjectCallItem, timeoutPool;

  array = _dereq_('utila/scripts/js/lib/array');

  timeoutPool = _dereq_('./pool/timeout');

  intervalPool = _dereq_('./pool/interval');

  module.exports = Waiter = (function() {
    function Waiter() {
      this._timeouts = [];
      this._intervals = [];
      this._toRemoveFromIntervals = [];
    }

    Waiter.prototype.setTimeout = function(callTime, fn) {
      var item;
      item = timeoutPool.give(callTime, fn);
      array.injectByCallback(this._timeouts, item, shouldInjectCallItem);
    };

    Waiter.prototype.cancelTimeout = function(fn) {
      throw Error("TODO: Waiter.cancelTimeout() to be implemented");
    };

    Waiter.prototype._callTimeouts = function(t) {
      var item;
      if (this._timeouts.length < 1) {
        return;
      }
      while (this._timeouts.length) {
        item = this._timeouts[0];
        if (item.time > t) {
          return;
        }
        timeoutPool.take(item);
        this._timeouts.shift();
        item.fn(t);
      }
    };

    Waiter.prototype.tick = function(t) {
      this._callTimeouts(t);
      this._callIntervals(t);
    };

    Waiter.prototype.setInterval = function(ms, fn, currentTimeInMs) {
      this._intervals.push(intervalPool.give(ms, currentTimeInMs, 0, fn));
    };

    Waiter.prototype.cancelInterval = function(fn) {
      this._toRemoveFromIntervals.push(fn);
    };

    Waiter.prototype._callIntervals = function(t) {
      var fnToRemove, item, properTimeToCall, _i, _j, _len, _len1, _ref, _ref1;
      if (this._intervals.length < 1) {
        return;
      }
      _ref = this._toRemoveFromIntervals;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fnToRemove = _ref[_i];
        array.pluckByCallback(this._intervals, function(item) {
          if (item.fn === fnToRemove) {
            return true;
          }
          return false;
        });
      }
      _ref1 = this._intervals;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        item = _ref1[_j];
        properTimeToCall = item.from + (item.timesCalled * item.every) + item.every;
        if (properTimeToCall <= t) {
          item.fn(t);
          item.timesCalled++;
        }
      }
    };

    return Waiter;

  })();

  shouldInjectCallItem = function(itemA, itemB, itemToInject) {
    var _ref;
    if (itemA == null) {
      if (itemToInject.time <= itemB.time) {
        return true;
      }
      return false;
    }
    if (itemB == null) {
      if (itemA.time <= itemToInject.time) {
        return true;
      }
      return false;
    }
    if ((itemA.time <= (_ref = itemToInject.time) && _ref <= itemB.time)) {
      return true;
    }
    return false;
  };

}).call(this);

},{"./pool/interval":19,"./pool/timeout":20,"utila/scripts/js/lib/array":27}],18:[function(_dereq_,module,exports){
(function() {
  var nextTick;

  module.exports = nextTick = (function() {
    if ((typeof process !== "undefined" && process !== null) && typeof process.nextTick === 'function') {
      return process.nextTick;
    }
    if (typeof setImmediate === 'function') {
      return function(cb) {
        return setImmediate(cb);
      };
    }
    return function(cb) {
      return setTimeout(cb, 0);
    };
  })();

}).call(this);

},{}],19:[function(_dereq_,module,exports){
(function() {
  var intervalPool;

  module.exports = intervalPool = {
    _pool: [],
    _getNew: function(every, from, timesCalled, fn) {
      return {
        every: every,
        from: from,
        timesCalled: timesCalled,
        fn: fn
      };
    },
    give: function(every, from, timesCalled, fn) {
      var item;
      if (intervalPool._pool.length > 0) {
        item = intervalPool._pool.pop();
        item.every = every;
        item.from = from;
        item.timesCalled = timesCalled;
        item.fn = fn;
        return item;
      } else {
        return intervalPool._getNew(every, from, timesCalled, fn);
      }
    },
    take: function(item) {
      intervalPool._pool.push(item);
      return null;
    }
  };

}).call(this);

},{}],20:[function(_dereq_,module,exports){
(function() {
  var timeoutPool;

  module.exports = timeoutPool = {
    _pool: [],
    _getNew: function(time, fn) {
      return {
        time: time,
        fn: fn
      };
    },
    give: function(time, fn) {
      var item;
      if (this._pool.length > 0) {
        item = this._pool.pop();
        item.time = time;
        item.fn = fn;
        return item;
      } else {
        return this._getNew(time, fn);
      }
    },
    take: function(item) {
      this._pool.push(item);
      return null;
    }
  };

}).call(this);

},{}],21:[function(_dereq_,module,exports){
(function() {
  module.exports = {
    requestAnimationFrame: (function() {
      if (window.requestAnimationFrame) {
        return window.requestAnimationFrame.bind(window);
      }
      if (window.mozRequestAnimationFrame) {
        return window.mozRequestAnimationFrame.bind(window);
      }
      if (window.webkitRequestAnimationFrame) {
        return window.webkitRequestAnimationFrame.bind(window);
      }
      throw Error("This environment does not support requestAnimationFrame, and no, we're not gonna fall back to setTimeout()!");
    })(),
    cancelAnimationFrame: (function() {
      if (window.cancelAnimationFrame) {
        return window.cancelAnimationFrame.bind(window);
      }
      if (window.mozCancelAnimationFrame) {
        return window.mozCancelAnimationFrame.bind(window);
      }
      if (window.webkitCancelAnimationFrame) {
        return window.webkitCancelAnimationFrame.bind(window);
      }
      throw Error("This environment does not support requestAnimationFrame, and no, we're not gonna fall back to setTimeout()!");
    })()
  };

}).call(this);

},{}],22:[function(_dereq_,module,exports){
// Generated by CoffeeScript 1.6.3
/*
 * Source: http://stackoverflow.com/a/11697909/607997
 * http://codepen.io/onedayitwillmake/details/EHDmw
 * by Mario Gonzalez
*/

/*
 * Solver for cubic bezier curve with implicit control points at (0,0) and (1.0, 1.0)
*/

var UnitBezier;

module.exports = UnitBezier = (function() {
  function UnitBezier(p1x, p1y, p2x, p2y) {
    this.set(p1x, p1y, p2x, p2y);
  }

  UnitBezier.prototype.set = function(p1x, p1y, p2x, p2y) {
    this.cx = 3.0 * p1x;
    this.bx = 3.0 * (p2x - p1x) - this.cx;
    this.ax = 1.0 - this.cx - this.bx;
    this.cy = 3.0 * p1y;
    this.by = 3.0 * (p2y - p1y) - this.cy;
    this.ay = 1.0 - this.cy - this.by;
  };

  UnitBezier.epsilon = 1e-6;

  UnitBezier.prototype.sampleCurveX = function(t) {
    return ((this.ax * t + this.bx) * t + this.cx) * t;
  };

  UnitBezier.prototype.sampleCurveY = function(t) {
    return ((this.ay * t + this.by) * t + this.cy) * t;
  };

  UnitBezier.prototype.sampleCurveDerivativeX = function(t) {
    return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
  };

  UnitBezier.prototype.solveCurveX = function(x, epsilon) {
    var d2, i, t0, t1, t2, x2;
    t0 = void 0;
    t1 = void 0;
    t2 = void 0;
    x2 = void 0;
    d2 = void 0;
    i = void 0;
    t2 = x;
    i = 0;
    while (i < 8) {
      x2 = this.sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon) {
        return t2;
      }
      d2 = this.sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < epsilon) {
        break;
      }
      t2 = t2 - x2 / d2;
      i++;
    }
    t0 = 0.0;
    t1 = 1.0;
    t2 = x;
    if (t2 < t0) {
      return t0;
    }
    if (t2 > t1) {
      return t1;
    }
    while (t0 < t1) {
      x2 = this.sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon) {
        return t2;
      }
      if (x > x2) {
        t0 = t2;
      } else {
        t1 = t2;
      }
      t2 = (t1 - t0) * .5 + t0;
    }
    return t2;
  };

  UnitBezier.prototype.solve = function(x, epsilon) {
    return this.sampleCurveY(this.solveCurveX(x, epsilon));
  };

  UnitBezier.prototype.solveSimple = function(x) {
    return this.sampleCurveY(this.solveCurveX(x, 1e-6));
  };

  return UnitBezier;

})();

},{}],23:[function(_dereq_,module,exports){
// Generated by CoffeeScript 1.6.3
var UnitBezier, timingFunction;

UnitBezier = _dereq_('./UnitBezier');

module.exports = timingFunction = {
  UnitBezier: UnitBezier,
  linear: function(p) {
    return p;
  },
  define: function(name, func) {
    var _func, _name;
    if (typeof name === 'object') {
      for (_name in name) {
        _func = name[_name];
        timingFunction.define(_name, _func);
      }
      return;
    }
    return timingFunction[name] = {
      easeIn: func,
      easeOut: function(p) {
        return 1 - func(1 - p);
      },
      easeInOut: function(p) {
        if (p <= 0.5) {
          return 0.5 * func(p * 2);
        } else {
          return 0.5 * (2 - func(2 * (1 - p)));
        }
      }
    };
  },
  get: function(func) {
    var b, f, part, parts, _i, _len;
    if (func instanceof Function) {
      return func;
    } else if ((arguments[1] != null) && (arguments[2] != null) && (arguments[3] != null)) {
      b = new UnitBezier(arguments[0], arguments[1], arguments[2], arguments[3]);
      return function(p) {
        return b.solveSimple(p);
      };
    }
    if (typeof func !== 'string') {
      throw Error("func should either be a function or a string, like cubic.easeOut");
    }
    parts = func.split('.');
    f = timingFunction;
    for (_i = 0, _len = parts.length; _i < _len; _i++) {
      part = parts[_i];
      f = f[part];
    }
    if (typeof f === 'undefined') {
      throw Error("Cannot find easing function `" + func + "`");
    }
    return f;
  }
};

timingFunction.define({
  quad: function(p) {
    return Math.pow(p, 2);
  },
  cubic: function(p) {
    return Math.pow(p, 3);
  },
  quart: function(p) {
    return Math.pow(p, 4);
  },
  quint: function(p) {
    return Math.pow(p, 5);
  },
  expo: function(p) {
    return Math.pow(2, 8 * (p - 1));
  },
  circ: function(p) {
    return 1 - Math.sin(Math.cos(p));
  },
  sine: function(p) {
    return 1 - Math.cos(p * Math.PI / 2);
  }
});

},{"./UnitBezier":22}],24:[function(_dereq_,module,exports){
module.exports=_dereq_(1)
},{}],25:[function(_dereq_,module,exports){
var cssify;

module.exports = cssify = {
  convert: function(t) {
    var css, current, has;
    has = t._has;
    current = t._current;
    if (has.movement) {
      css = cssify._translate(current[0], current[1], current[2]);
    } else {
      css = '';
    }
    if (has.perspective) {
      css += cssify._perspective(current[6]);
    }
    if (has.rotation) {
      css += cssify._rotateSeparate(current[7], current[8], current[9]);
    }
    if (has.rotate3d) {
      css += cssify._rotate3d(current[16], current[17], current[18], current[19]);
    }
    if (has.localMovement) {
      css += cssify._translate(current[10], current[11], current[12]);
    }
    if (has.localRotation) {
      css += cssify._rotateSeparate(current[13], current[14], current[15]);
    }
    if (has.scale) {
      css += cssify._scale(current[3], current[4], current[5]);
    }
    return css;
  },
  _perspective: function(d) {
    return "perspective(" + d + ") ";
  },
  _rotateSeparate: function(x, y, z) {
    if ((-0.00001 < x && x < 0.00001)) {
      x = 0;
    }
    if ((-0.00001 < y && y < 0.00001)) {
      y = 0;
    }
    if ((-0.00001 < z && z < 0.00001)) {
      z = 0;
    }
    return "rotateX(" + x + "rad) rotateY(" + y + "rad) rotateZ(" + z + "rad) ";
  },
  _scale: function(x, y, z) {
    if ((-0.00001 < x && x < 0.00001)) {
      x = 0;
    }
    if ((-0.00001 < y && y < 0.00001)) {
      y = 0;
    }
    if ((-0.00001 < z && z < 0.00001)) {
      z = 0;
    }
    return "scale3d(" + x + ", " + y + ", " + z + ") ";
  },
  _translate: function(x, y, z) {
    if ((-0.00001 < x && x < 0.00001)) {
      x = 0;
    }
    if ((-0.00001 < y && y < 0.00001)) {
      y = 0;
    }
    if ((-0.00001 < z && z < 0.00001)) {
      z = 0;
    }
    return "translate3d(" + x + "px, " + y + "px, " + z + "px) ";
  },
  _rotate3d: function(x, y, z, amount) {
    if ((-0.00001 < amount && amount < 0.00001)) {
      amount = 0;
    }
    return "rotate3d(" + x + ", " + y + ", " + z + ", " + amount + "rad) ";
  }
};


},{}],26:[function(_dereq_,module,exports){
var common;

module.exports = common = {
  /*
  	Checks to see if o is an object, and it isn't an instance
  	of some class.
  */

  isBareObject: function(o) {
    if ((o != null) && o.constructor === Object) {
      return true;
    }
    return false;
  },
  /*
  	Returns type of an object, including:
  	undefined, null, string, number, array,
  	arguments, element, textnode, whitespace, and object
  */

  typeOf: function(item) {
    var _ref;
    if (item === null) {
      return 'null';
    }
    if (typeof item !== 'object') {
      return typeof item;
    }
    if (Array.isArray(item)) {
      return 'array';
    }
    if (item.nodeName) {
      if (item.nodeType === 1) {
        return 'element';
      }
      if (item.nodeType === 3) {
        return (_ref = /\S/.test(item.nodeValue)) != null ? _ref : {
          'textnode': 'whitespace'
        };
      }
    } else if (typeof item.length === 'number') {
      if (item.callee) {
        return 'arguments';
      }
    }
    return typeof item;
  },
  clone: function(item, includePrototype) {
    if (includePrototype == null) {
      includePrototype = false;
    }
    switch (common.typeOf(item)) {
      case 'array':
        return common._cloneArray(item, includePrototype);
      case 'object':
        return common._cloneObject(item, includePrototype);
      default:
        return item;
    }
  },
  /*
  	Deep clone of an object.
  	From MooTools
  */

  _cloneObject: function(o, includePrototype) {
    var clone, key;
    if (includePrototype == null) {
      includePrototype = false;
    }
    if (common.isBareObject(o)) {
      clone = {};
      for (key in o) {
        clone[key] = common.clone(o[key], includePrototype);
      }
      return clone;
    } else {
      if (!includePrototype) {
        return o;
      }
      if (o instanceof Function) {
        return o;
      }
      clone = Object.create(o.constructor.prototype);
      for (key in o) {
        if (o.hasOwnProperty(key)) {
          clone[key] = common.clone(o[key], includePrototype);
        }
      }
      return clone;
    }
  },
  /*
  	Deep clone of an array.
  	From MooTools
  */

  _cloneArray: function(a, includePrototype) {
    var clone, i;
    if (includePrototype == null) {
      includePrototype = false;
    }
    i = a.length;
    clone = new Array(i);
    while (i--) {
      clone[i] = common.clone(a[i], includePrototype);
    }
    return clone;
  }
};


},{}],27:[function(_dereq_,module,exports){
var array, _common;

_common = _dereq_('./_common');

module.exports = array = {
  _clone: _common._cloneArray.bind(_common),
  clone: function(what) {
    if (!Array.isArray(what)) {
      throw Error("`what` isn\'t an array.");
    }
    return this._clone.apply(this, arguments);
  },
  /*
  	Tries to turn anything into an array.
  */

  from: function(r) {
    return Array.prototype.slice.call(r);
  },
  /*
  	Clone of an array. Properties will be shallow copies.
  */

  simpleClone: function(a) {
    return a.slice(0);
  },
  pluck: function(a, i) {
    var index, value, _i, _len;
    if (a.length < 1) {
      return a;
    }
    for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
      value = a[index];
      if (index > i) {
        a[index - 1] = a[index];
      }
    }
    a.length = a.length - 1;
    return a;
  },
  pluckItem: function(a, item) {
    var index, removed, value, _i, _len;
    if (a.length < 1) {
      return a;
    }
    removed = 0;
    for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
      value = a[index];
      if (value === item) {
        removed++;
        continue;
      }
      if (removed !== 0) {
        a[index - removed] = a[index];
      }
    }
    if (removed > 0) {
      a.length = a.length - removed;
    }
    return a;
  },
  pluckOneItem: function(a, item) {
    var index, reached, value, _i, _len;
    if (a.length < 1) {
      return a;
    }
    reached = false;
    for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
      value = a[index];
      if (!reached) {
        if (value === item) {
          reached = true;
          continue;
        }
      } else {
        a[index - 1] = a[index];
      }
    }
    if (reached) {
      a.length = a.length - 1;
    }
    return a;
  },
  pluckByCallback: function(a, cb) {
    var index, removed, value, _i, _len;
    if (a.length < 1) {
      return a;
    }
    removed = 0;
    for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
      value = a[index];
      if (cb(value, index)) {
        removed++;
        continue;
      }
      if (removed !== 0) {
        a[index - removed] = a[index];
      }
    }
    if (removed > 0) {
      a.length = a.length - removed;
    }
    return a;
  },
  pluckMultiple: function(array, indexesToRemove) {
    var i, removedSoFar, _i, _len;
    if (array.length < 1) {
      return array;
    }
    removedSoFar = 0;
    indexesToRemove.sort();
    for (_i = 0, _len = indexesToRemove.length; _i < _len; _i++) {
      i = indexesToRemove[_i];
      this.pluck(array, i - removedSoFar);
      removedSoFar++;
    }
    return array;
  },
  injectByCallback: function(a, toInject, shouldInject) {
    var i, len, val, valA, valB, _i, _len;
    valA = null;
    valB = null;
    len = a.length;
    if (len < 1) {
      a.push(toInject);
      return a;
    }
    for (i = _i = 0, _len = a.length; _i < _len; i = ++_i) {
      val = a[i];
      valA = valB;
      valB = val;
      if (shouldInject(valA, valB, toInject)) {
        return a.splice(i, 0, toInject);
      }
    }
    a.push(toInject);
    return a;
  },
  injectInIndex: function(a, index, toInject) {
    var i, len, toPut, toPutNext;
    len = a.length;
    i = index;
    if (len < 1) {
      a.push(toInject);
      return a;
    }
    toPut = toInject;
    toPutNext = null;
    for(; i <= len; i++){

			toPutNext = a[i];

			a[i] = toPut;

			toPut = toPutNext;

		};
    return null;
  }
};


},{"./_common":26}],28:[function(_dereq_,module,exports){
var classic,
  __slice = [].slice;

module.exports = classic = {};

classic.implement = function() {
  var classProto, classReference, desc, member, mixin, mixins, _i, _j, _len;
  mixins = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), classReference = arguments[_i++];
  for (_j = 0, _len = mixins.length; _j < _len; _j++) {
    mixin = mixins[_j];
    classProto = classReference.prototype;
    for (member in mixin.prototype) {
      if (!Object.getOwnPropertyDescriptor(classProto, member)) {
        desc = Object.getOwnPropertyDescriptor(mixin.prototype, member);
        Object.defineProperty(classProto, member, desc);
      }
    }
  }
  return classReference;
};

classic.mix = function() {
  var classProto, classReference, desc, member, mixin, mixins, _i, _j, _len;
  mixins = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), classReference = arguments[_i++];
  classProto = classReference.prototype;
  classReference.__mixinCloners = [];
  classReference.__applyClonersFor = function(instance, args) {
    var cloner, _j, _len, _ref;
    if (args == null) {
      args = null;
    }
    _ref = classReference.__mixinCloners;
    for (_j = 0, _len = _ref.length; _j < _len; _j++) {
      cloner = _ref[_j];
      cloner.apply(instance, args);
    }
  };
  classReference.__mixinInitializers = [];
  classReference.__initMixinsFor = function(instance, args) {
    var initializer, _j, _len, _ref;
    if (args == null) {
      args = null;
    }
    _ref = classReference.__mixinInitializers;
    for (_j = 0, _len = _ref.length; _j < _len; _j++) {
      initializer = _ref[_j];
      initializer.apply(instance, args);
    }
  };
  classReference.__mixinQuitters = [];
  classReference.__applyQuittersFor = function(instance, args) {
    var quitter, _j, _len, _ref;
    if (args == null) {
      args = null;
    }
    _ref = classReference.__mixinQuitters;
    for (_j = 0, _len = _ref.length; _j < _len; _j++) {
      quitter = _ref[_j];
      quitter.apply(instance, args);
    }
  };
  for (_j = 0, _len = mixins.length; _j < _len; _j++) {
    mixin = mixins[_j];
    if (!(mixin.constructor instanceof Function)) {
      throw Error("Mixin should be a function");
    }
    for (member in mixin.prototype) {
      if (member.substr(0, 11) === '__initMixin') {
        classReference.__mixinInitializers.push(mixin.prototype[member]);
        continue;
      } else if (member.substr(0, 11) === '__clonerFor') {
        classReference.__mixinCloners.push(mixin.prototype[member]);
        continue;
      } else if (member.substr(0, 12) === '__quitterFor') {
        classReference.__mixinQuitters.push(mixin.prototype[member]);
        continue;
      }
      if (!Object.getOwnPropertyDescriptor(classProto, member)) {
        desc = Object.getOwnPropertyDescriptor(mixin.prototype, member);
        Object.defineProperty(classProto, member, desc);
      }
    }
  }
  return classReference;
};


},{}],29:[function(_dereq_,module,exports){
var object, _common,
  __hasProp = {}.hasOwnProperty;

_common = _dereq_('./_common');

module.exports = object = {
  isBareObject: _common.isBareObject.bind(_common),
  /*
  	if object is an instance of a class
  */

  isInstance: function(what) {
    return !this.isBareObject(what);
  },
  /*
  	Alias to _common.typeOf
  */

  typeOf: _common.typeOf.bind(_common),
  /*
  	Alias to _common.clone
  */

  clone: _common.clone.bind(_common),
  /*
  	Empties an object of its properties.
  */

  empty: function(o) {
    var prop;
    for (prop in o) {
      if (o.hasOwnProperty(prop)) {
        delete o[prop];
      }
    }
    return o;
  },
  /*
  	Empties an object. Doesn't check for hasOwnProperty, so it's a tiny
  	bit faster. Use it for plain objects.
  */

  fastEmpty: function(o) {
    var property;
    for (property in o) {
      delete o[property];
    }
    return o;
  },
  /*
  	Overrides values fomr `newValues` on `base`, as long as they
  	already exist in base.
  */

  overrideOnto: function(base, newValues) {
    var key, newVal, oldVal;
    if (!this.isBareObject(newValues) || !this.isBareObject(base)) {
      return base;
    }
    for (key in base) {
      oldVal = base[key];
      newVal = newValues[key];
      if (newVal === void 0) {
        continue;
      }
      if (typeof newVal !== 'object' || this.isInstance(newVal)) {
        base[key] = this.clone(newVal);
      } else {
        if (typeof oldVal !== 'object' || this.isInstance(oldVal)) {
          base[key] = this.clone(newVal);
        } else {
          this.overrideOnto(oldVal, newVal);
        }
      }
    }
    return base;
  },
  /*
  	Takes a clone of 'base' and runs #overrideOnto on it
  */

  override: function(base, newValues) {
    return this.overrideOnto(this.clone(base), newValues);
  },
  append: function(base, toAppend) {
    return this.appendOnto(this.clone(base), toAppend);
  },
  appendOnto: function(base, toAppend) {
    var key, newVal, oldVal;
    if (!this.isBareObject(toAppend) || !this.isBareObject(base)) {
      return base;
    }
    for (key in toAppend) {
      if (!__hasProp.call(toAppend, key)) continue;
      newVal = toAppend[key];
      if (newVal === void 0) {
        continue;
      }
      if (typeof newVal !== 'object' || this.isInstance(newVal)) {
        base[key] = newVal;
      } else {
        oldVal = base[key];
        if (typeof oldVal !== 'object' || this.isInstance(oldVal)) {
          base[key] = this.clone(newVal);
        } else {
          this.appendOnto(oldVal, newVal);
        }
      }
    }
    return base;
  },
  groupProps: function(obj, groups) {
    var def, defs, grouped, key, name, shouldAdd, val, _i, _len;
    grouped = {};
    for (name in groups) {
      defs = groups[name];
      grouped[name] = {};
    }
    grouped['rest'] = {};
    top: //;
    for (key in obj) {
      val = obj[key];
      shouldAdd = false;
      for (name in groups) {
        defs = groups[name];
        if (!Array.isArray(defs)) {
          defs = [defs];
        }
        for (_i = 0, _len = defs.length; _i < _len; _i++) {
          def = defs[_i];
          if (typeof def === 'string') {
            if (key === def) {
              shouldAdd = true;
            }
          } else if (def instanceof RegExp) {
            if (def.test(key)) {
              shouldAdd = true;
            }
          } else if (def instanceof Function) {
            if (def(key)) {
              shouldAdd = true;
            }
          } else {
            throw Error('Group definitions must either\
						be strings, regexes, or functions.');
          }
          if (shouldAdd) {
            grouped[name][key] = val;
            continue top;
          }
        }
      }
      grouped['rest'][key] = val;
    }
    return grouped;
  }
};


},{"./_common":26}],30:[function(_dereq_,module,exports){
var utila;

module.exports = utila = {
  array: _dereq_('./array'),
  classic: _dereq_('./classic'),
  object: _dereq_('./object')
};


},{"./array":27,"./classic":28,"./object":29}],31:[function(_dereq_,module,exports){
var Chain_, Foxie, Styles_, Timing_, array, classic, lazyValues, object, timing, _ref;

Chain_ = _dereq_('./el/mixin/Chain_');

timing = _dereq_('./timing');

Styles_ = _dereq_('./el/mixin/Styles_');

Timing_ = _dereq_('./el/mixin/Timing_');

lazyValues = _dereq_('./utility/lazyValues');

_ref = _dereq_('utila'), classic = _ref.classic, object = _ref.object, array = _ref.array;

timing = _dereq_('./timing');

module.exports = classic.mix(Styles_, Chain_, Timing_, Foxie = (function() {
  var self;

  self = Foxie;

  Foxie._nameRx = /^[a-zA-Z\-\_]{1}[a-zA-Z0-9\-\_]*$/;

  Foxie.timing = timing;

  Foxie._parseTag = function(k) {
    var attribs, classes, cls, id, m, name, parts;
    if (!k.match(/^[a-zA-Z0-9\#\-\_\.\[\]\"\'\=\,\s\:]+$/) || k.match(/^[0-9]+/)) {
      throw Error("cannot parse tag `" + k + "`");
    }
    attribs = {};
    parts = {
      name: '',
      attribs: attribs,
      ns: false
    };
    if (k.match(/^svg\:/)) {
      parts.ns = 'http://www.w3.org/2000/svg';
      k = k.substr(4, k.length);
    }
    if (m = k.match(/^([^\.#]+)/)) {
      name = m[1];
      if (!name.match(self._nameRx)) {
        throw Error("tag name `" + name + "` is not valid");
      }
      parts.name = name;
      k = k.substr(name.length, k.length);
    }
    if (m = k.match(/^#([a-zA-Z0-9\-]+)/)) {
      id = m[1];
      if (!id.match(self._nameRx)) {
        throw Error("tag id `" + id + "` is not valid");
      }
      attribs.id = id;
      k = k.substr(id.length + 1, k.length);
    }
    classes = [];
    while (m = k.match(/\.([a-zA-Z0-9\-\_]+)/)) {
      cls = m[1];
      if (!cls.match(self._nameRx)) {
        throw Error("tag class `" + cls + "` is not valid");
      }
      classes.push(cls);
      k = k.replace('.' + cls, '');
    }
    if (classes.length) {
      attribs["class"] = classes.join(" ");
    }
    return parts;
  };

  function Foxie(node) {
    var name, parts, val, _ref1;
    if (!(this instanceof self)) {
      return new self(node);
    }
    if (typeof node === 'string') {
      parts = self._parseTag(node);
      if (parts.name.length === 0) {
        parts.name = 'div';
      }
      if (parts.ns) {
        node = document.createElementNS(parts.ns, parts.name);
      } else {
        node = document.createElement(parts.name);
      }
      _ref1 = parts.attribs;
      for (name in _ref1) {
        val = _ref1[name];
        node.setAttribute(name, val);
      }
    }
    if (!(node instanceof Element)) {
      throw Error("node must be an HTML element.");
    }
    this.node = node;
    if (this._shouldCloneInnerHTML == null) {
      this._shouldCloneInnerHTML = false;
    }
    self.__initMixinsFor(this);
    this._parent = null;
    this._children = [];
    this._customVars = {};
  }

  Foxie.prototype.clone = function(newself) {
    var child, key, newNode, parent, val, _i, _len, _ref1, _ref2, _ref3;
    if (newself == null) {
      newself = Object.create(this.constructor.prototype);
    }
    this._doUpdate();
    newNode = this.node.cloneNode();
    newself.node = newNode;
    newself._children = [];
    if (this._shouldCloneInnerHTML) {
      newself.node.innerHTML = this.node.innerHTML;
    } else {
      _ref1 = this._children;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        child = _ref1[_i];
        child.clone().putIn(newself);
      }
    }
    newself._parent = null;
    if (this._parent != null) {
      parent = this._parent;
    } else {
      parent = (_ref2 = (_ref3 = this.node._parent) != null ? _ref3 : this.node.parentselfement) != null ? _ref2 : null;
    }
    timing.afterFrame((function(_this) {
      return function() {};
    })(this));
    self.__applyClonersFor(this, [newself]);
    for (key in this) {
      val = this[key];
      if (newself[key] !== void 0) {
        continue;
      }
      if (this.hasOwnProperty(key)) {
        newself[key] = object.clone(val, true);
      }
    }
    return newself;
  };

  Foxie.prototype._notYourChildAnymore = function(el) {
    if (!(el instanceof self)) {
      throw Error("`el` must be an instance of `self`");
    }
    array.pluckItem(this._children, el);
    return this;
  };

  Foxie.prototype.putIn = function(el) {
    var node;
    if (this._parent != null) {
      this._parent._notYourChildAnymore(this);
    }
    if (el instanceof self) {
      el._append(this);
      this._parent = el;
    } else {
      node = el;
      if (node.node != null) {
        node = node.node;
      }
      node.appendChild(this.node);
      this._parent = null;
    }
    return this;
  };

  Foxie.prototype.takeOutOfParent = function() {
    if (this._parent != null) {
      this._parent._notYourChildAnymore(this);
    }
    this._parent = null;
    return this;
  };

  Foxie.prototype._append = function(el) {
    var node;
    if (el instanceof self) {
      node = el.node;
      this._children.push(el);
    } else {
      node = el;
    }
    this.node.appendChild(node);
    return this;
  };

  Foxie.prototype.remove = function() {
    if (this._parent != null) {
      this._parent._notYourChildAnymore(this);
    }
    if (this.node.parentNode != null) {
      this.node.parentNode.removeChild(this.node);
    }
    return null;
  };

  Foxie.prototype.quit = function() {
    var child, p, _i, _len, _ref1;
    p = this.node.parentNode;
    if (p != null) {
      p.removeChild(this.node);
    }
    _ref1 = this._children;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      child = _ref1[_i];
      child.quit();
    }
    self.__applyQuittersFor(this);
  };

  Foxie.prototype.each = function(cb) {
    var child, counter, els, i, _interface;
    if (cb == null) {
      cb = null;
    }
    if (cb instanceof Function) {
      i = 0;
      child = null;
      counter = -1;
      while (true) {
        counter++;
        if (child === this._children[i]) {
          i++;
        }
        child = this._children[i];
        if (child == null) {
          break;
        }
        cb.call(this, child, counter);
      }
      return this;
    }
    _interface = this._getNewInterface();
    els = this._children;
    if (els.length !== 0) {
      timing.afterFrame((function(_this) {
        return function() {
          var el, _i, _len;
          for (_i = 0, _len = els.length; _i < _len; _i++) {
            el = els[_i];
            _this._getMethodChain().run(_interface, el);
          }
          return null;
        };
      })(this));
    }
    return _interface;
  };

  Foxie.prototype.get = function(name) {
    return this._customVars[name];
  };

  Foxie.prototype.set = function(name, val) {
    this._customVars[name] = val;
    return this;
  };

  Foxie.prototype.unset = function(name) {
    delete this._customVars[name];
    return this;
  };

  Foxie.prototype.attr = function(name, val) {
    if (val == null) {
      return this.node.getAttribute(name);
    } else {
      this.node.setAttribute(name, val);
    }
    return this;
  };

  Foxie.prototype.removeAttr = function(name) {
    this.node.removeAttribute(name);
    return this;
  };

  Foxie.prototype.innerHTML = function(val) {
    if (val == null) {
      return this.node.innerHTML;
    }
    this.node.innerHTML = val;
    return this;
  };

  Foxie.prototype.computedStyle = function(prop) {
    var comp;
    comp = getComputedStyle(this.node);
    if (prop != null) {
      return comp[prop];
    } else {
      return comp;
    }
  };

  return Foxie;

})());


},{"./el/mixin/Chain_":32,"./el/mixin/Styles_":33,"./el/mixin/Timing_":34,"./timing":46,"./utility/lazyValues":48,"utila":30}],32:[function(_dereq_,module,exports){
var Chain_, MethodChain;

MethodChain = _dereq_('method-chain');

module.exports = Chain_ = (function() {
  function Chain_() {}

  Chain_.prototype._getMethodChain = function() {
    var fn, key;
    if (this.constructor.__methodChain == null) {
      this.constructor.__methodChain = new MethodChain;
      for (key in this) {
        fn = this[key];
        if (key[0] === '_' || key === 'constructor') {
          continue;
        }
        if (!(fn instanceof Function)) {
          continue;
        }
        this.constructor.__methodChain.addMethod(key);
      }
    }
    return this.constructor.__methodChain;
  };

  Chain_.prototype._getNewInterface = function() {
    return this._getMethodChain().getInterface();
  };

  Chain_.prototype._eventEnabledMethod = function(args, runCallback) {
    var fn, _interface, _ref;
    fn = (_ref = args[0]) != null ? _ref : null;
    if (fn) {
      runCallback((function(_this) {
        return function() {
          return fn.apply(_this, arguments);
        };
      })(this));
      return this;
    } else {
      _interface = this._getNewInterface();
      runCallback((function(_this) {
        return function() {
          return _this._getMethodChain().run(_interface, _this);
        };
      })(this));
      return _interface;
    }
  };

  return Chain_;

})();


},{"method-chain":13}],33:[function(_dereq_,module,exports){
var ClassPrototype, StyleSetter, Styles, Transitioner, method, methodName, timing, _fn, _fn1, _ref, _ref1;

StyleSetter = _dereq_('./styleSetter/StyleSetter');

Transitioner = _dereq_('./transitioner/Transitioner');

timing = _dereq_('../../timing');

module.exports = Styles = (function() {
  function Styles() {}

  Styles.prototype.__initMixinHasStyles = function() {
    this._styleSetter = new StyleSetter(this);
    this._transitioner = new Transitioner(this);
    this.fill = this._styleSetter.fill;
    this._styleInterface = this._styleSetter;
    this._updaterDeployed = false;
    this._shouldUpdate = false;
    this._updaterCallback = this._getNewUpdaterCallback();
    this._lastTimeUpdated = 0;
  };

  Styles.prototype._getNewUpdaterCallback = function() {
    return (function(_this) {
      return function(t) {
        return _this._doUpdate(t);
      };
    })(this);
  };

  Styles.prototype._scheduleUpdate = function() {
    this._shouldUpdate = true;
    this._deployUpdater();
  };

  Styles.prototype._deployUpdater = function() {
    if (this._updaterDeployed) {
      return;
    }
    this._updaterDeployed = true;
    return timing.afterEachFrame(this._updaterCallback);
  };

  Styles.prototype._undeployUpdater = function() {
    if (!this._updaterDeployed) {
      return;
    }
    this._updaterDeployed = false;
    return timing.cancelAfterEachFrame(this._updaterCallback);
  };

  Styles.prototype._doUpdate = function(t) {
    if (!this._shouldUpdate) {
      if (t - this._lastTimeUpdated > 100) {
        this._undeployUpdater();
      }
      return;
    }
    this._lastTimeUpdated = t;
    this._shouldUpdate = false;
    this._transitioner._updateTransition();
    this._styleSetter._updateTransforms();
    this._styleSetter._updateFilters();
  };

  Styles.prototype.__clonerForHasStyles = function(newEl) {
    newEl._styleSetter = this._styleSetter.clone(newEl);
    newEl.fill = newEl._styleSetter.fill;
    newEl._transitioner = this._transitioner.clone(newEl);
    newEl._updaterDeployed = false;
    newEl._shouldUpdate = false;
    newEl._updaterCallback = newEl._getNewUpdaterCallback();
    newEl._lastTimeUpdated;
    if (this._styleInterface === this._styleSetter) {
      newEl._styleInterface = newEl._styleSetter;
    } else {
      newEl._styleInterface = newEl._transitioner;
    }
  };

  Styles.prototype.__quitterForHasStyles = function() {
    return this._undeployUpdater();
  };

  Styles.prototype.enableTransition = function(duration) {
    this._styleInterface = this._transitioner;
    this._transitioner.enable(duration);
    return this;
  };

  Styles.prototype.disableTransition = function() {
    this._styleInterface = this._styleSetter;
    this._transitioner.disable();
    return this;
  };

  Styles.prototype.trans = function(duration) {
    return this.enableTransition(duration);
  };

  Styles.prototype.noTrans = function() {
    return this.disableTransition();
  };

  Styles.prototype.ease = function(funcNameOrFirstNumOfCubicBezier, secondNum, thirdNum, fourthNum) {
    this._transitioner.ease(funcNameOrFirstNumOfCubicBezier, secondNum, thirdNum, fourthNum);
    return this;
  };

  return Styles;

})();

ClassPrototype = Styles.prototype;

_ref = Transitioner.prototype;
_fn = function() {
  var _methodName;
  _methodName = methodName;
  if (method.length === 0) {
    return ClassPrototype[_methodName] = function() {
      this._styleInterface[_methodName]();
      return this;
    };
  } else if (method.length === 1) {
    return ClassPrototype[_methodName] = function(arg0) {
      this._styleInterface[_methodName](arg0);
      return this;
    };
  } else if (method.length === 2) {
    return ClassPrototype[_methodName] = function(arg0, arg1) {
      this._styleInterface[_methodName](arg0, arg1);
      return this;
    };
  } else if (method.length === 3) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2) {
      this._styleInterface[_methodName](arg0, arg1, arg2);
      return this;
    };
  } else if (method.length === 4) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3) {
      this._styleInterface[_methodName](arg0, arg1, arg2, arg3);
      return this;
    };
  } else if (method.length === 5) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3, arg4) {
      this._styleInterface[_methodName](arg0, arg1, arg2, arg3, arg4);
      return this;
    };
  } else {
    throw Error("Methods with more than 5 args are not supported.");
  }
};
for (methodName in _ref) {
  method = _ref[methodName];
  if (!(method instanceof Function)) {
    continue;
  }
  if (ClassPrototype[methodName] != null) {
    continue;
  }
  if (methodName[0] === '_') {
    continue;
  }
  if (methodName.substr(0, 3) === 'get') {
    continue;
  }
  _fn();
}

_ref1 = StyleSetter.prototype;
_fn1 = function() {
  var _methodName;
  _methodName = methodName;
  if (method.length === 0) {
    return ClassPrototype[_methodName] = function() {
      this._styleSetter[_methodName]();
      return this;
    };
  } else if (method.length === 1) {
    return ClassPrototype[_methodName] = function(arg0) {
      this._styleSetter[_methodName](arg0);
      return this;
    };
  } else if (method.length === 2) {
    return ClassPrototype[_methodName] = function(arg0, arg1) {
      this._styleSetter[_methodName](arg0, arg1);
      return this;
    };
  } else if (method.length === 3) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2) {
      this._styleSetter[_methodName](arg0, arg1, arg2);
      return this;
    };
  } else if (method.length === 4) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3) {
      this._styleSetter[_methodName](arg0, arg1, arg2, arg3);
      return this;
    };
  } else if (method.length === 5) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3, arg4) {
      this._styleSetter[_methodName](arg0, arg1, arg2, arg3, arg4);
      return this;
    };
  } else {
    throw Error("Methods with more than 5 args are not supported.");
  }
};
for (methodName in _ref1) {
  method = _ref1[methodName];
  if (!(method instanceof Function)) {
    continue;
  }
  if (ClassPrototype[methodName] != null) {
    continue;
  }
  if (methodName[0] === '_') {
    continue;
  }
  if (methodName.substr(0, 3) === 'get') {
    continue;
  }
  _fn1();
}

Styles.prototype.getMovement = function() {
  return this._styleSetter._transformer.getMovement();
};

Styles.prototype.getRotation = function() {
  return this._styleSetter._transformer.getRotation();
};

Styles.prototype.getScale = function() {
  return this._styleSetter._transformer.getScale();
};


},{"../../timing":46,"./styleSetter/StyleSetter":35,"./transitioner/Transitioner":43}],34:[function(_dereq_,module,exports){
var Timing_, array, timing,
  __slice = [].slice;

array = _dereq_('utila').array;

timing = _dereq_('../../timing');

module.exports = Timing_ = (function() {
  function Timing_() {}

  Timing_.prototype.__initMixinTiming = function() {
    this._quittersForTiming = [];
    return null;
  };

  Timing_.prototype.__clonerForTiming = function(newEl) {
    return newEl._quittersForTiming = [];
  };

  Timing_.prototype.__quitterForTiming = function() {
    while (true) {
      if (this._quittersForTiming.length < 1) {
        return;
      }
      this._quittersForTiming.pop()();
    }
  };

  Timing_.prototype.wait = function() {
    var ms, rest;
    ms = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return this._eventEnabledMethod(rest, (function(_this) {
      return function(cb) {
        return timing.wait(ms, function() {
          return cb.call(_this);
        });
      };
    })(this));
  };

  Timing_.prototype.immediately = function() {
    return this._eventEnabledMethod(arguments, (function(_this) {
      return function(cb) {
        return timing.nextTick(function() {
          return cb.call(_this);
        });
      };
    })(this));
  };

  Timing_.prototype.eachFrame = function() {
    return this._eventEnabledMethod(arguments, (function(_this) {
      return function(cb) {
        var canceled, canceler, startTime, theCallback;
        startTime = new Int32Array(1);
        startTime[0] = -1;
        canceled = false;
        canceler = function() {
          if (canceled) {
            return;
          }
          timing.cancelOnEachFrame(theCallback);
          array.pluckOneItem(_this._quittersForTiming, canceler);
          return canceled = true;
        };
        _this._quittersForTiming.push(canceler);
        theCallback = function(t) {
          var elapsedTime;
          if (startTime[0] < 0) {
            startTime[0] = t;
            elapsedTime = 0;
          } else {
            elapsedTime = t - startTime[0];
          }
          cb.call(_this, elapsedTime, canceler);
          return null;
        };
        return timing.onEachFrame(theCallback);
      };
    })(this));
  };

  Timing_.prototype.run = function() {
    this._eventEnabledMethod(arguments, (function(_this) {
      return function(cb) {
        return cb.call(_this);
      };
    })(this));
    return this;
  };

  Timing_.prototype.every = function() {
    var args, ms;
    ms = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return this._eventEnabledMethod(args, (function(_this) {
      return function(cb) {
        var canceled, canceler, theCallback;
        canceled = false;
        canceler = function() {
          if (canceled) {
            return;
          }
          timing.cancelEvery(theCallback);
          array.pluckOneItem(_this._quittersForTiming, canceler);
          return canceled = true;
        };
        _this._quittersForTiming.push(canceler);
        theCallback = function() {
          return cb.call(_this, canceler);
        };
        return timing.every(ms, theCallback);
      };
    })(this));
  };

  Timing_.prototype.everyAndNow = function() {
    var args, ms;
    ms = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return this._eventEnabledMethod(args, (function(_this) {
      return function(cb) {
        var canceled, canceler, theCallback;
        canceled = false;
        canceler = function() {
          if (canceled) {
            return;
          }
          timing.cancelEvery(theCallback);
          array.pluckOneItem(_this._quittersForTiming, canceler);
          return canceled = true;
        };
        _this._quittersForTiming.push(canceler);
        theCallback = function() {
          return cb.call(_this, canceler);
        };
        timing.every(ms, theCallback);
        return timing.afterNextFrame(theCallback);
      };
    })(this));
  };

  return Timing_;

})();


},{"../../timing":46,"utila":30}],35:[function(_dereq_,module,exports){
var Fill_, Filters_, Generals_, Layout_, StyleSetter, Transforms_, Typography_, classic, object, _ref;

Generals_ = _dereq_('./mixin/Generals_');

Layout_ = _dereq_('./mixin/Layout_');

Fill_ = _dereq_('./mixin/Fill_');

Typography_ = _dereq_('./mixin/Typography_');

Transforms_ = _dereq_('./mixin/Transforms_');

Filters_ = _dereq_('./mixin/Filters_');

_ref = _dereq_('utila'), classic = _ref.classic, object = _ref.object;

module.exports = classic.mix(Generals_, Layout_, Fill_, Typography_, Transforms_, Filters_, StyleSetter = (function() {
  function StyleSetter(el) {
    this.el = el;
    this.node = this.el.node;
    this._styles = this.node.style;
    StyleSetter.__initMixinsFor(this);
  }

  StyleSetter.prototype._scheduleUpdate = function() {
    return this.el._scheduleUpdate();
  };

  StyleSetter.prototype.clone = function(el) {
    var key, newObj;
    newObj = Object.create(this.constructor.prototype);
    newObj.el = el;
    newObj.node = el.node;
    newObj._styles = el.node.style;
    StyleSetter.__applyClonersFor(this, [newObj]);
    for (key in this) {
      if (newObj[key] !== void 0) {
        continue;
      }
      if (this.hasOwnProperty(key)) {
        newObj[key] = object.clone(this[key], true);
      }
    }
    return newObj;
  };

  return StyleSetter;

})());


},{"./mixin/Fill_":36,"./mixin/Filters_":37,"./mixin/Generals_":38,"./mixin/Layout_":39,"./mixin/Transforms_":40,"./mixin/Typography_":41,"utila":30}],36:[function(_dereq_,module,exports){
var ColorHolder, Fill_, css;

css = _dereq_('../../../../utility/css');

ColorHolder = _dereq_('../tools/ColorHolder');

module.exports = Fill_ = (function() {
  function Fill_() {}

  Fill_.prototype.__initMixinFill = function() {
    this.fill = new ColorHolder(this._getFillUpdater());
    return this._fill = {
      bgColor: 'none',
      color: 'inherit',
      border: 'none',
      opacity: 1
    };
  };

  Fill_.prototype.__clonerForFill = function(newStyleSetter) {
    newStyleSetter.fill = this.fill.clone(newStyleSetter._getFillUpdater());
  };

  Fill_.prototype._getFillUpdater = function() {
    return (function(_this) {
      return function() {
        _this._updateFill();
      };
    })(this);
  };

  Fill_.prototype._updateFill = function() {
    this._styles.backgroundColor = this._fill.bgColor = this.fill._color.toCss();
    return this;
  };

  Fill_.prototype.rotateFillHue = function(amount) {
    this._fill.bgColor.rotateHue(amount);
    return this._styles.backgroundColor = this._fill.bgColor.toCss();
  };

  Fill_.prototype.setTextColor = function(r, g, b) {
    this._styles.color = this._fill.color = css.rgb(r, g, b);
    return null;
  };

  Fill_.prototype.makeHollow = function() {
    return this._styles.bgColor = this._fill.bgColor = 'transparent';
  };

  Fill_.prototype.texturize = function(filename) {
    var addr;
    addr = "./images/" + filename;
    this._styles.background = 'url(' + addr + ')';
    return this;
  };

  Fill_.prototype.setTexturePosition = function(x, y) {
    this._styles.backgroundPosition = "" + x + "px " + y + "px";
    return this;
  };

  Fill_.prototype.setBorder = function(thickness, r, g, b) {
    if (thickness == null) {
      this._styles.border = this._fill.border = 'none';
    } else {
      this._styles.border = this._fill.border = "" + thickness + "px solid " + (css.rgb(r, g, b));
    }
    return this;
  };

  Fill_.prototype.removeBorder = function() {
    this._styles.border = this._fill.border = 'none';
    return this;
  };

  Fill_.prototype.setOpacity = function(d) {
    this._styles.opacity = this._fill.opacity = d;
    return this;
  };

  Fill_.prototype.adjustOpacity = function(d) {
    this._fill.opacity += d;
    this._styles.opacity = this._fill.opacity;
    return this;
  };

  return Fill_;

})();


},{"../../../../utility/css":47,"../tools/ColorHolder":42}],37:[function(_dereq_,module,exports){
var CSSFilter, ClassPrototype, Filters_, css, method, methodName, _fn, _ref;

CSSFilter = _dereq_('css-filter');

css = _dereq_('../../../../utility/css');

module.exports = Filters_ = (function() {
  function Filters_() {}

  Filters_.prototype.__initMixinFilters = function() {
    this._cssFilter = new CSSFilter;
    return this._shouldUpdateFilters = false;
  };

  Filters_.prototype.__clonerForFilters = function(newStyleSetter) {
    newStyleSetter._shouldUpdateFilters = false;
  };

  Filters_.prototype._updateFilters = function() {
    if (!this._shouldUpdateFilters) {
      return;
    }
    this._shouldUpdateFilters = false;
    return this._actuallyUpdateFilters();
  };

  Filters_.prototype._scheduleFiltersUpdate = function() {
    this._shouldUpdateFilters = true;
    return this._scheduleUpdate();
  };

  Filters_.prototype._actuallyUpdateFilters = function() {
    css.setCssFilter(this.node, this._cssFilter.toCss());
    return this;
  };

  return Filters_;

})();

ClassPrototype = Filters_.prototype;

_ref = CSSFilter.prototype;
_fn = function() {
  var _methodName;
  _methodName = methodName;
  if (method.length === 0) {
    return ClassPrototype[_methodName] = function() {
      this._cssFilter[_methodName]();
      this._scheduleFiltersUpdate();
      return this;
    };
  } else if (method.length === 1) {
    return ClassPrototype[_methodName] = function(arg0) {
      this._cssFilter[_methodName](arg0);
      this._scheduleFiltersUpdate();
      return this;
    };
  } else if (method.length === 2) {
    return ClassPrototype[_methodName] = function(arg0, arg1) {
      this._cssFilter[_methodName](arg0, arg1);
      this._scheduleFiltersUpdate();
      return this;
    };
  } else if (method.length === 3) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2) {
      this._cssFilter[_methodName](arg0, arg1, arg2);
      this._scheduleFiltersUpdate();
      return this;
    };
  } else if (method.length === 4) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3) {
      this._cssFilter[_methodName](arg0, arg1, arg2, arg3);
      this._scheduleFiltersUpdate();
      return this;
    };
  } else if (method.length === 5) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3, arg4) {
      this._cssFilter[_methodName](arg0, arg1, arg2, arg3, arg4);
      this._scheduleFiltersUpdate();
      return this;
    };
  } else {
    throw Error("Methods with more than 5 args are not supported.");
  }
};
for (methodName in _ref) {
  method = _ref[methodName];
  if (!(method instanceof Function)) {
    continue;
  }
  if (ClassPrototype[methodName] != null) {
    continue;
  }
  if (methodName[0] === '_') {
    continue;
  }
  if (methodName === 'toCss') {
    continue;
  }
  _fn();
}

Filters_;


},{"../../../../utility/css":47,"css-filter":3}],38:[function(_dereq_,module,exports){
var General_, css;

css = _dereq_('../../../../utility/css');

module.exports = General_ = (function() {
  function General_() {}

  General_.prototype.z = function(i) {
    this.node.style.zIndex = i;
    return this;
  };

  General_.prototype.css = function(prop, val) {
    this._styles[prop] = val;
    return this;
  };

  General_.prototype.addClass = function(c) {
    this.node.classList.add(c);
    return this;
  };

  General_.prototype.removeClass = function(c) {
    this.node.classList.remove(c);
    return this;
  };

  General_.prototype.toggleClass = function(c) {
    this.node.classList.toggle(c);
    return this;
  };

  General_.prototype.setClass = function(c) {
    this.node.className = c;
    return this;
  };

  return General_;

})();


},{"../../../../utility/css":47}],39:[function(_dereq_,module,exports){
var Layout_;

module.exports = Layout_ = (function() {
  function Layout_() {}

  Layout_.prototype.__initMixinLayout = function() {
    return this._layout = {
      width: null,
      height: null,
      clipLeft: 'auto',
      clipRight: 'auto',
      clipTop: 'auto',
      clipBottom: 'auto'
    };
  };

  Layout_.prototype.setWidth = function(w) {
    this._layout.width = w;
    this._styles.width = w + 'px';
    return this;
  };

  Layout_.prototype.setHeight = function(h) {
    this._layout.height = h;
    this._styles.height = h + 'px';
    return this;
  };

  Layout_.prototype.clip = function(top, right, bottom, left) {
    this._layout.clipTop = top;
    this._layout.clipRight = right;
    this._layout.clipBottom = bottom;
    this._layout.clipLeft = left;
    if (typeof top === 'number') {
      top += 'px';
    }
    if (typeof right === 'number') {
      right += 'px';
    }
    if (typeof bottom === 'number') {
      bottom += 'px';
    }
    if (typeof left === 'number') {
      left += 'px';
    }
    this._styles.clip = "rect(" + top + ", " + right + ", " + bottom + ", " + left + ")";
    return this;
  };

  Layout_.prototype.unclip = function() {
    this.clip('auto', 'auto', 'auto', 'auto');
    return this;
  };

  Layout_.prototype.clipTop = function(a) {
    return this.clip(a, this._layout.clipRight, this._layout.clipBottom, this._layout.clipLeft);
  };

  Layout_.prototype.clipRight = function(a) {
    return this.clip(this._layout.clipTop, a, this._layout.clipBottom, this._layout.clipLeft);
  };

  Layout_.prototype.clipBottom = function(a) {
    return this.clip(this._layout.clipTop, this._layout.clipRight, a, this._layout.clipLeft);
  };

  Layout_.prototype.clipLeft = function(a) {
    return this.clip(this._layout.clipTop, this._layout.clipRight, this._layout.clipBottom, a);
  };

  return Layout_;

})();


},{}],40:[function(_dereq_,module,exports){
var ClassPrototype, Transformation, Transforms_, css, cssify, method, methodName, _fn, _ref;

Transformation = _dereq_('transformation');

cssify = _dereq_('transformation/scripts/js/lib/cssify');

css = _dereq_('../../../../utility/css');

module.exports = Transforms_ = (function() {
  function Transforms_() {}

  Transforms_.prototype.__initMixinTransforms = function() {
    this._transformer = new Transformation;
    this._origin = {
      x: null,
      y: null,
      z: null
    };
    this._shouldUpdateTransforms = false;
  };

  Transforms_.prototype.__clonerForTransforms = function(newStyleSetter) {
    newStyleSetter._shouldUpdateTransforms = false;
  };

  Transforms_.prototype._updateTransforms = function() {
    if (!this._shouldUpdateTransforms) {
      return;
    }
    this._shouldUpdateTransforms = false;
    return this._actuallyUpdateTransforms();
  };

  Transforms_.prototype._scheduleTransformsUpdate = function() {
    this._shouldUpdateTransforms = true;
    return this._scheduleUpdate();
  };

  Transforms_.prototype._actuallyUpdateTransforms = function() {
    css.setTransform(this.node, cssify.convert(this._transformer));
    return this;
  };

  Transforms_.prototype.go3d = function() {
    css.setTransformStyle(this.node, 'preserve-3d');
    return this;
  };

  Transforms_.prototype.goFlat = function() {
    css.setTransformStyle(this.node, 'flat');
    return this;
  };

  Transforms_.prototype.setOrigin = function(x, y, z) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (z == null) {
      z = 0;
    }
    this._origin.x = x;
    this._origin.y = y;
    this._origin.z = z;
    css.setTransformOrigin(this.node, "" + this._origin.x + "px " + this._origin.y + "px " + this._origin.z + "px");
    return this;
  };

  Transforms_.prototype.originToBottom = function() {
    css.setTransformOrigin(this.node, "50% 100%");
    return this;
  };

  Transforms_.prototype.originToTop = function() {
    css.setTransformOrigin(this.node, "50% 0");
    return this;
  };

  Transforms_.prototype.pivot = function(x, y) {
    var _x, _y;
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (x === -1) {
      _x = '0%';
    } else if (x === 0) {
      _x = '50%';
    } else if (x === 1) {
      _x = '100%';
    } else {
      throw Error("pivot() only takes -1, 0, and 1 for its arguments");
    }
    if (y === -1) {
      _y = '0%';
    } else if (y === 0) {
      _y = '50%';
    } else if (y === 1) {
      _y = '100%';
    } else {
      throw Error("pivot() only takes -1, 0, and 1 for its arguments");
    }
    css.setTransformOrigin(this.node, "" + _x + " " + _y);
    return this;
  };

  return Transforms_;

})();

ClassPrototype = Transforms_.prototype;

_ref = Transformation.prototype;
_fn = function() {
  var _methodName;
  _methodName = methodName;
  if (method.length === 0) {
    return ClassPrototype[_methodName] = function() {
      this._transformer[_methodName]();
      this._scheduleTransformsUpdate();
      return this;
    };
  } else if (method.length === 1) {
    return ClassPrototype[_methodName] = function(arg0) {
      this._transformer[_methodName](arg0);
      this._scheduleTransformsUpdate();
      return this;
    };
  } else if (method.length === 2) {
    return ClassPrototype[_methodName] = function(arg0, arg1) {
      this._transformer[_methodName](arg0, arg1);
      this._scheduleTransformsUpdate();
      return this;
    };
  } else if (method.length === 3) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2) {
      this._transformer[_methodName](arg0, arg1, arg2);
      this._scheduleTransformsUpdate();
      return this;
    };
  } else if (method.length === 4) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3) {
      this._transformer[_methodName](arg0, arg1, arg2, arg3);
      this._scheduleTransformsUpdate();
      return this;
    };
  } else if (method.length === 5) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3, arg4) {
      this._transformer[_methodName](arg0, arg1, arg2, arg3, arg4);
      this._scheduleTransformsUpdate();
      return this;
    };
  } else {
    throw Error("Methods with more than 5 args are not supported.");
  }
};
for (methodName in _ref) {
  method = _ref[methodName];
  if (!(method instanceof Function)) {
    continue;
  }
  if (ClassPrototype[methodName] != null) {
    continue;
  }
  if (methodName[0] === '_') {
    continue;
  }
  if (methodName === 'temporarily' || methodName === 'commit' || methodName === 'rollBack' || methodName === 'toCss' || methodName === 'toPlainCss' || methodName === 'toArray' || methodName === 'toMatrix') {
    continue;
  }
  _fn();
}

Transforms_;


},{"../../../../utility/css":47,"transformation":24,"transformation/scripts/js/lib/cssify":25}],41:[function(_dereq_,module,exports){
var Typography_, css;

css = _dereq_('../../../../utility/css');

module.exports = Typography_ = (function() {
  function Typography_() {}

  Typography_.prototype.__initMixinTypography = function() {
    this._type = {
      face: Typography_.defaultFace,
      size: Typography_.defaultSize,
      color: Typography_.defaultColor
    };
    this._sizeSet = false;
  };

  Typography_.prototype._getSize = function() {
    if (!this._sizeSet) {
      this._type.size = parseFloat(getComputedStyle(this.node).fontSize);
      this._sizeSet = true;
    }
    return this._type.size;
  };

  Typography_.prototype._initTypography = function() {
    this.setSize();
    this.setFace();
    return this.setColor();
  };

  Typography_.prototype.setFace = function(face) {
    if (!face) {
      this._type.face = Typography_.defaultFace;
    } else {
      this._type.face = face;
    }
    this._applyFace();
    return this;
  };

  Typography_.prototype._applyFace = function() {
    this._styles.fontFamily = this._type.face;
    return this;
  };

  Typography_.prototype.setSize = function(size) {
    if (!size) {
      this._type.size = Typography_.defaultSize;
    } else {
      this._type.size = size;
    }
    this._applySize();
    return this;
  };

  Typography_.prototype._applySize = function() {
    this._styles.fontSize = this._type.size + 'px';
    return this;
  };

  Typography_.prototype.setColor = function(r, g, b) {
    if (arguments.length === 0) {
      this._type.color = Typography_.defaultColor;
    } else {
      this._type.color = css.rgb(r, g, b);
    }
    this._applyColor();
    return this;
  };

  Typography_.prototype._applyColor = function() {
    this._styles.color = this._type.color;
    this._applyStroke();
    return this;
  };

  Typography_.prototype._applyStroke = function() {
    if (Typography_.needsTextStroke() && this._getSize() < 50) {
      this._styles.webkitTextStroke = '1.5 ' + this._type.color;
    }
    return this;
  };

  Typography_.defaultFace = '"HelveticaNeueLT Std Thin"';

  Typography_.setDefaultFace = function(face) {
    if (face == null) {
      face = "HelveticaNeueLT Std Thin";
    }
    return this.defaultFace = face;
  };

  Typography_.defaultSize = 36;

  Typography_.setDefaultSize = function(size) {
    if (size == null) {
      size = 36;
    }
    return this.defaultSize = size;
  };

  Typography_.defaultColor = css.rgb(255, 255, 255);

  Typography_.setDefaultColor = function(r, g, b) {
    if (arguments.length === 0) {
      this.defaultColor = css.rgb(255, 255, 255);
    }
    return this.defaultColor = css.rgb(r, g, b);
  };

  Typography_.needsTextStroke = (function() {
    var _needsTextStroke;
    _needsTextStroke = null;
    return function() {
      if (_needsTextStroke === null) {
        if (navigator.appVersion.indexOf('Chrome') !== -1 && navigator.appVersion.indexOf('Windows') !== -1) {
          _needsTextStroke = true;
        } else {
          _needsTextStroke = false;
        }
      }
      return _needsTextStroke;
    };
  })();

  return Typography_;

})();


},{"../../../../utility/css":47}],42:[function(_dereq_,module,exports){
var CSSColor, ClassPrototype, ColorHolder, method, methodName, _fn, _ref;

CSSColor = _dereq_('css-color');

module.exports = ColorHolder = (function() {
  function ColorHolder(_callback) {
    this._callback = _callback;
    this._color = new CSSColor;
  }

  ColorHolder.prototype.withRgb = function(r, g, b) {
    this._color.fromRgb(r, g, b);
    this._callback();
    return this;
  };

  ColorHolder.prototype.withHsl = function(h, s, l) {
    this._color.fromHsl(h, s, l);
    this._callback();
    return this;
  };

  ColorHolder.prototype.clone = function(callback) {
    var newObj;
    newObj = Object.create(this.constructor.prototype);
    newObj._color = this._color.clone();
    newObj._callback = callback;
    return newObj;
  };

  return ColorHolder;

})();

ClassPrototype = ColorHolder.prototype;

_ref = CSSColor.prototype;
_fn = function() {
  var _methodName;
  _methodName = methodName;
  if (method.length === 0) {
    return ClassPrototype[_methodName] = function() {
      this._color[_methodName]();
      this._callback();
      return this;
    };
  } else if (method.length === 1) {
    return ClassPrototype[_methodName] = function(arg0) {
      this._color[_methodName](arg0);
      this._callback();
      return this;
    };
  } else if (method.length === 2) {
    return ClassPrototype[_methodName] = function(arg0, arg1) {
      this._color[_methodName](arg0, arg1);
      this._callback();
      return this;
    };
  } else if (method.length === 3) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2) {
      this._color[_methodName](arg0, arg1, arg2);
      this._callback();
      return this;
    };
  } else if (method.length === 4) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3) {
      this._color[_methodName](arg0, arg1, arg2, arg3);
      this._callback();
      return this;
    };
  } else if (method.length === 5) {
    return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3, arg4) {
      this._color[_methodName](arg0, arg1, arg2, arg3, arg4);
      this._callback();
      return this;
    };
  } else {
    throw Error("Methods with more than 5 args are not supported.");
  }
};
for (methodName in _ref) {
  method = _ref[methodName];
  if (!(method instanceof Function)) {
    continue;
  }
  if (ClassPrototype[methodName] != null) {
    continue;
  }
  if (methodName[0] === '_') {
    continue;
  }
  if (methodName.substr(0, 2) === 'to') {
    continue;
  }
  _fn();
}

ColorHolder;


},{"css-color":2}],43:[function(_dereq_,module,exports){
var Fill_, Transforms_, Transitioner, classic, easing, object, timing, _ref;

Fill_ = _dereq_('./mixin/Fill_');

Transforms_ = _dereq_('./mixin/Transforms_');

timing = _dereq_('../../../timing');

easing = _dereq_('timing-function');

_ref = _dereq_('utila'), classic = _ref.classic, object = _ref.object;

module.exports = classic.mix(Fill_, Transforms_, Transitioner = (function() {
  function Transitioner(el) {
    this.el = el;
    this._styleSetter = this.el._styleSetter;
    this._enabled = false;
    this._duration = 1000;
    this._startTime = -1;
    Transitioner.__initMixinsFor(this);
    this._needsUpdate = {
      transformMovement: false,
      transformRotation: false,
      transformScale: false,
      transformPerspective: false,
      transformLocalMovement: false,
      transformRotate3d: false,
      opacity: false
    };
    this._shouldUpdate = false;
    this.ease('cubic.easeOut');
  }

  Transitioner.prototype.ease = function(funcNameOrFirstNumOfCubicBezier, secondNum, thirdNum, fourthNum) {
    this._easing = easing.get.apply(easing, arguments);
    return this;
  };

  Transitioner.prototype.clone = function(el) {
    var key, newObj;
    newObj = Object.create(this.constructor.prototype);
    newObj.el = el;
    newObj._startTime = new Int32Array(1);
    newObj._startTime[0] = 0;
    newObj._styleSetter = el._styleSetter;
    newObj._needsUpdate = {
      transformMovement: false,
      transformRotation: false,
      transformScale: false,
      transformPerspective: false,
      transformLocalMovement: false,
      transformRotate3d: false,
      opacity: false
    };
    Transitioner.__applyClonersFor(this, [newObj]);
    for (key in this) {
      if (newObj[key] !== void 0) {
        continue;
      }
      if (this.hasOwnProperty(key)) {
        newObj[key] = object.clone(this[key], true);
      }
    }
    return newObj;
  };

  Transitioner.prototype.enable = function(duration) {
    this._enabled = true;
    this._duration = duration;
    return this;
  };

  Transitioner.prototype.disable = function() {
    this._enabled = false;
    this._stop();
    return this;
  };

  Transitioner.prototype._stop = function() {
    this._shouldUpdate = false;
    this._disableTransitionForTransforms();
    this._disableTransitionForFill();
  };

  Transitioner.prototype._update = function() {
    if (this._startTime === timing.time) {
      return;
    }
    this._startOver();
  };

  Transitioner.prototype._startOver = function() {
    this._startTime = timing.time;
    this._adjustFromValues();
    this._shouldUpdate = true;
    return this._scheduleUpdate();
  };

  Transitioner.prototype._adjustFromValues = function() {
    this._adjustFromValuesForTransforms();
    this._adjustFromValuesForFill();
    return this;
  };

  Transitioner.prototype._scheduleUpdate = function() {
    return this.el._scheduleUpdate();
  };

  Transitioner.prototype._updateTransition = function() {
    if (!this._enabled || !this._shouldUpdate) {
      return;
    }
    return this._updateForTime(timing.time);
  };

  Transitioner.prototype._updateForTime = function(t) {
    var ellapsed, progress;
    ellapsed = t - this._startTime;
    progress = ellapsed / this._duration;
    if (progress >= 1) {
      progress = 1;
    } else {
      this._scheduleUpdate();
    }
    progress = this._ease(progress);
    this._updateByProgress(progress);
    if (progress === 1) {
      this._stop();
    }
  };

  Transitioner.prototype._updateByProgress = function(progress) {
    this._updateTransitionForTransforms(progress);
    this._updateTransitionForFill(progress);
    return null;
  };

  Transitioner.prototype._ease = function(progress) {
    return this._easing(progress);
  };

  return Transitioner;

})());


},{"../../../timing":46,"./mixin/Fill_":44,"./mixin/Transforms_":45,"timing-function":23,"utila":30}],44:[function(_dereq_,module,exports){
var Fill_;

module.exports = Fill_ = (function() {
  function Fill_() {}

  Fill_.prototype.__initMixinFill = function() {
    this._fromFill = {
      opacity: null
    };
    this._toFill = {
      opacity: null
    };
    this._currentFill = this.el._styleSetter._fill;
  };

  Fill_.prototype.__clonerForFill = function(newTransitioner) {
    newTransitioner._currentFill = newTransitioner.el._styleSetter._fill;
  };

  Fill_.prototype._adjustFromValuesForFill = function() {
    this._fromFill.opacity = this._currentFill.opacity;
  };

  Fill_.prototype._disableTransitionForFill = function() {
    this._toFill.opacity = this._currentFill.opacity;
    this._needsUpdate.opacity = false;
  };

  Fill_.prototype._updateTransitionForFill = function(progress) {
    if (this._needsUpdate.opacity) {
      this._updateOpacity(progress);
    }
  };

  Fill_.prototype.setOpacity = function(d) {
    this._toFill.opacity = d;
    this._needsUpdate.opacity = true;
    this._update();
    return this;
  };

  Fill_.prototype.adjustOpacity = function(d) {
    this._toFill.opacity = this._currentFill.opacity + d;
    this._needsUpdate.opacity = true;
    this._update();
    return this;
  };

  Fill_.prototype._updateOpacity = function(progress) {
    this._styleSetter.setOpacity(this._fromFill.opacity + (this._toFill.opacity - this._fromFill.opacity) * progress);
  };

  return Fill_;

})();


},{}],45:[function(_dereq_,module,exports){
var Transformation, Transforms_;

Transformation = _dereq_('Transformation');

module.exports = Transforms_ = (function() {
  function Transforms_() {}

  Transforms_.prototype.__initMixinTransforms = function() {
    this._toMatrix = Transformation._emptyStack();
    this._fromMatrix = Transformation._emptyStack();
    return this._currentMatrix = this.el._styleSetter._transformer._current;
  };

  Transforms_.prototype.__clonerForTransforms = function(newTransitioner) {
    newTransitioner._currentMatrix = newTransitioner.el._styleSetter._transformer._current;
  };

  Transforms_.prototype._adjustFromValuesForTransforms = function() {
    this._fromMatrix.set(this._currentMatrix);
    return this;
  };

  Transforms_.prototype._disableTransitionForTransforms = function() {
    this._needsUpdate.transformMovement = false;
    this._needsUpdate.transformScale = false;
    this._needsUpdate.transformPerspective = false;
    this._needsUpdate.transformRotation = false;
    this._needsUpdate.transformLocalMovement = false;
    this._needsUpdate.transformLocalRotation = false;
    this._toMatrix.set(this._currentMatrix);
    return this;
  };

  Transforms_.prototype._updateTransitionForTransforms = function(progress) {
    if (this._needsUpdate.transformMovement) {
      this._updateMovement(progress);
    }
    if (this._needsUpdate.transformRotation) {
      this._updateRotation(progress);
    }
    if (this._needsUpdate.transformScale) {
      this._updateScale(progress);
    }
    if (this._needsUpdate.transformPerspective) {
      this._updatePerspective(progress);
    }
    if (this._needsUpdate.transformLocalMovement) {
      this._updateLocalMovement(progress);
    }
    if (this._needsUpdate.transformLocalRotation) {
      this._updateLocalRotation(progress);
    }
    if (this._needsUpdate.transformRotate3d) {
      this._updateRotate3d(progress);
    }
  };

  Transforms_.prototype._updateMovement = function(progress) {
    this._styleSetter.moveTo(this._fromMatrix[0] + ((this._toMatrix[0] - this._fromMatrix[0]) * progress), this._fromMatrix[1] + ((this._toMatrix[1] - this._fromMatrix[1]) * progress), this._fromMatrix[2] + ((this._toMatrix[2] - this._fromMatrix[2]) * progress));
    return null;
  };

  Transforms_.prototype._reportUpdateForMove = function() {
    if (this._needsUpdate.transformMovement) {
      return;
    }
    this._needsUpdate.transformMovement = true;
    this._toMatrix[0] = this._currentMatrix[0];
    this._toMatrix[1] = this._currentMatrix[1];
    this._toMatrix[2] = this._currentMatrix[2];
  };

  Transforms_.prototype.resetMovement = function() {
    this._reportUpdateForMove();
    this._toMatrix[0] = 0;
    this._toMatrix[1] = 0;
    this._toMatrix[2] = 0;
    this._update();
    return this;
  };

  Transforms_.prototype.moveTo = function(x, y, z) {
    this._reportUpdateForMove();
    this._toMatrix[0] = x;
    this._toMatrix[1] = y;
    this._toMatrix[2] = z;
    this._update();
    return this;
  };

  Transforms_.prototype.moveXTo = function(x) {
    this._reportUpdateForMove();
    this._toMatrix[0] = x;
    this._update();
    return this;
  };

  Transforms_.prototype.moveYTo = function(y) {
    this._reportUpdateForMove();
    this._toMatrix[1] = y;
    this._update();
    return this;
  };

  Transforms_.prototype.moveZTo = function(z) {
    this._reportUpdateForMove();
    this._toMatrix[2] = z;
    this._update();
    return this;
  };

  Transforms_.prototype.move = function(x, y, z) {
    this._reportUpdateForMove();
    this._toMatrix[0] = this._currentMatrix[0] + x;
    this._toMatrix[1] = this._currentMatrix[1] + y;
    this._toMatrix[2] = this._currentMatrix[2] + z;
    this._update();
    return this;
  };

  Transforms_.prototype.moveX = function(x) {
    this._reportUpdateForMove();
    this._toMatrix[0] = this._currentMatrix[0] + x;
    this._update();
    return this;
  };

  Transforms_.prototype.moveY = function(y) {
    this._reportUpdateForMove();
    this._toMatrix[1] = this._currentMatrix[1] + y;
    this._update();
    return this;
  };

  Transforms_.prototype.moveZ = function(z) {
    this._reportUpdateForMove();
    this._toMatrix[2] = this._currentMatrix[2] + z;
    this._update();
    return this;
  };


  /*
  	Scale
   */

  Transforms_.prototype._updateScale = function(progress) {
    this._styleSetter.scaleTo(this._fromMatrix[3] + ((this._toMatrix[3] - this._fromMatrix[3]) * progress), this._fromMatrix[4] + ((this._toMatrix[4] - this._fromMatrix[4]) * progress), this._fromMatrix[5] + ((this._toMatrix[5] - this._fromMatrix[5]) * progress));
    return null;
  };

  Transforms_.prototype._reportUpdateForScale = function() {
    if (this._needsUpdate.transformScale) {
      return;
    }
    this._needsUpdate.transformScale = true;
    this._toMatrix[3] = this._currentMatrix[3];
    this._toMatrix[4] = this._currentMatrix[4];
    this._toMatrix[5] = this._currentMatrix[5];
  };

  Transforms_.prototype.resetScale = function() {
    this._reportUpdateForScale();
    this._toMatrix[3] = 1;
    this._toMatrix[4] = 1;
    this._toMatrix[5] = 1;
    this._update();
    return this;
  };

  Transforms_.prototype.scaleTo = function(x, y, z) {
    this._reportUpdateForScale();
    this._toMatrix[3] = x;
    this._toMatrix[4] = y;
    this._toMatrix[5] = z;
    this._update();
    return this;
  };

  Transforms_.prototype.scaleXTo = function(x) {
    this._reportUpdateForScale();
    this._toMatrix[3] = x;
    this._update();
    return this;
  };

  Transforms_.prototype.scaleYTo = function(y) {
    this._reportUpdateForScale();
    this._toMatrix[4] = y;
    this._update();
    return this;
  };

  Transforms_.prototype.scaleZTo = function(z) {
    this._reportUpdateForScale();
    this._toMatrix[5] = z;
    this._update();
    return this;
  };

  Transforms_.prototype.scale = function(x, y, z) {
    this._reportUpdateForScale();
    this._toMatrix[3] = this._currentMatrix[3] * x;
    this._toMatrix[4] = this._currentMatrix[4] * y;
    this._toMatrix[5] = this._currentMatrix[5] * z;
    this._update();
    return this;
  };

  Transforms_.prototype.scaleAllTo = function(x) {
    this._reportUpdateForScale();
    this._toMatrix[3] = this._toMatrix[4] = this._toMatrix[5] = x;
    this._update();
    return this;
  };

  Transforms_.prototype.scaleX = function(x) {
    this._reportUpdateForScale();
    this._toMatrix[3] = this._currentMatrix[3] * x;
    this._update();
    return this;
  };

  Transforms_.prototype.scaleY = function(y) {
    this._reportUpdateForScale();
    this._toMatrix[4] = this._currentMatrix[4] * y;
    this._update();
    return this;
  };

  Transforms_.prototype.scaleZ = function(z) {
    this._reportUpdateForScale();
    this._toMatrix[5] = this._currentMatrix[5] * z;
    this._update();
    return this;
  };

  Transforms_.prototype._reportUpdateForPerspective = function() {
    if (this._needsUpdate.transformPerspective) {
      return;
    }
    this._needsUpdate.transformPerspective = true;
    this._toMatrix[6] = this._currentMatrix[6];
  };


  /*
  	Perspective
   */

  Transforms_.prototype._updatePerspective = function(progress) {
    this._styleSetter.perspective(this._fromMatrix[6] + ((this._toMatrix[6] - this._fromMatrix[6]) * progress));
    return null;
  };

  Transforms_.prototype.resetPerspective = function() {
    this._reportUpdateForPerspective();
    this._toMatrix[6] = 0;
    this._update();
    return this;
  };

  Transforms_.prototype.perspective = function(d) {
    this._reportUpdateForPerspective();
    this._toMatrix[6] = d;
    this._update();
    return this;
  };


  /*
  	Rotation
   */

  Transforms_.prototype._updateRotation = function(progress) {
    this._styleSetter.rotateTo(this._fromMatrix[7] + ((this._toMatrix[7] - this._fromMatrix[7]) * progress), this._fromMatrix[8] + ((this._toMatrix[8] - this._fromMatrix[8]) * progress), this._fromMatrix[9] + ((this._toMatrix[9] - this._fromMatrix[9]) * progress));
    return null;
  };

  Transforms_.prototype._reportUpdateForRotation = function() {
    if (this._needsUpdate.transformRotation) {
      return;
    }
    this._needsUpdate.transformRotation = true;
    this._toMatrix[7] = this._currentMatrix[7];
    this._toMatrix[8] = this._currentMatrix[8];
    this._toMatrix[9] = this._currentMatrix[9];
  };

  Transforms_.prototype.resetRotation = function() {
    this._reportUpdateForRotation();
    this._toMatrix[7] = 0;
    this._toMatrix[8] = 0;
    this._toMatrix[9] = 0;
    this._update();
    return this;
  };

  Transforms_.prototype.rotateTo = function(x, y, z) {
    this._reportUpdateForRotation();
    this._toMatrix[7] = x;
    this._toMatrix[8] = y;
    this._toMatrix[9] = z;
    this._update();
    return this;
  };

  Transforms_.prototype.rotateXTo = function(x) {
    this._reportUpdateForRotation();
    this._toMatrix[7] = x;
    this._update();
    return this;
  };

  Transforms_.prototype.rotateYTo = function(y) {
    this._reportUpdateForRotation();
    this._toMatrix[8] = y;
    this._update();
    return this;
  };

  Transforms_.prototype.rotateZTo = function(z) {
    this._reportUpdateForRotation();
    this._toMatrix[9] = z;
    this._update();
    return this;
  };

  Transforms_.prototype.rotate = function(x, y, z) {
    this._reportUpdateForRotation();
    this._toMatrix[7] = this._currentMatrix[7] + x;
    this._toMatrix[8] = this._currentMatrix[8] + y;
    this._toMatrix[9] = this._currentMatrix[9] + z;
    this._update();
    return this;
  };

  Transforms_.prototype.rotateX = function(x) {
    this._reportUpdateForRotation();
    this._toMatrix[7] = this._currentMatrix[7] + x;
    this._update();
    return this;
  };

  Transforms_.prototype.rotateY = function(y) {
    this._reportUpdateForRotation();
    this._toMatrix[8] = this._currentMatrix[8] + y;
    this._update();
    return this;
  };

  Transforms_.prototype.rotateZ = function(z) {
    this._reportUpdateForRotation();
    this._toMatrix[9] = this._currentMatrix[9] + z;
    this._update();
    return this;
  };


  /*
  	LocalMovement
   */

  Transforms_.prototype._updateLocalMovement = function(progress) {
    this._styleSetter.localMoveTo(this._fromMatrix[10] + ((this._toMatrix[10] - this._fromMatrix[10]) * progress), this._fromMatrix[11] + ((this._toMatrix[11] - this._fromMatrix[11]) * progress), this._fromMatrix[12] + ((this._toMatrix[12] - this._fromMatrix[12]) * progress));
    return null;
  };

  Transforms_.prototype._reportUpdateForLocalMovement = function() {
    if (this._needsUpdate.transformLocalMovement) {
      return;
    }
    this._needsUpdate.transformLocalMovement = true;
    this._toMatrix[10] = this._currentMatrix[10];
    this._toMatrix[11] = this._currentMatrix[11];
    this._toMatrix[12] = this._currentMatrix[12];
  };

  Transforms_.prototype.resetLocalMovement = function() {
    this._reportUpdateForLocalMovement();
    this._toMatrix[10] = 0;
    this._toMatrix[11] = 0;
    this._toMatrix[12] = 0;
    this._update();
    return this;
  };

  Transforms_.prototype.localMoveTo = function(x, y, z) {
    this._reportUpdateForLocalMovement();
    this._toMatrix[10] = x;
    this._toMatrix[11] = y;
    this._toMatrix[12] = z;
    this._update();
    return this;
  };

  Transforms_.prototype.localMoveXTo = function(x) {
    this._reportUpdateForLocalMovement();
    this._toMatrix[10] = x;
    this._update();
    return this;
  };

  Transforms_.prototype.localMoveYTo = function(y) {
    this._reportUpdateForLocalMovement();
    this._toMatrix[11] = y;
    this._update();
    return this;
  };

  Transforms_.prototype.localMoveZTo = function(z) {
    this._reportUpdateForLocalMovement();
    this._toMatrix[12] = z;
    this._update();
    return this;
  };

  Transforms_.prototype.localMove = function(x, y, z) {
    this._reportUpdateForLocalMovement();
    this._toMatrix[10] = this._currentMatrix[10] + x;
    this._toMatrix[11] = this._currentMatrix[11] + y;
    this._toMatrix[12] = this._currentMatrix[12] + z;
    this._update();
    return this;
  };

  Transforms_.prototype.localMoveX = function(x) {
    this._reportUpdateForLocalMovement();
    this._toMatrix[10] = this._currentMatrix[10] + x;
    this._update();
    return this;
  };

  Transforms_.prototype.localMoveY = function(y) {
    this._reportUpdateForLocalMovement();
    this._toMatrix[11] = this._currentMatrix[11] + y;
    this._update();
    return this;
  };

  Transforms_.prototype.localMoveZ = function(z) {
    this._reportUpdateForLocalMovement();
    this._toMatrix[12] = this._currentMatrix[12] + z;
    this._update();
    return this;
  };


  /*
  	Rotation
   */

  Transforms_.prototype._updateLocalRotation = function(progress) {
    this._styleSetter.localRotateTo(this._fromMatrix[13] + ((this._toMatrix[13] - this._fromMatrix[13]) * progress), this._fromMatrix[14] + ((this._toMatrix[14] - this._fromMatrix[14]) * progress), this._fromMatrix[15] + ((this._toMatrix[15] - this._fromMatrix[15]) * progress));
    return null;
  };

  Transforms_.prototype._reportUpdateForLocalRotation = function() {
    if (this._needsUpdate.transformLocalRotation) {
      return;
    }
    this._needsUpdate.transformLocalRotation = true;
    this._toMatrix[13] = this._currentMatrix[13];
    this._toMatrix[14] = this._currentMatrix[14];
    this._toMatrix[15] = this._currentMatrix[15];
  };

  Transforms_.prototype.resetLocalRotation = function() {
    this._reportUpdateForLocalRotation();
    this._toMatrix[13] = 0;
    this._toMatrix[14] = 0;
    this._toMatrix[15] = 0;
    this._update();
    return this;
  };

  Transforms_.prototype.localRotateTo = function(x, y, z) {
    this._reportUpdateForLocalRotation();
    this._toMatrix[13] = x;
    this._toMatrix[14] = y;
    this._toMatrix[15] = z;
    this._update();
    return this;
  };

  Transforms_.prototype.localRotateXTo = function(x) {
    this._reportUpdateForLocalRotation();
    this._toMatrix[13] = x;
    this._update();
    return this;
  };

  Transforms_.prototype.localRotateYTo = function(y) {
    this._reportUpdateForLocalRotation();
    this._toMatrix[14] = y;
    this._update();
    return this;
  };

  Transforms_.prototype.localRotateZTo = function(z) {
    this._reportUpdateForLocalRotation();
    this._toMatrix[15] = z;
    this._update();
    return this;
  };

  Transforms_.prototype.localRotate = function(x, y, z) {
    this._reportUpdateForLocalRotation();
    this._toMatrix[13] = this._currentMatrix[13] + x;
    this._toMatrix[14] = this._currentMatrix[14] + y;
    this._toMatrix[15] = this._currentMatrix[15] + z;
    this._update();
    return this;
  };

  Transforms_.prototype.localRotateX = function(x) {
    this._reportUpdateForLocalRotation();
    this._toMatrix[13] = this._currentMatrix[13] + x;
    this._update();
    return this;
  };

  Transforms_.prototype.localRotateY = function(y) {
    this._reportUpdateForLocalRotation();
    this._toMatrix[14] = this._currentMatrix[14] + y;
    this._update();
    return this;
  };

  Transforms_.prototype.localRotateZ = function(z) {
    this._reportUpdateForLocalRotation();
    this._toMatrix[15] = this._currentMatrix[15] + z;
    this._update();
    return this;
  };

  Transforms_.prototype._updateRotate3d = function(progress) {
    this._styleSetter.rotate3d(this._fromMatrix[16] + ((this._toMatrix[16] - this._fromMatrix[16]) * progress), this._fromMatrix[17] + ((this._toMatrix[17] - this._fromMatrix[17]) * progress), this._fromMatrix[18] + ((this._toMatrix[18] - this._fromMatrix[18]) * progress), this._fromMatrix[19] + ((this._toMatrix[19] - this._fromMatrix[19]) * progress));
    return null;
  };

  Transforms_.prototype._reportUpdateForRotate3d = function() {
    if (this._needsUpdate.transformRotate3d) {
      return;
    }
    this._needsUpdate.transformRotate3d = true;
    this._toMatrix[16] = this._currentMatrix[16];
    this._toMatrix[17] = this._currentMatrix[17];
    this._toMatrix[18] = this._currentMatrix[18];
    this._toMatrix[19] = this._currentMatrix[19];
  };

  Transforms_.prototype.rotate3d = function(x, y, z, amount) {
    this._reportUpdateForRotate3d();
    this._toMatrix[16] = x;
    this._toMatrix[17] = y;
    this._toMatrix[18] = z;
    this._toMatrix[19] = amount;
    this._update();
    return this;
  };

  Transforms_.prototype.resetAll = function() {
    this.resetMovement();
    this.resetScale();
    this.resetPerspective();
    this.resetRotation();
    this.resetLocalMovement();
    return this.resetLocalRotation();
  };

  return Transforms_;

})();


},{"Transformation":1}],46:[function(_dereq_,module,exports){
var Timing, timing;

Timing = _dereq_('raf-timing');

timing = new Timing;

timing.start();

module.exports = timing;


},{"raf-timing":16}],47:[function(_dereq_,module,exports){
var css, cssPropertySetter, getCSSProp, getPossiblePropsFor;

getCSSProp = (function() {
  var el, p;
  p = null;
  el = document.createElement('div');
  return function(possibleProps) {
    var prop, _i, _len;
    for (_i = 0, _len = possibleProps.length; _i < _len; _i++) {
      prop = possibleProps[_i];
      if (el.style[prop] !== void 0) {
        return prop;
      }
    }
    return false;
  };
})();

cssPropertySetter = function(prop) {
  var actualProp;
  actualProp = getCSSProp(getPossiblePropsFor(prop));
  if (!actualProp) {
    return (function() {});
  }
  return function(el, v) {
    return el.style[actualProp] = v;
  };
};

getPossiblePropsFor = function(prop) {
  return ['webkit' + prop[0].toUpperCase() + prop.substr(1, prop.length), 'moz' + prop[0].toUpperCase() + prop.substr(1, prop.length), prop];
};

module.exports = css = {
  setTransform: cssPropertySetter('transform'),
  setTransformStyle: cssPropertySetter('transformStyle'),
  setTransformOrigin: cssPropertySetter('transformOrigin'),
  setCssFilter: cssPropertySetter('filter'),
  setTransitionDuration: cssPropertySetter('transitionDuration'),
  setTransitionTimingFunction: cssPropertySetter('transitionTimingFunction'),
  rgb: function(r, g, b) {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
};


},{}],48:[function(_dereq_,module,exports){
var lazyValues;

module.exports = lazyValues = {};

lazyValues.getLazyValue = function(val) {
  if ((val._isLazy != null) && val._isLazy) {
    return val();
  } else {
    return val;
  }
};

lazyValues.getLazyValues = function(ar) {
  var item, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = ar.length; _i < _len; _i++) {
    item = ar[_i];
    _results.push(lazyValues.getLazyValue(item));
  }
  return _results;
};

lazyValues.returnLazily = function(fn) {
  return function() {
    var args, ret;
    args = arguments;
    ret = (function(_this) {
      return function() {
        return fn.apply(_this, args);
      };
    })(this);
    ret._isLazy = true;
    return ret;
  };
};

lazyValues.acceptLazyArgs = function(fn) {
  return function() {
    var args;
    args = lazyValues.getLazyValues(arguments);
    return fn.apply(this, args);
  };
};

lazyValues.acceptAndReturnLazily = function(fn) {
  return lazyValues.returnLazily(lazyValues.acceptLazyArgs(fn));
};

lazyValues;


},{}],49:[function(_dereq_,module,exports){
module.exports=_dereq_(1)
},{}],50:[function(_dereq_,module,exports){
module.exports=_dereq_(2)
},{}],51:[function(_dereq_,module,exports){
module.exports=_dereq_(3)
},{"./filter/blur":52,"./filter/brightness":53,"./filter/contrast":54,"./filter/grayscale":55,"./filter/hueRotate":56,"./filter/invert":57,"./filter/opacity":58,"./filter/saturate":59,"./filter/sepia":60}],52:[function(_dereq_,module,exports){
module.exports=_dereq_(4)
},{}],53:[function(_dereq_,module,exports){
module.exports=_dereq_(5)
},{}],54:[function(_dereq_,module,exports){
module.exports=_dereq_(6)
},{}],55:[function(_dereq_,module,exports){
module.exports=_dereq_(7)
},{}],56:[function(_dereq_,module,exports){
module.exports=_dereq_(8)
},{}],57:[function(_dereq_,module,exports){
module.exports=_dereq_(9)
},{}],58:[function(_dereq_,module,exports){
module.exports=_dereq_(10)
},{}],59:[function(_dereq_,module,exports){
module.exports=_dereq_(11)
},{}],60:[function(_dereq_,module,exports){
module.exports=_dereq_(12)
},{}],61:[function(_dereq_,module,exports){
module.exports=_dereq_(13)
},{"./_Interface":62}],62:[function(_dereq_,module,exports){
module.exports=_dereq_(14)
},{}],63:[function(_dereq_,module,exports){
module.exports=_dereq_(15)
},{"utila/scripts/js/lib/array":75}],64:[function(_dereq_,module,exports){
module.exports=_dereq_(16)
},{"./Priority":63,"./Waiter":65,"./nextTick":66,"./raf":69}],65:[function(_dereq_,module,exports){
module.exports=_dereq_(17)
},{"./pool/interval":67,"./pool/timeout":68,"utila/scripts/js/lib/array":75}],66:[function(_dereq_,module,exports){
module.exports=_dereq_(18)
},{}],67:[function(_dereq_,module,exports){
module.exports=_dereq_(19)
},{}],68:[function(_dereq_,module,exports){
module.exports=_dereq_(20)
},{}],69:[function(_dereq_,module,exports){
module.exports=_dereq_(21)
},{}],70:[function(_dereq_,module,exports){
module.exports=_dereq_(22)
},{}],71:[function(_dereq_,module,exports){
module.exports=_dereq_(23)
},{"./UnitBezier":70}],72:[function(_dereq_,module,exports){
module.exports=_dereq_(1)
},{}],73:[function(_dereq_,module,exports){
module.exports=_dereq_(25)
},{}],74:[function(_dereq_,module,exports){
module.exports=_dereq_(26)
},{}],75:[function(_dereq_,module,exports){
module.exports=_dereq_(27)
},{"./_common":74}],76:[function(_dereq_,module,exports){
module.exports=_dereq_(28)
},{}],77:[function(_dereq_,module,exports){
module.exports=_dereq_(29)
},{"./_common":74}],78:[function(_dereq_,module,exports){
module.exports=_dereq_(30)
},{"./array":75,"./classic":76,"./object":77}],79:[function(_dereq_,module,exports){
module.exports=_dereq_(31)
},{"./el/mixin/Chain_":80,"./el/mixin/Styles_":81,"./el/mixin/Timing_":82,"./timing":94,"./utility/lazyValues":96,"utila":78}],80:[function(_dereq_,module,exports){
module.exports=_dereq_(32)
},{"method-chain":61}],81:[function(_dereq_,module,exports){
module.exports=_dereq_(33)
},{"../../timing":94,"./styleSetter/StyleSetter":83,"./transitioner/Transitioner":91}],82:[function(_dereq_,module,exports){
module.exports=_dereq_(34)
},{"../../timing":94,"utila":78}],83:[function(_dereq_,module,exports){
module.exports=_dereq_(35)
},{"./mixin/Fill_":84,"./mixin/Filters_":85,"./mixin/Generals_":86,"./mixin/Layout_":87,"./mixin/Transforms_":88,"./mixin/Typography_":89,"utila":78}],84:[function(_dereq_,module,exports){
module.exports=_dereq_(36)
},{"../../../../utility/css":95,"../tools/ColorHolder":90}],85:[function(_dereq_,module,exports){
module.exports=_dereq_(37)
},{"../../../../utility/css":95,"css-filter":51}],86:[function(_dereq_,module,exports){
module.exports=_dereq_(38)
},{"../../../../utility/css":95}],87:[function(_dereq_,module,exports){
module.exports=_dereq_(39)
},{}],88:[function(_dereq_,module,exports){
module.exports=_dereq_(40)
},{"../../../../utility/css":95,"transformation":72,"transformation/scripts/js/lib/cssify":73}],89:[function(_dereq_,module,exports){
module.exports=_dereq_(41)
},{"../../../../utility/css":95}],90:[function(_dereq_,module,exports){
module.exports=_dereq_(42)
},{"css-color":50}],91:[function(_dereq_,module,exports){
module.exports=_dereq_(43)
},{"../../../timing":94,"./mixin/Fill_":92,"./mixin/Transforms_":93,"timing-function":71,"utila":78}],92:[function(_dereq_,module,exports){
module.exports=_dereq_(44)
},{}],93:[function(_dereq_,module,exports){
module.exports=_dereq_(45)
},{"Transformation":49}],94:[function(_dereq_,module,exports){
module.exports=_dereq_(46)
},{"raf-timing":64}],95:[function(_dereq_,module,exports){
module.exports=_dereq_(47)
},{}],96:[function(_dereq_,module,exports){
module.exports=_dereq_(48)
},{}],97:[function(_dereq_,module,exports){
module.exports = {
  Touchy: _dereq_('./Touchy'),
  TouchyEl: _dereq_('./touchy/TouchyEl')
};


},{"./Touchy":98,"./touchy/TouchyEl":99}],98:[function(_dereq_,module,exports){
var Touchy, TouchyEl;

TouchyEl = _dereq_('./touchy/TouchyEl');

module.exports = Touchy = (function() {
  function Touchy(root) {
    this.root = root;
    this._listen();
    this._activelyBeingTouched = false;
    this._data = {};
  }

  Touchy.prototype._listen = function() {
    var _this = this;
    this.root.addEventListener('touchstart', function(e) {
      _this._touchStart(e);
      e.stopPropagation();
      return e.preventDefault();
    });
    this.root.addEventListener('touchmove', function(e) {
      _this._touchMove(e);
      e.stopPropagation();
      return e.preventDefault();
    });
    return this.root.addEventListener('touchend', function(e) {
      _this._touchEnd(e);
      e.stopPropagation();
      return e.preventDefault();
    });
  };

  Touchy.prototype._reset = function() {
    this._data = {};
    return this._activelyBeingTouched = false;
  };

  Touchy.prototype._touchStart = function(e) {
    if (this._activelyBeingTouched) {
      return this._touchStartWhenActive(e);
    } else {
      return this._start(e);
    }
  };

  Touchy.prototype._touchStartWhenActive = function(e) {};

  Touchy.prototype._start = function(e) {
    var mainTouch;
    mainTouch = e.touches[0];
    this._data.touchStartTime = Date.now();
    this._determineTargets(mainTouch.target);
    return this._activelyBeingTouched = true;
  };

  Touchy.prototype._touchEnd = function(e) {
    if (e.touches.length === 0) {
      if (this._data.isMove == null) {
        if (Date.now() - this._data.touchStartTime < 250) {
          this._reportTap(e);
        }
      } else {
        this._endMove();
      }
      this._reset();
    } else {
      if (this._data.isMove != null) {
        this._handleEndForMove(e);
      }
    }
  };

  Touchy.prototype._reportTap = function(e) {
    var touch;
    if (this._data.tapTarget != null) {
      touch = e.changedTouches[0];
      this._data.tapTarget._fire('tap', {
        x: touch.screenX,
        y: touch.screenY
      });
    }
  };

  Touchy.prototype._touchMove = function(e) {
    if (this._data.howManyMoves == null) {
      this._data.howManyMoves = 1;
    } else {
      this._data.howManyMoves++;
    }
    if (this._data.isMove == null) {
      if (this._data.howManyMoves > 3) {
        this._data.isMove = true;
      } else if (Date.now() - this._data.touchStartTime >= 250) {
        this._data.isMove = true;
      }
    }
    if (this._data.isMove != null) {
      return this._handleMove(e);
    }
  };

  Touchy.prototype._handleMove = function(e) {
    var x, y;
    if (this._data.moveTarget == null) {
      return;
    }
    if (this._data.startX == null) {
      return this._initMoveFromEvent(e);
    }
    x = e.touches[0].pageX - this._data.startX;
    y = e.touches[0].pageY - this._data.startY;
    this._data.lastMoveEvent = {
      x: x - this._data.lastX,
      y: y - this._data.lastY,
      absX: x,
      absY: y
    };
    this._data.moveTarget._fire('move', this._data.lastMoveEvent);
    this._data.lastX = x;
    this._data.lastY = y;
  };

  Touchy.prototype._endMove = function() {
    if (this._data.moveTarget != null) {
      return this._data.moveTarget._fire('move:end', this._data.lastMoveEvent);
    }
  };

  Touchy.prototype._handleEndForMove = function(e) {
    if (e.changedTouches[0].identifier !== this._data.id) {
      return;
    }
    this._data.id = e.touches[0].identifier;
    this._data.startX = e.touches[0].pageX - (e.changedTouches[0].pageX - this._data.startX);
    return this._data.startY = e.touches[0].pageY - (e.changedTouches[0].pageY - this._data.startY);
  };

  Touchy.prototype._initMoveFromEvent = function(e) {
    this._data.startX = e.touches[0].pageX;
    this._data.startY = e.touches[0].pageY;
    this._data.lastX = 0;
    this._data.lastY = 0;
    return this._data.id = e.touches[0].identifier;
  };

  Touchy.prototype._determineTargets = function(node) {
    var el, _results;
    _results = [];
    while (true) {
      if (node === window.document) {
        break;
      }
      el = TouchyEl.get(node);
      if (this._data.tapTarget == null) {
        if (el.listensTo('tap')) {
          this._data.tapTarget = el;
        }
      }
      if (!this._data.moveTarget) {
        if (el.listensTo('move')) {
          this._data.moveTarget = el;
        }
      }
      if ((this._data.tapTarget != null) && (this._data.moveTarget != null)) {
        break;
      }
      _results.push(node = node.parentNode);
    }
    return _results;
  };

  return Touchy;

})();


},{"./touchy/TouchyEl":99}],99:[function(_dereq_,module,exports){
var TouchyEl;

module.exports = TouchyEl = (function() {
  TouchyEl._ids = [];

  TouchyEl.get = function(el) {
    var id, newEl;
    if (el instanceof TouchyEl) {
      return el;
    }
    if (id = el.getAttribute('touchy-id')) {
      return TouchyEl.getById(id);
    }
    TouchyEl._ids.push(newEl = new TouchyEl(el, TouchyEl._ids.length));
    return newEl;
  };

  TouchyEl.getById = function(id) {
    return this._ids[id];
  };

  function TouchyEl(node, id) {
    this.node = node;
    this.id = id;
    this._listeners = {};
    this.node.setAttribute('touchy-id', this.id);
    this._listensTo = {
      move: false,
      tap: false
    };
  }

  TouchyEl.prototype.listensTo = function(what) {
    if (this._listensTo[what] != null) {
      return this._listensTo[what];
    } else {
      return false;
    }
  };

  TouchyEl.prototype.on = function(eventName, listener) {
    if (eventName === 'move') {
      this._listensTo.move = true;
    } else if (eventName === 'tap') {
      this._listensTo.tap = true;
    }
    if (this._listeners[eventName] == null) {
      this._listeners[eventName] = [];
    }
    this._listeners[eventName].push(listener);
    return this;
  };

  TouchyEl.prototype._fire = function(eventName, data) {
    var listener, listeners, _i, _len;
    listeners = this._listeners[eventName];
    if (listeners == null) {
      return;
    }
    for (_i = 0, _len = listeners.length; _i < _len; _i++) {
      listener = listeners[_i];
      listener.call(this, data);
    }
    return this;
  };

  return TouchyEl;

})();


},{}],100:[function(_dereq_,module,exports){
var array;

module.exports = array = {

  /*
  	Tries to turn anything into an array.
   */
  from: function(r) {
    return Array.prototype.slice.call(r);
  },

  /*
  	Clone of an array. Properties will be shallow copies.
   */
  simpleClone: function(a) {
    return a.slice(0);
  },
  shallowEqual: function(a1, a2) {
    var i, val, _i, _len;
    if (!(Array.isArray(a1) && Array.isArray(a2) && a1.length === a2.length)) {
      return false;
    }
    for (i = _i = 0, _len = a1.length; _i < _len; i = ++_i) {
      val = a1[i];
      if (a2[i] !== val) {
        return false;
      }
    }
    return true;
  },
  pluck: function(a, i) {
    var index, value, _i, _len;
    if (a.length < 1) {
      return a;
    }
    for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
      value = a[index];
      if (index > i) {
        a[index - 1] = a[index];
      }
    }
    a.length = a.length - 1;
    return a;
  },
  pluckItem: function(a, item) {
    var index, removed, value, _i, _len;
    if (a.length < 1) {
      return a;
    }
    removed = 0;
    for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
      value = a[index];
      if (value === item) {
        removed++;
        continue;
      }
      if (removed !== 0) {
        a[index - removed] = a[index];
      }
    }
    if (removed > 0) {
      a.length = a.length - removed;
    }
    return a;
  },
  pluckOneItem: function(a, item) {
    var index, reached, value, _i, _len;
    if (a.length < 1) {
      return a;
    }
    reached = false;
    for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
      value = a[index];
      if (!reached) {
        if (value === item) {
          reached = true;
          continue;
        }
      } else {
        a[index - 1] = a[index];
      }
    }
    if (reached) {
      a.length = a.length - 1;
    }
    return a;
  },
  pluckByCallback: function(a, cb) {
    var index, removed, value, _i, _len;
    if (a.length < 1) {
      return a;
    }
    removed = 0;
    for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
      value = a[index];
      if (cb(value, index)) {
        removed++;
        continue;
      }
      if (removed !== 0) {
        a[index - removed] = a[index];
      }
    }
    if (removed > 0) {
      a.length = a.length - removed;
    }
    return a;
  },
  pluckMultiple: function(array, indexesToRemove) {
    var i, removedSoFar, _i, _len;
    if (array.length < 1) {
      return array;
    }
    removedSoFar = 0;
    indexesToRemove.sort();
    for (_i = 0, _len = indexesToRemove.length; _i < _len; _i++) {
      i = indexesToRemove[_i];
      this.pluck(array, i - removedSoFar);
      removedSoFar++;
    }
    return array;
  },
  injectByCallback: function(a, toInject, shouldInject) {
    var i, len, val, valA, valB, _i, _len;
    valA = null;
    valB = null;
    len = a.length;
    if (len < 1) {
      a.push(toInject);
      return a;
    }
    for (i = _i = 0, _len = a.length; _i < _len; i = ++_i) {
      val = a[i];
      valA = valB;
      valB = val;
      if (shouldInject(valA, valB, toInject)) {
        return a.splice(i, 0, toInject);
      }
    }
    a.push(toInject);
    return a;
  },
  injectInIndex: function(a, index, toInject) {
    var i, len, toPut, toPutNext;
    len = a.length;
    i = index;
    if (len < 1) {
      a.push(toInject);
      return a;
    }
    toPut = toInject;
    toPutNext = null;
    for(; i <= len; i++){

			toPutNext = a[i];

			a[i] = toPut;

			toPut = toPutNext;

		};
    return null;
  }
};


},{}],101:[function(_dereq_,module,exports){
var Model, MusicPlayerModel, PageModel, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = _dereq_('./_Emitter');

MusicPlayerModel = _dereq_('./MusicPlayerModel');

PageModel = _dereq_('./PageModel');

module.exports = Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    Model.__super__.constructor.apply(this, arguments);
    this.musicPlayer = new MusicPlayerModel(this);
    this.page = new PageModel(this);
  }

  Model.prototype.getHomeList = function() {
    return setTimeout((function(_this) {
      return function() {
        var json;
        json = '[{"id":"140863","type":"song","artist":"mostafa yeganeh","artist_id":"116","songname":"Bavar Kardani Nist","popularity":"3.4","ratecount":"15","view":"3393","time":"2:59","date":"1393-04-13","poster":"http:\/\/85.25.243.154\/img\/5oh2a70em-1404491150.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/Gallery\/[Medium]\/bc6dsgnp-1404491150.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/mostafa+yeganeh\/-\/Bavar+Kardani+Nist","mp3":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3"},{"id":"140809","type":"song","artist":"Masoud Emami","artist_id":"1905","songname":"Khoda Doosam Dasht","popularity":"3.6","ratecount":"9","view":"4457","time":"3:33","date":"1393-04-12","poster":"http:\/\/85.25.243.154\/img\/utxrohick-1404397432.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Gallery\/[Medium]\/2u6wzwdn-1404397432.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Masoud+Emami\/-\/Khoda+Doosam+Dasht","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3"},{"id":"140785","type":"song","artist":"Amin Hayaei","artist_id":"12201","songname":"Owje Parvaz","popularity":"3.8","ratecount":"8","view":"2205","time":"5:22","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/gq9zswptj-1404332339.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/Gallery\/[Medium]\/qixdrptt-1404332339.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amin+Hayaei\/-\/Owje+Parvaz","mp3":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3"},{"id":"140782","type":"song","artist":"Bakhtak Band","artist_id":"11623","songname":"Dame Sobh","popularity":"2.6","ratecount":"8","view":"2966","time":"3:27","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/1spygoohm-1404322313.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/Gallery\/[Medium]\/hxb0sre5-1404322313.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/-\/Dame+Sobh","mp3":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3"},{"id":"9826","type":"album","artist":"Mohsen-sharifian","artist_id":"631","album":"Dingue Marrow","trackcount":"9","popularity":"5","date":"1393-04-14","url":"http:\/\/www.wikiseda.com\/Mohsen-sharifian\/Dingue+Marrow","view":"551","poster":"http:\/\/85.25.243.154\/img\/un79cef6qp-1404554657.jpg","year":"1393"},{"id":"9821","type":"album","artist":"O-hum","artist_id":"3927","album":"Hafez In Love","trackcount":"4","popularity":"5","date":"1393-04-08","url":"http:\/\/www.wikiseda.com\/O-hum\/Hafez+In+Love","view":"1756","poster":"http:\/\/85.25.243.154\/img\/1xxwe9fwdz-1404025213.jpg","year":"1393"},{"id":"9809","type":"album","artist":"Alireza Ghorbani","artist_id":"472","album":"Raftamo Bare Safar Bastam","trackcount":"6","popularity":"4.7","date":"1393-04-02","url":"http:\/\/www.wikiseda.com\/Alireza+Ghorbani\/Raftamo+Bare+Safar+Bastam","view":"18170","poster":"http:\/\/85.25.243.154\/img\/pf2m3p18sw-1403542665.jpg","year":"1393"},{"id":"9807","type":"album","artist":"Salar Aghili","artist_id":"97","album":"Vatan","trackcount":"9","popularity":"4.8","date":"1393-03-31","url":"http:\/\/www.wikiseda.com\/Salar+Aghili\/Vatan","view":"10829","poster":"http:\/\/85.25.243.154\/img\/obldv0b5l4-1403360590.jpg","year":"1393"},{"id":"4023","type":"video","artist":"Matin do hanjare","poster":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/[Gallery]\/8c1e2f4f65d428d910ece8e1c83cbc26-3.jpg","time":"3:2","videoname":"Marg Bar Man","lowq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-h.mp4","popularity":"3.8","view":"2292","url":"http:\/\/www.wikiseda.com\/Matin+do+hanjare\/+video\/Marg+Bar+Man","year":"1393"},{"id":"4022","type":"video","artist":"Amir Farjam","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/[Gallery]\/5fddee48dfa042d0664b066720a71bda-3.jpg","time":"3:32","videoname":"KHodaya","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-h.mp4","popularity":"5","view":"1769","url":"http:\/\/www.wikiseda.com\/Amir+Farjam\/+video\/KHodaya","year":"1393"},{"id":"4021","type":"video","artist":"Emo Band","poster":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/[Gallery]\/6ab639b8fef2f4fe7f9841d6f8d9f70d-3.jpg","time":"4:34","videoname":"Donyamo Live","lowq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-l.mp4","highq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-h.mp4","popularity":"4.1","view":"1728","url":"http:\/\/www.wikiseda.com\/Emo+Band\/+video\/Donyamo+Live","year":"1393"},{"id":"4019","type":"video","artist":"Amir Tataloo","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/[Gallery]\/d2931b538ae36b30847c9c139610311a-3.jpg","time":"3:29","videoname":"Baa To","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-h.mp4","popularity":"4.2","view":"10730","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/+video\/Baa+To","year":"1393"}]';
        return _this._emit('home-list', JSON.parse(json));
      };
    })(this), 2500);
  };

  return Model;

})(_Emitter);

/*
//@ sourceMappingURL=Model.map
*/

},{"./MusicPlayerModel":102,"./PageModel":103,"./_Emitter":104}],102:[function(_dereq_,module,exports){
var MusicPlayerModel, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = _dereq_('./_Emitter');

module.exports = MusicPlayerModel = (function(_super) {
  __extends(MusicPlayerModel, _super);

  function MusicPlayerModel(rootModel) {
    this.rootModel = rootModel;
    MusicPlayerModel.__super__.constructor.apply(this, arguments);
    this.playing = false;
    this.playingId = 0;
    this.audioTag = document.createElement('audio');
    document.body.appendChild(this.audioTag);
  }

  MusicPlayerModel.prototype.play = function(data) {
    this._emit('play-music', data);
    if (data.id === this.playingId) {
      return;
    }
    if (this.playing) {
      this.audioTag.pause();
    }
    this.audioTag.src = data.mp3;
    this.audioTag.play();
    this.playing = true;
    this.playingId = data.id;
    return this.getMoreDetail(data.id);
  };

  MusicPlayerModel.prototype.toggle = function() {
    if (this.playing) {
      this.audioTag.pause();
      this._emit('music-pause');
    } else {
      this.audioTag.play();
      this._emit('music-unpause');
    }
    return this.playing = !this.playing;
  };

  MusicPlayerModel.prototype.getMoreDetail = function(id) {
    return setTimeout((function(_this) {
      return function() {
        var json;
        json = '{"lyric":"<p>\u0639\u0634\u0642 \u0627\u062d\u0633\u0627\u0633\u0647 \u0646\u0647 \u0645\u0639\u0627\u062f\u0644\u0647<\/p><p>\u0628\u062e\u0648\u0627\u06cc \u062d\u0644\u0634 \u06a9\u0646\u06cc \u0645\u06cc\u0634\u0647 \u0645\u0628\u0627\u062f\u0644\u0647<\/p><p>\u0627\u06cc\u0646 \u0645\u0628\u0627\u062f\u0644\u0647 \u0645\u06cc\u0634\u0647 \u0645\u062c\u0627\u062f\u0644\u0647<\/p><p>\u0647\u06cc\u0634\u06a9\u06cc \u0647\u06cc\u0686\u06cc \u0646\u06af\u0647<\/p><p>\u062d\u06a9\u0645 \u0627\u06cc\u0646\u062c\u0627 \u062f\u0644\u0647<\/p><p>\u0627\u062d\u0633\u0627\u0633\u0647 \u062d\u0633\u0647 \u0644\u0645\u0633\u0647 \u062f\u0633\u062a\u0647 \u06af\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u062d\u0633\u0627\u0633\u0647 \u062d\u0633\u0647 \u0644\u0645\u0633\u0647 \u062f\u0633\u062a\u0647 \u06af\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u062d\u0633\u0627\u0633\u0647 \u062d\u0633\u0647 \u0644\u0645\u0633\u0647 \u062f\u0633\u062a\u0647 \u06af\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u062d\u0633\u0627\u0633\u0647 \u062d\u0633\u0647 \u0644\u0645\u0633\u0647 \u062f\u0633\u062a\u0647 \u06af\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u06cc \u062f\u0644 \u0645\u0646 \u062f\u0627\u0631\u0647 \u0628\u0627 \u062f\u0644\u062a \u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0628\u06cc \u0647\u0648\u0627 \u0628\u06cc \u062d\u0648\u0627\u0633 \u0628\u06cc \u062f\u0644\u06cc\u0644 \u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0627\u0648\u0646 \u06a9\u0647 \u0645\u06cc\u0644\u0631\u0632\u0647 \u0648\u0627\u0633\u062a \u062d\u0633\u0627\u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0647\u06cc \u062f\u0644\u0647 \u0645\u0646 \u062f\u0627\u0631\u0647 \u0628\u0627 \u062f\u0644\u062a \u0645\u06cc \u062f\u0644\u0647<\/p><p>\u0647\u06cc \u0647\u06cc \u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u062a\u0648 \u0639\u0634\u0642 \u0645\u0646\u06cc<\/p><p>\u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u06a9\u0647 \u0647\u06cc \u0642\u0648\u0644\u062a\u0648 \u0645\u06cc\u0634\u06a9\u0646\u06cc<\/p><p>\u062f\u0631\u062f\u0633\u0631 \u0633\u0627\u0632\u0647 \u0644\u062c\u0628\u0627\u0632\u0647 \u062f\u0648\u0633\u062a \u062f\u0627\u0634\u062a\u0646\u06cc<\/p><p>\u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u062a\u0648 \u0639\u0634\u0642 \u0645\u0646\u06cc<\/p><p>\u0639\u0634\u0642 \u062a\u062d\u06a9\u06cc\u0645\u0647 \u0646\u0647 \u0645\u062d\u0627\u06a9\u0645\u0647<\/p><p>\u0646\u0647 \u0645\u062d\u06a9\u0648\u0645 \u06a9\u0633\u06cc \u0646\u0647 \u0647\u06cc\u0634\u06a9\u06cc \u062d\u0627\u06a9\u0645\u0647<\/p><p>\u0639\u0634\u0642 \u062a\u0642\u062f\u06cc\u0645\u0647 \u0646\u0647 \u0645\u0628\u0627\u062f\u0644\u0647<\/p><p>\u062e\u0637 \u0645\u0645\u062a\u062f\u0650 \u0646\u0647 \u062e\u0637 \u0641\u0627\u0635\u0644\u0647<\/p><p>\u062d\u0633\u0627\u0633\u0647 \u0648\u0627\u0633\u0647 \u062d\u0633\u0647 \u0645\u062b\u0647 \u062f\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u062d\u0633\u0627\u0633\u0647 \u0648\u0627\u0633\u0647 \u062d\u0633\u0647 \u0645\u062b\u0647 \u062f\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u062d\u0633\u0627\u0633\u0647 \u0648\u0627\u0633\u0647 \u062d\u0633\u0647 \u0645\u062b\u0647 \u062f\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u06cc \u062f\u0644 \u0645\u0646 \u062f\u0627\u0631\u0647 \u0628\u0627 \u062f\u0644\u062a \u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0628\u06cc \u0647\u0648\u0627 \u0628\u06cc \u062d\u0648\u0627\u0633 \u0628\u06cc \u062f\u0644\u06cc\u0644 \u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0627\u0648\u0646 \u06a9\u0647 \u0645\u06cc\u0644\u0631\u0632\u0647 \u0648\u0627\u0633\u062a \u062d\u0633\u0627\u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0647\u06cc \u062f\u0644\u0647 \u0645\u0646 \u062f\u0627\u0631\u0647 \u0628\u0627 \u062f\u0644\u062a \u0645\u06cc \u062f\u0644\u0647<\/p><p>\u0647\u06cc \u0647\u06cc \u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u062a\u0648 \u0639\u0634\u0642 \u0645\u0646\u06cc<\/p><p>\u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u06a9\u0647 \u0647\u06cc \u0642\u0648\u0644\u062a\u0648 \u0645\u06cc\u0634\u06a9\u0646\u06cc<\/p><p>\u062f\u0631\u062f\u0633\u0631 \u0633\u0627\u0632\u0647 \u0644\u062c\u0628\u0627\u0632\u0647 \u062f\u0648\u0633\u062a \u062f\u0627\u0634\u062a\u0646\u06cc<\/p><p>\u0647\u06cc \u0647\u06cc \u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u062a\u0648 \u0639\u0634\u0642 \u0645\u0646\u06cc<\/p>","info":{"albumcount":"18","dlcount":"24300","view":"56038","descrip":"","tags":"\u067e\u0627\u067e ,","lyrics":"\u0641\u0631\u0634\u06cc\u062f \u0633\u0645\u0627","composer":"\u0628\u0646\u06cc\u0627\u0645\u06cc\u0646 \u0628\u0647\u0627\u062f\u0631\u06cc ","arrangement":"\u0641\u0631\u0634\u06cc\u062f \u0633\u0645\u0627 "},"summary":{"size":"7MB","dateadded":"2014-04-20","format":"mp3","permission":null},"song":[{"id":"133928","type":"song","artist":"\u0628\u0646\u06cc\u0627\u0645\u06cc\u0646 \u0628\u0647\u0627\u062f\u0631\u06cc","artist_id":"71","songname":"\u0639\u0634\u0642 \u0627\u062d\u0633\u0627\u0633\u0647","popularity":"4.4","ratecount":"127","view":"56038","time":"3:8","date":"1393-01-31","poster":"http:\/\/85.25.243.154\/img\/5pkjehomg-1397985962.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Benyamin\/Gallery\/[Medium]\/qpvfehss-1397985962.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Benyamin\/-\/Eshgh+Ehsaseh","mp3":"http:\/\/85.25.95.231\/music\/B\/Benyamin\/[one]\/Eshgh Ehsaseh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Benyamin\/[one]\/Eshgh Ehsaseh [WikiSeda].mp3"}]}';
        return _this._emit('music-more-detail', JSON.parse(json));
      };
    })(this), 2500);
  };

  return MusicPlayerModel;

})(_Emitter);

/*
//@ sourceMappingURL=MusicPlayerModel.map
*/

},{"./_Emitter":104}],103:[function(_dereq_,module,exports){
var PageModel, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = _dereq_('./_Emitter');

module.exports = PageModel = (function(_super) {
  __extends(PageModel, _super);

  function PageModel() {
    PageModel.__super__.constructor.apply(this, arguments);
    this.currentActive = 0;
  }

  PageModel.prototype.activeTitle = function(title) {
    this.currentActive = title;
    return this._emit('page-active', this.currentActive);
  };

  return PageModel;

})(_Emitter);

/*
//@ sourceMappingURL=PageModel.map
*/

},{"./_Emitter":104}],104:[function(_dereq_,module,exports){
var array, _Emitter;

array = _dereq_('utila/scripts/js/lib/array');

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

},{"utila/scripts/js/lib/array":100}],105:[function(_dereq_,module,exports){
var Foxie, HomePage, Item, Pantomime, Scrollable;

Foxie = _dereq_('foxie');

Pantomime = _dereq_('pantomime');

Item = {
  song: _dereq_('./Item/SongItem'),
  video: _dereq_('./Item/VideoItem'),
  album: _dereq_('./Item/AlbumItem')
};

Scrollable = _dereq_('./scroll/scrollable');

module.exports = HomePage = (function() {
  function HomePage(mainView, parentNode) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.insider').putIn(this.parentNode);
    this.scroll = new Scrollable(this.el.node.parentNode);
    this.mainView.model.on('home-list', (function(_this) {
      return function(items) {
        var i, item, _i, _len;
        for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
          item = items[i];
          new Item[item.type](_this.mainView, _this.el, item).hideMe().showMe(i * 50);
          if (i === items.length - 1) {
            _this.scroll.forceCalculated(_this.el.node.getBoundingClientRect().height + _this.el.node.getBoundingClientRect().top - window.innerHeight, 0);
          }
        }
      };
    })(this));
    window.addEventListener('resize', (function(_this) {
      return function(event) {
        _this.scroll.forceCalculated(_this.el.node.getBoundingClientRect().height + _this.el.node.getBoundingClientRect().top - window.innerHeight, 0);
      };
    })(this));
  }

  return HomePage;

})();

/*
//@ sourceMappingURL=HomePage.map
*/

},{"./Item/AlbumItem":107,"./Item/SongItem":108,"./Item/VideoItem":109,"./scroll/scrollable":117,"foxie":79,"pantomime":97}],106:[function(_dereq_,module,exports){
var Foxie, Item, Pantomime;

Foxie = _dereq_('Foxie');

Pantomime = _dereq_('pantomime');

module.exports = Item = (function() {
  function Item(mainView, parentNode, data) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.item').perspective(4000).moveZTo(100).putIn(this.parentNode);
    Pantomime.TouchyEl.get(this.el.node).on('tap', (function(_this) {
      return function(e) {
        _this.mainView.model.musicPlayer.play(data);
      };
    })(this));
    if (!window.isTouchDevice) {
      this.el.node.addEventListener('click', (function(_this) {
        return function() {
          return _this.mainView.model.musicPlayer.play(data);
        };
      })(this));
    }
    this.title1 = Foxie('.item-songname').putIn(this.el);
    this.title2 = Foxie('.item-artist').innerHTML(data.artist).putIn(this.el);
    this.poster = Foxie('img.item-poster').attr('src', data.poster).putIn(this.el);
  }

  Item.prototype.hideMe = function() {
    this.el.noTrans().moveXTo(100).setOpacity(0);
    return this;
  };

  Item.prototype.showMe = function(delay) {
    this.el.wait(delay, (function(_this) {
      return function() {
        return _this.el.trans(400).moveXTo(0).setOpacity(1);
      };
    })(this));
    return this;
  };

  return Item;

})();

/*
//@ sourceMappingURL=Item.map
*/

},{"Foxie":31,"pantomime":97}],107:[function(_dereq_,module,exports){
var AlbumItem, Foxie, Item,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = _dereq_('Foxie');

Item = _dereq_('../Item');

module.exports = AlbumItem = (function(_super) {
  __extends(AlbumItem, _super);

  function AlbumItem(mainView, parentNode, data) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    AlbumItem.__super__.constructor.apply(this, arguments);
    this.title1.innerHTML(data.album);
  }

  return AlbumItem;

})(Item);

/*
//@ sourceMappingURL=AlbumItem.map
*/

},{"../Item":106,"Foxie":31}],108:[function(_dereq_,module,exports){
var Foxie, Item, SongItem,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = _dereq_('Foxie');

Item = _dereq_('../Item');

module.exports = SongItem = (function(_super) {
  __extends(SongItem, _super);

  function SongItem(mainView, parentNode, data) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    SongItem.__super__.constructor.apply(this, arguments);
    this.title1.innerHTML(data.songname);
  }

  return SongItem;

})(Item);

/*
//@ sourceMappingURL=SongItem.map
*/

},{"../Item":106,"Foxie":31}],109:[function(_dereq_,module,exports){
var Foxie, Item, VideoItem,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = _dereq_('Foxie');

Item = _dereq_('../Item');

module.exports = VideoItem = (function(_super) {
  __extends(VideoItem, _super);

  function VideoItem(mainView, parentNode, data) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    VideoItem.__super__.constructor.apply(this, arguments);
    this.title1.innerHTML(data.videoname);
    this.el.node.classList.add('video-item');
    this.title1.node.classList.add('video-item-songname');
    this.title2.node.classList.add('video-item-artist');
    this.title3 = Foxie('.video-item-time').innerHTML(data.time).putIn(this.el);
    this.poster.node.classList.add('video-item-poster');
  }

  return VideoItem;

})(Item);

/*
//@ sourceMappingURL=VideoItem.map
*/

},{"../Item":106,"Foxie":31}],110:[function(_dereq_,module,exports){
var Foxie, HomePage, Main, MusicPlayer, Ribbon;

Foxie = _dereq_('foxie');

Ribbon = _dereq_('./Ribbon/Ribbon');

HomePage = _dereq_('./HomePage');

MusicPlayer = _dereq_('./MusicPlayer');

module.exports = Main = (function() {
  function Main(model) {
    this.model = model;
    this.el = Foxie('.master').putIn(document.body);
    this.inside = Foxie('.master-inside').moveZTo(100).putIn(this.el);
    this.ribbon = new Ribbon(this, ['Home', 'Artists']);
    this.homePage = new HomePage(this, this.ribbon.getPage(0));
    this.musicPlayer = new MusicPlayer(this);
  }

  return Main;

})();

/*
//@ sourceMappingURL=Main.map
*/

},{"./HomePage":105,"./MusicPlayer":111,"./Ribbon/Ribbon":112,"foxie":79}],111:[function(_dereq_,module,exports){
var Foxie, MusicPlayer, Pantomime;

Foxie = _dereq_('Foxie');

Pantomime = _dereq_('pantomime');

module.exports = MusicPlayer = (function() {
  function MusicPlayer(mainView) {
    this.mainView = mainView;
    this.transTime = 700;
    this.height = window.innerHeight;
    this.showing = false;
    this.el = Foxie('.musicplayer').moveZTo(500).moveYTo(this.height).trans(this.transTime).perspective(4000).putIn(this.mainView.el);
    this.hideBtn = Foxie('.musicplayer-hide').putIn(this.el);
    this.songName = Foxie('.musicplayer-songname').putIn(this.el);
    this.artist = Foxie('.musicplayer-artist').putIn(this.el);
    this.poster = Foxie('img.musicplayer-poster').putIn(this.el);
    this.buttons = Foxie('.musicplayer-buttons').putIn(this.el);
    this.prev = Foxie('.musicplayer-prev').putIn(this.buttons);
    this.play = Foxie('.musicplayer-play').putIn(this.buttons);
    this.next = Foxie('.musicplayer-next').putIn(this.buttons);
    window.addEventListener('resize', (function(_this) {
      return function(event) {
        _this.height = window.innerHeight;
        if (!_this.showing) {
          _this.forceHide();
        }
      };
    })(this));
    Pantomime.TouchyEl.get(this.play.node).on('tap', (function(_this) {
      return function(e) {
        _this.mainView.model.musicPlayer.toggle();
      };
    })(this));
    if (!window.isTouchDevice) {
      this.play.node.addEventListener('click', (function(_this) {
        return function() {
          _this.mainView.model.musicPlayer.toggle();
        };
      })(this));
    }
    Pantomime.TouchyEl.get(this.hideBtn.node).on('tap', (function(_this) {
      return function(e) {
        _this.hide();
      };
    })(this));
    if (!window.isTouchDevice) {
      this.hideBtn.node.addEventListener('click', (function(_this) {
        return function() {
          _this.hide();
        };
      })(this));
    }
    this.mainView.model.musicPlayer.on('show-player', (function(_this) {
      return function() {
        _this.show();
      };
    })(this));
    this.mainView.model.musicPlayer.on('play-music', (function(_this) {
      return function(data) {
        _this.show(data);
      };
    })(this));
    this.mainView.model.musicPlayer.on('music-pause', (function(_this) {
      return function() {
        _this.play.node.classList.add('musicplayer-pause');
      };
    })(this));
    this.mainView.model.musicPlayer.on('music-unpause', (function(_this) {
      return function() {
        _this.play.node.classList.remove('musicplayer-pause');
      };
    })(this));
  }

  MusicPlayer.prototype.show = function(data) {
    this.showing = true;
    this.el.moveYTo(0);
    if (data === null) {
      return;
    }
    this.songName.innerHTML(data.songname);
    this.artist.innerHTML(data.artist);
    return this.poster.attr('src', data.poster_big);
  };

  MusicPlayer.prototype.hide = function() {
    this.showing = false;
    return this.el.moveYTo(this.height);
  };

  MusicPlayer.prototype.forceHide = function() {
    this.showing = false;
    return this.el.noTrans().moveYTo(this.height).trans(this.transTime);
  };

  return MusicPlayer;

})();

/*
//@ sourceMappingURL=MusicPlayer.map
*/

},{"Foxie":31,"pantomime":97}],112:[function(_dereq_,module,exports){
var Foxie, Pantomime, Ribbon, RibbonPage, Title;

Foxie = _dereq_('foxie');

Title = _dereq_('./Title');

Pantomime = _dereq_('pantomime');

RibbonPage = _dereq_('./RibbonPage');

module.exports = Ribbon = (function() {
  function Ribbon(rootView, t) {
    var i, line, title, _i, _len, _ref;
    this.rootView = rootView;
    this.t = t;
    this.width = window.innerWidth;
    this.ribbonBarSpace = 50;
    this.el = Foxie('.ribbon').moveZTo(150).putIn(this.rootView.el);
    line = Foxie('.ribbon-line').putIn(this.el);
    this.underLine = Foxie('.ribbon-underline').moveZTo(10).putIn(this.el);
    this.titles = [];
    this.pages = [];
    _ref = this.t;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      title = _ref[i];
      this.addTitle(title);
      this.pages.push(new RibbonPage(this.rootView, i * this.width));
    }
    this.rootView.model.page.on('page-active', (function(_this) {
      return function(num) {
        _this.moveTo(num);
        return _this.showPage(num);
      };
    })(this));
    window.addEventListener('resize', (function(_this) {
      return function() {
        var page, _j, _len1, _ref1, _results;
        _this.width = window.innerWidth;
        _ref1 = _this.pages;
        _results = [];
        for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
          page = _ref1[i];
          _results.push(page.moveTo(i * _this.width));
        }
        return _results;
      };
    })(this));
  }

  Ribbon.prototype.showPage = function(index) {
    return this.rootView.inside.trans(700).moveXTo(index * (-1 * this.width));
  };

  Ribbon.prototype.getPage = function(index) {
    return this.pages[index].el;
  };

  Ribbon.prototype._setUnderlineWidth = function(width) {
    return this.underLine.trans(300).setWidth(width);
  };

  Ribbon.prototype._setUnderlinePosition = function(position) {
    return this.underLine.trans(300).moveXTo(position);
  };

  Ribbon.prototype.addTitle = function(title) {
    var num, tit;
    tit = new Title(this.el, title, this.ribbonBarSpace + this.ribbonBarSpace * 2 * this.titles.length);
    num = this.titles.length;
    (function(_this) {
      return (function(num) {
        Pantomime.TouchyEl.get(tit.el.node).on('tap', function(e) {
          _this.rootView.model.page.activeTitle(num);
        });
        if (!window.isTouchDevice) {
          tit.el.node.addEventListener('click', function() {
            _this.rootView.model.page.activeTitle(num);
          });
        }
      });
    })(this)(num);
    this.titles.push(tit);
    if (this.titles.length === 1) {
      return setTimeout((function(_this) {
        return function() {
          _this._setUnderlineWidth(_this.titles[0].getSize());
          return _this._setUnderlinePosition(_this.ribbonBarSpace);
        };
      })(this), 400);
    }
  };

  Ribbon.prototype.moveTo = function(index) {
    this._setUnderlineWidth(this.titles[index].getSize());
    return this._setUnderlinePosition(this.titles[index].position);
  };

  return Ribbon;

})();

/*
//@ sourceMappingURL=Ribbon.map
*/

},{"./RibbonPage":113,"./Title":114,"foxie":79,"pantomime":97}],113:[function(_dereq_,module,exports){
var Foxie, RibbonPage;

Foxie = _dereq_('foxie');

module.exports = RibbonPage = (function() {
  function RibbonPage(rootView, pos) {
    this.rootView = rootView;
    this.el = Foxie('.ribbon-page').putIn(this.rootView.inside).moveXTo(pos);
  }

  RibbonPage.prototype.moveTo = function(x) {
    return this.el.moveXTo(x);
  };

  return RibbonPage;

})();

/*
//@ sourceMappingURL=RibbonPage.map
*/

},{"foxie":79}],114:[function(_dereq_,module,exports){
var Foxie, Title;

Foxie = _dereq_('foxie');

module.exports = Title = (function() {
  function Title(parentNode, text, position) {
    this.parentNode = parentNode;
    this.position = position;
    this.el = Foxie('.ribbon-title').moveXTo(this.position).innerHTML(text).putIn(this.parentNode);
    this.size = 0;
  }

  Title.prototype.getSize = function() {
    if (this.size === 0) {
      this.size = parseInt(getComputedStyle(this.el.node).width);
    }
    return this.size;
  };

  return Title;

})();

/*
//@ sourceMappingURL=Title.map
*/

},{"foxie":79}],115:[function(_dereq_,module,exports){
var UnitBezier;

module.exports = UnitBezier = (function() {
  function UnitBezier(p1x, p1y, p2x, p2y) {
    this.cx = 3.0 * p1x;
    this.bx = 3.0 * (p2x - p1x) - this.cx;
    this.ax = 1.0 - this.cx - this.bx;
    this.cy = 3.0 * p1y;
    this.by = 3.0 * (p2y - p1y) - this.cy;
    this.ay = 1.0 - this.cy - this.by;
  }

  UnitBezier.epsilon = 1e-6;

  UnitBezier.prototype.sampleCurveX = function(t) {
    return ((this.ax * t + this.bx) * t + this.cx) * t;
  };

  UnitBezier.prototype.sampleCurveY = function(t) {
    return ((this.ay * t + this.by) * t + this.cy) * t;
  };

  UnitBezier.prototype.sampleCurveDerivativeX = function(t) {
    return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
  };

  UnitBezier.prototype.solveCurveX = function(x, epsilon) {
    var d2, i, t0, t1, t2, x2;
    t0 = void 0;
    t1 = void 0;
    t2 = void 0;
    x2 = void 0;
    d2 = void 0;
    i = void 0;
    t2 = x;
    i = 0;
    while (i < 8) {
      x2 = this.sampleCurveX(t2) - x;
      if (Math.abs(x2) < epsilon) {
        return t2;
      }
      d2 = this.sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < epsilon) {
        break;
      }
      t2 = t2 - x2 / d2;
      i++;
    }
    t0 = 0.0;
    t1 = 1.0;
    t2 = x;
    if (t2 < t0) {
      return t0;
    }
    if (t2 > t1) {
      return t1;
    }
    while (t0 < t1) {
      x2 = this.sampleCurveX(t2);
      if (Math.abs(x2 - x) < epsilon) {
        return t2;
      }
      if (x > x2) {
        t0 = t2;
      } else {
        t1 = t2;
      }
      t2 = (t1 - t0) * .5 + t0;
    }
    return t2;
  };

  UnitBezier.prototype.solve = function(x, epsilon) {
    return this.sampleCurveY(this.solveCurveX(x, epsilon));
  };

  return UnitBezier;

})();

/*
//@ sourceMappingURL=bezier.map
*/

},{}],116:[function(_dereq_,module,exports){
var Easing;

module.exports = Easing = {
  linear: function(p) {
    return p;
  },
  define: function(name, func) {
    var _func, _name;
    if (typeof name === 'object') {
      for (_name in name) {
        _func = name[_name];
        Easing.define(_name, _func);
      }
      return;
    }
    return Easing[name] = {
      easeIn: func,
      easeOut: function(p) {
        return 1 - func(1 - p);
      },
      easeInOut: function(p) {
        if (p <= 0.5) {
          return 0.5 * func(p * 2);
        } else {
          return 0.5 * (2 - func(2 * (1 - p)));
        }
      }
    };
  }
};

Easing.define({
  quad: function(p) {
    return Math.pow(p, 2);
  },
  cubic: function(p) {
    return Math.pow(p, 3);
  },
  quart: function(p) {
    return Math.pow(p, 4);
  },
  quint: function(p) {
    return Math.pow(p, 5);
  },
  expo: function(p) {
    return Math.pow(2, 8 * (p - 1));
  },
  circ: function(p) {
    return 1 - Math.sin(Math.cos(p));
  },
  sine: function(p) {
    return 1 - Math.cos(p * Math.PI / 2);
  }
});

Easing;

/*
//@ sourceMappingURL=easing.map
*/

},{}],117:[function(_dereq_,module,exports){
var Pantomime, Scrollable, Scrolls, TouchyEl;

Scrolls = _dereq_('./scrolls');

Pantomime = _dereq_('pantomime');

TouchyEl = Pantomime.TouchyEl;

module.exports = Scrollable = (function() {
  function Scrollable(node) {
    this.node = node;
    this._scrolls = new Scrolls(this.node);
    this.tel = TouchyEl.get(this.node);
    this.tel.on('move', (function(_this) {
      return function(pos) {
        return _this._scrolls.drag(pos.absX, pos.absY);
      };
    })(this));
    this.tel.on('move:end', (function(_this) {
      return function() {
        return _this._scrolls.release();
      };
    })(this));
    setTimeout((function(_this) {
      return function() {
        return _this.recalculate();
      };
    })(this), 1000);
  }

  Scrollable.prototype.recalculate = function() {
    this._scrolls._scrollerY._resetSizeAndSpace(this._scrolls._childEl.getBoundingClientRect().height + 100, this._scrolls.node.getBoundingClientRect().height);
    return console.log(this._scrolls._childEl.getBoundingClientRect().height + 100);
  };

  Scrollable.prototype.forceCalculated = function(x, s) {
    return this._scrolls._scrollerY._resetSizeAndSpace(x, s);
  };

  return Scrollable;

})();

/*
//@ sourceMappingURL=scrollable.map
*/

},{"./scrolls":118,"pantomime":97}],118:[function(_dereq_,module,exports){
var Scrolls, SingleAxisScroller, emptyFunction, object;

SingleAxisScroller = _dereq_('./singleAxis');

object = _dereq_('../utility/object');

emptyFunction = function() {};

module.exports = Scrolls = (function() {
  function Scrolls(node) {
    var boundNeedAnimation, childRects, parentRects;
    this.node = node;
    this.options = {
      axis: 'y'
    };
    this._enabledAxis = {
      x: 1,
      y: 1
    };
    if (this.options.axis === 'x') {
      this._enabledAxis.y = 0;
    } else if (this.options.axis === 'y') {
      this._enabledAxis.x = 0;
    }
    parentRects = this.node.getBoundingClientRect();
    this._childEl = this.node.children[0];
    this._childElTrans = {
      x: 0,
      y: 0,
      z: 1
    };
    childRects = this._childEl.getBoundingClientRect();
    boundNeedAnimation = this._scrollerAskedForAnimation.bind(this);
    this.propsX = {
      delta: 0
    };
    this._scrollerX = new SingleAxisScroller(this.propsX, boundNeedAnimation, (function(_this) {
      return function() {
        var ops;
        ops = {
          size: childRects.width,
          space: parentRects.width
        };
        if (_this.options.x != null) {
          object.append(ops, _this.options.x);
        }
        return ops;
      };
    })(this)());
    this._lastScrollX = 0;
    this.propsY = {
      delta: 0
    };
    this._scrollerY = new SingleAxisScroller(this.propsY, boundNeedAnimation, (function(_this) {
      return function() {
        var ops;
        ops = {
          size: childRects.height,
          space: parentRects.height
        };
        if (_this.options.y != null) {
          object.append(ops, _this.options.y);
        }
        return ops;
      };
    })(this)());
    this._lastScrollY = 0;
    this._animFrame = 0;
    this._boundAnimFunction = this._animFunction.bind(this);
    this._finishCallback = emptyFunction;
    this._finishCallbackWaiting = false;
  }

  Scrolls.prototype.drag = function(x, y) {
    this._cancelAnimation();
    if (this._enabledAxis.x) {
      this._scrollerX.drag(x - this._lastScrollX);
      this._lastScrollX = x;
    }
    if (this._enabledAxis.y) {
      this._scrollerY.drag(y - this._lastScrollY);
      this._lastScrollY = y;
    }
    return this._transformElement();
  };

  Scrolls.prototype.release = function(finish) {
    if (this._enabledAxis.x) {
      this._scrollerX.release();
      this._lastScrollX = 0;
    }
    if (this._enabledAxis.y) {
      this._scrollerY.release();
      this._lastScrollY = 0;
    }
    if (finish) {
      if (this._animFrame) {
        this._finishCallback = function() {
          return finish();
        };
        return this._finishCallbackWaiting = true;
      } else {
        return finish();
      }
    }
  };

  Scrolls.prototype._scrollerAskedForAnimation = function() {
    if (!this._animFrame) {
      return this._animFrame = requestAnimationFrame(this._boundAnimFunction);
    }
  };

  Scrolls.prototype._cancelAnimation = function() {
    if (this._animFrame) {
      webkitCancelAnimationFrame(this._animFrame);
      return this._animFrame = 0;
    }
  };

  Scrolls.prototype._animFunction = function() {
    this._animFrame = 0;
    if (this._enabledAxis.x) {
      this._scrollerX.animate();
    }
    if (this._enabledAxis.y) {
      this._scrollerY.animate();
    }
    this._transformElement();
    if (this._finishCallbackWaiting) {
      if (!this._animFrame) {
        this._finishCallback();
        return this.finish();
      }
    }
  };

  Scrolls.prototype.finish = function() {
    this._finishCallback = emptyFunction;
    return this._finishCallbackWaiting = false;
  };

  Scrolls.prototype._transformElement = function() {
    var x, y;
    x = 0;
    if (this._enabledAxis.x) {
      x = this.propsX.delta;
    }
    y = 0;
    if (this._enabledAxis.y) {
      y = this.propsY.delta;
    }
    return this._setElMovement(x, y);
  };

  Scrolls.prototype._setElMovement = function(x, y) {
    return this._childEl.style.webkitTransform = 'translate3d(' + x + 'px, ' + y + 'px, ' + '0)';
  };

  return Scrolls;

})();

/*
//@ sourceMappingURL=scrolls.map
*/

},{"../utility/object":122,"./singleAxis":119}],119:[function(_dereq_,module,exports){
var Bezier, Easing, SingleAxisScroller, bezier, cache, initBezier, math;

Easing = _dereq_('./easing');

Bezier = _dereq_('./bezier');

math = _dereq_('../utility/math');

cache = {
  stretch: {
    0: 0
  },
  unstretch: {
    0: 0
  }
};

bezier = null;

initBezier = function() {
  if (!bezier) {
    return bezier = new Bezier(.11, .02, .1, .98);
  }
};

module.exports = SingleAxisScroller = (function() {

  /*
  	 * @param  {Object} @props 	Reference to an object where
  	 * this scroller can keep and update the current
  	 * delta.
  	 *
  	 * @param  {Function} @askForAnimation This function gets called when
  	 * this scroller needs to request an animation.
  	 *
  	 * @param  {Object} options = {} Options - Look at the source
   */
  function SingleAxisScroller(props, askForAnimation, options) {
    this.props = props;
    this.askForAnimation = askForAnimation;
    if (options == null) {
      options = {};
    }
    this._resetSizeAndSpace(options.space, options.size);
    if (options.delta) {
      this.props.delta = parseInt(options.delta);
    }
    if (!this.props.delta) {
      this.props.delta = 0;
    }
    this._puller = this.props.delta;
    this._pullerInSync = true;
    this._velocityRecords = [];
    this._velocityThreshold = 0.01;
    this._lastV = 0;
    this._lastT = 0;
    this._stretchEasingFunction = Easing.quint.easeOut;
    this._maxStretch = parseInt(options.maxStretch) || 1800;
    if (cache.stretch[this._maxStretch] === void 0) {
      cache.stretch[this._maxStretch] = {};
    }
    this._stretchCache = cache.stretch[this._maxStretch];
    if (cache.unstretch[this._maxStretch] === void 0) {
      cache.unstretch[this._maxStretch] = {};
    }
    this._unstretchCache = cache.unstretch[this._maxStretch];
    this._stretchedMax = 0;
    this._bounceTime = parseInt(options.bounceTime) || 750;
    this._bounce = {
      ing: false,
      t: 0,
      x: 0,
      duration: 0
    };
    initBezier();
    return null;
  }

  SingleAxisScroller.prototype._resetSizeAndSpace = function(size, space) {
    this.size = parseInt(size);
    this.space = parseInt(space);
    this.min = 0;
    if (this.size > this.space) {
      this.min = -(this.size - this.space);
    }
    this.max = 0;
    return this;
  };

  SingleAxisScroller.prototype._resetSize = function(size) {
    this.size = parseInt(size);
    this.min = 0;
    if (this.size > this.space) {
      this.min = -(this.size - this.space);
    }
    this.max = 0;
    return this;
  };

  SingleAxisScroller.prototype._outsideCurve = function(t) {
    return bezier.solve(t, Bezier.epsilon);
  };

  SingleAxisScroller.prototype.drag = function(delta) {
    if (!this._pullerInSync) {
      this._syncPuller();
    }
    this._bounce.ing = false;
    this._recordForVelocity(delta);
    this._puller = this._puller + delta;
    return this.props.delta = this._pullerToSticky(this._puller);
  };

  SingleAxisScroller.prototype._pullerToSticky = function(puller) {
    if (puller > this.max) {
      return this.max + this._stretch(puller - this.max);
    } else if (puller < this.min) {
      return this.min - this._stretch(-(puller - this.min));
    } else {
      return puller;
    }
  };

  SingleAxisScroller.prototype._stickyToPuller = function(sticky) {
    if (sticky > this.max) {
      return this.max + this._unstretch(sticky - this.max);
    } else if (sticky < this.min) {
      return this.min - this._unstretch(-(sticky - this.min));
    } else {
      return sticky;
    }
  };

  SingleAxisScroller.prototype._stretch = function(puller) {
    var cached;
    puller = Math.min(puller, this._maxStretch);
    cached = this._stretchCache[puller];
    if (cached === void 0) {
      this._cacheStretches();
      return this._stretchCache[puller] || 0;
    } else {
      return cached;
    }
  };

  SingleAxisScroller.prototype._unstretch = function(stretched) {
    var cached;
    stretched = Math.min(Math.round(stretched), this._stretchedMax);
    cached = this._unstretchCache[stretched];
    if (cached === void 0) {
      this._cacheStretches();
      return this._unstretchCache[stretched] || 0;
    } else {
      return cached;
    }
  };

  SingleAxisScroller.prototype._cacheStretches = function() {
    var current, stretched;
    stretched = 0;
    current = 0;
    while (true) {
      if (current > this._maxStretch) {
        break;
      }
      stretched += 1.0 - this._stretchEasingFunction(current / this._maxStretch);
      this._stretchCache[current] = stretched;
      this._unstretchCache[Math.round(stretched)] = current;
      current++;
    }
    return this._stretchedMax = stretched;
  };

  SingleAxisScroller.prototype._syncPuller = function() {
    this._puller = this._stickyToPuller(this.props.delta);
    return this._pullerInSync = true;
  };

  SingleAxisScroller.prototype.release = function() {
    this._setLastVelocity(this._getRecordedVelocity());
    this._pullerInSync = false;
    if ((this._puller < this.min && this._lastV > 0) || (this._puller > this.max && this._lastV < 0)) {
      this._bounce.skip = true;
    }
    return this.animate();
  };

  SingleAxisScroller.prototype.animate = function() {
    var deltaT, i, smallerDeltaT, v, v0, x, x0, _i, _ref, _ref1;
    x0 = this.props.delta;
    v0 = this._lastV;
    deltaT = Date.now() - this._lastT;
    _ref = this._animStep(x0, v0, deltaT), x = _ref.x, v = _ref.v;
    if ((x - x0 > 10 && !(x < this.min)) || (x - x0 < -10 && !(x > this.max))) {
      smallerDeltaT = deltaT / 4;
      x = x0;
      v = v0;
      for (i = _i = 1; _i <= 4; i = ++_i) {
        _ref1 = this._animStep(x, v, smallerDeltaT), x = _ref1.x, v = _ref1.v;
      }
    }
    this._setLastVelocity(v);
    this.props.delta = x;
    if (!((this.min <= x && x <= this.max) && v * v0 < 0.001)) {
      this.askForAnimation();
    }
    return null;
  };

  SingleAxisScroller.prototype._animStep = function(x0, v0, deltaT) {
    var deltas, ret;
    ret = {
      x: 0,
      v: 0
    };
    if (x0 < this.min) {
      deltas = this._deltasForOutside(this.min - x0, -v0, deltaT);
      ret.x = x0 - deltas.deltaX;
      ret.v = v0 - deltas.deltaV;
    } else if (x0 > this.max) {
      deltas = this._deltasForOutside(x0 - this.max, v0, deltaT);
      ret.x = x0 + deltas.deltaX;
      ret.v = v0 + deltas.deltaV;
    } else {
      deltas = this._deltasForInside(v0, deltaT);
      ret.x = x0 + deltas.deltaX;
      ret.v = v0 + deltas.deltaV;
    }
    return ret;
  };

  SingleAxisScroller.prototype._deltasForOutside = function(x0, v0, deltaT) {
    var deltaV, newX, pullback, ret;
    if ((-0.0001 < v0 && v0 < 0.0001)) {
      this._bounce.skip = false;
    }
    if (v0 < 0.15 && !this._bounce.skip) {
      if (!this._bounce.ing) {
        this._bounce.ing = true;
        this._bounce.t = Date.now();
        this._bounce.x = x0;
      }
      newX = this._bounce.x - this._bounce.x * this._outsideCurve((Date.now() - this._bounce.t) / this._bounceTime);
      if (newX < 0.1) {
        ret = {
          deltaX: -x0,
          deltaV: -v0
        };
        this._bounce.ing = false;
      } else {
        ret = {
          deltaX: newX - x0,
          deltaV: -v0
        };
      }
      return ret;
    }
    pullback = -0.032 * v0;
    deltaV = pullback * deltaT;
    return ret = {
      deltaX: 0.5 * deltaV * deltaT + v0 * deltaT,
      deltaV: deltaV
    };
  };

  SingleAxisScroller.prototype._deltasForInside = function(v0, deltaT) {
    var deltaV, direction, friction, ret;
    this._bounce.skip = false;
    direction = parseFloat(math.unit(v0));
    friction = -direction * 0.031 * Math.min(Math.abs(v0), 0.1);
    deltaV = friction * deltaT;
    return ret = {
      deltaX: 0.5 * deltaV * deltaT + v0 * deltaT,
      deltaV: deltaV
    };
  };

  SingleAxisScroller.prototype._recordForVelocity = function(delta) {
    if (this._velocityRecords.length === 0) {
      this._velocityRecords.push({
        d: delta,
        t: Date.now()
      });
    } else {
      this._velocityRecords.push({
        d: delta + this._velocityRecords[this._velocityRecords.length - 1].d,
        t: Date.now()
      });
      if (this._velocityRecords.length > 3) {
        return this._velocityRecords.shift();
      }
    }
  };

  SingleAxisScroller.prototype._getRecordedVelocity = function() {
    var first, last, length, v;
    length = this._velocityRecords.length;
    v = 0;
    if (length > 1) {
      first = this._velocityRecords[0];
      last = this._velocityRecords[length - 1];
      if (Date.now() - last.t < 50) {
        v = (last.d - first.d) / (last.t - first.t) / 1.1;
      }
    }
    this._clearVelocityRecords();
    if (!((Math.abs(v)) > this._velocityThreshold)) {
      v = 0;
    }
    return v;
  };

  SingleAxisScroller.prototype._clearVelocityRecords = function() {
    return this._velocityRecords.length = 0;
  };

  SingleAxisScroller.prototype._setLastVelocity = function(v) {
    this._lastV = v;
    return this._lastT = Date.now();
  };

  return SingleAxisScroller;

})();

/*
//@ sourceMappingURL=singleAxis.map
*/

},{"../utility/math":121,"./bezier":115,"./easing":116}],120:[function(_dereq_,module,exports){
var common;

module.exports = common = {

  /*
  	Checks to see if o is an object, and it isn't an instance
  	of some class.
   */
  isBareObject: function(o) {
    if ((o != null) && o.constructor === Object) {
      return true;
    }
    return false;
  },

  /*
  	Returns type of an object, including:
  	undefined, null, string, number, array,
  	arguments, element, textnode, whitespace, and object
   */
  typeOf: function(item) {
    var _ref;
    if (item === null) {
      return 'null';
    }
    if (typeof item !== 'object') {
      return typeof item;
    }
    if (Array.isArray(item)) {
      return 'array';
    }
    if (item.nodeName) {
      if (item.nodeType === 1) {
        return 'element';
      }
      if (item.nodeType === 3) {
        return (_ref = /\S/.test(item.nodeValue)) != null ? _ref : {
          'textnode': 'whitespace'
        };
      }
    } else if (typeof item.length === 'number') {
      if (item.callee) {
        return 'arguments';
      }
    }
    return typeof item;
  },
  clone: function(item, includePrototype) {
    if (includePrototype == null) {
      includePrototype = false;
    }
    switch (common.typeOf(item)) {
      case 'array':
        return common._cloneArray(item, includePrototype);
      case 'object':
        return common._cloneObject(item, includePrototype);
      default:
        return item;
    }
  },

  /*
  	Deep clone of an object.
  	From MooTools
   */
  _cloneObject: function(o, includePrototype) {
    var clone, key;
    if (includePrototype == null) {
      includePrototype = false;
    }
    if (common.isBareObject(o)) {
      clone = {};
      for (key in o) {
        clone[key] = common.clone(o[key], includePrototype);
      }
      return clone;
    } else {
      if (!includePrototype) {
        return o;
      }
      if (o instanceof Function) {
        return o;
      }
      clone = Object.create(o.constructor.prototype);
      for (key in o) {
        if (o.hasOwnProperty(key)) {
          clone[key] = common.clone(o[key], includePrototype);
        }
      }
      return clone;
    }
  },

  /*
  	Deep clone of an array.
  	From MooTools
   */
  _cloneArray: function(a, includePrototype) {
    var clone, i;
    if (includePrototype == null) {
      includePrototype = false;
    }
    i = a.length;
    clone = new Array(i);
    while (i--) {
      clone[i] = common.clone(a[i], includePrototype);
    }
    return clone;
  }
};

/*
//@ sourceMappingURL=_common.map
*/

},{}],121:[function(_dereq_,module,exports){
var math;

module.exports = math = {
  square: function(n) {
    return n * n;
  },
  distance: function(x1, y1, x2, y2) {
    return Math.sqrt(math.square(x2 - x1) + math.square(y2 - y1));
  },
  limit: function(n, from, to) {
    if (n > to) {
      return to;
    }
    if (n < from) {
      return from;
    }
    return n;
  },
  unit: function(n) {
    if (n < 0) {
      return -1;
    }
    return 1;
  },
  halfPi: Math.PI / 2
};

/*
//@ sourceMappingURL=math.map
*/

},{}],122:[function(_dereq_,module,exports){
var common, object;

common = _dereq_('./_common');

module.exports = object = {
  isBareObject: common.isBareObject.bind(common),

  /*
  	if 'what' is an object, but an instance of some class,
  	like: what = new Question
  	object.isInstance what # yes
   */
  isInstance: function(what) {
    return !this.isBareObject(what);
  },

  /*
  	Alias to common.typeOf
   */
  typeOf: common.typeOf.bind(common),

  /*
  	Alias to common.clone
   */
  clone: common.clone.bind(common),

  /*
  	Empties an object of its properties.
   */
  empty: function(o) {
    var prop;
    for (prop in o) {
      if (o.hasOwnProperty(prop)) {
        delete o[prop];
      }
    }
    return o;
  },

  /*
  	Empties an o. Doesn't check for hasOwnProperty, so it's a tiny
  	bit faster. Use it for plain objects.
   */
  fastEmpty: function(o) {
    var property;
    for (property in o) {
      delete o[property];
    }
    return o;
  },

  /*
  	if 'from' holds a set of default values,
  	the values in 'to' will be overriden onto them, as long as
  	they're not undefined.
   */
  overrideOnto: function(onto, toOverride) {
    var key, newVal, oldVal;
    if (!this.isBareObject(toOverride) || !this.isBareObject(onto)) {
      return onto;
    }
    for (key in onto) {
      oldVal = onto[key];
      newVal = toOverride[key];
      if (newVal === void 0) {
        continue;
      }
      if (typeof newVal !== 'object' || this.isInstance(newVal)) {
        onto[key] = this.clone(newVal);
      } else {
        if (typeof oldVal !== 'object' || this.isInstance(oldVal)) {
          onto[key] = this.clone(newVal);
        } else {
          this.overrideOnto(oldVal, newVal);
        }
      }
    }
    return onto;
  },

  /*
  	Takes a clone of 'from' and runs #overrideOnto on it
   */
  override: function(onto, toOverride) {
    return this.overrideOnto(this.clone(onto), toOverride);
  },
  append: function(onto, toAppend) {
    return this.appendOnto(this.clone(onto), toAppend);
  },
  appendOnto: function(onto, toAppend) {
    var key, newVal, oldVal, _results;
    if (!this.isBareObject(toAppend) || !this.isBareObject(onto)) {
      return onto;
    }
    _results = [];
    for (key in toAppend) {
      newVal = toAppend[key];
      if (!(newVal !== void 0 && toAppend.hasOwnProperty(key))) {
        continue;
      }
      if (typeof newVal !== 'object' || this.isInstance(newVal)) {
        _results.push(onto[key] = newVal);
      } else {
        oldVal = onto[key];
        if (typeof oldVal !== 'object' || this.isInstance(oldVal)) {
          _results.push(onto[key] = this.clone(newVal));
        } else {
          _results.push(this.appendOnto(oldVal, newVal));
        }
      }
    }
    return _results;
  },
  groupProps: function(obj, groups) {
    var def, defs, grouped, key, name, shouldAdd, val, _i, _len;
    grouped = {};
    for (name in groups) {
      defs = groups[name];
      grouped[name] = {};
    }
    grouped['rest'] = {};
    top: //;
    for (key in obj) {
      val = obj[key];
      shouldAdd = false;
      for (name in groups) {
        defs = groups[name];
        if (!Array.isArray(defs)) {
          defs = [defs];
        }
        for (_i = 0, _len = defs.length; _i < _len; _i++) {
          def = defs[_i];
          if (typeof def === 'string') {
            if (key === def) {
              shouldAdd = true;
            }
          } else if (def instanceof RegExp) {
            if (def.test(key)) {
              shouldAdd = true;
            }
          } else if (def instanceof Function) {
            if (def(key)) {
              shouldAdd = true;
            }
          } else {
            throw Error('Group definitions must either be strings, regexes, or functions.');
          }
          if (shouldAdd) {
            grouped[name][key] = val;
            continue top;
          }
        }
      }
      grouped['rest'][key] = val;
    }
    return grouped;
  }
};

/*
//@ sourceMappingURL=object.map
*/

},{"./_common":120}],123:[function(_dereq_,module,exports){
var MainView, Model, Pantomime, mainView, model, t;

Pantomime = _dereq_('pantomime');

t = new Pantomime.Touchy(document);

Model = _dereq_('../Model/Model');

MainView = _dereq_('../View/Main');

model = new Model;

mainView = new MainView(model);

model.getHomeList();

/*
//@ sourceMappingURL=1.map
*/

},{"../Model/Model":101,"../View/Main":110,"pantomime":97}],124:[function(_dereq_,module,exports){
module.exports = _dereq_("./1");

/*
//@ sourceMappingURL=pg.map
*/

},{"./1":123}]},{},[124])
(124)
});