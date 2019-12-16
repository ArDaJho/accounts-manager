const showMessage = require('../utils/show-messages').showMessage;
const utils = require('../utils/utils');
const shell = require('shelljs');


const setDataPath = (dataPath) => {

  if (!dataPath) {
    showDataPath();
    return;
  }
  if (dataPath == true) {
    showMessage('Invalid Data path', 'error');
    showDataPath();
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
  const metaData = utils.getAmMetaData();
  shell.exec(`${utils.getValidCommand('cp')}  ${metaData.DATA_PATH} ${dataJsonPath}`, {silent: true});
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

const showDataPath = () => {
  const metaData = utils.getAmMetaData();
  showMessage(`Current data path: ${metaData.DATA_PATH}`, 'info');
  showMessage(`To change it. Use "am data -p=/MyData/Path" or "am data -p=/MyData/Path/data.json"`, 'info');
}


module.exports = {
  setDataPath
}