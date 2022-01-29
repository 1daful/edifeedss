const plugins = [
  require('autoprefixer'),
  /*rtl( {fromRTL: true} )*/
]

if (process.env.QUASAR_RTL) {
  /*plugins.push(
    require('postcss-rtl')({})
  )*/
}

module.exports = {
  plugins
}
