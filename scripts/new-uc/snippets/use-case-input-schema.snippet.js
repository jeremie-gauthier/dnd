const dedent = require("dedent");

const renderUseCaseInputSchema = ({ inputSchemaName }) => {
  return dedent`
		import { z } from 'zod';

		export const ${inputSchemaName} = z.object({});\n
	`;
};

module.exports = {
  renderUseCaseInputSchema,
};
