#!/usr/bin/env node

const argv = require('./commands/commands').yargs.argv;
const addCommand = require('./services/add.command');
const listCommand = require('./services/list.command');
const showCommand = require('./services/show.command');
const removeCommand = require('./services/remove.command');
const updateCommand = require('./services/update.command');
const loginCommand = require('./services/login.command');
const showMessage = require('./utils/show-messages').showMessage;
const dataCommand = require('./services/data.command');
const utils = require('./utils/utils');




//The can choose the data path
const command =  argv._[0];

/* The Account Data are in ../../__amdata/__am.json */
if (!utils.verifyMetaDataAccess()){
  utils.generateMetaData();
}

/* The Account Data are in ../../__amdata/data.json */
if (!dataCommand.verifyDataAccess()) {  
  dataCommand.buildDataAccess();
}

if (!loginCommand.checkValidPassword() && (command != 'login' && command != 'data')) {
  showMessage(`There is not password. Please use "am login -p=pass123 -t=30" or "am data -p="C:\\Users\\UserA\\Desktop\\MYDATA""`, "warn");
  return;
}

if (command != 'login' && command != 'data') {
  utils.encryptAllData();
}

switch (command) {
  case 'add':
    addCommand.createNewUserAccount(argv.account);
    break;
  case 'list':
    listCommand.listAccounts()
    break;
  case 'show':
    showCommand.showAccount(argv.account);
    break;
  case 'remove':
    removeCommand.removeAccount(argv.account);
    break;
  case 'update':
    updateCommand.updateAccount(argv.account);
    break;
  case 'login':
    //validate if (argv.password) showMessage('Please enter a valid password.')
    loginCommand.setPassword(argv.password, argv.expiredTime);
    break;
  case 'data':    
    dataCommand.setDataPath(argv.path);
    break;
  default:
    showMessage(`Invalid command. Please try "am --help" to see the available options`, 'info');
    break;
}
