var url1 = 'http://www.qingdi.com/book/';
var qingdiId = process.argv[2];
var crawler = require('crawler').Crawler;

var model = require('./lib/model.js');
var tools = require('./lib/tools.js');
var bookDao = require('./testDao.js').bookDao;
var articleDao = require('./testDao.js').articleDao;

if(qingdiId){
    getBook(url1+qingdiId+'.html');
}else{
    console.log('please input qingdi book id');
    process.exit(0);
}
//setDirectory();
//getDir();
//downloadArt(1);

function downloadArt(book_id) {
    articleDao.getUnDownload(book_id, function (err, arts) {
        if (err) {
            console.error(err)
            process.exit(0);
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
        "callback": function(err, result, $) {
            if (err) {
                console.error(err);
            }
            else {
                art.title = $('#h1').text();
                art.content = $('#content').html();
                art.download = true;
                articleDao.updateArticle(art, function(err, artc) {
                    !err || console.log('update ' + err);
                    console.log(artc._id + ":download ok");
                });
            }
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
    if (err) {
        console.error(err);
    }
    else {
        var book = tools.union(model.Book);
        var pic = $('.articleInfoPic');
        book.cover = pic.attr('src');
        book.title = pic.attr('title').split(':')[1];
        book.tagsList.push(pic.attr('title').split(':')[0]);
        book.description = $('.warp').text();
        book.author = $('meta[name=author]').attr("content");
        book.dirpath = $('.reader').attr("href");
        book.date = new Date();
        var href = result.request.href;
        book.siteid = href.slice(href.lastIndexOf('/'), href.lastIndexOf('.'));

        bookDao.addNewBook(book, function(err, b) {
            if (err) {
                console.error(err);
            }
            else {
                console.log(b.title + ":insert ok");
                book._id = b._id;
                setDirectory(book);
            }
        });
    }
}
function setDirectory(book) {
    new crawler({
        "forceUTF8": true,
        "callback": function (err, result, $) {
            if (err) {
                console.error(err);
            } else {
                var stop = false;
                var dic = $('.ccss');
                console.log(dic.length);
                dic.each(function (index) {
                    var art = tools.union(model.Article);
                    art.title = $(this).children('a').text();
                    if (art.title == '') {
                        return;
                    }
                    art.book_id = book._id;
                    art.date = new Date();
                    art.index = index;
                    art._id = art.book_id + '_' + index;
                    var href = result.request.href;
                    art.refer = href.slice(0, href.lastIndexOf('/') + 1) + $(this).children('a').attr('href');

                    articleDao.insert(art, function (err) {
                        if(err){
                            console.error(err);
                            stop = true;
                        }else{
                            console.log(art.index +':insert ok');
                        }
                    });
                    if(stop == true){
                        return false;
                    }
                });
                downloadArt(book._id);
            }
        }
    }).queue(book.dirpath);
}
