const dedent = require("dedent");
const camelCase = require("lodash.camelcase");
const { capitalize } = require("./utils");

const renderUseCase = (useCaseName) => {
  const pascalCaseName = capitalize(camelCase(useCaseName));

  const className = `${pascalCaseName}UseCase`;
  const repositoryName = `${pascalCaseName}Repository`;

  return dedent`
		import { Injectable } from '@nestjs/common';
		import { UseCase } from 'src/types/use-case.interface';
		import { ${repositoryName} } from './${useCaseName}.repository';

		@Injectable()
		export class ${className} implements UseCase {
		  constructor(private readonly repository: ${repositoryName}) {}

		  public async execute(): Promise<void> {
		    throw new Error('Not implemented');
		  }
		}\n
	`;
};

module.exports = {
  renderUseCase,
};
