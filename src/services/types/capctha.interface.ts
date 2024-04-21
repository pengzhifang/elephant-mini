/**
 * 校验请求参数
 */
export interface CheckTicketParams {
  /**
   * 校验类型
   */
  checkType: CheckType;
  /**
   * 用户验证票据
   */
  ticket: string;
  /**
   * web/app必填,小程序没有
   */
  randstr?: string;
}

/**
 * 校验类型
 */
export enum CheckType {
  /**
   * app/h5 登录
   */
  app = 'loginPwdApp',
  /**
   * web 登录
   */
  web = 'loginPwdWeb',
  /**
   * 验证码登录
   */
  code = 'loginCode',
}
