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
          json = '[{"id":"4177","type":"video","artist":"Shahkar Binesh Pajoh","poster":"http:\/\/85.25.243.154\/video\/S\/Shahkar Binesh Pajoh\/1393\/06\/\/[Gallery]\/db8f9cfa210d0c546dc5e0302688ba70-3.jpg","time":"4:22","videoname":"Tahdid","lowq":"http:\/\/85.25.243.154\/video\/S\/Shahkar Binesh Pajoh\/1393\/06\/\/db8f9cfa210d0c546dc5e0302688ba70-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shahkar Binesh Pajoh\/1393\/06\/\/db8f9cfa210d0c546dc5e0302688ba70-h.mp4","popularity":"0","view":"499","url":"http:\/\/www.wikiseda.com\/Shahkar+Binesh+Pajoh\/+video\/Tahdid","year":"1393"},{"id":"4176","type":"video","artist":"Bakhtak Band","poster":"http:\/\/85.25.243.154\/video\/B\/Bakhtak Band\/1393\/06\/\/[Gallery]\/034cc7a14a173c1a29f3b8b0a0284425-3.jpg","time":"3:27","videoname":"Dame sobh","lowq":"http:\/\/85.25.243.154\/video\/B\/Bakhtak Band\/1393\/06\/\/034cc7a14a173c1a29f3b8b0a0284425-l.mp4","highq":"http:\/\/85.25.243.154\/video\/B\/Bakhtak Band\/1393\/06\/\/034cc7a14a173c1a29f3b8b0a0284425-h.mp4","popularity":"5","view":"466","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/+video\/Dame+sobh","year":"1393"},{"id":"4172","type":"video","artist":"Ashkin0098","poster":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/[Gallery]\/e1e1206c13c0d6141e658c5c18243d9e-3.jpg","time":"3:3","videoname":"Ye Ahang Bezar Beraghsim","lowq":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/e1e1206c13c0d6141e658c5c18243d9e-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/e1e1206c13c0d6141e658c5c18243d9e-h.mp4","popularity":"3.5","view":"2842","url":"http:\/\/www.wikiseda.com\/Ashkin0098\/+video\/Ye+Ahang+Bezar+Beraghsim","year":"1393"},{"id":"4171","type":"video","artist":"Ali Magic Mg","poster":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/[Gallery]\/c71a90c873c608351f3ccae3f1f41b29-3.jpg","time":"3:50","videoname":"Chahar Ta Refigh","lowq":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/c71a90c873c608351f3ccae3f1f41b29-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/c71a90c873c608351f3ccae3f1f41b29-h.mp4","popularity":"2.3","view":"2091","url":"http:\/\/www.wikiseda.com\/Ali+Magic+Mg\/+video\/Chahar+Ta+Refigh","year":"1393"},{"id":"4168","type":"video","artist":"Amir Molaei","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/[Gallery]\/4f9f4f75f4409ad2c4c5b1188267fe08-3.jpg","time":"0:57","videoname":"Varooneh Teaser Album","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/4f9f4f75f4409ad2c4c5b1188267fe08-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/4f9f4f75f4409ad2c4c5b1188267fe08-h.mp4","popularity":"1","view":"780","url":"http:\/\/www.wikiseda.com\/Amir+Molaei\/+video\/Varooneh+Teaser+Album","year":"1393"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    } else if (this.option === 1) {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"4177","type":"video","artist":"Shahkar Binesh Pajoh","poster":"http:\/\/85.25.243.154\/video\/S\/Shahkar Binesh Pajoh\/1393\/06\/\/[Gallery]\/db8f9cfa210d0c546dc5e0302688ba70-3.jpg","time":"4:22","videoname":"Tahdid","lowq":"http:\/\/85.25.243.154\/video\/S\/Shahkar Binesh Pajoh\/1393\/06\/\/db8f9cfa210d0c546dc5e0302688ba70-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shahkar Binesh Pajoh\/1393\/06\/\/db8f9cfa210d0c546dc5e0302688ba70-h.mp4","popularity":"0","view":"499","url":"http:\/\/www.wikiseda.com\/Shahkar+Binesh+Pajoh\/+video\/Tahdid","year":"1393"},{"id":"4176","type":"video","artist":"Bakhtak Band","poster":"http:\/\/85.25.243.154\/video\/B\/Bakhtak Band\/1393\/06\/\/[Gallery]\/034cc7a14a173c1a29f3b8b0a0284425-3.jpg","time":"3:27","videoname":"Dame sobh","lowq":"http:\/\/85.25.243.154\/video\/B\/Bakhtak Band\/1393\/06\/\/034cc7a14a173c1a29f3b8b0a0284425-l.mp4","highq":"http:\/\/85.25.243.154\/video\/B\/Bakhtak Band\/1393\/06\/\/034cc7a14a173c1a29f3b8b0a0284425-h.mp4","popularity":"5","view":"466","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/+video\/Dame+sobh","year":"1393"},{"id":"4172","type":"video","artist":"Ashkin0098","poster":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/[Gallery]\/e1e1206c13c0d6141e658c5c18243d9e-3.jpg","time":"3:3","videoname":"Ye Ahang Bezar Beraghsim","lowq":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/e1e1206c13c0d6141e658c5c18243d9e-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/e1e1206c13c0d6141e658c5c18243d9e-h.mp4","popularity":"3.5","view":"2842","url":"http:\/\/www.wikiseda.com\/Ashkin0098\/+video\/Ye+Ahang+Bezar+Beraghsim","year":"1393"},{"id":"4171","type":"video","artist":"Ali Magic Mg","poster":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/[Gallery]\/c71a90c873c608351f3ccae3f1f41b29-3.jpg","time":"3:50","videoname":"Chahar Ta Refigh","lowq":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/c71a90c873c608351f3ccae3f1f41b29-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/c71a90c873c608351f3ccae3f1f41b29-h.mp4","popularity":"2.3","view":"2091","url":"http:\/\/www.wikiseda.com\/Ali+Magic+Mg\/+video\/Chahar+Ta+Refigh","year":"1393"},{"id":"4168","type":"video","artist":"Amir Molaei","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/[Gallery]\/4f9f4f75f4409ad2c4c5b1188267fe08-3.jpg","time":"0:57","videoname":"Varooneh Teaser Album","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/4f9f4f75f4409ad2c4c5b1188267fe08-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/4f9f4f75f4409ad2c4c5b1188267fe08-h.mp4","popularity":"1","view":"780","url":"http:\/\/www.wikiseda.com\/Amir+Molaei\/+video\/Varooneh+Teaser+Album","year":"1393"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    } else if (this.option === 2) {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"4177","type":"video","artist":"Shahkar Binesh Pajoh","poster":"http:\/\/85.25.243.154\/video\/S\/Shahkar Binesh Pajoh\/1393\/06\/\/[Gallery]\/db8f9cfa210d0c546dc5e0302688ba70-3.jpg","time":"4:22","videoname":"Tahdid","lowq":"http:\/\/85.25.243.154\/video\/S\/Shahkar Binesh Pajoh\/1393\/06\/\/db8f9cfa210d0c546dc5e0302688ba70-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shahkar Binesh Pajoh\/1393\/06\/\/db8f9cfa210d0c546dc5e0302688ba70-h.mp4","popularity":"0","view":"499","url":"http:\/\/www.wikiseda.com\/Shahkar+Binesh+Pajoh\/+video\/Tahdid","year":"1393"},{"id":"4176","type":"video","artist":"Bakhtak Band","poster":"http:\/\/85.25.243.154\/video\/B\/Bakhtak Band\/1393\/06\/\/[Gallery]\/034cc7a14a173c1a29f3b8b0a0284425-3.jpg","time":"3:27","videoname":"Dame sobh","lowq":"http:\/\/85.25.243.154\/video\/B\/Bakhtak Band\/1393\/06\/\/034cc7a14a173c1a29f3b8b0a0284425-l.mp4","highq":"http:\/\/85.25.243.154\/video\/B\/Bakhtak Band\/1393\/06\/\/034cc7a14a173c1a29f3b8b0a0284425-h.mp4","popularity":"5","view":"466","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/+video\/Dame+sobh","year":"1393"},{"id":"4172","type":"video","artist":"Ashkin0098","poster":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/[Gallery]\/e1e1206c13c0d6141e658c5c18243d9e-3.jpg","time":"3:3","videoname":"Ye Ahang Bezar Beraghsim","lowq":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/e1e1206c13c0d6141e658c5c18243d9e-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/e1e1206c13c0d6141e658c5c18243d9e-h.mp4","popularity":"3.5","view":"2842","url":"http:\/\/www.wikiseda.com\/Ashkin0098\/+video\/Ye+Ahang+Bezar+Beraghsim","year":"1393"},{"id":"4171","type":"video","artist":"Ali Magic Mg","poster":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/[Gallery]\/c71a90c873c608351f3ccae3f1f41b29-3.jpg","time":"3:50","videoname":"Chahar Ta Refigh","lowq":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/c71a90c873c608351f3ccae3f1f41b29-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/c71a90c873c608351f3ccae3f1f41b29-h.mp4","popularity":"2.3","view":"2091","url":"http:\/\/www.wikiseda.com\/Ali+Magic+Mg\/+video\/Chahar+Ta+Refigh","year":"1393"},{"id":"4168","type":"video","artist":"Amir Molaei","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/[Gallery]\/4f9f4f75f4409ad2c4c5b1188267fe08-3.jpg","time":"0:57","videoname":"Varooneh Teaser Album","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/4f9f4f75f4409ad2c4c5b1188267fe08-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/4f9f4f75f4409ad2c4c5b1188267fe08-h.mp4","popularity":"1","view":"780","url":"http:\/\/www.wikiseda.com\/Amir+Molaei\/+video\/Varooneh+Teaser+Album","year":"1393"}]';
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
        json = '[{"id":"4177","type":"video","artist":"Shahkar Binesh Pajoh","poster":"http:\/\/85.25.243.154\/video\/S\/Shahkar Binesh Pajoh\/1393\/06\/\/[Gallery]\/db8f9cfa210d0c546dc5e0302688ba70-3.jpg","time":"4:22","videoname":"Tahdid","lowq":"http:\/\/85.25.243.154\/video\/S\/Shahkar Binesh Pajoh\/1393\/06\/\/db8f9cfa210d0c546dc5e0302688ba70-l.mp4","highq":"http:\/\/85.25.243.154\/video\/S\/Shahkar Binesh Pajoh\/1393\/06\/\/db8f9cfa210d0c546dc5e0302688ba70-h.mp4","popularity":"0","view":"499","url":"http:\/\/www.wikiseda.com\/Shahkar+Binesh+Pajoh\/+video\/Tahdid","year":"1393"},{"id":"4176","type":"video","artist":"Bakhtak Band","poster":"http:\/\/85.25.243.154\/video\/B\/Bakhtak Band\/1393\/06\/\/[Gallery]\/034cc7a14a173c1a29f3b8b0a0284425-3.jpg","time":"3:27","videoname":"Dame sobh","lowq":"http:\/\/85.25.243.154\/video\/B\/Bakhtak Band\/1393\/06\/\/034cc7a14a173c1a29f3b8b0a0284425-l.mp4","highq":"http:\/\/85.25.243.154\/video\/B\/Bakhtak Band\/1393\/06\/\/034cc7a14a173c1a29f3b8b0a0284425-h.mp4","popularity":"5","view":"466","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/+video\/Dame+sobh","year":"1393"},{"id":"4172","type":"video","artist":"Ashkin0098","poster":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/[Gallery]\/e1e1206c13c0d6141e658c5c18243d9e-3.jpg","time":"3:3","videoname":"Ye Ahang Bezar Beraghsim","lowq":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/e1e1206c13c0d6141e658c5c18243d9e-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ashkin0098\/1393\/06\/\/e1e1206c13c0d6141e658c5c18243d9e-h.mp4","popularity":"3.5","view":"2842","url":"http:\/\/www.wikiseda.com\/Ashkin0098\/+video\/Ye+Ahang+Bezar+Beraghsim","year":"1393"},{"id":"4171","type":"video","artist":"Ali Magic Mg","poster":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/[Gallery]\/c71a90c873c608351f3ccae3f1f41b29-3.jpg","time":"3:50","videoname":"Chahar Ta Refigh","lowq":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/c71a90c873c608351f3ccae3f1f41b29-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Ali Magic Mg\/1393\/06\/\/c71a90c873c608351f3ccae3f1f41b29-h.mp4","popularity":"2.3","view":"2091","url":"http:\/\/www.wikiseda.com\/Ali+Magic+Mg\/+video\/Chahar+Ta+Refigh","year":"1393"},{"id":"4168","type":"video","artist":"Amir Molaei","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/[Gallery]\/4f9f4f75f4409ad2c4c5b1188267fe08-3.jpg","time":"0:57","videoname":"Varooneh Teaser Album","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/4f9f4f75f4409ad2c4c5b1188267fe08-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Molaei\/1393\/06\/\/4f9f4f75f4409ad2c4c5b1188267fe08-h.mp4","popularity":"1","view":"780","url":"http:\/\/www.wikiseda.com\/Amir+Molaei\/+video\/Varooneh+Teaser+Album","year":"1393"}]';
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
