module.exports.UIDString = 'abcdefghijklmnopqrstuvwxyz'; // 用户Uid字母表
module.exports.IDString = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 文章、标签、评论、信息等id的字母表

//章节
module.exports.Article = {
    _id: 0,// Number，数据库id，整数，对外显示ID形式为‘Axxx’，其中x为id字母表字符，长度>=3
    date: 0,// Number，创建时间
    refer: '',// String，远程引用文章URL，绝对地址
    title: '', // String，文章标题，小于90字节（30汉字）
    content: '',// String，文章内容，小于1024×50字节（17065汉字）
    download: false, //Boolean 是否已下载
    book_id: 0, // Number，所属书的_id
    index:0 //所属书内索引
};

//书
module.exports.Book = {
    _id: 0,// Number，书的数据库id，整数，对外显示ID形式为‘Cxxx’，其中x为id字母表字符，长度>=3
    date: 0,// Date，创建时间
    updateTime: 0,// Date，最后更新时间
    site: "", //所属网站
    siteid:0, //网站内id
    author: "",// String，本书作者
    title: '',// String，书标题，小于90字节（30汉字）
    description: '',// String，书说明
    cover: '',// String，封面图像URL
    dirpath:'',// String, 目录地址
    articlesNum: 0,// Number，包含的文章数量
    articlesList: [],// Array，包含的文章_id
    tagsList: [], // Array，文章标签的_id列表数组，最多允许5个标签
    visitors: 0,// Number 访问次数
    display: 0,// Number，状态，0:公开;1:粉丝可见;2:作者、管理员、编辑可见;3:回收站，禁止编辑
    status: 0, // Number，是否推荐，0:正常文章;1:推荐文章;2:置顶文章;-1:正常评论，
    hots: 0,// Number，书热度，访问+1，支持/反对±2，评论+3，标记+5，推荐+20（可全局设定ArticleHots=[1, 2, 3, 5, 20]）
    comment: true,// Boolean , 是否运行评论
    comments: 0,// Number，用户发表评论数
    commentsList: [] // Array，评论的_id列表数组
};

module.exports.GlobalConfig = {
    _id: 'GlobalConfig', // 常量，勿修改
    domain: 'yRead.org',//网站访问域名
    title: 'yRead',//网站名称
    url: 'http://www.jsgen.org',
    logo: '/static/img/logo.png',
    email: '',
    //网站副标题
    description: 'You can generate a beautiful website or blog with javascript!',
    //Meta标题
    metatitle: 'yRead',
    //Meta描述
    metadesc: 'You can generate a beautiful website or blog with javascript!',
    keywords: 'yRead,Node.js,MongoDB',
    robots: 'Baiduspider|Googlebot|BingBot|Slurp!|MSNBot|YoudaoBot|JikeSpider|Sosospider|360Spider|Sogou web spider|Sogou inst spider',
    visitors: 0,//总访问次数
    books: 0,//总书数量
    ContentMinLen: 1024,//文章最短字节数
    ContentMaxLen: 51200,//文章最长字节数
    // 当commentsList达到3时，自动提升为0:正常文章，达到10时，自动提升为1:推荐文章（可全局设定ArticleStatus=[3, 10]）
    ArticleStatus:[3, 10],
    ArticleHots: [1, 2, 3, 5, 20],// 文章热度系数，表示访问+1，支持/反对±2，评论+3，标记+5，推荐文章+20
    userCache: 100,
    articleCache: 200,
    BookCache: 500,
    paginationCache: [60 * 20, 1000],
    smtp: {
        host: 'smtp.qq.com',
        // hostname "smtp.gmail.com"
        secureConnection: true,
        // use SSL
        port: 465,
        // port for secure SMTP
        auth: {
            user: 'admin@jsgen.org',
            pass: '123456'
        },
        senderName: 'jsGen',
        senderEmail: 'admin@jsgen.org'
    },
    info: {}
};
