import {
  authorize,
  canvasToTempFilePath,
  getSetting,
  saveImageToPhotosAlbum,
} from '@tarojs/taro';
import { useCallback } from 'react';
import { useLoading } from './useLoading';
import { useToast } from './useToast';

/**
 * 用于保存到本地的图片信息
 */
export interface ImageInfo {
  /**
   * 宽度
   */
  width: number;
  /**
   * 高度
   */
  height: number;
  /**
   * canvas-id
   */
  canvasId: string;
}

/**
 * 保存图片钩子
 * @description 用于图片保存时, 相关权限校验及保存提示
 */
export const useSaveImage = () => {
  const toast = useToast();
  const [showLoading] = useLoading();

  /**
   * 检查是否有相册权限
   * @param imgInfo 图片信息
   * @param onSuccess 成功回调
   * @param onFailed 失败回调
   */
  const checkSetting = useCallback(
    (imgInfo: ImageInfo, onSuccess: () => void, onFiled: () => void) => {
      getSetting({
        success: () => {
          authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              saveToAlbum(imgInfo, onSuccess, onFiled);
            },
            fail: () => {
              // 授权失败 不能保存图片
              toast({
                title: '请进入右上角小程序设置，打开图片保存权限',
                icon: 'none',
                mask: true,
                duration: 3000,
              });

              onFiled();
            },
          });
        },
      });
    },
    [],
  );

  /**
   * 存储至相册
   * @param imgInfo 图片信息
   * @param onSuccess 成功回调
   * @param onFailed 失败回调
   */
  const saveToAlbum = useCallback(
    (imgInfo: ImageInfo, onSuccess: () => void, onFailed: () => void) => {
      const { width, height, canvasId } = imgInfo;

      canvasToTempFilePath({
        canvasId,
        x: 0,
        y: 0,
        width,
        height,
        destWidth: width,
        destHeight: height,
        success: (res) => {
          let imgUrl = res.tempFilePath;
          saveImageToPhotosAlbum({
            filePath: imgUrl,
            success: () => {
              toast({ title: '保存成功', icon: 'success', mask: true });

              onSuccess();
            },
            fail() {
              toast({ title: '保存失败', icon: 'none', mask: true });

              onFailed();
            },
          });
        },
        fail: onFailed,
      });
    },
    [],
  );

  /**
   * 保存图片
   * @param imgInfo 图片信息
   * @param onSuccess 成功回调
   * @param onFailed 失败回调
   */
  const saveImage = useCallback(
    (
      imgInfo: ImageInfo,
      onSuccess: () => void = () => {},
      onFailed: () => void = () => {},
    ) => {
      console.log('开始存储图片...');

      showLoading({ title: '保存中', mask: true });

      checkSetting(imgInfo, onSuccess, onFailed);
    },
    [],
  );

  return saveImage;
};
