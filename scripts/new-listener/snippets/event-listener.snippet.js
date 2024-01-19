const dedent = require("dedent");

const renderEventListener = ({
  eventListenerName,
  eventListenerClassName,
  repositoryName,
}) => {
  return dedent`
		import { Injectable } from '@nestjs/common';
		import { OnEvent } from '@nestjs/event-emitter';
		import { ${repositoryName} } from './${eventListenerName}.repository';

		@Injectable()
		export class ${eventListenerClassName} {
		  constructor(private readonly repository: ${repositoryName}) {}
		
			@OnEvent()
			public async handler(payload: unknown) {}
		}\n
	`;
};

module.exports = {
  renderEventListener,
};
