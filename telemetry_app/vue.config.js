module.exports = {
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
