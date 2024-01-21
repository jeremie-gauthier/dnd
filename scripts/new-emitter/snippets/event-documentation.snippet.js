const dedent = require("dedent");

const renderEventDocumentation = ({ enumKey, moduleName }) => {
  return dedent`
		---
		name: ${enumKey}
		version: 0.0.1
		summary: |
		  Represents 
		producers:
		  - ${moduleName} Module
		producers:
		  -
		---
		
		<NodeGraph title="Consumer / Producer Diagram" />
	`;
};

module.exports = {
  renderEventDocumentation,
};
