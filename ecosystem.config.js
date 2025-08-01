module.exports = {
  apps: [
    {
      name: "political_stat_backend",
      script: "./index.js",
      node_args: "--max-old-space-size=1024"
    }
  ]
};
