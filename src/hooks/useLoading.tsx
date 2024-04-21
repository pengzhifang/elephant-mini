import Taro from '@tarojs/taro';
import { useCallback } from 'react';

/**
 * loading 钩子
 * @description 用于展示/隐藏loading
 * @returns [showLoading, hideLoading]
 */
export const useLoading = (): [
  (options?: Taro.showLoading.Option) => void,
  (options?: Taro.hideLoading.Option) => void,
] => {
  /**
   * 展示loading
   */
  const showLoading = useCallback((options?: Taro.showLoading.Option) => {
    Taro.showLoading(options);
  }, []);

  /**
   * 隐藏loading
   */
  const hideLoading = useCallback((options?: Taro.hideLoading.Option) => {
    Taro.hideLoading(options);
  }, []);

  return [showLoading, hideLoading];
};
