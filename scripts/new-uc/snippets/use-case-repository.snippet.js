const dedent = require("dedent");

const renderUseCaseRepository = ({ repositoryName }) => {
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
