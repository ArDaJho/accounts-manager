const readlineSync = require('readline-sync');
const path = require('path');
const DATA_PATH = path.join(__dirname, '../../__amdata', '/data.json');
const DATA_FOLDER_PATH = path.join(__dirname, '../../__amdata');
const DATA_PATH_PROD = path.join(__dirname, '../data-prod', '/data.json');


function existsAccount(name) {
  const data = getData();
  const accounts = data.accounts;

  if(!accounts) return false;

  if (accounts.filter(ac => ac.name == name)[0]) {
    return true;
  }
  return false;
}

function getData() {
  try {
    return require(DATA_PATH);
  } catch (error) {
    throw new Error('Error to read the data base, try again please');
  }
}

function getIndexObjectByAttr(array, attr, value) {
  for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
          return i;
      }
  }
  return -1;
}


function buildNewAccount(name, callback) {
  let newAccount = {};
  let key = '';
  let value = '';
  showMessage(`Account: ${name}`, 'info');
  do {
    key = readlineSync.question( `Please enter a new SECRET KEY: Example "email" (Press x and enter to save the account): `);
    if (key.toLowerCase() != 'x') {
      value = readlineSync.question( `Please enter the VALUE for the SECRET KEY "${key}": Example "test@test.com" (Press x and enter to save the account): `);
      if (value.toLowerCase() != 'x') {
        newAccount.name = name;
        newAccount[key.replace(/ /g, "-")] = value.toString();
        showMessage(`Key "${key}" added to the account "${name} successfully."\n`, 'success');
      } else {
        key = 'x';
      }
    } else {
      value = 'x';
    }
  } while (key.toLowerCase() != 'x' || value.toLowerCase() != 'x');
  callback(newAccount);
}

function verifyPasswordUser() {
  const data = getData();
  const password = readlineSync.question('Please enter your password: ');
  if (data.login.password != password){
    showMessage(`Incorrect Password, please try again.`, 'error');
    return false;
  }
  return true;
} 


module.exports = {
  existsAccount,
  getData,
  getIndexObjectByAttr,
  buildNewAccount,
  verifyPasswordUser,
  DATA_PATH,
  DATA_FOLDER_PATH,
  DATA_PATH_PROD
}
