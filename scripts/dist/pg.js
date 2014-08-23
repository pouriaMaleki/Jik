!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.pg=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\Transformation\\scripts\\js\\lib\\Transformation.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-color\\scripts\\js\\lib\\CSSColor.js":[function(require,module,exports){
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

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\CSSFilter.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var CSSFilter, blur, brightness, contrast, filters, grayscale, hueRotate, invert, opacity, saturate, sepia;

blur = require('./filter/blur');

brightness = require('./filter/brightness');

contrast = require('./filter/contrast');

grayscale = require('./filter/grayscale');

hueRotate = require('./filter/hueRotate');

invert = require('./filter/invert');

opacity = require('./filter/opacity');

saturate = require('./filter/saturate');

sepia = require('./filter/sepia');

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

},{"./filter/blur":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\blur.js","./filter/brightness":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\brightness.js","./filter/contrast":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\contrast.js","./filter/grayscale":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\grayscale.js","./filter/hueRotate":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\hueRotate.js","./filter/invert":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\invert.js","./filter/opacity":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\opacity.js","./filter/saturate":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\saturate.js","./filter/sepia":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\sepia.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\blur.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var blur;

module.exports = blur = {
  toCss: function(radius) {
    return "blur(" + radius + "px)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\brightness.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var brightness;

module.exports = brightness = {
  toCss: function(amount) {
    return "brightness(" + amount + ")";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\contrast.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var contrast;

module.exports = contrast = {
  toCss: function(amount) {
    return "contrast(" + amount + "%)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\grayscale.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var grayscale;

module.exports = grayscale = {
  toCss: function(amount) {
    return "grayscale(" + amount + "%)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\hueRotate.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var hueRotate;

module.exports = hueRotate = {
  toCss: function(angle) {
    return "hue-rotate(" + angle + "deg)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\invert.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var invert;

module.exports = invert = {
  toCss: function(amount) {
    return "invert(" + amount + "%)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\opacity.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var opacity;

module.exports = opacity = {
  toCss: function(amount) {
    return "opacity(" + amount + "%)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\saturate.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var saturate;

module.exports = saturate = {
  toCss: function(amount) {
    return "saturate(" + amount + "%)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\sepia.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var sepia;

module.exports = sepia = {
  toCss: function(amount) {
    return "sepia(" + amount + "%)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\method-chain\\scripts\\js\\lib\\MethodChain.js":[function(require,module,exports){
var MethodChain, _Interface,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Interface = require('./_Interface');

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


},{"./_Interface":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\method-chain\\scripts\\js\\lib\\_Interface.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\method-chain\\scripts\\js\\lib\\_Interface.js":[function(require,module,exports){
var _Interface;

module.exports = _Interface = (function() {
  function _Interface() {
    this._queue = [];
  }

  return _Interface;

})();


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\Priority.js":[function(require,module,exports){
(function() {
  var Priority, array;

  array = require('utila/scripts/js/lib/array');

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

},{"utila/scripts/js/lib/array":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\array.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\Timing.js":[function(require,module,exports){
(function() {
  var Priority, Timing, Waiter, cancelAnimationFrame, nextTick, requestAnimationFrame, _ref;

  Waiter = require('./Waiter');

  nextTick = require('./nextTick');

  Priority = require('./Priority');

  _ref = require('./raf'), requestAnimationFrame = _ref.requestAnimationFrame, cancelAnimationFrame = _ref.cancelAnimationFrame;

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

},{"./Priority":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\Priority.js","./Waiter":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\Waiter.js","./nextTick":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\nextTick.js","./raf":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\raf.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\Waiter.js":[function(require,module,exports){
(function() {
  var Waiter, array, intervalPool, shouldInjectCallItem, timeoutPool;

  array = require('utila/scripts/js/lib/array');

  timeoutPool = require('./pool/timeout');

  intervalPool = require('./pool/interval');

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

},{"./pool/interval":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\pool\\interval.js","./pool/timeout":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\pool\\timeout.js","utila/scripts/js/lib/array":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\array.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\nextTick.js":[function(require,module,exports){
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

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\pool\\interval.js":[function(require,module,exports){
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

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\pool\\timeout.js":[function(require,module,exports){
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

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\raf.js":[function(require,module,exports){
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

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\timing-function\\scripts\\js\\lib\\UnitBezier.js":[function(require,module,exports){
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

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\timing-function\\scripts\\js\\lib\\timingFunction.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var UnitBezier, timingFunction;

UnitBezier = require('./UnitBezier');

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

},{"./UnitBezier":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\timing-function\\scripts\\js\\lib\\UnitBezier.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\transformation\\scripts\\js\\lib\\Transformation.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\transformation\\scripts\\js\\lib\\cssify.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\_common.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\array.js":[function(require,module,exports){
var array, _common;

_common = require('./_common');

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


},{"./_common":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\_common.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\classic.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\object.js":[function(require,module,exports){
var object, _common,
  __hasProp = {}.hasOwnProperty;

_common = require('./_common');

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


},{"./_common":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\_common.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\utila.js":[function(require,module,exports){
var utila;

module.exports = utila = {
  array: require('./array'),
  classic: require('./classic'),
  object: require('./object')
};


},{"./array":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\array.js","./classic":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\classic.js","./object":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\object.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js":[function(require,module,exports){
var Chain_, Foxie, Styles_, Timing_, array, classic, lazyValues, object, timing, _ref;

Chain_ = require('./el/mixin/Chain_');

timing = require('./timing');

Styles_ = require('./el/mixin/Styles_');

Timing_ = require('./el/mixin/Timing_');

lazyValues = require('./utility/lazyValues');

_ref = require('utila'), classic = _ref.classic, object = _ref.object, array = _ref.array;

timing = require('./timing');

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


},{"./el/mixin/Chain_":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\Chain_.js","./el/mixin/Styles_":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\Styles_.js","./el/mixin/Timing_":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\Timing_.js","./timing":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\timing.js","./utility/lazyValues":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\utility\\lazyValues.js","utila":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\utila.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\Chain_.js":[function(require,module,exports){
var Chain_, MethodChain;

MethodChain = require('method-chain');

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


},{"method-chain":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\method-chain\\scripts\\js\\lib\\MethodChain.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\Styles_.js":[function(require,module,exports){
var ClassPrototype, StyleSetter, Styles, Transitioner, method, methodName, timing, _fn, _fn1, _ref, _ref1;

StyleSetter = require('./styleSetter/StyleSetter');

Transitioner = require('./transitioner/Transitioner');

timing = require('../../timing');

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


},{"../../timing":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\timing.js","./styleSetter/StyleSetter":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\StyleSetter.js","./transitioner/Transitioner":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\transitioner\\Transitioner.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\Timing_.js":[function(require,module,exports){
var Timing_, array, timing,
  __slice = [].slice;

array = require('utila').array;

timing = require('../../timing');

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


},{"../../timing":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\timing.js","utila":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\utila.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\StyleSetter.js":[function(require,module,exports){
var Fill_, Filters_, Generals_, Layout_, StyleSetter, Transforms_, Typography_, classic, object, _ref;

Generals_ = require('./mixin/Generals_');

Layout_ = require('./mixin/Layout_');

Fill_ = require('./mixin/Fill_');

Typography_ = require('./mixin/Typography_');

Transforms_ = require('./mixin/Transforms_');

Filters_ = require('./mixin/Filters_');

_ref = require('utila'), classic = _ref.classic, object = _ref.object;

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


},{"./mixin/Fill_":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Fill_.js","./mixin/Filters_":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Filters_.js","./mixin/Generals_":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Generals_.js","./mixin/Layout_":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Layout_.js","./mixin/Transforms_":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Transforms_.js","./mixin/Typography_":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Typography_.js","utila":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\utila.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Fill_.js":[function(require,module,exports){
var ColorHolder, Fill_, css;

css = require('../../../../utility/css');

ColorHolder = require('../tools/ColorHolder');

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


},{"../../../../utility/css":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\utility\\css.js","../tools/ColorHolder":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\tools\\ColorHolder.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Filters_.js":[function(require,module,exports){
var CSSFilter, ClassPrototype, Filters_, css, method, methodName, _fn, _ref;

CSSFilter = require('css-filter');

css = require('../../../../utility/css');

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


},{"../../../../utility/css":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\utility\\css.js","css-filter":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-filter\\scripts\\js\\lib\\CSSFilter.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Generals_.js":[function(require,module,exports){
var General_, css;

css = require('../../../../utility/css');

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


},{"../../../../utility/css":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\utility\\css.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Layout_.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Transforms_.js":[function(require,module,exports){
var ClassPrototype, Transformation, Transforms_, css, cssify, method, methodName, _fn, _ref;

Transformation = require('transformation');

cssify = require('transformation/scripts/js/lib/cssify');

css = require('../../../../utility/css');

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


},{"../../../../utility/css":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\utility\\css.js","transformation":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\transformation\\scripts\\js\\lib\\Transformation.js","transformation/scripts/js/lib/cssify":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\transformation\\scripts\\js\\lib\\cssify.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Typography_.js":[function(require,module,exports){
var Typography_, css;

css = require('../../../../utility/css');

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


},{"../../../../utility/css":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\utility\\css.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\tools\\ColorHolder.js":[function(require,module,exports){
var CSSColor, ClassPrototype, ColorHolder, method, methodName, _fn, _ref;

CSSColor = require('css-color');

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


},{"css-color":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\css-color\\scripts\\js\\lib\\CSSColor.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\transitioner\\Transitioner.js":[function(require,module,exports){
var Fill_, Transforms_, Transitioner, classic, easing, object, timing, _ref;

Fill_ = require('./mixin/Fill_');

Transforms_ = require('./mixin/Transforms_');

timing = require('../../../timing');

easing = require('timing-function');

_ref = require('utila'), classic = _ref.classic, object = _ref.object;

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


},{"../../../timing":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\timing.js","./mixin/Fill_":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\transitioner\\mixin\\Fill_.js","./mixin/Transforms_":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\transitioner\\mixin\\Transforms_.js","timing-function":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\timing-function\\scripts\\js\\lib\\timingFunction.js","utila":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\utila\\scripts\\js\\lib\\utila.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\transitioner\\mixin\\Fill_.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\el\\mixin\\transitioner\\mixin\\Transforms_.js":[function(require,module,exports){
var Transformation, Transforms_;

Transformation = require('Transformation');

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


},{"Transformation":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\Transformation\\scripts\\js\\lib\\Transformation.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\timing.js":[function(require,module,exports){
var Timing, timing;

Timing = require('raf-timing');

timing = new Timing;

timing.start();

module.exports = timing;


},{"raf-timing":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\Timing.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\utility\\css.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\utility\\lazyValues.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\Transformation\\scripts\\js\\lib\\Transformation.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-color\\scripts\\js\\lib\\CSSColor.js":[function(require,module,exports){
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

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\CSSFilter.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var CSSFilter, blur, brightness, contrast, filters, grayscale, hueRotate, invert, opacity, saturate, sepia;

blur = require('./filter/blur');

brightness = require('./filter/brightness');

contrast = require('./filter/contrast');

grayscale = require('./filter/grayscale');

hueRotate = require('./filter/hueRotate');

invert = require('./filter/invert');

opacity = require('./filter/opacity');

saturate = require('./filter/saturate');

sepia = require('./filter/sepia');

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

},{"./filter/blur":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\blur.js","./filter/brightness":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\brightness.js","./filter/contrast":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\contrast.js","./filter/grayscale":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\grayscale.js","./filter/hueRotate":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\hueRotate.js","./filter/invert":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\invert.js","./filter/opacity":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\opacity.js","./filter/saturate":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\saturate.js","./filter/sepia":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\sepia.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\blur.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var blur;

module.exports = blur = {
  toCss: function(radius) {
    return "blur(" + radius + "px)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\brightness.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var brightness;

module.exports = brightness = {
  toCss: function(amount) {
    return "brightness(" + amount + ")";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\contrast.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var contrast;

module.exports = contrast = {
  toCss: function(amount) {
    return "contrast(" + amount + "%)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\grayscale.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var grayscale;

module.exports = grayscale = {
  toCss: function(amount) {
    return "grayscale(" + amount + "%)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\hueRotate.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var hueRotate;

module.exports = hueRotate = {
  toCss: function(angle) {
    return "hue-rotate(" + angle + "deg)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\invert.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var invert;

module.exports = invert = {
  toCss: function(amount) {
    return "invert(" + amount + "%)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\opacity.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var opacity;

module.exports = opacity = {
  toCss: function(amount) {
    return "opacity(" + amount + "%)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\saturate.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var saturate;

module.exports = saturate = {
  toCss: function(amount) {
    return "saturate(" + amount + "%)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\filter\\sepia.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var sepia;

module.exports = sepia = {
  toCss: function(amount) {
    return "sepia(" + amount + "%)";
  }
};

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\method-chain\\scripts\\js\\lib\\MethodChain.js":[function(require,module,exports){
var MethodChain, _Interface,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Interface = require('./_Interface');

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


},{"./_Interface":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\method-chain\\scripts\\js\\lib\\_Interface.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\method-chain\\scripts\\js\\lib\\_Interface.js":[function(require,module,exports){
var _Interface;

module.exports = _Interface = (function() {
  function _Interface() {
    this._queue = [];
  }

  return _Interface;

})();


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\Priority.js":[function(require,module,exports){
(function() {
  var Priority, array;

  array = require('utila/scripts/js/lib/array');

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

},{"utila/scripts/js/lib/array":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\array.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\Timing.js":[function(require,module,exports){
(function() {
  var Priority, Timing, Waiter, cancelAnimationFrame, nextTick, requestAnimationFrame, _ref;

  Waiter = require('./Waiter');

  nextTick = require('./nextTick');

  Priority = require('./Priority');

  _ref = require('./raf'), requestAnimationFrame = _ref.requestAnimationFrame, cancelAnimationFrame = _ref.cancelAnimationFrame;

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

},{"./Priority":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\Priority.js","./Waiter":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\Waiter.js","./nextTick":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\nextTick.js","./raf":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\raf.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\Waiter.js":[function(require,module,exports){
(function() {
  var Waiter, array, intervalPool, shouldInjectCallItem, timeoutPool;

  array = require('utila/scripts/js/lib/array');

  timeoutPool = require('./pool/timeout');

  intervalPool = require('./pool/interval');

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

},{"./pool/interval":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\pool\\interval.js","./pool/timeout":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\pool\\timeout.js","utila/scripts/js/lib/array":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\array.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\nextTick.js":[function(require,module,exports){
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

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\pool\\interval.js":[function(require,module,exports){
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

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\pool\\timeout.js":[function(require,module,exports){
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

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\raf.js":[function(require,module,exports){
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

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\timing-function\\scripts\\js\\lib\\UnitBezier.js":[function(require,module,exports){
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

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\timing-function\\scripts\\js\\lib\\timingFunction.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var UnitBezier, timingFunction;

UnitBezier = require('./UnitBezier');

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

},{"./UnitBezier":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\timing-function\\scripts\\js\\lib\\UnitBezier.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\transformation\\scripts\\js\\lib\\Transformation.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\transformation\\scripts\\js\\lib\\cssify.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\_common.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\array.js":[function(require,module,exports){
var array, _common;

_common = require('./_common');

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


},{"./_common":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\_common.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\classic.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\object.js":[function(require,module,exports){
var object, _common,
  __hasProp = {}.hasOwnProperty;

_common = require('./_common');

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


},{"./_common":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\_common.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\utila.js":[function(require,module,exports){
var utila;

module.exports = utila = {
  array: require('./array'),
  classic: require('./classic'),
  object: require('./object')
};


},{"./array":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\array.js","./classic":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\classic.js","./object":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\object.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js":[function(require,module,exports){
var Chain_, Foxie, Styles_, Timing_, array, classic, lazyValues, object, timing, _ref;

Chain_ = require('./el/mixin/Chain_');

timing = require('./timing');

Styles_ = require('./el/mixin/Styles_');

Timing_ = require('./el/mixin/Timing_');

lazyValues = require('./utility/lazyValues');

_ref = require('utila'), classic = _ref.classic, object = _ref.object, array = _ref.array;

timing = require('./timing');

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


},{"./el/mixin/Chain_":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\Chain_.js","./el/mixin/Styles_":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\Styles_.js","./el/mixin/Timing_":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\Timing_.js","./timing":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\timing.js","./utility/lazyValues":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\utility\\lazyValues.js","utila":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\utila.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\Chain_.js":[function(require,module,exports){
var Chain_, MethodChain;

MethodChain = require('method-chain');

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


},{"method-chain":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\method-chain\\scripts\\js\\lib\\MethodChain.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\Styles_.js":[function(require,module,exports){
var ClassPrototype, StyleSetter, Styles, Transitioner, method, methodName, timing, _fn, _fn1, _ref, _ref1;

StyleSetter = require('./styleSetter/StyleSetter');

Transitioner = require('./transitioner/Transitioner');

timing = require('../../timing');

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


},{"../../timing":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\timing.js","./styleSetter/StyleSetter":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\StyleSetter.js","./transitioner/Transitioner":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\transitioner\\Transitioner.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\Timing_.js":[function(require,module,exports){
var Timing_, array, timing,
  __slice = [].slice;

array = require('utila').array;

timing = require('../../timing');

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


},{"../../timing":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\timing.js","utila":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\utila.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\StyleSetter.js":[function(require,module,exports){
var Fill_, Filters_, Generals_, Layout_, StyleSetter, Transforms_, Typography_, classic, object, _ref;

Generals_ = require('./mixin/Generals_');

Layout_ = require('./mixin/Layout_');

Fill_ = require('./mixin/Fill_');

Typography_ = require('./mixin/Typography_');

Transforms_ = require('./mixin/Transforms_');

Filters_ = require('./mixin/Filters_');

_ref = require('utila'), classic = _ref.classic, object = _ref.object;

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


},{"./mixin/Fill_":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Fill_.js","./mixin/Filters_":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Filters_.js","./mixin/Generals_":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Generals_.js","./mixin/Layout_":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Layout_.js","./mixin/Transforms_":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Transforms_.js","./mixin/Typography_":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Typography_.js","utila":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\utila.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Fill_.js":[function(require,module,exports){
var ColorHolder, Fill_, css;

css = require('../../../../utility/css');

ColorHolder = require('../tools/ColorHolder');

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


},{"../../../../utility/css":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\utility\\css.js","../tools/ColorHolder":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\tools\\ColorHolder.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Filters_.js":[function(require,module,exports){
var CSSFilter, ClassPrototype, Filters_, css, method, methodName, _fn, _ref;

CSSFilter = require('css-filter');

css = require('../../../../utility/css');

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


},{"../../../../utility/css":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\utility\\css.js","css-filter":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-filter\\scripts\\js\\lib\\CSSFilter.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Generals_.js":[function(require,module,exports){
var General_, css;

css = require('../../../../utility/css');

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


},{"../../../../utility/css":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\utility\\css.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Layout_.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Transforms_.js":[function(require,module,exports){
var ClassPrototype, Transformation, Transforms_, css, cssify, method, methodName, _fn, _ref;

Transformation = require('transformation');

cssify = require('transformation/scripts/js/lib/cssify');

css = require('../../../../utility/css');

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


},{"../../../../utility/css":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\utility\\css.js","transformation":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\transformation\\scripts\\js\\lib\\Transformation.js","transformation/scripts/js/lib/cssify":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\transformation\\scripts\\js\\lib\\cssify.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\mixin\\Typography_.js":[function(require,module,exports){
var Typography_, css;

css = require('../../../../utility/css');

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


},{"../../../../utility/css":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\utility\\css.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\styleSetter\\tools\\ColorHolder.js":[function(require,module,exports){
var CSSColor, ClassPrototype, ColorHolder, method, methodName, _fn, _ref;

CSSColor = require('css-color');

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


},{"css-color":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\css-color\\scripts\\js\\lib\\CSSColor.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\transitioner\\Transitioner.js":[function(require,module,exports){
var Fill_, Transforms_, Transitioner, classic, easing, object, timing, _ref;

Fill_ = require('./mixin/Fill_');

Transforms_ = require('./mixin/Transforms_');

timing = require('../../../timing');

easing = require('timing-function');

_ref = require('utila'), classic = _ref.classic, object = _ref.object;

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


},{"../../../timing":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\timing.js","./mixin/Fill_":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\transitioner\\mixin\\Fill_.js","./mixin/Transforms_":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\transitioner\\mixin\\Transforms_.js","timing-function":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\timing-function\\scripts\\js\\lib\\timingFunction.js","utila":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\utila\\scripts\\js\\lib\\utila.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\transitioner\\mixin\\Fill_.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\el\\mixin\\transitioner\\mixin\\Transforms_.js":[function(require,module,exports){
var Transformation, Transforms_;

Transformation = require('Transformation');

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


},{"Transformation":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\Transformation\\scripts\\js\\lib\\Transformation.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\timing.js":[function(require,module,exports){
var Timing, timing;

Timing = require('raf-timing');

timing = new Timing;

timing.start();

module.exports = timing;


},{"raf-timing":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\node_modules\\raf-timing\\scripts\\js\\lib\\Timing.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\utility\\css.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\utility\\lazyValues.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\raf-timing\\scripts\\js\\lib\\raf.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\timing-function\\scripts\\js\\lib\\UnitBezier.js":[function(require,module,exports){
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

},{}],"D:\\xampp\\htdocs\\jik\\node_modules\\timing-function\\scripts\\js\\lib\\timingFunction.js":[function(require,module,exports){
// Generated by CoffeeScript 1.6.3
var UnitBezier, timingFunction;

UnitBezier = require('./UnitBezier');

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

},{"./UnitBezier":"D:\\xampp\\htdocs\\jik\\node_modules\\timing-function\\scripts\\js\\lib\\UnitBezier.js"}],"D:\\xampp\\htdocs\\jik\\node_modules\\utila\\scripts\\js\\lib\\array.js":[function(require,module,exports){
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


},{}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\AlbumDetail.js":[function(require,module,exports){
var AlbumDetail, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = AlbumDetail = (function(_super) {
  __extends(AlbumDetail, _super);

  function AlbumDetail(model) {
    this.model = model;
    AlbumDetail.__super__.constructor.apply(this, arguments);
    this.detail = false;
  }

  AlbumDetail.prototype.toggleDetail = function(id) {
    var temp;
    if (this.detail) {
      this._emit('detail-close', this.detail);
      temp = this.detail;
      this.detail = false;
    }
    if (id == null) {
      return;
    }
    if (id === temp) {
      return;
    }
    this.detail = id;
    return this._emit('detail-show', id);
  };

  AlbumDetail.prototype.loadDetail = function(id) {
    return setTimeout((function(_this) {
      return function() {
        var data;
        data = {
          id: id,
          songs: ['do', 're', 'me', 'fa', 'so', 'la', 'si']
        };
        return _this._emit('details', data);
      };
    })(this), 1000);
  };

  return AlbumDetail;

})(_Emitter);

/*
//@ sourceMappingURL=AlbumDetail.map
*/

},{"./_Emitter":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\_Emitter.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\Model.js":[function(require,module,exports){
var AlbumDetail, AlbumModel, ArtistModel, HomeModel, Model, MusicPlayerModel, Settings, SongModel, TitleModel, VideoModel, VideoPlayer, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MusicPlayerModel = require('./MusicPlayerModel');

VideoPlayer = require('./VideoPlayer');

AlbumDetail = require('./AlbumDetail');

ArtistModel = require('./PagesModel/ArtistModel');

TitleModel = require('./TitleModel');

AlbumModel = require('./PagesModel/AlbumModel');

VideoModel = require('./PagesModel/VideoModel');

HomeModel = require('./PagesModel/HomeModel');

SongModel = require('./PagesModel/SongModel');

Settings = require('./Settings');

_Emitter = require('./_Emitter');

module.exports = Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    Model.__super__.constructor.apply(this, arguments);
    this.musicPlayer = new MusicPlayerModel(this);
    this.videoPlayer = new VideoPlayer(this);
    this.page = new TitleModel(this);
    this.home = new HomeModel(this);
    this.artist = new ArtistModel(this);
    this.album = new AlbumModel(this);
    this.song = new SongModel(this);
    this.video = new VideoModel(this);
    this.albumDetail = new AlbumDetail(this);
    this.settings = new Settings(this);
  }

  return Model;

})(_Emitter);

/*
//@ sourceMappingURL=Model.map
*/

},{"./AlbumDetail":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\AlbumDetail.js","./MusicPlayerModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\MusicPlayerModel.js","./PagesModel/AlbumModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\AlbumModel.js","./PagesModel/ArtistModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\ArtistModel.js","./PagesModel/HomeModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\HomeModel.js","./PagesModel/SongModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\SongModel.js","./PagesModel/VideoModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\VideoModel.js","./Settings":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\Settings.js","./TitleModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\TitleModel.js","./VideoPlayer":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\VideoPlayer.js","./_Emitter":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\_Emitter.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\MusicPlayerModel.js":[function(require,module,exports){
var MusicPlayerModel, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = MusicPlayerModel = (function(_super) {
  __extends(MusicPlayerModel, _super);

  function MusicPlayerModel(rootModel) {
    this.rootModel = rootModel;
    MusicPlayerModel.__super__.constructor.apply(this, arguments);
    this.playing = false;
    this.lyricsShowing = false;
    this.playingId = 0;
    this.seeking = false;
    this.audioTag = document.createElement('audio');
    document.body.appendChild(this.audioTag);
    this.audioTag.addEventListener('timeupdate', (function(_this) {
      return function(event) {
        return _this._emit('seeker-update', _this.audioTag.currentTime / _this.audioTag.duration);
      };
    })(this));
    this.audioTag.addEventListener('progress', (function(_this) {
      return function(event) {
        try {
          return _this._emit('buffer-update', _this.audioTag.buffered.end(_this.audioTag.buffered.length - 1) / _this.audioTag.duration);
        } catch (_error) {}
      };
    })(this));
  }

  MusicPlayerModel.prototype.seekTo = function(x) {
    return this.audioTag.currentTime = x * this.audioTag.duration;
  };

  MusicPlayerModel.prototype.play = function(data) {
    this._emit('play-music', data);
    if (data.id === this.playingId) {
      return;
    }
    if (this.playing) {
      this.audioTag.pause();
    }
    if (this.rootModel.settings.quality) {
      this.audioTag.src = data.mp3;
      console.log('high');
    } else {
      this.audioTag.src = data.mp3_low;
      console.log('low');
    }
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

  MusicPlayerModel.prototype.toggleLyrics = function() {
    if (this.lyricsShowing) {
      this._emit('lyrics-hide');
      return this.lyricsShowing = false;
    } else {
      this._emit('lyrics-show');
      return this.lyricsShowing = true;
    }
  };

  return MusicPlayerModel;

})(_Emitter);

/*
//@ sourceMappingURL=MusicPlayerModel.map
*/

},{"./_Emitter":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\_Emitter.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel.js":[function(require,module,exports){
var PagesModel, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = PagesModel = (function(_super) {
  __extends(PagesModel, _super);

  function PagesModel(model) {
    this.model = model;
    PagesModel.__super__.constructor.apply(this, arguments);
    setTimeout((function(_this) {
      return function() {
        return _this._emit('option', _this.option);
      };
    })(this), 500);
  }

  PagesModel.prototype.get = function() {};

  PagesModel.prototype.refresh = function() {};

  PagesModel.prototype.loadMore = function() {};

  PagesModel.prototype.setOption = function(option) {
    this.option = option;
    return this._emit('option', this.option);
  };

  return PagesModel;

})(_Emitter);

/*
//@ sourceMappingURL=PagesModel.map
*/

},{"./_Emitter":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\_Emitter.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\AlbumModel.js":[function(require,module,exports){
var AlbumModel, PagesModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PagesModel = require('../PagesModel');

module.exports = AlbumModel = (function(_super) {
  __extends(AlbumModel, _super);

  function AlbumModel(model) {
    this.model = model;
    AlbumModel.__super__.constructor.apply(this, arguments);
    this.option = 0;
  }

  AlbumModel.prototype.get = function() {};

  AlbumModel.prototype.refresh = function() {
    this._emit('refresh');
    return this.get();
  };

  AlbumModel.prototype.setOption = function(option) {
    this.option = option;
    this._emit('option', this.option);
    return this.refresh();
  };

  return AlbumModel;

})(PagesModel);

/*
//@ sourceMappingURL=AlbumModel.map
*/

},{"../PagesModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\ArtistModel.js":[function(require,module,exports){
var ArtistModel, PagesModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PagesModel = require('../PagesModel');

module.exports = ArtistModel = (function(_super) {
  __extends(ArtistModel, _super);

  function ArtistModel(model) {
    this.model = model;
    ArtistModel.__super__.constructor.apply(this, arguments);
    this.option = 0;
  }

  ArtistModel.prototype.get = function() {
    return setTimeout((function(_this) {
      return function() {
        var json;
        return json = '[{"id":"140863","type":"song","artist":"mostafa yeganeh","artist_id":"116","songname":"Bavar Kardani Nist","popularity":"3.4","ratecount":"15","view":"3393","time":"2:59","date":"1393-04-13","poster":"http:\/\/85.25.243.154\/img\/5oh2a70em-1404491150.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/Gallery\/[Medium]\/bc6dsgnp-1404491150.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/mostafa+yeganeh\/-\/Bavar+Kardani+Nist","mp3":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3"},{"id":"140809","type":"song","artist":"Masoud Emami","artist_id":"1905","songname":"Khoda Doosam Dasht","popularity":"3.6","ratecount":"9","view":"4457","time":"3:33","date":"1393-04-12","poster":"http:\/\/85.25.243.154\/img\/utxrohick-1404397432.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Gallery\/[Medium]\/2u6wzwdn-1404397432.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Masoud+Emami\/-\/Khoda+Doosam+Dasht","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3"},{"id":"140785","type":"song","artist":"Amin Hayaei","artist_id":"12201","songname":"Owje Parvaz","popularity":"3.8","ratecount":"8","view":"2205","time":"5:22","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/gq9zswptj-1404332339.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/Gallery\/[Medium]\/qixdrptt-1404332339.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amin+Hayaei\/-\/Owje+Parvaz","mp3":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3"},{"id":"140782","type":"song","artist":"Bakhtak Band","artist_id":"11623","songname":"Dame Sobh","popularity":"2.6","ratecount":"8","view":"2966","time":"3:27","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/1spygoohm-1404322313.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/Gallery\/[Medium]\/hxb0sre5-1404322313.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/-\/Dame+Sobh","mp3":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3"},{"id":"9826","type":"album","artist":"Mohsen-sharifian","artist_id":"631","album":"Dingue Marrow","trackcount":"9","popularity":"5","date":"1393-04-14","url":"http:\/\/www.wikiseda.com\/Mohsen-sharifian\/Dingue+Marrow","view":"551","poster":"http:\/\/85.25.243.154\/img\/un79cef6qp-1404554657.jpg","year":"1393"},{"id":"9821","type":"album","artist":"O-hum","artist_id":"3927","album":"Hafez In Love","trackcount":"4","popularity":"5","date":"1393-04-08","url":"http:\/\/www.wikiseda.com\/O-hum\/Hafez+In+Love","view":"1756","poster":"http:\/\/85.25.243.154\/img\/1xxwe9fwdz-1404025213.jpg","year":"1393"},{"id":"9809","type":"album","artist":"Alireza Ghorbani","artist_id":"472","album":"Raftamo Bare Safar Bastam","trackcount":"6","popularity":"4.7","date":"1393-04-02","url":"http:\/\/www.wikiseda.com\/Alireza+Ghorbani\/Raftamo+Bare+Safar+Bastam","view":"18170","poster":"http:\/\/85.25.243.154\/img\/pf2m3p18sw-1403542665.jpg","year":"1393"},{"id":"9807","type":"album","artist":"Salar Aghili","artist_id":"97","album":"Vatan","trackcount":"9","popularity":"4.8","date":"1393-03-31","url":"http:\/\/www.wikiseda.com\/Salar+Aghili\/Vatan","view":"10829","poster":"http:\/\/85.25.243.154\/img\/obldv0b5l4-1403360590.jpg","year":"1393"},{"id":"4023","type":"video","artist":"Matin do hanjare","poster":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/[Gallery]\/8c1e2f4f65d428d910ece8e1c83cbc26-3.jpg","time":"3:2","videoname":"Marg Bar Man","lowq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-h.mp4","popularity":"3.8","view":"2292","url":"http:\/\/www.wikiseda.com\/Matin+do+hanjare\/+video\/Marg+Bar+Man","year":"1393"},{"id":"4022","type":"video","artist":"Amir Farjam","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/[Gallery]\/5fddee48dfa042d0664b066720a71bda-3.jpg","time":"3:32","videoname":"KHodaya","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-h.mp4","popularity":"5","view":"1769","url":"http:\/\/www.wikiseda.com\/Amir+Farjam\/+video\/KHodaya","year":"1393"},{"id":"4021","type":"video","artist":"Emo Band","poster":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/[Gallery]\/6ab639b8fef2f4fe7f9841d6f8d9f70d-3.jpg","time":"4:34","videoname":"Donyamo Live","lowq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-l.mp4","highq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-h.mp4","popularity":"4.1","view":"1728","url":"http:\/\/www.wikiseda.com\/Emo+Band\/+video\/Donyamo+Live","year":"1393"},{"id":"4019","type":"video","artist":"Amir Tataloo","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/[Gallery]\/d2931b538ae36b30847c9c139610311a-3.jpg","time":"3:29","videoname":"Baa To","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-h.mp4","popularity":"4.2","view":"10730","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/+video\/Baa+To","year":"1393"}]';
      };
    })(this), 500);
  };

  ArtistModel.prototype.loadmore = function() {
    return setTimeout((function(_this) {
      return function() {
        var json;
        return json = '[{"id":"140863","type":"song","artist":"mostafa yeganeh","artist_id":"116","songname":"Bavar Kardani Nist","popularity":"3.4","ratecount":"15","view":"3393","time":"2:59","date":"1393-04-13","poster":"http:\/\/85.25.243.154\/img\/5oh2a70em-1404491150.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/Gallery\/[Medium]\/bc6dsgnp-1404491150.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/mostafa+yeganeh\/-\/Bavar+Kardani+Nist","mp3":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3"}]';
      };
    })(this), 1000);
  };

  ArtistModel.prototype.refresh = function() {
    this._emit('refresh');
    return this.get();
  };

  ArtistModel.prototype.setOption = function(option) {
    this.option = option;
    this._emit('option', this.option);
    return this.refresh();
  };

  return ArtistModel;

})(PagesModel);

/*
//@ sourceMappingURL=ArtistModel.map
*/

},{"../PagesModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\HomeModel.js":[function(require,module,exports){
var HomeModel, PagesModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PagesModel = require('../PagesModel');

module.exports = HomeModel = (function(_super) {
  __extends(HomeModel, _super);

  function HomeModel(model) {
    this.model = model;
    HomeModel.__super__.constructor.apply(this, arguments);
    this.option = 0;
    this.loading = false;
  }

  HomeModel.prototype.get = function() {
    if (this.loading === true) {
      return;
    }
    this.loading = true;
    if (this.option === 0) {
      return setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"140863","type":"song","artist":"mostafa yeganeh","artist_id":"116","songname":"Bavar Kardani Nist","popularity":"3.4","ratecount":"15","view":"3393","time":"2:59","date":"1393-04-13","poster":"http:\/\/85.25.243.154\/img\/5oh2a70em-1404491150.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/Gallery\/[Medium]\/bc6dsgnp-1404491150.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/mostafa+yeganeh\/-\/Bavar+Kardani+Nist","mp3":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3"},{"id":"140809","type":"song","artist":"Masoud Emami","artist_id":"1905","songname":"Khoda Doosam Dasht","popularity":"3.6","ratecount":"9","view":"4457","time":"3:33","date":"1393-04-12","poster":"http:\/\/85.25.243.154\/img\/utxrohick-1404397432.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Gallery\/[Medium]\/2u6wzwdn-1404397432.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Masoud+Emami\/-\/Khoda+Doosam+Dasht","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3"},{"id":"140785","type":"song","artist":"Amin Hayaei","artist_id":"12201","songname":"Owje Parvaz","popularity":"3.8","ratecount":"8","view":"2205","time":"5:22","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/gq9zswptj-1404332339.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/Gallery\/[Medium]\/qixdrptt-1404332339.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amin+Hayaei\/-\/Owje+Parvaz","mp3":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3"},{"id":"140782","type":"song","artist":"Bakhtak Band","artist_id":"11623","songname":"Dame Sobh","popularity":"2.6","ratecount":"8","view":"2966","time":"3:27","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/1spygoohm-1404322313.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/Gallery\/[Medium]\/hxb0sre5-1404322313.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/-\/Dame+Sobh","mp3":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3"},{"id":"9826","type":"album","artist":"Mohsen-sharifian","artist_id":"631","album":"Dingue Marrow","trackcount":"9","popularity":"5","date":"1393-04-14","url":"http:\/\/www.wikiseda.com\/Mohsen-sharifian\/Dingue+Marrow","view":"551","poster":"http:\/\/85.25.243.154\/img\/un79cef6qp-1404554657.jpg","year":"1393"},{"id":"9821","type":"album","artist":"O-hum","artist_id":"3927","album":"Hafez In Love","trackcount":"4","popularity":"5","date":"1393-04-08","url":"http:\/\/www.wikiseda.com\/O-hum\/Hafez+In+Love","view":"1756","poster":"http:\/\/85.25.243.154\/img\/1xxwe9fwdz-1404025213.jpg","year":"1393"},{"id":"9809","type":"album","artist":"Alireza Ghorbani","artist_id":"472","album":"Raftamo Bare Safar Bastam","trackcount":"6","popularity":"4.7","date":"1393-04-02","url":"http:\/\/www.wikiseda.com\/Alireza+Ghorbani\/Raftamo+Bare+Safar+Bastam","view":"18170","poster":"http:\/\/85.25.243.154\/img\/pf2m3p18sw-1403542665.jpg","year":"1393"},{"id":"9807","type":"album","artist":"Salar Aghili","artist_id":"97","album":"Vatan","trackcount":"9","popularity":"4.8","date":"1393-03-31","url":"http:\/\/www.wikiseda.com\/Salar+Aghili\/Vatan","view":"10829","poster":"http:\/\/85.25.243.154\/img\/obldv0b5l4-1403360590.jpg","year":"1393"},{"id":"4023","type":"video","artist":"Matin do hanjare","poster":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/[Gallery]\/8c1e2f4f65d428d910ece8e1c83cbc26-3.jpg","time":"3:2","videoname":"Marg Bar Man","lowq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-h.mp4","popularity":"3.8","view":"2292","url":"http:\/\/www.wikiseda.com\/Matin+do+hanjare\/+video\/Marg+Bar+Man","year":"1393"},{"id":"4022","type":"video","artist":"Amir Farjam","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/[Gallery]\/5fddee48dfa042d0664b066720a71bda-3.jpg","time":"3:32","videoname":"KHodaya","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-h.mp4","popularity":"5","view":"1769","url":"http:\/\/www.wikiseda.com\/Amir+Farjam\/+video\/KHodaya","year":"1393"},{"id":"4021","type":"video","artist":"Emo Band","poster":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/[Gallery]\/6ab639b8fef2f4fe7f9841d6f8d9f70d-3.jpg","time":"4:34","videoname":"Donyamo Live","lowq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-l.mp4","highq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-h.mp4","popularity":"4.1","view":"1728","url":"http:\/\/www.wikiseda.com\/Emo+Band\/+video\/Donyamo+Live","year":"1393"},{"id":"4019","type":"video","artist":"Amir Tataloo","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/[Gallery]\/d2931b538ae36b30847c9c139610311a-3.jpg","time":"3:29","videoname":"Baa To","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-h.mp4","popularity":"4.2","view":"10730","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/+video\/Baa+To","year":"1393"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    } else {
      return setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"140785","type":"song","artist":"Amin Hayaei","artist_id":"12201","songname":"Owje Parvaz","popularity":"3.8","ratecount":"8","view":"2205","time":"5:22","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/gq9zswptj-1404332339.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/Gallery\/[Medium]\/qixdrptt-1404332339.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amin+Hayaei\/-\/Owje+Parvaz","mp3":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3"},{"id":"140782","type":"song","artist":"Bakhtak Band","artist_id":"11623","songname":"Dame Sobh","popularity":"2.6","ratecount":"8","view":"2966","time":"3:27","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/1spygoohm-1404322313.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/Gallery\/[Medium]\/hxb0sre5-1404322313.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/-\/Dame+Sobh","mp3":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3"},{"id":"9826","type":"album","artist":"Mohsen-sharifian","artist_id":"631","album":"Dingue Marrow","trackcount":"9","popularity":"5","date":"1393-04-14","url":"http:\/\/www.wikiseda.com\/Mohsen-sharifian\/Dingue+Marrow","view":"551","poster":"http:\/\/85.25.243.154\/img\/un79cef6qp-1404554657.jpg","year":"1393"},{"id":"9821","type":"album","artist":"O-hum","artist_id":"3927","album":"Hafez In Love","trackcount":"4","popularity":"5","date":"1393-04-08","url":"http:\/\/www.wikiseda.com\/O-hum\/Hafez+In+Love","view":"1756","poster":"http:\/\/85.25.243.154\/img\/1xxwe9fwdz-1404025213.jpg","year":"1393"},{"id":"9809","type":"album","artist":"Alireza Ghorbani","artist_id":"472","album":"Raftamo Bare Safar Bastam","trackcount":"6","popularity":"4.7","date":"1393-04-02","url":"http:\/\/www.wikiseda.com\/Alireza+Ghorbani\/Raftamo+Bare+Safar+Bastam","view":"18170","poster":"http:\/\/85.25.243.154\/img\/pf2m3p18sw-1403542665.jpg","year":"1393"},{"id":"9807","type":"album","artist":"Salar Aghili","artist_id":"97","album":"Vatan","trackcount":"9","popularity":"4.8","date":"1393-03-31","url":"http:\/\/www.wikiseda.com\/Salar+Aghili\/Vatan","view":"10829","poster":"http:\/\/85.25.243.154\/img\/obldv0b5l4-1403360590.jpg","year":"1393"},{"id":"4023","type":"video","artist":"Matin do hanjare","poster":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/[Gallery]\/8c1e2f4f65d428d910ece8e1c83cbc26-3.jpg","time":"3:2","videoname":"Marg Bar Man","lowq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-h.mp4","popularity":"3.8","view":"2292","url":"http:\/\/www.wikiseda.com\/Matin+do+hanjare\/+video\/Marg+Bar+Man","year":"1393"},{"id":"4022","type":"video","artist":"Amir Farjam","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/[Gallery]\/5fddee48dfa042d0664b066720a71bda-3.jpg","time":"3:32","videoname":"KHodaya","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-h.mp4","popularity":"5","view":"1769","url":"http:\/\/www.wikiseda.com\/Amir+Farjam\/+video\/KHodaya","year":"1393"},{"id":"4021","type":"video","artist":"Emo Band","poster":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/[Gallery]\/6ab639b8fef2f4fe7f9841d6f8d9f70d-3.jpg","time":"4:34","videoname":"Donyamo Live","lowq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-l.mp4","highq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-h.mp4","popularity":"4.1","view":"1728","url":"http:\/\/www.wikiseda.com\/Emo+Band\/+video\/Donyamo+Live","year":"1393"},{"id":"4019","type":"video","artist":"Amir Tataloo","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/[Gallery]\/d2931b538ae36b30847c9c139610311a-3.jpg","time":"3:29","videoname":"Baa To","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-h.mp4","popularity":"4.2","view":"10730","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/+video\/Baa+To","year":"1393"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    }
  };

  HomeModel.prototype.loadmore = function() {
    if (this.loading === true) {
      return;
    }
    this.loading = true;
    return setTimeout((function(_this) {
      return function() {
        var json;
        json = '[{"id":"140863","type":"song","artist":"mostafa yeganeh","artist_id":"116","songname":"Bavar Kardani Nist","popularity":"3.4","ratecount":"15","view":"3393","time":"2:59","date":"1393-04-13","poster":"http:\/\/85.25.243.154\/img\/5oh2a70em-1404491150.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/Gallery\/[Medium]\/bc6dsgnp-1404491150.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/mostafa+yeganeh\/-\/Bavar+Kardani+Nist","mp3":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3"}]';
        _this._emit('loadmore', JSON.parse(json));
        return _this.loading = false;
      };
    })(this), 1000);
  };

  HomeModel.prototype.refresh = function() {
    if (this.loading === true) {
      return;
    }
    this._emit('refresh');
    return this.get();
  };

  HomeModel.prototype.setOption = function(option) {
    this.option = option;
    if (this.loading === true) {
      return;
    }
    this._emit('option', this.option);
    return this.refresh();
  };

  return HomeModel;

})(PagesModel);

/*
//@ sourceMappingURL=HomeModel.map
*/

},{"../PagesModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\SongModel.js":[function(require,module,exports){
var PagesModel, SongModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PagesModel = require('../PagesModel');

module.exports = SongModel = (function(_super) {
  __extends(SongModel, _super);

  function SongModel(model) {
    this.model = model;
    SongModel.__super__.constructor.apply(this, arguments);
    this.loading = false;
    this.option = 0;
  }

  SongModel.prototype.get = function() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    return setTimeout((function(_this) {
      return function() {
        var json;
        json = '[{"id":"140863","type":"song","artist":"mostafa yeganeh","artist_id":"116","songname":"Bavar Kardani Nist","popularity":"3.4","ratecount":"15","view":"3393","time":"2:59","date":"1393-04-13","poster":"http:\/\/85.25.243.154\/img\/5oh2a70em-1404491150.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/Gallery\/[Medium]\/bc6dsgnp-1404491150.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/mostafa+yeganeh\/-\/Bavar+Kardani+Nist","mp3":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3"},{"id":"140809","type":"song","artist":"Masoud Emami","artist_id":"1905","songname":"Khoda Doosam Dasht","popularity":"3.6","ratecount":"9","view":"4457","time":"3:33","date":"1393-04-12","poster":"http:\/\/85.25.243.154\/img\/utxrohick-1404397432.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Gallery\/[Medium]\/2u6wzwdn-1404397432.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Masoud+Emami\/-\/Khoda+Doosam+Dasht","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3"},{"id":"140785","type":"song","artist":"Amin Hayaei","artist_id":"12201","songname":"Owje Parvaz","popularity":"3.8","ratecount":"8","view":"2205","time":"5:22","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/gq9zswptj-1404332339.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/Gallery\/[Medium]\/qixdrptt-1404332339.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amin+Hayaei\/-\/Owje+Parvaz","mp3":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3"},{"id":"140782","type":"song","artist":"Bakhtak Band","artist_id":"11623","songname":"Dame Sobh","popularity":"2.6","ratecount":"8","view":"2966","time":"3:27","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/1spygoohm-1404322313.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/Gallery\/[Medium]\/hxb0sre5-1404322313.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/-\/Dame+Sobh","mp3":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3"},{"id":"9826","type":"album","artist":"Mohsen-sharifian","artist_id":"631","album":"Dingue Marrow","trackcount":"9","popularity":"5","date":"1393-04-14","url":"http:\/\/www.wikiseda.com\/Mohsen-sharifian\/Dingue+Marrow","view":"551","poster":"http:\/\/85.25.243.154\/img\/un79cef6qp-1404554657.jpg","year":"1393"},{"id":"9821","type":"album","artist":"O-hum","artist_id":"3927","album":"Hafez In Love","trackcount":"4","popularity":"5","date":"1393-04-08","url":"http:\/\/www.wikiseda.com\/O-hum\/Hafez+In+Love","view":"1756","poster":"http:\/\/85.25.243.154\/img\/1xxwe9fwdz-1404025213.jpg","year":"1393"},{"id":"9809","type":"album","artist":"Alireza Ghorbani","artist_id":"472","album":"Raftamo Bare Safar Bastam","trackcount":"6","popularity":"4.7","date":"1393-04-02","url":"http:\/\/www.wikiseda.com\/Alireza+Ghorbani\/Raftamo+Bare+Safar+Bastam","view":"18170","poster":"http:\/\/85.25.243.154\/img\/pf2m3p18sw-1403542665.jpg","year":"1393"},{"id":"9807","type":"album","artist":"Salar Aghili","artist_id":"97","album":"Vatan","trackcount":"9","popularity":"4.8","date":"1393-03-31","url":"http:\/\/www.wikiseda.com\/Salar+Aghili\/Vatan","view":"10829","poster":"http:\/\/85.25.243.154\/img\/obldv0b5l4-1403360590.jpg","year":"1393"},{"id":"4023","type":"video","artist":"Matin do hanjare","poster":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/[Gallery]\/8c1e2f4f65d428d910ece8e1c83cbc26-3.jpg","time":"3:2","videoname":"Marg Bar Man","lowq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-h.mp4","popularity":"3.8","view":"2292","url":"http:\/\/www.wikiseda.com\/Matin+do+hanjare\/+video\/Marg+Bar+Man","year":"1393"},{"id":"4022","type":"video","artist":"Amir Farjam","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/[Gallery]\/5fddee48dfa042d0664b066720a71bda-3.jpg","time":"3:32","videoname":"KHodaya","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-h.mp4","popularity":"5","view":"1769","url":"http:\/\/www.wikiseda.com\/Amir+Farjam\/+video\/KHodaya","year":"1393"},{"id":"4021","type":"video","artist":"Emo Band","poster":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/[Gallery]\/6ab639b8fef2f4fe7f9841d6f8d9f70d-3.jpg","time":"4:34","videoname":"Donyamo Live","lowq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-l.mp4","highq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-h.mp4","popularity":"4.1","view":"1728","url":"http:\/\/www.wikiseda.com\/Emo+Band\/+video\/Donyamo+Live","year":"1393"},{"id":"4019","type":"video","artist":"Amir Tataloo","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/[Gallery]\/d2931b538ae36b30847c9c139610311a-3.jpg","time":"3:29","videoname":"Baa To","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-h.mp4","popularity":"4.2","view":"10730","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/+video\/Baa+To","year":"1393"}]';
        _this._emit('song-list', JSON.parse(json));
        return _this.loading = false;
      };
    })(this), 500);
  };

  SongModel.prototype.refresh = function() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this._emit('song-list-refresh');
    return this.get();
  };

  SongModel.prototype.setOption = function(option) {
    this.option = option;
    this._emit('option', this.option);
    return this.refresh();
  };

  return SongModel;

})(PagesModel);

/*
//@ sourceMappingURL=SongModel.map
*/

},{"../PagesModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\VideoModel.js":[function(require,module,exports){
var PagesModel, VideoModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PagesModel = require('../PagesModel');

module.exports = VideoModel = (function(_super) {
  __extends(VideoModel, _super);

  function VideoModel(model) {
    this.model = model;
    VideoModel.__super__.constructor.apply(this, arguments);
    this.option = 0;
  }

  VideoModel.prototype.get = function() {
    return setTimeout((function(_this) {
      return function() {
        var json;
        json = '[{"id":"140863","type":"song","artist":"mostafa yeganeh","artist_id":"116","songname":"Bavar Kardani Nist","popularity":"3.4","ratecount":"15","view":"3393","time":"2:59","date":"1393-04-13","poster":"http:\/\/85.25.243.154\/img\/5oh2a70em-1404491150.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/Gallery\/[Medium]\/bc6dsgnp-1404491150.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/mostafa+yeganeh\/-\/Bavar+Kardani+Nist","mp3":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3"},{"id":"140809","type":"song","artist":"Masoud Emami","artist_id":"1905","songname":"Khoda Doosam Dasht","popularity":"3.6","ratecount":"9","view":"4457","time":"3:33","date":"1393-04-12","poster":"http:\/\/85.25.243.154\/img\/utxrohick-1404397432.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Gallery\/[Medium]\/2u6wzwdn-1404397432.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Masoud+Emami\/-\/Khoda+Doosam+Dasht","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3"},{"id":"140785","type":"song","artist":"Amin Hayaei","artist_id":"12201","songname":"Owje Parvaz","popularity":"3.8","ratecount":"8","view":"2205","time":"5:22","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/gq9zswptj-1404332339.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/Gallery\/[Medium]\/qixdrptt-1404332339.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amin+Hayaei\/-\/Owje+Parvaz","mp3":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3"},{"id":"140782","type":"song","artist":"Bakhtak Band","artist_id":"11623","songname":"Dame Sobh","popularity":"2.6","ratecount":"8","view":"2966","time":"3:27","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/1spygoohm-1404322313.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/Gallery\/[Medium]\/hxb0sre5-1404322313.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/-\/Dame+Sobh","mp3":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3"},{"id":"9826","type":"album","artist":"Mohsen-sharifian","artist_id":"631","album":"Dingue Marrow","trackcount":"9","popularity":"5","date":"1393-04-14","url":"http:\/\/www.wikiseda.com\/Mohsen-sharifian\/Dingue+Marrow","view":"551","poster":"http:\/\/85.25.243.154\/img\/un79cef6qp-1404554657.jpg","year":"1393"},{"id":"9821","type":"album","artist":"O-hum","artist_id":"3927","album":"Hafez In Love","trackcount":"4","popularity":"5","date":"1393-04-08","url":"http:\/\/www.wikiseda.com\/O-hum\/Hafez+In+Love","view":"1756","poster":"http:\/\/85.25.243.154\/img\/1xxwe9fwdz-1404025213.jpg","year":"1393"},{"id":"9809","type":"album","artist":"Alireza Ghorbani","artist_id":"472","album":"Raftamo Bare Safar Bastam","trackcount":"6","popularity":"4.7","date":"1393-04-02","url":"http:\/\/www.wikiseda.com\/Alireza+Ghorbani\/Raftamo+Bare+Safar+Bastam","view":"18170","poster":"http:\/\/85.25.243.154\/img\/pf2m3p18sw-1403542665.jpg","year":"1393"},{"id":"9807","type":"album","artist":"Salar Aghili","artist_id":"97","album":"Vatan","trackcount":"9","popularity":"4.8","date":"1393-03-31","url":"http:\/\/www.wikiseda.com\/Salar+Aghili\/Vatan","view":"10829","poster":"http:\/\/85.25.243.154\/img\/obldv0b5l4-1403360590.jpg","year":"1393"},{"id":"4023","type":"video","artist":"Matin do hanjare","poster":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/[Gallery]\/8c1e2f4f65d428d910ece8e1c83cbc26-3.jpg","time":"3:2","videoname":"Marg Bar Man","lowq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-h.mp4","popularity":"3.8","view":"2292","url":"http:\/\/www.wikiseda.com\/Matin+do+hanjare\/+video\/Marg+Bar+Man","year":"1393"},{"id":"4022","type":"video","artist":"Amir Farjam","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/[Gallery]\/5fddee48dfa042d0664b066720a71bda-3.jpg","time":"3:32","videoname":"KHodaya","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-h.mp4","popularity":"5","view":"1769","url":"http:\/\/www.wikiseda.com\/Amir+Farjam\/+video\/KHodaya","year":"1393"},{"id":"4021","type":"video","artist":"Emo Band","poster":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/[Gallery]\/6ab639b8fef2f4fe7f9841d6f8d9f70d-3.jpg","time":"4:34","videoname":"Donyamo Live","lowq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-l.mp4","highq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-h.mp4","popularity":"4.1","view":"1728","url":"http:\/\/www.wikiseda.com\/Emo+Band\/+video\/Donyamo+Live","year":"1393"},{"id":"4019","type":"video","artist":"Amir Tataloo","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/[Gallery]\/d2931b538ae36b30847c9c139610311a-3.jpg","time":"3:29","videoname":"Baa To","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-h.mp4","popularity":"4.2","view":"10730","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/+video\/Baa+To","year":"1393"}]';
        return _this._emit('video-list', JSON.parse(json));
      };
    })(this), 500);
  };

  VideoModel.prototype.refresh = function() {
    this._emit('video-list-refresh');
    return this.get();
  };

  VideoModel.prototype.setOption = function(option) {
    this.option = option;
    this._emit('option', this.option);
    return this.refresh();
  };

  return VideoModel;

})(PagesModel);

/*
//@ sourceMappingURL=VideoModel.map
*/

},{"../PagesModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\Settings.js":[function(require,module,exports){
var Settings, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = Settings = (function(_super) {
  __extends(Settings, _super);

  function Settings(model) {
    this.model = model;
    Settings.__super__.constructor.apply(this, arguments);
    this.quality = localStorage.getItem('quality');
    if (this.quality === 'false') {
      this.quality = false;
    } else if (this.quality === 'true') {
      this.quality = true;
    } else {
      this.quality = true;
    }
  }

  Settings.prototype.changeQuality = function(quality) {
    this.quality = quality;
    return localStorage.setItem('quality', this.quality);
  };

  Settings.prototype.switchQuality = function() {
    this.changeQuality(!this.quality);
    return this._emit('quality', this.quality);
  };

  return Settings;

})(_Emitter);

/*
//@ sourceMappingURL=Settings.map
*/

},{"./_Emitter":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\_Emitter.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\TitleModel.js":[function(require,module,exports){
var TitleModel, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = TitleModel = (function(_super) {
  __extends(TitleModel, _super);

  function TitleModel() {
    TitleModel.__super__.constructor.apply(this, arguments);
    this.currentActive = 0;
    this.rightSwipe = false;
    this.settings = false;
  }

  TitleModel.prototype.activeTitle = function(title) {
    if (title != null) {
      this.currentActive = title;
    }
    return this._emit('page-active', this.currentActive);
  };

  TitleModel.prototype.prevActiveTitle = function() {
    if (this.currentActive > 0) {
      this.currentActive--;
    }
    return this._emit('page-active', this.currentActive);
  };

  TitleModel.prototype.nextActiveTitle = function() {
    if (this.currentActive < 4) {
      this.currentActive++;
    }
    return this._emit('page-active', this.currentActive);
  };

  TitleModel.prototype.showRightSwipe = function() {
    this.rightSwipe = true;
    return this._emit('right-swipe', this.rightSwipe);
  };

  TitleModel.prototype.hideRightSwipe = function() {
    this.rightSwipe = false;
    return this._emit('right-swipe', this.rightSwipe);
  };

  TitleModel.prototype.toggleRightSwipe = function() {
    this.rightSwipe = !this.rightSwipe;
    return this._emit('right-swipe', this.rightSwipe);
  };

  TitleModel.prototype.showSettings = function() {
    this.settings = true;
    return this._emit('settings', this.settings);
  };

  TitleModel.prototype.hideSettings = function() {
    this.settings = false;
    return this._emit('settings', this.settings);
  };

  TitleModel.prototype.toggleSettings = function() {
    this.settings = !this.settings;
    return this._emit('settings', this.settings);
  };

  return TitleModel;

})(_Emitter);

/*
//@ sourceMappingURL=TitleModel.map
*/

},{"./_Emitter":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\_Emitter.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\VideoPlayer.js":[function(require,module,exports){
var VideoPlayer, _Emitter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = VideoPlayer = (function(_super) {
  __extends(VideoPlayer, _super);

  function VideoPlayer(rootModel) {
    this.rootModel = rootModel;
    VideoPlayer.__super__.constructor.apply(this, arguments);
    this.playing = false;
    this.lyricsShowing = false;
    this.playingId = 0;
    this.seeking = false;
  }

  VideoPlayer.prototype.play = function(data) {
    this._emit('play-video', data);
    if (data.id === this.playingId) {
      return;
    }
    this.playing = true;
    this.playingId = data.id;
    return this.getMoreDetail(data.id);
  };

  VideoPlayer.prototype.pause = function() {
    this.playing = false;
    return this._emit('video-pause');
  };

  VideoPlayer.prototype.toggle = function() {
    if (this.playing) {
      this._emit('video-pause');
    } else {
      this._emit('video-unpause');
    }
    return this.playing = !this.playing;
  };

  VideoPlayer.prototype.getMoreDetail = function(id) {
    return setTimeout((function(_this) {
      return function() {
        var json;
        json = '{"lyric":"<p>\u0639\u0634\u0642 \u0627\u062d\u0633\u0627\u0633\u0647 \u0646\u0647 \u0645\u0639\u0627\u062f\u0644\u0647<\/p><p>\u0628\u062e\u0648\u0627\u06cc \u062d\u0644\u0634 \u06a9\u0646\u06cc \u0645\u06cc\u0634\u0647 \u0645\u0628\u0627\u062f\u0644\u0647<\/p><p>\u0627\u06cc\u0646 \u0645\u0628\u0627\u062f\u0644\u0647 \u0645\u06cc\u0634\u0647 \u0645\u062c\u0627\u062f\u0644\u0647<\/p><p>\u0647\u06cc\u0634\u06a9\u06cc \u0647\u06cc\u0686\u06cc \u0646\u06af\u0647<\/p><p>\u062d\u06a9\u0645 \u0627\u06cc\u0646\u062c\u0627 \u062f\u0644\u0647<\/p><p>\u0627\u062d\u0633\u0627\u0633\u0647 \u062d\u0633\u0647 \u0644\u0645\u0633\u0647 \u062f\u0633\u062a\u0647 \u06af\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u062d\u0633\u0627\u0633\u0647 \u062d\u0633\u0647 \u0644\u0645\u0633\u0647 \u062f\u0633\u062a\u0647 \u06af\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u062d\u0633\u0627\u0633\u0647 \u062d\u0633\u0647 \u0644\u0645\u0633\u0647 \u062f\u0633\u062a\u0647 \u06af\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u062d\u0633\u0627\u0633\u0647 \u062d\u0633\u0647 \u0644\u0645\u0633\u0647 \u062f\u0633\u062a\u0647 \u06af\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u06cc \u062f\u0644 \u0645\u0646 \u062f\u0627\u0631\u0647 \u0628\u0627 \u062f\u0644\u062a \u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0628\u06cc \u0647\u0648\u0627 \u0628\u06cc \u062d\u0648\u0627\u0633 \u0628\u06cc \u062f\u0644\u06cc\u0644 \u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0627\u0648\u0646 \u06a9\u0647 \u0645\u06cc\u0644\u0631\u0632\u0647 \u0648\u0627\u0633\u062a \u062d\u0633\u0627\u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0647\u06cc \u062f\u0644\u0647 \u0645\u0646 \u062f\u0627\u0631\u0647 \u0628\u0627 \u062f\u0644\u062a \u0645\u06cc \u062f\u0644\u0647<\/p><p>\u0647\u06cc \u0647\u06cc \u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u062a\u0648 \u0639\u0634\u0642 \u0645\u0646\u06cc<\/p><p>\u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u06a9\u0647 \u0647\u06cc \u0642\u0648\u0644\u062a\u0648 \u0645\u06cc\u0634\u06a9\u0646\u06cc<\/p><p>\u062f\u0631\u062f\u0633\u0631 \u0633\u0627\u0632\u0647 \u0644\u062c\u0628\u0627\u0632\u0647 \u062f\u0648\u0633\u062a \u062f\u0627\u0634\u062a\u0646\u06cc<\/p><p>\u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u062a\u0648 \u0639\u0634\u0642 \u0645\u0646\u06cc<\/p><p>\u0639\u0634\u0642 \u062a\u062d\u06a9\u06cc\u0645\u0647 \u0646\u0647 \u0645\u062d\u0627\u06a9\u0645\u0647<\/p><p>\u0646\u0647 \u0645\u062d\u06a9\u0648\u0645 \u06a9\u0633\u06cc \u0646\u0647 \u0647\u06cc\u0634\u06a9\u06cc \u062d\u0627\u06a9\u0645\u0647<\/p><p>\u0639\u0634\u0642 \u062a\u0642\u062f\u06cc\u0645\u0647 \u0646\u0647 \u0645\u0628\u0627\u062f\u0644\u0647<\/p><p>\u062e\u0637 \u0645\u0645\u062a\u062f\u0650 \u0646\u0647 \u062e\u0637 \u0641\u0627\u0635\u0644\u0647<\/p><p>\u062d\u0633\u0627\u0633\u0647 \u0648\u0627\u0633\u0647 \u062d\u0633\u0647 \u0645\u062b\u0647 \u062f\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u062d\u0633\u0627\u0633\u0647 \u0648\u0627\u0633\u0647 \u062d\u0633\u0647 \u0645\u062b\u0647 \u062f\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u062d\u0633\u0627\u0633\u0647 \u0648\u0627\u0633\u0647 \u062d\u0633\u0647 \u0645\u062b\u0647 \u062f\u0644\u06cc \u06a9\u0647 \u0628\u0647\u0645 \u062f\u0627\u062f\u06cc<\/p><p>\u0627\u06cc \u062f\u0644 \u0645\u0646 \u062f\u0627\u0631\u0647 \u0628\u0627 \u062f\u0644\u062a \u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0628\u06cc \u0647\u0648\u0627 \u0628\u06cc \u062d\u0648\u0627\u0633 \u0628\u06cc \u062f\u0644\u06cc\u0644 \u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0627\u0648\u0646 \u06a9\u0647 \u0645\u06cc\u0644\u0631\u0632\u0647 \u0648\u0627\u0633\u062a \u062d\u0633\u0627\u0628\u06cc \u062f\u0644\u0647<\/p><p>\u0647\u06cc \u062f\u0644\u0647 \u0645\u0646 \u062f\u0627\u0631\u0647 \u0628\u0627 \u062f\u0644\u062a \u0645\u06cc \u062f\u0644\u0647<\/p><p>\u0647\u06cc \u0647\u06cc \u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u062a\u0648 \u0639\u0634\u0642 \u0645\u0646\u06cc<\/p><p>\u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u06a9\u0647 \u0647\u06cc \u0642\u0648\u0644\u062a\u0648 \u0645\u06cc\u0634\u06a9\u0646\u06cc<\/p><p>\u062f\u0631\u062f\u0633\u0631 \u0633\u0627\u0632\u0647 \u0644\u062c\u0628\u0627\u0632\u0647 \u062f\u0648\u0633\u062a \u062f\u0627\u0634\u062a\u0646\u06cc<\/p><p>\u0647\u06cc \u0647\u06cc \u0647\u06cc \u0631\u0648\u0627\u0646\u06cc \u062a\u0648 \u0639\u0634\u0642 \u0645\u0646\u06cc<\/p>","info":{"albumcount":"18","dlcount":"24300","view":"56038","descrip":"","tags":"\u067e\u0627\u067e ,","lyrics":"\u0641\u0631\u0634\u06cc\u062f \u0633\u0645\u0627","composer":"\u0628\u0646\u06cc\u0627\u0645\u06cc\u0646 \u0628\u0647\u0627\u062f\u0631\u06cc ","arrangement":"\u0641\u0631\u0634\u06cc\u062f \u0633\u0645\u0627 "},"summary":{"size":"7MB","dateadded":"2014-04-20","format":"mp3","permission":null},"song":[{"id":"133928","type":"song","artist":"\u0628\u0646\u06cc\u0627\u0645\u06cc\u0646 \u0628\u0647\u0627\u062f\u0631\u06cc","artist_id":"71","songname":"\u0639\u0634\u0642 \u0627\u062d\u0633\u0627\u0633\u0647","popularity":"4.4","ratecount":"127","view":"56038","time":"3:8","date":"1393-01-31","poster":"http:\/\/85.25.243.154\/img\/5pkjehomg-1397985962.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Benyamin\/Gallery\/[Medium]\/qpvfehss-1397985962.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Benyamin\/-\/Eshgh+Ehsaseh","mp3":"http:\/\/85.25.95.231\/music\/B\/Benyamin\/[one]\/Eshgh Ehsaseh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Benyamin\/[one]\/Eshgh Ehsaseh [WikiSeda].mp3"}]}';
        return _this._emit('music-more-detail', JSON.parse(json));
      };
    })(this), 2500);
  };

  return VideoPlayer;

})(_Emitter);

/*
//@ sourceMappingURL=VideoPlayer.map
*/

},{"./_Emitter":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\_Emitter.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\_Emitter.js":[function(require,module,exports){
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

},{"utila/scripts/js/lib/array":"D:\\xampp\\htdocs\\jik\\node_modules\\utila\\scripts\\js\\lib\\array.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item.js":[function(require,module,exports){
var Foxie, Item;

Foxie = require('Foxie');

module.exports = Item = (function() {
  function Item(mainView, parentNode, page, data, count) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.page = page;
    this.count = count;
    this.el = Foxie('.item').perspective(4000);
    this.titlesContainer = Foxie('.titles-container').putIn(this.el);
    this.hammer = new Hammer(this.titlesContainer.node);
    this.title1 = Foxie('.item-songname').putIn(this.titlesContainer);
    this.title2 = Foxie('.item-artist').innerHTML(data.artist).putIn(this.titlesContainer);
    this.poster = Foxie('img.item-poster').attr('src', data.poster).putIn(this.titlesContainer);
    this.el.putIn(this.parentNode);
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

  Item.prototype.remove = function() {
    return this.parentNode.node.removeChild(this.el.node);
  };

  return Item;

})();

/*
//@ sourceMappingURL=Item.map
*/

},{"Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\AlbumItem.js":[function(require,module,exports){
var AlbumItem, Foxie, Item, SimpleSong,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('Foxie');

SimpleSong = require('../SimpleSong');

Item = require('../Item');

module.exports = AlbumItem = (function(_super) {
  __extends(AlbumItem, _super);

  function AlbumItem(mainView, parentNode, page, data, count) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.page = page;
    this.count = count;
    AlbumItem.__super__.constructor.apply(this, arguments);
    Foxie('.album-icon').putIn(this.titlesContainer);
    this.detailNotLoaded = Foxie('.simple-songname').innerHTML('Loading Album').moveYTo(85).putIn(this.el);
    this.detailsLoaded = false;
    this.title1.innerHTML(data.album);
    this.hammer.on('tap', (function(_this) {
      return function() {
        if (_this.detailsLoaded === false) {
          _this.mainView.model.albumDetail.loadDetail(data.id);
        }
        _this.mainView.model.albumDetail.toggleDetail(data.id);
      };
    })(this));
    this.mainView.model.albumDetail.on('details', (function(_this) {
      return function(albumDetail) {
        var song, _i, _len, _ref;
        if (albumDetail.id !== data.id) {
          return;
        }
        _this.detailsLoaded = true;
        _this.el.node.removeChild(_this.detailNotLoaded.node);
        _ref = albumDetail.songs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          song = _ref[_i];
          _this.createSong(song);
        }
        if (_this.mainView.model.albumDetail.detail === data.id) {
          _this.el.setHeight(_this.songs.length * 50 + 75);
          _this.page.updateSize();
        }
      };
    })(this));
    this.mainView.model.albumDetail.on('detail-show', (function(_this) {
      return function(id) {
        if (id !== data.id) {
          return;
        }
        if (_this.detailsLoaded === false) {
          _this.el.setHeight(120);
        } else {
          _this.el.setHeight(_this.songs.length * 50 + 75);
        }
        _this.page.updateSize();
        _this.page.scrollToItem(_this.count);
      };
    })(this));
    this.mainView.model.albumDetail.on('detail-close', (function(_this) {
      return function(id) {
        if (id !== data.id) {
          return;
        }
        _this.el.setHeight(75);
        _this.page.updateSize();
      };
    })(this));
    this.songs = [];
  }

  AlbumItem.prototype.createSong = function(data) {
    var song;
    song = new SimpleSong(this.mainView, this.el, data);
    return this.songs.push(song);
  };

  return AlbumItem;

})(Item);

/*
//@ sourceMappingURL=AlbumItem.map
*/

},{"../Item":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item.js","../SimpleSong":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\SimpleSong.js","Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\SongItem.js":[function(require,module,exports){
var Foxie, Item, SongItem,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('Foxie');

Item = require('../Item');

module.exports = SongItem = (function(_super) {
  __extends(SongItem, _super);

  function SongItem(mainView, parentNode, page, data) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.page = page;
    SongItem.__super__.constructor.apply(this, arguments);
    this.title1.innerHTML(data.songname);
    this.hammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.mainView.model.musicPlayer.play(data);
      };
    })(this));
  }

  return SongItem;

})(Item);

/*
//@ sourceMappingURL=SongItem.map
*/

},{"../Item":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item.js","Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\VideoItem.js":[function(require,module,exports){
var Foxie, Item, VideoItem,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('Foxie');

Item = require('../Item');

module.exports = VideoItem = (function(_super) {
  __extends(VideoItem, _super);

  function VideoItem(mainView, parentNode, page, data) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.page = page;
    VideoItem.__super__.constructor.apply(this, arguments);
    this.title1.innerHTML(data.videoname);
    this.el.node.classList.add('video-item');
    this.title1.node.classList.add('video-item-songname');
    this.title2.node.classList.add('video-item-artist');
    this.title3 = Foxie('.video-item-time').innerHTML(data.time).putIn(this.el);
    this.poster.node.classList.add('video-item-poster');
    this.hammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.mainView.model.videoPlayer.play(data);
      };
    })(this));
  }

  return VideoItem;

})(Item);

/*
//@ sourceMappingURL=VideoItem.map
*/

},{"../Item":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item.js","Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Main.js":[function(require,module,exports){
var Album, Artist, Foxie, HomePage, Main, MusicPlayer, Ribbon, RightSwipe, Settings, Song, Video, VideoPlayer;

Foxie = require('foxie');

Ribbon = require('./Ribbon/Ribbon');

Artist = require('./Pages/Artist');

Video = require('./Pages/Video');

Album = require('./Pages/Album');

Song = require('./Pages/Song');

HomePage = require('./Pages/HomePage');

Settings = require('./Settings');

RightSwipe = require('./RightSwipe');

MusicPlayer = require('./MusicPlayer');

VideoPlayer = require('./VideoPlayer');

module.exports = Main = (function() {
  function Main(model) {
    this.model = model;
    this.el = Foxie('.master').putIn(document.body);
    this.bg = Foxie('.master-bg').moveXTo(-200).trans(300).putIn(this.el);
    this.inside = Foxie('.master-inside');
    this.ribbon = new Ribbon(this, ['home', 'artist', 'album', 'song', 'video']);
    this.inside.putIn(this.el);
    this.homePage = new HomePage(this, this.ribbon.getPage(0), this.ribbon.getSubnameSelector(0));
    this.artistPage = new Artist(this, this.ribbon.getPage(1), this.ribbon.getSubnameSelector(1));
    this.AlbumPage = new Album(this, this.ribbon.getPage(2), this.ribbon.getSubnameSelector(2));
    this.songPage = new Song(this, this.ribbon.getPage(3), this.ribbon.getSubnameSelector(3));
    this.videoPage = new Video(this, this.ribbon.getPage(4), this.ribbon.getSubnameSelector(4));
    this.rightSwipe = new RightSwipe(this);
    this.musicPlayer = new MusicPlayer(this);
    this.videoPlayer = new VideoPlayer(this);
    this.settings = new Settings(this);
  }

  return Main;

})();

/*
//@ sourceMappingURL=Main.map
*/

},{"./MusicPlayer":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\MusicPlayer.js","./Pages/Album":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\Album.js","./Pages/Artist":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\Artist.js","./Pages/HomePage":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\HomePage.js","./Pages/Song":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\Song.js","./Pages/Video":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\Video.js","./Ribbon/Ribbon":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Ribbon\\Ribbon.js","./RightSwipe":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\RightSwipe.js","./Settings":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Settings.js","./VideoPlayer":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\VideoPlayer.js","foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\MusicPlayer.js":[function(require,module,exports){
var Foxie, Lyric, MusicPlayer, Seekbar;

Foxie = require('Foxie');

Lyric = require('./MusicPlayer/Lyric');

Seekbar = require('./MusicPlayer/Seekbar');

module.exports = MusicPlayer = (function() {
  function MusicPlayer(mainView) {
    var elHammer, hideBtnHammer, playHammer, playTopHammer;
    this.mainView = mainView;
    this.transTime = 700;
    this.showing = false;
    this.height = window.innerHeight;
    this.el = Foxie('.musicplayer').moveYTo(this.height).trans(this.transTime).perspective(4000).putIn(this.mainView.el);
    elHammer = new Hammer(this.el.node);
    elHammer.on('panup', (function(_this) {
      return function(arg) {
        if (!_this.showing) {
          return _this.show();
        }
      };
    })(this));
    elHammer.on('pandown', (function(_this) {
      return function(arg) {
        return _this.hide();
      };
    })(this));
    this.playTop = Foxie('.musicplayer-button.musicplayer-playtop').trans(500).putIn(this.el);
    playTopHammer = new Hammer(this.playTop.node);
    playTopHammer.on('tap', (function(_this) {
      return function(arg) {
        if (!_this.showing) {
          return _this.mainView.model.musicPlayer.toggle();
        }
      };
    })(this));
    this.posterTop = Foxie('img.musicplayer-postertop').attr('draggable', 'false').setOpacity(0).trans(500).putIn(this.el);
    this.hideBtn = Foxie('.musicplayer-button.musicplayer-hide').trans(500).putIn(this.el);
    this.songName = Foxie('.musicplayer-songname').putIn(this.el);
    this.artist = Foxie('.musicplayer-artist').putIn(this.el);
    this.posterContainer = Foxie('.musicplayer-poster').putIn(this.el);
    this.poster = Foxie('img').attr('draggable', 'false').putIn(this.posterContainer);
    this.lyric = new Lyric(this.posterContainer, this.mainView.model.musicPlayer);
    this.seekbar = new Seekbar(this.el, this.mainView.model.musicPlayer);
    this.buttons = Foxie('.musicplayer-buttons').putIn(this.el);
    this.prev = Foxie('.musicplayer-button.musicplayer-prev').putIn(this.buttons);
    this.play = Foxie('.musicplayer-button.musicplayer-play').putIn(this.buttons);
    this.next = Foxie('.musicplayer-button.musicplayer-next').putIn(this.buttons);
    window.addEventListener('resize', (function(_this) {
      return function(event) {
        _this.height = window.innerHeight;
        _this.lyric.updateScrollSize();
        if (!_this.showing) {
          _this.forceHide();
        }
      };
    })(this));
    playHammer = new Hammer(this.play.node);
    playHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.mainView.model.musicPlayer.toggle();
      };
    })(this));
    hideBtnHammer = new Hammer(this.hideBtn.node);
    hideBtnHammer.on('tap', (function(_this) {
      return function(arg) {
        if (_this.showing) {
          return _this.hide();
        } else {
          if (_this.mainView.model.musicPlayer.playing) {
            return _this.show();
          } else {
            return _this.hide();
          }
        }
      };
    })(this));
    this.mainView.model.musicPlayer.on('show-player', (function(_this) {
      return function() {
        return _this.show();
      };
    })(this));
    this.mainView.model.musicPlayer.on('play-music', (function(_this) {
      return function(data) {
        return _this.show(data);
      };
    })(this));
    this.mainView.model.musicPlayer.on('music-pause', (function(_this) {
      return function() {
        _this.play.node.classList.add('musicplayer-pause');
        _this.playTop.node.classList.add('musicplayer-pausetop');
      };
    })(this));
    this.mainView.model.musicPlayer.on('music-unpause', (function(_this) {
      return function() {
        _this.play.node.classList.remove('musicplayer-pause');
        _this.playTop.node.classList.remove('musicplayer-pausetop');
      };
    })(this));
    this.mainView.model.musicPlayer.on('music-more-detail', (function(_this) {
      return function(data) {
        _this.lyric.text(data.lyric);
        _this.lyric.updateScrollSize();
      };
    })(this));
  }

  MusicPlayer.prototype.show = function(data) {
    if (this.mainView.model.musicPlayer.seeking) {
      return;
    }
    this.showing = true;
    this.el.moveYTo(0);
    this.playTop.setOpacity(0);
    this.posterTop.setOpacity(0);
    this.hideBtn.setOpacity(1);
    if (data == null) {
      return;
    }
    this.songName.innerHTML(data.songname);
    this.artist.innerHTML(data.artist);
    this.poster.attr('src', data.poster_big);
    return this.posterTop.attr('src', data.poster);
  };

  MusicPlayer.prototype.hide = function() {
    if (this.mainView.model.musicPlayer.seeking) {
      return;
    }
    this.showing = false;
    if (this.mainView.model.musicPlayer.playing) {
      this.el.moveYTo(this.height - 50);
    } else {
      this.el.moveYTo(this.height);
    }
    this.playTop.setOpacity(1);
    this.posterTop.setOpacity(1);
    return this.hideBtn.setOpacity(0);
  };

  MusicPlayer.prototype.forceHide = function() {
    this.showing = false;
    if (this.mainView.model.musicPlayer.playing) {
      this.el.noTrans().moveYTo(this.height - 50).trans(this.transTime);
    } else {
      this.el.noTrans().moveYTo(this.height).trans(this.transTime);
    }
    this.playTop.setOpacity(1);
    this.posterTop.setOpacity(1);
    return this.hideBtn.setOpacity(0);
  };

  return MusicPlayer;

})();

/*
//@ sourceMappingURL=MusicPlayer.map
*/

},{"./MusicPlayer/Lyric":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\MusicPlayer\\Lyric.js","./MusicPlayer/Seekbar":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\MusicPlayer\\Seekbar.js","Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\MusicPlayer\\Lyric.js":[function(require,module,exports){
var Foxie, Lyric, Scrolla;

Foxie = require('Foxie');

Scrolla = require('../Scrolla');

module.exports = Lyric = (function() {
  function Lyric(parentNode, model) {
    var lyricHammer, x;
    this.parentNode = parentNode;
    this.model = model;
    this.el = Foxie('.musicplayer-lyric').innerHTML('Loading Lyric').setOpacity(0).trans(300).putIn(this.parentNode);
    this.scroll = new Scrolla({
      maxStretch: 500
    });
    this.updateScrollSize();
    x = 0;
    lyricHammer = new Hammer(this.parentNode.node);
    lyricHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.model.toggleLyrics();
      };
    })(this));
    lyricHammer.on('pan', (function(_this) {
      return function(arg) {
        _this.scroll.drag(arg.deltaY - x);
        x = arg.deltaY;
        arg.preventDefault();
      };
    })(this));
    lyricHammer.on('panend', (function(_this) {
      return function(arg) {
        _this.scroll.release();
        x = 0;
      };
    })(this));
    this.scroll.on('position-change', (function(_this) {
      return function(event) {
        return _this.el.moveYTo(_this.scroll.position);
      };
    })(this));
    this.model.on('lyrics-hide', (function(_this) {
      return function() {
        return _this.hide();
      };
    })(this));
    this.model.on('lyrics-show', (function(_this) {
      return function() {
        return _this.show();
      };
    })(this));
  }

  Lyric.prototype.text = function(txt) {
    return this.el.innerHTML(txt);
  };

  Lyric.prototype.updateScrollSize = function() {
    this.posterHeight = this.parentNode.node.getBoundingClientRect().height;
    this.lyricHeight = this.el.node.getBoundingClientRect().height;
    return this.scroll.setSizeAndSpace(this.lyricHeight, this.posterHeight);
  };

  Lyric.prototype.hide = function() {
    return this.el.setOpacity(0);
  };

  Lyric.prototype.show = function() {
    return this.el.setOpacity(1);
  };

  return Lyric;

})();

/*
//@ sourceMappingURL=Lyric.map
*/

},{"../Scrolla":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Scrolla.js","Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\MusicPlayer\\Seekbar.js":[function(require,module,exports){
var Foxie, Seekbar;

Foxie = require('Foxie');

module.exports = Seekbar = (function() {
  function Seekbar(parentNode, model) {
    var elHammer, seekerHammer;
    this.parentNode = parentNode;
    this.model = model;
    this.el = Foxie('.musicplayer-seekcontainer').putIn(this.parentNode);
    this.seekbar = Foxie('.musicplayer-seekbar').putIn(this.el);
    this.buffer = Foxie('.musicplayer-buffer').putIn(this.el);
    this.seeker = Foxie('.musicplayer-seeker').putIn(this.el);
    this.updateSize();
    elHammer = new Hammer(this.el.node);
    elHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.model.seekTo(arg.srcEvent.layerX / _this.width);
      };
    })(this));
    elHammer.on('pan', (function(_this) {
      return function(arg) {
        _this.model.seekTo(arg.deltaX / _this.width);
        return _this.model.seeking = true;
      };
    })(this));
    elHammer.on('panend', (function(_this) {
      return function(arg) {
        return setTimeout(function() {
          return _this.model.seeking = false;
        });
      };
    })(this), 100);
    seekerHammer = new Hammer(this.seeker.node);
    seekerHammer.on('pan', (function(_this) {
      return function(arg) {
        _this.model.seekTo(arg.deltaX / _this.width);
        return _this.model.seeking = true;
      };
    })(this));
    seekerHammer.on('panend', (function(_this) {
      return function(arg) {
        return setTimeout(function() {
          return _this.model.seeking = false;
        });
      };
    })(this), 100);
    this.model.on('seeker-update', (function(_this) {
      return function(cent) {
        return _this.seeker.moveXTo(cent * _this.width);
      };
    })(this));
    this.model.on('buffer-update', (function(_this) {
      return function(cent) {
        return _this.buffer.moveXTo(cent * _this.width);
      };
    })(this));
  }

  Seekbar.prototype.updateSize = function() {
    return this.width = this.seekbar.node.getBoundingClientRect().width;
  };

  return Seekbar;

})();

/*
//@ sourceMappingURL=Seekbar.map
*/

},{"Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages.js":[function(require,module,exports){
var Foxie, Item, Pages, Scrolla, SubnameSelector;

Foxie = require('foxie');

Item = {
  song: require('./Item/SongItem'),
  video: require('./Item/VideoItem'),
  album: require('./Item/AlbumItem')
};

Scrolla = require('./Scrolla');

SubnameSelector = require('./Ribbon/SubnameSelector');

module.exports = Pages = (function() {
  function Pages(mainView, parentNode) {
    var hammer, x;
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.insider').putIn(this.parentNode);
    this.items = [];
    this.pullDown = Foxie('.pullDown').putIn(this.el).innerHTML('Loading');
    this.refresh = false;
    this.loadMore = true;
    this.cancelAutoScroll = false;
    this.viewPort = window.innerHeight;
    document.addEventListener('resize', (function(_this) {
      return function() {
        _this.viewPort = window.innerHeight;
        return _this.updateSize();
      };
    })(this));
    this.scroll = new Scrolla({
      maxStretch: 1000
    });
    this.scroll.setLeftEdge(0);
    this.updateSize();
    hammer = new Hammer(this.parentNode.node);
    hammer.get('pan').set({
      direction: Hammer.DIRECTION_ALL
    });
    x = 0;
    hammer.on('pan', (function(_this) {
      return function(arg) {
        if (_this.scroll.position > 100) {
          _this.pullDown.innerHTML('Release to refresh');
          _this.refresh = true;
        } else {
          _this.pullDown.innerHTML('Pull down to refresh');
          _this.refresh = false;
        }
        _this.scroll.drag(arg.deltaY - x);
        x = arg.deltaY;
        return _this.cancelAutoScroll = true;
      };
    })(this));
    hammer.on('panend', (function(_this) {
      return function(arg) {
        _this.scroll.release();
        return x = 0;
      };
    })(this));
    this.scroll.on('position-change', (function(_this) {
      return function(event) {
        _this.el.moveYTo(_this.scroll.position);
        if (_this.scroll.position < _this.scroll.min) {
          if (!_this.loadMore) {
            _this.model.loadmore();
            return _this.loadMore = true;
          }
        }
      };
    })(this));
    this.scroll.on('end', (function(_this) {
      return function() {
        if (_this.refresh) {
          _this.model.refresh();
          _this.pullDown.innerHTML('Refreshing');
        } else if (_this.scroll.position <= _this.scroll.min) {
          if (!_this.loadMore) {
            _this.model.loadmore();
            _this.loadMore = true;
          }
        } else if (_this.scroll.position > -22) {
          _this.hidePullup();
        }
        return _this.cancelAutoScroll = false;
      };
    })(this));
  }

  Pages.prototype.removeAll = function() {
    var item, _i, _len, _ref;
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      item.remove();
    }
    this.items = [];
  };

  Pages.prototype.addMultiple = function(itemDatas) {
    var i, item, itemData, _i, _len;
    for (i = _i = 0, _len = itemDatas.length; _i < _len; i = ++_i) {
      itemData = itemDatas[i];
      item = new Item[itemData.type](this.mainView, this.el, this, itemData, this.items.length).hideMe().showMe(i * 50);
      this.items.push(item);
    }
  };

  Pages.prototype.updateSize = function() {
    this.height = this.el.node.getBoundingClientRect().height;
    return this.scroll.setSizeAndSpace(this.height, this.viewPort);
  };

  Pages.prototype.scrollTo = function(offset) {
    this.el.trans(300).moveYTo(offset);
    return setTimeout((function(_this) {
      return function() {
        _this.el.noTrans();
        return _this.scroll.forceSetPosition(offset);
      };
    })(this), 300);
  };

  Pages.prototype.scrollToItem = function(index) {
    return this.scrollTo(index * -78);
  };

  Pages.prototype.hidePullup = function() {
    return setTimeout((function(_this) {
      return function() {
        if (_this.cancelAutoScroll === true) {
          return;
        }
        return _this.scrollTo(-22);
      };
    })(this), 400);
  };

  Pages.prototype.doneLoad = function(more) {
    if (more == null) {
      more = false;
    }
    this.pullDown.innerHTML('Pull down to refresh');
    if (this.loadMore === false) {
      this.hidePullup();
    }
    this.loadMore = false;
    this.updateSize();
    if (!more) {
      return this.hidePullup();
    }
  };

  Pages.prototype.doneRefresh = function() {
    this.refresh = false;
    return this.updateSize();
  };

  return Pages;

})();

/*
//@ sourceMappingURL=Pages.map
*/

},{"./Item/AlbumItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\AlbumItem.js","./Item/SongItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\SongItem.js","./Item/VideoItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\VideoItem.js","./Ribbon/SubnameSelector":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Ribbon\\SubnameSelector.js","./Scrolla":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Scrolla.js","foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\Album.js":[function(require,module,exports){
var Album, Foxie, Item, Pages,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('foxie');

Item = {
  song: require('../Item/SongItem'),
  video: require('../Item/VideoItem'),
  album: require('../Item/AlbumItem')
};

Pages = require('../Pages');

module.exports = Album = (function(_super) {
  __extends(Album, _super);

  function Album(mainView, parentNode, selector) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.selector = selector;
    Album.__super__.constructor.apply(this, arguments);
    this.model = this.mainView.model.album;
    this.selector.setModel(this.model);
    this.selector.create('top');
    this.selector.create('new');
    this.selector.create('featured');
    this.model.on('refresh', (function(_this) {
      return function() {
        _this.removeAll();
        _this.doneRefresh();
      };
    })(this));
    this.model.on('loadmore', (function(_this) {
      return function(itemsData) {
        _this.scroll.release();
        _this.addMultiple(itemsData);
        _this.doneLoad(true);
      };
    })(this));
    this.model.on('load', (function(_this) {
      return function(itemsData) {
        _this.addMultiple(itemsData);
        _this.doneLoad();
      };
    })(this));
  }

  return Album;

})(Pages);

/*
//@ sourceMappingURL=Album.map
*/

},{"../Item/AlbumItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\AlbumItem.js","../Item/SongItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\SongItem.js","../Item/VideoItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\VideoItem.js","../Pages":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages.js","foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\Artist.js":[function(require,module,exports){
var Artist, Foxie, Item, Pages,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('foxie');

Item = {
  song: require('../Item/SongItem'),
  video: require('../Item/VideoItem'),
  album: require('../Item/AlbumItem')
};

Pages = require('../Pages');

module.exports = Artist = (function(_super) {
  __extends(Artist, _super);

  function Artist(mainView, parentNode, selector) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.selector = selector;
    Artist.__super__.constructor.apply(this, arguments);
    this.model = this.mainView.model.artist;
    this.selector.setModel(this.model);
    this.selector.create('Top');
    this.selector.create('Sorted');
    this.model.on('refresh', (function(_this) {
      return function() {
        _this.removeAll();
        _this.doneRefresh();
      };
    })(this));
    this.model.on('loadmore', (function(_this) {
      return function(itemsData) {
        _this.scroll.release();
        _this.addMultiple(itemsData);
        _this.doneLoad(true);
      };
    })(this));
    this.model.on('load', (function(_this) {
      return function(itemsData) {
        _this.addMultiple(itemsData);
        _this.doneLoad();
      };
    })(this));
  }

  return Artist;

})(Pages);

/*
//@ sourceMappingURL=Artist.map
*/

},{"../Item/AlbumItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\AlbumItem.js","../Item/SongItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\SongItem.js","../Item/VideoItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\VideoItem.js","../Pages":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages.js","foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\HomePage.js":[function(require,module,exports){
var Foxie, Home, Item, Pages,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('foxie');

Item = {
  song: require('../Item/SongItem'),
  video: require('../Item/VideoItem'),
  album: require('../Item/AlbumItem')
};

Pages = require('../Pages');

module.exports = Home = (function(_super) {
  __extends(Home, _super);

  function Home(mainView, parentNode, selector) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.selector = selector;
    Home.__super__.constructor.apply(this, arguments);
    this.model = this.mainView.model.home;
    this.selector.setModel(this.model);
    this.selector.create('top');
    this.selector.create('new');
    this.selector.create('featured');
    this.model.on('refresh', (function(_this) {
      return function() {
        _this.removeAll();
        _this.doneRefresh();
      };
    })(this));
    this.model.on('loadmore', (function(_this) {
      return function(itemsData) {
        _this.scroll.release();
        _this.addMultiple(itemsData);
        _this.doneLoad(true);
      };
    })(this));
    this.model.on('load', (function(_this) {
      return function(itemsData) {
        _this.addMultiple(itemsData);
        _this.doneLoad();
      };
    })(this));
  }

  return Home;

})(Pages);

/*
//@ sourceMappingURL=HomePage.map
*/

},{"../Item/AlbumItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\AlbumItem.js","../Item/SongItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\SongItem.js","../Item/VideoItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\VideoItem.js","../Pages":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages.js","foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\Song.js":[function(require,module,exports){
var Foxie, Item, Pages, Song,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('foxie');

Item = {
  song: require('../Item/SongItem'),
  video: require('../Item/VideoItem'),
  album: require('../Item/AlbumItem')
};

Pages = require('../Pages');

module.exports = Song = (function(_super) {
  __extends(Song, _super);

  function Song(mainView, parentNode, selector) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.selector = selector;
    Song.__super__.constructor.apply(this, arguments);
    this.model = this.mainView.model.song;
    this.selector.setModel(this.model);
    this.selector.create('top');
    this.selector.create('new');
    this.selector.create('featured');
    this.model.on('refresh', (function(_this) {
      return function() {
        _this.removeAll();
        _this.doneRefresh();
      };
    })(this));
    this.model.on('loadmore', (function(_this) {
      return function(itemsData) {
        _this.scroll.release();
        _this.addMultiple(itemsData);
        _this.doneLoad(true);
      };
    })(this));
    this.model.on('load', (function(_this) {
      return function(itemsData) {
        _this.addMultiple(itemsData);
        _this.doneLoad();
      };
    })(this));
  }

  return Song;

})(Pages);

/*
//@ sourceMappingURL=Song.map
*/

},{"../Item/AlbumItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\AlbumItem.js","../Item/SongItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\SongItem.js","../Item/VideoItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\VideoItem.js","../Pages":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages.js","foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\Video.js":[function(require,module,exports){
var Foxie, Item, Pages, Video,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('foxie');

Item = {
  song: require('../Item/SongItem'),
  video: require('../Item/VideoItem'),
  album: require('../Item/AlbumItem')
};

Pages = require('../Pages');

module.exports = Video = (function(_super) {
  __extends(Video, _super);

  function Video(mainView, parentNode, selector) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.selector = selector;
    Video.__super__.constructor.apply(this, arguments);
    this.model = this.mainView.model.video;
    this.selector.setModel(this.model);
    this.selector.create('top');
    this.selector.create('new');
    this.selector.create('featured');
    this.model.on('refresh', (function(_this) {
      return function() {
        _this.removeAll();
        _this.doneRefresh();
      };
    })(this));
    this.model.on('loadmore', (function(_this) {
      return function(itemsData) {
        _this.scroll.release();
        _this.addMultiple(itemsData);
        _this.doneLoad(true);
      };
    })(this));
    this.model.on('load', (function(_this) {
      return function(itemsData) {
        _this.addMultiple(itemsData);
        _this.doneLoad();
      };
    })(this));
  }

  return Video;

})(Pages);

/*
//@ sourceMappingURL=Video.map
*/

},{"../Item/AlbumItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\AlbumItem.js","../Item/SongItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\SongItem.js","../Item/VideoItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\VideoItem.js","../Pages":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages.js","foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Ribbon\\Ribbon.js":[function(require,module,exports){
var Foxie, Ribbon, RibbonPage, Title;

Foxie = require('foxie');

Title = require('./Title');

RibbonPage = require('./RibbonPage');

module.exports = Ribbon = (function() {
  function Ribbon(rootView, t) {
    var i, line, title, _i, _len, _ref;
    this.rootView = rootView;
    this.t = t;
    this.width = window.innerWidth;
    this.ribbonBarSpace = 20;
    this.el = Foxie('.ribbon').putIn(this.rootView.el);
    line = Foxie('.ribbon-line').putIn(this.el);
    this.underLine = Foxie('.ribbon-underline').putIn(this.el);
    this.titles = [];
    this.pages = [];
    _ref = this.t;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      title = _ref[i];
      this.addTitle(title);
      this.pages.push(new RibbonPage(this.rootView, i * this.width, i));
    }
    this.rootView.model.page.on('page-active', (function(_this) {
      return function(num) {
        return _this.showPage(num);
      };
    })(this));
    window.addEventListener('resize', (function(_this) {
      return function() {
        var page, _j, _k, _len1, _len2, _ref1, _ref2;
        _this.width = window.innerWidth;
        _ref1 = _this.titles;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          title = _ref1[_j];
          title.width = _this.width;
        }
        _this.showPage(_this.rootView.model.page.currentActive);
        _ref2 = _this.pages;
        for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
          page = _ref2[i];
          page.moveTo(i * _this.width);
        }
        return _this.rootView.model.page.activeTitle();
      };
    })(this));
    this.rootView.model.page.activeTitle();
  }

  Ribbon.prototype.showPage = function(index) {
    var i, title, _i, _len, _ref;
    this.rootView.inside.trans(700).moveXTo(index * (-1 * this.width));
    _ref = this.titles;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      title = _ref[i];
      if (i < index) {
        title.hideToLeft();
      } else if (i === index + 1) {
        title.nextIam();
      } else if (i > index + 1) {
        title.hideToRight();
      } else {
        title.show();
      }
    }
    return this.rootView.bg.moveXTo(index * -100 - 200);
  };

  Ribbon.prototype.getPage = function(index) {
    return this.pages[index].el;
  };

  Ribbon.prototype.getSubnameSelector = function(index) {
    return this.titles[index].getSubnameSelector();
  };

  Ribbon.prototype.addTitle = function(title) {
    var tit;
    tit = new Title(this.rootView, this.el, title, this.width);
    return this.titles.push(tit);
  };

  return Ribbon;

})();

/*
//@ sourceMappingURL=Ribbon.map
*/

},{"./RibbonPage":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Ribbon\\RibbonPage.js","./Title":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Ribbon\\Title.js","foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Ribbon\\RibbonPage.js":[function(require,module,exports){
var Foxie, RibbonPage;

Foxie = require('foxie');

module.exports = RibbonPage = (function() {
  function RibbonPage(rootView, pos, index) {
    var hammer;
    this.rootView = rootView;
    this.el = Foxie('.ribbon-page').putIn(this.rootView.inside).moveXTo(pos);
    hammer = new Hammer(this.el.node);
    hammer.on('pan', (function(_this) {
      return function(event) {
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
          _this.rootView.inside.moveXTo(event.deltaX - index * _this.rootView.ribbon.width);
          return _this.rootView.bg.moveXTo(event.deltaX / 10 - index * 100 - 200);
        }
      };
    })(this));
    hammer.on('panend', (function(_this) {
      return function(event) {
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && Math.abs(event.deltaY) < 50) {
          if (event.deltaX > 0) {
            return _this.rootView.model.page.prevActiveTitle();
          } else {
            return _this.rootView.model.page.nextActiveTitle();
          }
        } else {
          return _this.rootView.model.page.activeTitle(index);
        }
      };
    })(this));
  }

  RibbonPage.prototype.moveTo = function(x) {
    return this.el.moveXTo(x);
  };

  return RibbonPage;

})();

/*
//@ sourceMappingURL=RibbonPage.map
*/

},{"foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Ribbon\\SubnameSelector.js":[function(require,module,exports){
var Foxie, SubnameSelector;

Foxie = require('foxie');

module.exports = SubnameSelector = (function() {
  function SubnameSelector(mainView, parentNode) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.ribbon-title-subnameSelector').trans(300).putIn(this.parentNode);
    this.subnames = [];
    this.hide();
  }

  SubnameSelector.prototype.activate = function(id) {
    var index, subname, _i, _len, _ref, _results;
    _ref = this.subnames;
    _results = [];
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      subname = _ref[index];
      if (id === index) {
        _results.push(subname.setOpacity(1));
      } else {
        _results.push(subname.setOpacity(.5));
      }
    }
    return _results;
  };

  SubnameSelector.prototype.setModel = function(model) {
    this.model = model;
    return this.model.on('option', (function(_this) {
      return function(id) {
        return _this.activate(id);
      };
    })(this));
  };

  SubnameSelector.prototype.create = function(text) {
    var id, subHammer, subname;
    subname = Foxie('.ribbon-title-subnameSelected').innerHTML(text).trans(300).putIn(this.el);
    id = this.subnames.length;
    this.subnames.push(subname);
    subHammer = new Hammer(subname.node);
    return subHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.model.setOption(id);
      };
    })(this));
  };

  SubnameSelector.prototype.hide = function() {
    return this.el.scaleXTo(0);
  };

  SubnameSelector.prototype.show = function() {
    return this.el.scaleXTo(1);
  };

  return SubnameSelector;

})();

/*
//@ sourceMappingURL=SubnameSelector.map
*/

},{"foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Ribbon\\Title.js":[function(require,module,exports){
var Foxie, SubnameSelector, Title;

Foxie = require('foxie');

SubnameSelector = require('./SubnameSelector');

module.exports = Title = (function() {
  function Title(mainView, parentNode, text, width) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.width = width;
    this.el = Foxie('.ribbon-title-names').moveXTo(this.width).trans(300);
    this.name = Foxie('.ribbon-title-name').innerHTML(text).putIn(this.el);
    this.selector = new SubnameSelector(this.mainView, this.el);
    this.el.putIn(this.parentNode);
  }

  Title.prototype.getSubnameSelector = function() {
    return this.selector;
  };

  Title.prototype.getWidth = function() {
    if (this.myWidth != null) {
      return this.myWidth;
    }
    return this.myWidth = this.el.node.getBoundingClientRect().width;
  };

  Title.prototype.moveTo = function(x) {
    return this.el.moveXTo(x);
  };

  Title.prototype.update = function(width) {
    this.width = width;
    return this.el.noTrans().moveXTo(this.width).trans(300);
  };

  Title.prototype.show = function() {
    this.el.moveXTo(0);
    return this.selector.show();
  };

  Title.prototype.nextIam = function() {
    this.el.moveXTo(this.width - this.getWidth() - 50);
    return this.selector.hide();
  };

  Title.prototype.hideToLeft = function() {
    this.el.moveXTo(-200);
    return this.selector.hide();
  };

  Title.prototype.hideToRight = function() {
    this.el.moveXTo(this.width);
    return this.selector.hide();
  };

  return Title;

})();

/*
//@ sourceMappingURL=Title.map
*/

},{"./SubnameSelector":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Ribbon\\SubnameSelector.js","foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\RightSwipe.js":[function(require,module,exports){
var Foxie, MenuItem, RightSwipe, Scrolla;

Foxie = require('Foxie');

MenuItem = require('./RightSwipe/MenuItem');

Scrolla = require('./Scrolla');

module.exports = RightSwipe = (function() {
  function RightSwipe(mainView) {
    var btnHammer, elHammer, y;
    this.mainView = mainView;
    this.model = this.mainView.model.page;
    this.items = [];
    this.btn = Foxie('.rightSwipeBtn').putIn(this.mainView.el);
    this.el = Foxie('.rightSwipe').moveXTo(-200).trans(300).putIn(this.mainView.el);
    btnHammer = new Hammer(this.btn.node);
    btnHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.model.toggleRightSwipe();
      };
    })(this));
    elHammer = new Hammer(this.el.node);
    elHammer.on('panleft', (function(_this) {
      return function(arg) {
        return _this.model.hideRightSwipe();
      };
    })(this));
    this.mainView.model.page.on('right-swipe', (function(_this) {
      return function(flag) {
        if (flag) {
          return _this.show();
        } else {
          return _this.hide();
        }
      };
    })(this));
    this.newItem('Home', (function(_this) {
      return function() {
        return _this.model.activeTitle(0);
      };
    })(this));
    this.newItem('Artist', (function(_this) {
      return function() {
        return _this.model.activeTitle(1);
      };
    })(this));
    this.newItem('Album', (function(_this) {
      return function() {
        return _this.model.activeTitle(2);
      };
    })(this));
    this.newItem('Song', (function(_this) {
      return function() {
        return _this.model.activeTitle(3);
      };
    })(this));
    this.newItem('Video', (function(_this) {
      return function() {
        return _this.model.activeTitle(4);
      };
    })(this));
    this.newItem('</br>');
    this.newItem('Settings', (function(_this) {
      return function() {
        return _this.model.showSettings();
      };
    })(this));
    this.scroll = new Scrolla({
      maxStretch: 500
    });
    this.updateScrollSize();
    y = 0;
    elHammer.on('panup pandown', (function(_this) {
      return function(arg) {
        _this.scroll.drag(arg.deltaY - y);
        y = arg.deltaY;
      };
    })(this));
    elHammer.on('panend', (function(_this) {
      return function(arg) {
        _this.scroll.release();
        y = 0;
      };
    })(this));
    this.scroll.on('position-change', (function(_this) {
      return function(event) {
        var item, _i, _len, _ref, _results;
        if (_this.viewportHeight > _this.insideHeight) {
          return;
        }
        _ref = _this.items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(item.el.moveYTo(_this.scroll.position));
        }
        return _results;
      };
    })(this));
    window.addEventListener('resize', (function(_this) {
      return function() {
        return _this.updateScrollSize();
      };
    })(this));
  }

  RightSwipe.prototype.show = function() {
    return this.el.moveXTo(0);
  };

  RightSwipe.prototype.hide = function() {
    return this.el.moveXTo(-200);
  };

  RightSwipe.prototype.newItem = function(data, cb) {
    return this.items.push(new MenuItem(this.model, this.el, data, cb));
  };

  RightSwipe.prototype.updateScrollSize = function() {
    this.viewportHeight = window.innerHeight;
    this.insideHeight = 300;
    return this.scroll.setSizeAndSpace(this.insideHeight, this.viewportHeight);
  };

  return RightSwipe;

})();

/*
//@ sourceMappingURL=RightSwipe.map
*/

},{"./RightSwipe/MenuItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\RightSwipe\\MenuItem.js","./Scrolla":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Scrolla.js","Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\RightSwipe\\MenuItem.js":[function(require,module,exports){
var Foxie, MenuItem;

Foxie = require('Foxie');

module.exports = MenuItem = (function() {
  function MenuItem(model, parentNode, data, cb) {
    var elHammer;
    this.model = model;
    this.parentNode = parentNode;
    this.el = Foxie('.menu-item').innerHTML(data).putIn(this.parentNode);
    if (cb != null) {
      elHammer = new Hammer(this.el.node);
      elHammer.on('tap', (function(_this) {
        return function(arg) {
          cb(arg);
          return _this.model.hideRightSwipe();
        };
      })(this));
    }
  }

  return MenuItem;

})();

/*
//@ sourceMappingURL=MenuItem.map
*/

},{"Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Scrolla.js":[function(require,module,exports){
var Easing, Emitter, Scrolla, UnitBezier, bezier, cache, cancelAnimationFrame, initBezier, raf, requestAnimationFrame, unit,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Emitter = require('../Model/_Emitter');

Easing = require('timing-function');

raf = require('raf-timing/scripts/js/lib/raf');

module.exports = Scrolla = (function(_super) {
  __extends(Scrolla, _super);

  function Scrolla(options) {
    if (options == null) {
      options = {};
    }
    this.animate = __bind(this.animate, this);
    Scrolla.__super__.constructor.apply(this, arguments);
    this.space = 0;
    this.size = 0;
    this.max = 0;
    this._recalculateMin();
    this.position = 0;
    this._puller = this.position;
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
    this._shouldSlide = false;
    initBezier();
    return null;
  }

  Scrolla.prototype.setPosition = function(p) {
    this.position = +p;
    this._emit('position-change');
    return this;
  };

  Scrolla.prototype.forceSetPosition = function(p) {
    this.position = +p;
    this._puller = this.position;
    this._emit('position-change');
    return this;
  };

  Scrolla.prototype.setLeftEdge = function(left) {
    this.max = left;
    return this;
  };

  Scrolla.prototype.setRightEdge = function(right) {
    if (right == null) {
      this._recalculateMin();
    } else {
      this.min = -right;
    }
    return this;
  };

  Scrolla.prototype.setSizeAndSpace = function(size, space, recalculate) {
    if (size == null) {
      size = this.size;
    }
    if (space == null) {
      space = this.space;
    }
    if (recalculate == null) {
      recalculate = true;
    }
    this.size = +size;
    this.space = +space;
    if (recalculate) {
      this._recalculateMin();
    }
    return this;
  };

  Scrolla.prototype._recalculateMin = function() {
    this.min = 0;
    if (this.size > this.space) {
      return this.min = -(this.size - this.space);
    }
  };

  Scrolla.prototype.drag = function(delta) {
    this._shouldSlide = false;
    if (!this._pullerInSync) {
      this._syncPuller();
    }
    this._bounce.ing = false;
    this._recordForVelocity(delta);
    this._puller = this._puller + delta;
    return this.setPosition(this._pullerToSticky(this._puller));
  };

  Scrolla.prototype._syncPuller = function() {
    this._puller = this._stickyToPuller(this.position);
    return this._pullerInSync = true;
  };

  Scrolla.prototype._recordForVelocity = function(delta) {
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

  Scrolla.prototype._pullerToSticky = function(puller) {
    if (puller > this.max) {
      return this.max + this._stretch(puller - this.max);
    } else if (puller < this.min) {
      return this.min - this._stretch(-(puller - this.min));
    } else {
      return puller;
    }
  };

  Scrolla.prototype._stretch = function(puller) {
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

  Scrolla.prototype._unstretch = function(stretched) {
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

  Scrolla.prototype._cacheStretches = function() {
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

  Scrolla.prototype._stickyToPuller = function(sticky) {
    if (sticky > this.max) {
      return this.max + this._unstretch(sticky - this.max);
    } else if (sticky < this.min) {
      return this.min - this._unstretch(-(sticky - this.min));
    } else {
      return sticky;
    }
  };

  Scrolla.prototype.release = function() {
    this._shouldSlide = true;
    this._setLastVelocity(this._getRecordedVelocity());
    this._pullerInSync = false;
    if ((this._puller < this.min && this._lastV > 0) || (this._puller > this.max && this._lastV < 0)) {
      this._bounce.skip = true;
    }
    return this.animate();
  };

  Scrolla.prototype._setLastVelocity = function(v) {
    this._lastV = v;
    return this._lastT = Date.now();
  };

  Scrolla.prototype._getRecordedVelocity = function() {
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

  Scrolla.prototype._clearVelocityRecords = function() {
    return this._velocityRecords.length = 0;
  };

  Scrolla.prototype.stop = function() {
    this._bounce.ing = false;
    this._shouldSlide = false;
    return this._syncPuller();
  };

  Scrolla.prototype.animate = function() {
    var deltaT, i, smallerDeltaT, v, v0, x, x0, _i, _ref, _ref1;
    if (!this._shouldSlide) {
      return;
    }
    x0 = this.position;
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
    this.setPosition(x);
    this._shouldSlide = false;
    if (!((this.min <= x && x <= this.max) && v * v0 < 0.0001)) {
      this._shouldSlide = true;
      requestAnimationFrame(this.animate);
    } else {
      this._emit('end');
    }
    return null;
  };

  Scrolla.prototype._animStep = function(x0, v0, deltaT) {
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

  Scrolla.prototype._deltasForOutside = function(x0, v0, deltaT) {
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

  Scrolla.prototype._deltasForInside = function(v0, deltaT) {
    var deltaV, direction, friction, ret;
    this._bounce.skip = false;
    direction = parseFloat(unit(v0));
    friction = -direction * 0.031 * Math.min(Math.abs(v0), 0.1);
    deltaV = friction * deltaT;
    return ret = {
      deltaX: 0.5 * deltaV * deltaT + v0 * deltaT,
      deltaV: deltaV
    };
  };

  Scrolla.prototype._outsideCurve = function(t) {
    return bezier.solve(t, UnitBezier.epsilon);
  };

  return Scrolla;

})(Emitter);

UnitBezier = Easing.UnitBezier;

requestAnimationFrame = raf.requestAnimationFrame, cancelAnimationFrame = raf.cancelAnimationFrame;

unit = function(n) {
  if (n < 0) {
    return -1;
  }
  return 1;
};

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
  if (bezier == null) {
    return bezier = new UnitBezier(0.11, 0.02, 0.1, 0.98);
  }
};

/*
//@ sourceMappingURL=Scrolla.map
*/

},{"../Model/_Emitter":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\_Emitter.js","raf-timing/scripts/js/lib/raf":"D:\\xampp\\htdocs\\jik\\node_modules\\raf-timing\\scripts\\js\\lib\\raf.js","timing-function":"D:\\xampp\\htdocs\\jik\\node_modules\\timing-function\\scripts\\js\\lib\\timingFunction.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Settings.js":[function(require,module,exports){
var Foxie, Settings;

Foxie = require('Foxie');

module.exports = Settings = (function() {
  function Settings(mainView) {
    var elHammer;
    this.mainView = mainView;
    this.el = Foxie('.settings').scaleXTo(0).trans(400).putIn(this.mainView.el);
    elHammer = new Hammer(this.el.node);
    elHammer.on('panleft panright', (function(_this) {
      return function(arg) {
        return _this.mainView.model.page.hideSettings();
      };
    })(this));
    this.mainView.model.page.on('settings', (function(_this) {
      return function(flag) {
        if (flag) {
          return _this.show();
        } else {
          return _this.hide();
        }
      };
    })(this));
    this.createCheckbox();
  }

  Settings.prototype.show = function() {
    return this.el.scaleXTo(1);
  };

  Settings.prototype.hide = function() {
    return this.el.scaleXTo(0);
  };

  Settings.prototype.createCheckbox = function() {
    var changeStatus, chk, chkHammer;
    changeStatus = (function(_this) {
      return function(chk) {
        if (_this.mainView.model.settings.quality === true) {
          return chk.setOpacity(.5);
        } else {
          return chk.setOpacity(1);
        }
      };
    })(this);
    chk = Foxie('.settings-checkbox').innerHTML('Use Low Quality');
    changeStatus(chk);
    chk.trans(400).putIn(this.el);
    chkHammer = new Hammer(chk.node);
    chkHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.mainView.model.settings.switchQuality();
      };
    })(this));
    return this.mainView.model.settings.on('quality', (function(_this) {
      return function(flag) {
        return changeStatus(chk);
      };
    })(this));
  };

  return Settings;

})();

/*
//@ sourceMappingURL=Settings.map
*/

},{"Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\SimpleSong.js":[function(require,module,exports){
var Foxie, SimpleSong;

Foxie = require('Foxie');

module.exports = SimpleSong = (function() {
  function SimpleSong(mainView, parentNode, data) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.simple-songname').innerHTML(data).moveYTo(100).putIn(this.parentNode);
    this.hammer = new Hammer(this.el.node);
    this.hammer.on('tap', (function(_this) {
      return function() {
        return console.log('hello');
      };
    })(this));
    this.icon = Foxie('.simple-icon').putIn(this.el);
    this.el.putIn(this.parentNode);
  }

  return SimpleSong;

})();

/*
//@ sourceMappingURL=SimpleSong.map
*/

},{"Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\VideoPlayer.js":[function(require,module,exports){
var Foxie, videoPlayer;

Foxie = require('Foxie');

module.exports = videoPlayer = (function() {
  function videoPlayer(mainView) {
    var elHammer, hideHammer;
    this.mainView = mainView;
    this.transTime = 700;
    this.showing = false;
    this.height = window.innerHeight;
    this.el = Foxie('.musicplayer').moveYTo(this.height).trans(this.transTime).perspective(4000).putIn(this.mainView.el);
    elHammer = new Hammer(this.el.node);
    elHammer.on('panup', (function(_this) {
      return function(arg) {
        if (!_this.showing) {
          return _this.show();
        }
      };
    })(this));
    elHammer.on('pandown', (function(_this) {
      return function(arg) {
        return _this.hide();
      };
    })(this));
    elHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.mainView.model.videoPlayer.toggle();
      };
    })(this));
    this.hideBtn = Foxie('.musicplayer-button.musicplayer-hide').trans(500).putIn(this.el);
    hideHammer = new Hammer(this.hideBtn.node);
    hideHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.hide();
      };
    })(this));
    this.songName = Foxie('.musicplayer-songname').putIn(this.el);
    this.artist = Foxie('.musicplayer-artist').putIn(this.el);
    this.videoTag = document.createElement('video');
    this.el.node.appendChild(this.videoTag);
    this.mainView.model.videoPlayer.on('show-player', (function(_this) {
      return function() {
        return _this.show();
      };
    })(this));
    this.mainView.model.videoPlayer.on('play-video', (function(_this) {
      return function(data) {
        _this.show(data);
        return _this.videoTag.play();
      };
    })(this));
    this.mainView.model.videoPlayer.on('video-unpause', (function(_this) {
      return function() {
        return _this.videoTag.play();
      };
    })(this));
    this.mainView.model.videoPlayer.on('video-pause', (function(_this) {
      return function(data) {
        return _this.videoTag.pause();
      };
    })(this));
    window.addEventListener('resize', (function(_this) {
      return function(event) {
        _this.height = window.innerHeight;
        if (!_this.showing) {
          _this.forceHide();
        }
        if (_this.showing) {
          return _this.portscape();
        }
      };
    })(this));
  }

  videoPlayer.prototype.show = function(data) {
    if (this.mainView.model.videoPlayer.seeking) {
      return;
    }
    this.portscape();
    this.showing = true;
    this.el.moveYTo(0);
    if (data == null) {
      return;
    }
    if (this.mainView.model.settings.quality) {
      this.videoTag.src = data.highq;
    } else {
      this.videoTag.src = data.lowq;
    }
    this.songName.innerHTML(data.videoname);
    return this.artist.innerHTML(data.artist);
  };

  videoPlayer.prototype.hide = function() {
    if (this.mainView.model.videoPlayer.seeking) {
      return;
    }
    this.showing = false;
    this.el.moveYTo(this.height);
    return this.mainView.model.videoPlayer.pause();
  };

  videoPlayer.prototype.forceHide = function() {
    this.showing = false;
    this.el.noTrans().moveYTo(this.height).trans(this.transTime);
    return this.mainView.model.videoPlayer.pause();
  };

  videoPlayer.prototype.portscape = function() {
    if (window.innerHeight > window.innerWidth) {
      this.hideBtn.setOpacity(1);
      this.songName.setOpacity(1);
      return this.artist.setOpacity(1);
    } else {
      this.hideBtn.setOpacity(0);
      this.songName.setOpacity(0);
      return this.artist.setOpacity(0);
    }
  };

  return videoPlayer;

})();

/*
//@ sourceMappingURL=VideoPlayer.map
*/

},{"Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\pg\\1.js":[function(require,module,exports){
var MainView, Model, mainView, model;

Model = require('../Model/Model');

MainView = require('../View/Main');

model = new Model;

mainView = new MainView(model);

/*
//@ sourceMappingURL=1.map
*/

},{"../Model/Model":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\Model.js","../View/Main":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Main.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\pg\\pg.js":[function(require,module,exports){
module.exports = require("./1");

/*
//@ sourceMappingURL=pg.map
*/

},{"./1":"D:\\xampp\\htdocs\\jik\\scripts\\js\\pg\\1.js"}]},{},["D:\\xampp\\htdocs\\jik\\scripts\\js\\pg\\pg.js"])("D:\\xampp\\htdocs\\jik\\scripts\\js\\pg\\pg.js")
});