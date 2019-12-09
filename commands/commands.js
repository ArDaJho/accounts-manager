const yargs = require('yargs');

yargs
.command('login', '-p=pass123 -t=30    Desc: Set or Update a password to access to your Accounts.', {
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
.command('add', '-a=facebook         Desc: Add a new User Account', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Add new Account name example: -a=Facebook'
  }
})
.command('list', '#show all           Desc: List all your availible Accounts', {
})
.command('show', '-a=facebook         Desc: Show the Account info', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Name of an Account, example: -a=Facebook'
  }
})
.command('update', '-a=facebook         Desc: Update the Account.', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Name of an Account, example: -a=Facebook'
  }
})
.command('remove', '-a=facebook         Desc: Remove the Account.', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Name of an Account, example: -a=Facebook'
  }
})
.help()
.argv;

module.exports = {
  yargs
};
