var articleDao = yRead.dao.articleDao;
var bookDao = yRead.dao.bookDao;

function getDirectory(req, res, dm) {
    var _book_id = parseInt(req.path[2]);
    //book_id = bookDao.convertID(book_id);
    bookDao.getBookTitle(_book_id, dm.intercept(function (book) {
        if (book) {
            articleDao.getDirectory(_book_id, dm.intercept(function (articlesList) {
                res.sendjson({
                    book: book,
                    array: articlesList
                });
            }));
        } else {
            res.sendjson({
                err: 'no directory'
            });
        }
    }));
}

function getFn(req, res, dm) {
    switch (req.path[2]) {
        default:
            return getDirectory(req, res, dm);
    }
}

module.exports = {
    GET: getFn
};