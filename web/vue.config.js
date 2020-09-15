module.exports = {
  publicPath: "/",
  //publicPath: process.env.NODE_ENV === "production" ? "/map/" : "/",
  outputDir: __dirname + "/../server/web",
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
      },
    },
  },
};
