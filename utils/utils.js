const readlineSync = require('readline-sync');
const path = require('path');
const DATA_PATH = `"${path.join(__dirname, '../../__amdata', '/data.json')}"`;
const DATA_FOLDER_PATH = `"${path.join(__dirname, '../../__amdata')}"`;
const DATA_PATH_PROD = `"${path.join(__dirname, '../data-prod', '/data.json')}"`;
const secretKeyCrypt = 'l!0nH3dg3H0g';
const Cryptr = require('cryptr');
const cryptr = new Cryptr(secretKeyCrypt);
const fs = require('fs');
const pathTest = "../__amdata/data.json";

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
    return require(DATA_PATH);
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

    let data = getData();
    if (data.login.encripted) {
      return;
    }
    res = data.login.password;
    try {
      res = decrypt(data.login.password);
    } catch (error) {
      res = encrypt(data.login.password);
      let oldAccount;
      let object = {'password': res}
      oldAccount = {...data.login, ...object};
      data.login = oldAccount;
      data.login.encripted = true;
      fs.writeFileSync(pathTest, JSON.stringify(data), (error) => {
        if (error) throw new Error('Error. Account not updated');
      });
    }

    let accountsArray = new Array();
    for (const key in data.accounts) {
      let dataJson = new Array();
      if (data.accounts.hasOwnProperty(key)) {
        const element = data.accounts[key];
        let dataString = "{ ";
        for (const key2 in element) {
          if (element.hasOwnProperty(key2)) {
            try {
              res = decrypt(element[key2]);
            } catch (error) {
              res = encrypt(element[key2]);
              let objectStr = `"${key2}" : "${res}", `; 
              dataString += objectStr;
            }
          }
        }
        dataString = dataString.slice(0, -2);
        dataString += " }";
        try {
          dataJson = JSON.parse(dataString);
        } catch (error) { }
      }
      accountsArray.push(dataJson);
    }
    if (accountsArray[0].length == 0) {
      return;
    } else {
      data.accounts = accountsArray;
      data.login.encripted = true;
      fs.writeFileSync(pathTest, JSON.stringify(data), (error) => {
        if (error) throw new Error('Error. Account not updated');
      });
    } 
}


module.exports = {
  existsAccount,
  getData,
  getIndexObjectByAttr,
  buildNewAccount,
  verifyPasswordUser,
  encrypt,
  decrypt,
  encryptAllData,
  cryptr,
  DATA_PATH,
  DATA_FOLDER_PATH,
  DATA_PATH_PROD,
  secretKeyCrypt
}
