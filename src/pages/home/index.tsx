import { View, Image, Button, BaseEventOrig, ButtonProps } from '@tarojs/components'
import './index.scss';
import navigationBarBg from '@/images/image_dingbu.png';
import editIcon from '@/images/icon_bianji.png';
import avatarIcon from '@/images/avatar.png';
import yuyueIcon from '@/images/icon_yuyue.png';
import dingdanIcon from '@/images/icon_dingdan.png';
import { routerPath } from '@/configs/router.config';
import { OpenType, useLoading, useNavigator, useToast } from '@/hooks/index';
import { useEffect, useReducer, useRef, useState } from 'react';
import { storage } from '@/services/storage.service';
import { LoginService } from '@/services/login.service';
import { logUtil } from '@/utils/log';
import { OrderService } from '@/services/order.service';
import { dateFormat } from '@/utils/utils';
import OrderItem from '../orderList/orderItem';
import Taro, { usePullDownRefresh } from '@tarojs/taro';

const orderService = new OrderService();

const Home = () => {
  const { navigate } = useNavigator();
  const toast = useToast();
  const { current: loginService } = useRef(new LoginService());
  const [isLogin, setIsLogin] = useState(false);
  const [showLoading, hideLoading] = useLoading();
  const [orderList, setOrderList] = useState<any>([]);
  const [isPullDownRefresh, setIsPullDownRefresh] = useReducer(x => x + 1, 0); // 是否触发下拉刷新
  const [userInfo, setUserInfo] = useState({
    avatarUrl: null,
    gender: null,
    mobile: null,
    name: null,
    nickName: null,
    userCode: null
  });
  const token = storage.getToken();

  usePullDownRefresh(() => {
    setIsPullDownRefresh();
    const timer = setTimeout(() => {
      clearTimeout(timer);
      Taro.stopPullDownRefresh(); // PS: 这里有个坑，下拉刷新不会自动关闭，只能自己模拟关闭
    }, 800);
  })

  useEffect(() => {
    if(token) {
      getOrderList();
    }
  }, [isPullDownRefresh])

  useEffect(() => {
    const userInfo = storage.getUserInfo();
    userInfo && setUserInfo(userInfo);
    if(token) {
      setIsLogin(true);
      getOrderList();
    } else {
      setIsLogin(false);
    }
  }, [])

  const onGetPhoneNumber = async (
    event: BaseEventOrig<ButtonProps.onGetPhoneNumberEventDetail>,
  ) => {
    showLoading({
      title: '加载中',
      mask: true,
    });

    const { detail } = event;
    const { errMsg, iv, encryptedData } = detail;
    console.log(event, '9999')
    if (errMsg === 'getPhoneNumber:ok') {
      // 授权登录逻辑
      const storageOpenId = storage.getOpenid() || '';
      const res = await loginService.register({
        openId: storageOpenId,
        phoneData: {
          iv,
          encryptedData,
          openId: storageOpenId,
        }
      });

      const { result, data, status, message } = res;

      if (result && data) {
        formatUserInfo(data);
        logUtil.info('onGetPhoneNumber', res);
      } else {
        toast({
          title: `${status}: ${message}`,
          icon: 'none',
        });
        logUtil.error('onGetPhoneNumber', res);
        return;
      }
    } else {
      // 手动登录
      console.log('login>>>>')
    }
  };

  /**
   * 登录成功后处理数据
   * @param data 用户数据
   */
  const formatUserInfo = async (data: any) => {
    const { userCode, name, mobile, avatarUrl, nickName, gender, token } = data;
    const userInfo = {
      userCode, name, mobile, avatarUrl, nickName, gender
    }
    storage.setUserInfo(userInfo);
    storage.setToken(token);
    hideLoading();
    setUserInfo(userInfo);
    setIsLogin(true);
  };

  /** 修改用户信息 */
  const editUserInfo = () => {
    navigate({
      url: routerPath.editUserinfo,
      openType: OpenType.navigate,
      params: {}
    });
  }

  /** 立即预约 */
  const order = () => {
    navigate({
      url: routerPath.appointment,
      openType: OpenType.navigate,
      params: {}
    });
  }

  /** 跳转订单列表 */
  const toOrderList = () => {
    navigate({
      url: routerPath.orderList,
      openType: OpenType.navigate,
      params: {}
    });
  }

  /** 获取未支付/已支付未完成订单 */
  const getOrderList = async () => {
    showLoading({
      title: '加载中',
      mask: true,
    });
    const res = await orderService.orderList({
      page: 1,
      size: 20
    });
    const { result, data, status, message } = res;
    if(result) {
      data.list?.map(item => {
        item.clearDate = dateFormat(new Date(item.clearDate))
      })
      console.log(data.list.filter(x => (x.payStatus === 0 || (x.payStatus >= 20 && x.payStatus < 50) )));
      setOrderList(data.list.filter(x => (x.payStatus === 0 || (x.payStatus >= 20 && x.payStatus < 50) )));
    } else {
      toast({
        title: `${status}: ${message}`,
        icon: 'none',
      });
    }
    hideLoading();
  }

  const callPhone = () => {
    Taro.makePhoneCall({
      phoneNumber: '13829707597',
      success: function (){
        console.log("成功拨打电话")
      }
    })
  }

  return (
    <View className='w-screen min-h-screen p-[20px] bg-[#F6F8FB] font-PF font-medium'>
      <Image className="absolute top-0 left-0 w-full z-[1]" src={navigationBarBg} />
      {isLogin && <View className='z-[9] relative'>
        <View className='flex items-center'>
          <View className='mr-[10px]'>
            <Image className="w-[50px] h-[50px] rounded-[100%]" src={avatarIcon} />
          </View>
          <View className="text-333">
            <View className='flex items-center'>
              <View>{ userInfo?.name || '微信用户'}</View>
              <Image className="w-[12px] h-[12px] ml-[10px]" src={editIcon} onClick={editUserInfo} />
            </View>
            <View className='text-[12px]'>{ userInfo?.mobile}</View>
          </View>
        </View>
        <View className='mt-[24px] w-full bg-white rounded-[14px] shadow-shadow3 pt-[25px] pb-[20px]'>
          <View className='text-center text-333 text-[20px]'>装修垃圾清运</View>
          <View className='text-center text-999 text-[14px] mt-[10px['>无害化处理，全程无忧，省心之选</View>
          <View className='w-[120px] h-[44px] bg-[#0091FF] rounded-[10px] flex items-center justify-center text-white mt-[20px] mx-[auto]' onClick={order}>立即预约</View>
        </View>
        <View className='mt-[40px] flex items-center mb-[20px]'>
          <View className='flex flex-col items-center' onClick={order}>
            <Image className='w-[20px] h-[20px]' src={yuyueIcon}></Image>
            <View className='text-[14px] text-666 mt-[6px]'>清运预约</View>
          </View>
          <View className='flex flex-col items-center ml-[20px]' onClick={toOrderList}>
            <Image className='w-[20px] h-[20px]' src={dingdanIcon}></Image>
            <View className='text-[14px] text-666 mt-[6px]'>全部订单</View>
          </View>
        </View>
        {
          orderList?.map(item => {
            return (
              <OrderItem item={item} payCallBack={() => getOrderList()}></OrderItem>
            )
          })
        }
      </View>}
      {!isLogin && <View className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full'>
        <View className='text-[15px] mb-[10px]'>欢迎使用装修垃圾收运小程序</View>
        <Button
          className='w-[300px] h-[40px] bg-[#0091FF] rounded-[10px] flex items-center justify-center text-white'
          openType='getPhoneNumber'
          onGetPhoneNumber={onGetPhoneNumber}
        >
          <View className='btn'>微信授权登录</View>
        </Button>
      </View>}
      <View className='w-full text-999 text-[12px] absolute bottom-[30px] flex justify-center items-center'>客服电话： <View className='underline' onClick={callPhone}>13829707597</View> （工作日 09:00-18:00）</View>
    </View>
  )
}

export default Home;