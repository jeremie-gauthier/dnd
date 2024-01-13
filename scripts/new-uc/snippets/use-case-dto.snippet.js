const dedent = require("dedent");

const renderUseCaseDto = ({
  inputSchemaName,
  inputDtoName,
  outputSchemaName,
  outputDtoName,
}) => {
  return dedent`
		import { ${inputSchemaName}, ${outputSchemaName} } from '@dnd/shared';
		import { createZodDto } from 'nestjs-zod';

		export class ${inputDtoName} extends createZodDto(${inputSchemaName}) {}
		
		export class ${outputDtoName} extends createZodDto(${outputSchemaName}) {}\n
	`;
};

module.exports = {
  renderUseCaseDto,
};
