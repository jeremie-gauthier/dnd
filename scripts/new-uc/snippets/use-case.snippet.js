const dedent = require("dedent");

const renderUseCase = ({ useCaseName, useCaseClassName, repositoryName }) => {
  return dedent`
		import { Injectable } from '@nestjs/common';
		import { UseCase } from 'src/types/use-case.interface';
		import { ${repositoryName} } from './${useCaseName}.repository';

		@Injectable()
		export class ${useCaseClassName} implements UseCase {
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
