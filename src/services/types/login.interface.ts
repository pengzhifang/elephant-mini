import { CheckType } from './capctha.interface';

/**
 * 获取 openid 请求参数
 */
export interface GetOpenIdParams {
  /**
   * 临时 code
   */
  code: string;
}

/**
 * 获取 openid 返回数据
 */
export interface GetOpenIdData {
  /**
   * openid
   */
  openId: string;
  /**
   * 用户编码
   */
  userCode: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 手机号码
   */
  mobile: string;
  /**
   * 头像
   */
  avatarUrl: string;
  /**
   * 昵称
   */
  nickName: string;
  /**
   * 性别
   */
  gender: string;
  /**
   * token
   */
  token: string;
}

/**
 * 授权获取用户手机号的请求参数
 */
export interface RegisterParams {
  /**
   * 密文
   */
  // encryptedData: string;
  /**
   * 初始向量
   */
  // iv: string;
  /**
   * openId
   */
  openId: string;
  /** phoneData */
  phoneData: any;
}

/**
 * 登录返回数据
 */
export interface LoginData {
  /**
   * openid
   */
  openId: string;
  /**
   * 用户编码
   */
  userCode: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 手机号码
   */
  mobile: string;
  /**
   * 头像
   */
  avatarUrl: string;
  /**
   * 昵称
   */
  nickName: string;
  /**
   * 性别
   */
  gender: string;
  /**
   * token
   */
  token: string;
}
