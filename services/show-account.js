const showMessage = require('../utils/show-messages').showMessage;
const utils = require('../utils/utils');



const showAccount = (accountName) => {
  //get password to show the data
  const data = utils.getData();
  if (utils.existsAccount(accountName)){
    const account = data.accounts[utils.getIndexObjectByAttr(data.accounts, 'name', accountName)];
    
    //enter your password
    if(!utils.verifyPasswordUser()) return;

    showMessage(`Account: "${accountName}"`, 'title');

    for (const key in account) {
      if (account.hasOwnProperty(key)) {
        const value = account[key];
        showMessage(`${key}: ${value}`, 'info');        
      }
    }
  } else {
    showMessage('The account not exists. Please use "acc-mg list" to see your available accounts', 'error');
  }
};


module.exports = {
  showAccount
}