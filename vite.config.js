export default {
  // Use Node environment at build time. Default to the repo name for GitHub Pages.
  base: process.env.REPO_NAME ? `/${process.env.REPO_NAME}/` : "/CMPM121-F/",
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: "baseline-widely-available",
    outDir: "dist",
    sourcemap: true,
  },
};
