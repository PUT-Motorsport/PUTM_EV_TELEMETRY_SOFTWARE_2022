module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/scss/main.scss";
        `,
      },
    },
  },
};
