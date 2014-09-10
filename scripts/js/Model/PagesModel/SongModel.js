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
