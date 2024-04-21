import type { UserConfigExport } from "@tarojs/cli";
export default {
   logger: {
    quiet: false,
    stats: true
  },
  env: {
    NODE_ENV: '"development"',
  },
  mini: {},
  h5: {}
} satisfies UserConfigExport
