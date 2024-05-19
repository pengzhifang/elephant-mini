/**
 * request请求参数
 */
export interface FetchOptions {
  url: string;
  data?: string | object | ArrayBuffer;
  header?: object;
  method?:
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';
  dataType?: string;
  responseType?: string;
}

/**
 * 通用返回
 */
export interface BaseResponse<R = boolean, T = any> {
  result: R;
  status: number; // 返回码
  msg: string; // 返回消息
  data: T; // 返回数据
}

/**
 * 基础列表返回数据
 */
export interface BaseListResponse<T = any> {
  startRow: number;
  navigatepageNums: number[];
  /**
   * 上一页页码
   */
  prePage: number;
  /**
   * 是否有下一页
   */
  hasNextPage: boolean;
  /**
   * 下一页页码
   */
  nextPage: number;
  pageSize: number;
  endRow: number;
  /**
   * 列表数据
   */
  list: T[];
  /**
   * 当前页码
   */
  pageNum: number;
  navigatePages: number;
  /**
   * 总数
   */
  total: number;
  navigateFirstPage: number;
  pages: number;
  size: number;
  /**
   * 是否为最后一页
   */
  isLastPage: boolean;
  /**
   * 是否有上一页
   */
  hasPreviousPage: boolean;
  navigateLastPage: number;
  /**
   * 是否为第一页
   */
  isFirstPage: number;
}
