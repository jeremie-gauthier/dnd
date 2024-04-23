const dedent = require("dedent");

const renderUseCaseOutputSchema = ({ outputSchemaName, outputTypeName }) => {
  return dedent`
		import { z } from 'zod';

		export const ${outputSchemaName} = z.object({});

		export type ${outputTypeName} = z.infer<typeof ${outputSchemaName}>;
	`;
};

module.exports = {
  renderUseCaseOutputSchema,
};
