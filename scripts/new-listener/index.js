const inquirer = require("inquirer");
inquirer.registerPrompt("directory", require("inquirer-directory"));
const input = require("@inquirer/input").default;
const fs = require("node:fs/promises");
const kebabCase = require("lodash.kebabcase");
const {
  renderEventListener,
  renderEventListenerRepository,
} = require("./snippets");
const { getVarNames } = require("./utils");

const EVENT_LISTENER_BASE_PATH = "./packages/backend/src";

const promptEventListenerName = async () => {
  const rawEventListenerName = await input({
    message: "Enter the name of your Event Listener:",
  });
  const eventListenerName = kebabCase(rawEventListenerName);
  return eventListenerName;
};

const promptEventListenerModule = async () => {
  const { from } = await inquirer.prompt([
    {
      type: "directory",
      name: "from",
      message: "Select the module in which to place this Event Listener:",
      basePath: EVENT_LISTENER_BASE_PATH,
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
  const eventListenerName = await promptEventListenerName();
  const eventListenerModule = await promptEventListenerModule();

  const vars = getVarNames(eventListenerName);

  const eventListenerDir = `${EVENT_LISTENER_BASE_PATH}/${eventListenerModule}/${eventListenerName}`;
  const eventListenerFiles = [
    {
      filename: `${eventListenerDir}/${eventListenerName}.listener.ts`,
      content: renderEventListener(vars),
      options: { flag: "w" },
    },
    {
      filename: `${eventListenerDir}/${eventListenerName}.repository.ts`,
      content: renderEventListenerRepository(vars),
      options: { flag: "w" },
    },
  ];

  const foldersToGenerate = [eventListenerDir];
  await Promise.all(
    foldersToGenerate.map((dir) => fs.mkdir(dir, { recursive: true })),
  );

  const filesToGenerate = [...eventListenerFiles];
  await Promise.all(
    filesToGenerate.map(({ filename, content, options }) =>
      fs.writeFile(filename, content, options),
    ),
  );

  logOutputFiles(filesToGenerate);
};

main()
  .then(() => {
    console.log("✅ New Event Listener created");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
