const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;

export const logUtil = {
  info(...args) {
    if (!log) return;
    log.info.apply(log, args);
  },
  warn(...args) {
    if (!log) return;
    log.warn.apply(log, args);
  },
  error(...args) {
    if (!log) return;
    log.error.apply(log, args);
  },
  addFilterMsg(msg) {
    if (typeof msg !== 'string') return;
    if (log) {
      // 从基础库2.8.1开始支持
      if (log.addFilterMsg) {
        log.addFilterMsg(msg);
      } else {
        // 从基础库2.7.3开始支持
        if (log.setFilterMsg) {
          log.setFilterMsg(msg);
        }
      }
    }
  },
};
