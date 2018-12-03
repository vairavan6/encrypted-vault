//const mongoose = require('mongoose');
const { mongORM } = require('../connection');
const { Schema, model } = mongORM;
const CONSTANTS = require('./collectionConst');

const vaultControlSchema = new Schema({
	user_name: String,
	hash: String,
	salt: String,
	create_date: { type: Date, default: Date.now },
	update_date: { type: Date, default: Date.now }
});


/*
 * Define Models
 **/
//const vaultControlModel = model(CONSTANTS.VAULT_CONTROL, vaultControlSchema);
const vaultControlModel = model('vault_control', vaultControlSchema);

module.exports={
  vaultControlModel
};
