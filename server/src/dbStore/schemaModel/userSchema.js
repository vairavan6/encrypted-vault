const { mongORM } = require('../connection');
const { Schema, model } = mongORM;

const CONSTANTS = require('./collectionConst');

const userControlSchema = new Schema({
	mail_id: String,
	user_name: String,
	hash: String,
	create_date: Date,
	update_date: Date
});

const userSaltSchema = new Schema({
	mail_id: String,
	salt: String,
	iterations: Number,
});


/*
 * Define Models
 **/
const userControlModel = model(CONSTANTS.USER_CONTROL, userControlSchema);
const userSaltModel = model(CONSTANTS.USER_SALT, userControlSchema);

module.exports={
  userControlModel,
  userSaltModel
};
