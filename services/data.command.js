const showMessage = require('../utils/show-messages').showMessage;
const utils = require('../utils/utils');
const shell = require('shelljs');
const fs = require("fs");

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
  const dataPathOriginal = dataPath;
  if (/(\s+)/g.test(dataPath)) {
    dataPath = `"${dataPath}"`;    
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
      createNewDataJson(dataPathOriginal);
    }
  }
};

const verifyValidDataJson  = (dataJsonPath) => {
  let dataPathAux = dataJsonPath;
  // If the route has spaces means that has " " in the start and in the end
  // for that it is neccessary remove " " before to pass to requiere method
  if (dataPathAux[0] === '"') {
    dataPathAux = dataPathAux.replace(/"/g, '');
  }
  let data = require(dataPathAux);
  
  if(!data.accounts && !data.login ) {
    showMessage('Invalid Data Json Format', 'error');
    return false;
  }
  showMessage('Data path set successfully', 'success');
  utils.writeInAmMetaData('DATA_PATH', dataJsonPath);
  return true;
}

const createNewDataJson  = (dataJsonPath) => {  
  let auxDataPath = dataJsonPath;
  if (/(\s+)/g.test(dataJsonPath)) {
    dataJsonPath = `"${dataJsonPath}"`;    
  }
  const metaData = utils.getAmMetaData();
  shell.exec(`${utils.getValidCommand('cp')}  ${metaData.DATA_PATH} ${dataJsonPath}`, {silent: true});
  shell.exec(`${utils.getValidCommand('chmod')} ${dataJsonPath}`, {silent: true});


  if (auxDataPath[auxDataPath.length-1] != '\\' && auxDataPath.includes('\\')){
    auxDataPath = auxDataPath + '\\';
  }
  if (auxDataPath[auxDataPath.length-1] !='/' && auxDataPath.includes('/')){
    auxDataPath = auxDataPath + '/';
  }
  // If the route has spaces means that we need add  " " 
  if (/(\s+)/g.test(auxDataPath)) {
    auxDataPath = `\"${auxDataPath}data.json\"`
  } else {
    auxDataPath = `${auxDataPath}data.json`
  }

  utils.writeInAmMetaData('DATA_PATH', `${auxDataPath}`);
  showMessage('Data path set successfully', 'success');
}

const showDataPath = () => {
  const metaData = utils.getAmMetaData();
  showMessage(`Current data path: ${metaData.DATA_PATH}`, 'info');
  showMessage(`To change it. Use "am data -p=/MyData/Path" or "am data -p="/MyData/Path/data.json""`, 'info');
}

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
  setDataPath,
  buildDataAccess,
  verifyDataAccess
}