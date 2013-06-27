var IDString = yRead.lib.model.IDString;

var that = yRead.dao.db.bind('book', {

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

    getBookTitle: function (_id, callback) {
        that.findOne({_id: _id}, {
            fields: {
                title: 1,
                author: 1
            }
        }, callback);
    },
    getBooks: function (callback) {
        that.find({}, {
            fields: {
                title: 1,
                _id: 1
            }
        }).toArray(callback);
    }
});

module.exports = {
    getBookTitle: that.getBookTitle,
  getBooks: that.getBooks
};
