const dedent = require("dedent");

const renderUseSchemaBarrelFile = ({ useCaseName }) => {
  return dedent`
		export * from './${useCaseName}/${useCaseName}-input.schema';
		export * from './${useCaseName}/${useCaseName}-output.schema';\n
	`;
};

module.exports = {
  renderUseSchemaBarrelFile,
};
