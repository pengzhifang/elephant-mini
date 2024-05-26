import { Login } from '../configs';
import { BaseService } from '.';
import {
  GetOpenIdParams,
  GetOpenIdData,
  RegisterParams,
} from './types';

/**
 * 登录相关
 */
export class LoginService extends BaseService {
  constructor() {
    super();
  }

  /**
   * 登录-包含获取openId
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
   * 注册
   * @param params 请求参数
   */
  register(params: RegisterParams) {
    return this.post<string>(
      Login.register,
      params,
      this.getRequestHeaders(params),
    );
  }

  /**
   * 获取用户信息
   * @param params 请求参数
   */
  getUserInfo() {
    return this.get<string>(Login.getUserInfo);
  }

  /**
   * 修改用户信息
   * @param params 请求参数
   */
  updateUserInfo(params: any) {
    return this.post<string>(
      Login.updateUserInfo,
      params,
    );
  }
}
