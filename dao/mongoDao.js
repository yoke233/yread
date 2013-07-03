var mongoIp = process.env.OPENSHIFT_MONGODB_DB_HOST || yRead.conf.MongodbIp || '127.0.0.1',
    mongoPort = process.env.OPENSHIFT_MONGODB_DB_PORT || yRead.conf.MongodbPort || 27017,
    mongoDbName = yRead.conf.MongodbDefaultDbName || 'yread',
    user = 'admin' || 'yokedb',
    pass = '1Gn7nTI5Cuyz' || 'asd123';

module.exports = {
  db: yRead.module.mongoskin.db(user + ':' + pass + '@' + mongoIp + ':' + mongoPort + '/?auto_reconnect=true', {
        database: mongoDbName,
        safe:true
    })
}
/*
MongoDB 2.2 database added.  Please make note of these credentials:
   Root User:     admin
   Root Password: 1Gn7nTI5Cuyz
   Database Name: yread
Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/
*/