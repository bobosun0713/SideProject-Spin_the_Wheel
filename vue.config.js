module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/SideProject-Spin_the_Wheel/'
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
