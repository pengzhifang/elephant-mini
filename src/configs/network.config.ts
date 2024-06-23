import process from 'process';
/**
 * 请求地址
 */
export const host = process.env.TARO_APP_HOST;

/**
 * 测试环境用户隐私协议地址
 */
export const PRIVACY_TEST = 'https://i.t.blingo.cc/en/privacy-policy.html';

/**
 * 正式环境用户隐私协议地址
 */
export const PRIVACY = 'https://i.blingo.cc/en/privacy-policy.html';

/**
 * 测试环境下载地址
 */
export const DOWNLOAD_TEST = 'https://i.t.blingo.cc/en/blingo/download';

/**
 * 正式环境下载地址
 */
export const DOWNLOAD = 'https://i.blingo.cc/en/blingo/download';

/**
 * 测试环境用户协议
 */
export const USER_AGREEMENT_TEST =
  'https://i.t.blingo.cc/en/register-policy.html';

/**
 * 正式环境用户协议
 */
export const USER_AGREEMENT = 'https://i.blingo.cc/en/register-policy.html';

/**
 * 登录相关
 */
export const Login = {
  /**
   * 获取 openid
   * @link http://120.76.248.231/doc.html#/API/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%8E%A5%E5%8F%A3/loginUsingGET_1
   */
  getOpenid: host + '/open-api/wx/v1/login',

  /**
   * 注册
   * @link http://120.76.248.231/doc.html#/API/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%8E%A5%E5%8F%A3/loginUsingPOST_2
   */
  register: host + '/open-api/wx/v1/register',
  /**
   * 获取用户信息
   * @link http://120.76.248.231/doc.html#/API/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86/updateUsingPOST_7
   */
  getUserInfo: host + '/user-api/user/v1/info',
  /**
   * 修改用户信息
   * @link http://120.76.248.231/doc.html#/API/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86/updateUsingPOST_7
   */
  updateUserInfo: host + '/user-api/user/v1/update',
};

/** 订单相关 */
export const Order = {
  getGeneralConfig: host + '/open-api/commonConfig/v1/query',
  getResidential: host + '/user-api/residential/v1/list',
  createOrder: host + '/user-api/order/v1/create',
  orderPay: host + '/user-api/order/v1/pay',
  orderCancel: host + '/user-api/order/v1/cancel',
  orderList: host + '/user-api/order/v1/list',
  orderPriceDetail: host + '/user-api/town/v1/detail',
}
