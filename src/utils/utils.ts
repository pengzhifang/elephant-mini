import Taro from '@tarojs/taro';

const VIP_REGEXP = new RegExp(/img.blingo.vip/);

/**
 * 格式化授权手机号
 * @param phone 授权获取的手机号
 * @param code 区号编码
 */
export const formatPhone = (phone: string, code: string) => {
  const phoneList = phone.split(`+${code}`);

  return phoneList[phoneList.length - 1];
};

/**
 * 下载图片
 * @param imgUrl 图片地址, 必须为 https 地址
 */
export const downloadImg = (imgUrl: string) => {
  return new Promise<string>((resolve) => {
    Taro.downloadFile({
      url: imgUrl,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath);
        } else {
          Taro.showToast({ title: '图片下载失败！', icon: 'none', mask: true });
        }
      },
      fail: (res) => {
        Taro.showToast({
          title: `图片下载失败！:${JSON.stringify(res)}`,
          icon: 'none',
          mask: true,
        });
      },
    });
  });
};

/**
 * vip地址转换
 * @description 将 img.blingo.vip 图片地址转换为 oss 地址
 * @param url 图片地址
 */
export const translateVipToOss = (url: string) => {
  if (VIP_REGEXP.test(url)) {
    return url
      .split('img.blingo.vip')
      .join('blingo-cn-app.oss-us-west-1.aliyuncs.com');
  }

  return url;
};

// 校验校验码
function checkCode(val) {
  const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
  const code = val.substring(17);
  if (p.test(val)) {
    let sum = 0;
    for (var i = 0; i < 17; i++) {
      sum += val[i] * factor[i];
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true;
    }
  }
  return false;
}

// 校验出生日期码
function checkDate(val) {
  const pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
  if (pattern.test(val)) {
    const year = val.substring(0, 4);
    const month = val.substring(4, 6);
    const date = val.substring(6, 8);
    const date2 = new Date(year + '-' + month + '-' + date);
    if (date2 && date2.getMonth() == parseInt(month) - 1) {
      return true;
    }
  }
  return false;
}

// 校验省级地址码
function checkProv(val) {
  const pattern = /^[1-9][0-9]/;
  const provs = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
  };
  if (pattern.test(val)) {
    if (provs[val]) {
      return true;
    }
  }
  return false;
}

// 检验身份证号
export function checkID(val) {
  if (checkCode(val)) {
    const date = val.substring(6, 14);
    if (checkDate(date)) {
      if (checkProv(val.substring(0, 2))) {
        return true;
      }
    }
  }
  return false;
}

/*
 * 将错误信息，转换成规范的提示
 * @param res
 */
export function getErrorStr(res, task?) {
  return (task || '') + ' ' + res.msg + '(' + res.code + ')';
}

/**
 * toast弹窗
 * @param title title
 * @param icon icon
 * @param duration duration
 */
export function $toast(
  title: string,
  icon?: 'success' | 'loading' | undefined,
  duration?: number,
) {
  return Taro.showToast({
    title,
    icon: icon || 'none', // 为none时 title 文本最多可显示两行，显示图标时最多显示7个汉字长度
    duration: duration || 3000,
  });
}

/**
 * loading弹窗
 * @param title title, 默认: `正在加载中`
 * @param mask mask, 默认: `true`
 */
export function $showLoading(title = '正在加载中', mask = true) {
  Taro.showLoading({
    title,
    mask,
  });
}

/**
 * 隐藏Loading弹窗
 */
export function $hideLoading() {
  Taro.hideLoading();
}

/**
 * 手机号验证
 * @param value value
 */
export function isPhoneNum(value: string) {
  const phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
  // t环境兼容111号段
  if (process.env.TARO_APP_ENVIRONMENT === 'development') {
    const phoneRegT = /^111[0-9]{8}$/;
    return phoneReg.test(value) || phoneRegT.test(value);
  }
  return phoneReg.test(value);
}

/**
 * 纯中文验证(收货姓名等)
 * @param value
 */
export function isCharChinese(value: string) {
  const reg = new RegExp('^[\u4e00-\u9fa5]+$');
  return reg.test(value);
}

/**
 * 判断当前是否是ios机型 true：ios false：安卓
 */
export function getSystem() {
  var ios: boolean = false;
  Taro.getSystemInfo({
    success: (res) => {
      if (res.system.indexOf('iOS') != -1) {
        ios = true;
      } else {
        ios = false;
      }
    },
  });
  return ios;
}

/**
 * 判断是否是JSON字符串
 * @param str 
 * @returns 
 */
export const typeJsonString = (str) => {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      // 等于这个条件说明就是JSON字符串 会返回true
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        //不是就返回false
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}

export const dateFormat = (date) => { 
  const year = date.getFullYear();
  //getMonth()从零开始
  const month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return year + "-" + month + "-" + day;
}
