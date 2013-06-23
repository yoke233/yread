var mongoIp = yRead.conf.MongodbIp || '127.0.0.1',
    mongoPort = yRead.conf.MongodbPort || 27017,
    mongoDbName = yRead.conf.MongodbDefaultDbName || 'yRead';

module.exports = {
    db: yRead.module.mongoskin.db(mongoIp + ':' + mongoPort + '/?auto_reconnect=true', {
        database: mongoDbName,
        safe:true
    })
}
