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
