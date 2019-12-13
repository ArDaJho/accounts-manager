const fs = require('fs');
const readlineSync = require('readline-sync');
const showMessage = require('../utils/show-messages').showMessage;
const utils = require('../utils/utils');
const pathTest = "../__amdata/data.json";

const createNewUserAccount = (name) => {
  let data = utils.getData();
  if(!utils.verifyPasswordUser()) return;

  if (utils.existsAccount(name)) {
    showMessage(`Duplicate Account "${name}", please choose an option`, 'warn');
    const userAnswer = readlineSync.question(
    `1. Replace existing account.\n2. Create a new account (prefix "_N" will be increased).\n3. Cancel\n: `);

    if (isNaN(+userAnswer)) {
      showMessage('Account not created.', 'warn');
      return;
    }
    switch (userAnswer) {
      case '1':
        //replace
        showMessage('Replace mode selected: ', 'info');
          utils.buildNewAccount(name, (newAccount) => {
          if(!newAccount.name) {
            showMessage('The new Account is empty, account not replaced.', 'warn');
            return;
          }
          const index = utils.getIndexObjectByAttr(data.accounts, 'name', name);
          newAccount.accountNumber = data.accounts[index].accountNumber;
          data.accounts[index] = newAccount;
          fs.writeFile(utils.DATA_PATH, JSON.stringify(data), (error) => {
            if (error) throw new Error('Error. Account not created');
            showMessage(`Account ${name} replaced successfully`, 'success');
          });
        })        
        break;
      case '2':
        //Create with prefix
        showMessage('Create New mode selected: ', 'info');
          utils.buildNewAccount(name, (newAccount) => {
          if(!newAccount.name) {
            showMessage('The new Account is empty, account not created.', 'warn');
            return;
          }
          const index = utils.getIndexObjectByAttr(data.accounts, 'name', name);
          let accNumber = +utils.decrypt(data.accounts[index].accountNumber) + 1;
          newAccount.accountNumber = utils.encrypt(accNumber);
          let accName = utils.decrypt(newAccount.name) += `_${newAccount.accountNumber}`;
          newAccount.name = utils.encrypt(accName);

          data.accounts.push(newAccount);
          fs.writeFile(utils.DATA_PATH, JSON.stringify(data), (error) => {
            if (error) throw new Error('Error. Account not created');
            showMessage(`Account ${name} saved successfully`, 'success');
          });
        });
        break;
      case '3':
        //cancel
        showMessage('Account not created', 'error');
        return;
      default:
        showMessage('Invalid option. Account not created', 'error');
        return;
    }
  } else {
      utils.buildNewAccount(name, (newAccount) => {
      if(!newAccount.name) {
        showMessage('The new Account is empty, account not created.', 'warn');
        return;
      }
      newAccount.accountNumber = utils.encrypt(1);
      data.accounts.push(newAccount);
      fs.writeFile(pathTest, JSON.stringify(data), (error) => {
        if (error) throw new Error('Error. Account not created');
        showMessage(`Account ${name} saved successfully`, 'success');
      });
    });
  }
}


module.exports = {
  createNewUserAccount
}