const dedent = require("dedent");

const renderEventEnum = (eventEnumFileContent, { enumKey, enumValue }) => {
  const fileByLines = eventEnumFileContent.split("\n");

  if (fileByLines.length === 2) {
    const newContent = [
      fileByLines[0].replace("}", ""),
      `  ${enumKey} = '${enumValue}',`,
      "}\n",
    ];
    return newContent.join("\n");
  } else {
    const newContent = [
      fileByLines[0],
      `  ${enumKey} = '${enumValue}',`,
      ...fileByLines.slice(1),
    ];
    return newContent.join("\n");
  }
};

module.exports = {
  renderEventEnum,
};
