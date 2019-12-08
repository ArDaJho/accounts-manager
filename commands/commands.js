const yargs = require('yargs');

yargs.command('add', 'Desc: Add a new User Account', {
  name: {
    demand: true,
    alias: 'n',
    desc: 'Desc: Add new Account name example: Facebook'
  }
/*   user: {
    demand: true,
    alias: 'u',
    desc: 'Username or email of of the account'
  },
  password: {
    demand: true,
    alias: 'p',
    desc: 'Password of the Account'
  } */
})
.command('list', 'Desc: List all your availible Accounts', {
})
.command('show', 'Desc: Show the Account info', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Name of an Account'
  }
})
.command('remove', 'Desc: Remove the Account', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Name of an Account'
  }
})
.command('update', 'Desc: Update the Account', {
  account: {
    demand: true,
    alias: 'a',
    desc: 'Desc: Name of an Account'
  }
})
.help()
.argv;

module.exports = {
  yargs
};
