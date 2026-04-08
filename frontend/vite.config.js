import path from "path";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, "");
  const proxyTarget = env.VITE_DEV_API_PROXY || "http://localhost:5000";

  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "./src"),
        "@components": path.resolve(rootDir, "./src/components"),
      },
    },
    build: {
      target: "es2022",
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) {
              return undefined;
            }

            if (id.includes("react") || id.includes("scheduler")) {
              return "vendor-react";
            }

            if (id.includes("react-router")) {
              return "vendor-router";
            }

            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }

            return "vendor";
          },
        },
      },
    },
    server: {
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
    preview: {
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
