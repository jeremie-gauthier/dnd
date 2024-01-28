const inquirer = require("inquirer");
inquirer.registerPrompt("directory", require("inquirer-directory"));
const input = require("@inquirer/input").default;
const fs = require("node:fs/promises");
const kebabCase = require("lodash.kebabcase");
const { renderEventPayload, renderEventEnum } = require("./snippets");
const { getVarNames } = require("./utils");

const EVENT_EMITTER_BASE_PATH = `./packages/backend/src`;
const DOCUMENTATION_BASE_PATH = `./event-catalog/events`;

const promptEventPayloadName = async () => {
  const rawEventPayloadName = await input({
    message: "Enter the name of your Event Payload:",
  });
  const eventPayloadName = kebabCase(rawEventPayloadName);
  return eventPayloadName;
};

const promptEventPayloadModule = async () => {
  const { from } = await inquirer.prompt([
    {
      type: "directory",
      name: "from",
      message: "Select the module in which to place this Event Payload:",
      basePath: EVENT_EMITTER_BASE_PATH,
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
    [`📂 ${dir}`, ...filenames.map((filename) => `📝 ${filename}`)].join("\n")
  );

  console.log(logs.join("\n"));
};

const main = async () => {
  const eventPayloadName = await promptEventPayloadName();
  const eventPayloadModule = await promptEventPayloadModule();

  const vars = getVarNames(eventPayloadModule, eventPayloadName);

  const eventEmitterDir = `${EVENT_EMITTER_BASE_PATH}/${eventPayloadModule}`;

  const eventEnumFile = `${eventEmitterDir}/${vars.module}-events.enum.ts`;
  const eventEnumFileContent = await fs.readFile(eventEnumFile, {
    encoding: "utf-8",
  });

  const eventPayloadFiles = [
    {
      filename: `${eventEmitterDir}/${eventPayloadName}.payload.ts`,
      content: renderEventPayload(vars),
      options: { flag: "w" },
    },
    {
      filename: eventEnumFile,
      content: renderEventEnum(eventEnumFileContent, vars),
      options: { flag: "w" },
    },
  ];

  const filesToGenerate = [...eventPayloadFiles];
  await Promise.all(
    filesToGenerate.map(({ filename, content, options }) =>
      fs.writeFile(filename, content, options)
    )
  );

  logOutputFiles(filesToGenerate);
};

main()
  .then(() => {
    console.log(`✅ New Event Payload created`);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
