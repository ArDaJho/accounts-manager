const showMessage = require('../utils/show-messages').showMessage;
const utils = require('../utils/utils');
const fs = require('fs');


const updateAccount = (accountName) => {
  const data = utils.getData();
  let metaData = utils.getAmMetaData();

  if (utils.existsAccount(accountName)){
    utils.buildNewAccount(accountName, (newAccount) => {

      if(!newAccount.name) {
        showMessage('The new Account name is required.', 'error');
        return;
      }

      let oldAccountIndex = utils.getIndexObjectByAttr(data.accounts, 'name', accountName);
      let oldAccount = data.accounts[oldAccountIndex];
      oldAccount = {...oldAccount, ...newAccount};
      data.accounts[oldAccountIndex] = oldAccount;

      fs.writeFile(metaData.DATA_PATH, JSON.stringify(data), (error) => {
        if (error) throw new Error('Error. Account not updated');
        showMessage(`Account ${accountName} updated successfully`, 'success');
      });

    });

  } else {
    showMessage('The account not exists. Please use "am list" to see your available accounts.', 'error');
  }
};


module.exports = {
  updateAccount
}