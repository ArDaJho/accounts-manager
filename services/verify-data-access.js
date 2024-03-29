const shell = require('shelljs');
const utils = require('../utils/utils');
const showMessage = require('../utils/show-messages').showMessage;

const buildDataAccess = () => {
  let metaData = utils.getAmMetaData();
  if (shell.exec(`${utils.getValidCommand('cat')} ${metaData.DATA_PATH}`, {silent:true}).code !== 0) { 
    // error generate data
    showMessage('Creating default data in: nodejs/node_modules/__amdata/data.json');
    if (shell.exec(`cd ${utils.DATA_FOLDER_PATH}`, {silent:true}).code !== 0) {
      shell.exec(`mkdir ${utils.DATA_FOLDER_PATH}`, {silent:true});  
      shell.exec(`${utils.getValidCommand('cp')}  ${utils.DATA_PATH_PROD} ${utils.DATA_FOLDER_PATH}`, {silent:true});
      shell.exec(`${utils.getValidCommand('chmod')} ${utils.DATA_FOLDER_PATH}`, {silent:true});
      utils.writeInAmMetaData('DATA_PATH', utils.DATA_PATH);
    }  else {
      //if (shell.exec(`${utils.getValidCommand('cat')} ${metaData.DATA_PATH}`, {silent:true}).code !== 0) {
        shell.exec(`${utils.getValidCommand('cp')}  ${utils.DATA_PATH_PROD} ${utils.DATA_FOLDER_PATH}`, {silent:true});
        shell.exec(`${utils.getValidCommand('chmod')} ${utils.DATA_FOLDER_PATH}`, {silent:true});
        utils.writeInAmMetaData('DATA_PATH', utils.DATA_PATH);
      //}
    }
  }

}

const verifyDataAccess = () => {
  let metaData = utils.getAmMetaData();
  if (shell.exec(`${utils.getValidCommand('cat')} ${metaData.DATA_PATH}`, {silent:true}).code !== 0) return false;
  return true;
}

module.exports = {
  buildDataAccess,
  verifyDataAccess
}