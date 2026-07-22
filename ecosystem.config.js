module.exports = {
  apps: [
    {
      name: "puhumedia",
      script: "server.js",
      cwd: "/www/wwwroot/puhumedia.com.tr/current",
      env: {
        NODE_ENV: "production",
        PORT: "3010",
        HOSTNAME: "127.0.0.1",
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "400M",
    },
  ],
};
