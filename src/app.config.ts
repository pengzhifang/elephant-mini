export default {
  pages: [
    'pages/index/index', 
    'pages/home/index', 
  ],
  subPackages: [
    {
      root: 'pages/editUserInfo',
      pages: ['index'],
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  }
};
