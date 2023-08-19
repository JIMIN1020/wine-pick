const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/", {
      // 백엔드 주소
      target: "https://wine-bot.fly.dev/",
      changeOrigin: true,
    })
  );
};
