var mongoskin = require('mongoskin');

var db = mongoskin.db('localhost/yRead?auto_reconnect=true', {safe: false});
var IDString = require('./lib/model.js').IDString;

var bookDao = db.bind('book', {

    convertID: function (id) {
        switch (typeof id) {
            case 'string':
                id = id.substring(1);
                id = yRead.lib.converter(id, 62, IDString);
                return id;
            case 'number':
                id = yRead.lib.converter(id, 62, IDString);
                while (id.length < 3) {
                    id = '0' + id;
                }
                id = 'B' + id;
                return id;
            default:
                return null;
        }
    },

    getLatestId: function (callback) {
        bookDao.findOne({}, {
            sort: {
                _id: -1
            },
            hint: {
                _id: 1
            },
            fields: {
                _id: 1
            }
        }, callback);
    },

    addNewBook: function (bookObj, callback) {
        bookDao.getLatestId(function (err, doc) {
            if (err) {
                callback(err, null);
                return;
            }
            if (!doc) {
                bookObj._id = 1;
            } else {
                bookObj._id = doc._id + 1;
            }

            bookDao.findAndModify({
                _id: bookObj._id
            }, [], bookObj, {
                w: 1,
                upsert: true,
                new: true
            }, callback);
        });
    },

    addNewArticlesToBook: function (bookid, art_ids, callback) {
        var setObj = {
            $set: {updateTime: new Date()},
            $inc: {articlesNum: art_ids.length()},
            $addToSet: {articlesList: art_ids}
        };
        if (callback) {
            bookDao.findAndModify({
                _id: bookid
            }, [], setObj, {
                w: 1,
                new: true
            }, callback);
        } else {
            bookDao.update({
                _id: bookid
            }, setObj);
        }
    }
});

var articleDao = db.bind('article', {
    getDirectory: function (book_id, callback) {
        articleDao.find({
            book_id: book_id
        }, {
            sort: {
                index: 1
            },
            fields: {
                title: 1,
                _id: 1
            }
        }).toArray(callback);
    },
    getUnDownload: function (book_id, callback) {
        articleDao.find({
            book_id: book_id,
            download: false
        }, {
            sort: {
                index: 1
            },
            fields: {
                title: 1,
                _id: 1,
                refer: 1
            }
        }).toArray(callback);
    },
    updateArticle: function (artObj, callback) {
        var setObj = {};
        artObj.updateTime = new Date();
        var _id = artObj._id;
        delete artObj._id;
        setObj.$set = artObj;
        if (callback) {
            articleDao.findAndModify({
                _id: _id
            }, [], setObj, {
                w: 1,
                new: true
            }, callback);
        } else {
            articleDao.update({
                _id: _id
            }, setObj);
        }
    }
});

module.exports = {
    bookDao: bookDao,
    articleDao: articleDao
};