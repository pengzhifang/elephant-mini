/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        default: 'calc(100vh - 130px)'
      },
      fontFamily: {
        'GB': ['FZY4JW--GB1-0', 'FZY4JW--GB1'],
        'PF': ['PingFangSC', 'PingFang SC'],
        'PF-SE': ['PingFangSC-Semibold', 'PingFang SC'],
        'PF-ME': ['PingFangSC-Medium', 'PingFang SC'],
        'PF-RE': ['PingFangSC-Regular', 'PingFang SC'],
      },
      backgroundColor: {
        'rgba02': 'rgba(0,0,0,0.2)'
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

