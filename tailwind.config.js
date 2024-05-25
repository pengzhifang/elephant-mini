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
      colors: {
        '333': '#333333',
        '666': '#666666',
        '999': '#999999',
      },
      backgroundColor: {
        'rgba02': 'rgba(0,0,0,0.2)'
      },
      boxShadow: {
        'shadow1': '0px 1px 11px 3px rgba(12,92,152,0.05)',
        'shadow2': '0px 4px 7px 0px rgba(170,232,213,0.35)'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

