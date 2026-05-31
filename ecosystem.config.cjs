/**
 * PM2 — Configuration des process Kairos
 * Sur le VPS : pm2 start ecosystem.config.cjs
 */

module.exports = {
  apps: [
    {
      name: "kairos-bot",
      script: "telegram_bot.mjs",
      cwd: "/root/kairos",
      interpreter: "node",
      watch: false,
      autorestart: true,
      restart_delay: 5000,
      max_restarts: 10,
      env: {
        NODE_ENV: "production",
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      out_file: "/root/kairos/logs/bot.log",
      error_file: "/root/kairos/logs/bot-error.log",
    },
  ],
};
