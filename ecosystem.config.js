module.exports = {
  apps: [
    {
      name: "political_stat_backend",       // name shown in `pm2 list`
      script: "./index.js",                 // your entry point file
      node_args: "--max-old-space-size=1024", // optional: allocates 1GB heap
      env: {
        NODE_ENV: "production",             // environment variable
      }
    }
  ]
};
