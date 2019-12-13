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
    const oldPassword = readlineSync.question('There is a old password, to change it please enter the old password: ');
    const decryptedPasword = utils.decrypt(login.password);
    
    if (decryptedPasword != oldPassword){
      showMessage(`Incorrect Password, please try again.`, 'error');      
      return;
    }
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

  fs.writeFile(pathTest, JSON.stringify(data), (error) => {
    if (error) throw new Error('Error. Login not created');
    showMessage(`Login set successfully`, 'success');
  });
}
module.exports = {
  setPassword
}