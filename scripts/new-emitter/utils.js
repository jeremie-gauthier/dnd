const camelCase = require("lodash.camelcase");

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getVarNames(modulePath, eventName) {
  const camelCaseName = camelCase(eventName);
  const pascalCaseName = capitalize(camelCaseName);
  const module = modulePath.split("/")[0];
  const moduleName = capitalize(camelCase(module));

  return {
    eventName,
    module,
    moduleName,
    enumKey: pascalCaseName,
    enumValue: `${module}.`,
    eventNameEnum: `${moduleName}Event.${pascalCaseName}`,
    eventEnum: `${moduleName}Event`,
    eventPayloadClassName: `${pascalCaseName}Payload`,
  };
}

module.exports = {
  getVarNames,
};
