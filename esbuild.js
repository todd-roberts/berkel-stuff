const esbuild = require("esbuild");

// Main process
esbuild
  .build({
    entryPoints: ["src/main.ts"],
    bundle: true,
    platform: "node",
    external: ["electron"],
    outfile: "main.js",
  })
  .catch(() => process.exit(1));

// Renderer process
esbuild
  .build({
    entryPoints: ["src/renderer.ts"],
    bundle: true,
    platform: "node",
    external: ["electron"],
    outfile: "renderer.js",
  })
  .catch(() => process.exit(1));
