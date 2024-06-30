import { useEffect, useRef } from 'react';
import { login, useRouter } from '@tarojs/taro';
import { LoginService, storage } from '../../services';
import { OpenType, useLoading, useNavigator, useToast } from '../../hooks';
import { LoginData } from '../../services/types';
import { logUtil } from '../../utils';
import { routerPath } from '../../configs';
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
    navigate({
      url:routerPath.home,
      openType: OpenType.redirect,
      params,
    });
  }, []);

  // 尝试 openid 登录
  useEffect(() => {
    tryLogin();
    logUtil.info('miniEntryParams', params);
  }, []);

  /**
   * 登录
   */
  const tryLogin = () => {
    const token = storage.getToken();
    if (!token) {
      showLoading({ title: '加载中', mask: true });
      login({
        success: (res) => {
          const { code } = res;
          loginService.getOpenId({ code: code }).then((res) => {
            const { result, status, message, data } = res;
            if (result && data?.openId) {
              storage.setOpenid(data.openId);
              if(data.token) {
                formatUserInfo(data);
              }
              logUtil.info('getOpenId', res);
            } else {
              toast({
                title: `${status}: ${message}`,
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
   * 登录成功后处理数据
   * @param data 用户数据
   */
  const formatUserInfo = async (data: LoginData) => {
    const { userCode, name, mobile, avatarUrl, nickName, gender, token } = data;
    const userInfo = {
      userCode, name, mobile, avatarUrl, nickName, gender
    }
    storage.setUserInfo(userInfo);
    storage.setToken(token);
    hideLoading();
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
