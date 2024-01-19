const dedent = require("dedent");

const renderEventPayload = ({
  eventEnum,
  module,
  eventNameEnum,
  eventPayloadClassName,
}) => {
  return dedent`
		import { EventPayload } from 'src/event-emitter/event-payload.class';
		import { ${eventEnum} } from './${module}-events.enum';

		export class ${eventPayloadClassName} implements EventPayload<${eventNameEnum}> {
		  public readonly name = ${eventNameEnum};

		  constructor({}: Omit<${eventPayloadClassName}, 'name'>) {}
		}\n
	`;
};

module.exports = {
  renderEventPayload,
};
