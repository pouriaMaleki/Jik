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

  return AlbumDetail;

})(_Emitter);

/*
//@ sourceMappingURL=AlbumDetail.map
*/

},{"./_Emitter":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\_Emitter.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\Model.js":[function(require,module,exports){
var AlbumDetail, AlbumModel, ArtistModel, HomeModel, Model, MusicPlayerModel, Playlists, Settings, SongModel, TitleModel, VideoModel, VideoPlayer, _Emitter,
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

Playlists = require('./Playlists');

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
    this.playlists = new Playlists(this);
  }

  return Model;

})(_Emitter);

/*
//@ sourceMappingURL=Model.map
*/

},{"./AlbumDetail":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\AlbumDetail.js","./MusicPlayerModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\MusicPlayerModel.js","./PagesModel/AlbumModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\AlbumModel.js","./PagesModel/ArtistModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\ArtistModel.js","./PagesModel/HomeModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\HomeModel.js","./PagesModel/SongModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\SongModel.js","./PagesModel/VideoModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel\\VideoModel.js","./Playlists":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\Playlists.js","./Settings":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\Settings.js","./TitleModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\TitleModel.js","./VideoPlayer":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\VideoPlayer.js","./_Emitter":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\_Emitter.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\MusicPlayerModel.js":[function(require,module,exports){
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
    this.playingData = {};
    this.seeking = false;
    this.audioTag = document.createElement('audio');
    document.body.appendChild(this.audioTag);
    this.audioTag.addEventListener('timeupdate', (function(_this) {
      return function(event) {
        var nextSong;
        _this._emit('seeker-update', _this.audioTag.currentTime / _this.audioTag.duration);
        if (_this.audioTag.currentTime === _this.audioTag.duration) {
          nextSong = _this.rootModel.playlists.nowPlaying.getNextSong(_this.playingData);
          if (nextSong !== false) {
            return _this.play(nextSong, false);
          } else {
            return _this.pause();
          }
        }
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

  MusicPlayerModel.prototype.fav = function() {
    var song;
    song = this.rootModel.playlists.fav.find(this.playingData.id);
    if (song !== false) {
      this.rootModel.playlists.fav.removeSong(this.playingData);
      return this._emit('song-unfav', true);
    } else {
      this.rootModel.playlists.fav.addSong(this.playingData);
      return this._emit('song-fav', true);
    }
  };

  MusicPlayerModel.prototype._checkFavorited = function(data) {
    var song;
    song = this.rootModel.playlists.fav.find(data.id);
    if (song !== false) {
      return this._emit('song-fav', true);
    } else {
      return this._emit('song-unfav', true);
    }
  };

  MusicPlayerModel.prototype.addToNowPlaying = function(data) {
    var song;
    song = this.rootModel.playlists.nowPlaying.find(data.id);
    if (song === false) {
      this.rootModel.playlists.nowPlaying.addSong(data);
    }
  };

  MusicPlayerModel.prototype.play = function(data, gotoEnd) {
    var song;
    if (gotoEnd == null) {
      gotoEnd = true;
    }
    this._emit('play-music', data);
    this.rootModel.videoPlayer.pause();
    if (data.id === this.playingData.id) {
      return;
    }
    if (this.playing) {
      this.audioTag.pause();
    }
    if (this.rootModel.settings.quality) {
      this.audioTag.src = data.mp3;
    } else {
      this.audioTag.src = data.mp3_low;
    }
    song = this.rootModel.playlists.fav.find(data.id);
    this._checkFavorited(data);
    this.rootModel.playlists.fav.on('add-song', (function(_this) {
      return function(songAdded) {
        if (songAdded.id === data.id) {
          return _this._checkFavorited(data);
        }
      };
    })(this));
    if (gotoEnd === true) {
      this.rootModel.playlists.nowPlaying.addSongToEnd(data);
    }
    this.audioTag.play();
    this._emit('music-unpause');
    this.playing = true;
    this.playingData = data;
    return this.getMoreDetail(data.id);
  };

  MusicPlayerModel.prototype.pause = function() {
    if (this.playing) {
      this.audioTag.pause();
      this._emit('music-pause');
    }
    return this.playing = false;
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
    this.loading = false;
  }

  AlbumModel.prototype.get = function() {
    if (this.loading === true) {
      return;
    }
    this.loading = true;
    if (this.option === 0) {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"10013","type":"album","artist":"\u0645\u0633\u0639\u0648\u062f \u0627\u0645\u0627\u0645\u06cc","artist_id":"1905","album":"\u0647\u0645\u06cc\u0634\u06af\u06cc","trackcount":"11","popularity":"4.5","date":"1393-06-19","url":"http:\/\/www.wikiseda.com\/Masoud+Emami\/Hamishegi","view":"6774","poster":"http:\/\/85.25.243.154\/img\/t8hfhardol-1410334057.jpg","albumtracks":[{"id":"144023","type":"song","songname":"\u0645\u0627\u062f\u0631","popularity":"5","ratecount":"1","view":"451","time":"4:59","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Hamishegi\/Madar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/Hamishegi\/Madar [WikiSeda].mp3"},{"id":"144022","type":"song","songname":"\u062a\u0627 \u0646\u0631\u0641\u062a\u0645","popularity":"5","ratecount":"1","view":"518","time":"2:52","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Hamishegi\/Ta Naraftam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/Hamishegi\/Ta Naraftam [WikiSeda].mp3"},{"id":"144021","type":"song","songname":"\u067e\u0627\u06cc\u06cc\u0632","popularity":"5","ratecount":"3","view":"498","time":"3:30","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Hamishegi\/Paeizi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/Hamishegi\/Paeizi [WikiSeda].mp3"},{"id":"144020","type":"song","songname":"\u0647\u0645\u06cc\u0646 \u062c\u0646\u062f \u0633\u0627\u0639\u062a","popularity":"5","ratecount":"1","view":"496","time":"3:14","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Hamishegi\/Hamin Chand Saat [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/Hamishegi\/Hamin Chand Saat [WikiSeda].mp3"},{"id":"144019","type":"song","songname":"\u062a\u0648 \u0631\u0648\u0628\u0631\u0648\u0645\u06cc","popularity":"5","ratecount":"4","view":"530","time":"3:21","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Hamishegi\/To Rooberoomi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/Hamishegi\/To Rooberoomi [WikiSeda].mp3"},{"id":"144018","type":"song","songname":"\u06af\u0631\u0641\u062a\u0627\u0631","popularity":"5","ratecount":"1","view":"560","time":"3:26","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Hamishegi\/Gereftar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/Hamishegi\/Gereftar [WikiSeda].mp3"},{"id":"144017","type":"song","songname":"\u062f\u0644\u0648\u0627\u067e\u0633\u06cc","popularity":"5","ratecount":"4","view":"530","time":"3:13","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Hamishegi\/Delvapasi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/Hamishegi\/Delvapasi [WikiSeda].mp3"},{"id":"144016","type":"song","songname":"\u0639\u0632\u06cc\u0632\u0645","popularity":"5","ratecount":"2","view":"652","time":"3:43","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Hamishegi\/Azizam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/Hamishegi\/Azizam [WikiSeda].mp3"},{"id":"144015","type":"song","songname":"\u0628\u06cc \u0647\u0645\u0627\u0647\u0646\u06af\u06cc","popularity":"5","ratecount":"4","view":"606","time":"2:52","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Hamishegi\/Bi Hamahangi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/Hamishegi\/Bi Hamahangi [WikiSeda].mp3"},{"id":"144014","type":"song","songname":"\u0644\u0627\u0644","popularity":"5","ratecount":"2","view":"700","time":"3:36","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Hamishegi\/Laal [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/Hamishegi\/Laal [WikiSeda].mp3"},{"id":"144013","type":"song","songname":"\u0686\u0634\u0645\u0627\u0634","popularity":"5","ratecount":"3","view":"1233","time":"3:25","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Hamishegi\/Cheshmash [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/Hamishegi\/Cheshmash [WikiSeda].mp3"}],"year":"1393"},{"id":"10012","type":"album","artist":"\u0645\u0647\u062f\u06cc \u0627\u062d\u0645\u062f\u0648\u0646\u062f","artist_id":"833","album":"\u0627\u0632 \u0627\u06cc\u0646 \u0633\u0627\u0639\u062a","trackcount":"12","popularity":"4.6","date":"1393-06-20","url":"http:\/\/www.wikiseda.com\/Mehdi+Ahmadvand\/Az+In+Saat","view":"84403","poster":"http:\/\/85.25.243.154\/img\/7ktcds8y0a-1410329928.jpg","albumtracks":[{"id":"144012","type":"song","songname":"\u0639\u0634\u0642 \u0627\u0648\u0644","popularity":"4.2","ratecount":"12","view":"4242","time":"4:4","mp3":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/Az In Saat\/Eshghe Aval [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mehdi Ahmadvand\/Az In Saat\/Eshghe Aval [WikiSeda].mp3"},{"id":"144011","type":"song","songname":"\u06cc\u0627\u062f\u06af\u0627\u0631","popularity":"4.5","ratecount":"39","view":"14661","time":"3:48","mp3":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/Az In Saat\/Yadegar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mehdi Ahmadvand\/Az In Saat\/Yadegar [WikiSeda].mp3"},{"id":"144010","type":"song","songname":"\u0646\u0642\u0627\u0634\u06cc","popularity":"4.6","ratecount":"16","view":"5142","time":"3:31","mp3":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/Az In Saat\/Naghashi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mehdi Ahmadvand\/Az In Saat\/Naghashi [WikiSeda].mp3"},{"id":"144009","type":"song","songname":"\u0628\u0631\u06af\u0631\u062f","popularity":"4.4","ratecount":"18","view":"5533","time":"3:12","mp3":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/Az In Saat\/Bargard [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mehdi Ahmadvand\/Az In Saat\/Bargard [WikiSeda].mp3"},{"id":"144008","type":"song","songname":"\u062d\u0627\u0644 \u0645\u0646","popularity":"4.9","ratecount":"32","view":"8642","time":"3:10","mp3":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/Az In Saat\/Hale Man [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mehdi Ahmadvand\/Az In Saat\/Hale Man [WikiSeda].mp3"},{"id":"144007","type":"song","songname":"\u0639\u0627\u0634\u0642\u062a\u0645","popularity":"4.6","ratecount":"16","view":"6211","time":"3:39","mp3":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/Az In Saat\/Asheghetam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mehdi Ahmadvand\/Az In Saat\/Asheghetam [WikiSeda].mp3"},{"id":"144006","type":"song","songname":"\u0628\u0627\u0632\u0646\u062f\u0647","popularity":"4.7","ratecount":"20","view":"5835","time":"4:35","mp3":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/Az In Saat\/Bazandeh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mehdi Ahmadvand\/Az In Saat\/Bazandeh [WikiSeda].mp3"},{"id":"144005","type":"song","songname":"\u0627\u0632 \u0627\u06cc\u0646 \u0633\u0627\u0639\u062a","popularity":"4.9","ratecount":"21","view":"7302","time":"3:25","mp3":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/Az In Saat\/Az In Saat [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mehdi Ahmadvand\/Az In Saat\/Az In Saat [WikiSeda].mp3"},{"id":"144004","type":"song","songname":"\u0641\u0627\u0644\u0634","popularity":"4.8","ratecount":"19","view":"5727","time":"3:13","mp3":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/Az In Saat\/Falsh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mehdi Ahmadvand\/Az In Saat\/Falsh [WikiSeda].mp3"},{"id":"144003","type":"song","songname":"\u067e\u0631\u0648\u0627\u0632","popularity":"4.8","ratecount":"23","view":"6255","time":"3:11","mp3":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/Az In Saat\/Parvaz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mehdi Ahmadvand\/Az In Saat\/Parvaz [WikiSeda].mp3"},{"id":"144002","type":"song","songname":"\u0633\u0631\u06af\u06cc\u062c\u0647","popularity":"4.9","ratecount":"29","view":"8439","time":"4:8","mp3":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/Az In Saat\/Sar Gijeh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mehdi Ahmadvand\/Az In Saat\/Sar Gijeh [WikiSeda].mp3"},{"id":"144001","type":"song","songname":"\u0628\u0627\u0631\u0648\u0646","popularity":"4.9","ratecount":"18","view":"6414","time":"4:34","mp3":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/Az In Saat\/Baroon [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mehdi Ahmadvand\/Az In Saat\/Baroon [WikiSeda].mp3"}],"year":"1393"},{"id":"10010","type":"album","artist":"\u0633\u0627\u0644\u0627\u0631 \u0639\u0642\u06cc\u0644\u06cc","artist_id":"97","album":"\u0641\u0635\u0644 \u0639\u0627\u0634\u0642\u06cc","trackcount":"7","popularity":"4.3","date":"1393-06-18","url":"http:\/\/www.wikiseda.com\/Salar+Aghili\/Fasle+Asheghi","view":"9803","poster":"http:\/\/85.25.243.154\/img\/o73ms4lbbb-1410245949.jpg","albumtracks":[{"id":"143980","type":"song","songname":"\u0622\u0648\u0627\u0632","popularity":"5","ratecount":"7","view":"986","time":"11:9","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Fasle Asheghi\/Avaz [WikiSeda].mp3"},{"id":"143979","type":"song","songname":"\u0632\u0644\u0641 \u0628\u0631 \u0628\u0627\u062f \u0645\u062f\u0647","popularity":"5","ratecount":"8","view":"1228","time":"4:18","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Fasle Asheghi\/Zolf Bar Bad Madeh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Fasle Asheghi\/Zolf Bar Bad Madeh [WikiSeda].mp3"},{"id":"143978","type":"song","songname":"\u0633\u06cc\u0627\u0647 \u06af\u06cc\u0633\u0648","popularity":"5","ratecount":"6","view":"1247","time":"4:58","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Fasle Asheghi\/Siyah Gisoo [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Fasle Asheghi\/Siyah Gisoo [WikiSeda].mp3"},{"id":"143977","type":"song","songname":"\u062f\u0641 \u0645\u06cc\u0632\u0646\u0645","popularity":"5","ratecount":"8","view":"1061","time":"4:41","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Fasle Asheghi\/Daf Mizanam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Fasle Asheghi\/Daf Mizanam [WikiSeda].mp3"},{"id":"143976","type":"song","songname":"\u0628\u0644\u0628\u0644 \u067e\u0627\u06cc\u06cc\u0632","popularity":"5","ratecount":"7","view":"1210","time":"5:5","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Fasle Asheghi\/Bol Bol E Paeeiz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Fasle Asheghi\/Bol Bol E Paeeiz [WikiSeda].mp3"},{"id":"143975","type":"song","songname":"\u062f\u0627\u063a \u062c\u062f\u0627\u06cc\u06cc","popularity":"5","ratecount":"10","view":"1799","time":"4:31","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Fasle Asheghi\/Dagh E Judaei [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Fasle Asheghi\/Dagh E Judaei [WikiSeda].mp3"},{"id":"143974","type":"song","songname":"\u0646\u06af\u0631\u0627","popularity":"4.7","ratecount":"14","view":"2272","time":"3:59","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Fasle Asheghi\/Negara [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Fasle Asheghi\/Negara [WikiSeda].mp3"}],"year":"1393"},{"id":"9990","type":"album","artist":"\u0633\u062a\u0627\u0631\u06af\u0627\u0646 \u0645\u0648\u0633\u06cc\u0642\u06cc \u0627\u06cc\u0631\u0627\u0646","artist_id":"2751","album":"\u0645\u0646 \u0648 \u0645\u0627","trackcount":"11","popularity":"4.4","date":"1393-06-09","url":"http:\/\/www.wikiseda.com\/Various+Artists\/Man+O+Ma","view":"34532","poster":"http:\/\/85.25.243.154\/img\/ekvtj8g38n-1409491247.jpg","albumtracks":[{"id":"143788","type":"song","songname":"\u0627\u062d\u0633\u0627\u0646 \u062d\u0642 \u0634\u0646\u0627\u0633 \u2013 \u0639\u0627\u0634\u0642 \u0686\u0634\u0645\u0627\u062a\u0645","popularity":"5","ratecount":"2","view":"1035","time":"3:15","mp3":"http:\/\/85.25.95.231\/music\/V\/Various Artists\/Man O Ma\/Asheghe Cheshmatam [wikiseda] - Zy35-1409862462.mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/V\/Various Artists\/Man O Ma\/Asheghe Cheshmatam [wikiseda] - Zy35-1409862462.mp3"},{"id":"143624","type":"song","songname":"\u0639\u0631\u0641\u0627\u0646 \u0645\u0639\u0645\u0627\u0631\u06cc \u2013 \u0627\u0632 \u0627\u0648\u0646 \u0631\u0648\u0632\u06cc \u06a9\u0647 \u0631\u0641\u062a","popularity":"4.3","ratecount":"4","view":"2091","time":"3:39","mp3":"http:\/\/85.25.95.231\/music\/V\/Various Artists\/Man O Ma\/Erfan Memari Az Oon Roozi Ke Rafti [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/V\/Various Artists\/Man O Ma\/Erfan Memari Az Oon Roozi Ke Rafti [WikiSeda].mp3"},{"id":"143622","type":"song","songname":"\u0627\u0645\u06cc\u0631 \u0645\u0633\u0639\u0648\u062f \u2013 \u0645\u062b\u0644 \u0627\u0648\u0646 \u0631\u0648\u0632\u0627","popularity":"4.8","ratecount":"4","view":"2341","time":"3:37","mp3":"http:\/\/85.25.95.231\/music\/V\/Various Artists\/Man O Ma\/Amir Masoud Mesle Oon Rooza [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/V\/Various Artists\/Man O Ma\/Amir Masoud Mesle Oon Rooza [WikiSeda].mp3"},{"id":"143621","type":"song","songname":"\u0631\u0636\u0627 \u0635\u0627\u062f\u0642\u06cc \u2013 \u0641\u0627\u0644","popularity":"4.8","ratecount":"14","view":"3756","time":"3:50","mp3":"http:\/\/85.25.95.231\/music\/V\/Various Artists\/Man O Ma\/Reza Sadeghi Faal [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/V\/Various Artists\/Man O Ma\/Reza Sadeghi Faal [WikiSeda].mp3"},{"id":"143611","type":"song","songname":"\u0639\u0644\u06cc \u0644\u0647\u0631\u0627\u0633\u0628\u06cc \u2013 \u06af\u0644 \u0631\u0632","popularity":"4.9","ratecount":"7","view":"2947","time":"3:56","mp3":"http:\/\/85.25.95.231\/music\/V\/Various Artists\/Man O Ma\/Ali Lohrasbi Gol E Roz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/V\/Various Artists\/Man O Ma\/Ali Lohrasbi Gol E Roz [WikiSeda].mp3"},{"id":"143610","type":"song","songname":"\u0645\u0647\u062f\u06cc \u06cc\u0631\u0627\u062d\u06cc \u2013 \u062e\u062f\u0627 \u0628\u0647 \u0647\u0645\u0631\u0627\u062a","popularity":"4.4","ratecount":"9","view":"3240","time":"3:34","mp3":"http:\/\/85.25.95.231\/music\/V\/Various Artists\/Man O Ma\/Mehdi Yarrahi Khoda Be Hamrat [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/V\/Various Artists\/Man O Ma\/Mehdi Yarrahi Khoda Be Hamrat [WikiSeda].mp3"},{"id":"143609","type":"song","songname":"\u0627\u06cc\u0645\u0627\u0646 \u063a\u06cc\u0627\u062b\u06cc \u2013 \u062f\u0631\u06cc\u0627","popularity":"2","ratecount":"5","view":"2409","time":"3:43","mp3":"http:\/\/85.25.95.231\/music\/V\/Various Artists\/Man O Ma\/Iman Ghiasi Darya [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/V\/Various Artists\/Man O Ma\/Iman Ghiasi Darya [WikiSeda].mp3"},{"id":"143608","type":"song","songname":"\u0634\u0647\u0631\u0627\u0645 \u0634\u06a9\u0648\u0647\u06cc \u2013 \u0645\u0642\u062f\u0633","popularity":"2.9","ratecount":"9","view":"3047","time":"3:25","mp3":"http:\/\/85.25.95.231\/music\/V\/Various Artists\/Man O Ma\/Shahram Shokoohi Moghadas [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/V\/Various Artists\/Man O Ma\/Shahram Shokoohi Moghadas [WikiSeda].mp3"},{"id":"143607","type":"song","songname":"\u0645\u0631\u062a\u0636\u06cc \u067e\u0627\u0634\u0627\u06cc\u06cc \u2013 \u0642\u0644\u0628\u0645 \u0631\u0648 \u062a\u06a9\u0631\u0627\u0631\u0647","popularity":"4.5","ratecount":"17","view":"4283","time":"3:19","mp3":"http:\/\/85.25.95.231\/music\/V\/Various Artists\/Man O Ma\/Morteza Pashaei Ghalbam Ru Tekrare [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/V\/Various Artists\/Man O Ma\/Morteza Pashaei Ghalbam Ru Tekrare [WikiSeda].mp3"},{"id":"143603","type":"song","songname":"\u0633\u06cc\u0646\u0627 \u062d\u062c\u0627\u0632\u06cc \u2013 \u0628\u0632\u0627\u0631 \u0628\u06af\u0646","popularity":"2.7","ratecount":"6","view":"2957","time":"3:16","mp3":"http:\/\/85.25.95.231\/music\/V\/Various Artists\/Man O Ma\/Sina Hejazi Bezar Began [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/V\/Various Artists\/Man O Ma\/Sina Hejazi Bezar Began [WikiSeda].mp3"},{"id":"143601","type":"song","songname":"\u0645\u062d\u0633\u0646 \u0686\u0627\u0648\u0634\u06cc \u2013 \u062f\u06cc\u06af\u0647 \u062f\u0648\u0633\u062a\u0645 \u0646\u062f\u0627\u0631\u0647","popularity":"4.3","ratecount":"14","view":"6426","time":"3:13","mp3":"http:\/\/85.25.95.231\/music\/V\/Various Artists\/Man O Ma\/Mohsen Chavoshi Dige Doostam Nadare [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/V\/Various Artists\/Man O Ma\/Mohsen Chavoshi Dige Doostam Nadare [WikiSeda].mp3"}],"year":"1393"},{"id":"9989","type":"album","artist":"\u0647\u0645\u0627\u06cc\u0648\u0646 \u0634\u062c\u0631\u06cc\u0627\u0646","artist_id":"135","album":"\u0622\u0631\u0627\u06cc\u0634 \u063a\u0644\u06cc\u0638","trackcount":"10","popularity":"4.6","date":"1393-06-09","url":"http:\/\/www.wikiseda.com\/Homayoun+Shajarian\/Arayeshe+Ghaliz","view":"35862","poster":"http:\/\/85.25.243.154\/img\/v9kwq70wzj-1409462244.jpg","albumtracks":[{"id":"143592","type":"song","songname":"\u0641\u06cc\u0644\u0645 \u0622\u0631\u0627\u06cc\u0634 \u063a\u0644\u06cc\u0638 10","popularity":"4.5","ratecount":"2","view":"3394","time":"3:46","mp3":"http:\/\/85.25.95.231\/music\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 10 [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 10 [WikiSeda].mp3"},{"id":"143591","type":"song","songname":"\u0641\u06cc\u0644\u0645 \u0622\u0631\u0627\u06cc\u0634 \u063a\u0644\u06cc\u0638 9","popularity":"2.5","ratecount":"4","view":"2004","time":"0:53","mp3":"http:\/\/85.25.95.231\/music\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 9 [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 9 [WikiSeda].mp3"},{"id":"143590","type":"song","songname":"\u0641\u06cc\u0644\u0645 \u0622\u0631\u0627\u06cc\u0634 \u063a\u0644\u06cc\u0638 8","popularity":"4.7","ratecount":"3","view":"1961","time":"0:37","mp3":"http:\/\/85.25.95.231\/music\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 8 [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 8 [WikiSeda].mp3"},{"id":"143589","type":"song","songname":"\u0641\u06cc\u0644\u0645 \u0622\u0631\u0627\u06cc\u0634 \u063a\u0644\u06cc\u0638 7","popularity":"3","ratecount":"2","view":"2436","time":"2:9","mp3":"http:\/\/85.25.95.231\/music\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 7 [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 7 [WikiSeda].mp3"},{"id":"143588","type":"song","songname":"\u0641\u06cc\u0644\u0645 \u0622\u0631\u0627\u06cc\u0634 \u063a\u0644\u06cc\u0638 6","popularity":"3","ratecount":"2","view":"2162","time":"0:41","mp3":"http:\/\/85.25.95.231\/music\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 6 [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 6 [WikiSeda].mp3"},{"id":"143587","type":"song","songname":"\u0641\u06cc\u0644\u0645 \u0622\u0631\u0627\u06cc\u0634 \u063a\u0644\u06cc\u0638 5","popularity":"2","ratecount":"2","view":"2482","time":"1:26","mp3":"http:\/\/85.25.95.231\/music\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 5 [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 5 [WikiSeda].mp3"},{"id":"143586","type":"song","songname":"\u0641\u06cc\u0644\u0645 \u0622\u0631\u0627\u06cc\u0634 \u063a\u0644\u06cc\u0638 4","popularity":"3","ratecount":"2","view":"2507","time":"0:59","mp3":"http:\/\/85.25.95.231\/music\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 4 [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 4 [WikiSeda].mp3"},{"id":"143585","type":"song","songname":"\u0641\u06cc\u0644\u0645 \u0622\u0631\u0627\u06cc\u0634 \u063a\u0644\u06cc\u0638 3","popularity":"5","ratecount":"1","view":"3051","time":"0:42","mp3":"http:\/\/85.25.95.231\/music\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 3 [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 3 [WikiSeda].mp3"},{"id":"143584","type":"song","songname":"\u0641\u06cc\u0644\u0645 \u0622\u0631\u0627\u06cc\u0634 \u063a\u0644\u06cc\u0638 2","popularity":"4.4","ratecount":"7","view":"5784","time":"8:18","mp3":"http:\/\/85.25.95.231\/music\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 2 [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 2 [WikiSeda].mp3"},{"id":"143583","type":"song","songname":"\u0641\u06cc\u0644\u0645 \u0622\u0631\u0627\u06cc\u0634 \u063a\u0644\u06cc\u0638 1","popularity":"3.4","ratecount":"7","view":"10081","time":"2:33","mp3":"http:\/\/85.25.95.231\/music\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 1 [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homayoun Shajarian\/Arayeshe Ghaliz\/Filme Arayeshe Ghaliz 1 [WikiSeda].mp3"}],"year":"1393"},{"id":"9988","type":"album","artist":"\u0633\u0627\u0645\u0627\u0646 \u062c\u0644\u06cc\u0644\u06cc","artist_id":"240","album":"\u067e\u0631\u062a\u06af\u0627\u0647","trackcount":"13","popularity":"4.7","date":"1393-06-10","url":"http:\/\/www.wikiseda.com\/Saman+Jalili\/Partgah","view":"169884","poster":"http:\/\/85.25.243.154\/img\/zve52exf7l-1409118366.jpg","albumtracks":[{"id":"143511","type":"song","songname":"\u0645\u0631\u062f","popularity":"4.8","ratecount":"31","view":"8908","time":"3:18","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Mard [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Mard [WikiSeda].mp3"},{"id":"143510","type":"song","songname":"\u062d\u0627\u0644\u0645 \u0628\u062f\u0647","popularity":"4.7","ratecount":"18","view":"8673","time":"2:55","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Halam Bade [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Halam Bade [WikiSeda].mp3"},{"id":"143509","type":"song","songname":"\u0628\u0647 \u062c\u0648\u0646 \u062a\u0648","popularity":"4.9","ratecount":"24","view":"9732","time":"4:17","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Be Joone To [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Be Joone To [WikiSeda].mp3"},{"id":"143508","type":"song","songname":"\u062f\u0633\u062a \u0628\u0631\u062f\u0627\u0631","popularity":"4.5","ratecount":"28","view":"9256","time":"2:32","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Dast Bardar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Dast Bardar [WikiSeda].mp3"},{"id":"143507","type":"song","songname":"\u06a9\u0644\u0646\u062c\u0627\u0631","popularity":"4.8","ratecount":"26","view":"8979","time":"3:10","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Kalanjar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Kalanjar [WikiSeda].mp3"},{"id":"143506","type":"song","songname":"\u0628\u0647\u0648\u0646\u0647","popularity":"4.8","ratecount":"18","view":"9452","time":"2:40","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Bahoone [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Bahoone [WikiSeda].mp3"},{"id":"143505","type":"song","songname":"\u0627\u0639\u062a\u0631\u0627\u0641","popularity":"4.8","ratecount":"19","view":"10296","time":"3:5","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Eteraf [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Eteraf [WikiSeda].mp3"},{"id":"143504","type":"song","songname":"\u062d\u0628\u0633 \u0627\u0628\u062f","popularity":"4.8","ratecount":"22","view":"10145","time":"3:10","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Habse Abad [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Habse Abad [WikiSeda].mp3"},{"id":"143503","type":"song","songname":"\u0633\u0631 \u0628\u0647 \u0647\u0648\u0627","popularity":"4.7","ratecount":"56","view":"23589","time":"3:29","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Sar Be Hava [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Sar Be Hava [WikiSeda].mp3"},{"id":"143502","type":"song","songname":"\u062d\u0631\u0641 \u062f\u0644\u0645","popularity":"4.8","ratecount":"75","view":"26615","time":"3:48","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Harfe Delam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Harfe Delam [WikiSeda].mp3"},{"id":"143501","type":"song","songname":"\u0686\u06cc \u0645\u06cc\u0634\u0647","popularity":"5","ratecount":"21","view":"12257","time":"2:45","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Chi Mishe [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Chi Mishe [WikiSeda].mp3"},{"id":"143500","type":"song","songname":"\u0634\u0639\u0644\u0647 \u062f\u0627\u0631","popularity":"4.7","ratecount":"21","view":"13856","time":"4:30","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Shole Dar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Shole Dar [WikiSeda].mp3"},{"id":"143499","type":"song","songname":"\u062a\u0634\u0648\u06cc\u0634","popularity":"5","ratecount":"30","view":"18126","time":"3:20","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Tashvish [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Tashvish [WikiSeda].mp3"}],"year":"1393"},{"id":"9962","type":"album","artist":"\u0639\u0644\u06cc \u0627\u0635\u062d\u0627\u0628\u06cc","artist_id":"69","album":"\u062f\u06cc\u0631\u0647","trackcount":"10","popularity":"4.3","date":"1393-05-19","url":"http:\/\/www.wikiseda.com\/Ali+Ashabi\/Dire","view":"96914","poster":"http:\/\/85.25.243.154\/img\/gu1w5po0sk-1407650678.jpg","albumtracks":[{"id":"142963","type":"song","songname":"\u0647\u0641\u062a \u0633\u06cc\u0646","popularity":"4.5","ratecount":"13","view":"4798","time":"3:2","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ashabi\/Dire\/Haft Sin [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ashabi\/Dire\/Haft Sin [WikiSeda].mp3"},{"id":"142962","type":"song","songname":"\u0639\u0634\u0645 \u0639\u0627\u0634\u0642\u0645 \u0628\u0627\u0634","popularity":"4.1","ratecount":"23","view":"6718","time":"3:56","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ashabi\/Dire\/Eshgham Ashegham Bash [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ashabi\/Dire\/Eshgham Ashegham Bash [WikiSeda].mp3"},{"id":"142961","type":"song","songname":"\u0637\u0641\u0644\u06cc \u062f\u0644 \u0645\u0646","popularity":"3.8","ratecount":"14","view":"6786","time":"3:42","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ashabi\/Dire\/Tefli Del E Man [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ashabi\/Dire\/Tefli Del E Man [WikiSeda].mp3"},{"id":"142960","type":"song","songname":"\u0627\u0634\u06a9\u0647\u0627\u06cc \u0634\u0628\u0648\u0646\u0647","popularity":"4.3","ratecount":"12","view":"7638","time":"4:11","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ashabi\/Dire\/Ashkhay E Shabooneh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ashabi\/Dire\/Ashkhay E Shabooneh [WikiSeda].mp3"},{"id":"142959","type":"song","songname":"\u0639\u06a9\u0633 \u06cc\u0627\u062f\u06af\u0627\u0631\u06cc","popularity":"4.7","ratecount":"13","view":"7968","time":"3:32","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ashabi\/Dire\/Ax E Yadegari [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ashabi\/Dire\/Ax E Yadegari [WikiSeda].mp3"},{"id":"142958","type":"song","songname":"\u062f\u0633\u062a \u062e\u0648\u062f\u0645 \u0646\u06cc\u0633\u062a","popularity":"4.3","ratecount":"11","view":"7632","time":"3:39","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ashabi\/Dire\/Daste Khodam Nist [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ashabi\/Dire\/Daste Khodam Nist [WikiSeda].mp3"},{"id":"142957","type":"song","songname":"\u062d\u0633 \u0628\u0648\u062f\u0646","popularity":"4.1","ratecount":"9","view":"8534","time":"3:27","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ashabi\/Dire\/Hese Bodan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ashabi\/Dire\/Hese Bodan [WikiSeda].mp3"},{"id":"142956","type":"song","songname":"\u0627\u06cc\u0646 \u0647\u0645\u0647 \u062e\u0648\u0634\u0628\u062e\u062a\u06cc","popularity":"4.6","ratecount":"13","view":"9225","time":"4:31","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ashabi\/Dire\/In Hame Khoshbakhti [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ashabi\/Dire\/In Hame Khoshbakhti [WikiSeda].mp3"},{"id":"142955","type":"song","songname":"\u0641\u0627\u0646\u0648\u0633","popularity":"4.5","ratecount":"22","view":"11383","time":"3:57","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ashabi\/Dire\/Fanoos [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ashabi\/Dire\/Fanoos [WikiSeda].mp3"},{"id":"142954","type":"song","songname":"\u062f\u06cc\u0631\u0647","popularity":"4.4","ratecount":"44","view":"26232","time":"4:26","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ashabi\/Dire\/Direh [wikiseda] - Hjcw-1407650726.mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ashabi\/Dire\/Direh [wikiseda] - Hjcw-1407650726.mp3"}],"year":"1393"},{"id":"9951","type":"album","artist":"\u06a9\u06cc\u0648\u0633\u06a9","artist_id":"582","album":"\u0632\u0646\u06af \u0628\u0632\u0646 \u0622\u0698\u0627\u0646\u0633","trackcount":"11","popularity":"4.4","date":"1393-05-14","url":"http:\/\/www.wikiseda.com\/Kiosk\/Call+A+Cab","view":"26253","poster":"http:\/\/85.25.243.154\/img\/0ru09v17aa-1407246754.jpg","albumtracks":[{"id":"142744","type":"song","songname":"\u0645\u0627\u0647\u0650 \u0646\u0648","popularity":"5","ratecount":"2","view":"1602","time":"4:41","mp3":"http:\/\/85.25.95.231\/music\/K\/Kiosk\/Call A Cab\/Mah E No [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/K\/Kiosk\/Call A Cab\/Mah E No [WikiSeda].mp3"},{"id":"142743","type":"song","songname":"\u06a9\u0631\u0627\u0645\u062a","popularity":"3","ratecount":"1","view":"1969","time":"3:22","mp3":"http:\/\/85.25.95.231\/music\/K\/Kiosk\/Call A Cab\/Keramat [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/K\/Kiosk\/Call A Cab\/Keramat [WikiSeda].mp3"},{"id":"142742","type":"song","songname":"\u062e\u0637\u0651\u0650 \u0641\u0627\u0635\u0644\u0647","popularity":"0","ratecount":"0","view":"1604","time":"2:41","mp3":"http:\/\/85.25.95.231\/music\/K\/Kiosk\/Call A Cab\/Khat E Fasele [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/K\/Kiosk\/Call A Cab\/Khat E Fasele [WikiSeda].mp3"},{"id":"142741","type":"song","songname":"\u0627\u067e\u06cc\u062f\u0645\u06cc\u06a9","popularity":"4","ratecount":"1","view":"1557","time":"4:44","mp3":"http:\/\/85.25.95.231\/music\/K\/Kiosk\/Call A Cab\/Epidemic [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/K\/Kiosk\/Call A Cab\/Epidemic [WikiSeda].mp3"},{"id":"142740","type":"song","songname":"\u067e\u06cc\u0686\u0650 \u0622\u062e\u0631","popularity":"4.5","ratecount":"2","view":"1669","time":"3:26","mp3":"http:\/\/85.25.95.231\/music\/K\/Kiosk\/Call A Cab\/Pich E Akhar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/K\/Kiosk\/Call A Cab\/Pich E Akhar [WikiSeda].mp3"},{"id":"142739","type":"song","songname":"\u0632\u0646\u06af \u0628\u0632\u0646 \u0622\u0698\u0627\u0646\u0633","popularity":"2.7","ratecount":"3","view":"4189","time":"3:40","mp3":"http:\/\/85.25.95.231\/music\/K\/Kiosk\/Call A Cab\/Zang Bezan Azhans [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/K\/Kiosk\/Call A Cab\/Zang Bezan Azhans [WikiSeda].mp3"},{"id":"142738","type":"song","songname":"\u0627\u0644\u0627\u0646 \u0645\u06cc\u06af\u0647 \u06cc\u0627\u062f\u0634 \u0646\u06cc\u0633\u062a","popularity":"4","ratecount":"1","view":"1951","time":"4:10","mp3":"http:\/\/85.25.95.231\/music\/K\/Kiosk\/Call A Cab\/Alan Mige Yadesh Nist [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/K\/Kiosk\/Call A Cab\/Alan Mige Yadesh Nist [WikiSeda].mp3"},{"id":"142737","type":"song","songname":"\u0647\u0645\u0647 \u062e\u0648\u0627\u0628\u06cc\u062f\u0646","popularity":"4","ratecount":"1","view":"2019","time":"4:26","mp3":"http:\/\/85.25.95.231\/music\/K\/Kiosk\/Call A Cab\/Hame Khabidan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/K\/Kiosk\/Call A Cab\/Hame Khabidan [WikiSeda].mp3"},{"id":"142736","type":"song","songname":"\u062c\u0646\u0648\u0646\u0650 \u0645\u0644\u06cc","popularity":"5","ratecount":"1","view":"2316","time":"2:56","mp3":"http:\/\/85.25.95.231\/music\/K\/Kiosk\/Call A Cab\/Jonoon E Melli [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/K\/Kiosk\/Call A Cab\/Jonoon E Melli [WikiSeda].mp3"},{"id":"142735","type":"song","songname":"\u0634\u0628\u0647\u0627 \u067e\u06cc\u062f\u0627\u062a \u0646\u06cc\u0633\u062a","popularity":"1","ratecount":"1","view":"2673","time":"3:50","mp3":"http:\/\/85.25.95.231\/music\/K\/Kiosk\/Call A Cab\/Shabha Peydat Nist [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/K\/Kiosk\/Call A Cab\/Shabha Peydat Nist [WikiSeda].mp3"},{"id":"142734","type":"song","songname":"\u0633\u0627\u0632 \u0646\u0645\u06cc\u0634\u0647 \u0632\u062f","popularity":"2.8","ratecount":"4","view":"4704","time":"3:53","mp3":"http:\/\/85.25.95.231\/music\/K\/Kiosk\/Call A Cab\/Saz Nemishe Zad [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/K\/Kiosk\/Call A Cab\/Saz Nemishe Zad [WikiSeda].mp3"}],"year":"1393"},{"id":"9944","type":"album","artist":"\u0632\u062f \u0628\u0627\u0632\u06cc","artist_id":"98","album":"\u067e\u06cc\u0631 \u0634\u062f\u06cc\u0645 \u0648\u0644\u06cc \u0628\u0632\u0631\u06af \u0646\u0647","trackcount":"11","popularity":"4","date":"1393-05-06","url":"http:\/\/www.wikiseda.com\/Z+bazi\/Pir+Shodim+Vali+Bozorg+Na","view":"153457","poster":"http:\/\/85.25.243.154\/img\/7xbc9eckx2-1406553224.jpg","albumtracks":[{"id":"142568","type":"song","songname":"Woody Allen","popularity":"2.3","ratecount":"16","view":"8425","time":"1:52","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Woody Allen [WikiSeda].mp3"},{"id":"142567","type":"song","songname":"\u067e\u0633\u0631 \u0628\u062f","popularity":"3.6","ratecount":"14","view":"6550","time":"4:21","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Pesare Bad [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Pesare Bad [WikiSeda].mp3"},{"id":"142565","type":"song","songname":"\u0633\u0648\u0628 \u0633\u0648\u0628","popularity":"3.3","ratecount":"15","view":"10276","time":"4:7","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Sobe Sobe [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Sobe Sobe [WikiSeda].mp3"},{"id":"142564","type":"song","songname":"Dorian Gray","popularity":"2.8","ratecount":"11","view":"8612","time":"0:20","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Dorian Gray [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Dorian Gray [WikiSeda].mp3"},{"id":"142563","type":"song","songname":"\u0627\u06cc\u0648\u0644 \u0627\u06cc\u0648\u0644","popularity":"4.1","ratecount":"18","view":"11794","time":"4:54","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Eyval Eyval [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Eyval Eyval [WikiSeda].mp3"},{"id":"142561","type":"song","songname":"\u0645\u0647\u0645\u0648\u0646\u06cc \u062e\u0648\u062f\u0645\u0648\u0646\u0647","popularity":"4.5","ratecount":"23","view":"14365","time":"5:27","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Mehmooni Khodemoone [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Mehmooni Khodemoone [WikiSeda].mp3"},{"id":"142560","type":"song","songname":"\u0647\u0631 \u0686\u06cc \u0628\u062f\u0647","popularity":"3.5","ratecount":"11","view":"12069","time":"4:59","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Har Chi Bade [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Har Chi Bade [WikiSeda].mp3"},{"id":"142559","type":"song","songname":"\u06af\u0644 \u0633\u0646\u06af\u0645","popularity":"4.1","ratecount":"18","view":"15657","time":"4:8","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Golo Sangam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Golo Sangam [WikiSeda].mp3"},{"id":"142558","type":"song","songname":"\u062c\u0632\u0626\u06cc \u0627\u0632 \u0645\u0646\u0645","popularity":"3.8","ratecount":"15","view":"16333","time":"4:23","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Jozvi Az Man [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Jozvi Az Man [WikiSeda].mp3"},{"id":"142557","type":"song","songname":"\u067e\u06cc\u0631 \u0634\u062f\u06cc\u0645 \u0648\u0644\u06cc \u0628\u0632\u0631\u06af \u0646\u0647","popularity":"3.8","ratecount":"33","view":"38695","time":"7:20","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Pir Shodim Vali Bozorg Na [WikiSeda].mp3"},{"id":"142555","type":"song","songname":"\u062a\u0647\u0631\u0627\u0646 \u0645\u0627\u0632\u0631\u0627\u062a\u06cc","popularity":"3.9","ratecount":"14","view":"10681","time":"4:54","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Pir Shodim Vali Bozorg Na\/Tehran Maserati [WikiSeda].mp3"}],"year":"1393"},{"id":"9916","type":"album","artist":"\u0647\u0645\u0627\u06cc","artist_id":"341","album":"\u0628\u0632 \u0648 \u0686\u0648\u067e\u0627\u0646","trackcount":"6","popularity":"4.5","date":"1393-05-02","url":"http:\/\/www.wikiseda.com\/Homay\/Boz+Va+Choopan","view":"35360","poster":"http:\/\/85.25.243.154\/img\/jcudai7doj-1406178290.jpg","albumtracks":[{"id":"142206","type":"song","songname":"\u0645\u0634\u062a \u06af\u0644\u0645\u0627\u0631","popularity":"4.5","ratecount":"4","view":"3661","time":"4:10","mp3":"http:\/\/85.25.95.231\/music\/H\/Homay\/Boz Va Choopan\/Mashte Golmar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homay\/Boz Va Choopan\/Mashte Golmar [WikiSeda].mp3"},{"id":"142204","type":"song","songname":"\u0628\u062a\u06cc\u0644 \u0628\u062a\u06cc\u0644","popularity":"4.6","ratecount":"5","view":"3369","time":"5:28","mp3":"http:\/\/85.25.95.231\/music\/H\/Homay\/Boz Va Choopan\/Betil Betil [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homay\/Boz Va Choopan\/Betil Betil [WikiSeda].mp3"},{"id":"142202","type":"song","songname":"\u0633\u0627\u0642\u06cc\u0627","popularity":"4.8","ratecount":"8","view":"5707","time":"6:49","mp3":"http:\/\/85.25.95.231\/music\/H\/Homay\/Boz Va Choopan\/Saghia Ft Yalda Abbasi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homay\/Boz Va Choopan\/Saghia Ft Yalda Abbasi [WikiSeda].mp3"},{"id":"142200","type":"song","songname":"\u0634\u0647\u0633\u06cc\u0627\u0631","popularity":"5","ratecount":"3","view":"4235","time":"7:5","mp3":"http:\/\/85.25.95.231\/music\/H\/Homay\/Boz Va Choopan\/Shahsiar Ft Yalda Abbasi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homay\/Boz Va Choopan\/Shahsiar Ft Yalda Abbasi [WikiSeda].mp3"},{"id":"142198","type":"song","songname":"\u0644\u0647 \u06cc\u0627\u0631\u0647","popularity":"5","ratecount":"2","view":"5016","time":"9:6","mp3":"http:\/\/85.25.95.231\/music\/H\/Homay\/Boz Va Choopan\/Le Yare Ft Yalda Abbasi [WikiSeda].mp3"},{"id":"142196","type":"song","songname":"\u0628\u0632 \u0648 \u0686\u0648\u067e\u0627\u0646","popularity":"4.2","ratecount":"5","view":"13372","time":"3:56","mp3":"http:\/\/85.25.95.231\/music\/H\/Homay\/Boz Va Choopan\/Boz Va Choopan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Homay\/Boz Va Choopan\/Boz Va Choopan [WikiSeda].mp3"}],"year":"1393"},{"id":"9887","type":"album","artist":"\u0645\u06cc\u0644\u0627\u062f \u0641\u0631\u0647\u0648\u062f\u06cc","artist_id":"4111","album":"\u0645\u062f\u06cc\u0646\u0647","trackcount":"3","popularity":"4.2","date":"1393-04-29","url":"http:\/\/www.wikiseda.com\/Milad+Faehodi\/Madineh","view":"12631","poster":"http:\/\/85.25.243.154\/img\/81imb909g5-1405811007.jpg","albumtracks":[{"id":"141857","type":"song","songname":"\u0628\u06cc\u062f\u0627\u0631\u0645 \u06a9\u0646","popularity":"4.5","ratecount":"6","view":"3947","time":"3:10","mp3":"http:\/\/85.25.95.231\/music\/M\/Milad Faehodi\/Madineh\/Bidaram Kon [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Milad Faehodi\/Madineh\/Bidaram Kon [WikiSeda].mp3"},{"id":"141856","type":"song","songname":"\u0642\u0631\u0627\u0631\u0645\u0648\u0646 \u0647\u0645\u06cc\u0646 \u0628\u0648\u062f","popularity":"5.3","ratecount":"4","view":"3218","time":"4:11","mp3":"http:\/\/85.25.95.231\/music\/M\/Milad Faehodi\/Madineh\/Ghararemoon Hamin Bood [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Milad Faehodi\/Madineh\/Ghararemoon Hamin Bood [WikiSeda].mp3"},{"id":"141855","type":"song","songname":"\u0628\u06af\u0648 \u0647\u0646\u0648\u0632 \u0647\u0633\u062a\u06cc","popularity":"4.3","ratecount":"10","view":"5466","time":"3:9","mp3":"http:\/\/85.25.95.231\/music\/M\/Milad Faehodi\/Madineh\/Begoo Hanooz Hasti [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Milad Faehodi\/Madineh\/Begoo Hanooz Hasti [WikiSeda].mp3"}],"year":"1393"},{"id":"9880","type":"album","artist":"\u0645\u0631\u062c\u0627\u0646 \u0641\u0631\u0633\u0627\u062f","artist_id":"5055","album":"\u06af\u0644 \u0647\u0627\u06cc \u0622\u0628\u06cc","trackcount":"8","popularity":"4.3","date":"1393-04-27","url":"http:\/\/www.wikiseda.com\/Marjan+Farsad\/Golhaye+Abi","view":"26630","poster":"http:\/\/85.25.243.154\/img\/5m510b84jy-1405716301.jpg","albumtracks":[{"id":"141704","type":"song","songname":"\u067e\u0631\u062a\u0642\u0627\u0644 \u0645\u0646","popularity":"4.2","ratecount":"6","view":"2289","time":"3:27","mp3":"http:\/\/85.25.95.231\/music\/M\/Marjan Farsad\/Golhaye Abi\/Porteghale Man [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Marjan Farsad\/Golhaye Abi\/Porteghale Man [WikiSeda].mp3"},{"id":"141703","type":"song","songname":"\u0631\u0648\u06cc\u0627 \u0647\u0627","popularity":"3.6","ratecount":"7","view":"2421","time":"3:39","mp3":"http:\/\/85.25.95.231\/music\/M\/Marjan Farsad\/Golhaye Abi\/Royaha [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Marjan Farsad\/Golhaye Abi\/Royaha [WikiSeda].mp3"},{"id":"141702","type":"song","songname":"\u0627\u0641\u0633\u0627\u0646\u0647","popularity":"4","ratecount":"8","view":"2558","time":"4:19","mp3":"http:\/\/85.25.95.231\/music\/M\/Marjan Farsad\/Golhaye Abi\/Afsaneh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Marjan Farsad\/Golhaye Abi\/Afsaneh [WikiSeda].mp3"},{"id":"141701","type":"song","songname":"\u0686\u0634\u0645 \u0647\u0627\u06cc \u062a\u0645\u0634\u06a9\u06cc","popularity":"3.7","ratecount":"3","view":"2495","time":"3:0","mp3":"http:\/\/85.25.95.231\/music\/M\/Marjan Farsad\/Golhaye Abi\/Cheshmhaye Tameshki [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Marjan Farsad\/Golhaye Abi\/Cheshmhaye Tameshki [WikiSeda].mp3"},{"id":"141700","type":"song","songname":"\u062e\u0648\u0646\u0647 \u06cc \u0645\u0627","popularity":"4.4","ratecount":"7","view":"3834","time":"4:28","mp3":"http:\/\/85.25.95.231\/music\/M\/Marjan Farsad\/Golhaye Abi\/Khooneye Ma [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Marjan Farsad\/Golhaye Abi\/Khooneye Ma [WikiSeda].mp3"},{"id":"141699","type":"song","songname":"\u062f\u06cc\u0634\u0628","popularity":"3.4","ratecount":"5","view":"2906","time":"4:37","mp3":"http:\/\/85.25.95.231\/music\/M\/Marjan Farsad\/Golhaye Abi\/Dishab [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Marjan Farsad\/Golhaye Abi\/Dishab [WikiSeda].mp3"},{"id":"141698","type":"song","songname":"\u06af\u0644 \u0647\u0627\u06cc \u0622\u0628\u06cc","popularity":"3.3","ratecount":"6","view":"4393","time":"4:48","mp3":"http:\/\/85.25.95.231\/music\/M\/Marjan Farsad\/Golhaye Abi\/Golhaye Abi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Marjan Farsad\/Golhaye Abi\/Golhaye Abi [WikiSeda].mp3"},{"id":"141697","type":"song","songname":"\u0633\u062a\u0627\u0631\u0647 \u06cc \u0633\u0647\u06cc\u0644","popularity":"3.9","ratecount":"11","view":"5734","time":"4:24","mp3":"http:\/\/85.25.95.231\/music\/M\/Marjan Farsad\/Golhaye Abi\/Setareye Soheil [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Marjan Farsad\/Golhaye Abi\/Setareye Soheil [WikiSeda].mp3"}],"year":"1393"},{"id":"9826","type":"album","artist":"\u0645\u062d\u0633\u0646 \u0634\u0631\u06cc\u0641\u06cc\u0627\u0646","artist_id":"631","album":"\u062f\u06cc\u0646\u06af\u0648 \u0645\u0627\u0631\u0648","trackcount":"9","popularity":"4","date":"1393-04-14","url":"http:\/\/www.wikiseda.com\/Mohsen-sharifian\/Dingue+Marrow","view":"20023","poster":"http:\/\/85.25.243.154\/img\/un79cef6qp-1404554657.jpg","albumtracks":[{"id":"140898","type":"song","songname":"\u06a9\u0646\u0627\u0631\u0647","popularity":"4.4","ratecount":"9","view":"1509","time":"3:38","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen-sharifian\/Dingue Marrow\/Kenareh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen-sharifian\/Dingue Marrow\/Kenareh [WikiSeda].mp3"},{"id":"140897","type":"song","songname":"\u062d\u06cc\u0631\u0627\u0646","popularity":"6.5","ratecount":"2","view":"1459","time":"2:49","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen-sharifian\/Dingue Marrow\/Heyran [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen-sharifian\/Dingue Marrow\/Heyran [WikiSeda].mp3"},{"id":"140896","type":"song","songname":"\u062d\u0635\u0627\u0631","popularity":"2.8","ratecount":"4","view":"1310","time":"2:41","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen-sharifian\/Dingue Marrow\/Hesaar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen-sharifian\/Dingue Marrow\/Hesaar [WikiSeda].mp3"},{"id":"140895","type":"song","songname":"\u062e\u06cc\u0632\u0627\u0628","popularity":"2.5","ratecount":"2","view":"1409","time":"4:21","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen-sharifian\/Dingue Marrow\/Khizaab [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen-sharifian\/Dingue Marrow\/Khizaab [WikiSeda].mp3"},{"id":"140894","type":"song","songname":"\u062e\u0644\u062e\u0627\u0644","popularity":"5","ratecount":"5","view":"1701","time":"4:17","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen-sharifian\/Dingue Marrow\/Khalkhal [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen-sharifian\/Dingue Marrow\/Khalkhal [WikiSeda].mp3"},{"id":"140893","type":"song","songname":"\u0646\u0627\u06af\u0647\u0627\u0646","popularity":"5","ratecount":"1","view":"1905","time":"4:21","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen-sharifian\/Dingue Marrow\/Nagahan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen-sharifian\/Dingue Marrow\/Nagahan [WikiSeda].mp3"},{"id":"140892","type":"song","songname":"\u0644\u06cc\u0627\u0646 \u0641\u0644\u0627\u0645\u0646\u06a9\u0648","popularity":"3","ratecount":"1","view":"2011","time":"3:44","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen-sharifian\/Dingue Marrow\/Lian Flamenco [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen-sharifian\/Dingue Marrow\/Lian Flamenco [WikiSeda].mp3"},{"id":"140891","type":"song","songname":"\u06af\u0641\u062a \u0648 \u062c\u0648","popularity":"3.5","ratecount":"2","view":"2511","time":"2:46","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen-sharifian\/Dingue Marrow\/Gofto Joo [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen-sharifian\/Dingue Marrow\/Gofto Joo [WikiSeda].mp3"},{"id":"140890","type":"song","songname":"\u062f\u06cc\u0646\u06af\u0648 \u0645\u0627\u0631\u0648","popularity":"4","ratecount":"7","view":"6208","time":"2:57","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen-sharifian\/Dingue Marrow\/Dingue Marrow [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen-sharifian\/Dingue Marrow\/Dingue Marrow [WikiSeda].mp3"}],"year":"1393"},{"id":"9821","type":"album","artist":"\u0627\u0648\u0647\u0627\u0645","artist_id":"3927","album":"\u062d\u0627\u0641\u0638 \u0639\u0627\u0634\u0642 \u0627\u0633\u062a","trackcount":"4","popularity":"3.9","date":"1393-04-08","url":"http:\/\/www.wikiseda.com\/O-hum\/Hafez+In+Love","view":"8567","poster":"http:\/\/85.25.243.154\/img\/1xxwe9fwdz-1404025213.jpg","albumtracks":[{"id":"140715","type":"song","songname":"\u062d\u0627\u0641\u0638 \u0639\u0627\u0634\u0642 \u0627\u0633\u062a \u0631\u06cc\u0645\u06cc\u06a9\u0633","popularity":"5","ratecount":"2","view":"910","time":"6:51","mp3":"http:\/\/85.25.95.231\/music\/O\/O-hum\/Hafez In Love\/Hafez Ashegh Ast Remix [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/O\/O-hum\/Hafez In Love\/Hafez Ashegh Ast Remix [WikiSeda].mp3"},{"id":"140714","type":"song","songname":"\u0631\u0627\u0647 \u0639\u0634\u0642 \u0631\u06cc\u0645\u06cc\u06a9\u0633","popularity":"5","ratecount":"1","view":"936","time":"9:7","mp3":"http:\/\/85.25.95.231\/music\/O\/O-hum\/Hafez In Love\/Rahe Eshgh Remix [WikiSeda].mp3"},{"id":"140713","type":"song","songname":"\u0631\u0627\u0647 \u0639\u0634\u0642","popularity":"4.3","ratecount":"3","view":"2022","time":"4:15","mp3":"http:\/\/85.25.95.231\/music\/O\/O-hum\/Hafez In Love\/Rahe Eshgh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/O\/O-hum\/Hafez In Love\/Rahe Eshgh [WikiSeda].mp3"},{"id":"140712","type":"song","songname":"\u062d\u0627\u0641\u0638 \u0639\u0627\u0634\u0642 \u0627\u0633\u062a","popularity":"3.7","ratecount":"6","view":"4699","time":"3:38","mp3":"http:\/\/85.25.95.231\/music\/O\/O-hum\/Hafez In Love\/Hafez Ashegh Ast [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/O\/O-hum\/Hafez In Love\/Hafez Ashegh Ast [WikiSeda].mp3"}],"year":"1393"},{"id":"9809","type":"album","artist":"\u0639\u0644\u06cc\u0631\u0636\u0627 \u0642\u0631\u0628\u0627\u0646\u06cc","artist_id":"472","album":"\u0631\u0641\u062a\u0645 \u0648 \u0628\u0627\u0631 \u0633\u0641\u0631 \u0628\u0633\u062a\u0645","trackcount":"6","popularity":"4.6","date":"1393-04-02","url":"http:\/\/www.wikiseda.com\/Alireza+Ghorbani\/Raftamo+Bare+Safar+Bastam","view":"42040","poster":"http:\/\/85.25.243.154\/img\/pf2m3p18sw-1403542665.jpg","albumtracks":[{"id":"140513","type":"song","songname":"\u0645\u0646\u0627\u062c\u0627\u062a","popularity":"5","ratecount":"2","view":"4188","time":"11:13","mp3":"http:\/\/85.25.95.231\/music\/A\/Alireza Ghorbani\/Raftamo Bare Safar Bastam\/Monajat [WikiSeda].mp3"},{"id":"140501","type":"song","songname":"\u062f\u06cc\u062f\u06cc \u06a9\u0647 \u0631\u0633\u0648\u0627 \u0634\u062f \u062f\u0644\u0645","popularity":"4.8","ratecount":"8","view":"7162","time":"7:14","mp3":"http:\/\/85.25.95.231\/music\/A\/Alireza Ghorbani\/Raftamo Bare Safar Bastam\/Didi Ke Rosva Shod Delam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Alireza Ghorbani\/Raftamo Bare Safar Bastam\/Didi Ke Rosva Shod Delam [WikiSeda].mp3"},{"id":"140499","type":"song","songname":"\u062a\u0627\u0632\u0631\u0648","popularity":"4.7","ratecount":"3","view":"3950","time":"9:48","mp3":"http:\/\/85.25.95.231\/music\/A\/Alireza Ghorbani\/Raftamo Bare Safar Bastam\/Tazarv [WikiSeda].mp3"},{"id":"140498","type":"song","songname":"\u062d\u0642 \u0646\u0634\u0646\u0627\u0633","popularity":"5","ratecount":"1","view":"4940","time":"8:4","mp3":"http:\/\/85.25.95.231\/music\/A\/Alireza Ghorbani\/Raftamo Bare Safar Bastam\/Hagh Nashenas [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Alireza Ghorbani\/Raftamo Bare Safar Bastam\/Hagh Nashenas [WikiSeda].mp3"},{"id":"140497","type":"song","songname":"\u0628\u06af\u0648 \u0686\u0647 \u06a9\u0646\u0645","popularity":"5","ratecount":"3","view":"6767","time":"6:19","mp3":"http:\/\/85.25.95.231\/music\/A\/Alireza Ghorbani\/Raftamo Bare Safar Bastam\/Bego Che Konam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Alireza Ghorbani\/Raftamo Bare Safar Bastam\/Bego Che Konam [WikiSeda].mp3"},{"id":"140496","type":"song","songname":"\u0631\u0641\u062a\u0645 \u0648 \u0628\u0627\u0631 \u0633\u0641\u0631 \u0628\u0633\u062a\u0645","popularity":"4.9","ratecount":"9","view":"15033","time":"5:43","mp3":"http:\/\/85.25.95.231\/music\/A\/Alireza Ghorbani\/Raftamo Bare Safar Bastam\/Raftamo Bare Safar Bastam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Alireza Ghorbani\/Raftamo Bare Safar Bastam\/Raftamo Bare Safar Bastam [WikiSeda].mp3"}],"year":"1393"},{"id":"9807","type":"album","artist":"\u0633\u0627\u0644\u0627\u0631 \u0639\u0642\u06cc\u0644\u06cc","artist_id":"97","album":"\u0648\u0637\u0646","trackcount":"9","popularity":"4.7","date":"1393-03-31","url":"http:\/\/www.wikiseda.com\/Salar+Aghili\/Vatan","view":"22419","poster":"http:\/\/85.25.243.154\/img\/obldv0b5l4-1403360590.jpg","albumtracks":[{"id":"140456","type":"song","songname":"\u062a\u0635\u0646\u06cc\u0641 \u0648\u0637\u0646","popularity":"3.7","ratecount":"7","view":"5941","time":"5:49","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Vatan\/Tasnif Vatan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Vatan\/Tasnif Vatan [WikiSeda].mp3"},{"id":"140455","type":"song","songname":"\u062a\u0635\u0646\u06cc\u0641 \u06a9\u0645\u0627\u0646\u0686\u0647 2","popularity":"5","ratecount":"1","view":"1454","time":"0:58","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Vatan\/Taknavaziye Kamancheh 2 [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Vatan\/Taknavaziye Kamancheh 2 [WikiSeda].mp3"},{"id":"140454","type":"song","songname":"\u062a\u0635\u0646\u06cc\u0641 \u0622\u0648\u0627\u0632 \u06a9\u0631\u06a9","popularity":"4","ratecount":"3","view":"1598","time":"7:11","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Vatan\/Tasnif Avaze Karak [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Vatan\/Tasnif Avaze Karak [WikiSeda].mp3"},{"id":"140453","type":"song","songname":"\u062a\u06a9\u0646\u0648\u0627\u0632\u06cc \u062a\u0627\u0631","popularity":"5","ratecount":"1","view":"1562","time":"2:42","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Vatan\/Taknavaziye Tar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Vatan\/Taknavaziye Tar [WikiSeda].mp3"},{"id":"140452","type":"song","songname":"\u062a\u0635\u0646\u06cc\u0641 \u0646\u063a\u0645\u0647 \u0647\u0627\u06cc \u0646\u0648\u0631\u0648\u0632\u06cc","popularity":"4.5","ratecount":"2","view":"1703","time":"6:4","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Vatan\/Tasnif Naghmeye Nouroozi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Vatan\/Tasnif Naghmeye Nouroozi [WikiSeda].mp3"},{"id":"140451","type":"song","songname":"\u062a\u06a9\u0646\u0648\u0627\u0632\u06cc \u06a9\u0645\u0627\u0646\u0686\u0647 1","popularity":"5","ratecount":"1","view":"1574","time":"3:17","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Vatan\/Taknavaziye Kamancheh 1 [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Vatan\/Taknavaziye Kamancheh 1 [WikiSeda].mp3"},{"id":"140450","type":"song","songname":"\u062a\u0635\u0646\u06cc\u0641 \u0628\u0648\u06cc \u062e\u0648\u0634 \u0639\u06cc\u062f","popularity":"5","ratecount":"1","view":"1862","time":"5:41","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Vatan\/Tasnif Booye Khoshe Eid [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Vatan\/Tasnif Booye Khoshe Eid [WikiSeda].mp3"},{"id":"140449","type":"song","songname":"\u0633\u0627\u0632 \u0648 \u0622\u0648\u0627\u0632","popularity":"3","ratecount":"2","view":"2393","time":"8:16","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Vatan\/Sazo Avaz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Vatan\/Sazo Avaz [WikiSeda].mp3"},{"id":"140448","type":"song","songname":"\u062a\u0635\u0646\u06cc\u0641 \u0628\u0647\u0627\u0631 \u0622\u0645\u062f","popularity":"5","ratecount":"1","view":"4332","time":"7:20","mp3":"http:\/\/85.25.95.231\/music\/S\/Salar Aghili\/Vatan\/Tasnif Bahar Amad [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Salar Aghili\/Vatan\/Tasnif Bahar Amad [WikiSeda].mp3"}],"year":"1393"},{"id":"9806","type":"album","artist":"\u06cc\u0627\u0633\u0631 \u062f\u0627\u0648\u0648\u062f\u06cc\u0627\u0646","artist_id":"1639","album":"\u0646\u0642\u0637\u0647 \u0636\u0639\u0641","trackcount":"14","popularity":"4","date":"1393-03-31","url":"http:\/\/www.wikiseda.com\/Yaser+Davoudian\/Noghte+Zaf","view":"5414","poster":"http:\/\/85.25.243.154\/img\/hfs45x0ym1-1403351850.jpg","albumtracks":[{"id":"140447","type":"song","songname":"\u06cc\u0647 \u0648\u0642\u062a\u0627\u06cc\u06cc","popularity":"5","ratecount":"2","view":"315","time":"4:44","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yaser Davoudian\/Noghte Zaf\/Ye Vaghtaei [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yaser Davoudian\/Noghte Zaf\/Ye Vaghtaei [WikiSeda].mp3"},{"id":"140446","type":"song","songname":"\u0645\u0645\u0646\u0648\u0646\u0645 \u0627\u0632 \u062a\u0648","popularity":"3","ratecount":"2","view":"252","time":"3:3","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yaser Davoudian\/Noghte Zaf\/Mamnoonam Az To [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yaser Davoudian\/Noghte Zaf\/Mamnoonam Az To [WikiSeda].mp3"},{"id":"140445","type":"song","songname":"\u06cc\u0647 \u0642\u062f\u0645","popularity":"3","ratecount":"1","view":"270","time":"3:52","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yaser Davoudian\/Noghte Zaf\/Ye Ghadam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yaser Davoudian\/Noghte Zaf\/Ye Ghadam [WikiSeda].mp3"},{"id":"140444","type":"song","songname":"\u0648\u0627\u0628\u0633\u062a\u06af\u06cc","popularity":"4","ratecount":"1","view":"275","time":"3:28","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yaser Davoudian\/Noghte Zaf\/Vabastegi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yaser Davoudian\/Noghte Zaf\/Vabastegi [WikiSeda].mp3"},{"id":"140443","type":"song","songname":"\u0647\u06cc\u0686\u06a9\u06cc \u0646\u0641\u0645\u0647","popularity":"3","ratecount":"2","view":"297","time":"3:39","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yaser Davoudian\/Noghte Zaf\/Hichki Nafahme [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yaser Davoudian\/Noghte Zaf\/Hichki Nafahme [WikiSeda].mp3"},{"id":"140442","type":"song","songname":"\u0627\u0646\u06a9\u0627\u0631","popularity":"5","ratecount":"2","view":"230","time":"3:31","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yaser Davoudian\/Noghte Zaf\/Enkar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yaser Davoudian\/Noghte Zaf\/Enkar [WikiSeda].mp3"},{"id":"140441","type":"song","songname":"\u0622\u062e\u0631\u06cc\u0646 \u0639\u06a9\u0633","popularity":"3","ratecount":"2","view":"268","time":"4:43","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yaser Davoudian\/Noghte Zaf\/Akharin Aks [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yaser Davoudian\/Noghte Zaf\/Akharin Aks [WikiSeda].mp3"},{"id":"140440","type":"song","songname":"\u0646\u0645\u06cc\u0634\u0647","popularity":"3","ratecount":"2","view":"242","time":"3:58","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yaser Davoudian\/Noghte Zaf\/Nemishe [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yaser Davoudian\/Noghte Zaf\/Nemishe [WikiSeda].mp3"},{"id":"140439","type":"song","songname":"\u0639\u0630\u0627\u0628","popularity":"0","ratecount":"0","view":"258","time":"4:7","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yaser Davoudian\/Noghte Zaf\/Azab [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yaser Davoudian\/Noghte Zaf\/Azab [WikiSeda].mp3"},{"id":"140438","type":"song","songname":"\u062f\u06cc\u0648\u0648\u0646\u0647 \u0628\u0627\u0632\u06cc","popularity":"5","ratecount":"1","view":"289","time":"2:44","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yaser Davoudian\/Noghte Zaf\/Divoone Bazi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yaser Davoudian\/Noghte Zaf\/Divoone Bazi [WikiSeda].mp3"},{"id":"140437","type":"song","songname":"\u062f\u0627\u0631\u0645 \u062f\u06cc\u0648\u0648\u0646\u0647 \u0645\u06cc\u0634\u0645","popularity":"0","ratecount":"0","view":"363","time":"4:18","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yaser Davoudian\/Noghte Zaf\/Daram Divoone Misham [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yaser Davoudian\/Noghte Zaf\/Daram Divoone Misham [WikiSeda].mp3"},{"id":"140436","type":"song","songname":"\u0642\u0644\u0628 \u0639\u0627\u0634\u0642","popularity":"4","ratecount":"1","view":"437","time":"3:44","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yaser Davoudian\/Noghte Zaf\/Ghalbe Ashegh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yaser Davoudian\/Noghte Zaf\/Ghalbe Ashegh [WikiSeda].mp3"},{"id":"140435","type":"song","songname":"\u0646\u0642\u0637\u0647 \u0636\u0639\u0641","popularity":"3","ratecount":"1","view":"830","time":"4:1","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yaser Davoudian\/Noghte Zaf\/Noghte Zaf [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yaser Davoudian\/Noghte Zaf\/Noghte Zaf [WikiSeda].mp3"},{"id":"140434","type":"song","songname":"\u0639\u0627\u0634\u0642\u062a \u0647\u0633\u062a\u0645","popularity":"2.5","ratecount":"2","view":"1088","time":"3:23","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yaser Davoudian\/Noghte Zaf\/Asheghet Hastam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yaser Davoudian\/Noghte Zaf\/Asheghet Hastam [WikiSeda].mp3"}],"year":"1393"},{"id":"9758","type":"album","artist":"\u067e\u0631\u0648\u0627","artist_id":"2325","album":"\u062e\u0644\u06cc\u062c","trackcount":"9","popularity":"3.5","date":"1393-03-18","url":"http:\/\/www.wikiseda.com\/Parva\/Khalij","view":"12258","poster":"http:\/\/85.25.243.154\/img\/eusj5ggbi1-1402211324.jpg","albumtracks":[{"id":"139648","type":"song","songname":"\u0644\u062d\u0638\u0647 \u0628\u0647 \u0644\u062d\u0638\u0647","popularity":"3.7","ratecount":"7","view":"1139","time":"6:20","mp3":"http:\/\/85.25.95.231\/music\/P\/Parva\/Khalij\/Lahzeh Be Lahzeh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/P\/Parva\/Khalij\/Lahzeh Be Lahzeh [WikiSeda].mp3"},{"id":"139647","type":"song","songname":"\u062d\u0633 \u0627\u0628\u0631\u06cc\u0634\u0645\u06cc","popularity":"1","ratecount":"1","view":"708","time":"5:25","mp3":"http:\/\/85.25.95.231\/music\/P\/Parva\/Khalij\/Hesse Abrishami [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/P\/Parva\/Khalij\/Hesse Abrishami [WikiSeda].mp3"},{"id":"139646","type":"song","songname":"\u0645\u062b\u0644 \u06cc\u0647 \u062c\u0627\u0645 \u0634\u0631\u0627\u0628\u0647","popularity":"3","ratecount":"1","view":"1195","time":"7:2","mp3":"http:\/\/85.25.95.231\/music\/P\/Parva\/Khalij\/Mesle Ye Jame Sharabe [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/P\/Parva\/Khalij\/Mesle Ye Jame Sharabe [WikiSeda].mp3"},{"id":"139645","type":"song","songname":"\u0647\u062c\u0631\u062a","popularity":"0","ratecount":"0","view":"708","time":"3:47","mp3":"http:\/\/85.25.95.231\/music\/P\/Parva\/Khalij\/Hejrat [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/P\/Parva\/Khalij\/Hejrat [WikiSeda].mp3"},{"id":"139644","type":"song","songname":"\u062f\u0631 \u0622\u0633\u0645\u0627\u0646 \u062e\u0633\u062a\u06af\u0627\u0646","popularity":"3.7","ratecount":"3","view":"760","time":"4:42","mp3":"http:\/\/85.25.95.231\/music\/P\/Parva\/Khalij\/Dar Asemane Khastegan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/P\/Parva\/Khalij\/Dar Asemane Khastegan [WikiSeda].mp3"},{"id":"139643","type":"song","songname":"\u0622\u0648\u0627\u0632 \u0627\u0628\u0648\u0639\u0637\u0627","popularity":"0","ratecount":"0","view":"753","time":"6:0","mp3":"http:\/\/85.25.95.231\/music\/P\/Parva\/Khalij\/Avaz Aboo Ata [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/P\/Parva\/Khalij\/Avaz Aboo Ata [WikiSeda].mp3"},{"id":"139642","type":"song","songname":"\u0648\u06cc\u0631\u0627\u0646\u0633\u0631\u0627","popularity":"0","ratecount":"0","view":"854","time":"6:11","mp3":"http:\/\/85.25.95.231\/music\/P\/Parva\/Khalij\/Viransara [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/P\/Parva\/Khalij\/Viransara [WikiSeda].mp3"},{"id":"139641","type":"song","songname":"\u0645\u0646\u0648 \u0646\u0634\u0646\u0627\u062e\u062a\u0647 \u0628\u0648\u062f","popularity":"2","ratecount":"1","view":"1472","time":"5:7","mp3":"http:\/\/85.25.95.231\/music\/P\/Parva\/Khalij\/Mano Nashnakhte Bood [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/P\/Parva\/Khalij\/Mano Nashnakhte Bood [WikiSeda].mp3"},{"id":"139640","type":"song","songname":"\u062e\u0644\u06cc\u062c","popularity":"4.5","ratecount":"2","view":"4669","time":"5:13","mp3":"http:\/\/85.25.95.231\/music\/P\/Parva\/Khalij\/Khalij [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/P\/Parva\/Khalij\/Khalij [WikiSeda].mp3"}],"year":"1393"},{"id":"9756","type":"album","artist":"\u0631\u0636\u0627 \u0635\u0627\u062f\u0642\u06cc","artist_id":"48","album":"\u06cc\u06a9 \u062c\u0631\u0639\u0647 \u0628\u0627\u0631\u0627\u0646","trackcount":"11","popularity":"4.3","date":"1393-03-18","url":"http:\/\/www.wikiseda.com\/reza+sadeghi\/Yek+Joreye+Baran","view":"28734","poster":"http:\/\/85.25.243.154\/img\/ra3a4qh1e2-1402211174.jpg","albumtracks":[{"id":"139673","type":"song","songname":"\u062e\u0627\u06a9 \u0628\u06cc \u062e\u0632\u0627\u0646 \u0628\u06cc \u06a9\u0644\u0627\u0645","popularity":"3.2","ratecount":"6","view":"1516","time":"2:15","mp3":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/Yek Joreye Baran\/Khake Bi Khazaan Bi Kalaam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/reza sadeghi\/Yek Joreye Baran\/Khake Bi Khazaan Bi Kalaam [WikiSeda].mp3"},{"id":"139671","type":"song","songname":"\u0647\u0631 \u0631\u0648\u0632 \u0645\u06cc\u06af\u0647 \u062f\u062e\u062a\u0631\u0645 \u0632\u06cc\u0628\u0627\u0633\u062a","popularity":"4.7","ratecount":"7","view":"2076","time":"4:30","mp3":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/Yek Joreye Baran\/Har Rooz Mige Dokhtaram Zibaast [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/reza sadeghi\/Yek Joreye Baran\/Har Rooz Mige Dokhtaram Zibaast [WikiSeda].mp3"},{"id":"139669","type":"song","songname":"\u0633\u0647\u0645 \u0646\u0633\u0644 \u062a\u0648 \u0627\u0632 \u062c\u0646\u06af","popularity":"5","ratecount":"2","view":"1609","time":"4:14","mp3":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/Yek Joreye Baran\/Sahme Nasle To Az Jang [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/reza sadeghi\/Yek Joreye Baran\/Sahme Nasle To Az Jang [WikiSeda].mp3"},{"id":"139667","type":"song","songname":"\u0622\u0646 \u0628\u0647\u0627\u0631\u06cc \u0628\u0627\u063a \u0647\u0627 \u0648 \u0627\u06cc\u0646 \u0628\u06cc\u0627\u0628\u0627\u0646\u06cc \u0632\u0645\u0633\u062a\u0627\u0646","popularity":"1","ratecount":"1","view":"1685","time":"6:30","mp3":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/Yek Joreye Baran\/Aan Bahari Baghha Va In Biyabani Zemestan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/reza sadeghi\/Yek Joreye Baran\/Aan Bahari Baghha Va In Biyabani Zemestan [WikiSeda].mp3"},{"id":"139665","type":"song","songname":"\u0633\u0646\u06af\u0631 \u0634\u0648\u0646\u0647 \u0647\u0627\u062a","popularity":"3.3","ratecount":"4","view":"1799","time":"4:0","mp3":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/Yek Joreye Baran\/Sangare Shounehaat [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/reza sadeghi\/Yek Joreye Baran\/Sangare Shounehaat [WikiSeda].mp3"},{"id":"139663","type":"song","songname":"\u0686\u0631\u0627 \u062e\u0648\u0646 \u0628\u0647 \u0642\u0648\u0627\u0631\u0647 \u0645\u0627\u0633\u06cc\u062f\u0647 \u0627\u0633\u062a","popularity":"3.8","ratecount":"6","view":"1664","time":"3:55","mp3":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/Yek Joreye Baran\/Chera Khoun Be Gahvareh Masideh Ast [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/reza sadeghi\/Yek Joreye Baran\/Chera Khoun Be Gahvareh Masideh Ast [WikiSeda].mp3"},{"id":"139661","type":"song","songname":"\u0642\u0642\u0646\u0648\u0633","popularity":"5","ratecount":"1","view":"2194","time":"4:35","mp3":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/Yek Joreye Baran\/Ghoghnous [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/reza sadeghi\/Yek Joreye Baran\/Ghoghnous [WikiSeda].mp3"},{"id":"139659","type":"song","songname":"\u0645\u0646 \u062d\u0642\u062a\u0648 \u0627\u0632 \u062c\u0646\u06af \u0645\u06cc\u06af\u06cc\u0631\u0645","popularity":"5","ratecount":"1","view":"2096","time":"4:30","mp3":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/Yek Joreye Baran\/Man Hagheto Az Jang Migiram [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/reza sadeghi\/Yek Joreye Baran\/Man Hagheto Az Jang Migiram [WikiSeda].mp3"},{"id":"139657","type":"song","songname":"\u0641\u062a\u062d \u062e\u06cc\u0628\u0631","popularity":"4.5","ratecount":"2","view":"2194","time":"4:35","mp3":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/Yek Joreye Baran\/Fatehe Kheybar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/reza sadeghi\/Yek Joreye Baran\/Fatehe Kheybar [WikiSeda].mp3"},{"id":"139655","type":"song","songname":"\u062e\u0627\u06a9 \u0628\u06cc \u062e\u0632\u0627\u0646","popularity":"4.3","ratecount":"4","view":"4122","time":"4:10","mp3":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/Yek Joreye Baran\/Khake Bi Khazaan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/reza sadeghi\/Yek Joreye Baran\/Khake Bi Khazaan [WikiSeda].mp3"},{"id":"139653","type":"song","songname":"\u0633\u0627\u062f\u0647 \u062a\u0631 \u0627\u0632 \u0627\u0648\u0646\u06cc \u06a9\u0647 \u0641\u06a9\u0631 \u0645\u06cc \u06a9\u0631\u062f\u0645","popularity":"4.3","ratecount":"4","view":"7779","time":"4:37","mp3":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/Yek Joreye Baran\/Sadeh Tar Az Ouni Ke Fekr Mikardam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/reza sadeghi\/Yek Joreye Baran\/Sadeh Tar Az Ouni Ke Fekr Mikardam [WikiSeda].mp3"}],"year":"1393"},{"id":"9752","type":"album","artist":"\u0634\u0647\u0631\u0632\u0627\u062f \u0633\u067e\u0627\u0646\u0644\u0648","artist_id":"1654","album":"\u0648\u0642\u0641\u0647 \u06cc \u06a9\u0648\u062a\u0627\u0647","trackcount":"9","popularity":"4.8","date":"1393-03-15","url":"http:\/\/www.wikiseda.com\/Shahrzad+Sepanlou\/Vaghfeye+Kootah","view":"17507","poster":"http:\/\/85.25.243.154\/img\/l3eyrntsqb-1401980529.jpg","albumtracks":[{"id":"139567","type":"song","songname":"\u062a\u0627\u0631 \u0647\u06cc\u0686","popularity":"4.3","ratecount":"4","view":"1139","time":"5:6","mp3":"http:\/\/85.25.95.231\/music\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Tar Hich [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Tar Hich [WikiSeda].mp3"},{"id":"139566","type":"song","songname":"\u062e\u062f\u0627\u0647\u0627\u06cc \u0628\u0631\u0627\u0628\u0631","popularity":"4.3","ratecount":"4","view":"1308","time":"4:52","mp3":"http:\/\/85.25.95.231\/music\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Khodaahaaye Baraabar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Khodaahaaye Baraabar [WikiSeda].mp3"},{"id":"139565","type":"song","songname":"\u0627\u0646\u062f\u0648\u0647 \u067e\u0631\u0633\u062a","popularity":"4.5","ratecount":"2","view":"1283","time":"5:3","mp3":"http:\/\/85.25.95.231\/music\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Andooh Parast [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Andooh Parast [WikiSeda].mp3"},{"id":"139564","type":"song","songname":"\u0634\u0647\u0648\u062a \u0645\u0645\u0646\u0648\u0639","popularity":"4.5","ratecount":"4","view":"2178","time":"3:53","mp3":"http:\/\/85.25.95.231\/music\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Shahvate Mamnoo [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Shahvate Mamnoo [WikiSeda].mp3"},{"id":"139563","type":"song","songname":"\u0686\u06cc\u0632\u0627\u06cc \u06a9\u0648\u0686\u06cc\u06a9","popularity":"3.5","ratecount":"6","view":"1366","time":"4:7","mp3":"http:\/\/85.25.95.231\/music\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Chizaaye Koochik [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Chizaaye Koochik [WikiSeda].mp3"},{"id":"139562","type":"song","songname":"\u0639\u0635\u06cc\u0627\u0646","popularity":"5","ratecount":"1","view":"1294","time":"4:25","mp3":"http:\/\/85.25.95.231\/music\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Osyan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Osyan [WikiSeda].mp3"},{"id":"139561","type":"song","songname":"\u062e\u06cc\u0644\u06cc \u062f\u0648\u0631","popularity":"4","ratecount":"2","view":"1591","time":"3:48","mp3":"http:\/\/85.25.95.231\/music\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Kheili Door [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Kheili Door [WikiSeda].mp3"},{"id":"139560","type":"song","songname":"\u0645\u0648\u0633\u0645 \u06af\u0644","popularity":"3.5","ratecount":"4","view":"2023","time":"3:15","mp3":"http:\/\/85.25.95.231\/music\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Moseme Gol [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Moseme Gol [WikiSeda].mp3"},{"id":"139559","type":"song","songname":"\u0648\u0642\u0641\u0647 \u06cc \u06a9\u0648\u062a\u0627\u0647","popularity":"4.3","ratecount":"3","view":"5325","time":"3:34","mp3":"http:\/\/85.25.95.231\/music\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Vaghfeye Kootah [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Shahrzad Sepanlou\/Vaghfeye Kootah\/Vaghfeye Kootah [WikiSeda].mp3"}],"year":"1393"},{"id":"9738","type":"album","artist":"\u0622\u06cc\u0646\u0647","artist_id":"257","album":"\u0627\u0639\u062a\u0631\u0627\u0641","trackcount":"7","popularity":"3.9","date":"1393-03-11","url":"http:\/\/www.wikiseda.com\/Ayene\/Eteraaf","view":"25978","poster":"http:\/\/85.25.243.154\/img\/boq3niok6q-1401706998.jpg","albumtracks":[{"id":"139325","type":"song","songname":"\u067e\u0627\u0634\u0648","popularity":"3.4","ratecount":"10","view":"2874","time":"3:50","mp3":"http:\/\/85.25.95.231\/music\/A\/Ayene\/Eteraaf\/Pasho [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ayene\/Eteraaf\/Pasho [WikiSeda].mp3"},{"id":"139324","type":"song","songname":"\u0627\u0645\u06cc\u062f\u0648\u0627\u0631\u0645","popularity":"3.7","ratecount":"3","view":"2084","time":"3:35","mp3":"http:\/\/85.25.95.231\/music\/A\/Ayene\/Eteraaf\/Omidvaram [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ayene\/Eteraaf\/Omidvaram [WikiSeda].mp3"},{"id":"139323","type":"song","songname":"\u0645\u062d\u0627\u0644\u0647","popularity":"3.7","ratecount":"3","view":"2278","time":"4:14","mp3":"http:\/\/85.25.95.231\/music\/A\/Ayene\/Eteraaf\/Mahaleh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ayene\/Eteraaf\/Mahaleh [WikiSeda].mp3"},{"id":"139322","type":"song","songname":"\u062f\u0648\u0633\u062a \u062f\u0627\u0631\u0645","popularity":"2.6","ratecount":"7","view":"3426","time":"3:56","mp3":"http:\/\/85.25.95.231\/music\/A\/Ayene\/Eteraaf\/Dooset Daram [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ayene\/Eteraaf\/Dooset Daram [WikiSeda].mp3"},{"id":"139321","type":"song","songname":"\u0645\u06cc\u062f\u0648\u0646\u0633\u062a\u06cc","popularity":"3.5","ratecount":"2","view":"2572","time":"4:24","mp3":"http:\/\/85.25.95.231\/music\/A\/Ayene\/Eteraaf\/Midoonesti [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ayene\/Eteraaf\/Midoonesti [WikiSeda].mp3"},{"id":"139320","type":"song","songname":"\u0627\u0639\u062a\u0631\u0627\u0641","popularity":"4.7","ratecount":"6","view":"5453","time":"3:55","mp3":"http:\/\/85.25.95.231\/music\/A\/Ayene\/Eteraaf\/Eteraaf [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ayene\/Eteraaf\/Eteraaf [WikiSeda].mp3"},{"id":"139319","type":"song","songname":"\u0644\u0628\u062e\u0646\u062f","popularity":"3.2","ratecount":"6","view":"7291","time":"3:37","mp3":"http:\/\/85.25.95.231\/music\/A\/Ayene\/Eteraaf\/Labkhand [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ayene\/Eteraaf\/Labkhand [WikiSeda].mp3"}],"year":"1393"},{"id":"9726","type":"album","artist":"\u0645\u062d\u0633\u0646 \u0646\u0627\u0645\u062c\u0648","artist_id":"4710","album":"\u0627\u0632 \u067e\u0648\u0633\u062a \u0646\u0627\u0631\u0646\u06af\u06cc\u062a \u0645\u062f\u062f","trackcount":"10","popularity":"4.5","date":"1393-03-08","url":"http:\/\/www.wikiseda.com\/Mohsen+Namjoo\/Trust+the+Tangerine+Peel","view":"141008","poster":"http:\/\/85.25.243.154\/img\/bjknpxzprk-1401365578.jpg","albumtracks":[{"id":"139152","type":"song","songname":"\u0647\u06cc\u0686\u06cc","popularity":"3.5","ratecount":"8","view":"9359","time":"8:34","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Hichi [WikiSeda].mp3"},{"id":"139151","type":"song","songname":"\u06af\u0644 \u0645\u0645\u062f","popularity":"4.3","ratecount":"18","view":"9713","time":"5:7","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Golmammad [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Golmammad [WikiSeda].mp3"},{"id":"139150","type":"song","songname":"\u0628\u0627\u0631\u0648\u0646","popularity":"4.5","ratecount":"12","view":"9510","time":"5:4","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Baroon [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Baroon [WikiSeda].mp3"},{"id":"139149","type":"song","songname":"\u062f\u0631\u062f\u0627","popularity":"4.4","ratecount":"11","view":"9598","time":"7:37","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Darda [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Darda [WikiSeda].mp3"},{"id":"139148","type":"song","songname":"\u0627\u0628\u0631 \u0627\u06af\u0631","popularity":"4.7","ratecount":"13","view":"9518","time":"2:14","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Abr Agar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Abr Agar [WikiSeda].mp3"},{"id":"139147","type":"song","songname":"\u0646\u0627\u0631\u0646\u06af\u06cc \u062e\u0631\u0627\u0633\u0627\u0646\u06cc","popularity":"4.4","ratecount":"16","view":"12112","time":"8:55","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Narengi Khorassani [WikiSeda].mp3"},{"id":"139146","type":"song","songname":"\u0645\u0646 \u0645\u0633\u062a","popularity":"4.4","ratecount":"12","view":"12495","time":"8:30","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Man Mast [WikiSeda].mp3"},{"id":"139145","type":"song","songname":"\u0622\u062f\u0645 \u067e\u0648\u0686","popularity":"4.7","ratecount":"13","view":"12892","time":"6:51","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Adame Pooch [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Adame Pooch [WikiSeda].mp3"},{"id":"139144","type":"song","songname":"\u0631\u0648 \u062f\u0633\u062a","popularity":"4.3","ratecount":"27","view":"29246","time":"6:33","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Roodast Layla [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Roodast Layla [WikiSeda].mp3"},{"id":"139143","type":"song","songname":"\u0631\u0636\u0627 \u062e\u0627\u0646","popularity":"4","ratecount":"22","view":"26565","time":"5:0","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Reza Khan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen Namjoo\/Trust the Tangerine Peel\/Reza Khan [WikiSeda].mp3"}],"year":"1393"},{"id":"9707","type":"album","artist":"\u0627\u0645\u06cc\u0631 \u062e\u0644\u0648\u062a","artist_id":"761","album":"\u0633\u06cc\u0633","trackcount":"5","popularity":"4.1","date":"1393-03-03","url":"http:\/\/www.wikiseda.com\/Amir+Khalvat\/Sis","view":"27263","poster":"http:\/\/85.25.243.154\/img\/vrj22re89y-1401012392.jpg","albumtracks":[{"id":"138937","type":"song","songname":"\u0627\u06cc\u0646 \u062f\u0648 \u0633\u0647 \u0631\u0648\u0632 (Wantons Ft Arta)","popularity":"3.1","ratecount":"12","view":"4092","time":"4:44","mp3":"http:\/\/85.25.95.231\/music\/A\/Amir Khalvat\/Sis\/Wantons Ft Arta In 2 3 Rouze [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amir Khalvat\/Sis\/Wantons Ft Arta In 2 3 Rouze [WikiSeda].mp3"},{"id":"138930","type":"song","songname":"\u062d\u0633 \u0627\u0645\u0646\u06cc\u062a (Reza Pishro Ft Bigrez )","popularity":"4.6","ratecount":"9","view":"4650","time":"3:20","mp3":"http:\/\/85.25.95.231\/music\/A\/Amir Khalvat\/Sis\/Reza Pishro Ft Bigrez Hesse Amniyat [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amir Khalvat\/Sis\/Reza Pishro Ft Bigrez Hesse Amniyat [WikiSeda].mp3"},{"id":"138923","type":"song","songname":"\u067e\u0631\u0648\u067e\u0627\u0686\u0647 (Leito Ft Khalse)","popularity":"4.3","ratecount":"9","view":"5762","time":"3:9","mp3":"http:\/\/85.25.95.231\/music\/A\/Amir Khalvat\/Sis\/Leito Ft Khalse Paropache [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amir Khalvat\/Sis\/Leito Ft Khalse Paropache [WikiSeda].mp3"},{"id":"138916","type":"song","songname":"\u0642\u0635\u0647 \u06cc \u0645\u0646 (Justina)","popularity":"3.6","ratecount":"7","view":"4771","time":"5:3","mp3":"http:\/\/85.25.95.231\/music\/A\/Amir Khalvat\/Sis\/Justina Ghesseye Man [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amir Khalvat\/Sis\/Justina Ghesseye Man [WikiSeda].mp3"},{"id":"138909","type":"song","songname":"\u0622\u0633\u0645\u0648\u0646 \u0622\u0628\u06cc (Khalvat Ft Sadegh)","popularity":"4.2","ratecount":"12","view":"7988","time":"4:0","mp3":"http:\/\/85.25.95.231\/music\/A\/Amir Khalvat\/Sis\/Amir Khalvat Ft Sadegh Asemoone Abi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amir Khalvat\/Sis\/Amir Khalvat Ft Sadegh Asemoone Abi [WikiSeda].mp3"}],"year":"1393"},{"id":"9698","type":"album","artist":"\u0645\u0648\u0626\u0631","artist_id":"5506","album":"\u0628\u06cc\u062a \u062f\u0627\u0646\u0644\u0648\u062f\u06cc","trackcount":"11","popularity":"4.1","date":"1393-03-02","url":"http:\/\/www.wikiseda.com\/Moer\/Beate+Downloadi","view":"6993","poster":"http:\/\/85.25.243.154\/img\/06c8burs4b-1400826839.jpg","albumtracks":[{"id":"138816","type":"song","songname":"\u062c\u0646\u06af\u062c\u0648","popularity":"0","ratecount":"0","view":"399","time":"4:32","mp3":"http:\/\/85.25.95.231\/music\/M\/Moer\/Beate Downloadi\/Jangjou [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Moer\/Beate Downloadi\/Jangjou [WikiSeda].mp3"},{"id":"138815","type":"song","songname":"\u062c\u0648\u0646 \u0646\u062f\u0627\u0631\u06cc","popularity":"0","ratecount":"0","view":"405","time":"3:2","mp3":"http:\/\/85.25.95.231\/music\/M\/Moer\/Beate Downloadi\/Moer Jun Nadari [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Moer\/Beate Downloadi\/Moer Jun Nadari [WikiSeda].mp3"},{"id":"138814","type":"song","songname":"\u0646\u0627\u0628\u063a\u0647","popularity":"0","ratecount":"0","view":"423","time":"3:36","mp3":"http:\/\/85.25.95.231\/music\/M\/Moer\/Beate Downloadi\/Nabeghe [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Moer\/Beate Downloadi\/Nabeghe [WikiSeda].mp3"},{"id":"138813","type":"song","songname":"\u06a9\u0627\u06cc\u06a9\u0648","popularity":"0","ratecount":"0","view":"393","time":"5:4","mp3":"http:\/\/85.25.95.231\/music\/M\/Moer\/Beate Downloadi\/Kayko [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Moer\/Beate Downloadi\/Kayko [WikiSeda].mp3"},{"id":"138812","type":"song","songname":"\u0633\u06cc\u062a\u06cc\u0632\u0646 \u0641\u0636\u0627\u0645","popularity":"5","ratecount":"1","view":"406","time":"4:20","mp3":"http:\/\/85.25.95.231\/music\/M\/Moer\/Beate Downloadi\/Citizene Fazam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Moer\/Beate Downloadi\/Citizene Fazam [WikiSeda].mp3"},{"id":"138811","type":"song","songname":"\u0646\u0633\u0644 \u0645\u0646","popularity":"5","ratecount":"1","view":"539","time":"3:15","mp3":"http:\/\/85.25.95.231\/music\/M\/Moer\/Beate Downloadi\/Nasle Man [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Moer\/Beate Downloadi\/Nasle Man [WikiSeda].mp3"},{"id":"138810","type":"song","songname":"\u0642\u062f\u0645 \u0628\u0647 \u0642\u062f\u0645","popularity":"5","ratecount":"1","view":"452","time":"3:39","mp3":"http:\/\/85.25.95.231\/music\/M\/Moer\/Beate Downloadi\/Ghadam Be Ghadam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Moer\/Beate Downloadi\/Ghadam Be Ghadam [WikiSeda].mp3"},{"id":"138809","type":"song","songname":"\u0645\u0633\u06cc\u0631\u0627\u0645\u0648\u0646 \u0633\u0648\u0627\u0646","popularity":"5","ratecount":"2","view":"639","time":"5:9","mp3":"http:\/\/85.25.95.231\/music\/M\/Moer\/Beate Downloadi\/Masiramun Savan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Moer\/Beate Downloadi\/Masiramun Savan [WikiSeda].mp3"},{"id":"138808","type":"song","songname":"\u062e\u0633\u062a\u0645","popularity":"3.7","ratecount":"3","view":"829","time":"3:16","mp3":"http:\/\/85.25.95.231\/music\/M\/Moer\/Beate Downloadi\/Khastam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Moer\/Beate Downloadi\/Khastam [WikiSeda].mp3"},{"id":"138807","type":"song","songname":"\u0632\u0646\u062f\u06af\u06cc\u0645\u0647 \u0631\u067e","popularity":"0","ratecount":"0","view":"744","time":"4:24","mp3":"http:\/\/85.25.95.231\/music\/M\/Moer\/Beate Downloadi\/Zendegime Rap [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Moer\/Beate Downloadi\/Zendegime Rap [WikiSeda].mp3"},{"id":"138804","type":"song","songname":"\u0628\u06cc\u062a \u062f\u0627\u0646\u0644\u0648\u062f\u06cc","popularity":"2","ratecount":"1","view":"1764","time":"3:57","mp3":"http:\/\/85.25.95.231\/music\/M\/Moer\/Beate Downloadi\/Beate Downloadi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Moer\/Beate Downloadi\/Beate Downloadi [WikiSeda].mp3"}],"year":"1393"},{"id":"9697","type":"album","artist":"\u0632\u06a9\u06cc \u0634\u0645\u0633 \u0622\u0628\u0627\u062f\u06cc","artist_id":"8715","album":"\u0645\u0631\u062f \u0628\u0627\u0631\u0627\u0646\u06cc","trackcount":"7","popularity":"3.8","date":"1393-03-01","url":"http:\/\/www.wikiseda.com\/Zaki+Shams+Abadi\/Marde+Barooni","view":"2819","poster":"http:\/\/85.25.243.154\/img\/85u0ykgpxm-1400756055.jpg","albumtracks":[{"id":"138794","type":"song","songname":"\u0645\u0633\u0627\u0641\u0631","popularity":"3.5","ratecount":"2","view":"323","time":"3:12","mp3":"http:\/\/85.25.95.231\/music\/Z\/Zaki Shams Abadi\/Marde Barooni\/Mosafer [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Zaki Shams Abadi\/Marde Barooni\/Mosafer [WikiSeda].mp3"},{"id":"138793","type":"song","songname":"\u062a\u0646\u0647\u0627\u06cc\u06cc","popularity":"3","ratecount":"1","view":"330","time":"4:12","mp3":"http:\/\/85.25.95.231\/music\/Z\/Zaki Shams Abadi\/Marde Barooni\/Tanhaei [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Zaki Shams Abadi\/Marde Barooni\/Tanhaei [WikiSeda].mp3"},{"id":"138792","type":"song","songname":"\u0645\u06cc\u0644\u0627\u062f \u0645\u0646","popularity":"0","ratecount":"0","view":"248","time":"3:24","mp3":"http:\/\/85.25.95.231\/music\/Z\/Zaki Shams Abadi\/Marde Barooni\/Milad E Man [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Zaki Shams Abadi\/Marde Barooni\/Milad E Man [WikiSeda].mp3"},{"id":"138791","type":"song","songname":"\u062f\u0644\u0648\u0627\u067e\u0633\u06cc","popularity":"0","ratecount":"0","view":"290","time":"4:15","mp3":"http:\/\/85.25.95.231\/music\/Z\/Zaki Shams Abadi\/Marde Barooni\/Delvapasi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Zaki Shams Abadi\/Marde Barooni\/Delvapasi [WikiSeda].mp3"},{"id":"138790","type":"song","songname":"\u0648\u0642\u062a\u0634\u0647 \u0641\u0631\u06cc\u0627\u062f \u0628\u0632\u0646\u0645","popularity":"3","ratecount":"1","view":"385","time":"3:25","mp3":"http:\/\/85.25.95.231\/music\/Z\/Zaki Shams Abadi\/Marde Barooni\/Vaghteshe Faryad Bezanam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Zaki Shams Abadi\/Marde Barooni\/Vaghteshe Faryad Bezanam [WikiSeda].mp3"},{"id":"138789","type":"song","songname":"\u0628\u06cc \u0647\u0648\u0627","popularity":"0","ratecount":"0","view":"453","time":"2:31","mp3":"http:\/\/85.25.95.231\/music\/Z\/Zaki Shams Abadi\/Marde Barooni\/Bi Hava [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Zaki Shams Abadi\/Marde Barooni\/Bi Hava [WikiSeda].mp3"},{"id":"138788","type":"song","songname":"\u062a\u0648 \u0686\u0634\u0645\u0627\u062a","popularity":"5","ratecount":"1","view":"790","time":"3:47","mp3":"http:\/\/85.25.95.231\/music\/Z\/Zaki Shams Abadi\/Marde Barooni\/To Cheshmat [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Zaki Shams Abadi\/Marde Barooni\/To Cheshmat [WikiSeda].mp3"}],"year":"1393"},{"id":"9691","type":"album","artist":"\u0633\u06cc\u0646\u0627 \u0633\u0631\u0644\u06a9","artist_id":"598","album":"\u0632\u06cc\u0631 \u0628\u0627\u0631\u0627\u0646","trackcount":"8","popularity":"4.4","date":"1393-03-01","url":"http:\/\/www.wikiseda.com\/Sina+Sarlak\/Zire+Baran","view":"10097","poster":"http:\/\/85.25.243.154\/img\/hs1p1bwkdn-1400493038.jpg","albumtracks":[{"id":"138676","type":"song","songname":"\u062a\u0635\u0646\u06cc\u0641 \u0686\u0647 \u0646\u0648\u0631 \u0627\u0633\u062a \u0627\u06cc\u0646","popularity":"4.4","ratecount":"7","view":"873","time":"6:0","mp3":"http:\/\/85.25.95.231\/music\/S\/Sina Sarlak\/Zire Baran\/Tasnife Che Nour Ast In [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Sina Sarlak\/Zire Baran\/Tasnife Che Nour Ast In [WikiSeda].mp3"},{"id":"138675","type":"song","songname":"\u0622\u0648\u0627\u0632 \u062c\u0648\u0627\u0628 \u0622\u0648\u0627\u0632 \u062a\u0627\u0631","popularity":"5","ratecount":"2","view":"894","time":"5:58","mp3":"http:\/\/85.25.95.231\/music\/S\/Sina Sarlak\/Zire Baran\/Avaze Javabe Avaze Tar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Sina Sarlak\/Zire Baran\/Avaze Javabe Avaze Tar [WikiSeda].mp3"},{"id":"138674","type":"song","songname":"\u062a\u0635\u0646\u06cc\u0641 \u062f\u0631 \u0632\u06cc\u0631 \u0628\u0627\u0631\u0627\u0646","popularity":"5","ratecount":"2","view":"1481","time":"5:15","mp3":"http:\/\/85.25.95.231\/music\/S\/Sina Sarlak\/Zire Baran\/Tasnife Dar Zire Baran [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Sina Sarlak\/Zire Baran\/Tasnife Dar Zire Baran [WikiSeda].mp3"},{"id":"138673","type":"song","songname":"\u0628\u0627\u0631\u0627\u0646","popularity":"4.5","ratecount":"4","view":"1615","time":"6:26","mp3":"http:\/\/85.25.95.231\/music\/S\/Sina Sarlak\/Zire Baran\/Baraan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Sina Sarlak\/Zire Baran\/Baraan [WikiSeda].mp3"},{"id":"138672","type":"song","songname":"\u0639\u0627\u0634\u0642\u0627\u0646","popularity":"5","ratecount":"2","view":"1020","time":"5:1","mp3":"http:\/\/85.25.95.231\/music\/S\/Sina Sarlak\/Zire Baran\/Asheghan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Sina Sarlak\/Zire Baran\/Asheghan [WikiSeda].mp3"},{"id":"138671","type":"song","songname":"\u06a9\u0645\u0627\u0646\u0686\u0647","popularity":"4.3","ratecount":"4","view":"861","time":"8:45","mp3":"http:\/\/85.25.95.231\/music\/S\/Sina Sarlak\/Zire Baran\/Kamancheh [WikiSeda].mp3"},{"id":"138670","type":"song","songname":"\u0633\u0646\u062a\u0648\u0631","popularity":"5","ratecount":"1","view":"1040","time":"1:38","mp3":"http:\/\/85.25.95.231\/music\/S\/Sina Sarlak\/Zire Baran\/Santour [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Sina Sarlak\/Zire Baran\/Santour [WikiSeda].mp3"},{"id":"138669","type":"song","songname":"\u0634\u0628","popularity":"5","ratecount":"1","view":"2313","time":"4:20","mp3":"http:\/\/85.25.95.231\/music\/S\/Sina Sarlak\/Zire Baran\/Shab [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Sina Sarlak\/Zire Baran\/Shab [WikiSeda].mp3"}],"year":"1393"},{"id":"9674","type":"album","artist":"\u0628\u0647\u0646\u0627\u0645 \u0635\u0641\u0648\u06cc","artist_id":"147","album":"\u0641\u0648\u0642 \u0627\u0644\u0639\u0627\u062f\u0647","trackcount":"11","popularity":"4.5","date":"1393-02-24","url":"http:\/\/www.wikiseda.com\/Behnam+safavi\/Fogholadeh","view":"144609","poster":"http:\/\/85.25.243.154\/img\/bojg5yvela-1400056957.jpg","albumtracks":[{"id":"138364","type":"song","songname":"\u062e\u0627\u0637\u0631\u0647","popularity":"4.2","ratecount":"29","view":"10663","time":"4:37","mp3":"http:\/\/85.25.95.231\/music\/B\/Behnam safavi\/Fogholadeh\/Khatereh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Behnam safavi\/Fogholadeh\/Khatereh [WikiSeda].mp3"},{"id":"138362","type":"song","songname":"\u0627\u0648\u0644\u06cc\u0646 \u0642\u0631\u0627\u0631","popularity":"3.6","ratecount":"17","view":"9748","time":"4:25","mp3":"http:\/\/85.25.95.231\/music\/B\/Behnam safavi\/Fogholadeh\/Avvalin Gharar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Behnam safavi\/Fogholadeh\/Avvalin Gharar [WikiSeda].mp3"},{"id":"138358","type":"song","songname":"\u0686\u0642\u062f\u0631 \u062e\u0648\u0628\u0647","popularity":"4","ratecount":"20","view":"9681","time":"5:9","mp3":"http:\/\/85.25.95.231\/music\/B\/Behnam safavi\/Fogholadeh\/Cheghad Khoobe [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Behnam safavi\/Fogholadeh\/Cheghad Khoobe [WikiSeda].mp3"},{"id":"138357","type":"song","songname":"\u0633\u0648\u0621 \u062a\u0641\u0627\u0647\u0645","popularity":"4.1","ratecount":"12","view":"8953","time":"4:1","mp3":"http:\/\/85.25.95.231\/music\/B\/Behnam safavi\/Fogholadeh\/Soe Tafahom [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Behnam safavi\/Fogholadeh\/Soe Tafahom [WikiSeda].mp3"},{"id":"138352","type":"song","songname":"\u0686\u0646\u062f \u0628\u0627\u0631 \u0639\u0627\u0634\u0642 \u0634\u062f\u06cc","popularity":"3.8","ratecount":"12","view":"10840","time":"3:51","mp3":"http:\/\/85.25.95.231\/music\/B\/Behnam safavi\/Fogholadeh\/Chand Bar Ashegh Shodi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Behnam safavi\/Fogholadeh\/Chand Bar Ashegh Shodi [WikiSeda].mp3"},{"id":"138351","type":"song","songname":"\u0631\u0641\u06cc\u0642\u0645 \u0628\u0627\u0634","popularity":"3.7","ratecount":"15","view":"10743","time":"4:50","mp3":"http:\/\/85.25.95.231\/music\/B\/Behnam safavi\/Fogholadeh\/Rafigham Bash [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Behnam safavi\/Fogholadeh\/Rafigham Bash [WikiSeda].mp3"},{"id":"138350","type":"song","songname":"\u06cc\u0627\u062f\u062a\u0647","popularity":"4.3","ratecount":"12","view":"11046","time":"4:24","mp3":"http:\/\/85.25.95.231\/music\/B\/Behnam safavi\/Fogholadeh\/Yadete [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Behnam safavi\/Fogholadeh\/Yadete [WikiSeda].mp3"},{"id":"138342","type":"song","songname":"\u0628\u06af\u0648 \u0622\u0631\u0647","popularity":"3.8","ratecount":"10","view":"12732","time":"3:19","mp3":"http:\/\/85.25.95.231\/music\/B\/Behnam safavi\/Fogholadeh\/Begoo Are [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Behnam safavi\/Fogholadeh\/Begoo Are [WikiSeda].mp3"},{"id":"138341","type":"song","songname":"\u0622\u0634\u062a\u06cc","popularity":"3.9","ratecount":"8","view":"13200","time":"3:31","mp3":"http:\/\/85.25.95.231\/music\/B\/Behnam safavi\/Fogholadeh\/Ashti [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Behnam safavi\/Fogholadeh\/Ashti [WikiSeda].mp3"},{"id":"138340","type":"song","songname":"\u0641\u0647\u0645\u06cc\u062f","popularity":"4.5","ratecount":"19","view":"16508","time":"4:5","mp3":"http:\/\/85.25.95.231\/music\/B\/Behnam safavi\/Fogholadeh\/Fahmid [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Behnam safavi\/Fogholadeh\/Fahmid [WikiSeda].mp3"},{"id":"138337","type":"song","songname":"\u0641\u0648\u0642 \u0627\u0644\u0639\u0627\u062f\u0647","popularity":"4.4","ratecount":"34","view":"30495","time":"4:2","mp3":"http:\/\/85.25.95.231\/music\/B\/Behnam safavi\/Fogholadeh\/Fogholadeh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Behnam safavi\/Fogholadeh\/Fogholadeh [WikiSeda].mp3"}],"year":"1393"},{"id":"9658","type":"album","artist":"\u0632\u062f \u0628\u0627\u0632\u06cc","artist_id":"98","album":"\u0633\u0631\u0645\u0627\u06cc\u0647 \u06f1","trackcount":"10","popularity":"4.1","date":"1393-02-20","url":"http:\/\/www.wikiseda.com\/Z+bazi\/Sarmaaye+1","view":"125281","poster":"http:\/\/85.25.243.154\/img\/kvrqrxo1zy-1399735658.jpg","albumtracks":[{"id":"138170","type":"song","songname":"\u062f\u0631\u062f\u0633\u0631","popularity":"4.1","ratecount":"11","view":"9174","time":"5:22","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Sarmaaye 1\/Saman Zj Dardesar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Sarmaaye 1\/Saman Zj Dardesar [WikiSeda].mp3"},{"id":"138169","type":"song","songname":"\u0631\u0648\u0632\u0627\u06cc \u0633\u0631\u062f","popularity":"4.6","ratecount":"11","view":"9793","time":"4:32","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Sarmaaye 1\/Raga Roozaye Sard [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Sarmaaye 1\/Raga Roozaye Sard [WikiSeda].mp3"},{"id":"138168","type":"song","songname":"\u0646\u0631\u062f\u0628\u0648\u0646","popularity":"4.5","ratecount":"8","view":"8336","time":"4:10","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Sarmaaye 1\/Milad S Nardeboon [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Sarmaaye 1\/Milad S Nardeboon [WikiSeda].mp3"},{"id":"138167","type":"song","songname":"\u0646\u06cc\u0633\u062a \u06a9\u0633\u06cc","popularity":"5","ratecount":"4","view":"8700","time":"4:24","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Sarmaaye 1\/Iman Beta Nist Kesi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Sarmaaye 1\/Iman Beta Nist Kesi [WikiSeda].mp3"},{"id":"138166","type":"song","songname":"\u0634\u0639\u0644\u0647","popularity":"4.5","ratecount":"10","view":"9250","time":"4:0","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Sarmaaye 1\/Budo Shole [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Sarmaaye 1\/Budo Shole [WikiSeda].mp3"},{"id":"138165","type":"song","songname":"\u0646\u0645\u06cc\u062f\u0648\u0646\u0647 \u0645\u0646 \u06a9\u06cc \u0627\u0645","popularity":"5","ratecount":"7","view":"10615","time":"4:8","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Sarmaaye 1\/Amir Kabir Nemidoone Man Kiam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Sarmaaye 1\/Amir Kabir Nemidoone Man Kiam [WikiSeda].mp3"},{"id":"138164","type":"song","songname":"\u0641\u06a9 \u06a9\u0646","popularity":"4.9","ratecount":"10","view":"11119","time":"6:24","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Sarmaaye 1\/Amin Big A Fekon [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Sarmaaye 1\/Amin Big A Fekon [WikiSeda].mp3"},{"id":"138163","type":"song","songname":"\u0645\u0646\u0641\u06cc \u06cc\u06a9","popularity":"3.9","ratecount":"7","view":"13035","time":"6:1","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Sarmaaye 1\/Amayar Manfiye Yek [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Sarmaaye 1\/Amayar Manfiye Yek [WikiSeda].mp3"},{"id":"138162","type":"song","songname":"\u062f\u0633\u062a\u062a\u0648 \u0645\u06cc\u06af\u06cc\u0631\u0645","popularity":"4.6","ratecount":"12","view":"17264","time":"7:43","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Sarmaaye 1\/Amayar Dastaato Migiram [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Sarmaaye 1\/Amayar Dastaato Migiram [WikiSeda].mp3"},{"id":"138161","type":"song","songname":"\u0633\u0631\u06af\u06cc\u062c\u0647","popularity":"3.9","ratecount":"18","view":"27995","time":"4:16","mp3":"http:\/\/85.25.95.231\/music\/Z\/Z bazi\/Sarmaaye 1\/Acepik Sargije [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Z\/Z bazi\/Sarmaaye 1\/Acepik Sargije [WikiSeda].mp3"}],"year":"1393"},{"id":"9657","type":"album","artist":"\u0639\u0644\u06cc \u0642\u0645\u0635\u0631\u06cc","artist_id":"8321","album":"\u0633\u062e\u0646\u06cc \u0646\u06cc\u0633\u062a","trackcount":"8","popularity":"4","date":"1393-02-20","url":"http:\/\/www.wikiseda.com\/Ali+Ghamsari\/Sokhani+Nist","view":"6477","poster":"http:\/\/85.25.243.154\/img\/wd4e5e3jip-1399708184.jpg","albumtracks":[{"id":"138141","type":"song","songname":"\u0628\u06cc \u0642\u0631\u0627\u0631","popularity":"4.5","ratecount":"2","view":"689","time":"11:8","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ghamsari\/Sokhani Nist\/Bi Gharar [WikiSeda].mp3"},{"id":"138140","type":"song","songname":"\u0633\u062e\u0646\u06cc \u0646\u06cc\u0633\u062a","popularity":"4","ratecount":"3","view":"917","time":"11:6","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ghamsari\/Sokhani Nist\/Sokhani Nist [WikiSeda].mp3"},{"id":"138139","type":"song","songname":"\u0627\u0631\u0627\u062f\u0647","popularity":"0","ratecount":"0","view":"547","time":"2:20","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ghamsari\/Sokhani Nist\/Eradeh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ghamsari\/Sokhani Nist\/Eradeh [WikiSeda].mp3"},{"id":"138138","type":"song","songname":"\u0622\u06cc\u0646\u0647","popularity":"5","ratecount":"1","view":"635","time":"6:49","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ghamsari\/Sokhani Nist\/Ayeneh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ghamsari\/Sokhani Nist\/Ayeneh [WikiSeda].mp3"},{"id":"138137","type":"song","songname":"\u0644\u06a9\u0647 \u0647\u0627\u06cc \u0628\u06cc \u0631\u0646\u06af","popularity":"4","ratecount":"2","view":"635","time":"7:33","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ghamsari\/Sokhani Nist\/Lakkeh Haye Bi Rang [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ghamsari\/Sokhani Nist\/Lakkeh Haye Bi Rang [WikiSeda].mp3"},{"id":"138136","type":"song","songname":"\u062a\u0646\u0647\u0627\u06cc\u06cc \u0645\u0627","popularity":"5","ratecount":"1","view":"766","time":"4:58","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ghamsari\/Sokhani Nist\/Tanhaeiye Ma [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ghamsari\/Sokhani Nist\/Tanhaeiye Ma [WikiSeda].mp3"},{"id":"138135","type":"song","songname":"\u0646\u0633\u0644 \u0645\u0627","popularity":"4","ratecount":"2","view":"888","time":"1:42","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ghamsari\/Sokhani Nist\/Nasle Ma [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ghamsari\/Sokhani Nist\/Nasle Ma [WikiSeda].mp3"},{"id":"138134","type":"song","songname":"\u0634\u0639\u0631 \u0628\u06cc \u0648\u0627\u0698\u0647","popularity":"5","ratecount":"1","view":"1400","time":"2:18","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Ghamsari\/Sokhani Nist\/Sheer Bi Vazheh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Ghamsari\/Sokhani Nist\/Sheer Bi Vazheh [WikiSeda].mp3"}],"year":"1393"},{"id":"9645","type":"album","artist":"\u062d\u0633\u06cc\u0646 \u0639\u0644\u06cc\u0632\u0627\u062f\u0647","artist_id":"2685","album":"\u0628\u0627\u062f\u0647 \u062a\u0648\u06cc\u06cc","trackcount":"7","popularity":"4.7","date":"1393-02-17","url":"http:\/\/www.wikiseda.com\/Hoseyn+Alizade\/Baade+Toei","view":"15891","poster":"http:\/\/85.25.243.154\/img\/ivqvder5rc-1399487862.jpg","albumtracks":[{"id":"137979","type":"song","songname":"\u0645\u062b\u0646\u0648\u06cc","popularity":"5","ratecount":"4","view":"1531","time":"15:11","mp3":"http:\/\/85.25.95.231\/music\/H\/Hoseyn Alizade\/Baade Toei\/Masnavi [WikiSeda].mp3"},{"id":"137978","type":"song","songname":"\u0628\u0627\u062f\u0647 \u062a\u0648\u06cc\u06cc","popularity":"5","ratecount":"3","view":"3028","time":"8:0","mp3":"http:\/\/85.25.95.231\/music\/H\/Hoseyn Alizade\/Baade Toei\/Badeh Toei [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Hoseyn Alizade\/Baade Toei\/Badeh Toei [WikiSeda].mp3"},{"id":"137977","type":"song","songname":"\u0647\u0646\u06af\u0627\u0645","popularity":"5","ratecount":"1","view":"1503","time":"7:24","mp3":"http:\/\/85.25.95.231\/music\/H\/Hoseyn Alizade\/Baade Toei\/Hengam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Hoseyn Alizade\/Baade Toei\/Hengam [WikiSeda].mp3"},{"id":"137976","type":"song","songname":"\u0646\u063a\u0645\u0647 \u0647\u0627\u06cc \u062c\u0627\u0646\u0633\u0648\u0632","popularity":"5","ratecount":"1","view":"1727","time":"5:28","mp3":"http:\/\/85.25.95.231\/music\/H\/Hoseyn Alizade\/Baade Toei\/Naghmehaye Jansooz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Hoseyn Alizade\/Baade Toei\/Naghmehaye Jansooz [WikiSeda].mp3"},{"id":"137975","type":"song","songname":"\u0628\u062f\u0627\u0647\u0647 \u0646\u0648\u0627\u0632\u06cc \u0633\u0647 \u062a\u0627\u0631","popularity":"3.7","ratecount":"3","view":"1886","time":"3:40","mp3":"http:\/\/85.25.95.231\/music\/H\/Hoseyn Alizade\/Baade Toei\/Bedahe Navazi Setar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Hoseyn Alizade\/Baade Toei\/Bedahe Navazi Setar [WikiSeda].mp3"},{"id":"137974","type":"song","songname":"\u0633\u0631\u0645\u0633\u062a","popularity":"3","ratecount":"4","view":"2308","time":"4:48","mp3":"http:\/\/85.25.95.231\/music\/H\/Hoseyn Alizade\/Baade Toei\/Sarmast [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Hoseyn Alizade\/Baade Toei\/Sarmast [WikiSeda].mp3"},{"id":"137973","type":"song","songname":"\u0633\u0645\u0627","popularity":"5","ratecount":"1","view":"3908","time":"8:3","mp3":"http:\/\/85.25.95.231\/music\/H\/Hoseyn Alizade\/Baade Toei\/Sama [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Hoseyn Alizade\/Baade Toei\/Sama [WikiSeda].mp3"}],"year":"1393"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    } else {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"140785","type":"song","artist":"Amin Hayaei","artist_id":"12201","songname":"Owje Parvaz","popularity":"3.8","ratecount":"8","view":"2205","time":"5:22","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/gq9zswptj-1404332339.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/Gallery\/[Medium]\/qixdrptt-1404332339.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amin+Hayaei\/-\/Owje+Parvaz","mp3":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3"},{"id":"140782","type":"song","artist":"Bakhtak Band","artist_id":"11623","songname":"Dame Sobh","popularity":"2.6","ratecount":"8","view":"2966","time":"3:27","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/1spygoohm-1404322313.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/Gallery\/[Medium]\/hxb0sre5-1404322313.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/-\/Dame+Sobh","mp3":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3"},{"id":"9826","type":"album","artist":"Mohsen-sharifian","artist_id":"631","album":"Dingue Marrow","trackcount":"9","popularity":"5","date":"1393-04-14","url":"http:\/\/www.wikiseda.com\/Mohsen-sharifian\/Dingue+Marrow","view":"551","poster":"http:\/\/85.25.243.154\/img\/un79cef6qp-1404554657.jpg","year":"1393"},{"id":"9821","type":"album","artist":"O-hum","artist_id":"3927","album":"Hafez In Love","trackcount":"4","popularity":"5","date":"1393-04-08","url":"http:\/\/www.wikiseda.com\/O-hum\/Hafez+In+Love","view":"1756","poster":"http:\/\/85.25.243.154\/img\/1xxwe9fwdz-1404025213.jpg","year":"1393"},{"id":"9809","type":"album","artist":"Alireza Ghorbani","artist_id":"472","album":"Raftamo Bare Safar Bastam","trackcount":"6","popularity":"4.7","date":"1393-04-02","url":"http:\/\/www.wikiseda.com\/Alireza+Ghorbani\/Raftamo+Bare+Safar+Bastam","view":"18170","poster":"http:\/\/85.25.243.154\/img\/pf2m3p18sw-1403542665.jpg","year":"1393"},{"id":"9807","type":"album","artist":"Salar Aghili","artist_id":"97","album":"Vatan","trackcount":"9","popularity":"4.8","date":"1393-03-31","url":"http:\/\/www.wikiseda.com\/Salar+Aghili\/Vatan","view":"10829","poster":"http:\/\/85.25.243.154\/img\/obldv0b5l4-1403360590.jpg","year":"1393"},{"id":"4023","type":"video","artist":"Matin do hanjare","poster":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/[Gallery]\/8c1e2f4f65d428d910ece8e1c83cbc26-3.jpg","time":"3:2","videoname":"Marg Bar Man","lowq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-h.mp4","popularity":"3.8","view":"2292","url":"http:\/\/www.wikiseda.com\/Matin+do+hanjare\/+video\/Marg+Bar+Man","year":"1393"},{"id":"4022","type":"video","artist":"Amir Farjam","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/[Gallery]\/5fddee48dfa042d0664b066720a71bda-3.jpg","time":"3:32","videoname":"KHodaya","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-h.mp4","popularity":"5","view":"1769","url":"http:\/\/www.wikiseda.com\/Amir+Farjam\/+video\/KHodaya","year":"1393"},{"id":"4021","type":"video","artist":"Emo Band","poster":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/[Gallery]\/6ab639b8fef2f4fe7f9841d6f8d9f70d-3.jpg","time":"4:34","videoname":"Donyamo Live","lowq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-l.mp4","highq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-h.mp4","popularity":"4.1","view":"1728","url":"http:\/\/www.wikiseda.com\/Emo+Band\/+video\/Donyamo+Live","year":"1393"},{"id":"4019","type":"video","artist":"Amir Tataloo","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/[Gallery]\/d2931b538ae36b30847c9c139610311a-3.jpg","time":"3:29","videoname":"Baa To","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-h.mp4","popularity":"4.2","view":"10730","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/+video\/Baa+To","year":"1393"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    }
    if (this.option === 'search') {
      return console.log('Search');
    }
  };

  AlbumModel.prototype.loadmore = function() {
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

  AlbumModel.prototype.refresh = function() {
    if (this.loading === true) {
      return;
    }
    this._emit('refresh');
    return this.get();
  };

  AlbumModel.prototype.setOption = function(option) {
    this.option = option;
    if (this.loading === true) {
      return;
    }
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
    this.loading = false;
  }

  ArtistModel.prototype.get = function() {
    if (this.loading === true) {
      return;
    }
    this.loading = true;
    if (this.option === 0) {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"206","type":"artist","artist":"Moein","artist_id":"206","fans":"5191","url":"http:\/\/www.wikiseda.com\/Moein","poster":"http:\/\/85.25.243.154\/thumb_image\/Moein.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Moein-thumb.jpg","following":0},{"id":"56","type":"artist","artist":"ebi","artist_id":"56","fans":"6239","url":"http:\/\/www.wikiseda.com\/ebi","poster":"http:\/\/85.25.243.154\/thumb_image\/ebi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/ebi-thumb.jpg","following":0},{"id":"54","type":"artist","artist":"darush","artist_id":"54","fans":"6928","url":"http:\/\/www.wikiseda.com\/darush","poster":"http:\/\/85.25.243.154\/thumb_image\/darush.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/darush-thumb.jpg","following":0},{"id":"76","type":"artist","artist":"Shadmehr","artist_id":"76","fans":"7814","url":"http:\/\/www.wikiseda.com\/Shadmehr","poster":"http:\/\/85.25.243.154\/thumb_image\/Shadmehr.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Shadmehr-thumb.jpg","following":0},{"id":"47","type":"artist","artist":"siavash ghomayshi","artist_id":"47","fans":"6501","url":"http:\/\/www.wikiseda.com\/siavash+ghomayshi","poster":"http:\/\/85.25.243.154\/thumb_image\/siavash ghomayshi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/siavash ghomayshi-thumb.jpg","following":0},{"id":"198","type":"artist","artist":"mohsen yegane","artist_id":"198","fans":"4363","url":"http:\/\/www.wikiseda.com\/mohsen+yegane","poster":"http:\/\/85.25.243.154\/thumb_image\/mohsen yegane.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/mohsen yegane-thumb.jpg","following":0},{"id":"140","type":"artist","artist":"Yas","artist_id":"140","fans":"6611","url":"http:\/\/www.wikiseda.com\/Yas","poster":"http:\/\/85.25.243.154\/thumb_image\/Yas.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Yas-thumb.jpg","following":0},{"id":"72","type":"artist","artist":"Googoosh","artist_id":"72","fans":"3486","url":"http:\/\/www.wikiseda.com\/Googoosh","poster":"http:\/\/85.25.243.154\/thumb_image\/Googoosh.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Googoosh-thumb.jpg","following":0},{"id":"66","type":"artist","artist":"Amir Tataloo","artist_id":"66","fans":"2636","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo","poster":"http:\/\/85.25.243.154\/thumb_image\/Amir Tataloo.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Amir Tataloo-thumb.jpg","following":1},{"id":"168","type":"artist","artist":"Hayede","artist_id":"168","fans":"2853","url":"http:\/\/www.wikiseda.com\/Hayede","poster":"http:\/\/85.25.243.154\/thumb_image\/Hayede.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Hayede-thumb.jpg","following":0},{"id":"122","type":"artist","artist":"Morteza pashaei","artist_id":"122","fans":"2339","url":"http:\/\/www.wikiseda.com\/Morteza+pashaei","poster":"http:\/\/85.25.243.154\/thumb_image\/Morteza pashaei.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Morteza pashaei-thumb.jpg","following":0},{"id":"55","type":"artist","artist":"Mohsen Chavoshi","artist_id":"55","fans":"4209","url":"http:\/\/www.wikiseda.com\/Mohsen+Chavoshi","poster":"http:\/\/85.25.243.154\/thumb_image\/Mohsen Chavoshi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Mohsen Chavoshi-thumb.jpg","following":0},{"id":"177","type":"artist","artist":"Majid Kharatha","artist_id":"177","fans":"3631","url":"http:\/\/www.wikiseda.com\/Majid+Kharatha","poster":"http:\/\/85.25.243.154\/thumb_image\/Majid Kharatha.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Majid Kharatha-thumb.jpg","following":0},{"id":"201","type":"artist","artist":"mahasti","artist_id":"201","fans":"1730","url":"http:\/\/www.wikiseda.com\/mahasti","poster":"http:\/\/85.25.243.154\/thumb_image\/mahasti.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/mahasti-thumb.jpg","following":0},{"id":"58","type":"artist","artist":"Ehsan khaje amiri","artist_id":"58","fans":"4932","url":"http:\/\/www.wikiseda.com\/Ehsan+khaje+amiri","poster":"http:\/\/85.25.243.154\/thumb_image\/Ehsan khaje amiri.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Ehsan khaje amiri-thumb.jpg","following":0},{"id":"67","type":"artist","artist":"Andy","artist_id":"67","fans":"978","url":"http:\/\/www.wikiseda.com\/Andy","poster":"http:\/\/85.25.243.154\/thumb_image\/Andy.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Andy-thumb.jpg","following":0},{"id":"48","type":"artist","artist":"reza sadeghi","artist_id":"48","fans":"2524","url":"http:\/\/www.wikiseda.com\/reza+sadeghi","poster":"http:\/\/85.25.243.154\/thumb_image\/reza sadeghi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/reza sadeghi-thumb.jpg","following":0},{"id":"200","type":"artist","artist":"shohre","artist_id":"200","fans":"580","url":"http:\/\/www.wikiseda.com\/shohre","poster":"http:\/\/85.25.243.154\/thumb_image\/shohre.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/shohre-thumb.jpg","following":0},{"id":"199","type":"artist","artist":"leila","artist_id":"199","fans":"1022","url":"http:\/\/www.wikiseda.com\/leila","poster":"http:\/\/85.25.243.154\/thumb_image\/leila.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/leila-thumb.jpg","following":0},{"id":"74","type":"artist","artist":"maziyar falahi","artist_id":"74","fans":"2938","url":"http:\/\/www.wikiseda.com\/maziyar+falahi","poster":"http:\/\/85.25.243.154\/thumb_image\/maziyar falahi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/maziyar falahi-thumb.jpg","following":0},{"id":"833","type":"artist","artist":"Mehdi Ahmadvand","artist_id":"833","fans":"2145","url":"http:\/\/www.wikiseda.com\/Mehdi+Ahmadvand","poster":"http:\/\/85.25.243.154\/thumb_image\/Mehdi Ahmadvand.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Mehdi Ahmadvand-thumb.jpg","following":0},{"id":"82","type":"artist","artist":"armin 2afm","artist_id":"82","fans":"1476","url":"http:\/\/www.wikiseda.com\/armin+2afm","poster":"http:\/\/85.25.243.154\/thumb_image\/armin 2afm.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/armin 2afm-thumb.jpg","following":0},{"id":"98","type":"artist","artist":"Z bazi","artist_id":"98","fans":"1695","url":"http:\/\/www.wikiseda.com\/Z+bazi","poster":"http:\/\/85.25.243.154\/thumb_image\/Z bazi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Z bazi-thumb.jpg","following":0},{"id":"60","type":"artist","artist":"Ali Abdolmaleki","artist_id":"60","fans":"2238","url":"http:\/\/www.wikiseda.com\/Ali+Abdolmaleki","poster":"http:\/\/85.25.243.154\/thumb_image\/Ali Abdolmaleki.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Ali Abdolmaleki-thumb.jpg","following":0},{"id":"1458","type":"artist","artist":"Shahram Shokoohi","artist_id":"1458","fans":"2822","url":"http:\/\/www.wikiseda.com\/Shahram+Shokoohi","poster":"http:\/\/85.25.243.154\/thumb_image\/Shahram Shokoohi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Shahram Shokoohi-thumb.jpg","following":0},{"id":"84","type":"artist","artist":"Shahin Najafi","artist_id":"84","fans":"3888","url":"http:\/\/www.wikiseda.com\/Shahin+Najafi","poster":"http:\/\/85.25.243.154\/thumb_image\/Shahin Najafi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Shahin Najafi-thumb.jpg","following":0},{"id":"57","type":"artist","artist":"Omid","artist_id":"57","fans":"1653","url":"http:\/\/www.wikiseda.com\/Omid","poster":"http:\/\/85.25.243.154\/thumb_image\/Omid.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Omid-thumb.jpg","following":0},{"id":"128","type":"artist","artist":"mansour","artist_id":"128","fans":"1890","url":"http:\/\/www.wikiseda.com\/mansour","poster":"http:\/\/85.25.243.154\/thumb_image\/mansour.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/mansour-thumb.jpg","following":0},{"id":"319","type":"artist","artist":"Shahram Shabpare","artist_id":"319","fans":"628","url":"http:\/\/www.wikiseda.com\/Shahram+Shabpare","poster":"http:\/\/85.25.243.154\/thumb_image\/Shahram Shabpare.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Shahram Shabpare-thumb.jpg","following":0},{"id":"77","type":"artist","artist":"Sataar","artist_id":"77","fans":"880","url":"http:\/\/www.wikiseda.com\/Sataar","poster":"http:\/\/85.25.243.154\/thumb_image\/Sataar.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Sataar-thumb.jpg","following":0}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    } else {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"482","type":"artist","artist":"Bahram","artist_id":"482","fans":"1953","url":"http:\/\/www.wikiseda.com\/Bahram","poster":"http:\/\/85.25.243.154\/thumb_image\/Bahram.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Bahram-thumb.jpg","following":0},{"id":"255","type":"artist","artist":"Babak Jahan Bakhsh","artist_id":"255","fans":"1447","url":"http:\/\/www.wikiseda.com\/Babak+Jahan+Bakhsh","poster":"http:\/\/85.25.243.154\/thumb_image\/Babak Jahan Bakhsh.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Babak Jahan Bakhsh-thumb.jpg","following":0},{"id":"147","type":"artist","artist":"Behnam safavi","artist_id":"147","fans":"1371","url":"http:\/\/www.wikiseda.com\/Behnam+safavi","poster":"http:\/\/85.25.243.154\/thumb_image\/Behnam safavi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Behnam safavi-thumb.jpg","following":0},{"id":"151","type":"artist","artist":"barobax","artist_id":"151","fans":"860","url":"http:\/\/www.wikiseda.com\/barobax","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/barobax-thumb.jpg","following":0},{"id":"5699","type":"artist","artist":"Baran","artist_id":"5699","fans":"852","url":"http:\/\/www.wikiseda.com\/Baran","poster":"http:\/\/85.25.243.154\/thumb_image\/Baran.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Baran-thumb.jpg","following":0},{"id":"71","type":"artist","artist":"Benyamin","artist_id":"71","fans":"689","url":"http:\/\/www.wikiseda.com\/Benyamin","poster":"http:\/\/85.25.243.154\/thumb_image\/Benyamin.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Benyamin-thumb.jpg","following":0},{"id":"50","type":"artist","artist":"Bijan mortazavi","artist_id":"50","fans":"615","url":"http:\/\/www.wikiseda.com\/Bijan+mortazavi","poster":"http:\/\/85.25.243.154\/thumb_image\/Bijan mortazavi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Bijan mortazavi-thumb.jpg","following":0},{"id":"7318","type":"artist","artist":"Babak Nahrein","artist_id":"7318","fans":"437","url":"http:\/\/www.wikiseda.com\/Babak+Nahrein","poster":"http:\/\/85.25.243.154\/thumb_image\/Babak Nahrein.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Babak Nahrein-thumb.jpg","following":0},{"id":"159","type":"artist","artist":"behzad paks","artist_id":"159","fans":"236","url":"http:\/\/www.wikiseda.com\/behzad+paks","poster":"http:\/\/85.25.243.154\/thumb_image\/behzad paks.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/behzad paks-thumb.jpg","following":0},{"id":"180","type":"artist","artist":"barad","artist_id":"180","fans":"234","url":"http:\/\/www.wikiseda.com\/barad","poster":"http:\/\/85.25.243.154\/thumb_image\/barad.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/barad-thumb.jpg","following":0},{"id":"5174","type":"artist","artist":"Babak Saeedi","artist_id":"5174","fans":"208","url":"http:\/\/www.wikiseda.com\/Babak+Saeedi","poster":"http:\/\/85.25.243.154\/thumb_image\/Babak Saeedi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Babak Saeedi-thumb.jpg","following":0},{"id":"796","type":"artist","artist":"Black Cats","artist_id":"796","fans":"194","url":"http:\/\/www.wikiseda.com\/Black+Cats","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Black Cats-thumb.jpg","following":0},{"id":"3206","type":"artist","artist":"Behzad Leito","artist_id":"3206","fans":"192","url":"http:\/\/www.wikiseda.com\/Behzad+Leito","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Behzad Leito-thumb.jpg","following":0},{"id":"253","type":"artist","artist":"Babak Rahnama","artist_id":"253","fans":"192","url":"http:\/\/www.wikiseda.com\/Babak+Rahnama","poster":"http:\/\/85.25.243.154\/thumb_image\/Babak Rahnama.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Babak Rahnama-thumb.jpg","following":0},{"id":"288","type":"artist","artist":"Banan","artist_id":"288","fans":"172","url":"http:\/\/www.wikiseda.com\/Banan","poster":"http:\/\/85.25.243.154\/thumb_image\/Banan.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Banan-thumb.jpg","following":0},{"id":"693","type":"artist","artist":"Behnam Alamshahi","artist_id":"693","fans":"122","url":"http:\/\/www.wikiseda.com\/Behnam+Alamshahi","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Behnam Alamshahi-thumb.jpg","following":0},{"id":"5110","type":"artist","artist":"Babak Bayat","artist_id":"5110","fans":"120","url":"http:\/\/www.wikiseda.com\/Babak+Bayat","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Babak Bayat-thumb.jpg","following":0},{"id":"3937","type":"artist","artist":"Bahram Radan","artist_id":"3937","fans":"95","url":"http:\/\/www.wikiseda.com\/Bahram+Radan","poster":"http:\/\/85.25.243.154\/thumb_image\/Bahram Radan.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Bahram Radan-thumb.jpg","following":0},{"id":"611","type":"artist","artist":"Babk Mafi","artist_id":"611","fans":"90","url":"http:\/\/www.wikiseda.com\/Babk+Mafi","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Babk Mafi-thumb.jpg","following":0},{"id":"1186","type":"artist","artist":"Beti","artist_id":"1186","fans":"87","url":"http:\/\/www.wikiseda.com\/Beti","poster":"http:\/\/85.25.243.154\/thumb_image\/Beti.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Beti-thumb.jpg","following":0}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    }
    if (this.option === 'search') {
      return console.log('Search');
    }
  };

  ArtistModel.prototype.loadmore = function() {
    if (this.loading === true) {
      return;
    }
    this.loading = true;
    return setTimeout((function(_this) {
      return function() {
        var json;
        json = '[{"id":"7618","type":"artist","artist":"Bigrez","artist_id":"7618","fans":"63","url":"http:\/\/www.wikiseda.com\/Bigrez","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","following":0},{"id":"224","type":"artist","artist":"babak tighe","artist_id":"224","fans":"62","url":"http:\/\/www.wikiseda.com\/babak+tighe","poster":"http:\/\/85.25.243.154\/thumb_image\/babak tighe.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/babak tighe-thumb.jpg","following":0},{"id":"1924","type":"artist","artist":"Bita","artist_id":"1924","fans":"60","url":"http:\/\/www.wikiseda.com\/Bita","poster":"http:\/\/85.25.243.154\/thumb_image\/Bita.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Bita-thumb.jpg","following":0},{"id":"591","type":"artist","artist":"Behzad Pax","artist_id":"591","fans":"57","url":"http:\/\/www.wikiseda.com\/Behzad+Pax","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","following":0},{"id":"1477","type":"artist","artist":"Bahar Atish","artist_id":"1477","fans":"56","url":"http:\/\/www.wikiseda.com\/Bahar+Atish","poster":"http:\/\/85.25.243.154\/thumb_image\/Bahar Atish.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Bahar Atish-thumb.jpg","following":0},{"id":"2243","type":"artist","artist":"Babak Taslimi","artist_id":"2243","fans":"40","url":"http:\/\/www.wikiseda.com\/Babak+Taslimi","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Babak Taslimi-thumb.jpg","following":0},{"id":"4634","type":"artist","artist":"Bidad","artist_id":"4634","fans":"39","url":"http:\/\/www.wikiseda.com\/Bidad","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","following":0},{"id":"6237","type":"artist","artist":"Babak Sahraee","artist_id":"6237","fans":"34","url":"http:\/\/www.wikiseda.com\/Babak+Sahraee","poster":"http:\/\/85.25.243.154\/thumb_image\/Babak Sahraee.jpg","thumb":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","following":0},{"id":"1364","type":"artist","artist":"Bijan Bijani","artist_id":"1364","fans":"33","url":"http:\/\/www.wikiseda.com\/Bijan+Bijani","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","following":0},{"id":"755","type":"artist","artist":"Bahador","artist_id":"755","fans":"31","url":"http:\/\/www.wikiseda.com\/Bahador","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Bahador-thumb.jpg","following":0},{"id":"2220","type":"artist","artist":"Borzoo Arjmand","artist_id":"2220","fans":"30","url":"http:\/\/www.wikiseda.com\/Borzoo+Arjmand","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Borzoo Arjmand-thumb.jpg","following":0},{"id":"592","type":"artist","artist":"Binam","artist_id":"592","fans":"30","url":"http:\/\/www.wikiseda.com\/Binam","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","following":0},{"id":"1362","type":"artist","artist":"Bahram Hasiri","artist_id":"1362","fans":"28","url":"http:\/\/www.wikiseda.com\/Bahram+Hasiri","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","following":0},{"id":"2731","type":"artist","artist":"Babak Rahmani","artist_id":"2731","fans":"25","url":"http:\/\/www.wikiseda.com\/Babak+Rahmani","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Babak Rahmani-thumb.jpg","following":0},{"id":"2795","type":"artist","artist":"Babak Radmanesh","artist_id":"2795","fans":"25","url":"http:\/\/www.wikiseda.com\/Babak+Radmanesh","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Babak Radmanesh-thumb.jpg","following":0},{"id":"1084","type":"artist","artist":"Behzad Va Baran","artist_id":"1084","fans":"24","url":"http:\/\/www.wikiseda.com\/Behzad+Va+Baran","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","following":0},{"id":"2681","type":"artist","artist":"Bi Kalam","artist_id":"2681","fans":"23","url":"http:\/\/www.wikiseda.com\/Bi+Kalam","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","following":0},{"id":"1140","type":"artist","artist":"Bamdad","artist_id":"1140","fans":"19","url":"http:\/\/www.wikiseda.com\/Bamdad","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Bamdad-thumb.jpg","following":0},{"id":"1592","type":"artist","artist":"Badi Zade","artist_id":"1592","fans":"19","url":"http:\/\/www.wikiseda.com\/Badi+Zade","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","following":0},{"id":"3106","type":"artist","artist":"Behrouz Safarian","artist_id":"3106","fans":"17","url":"http:\/\/www.wikiseda.com\/Behrouz+Safarian","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Behrouz Safarian-thumb.jpg","following":0}]';
        _this._emit('loadmore', JSON.parse(json));
        return _this.loading = false;
      };
    })(this), 1000);
  };

  ArtistModel.prototype.refresh = function() {
    if (this.loading === true) {
      return;
    }
    this._emit('refresh');
    return this.get();
  };

  ArtistModel.prototype.setOption = function(option) {
    this.option = option;
    if (this.loading === true) {
      return;
    }
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
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"140863","type":"song","artist":"mostafa yeganeh","artist_id":"116","songname":"Bavar Kardani Nist","popularity":"3.4","ratecount":"15","view":"3393","time":"2:59","date":"1393-04-13","poster":"http:\/\/85.25.243.154\/img\/5oh2a70em-1404491150.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/Gallery\/[Medium]\/bc6dsgnp-1404491150.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/mostafa+yeganeh\/-\/Bavar+Kardani+Nist","mp3":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3"},{"id":"140809","type":"song","artist":"Masoud Emami","artist_id":"1905","songname":"Khoda Doosam Dasht","popularity":"3.6","ratecount":"9","view":"4457","time":"3:33","date":"1393-04-12","poster":"http:\/\/85.25.243.154\/img\/utxrohick-1404397432.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Gallery\/[Medium]\/2u6wzwdn-1404397432.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Masoud+Emami\/-\/Khoda+Doosam+Dasht","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3"},{"id":"140785","type":"song","artist":"Amin Hayaei","artist_id":"12201","songname":"Owje Parvaz","popularity":"3.8","ratecount":"8","view":"2205","time":"5:22","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/gq9zswptj-1404332339.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/Gallery\/[Medium]\/qixdrptt-1404332339.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amin+Hayaei\/-\/Owje+Parvaz","mp3":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3"},{"id":"140782","type":"song","artist":"Bakhtak Band","artist_id":"11623","songname":"Dame Sobh","popularity":"2.6","ratecount":"8","view":"2966","time":"3:27","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/1spygoohm-1404322313.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/Gallery\/[Medium]\/hxb0sre5-1404322313.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/-\/Dame+Sobh","mp3":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3"},{"id":"9826","type":"album","artist":"Mohsen-sharifian","artist_id":"631","album":"Dingue Marrow","trackcount":"9","popularity":"5","date":"1393-04-14","url":"http:\/\/www.wikiseda.com\/Mohsen-sharifian\/Dingue+Marrow","view":"551","poster":"http:\/\/85.25.243.154\/img\/un79cef6qp-1404554657.jpg","year":"1393"},{"id":"9821","type":"album","artist":"O-hum","artist_id":"3927","album":"Hafez In Love","trackcount":"4","popularity":"5","date":"1393-04-08","url":"http:\/\/www.wikiseda.com\/O-hum\/Hafez+In+Love","view":"1756","poster":"http:\/\/85.25.243.154\/img\/1xxwe9fwdz-1404025213.jpg","year":"1393"},{"id":"9809","type":"album","artist":"Alireza Ghorbani","artist_id":"472","album":"Raftamo Bare Safar Bastam","trackcount":"6","popularity":"4.7","date":"1393-04-02","url":"http:\/\/www.wikiseda.com\/Alireza+Ghorbani\/Raftamo+Bare+Safar+Bastam","view":"18170","poster":"http:\/\/85.25.243.154\/img\/pf2m3p18sw-1403542665.jpg","year":"1393"},{"id":"9807","type":"album","artist":"Salar Aghili","artist_id":"97","album":"Vatan","trackcount":"9","popularity":"4.8","date":"1393-03-31","url":"http:\/\/www.wikiseda.com\/Salar+Aghili\/Vatan","view":"10829","poster":"http:\/\/85.25.243.154\/img\/obldv0b5l4-1403360590.jpg","year":"1393"},{"id":"4023","type":"video","artist":"Matin do hanjare","poster":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/[Gallery]\/8c1e2f4f65d428d910ece8e1c83cbc26-3.jpg","time":"3:2","videoname":"Marg Bar Man","lowq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-h.mp4","popularity":"3.8","view":"2292","url":"http:\/\/www.wikiseda.com\/Matin+do+hanjare\/+video\/Marg+Bar+Man","year":"1393"},{"id":"4022","type":"video","artist":"Amir Farjam","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/[Gallery]\/5fddee48dfa042d0664b066720a71bda-3.jpg","time":"3:32","videoname":"KHodaya","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-h.mp4","popularity":"5","view":"1769","url":"http:\/\/www.wikiseda.com\/Amir+Farjam\/+video\/KHodaya","year":"1393"},{"id":"4021","type":"video","artist":"Emo Band","poster":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/[Gallery]\/6ab639b8fef2f4fe7f9841d6f8d9f70d-3.jpg","time":"4:34","videoname":"Donyamo Live","lowq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-l.mp4","highq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-h.mp4","popularity":"4.1","view":"1728","url":"http:\/\/www.wikiseda.com\/Emo+Band\/+video\/Donyamo+Live","year":"1393"},{"id":"4019","type":"video","artist":"Amir Tataloo","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/[Gallery]\/d2931b538ae36b30847c9c139610311a-3.jpg","time":"3:29","videoname":"Baa To","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-h.mp4","popularity":"4.2","view":"10730","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/+video\/Baa+To","year":"1393"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    } else {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"140785","type":"song","artist":"Amin Hayaei","artist_id":"12201","songname":"Owje Parvaz","popularity":"3.8","ratecount":"8","view":"2205","time":"5:22","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/gq9zswptj-1404332339.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/Gallery\/[Medium]\/qixdrptt-1404332339.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amin+Hayaei\/-\/Owje+Parvaz","mp3":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3"},{"id":"140782","type":"song","artist":"Bakhtak Band","artist_id":"11623","songname":"Dame Sobh","popularity":"2.6","ratecount":"8","view":"2966","time":"3:27","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/1spygoohm-1404322313.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/Gallery\/[Medium]\/hxb0sre5-1404322313.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/-\/Dame+Sobh","mp3":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3"},{"id":"9826","type":"album","artist":"Mohsen-sharifian","artist_id":"631","album":"Dingue Marrow","trackcount":"9","popularity":"5","date":"1393-04-14","url":"http:\/\/www.wikiseda.com\/Mohsen-sharifian\/Dingue+Marrow","view":"551","poster":"http:\/\/85.25.243.154\/img\/un79cef6qp-1404554657.jpg","year":"1393"},{"id":"9821","type":"album","artist":"O-hum","artist_id":"3927","album":"Hafez In Love","trackcount":"4","popularity":"5","date":"1393-04-08","url":"http:\/\/www.wikiseda.com\/O-hum\/Hafez+In+Love","view":"1756","poster":"http:\/\/85.25.243.154\/img\/1xxwe9fwdz-1404025213.jpg","year":"1393"},{"id":"9809","type":"album","artist":"Alireza Ghorbani","artist_id":"472","album":"Raftamo Bare Safar Bastam","trackcount":"6","popularity":"4.7","date":"1393-04-02","url":"http:\/\/www.wikiseda.com\/Alireza+Ghorbani\/Raftamo+Bare+Safar+Bastam","view":"18170","poster":"http:\/\/85.25.243.154\/img\/pf2m3p18sw-1403542665.jpg","year":"1393"},{"id":"9807","type":"album","artist":"Salar Aghili","artist_id":"97","album":"Vatan","trackcount":"9","popularity":"4.8","date":"1393-03-31","url":"http:\/\/www.wikiseda.com\/Salar+Aghili\/Vatan","view":"10829","poster":"http:\/\/85.25.243.154\/img\/obldv0b5l4-1403360590.jpg","year":"1393"},{"id":"4023","type":"video","artist":"Matin do hanjare","poster":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/[Gallery]\/8c1e2f4f65d428d910ece8e1c83cbc26-3.jpg","time":"3:2","videoname":"Marg Bar Man","lowq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-h.mp4","popularity":"3.8","view":"2292","url":"http:\/\/www.wikiseda.com\/Matin+do+hanjare\/+video\/Marg+Bar+Man","year":"1393"},{"id":"4022","type":"video","artist":"Amir Farjam","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/[Gallery]\/5fddee48dfa042d0664b066720a71bda-3.jpg","time":"3:32","videoname":"KHodaya","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-h.mp4","popularity":"5","view":"1769","url":"http:\/\/www.wikiseda.com\/Amir+Farjam\/+video\/KHodaya","year":"1393"},{"id":"4021","type":"video","artist":"Emo Band","poster":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/[Gallery]\/6ab639b8fef2f4fe7f9841d6f8d9f70d-3.jpg","time":"4:34","videoname":"Donyamo Live","lowq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-l.mp4","highq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-h.mp4","popularity":"4.1","view":"1728","url":"http:\/\/www.wikiseda.com\/Emo+Band\/+video\/Donyamo+Live","year":"1393"},{"id":"4019","type":"video","artist":"Amir Tataloo","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/[Gallery]\/d2931b538ae36b30847c9c139610311a-3.jpg","time":"3:29","videoname":"Baa To","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-h.mp4","popularity":"4.2","view":"10730","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/+video\/Baa+To","year":"1393"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    }
    if (this.option === 'search') {
      return console.log('Search');
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
    this.option = 0;
    this.loading = false;
  }

  SongModel.prototype.get = function() {
    if (this.loading === true) {
      return;
    }
    this.loading = true;
    if (this.option === 0) {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"143189","type":"song","artist":"\u06cc\u0627\u0633","artist_id":"140","songname":"\u062f\u0648 \u062f\u0648 \u062a\u0627 \u0686\u0647\u0627\u0631 \u062a\u0627","popularity":"4.5","ratecount":"206","view":"77715","time":"4:4","date":"1393-05-28","poster":"http:\/\/85.25.243.154\/img\/yy4ollpnq0-1408185497.jpg","poster_big":"http:\/\/85.25.95.231\/music\/Y\/Yas\/Gallery\/[Medium]\/ntfkxdi2-1408185497.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Yas\/-\/Do+Do+Ta+Chahar+Ta","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yas\/[one]\/Do Do Ta Chahar Ta [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yas\/[one]\/Do Do Ta Chahar Ta [WikiSeda].mp3"},{"id":"143595","type":"song","artist":"\u0645\u0631\u062a\u0636\u06cc \u067e\u0627\u0634\u0627\u06cc\u06cc","artist_id":"122","songname":"\u0642\u0644\u0628\u0645 \u0631\u0648 \u062a\u06a9\u0631\u0627\u0631\u0647","popularity":"4.6","ratecount":"177","view":"79529","time":"3:19","date":"1393-06-09","poster":"http:\/\/85.25.243.154\/img\/h3du9oywj1-1409592421.jpg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Morteza pashaei\/Gallery\/[Medium]\/5x0ycu1c-1409592421.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Morteza+pashaei\/-\/Ghalbam+Ru+Tekrare","mp3":"http:\/\/85.25.95.231\/music\/M\/Morteza pashaei\/[one]\/Ghalbam Ru Tekrare [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Morteza pashaei\/[one]\/Ghalbam Ru Tekrare [WikiSeda].mp3"},{"id":"143182","type":"song","artist":"\u0627\u0645\u06cc\u062f","artist_id":"57","songname":"\u062e\u0648\u0634 \u0642\u062f\u0645","popularity":"4.6","ratecount":"123","view":"56906","time":"3:49","date":"1393-05-28","poster":"http:\/\/85.25.243.154\/img\/jx9m0y96l-1408121054.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/O\/Omid\/Gallery\/[Medium]\/nvo6ubx9-1408121054.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Omid\/-\/Khosh+Ghadam","mp3":"http:\/\/85.25.95.231\/music\/O\/Omid\/[one]\/Khosh Ghadam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/O\/Omid\/[one]\/Khosh Ghadam [WikiSeda].mp3","m4v":"http:\/\/85.25.243.154\/video\/O\/Omid\/1393\/05\/\/b76300b87ec8246cf4a10720e14c5f42-l.mp4"},{"id":"143386","type":"song","artist":"\u0627\u0645\u06cc\u0631 \u062a\u062a\u0644\u0648","artist_id":"66","songname":"\u06a9\u0627\u0631\u06cc\u06a9\u0627\u062a\u0648\u0631","popularity":"3.5","ratecount":"154","view":"47840","time":"3:38","date":"1393-05-31","poster":"http:\/\/85.25.243.154\/img\/z18ibgy1f-1408722890.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amir Tataloo\/Gallery\/[Medium]\/cv9z38jr-1408722890.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/-\/Karikatoor","mp3":"http:\/\/85.25.95.231\/music\/A\/Amir Tataloo\/[one]\/Karikatoor [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amir Tataloo\/[one]\/Karikatoor [WikiSeda].mp3"},{"id":"143959","type":"song","artist":"\u0628\u0627\u0628\u06a9 \u062c\u0647\u0627\u0646\u0628\u062e\u0634","artist_id":"255","songname":"\u0645\u062f\u0627\u0631 \u0628\u06cc \u0642\u0631\u0627\u0631\u06cc","popularity":"4.3","ratecount":"125","view":"30231","time":"3:44","date":"1393-06-17","poster":"http:\/\/85.25.243.154\/img\/70m2uuguxz-1410197041.jpg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Babak Jahan Bakhsh\/Gallery\/[Medium]\/8sqvznnu-1410197041.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Babak+Jahan+Bakhsh\/-\/Madare+Bi+Gharari","mp3":"http:\/\/85.25.95.231\/music\/B\/Babak Jahan Bakhsh\/[one]\/Madare Bi Gharari [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Babak Jahan Bakhsh\/[one]\/Madare Bi Gharari [WikiSeda].mp3"},{"id":"143181","type":"song","artist":"\u0633\u0627\u0645\u0627\u0646 \u062c\u0644\u06cc\u0644\u06cc","artist_id":"240","songname":"\u062f\u0645\u0648\u06cc \u0622\u0644\u0628\u0648\u0645 \u067e\u0631\u062a\u06af\u0627\u0647","popularity":"4.6","ratecount":"102","view":"21493","time":"4:30","date":"1393-05-28","poster":"http:\/\/85.25.243.154\/img\/r2sz8xy6u-1408118061.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Gallery\/[Medium]\/yy17drb4-1408118061.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Saman+Jalili\/-\/Partgah+Album+Demo","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/[one]\/Partgah Album Demo [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/[one]\/Partgah Album Demo [WikiSeda].mp3"},{"id":"143593","type":"song","artist":"\u0645\u062d\u0633\u0646 \u0686\u0627\u0648\u0634\u06cc","artist_id":"55","songname":"\u0645\u06cc\u06af\u0647 \u062f\u0648\u0633\u0645 \u0646\u062f\u0627\u0631\u0647","popularity":"4.2","ratecount":"107","view":"40500","time":"3:13","date":"1393-06-09","poster":"http:\/\/85.25.243.154\/img\/urxbws2gm-1409464030.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Mohsen Chavoshi\/Gallery\/[Medium]\/j1pcd9k0-1409464030.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Mohsen+Chavoshi\/-\/Mige+Doosam+Nadareh","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen Chavoshi\/[one]\/Mige Doosam Nadareh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen Chavoshi\/[one]\/Mige Doosam Nadareh [WikiSeda].mp3"},{"id":"143474","type":"song","artist":"\u0639\u0644\u06cc \u0639\u0628\u062f\u0627\u0644\u0645\u0627\u0644\u06a9\u06cc","artist_id":"60","songname":"\u0645\u0646 \u0639\u0627\u0634\u0642\u062a\u0648\u0646\u0645 \u0634\u062f\u06cc\u062f","popularity":"4.4","ratecount":"94","view":"21666","time":"1:40","date":"1393-06-04","poster":"http:\/\/85.25.243.154\/img\/4pgz0ho44-1409046975.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Ali Abdolmaleki\/Gallery\/[Medium]\/iwx51s6b-1409046975.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Ali+Abdolmaleki\/-\/Man+Asheghetoonam+Shadid","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Abdolmaleki\/[one]\/Man Asheghetoonam Shadid [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Abdolmaleki\/[one]\/Man Asheghetoonam Shadid [WikiSeda].mp3"},{"id":"143598","type":"song","artist":"\u0631\u0636\u0627 \u0635\u0627\u062f\u0642\u06cc","artist_id":"48","songname":"\u0641\u0627\u0644","popularity":"4.7","ratecount":"86","view":"30581","time":"3:50","date":"1393-06-09","poster":"http:\/\/85.25.243.154\/img\/lgb4p2e3n-1409466670.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/Gallery\/[Medium]\/e2jeubqq-1409466670.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/reza+sadeghi\/-\/Faal","mp3":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/[one]\/Faal [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/reza sadeghi\/[one]\/Faal [WikiSeda].mp3"},{"id":"143332","type":"song","artist":"\u0645\u0647\u062f\u06cc \u0627\u062d\u0645\u062f\u0648\u0646\u062f","artist_id":"833","songname":"\u062f\u0645\u0648\u06cc \u0622\u0644\u0628\u0648\u0645 \u0627\u0632 \u0627\u06cc\u0646 \u0633\u0627\u0639\u062a","popularity":"4.4","ratecount":"83","view":"28409","time":"4:49","date":"1393-06-01","poster":"http:\/\/85.25.243.154\/img\/6rmb3e6ixj-1408758498.jpg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/Gallery\/[Medium]\/q3d9tj1g-1408758498.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Mehdi+Ahmadvand\/-\/Az+In+Saat+Album+Demo","mp3":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/[one]\/Az In Saat Album Demo [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mehdi Ahmadvand\/[one]\/Az In Saat Album Demo [WikiSeda].mp3"},{"id":"143471","type":"song","artist":"\u0644\u06cc\u0644\u0627 \u0641\u0631\u0648\u0647\u0631","artist_id":"199","songname":"\u062e\u06cc\u0644\u06cc \u062d\u0633\u0627\u0633\u0645","popularity":"4.6","ratecount":"79","view":"43749","time":"4:12","date":"1393-06-04","poster":"http:\/\/85.25.243.154\/img\/7g1peaq84-1409029392.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/L\/leila\/Gallery\/[Medium]\/fq7hdojm-1409029392.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/leila\/-\/Khayli+Hasasam","mp3":"http:\/\/85.25.95.231\/music\/L\/leila\/[one]\/Khayli Hasasam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/L\/leila\/[one]\/Khayli Hasasam [WikiSeda].mp3"},{"id":"143502","type":"song","artist":"\u0633\u0627\u0645\u0627\u0646 \u062c\u0644\u06cc\u0644\u06cc","artist_id":"240","songname":"\u062d\u0631\u0641 \u062f\u0644\u0645","popularity":"4.8","ratecount":"75","view":"26642","time":"3:48","date":"1393-06-05","year":"1393","album":"\u067e\u0631\u062a\u06af\u0627\u0647","album_id":"9988","poster":"http:\/\/85.25.243.154\/img\/zve52exf7l-1409118366.jpg","url":"http:\/\/www.wikiseda.com\/Saman+Jalili\/Partgah\/Harfe+Delam","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Harfe Delam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Harfe Delam [WikiSeda].mp3"},{"id":"143655","type":"song","artist":"\u0627\u0645\u06cc\u0631 \u062a\u062a\u0644\u0648","artist_id":"66","songname":"\u0627\u0648\u0646 \u0627\u0644\u0627\u0646 \u062d\u0627\u0644\u0634 \u062e\u0648\u0628\u0647","popularity":"3.4","ratecount":"100","view":"39181","time":"3:10","date":"1393-06-10","poster":"http:\/\/85.25.243.154\/img\/ijnam4xee-1409579530.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amir Tataloo\/Gallery\/[Medium]\/74hcjj7n-1409579530.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/-\/On+Alan+Halesh+Khobe","mp3":"http:\/\/85.25.95.231\/music\/A\/Amir Tataloo\/[one]\/On Alan Halesh Khobe [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amir Tataloo\/[one]\/On Alan Halesh Khobe [WikiSeda].mp3"},{"id":"143190","type":"song","artist":"\u062d\u0633\u06cc\u0646 \u062a\u0647\u06cc","artist_id":"149","songname":"\u0645\u0646 \u0628\u0627\u0644\u0627\u0645","popularity":"3.7","ratecount":"89","view":"37627","time":"3:13","date":"1393-05-27","poster":"http:\/\/85.25.243.154\/img\/su62u86qs4-1408184712.jpg","poster_big":"http:\/\/85.25.95.231\/music\/H\/Hossein Tohi\/Gallery\/[Medium]\/479ys1ty-1408184712.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Hossein+Tohi\/-\/Man+Baalaam","mp3":"http:\/\/85.25.95.231\/music\/H\/Hossein Tohi\/[one]\/Man Baalaam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Hossein Tohi\/[one]\/Man Baalaam [WikiSeda].mp3"},{"id":"143998","type":"song","artist":"\u0628\u0646\u06cc\u0627\u0645\u06cc\u0646 \u0628\u0647\u0627\u062f\u0631\u06cc","artist_id":"71","songname":"\u0645\u062d\u062f\u0648\u062f\u06cc\u062a","popularity":"4.3","ratecount":"76","view":"26669","time":"4:11","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/djvp7gmd3-1410286048.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Benyamin\/Gallery\/[Medium]\/aqn2wapr-1410286048.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Benyamin\/-\/Mahdoodiat","mp3":"http:\/\/85.25.95.231\/music\/B\/Benyamin\/[one]\/Mahdoodiat [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Benyamin\/[one]\/Mahdoodiat [WikiSeda].mp3"},{"id":"143493","type":"song","artist":"\u0633\u0627\u0633\u06cc \u0645\u0627\u0646\u06a9\u0646","artist_id":"334","songname":"\u0639\u0627\u0634\u0642 \u06cc\u06a9\u06cc \u0634\u062f\u0645","popularity":"4.2","ratecount":"71","view":"35301","time":"3:9","date":"1393-06-04","poster":"http:\/\/85.25.243.154\/img\/sj6asu1hug-1409070709.jpg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Sasy Mankan\/Gallery\/[Medium]\/h4j2dcki-1409070709.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Sasy+Mankan\/-\/Asheghe+Yeki+Shodam","mp3":"http:\/\/85.25.95.231\/music\/S\/Sasy Mankan\/[one]\/Asheghe Yeki Shodam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Sasy Mankan\/[one]\/Asheghe Yeki Shodam [WikiSeda].mp3"},{"id":"144059","type":"song","artist":"\u0645\u0631\u062a\u0636\u06cc \u067e\u0627\u0634\u0627\u06cc\u06cc","artist_id":"122","songname":"\u0631\u0648\u0632\u0647\u0627\u06cc \u0633\u062e\u062a","popularity":"4.4","ratecount":"60","view":"16325","time":"3:27","date":"1393-06-22","poster":"http:\/\/85.25.243.154\/img\/zala9mpkrw-1410625982.jpg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Morteza pashaei\/Gallery\/[Medium]\/nesy8r9s-1410625982.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Morteza+pashaei\/-\/Roozhaye+Sakht","mp3":"http:\/\/85.25.95.231\/music\/M\/Morteza pashaei\/[one]\/Roozhaye Sakht [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Morteza pashaei\/[one]\/Roozhaye Sakht [WikiSeda].mp3"},{"id":"143503","type":"song","artist":"\u0633\u0627\u0645\u0627\u0646 \u062c\u0644\u06cc\u0644\u06cc","artist_id":"240","songname":"\u0633\u0631 \u0628\u0647 \u0647\u0648\u0627","popularity":"4.7","ratecount":"56","view":"23613","time":"3:29","date":"1393-06-15","year":"1393","album":"\u067e\u0631\u062a\u06af\u0627\u0647","album_id":"9988","poster":"http:\/\/85.25.243.154\/img\/zve52exf7l-1409118366.jpg","url":"http:\/\/www.wikiseda.com\/Saman+Jalili\/Partgah\/Sar+Be+Hava","mp3":"http:\/\/85.25.95.231\/music\/S\/Saman Jalili\/Partgah\/Sar Be Hava [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saman Jalili\/Partgah\/Sar Be Hava [WikiSeda].mp3"},{"id":"143671","type":"song","artist":"\u0631\u0636\u0627 \u0635\u0627\u062f\u0642\u06cc","artist_id":"48","songname":"\u0628\u06cc\u062f\u0627\u0631\u06cc \u0634\u0628","popularity":"4.5","ratecount":"54","view":"24459","time":"4:43","date":"1393-06-10","poster":"http:\/\/85.25.243.154\/img\/zv5lplsbe-1409602401.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/Gallery\/[Medium]\/f3orh1d8-1409602401.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/reza+sadeghi\/-\/Bidari+Shab","mp3":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/[one]\/Bidari Shab [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/reza sadeghi\/[one]\/Bidari Shab [WikiSeda].mp3"},{"id":"143430","type":"song","artist":"\u0645\u06cc\u062b\u0645 \u0622\u0632\u0627\u062f","artist_id":"7519","songname":"\u062a\u0648 \u0646\u062f\u06cc\u062f\u06cc","popularity":"4.4","ratecount":"53","view":"6030","time":"5:25","date":"1393-06-02","poster":"http:\/\/85.25.243.154\/img\/f9lkb81ry-1408846735.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Meysam Azad\/Gallery\/[Medium]\/xlvilmzf-1408846735.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Meysam+Azad\/-\/To+Nadidi","mp3":"http:\/\/85.25.95.231\/music\/M\/Meysam Azad\/[one]\/To Nadidi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Meysam Azad\/[one]\/To Nadidi [WikiSeda].mp3"},{"id":"143336","type":"song","artist":"\u067e\u0648\u06cc\u0627 \u0628\u06cc\u0627\u062a\u06cc","artist_id":"153","songname":"\u06af\u0644 \u067e\u0648\u0646\u0647 \u0647\u0627","popularity":"4.1","ratecount":"54","view":"18174","time":"3:40","date":"1393-05-29","poster":"http:\/\/85.25.243.154\/img\/4eadvy2dt-1408560165.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/P\/Pouya Bayati\/Gallery\/[Medium]\/yx782d5c-1408560165.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Pouya+Bayati\/-\/Gol+Pooneha","mp3":"http:\/\/85.25.95.231\/music\/P\/Pouya Bayati\/[one]\/Gol Pooneha [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/P\/Pouya Bayati\/[one]\/Gol Pooneha [WikiSeda].mp3"},{"id":"143911","type":"song","artist":"\u062f\u0627\u06cc\u0627\u0646","artist_id":"5663","songname":"\u0627\u0644\u06a9\u0644","popularity":"4.4","ratecount":"49","view":"15573","time":"5:7","date":"1393-06-15","poster":"http:\/\/85.25.243.154\/img\/vzm3zirhy-1410021677.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/D\/Dayan\/Gallery\/[Medium]\/05oorbxe-1410021677.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Dayan\/-\/Alcohol","mp3":"http:\/\/85.25.95.231\/music\/D\/Dayan\/[one]\/Alcohol [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/D\/Dayan\/[one]\/Alcohol [WikiSeda].mp3"},{"id":"143108","type":"song","artist":"\u0634\u0627\u062f\u0645\u0647\u0631 \u0639\u0642\u06cc\u0644\u06cc","artist_id":"76","songname":"\u0648\u0631\u0698\u0646 \u067e\u06cc\u0627\u0646\u0648 \u0631\u0627\u0628\u0637\u0647","popularity":"4.3","ratecount":"49","view":"21334","time":"4:8","date":"1393-05-23","poster":"http:\/\/85.25.243.154\/img\/895h68d6w-1407997122.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Shadmehr\/Gallery\/[Medium]\/zp54lj0x-1407997122.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Shadmehr\/-\/Piano+Version+Rabeteh","mp3":"http:\/\/85.25.95.231\/music\/S\/Shadmehr\/[one]\/Piano Version Rabeteh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Shadmehr\/[one]\/Piano Version Rabeteh [WikiSeda].mp3"},{"id":"143596","type":"song","artist":"\u0634\u0647\u0631\u0627\u0645 \u0634\u06a9\u0648\u0647\u06cc","artist_id":"1458","songname":"\u0645\u0642\u062f\u0633","popularity":"3.6","ratecount":"58","view":"21957","time":"3:25","date":"1393-06-09","poster":"http:\/\/85.25.243.154\/img\/qzjpjaf6th-1409466349.jpg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Shahram Shokoohi\/Gallery\/[Medium]\/mnm0kzj4-1409466349.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Shahram+Shokoohi\/-\/Moghadas","mp3":"http:\/\/85.25.95.231\/music\/S\/Shahram Shokoohi\/[one]\/Moghadas [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Shahram Shokoohi\/[one]\/Moghadas [WikiSeda].mp3"},{"id":"142937","type":"song","artist":"\u0631\u0627\u0645\u06cc\u0646 \u0628\u06cc \u0628\u0627\u06a9","artist_id":"181","songname":"\u062f\u0644 \u0645\u0646","popularity":"4.6","ratecount":"45","view":"16917","time":"3:10","date":"1393-05-23","poster":"http:\/\/85.25.243.154\/img\/nix9qu1gz-1407591405.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/R\/Ramin Bibak\/Gallery\/[Medium]\/7mi0zxe8-1407591405.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Ramin+Bibak\/-\/Dele+Man","mp3":"http:\/\/85.25.95.231\/music\/R\/Ramin Bibak\/[one]\/Dele Man [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/Ramin Bibak\/[one]\/Dele Man [WikiSeda].mp3"},{"id":"143201","type":"song","artist":"\u0635\u0627\u062f\u0642","artist_id":"3170","songname":"\u0634\u0627\u062e\u0635","popularity":"4.5","ratecount":"46","view":"14027","time":"3:40","date":"1393-05-25","poster":"http:\/\/85.25.243.154\/img\/mj1cfrhxy-1408207890.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Sadegh\/Gallery\/[Medium]\/bduead2r-1408207890.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Sadegh\/-\/Shakhes","mp3":"http:\/\/85.25.95.231\/music\/S\/Sadegh\/[one]\/Shakhes [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Sadegh\/[one]\/Shakhes [WikiSeda].mp3"},{"id":"144064","type":"song","artist":"\u0627\u0645\u06cc\u0631 \u062a\u062a\u0644\u0648","artist_id":"66","songname":"\u062a\u0648 \u062a\u0648 \u062f\u06cc\u062f \u0645\u0646 \u0646\u06cc\u0633\u062a\u06cc","popularity":"3.9","ratecount":"51","view":"11837","time":"3:38","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/gxxuxxbqx-1410453149.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amir Tataloo\/Gallery\/[Medium]\/jgpzla2g-1410453149.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/-\/To+Too+Dide+Man+Nisti","mp3":"http:\/\/85.25.95.231\/music\/A\/Amir Tataloo\/[one]\/To Too Dide Man Nisti [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amir Tataloo\/[one]\/To Too Dide Man Nisti [WikiSeda].mp3"},{"id":"143114","type":"song","artist":"\u0633\u0627\u0633\u06cc \u0645\u0627\u0646\u06a9\u0646","artist_id":"334","songname":"\u0645\u0646 \u0645\u062b\u0644 \u062f\u06cc\u0648\u0648\u0646\u0647 \u0647\u0627\u0645","popularity":"3.6","ratecount":"54","view":"20443","time":"4:15","date":"1393-05-23","poster":"http:\/\/85.25.243.154\/img\/er0mb4qgr-1408005721.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Sasy Mankan\/Gallery\/[Medium]\/qqheadc0-1408005721.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Sasy+Mankan\/-\/Man+Mesle+Divooneham","mp3":"http:\/\/85.25.95.231\/music\/S\/Sasy Mankan\/[one]\/Man Mesle Divooneham [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Sasy Mankan\/[one]\/Man Mesle Divooneham [WikiSeda].mp3","m4v":"http:\/\/85.25.243.154\/video\/S\/Sasy Mankan\/1393\/05\/\/80a490b7e5e535b5e7602e7c4d7075e1-l.mp4"},{"id":"143221","type":"song","artist":"\u0633\u0646\u062f\u06cc","artist_id":"869","songname":"\u0628\u0686\u0647 \u0632\u06cc\u0627\u062f","popularity":"4.3","ratecount":"45","view":"19333","time":"4:51","date":"1393-05-26","poster":"http:\/\/85.25.243.154\/img\/0gygc5jgr-1408298778.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Sandi\/Gallery\/[Medium]\/mkdc19ty-1408298778.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Sandi\/-\/Bacheye+Ziad","mp3":"http:\/\/85.25.95.231\/music\/S\/Sandi\/[one]\/Bacheye Ziad [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Sandi\/[one]\/Bacheye Ziad [WikiSeda].mp3"},{"id":"143656","type":"song","artist":"\u062d\u0633\u06cc\u0646 \u062a\u0647\u06cc","artist_id":"149","songname":"\u062a\u0627\u0628\u0633\u062a\u0648\u0646","popularity":"3.9","ratecount":"49","view":"17235","time":"3:52","date":"1393-06-10","poster":"http:\/\/85.25.243.154\/img\/yr5imogsa-1409581512.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/H\/Hossein Tohi\/Gallery\/[Medium]\/1ypa27oh-1409581512.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Hossein+Tohi\/-\/Tabeston","mp3":"http:\/\/85.25.95.231\/music\/H\/Hossein Tohi\/[one]\/Tabeston [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Hossein Tohi\/[one]\/Tabeston [WikiSeda].mp3"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    } else if (this.option === 1) {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"144106","type":"song","artist":"\u0639\u0644\u06cc \u06a9\u06cc\u0627\u0646","artist_id":"8808","songname":"\u0633\u06cc\u0627\u0647\u06cc","popularity":"0","ratecount":"0","view":"50","time":"3:12","date":"1393-06-22","poster":"http:\/\/85.25.243.154\/img\/vyp0sro25-1410622375.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Ali Kian\/Gallery\/[Medium]\/48lbpzoj-1410622375.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Ali+Kian\/-\/Siahi","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Kian\/[one]\/Siahi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Kian\/[one]\/Siahi [WikiSeda].mp3"},{"id":"144104","type":"song","artist":"\u0641\u0631\u0648\u063a \u0641\u0631\u062e\u0632\u0627\u062f","artist_id":"1775","songname":"\u0642\u0647\u0631","popularity":"3.7","ratecount":"3","view":"282","time":"3:3","date":"1393-06-22","poster":"http:\/\/85.25.243.154\/img\/prkuvv480-1410609334.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/F\/Forugh Farokhzad\/Gallery\/[Medium]\/nmo6p6gw-1410609334.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Forugh+Farokhzad\/-\/GHAHR","mp3":"http:\/\/85.25.95.231\/music\/F\/Forugh Farokhzad\/[one]\/Ghahr [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/F\/Forugh Farokhzad\/[one]\/Ghahr [WikiSeda].mp3"},{"id":"144103","type":"song","artist":"\u0646\u06cc\u0645\u0627 \u062e\u0627\u0644\u0642\u06cc","artist_id":"12944","songname":"\u0635\u0628\u062c \u0634\u062f\u0647","popularity":"5","ratecount":"1","view":"113","time":"3:36","date":"1393-06-22","poster":"http:\/\/85.25.243.154\/img\/wz6aw4uf3-1410605503.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/N\/Nima Khaleghi\/Gallery\/[Medium]\/tflp259z-1410605503.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Nima+Khaleghi\/-\/Sobh+Shode","mp3":"http:\/\/85.25.95.231\/music\/N\/Nima Khaleghi\/[one]\/Sobh Shode [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/N\/Nima Khaleghi\/[one]\/Sobh Shode [WikiSeda].mp3"},{"id":"144059","type":"song","artist":"\u0645\u0631\u062a\u0636\u06cc \u067e\u0627\u0634\u0627\u06cc\u06cc","artist_id":"122","songname":"\u0631\u0648\u0632\u0647\u0627\u06cc \u0633\u062e\u062a","popularity":"4.4","ratecount":"60","view":"16506","time":"3:27","date":"1393-06-22","poster":"http:\/\/85.25.243.154\/img\/zala9mpkrw-1410625982.jpg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Morteza pashaei\/Gallery\/[Medium]\/nesy8r9s-1410625982.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Morteza+pashaei\/-\/Roozhaye+Sakht","mp3":"http:\/\/85.25.95.231\/music\/M\/Morteza pashaei\/[one]\/Roozhaye Sakht [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Morteza pashaei\/[one]\/Roozhaye Sakht [WikiSeda].mp3"},{"id":"144101","type":"song","artist":"\u0645\u06cc\u0644\u0627\u062f \u06a9\u06cc\u0627\u0646\u06cc","artist_id":"5718","songname":"\u0632\u0646\u062f\u06af\u06cc \u06a9\u0646","popularity":"5","ratecount":"3","view":"489","time":"3:33","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/78gbfsj8o-1410559257.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Milad Kiani\/Gallery\/[Medium]\/ho5k9xs3-1410559257.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Milad+Kiani\/-\/Zendegi+Kon","mp3":"http:\/\/85.25.95.231\/music\/M\/Milad Kiani\/[one]\/Zendegi Kon [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Milad Kiani\/[one]\/Zendegi Kon [WikiSeda].mp3"},{"id":"144087","type":"song","artist":"\u0627\u0641\u0634\u06cc\u0646 \u0622\u0630\u0631\u06cc","artist_id":"248","songname":"\u0645\u0646\u0648 \u0646\u0628\u062e\u0634","popularity":"3.8","ratecount":"28","view":"5927","time":"4:32","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/5vyfvmil2i-1410547282.jpg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Afshin Azari\/Gallery\/[Medium]\/26jogokf-1410547282.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Afshin+Azari\/-\/Mano+Nabakhsh","mp3":"http:\/\/85.25.95.231\/music\/A\/Afshin Azari\/[one]\/Mano Nabakhsh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Afshin Azari\/[one]\/Mano Nabakhsh [WikiSeda].mp3"},{"id":"144085","type":"song","artist":"\u062c\u0648\u0627\u062f \u0648\u0647\u0627\u0628 \u0646\u0698\u0627\u062f","artist_id":"12707","songname":"\u0645\u0648\u0644\u0627","popularity":"5","ratecount":"1","view":"200","time":"3:47","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/ab15vcthi-1410541489.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/J\/Javad Vahabnejad\/Gallery\/[Medium]\/9rks1gd6-1410541489.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Javad+Vahabnejad\/-\/Mola","mp3":"http:\/\/85.25.95.231\/music\/J\/Javad Vahabnejad\/[one]\/Mola [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/J\/Javad Vahabnejad\/[one]\/Mola [WikiSeda].mp3"},{"id":"144084","type":"song","artist":"\u0647\u0648\u0645\u0646 \u06af\u0627\u0641","artist_id":"5309","songname":"\u0627\u06cc \u06a9\u0627\u0634","popularity":"0","ratecount":"0","view":"234","time":"4:40","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/kf7jm531c-1410540514.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/H\/Hooman Guf\/Gallery\/[Medium]\/8xqoi2e7-1410540514.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Hooman+Guf\/-\/Ey+Kash","mp3":"http:\/\/85.25.95.231\/music\/H\/Hooman Guf\/[one]\/Ey Kash [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Hooman Guf\/[one]\/Ey Kash [WikiSeda].mp3"},{"id":"144083","type":"song","artist":"\u0633\u0627\u0633\u06cc \u0645\u0627\u0646\u06a9\u0646","artist_id":"334","songname":"\u0622\u0644\u0632\u0627\u06cc\u0645\u0631","popularity":"3.5","ratecount":"31","view":"9016","time":"3:15","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/javzswwflu-1410541031.jpg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Sasy Mankan\/Gallery\/[Medium]\/g1z3kicg-1410541031.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Sasy+Mankan\/-\/Alzheimer","mp3":"http:\/\/85.25.95.231\/music\/S\/Sasy Mankan\/[one]\/Alzheimer [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Sasy Mankan\/[one]\/Alzheimer [WikiSeda].mp3"},{"id":"144082","type":"song","artist":"\u0634\u06a9\u06cc\u0644\u0627","artist_id":"234","songname":"\u0641\u0642\u0637 \u062a\u0648","popularity":"4.7","ratecount":"10","view":"6869","time":"3:25","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/wjm6g3wgq-1410533546.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Shakila\/Gallery\/[Medium]\/otkjgbn9-1410533546.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Shakila\/-\/Only+You","mp3":"http:\/\/85.25.95.231\/music\/S\/Shakila\/[one]\/Only You [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Shakila\/[one]\/Only You [WikiSeda].mp3"},{"id":"144081","type":"song","artist":"\u0622\u0631\u0627\u062f \u0622\u0631\u06cc\u0627","artist_id":"4211","songname":"\u0644\u0639\u0646\u062a\u06cc","popularity":"4.1","ratecount":"7","view":"2021","time":"4:51","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/frk491d4i-1410533006.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Arad Ariya\/Gallery\/[Medium]\/u6p1p3cn-1410533006.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Arad+Ariya\/-\/Lanati","mp3":"http:\/\/85.25.95.231\/music\/A\/Arad Ariya\/[one]\/Lanati [WikiSeda].mp3"},{"id":"144079","type":"song","artist":"\u0646\u06af\u06cc\u0646","artist_id":"402","songname":"\u062f\u0648\u0633\u062a \u062f\u0627\u0631\u0645","popularity":"3","ratecount":"6","view":"951","time":"3:23","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/27diix2m6-1410525804.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/N\/Negin\/Gallery\/[Medium]\/yjibcfqe-1410525804.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Negin\/-\/Dooset+Daram","mp3":"http:\/\/85.25.95.231\/music\/N\/Negin\/[one]\/Dooset Daram [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/N\/Negin\/[one]\/Dooset Daram [WikiSeda].mp3"},{"id":"144078","type":"song","artist":"\u0645\u0639\u06cc\u0646 \u06a9\u0627\u0631\u06af\u0631\u06cc","artist_id":"12816","songname":"\u0633\u0627\u062f\u0647","popularity":"0","ratecount":"0","view":"271","time":"3:36","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/3gah4n89m-1410511495.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Moein Kargari\/Gallery\/[Medium]\/vifwf9tp-1410511495.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Moein+Kargari\/-\/Simple","mp3":"http:\/\/85.25.95.231\/music\/M\/Moein Kargari\/[one]\/Simple [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Moein Kargari\/[one]\/Simple [WikiSeda].mp3"},{"id":"144074","type":"song","artist":"\u06af\u0631\u0648\u0647 \u06a9\u0627\u0631\u062e\u0648\u0646\u0647","artist_id":"12805","songname":"\u0698\u0627\u0646\u0631 \u0648\u062d\u0634\u062a","popularity":"5","ratecount":"2","view":"319","time":"2:6","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/8oj9c8bs5-1410503574.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/K\/Karkhoone Records\/Gallery\/[Medium]\/385ev1as-1410503574.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Karkhoone+Records\/-\/Genre+Vahshat","mp3":"http:\/\/85.25.95.231\/music\/K\/Karkhoone Records\/[one]\/Genre Vahshat [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/K\/Karkhoone Records\/[one]\/Genre Vahshat [WikiSeda].mp3"},{"id":"144071","type":"song","artist":"\u0646\u0626\u0648\u0645\u06cc\u06a9\u0633","artist_id":"5288","songname":"\u06cc\u06a9 \u0628\u0627\u0631","popularity":"5","ratecount":"1","view":"268","time":"0:0","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/yhve5kcm39-1410502327.jpg","poster_big":"http:\/\/85.25.95.231\/music\/N\/Neomix\/Gallery\/[Medium]\/4a7965q2-1410502327.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Neomix\/-\/Yek+Bar","mp3":"http:\/\/85.25.95.231\/music\/N\/Neomix\/[one]\/Yek Bar [WikiSeda].mp3"},{"id":"143998","type":"song","artist":"\u0628\u0646\u06cc\u0627\u0645\u06cc\u0646 \u0628\u0647\u0627\u062f\u0631\u06cc","artist_id":"71","songname":"\u0645\u062d\u062f\u0648\u062f\u06cc\u062a","popularity":"4.3","ratecount":"76","view":"26676","time":"4:11","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/djvp7gmd3-1410286048.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Benyamin\/Gallery\/[Medium]\/aqn2wapr-1410286048.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Benyamin\/-\/Mahdoodiat","mp3":"http:\/\/85.25.95.231\/music\/B\/Benyamin\/[one]\/Mahdoodiat [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Benyamin\/[one]\/Mahdoodiat [WikiSeda].mp3"},{"id":"144107","type":"song","artist":"\u0645\u062d\u0633\u0646 \u0632\u0627\u0631\u0639\u06cc","artist_id":"8131","songname":"\u06af\u0644 \u06af\u0644\u062f\u0648\u0646","popularity":"0","ratecount":"0","view":"62","time":"3:27","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/82zn9ctow-1410625579.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Mohsen Zarei\/Gallery\/[Medium]\/ei02wu2o-1410625579.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Mohsen+Zarei\/-\/Gole+Goldoon","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen Zarei\/[one]\/Gole Goldoon [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen Zarei\/[one]\/Gole Goldoon [WikiSeda].mp3"},{"id":"144105","type":"song","artist":"\u0639\u0645\u0627\u062f \u0645\u06cc\u0631","artist_id":"8897","songname":"\u0622\u062e\u0631 \u062e\u0637","popularity":"0","ratecount":"0","view":"65","time":"3:16","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/wvs4hl97l-1410610415.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/E\/Emad Mir\/Gallery\/[Medium]\/8mf1mr7w-1410610415.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Emad+Mir\/-\/Akhare+Khat","mp3":"http:\/\/85.25.95.231\/music\/E\/Emad Mir\/[one]\/Akhare Khat [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/E\/Emad Mir\/[one]\/Akhare Khat [WikiSeda].mp3"},{"id":"144069","type":"song","artist":"\u0639\u0644\u06cc\u0631\u0636\u0627 \u0627\u062d\u0645\u062f\u06cc","artist_id":"1281","songname":"\u06a9\u06cc \u0639\u0627\u0634\u0642\u062a\u0647","popularity":"5","ratecount":"2","view":"509","time":"3:9","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/6aids6obm-1410498078.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Ali Reza Ahmadi\/Gallery\/[Medium]\/qy4yiyn8-1410498078.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Ali+Reza+Ahmadi\/-\/Ki+Asheghete","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Reza Ahmadi\/[one]\/Ki Asheghete [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Reza Ahmadi\/[one]\/Ki Asheghete [WikiSeda].mp3"},{"id":"144068","type":"song","artist":"\u0639\u0645\u0627\u062f \u0637\u0627\u0644\u0628 \u0632\u0627\u062f\u0647","artist_id":"101","songname":"\u0627\u0639\u062a\u0631\u0627\u0641","popularity":"3.4","ratecount":"21","view":"7165","time":"2:38","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/tmzq3uep9-1410458435.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/E\/Emad Talebzade\/Gallery\/[Medium]\/enlzsnz8-1410458435.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Emad+Talebzade\/-\/Eteraf","mp3":"http:\/\/85.25.95.231\/music\/E\/Emad Talebzade\/[one]\/Eteraf [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/E\/Emad Talebzade\/[one]\/Eteraf [WikiSeda].mp3"},{"id":"144065","type":"song","artist":"\u0639\u0644\u06cc \u06a9\u06cc\u0627\u0646","artist_id":"8808","songname":"\u0645\u0628\u062a\u0644\u0627","popularity":"0","ratecount":"0","view":"409","time":"3:43","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/9ibdj002e-1410454678.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Ali Kian\/Gallery\/[Medium]\/lmiisn0w-1410454678.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Ali+Kian\/-\/Mobtala","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Kian\/[one]\/Mobtala [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Kian\/[one]\/Mobtala [WikiSeda].mp3"},{"id":"144064","type":"song","artist":"\u0627\u0645\u06cc\u0631 \u062a\u062a\u0644\u0648","artist_id":"66","songname":"\u062a\u0648 \u062a\u0648 \u062f\u06cc\u062f \u0645\u0646 \u0646\u06cc\u0633\u062a\u06cc","popularity":"3.9","ratecount":"52","view":"11862","time":"3:38","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/gxxuxxbqx-1410453149.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amir Tataloo\/Gallery\/[Medium]\/jgpzla2g-1410453149.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/-\/To+Too+Dide+Man+Nisti","mp3":"http:\/\/85.25.95.231\/music\/A\/Amir Tataloo\/[one]\/To Too Dide Man Nisti [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amir Tataloo\/[one]\/To Too Dide Man Nisti [WikiSeda].mp3"},{"id":"144063","type":"song","artist":"\u06cc\u0648\u0633\u0641","artist_id":"7722","songname":"\u0646\u0641\u0631\u06cc\u0646","popularity":"2","ratecount":"1","view":"442","time":"3:21","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/bv6rf41rx-1410452948.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/Y\/Yousef\/Gallery\/[Medium]\/esi1p973-1410452948.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Yousef\/-\/Nefrin","mp3":"http:\/\/85.25.95.231\/music\/Y\/Yousef\/[one]\/Nefrin [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/Y\/Yousef\/[one]\/Nefrin [WikiSeda].mp3"},{"id":"144062","type":"song","artist":"\u0633\u0639\u06cc\u062f \u0639\u0631\u0628","artist_id":"3942","songname":"\u0645\u0627\u0647 \u0642\u0634\u0646\u06af\u0645","popularity":"3.2","ratecount":"11","view":"4080","time":"3:0","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/f4t9hrd1e-1410448224.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Saeid Arba\/Gallery\/[Medium]\/tced7hjw-1410448224.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Saeid+Arba\/-\/Mahe+Ghashangam","mp3":"http:\/\/85.25.95.231\/music\/S\/Saeid Arba\/[one]\/Mahe Ghashangam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saeid Arba\/[one]\/Mahe Ghashangam [WikiSeda].mp3"},{"id":"144060","type":"song","artist":"\u0639\u0645\u0627\u062f","artist_id":"1256","songname":"\u062f\u062e\u062a\u0631\u0639\u0645\u0648 \u062c\u0627\u0646","popularity":"4.2","ratecount":"22","view":"7185","time":"3:12","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/oxxkjen2g-1410438906.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/E\/Emad\/Gallery\/[Medium]\/tt90ch28-1410438906.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Emad\/-\/Dokhtar+Amou+Jan","mp3":"http:\/\/85.25.95.231\/music\/E\/Emad\/[one]\/Dokhtar Amou Jan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/E\/Emad\/[one]\/Dokhtar Amou Jan [WikiSeda].mp3"},{"id":"144058","type":"song","artist":"\u0646\u062f\u06cc\u0645","artist_id":"673","songname":"\u06a9\u0645 \u0622\u0648\u0631\u062f\u0645","popularity":"3.7","ratecount":"29","view":"8236","time":"3:2","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/9v0rb25w5-1410435028.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/N\/Nadim\/Gallery\/[Medium]\/t1i6uznl-1410435028.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Nadim\/-\/Kam+Avordam","mp3":"http:\/\/85.25.95.231\/music\/N\/Nadim\/[one]\/Kam Avordam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/N\/Nadim\/[one]\/Kam Avordam [WikiSeda].mp3"},{"id":"144056","type":"song","artist":"\u062d\u0633\u06cc\u0646 \u062a\u0647\u06cc","artist_id":"149","songname":"\u0631\u0645\u06cc\u06a9\u0633 \u062f\u0646\u06cc\u0627\u0645\u06cc \u0686\u0631\u062e\u06472","popularity":"5","ratecount":"2","view":"1250","time":"4:59","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/lerdxquwj-1410424755.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/H\/Hossein Tohi\/Gallery\/[Medium]\/oagioqcm-1410424755.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Hossein+Tohi\/-\/Donya+Micharkhe2+Remix+By+Dj+Sina","mp3":"http:\/\/85.25.95.231\/music\/H\/Hossein Tohi\/[one]\/Donya Micharkhe2 Remix By Dj Sina [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/Hossein Tohi\/[one]\/Donya Micharkhe2 Remix By Dj Sina [WikiSeda].mp3"},{"id":"144055","type":"song","artist":"\u06a9\u0644\u0645 \u0628\u0646\u062f","artist_id":"9154","songname":"\u062f\u0644\u06cc","popularity":"5","ratecount":"1","view":"612","time":"3:52","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/aiwxthfd5-1410417638.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/K\/Kalam Band\/Gallery\/[Medium]\/re4o8vlj-1410417638.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Kalam+Band\/-\/Dalli","mp3":"http:\/\/85.25.95.231\/music\/K\/Kalam Band\/[one]\/Dalli [WikiSeda].mp3"},{"id":"144053","type":"song","artist":"\u062d\u0627\u0645\u062f \u067e\u0647\u0644\u0627\u0646","artist_id":"166","songname":"\u062f\u0627\u063a\u062a \u0646\u0628\u06cc\u0646\u0645","popularity":"2.2","ratecount":"21","view":"3526","time":"2:53","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/0y3t2sehz-1410408919.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/H\/hamed pahlan\/Gallery\/[Medium]\/7kuzz8tg-1410408919.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/hamed+pahlan\/-\/Daghet+Nabinam","mp3":"http:\/\/85.25.95.231\/music\/H\/hamed pahlan\/[one]\/Daghet Nabinam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/H\/hamed pahlan\/[one]\/Daghet Nabinam [WikiSeda].mp3"},{"id":"144057","type":"song","artist":"\u0639\u0644\u06cc\u0631\u0636\u0627 \u0645\u062e\u062a\u0627\u0631\u06cc","artist_id":"6972","songname":"\u062f\u0645\u0648 \u0622\u0647\u0646\u06af \u0627\u0633\u0627\u06cc\u0634\u06af\u0627\u0647 \u0648 \u0645\u0631\u062f","popularity":"4","ratecount":"1","view":"2712","time":"0:32","date":"1393-06-19","poster":"http:\/\/85.25.243.154\/img\/99chjnqt9-1410433318.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Alireza Mokhtari\/Gallery\/[Medium]\/w8yii3qo-1410433318.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Alireza+Mokhtari\/-\/Demo+Of+Mard+And+Asayeshgah","mp3":"http:\/\/85.25.95.231\/music\/A\/Alireza Mokhtari\/[one]\/Demo Of Mard And Asayeshgah [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Alireza Mokhtari\/[one]\/Demo Of Mard And Asayeshgah [WikiSeda].mp3"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    } else if (this.option === 2) {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"144059","type":"song","artist":"\u0645\u0631\u062a\u0636\u06cc \u067e\u0627\u0634\u0627\u06cc\u06cc","artist_id":"122","songname":"\u0631\u0648\u0632\u0647\u0627\u06cc \u0633\u062e\u062a","popularity":"4.1","ratecount":"42","view":"11855","time":"0:15","date":"1393-06-22","poster":"http:\/\/85.25.243.154\/img\/zala9mpkrw-1410625982.jpg","poster_big":"http:\/\/85.25.243.154\/music\/M\/Morteza pashaei\/Gallery\/[Medium]\/nesy8r9s-1410625982.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Morteza+pashaei\/-\/Roozhaye+Sakht","mp3":"http:\/\/85.25.243.154\/music\/M\/Morteza pashaei\/[one]\/Roozhaye Sakht [WikiSeda].mp3"},{"id":"144008","type":"song","artist":"\u0645\u0647\u062f\u06cc \u0627\u062d\u0645\u062f\u0648\u0646\u062f","artist_id":"833","songname":"\u062d\u0627\u0644 \u0645\u0646","popularity":"4.9","ratecount":"32","view":"8626","time":"3:10","date":"1393-06-22","year":"1393","album":"\u0627\u0632 \u0627\u06cc\u0646 \u0633\u0627\u0639\u062a","album_id":"10012","poster":"http:\/\/85.25.243.154\/img\/7ktcds8y0a-1410329928.jpg","url":"http:\/\/www.wikiseda.com\/Mehdi+Ahmadvand\/Az+In+Saat\/Hale+Man","mp3":"http:\/\/85.25.95.231\/music\/M\/Mehdi Ahmadvand\/Az In Saat\/Hale Man [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mehdi Ahmadvand\/Az In Saat\/Hale Man [WikiSeda].mp3"},{"id":"144087","type":"song","artist":"\u0627\u0641\u0634\u06cc\u0646 \u0622\u0630\u0631\u06cc","artist_id":"248","songname":"\u0645\u0646\u0648 \u0646\u0628\u062e\u0634","popularity":"3.7","ratecount":"27","view":"5373","time":"4:32","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/5vyfvmil2i-1410547282.jpg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Afshin Azari\/Gallery\/[Medium]\/26jogokf-1410547282.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Afshin+Azari\/-\/Mano+Nabakhsh","mp3":"http:\/\/85.25.95.231\/music\/A\/Afshin Azari\/[one]\/Mano Nabakhsh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Afshin Azari\/[one]\/Mano Nabakhsh [WikiSeda].mp3"},{"id":"144083","type":"song","artist":"\u0633\u0627\u0633\u06cc \u0645\u0627\u0646\u06a9\u0646","artist_id":"334","songname":"\u0622\u0644\u0632\u0627\u06cc\u0645\u0631","popularity":"3.4","ratecount":"30","view":"8249","time":"3:15","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/javzswwflu-1410541031.jpg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Sasy Mankan\/Gallery\/[Medium]\/g1z3kicg-1410541031.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Sasy+Mankan\/-\/Alzheimer","mp3":"http:\/\/85.25.95.231\/music\/S\/Sasy Mankan\/[one]\/Alzheimer [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Sasy Mankan\/[one]\/Alzheimer [WikiSeda].mp3"},{"id":"144082","type":"song","artist":"\u0634\u06a9\u06cc\u0644\u0627","artist_id":"234","songname":"\u0641\u0642\u0637 \u062a\u0648","popularity":"5","ratecount":"8","view":"6048","time":"3:25","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/wjm6g3wgq-1410533546.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Shakila\/Gallery\/[Medium]\/otkjgbn9-1410533546.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Shakila\/-\/Only+You","mp3":"http:\/\/85.25.95.231\/music\/S\/Shakila\/[one]\/Only You [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Shakila\/[one]\/Only You [WikiSeda].mp3"},{"id":"144081","type":"song","artist":"\u0622\u0631\u0627\u062f \u0622\u0631\u06cc\u0627","artist_id":"4211","songname":"\u0644\u0639\u0646\u062a\u06cc","popularity":"4.1","ratecount":"7","view":"1833","time":"4:51","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/frk491d4i-1410533006.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Arad Ariya\/Gallery\/[Medium]\/u6p1p3cn-1410533006.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Arad+Ariya\/-\/Lanati","mp3":"http:\/\/85.25.95.231\/music\/A\/Arad Ariya\/[one]\/Lanati [WikiSeda].mp3"},{"id":"143998","type":"song","artist":"\u0628\u0646\u06cc\u0627\u0645\u06cc\u0646 \u0628\u0647\u0627\u062f\u0631\u06cc","artist_id":"71","songname":"\u0645\u062d\u062f\u0648\u062f\u06cc\u062a","popularity":"4.3","ratecount":"76","view":"25995","time":"4:11","date":"1393-06-21","poster":"http:\/\/85.25.243.154\/img\/djvp7gmd3-1410286048.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Benyamin\/Gallery\/[Medium]\/aqn2wapr-1410286048.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Benyamin\/-\/Mahdoodiat","mp3":"http:\/\/85.25.95.231\/music\/B\/Benyamin\/[one]\/Mahdoodiat [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Benyamin\/[one]\/Mahdoodiat [WikiSeda].mp3"},{"id":"144068","type":"song","artist":"\u0639\u0645\u0627\u062f \u0637\u0627\u0644\u0628 \u0632\u0627\u062f\u0647","artist_id":"101","songname":"\u0627\u0639\u062a\u0631\u0627\u0641","popularity":"3.4","ratecount":"19","view":"6951","time":"2:38","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/tmzq3uep9-1410458435.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/E\/Emad Talebzade\/Gallery\/[Medium]\/enlzsnz8-1410458435.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Emad+Talebzade\/-\/Eteraf","mp3":"http:\/\/85.25.95.231\/music\/E\/Emad Talebzade\/[one]\/Eteraf [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/E\/Emad Talebzade\/[one]\/Eteraf [WikiSeda].mp3"},{"id":"144064","type":"song","artist":"\u0627\u0645\u06cc\u0631 \u062a\u062a\u0644\u0648","artist_id":"66","songname":"\u062a\u0648 \u062a\u0648 \u062f\u06cc\u062f \u0645\u0646 \u0646\u06cc\u0633\u062a\u06cc","popularity":"3.9","ratecount":"47","view":"11056","time":"3:38","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/gxxuxxbqx-1410453149.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amir Tataloo\/Gallery\/[Medium]\/jgpzla2g-1410453149.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/-\/To+Too+Dide+Man+Nisti","mp3":"http:\/\/85.25.95.231\/music\/A\/Amir Tataloo\/[one]\/To Too Dide Man Nisti [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amir Tataloo\/[one]\/To Too Dide Man Nisti [WikiSeda].mp3"},{"id":"144062","type":"song","artist":"\u0633\u0639\u06cc\u062f \u0639\u0631\u0628","artist_id":"3942","songname":"\u0645\u0627\u0647 \u0642\u0634\u0646\u06af\u0645","popularity":"3.2","ratecount":"11","view":"3945","time":"3:0","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/f4t9hrd1e-1410448224.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Saeid Arba\/Gallery\/[Medium]\/tced7hjw-1410448224.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Saeid+Arba\/-\/Mahe+Ghashangam","mp3":"http:\/\/85.25.95.231\/music\/S\/Saeid Arba\/[one]\/Mahe Ghashangam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saeid Arba\/[one]\/Mahe Ghashangam [WikiSeda].mp3"},{"id":"144060","type":"song","artist":"\u0639\u0645\u0627\u062f","artist_id":"1256","songname":"\u062f\u062e\u062a\u0631\u0639\u0645\u0648 \u062c\u0627\u0646","popularity":"4.2","ratecount":"22","view":"6937","time":"3:12","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/oxxkjen2g-1410438906.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/E\/Emad\/Gallery\/[Medium]\/tt90ch28-1410438906.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Emad\/-\/Dokhtar+Amou+Jan","mp3":"http:\/\/85.25.95.231\/music\/E\/Emad\/[one]\/Dokhtar Amou Jan [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/E\/Emad\/[one]\/Dokhtar Amou Jan [WikiSeda].mp3"},{"id":"144058","type":"song","artist":"\u0646\u062f\u06cc\u0645","artist_id":"673","songname":"\u06a9\u0645 \u0622\u0648\u0631\u062f\u0645","popularity":"3.7","ratecount":"29","view":"8003","time":"3:2","date":"1393-06-20","poster":"http:\/\/85.25.243.154\/img\/9v0rb25w5-1410435028.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/N\/Nadim\/Gallery\/[Medium]\/t1i6uznl-1410435028.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Nadim\/-\/Kam+Avordam","mp3":"http:\/\/85.25.95.231\/music\/N\/Nadim\/[one]\/Kam Avordam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/N\/Nadim\/[one]\/Kam Avordam [WikiSeda].mp3"},{"id":"144054","type":"song","artist":"\u0639\u0644\u06cc \u06a9\u06cc\u0627\u0646\u06cc","artist_id":"2867","songname":"\u06cc\u06a9\u06cc \u0648 \u062a\u0646\u0647\u0627","popularity":"4.5","ratecount":"12","view":"3846","time":"4:10","date":"1393-06-19","poster":"http:\/\/85.25.243.154\/img\/gpjix5joo-1410413326.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Ali Kiani\/Gallery\/[Medium]\/fdav90ot-1410413326.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Ali+Kiani\/-\/One+And+Only","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Kiani\/[one]\/One And Only [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Kiani\/[one]\/One And Only [WikiSeda].mp3"},{"id":"144037","type":"song","artist":"\u0627\u0634\u06a9\u06cc\u0646 0098","artist_id":"192","songname":"\u06cc\u0647 \u0622\u0647\u0646\u06af \u0628\u0632\u0627\u0631 \u0628\u0631\u0642\u0635\u06cc\u0645","popularity":"3.7","ratecount":"23","view":"9284","time":"3:2","date":"1393-06-19","poster":"http:\/\/85.25.243.154\/img\/5tn9grux8-1410372060.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Ashkin0098\/Gallery\/[Medium]\/3kfkzfrr-1410372060.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Ashkin0098\/-\/Ye+Ahang+Bezar+Beraghsim","mp3":"http:\/\/85.25.95.231\/music\/A\/Ashkin0098\/[one]\/Ye Ahang Bezar Beraghsim [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ashkin0098\/[one]\/Ye Ahang Bezar Beraghsim [WikiSeda].mp3"},{"id":"144035","type":"song","artist":"\u0645\u06cc\u062b\u0645 \u0627\u0628\u0631\u0627\u0647\u06cc\u0645\u06cc","artist_id":"779","songname":"\u0642\u0628\u0648\u0644 \u06a9\u0646","popularity":"4.6","ratecount":"23","view":"6168","time":"3:34","date":"1393-06-19","poster":"http:\/\/85.25.243.154\/img\/289ja8lth-1410370447.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Meysam Ebrahimi\/Gallery\/[Medium]\/yi9s41gs-1410370447.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Meysam+Ebrahimi\/-\/Ghabool+Kon","mp3":"http:\/\/85.25.95.231\/music\/M\/Meysam Ebrahimi\/[one]\/Ghabool Kon [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Meysam Ebrahimi\/[one]\/Ghabool Kon [WikiSeda].mp3"},{"id":"143953","type":"song","artist":"\u067e\u0627\u0632\u0644 \u0628\u0627\u0646\u062f","artist_id":"4404","songname":"\u0641\u0631\u0634\u062a\u0647","popularity":"5","ratecount":"21","view":"5605","time":"3:35","date":"1393-06-19","poster":"http:\/\/85.25.243.154\/img\/uz2ev4nd9k-1410183105.jpg","poster_big":"http:\/\/85.25.95.231\/music\/P\/Pazel Band\/Gallery\/[Medium]\/r2zw0uvb-1410183105.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Pazel+Band\/-\/Fereshte","mp3":"http:\/\/85.25.95.231\/music\/P\/Pazel Band\/[one]\/Fereshte [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/P\/Pazel Band\/[one]\/Fereshte [WikiSeda].mp3"},{"id":"143995","type":"song","artist":"\u0646\u0627\u0635\u0631 \u0635\u062f\u0631","artist_id":"1035","songname":"\u062e\u0627\u0637\u0631\u0627\u062a \u062a\u0648","popularity":"2.7","ratecount":"18","view":"7289","time":"3:25","date":"1393-06-18","poster":"http:\/\/85.25.243.154\/img\/2v3uwtiqs-1410276057.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/N\/Naser Sadr\/Gallery\/[Medium]\/hp9y6nu6-1410276057.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Naser+Sadr\/-\/Khaterate+To","mp3":"http:\/\/85.25.95.231\/music\/N\/Naser Sadr\/[one]\/Khaterate To [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/N\/Naser Sadr\/[one]\/Khaterate To [WikiSeda].mp3"},{"id":"143994","type":"song","artist":"\u0639\u0644\u06cc \u0645\u062c\u06cc\u06a9 \u0627\u0645 \u062c\u06cc","artist_id":"7725","songname":"\u0686\u0647\u0627\u0631 \u062a\u0627 \u0631\u0641\u06cc\u0642","popularity":"4.3","ratecount":"8","view":"3979","time":"3:50","date":"1393-06-18","poster":"http:\/\/85.25.243.154\/img\/8txqw68en-1410275724.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Ali Magic Mg\/Gallery\/[Medium]\/bz99v9wa-1410275724.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Ali+Magic+Mg\/-\/Chahar+Ta+Refigh","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Magic Mg\/[one]\/Chahar Ta Refigh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Magic Mg\/[one]\/Chahar Ta Refigh [WikiSeda].mp3","m4v":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/c71a90c873c608351f3ccae3f1f41b29-l.mp4"},{"id":"143986","type":"song","artist":"\u0645\u0633\u0639\u0648\u062f \u0627\u0645\u0627\u0645\u06cc","artist_id":"1905","songname":"\u062f\u0645\u0648\u06cc \u0622\u0644\u0628\u0648\u0645 \u0647\u0645\u06cc\u0634\u06af\u06cc","popularity":"4.5","ratecount":"8","view":"2008","time":"6:25","date":"1393-06-18","poster":"http:\/\/85.25.243.154\/img\/cua5qa17f-1410256286.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Gallery\/[Medium]\/ysv3c4xc-1410256286.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Masoud+Emami\/-\/Hamishegi+Album+Demo","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/[one]\/Hamishegi Album Demo [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/[one]\/Hamishegi Album Demo [WikiSeda].mp3"},{"id":"143470","type":"song","artist":"\u0631\u0636\u0627 \u06cc\u0632\u062f\u0627\u0646\u06cc","artist_id":"65","songname":"\u062e\u0637 \u0648\u06cc\u0698\u0647","popularity":"3.9","ratecount":"22","view":"6707","time":"2:36","date":"1393-06-18","poster":"http:\/\/85.25.243.154\/img\/zh1zt8fare-1410289400.jpg","poster_big":"http:\/\/85.25.95.231\/music\/R\/Reza yazdani\/Gallery\/[Medium]\/7pwciwuj-1410289400.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Reza+yazdani\/-\/Khate+Vizheh","mp3":"http:\/\/85.25.95.231\/music\/R\/Reza yazdani\/[one]\/Khate Vizheh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/Reza yazdani\/[one]\/Khate Vizheh [WikiSeda].mp3"},{"id":"143959","type":"song","artist":"\u0628\u0627\u0628\u06a9 \u062c\u0647\u0627\u0646\u0628\u062e\u0634","artist_id":"255","songname":"\u0645\u062f\u0627\u0631 \u0628\u06cc \u0642\u0631\u0627\u0631\u06cc","popularity":"4.3","ratecount":"121","view":"29923","time":"3:44","date":"1393-06-17","poster":"http:\/\/85.25.243.154\/img\/70m2uuguxz-1410197041.jpg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Babak Jahan Bakhsh\/Gallery\/[Medium]\/8sqvznnu-1410197041.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Babak+Jahan+Bakhsh\/-\/Madare+Bi+Gharari","mp3":"http:\/\/85.25.95.231\/music\/B\/Babak Jahan Bakhsh\/[one]\/Madare Bi Gharari [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Babak Jahan Bakhsh\/[one]\/Madare Bi Gharari [WikiSeda].mp3"},{"id":"143955","type":"song","artist":"\u0645\u0627\u0632\u06cc\u0627\u0631 \u0641\u0644\u0627\u062d\u06cc","artist_id":"74","songname":"\u062a\u0627\u0628 \u06af\u06cc\u0633\u0648","popularity":"4","ratecount":"43","view":"16802","time":"3:28","date":"1393-06-17","poster":"http:\/\/85.25.243.154\/img\/qg11jld11-1410188564.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/maziyar falahi\/Gallery\/[Medium]\/2i9qt85s-1410188564.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/maziyar+falahi\/-\/Taabe+Gisoo","mp3":"http:\/\/85.25.95.231\/music\/M\/maziyar falahi\/[one]\/Taabe Gisoo [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/maziyar falahi\/[one]\/Taabe Gisoo [WikiSeda].mp3"},{"id":"143949","type":"song","artist":"\u0631\u0636\u0627 \u0631\u0648\u062d\u0627\u0646\u06cc","artist_id":"7541","songname":"\u0645\u0646 \u0648 \u062a\u0648","popularity":"0","ratecount":"0","view":"62","time":"3:50","date":"1393-06-17","poster":"http:\/\/85.25.243.154\/img\/owis7x1iu-1410164086.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/R\/Reza Rohani\/Gallery\/[Medium]\/f2ic3174-1410164086.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Reza+Rohani\/-\/Manoto","mp3":"http:\/\/85.25.95.231\/music\/R\/Reza Rohani\/[one]\/Manoto [WikiSeda].mp3"},{"id":"143948","type":"song","artist":"\u0633\u0627\u0631\u0627 \u0646\u0627\u06cc\u06cc\u0646\u06cc","artist_id":"9430","songname":"\u0645\u0646 \u0648 \u062a\u0648","popularity":"3.6","ratecount":"13","view":"4684","time":"3:50","date":"1393-06-17","poster":"http:\/\/85.25.243.154\/img\/owis7x1iu-1410164086.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Sara Naeini\/Gallery\/[Medium]\/e1r367ij-1410164086.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Sara+Naeini\/-\/Manoto","mp3":"http:\/\/85.25.95.231\/music\/S\/Sara Naeini\/[one]\/Manoto [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Sara Naeini\/[one]\/Manoto [WikiSeda].mp3"},{"id":"143938","type":"song","artist":"\u0633\u0639\u06cc\u062f \u0645\u062f\u0631\u0633","artist_id":"104","songname":"\u062f\u06cc\u0648\u0646\u06af\u06cc","popularity":"4.5","ratecount":"11","view":"5150","time":"3:33","date":"1393-06-16","poster":"http:\/\/85.25.243.154\/img\/uqszhsh0v-1410112870.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/S\/saeed modarres\/Gallery\/[Medium]\/3e9inq3x-1410112870.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/saeed+modarres\/-\/Divoonegi","mp3":"http:\/\/85.25.95.231\/music\/S\/saeed modarres\/[one]\/Divoonegi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/saeed modarres\/[one]\/Divoonegi [WikiSeda].mp3"},{"id":"143911","type":"song","artist":"\u062f\u0627\u06cc\u0627\u0646","artist_id":"5663","songname":"\u0627\u0644\u06a9\u0644","popularity":"4.4","ratecount":"49","view":"15439","time":"5:7","date":"1393-06-15","poster":"http:\/\/85.25.243.154\/img\/vzm3zirhy-1410021677.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/D\/Dayan\/Gallery\/[Medium]\/05oorbxe-1410021677.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Dayan\/-\/Alcohol","mp3":"http:\/\/85.25.95.231\/music\/D\/Dayan\/[one]\/Alcohol [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/D\/Dayan\/[one]\/Alcohol [WikiSeda].mp3"},{"id":"143877","type":"song","artist":"\u0645\u0633\u06cc\u062d","artist_id":"563","songname":"\u062a\u0627\u0628\u0633\u062a\u0627\u0646","popularity":"4.5","ratecount":"13","view":"7342","time":"3:15","date":"1393-06-14","poster":"http:\/\/85.25.243.154\/img\/lylhhvhef-1409937262.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Masih\/Gallery\/[Medium]\/qn98ii2j-1409937262.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Masih\/-\/Summer","mp3":"http:\/\/85.25.95.231\/music\/M\/Masih\/[one]\/Summer [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masih\/[one]\/Summer [WikiSeda].mp3"},{"id":"143876","type":"song","artist":"\u0627\u0645\u06cc\u0631 \u0627\u0633\u06cc\u062f","artist_id":"415","songname":"\u062d\u0633 \u062e\u0648\u0628","popularity":"4.3","ratecount":"12","view":"4326","time":"3:17","date":"1393-06-14","poster":"http:\/\/85.25.243.154\/img\/3ob1m1dm6-1409930349.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amir Asid\/Gallery\/[Medium]\/710c46gd-1409930349.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amir+Asid\/-\/Hese+Khoob","mp3":"http:\/\/85.25.95.231\/music\/A\/Amir Asid\/[one]\/Hese Khoob [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amir Asid\/[one]\/Hese Khoob [WikiSeda].mp3"},{"id":"143799","type":"song","artist":"\u0639\u0644\u06cc \u0647\u0627\u06cc\u067e\u0631","artist_id":"868","songname":"\u062e\u0627\u0637\u0631\u062a \u062e\u06cc\u0644\u06cc \u0639\u0632\u06cc\u0632\u0647","popularity":"4.5","ratecount":"13","view":"5478","time":"2:52","date":"1393-06-14","poster":"http:\/\/85.25.243.154\/img\/jcu4nqdyg-1409915321.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Ali Hyper\/Gallery\/[Medium]\/acgi20nz-1409915321.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Ali+Hyper\/-\/Khateret+Kheyli+Azize","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Hyper\/[one]\/Khateret Kheyli Azize [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Hyper\/[one]\/Khateret Kheyli Azize [WikiSeda].mp3"},{"id":"143798","type":"song","artist":"\u0627\u0645\u0648 \u0628\u0627\u0646\u062f","artist_id":"6232","songname":"\u062f\u0648\u0633\u062a \u062f\u0627\u0631\u0645","popularity":"4.1","ratecount":"20","view":"4955","time":"3:10","date":"1393-06-14","poster":"http:\/\/85.25.243.154\/img\/z58kia23f-1409909686.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/E\/Emo Band\/Gallery\/[Medium]\/eqbt7t23-1409909686.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Emo+Band\/-\/Dooset+Daram","mp3":"http:\/\/85.25.95.231\/music\/E\/Emo Band\/[one]\/Dooset Daram [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/E\/Emo Band\/[one]\/Dooset Daram [WikiSeda].mp3"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    }
    if (this.option === 'search') {
      return console.log('Search');
    }
  };

  SongModel.prototype.loadmore = function() {
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

  SongModel.prototype.refresh = function() {
    if (this.loading === true) {
      return;
    }
    this._emit('refresh');
    return this.get();
  };

  SongModel.prototype.setOption = function(option) {
    this.option = option;
    if (this.loading === true) {
      return;
    }
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
    this.loading = false;
  }

  VideoModel.prototype.get = function() {
    if (this.loading === true) {
      return;
    }
    this.loading = true;
    if (this.option === 0) {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"4119","type":"video","artist":"\u0645\u062d\u0633\u0646 \u0686\u0627\u0648\u0634\u06cc","poster":"http:\/\/85.25.243.154\/video\/M\/Mohsen Chavoshi\/1393\/05\/\/[Gallery]\/de8cb2889c60b266a451990ffbe37822-3.jpg","time":"3:38","videoname":"\u063a\u0644\u0637 \u06a9\u0631\u062f\u0645","lowq":"http:\/\/85.25.243.154\/video\/M\/Mohsen Chavoshi\/1393\/05\/\/de8cb2889c60b266a451990ffbe37822-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Mohsen Chavoshi\/1393\/05\/\/de8cb2889c60b266a451990ffbe37822-h.mp4","popularity":"4.3","view":"6564","url":"http:\/\/www.wikiseda.com\/Mohsen+Chavoshi\/+video\/Ghalat+Kardam","year":"1393"},{"id":"4112","type":"video","artist":"\u0645\u0647\u062f\u06cc \u0627\u062d\u0645\u062f\u0648\u0646\u062f","poster":"http:\/\/85.25.243.154\/video\/M\/Mehdi Ahmadvand\/1393\/05\/\/[Gallery]\/8b93fbe94d83753873482f17285884f8-3.jpg","time":"3:26","videoname":"\u062a\u06cc\u0632\u0631 \u0622\u0644\u0628\u0648\u0645 \u0627\u0632 \u0627\u06cc\u0646 \u0633\u0627\u0639\u062a","lowq":"http:\/\/85.25.243.154\/video\/M\/Mehdi Ahmadvand\/1393\/05\/\/8b93fbe94d83753873482f17285884f8-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Mehdi Ahmadvand\/1393\/05\/\/8b93fbe94d83753873482f17285884f8-h.mp4","popularity":"4.2","view":"4513","url":"http:\/\/www.wikiseda.com\/Mehdi+Ahmadvand\/+video\/Az+In+Saat+Tizer+Album","year":"1393"},{"id":"4165","type":"video","artist":"\u0645\u0631\u062a\u0636\u06cc \u067e\u0627\u0634\u0627\u06cc\u06cc","poster":"http:\/\/85.25.243.154\/video\/M\/Morteza pashaei\/1393\/06\/\/[Gallery]\/3ef3fddc07a21ed91cf251f78f23d652-3.jpg","time":"3:33","videoname":"\u0631\u0648\u0632 \u0628\u0631\u0641\u06cc","lowq":"http:\/\/85.25.243.154\/video\/M\/Morteza pashaei\/1393\/06\/\/3ef3fddc07a21ed91cf251f78f23d652-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Morteza pashaei\/1393\/06\/\/3ef3fddc07a21ed91cf251f78f23d652-h.mp4","popularity":"4.6","view":"8145","url":"http:\/\/www.wikiseda.com\/Morteza+pashaei\/+video\/Rooze+Barfi","year":"1393"},{"id":"4131","type":"video","artist":"\u0634\u0647\u0627\u0628 \u062a\u06cc\u0627\u0645","poster":"http:\/\/85.25.243.154\/video\/S\/Shahab Tiam\/1393\/06\/\/[Gallery]\/28413b310693fef885934a1131e43945-3.jpg","time":"3:41","videoname":"\u0633\u0648 \u062a\u0641\u0627\u0647\u0645","lowq":"http:\/\/85.25.243.154\/video\/S\/Shahab Tiam\/1393\/06\/\/28413b310693fef885934a1131e43945-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shahab Tiam\/1393\/06\/\/28413b310693fef885934a1131e43945-h.mp4","popularity":"4.1","view":"5698","url":"http:\/\/www.wikiseda.com\/Shahab+Tiam\/+video\/Sue+Tafahom","year":"1393"},{"id":"4097","type":"video","artist":"25 \u0628\u0627\u0646\u062f","poster":"http:\/\/85.25.243.154\/video\/2\/25 band\/1393\/05\/\/[Gallery]\/dff84d5f85b963b98ef42ee4aa135c1e-3.jpg","time":"4:4","videoname":"\u0627\u0632 \u067e\u06cc\u0634\u0645 \u0645\u06cc\u0631\u06cc","lowq":"http:\/\/85.25.243.154\/video\/2\/25 band\/1393\/05\/\/dff84d5f85b963b98ef42ee4aa135c1e-l.mp4","highq":"http:\/\/85.25.243.154\/video\/2\/25 band\/1393\/05\/\/dff84d5f85b963b98ef42ee4aa135c1e-h.mp4","popularity":"4.6","view":"2479","url":"http:\/\/www.wikiseda.com\/25+band\/+video\/Az+Pisham+Miri","year":"1393"},{"id":"4118","type":"video","artist":"\u06af\u0631\u0648\u0647 \u0645\u0627\u0647 \u0628\u0627\u0646\u0648","poster":"http:\/\/85.25.243.154\/video\/M\/Mah Bano Group\/1393\/05\/\/[Gallery]\/43f488352786d42adeecf97590819d23-3.jpg","time":"4:42","videoname":"\u062c\u0627\u0646 \u0639\u0627\u0634\u0642","lowq":"http:\/\/85.25.243.154\/video\/M\/Mah Bano Group\/1393\/05\/\/43f488352786d42adeecf97590819d23-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Mah Bano Group\/1393\/05\/\/43f488352786d42adeecf97590819d23-h.mp4","popularity":"3.6","view":"1523","url":"http:\/\/www.wikiseda.com\/Mah+Bano+Group\/+video\/Jan+Ashegh","year":"1393"},{"id":"4094","type":"video","artist":"\u0627\u0645\u06cc\u062f","poster":"http:\/\/85.25.243.154\/video\/O\/Omid\/1393\/05\/\/[Gallery]\/b76300b87ec8246cf4a10720e14c5f42-3.jpg","time":"4:11","videoname":"\u062e\u0648\u0634 \u0642\u062f\u0645","lowq":"http:\/\/85.25.243.154\/video\/O\/Omid\/1393\/05\/\/b76300b87ec8246cf4a10720e14c5f42-l.mp4","highq":"http:\/\/85.25.243.154\/video\/O\/Omid\/1393\/05\/\/b76300b87ec8246cf4a10720e14c5f42-h.mp4","popularity":"4.7","view":"2176","url":"http:\/\/www.wikiseda.com\/Omid\/+video\/Khosh+Ghadam","year":"1393"},{"id":"4115","type":"video","artist":"\u0639\u0644\u06cc \u067e\u06cc\u0634\u062a\u0627\u0632","poster":"http:\/\/85.25.243.154\/video\/A\/Ali Pishtaz\/1393\/05\/\/[Gallery]\/ee2722ea2498645ab87d3170599528ef-3.jpg","time":"3:11","videoname":"\u062d\u0633 \u062c\u062f\u06cc\u062f","lowq":"http:\/\/85.25.243.154\/video\/A\/Ali Pishtaz\/1393\/05\/\/ee2722ea2498645ab87d3170599528ef-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ali Pishtaz\/1393\/05\/\/ee2722ea2498645ab87d3170599528ef-h.mp4","popularity":"4.3","view":"1537","url":"http:\/\/www.wikiseda.com\/Ali+Pishtaz\/+video\/Hese+Jadid","year":"1393"},{"id":"4162","type":"video","artist":"\u0648\u0644\u06cc","poster":"http:\/\/85.25.243.154\/video\/V\/Vali\/1393\/06\/\/[Gallery]\/0f9356d0b3ab73c803cbda9879593ea6-3.jpg","time":"3:41","videoname":"\u0628\u06cc\u0627 \u062a\u0648 \u0639\u0627\u0634\u0642\u0645 \u0628\u0627\u0634","lowq":"http:\/\/85.25.243.154\/video\/V\/Vali\/1393\/06\/\/0f9356d0b3ab73c803cbda9879593ea6-l.mp4","highq":"http:\/\/85.25.243.154\/video\/V\/Vali\/1393\/06\/\/0f9356d0b3ab73c803cbda9879593ea6-h.mp4","popularity":"3.1","view":"5989","url":"http:\/\/www.wikiseda.com\/Vali\/+video\/Bia+TO+Ashegham+Bash","year":"1393"},{"id":"4130","type":"video","artist":"\u067e\u0648\u06cc\u0627\u0646 \u0645\u062e\u062a\u0627\u0631\u06cc","poster":"http:\/\/85.25.243.154\/video\/P\/Pouyan Mokhtari\/1393\/06\/\/[Gallery]\/08e6d1594e2125c3ea50373c468f1e8b-3.jpg","time":"3:42","videoname":"\u0646\u0627\u0634\u0627\u062f\u06cc \u06af\u0631\u0627\u062a","lowq":"http:\/\/85.25.243.154\/video\/P\/Pouyan Mokhtari\/1393\/06\/\/08e6d1594e2125c3ea50373c468f1e8b-l.mp4","highq":"http:\/\/85.25.243.154\/video\/P\/Pouyan Mokhtari\/1393\/06\/\/08e6d1594e2125c3ea50373c468f1e8b-h.mp4","popularity":"4.2","view":"708","url":"http:\/\/www.wikiseda.com\/Pouyan+Mokhtari\/+video\/Nashadi+Gerat","year":"1393"},{"id":"4166","type":"video","artist":"\u0645\u0639\u06cc\u0646","poster":"http:\/\/85.25.243.154\/video\/M\/Moein\/1393\/06\/\/[Gallery]\/f2f1e7cdc8d13a72ac723b83ae2b6ea8-3.jpg","time":"3:23","videoname":"\u0631\u0645\u06cc\u06a9\u0633 \u067e\u0631\u0646\u062f\u0647","lowq":"http:\/\/85.25.243.154\/video\/M\/Moein\/1393\/06\/\/f2f1e7cdc8d13a72ac723b83ae2b6ea8-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Moein\/1393\/06\/\/f2f1e7cdc8d13a72ac723b83ae2b6ea8-h.mp4","popularity":"5","view":"935","url":"http:\/\/www.wikiseda.com\/Moein\/+video\/Parandeh+Dj+Sina","year":"1393"},{"id":"4107","type":"video","artist":"\u0645\u062a\u06cc\u0646 \u062f\u0648 \u062d\u0646\u062c\u0631\u0647","poster":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/05\/\/[Gallery]\/6576e123a17fc552b502d6cb431e61c2-3.jpg","time":"3:31","videoname":"\u06cc\u06a9 \u062b\u0627\u0646\u06cc\u0647","lowq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/05\/\/6576e123a17fc552b502d6cb431e61c2-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/05\/\/6576e123a17fc552b502d6cb431e61c2-h.mp4","popularity":"3.8","view":"887","url":"http:\/\/www.wikiseda.com\/Matin+do+hanjare\/+video\/Ye+Saniye","year":"1393"},{"id":"4132","type":"video","artist":"\u0634\u0627\u0647\u06cc\u0646 \u0627\u0633 \u062a\u0648","poster":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/06\/\/[Gallery]\/b1e1c520edb7e6cf22fc0eac1a19d08e-3.jpg","time":"3:41","videoname":"\u0622\u0631\u0647","lowq":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/06\/\/b1e1c520edb7e6cf22fc0eac1a19d08e-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/06\/\/b1e1c520edb7e6cf22fc0eac1a19d08e-h.mp4","popularity":"3.8","view":"2219","url":"http:\/\/www.wikiseda.com\/Shahin+S2\/+video\/Are","year":"1393"},{"id":"4161","type":"video","artist":"\u0633\u06cc\u0627\u0645\u06a9 \u0639\u0628\u0627\u0633\u06cc","poster":"http:\/\/85.25.243.154\/video\/S\/simak abaasi\/1393\/06\/\/[Gallery]\/9091cc4eccc008c4523773ac17f54ba0-3.jpg","time":"4:40","videoname":"\u0631\u0648\u0632\u0647\u0627\u06cc \u062e\u0648\u0628","lowq":"http:\/\/85.25.243.154\/video\/S\/simak abaasi\/1393\/06\/\/9091cc4eccc008c4523773ac17f54ba0-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/simak abaasi\/1393\/06\/\/9091cc4eccc008c4523773ac17f54ba0-h.mp4","popularity":"4.3","view":"1697","url":"http:\/\/www.wikiseda.com\/simak+abaasi\/+video\/Roozhaye+Khoob","year":"1393"},{"id":"4096","type":"video","artist":"\u0622\u0631\u0645\u06cc\u0646 \u062a\u0648 \u0627\u06cc \u0627\u0641 \u0627\u0645","poster":"http:\/\/85.25.243.154\/video\/A\/armin 2afm\/1393\/05\/\/[Gallery]\/9804cc7ca897aa2c00cd2c4c393a0903-3.jpg","time":"3:33","videoname":"\u0646\u0647 \u062a\u0627\u0628\u0633\u062a\u0648\u0646 \u0646\u0647 \u067e\u0627\u06cc\u06cc\u0632","lowq":"http:\/\/85.25.243.154\/video\/A\/armin 2afm\/1393\/05\/\/9804cc7ca897aa2c00cd2c4c393a0903-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/armin 2afm\/1393\/05\/\/9804cc7ca897aa2c00cd2c4c393a0903-h.mp4","popularity":"3","view":"2924","url":"http:\/\/www.wikiseda.com\/armin+2afm\/+video\/Na+Tabestoon+Na+Paeez","year":"1393"},{"id":"4103","type":"video","artist":"\u0634\u06a9\u06cc\u0644\u0627","poster":"http:\/\/85.25.243.154\/video\/S\/Shakila\/1393\/05\/\/[Gallery]\/d69a61c69f6e9858de0a062a6eb00305-3.jpg","time":"4:12","videoname":"\u0628\u06cc \u0633\u0631\u0632\u0645\u06cc\u0646","lowq":"http:\/\/85.25.243.154\/video\/S\/Shakila\/1393\/05\/\/d69a61c69f6e9858de0a062a6eb00305-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shakila\/1393\/05\/\/d69a61c69f6e9858de0a062a6eb00305-h.mp4","popularity":"5","view":"1172","url":"http:\/\/www.wikiseda.com\/Shakila\/+video\/Bi+Sarzamin","year":"1393"},{"id":"4172","type":"video","artist":"\u0627\u0634\u06a9\u06cc\u0646 0098","poster":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/[Gallery]\/e1e1206c13c0d6141e658c5c18243d9e-3.jpg","time":"3:3","videoname":"\u06cc\u0647 \u0622\u0647\u0646\u06af \u0628\u0630\u0627\u0631 \u0628\u0631\u0642\u0635\u06cc\u0645","lowq":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/e1e1206c13c0d6141e658c5c18243d9e-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/e1e1206c13c0d6141e658c5c18243d9e-h.mp4","popularity":"3.7","view":"1088","url":"http:\/\/www.wikiseda.com\/Ashkin0098\/+video\/Ye+Ahang+Bezar+Beraghsim","year":"1393"},{"id":"4095","type":"video","artist":"\u0627\u0645\u06cc\u0646 \u0632\u0627\u0631\u0639\u06cc","poster":"http:\/\/85.25.243.154\/video\/A\/Amin Zarei\/1393\/05\/\/[Gallery]\/18df49569cb9917c5e9b501e3c29b5fc-3.jpg","time":"4:1","videoname":"\u063a\u0632\u0647","lowq":"http:\/\/85.25.243.154\/video\/A\/Amin Zarei\/1393\/05\/\/18df49569cb9917c5e9b501e3c29b5fc-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amin Zarei\/1393\/05\/\/18df49569cb9917c5e9b501e3c29b5fc-h.mp4","popularity":"3.3","view":"185","url":"http:\/\/www.wikiseda.com\/Amin+Zarei\/+video\/gaza","year":"1393"},{"id":"4100","type":"video","artist":"\u0627\u062f\u06cc \u0639\u0637\u0627\u0631","poster":"http:\/\/85.25.243.154\/video\/E\/Eddie Attar\/1393\/05\/\/[Gallery]\/8fe2e864e5630d3d80172c8ceb65dca3-3.jpg","time":"3:30","videoname":"\u062f\u0644 \u062e\u0648\u0634\u06cc","lowq":"http:\/\/85.25.243.154\/video\/E\/Eddie Attar\/1393\/05\/\/8fe2e864e5630d3d80172c8ceb65dca3-l.mp4","highq":"http:\/\/85.25.243.154\/video\/E\/Eddie Attar\/1393\/05\/\/8fe2e864e5630d3d80172c8ceb65dca3-h.mp4","popularity":"5","view":"483","url":"http:\/\/www.wikiseda.com\/Eddie+Attar\/+video\/Del+Khoshi","year":"1393"},{"id":"4117","type":"video","artist":"\u0631\u0636\u0627 \u0634\u06cc\u0631\u06cc","poster":"http:\/\/85.25.243.154\/video\/R\/Reza Shiri\/1393\/05\/\/[Gallery]\/4cdb8cd441771092253acf4d988609cb-3.jpg","time":"3:13","videoname":"\u0639\u0634\u0642\u062a \u0634\u0628 \u0648 \u0631\u0648\u0632\u0645\u0647","lowq":"http:\/\/85.25.243.154\/video\/R\/Reza Shiri\/1393\/05\/\/4cdb8cd441771092253acf4d988609cb-l.mp4","highq":"http:\/\/85.25.243.154\/video\/R\/Reza Shiri\/1393\/05\/\/4cdb8cd441771092253acf4d988609cb-h.mp4","popularity":"5","view":"2017","url":"http:\/\/www.wikiseda.com\/Reza+Shiri\/+video\/Eshghet+Shabo+Roozame","year":"1393"},{"id":"4129","type":"video","artist":"\u0639\u0644\u06cc \u0647\u0627\u06cc\u067e\u0631","poster":"http:\/\/85.25.243.154\/video\/A\/Ali Hyper\/1393\/06\/\/[Gallery]\/9f12b26258c46ae9ccde86d6cddd7932-3.jpg","time":"3:7","videoname":"\u062f\u06cc\u0648\u0648\u0646\u0647 \u0645\u06cc\u0634\u0645","lowq":"http:\/\/85.25.243.154\/video\/A\/Ali Hyper\/1393\/06\/\/9f12b26258c46ae9ccde86d6cddd7932-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ali Hyper\/1393\/06\/\/9f12b26258c46ae9ccde86d6cddd7932-h.mp4","popularity":"5","view":"2567","url":"http:\/\/www.wikiseda.com\/Ali+Hyper\/+video\/Divoone+Misham","year":"1393"},{"id":"4099","type":"video","artist":"\u0633\u0627\u0633\u06cc \u0645\u0627\u0646\u06a9\u0646","poster":"http:\/\/85.25.243.154\/video\/S\/Sasy Mankan\/1393\/05\/\/[Gallery]\/80a490b7e5e535b5e7602e7c4d7075e1-3.jpg","time":"4:16","videoname":"\u0645\u0646 \u0645\u062b\u0644 \u062f\u06cc\u0648\u0648\u0646\u0647 \u0647\u0627\u0645","lowq":"http:\/\/85.25.243.154\/video\/S\/Sasy Mankan\/1393\/05\/\/80a490b7e5e535b5e7602e7c4d7075e1-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Sasy Mankan\/1393\/05\/\/80a490b7e5e535b5e7602e7c4d7075e1-h.mp4","popularity":"4","view":"1722","url":"http:\/\/www.wikiseda.com\/Sasy+Mankan\/+video\/Man+Mesle+Divooneham","year":"1393"},{"id":"4098","type":"video","artist":"\u0633\u0627\u0631\u06cc\u0646\u0627 \u067e\u0627\u0631\u0633\u0627","poster":"http:\/\/85.25.243.154\/video\/S\/Sarina Parsa\/1393\/05\/\/[Gallery]\/50da13d716390aeadd5bda1ec79974ef-3.jpg","time":"3:3","videoname":"\u0639\u0634\u0642 \u0645\u0646","lowq":"http:\/\/85.25.243.154\/video\/S\/Sarina Parsa\/1393\/05\/\/50da13d716390aeadd5bda1ec79974ef-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Sarina Parsa\/1393\/05\/\/50da13d716390aeadd5bda1ec79974ef-h.mp4","popularity":"5","view":"394","url":"http:\/\/www.wikiseda.com\/Sarina+Parsa\/+video\/Eshghe+Man","year":"1393"},{"id":"4106","type":"video","artist":"\u0639\u0644\u06cc \u0645\u0648\u0644\u0627\u06cc\u06cc","poster":"http:\/\/85.25.243.154\/video\/A\/Ali Molayi\/1393\/05\/\/[Gallery]\/5b5bed63370eb18cd910034f02d07a5f-3.jpg","time":"3:32","videoname":"\u0645\u06af\u0647 \u0646\u06af\u0641\u062a\u06cc","lowq":"http:\/\/85.25.243.154\/video\/A\/Ali Molayi\/1393\/05\/\/5b5bed63370eb18cd910034f02d07a5f-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ali Molayi\/1393\/05\/\/5b5bed63370eb18cd910034f02d07a5f-h.mp4","popularity":"5","view":"184","url":"http:\/\/www.wikiseda.com\/Ali+Molayi\/+video\/Mage+Nagofti","year":"1393"},{"id":"4109","type":"video","artist":"\u067e\u0631\u0648\u06cc\u0632","poster":"http:\/\/85.25.243.154\/video\/P\/Parviz\/1393\/05\/\/[Gallery]\/6e37ceb05ae803dac3d88d431d2b1865-3.jpg","time":"2:52","videoname":"\u0631\u0646\u06af \u0686\u0634\u0627\u062a","lowq":"http:\/\/85.25.243.154\/video\/P\/Parviz\/1393\/05\/\/6e37ceb05ae803dac3d88d431d2b1865-l.mp4","highq":"http:\/\/85.25.243.154\/video\/P\/Parviz\/1393\/05\/\/6e37ceb05ae803dac3d88d431d2b1865-h.mp4","popularity":"2.5","view":"601","url":"http:\/\/www.wikiseda.com\/Parviz\/+video\/Range+Cheshat","year":"1393"},{"id":"4110","type":"video","artist":"\u0634\u0627\u0647\u06cc\u0646 \u0627\u0633 \u062a\u0648","poster":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/05\/\/[Gallery]\/b9b66faf259899d5f4f99f55a5d36958-3.jpg","time":"3:2","videoname":"\u06cc\u0647 \u0627\u062a\u0641\u0627\u0642 \u062e\u0648\u0628","lowq":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/05\/\/b9b66faf259899d5f4f99f55a5d36958-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/05\/\/b9b66faf259899d5f4f99f55a5d36958-h.mp4","popularity":"5","view":"361","url":"http:\/\/www.wikiseda.com\/Shahin+S2\/+video\/Ye+Etefaghe+Khoob","year":"1393"},{"id":"4113","type":"video","artist":"\u0642\u06cc\u0635\u0631","poster":"http:\/\/85.25.243.154\/video\/G\/Gheysar\/1393\/05\/\/[Gallery]\/2033230f9f342504c6f43b85ece8c0d0-3.jpg","time":"3:31","videoname":"\u0645\u06cc\u06af\u0645 \u06a9\u0647 \u0628\u062f\u0648\u0646\u06cc","lowq":"http:\/\/85.25.243.154\/video\/G\/Gheysar\/1393\/05\/\/2033230f9f342504c6f43b85ece8c0d0-l.mp4","highq":"http:\/\/85.25.243.154\/video\/G\/Gheysar\/1393\/05\/\/2033230f9f342504c6f43b85ece8c0d0-h.mp4","popularity":"5","view":"1070","url":"http:\/\/www.wikiseda.com\/Gheysar\/+video\/Migam+Ke+Bedooni","year":"1393"},{"id":"4116","type":"video","artist":"\u062c\u0645\u0634\u06cc\u062f","poster":"http:\/\/85.25.243.154\/video\/J\/jamshid\/1393\/05\/\/[Gallery]\/bfdfe4b0e882613fc819adf77627cdd7-3.jpg","time":"3:32","videoname":"\u062a\u0645\u0646\u0627\u06cc \u0648\u0635\u0627\u0644","lowq":"http:\/\/85.25.243.154\/video\/J\/jamshid\/1393\/05\/\/bfdfe4b0e882613fc819adf77627cdd7-l.mp4","highq":"http:\/\/85.25.243.154\/video\/J\/jamshid\/1393\/05\/\/bfdfe4b0e882613fc819adf77627cdd7-h.mp4","popularity":"5","view":"1216","url":"http:\/\/www.wikiseda.com\/jamshid\/+video\/Tamanaye+Vesal","year":"1393"},{"id":"4123","type":"video","artist":"\u0645\u062d\u0645\u062f \u0648\u0637\u0646 \u062f\u0648\u0633\u062a","poster":"http:\/\/85.25.243.154\/video\/M\/Mohammad Vatandoost\/1393\/06\/\/[Gallery]\/11d7421e849d096c87298256a37f2844-3.jpg","time":"2:57","videoname":"\u0633\u062a\u0627\u0631\u0647 \u0647\u0627","lowq":"http:\/\/85.25.243.154\/video\/M\/Mohammad Vatandoost\/1393\/06\/\/11d7421e849d096c87298256a37f2844-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Mohammad Vatandoost\/1393\/06\/\/11d7421e849d096c87298256a37f2844-h.mp4","popularity":"5","view":"246","url":"http:\/\/www.wikiseda.com\/Mohammad+Vatandoost\/+video\/Setareha","year":"1393"},{"id":"4124","type":"video","artist":"\u0645\u0633\u0639\u0648\u062f \u0635\u0627\u062f\u0642\u0644\u0648","poster":"http:\/\/85.25.243.154\/video\/M\/Masoud Sadeghloo\/1393\/06\/\/[Gallery]\/d0846427a39671b9c368c20fc03587f2-3.jpg","time":"3:29","videoname":"\u0622\u0631\u0645\u0634","lowq":"http:\/\/85.25.243.154\/video\/M\/Masoud Sadeghloo\/1393\/06\/\/d0846427a39671b9c368c20fc03587f2-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Masoud Sadeghloo\/1393\/06\/\/d0846427a39671b9c368c20fc03587f2-h.mp4","popularity":"5","view":"247","url":"http:\/\/www.wikiseda.com\/Masoud+Sadeghloo\/+video\/Aramesh","year":"1393"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    } else if (this.option === 1) {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"4173","type":"video","artist":"\u0641\u0631\u06cc\u0627\u0644","poster":"http:\/\/85.25.243.154\/video\/F\/Faryal\/1393\/06\/\/[Gallery]\/09414b5a7cbebb5359798c9ab5295ed5-3.jpg","time":"5:32","videoname":"\u0635\u0628\u062d\u0627\u0646\u0647","lowq":"http:\/\/85.25.243.154\/video\/F\/Faryal\/1393\/06\/\/09414b5a7cbebb5359798c9ab5295ed5-l.mp4","highq":"http:\/\/85.25.243.154\/video\/F\/Faryal\/1393\/06\/\/09414b5a7cbebb5359798c9ab5295ed5-h.mp4","popularity":"0","view":"81","url":"http:\/\/www.wikiseda.com\/Faryal\/+video\/Sobhaneh","year":"1393"},{"id":"4172","type":"video","artist":"\u0627\u0634\u06a9\u06cc\u0646 0098","poster":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/[Gallery]\/e1e1206c13c0d6141e658c5c18243d9e-3.jpg","time":"3:3","videoname":"\u06cc\u0647 \u0622\u0647\u0646\u06af \u0628\u0630\u0627\u0631 \u0628\u0631\u0642\u0635\u06cc\u0645","lowq":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/e1e1206c13c0d6141e658c5c18243d9e-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/e1e1206c13c0d6141e658c5c18243d9e-h.mp4","popularity":"3.7","view":"1088","url":"http:\/\/www.wikiseda.com\/Ashkin0098\/+video\/Ye+Ahang+Bezar+Beraghsim","year":"1393"},{"id":"4171","type":"video","artist":"\u0639\u0644\u06cc \u0645\u062c\u06cc\u06a9 \u0627\u0645 \u062c\u06cc","poster":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/[Gallery]\/c71a90c873c608351f3ccae3f1f41b29-3.jpg","time":"3:50","videoname":"\u0686\u0647\u0627\u0631 \u062a\u0627 \u0631\u0641\u06cc\u0642","lowq":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/c71a90c873c608351f3ccae3f1f41b29-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/c71a90c873c608351f3ccae3f1f41b29-h.mp4","popularity":"1","view":"997","url":"http:\/\/www.wikiseda.com\/Ali+Magic+Mg\/+video\/Chahar+Ta+Refigh","year":"1393"},{"id":"4169","type":"video","artist":"\u062d\u0627\u0645\u062f \u0632\u0645\u0627\u0646\u06cc","poster":"http:\/\/85.25.243.154\/video\/H\/Hamed Zamani\/1393\/06\/\/[Gallery]\/08e3bcf58affb03c943c67bb69f6ba4d-3.jpg","time":"4:48","videoname":"\u06af\u0631\u062f\u0627\u0646","lowq":"http:\/\/85.25.243.154\/video\/H\/Hamed Zamani\/1393\/06\/\/08e3bcf58affb03c943c67bb69f6ba4d-l.mp4","highq":"http:\/\/85.25.243.154\/video\/H\/Hamed Zamani\/1393\/06\/\/08e3bcf58affb03c943c67bb69f6ba4d-h.mp4","popularity":"5","view":"270","url":"http:\/\/www.wikiseda.com\/Hamed+Zamani\/+video\/Gordan","year":"1393"},{"id":"4168","type":"video","artist":"\u0627\u0645\u06cc\u0631 \u0645\u0648\u0644\u0627\u06cc\u06cc","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/[Gallery]\/4f9f4f75f4409ad2c4c5b1188267fe08-3.jpg","time":"0:57","videoname":"\u062a\u06cc\u0632\u0631 \u0622\u0644\u0628\u0648\u0645 \u0648\u0627\u0631\u0648\u0646\u0647","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/4f9f4f75f4409ad2c4c5b1188267fe08-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/4f9f4f75f4409ad2c4c5b1188267fe08-h.mp4","popularity":"1","view":"482","url":"http:\/\/www.wikiseda.com\/Amir+Molaei\/+video\/Varooneh+Teaser+Album","year":"1393"},{"id":"4167","type":"video","artist":"\u062d\u0645\u06cc\u062f \u0627\u0635\u063a\u0631\u06cc","poster":"http:\/\/85.25.243.154\/video\/H\/Hamid Asghari\/1393\/06\/\/[Gallery]\/4027dd97fce5df3513176b3840e59634-3.jpg","time":"3:29","videoname":"\u0645\u0646 \u0648 \u062a\u0648","lowq":"http:\/\/85.25.243.154\/video\/H\/Hamid Asghari\/1393\/06\/\/4027dd97fce5df3513176b3840e59634-l.mp4","highq":"http:\/\/85.25.243.154\/video\/H\/Hamid Asghari\/1393\/06\/\/4027dd97fce5df3513176b3840e59634-h.mp4","popularity":"3","view":"993","url":"http:\/\/www.wikiseda.com\/Hamid+Asghari\/+video\/Mano+to","year":"1393"},{"id":"4166","type":"video","artist":"\u0645\u0639\u06cc\u0646","poster":"http:\/\/85.25.243.154\/video\/M\/Moein\/1393\/06\/\/[Gallery]\/f2f1e7cdc8d13a72ac723b83ae2b6ea8-3.jpg","time":"3:23","videoname":"\u0631\u0645\u06cc\u06a9\u0633 \u067e\u0631\u0646\u062f\u0647","lowq":"http:\/\/85.25.243.154\/video\/M\/Moein\/1393\/06\/\/f2f1e7cdc8d13a72ac723b83ae2b6ea8-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Moein\/1393\/06\/\/f2f1e7cdc8d13a72ac723b83ae2b6ea8-h.mp4","popularity":"5","view":"935","url":"http:\/\/www.wikiseda.com\/Moein\/+video\/Parandeh+Dj+Sina","year":"1393"},{"id":"4165","type":"video","artist":"\u0645\u0631\u062a\u0636\u06cc \u067e\u0627\u0634\u0627\u06cc\u06cc","poster":"http:\/\/85.25.243.154\/video\/M\/Morteza pashaei\/1393\/06\/\/[Gallery]\/3ef3fddc07a21ed91cf251f78f23d652-3.jpg","time":"3:33","videoname":"\u0631\u0648\u0632 \u0628\u0631\u0641\u06cc","lowq":"http:\/\/85.25.243.154\/video\/M\/Morteza pashaei\/1393\/06\/\/3ef3fddc07a21ed91cf251f78f23d652-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Morteza pashaei\/1393\/06\/\/3ef3fddc07a21ed91cf251f78f23d652-h.mp4","popularity":"4.6","view":"8145","url":"http:\/\/www.wikiseda.com\/Morteza+pashaei\/+video\/Rooze+Barfi","year":"1393"},{"id":"4164","type":"video","artist":"\u062d\u0645\u06cc\u062f \u0631\u0627\u062f","poster":"http:\/\/85.25.243.154\/video\/H\/Hamid Rad\/1393\/06\/\/[Gallery]\/ee3c75ca1a69bc737faa6e7b21724bee-3.jpg","time":"3:0","videoname":"\u0631\u0642\u0635 \u062a\u0648","lowq":"http:\/\/85.25.243.154\/video\/H\/Hamid Rad\/1393\/06\/\/ee3c75ca1a69bc737faa6e7b21724bee-l.mp4","highq":"http:\/\/85.25.243.154\/video\/H\/Hamid Rad\/1393\/06\/\/ee3c75ca1a69bc737faa6e7b21724bee-h.mp4","popularity":"0","view":"227","url":"http:\/\/www.wikiseda.com\/Hamid+Rad\/+video\/Raghse+To","year":"1393"},{"id":"4163","type":"video","artist":"\u0628\u0627\u0628\u06a9 \u062c\u0647\u0627\u0646\u0628\u062e\u0634","poster":"http:\/\/85.25.243.154\/video\/B\/Babak Jahan Bakhsh\/1393\/06\/\/[Gallery]\/5c97c61b00b8058358a42d68fef76036-3.jpg","time":"1:32","videoname":"\u062a\u06cc\u0632\u0631 \u0622\u0644\u0628\u0648\u0645 \u0645\u062f\u0627\u0631 \u0628\u06cc \u0642\u0631\u0627\u0631\u06cc","lowq":"http:\/\/85.25.243.154\/video\/B\/Babak Jahan Bakhsh\/1393\/06\/\/5c97c61b00b8058358a42d68fef76036-l.mp4","highq":"http:\/\/85.25.243.154\/video\/B\/Babak Jahan Bakhsh\/1393\/06\/\/5c97c61b00b8058358a42d68fef76036-h.mp4","popularity":"0","view":"365","url":"http:\/\/www.wikiseda.com\/Babak+Jahan+Bakhsh\/+video\/Madare+Bi+Gharari+Album+Teas","year":"1393"},{"id":"4162","type":"video","artist":"\u0648\u0644\u06cc","poster":"http:\/\/85.25.243.154\/video\/V\/Vali\/1393\/06\/\/[Gallery]\/0f9356d0b3ab73c803cbda9879593ea6-3.jpg","time":"3:41","videoname":"\u0628\u06cc\u0627 \u062a\u0648 \u0639\u0627\u0634\u0642\u0645 \u0628\u0627\u0634","lowq":"http:\/\/85.25.243.154\/video\/V\/Vali\/1393\/06\/\/0f9356d0b3ab73c803cbda9879593ea6-l.mp4","highq":"http:\/\/85.25.243.154\/video\/V\/Vali\/1393\/06\/\/0f9356d0b3ab73c803cbda9879593ea6-h.mp4","popularity":"3.1","view":"5989","url":"http:\/\/www.wikiseda.com\/Vali\/+video\/Bia+TO+Ashegham+Bash","year":"1393"},{"id":"4161","type":"video","artist":"\u0633\u06cc\u0627\u0645\u06a9 \u0639\u0628\u0627\u0633\u06cc","poster":"http:\/\/85.25.243.154\/video\/S\/simak abaasi\/1393\/06\/\/[Gallery]\/9091cc4eccc008c4523773ac17f54ba0-3.jpg","time":"4:40","videoname":"\u0631\u0648\u0632\u0647\u0627\u06cc \u062e\u0648\u0628","lowq":"http:\/\/85.25.243.154\/video\/S\/simak abaasi\/1393\/06\/\/9091cc4eccc008c4523773ac17f54ba0-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/simak abaasi\/1393\/06\/\/9091cc4eccc008c4523773ac17f54ba0-h.mp4","popularity":"4.3","view":"1697","url":"http:\/\/www.wikiseda.com\/simak+abaasi\/+video\/Roozhaye+Khoob","year":"1393"},{"id":"4139","type":"video","artist":"\u0622\u0632\u0627\u062f","poster":"http:\/\/85.25.243.154\/video\/A\/Azad\/1393\/06\/\/[Gallery]\/2fa0972513e1423f358aec9bea5edd5c-3.jpg","time":"3:5","videoname":"\u0639\u0637\u0631\u0647 \u0645\u0631\u062f\u0648\u0646\u0647","lowq":"http:\/\/85.25.243.154\/video\/A\/Azad\/1393\/06\/\/2fa0972513e1423f358aec9bea5edd5c-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Azad\/1393\/06\/\/2fa0972513e1423f358aec9bea5edd5c-h.mp4","popularity":"0","view":"492","url":"http:\/\/www.wikiseda.com\/Azad\/+video\/Atre+Mardoone","year":"1393"},{"id":"4132","type":"video","artist":"\u0634\u0627\u0647\u06cc\u0646 \u0627\u0633 \u062a\u0648","poster":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/06\/\/[Gallery]\/b1e1c520edb7e6cf22fc0eac1a19d08e-3.jpg","time":"3:41","videoname":"\u0622\u0631\u0647","lowq":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/06\/\/b1e1c520edb7e6cf22fc0eac1a19d08e-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/06\/\/b1e1c520edb7e6cf22fc0eac1a19d08e-h.mp4","popularity":"3.8","view":"2219","url":"http:\/\/www.wikiseda.com\/Shahin+S2\/+video\/Are","year":"1393"},{"id":"4131","type":"video","artist":"\u0634\u0647\u0627\u0628 \u062a\u06cc\u0627\u0645","poster":"http:\/\/85.25.243.154\/video\/S\/Shahab Tiam\/1393\/06\/\/[Gallery]\/28413b310693fef885934a1131e43945-3.jpg","time":"3:41","videoname":"\u0633\u0648 \u062a\u0641\u0627\u0647\u0645","lowq":"http:\/\/85.25.243.154\/video\/S\/Shahab Tiam\/1393\/06\/\/28413b310693fef885934a1131e43945-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shahab Tiam\/1393\/06\/\/28413b310693fef885934a1131e43945-h.mp4","popularity":"4.1","view":"5698","url":"http:\/\/www.wikiseda.com\/Shahab+Tiam\/+video\/Sue+Tafahom","year":"1393"},{"id":"4130","type":"video","artist":"\u067e\u0648\u06cc\u0627\u0646 \u0645\u062e\u062a\u0627\u0631\u06cc","poster":"http:\/\/85.25.243.154\/video\/P\/Pouyan Mokhtari\/1393\/06\/\/[Gallery]\/08e6d1594e2125c3ea50373c468f1e8b-3.jpg","time":"3:42","videoname":"\u0646\u0627\u0634\u0627\u062f\u06cc \u06af\u0631\u0627\u062a","lowq":"http:\/\/85.25.243.154\/video\/P\/Pouyan Mokhtari\/1393\/06\/\/08e6d1594e2125c3ea50373c468f1e8b-l.mp4","highq":"http:\/\/85.25.243.154\/video\/P\/Pouyan Mokhtari\/1393\/06\/\/08e6d1594e2125c3ea50373c468f1e8b-h.mp4","popularity":"4.2","view":"708","url":"http:\/\/www.wikiseda.com\/Pouyan+Mokhtari\/+video\/Nashadi+Gerat","year":"1393"},{"id":"4129","type":"video","artist":"\u0639\u0644\u06cc \u0647\u0627\u06cc\u067e\u0631","poster":"http:\/\/85.25.243.154\/video\/A\/Ali Hyper\/1393\/06\/\/[Gallery]\/9f12b26258c46ae9ccde86d6cddd7932-3.jpg","time":"3:7","videoname":"\u062f\u06cc\u0648\u0648\u0646\u0647 \u0645\u06cc\u0634\u0645","lowq":"http:\/\/85.25.243.154\/video\/A\/Ali Hyper\/1393\/06\/\/9f12b26258c46ae9ccde86d6cddd7932-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ali Hyper\/1393\/06\/\/9f12b26258c46ae9ccde86d6cddd7932-h.mp4","popularity":"5","view":"2567","url":"http:\/\/www.wikiseda.com\/Ali+Hyper\/+video\/Divoone+Misham","year":"1393"},{"id":"4124","type":"video","artist":"\u0645\u0633\u0639\u0648\u062f \u0635\u0627\u062f\u0642\u0644\u0648","poster":"http:\/\/85.25.243.154\/video\/M\/Masoud Sadeghloo\/1393\/06\/\/[Gallery]\/d0846427a39671b9c368c20fc03587f2-3.jpg","time":"3:29","videoname":"\u0622\u0631\u0645\u0634","lowq":"http:\/\/85.25.243.154\/video\/M\/Masoud Sadeghloo\/1393\/06\/\/d0846427a39671b9c368c20fc03587f2-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Masoud Sadeghloo\/1393\/06\/\/d0846427a39671b9c368c20fc03587f2-h.mp4","popularity":"5","view":"247","url":"http:\/\/www.wikiseda.com\/Masoud+Sadeghloo\/+video\/Aramesh","year":"1393"},{"id":"4123","type":"video","artist":"\u0645\u062d\u0645\u062f \u0648\u0637\u0646 \u062f\u0648\u0633\u062a","poster":"http:\/\/85.25.243.154\/video\/M\/Mohammad Vatandoost\/1393\/06\/\/[Gallery]\/11d7421e849d096c87298256a37f2844-3.jpg","time":"2:57","videoname":"\u0633\u062a\u0627\u0631\u0647 \u0647\u0627","lowq":"http:\/\/85.25.243.154\/video\/M\/Mohammad Vatandoost\/1393\/06\/\/11d7421e849d096c87298256a37f2844-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Mohammad Vatandoost\/1393\/06\/\/11d7421e849d096c87298256a37f2844-h.mp4","popularity":"5","view":"246","url":"http:\/\/www.wikiseda.com\/Mohammad+Vatandoost\/+video\/Setareha","year":"1393"},{"id":"4119","type":"video","artist":"\u0645\u062d\u0633\u0646 \u0686\u0627\u0648\u0634\u06cc","poster":"http:\/\/85.25.243.154\/video\/M\/Mohsen Chavoshi\/1393\/05\/\/[Gallery]\/de8cb2889c60b266a451990ffbe37822-3.jpg","time":"3:38","videoname":"\u063a\u0644\u0637 \u06a9\u0631\u062f\u0645","lowq":"http:\/\/85.25.243.154\/video\/M\/Mohsen Chavoshi\/1393\/05\/\/de8cb2889c60b266a451990ffbe37822-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Mohsen Chavoshi\/1393\/05\/\/de8cb2889c60b266a451990ffbe37822-h.mp4","popularity":"4.3","view":"6564","url":"http:\/\/www.wikiseda.com\/Mohsen+Chavoshi\/+video\/Ghalat+Kardam","year":"1393"},{"id":"4118","type":"video","artist":"\u06af\u0631\u0648\u0647 \u0645\u0627\u0647 \u0628\u0627\u0646\u0648","poster":"http:\/\/85.25.243.154\/video\/M\/Mah Bano Group\/1393\/05\/\/[Gallery]\/43f488352786d42adeecf97590819d23-3.jpg","time":"4:42","videoname":"\u062c\u0627\u0646 \u0639\u0627\u0634\u0642","lowq":"http:\/\/85.25.243.154\/video\/M\/Mah Bano Group\/1393\/05\/\/43f488352786d42adeecf97590819d23-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Mah Bano Group\/1393\/05\/\/43f488352786d42adeecf97590819d23-h.mp4","popularity":"3.6","view":"1523","url":"http:\/\/www.wikiseda.com\/Mah+Bano+Group\/+video\/Jan+Ashegh","year":"1393"},{"id":"4112","type":"video","artist":"\u0645\u0647\u062f\u06cc \u0627\u062d\u0645\u062f\u0648\u0646\u062f","poster":"http:\/\/85.25.243.154\/video\/M\/Mehdi Ahmadvand\/1393\/05\/\/[Gallery]\/8b93fbe94d83753873482f17285884f8-3.jpg","time":"3:26","videoname":"\u062a\u06cc\u0632\u0631 \u0622\u0644\u0628\u0648\u0645 \u0627\u0632 \u0627\u06cc\u0646 \u0633\u0627\u0639\u062a","lowq":"http:\/\/85.25.243.154\/video\/M\/Mehdi Ahmadvand\/1393\/05\/\/8b93fbe94d83753873482f17285884f8-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Mehdi Ahmadvand\/1393\/05\/\/8b93fbe94d83753873482f17285884f8-h.mp4","popularity":"4.2","view":"4513","url":"http:\/\/www.wikiseda.com\/Mehdi+Ahmadvand\/+video\/Az+In+Saat+Tizer+Album","year":"1393"},{"id":"4117","type":"video","artist":"\u0631\u0636\u0627 \u0634\u06cc\u0631\u06cc","poster":"http:\/\/85.25.243.154\/video\/R\/Reza Shiri\/1393\/05\/\/[Gallery]\/4cdb8cd441771092253acf4d988609cb-3.jpg","time":"3:13","videoname":"\u0639\u0634\u0642\u062a \u0634\u0628 \u0648 \u0631\u0648\u0632\u0645\u0647","lowq":"http:\/\/85.25.243.154\/video\/R\/Reza Shiri\/1393\/05\/\/4cdb8cd441771092253acf4d988609cb-l.mp4","highq":"http:\/\/85.25.243.154\/video\/R\/Reza Shiri\/1393\/05\/\/4cdb8cd441771092253acf4d988609cb-h.mp4","popularity":"5","view":"2017","url":"http:\/\/www.wikiseda.com\/Reza+Shiri\/+video\/Eshghet+Shabo+Roozame","year":"1393"},{"id":"4116","type":"video","artist":"\u062c\u0645\u0634\u06cc\u062f","poster":"http:\/\/85.25.243.154\/video\/J\/jamshid\/1393\/05\/\/[Gallery]\/bfdfe4b0e882613fc819adf77627cdd7-3.jpg","time":"3:32","videoname":"\u062a\u0645\u0646\u0627\u06cc \u0648\u0635\u0627\u0644","lowq":"http:\/\/85.25.243.154\/video\/J\/jamshid\/1393\/05\/\/bfdfe4b0e882613fc819adf77627cdd7-l.mp4","highq":"http:\/\/85.25.243.154\/video\/J\/jamshid\/1393\/05\/\/bfdfe4b0e882613fc819adf77627cdd7-h.mp4","popularity":"5","view":"1216","url":"http:\/\/www.wikiseda.com\/jamshid\/+video\/Tamanaye+Vesal","year":"1393"},{"id":"4115","type":"video","artist":"\u0639\u0644\u06cc \u067e\u06cc\u0634\u062a\u0627\u0632","poster":"http:\/\/85.25.243.154\/video\/A\/Ali Pishtaz\/1393\/05\/\/[Gallery]\/ee2722ea2498645ab87d3170599528ef-3.jpg","time":"3:11","videoname":"\u062d\u0633 \u062c\u062f\u06cc\u062f","lowq":"http:\/\/85.25.243.154\/video\/A\/Ali Pishtaz\/1393\/05\/\/ee2722ea2498645ab87d3170599528ef-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ali Pishtaz\/1393\/05\/\/ee2722ea2498645ab87d3170599528ef-h.mp4","popularity":"4.3","view":"1537","url":"http:\/\/www.wikiseda.com\/Ali+Pishtaz\/+video\/Hese+Jadid","year":"1393"},{"id":"4113","type":"video","artist":"\u0642\u06cc\u0635\u0631","poster":"http:\/\/85.25.243.154\/video\/G\/Gheysar\/1393\/05\/\/[Gallery]\/2033230f9f342504c6f43b85ece8c0d0-3.jpg","time":"3:31","videoname":"\u0645\u06cc\u06af\u0645 \u06a9\u0647 \u0628\u062f\u0648\u0646\u06cc","lowq":"http:\/\/85.25.243.154\/video\/G\/Gheysar\/1393\/05\/\/2033230f9f342504c6f43b85ece8c0d0-l.mp4","highq":"http:\/\/85.25.243.154\/video\/G\/Gheysar\/1393\/05\/\/2033230f9f342504c6f43b85ece8c0d0-h.mp4","popularity":"5","view":"1070","url":"http:\/\/www.wikiseda.com\/Gheysar\/+video\/Migam+Ke+Bedooni","year":"1393"},{"id":"4111","type":"video","artist":"\u0647\u0627\u062a\u0641","poster":"http:\/\/85.25.243.154\/video\/H\/Hatef\/1393\/05\/\/[Gallery]\/78f187d3ccff263d356a5cd2f89a1b10-3.jpg","time":"6:15","videoname":"\u0645\u0631\u0648\u0631","lowq":"http:\/\/85.25.243.154\/video\/H\/Hatef\/1393\/05\/\/78f187d3ccff263d356a5cd2f89a1b10-l.mp4","highq":"http:\/\/85.25.243.154\/video\/H\/Hatef\/1393\/05\/\/78f187d3ccff263d356a5cd2f89a1b10-h.mp4","popularity":"0","view":"486","url":"http:\/\/www.wikiseda.com\/Hatef\/+video\/Moroor","year":"1393"},{"id":"4110","type":"video","artist":"\u0634\u0627\u0647\u06cc\u0646 \u0627\u0633 \u062a\u0648","poster":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/05\/\/[Gallery]\/b9b66faf259899d5f4f99f55a5d36958-3.jpg","time":"3:2","videoname":"\u06cc\u0647 \u0627\u062a\u0641\u0627\u0642 \u062e\u0648\u0628","lowq":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/05\/\/b9b66faf259899d5f4f99f55a5d36958-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/05\/\/b9b66faf259899d5f4f99f55a5d36958-h.mp4","popularity":"5","view":"361","url":"http:\/\/www.wikiseda.com\/Shahin+S2\/+video\/Ye+Etefaghe+Khoob","year":"1393"},{"id":"4109","type":"video","artist":"\u067e\u0631\u0648\u06cc\u0632","poster":"http:\/\/85.25.243.154\/video\/P\/Parviz\/1393\/05\/\/[Gallery]\/6e37ceb05ae803dac3d88d431d2b1865-3.jpg","time":"2:52","videoname":"\u0631\u0646\u06af \u0686\u0634\u0627\u062a","lowq":"http:\/\/85.25.243.154\/video\/P\/Parviz\/1393\/05\/\/6e37ceb05ae803dac3d88d431d2b1865-l.mp4","highq":"http:\/\/85.25.243.154\/video\/P\/Parviz\/1393\/05\/\/6e37ceb05ae803dac3d88d431d2b1865-h.mp4","popularity":"2.5","view":"601","url":"http:\/\/www.wikiseda.com\/Parviz\/+video\/Range+Cheshat","year":"1393"},{"id":"4108","type":"video","artist":"\u062f\u0627\u0648\u062f \u0622\u0632\u0627\u062f","poster":"http:\/\/85.25.243.154\/video\/D\/Davod Azad\/1393\/05\/\/[Gallery]\/5b5626cd6561db49f185979f708cfb84-3.jpg","time":"4:50","videoname":"\u06cc\u0627\u062f \u062a\u0648","lowq":"http:\/\/85.25.243.154\/video\/D\/Davod Azad\/1393\/05\/\/5b5626cd6561db49f185979f708cfb84-l.mp4","highq":"http:\/\/85.25.243.154\/video\/D\/Davod Azad\/1393\/05\/\/5b5626cd6561db49f185979f708cfb84-h.mp4","popularity":"3","view":"301","url":"http:\/\/www.wikiseda.com\/Davod+Azad\/+video\/Yade+To","year":"1393"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    } else if (this.option === 2) {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"4172","type":"video","artist":"\u0627\u0634\u06a9\u06cc\u0646 0098","poster":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/[Gallery]\/e1e1206c13c0d6141e658c5c18243d9e-3.jpg","time":"3:3","videoname":"\u06cc\u0647 \u0622\u0647\u0646\u06af \u0628\u0630\u0627\u0631 \u0628\u0631\u0642\u0635\u06cc\u0645","lowq":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/e1e1206c13c0d6141e658c5c18243d9e-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/e1e1206c13c0d6141e658c5c18243d9e-h.mp4","popularity":"3.7","view":"1088","url":"http:\/\/www.wikiseda.com\/Ashkin0098\/+video\/Ye+Ahang+Bezar+Beraghsim","year":"1393"},{"id":"4171","type":"video","artist":"\u0639\u0644\u06cc \u0645\u062c\u06cc\u06a9 \u0627\u0645 \u062c\u06cc","poster":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/[Gallery]\/c71a90c873c608351f3ccae3f1f41b29-3.jpg","time":"3:50","videoname":"\u0686\u0647\u0627\u0631 \u062a\u0627 \u0631\u0641\u06cc\u0642","lowq":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/c71a90c873c608351f3ccae3f1f41b29-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/c71a90c873c608351f3ccae3f1f41b29-h.mp4","popularity":"1","view":"997","url":"http:\/\/www.wikiseda.com\/Ali+Magic+Mg\/+video\/Chahar+Ta+Refigh","year":"1393"},{"id":"4168","type":"video","artist":"\u0627\u0645\u06cc\u0631 \u0645\u0648\u0644\u0627\u06cc\u06cc","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/[Gallery]\/4f9f4f75f4409ad2c4c5b1188267fe08-3.jpg","time":"0:57","videoname":"\u062a\u06cc\u0632\u0631 \u0622\u0644\u0628\u0648\u0645 \u0648\u0627\u0631\u0648\u0646\u0647","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/4f9f4f75f4409ad2c4c5b1188267fe08-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/4f9f4f75f4409ad2c4c5b1188267fe08-h.mp4","popularity":"1","view":"482","url":"http:\/\/www.wikiseda.com\/Amir+Molaei\/+video\/Varooneh+Teaser+Album","year":"1393"},{"id":"4167","type":"video","artist":"\u062d\u0645\u06cc\u062f \u0627\u0635\u063a\u0631\u06cc","poster":"http:\/\/85.25.243.154\/video\/H\/Hamid Asghari\/1393\/06\/\/[Gallery]\/4027dd97fce5df3513176b3840e59634-3.jpg","time":"3:29","videoname":"\u0645\u0646 \u0648 \u062a\u0648","lowq":"http:\/\/85.25.243.154\/video\/H\/Hamid Asghari\/1393\/06\/\/4027dd97fce5df3513176b3840e59634-l.mp4","highq":"http:\/\/85.25.243.154\/video\/H\/Hamid Asghari\/1393\/06\/\/4027dd97fce5df3513176b3840e59634-h.mp4","popularity":"3","view":"993","url":"http:\/\/www.wikiseda.com\/Hamid+Asghari\/+video\/Mano+to","year":"1393"},{"id":"4165","type":"video","artist":"\u0645\u0631\u062a\u0636\u06cc \u067e\u0627\u0634\u0627\u06cc\u06cc","poster":"http:\/\/85.25.243.154\/video\/M\/Morteza pashaei\/1393\/06\/\/[Gallery]\/3ef3fddc07a21ed91cf251f78f23d652-3.jpg","time":"3:33","videoname":"\u0631\u0648\u0632 \u0628\u0631\u0641\u06cc","lowq":"http:\/\/85.25.243.154\/video\/M\/Morteza pashaei\/1393\/06\/\/3ef3fddc07a21ed91cf251f78f23d652-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Morteza pashaei\/1393\/06\/\/3ef3fddc07a21ed91cf251f78f23d652-h.mp4","popularity":"4.6","view":"8145","url":"http:\/\/www.wikiseda.com\/Morteza+pashaei\/+video\/Rooze+Barfi","year":"1393"},{"id":"4162","type":"video","artist":"\u0648\u0644\u06cc","poster":"http:\/\/85.25.243.154\/video\/V\/Vali\/1393\/06\/\/[Gallery]\/0f9356d0b3ab73c803cbda9879593ea6-3.jpg","time":"3:41","videoname":"\u0628\u06cc\u0627 \u062a\u0648 \u0639\u0627\u0634\u0642\u0645 \u0628\u0627\u0634","lowq":"http:\/\/85.25.243.154\/video\/V\/Vali\/1393\/06\/\/0f9356d0b3ab73c803cbda9879593ea6-l.mp4","highq":"http:\/\/85.25.243.154\/video\/V\/Vali\/1393\/06\/\/0f9356d0b3ab73c803cbda9879593ea6-h.mp4","popularity":"3.1","view":"5989","url":"http:\/\/www.wikiseda.com\/Vali\/+video\/Bia+TO+Ashegham+Bash","year":"1393"},{"id":"4161","type":"video","artist":"\u0633\u06cc\u0627\u0645\u06a9 \u0639\u0628\u0627\u0633\u06cc","poster":"http:\/\/85.25.243.154\/video\/S\/simak abaasi\/1393\/06\/\/[Gallery]\/9091cc4eccc008c4523773ac17f54ba0-3.jpg","time":"4:40","videoname":"\u0631\u0648\u0632\u0647\u0627\u06cc \u062e\u0648\u0628","lowq":"http:\/\/85.25.243.154\/video\/S\/simak abaasi\/1393\/06\/\/9091cc4eccc008c4523773ac17f54ba0-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/simak abaasi\/1393\/06\/\/9091cc4eccc008c4523773ac17f54ba0-h.mp4","popularity":"4.3","view":"1697","url":"http:\/\/www.wikiseda.com\/simak+abaasi\/+video\/Roozhaye+Khoob","year":"1393"},{"id":"4132","type":"video","artist":"\u0634\u0627\u0647\u06cc\u0646 \u0627\u0633 \u062a\u0648","poster":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/06\/\/[Gallery]\/b1e1c520edb7e6cf22fc0eac1a19d08e-3.jpg","time":"3:41","videoname":"\u0622\u0631\u0647","lowq":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/06\/\/b1e1c520edb7e6cf22fc0eac1a19d08e-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shahin S2\/1393\/06\/\/b1e1c520edb7e6cf22fc0eac1a19d08e-h.mp4","popularity":"3.8","view":"2219","url":"http:\/\/www.wikiseda.com\/Shahin+S2\/+video\/Are","year":"1393"},{"id":"4131","type":"video","artist":"\u0634\u0647\u0627\u0628 \u062a\u06cc\u0627\u0645","poster":"http:\/\/85.25.243.154\/video\/S\/Shahab Tiam\/1393\/06\/\/[Gallery]\/28413b310693fef885934a1131e43945-3.jpg","time":"3:41","videoname":"\u0633\u0648 \u062a\u0641\u0627\u0647\u0645","lowq":"http:\/\/85.25.243.154\/video\/S\/Shahab Tiam\/1393\/06\/\/28413b310693fef885934a1131e43945-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shahab Tiam\/1393\/06\/\/28413b310693fef885934a1131e43945-h.mp4","popularity":"4.1","view":"5698","url":"http:\/\/www.wikiseda.com\/Shahab+Tiam\/+video\/Sue+Tafahom","year":"1393"},{"id":"4129","type":"video","artist":"\u0639\u0644\u06cc \u0647\u0627\u06cc\u067e\u0631","poster":"http:\/\/85.25.243.154\/video\/A\/Ali Hyper\/1393\/06\/\/[Gallery]\/9f12b26258c46ae9ccde86d6cddd7932-3.jpg","time":"3:7","videoname":"\u062f\u06cc\u0648\u0648\u0646\u0647 \u0645\u06cc\u0634\u0645","lowq":"http:\/\/85.25.243.154\/video\/A\/Ali Hyper\/1393\/06\/\/9f12b26258c46ae9ccde86d6cddd7932-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ali Hyper\/1393\/06\/\/9f12b26258c46ae9ccde86d6cddd7932-h.mp4","popularity":"5","view":"2567","url":"http:\/\/www.wikiseda.com\/Ali+Hyper\/+video\/Divoone+Misham","year":"1393"},{"id":"4119","type":"video","artist":"\u0645\u062d\u0633\u0646 \u0686\u0627\u0648\u0634\u06cc","poster":"http:\/\/85.25.243.154\/video\/M\/Mohsen Chavoshi\/1393\/05\/\/[Gallery]\/de8cb2889c60b266a451990ffbe37822-3.jpg","time":"3:38","videoname":"\u063a\u0644\u0637 \u06a9\u0631\u062f\u0645","lowq":"http:\/\/85.25.243.154\/video\/M\/Mohsen Chavoshi\/1393\/05\/\/de8cb2889c60b266a451990ffbe37822-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Mohsen Chavoshi\/1393\/05\/\/de8cb2889c60b266a451990ffbe37822-h.mp4","popularity":"4.3","view":"6564","url":"http:\/\/www.wikiseda.com\/Mohsen+Chavoshi\/+video\/Ghalat+Kardam","year":"1393"},{"id":"4117","type":"video","artist":"\u0631\u0636\u0627 \u0634\u06cc\u0631\u06cc","poster":"http:\/\/85.25.243.154\/video\/R\/Reza Shiri\/1393\/05\/\/[Gallery]\/4cdb8cd441771092253acf4d988609cb-3.jpg","time":"3:13","videoname":"\u0639\u0634\u0642\u062a \u0634\u0628 \u0648 \u0631\u0648\u0632\u0645\u0647","lowq":"http:\/\/85.25.243.154\/video\/R\/Reza Shiri\/1393\/05\/\/4cdb8cd441771092253acf4d988609cb-l.mp4","highq":"http:\/\/85.25.243.154\/video\/R\/Reza Shiri\/1393\/05\/\/4cdb8cd441771092253acf4d988609cb-h.mp4","popularity":"5","view":"2017","url":"http:\/\/www.wikiseda.com\/Reza+Shiri\/+video\/Eshghet+Shabo+Roozame","year":"1393"},{"id":"4116","type":"video","artist":"\u062c\u0645\u0634\u06cc\u062f","poster":"http:\/\/85.25.243.154\/video\/J\/jamshid\/1393\/05\/\/[Gallery]\/bfdfe4b0e882613fc819adf77627cdd7-3.jpg","time":"3:32","videoname":"\u062a\u0645\u0646\u0627\u06cc \u0648\u0635\u0627\u0644","lowq":"http:\/\/85.25.243.154\/video\/J\/jamshid\/1393\/05\/\/bfdfe4b0e882613fc819adf77627cdd7-l.mp4","highq":"http:\/\/85.25.243.154\/video\/J\/jamshid\/1393\/05\/\/bfdfe4b0e882613fc819adf77627cdd7-h.mp4","popularity":"5","view":"1216","url":"http:\/\/www.wikiseda.com\/jamshid\/+video\/Tamanaye+Vesal","year":"1393"},{"id":"4115","type":"video","artist":"\u0639\u0644\u06cc \u067e\u06cc\u0634\u062a\u0627\u0632","poster":"http:\/\/85.25.243.154\/video\/A\/Ali Pishtaz\/1393\/05\/\/[Gallery]\/ee2722ea2498645ab87d3170599528ef-3.jpg","time":"3:11","videoname":"\u062d\u0633 \u062c\u062f\u06cc\u062f","lowq":"http:\/\/85.25.243.154\/video\/A\/Ali Pishtaz\/1393\/05\/\/ee2722ea2498645ab87d3170599528ef-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ali Pishtaz\/1393\/05\/\/ee2722ea2498645ab87d3170599528ef-h.mp4","popularity":"4.3","view":"1537","url":"http:\/\/www.wikiseda.com\/Ali+Pishtaz\/+video\/Hese+Jadid","year":"1393"},{"id":"4113","type":"video","artist":"\u0642\u06cc\u0635\u0631","poster":"http:\/\/85.25.243.154\/video\/G\/Gheysar\/1393\/05\/\/[Gallery]\/2033230f9f342504c6f43b85ece8c0d0-3.jpg","time":"3:31","videoname":"\u0645\u06cc\u06af\u0645 \u06a9\u0647 \u0628\u062f\u0648\u0646\u06cc","lowq":"http:\/\/85.25.243.154\/video\/G\/Gheysar\/1393\/05\/\/2033230f9f342504c6f43b85ece8c0d0-l.mp4","highq":"http:\/\/85.25.243.154\/video\/G\/Gheysar\/1393\/05\/\/2033230f9f342504c6f43b85ece8c0d0-h.mp4","popularity":"5","view":"1070","url":"http:\/\/www.wikiseda.com\/Gheysar\/+video\/Migam+Ke+Bedooni","year":"1393"},{"id":"4112","type":"video","artist":"\u0645\u0647\u062f\u06cc \u0627\u062d\u0645\u062f\u0648\u0646\u062f","poster":"http:\/\/85.25.243.154\/video\/M\/Mehdi Ahmadvand\/1393\/05\/\/[Gallery]\/8b93fbe94d83753873482f17285884f8-3.jpg","time":"3:26","videoname":"\u062a\u06cc\u0632\u0631 \u0622\u0644\u0628\u0648\u0645 \u0627\u0632 \u0627\u06cc\u0646 \u0633\u0627\u0639\u062a","lowq":"http:\/\/85.25.243.154\/video\/M\/Mehdi Ahmadvand\/1393\/05\/\/8b93fbe94d83753873482f17285884f8-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Mehdi Ahmadvand\/1393\/05\/\/8b93fbe94d83753873482f17285884f8-h.mp4","popularity":"4.2","view":"4513","url":"http:\/\/www.wikiseda.com\/Mehdi+Ahmadvand\/+video\/Az+In+Saat+Tizer+Album","year":"1393"},{"id":"4111","type":"video","artist":"\u0647\u0627\u062a\u0641","poster":"http:\/\/85.25.243.154\/video\/H\/Hatef\/1393\/05\/\/[Gallery]\/78f187d3ccff263d356a5cd2f89a1b10-3.jpg","time":"6:15","videoname":"\u0645\u0631\u0648\u0631","lowq":"http:\/\/85.25.243.154\/video\/H\/Hatef\/1393\/05\/\/78f187d3ccff263d356a5cd2f89a1b10-l.mp4","highq":"http:\/\/85.25.243.154\/video\/H\/Hatef\/1393\/05\/\/78f187d3ccff263d356a5cd2f89a1b10-h.mp4","popularity":"0","view":"486","url":"http:\/\/www.wikiseda.com\/Hatef\/+video\/Moroor","year":"1393"},{"id":"4107","type":"video","artist":"\u0645\u062a\u06cc\u0646 \u062f\u0648 \u062d\u0646\u062c\u0631\u0647","poster":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/05\/\/[Gallery]\/6576e123a17fc552b502d6cb431e61c2-3.jpg","time":"3:31","videoname":"\u06cc\u06a9 \u062b\u0627\u0646\u06cc\u0647","lowq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/05\/\/6576e123a17fc552b502d6cb431e61c2-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/05\/\/6576e123a17fc552b502d6cb431e61c2-h.mp4","popularity":"3.8","view":"887","url":"http:\/\/www.wikiseda.com\/Matin+do+hanjare\/+video\/Ye+Saniye","year":"1393"},{"id":"4103","type":"video","artist":"\u0634\u06a9\u06cc\u0644\u0627","poster":"http:\/\/85.25.243.154\/video\/S\/Shakila\/1393\/05\/\/[Gallery]\/d69a61c69f6e9858de0a062a6eb00305-3.jpg","time":"4:12","videoname":"\u0628\u06cc \u0633\u0631\u0632\u0645\u06cc\u0646","lowq":"http:\/\/85.25.243.154\/video\/S\/Shakila\/1393\/05\/\/d69a61c69f6e9858de0a062a6eb00305-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shakila\/1393\/05\/\/d69a61c69f6e9858de0a062a6eb00305-h.mp4","popularity":"5","view":"1172","url":"http:\/\/www.wikiseda.com\/Shakila\/+video\/Bi+Sarzamin","year":"1393"},{"id":"4099","type":"video","artist":"\u0633\u0627\u0633\u06cc \u0645\u0627\u0646\u06a9\u0646","poster":"http:\/\/85.25.243.154\/video\/S\/Sasy Mankan\/1393\/05\/\/[Gallery]\/80a490b7e5e535b5e7602e7c4d7075e1-3.jpg","time":"4:16","videoname":"\u0645\u0646 \u0645\u062b\u0644 \u062f\u06cc\u0648\u0648\u0646\u0647 \u0647\u0627\u0645","lowq":"http:\/\/85.25.243.154\/video\/S\/Sasy Mankan\/1393\/05\/\/80a490b7e5e535b5e7602e7c4d7075e1-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Sasy Mankan\/1393\/05\/\/80a490b7e5e535b5e7602e7c4d7075e1-h.mp4","popularity":"4","view":"1722","url":"http:\/\/www.wikiseda.com\/Sasy+Mankan\/+video\/Man+Mesle+Divooneham","year":"1393"},{"id":"4097","type":"video","artist":"25 \u0628\u0627\u0646\u062f","poster":"http:\/\/85.25.243.154\/video\/2\/25 band\/1393\/05\/\/[Gallery]\/dff84d5f85b963b98ef42ee4aa135c1e-3.jpg","time":"4:4","videoname":"\u0627\u0632 \u067e\u06cc\u0634\u0645 \u0645\u06cc\u0631\u06cc","lowq":"http:\/\/85.25.243.154\/video\/2\/25 band\/1393\/05\/\/dff84d5f85b963b98ef42ee4aa135c1e-l.mp4","highq":"http:\/\/85.25.243.154\/video\/2\/25 band\/1393\/05\/\/dff84d5f85b963b98ef42ee4aa135c1e-h.mp4","popularity":"4.6","view":"2479","url":"http:\/\/www.wikiseda.com\/25+band\/+video\/Az+Pisham+Miri","year":"1393"},{"id":"4094","type":"video","artist":"\u0627\u0645\u06cc\u062f","poster":"http:\/\/85.25.243.154\/video\/O\/Omid\/1393\/05\/\/[Gallery]\/b76300b87ec8246cf4a10720e14c5f42-3.jpg","time":"4:11","videoname":"\u062e\u0648\u0634 \u0642\u062f\u0645","lowq":"http:\/\/85.25.243.154\/video\/O\/Omid\/1393\/05\/\/b76300b87ec8246cf4a10720e14c5f42-l.mp4","highq":"http:\/\/85.25.243.154\/video\/O\/Omid\/1393\/05\/\/b76300b87ec8246cf4a10720e14c5f42-h.mp4","popularity":"4.7","view":"2176","url":"http:\/\/www.wikiseda.com\/Omid\/+video\/Khosh+Ghadam","year":"1393"},{"id":"4093","type":"video","artist":"\u0639\u0645\u0627\u062f \u0642\u0648\u06cc\u062f\u0644","poster":"http:\/\/85.25.243.154\/video\/E\/Emad Ghavidel\/1393\/05\/\/[Gallery]\/8ad3204c102df8df87142725cd338262-3.jpg","time":"4:20","videoname":"\u062f\u0631\u0648\u062f","lowq":"http:\/\/85.25.243.154\/video\/E\/Emad Ghavidel\/1393\/05\/\/8ad3204c102df8df87142725cd338262-l.mp4","highq":"http:\/\/85.25.243.154\/video\/E\/Emad Ghavidel\/1393\/05\/\/8ad3204c102df8df87142725cd338262-h.mp4","popularity":"5","view":"545","url":"http:\/\/www.wikiseda.com\/Emad+Ghavidel\/+video\/Dorood","year":"1393"},{"id":"4092","type":"video","artist":"\u0633\u062a\u0627\u0631","poster":"http:\/\/85.25.243.154\/video\/S\/Sataar\/1393\/05\/\/[Gallery]\/a7784847fcd13e23c242e7f485f23e97-3.jpg","time":"4:15","videoname":"\u062a\u0633\u06a9\u06cc\u0646","lowq":"http:\/\/85.25.243.154\/video\/S\/Sataar\/1393\/05\/\/a7784847fcd13e23c242e7f485f23e97-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Sataar\/1393\/05\/\/a7784847fcd13e23c242e7f485f23e97-h.mp4","popularity":"3","view":"528","url":"http:\/\/www.wikiseda.com\/Sataar\/+video\/Taskin","year":"1393"},{"id":"4090","type":"video","artist":"\u0627\u0645\u06cc\u0631 \u0641\u0631\u062c\u0627\u0645","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/05\/\/[Gallery]\/24470dc45053d6fba9102d4c9de27eae-3.jpg","time":"3:48","videoname":"\u062f\u06cc\u062f\u06cc \u0686\u06cc \u0634\u062f","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/05\/\/24470dc45053d6fba9102d4c9de27eae-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/05\/\/24470dc45053d6fba9102d4c9de27eae-h.mp4","popularity":"4","view":"651","url":"http:\/\/www.wikiseda.com\/Amir+Farjam\/+video\/Didi+Chi+Shod","year":"1393"},{"id":"4083","type":"video","artist":"\u0634\u0647\u0631\u0627\u0645 \u0635\u0648\u0644\u062a\u06cc","poster":"http:\/\/85.25.243.154\/video\/S\/Shahram Solati\/1393\/05\/\/[Gallery]\/93bb493810bdaa36936dd0d8d1d2455c-3.jpg","time":"3:38","videoname":"\u0646\u06af\u0631\u0627\u0646","lowq":"http:\/\/85.25.243.154\/video\/S\/Shahram Solati\/1393\/05\/\/93bb493810bdaa36936dd0d8d1d2455c-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shahram Solati\/1393\/05\/\/93bb493810bdaa36936dd0d8d1d2455c-h.mp4","popularity":"0","view":"599","url":"http:\/\/www.wikiseda.com\/Shahram+Solati\/+video\/Negaran","year":"1393"},{"id":"4063","type":"video","artist":"\u0633\u062a\u0627\u0631","poster":"http:\/\/85.25.243.154\/video\/S\/Sataar\/1393\/04\/\/[Gallery]\/2eed1a6275d3aac0d72e69973cb48836-3.jpg","time":"4:32","videoname":"\u0628\u0631\u0627\u06cc \u0628\u0627 \u062a\u0648 \u0628\u0648\u062f\u0646","lowq":"http:\/\/85.25.243.154\/video\/S\/Sataar\/1393\/04\/\/2eed1a6275d3aac0d72e69973cb48836-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Sataar\/1393\/04\/\/2eed1a6275d3aac0d72e69973cb48836-h.mp4","popularity":"3.2","view":"9300","url":"http:\/\/www.wikiseda.com\/Sataar\/+video\/baraye+ba+to+bodan","year":"1393"},{"id":"4062","type":"video","artist":"\u067e\u062f\u0631\u0627\u0645 \u0634\u0627\u0646\u0647 \u0633\u0627\u0632","poster":"http:\/\/85.25.243.154\/video\/P\/Pedram Shanesaz\/1393\/04\/\/[Gallery]\/90eb03444174e6395baf281e7dbdfcf2-3.jpg","time":"3:39","videoname":"\u06cc\u0647 \u0632\u0646","lowq":"http:\/\/85.25.243.154\/video\/P\/Pedram Shanesaz\/1393\/04\/\/90eb03444174e6395baf281e7dbdfcf2-l.mp4","highq":"http:\/\/85.25.243.154\/video\/P\/Pedram Shanesaz\/1393\/04\/\/90eb03444174e6395baf281e7dbdfcf2-h.mp4","popularity":"5","view":"4616","url":"http:\/\/www.wikiseda.com\/Pedram+Shanesaz\/+video\/Ye+Zan","year":"1393"},{"id":"4036","type":"video","artist":"\u0622\u0631\u0645\u06cc\u06a9","poster":"http:\/\/85.25.243.154\/video\/A\/Armec\/1393\/04\/\/[Gallery]\/e3d7807236e45fa8c9430956f69bfaeb-3.jpg","time":"4:3","videoname":"\u062e\u0648\u0634\u0645 \u0622\u0648\u06cc","lowq":"http:\/\/85.25.243.154\/video\/A\/Armec\/1393\/04\/\/e3d7807236e45fa8c9430956f69bfaeb-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Armec\/1393\/04\/\/e3d7807236e45fa8c9430956f69bfaeb-h.mp4","popularity":"3.2","view":"8438","url":"http:\/\/www.wikiseda.com\/Armec\/+video\/Khoshm+Awei","year":"1393"},{"id":"4034","type":"video","artist":"\u0627\u062d\u0645\u062f \u0633\u0639\u06cc\u062f\u06cc","poster":"http:\/\/85.25.243.154\/video\/A\/Ahmad Saeidi\/1393\/04\/\/[Gallery]\/99bb7e23fcf5d54b90b6e0b3ec1145c3-3.jpg","time":"3:18","videoname":"\u0646\u0627\u0632\u0646\u06cc\u0646","lowq":"http:\/\/85.25.243.154\/video\/A\/Ahmad Saeidi\/1393\/04\/\/99bb7e23fcf5d54b90b6e0b3ec1145c3-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ahmad Saeidi\/1393\/04\/\/99bb7e23fcf5d54b90b6e0b3ec1145c3-h.mp4","popularity":"4.1","view":"11003","url":"http:\/\/www.wikiseda.com\/Ahmad+Saeidi\/+video\/Nazanin","year":"1393"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    }
    if (this.option === 'search') {
      return console.log('Search');
    }
  };

  VideoModel.prototype.loadmore = function() {
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

  VideoModel.prototype.refresh = function() {
    if (this.loading === true) {
      return;
    }
    this._emit('refresh');
    return this.get();
  };

  VideoModel.prototype.setOption = function(option) {
    this.option = option;
    if (this.loading === true) {
      return;
    }
    this._emit('option', this.option);
    return this.refresh();
  };

  return VideoModel;

})(PagesModel);

/*
//@ sourceMappingURL=VideoModel.map
*/

},{"../PagesModel":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\PagesModel.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\Playlist.js":[function(require,module,exports){
var Playlist, _Emitter,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

module.exports = Playlist = (function(_super) {
  __extends(Playlist, _super);

  function Playlist(model, name, data) {
    this.model = model;
    this.name = name;
    this.data = data;
    this.addSongToEnd = __bind(this.addSongToEnd, this);
    this.addSong = __bind(this.addSong, this);
    Playlist.__super__.constructor.apply(this, arguments);
  }

  Playlist.prototype.getNextSong = function(song) {
    var data, i, index, _i, _len, _ref;
    i = 0;
    _ref = this.data;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      data = _ref[index];
      if (song.id === data.id) {
        i = index;
      }
    }
    if (this.data[i + 1] != null) {
      return this.data[i + 1];
    }
    return false;
  };

  Playlist.prototype.getSongs = function() {
    var song, _i, _len, _ref, _results;
    _ref = this.data;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      song = _ref[_i];
      _results.push(this._emit('add-song', song));
    }
    return _results;
  };

  Playlist.prototype.addSong = function(song) {
    if (this.find(song.id) !== false) {
      return;
    }
    this.data.push(song);
    this._emit('add-song', song);
    return this._emit('add-success', song);
  };

  Playlist.prototype.addSongToEnd = function(song) {
    if (this.find(song.id) !== false) {
      this.removeSong(song);
    }
    this.data.push(song);
    this._emit('add-song', song);
    return this._emit('add-success', song);
  };

  Playlist.prototype.removeSong = function(song) {
    var index, result, s, _i, _len, _ref;
    result = null;
    _ref = this.data;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      s = _ref[index];
      if (s.id === song.id) {
        result = index;
        break;
      }
    }
    this.data.splice(result, 1);
    return this._emit('remove-song', song);
  };

  Playlist.prototype.find = function(id) {
    var song, _i, _len, _ref;
    _ref = this.data;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      song = _ref[_i];
      if (song.id === id) {
        return song;
      }
    }
    return false;
  };

  return Playlist;

})(_Emitter);

/*
//@ sourceMappingURL=Playlist.map
*/

},{"./_Emitter":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\_Emitter.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\Playlists.js":[function(require,module,exports){
var Playlist, Playlists, _Emitter,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_Emitter = require('./_Emitter');

Playlist = require('./Playlist');

module.exports = Playlists = (function(_super) {
  __extends(Playlists, _super);

  function Playlists(model) {
    var json;
    this.model = model;
    this.createNewPlaylist = __bind(this.createNewPlaylist, this);
    Playlists.__super__.constructor.apply(this, arguments);
    this.playlists = {};
    json = '[{"id":"140863","type":"song","artist":"mostafa yeganeh","artist_id":"116","songname":"Bavar Kardani Nist","popularity":"3.4","ratecount":"15","view":"3393","time":"2:59","date":"1393-04-13","poster":"http:\/\/85.25.243.154\/img\/5oh2a70em-1404491150.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/Gallery\/[Medium]\/bc6dsgnp-1404491150.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/mostafa+yeganeh\/-\/Bavar+Kardani+Nist","mp3":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3"},{"id":"140809","type":"song","artist":"Masoud Emami","artist_id":"1905","songname":"Khoda Doosam Dasht","popularity":"3.6","ratecount":"9","view":"4457","time":"3:33","date":"1393-04-12","poster":"http:\/\/85.25.243.154\/img\/utxrohick-1404397432.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Gallery\/[Medium]\/2u6wzwdn-1404397432.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Masoud+Emami\/-\/Khoda+Doosam+Dasht","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3"},{"id":"140785","type":"song","artist":"Amin Hayaei","artist_id":"12201","songname":"Owje Parvaz","popularity":"3.8","ratecount":"8","view":"2205","time":"5:22","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/gq9zswptj-1404332339.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/Gallery\/[Medium]\/qixdrptt-1404332339.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amin+Hayaei\/-\/Owje+Parvaz","mp3":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3"},{"id":"140782","type":"song","artist":"Bakhtak Band","artist_id":"11623","songname":"Dame Sobh","popularity":"2.6","ratecount":"8","view":"2966","time":"3:27","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/1spygoohm-1404322313.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/Gallery\/[Medium]\/hxb0sre5-1404322313.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/-\/Dame+Sobh","mp3":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3"}]';
    this.nowPlaying = new Playlist(this.model, 'Now Playing', []);
    this.fav = new Playlist(this.model, 'Favorites', JSON.parse(json));
    this.playlists['Default'] = new Playlist(this.model, 'Default', JSON.parse(json));
  }

  Playlists.prototype.readPlaylists = function() {
    var key, val, _ref, _results;
    this._emit('playlist', this.nowPlaying);
    this._emit('playlist', this.fav);
    _ref = this.playlists;
    _results = [];
    for (key in _ref) {
      val = _ref[key];
      _results.push(this._emit('playlist-add', val));
    }
    return _results;
  };

  Playlists.prototype.createNewPlaylist = function(name) {
    return this._emit('playlist-add', new Playlist(this.model, name, []));
  };

  return Playlists;

})(_Emitter);

/*
//@ sourceMappingURL=Playlists.map
*/

},{"./Playlist":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\Playlist.js","./_Emitter":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\_Emitter.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\Settings.js":[function(require,module,exports){
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
    this.menu = false;
    this.selector = false;
    this.search = false;
    this.settings = false;
    this.playlists = false;
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
    this.menu = false;
    this._emit('menu', this.menu);
    this.selector = false;
    this._emit('selector', this.selector);
    return this._emit('right-swipe', this.rightSwipe);
  };

  TitleModel.prototype.toggleRightSwipe = function() {
    this.rightSwipe = !this.rightSwipe;
    return this._emit('right-swipe', this.rightSwipe);
  };

  TitleModel.prototype.showMenu = function() {
    this.showRightSwipe();
    this.menu = true;
    return this._emit('menu', this.menu);
  };

  TitleModel.prototype.hideMenu = function() {
    this.hideRightSwipe();
    this.menu = false;
    return this._emit('menu', this.menu);
  };

  TitleModel.prototype.toggleMenu = function() {
    this.toggleRightSwipe();
    this.menu = !this.menu;
    return this._emit('menu', this.menu);
  };

  TitleModel.prototype.showSelector = function() {
    this.showRightSwipe();
    this.selector = true;
    return this._emit('selector', this.selector);
  };

  TitleModel.prototype.hideSelector = function() {
    this.hideRightSwipe();
    this.selector = false;
    return this._emit('selector', this.selector);
  };

  TitleModel.prototype.toggleSelector = function() {
    this.toggleRightSwipe();
    this.selector = !this.selector;
    return this._emit('selector', this.selector);
  };

  TitleModel.prototype.showSearch = function() {
    this.search = true;
    return this._emit('search', this.search);
  };

  TitleModel.prototype.hideSearch = function() {
    this.search = false;
    return this._emit('search', this.search);
  };

  TitleModel.prototype.toggleSearch = function() {
    this.search = !this.search;
    return this._emit('search', this.search);
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
    this.rootModel.musicPlayer.pause();
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
    this.title2 = Foxie('.item-artist').putIn(this.titlesContainer);
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
    var plusHammer, song, _i, _len, _ref;
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.page = page;
    this.count = count;
    AlbumItem.__super__.constructor.apply(this, arguments);
    this.title1.innerHTML(data.album);
    this.title2.innerHTML(data.artist);
    this.plusBtn = Foxie('.album-plus').putIn(this.el);
    plusHammer = new Hammer(this.plusBtn.node);
    plusHammer.on('tap', (function(_this) {
      return function(arg) {
        var song, _i, _len, _ref, _results;
        _this.songs[0].play();
        _ref = _this.songs;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          song = _ref[_i];
          _results.push(song.addToNowPlaying());
        }
        return _results;
      };
    })(this));
    this.hammer.on('tap', (function(_this) {
      return function() {
        _this.mainView.model.albumDetail.toggleDetail(data.id);
      };
    })(this));
    this.mainView.model.albumDetail.on('detail-show', (function(_this) {
      return function(id) {
        if (id !== data.id) {
          return;
        }
        _this.el.setHeight(_this.songs.length * 50 + 75);
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
    if (data.albumtracks != null) {
      _ref = data.albumtracks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        song = _ref[_i];
        this.createSong(song);
      }
    }
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

},{"../Item":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item.js","../SimpleSong":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\SimpleSong.js","Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\ArtistItem.js":[function(require,module,exports){
var ArtistItem, Foxie, Item,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Foxie = require('Foxie');

Item = require('../Item');

module.exports = ArtistItem = (function(_super) {
  __extends(ArtistItem, _super);

  function ArtistItem(mainView, parentNode, page, data) {
    var t2;
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.page = page;
    ArtistItem.__super__.constructor.apply(this, arguments);
    this.title1.innerHTML(data.artist);
    t2 = data.fans + ' fan';
    if (data.following === 1) {
      t2 = t2 + ' plus you';
    }
    this.title2.innerHTML(t2);
    this.hammer.on('tap', (function(_this) {
      return function(arg) {
        return console.log(data);
      };
    })(this));
  }

  return ArtistItem;

})(Item);

/*
//@ sourceMappingURL=ArtistItem.map
*/

},{"../Item":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item.js","Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\SearchBar.js":[function(require,module,exports){
var Foxie, SearchBar;

Foxie = require('Foxie');

module.exports = SearchBar = (function() {
  function SearchBar(mainView, parentNode) {
    this.mainView = mainView;
    this.parentNode = parentNode;
    this.el = Foxie('.item.searchBar').perspective(4000);
    this.titlesContainer = Foxie('.titles-container').putIn(this.el);
    this.hammer = new Hammer(this.titlesContainer.node);
    this.input = Foxie('input.search-input').attr('type', 'text').putIn(this.titlesContainer);
    this.input.node.addEventListener('keydown', (function(_this) {
      return function(event) {
        if (event.keyCode === 13 || event.keyCode === 27) {
          return _this.input.node.blur();
        }
      };
    })(this));
    this.input.node.addEventListener('change', (function(_this) {
      return function(event) {
        return _this.cb(_this.input.node.value);
      };
    })(this));
    this.searchBtn = Foxie('.search-icon').putIn(this.titlesContainer);
    this.el.putIn(this.parentNode);
  }

  SearchBar.prototype.addPlaceholder = function(text) {
    return this.input.attr('placeholder', text);
  };

  SearchBar.prototype.onSearch = function(cb) {
    this.cb = cb;
  };

  SearchBar.prototype.clear = function() {
    return this.input.node.value = '';
  };

  SearchBar.prototype.isClear = function() {
    return this.input.node.value === '';
  };

  return SearchBar;

})();

/*
//@ sourceMappingURL=searchBar.map
*/

},{"Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\SongItem.js":[function(require,module,exports){
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
    this.title2.innerHTML(data.artist);
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
    this.title2.innerHTML(data.artist);
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
var Album, Artist, Foxie, HomePage, Main, MusicPlayer, Ribbon, RightSwipe, Search, Settings, Song, Video, VideoPlayer;

Foxie = require('foxie');

Ribbon = require('./Ribbon/Ribbon');

Artist = require('./Pages/Artist');

Video = require('./Pages/Video');

Album = require('./Pages/Album');

Song = require('./Pages/Song');

HomePage = require('./Pages/HomePage');

Search = require('./Search');

Settings = require('./Settings');

RightSwipe = require('./RightSwipe');

MusicPlayer = require('./MusicPlayer');

VideoPlayer = require('./VideoPlayer');

module.exports = Main = (function() {
  function Main(model) {
    var btnHammer, hammer;
    this.model = model;
    this.el = Foxie('.master').putIn(document.body);
    this.bg = Foxie('.master-bg').moveXTo(-200).trans(300).putIn(this.el);
    hammer = new Hammer(this.el.node);
    hammer.on('tap pan swipe', (function(_this) {
      return function(arg) {
        return _this.model.page.hideRightSwipe();
      };
    })(this));
    this.inside = Foxie('.master-inside');
    this.ribbon = new Ribbon(this, ['home', 'artist', 'album', 'song', 'video'], [this.model.home, this.model.artist, this.model.album, this.model.song, this.model.video]);
    this.inside.putIn(this.el);
    this.homePage = new HomePage(this, this.ribbon.getPage(0), this.ribbon.getSubnameSelector(0));
    this.artistPage = new Artist(this, this.ribbon.getPage(1), this.ribbon.getSubnameSelector(1));
    this.AlbumPage = new Album(this, this.ribbon.getPage(2), this.ribbon.getSubnameSelector(2));
    this.songPage = new Song(this, this.ribbon.getPage(3), this.ribbon.getSubnameSelector(3));
    this.videoPage = new Video(this, this.ribbon.getPage(4), this.ribbon.getSubnameSelector(4));
    this.btn = Foxie('.rightSwipeBtn').putIn(document.body);
    btnHammer = new Hammer(this.btn.node);
    btnHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.model.page.toggleMenu();
      };
    })(this));
    this.musicPlayer = new MusicPlayer(this);
    this.videoPlayer = new VideoPlayer(this);
    this.settings = new Settings(this);
    this.rightSwipe = new RightSwipe(this);
  }

  return Main;

})();

/*
//@ sourceMappingURL=Main.map
*/

},{"./MusicPlayer":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\MusicPlayer.js","./Pages/Album":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\Album.js","./Pages/Artist":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\Artist.js","./Pages/HomePage":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\HomePage.js","./Pages/Song":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\Song.js","./Pages/Video":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\Video.js","./Ribbon/Ribbon":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Ribbon\\Ribbon.js","./RightSwipe":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\RightSwipe.js","./Search":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Search.js","./Settings":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Settings.js","./VideoPlayer":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\VideoPlayer.js","foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\MusicPlayer.js":[function(require,module,exports){
var Foxie, Lyric, MusicPlayer, Seekbar;

Foxie = require('Foxie');

Lyric = require('./MusicPlayer/Lyric');

Seekbar = require('./MusicPlayer/Seekbar');

module.exports = MusicPlayer = (function() {
  function MusicPlayer(mainView) {
    var addHammer, elHammer, favHammer, hideBtnHammer, lock, playHammer, playTopHammer;
    this.mainView = mainView;
    this.transTime = 700;
    this.showing = false;
    this.height = window.innerHeight;
    this.el = Foxie('.musicplayer').moveYTo(this.height).trans(this.transTime).perspective(4000).putIn(document.body);
    lock = false;
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
        if (arg.srcEvent.target !== _this.el.node) {
          lock = true;
          return;
        }
        if (lock) {
          return;
        }
        return _this.hide();
      };
    })(this));
    elHammer.on('panend', (function(_this) {
      return function(arg) {
        return lock = false;
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
    this.add = Foxie('.musicplayer-button.musicplayer-add').putIn(this.buttons);
    this.prev = Foxie('.musicplayer-button.musicplayer-prev').putIn(this.buttons);
    this.play = Foxie('.musicplayer-button.musicplayer-play').putIn(this.buttons);
    this.next = Foxie('.musicplayer-button.musicplayer-next').putIn(this.buttons);
    this.fav = Foxie('.musicplayer-button.musicplayer-fav').putIn(this.buttons);
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
    favHammer = new Hammer(this.fav.node);
    favHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.mainView.model.musicPlayer.fav();
      };
    })(this));
    addHammer = new Hammer(this.add.node);
    addHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.mainView.model.page.showSelector();
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
    this.mainView.model.musicPlayer.on('song-fav', (function(_this) {
      return function(data) {
        _this.fav.node.classList.remove('musicplayer-fav');
        return _this.fav.node.classList.add('musicplayer-faved');
      };
    })(this));
    this.mainView.model.musicPlayer.on('song-unfav', (function(_this) {
      return function(data) {
        _this.fav.node.classList.remove('musicplayer-faved');
        return _this.fav.node.classList.add('musicplayer-fav');
      };
    })(this));
  }

  MusicPlayer.prototype.show = function(data) {
    if (this.mainView.model.musicPlayer.seeking) {
      return;
    }
    this.mainView.model.page.hideSelector();
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
    this.mainView.model.page.hideSelector();
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
    lyricHammer = new Hammer(this.parentNode.node, {
      prevent_default: true
    });
    lyricHammer.on('tap', (function(_this) {
      return function(arg) {
        return _this.model.toggleLyrics();
      };
    })(this));
    lyricHammer.on('pan', (function(_this) {
      return function(arg) {
        _this.scroll.drag(arg.deltaY - x);
        x = arg.deltaY;
        return false;
      };
    })(this));
    lyricHammer.on('panend', (function(_this) {
      return function(arg) {
        _this.scroll.release();
        x = 0;
        return false;
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
  album: require('./Item/AlbumItem'),
  artist: require('./Item/ArtistItem'),
  searchBar: require('./Item/SearchBar')
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
    this.showSearch = false;
    this.offsetScroll = -18;
    this.offsetScrollSearch = -32;
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
        _this.showSearch = false;
        if (_this.scroll.position > 100) {
          _this.pullDown.innerHTML('Release to refresh');
          _this.refresh = true;
        } else {
          _this.pullDown.innerHTML('Pull down to refresh');
          _this.refresh = false;
          _this.showSearch = true;
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
        } else if (_this.scroll.position > _this.offsetScroll && _this.showSearch === false) {
          _this.hidePullup();
        } else if (_this.scroll.position > _this.offsetScroll) {
          _this.hidePullupButSearch();
        }
        return _this.cancelAutoScroll = false;
      };
    })(this));
    this.searchBar = new Item.searchBar(this.mainView, this.el);
  }

  Pages.prototype._prepareSearchBar = function() {
    this.searchBar.onSearch((function(_this) {
      return function(data) {
        _this.model.setOption('search');
        return console.log(data);
      };
    })(this));
    return this.model.on('option', (function(_this) {
      return function(data) {
        if (!isNaN(data)) {
          return _this.searchBar.clear();
        }
      };
    })(this));
  };

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
    return this.scrollTo(index * -78 + this.offsetScrollSearch);
  };

  Pages.prototype.hidePullup = function() {
    return setTimeout((function(_this) {
      return function() {
        if (_this.cancelAutoScroll === true) {
          return;
        }
        if (_this.searchBar.isClear() === true) {
          return _this.scrollTo(_this.offsetScroll + _this.offsetScrollSearch);
        } else {
          return _this.scrollTo(_this.offsetScroll);
        }
      };
    })(this), 400);
  };

  Pages.prototype.hidePullupButSearch = function() {
    return setTimeout((function(_this) {
      return function() {
        if (_this.cancelAutoScroll === true) {
          return;
        }
        return _this.scrollTo(_this.offsetScroll);
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

},{"./Item/AlbumItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\AlbumItem.js","./Item/ArtistItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\ArtistItem.js","./Item/SearchBar":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\SearchBar.js","./Item/SongItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\SongItem.js","./Item/VideoItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Item\\VideoItem.js","./Ribbon/SubnameSelector":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Ribbon\\SubnameSelector.js","./Scrolla":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Scrolla.js","foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Pages\\Album.js":[function(require,module,exports){
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
    this.searchBar.addPlaceholder('Search Albums');
    this._prepareSearchBar();
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
    this.searchBar.addPlaceholder('Search Artists');
    this._prepareSearchBar();
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
    this.searchBar.addPlaceholder('Search Everywhere');
    this._prepareSearchBar();
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
    this.searchBar.addPlaceholder('Search Songs');
    this._prepareSearchBar();
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
    this.searchBar.addPlaceholder('Search Videos');
    this._prepareSearchBar();
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
  function Ribbon(rootView, t, models) {
    var i, line, title, _i, _len, _ref;
    this.rootView = rootView;
    this.t = t;
    this.models = models;
    this.width = window.innerWidth;
    this.ribbonBarSpace = 20;
    this.el = Foxie('.ribbon').putIn(this.rootView.el);
    line = Foxie('.ribbon-line').putIn(this.el);
    this.underLine = Foxie('.ribbon-underline').putIn(this.el);
    this.titles = [];
    this.pages = [];
    this.visitedPageFirstTime = [];
    _ref = this.t;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      title = _ref[i];
      this.addTitle(title);
      this.pages.push(new RibbonPage(this.rootView, i * this.width, i));
      this.visitedPageFirstTime.push(false);
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
    if (this.visitedPageFirstTime[index] === false) {
      this.models[index].get();
    }
    this.visitedPageFirstTime[index] = true;
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
var Foxie, MenuItem, PlaylistSelector, Playlists, RightSwipe, Scrolla;

Foxie = require('Foxie');

PlaylistSelector = require('./RightSwipe/PlaylistSelector');

Playlists = require('./RightSwipe/Playlists');

MenuItem = require('./RightSwipe/MenuItem');

Scrolla = require('./Scrolla');

module.exports = RightSwipe = (function() {
  function RightSwipe(mainView) {
    var elHammer, y;
    this.mainView = mainView;
    this.model = this.mainView.model.page;
    this.items = [];
    this.el = Foxie('.rightSwipe').moveXTo(-200).trans(300).putIn(document.body);
    this.pages = Foxie('.rightSwipePages').trans(300).putIn(this.el);
    this.pages2 = Foxie('.rightSwipePages').moveXTo(-1000).putIn(this.el);
    this.selectorPage = Foxie('.rightSwipePage').putIn(this.pages2);
    this.page1 = Foxie('.rightSwipePage').putIn(this.pages);
    this.page2 = Foxie('.rightSwipePage').moveXTo(200).putIn(this.pages);
    elHammer = new Hammer(this.el.node);
    elHammer.on('panleft', (function(_this) {
      return function(arg) {
        return _this.model.hideMenu();
      };
    })(this));
    elHammer.on('panright', (function(_this) {
      return function(arg) {
        if (_this.model.menu === false) {
          return;
        }
        _this.showPage(0);
        return _this.playlists.hide();
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
    this.mainView.model.page.on('menu', (function(_this) {
      return function() {
        return _this.showMenu();
      };
    })(this));
    this.mainView.model.page.on('selector', (function(_this) {
      return function() {
        return _this.showSelector();
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
    this.newItem('</br>');
    this.newItem('Playlists', ((function(_this) {
      return function() {};
    })(this)), true);
    this.playlists = new Playlists(this.mainView, this);
    this.playlistSelector = new PlaylistSelector(this.mainView, this);
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

  RightSwipe.prototype.showPage = function(id) {
    return this.pages.moveXTo(-200 * id);
  };

  RightSwipe.prototype.show = function() {
    return this.el.moveXTo(0);
  };

  RightSwipe.prototype.hide = function() {
    return this.el.moveXTo(-200);
  };

  RightSwipe.prototype.newItem = function(data, cb, stay) {
    var item;
    item = new MenuItem(this.model, this.page1, data, cb, stay);
    this.items.push(item);
    return item;
  };

  RightSwipe.prototype.newItemInSelector = function(data, cb, stay) {
    var item;
    item = new MenuItem(this.model, this.selectorPage, data, cb, stay);
    return item;
  };

  RightSwipe.prototype.addItem = function(item) {
    return this.items.push(item);
  };

  RightSwipe.prototype.updateScrollSize = function() {
    this.viewportHeight = window.innerHeight;
    this.insideHeight = this.page1.node.getBoundingClientRect().height + 200;
    return this.scroll.setSizeAndSpace(this.insideHeight, this.viewportHeight);
  };

  RightSwipe.prototype.scrollUpToEdit = function() {
    return this.scroll.forceSetPosition(-this.page1.node.getBoundingClientRect().height + 100);
  };

  RightSwipe.prototype.scrollDownToEnd = function() {
    return this.scroll.forceSetPosition(-this.page1.node.getBoundingClientRect().height + this.viewportHeight - 200);
  };

  RightSwipe.prototype.removeItem = function(item) {
    return this.page1.node.removeChild(item.el.node);
  };

  RightSwipe.prototype.appendItem = function(item) {
    return this.page1.node.appendChild(item.el.node);
  };

  RightSwipe.prototype.moveItemToEnd = function(item) {
    this.removeItem(item);
    return this.appendItem(item);
  };

  RightSwipe.prototype.moveItemToEndInSelector = function(item) {
    this.selectorPage.node.removeChild(item.el.node);
    return this.selectorPage.node.appendChild(item.el.node);
  };

  RightSwipe.prototype.showMenu = function() {
    this.showPage(0);
    this.pages.moveXTo(0);
    return this.pages2.moveXTo(-1000);
  };

  RightSwipe.prototype.showSelector = function() {
    this.pages.moveXTo(-1000);
    return this.pages2.moveXTo(0);
  };

  return RightSwipe;

})();

/*
//@ sourceMappingURL=RightSwipe.map
*/

},{"./RightSwipe/MenuItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\RightSwipe\\MenuItem.js","./RightSwipe/PlaylistSelector":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\RightSwipe\\PlaylistSelector.js","./RightSwipe/Playlists":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\RightSwipe\\Playlists.js","./Scrolla":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Scrolla.js","Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\RightSwipe\\MenuItem.js":[function(require,module,exports){
var Foxie, MenuItem;

Foxie = require('Foxie');

module.exports = MenuItem = (function() {
  function MenuItem(model, parentNode, data, cb, stay) {
    var elHammer;
    this.model = model;
    this.parentNode = parentNode;
    if (stay == null) {
      stay = false;
    }
    this.el = Foxie('.menu-item').innerHTML(data).putIn(this.parentNode);
    if (cb != null) {
      elHammer = new Hammer(this.el.node);
      elHammer.on('tap', (function(_this) {
        return function(arg) {
          cb(arg, _this);
          if (stay === false) {
            return _this.model.hideRightSwipe();
          }
        };
      })(this));
    }
  }

  MenuItem.prototype.updateText = function(text) {
    return this.el.innerHTML(text);
  };

  MenuItem.prototype.removeMe = function() {
    return this.el.remove();
  };

  return MenuItem;

})();

/*
//@ sourceMappingURL=MenuItem.map
*/

},{"Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\RightSwipe\\Playlist.js":[function(require,module,exports){
var Foxie, MenuItem, Playlist;

Foxie = require('foxie');

MenuItem = require('./MenuItem');

module.exports = Playlist = (function() {
  function Playlist(parentNode, mainView, model) {
    this.parentNode = parentNode;
    this.mainView = mainView;
    this.model = model;
    this.items = {};
    this.el = Foxie('.playlist').trans(300).scaleXTo(0).putIn(this.parentNode);
    this.model.on('add-song', (function(_this) {
      return function(song) {
        return _this.addSong(song);
      };
    })(this));
    this.model.on('remove-song', (function(_this) {
      return function(song) {
        return _this.removeSong(song);
      };
    })(this));
    this.model.getSongs();
  }

  Playlist.prototype.show = function() {
    return this.el.scaleXTo(1);
  };

  Playlist.prototype.hide = function() {
    return this.el.scaleXTo(0);
  };

  Playlist.prototype.addSong = function(song) {
    var item;
    item = new MenuItem(this.mainView.model.page, this.el, song.songname, (function(_this) {
      return function() {
        var data, _i, _len, _ref, _results;
        _this.mainView.model.musicPlayer.play(song);
        _ref = _this.model.data;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          data = _ref[_i];
          _results.push(_this.mainView.model.musicPlayer.addToNowPlaying(data));
        }
        return _results;
      };
    })(this));
    return this.items[song.id] = item;
  };

  Playlist.prototype.removeSong = function(song) {
    var item;
    if (this.items[song.id] == null) {
      return;
    }
    item = this.items[song.id];
    item.removeMe();
    return this.items[song.id] = void 0;
  };

  return Playlist;

})();

/*
//@ sourceMappingURL=Playlist.map
*/

},{"./MenuItem":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\RightSwipe\\MenuItem.js","foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\RightSwipe\\PlaylistSelector.js":[function(require,module,exports){
var Foxie, Playlists;

Foxie = require('foxie');

module.exports = Playlists = (function() {
  function Playlists(mainView, rightSwipe) {
    var plus;
    this.mainView = mainView;
    this.rightSwipe = rightSwipe;
    this.playlists = {};
    plus = this.prepareNewPlaylist('+', (function(_this) {
      return function(arg, item) {
        return _this.startMakingNew(item);
      };
    })(this));
    plus.el.node.addEventListener('keydown', (function(_this) {
      return function(event) {
        if (event.keyCode === 13 || event.keyCode === 27) {
          return plus.el.attr('contenteditable', 'false');
        }
      };
    })(this));
    plus.el.node.addEventListener('blur', (function(_this) {
      return function() {
        if (plus.el.node.innerHTML === '<h4></h4>' || plus.el.node.innerHTML === '' || plus.el.node.innerHTML === '<h4> </h4>' || plus.el.node.innerHTML === ' ' || plus.el.node.innerHTML === '<h4>+</h4>' || plus.el.node.innerHTML === '+') {
          return _this.cancelMakingNew(plus);
        } else {
          return _this.endMakingNew(plus);
        }
      };
    })(this));
    this.mainView.model.playlists.on('playlist-add', (function(_this) {
      return function(playlistModel) {
        _this.createNewPlaylist(playlistModel);
        return _this.rightSwipe.moveItemToEndInSelector(plus);
      };
    })(this));
    this.mainView.model.playlists.readPlaylists();
  }

  Playlists.prototype.prepareNewPlaylist = function(text, cb) {
    return this.rightSwipe.newItemInSelector('<h4>' + text + '</h4>', cb, true);
  };

  Playlists.prototype.createNewPlaylist = function(playlistModel) {
    var el;
    el = this.rightSwipe.newItemInSelector(playlistModel.name, (function(_this) {
      return function() {
        return playlistModel.addSong(_this.mainView.model.musicPlayer.playingData);
      };
    })(this));
    return this.playlists[playlistModel.name] = el;
  };

  Playlists.prototype.hide = function() {
    var key, val, _ref, _results;
    _ref = this.playlists;
    _results = [];
    for (key in _ref) {
      val = _ref[key];
      _results.push(val.hide());
    }
    return _results;
  };

  Playlists.prototype.cancelMakingNew = function(plus) {
    this.update(plus, '+');
    return plus.el.attr('contenteditable', 'false');
  };

  Playlists.prototype.endMakingNew = function(plus) {
    var name;
    plus.el.attr('contenteditable', 'false');
    name = plus.el.node.innerText;
    this.mainView.model.playlists.createNewPlaylist(name);
    this.update(plus, '+');
    this.rightSwipe.moveItemToEndInSelector(plus);
    this.rightSwipe.updateScrollSize();
    return this.rightSwipe.scrollDownToEnd();
  };

  Playlists.prototype.startMakingNew = function(item) {
    this.rightSwipe.scrollUpToEdit();
    this.update(item, '');
    item.el.attr('contenteditable', 'true');
    return setTimeout(((function(_this) {
      return function() {
        return item.el.node.focus();
      };
    })(this)), 100);
  };

  Playlists.prototype.update = function(item, text) {
    return item.updateText('<h4>' + text + '</h4>');
  };

  return Playlists;

})();

/*
//@ sourceMappingURL=PlaylistSelector.map
*/

},{"foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\RightSwipe\\Playlists.js":[function(require,module,exports){
var Foxie, Playlist, Playlists;

Foxie = require('foxie');

Playlist = require('./Playlist');

module.exports = Playlists = (function() {
  function Playlists(mainView, rightSwipe) {
    var plus;
    this.mainView = mainView;
    this.rightSwipe = rightSwipe;
    this.playlists = {};
    plus = this.prepareNewPlaylist('+', (function(_this) {
      return function(arg, item) {
        return _this.startMakingNew(item);
      };
    })(this));
    plus.el.node.addEventListener('keydown', (function(_this) {
      return function(event) {
        if (event.keyCode === 13 || event.keyCode === 27) {
          return plus.el.attr('contenteditable', 'false');
        }
      };
    })(this));
    plus.el.node.addEventListener('blur', (function(_this) {
      return function() {
        if (plus.el.node.innerHTML === '<h4></h4>' || plus.el.node.innerHTML === '' || plus.el.node.innerHTML === '<h4> </h4>' || plus.el.node.innerHTML === ' ' || plus.el.node.innerHTML === '<h4>+</h4>' || plus.el.node.innerHTML === '+') {
          return _this.cancelMakingNew(plus);
        } else {
          return _this.endMakingNew(plus);
        }
      };
    })(this));
    this.mainView.model.playlists.on('playlist', (function(_this) {
      return function(playlistModel) {
        _this.createNewPlaylist(playlistModel);
        return _this.rightSwipe.moveItemToEnd(plus);
      };
    })(this));
    this.mainView.model.playlists.on('playlist-add', (function(_this) {
      return function(playlistModel) {
        _this.createNewPlaylist(playlistModel);
        return _this.rightSwipe.moveItemToEnd(plus);
      };
    })(this));
  }

  Playlists.prototype.prepareNewPlaylist = function(text, cb) {
    return this.rightSwipe.newItem('<h4>' + text + '</h4>', cb, true);
  };

  Playlists.prototype.createNewPlaylist = function(playlistModel) {
    var el;
    el = new Playlist(this.rightSwipe.page2, this.mainView, playlistModel);
    this.playlists[playlistModel.name] = el;
    return this.prepareNewPlaylist(playlistModel.name, (function(_this) {
      return function() {
        _this.rightSwipe.showPage(1);
        _this.hide();
        return el.show();
      };
    })(this));
  };

  Playlists.prototype.hide = function() {
    var key, val, _ref, _results;
    _ref = this.playlists;
    _results = [];
    for (key in _ref) {
      val = _ref[key];
      _results.push(val.hide());
    }
    return _results;
  };

  Playlists.prototype.cancelMakingNew = function(plus) {
    this.update(plus, '+');
    plus.el.attr('contenteditable', 'false');
    return this.rightSwipe.scroll.forceSetPosition(-this.rightSwipe.page1.node.getBoundingClientRect().height + this.rightSwipe.viewportHeight - 200);
  };

  Playlists.prototype.endMakingNew = function(plus) {
    var name;
    plus.el.attr('contenteditable', 'false');
    name = plus.el.node.innerText;
    this.mainView.model.playlists.createNewPlaylist(name);
    this.update(plus, '+');
    this.rightSwipe.moveItemToEnd(plus);
    this.rightSwipe.updateScrollSize();
    return this.rightSwipe.scrollDownToEnd();
  };

  Playlists.prototype.startMakingNew = function(item) {
    this.rightSwipe.scrollUpToEdit();
    this.update(item, '');
    item.el.attr('contenteditable', 'true');
    return setTimeout(((function(_this) {
      return function() {
        return item.el.node.focus();
      };
    })(this)), 100);
  };

  Playlists.prototype.update = function(item, text) {
    return item.updateText('<h4>' + text + '</h4>');
  };

  return Playlists;

})();

/*
//@ sourceMappingURL=Playlists.map
*/

},{"./Playlist":"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\RightSwipe\\Playlist.js","foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Scrolla.js":[function(require,module,exports){
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

},{"../Model/_Emitter":"D:\\xampp\\htdocs\\jik\\scripts\\js\\Model\\_Emitter.js","raf-timing/scripts/js/lib/raf":"D:\\xampp\\htdocs\\jik\\node_modules\\raf-timing\\scripts\\js\\lib\\raf.js","timing-function":"D:\\xampp\\htdocs\\jik\\node_modules\\timing-function\\scripts\\js\\lib\\timingFunction.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Search.js":[function(require,module,exports){
var Foxie, Settings;

Foxie = require('Foxie');

module.exports = Settings = (function() {
  function Settings(mainView) {
    var elHammer;
    this.mainView = mainView;
    this.el = Foxie('.settings').scaleXTo(0).trans(400).putIn(document.body);
    elHammer = new Hammer(this.el.node);
    elHammer.on('panleft panright', (function(_this) {
      return function(arg) {
        return _this.mainView.model.page.hideSearch();
      };
    })(this));
    this.mainView.model.page.on('search', (function(_this) {
      return function(flag) {
        if (flag) {
          return _this.show();
        } else {
          return _this.hide();
        }
      };
    })(this));
  }

  Settings.prototype.show = function() {
    return this.el.scaleXTo(1);
  };

  Settings.prototype.hide = function() {
    return this.el.scaleXTo(0);
  };

  return Settings;

})();

/*
//@ sourceMappingURL=Search.map
*/

},{"Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\Settings.js":[function(require,module,exports){
var Foxie, Settings;

Foxie = require('Foxie');

module.exports = Settings = (function() {
  function Settings(mainView) {
    var elHammer;
    this.mainView = mainView;
    this.el = Foxie('.settings').scaleXTo(0).trans(400).putIn(document.body);
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
    this.data = data;
    this.el = Foxie('.simple-songname').innerHTML(this.data.songname).moveYTo(100).putIn(this.parentNode);
    this.hammer = new Hammer(this.el.node);
    this.hammer.on('tap', (function(_this) {
      return function() {
        return _this.play();
      };
    })(this));
    this.icon = Foxie('.simple-icon').putIn(this.el);
    this.el.putIn(this.parentNode);
  }

  SimpleSong.prototype.play = function() {
    return this.mainView.model.musicPlayer.play(this.data);
  };

  SimpleSong.prototype.addToNowPlaying = function() {
    return this.mainView.model.musicPlayer.addToNowPlaying(this.data);
  };

  return SimpleSong;

})();

/*
//@ sourceMappingURL=SimpleSong.map
*/

},{"Foxie":"D:\\xampp\\htdocs\\jik\\node_modules\\Foxie\\scripts\\js\\lib\\Foxie.js"}],"D:\\xampp\\htdocs\\jik\\scripts\\js\\View\\VideoPlayer.js":[function(require,module,exports){
var Foxie, videoPlayer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Foxie = require('Foxie');

module.exports = videoPlayer = (function() {
  function videoPlayer(mainView) {
    var elHammer, hideHammer;
    this.mainView = mainView;
    this.pause = __bind(this.pause, this);
    this.play = __bind(this.play, this);
    this.transTime = 700;
    this.showing = false;
    this.height = window.innerHeight;
    this.el = Foxie('.musicplayer').moveYTo(this.height).trans(this.transTime).perspective(4000).putIn(document.body);
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
    this.playPauseBtn = Foxie('.videoplayer-playpause').putIn(this.el);
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
    this.mainView.model.videoPlayer.on('video-unpause', this.play);
    this.mainView.model.videoPlayer.on('video-pause', this.pause);
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

  videoPlayer.prototype.play = function() {
    this.videoTag.play();
    this.playPauseBtn.node.classList.remove('videoplayer-resume');
    this.playPauseBtn.setOpacity(.3);
    return setTimeout((function(_this) {
      return function() {
        return _this.playPauseBtn.setOpacity(0);
      };
    })(this), 2000);
  };

  videoPlayer.prototype.pause = function() {
    this.videoTag.pause();
    this.playPauseBtn.node.classList.add('videoplayer-resume');
    return this.playPauseBtn.setOpacity(1);
  };

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
    this.artist.innerHTML(data.artist);
    return this.play();
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