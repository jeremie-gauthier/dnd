const dedent = require("dedent");

const renderEventPayload = ({
  eventEnum,
  module,
  eventNameEnum,
  eventPayloadClassName,
}) => {
  return dedent`
		import { EventPayload } from 'src/interfaces/event-payload.interface';
		import { ${eventEnum} } from './${module}-event.enum';

		export class ${eventPayloadClassName} implements EventPayload<${eventNameEnum}> {
		  public readonly name = ${eventNameEnum};

		  constructor({}: Omit<${eventPayloadClassName}, 'name'>) {}
		}\n
	`;
};

module.exports = {
  renderEventPayload,
};
