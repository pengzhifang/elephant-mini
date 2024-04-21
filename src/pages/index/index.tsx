import { useEffect, useRef } from 'react';
import { login, useRouter } from '@tarojs/taro';

import { LoginService, storage } from '../../services';
import { OpenType, useLoading, useNavigator, useToast } from '../../hooks';
import { AppletType, LoginData, OpenIdType } from '../../services/types';
import { appDecryptAESToObj, logUtil } from '../../utils';
import { PageType, routerPath } from '../../configs';
import process from 'process';
import './index.scss';

/**
 * 小程序入口页
 */
export default function Index() {
  const [showLoading, hideLoading] = useLoading();
  const toast = useToast();
  const { navigate } = useNavigator();

  const { params } = useRouter();

  const { current: loginService } = useRef(new LoginService());

  // 清理本地缓存
  useEffect(() => {
    storage.clearLocalInfo();
    navigate({
      url:routerPath.home,
      openType: OpenType.redirect,
      params,
    });
  }, []);

  // 尝试 openid 登录
  useEffect(() => {
    showLoading({ title: '加载中', mask: true });

    console.log('小程序入参: ', params);

    // tryLogin();

    logUtil.info('miniEntryParams', params);
  }, []);

  /**
   * 尝试使用openid登录
   */
  const tryLogin = () => {
    const openid = storage.getOpenid();

    if (openid) {
      loginByOpenid(openid);
    } else {
      login({
        success: (res) => {
          const { code } = res;

          loginService.getOpenId({ jsCode: code, appletType: AppletType.drainage }).then((res) => {
            const { result, code, msg, data } = res;

            if (result && data?.openid) {
              console.log(data.openid, 'openid')
              loginByOpenid(data.openid);
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
    }
  };

  /**
   * 通过 openid 登录
   * @param openId 小程序 openid
   */
  const loginByOpenid = (openId: string) => {
    loginService
      .loginByOpenid({ appId: process.env.TARO_APP_ID, type: OpenIdType.openId, token: openId })
      .then((res) => {
        const { result, data } = res;

        if (result && data) {
          formatUserInfo(appDecryptAESToObj(data));
        }

        navigate({
          url:routerPath.home,
          openType: OpenType.redirect,
          params,
        });
      });
  };

  /**
   * 登录成功后处理数据
   * @param data 用户数据
   */
  const formatUserInfo = async (data: LoginData) => {
    console.log('用户信息: ', data);

    const { parentInfo, token, newUser, studentList } = data;
    const {
      mobile,
      internationalAreaCode: countryCode,
      email,
      parentNum,
      promoCode,
    } = parentInfo;
    storage.setParentNum(parentNum);
    storage.setNewUser(newUser);
    storage.setToken(token);
    storage.setPromoCode(promoCode);
    storage.setUserPhoneInfo({ phone: mobile, code: countryCode || '+86' });
    if (email) storage.setUserMail(email);

    if (studentList.length > 0) {
      const stuInfo = studentList.find((value) => value.active === 1) || studentList[0];

      if (!stuInfo) return;

      const { stuNum, name, headImg } = stuInfo;
      storage.setStuNum(stuNum);
      storage.setUserInfo({ name, headImg });
    }
  };

  /**
   * 跳转至需要的页面
   */
  const toPages = () => {
    let url = '';

    // switch (params.pageType) {
    //   case PageType.drainage:
    //     url = routerPath.drainage;
    //     break;
     
    // }

    hideLoading();

    navigate({
      url,
      openType: OpenType.redirect,
      params,
    });
  };

  return <></>;
}
