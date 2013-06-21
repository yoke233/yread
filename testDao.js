var mongoskin=require('mongoskin');

var db = mongoskin.db('localhost/yRead?auto_reconnect=true');

db.bind('test', {
  firstBook: function (fn) {
    this.findOne(fn);
  }
});
db.test.firstBook(function (err, book) {
    console.log(book);
});