const shell = require('shelljs');
const utils = require('../utils/utils');

const buildDataAccess = () => {
  if (shell.exec(`cd ${utils.DATA_FOLDER_PATH}`, {silent:true}).code !== 0) {
    shell.exec(`mkdir ${utils.DATA_FOLDER_PATH}`, {silent:true});
    shell.exec(`cp  ${utils.DATA_PATH_PROD} ${utils.DATA_FOLDER_PATH}`, {silent:true});
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