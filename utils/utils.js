const readlineSync = require('readline-sync');
const DATA_PATH = '../data/data.json';


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
    key = readlineSync.question( `Please enter a new secret key: Example "email" (Press x and enter to save the account): `);
    if (key.toLowerCase() != 'x') {
      value = readlineSync.question( `Please enter the value to "${key}": Example "test@test.com" (Press x and enter to save the account): `);
      if (value.toLowerCase() != 'x') {
        newAccount.name = name;
        newAccount[key.replace(/ /g, "-")] = value.toString();
        showMessage(`Key "${key}" added to the account "${name}"\n`, 'success');
      } else {
        key = 'x';
      }
    } else {
      value = 'x';
    }
  } while (key.toLowerCase() != 'x' || value.toLowerCase() != 'x');
  callback(newAccount);
}


module.exports = {
  existsAccount,
  getData,
  getIndexObjectByAttr,
  buildNewAccount,
  DATA_PATH
}