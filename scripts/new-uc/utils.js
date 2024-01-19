const camelCase = require("lodash.camelcase");

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getVarNames(useCaseName) {
  const camelCaseName = camelCase(useCaseName);
  const pascalCaseName = capitalize(camelCaseName);

  return {
    useCaseName,
    useCaseClassName: `${pascalCaseName}UseCase`,
    repositoryName: `${pascalCaseName}Repository`,
    inputSchemaName: `${camelCaseName}InputSchema`,
    inputDtoName: `${pascalCaseName}InputDto`,
    outputSchemaName: `${camelCaseName}OutputSchema`,
    outputDtoName: `${pascalCaseName}OutputDto`,
  };
}

module.exports = {
  getVarNames,
};
