const showMessage = require('../utils/show-messages').showMessage;
const utils = require('../utils/utils');
const fs = require('fs');
const readlineSync = require('readline-sync');
const pathTest = "../__amdata/data.json";
const Cryptr = require('cryptr');
const secretKeyCrypt = '';

const setPassword = (password, expiredTime) => {
  expiredTime = expiredTime ? expiredTime : 30;
  const data = utils.getData();
  let login = data.login;

  if (!login.password) {
    //create new    
    saveLogin(password, expiredTime);
  } else {
    //enter your old password
    showMessage('There is a old password, to change it you have to authenticate.', 'info');
    if(!utils.verifyPasswordUser()) return;

    saveLogin(password, expiredTime);
  }

}

function saveLogin(password, expiredTime) {
  let data = utils.getData();
  let login = data.login;
  let currentDate = new Date(Date.now()).getTime();

  const cryptedPassword = utils.encrypt(password);

  login.password = cryptedPassword;
  login.expiredTime = expiredTime;
  login.createdAt = currentDate;
  data.login = login;
  let metaD =  utils.getAmMetaData();
  fs.writeFile(metaD.DATA_PATH, JSON.stringify(data), (error) => {
    if (error) throw new Error('Error. Login not created');
    showMessage(`Login set successfully`, 'success');
  });
}



const checkValidPassword = () => {
  const data = utils.getData();
  const login = data.login;

  if (!login || !login.password) {    
    return false;
  }
  const createdAt = login.createdAt;
  const currentDate = new Date(Date.now()).getTime();
  const expiredTime = login.expiredTime;
  
  const diferenceInDays = ((currentDate - createdAt) / (60*60*24*1000));

  if (diferenceInDays > expiredTime) {
    showMessage(`Password has expired. Please try "login -p=pass123 -t=30"`);
    return false;
  }
   return true;
};


module.exports = {
  setPassword,
  checkValidPassword
}