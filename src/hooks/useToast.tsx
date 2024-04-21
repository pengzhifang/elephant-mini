import Taro from '@tarojs/taro';
import { useCallback } from 'react';

/**
 * toast 钩子
 * @description 用于提示弹框
 */
export const useToast = () => {
  const showToast = useCallback(
    (options?: Taro.showToast.Option) => Taro.showToast(options),
    [],
  );

  return showToast;
};
