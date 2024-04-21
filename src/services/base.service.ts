import Taro from '@tarojs/taro';
import { Md5 } from 'ts-md5/dist/md5';
import { routerPath } from '../configs';
import { storage } from './storage.service';
import { logUtil as log, Router } from '../utils';
import { BaseResponse, FetchOptions } from './types';

export class BaseService {
  private _router = new Router();

  private request<R, T>(
    options: FetchOptions,
    completeCb?: (() => void) | undefined,
  ) {
    const token = storage.getToken();
    const header = {
      'content-type': 'application/json;charset=UTF-8',
      'service-name': 'ctcsol-applet',
      token
    };
    options.header = options.header ? { ...options.header, ...header } : header;
    return new Promise<BaseResponse<R, T>>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      Taro.request({
        ...options,
        success: (res) => {
          const data = res.data;
          if (res.statusCode === 401) {
            try {
              storage.clearLocalInfo();
              this._router.navigate({
                url: routerPath.index,
              });
            } catch (error) {
              console.error(error);
            }
            return;
          }
          if (
            data.code === 10000 ||
            data.code === '10000' ||
            data.status === 1000 ||
            data.status === '1000'
          ) {
            data.result = true;
          } else {
            data.result = false;
          }
          resolve(data);
          log.info(options.url, options.data, res);
        },
        fail: (err) => {
          reject(err);
          log.error(options.url, options.data, err);
        },
        complete: () => {
          if (typeof completeCb === 'function') {
            completeCb();
          }
        },
      });
    });
  }

  /**
   * GET请求
   * @param url 请求链接
   * @param data 请求参数
   * @param header 头部信息
   */
  get<T = any>(
    url: string,
    data?: string | object | ArrayBuffer,
    header: object = {},
  ) {
    const options: FetchOptions = {
      url,
      data,
      method: 'GET',
      header,
    };
    return this.request<true, T>(options).catch((error: any) => {
      return this.getErrorObj(error);
    });
  }

  /**
   * POST请求
   * @param url 请求链接
   * @param data 请求参数
   * @param header 头部信息
   */
  post<T = any>(
    url: string,
    data?: string | object | ArrayBuffer,
    header: object = {},
  ) {
    const options: FetchOptions = {
      url,
      data,
      method: 'POST',
      header,
    };
    return this.request<true, T>(options).catch((error: any) => {
      return this.getErrorObj(error);
    });
  }

  /**
   * PUT请求
   * @param url 请求链接
   * @param data 请求参数
   * @param header 头部信息
   */
  put<T = any>(
    url: string,
    data?: string | object | ArrayBuffer,
    header: object = {},
  ) {
    const options: FetchOptions = {
      url,
      data,
      method: 'PUT',
      header,
    };
    return this.request<true, T>(options).catch((error: any) => {
      return this.getErrorObj(error);
    });
  }

  private getErrorObj(error): BaseResponse<false, null> {
    return {
      result: false,
      code: 40001,
      msg: '网络异常' + error.errMsg,
      data: null,
    };
  }

  /**
   * 生成请求服务器需要的参数
   * @param params 参数
   */
  getRequestHeaders(params: Record<string, any> = {}) {
    const tempParams = Object.assign({}, params);
    tempParams['ts'] = Date.now().toString().substring(0, 10);
    const keys: any[] = [];
    for (const key in tempParams) {
      if (tempParams.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    let temp = '';
    keys.sort().map((key) => {
      temp += key + '=' + tempParams[key] + '&';
    });
    temp += 'app_key=' + process.env.TARO_APP_HEADKEY;
    console.log('temp--' + temp);
    const md = Md5.hashStr(temp);
    return {
      sign: md.toString().toLowerCase(),
      ts: tempParams['ts'] as string,
    };
  }
}
