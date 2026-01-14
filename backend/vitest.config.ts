import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: {
      NODE_ENV: "test",
    },

    // Não rodar testes em paralelo
    sequence: {
      concurrent: false,
    },

    setupFiles: ["./tests/setup/setup.ts"],
  },
});
