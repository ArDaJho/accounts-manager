const showMessage = require('../utils/show-messages').showMessage;
const utils = require('../utils/utils');
const readlineSync = require('readline-sync');
const fs = require('fs');



const removeAccount = (accountName) => {
  if(!utils.verifyPasswordUser()) return;

  const data = utils.getData();
  let metaData = utils.getAmMetaData();

  if (utils.existsAccount(accountName)) {
    const userAnwser = readlineSync.question( `Are you sure that you want to remove the account ${accountName}?(y/n): `);
    if ( userAnwser.toLowerCase() == 'y') {

      if(!utils.verifyPasswordUser()) return;

      const indexAccount = utils.getIndexObjectByAttr(data.accounts, 'name', accountName);
      const account = data.accounts[indexAccount];

      data.accounts.splice(indexAccount, 1);

      showMessage('Removing the account:...', 'error');
      utils.showAccount(account);      

      fs.writeFile(metaData.DATA_PATH, JSON.stringify(data), (error) => {
        if (error) throw new Error('Error. Account not created');
        showMessage('Account removed successfully', 'success');
      });
    } else {
      showMessage('Operation canceled.', 'warn');
    }
  } else {
    showMessage('The account not exists. Please use "am list" to see your available accounts.', 'error');
  }
};


module.exports = {
  removeAccount
}