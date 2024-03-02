const dedent = require("dedent");

const renderUseCaseInputSchema = ({ inputSchemaName, inputTypeName }) => {
  return dedent`
		import { z } from 'zod';

		export const ${inputSchemaName} = z.object({});\n

    export type ${inputTypeName} = z.infer<typeof ${inputSchemaName}>;
	`;
};

module.exports = {
  renderUseCaseInputSchema,
};
