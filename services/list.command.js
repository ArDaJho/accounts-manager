const showMessage = require('../utils/show-messages').showMessage;
const utils = require('../utils/utils');



const listAccounts = () => {
  const data = utils.getData();

  showMessage(`Available Accounts: ${data.accounts.length}`, 'title');
  showMessage(`N° Account`, 'title');
  data.accounts.forEach((account, i) => {
    const accountName = utils.decrypt(account.name);
    showMessage(`${i+1}. ${accountName} `, 'info')
  });
};



module.exports = {
  listAccounts
}