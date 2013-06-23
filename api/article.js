var articleDao = yRead.dao.articleDao;

function getArticle(req, res, dm) {
    var aid = req.path[2];
    articleDao.getContent(aid, dm.intercept(function (articles) {
        res.sendjson(articles);
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