const dedent = require("dedent");

const renderEventListenerRepository = ({ repositoryName }) => {
  return dedent`
		import { Injectable } from '@nestjs/common';

		@Injectable()
		export class ${repositoryName} {
		  constructor() {}
		}\n
	`;
};

module.exports = {
  renderEventListenerRepository,
};
