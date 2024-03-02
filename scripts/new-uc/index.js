const inquirer = require("inquirer");
inquirer.registerPrompt("directory", require("inquirer-directory"));
const input = require("@inquirer/input").default;
const fs = require("node:fs/promises");
const kebabCase = require("lodash.kebabcase");
const {
  renderUseCaseDto,
  renderUseCase,
  renderUseCaseInputSchema,
  renderUseCaseOutputSchema,
  renderUseSchemaBarrelFile,
  renderUseCaseRepository,
  renderUseCaseSpec,
} = require("./snippets");
const { getVarNames } = require("./utils");

const UC_BASE_PATH = "./packages/backend/src";
const SHARED_SCHEMAS_BASE_PATH = "./packages/shared/src/schemas";

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

const logOutputFiles = (files) => {
  const filesOrdered = {};
  for (const { filename } of files) {
    const dir = filename.split("/").slice(0, -1).join("/");

    if (Object.hasOwn(filesOrdered, dir)) {
      filesOrdered[dir].push(filename);
    } else {
      filesOrdered[dir] = [filename];
    }
  }

  const logs = Object.entries(filesOrdered).map(([dir, filenames]) =>
    [`📂 ${dir}`, ...filenames.map((filename) => `📝 ${filename}`)].join("\n"),
  );

  console.log(logs.join("\n"));
};

const main = async () => {
  const useCaseName = await promptUseCaseName();
  const useCaseModule = await promptUseCaseModule();

  const vars = getVarNames(useCaseName);

  const useCaseDir = `${UC_BASE_PATH}/${useCaseModule}/${useCaseName}`;
  const useCaseFiles = [
    {
      filename: `${useCaseDir}/${useCaseName}.dto.ts`,
      content: renderUseCaseDto(vars),
      options: { flag: "w" },
    },
    {
      filename: `${useCaseDir}/${useCaseName}.uc.ts`,
      content: renderUseCase(vars),
      options: { flag: "w" },
    },
    {
      filename: `${useCaseDir}/${useCaseName}.repository.ts`,
      content: renderUseCaseRepository(vars),
      options: { flag: "w" },
    },
    {
      filename: `${useCaseDir}/${useCaseName}.spec.ts`,
      content: renderUseCaseSpec(vars),
      options: { flag: "w" },
    },
  ];

  const sharedSchemasModuleDir = `${SHARED_SCHEMAS_BASE_PATH}/${useCaseModule}`;
  const sharedSchemasDir = `${sharedSchemasModuleDir}/${useCaseName}`;
  const sharedSchemasFiles = [
    {
      filename: `${sharedSchemasDir}/${useCaseName}-input.schema.ts`,
      content: renderUseCaseInputSchema(vars),
      options: { flag: "w" },
    },
    {
      filename: `${sharedSchemasDir}/${useCaseName}-output.schema.ts`,
      content: renderUseCaseOutputSchema(vars),
      options: { flag: "w" },
    },
    {
      filename: `${sharedSchemasModuleDir}/index.ts`,
      content: renderUseSchemaBarrelFile(vars),
      options: { flag: "a" },
    },
  ];

  const foldersToGenerate = [useCaseDir, sharedSchemasDir];
  await Promise.all(
    foldersToGenerate.map((dir) => fs.mkdir(dir, { recursive: true })),
  );

  const filesToGenerate = [...useCaseFiles, ...sharedSchemasFiles];
  await Promise.all(
    filesToGenerate.map(({ filename, content, options }) =>
      fs.writeFile(filename, content, options),
    ),
  );

  logOutputFiles(filesToGenerate);
};

main()
  .then(() => {
    console.log("✅ New Use Case created");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
