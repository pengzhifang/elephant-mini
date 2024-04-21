import { BaseEventOrig, Button, View } from '@tarojs/components';
import { login } from '@tarojs/taro';
import { ButtonProps } from '@tarojs/components/types';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { LoginService, storage } from '../../services';
import { formatPhone, logUtil } from '../../utils';
import { useLoading, useToast } from '../../hooks';
import { AppletType } from '../../services/types';

import './authorized-phone.scss';

export interface Props extends ButtonProps {
  /**
   * 是否展示
   */
  isShow: boolean;
  /**
   * 文本内容
   */
  text?: string;
  /**
   * 是否需要动画
   */
  needAnimate?: boolean;
  /**
   * 是否拦截
   */
  intercept?: boolean;
  /**
   * 拦截时的回调函数
   */
  interceptFn?: () => void;
  /**
   * 授权成功时的回调
   */
  onSuccess?: (phone: string, code: string) => void;
  /**
   * 取消授权/授权失败的回调
   */
  onFailed?: () => void;
}

/**
 * 授权获取手机号
 */
const AuthorizedPhone = (props: PropsWithChildren<Props>) => {
  const {
    isShow,
    needAnimate = true,
    text = '获取手机号',
    intercept = false,
    interceptFn = () => { },
    onSuccess = () => { },
    onFailed = () => { },
  } = props;

  const [openid, setOpenid] = useState('');

  const { current: loginService } = useRef(new LoginService());

  const [showLoading, hideLoading] = useLoading();
  const toast = useToast();

  useEffect(() => {
    if (!isShow) return;

    login({
      success: (res) => {
        const { code } = res;

        loginService.getOpenId({ jsCode: code, appletType: AppletType.ctcsol }).then((res) => {
          const { result, code, msg, data } = res;

          if (result && data?.openid) {
            hideLoading();
            setOpenid(data.openid);
            storage.setOpenid(data.openid);

            logUtil.info('getOpenId', res);
          } else {
            toast({
              title: `${code}: ${msg}`,
              icon: 'none',
            });
            logUtil.error('getOpenId', res);
          }
        });
      },
      fail: (res) => {
        console.log(res);
        toast({
          title: '微信授权失败',
          icon: 'none',
        });
      },
    });
  }, [isShow]);

  /**
   * 授权获取手机号
   * @param event 事件
   */
  const onGetPhoneNumber = async (
    event: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>,
  ) => {
    if (!openid) {
      toast({ title: '接口请求中, 请稍后重试', icon: 'none', mask: true });
      return;
    }

    const { detail } = event;
    const { errMsg, iv, encryptedData } = detail;

    if (errMsg === 'getPhoneNumber:ok') {
      showLoading({ title: '获取中', mask: true });

      // 授权登录逻辑
      const res = await loginService.getPhoneNumber({
        iv,
        encryptedData,
        hlAppletOpenId: openid,
        appletType: AppletType.ctcsol
      });

      const { result, data, code, msg } = res;

      hideLoading();

      if (result && data) {
        const phone = data;
        onSuccess(formatPhone(phone, '86'), '86');
        logUtil.info('onGetPhoneNumber', res);
      } else {
        toast({
          title: `${code}: ${msg}`,
          icon: 'none',
        });
        logUtil.error('onGetPhoneNumber', res);
        return;
      }
    } else {
      onFailed();
    }
  };

   /**
    * pointer-events: none 拦截回调
    */
   const toInterceptFn = () => {
    intercept && interceptFn && interceptFn();
  }

  return (
    <View onClick={toInterceptFn}>
      <Button
        {...props}
        className={classNames(props.className, 'authorized-phone', {
          show: isShow,
          animate: needAnimate,
          noevent: intercept
        })}
        openType='getPhoneNumber'
        onGetPhoneNumber={onGetPhoneNumber}
      >
        {props.children ? props.children : text}
      </Button>
    </View>
  );
};

export default AuthorizedPhone;
