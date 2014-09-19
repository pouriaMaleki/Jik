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
    this.selectedArtist = false;
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
          json = '[{"id":"206","type":"artist","artist":"Moein","artist_id":"206","fans":"5201","url":"http:\/\/www.wikiseda.com\/Moein","poster":"http:\/\/85.25.243.154\/thumb_image\/Moein.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Moein-thumb.jpg","following":0},{"id":"56","type":"artist","artist":"ebi","artist_id":"56","fans":"6253","url":"http:\/\/www.wikiseda.com\/ebi","poster":"http:\/\/85.25.243.154\/thumb_image\/ebi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/ebi-thumb.jpg","following":0},{"id":"76","type":"artist","artist":"Shadmehr","artist_id":"76","fans":"7819","url":"http:\/\/www.wikiseda.com\/Shadmehr","poster":"http:\/\/85.25.243.154\/thumb_image\/Shadmehr.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Shadmehr-thumb.jpg","following":0},{"id":"54","type":"artist","artist":"darush","artist_id":"54","fans":"6936","url":"http:\/\/www.wikiseda.com\/darush","poster":"http:\/\/85.25.243.154\/thumb_image\/darush.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/darush-thumb.jpg","following":0},{"id":"47","type":"artist","artist":"siavash ghomayshi","artist_id":"47","fans":"6515","url":"http:\/\/www.wikiseda.com\/siavash+ghomayshi","poster":"http:\/\/85.25.243.154\/thumb_image\/siavash ghomayshi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/siavash ghomayshi-thumb.jpg","following":0},{"id":"198","type":"artist","artist":"mohsen yegane","artist_id":"198","fans":"4367","url":"http:\/\/www.wikiseda.com\/mohsen+yegane","poster":"http:\/\/85.25.243.154\/thumb_image\/mohsen yegane.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/mohsen yegane-thumb.jpg","following":0}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    } else {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"66","type":"artist","artist":"Amir Tataloo","artist_id":"66","fans":"2644","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo","poster":"http:\/\/85.25.243.154\/thumb_image\/Amir Tataloo.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Amir Tataloo-thumb.jpg","following":0},{"id":"60","type":"artist","artist":"Ali Abdolmaleki","artist_id":"60","fans":"2241","url":"http:\/\/www.wikiseda.com\/Ali+Abdolmaleki","poster":"http:\/\/85.25.243.154\/thumb_image\/Ali Abdolmaleki.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Ali Abdolmaleki-thumb.jpg","following":0},{"id":"91","type":"artist","artist":"Arash","artist_id":"91","fans":"1804","url":"http:\/\/www.wikiseda.com\/Arash","poster":"http:\/\/85.25.243.154\/thumb_image\/Arash.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Arash-thumb.jpg","following":0},{"id":"69","type":"artist","artist":"Ali Ashabi","artist_id":"69","fans":"1685","url":"http:\/\/www.wikiseda.com\/Ali+Ashabi","poster":"http:\/\/85.25.243.154\/thumb_image\/Ali Ashabi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Ali Ashabi-thumb.jpg","following":0},{"id":"82","type":"artist","artist":"armin 2afm","artist_id":"82","fans":"1478","url":"http:\/\/www.wikiseda.com\/armin+2afm","poster":"http:\/\/85.25.243.154\/thumb_image\/armin 2afm.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/armin 2afm-thumb.jpg","following":0},{"id":"343","type":"artist","artist":"Ali Lohrasbi","artist_id":"343","fans":"1183","url":"http:\/\/www.wikiseda.com\/Ali+Lohrasbi","poster":"http:\/\/85.25.243.154\/thumb_image\/Ali Lohrasbi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Ali Lohrasbi-thumb.jpg","following":0},{"id":"67","type":"artist","artist":"Andy","artist_id":"67","fans":"978","url":"http:\/\/www.wikiseda.com\/Andy","poster":"http:\/\/85.25.243.154\/thumb_image\/Andy.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Andy-thumb.jpg","following":0},{"id":"569","type":"artist","artist":"Alireza Rozegar","artist_id":"569","fans":"959","url":"http:\/\/www.wikiseda.com\/Alireza+Rozegar","poster":"http:\/\/85.25.243.154\/thumb_image\/Alireza Rozegar.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Alireza Rozegar-thumb.jpg","following":0},{"id":"173","type":"artist","artist":"Amin habibi","artist_id":"173","fans":"867","url":"http:\/\/www.wikiseda.com\/Amin+habibi","poster":"http:\/\/85.25.243.154\/thumb_image\/Amin habibi.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Amin habibi-thumb.jpg","following":0},{"id":"1597","type":"artist","artist":"Amin Gholayary","artist_id":"1597","fans":"788","url":"http:\/\/www.wikiseda.com\/Amin+Gholayary","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Amin Gholayary-thumb.jpg","following":0},{"id":"922","type":"artist","artist":"Ahmad Azad","artist_id":"922","fans":"732","url":"http:\/\/www.wikiseda.com\/Ahmad+Azad","poster":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","thumb":"http:\/\/85.25.243.154\/static\/images\/notfound.jpg","following":0}]';
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
        json = '[{"id":"271","type":"artist","artist":"Aref","artist_id":"271","fans":"707","url":"http:\/\/www.wikiseda.com\/Aref","poster":"http:\/\/85.25.243.154\/thumb_image\/Aref.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Aref-thumb.jpg","following":0},{"id":"416","type":"artist","artist":"Ali Takta","artist_id":"416","fans":"701","url":"http:\/\/www.wikiseda.com\/Ali+Takta","poster":"http:\/\/85.25.243.154\/thumb_image\/Ali Takta.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Ali Takta-thumb.jpg","following":0},{"id":"904","type":"artist","artist":"Aria Aramnejad","artist_id":"904","fans":"668","url":"http:\/\/www.wikiseda.com\/Aria+Aramnejad","poster":"http:\/\/85.25.243.154\/thumb_image\/Aria Aramnejad.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/Aria Aramnejad-thumb.jpg","following":0},{"id":"123","type":"artist","artist":"ali sorena","artist_id":"123","fans":"649","url":"http:\/\/www.wikiseda.com\/ali+sorena","poster":"http:\/\/85.25.243.154\/thumb_image\/ali sorena.jpg","thumb":"http:\/\/85.25.243.154\/thumb_image\/ali sorena-thumb.jpg","following":0}]';
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

  ArtistModel.prototype.deselectArtist = function() {
    this.selectedArtist = false;
    return this._emit('deselect-artist', true);
  };

  ArtistModel.prototype.selectArtist = function(artist) {
    var data, json;
    this.selectedArtist = data;
    json = '[{"id":"140863","type":"song","artist":"mostafa yeganeh","artist_id":"116","songname":"Bavar Kardani Nist","popularity":"3.4","ratecount":"15","view":"3393","time":"2:59","date":"1393-04-13","poster":"http:\/\/85.25.243.154\/img\/5oh2a70em-1404491150.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/Gallery\/[Medium]\/bc6dsgnp-1404491150.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/mostafa+yeganeh\/-\/Bavar+Kardani+Nist","mp3":"http:\/\/85.25.95.231\/music\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/mostafa yeganeh\/[one]\/Bavar Kardani Nist [WikiSeda].mp3"},{"id":"140809","type":"song","artist":"Masoud Emami","artist_id":"1905","songname":"Khoda Doosam Dasht","popularity":"3.6","ratecount":"9","view":"4457","time":"3:33","date":"1393-04-12","poster":"http:\/\/85.25.243.154\/img\/utxrohick-1404397432.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/Gallery\/[Medium]\/2u6wzwdn-1404397432.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Masoud+Emami\/-\/Khoda+Doosam+Dasht","mp3":"http:\/\/85.25.95.231\/music\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Masoud Emami\/[one]\/Khoda Doosam Dasht [WikiSeda].mp3"},{"id":"140785","type":"song","artist":"Amin Hayaei","artist_id":"12201","songname":"Owje Parvaz","popularity":"3.8","ratecount":"8","view":"2205","time":"5:22","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/gq9zswptj-1404332339.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/Gallery\/[Medium]\/qixdrptt-1404332339.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amin+Hayaei\/-\/Owje+Parvaz","mp3":"http:\/\/85.25.95.231\/music\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amin Hayaei\/[one]\/Owje Parvaz [WikiSeda].mp3"},{"id":"140782","type":"song","artist":"Bakhtak Band","artist_id":"11623","songname":"Dame Sobh","popularity":"2.6","ratecount":"8","view":"2966","time":"3:27","date":"1393-04-11","poster":"http:\/\/85.25.243.154\/img\/1spygoohm-1404322313.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/Gallery\/[Medium]\/hxb0sre5-1404322313.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Bakhtak+Band\/-\/Dame+Sobh","mp3":"http:\/\/85.25.95.231\/music\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Bakhtak Band\/[one]\/Dame Sobh [WikiSeda].mp3"},{"id":"9826","type":"album","artist":"Mohsen-sharifian","artist_id":"631","album":"Dingue Marrow","trackcount":"9","popularity":"5","date":"1393-04-14","url":"http:\/\/www.wikiseda.com\/Mohsen-sharifian\/Dingue+Marrow","view":"551","poster":"http:\/\/85.25.243.154\/img\/un79cef6qp-1404554657.jpg","year":"1393"},{"id":"9821","type":"album","artist":"O-hum","artist_id":"3927","album":"Hafez In Love","trackcount":"4","popularity":"5","date":"1393-04-08","url":"http:\/\/www.wikiseda.com\/O-hum\/Hafez+In+Love","view":"1756","poster":"http:\/\/85.25.243.154\/img\/1xxwe9fwdz-1404025213.jpg","year":"1393"},{"id":"9809","type":"album","artist":"Alireza Ghorbani","artist_id":"472","album":"Raftamo Bare Safar Bastam","trackcount":"6","popularity":"4.7","date":"1393-04-02","url":"http:\/\/www.wikiseda.com\/Alireza+Ghorbani\/Raftamo+Bare+Safar+Bastam","view":"18170","poster":"http:\/\/85.25.243.154\/img\/pf2m3p18sw-1403542665.jpg","year":"1393"},{"id":"9807","type":"album","artist":"Salar Aghili","artist_id":"97","album":"Vatan","trackcount":"9","popularity":"4.8","date":"1393-03-31","url":"http:\/\/www.wikiseda.com\/Salar+Aghili\/Vatan","view":"10829","poster":"http:\/\/85.25.243.154\/img\/obldv0b5l4-1403360590.jpg","year":"1393"},{"id":"4023","type":"video","artist":"Matin do hanjare","poster":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/[Gallery]\/8c1e2f4f65d428d910ece8e1c83cbc26-3.jpg","time":"3:2","videoname":"Marg Bar Man","lowq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-l.mp4","highq":"http:\/\/85.25.243.154\/video\/M\/Matin do hanjare\/1393\/04\/\/8c1e2f4f65d428d910ece8e1c83cbc26-h.mp4","popularity":"3.8","view":"2292","url":"http:\/\/www.wikiseda.com\/Matin+do+hanjare\/+video\/Marg+Bar+Man","year":"1393"},{"id":"4022","type":"video","artist":"Amir Farjam","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/[Gallery]\/5fddee48dfa042d0664b066720a71bda-3.jpg","time":"3:32","videoname":"KHodaya","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Farjam\/1393\/04\/\/5fddee48dfa042d0664b066720a71bda-h.mp4","popularity":"5","view":"1769","url":"http:\/\/www.wikiseda.com\/Amir+Farjam\/+video\/KHodaya","year":"1393"},{"id":"4021","type":"video","artist":"Emo Band","poster":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/[Gallery]\/6ab639b8fef2f4fe7f9841d6f8d9f70d-3.jpg","time":"4:34","videoname":"Donyamo Live","lowq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-l.mp4","highq":"http:\/\/85.25.243.154\/video\/E\/Emo Band\/1393\/04\/\/6ab639b8fef2f4fe7f9841d6f8d9f70d-h.mp4","popularity":"4.1","view":"1728","url":"http:\/\/www.wikiseda.com\/Emo+Band\/+video\/Donyamo+Live","year":"1393"},{"id":"4019","type":"video","artist":"Amir Tataloo","poster":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/[Gallery]\/d2931b538ae36b30847c9c139610311a-3.jpg","time":"3:29","videoname":"Baa To","lowq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-l.mp4","highq":"http:\/\/85.25.243.154\/video\/A\/Amir Tataloo\/1393\/04\/\/d2931b538ae36b30847c9c139610311a-h.mp4","popularity":"4.2","view":"10730","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/+video\/Baa+To","year":"1393"}]';
    data = {
      items: JSON.parse(json),
      artist: artist
    };
    return this._emit('select-artist', data);
  };

  return ArtistModel;

})(PagesModel);

/*
//@ sourceMappingURL=ArtistModel.map
*/
