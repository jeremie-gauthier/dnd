const dedent = require("dedent");

const renderUseCaseOutputSchema = ({ outputSchemaName }) => {
  return dedent`
		import { z } from 'zod';

		export const ${outputSchemaName} = z.object({});\n
	`;
};

module.exports = {
  renderUseCaseOutputSchema,
};
