/*
 convertID(id);
 getArticlesIndex(date, limit, callback);
 getLatestId(callback);
 getArticle(_id, callback);
 setArticle(articleObj, callback);
 setFavor(articleObj);
 setOppose(articleObj);
 setMark(articleObj);
 setComment(articleObj, callback);
 setNewArticle(articleObj, callback);
 delArticle(_idArray, callback);
 */
var union = yRead.lib.tools.union,
    intersect = yRead.lib.tools.intersect,
    IDString = yRead.lib.model.IDString,
    defautArticle = yRead.lib.model.Article;

var that = yRead.dao.db.bind('article', {

    getDirectory: function (book_id, callback) {
        that.find({
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
    getContent: function (art_id, callback) {
        that.findOne({
            _id: art_id
        }, {
            fields: {
                title: 1,
                content: 1
            }
        }, callback);
    }

});

module.exports = {
    getDirectory: that.getDirectory,
    getContent: that.getContent
};
