import {
  getStorageSync,
  removeStorageSync,
  setStorageSync,
} from '@tarojs/taro';
import { storageKey } from '../configs';
import { NewUser, UserInfo } from './types';

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
    this.removePromoCode();
    this.removeParentNum();
    this.removeNewUser();
    this.removeUserPhoneInfo();
    this.removeUserMail();
    this.removeStuNum();
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
   * 存储推荐码
   * @param promoCode 推荐码
   */
  setPromoCode(promoCode: string) {
    this.set(storageKey.promoCode, promoCode);
  }

  /**
   * 获取推荐码
   */
  getPromoCode() {
    return this.get<string | undefined>(storageKey.promoCode);
  }

  /**
   * 清除推荐码
   */
  removePromoCode() {
    this.remove(storageKey.promoCode);
  }

  

  


  /**
   * 存储家长编号
   * @param data 编号
   */
  setParentNum(data: string) {
    this.set(storageKey.parentNum, data);
  }

  /**
   * 获取家长编号
   */
  getParentNum() {
    return this.get<string | undefined>(storageKey.parentNum);
  }

  /**
   * 清除存储的家长编号
   */
  removeParentNum() {
    this.remove(storageKey.parentNum);
  }

  /**
   * 存储新用户标识
   */
  setNewUser(data: NewUser) {
    this.set(storageKey.newUser, data);
  }

  /**
   * 获取新用户标识
   */
  getNewUser() {
    return this.get<string | undefined>(storageKey.newUser);
  }

  /**
   * 清除存储的新用户标识
   */
  removeNewUser() {
    this.remove(storageKey.newUser);
  }

  /**
   * 存储用户手机号信息
   * @param data 手机号信息
   */
  setUserPhoneInfo(data: { phone: string; code: string }) {
    this.set(storageKey.phoneInfo, data);
  }

  /**
   * 获取用户手机号信息
   */
  getUserPhoneInfo() {
    return this.get<{ phone: string; code: string } | undefined>(
      storageKey.phoneInfo,
    );
  }

  /**
   * 清理用户手机号信息
   */
  removeUserPhoneInfo() {
    this.remove(storageKey.phoneInfo);
  }

  /**
   * 存储用户邮箱信息
   * @param data 邮箱信息
   */
  setUserMail(data: string) {
    this.set(storageKey.userEmail, data);
  }

  /**
   * 获取用户邮箱信息
   */
  getUserMail() {
    return this.get<string | undefined>(storageKey.userEmail);
  }

  /**
   * 清理用户邮箱信息
   */
  removeUserMail() {
    this.remove(storageKey.userEmail);
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
  setUserInfo(data: UserInfo) {
    this.set(storageKey.userInfo, data);
  }

  /**
   * 获取UserInfo
   */
  getUserInfo() {
    return this.get<UserInfo | undefined>(storageKey.userInfo);
  }

  /**
   * 清理UserInfo
   */
  removeUserInfo() {
    this.remove(storageKey.userInfo);
  }

  /**
   * 存储stuNum
   * @param data stuNum
   */
  setStuNum(data: string) {
    this.set(storageKey.stuNum, data);
  }

  /**
   * 获取stuNum
   */
  getStuNum() {
    return this.get<string | undefined>(storageKey.stuNum);
  }

  /**
   * 清理stuNum
   */
  removeStuNum() {
    this.remove(storageKey.stuNum);
  }

}

/**
 * 本地存储相关
 */
export const storage = new StorageService();
