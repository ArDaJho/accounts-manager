const shell = require('shelljs');
const utils = require('../utils/utils');

const buildDataAccess = () => {

  let opsys = process.platform;
  let cpCommand = 'cp';
  if (opsys == "darwin") {
      opsys = "MacOS";
      cpCommand = 'cp';
  } else if (opsys == "win32" || opsys == "win64") {
      opsys = "Windows";
      cpCommand = 'copy';
  } else if (opsys == "linux") {
      opsys = "Linux";
      cpCommand = 'cp';
  }
  if (shell.exec(`cd ${utils.DATA_FOLDER_PATH}`, {silent:true}).code !== 0) {
    shell.exec(`mkdir ${utils.DATA_FOLDER_PATH}`, {silent:true});  
    shell.exec(`${cpCommand}  ${utils.DATA_PATH_PROD} ${utils.DATA_FOLDER_PATH}`, {silent:true});
  }
}

const verifyDataAccess = () => {
  if (shell.exec(`cd ${utils.DATA_FOLDER_PATH}`, {silent:true}).code !== 0) return false;
  return true;
}

module.exports = {
  buildDataAccess,
  verifyDataAccess
}