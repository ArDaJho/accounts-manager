const readlineSync = require('readline-sync');
const path = require('path');
const DATA_PATH = `"${path.join(__dirname, '../../__amdata', '/data.json')}"`;
const DATA_FOLDER_PATH = `"${path.join(__dirname, '../../__amdata')}"`;
const DATA_PATH_PROD = `"${path.join(__dirname, '../data-prod', '/data.json')}"`;
const secretKeyCrypt = 'lion';
const Cryptr = require('cryptr');
const cryptr = new Cryptr(secretKeyCrypt);


function existsAccount(name) {
  const data = getData();
  const accounts = data.accounts;

  if(!accounts) return false;

  const accAux =  accounts.filter(ac => {  
    return decrypt(ac.name) == name;
  });

  if (accAux[0]) {
    return true;
  }
  return false;
}

function getData() {
  try {
    return require("../../__amdata/data.json");
  } catch (error) {
    throw new Error('Error to read the data base, try again please');
  }
}

function getIndexObjectByAttr(array, attr, value) {
  for(var i = 0; i < array.length; i += 1) {
      if(decrypt(array[i][attr]) === value) {
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
        nameEncript = encrypt(name);
        newAccount.name = nameEncript;
        value = encrypt(value);
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
  const decryptedPasword = decrypt(data.login.password);
  
  if (decryptedPasword != password){
    showMessage(`Incorrect Password, please try again. ${decryptedPasword} == ${password}`, 'error');
    return false;
  }
  return true;
} 

function encrypt(text) {
  return cryptr.encrypt(text);
}

function decrypt(text) {
  return cryptr.decrypt(text);
}

function encryptAllData() {

  fs.writeFile(pathTest, JSON.stringify(data), (error) => {
    if (error) throw new Error('Error');
    console.log(data);
  });
  
}


module.exports = {
  existsAccount,
  getData,
  getIndexObjectByAttr,
  buildNewAccount,
  verifyPasswordUser,
  encrypt,
  decrypt,
  cryptr,
  DATA_PATH,
  DATA_FOLDER_PATH,
  DATA_PATH_PROD,
  secretKeyCrypt,
}
