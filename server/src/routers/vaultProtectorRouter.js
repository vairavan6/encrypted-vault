const express = require('express');
const router = express.Router();
const vaultControlService = require('../service/vaultControlService');

/*log to register the incoming request*/
router.use((req,res,next) => {
	console.debug();
	next();
});


router.post('/store/', async(req,res) => {
  const x =await vaultControlService.encryptAndStorePass(req);
  console.log('------------->',x);
  res.send('Success');
});

router.post('/retrieve/', async(req,res) => {
	const x = await vaultControlService.getDecryptedPass(req);
	console.log('------------->',x);
	res.send('Success');
});


module.exports = router;