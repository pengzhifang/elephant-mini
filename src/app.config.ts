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
      pages: ['index', 'appointment-order/index'],
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  }
};
