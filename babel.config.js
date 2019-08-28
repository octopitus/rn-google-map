module.exports = function(api) {
  api.cache(true)

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@assets': './assets',
            '@api': './src/api',
            '@constants': './src/constants',
            '@components': './src/components',
            '@screens': './src/screens',
            '@utils': './src/utils'
          }
        }
      ]
    ]
  }
}
