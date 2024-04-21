module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      'postcss-rem-to-responsive-pixel': {
        // 意味着 1rem = 200rpx = 100px
        rootValue: 200,
        // 默认所有属性都转化
        propList: ['*'],
        // 转化的单位,可以变成 px / rpx
        transformUnit: 'rpx',
      },
    }
  }