const fs = require('fs');
const readlineSync = require('readline-sync');
const DATA_PATH = 'data/data.json';
const showMessage = require('../configs/show-messages').showMessage;
const utils = require('../utils/utils');

const createNewUserAccount = (name) => {
  let data = utils.getData();

  if (utils.existsAccount(name)) {
    showMessage(`Duplicate Account "${name}", please choose a option`, 'warn');
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
          fs.writeFile(DATA_PATH, JSON.stringify(data), (error) => {
            if (error) throw new Error('Error. Account not created');
            showMessage(`Account ${name} replaced successfuly`, 'success');
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
          newAccount.accountNumber = data.accounts[index].accountNumber + 1;
          newAccount.name += `_${newAccount.accountNumber}`;
          data.accounts.push(newAccount);
          fs.writeFile(DATA_PATH, JSON.stringify(data), (error) => {
            if (error) throw new Error('Error. Account not created');
            showMessage(`Account ${name} saved successfuly`, 'success');
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
      newAccount.accountNumber = 1;
      data.accounts.push(newAccount);
      fs.writeFile(DATA_PATH, JSON.stringify(data), (error) => {
        if (error) throw new Error('Error. Account not created');
        showMessage(`Account ${name} saved successfuly`, 'success');
      });
    });
  }
}


module.exports = {
  createNewUserAccount
}