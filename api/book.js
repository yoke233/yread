var bookDao = yRead.dao.bookDao;

function getBook(req, res, dm) {
    var book_id = req.path[2];
    if(!book_id){
      bookDao.getBooks(dm.intercept(function (books) {
        res.sendjson(books);
      }));
    }
}

function getFn(req, res, dm) {
    switch (req.path[2]) {
        default:
            return getBook(req, res, dm);
    }
}

module.exports = {
    GET: getFn
};