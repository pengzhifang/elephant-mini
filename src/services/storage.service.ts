import {
  getStorageSync,
  removeStorageSync,
  setStorageSync,
} from '@tarojs/taro';
import { storageKey } from '../configs';
import { UserInfo } from './types';

/**
 * 本地存储相关
 */
class StorageService {
  set<T = any>(key: string, value: T) {
    setStorageSync(key, value);
  }

  get<T = any>(key: string) {
    return getStorageSync<T>(key);
  }

  remove(key: string) {
    removeStorageSync(key);
  }

  /**
   * 清理本地设置
   */
  clearLocalInfo() {
    this.removeToken();
    this.removeUserInfo();
  }

  /**
   * 设置 token
   * @param token token
   */
  setToken(token: string) {
    this.set(storageKey.token, token);
  }

  /**
   * 获取本地存储的 token
   */
  getToken() {
    return this.get<string | undefined>(storageKey.token);
  }

  /**
   * 清除本地token
   */
  removeToken() {
    this.remove(storageKey.token);
  }


  /**
   * 存储openid
   * @param data openid
   */
  setOpenid(data: string) {
    this.set(storageKey.openid, data);
  }

  /**
   * 获取openid
   */
  getOpenid() {
    return this.get<string | undefined>(storageKey.openid);
  }

  /**
   * 清理openid
   */
  removeOpenid() {
    this.remove(storageKey.openid);
  }

  /**
   * 存储UserInfo
   * @param data UserInfo
   */
  setUserInfo(data: any) {
    this.set(storageKey.userInfo, data);
  }

  /**
   * 获取UserInfo
   */
  getUserInfo() {
    return this.get(storageKey.userInfo);
  }

  /**
   * 清理UserInfo
   */
  removeUserInfo() {
    this.remove(storageKey.userInfo);
  }

}

/**
 * 本地存储相关
 */
export const storage = new StorageService();
