const yargs = require('yargs');

yargs
.command('data', '-p=/myData/          Desc: Set or Update the folder where your account information is stored, default: nodejs/node_modules/__amdata/).', {
  path: {
    demand: true,
    alias: 'p',
    desc: 'Desc: If you have an old data.json please enter it in the path Example: -p=/myData/data.json if not only enter -p=/myData/'
  }
})
.command('login', '-p=pass123 -t=30    Desc: Set or Update a password to access to your Accounts.', {
  password: {
    demand: true,
    alias: 'p',
    desc: 'Desc: Password for your Accounts, example: -p=password123'
  },
  expiredTime: {
    alias: 't',
    default: 30,
    desc: 'Desc: Expired time in days for your Password[default time 30 days], example: -t=30'
  }
})
.command('add', '-a=facebook         Desc: Add a new User Account.', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Add new Account name example: am add -a=Facebook'
  }
})
.command('list', '#show all           Desc: List all your availible Accounts.', {
})
.command('show', '-a=facebook         Desc: Show the Account info.', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Name of the Account, example: am show -a=Facebook'
  }
})
.command('update', '-a=facebook         Desc: Update the Account.', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Name of the Account, example: am update -a=Facebook'
  }
})
.command('remove', '-a=facebook         Desc: Remove the Account.', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Name of the  Account, example: am -a=Facebook'
  }
})
.help()
.argv;

module.exports = {
  yargs
};
