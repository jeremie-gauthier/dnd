const inquirer = require("inquirer");
inquirer.registerPrompt("directory", require("inquirer-directory"));
const input = require("@inquirer/input").default;
const fs = require("node:fs/promises");
const kebabCase = require("lodash.kebabcase");
const { renderUseCaseDto } = require("./use-case-dto.snippet");
const { renderUseCase } = require("./use-case.snippet");
const { renderUseCaseRepository } = require("./use-case-repository.snippet");

const UC_BASE_PATH = `./packages/backend/src`;

const promptUseCaseName = async () => {
  const rawUseCaseName = await input({
    message: "Enter the name of your Use Case:",
  });
  const useCaseName = kebabCase(rawUseCaseName);
  return useCaseName;
};

const promptUseCaseModule = async () => {
  const { from } = await inquirer.prompt([
    {
      type: "directory",
      name: "from",
      message: "Select the module in which to place this Use Case:",
      basePath: UC_BASE_PATH,
    },
  ]);

  return from;
};

const main = async () => {
  const useCaseName = await promptUseCaseName();
  const useCaseModule = await promptUseCaseModule();

  const useCaseDir = `${UC_BASE_PATH}/${useCaseModule}/${useCaseName}`;
  const useCaseFiles = [
    {
      filename: `${useCaseDir}/${useCaseName}.dto.ts`,
      content: renderUseCaseDto(useCaseName),
    },
    {
      filename: `${useCaseDir}/${useCaseName}.uc.ts`,
      content: renderUseCase(useCaseName),
    },
    {
      filename: `${useCaseDir}/${useCaseName}.repository.ts`,
      content: renderUseCaseRepository(useCaseName),
    },
  ];

  await fs.mkdir(useCaseDir);
  await Promise.all(
    useCaseFiles.map(({ filename, content }) => fs.writeFile(filename, content))
  );

  const logs = [
    `📂 ${useCaseDir}`,
    ...useCaseFiles.map(({ filename }) => `📝 ${filename}`),
  ];

  console.log(logs.join("\n"));
};

main()
  .then(() => console.log(`✅ New Use Case created`))
  .catch((e) => console.error(e));
