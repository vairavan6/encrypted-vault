const mongORM = require('mongoose');

const properties = require('../../server-properties.json');
const { type, host, port, name} = properties.database;

const dBconnection = `${type}${host}${port}/${name}`; 

mongORM.connect(dBconnection,{ useNewUrlParser: true });
mongORM.Promise = global.Promise;

module.exports = {
  mongORM	
};

