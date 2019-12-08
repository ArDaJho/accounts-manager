const showMessage = require('../configs/show-messages').showMessage;
const utils = require('../utils/utils');



const showAccount = (accountName) => {
  const data = utils.getData();
  if (utils.existsAccount(accountName)){
    const account = data.accounts[utils.getIndexObjectByAttr(data.accounts, 'name', accountName)];
    showMessage(`Account: ${accountName}`, 'title');
    showMessage(account, 'info');
  } else {
    showMessage('The account not exists. Please use "acc-mg list" to see your available accounts', 'error');
  }
};


module.exports = {
  showAccount
}