var articleDao = yRead.dao.articleDao;

function getArticle(req, res, dm) {
    var book_id = req.path[2];
    articleDao.getArticles(book_id, dm.intercept(function (articlesList) {
        res.sendjson(articlesList);
    }))
}

function getFn(req, res, dm) {
    switch (req.path[2]) {
        default:
            return getArticle(req, res, dm);
    }
}

module.exports = {
    GET: getFn
};