const showMessage = require('../utils/show-messages').showMessage;
const utils = require('../utils/utils');
const shell = require('shelljs');


const setDataPath = (dataPath) => {

  if (!dataPath) {
    showMessage('Invalid Data path', 'error');
    return;
  }

  if (dataPath.includes('.json')) {

    if (shell.exec(`${utils.getValidCommand('cat')} ${dataPath}`, { silent: true }).code !== 0) {
      showMessage('Invalid Data JSON path', 'error');
      return;
    } else {
      verifyValidDataJson(dataPath);
    }

  } else {

    if (shell.exec(`cd ${dataPath}`, { silent: true }).code !== 0) {
      showMessage('Invalid Data path', 'error');
      return;
    } else {
      createNewDataJson(dataPath);
    }
  }
};

const verifyValidDataJson  = (dataJsonPath) => {
  let data = require(dataJsonPath);
  if(!data.accounts && !data.login ) {
    showMessage('Invalid Data Json Format', 'error');
    return false;
  }
  showMessage('Data path set successfully', 'success');
  utils.writeInAmMetaData('DATA_PATH', dataJsonPath);
  return true;
}

const createNewDataJson  = (dataJsonPath) => {
  shell.exec(`${utils.getValidCommand('cp')}  ${utils.DATA_PATH_PROD} ${dataJsonPath}`, {silent: true});
  shell.exec(`${utils.getValidCommand('chmod')} ${dataJsonPath}`, {silent: true});
  if (dataJsonPath[dataJsonPath.length-1] !='\\' && dataJsonPath.includes('\\')){
    dataJsonPath = dataJsonPath + '\\\\';
  }
  if (dataJsonPath[dataJsonPath.length-1] !='/' && dataJsonPath.includes('/')){
    dataJsonPath = dataJsonPath + '/';
  }
  utils.writeInAmMetaData('DATA_PATH', `${dataJsonPath}data.json`);
  showMessage('Data path set successfully', 'success');
}



module.exports = {
  setDataPath
}