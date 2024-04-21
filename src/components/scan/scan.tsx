import { Image, MovableArea, MovableView, View } from '@tarojs/components';
import Taro, { useReady } from '@tarojs/taro';
import React, { useCallback, useState } from 'react';
import './scan.scss';

/**
 * 扫一扫二维码组件
 */
const Scan: React.FC<any> = (): JSX.Element => {
  const [windowData, setWindowData] = useState({});

  useReady(() => {
    setWindowData(Taro.getSystemInfoSync());
  })

  /**
   * 内置扫一扫功能，仅供测试阶段开放
   */
  const handleScanQRCode = useCallback(() => {
    Taro.scanCode({
      onlyFromCamera: false,
      success: (res) => {
        console.log('扫一扫', res);
        const { path } = res;
        if (!path) { return; }
        Taro.reLaunch({
          url: '/' + path
        });
      }
    });
  }, []);

  return (
    <MovableArea className='movable-area'>
      <View className='movable-page'>
        <MovableView
          y={(windowData as any).safeArea?.height - 160}
          x={(windowData as any).safeArea?.width - 120}
          className='scan'
          direction='all'
          onClick={() => handleScanQRCode()}
        >
          <Image src='https://img.blingabc.com/91b8fddf9409474eab2ecc7bdd8806d6.png' className='scan-icon' />
          <View className='scan-txt'>扫一扫</View>
        </MovableView>
      </View>
    </MovableArea>
  )
}

export default Scan;
