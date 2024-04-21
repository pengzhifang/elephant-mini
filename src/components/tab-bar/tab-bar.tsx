import { Image, Text, View } from '@tarojs/components';
import classNames from 'classnames';

import { routerPath } from '../../configs';
import { OpenType, useNavigator, useToast } from '../../hooks';
import { AddClsClueParams, LoginData, OpenIdType } from '@/services/types';
import iconHome from './images/ico_home@2x.png';
import iconHomeDefault from './images/ico_home_n@2x.png';
import iconShuati from './images/ico_shuati@2x.png';
import iconShuatiDefault from './images/ico_shuati_n@2x.png';
import iconZiliao from './images/ico_ziliao@2x.png';
import iconZiliaoDefault from './images/ico_ziliao_n@2x.png';


import './tab-bar.scss';
import { useState } from 'react';
import { storage } from '@/services/storage.service';
import React from 'react';
import { LoginService } from '@/services/index';
import { appDecryptAESToObj, logUtil } from '@/utils/index';
const loginService = new LoginService();

export interface Props {
  /**
   * 选中的标签
   */
  selected: string;
}

const TabBar = (props: Props) => {
  const { selected } = props;

  const { navigate } = useNavigator();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toast = useToast();

  /**
   * 跳转至首页
   */
  const toHome = () => {
    navigate({
      url: routerPath.home,
      openType: OpenType.redirect,
    });
  }

  /**
   * 跳转至领资料落地页
   */
  const toDrainage = () => {
    // navigate({
    //   url: routerPath.drainage,
    //   openType: OpenType.navigate,
    //   params: { from: 'material' }
    // });
  }


  /**
   * 跳转题库首页
   */
  const toQuestion = () => {
    const token = storage.getToken();
    // if (token) {
    //   navigate({
    //     url: routerPath.question,
    //     openType: OpenType.navigate,
    //   });
    // } else {
    //   setShowLoginModal(true);
    // }
  }

  /**
     * 上报用户数据
     * @param phone 手机号
     * @param code 手机区号
     * @param wxCode 微信号
     */
  const submitUserInfo = (phone: string, code: string, wxCode?: string) => {

    const params: AddClsClueParams = {
      parentMobile: phone,
      countryCode: `+${code}`,
      intentionCourseType: '68',
      channelCodeTwo: '668978'
    };

    // 只有存在数据时，传入生成验签
    // 否则验签校验会失败
    const promoCode = storage.getPromoCode();
    if (promoCode) {
      params.recommendCode = promoCode;
    }
    if (wxCode) {
      params.wxNumber = wxCode;
    }


    console.log('上报入参: ', params);
    logUtil.info('addClsClueParams', params);

    loginService.addClsClue(params).then((res) => {
      const { result, code, msg } = res;

      if (result) {
        setShowLoginModal(false);
        // navigate({
        //   url: routerPath.drainage,
        //   openType: OpenType.navigate,
        //   params: { from: 'material' }
        // });
        logUtil.info('addClsClue', res);
      } else {
        toast({
          title: `${code}: ${msg}`,
          icon: 'none',
        });
        logUtil.error('addClsClue', res);
      }
    });
  };

  /**
   * 家长appleId登录绑定
   * @param loginData 
   */
  const loginByAppledId = (loginData) => {
    const token = storage.getToken();
    const { phoneNumber, areaCode, vcodeNum, wxNumber } = loginData;
    if (token) {
      submitUserInfo(phoneNumber, areaCode, wxNumber);
    } else {
      const params = {
        mobile: phoneNumber,
        smsCode: vcodeNum,
        channelCodeOne: '77', //国际教室中文
        channelCodeTwo: '85', //ctc引流题库
        ccChannel: '668978', //cc商机二级渠道编码
        type: OpenIdType.openId,
        appId: process.env.TARO_APP_ID,
        token: storage.getOpenid()
      }
      loginService.loginByAppleId(params).then(res => {
        const { result, code, msg } = res;
        if (result) {
          formatUserInfo(appDecryptAESToObj(res.data));
          submitUserInfo(phoneNumber, areaCode, wxNumber);
          logUtil.info('loginByAppleId', res);
        } else {
          toast({
            title: `${code}: ${msg}`,
            icon: 'none',
          });
          logUtil.error('loginByAppleId', res);
        }
      })
    }
  }

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
    if (promoCode) {
      storage.setPromoCode(promoCode);
    }
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

  return (<React.Fragment>
    <View className='tab-bar bg-[#F6F8FB] px-[60px]'>
      <View onClick={toHome} className='flex flex-col'>
        <Image className='w-[25px] h-[24px] mb-[4px]' src={selected === 'home' ? iconHome : iconHomeDefault} />
        <Text className={classNames('text-[14px] font-PF text-[#34332E]', {'!text-[#2D74FF]': selected === 'home'})}>首页</Text>
      </View>
      <View onClick={toDrainage} className='flex flex-col items-center w-[60px] h-[110px] relative bottom-[5px] left-[5px]'>
        <Image className='w-[60px] h-[60px] mb-[4px]' src={selected === 'ziliao' ? iconZiliao : iconZiliaoDefault} />
        <Text className={classNames('text-[14px] font-PF text-[#34332E]', {'!text-[#2D74FF]': selected === 'ziliao'})}>领资料</Text>
      </View>
      <View onClick={toQuestion} className='flex flex-col'>
        <Image className='w-[25px] h-[25px] mb-[4px]' src={selected === 'question' ? iconShuati : iconShuatiDefault} />
        <Text className={classNames('text-[14px] font-PF text-[#34332E]', {'!text-[#2D74FF]': selected === 'question'})}>刷题</Text>
      </View>
    </View>
  </React.Fragment>)
}

export default TabBar;