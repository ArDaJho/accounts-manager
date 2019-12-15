const showMessage = require('../utils/show-messages').showMessage;
const utils = require('../utils/utils');

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
  checkValidPassword
}