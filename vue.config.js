module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/Side-Project__Spin-the-Wheel-V2/'
      : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
           @import "@/assets/scss/main.scss";
        `,
      },
    },
  },
}
