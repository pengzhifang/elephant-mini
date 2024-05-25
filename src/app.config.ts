export default {
  pages: [
    'pages/index/index', 
    'pages/home/index', 
  ],
  subPackages: [
    {
      root: 'pages/editUserInfo',
      pages: ['index'],
    },
    {
      root: 'pages/appointment',
      pages: ['index', 'appointment-order/index', 'submit/index'],
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  plugins: {
    chooseLocation: {
      version: "1.0.12",
      provider: "wx76a9a06e5b4e693e"
    }
  },
  permission: {
    'scope.userLocation': {
      desc: "你的位置信息将用于小程序定位"
    }
  }
};
