import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.spec.ts"],
    coverage: {
      provider: "v8",
    },
  },
});
