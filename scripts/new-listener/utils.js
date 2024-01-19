const camelCase = require("lodash.camelcase");

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getVarNames(eventListenerName) {
  const camelCaseName = camelCase(eventListenerName);
  const pascalCaseName = capitalize(camelCaseName);

  return {
    eventListenerName,
    eventListenerClassName: `${pascalCaseName}Listener`,
    repositoryName: `${pascalCaseName}Repository`,
  };
}

module.exports = {
  getVarNames,
};
