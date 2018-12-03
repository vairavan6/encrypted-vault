const crypto = require('crypto');
const randomSaltGen = require('crypto-random-string');
const { cipher } = require('../../server-properties.json');
const { vaultControlModel } = require('../dbStore/schemaModel/vaultSchema');

const encryptAndStorePass = async(req, res) => {
	const { userName, password } = req.body;
	
	const salt = randomSaltGen(8);
	const hashedSalt = await encrypter(cipher.algoSalt, salt, salt);
	const hashedPassword = await encrypter(cipher.algoPass, hashedSalt, password);

	const vaultControl = new vaultControlModel({
		user_name: userName,
		hash: hashedPassword,
		salt
	});
	await vaultControl.save();
	return hashedPassword;
};

const getDecryptedPass = async(req, res) => {
	const { userName } = req.body;
	const userVaultData = await vaultControlModel.findOne({ user_name: userName });
	const { salt, hash } = userVaultData;
	const hashedSalt = await encrypter(cipher.algoSalt, salt, salt);
	const decryptedPassword = await decrypter(cipher.algoPass, hashedSalt, hash);
	return decryptedPassword;
};

async function encrypter(algorithm, secretKey, secureInfo) {
	const cipher = crypto.createCipher(algorithm, secretKey);
	let encrypted = cipher.update(secureInfo,'utf8','hex')
	encrypted += cipher.final('hex');
	return encrypted;
}

async function decrypter(algorithm, secretKey, secureInfo) {
	const decipher  = crypto.createDecipher(algorithm, secretKey);
	let decrypted = decipher.update(secureInfo,'hex','utf8')
	decrypted += decipher.final('utf8');
	return decrypted;
}

module.exports = {
  encryptAndStorePass,
  getDecryptedPass
}