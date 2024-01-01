const dedent = require("dedent");
const camelCase = require("lodash.camelcase");
const { capitalize } = require("./utils");

const renderUseCaseDto = (useCaseName) => {
  const camelCaseName = camelCase(useCaseName);

  const inputSchemaName = `${camelCaseName}InputSchema`;
  const inputDtoName = `${capitalize(camelCaseName)}InputDto`;

  const outputSchemaName = `${camelCaseName}OutputSchema`;
  const outputDtoName = `${capitalize(camelCaseName)}OutputDto`;

  return dedent`
		import { createZodDto } from 'nestjs-zod';
		import { z } from 'zod';

		const ${inputSchemaName} = z.object({});
		export class ${inputDtoName} extends createZodDto(${inputSchemaName}) {}
		
		const ${outputSchemaName} = z.object({});
		export class ${outputDtoName} extends createZodDto(${outputSchemaName}) {}\n
	`;
};

module.exports = {
  renderUseCaseDto,
};
