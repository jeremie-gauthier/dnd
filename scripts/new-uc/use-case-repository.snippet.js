const dedent = require("dedent");
const camelCase = require("lodash.camelcase");
const { capitalize } = require("./utils");

const renderUseCaseRepository = (useCaseName) => {
  const pascalCaseName = capitalize(camelCase(useCaseName));

  const repositoryName = `${pascalCaseName}Repository`;

  return dedent`
		import { Injectable } from '@nestjs/common';

		@Injectable()
		export class ${repositoryName} {
		  constructor() {}
		}\n
	`;
};

module.exports = {
  renderUseCaseRepository,
};
