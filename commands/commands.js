const yargs = require('yargs');

yargs.command('add', 'Desc: Add a new User Account', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Add new Account name example: -a=Facebook'
  }
})
.command('list', 'Desc: List all your availible Accounts', {
})
.command('show', 'Desc: Show the Account info', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Name of an Account, example: -a=Facebook'
  }
})
.command('remove', 'Desc: Remove the Account.', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Name of an Account, example: -a=Facebook'
  }
})
.command('update', 'Desc: Update the Account.', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Name of an Account, example: -a=Facebook'
  }
})
.command('login', 'Desc: Add or Update a password to access to your Accounts.', {
  password: {
    demand: true,
    alias: 'p',
    desc: 'Desc: Password to your Accounts, example: -p=password123'
  },
  expiredTime: {
    alias: 't',
    default: 30,
    desc: 'Desc: Expired time in days to your Password[default time 30 days], example: -t=30'
  }
})
.help()
.argv;

module.exports = {
  yargs
};
