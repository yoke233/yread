var url1 = 'http://www.qingdi.com/book/8.html';
var url = 'http://www.qingdi.com/files/article/html/0/8/index.html';
var url2 = 'http://www.qingdi.com/files/article/html/0/8/2104.html';
var crawler = require('crawler').Crawler;

var model = require('./lib/model.js');
var tools = require('./lib/tools.js');
var bookDao = require('./testDao.js').bookDao;
var articleDao = require('./testDao.js').articleDao;

//getBook(url1);
//setDirectory();
//getDir();
downloadArt(1);

function downloadArt(book_id) {
    articleDao.getUnDownload(book_id, function (err, arts) {
        if (err) {
            console.error(err)
        } else {
            console.log(arts.length);
            arts.forEach(function(art){
                doDonwload(art.refer,art);
            })
        }
    })
}
function doDonwload(refer, art) {
    new crawler({
        "forceUTF8": true,
        "callback": function (err, result, $) {
            !err || console.log(err);
            art.title = $('#h1').text();
            art.content = $('#content').html();
            art.download = true;
            articleDao.updateArticle(art,function(err,artc){
                !err || console.log('update '+err);
                console.log(artc._id);
            });
        }
    }).queue(refer);
}

function getDir() {
    articleDao.getDirectory(1, function (err, cc) {
        console.log(err);
        console.log(cc);
    })
}

function getBook(url) {
    new crawler({
        "forceUTF8": true,
        "callback": makeBook
    }).queue(url);
}

function makeBook(err, result, $) {
    !err || console.log(err);
    var book = tools.union(model.Book);
    var pic = $('.articleInfoPic');
    book.cover = pic.attr('src');
    book.tagsList.push(pic.attr('title').split(':')[0]);
    book.title = pic.attr('title').split(':')[1];
    book.description = $('.warp').text();
    book.author = $('meta[name=author]').attr("content");
    book.date = new Date();
    var href = result.request.href;
    book.siteid = href.slice(href.lastIndexOf('/'), href.lastIndexOf('.'));

    bookDao.insert(book, function (err, b) {
        !err || console.log(err);
        console.log(b);
    })
    getDirectory(book);
}
function setDirectory(book) {
    new crawler({
        "forceUTF8": true,
        "callback": function (err, result, $) {
            if (err) {
                console.log(err);
            } else {
                var dic = $('.ccss');
                console.log(dic.length);
                dic.each(function (index) {
                    var art = tools.union(model.Article);
                    art.date = new Date();
                    art.title = $(this).children('a').text();
                    if (art.title == '') {
                        return;
                    }
                    art.book_id = 1;
                    art.index = index;
                    art._id = art.book_id + '_' + index;
                    var href = result.request.href;
                    art.refer = href.slice(0, href.lastIndexOf('/') + 1) + $(this).children('a').attr('href');

                    articleDao.insert(art, function (err, arc) {
                        !err || console.error('[ E ] ' + err);
                        console.log('ok');
                    })
                });
            }
        }
    }).queue(url);
}

var c_article = new crawler({
    "maxConnections": 3,
    "forceUTF8": true,
    "callback": function (err, result, $) {
        !err || console.log(err);
        console.log('title: ' + $('#h1').text());
        console.log('content' + $('#content').html());
        console.log('done');
    }
});
//c_article.queue(url2);
process.exit(code=0);