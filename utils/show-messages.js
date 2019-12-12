var colors = require('colors/safe');
  
// set theme
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  success: 'green',
  info: 'cyan',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  title: 'blue',
  error: 'red'
});

showMessage = (message, type = 'info') => {
  try {
    console.log(colors[type](message));
  } catch (error) {
    console.log(colors.red('Message type unknow.'));
    throw new Error('Message type unknow.');
  }
}

module.exports = {
  showMessage
}