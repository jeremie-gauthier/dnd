module.exports = {
  stockMarketApi: {
    input: {
      target: "http://localhost:3000/api-yaml",
    },
    output: {
      workspace: "./src/openapi/dnd-api",
      schemas: "./model",
      target: "./services",
      mode: "tags-split",
      client: "react-query",
      override: {
        mutator: {
          path: "../../lib/fetch.ts",
          name: "customInstance",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "biome check src/ --write --unsafe",
    },
  },
};
