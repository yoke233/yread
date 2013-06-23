var articleDao = yRead.dao.articleDao;
var bookDao = yRead.dao.bookDao;

function getDirectory(req, res, dm) {
    var _book_id = parseInt(req.path[2]);
    //book_id = bookDao.convertID(book_id);
    var _book;
    bookDao.getBookTitle(_book_id,dm.intercept(function (book) {
        _book = book;
    }));
    articleDao.getDirectory(_book_id, dm.intercept(function (articlesList) {
        if(articlesList){
            var len = articlesList.length/4;
            var _returnArr = [];
            for(var i=0;i<len;i++){
                _returnArr.push(articlesList.slice(i*4,i*4+4));
            }
            res.sendjson({
                book:_book,
                array:_returnArr
            });
        }else{
            res.sendjson({
                err:'no directory'
            });
        }
    }))
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