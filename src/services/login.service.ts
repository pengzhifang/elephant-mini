import { Login } from '../configs';
import { BaseService } from '.';
import {
  AddClsClueParams,

  GetCountryCodeData,
  GetOpenIdParams,
  GetPhoneNumberParams,
  
  LoginByOpenidParams,
  BindOpenidParams,
  GetOpenIdData,
  LoginByMobileAuthParams,
  LoginData,
} from './types';
import { appEncryptAESByObj } from '../utils';

/**
 * 登录相关
 */
export class LoginService extends BaseService {
  constructor() {
    super();
  }

  /**
   * 获取 openId
   * @param params 获取 openId 请求参数
   */
  getOpenId(params: GetOpenIdParams) {
    return this.get<GetOpenIdData>(
      Login.getOpenid,
      params,
      this.getRequestHeaders(params),
    ).then();
  }

  /**
   * 授权获取用户手机号
   * @param params 请求参数
   */
  getPhoneNumber(params: GetPhoneNumberParams) {
    return this.post<string>(
      Login.getPhoneNumber,
      params,
      this.getRequestHeaders(params),
    );
  }

  /**
   * 家长AppleId登录注册绑定
   * @param params 请求参数
   * @description 返回数据为AES加密数据
   */
  loginByAppleId(params) {
    return this.post<string>(
      Login.loginByAppleId,
      appEncryptAESByObj(params),
    );
  }
  

  /**
   * 手机号授权登录
   * @param params 请求参数
   * @description 接口需要签名
   */
  loginByMobileAuth(params: LoginByMobileAuthParams) {
    return this.get<LoginData>(
      Login.loginByMobileAuth,
      params,
      this.getRequestHeaders(params),
    );
  }

  /**
   * 通过 openid 登录
   * @param params 请求参数
   * @description 返回数据为AES加密数据
   */
  loginByOpenid(params: LoginByOpenidParams) {
    return this.post<string>(Login.loginByOpenid, appEncryptAESByObj(params));
  }



  /**
   * 中文token转换为比邻token
   * @description 不用签名sign,ts,  header中带上中文token
   * @param params 请求参数
   */
  convertToken() {
    return this.put<string>(Login.convertToken);
  }


  /**
   * 绑定openid
   * @param params 请求参数
   */
  bindOpenid(params: BindOpenidParams) {
    return this.post<null>(Login.bindOpenid, params);
  }
}
