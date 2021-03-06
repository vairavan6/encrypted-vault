const express = require('express');
const server = express();
const bodyParser = require('body-parser');

const CONST = require('./src/constant.js');

const userControlRouter = require(CONST.USER_CONTROL_ROUTER);
const vaultProtectorRouter = require(CONST.VAULT_PROTECTOR_ROUTER);

/*app-server will run on this port*/
server.listen(2020);

/*app-server start confirmation*/
server.get('/', (req,res) => res.send('Server Started'));

/*Configure static files*/
server.use(express.static('static'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

/*
 *Express Routing with middleware
 *Require module-router file
 *configure it with suitable prefix
 */
server.use('/user', userControlRouter);
server.use('/vault', vaultProtectorRouter);
