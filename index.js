#!/usr/bin/env node

const argv = require('./commands/commands').yargs.argv;
const createNewUserAccount = require('./services/create-account').createNewUserAccount;
const listAccounts = require('./services/list-accounts').listAccounts;
const showAccount = require('./services/show-account').showAccount;
const removeAccount = require('./services/remove-account').removeAccount;
const updateAccount = require('./services/update-account').updateAccount;

const command =  argv._[0];

switch (command) {
  case 'add':
    createNewUserAccount(argv.name)
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
  default:
    break;
}
