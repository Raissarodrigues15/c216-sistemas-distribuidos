import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	test: {
		environment: "jsdom",
		setupFiles: "./tests/setup.js",
		include: [
			"tests/unit/**/*.test.{js,jsx}",
			"tests/integration/**/*.test.{js,jsx}",
		],
		css: true,
	},
});
