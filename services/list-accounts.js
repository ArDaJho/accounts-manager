const showMessage = require('../configs/show-messages').showMessage;
const utils = require('../utils/utils');



const listAccounts = () => {
  const data = utils.getData();

  showMessage(`Available Accounts: ${data.accounts.length}`, 'title');
  showMessage(`N°  Name`, 'title');
  data.accounts.forEach((account, i) => {
    showMessage(`${i+1}. ${account.name} `, 'info')
  });
};



module.exports = {
  listAccounts
}