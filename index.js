#!/usr/bin/env node

const argv = require('./commands/commands').yargs.argv;
const createNewUserAccount = require('./services/create-account').createNewUserAccount;
const listAccounts = require('./services/list-accounts').listAccounts;
const showAccount = require('./services/show-account').showAccount;
const removeAccount = require('./services/remove-account').removeAccount;
const updateAccount = require('./services/update-account').updateAccount;
const setPassword = require('./services/login').setPassword;
const showMessage = require('./utils/show-messages').showMessage;
const checkValidPassword = require('./services/check-valid-password').checkValidPassword;
const dataAccess = require('./services/verify-data-access');
const utils = require('./utils/utils');

const command =  argv._[0];
/* The Account Data are in ../../__amdata */
if (!dataAccess.verifyDataAccess()) {
  dataAccess.buildDataAccess();
}

if (!checkValidPassword() && command != 'login') {
  return;
}

utils.encryptAllData();

switch (command) {
  case 'add':
    createNewUserAccount(argv.account)
    break;
  case 'list':
    listAccounts()
    break;
  case 'show':
    showAccount(argv.account);
    break;
  case 'remove':
    removeAccount(argv.account);
    break;
  case 'update':
    updateAccount(argv.account);
    break;
  case 'login':    
    setPassword(argv.password, argv.expiredTime);
    break;
  default:
    showMessage(`Invalid command. Please try "am --help" to see the available options`, 'info');
    break;
}
