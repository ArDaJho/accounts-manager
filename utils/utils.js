const readlineSync = require('readline-sync');
const path = require('path');
const shell = require('shelljs');
const fs = require('fs');

const AM_META_DATA = path.join(__dirname, '../../__amdata', '/__am.json');
const AM_META_DATA_PATH_PROD = path.join(__dirname, '../data-prod', '/__am.json');

const DATA_PATH = path.join(__dirname, '../../__amdata', '/data.json');
const DATA_FOLDER_PATH = path.join(__dirname, '../../__amdata');
const DATA_PATH_PROD = path.join(__dirname, '../data-prod', '/data.json');
const ACCOUNT_PROPERTIES_TO_HIDE = ['accountNumber'];

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
    let metaData = getAmMetaData();
    return require(metaData.DATA_PATH);
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
  const password = readlineSync.question('Please enter your password: ', {hideEchoBack: true/*, mask:'' #with this the console not show anything*/});
  if (data.login.password != password){
    showMessage(`Incorrect Password, please try again.`, 'error');
    return false;
  }
  return true;
}

function showAccount(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (!ACCOUNT_PROPERTIES_TO_HIDE.filter(prop => key == prop)[0]) {
        const value = obj[key];
        showMessage(`${key}: ${value}`, 'info');
      }
    }
  }
}

const verifyMetaDataAccess = () => {
  if (shell.exec(`cat ${AM_META_DATA}`, {silent:true}).code !== 0) return false;
  return true;
}

function generateMetaData() {
  if (shell.exec(`cd ${DATA_FOLDER_PATH}`, {silent:true}).code !== 0) {
    shell.exec(`mkdir ${DATA_FOLDER_PATH}`, {silent:true});  
    shell.exec(`${getValidCommand('cp')} ${AM_META_DATA_PATH_PROD} ${DATA_FOLDER_PATH}`, {silent:true});
    shell.exec(`${getValidCommand('chmod')} ${DATA_FOLDER_PATH}`, {silent:true});
    console.log(1);
    
    writeInAmMetaData('DATA_PATH', DATA_PATH);
    writeInAmMetaData('DATA_FOLDER_PATH', DATA_FOLDER_PATH);
  } else {
    
    if (shell.exec(`${getValidCommand('cat')} ${AM_META_DATA}`, {silent:true}).code !== 0) {      
      shell.exec(`${getValidCommand('cp')} ${AM_META_DATA_PATH_PROD} ${DATA_FOLDER_PATH}`, {silent:true});
      shell.exec(`${getValidCommand('chmod')} ${DATA_FOLDER_PATH}`, {silent:true});
      console.log('2');
      writeInAmMetaData('DATA_PATH', DATA_PATH);
      writeInAmMetaData('DATA_FOLDER_PATH', DATA_FOLDER_PATH);
    }
  }
}

function getAmMetaData() {
  try {
    return require(AM_META_DATA);
  } catch (error) {
    throw new Error('Error to read the data base, try again please');
  }
}

async function writeInAmMetaData(key, value) {
  let data = getAmMetaData();
  data[key] = value;
  await fs.writeFileSync(AM_META_DATA, JSON.stringify(data), (error) => {
    if (error) throw new Error('Error. Meta Data not created');
  });
}

function getValidCommand(command) {
  let opsys = process.platform;
  let cpCommand = 'cp';
  let catCommand = 'cat';
  let chmodCommand = 'chmod 777 -R';
  if (opsys == "darwin") {
      opsys = "MacOS";
  } else if (opsys == "win32" || opsys == "win64") {
      opsys = "Windows";
      catCommand = 'type';
      cpCommand = 'copy';
      chmodCommand = 'cd'; //chmod does not working in Windows
  } else if (opsys == "linux") {
      opsys = "Linux";
  }

  switch (command) {
    case 'cat':
      return catCommand;
    case 'cp':
      return cpCommand;
    case 'chmod':
      return chmodCommand;
    default:
      break;
  }
}

module.exports = {
  existsAccount,
  getData,
  getIndexObjectByAttr,
  buildNewAccount,
  verifyPasswordUser,
  showAccount,
  writeInAmMetaData,
  verifyMetaDataAccess,
  generateMetaData,
  getValidCommand,
  getAmMetaData,
  DATA_PATH,
  DATA_FOLDER_PATH,
  DATA_PATH_PROD
}
