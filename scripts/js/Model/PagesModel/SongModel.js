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
          json = '[{"id":"144369","type":"song","artist":"Rezaya","artist_id":"127","songname":"Khosh Be Halet","popularity":"5","ratecount":"1","view":"34","time":"2:53","date":"1393-06-28","poster":"http:\/\/85.25.243.154\/img\/0wt9nbijq-1411134619.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/R\/Rezaya\/Gallery\/[Medium]\/v60gzysf-1411134619.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Rezaya\/-\/Khosh+Be+Halet","mp3":"http:\/\/85.25.95.231\/music\/R\/Rezaya\/[one]\/Khosh Be Halet [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/Rezaya\/[one]\/Khosh Be Halet [WikiSeda].mp3"},{"id":"144352","type":"song","artist":"Amir Tataloo","artist_id":"66","songname":"Ma Beham Bimar Boodim","popularity":"4","ratecount":"47","view":"8165","time":"3:21","date":"1393-06-28","poster":"http:\/\/85.25.243.154\/img\/cefepfmoh-1411081754.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amir Tataloo\/Gallery\/[Medium]\/tl1egqcl-1411081754.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/-\/Ma+Beham+Bimar+Boodim","mp3":"http:\/\/85.25.95.231\/music\/A\/Amir Tataloo\/[one]\/Ma Beham Bimar Boodim [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amir Tataloo\/[one]\/Ma Beham Bimar Boodim [WikiSeda].mp3"},{"id":"144123","type":"song","artist":"Babak Jahan Bakhsh","artist_id":"255","songname":"Eshtebah","popularity":"4.7","ratecount":"29","view":"11236","time":"4:13","date":"1393-06-27","year":"1393","album":"Madare Bigharari","album_id":"10018","poster":"http:\/\/85.25.243.154\/img\/cxkcwoty3o-1410675451.jpg","url":"http:\/\/www.wikiseda.com\/Babak+Jahan+Bakhsh\/Madare+Bigharari\/Eshtebah","mp3":"http:\/\/85.25.95.231\/music\/B\/Babak Jahan Bakhsh\/Madare Bigharari\/Eshtebah [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Babak Jahan Bakhsh\/Madare Bigharari\/Eshtebah [WikiSeda].mp3"},{"id":"144235","type":"song","artist":"Ali Pahlavan","artist_id":"6365","songname":"Khaterehaye Sooto Koor","popularity":"4","ratecount":"18","view":"4616","time":"3:37","date":"1393-06-25","poster":"http:\/\/85.25.243.154\/img\/h63ckggoj9-1410862727.jpg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Ali Pahlavan\/Gallery\/[Medium]\/xhxwi98x-1410862727.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Ali+Pahlavan\/-\/Khaterehaye+Sooto+Koor","mp3":"http:\/\/85.25.95.231\/music\/A\/Ali Pahlavan\/[one]\/Khaterehaye Sooto Koor [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Ali Pahlavan\/[one]\/Khaterehaye Sooto Koor [WikiSeda].mp3"},{"id":"144203","type":"song","artist":"Saeid Kermani","artist_id":"161","songname":"Daram Miam","popularity":"3.2","ratecount":"28","view":"12104","time":"3:28","date":"1393-06-24","poster":"http:\/\/85.25.243.154\/img\/9jr7kya58m-1410860736.jpg","poster_big":"http:\/\/85.25.95.231\/music\/S\/Saeid Kermani\/Gallery\/[Medium]\/4tpmvw3h-1410860736.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Saeid+Kermani\/-\/Daram+Miam","mp3":"http:\/\/85.25.95.231\/music\/S\/Saeid Kermani\/[one]\/Daram Miam [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/S\/Saeid Kermani\/[one]\/Daram Miam [WikiSeda].mp3"},{"id":"144201","type":"song","artist":"Omid Jahan","artist_id":"172","songname":"Vase Didane To","popularity":"2.9","ratecount":"37","view":"13084","time":"2:17","date":"1393-06-24","poster":"http:\/\/85.25.243.154\/img\/fk0xxx7a9-1410791899.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/O\/Omid Jahan\/Gallery\/[Medium]\/8rxtjull-1410791899.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Omid+Jahan\/-\/Vase+Didane+To","mp3":"http:\/\/85.25.95.231\/music\/O\/Omid Jahan\/[one]\/Vase Didane To [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/O\/Omid Jahan\/[one]\/Vase Didane To [WikiSeda].mp3"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    } else if (this.option === 1) {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"144369","type":"song","artist":"Rezaya","artist_id":"127","songname":"Khosh Be Halet","popularity":"5","ratecount":"1","view":"40","time":"2:53","date":"1393-06-28","poster":"http:\/\/85.25.243.154\/img\/0wt9nbijq-1411134619.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/R\/Rezaya\/Gallery\/[Medium]\/v60gzysf-1411134619.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Rezaya\/-\/Khosh+Be+Halet","mp3":"http:\/\/85.25.95.231\/music\/R\/Rezaya\/[one]\/Khosh Be Halet [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/Rezaya\/[one]\/Khosh Be Halet [WikiSeda].mp3"},{"id":"144363","type":"song","artist":"Fashid Sheykh","artist_id":"500","songname":"Marsh Dezfuli","popularity":"0","ratecount":"0","view":"201","time":"6:8","date":"1393-06-28","poster":"http:\/\/85.25.243.154\/img\/zcodqlauo-1411094533.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/F\/Fashid Sheykh\/Gallery\/[Medium]\/c41uotp9-1411094533.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Fashid+Sheykh\/-\/Marsh+Dezfuli","mp3":"http:\/\/85.25.95.231\/music\/F\/Fashid Sheykh\/[one]\/Marsh Dezfuli [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/F\/Fashid Sheykh\/[one]\/Marsh Dezfuli [WikiSeda].mp3"},{"id":"144362","type":"song","artist":"Fashid Sheykh","artist_id":"500","songname":"Mahali","popularity":"0","ratecount":"0","view":"202","time":"3:41","date":"1393-06-28","poster":"http:\/\/85.25.243.154\/img\/uin5gsw0p-1411093849.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/F\/Fashid Sheykh\/Gallery\/[Medium]\/wn2bji8x-1411093849.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Fashid+Sheykh\/-\/Mahali","mp3":"http:\/\/85.25.95.231\/music\/F\/Fashid Sheykh\/[one]\/Mahali [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/F\/Fashid Sheykh\/[one]\/Mahali [WikiSeda].mp3"},{"id":"144361","type":"song","artist":"Fashid Sheykh","artist_id":"500","songname":"Zendegi","popularity":"0","ratecount":"0","view":"145","time":"7:25","date":"1393-06-28","poster":"http:\/\/85.25.243.154\/img\/c0895uois-1411093029.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/F\/Fashid Sheykh\/Gallery\/[Medium]\/82w1uc00-1411093029.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Fashid+Sheykh\/-\/Zendegi","mp3":"http:\/\/85.25.95.231\/music\/F\/Fashid Sheykh\/[one]\/Zendegi [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/F\/Fashid Sheykh\/[one]\/Zendegi [WikiSeda].mp3"},{"id":"144360","type":"song","artist":"Fashid Sheykh","artist_id":"500","songname":"Zende Bad Eshgh","popularity":"0","ratecount":"0","view":"168","time":"5:53","date":"1393-06-28","poster":"http:\/\/85.25.243.154\/img\/nkb9d2vo1-1411091925.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/F\/Fashid Sheykh\/Gallery\/[Medium]\/2in7oiog-1411091925.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Fashid+Sheykh\/-\/Zende+Bad+Eshgh","mp3":"http:\/\/85.25.95.231\/music\/F\/Fashid Sheykh\/[one]\/Zende Bad Eshgh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/F\/Fashid Sheykh\/[one]\/Zende Bad Eshgh [WikiSeda].mp3"},{"id":"144359","type":"song","artist":"Fashid Sheykh","artist_id":"500","songname":"Havar Havar","popularity":"5","ratecount":"1","view":"170","time":"5:46","date":"1393-06-28","poster":"http:\/\/85.25.243.154\/img\/xeynr2zzm-1411091267.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/F\/Fashid Sheykh\/Gallery\/[Medium]\/mk8ezu2x-1411091267.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Fashid+Sheykh\/-\/Havar+Havar","mp3":"http:\/\/85.25.95.231\/music\/F\/Fashid Sheykh\/[one]\/Havar Havar [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/F\/Fashid Sheykh\/[one]\/Havar Havar [WikiSeda].mp3"}]';
          _this._emit('load', JSON.parse(json));
          return _this.loading = false;
        };
      })(this), 200);
    } else if (this.option === 2) {
      setTimeout((function(_this) {
        return function() {
          var json;
          json = '[{"id":"143595","type":"song","artist":"Morteza pashaei","artist_id":"122","songname":"Ghalbam Ru Tekrare","popularity":"4.6","ratecount":"188","view":"87305","time":"3:19","date":"1393-06-09","poster":"http:\/\/85.25.243.154\/img\/h3du9oywj1-1409592421.jpg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Morteza pashaei\/Gallery\/[Medium]\/5x0ycu1c-1409592421.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Morteza+pashaei\/-\/Ghalbam+Ru+Tekrare","mp3":"http:\/\/85.25.95.231\/music\/M\/Morteza pashaei\/[one]\/Ghalbam Ru Tekrare [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Morteza pashaei\/[one]\/Ghalbam Ru Tekrare [WikiSeda].mp3"},{"id":"144059","type":"song","artist":"Morteza pashaei","artist_id":"122","songname":"ROOZHAYE SAKHT","popularity":"4.3","ratecount":"182","view":"78248","time":"3:27","date":"1393-06-23","poster":"http:\/\/85.25.243.154\/img\/n2hcfnemx3-1410672836.jpg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Morteza pashaei\/Gallery\/[Medium]\/1wjwi7y1-1410672836.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Morteza+pashaei\/-\/ROOZHAYE+SAKHT","mp3":"http:\/\/85.25.95.231\/music\/M\/Morteza pashaei\/[one]\/Roozhaye Sakht [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Morteza pashaei\/[one]\/Roozhaye Sakht [WikiSeda].mp3"},{"id":"143959","type":"song","artist":"Babak Jahan Bakhsh","artist_id":"255","songname":"Madare Bi Gharari","popularity":"4.4","ratecount":"146","view":"39932","time":"3:44","date":"1393-06-17","poster":"http:\/\/85.25.243.154\/img\/70m2uuguxz-1410197041.jpg","poster_big":"http:\/\/85.25.95.231\/music\/B\/Babak Jahan Bakhsh\/Gallery\/[Medium]\/8sqvznnu-1410197041.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Babak+Jahan+Bakhsh\/-\/Madare+Bi+Gharari","mp3":"http:\/\/85.25.95.231\/music\/B\/Babak Jahan Bakhsh\/[one]\/Madare Bi Gharari [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/B\/Babak Jahan Bakhsh\/[one]\/Madare Bi Gharari [WikiSeda].mp3"},{"id":"143386","type":"song","artist":"Amir Tataloo","artist_id":"66","songname":"Karikatoor","popularity":"3.5","ratecount":"156","view":"49240","time":"3:38","date":"1393-05-31","poster":"http:\/\/85.25.243.154\/img\/z18ibgy1f-1408722890.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/A\/Amir Tataloo\/Gallery\/[Medium]\/cv9z38jr-1408722890.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Amir+Tataloo\/-\/Karikatoor","mp3":"http:\/\/85.25.95.231\/music\/A\/Amir Tataloo\/[one]\/Karikatoor [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/A\/Amir Tataloo\/[one]\/Karikatoor [WikiSeda].mp3"},{"id":"143593","type":"song","artist":"Mohsen Chavoshi","artist_id":"55","songname":"Mige Doosam Nadareh","popularity":"4.1","ratecount":"111","view":"44577","time":"3:13","date":"1393-06-09","poster":"http:\/\/85.25.243.154\/img\/urxbws2gm-1409464030.jpeg","poster_big":"http:\/\/85.25.95.231\/music\/M\/Mohsen Chavoshi\/Gallery\/[Medium]\/j1pcd9k0-1409464030.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/Mohsen+Chavoshi\/-\/Mige+Doosam+Nadareh","mp3":"http:\/\/85.25.95.231\/music\/M\/Mohsen Chavoshi\/[one]\/Mige Doosam Nadareh [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/M\/Mohsen Chavoshi\/[one]\/Mige Doosam Nadareh [WikiSeda].mp3"},{"id":"143598","type":"song","artist":"reza sadeghi","artist_id":"48","songname":"Faal","popularity":"4.7","ratecount":"90","view":"33012","time":"3:50","date":"1393-06-09","poster":"http:\/\/85.25.243.154\/img\/9wrio8udwy-1410673774.jpg","poster_big":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/Gallery\/[Medium]\/ajn773qj-1410673774.jpg","year":"1393","url":"http:\/\/www.wikiseda.com\/reza+sadeghi\/-\/Faal","mp3":"http:\/\/85.25.95.231\/music\/R\/reza sadeghi\/[one]\/Faal [WikiSeda].mp3","mp3_low":"http:\/\/85.25.95.231\/music48\/R\/reza sadeghi\/[one]\/Faal [WikiSeda].mp3"}]';
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
