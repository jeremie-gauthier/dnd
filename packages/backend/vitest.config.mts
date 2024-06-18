import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    isolate: false,
    globals: true,
    root: "./",
    coverage: {
      provider: "v8",
      include: [
        "**/*.uc.ts",
        "**/*.listener.ts",
        "**/*.service.ts",
        "**/domain/**/*.ts",
      ],
      exclude: ["**/*.fixtures.ts"],
    },
  },
  plugins: [
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: "es6" },
    }),
  ],
});
