import * as Utf8 from 'crypto-js/enc-utf8';
import * as AES from 'crypto-js/aes';
import * as Pkcs7 from 'crypto-js/pad-pkcs7';
import * as CryptoJS from 'crypto-js';

// AES加密相关系数
export const AES_ENC_KEY = 'blingabcblingabc';
export const AES_ENC_IV = '0000000000000000';

/**
 * AES解密
 * @param data AES加密后的字符串
 * @param AES_ENC_KEY aes key
 * @param AES_ENC_IV aes iv
 * @returns 解密后的字符串
 */
export function decryptAES(
  data: string,
  AES_ENC_KEY: string,
  AES_ENC_IV: string,
): string {
  const key = Utf8.parse(AES_ENC_KEY);
  const iv = Utf8.parse(AES_ENC_IV);

  const decrypt = AES.decrypt(data, key, {
    iv,
    // 默认值: CBC
    // mode: CryptoJS.mode.CBC,
    padding: Pkcs7,
  });

  return decrypt.toString(Utf8);
}

/**
 * AES加密
 * @param data 需要进行AES加密的字符串
 * @param AES_ENC_KEY aes key
 * @param AES_ENC_IV aes iv
 * @returns 加密后的字符串
 */
export function encryptAES(
  data: string,
  AES_ENC_KEY: string,
  AES_ENC_IV: string,
): string {
  const key = Utf8.parse(AES_ENC_KEY);
  const iv = Utf8.parse(AES_ENC_IV);

  const encrypt = AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: Pkcs7,
  });

  return encrypt.toString();
}

/**
 * AES解密成单字段
 * @param str 需要解密的字符串
 */
export function appDecryptAES(str: string): string {
  return decryptAES(decodeURIComponent(str), AES_ENC_KEY, AES_ENC_IV);
}

/**
 * AES解密成对象
 * @param str 需要解密的字符串
 */
export function appDecryptAESToObj<T = any>(str: string): T {
  return JSON.parse(
    decryptAES(decodeURIComponent(str), AES_ENC_KEY, AES_ENC_IV),
  );
}

/**
 * AES加密成字符串
 * @param str 需要加密的字符串
 */
export function appEncryptAESByStr(str: string): string {
  return encryptAES(str, AES_ENC_KEY, AES_ENC_IV);
}

/**
 * AES加密成JSON字符串
 * @param params 需要加密的对象数据
 */
export function appEncryptAESByObj(params: object): string {
  if (typeof params !== 'object') {
    throw new Error('encrypt aes type error');
  }
  return encryptAES(JSON.stringify(params), AES_ENC_KEY, AES_ENC_IV);
}
