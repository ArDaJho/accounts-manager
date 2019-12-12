const showMessage = require('../utils/show-messages').showMessage;
const utils = require('../utils/utils');
const fs = require('fs');


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

  login.password = password;
  login.expiredTime = expiredTime;
  login.createdAt = currentDate;
  data.login = login;

  fs.writeFile(utils.DATA_PATH, JSON.stringify(data), (error) => {
    if (error) throw new Error('Error. Login not created');
    showMessage(`Login set successfully`, 'success');
  });
}
module.exports = {
  setPassword
}