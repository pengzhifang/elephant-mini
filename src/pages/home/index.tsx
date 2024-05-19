import { View, Image, Button } from '@tarojs/components'
import './index.scss';
import navigationBarBg from '@/images/image_dingbu.png';
import editIcon from '@/images/icon_bianji.png';
import dingweiIcon from '@/images/icon_dingwei1.png';
import yuyueIcon from '@/images/icon_yuyue.png';
import dingdanIcon from '@/images/icon_dingdan.png';
import { routerPath } from '@/configs/router.config';
import { OpenType, useNavigator } from '@/hooks/index';
import { useState } from 'react';

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { navigate } = useNavigator();

  const onGetPhoneNumber = () => {

  }

  /** 修改用户信息 */
  const editUserInfo = () => {
    navigate({
      url: routerPath.editUserinfo,
      openType: OpenType.navigate,
      params: {  }
    });
  }

  /** 立即预约 */
  const order = () => {
    navigate({
      url: routerPath.appointment,
      openType: OpenType.navigate,
      params: {  }
    });
  }

  return (
    <View className='w-screen h-screen p-[20px] bg-[#F6F8FB] font-PF font-medium'>
      <Image className="absolute top-0 left-0 w-full z-[1]" src={navigationBarBg} />
      {isLogin && <View className='z-[9] relative'>
        <View className='flex items-center'>
          <View className='mr-[10px]'>
            <Image className="w-[50px] h-[50px] rounded-[100%]" src={dingweiIcon} />
          </View>
          <View className="text-[#333]">
            <View className='flex items-center'>
              <View>微信用户</View>
              <Image className="w-[12px] h-[12px] ml-[10px]" src={editIcon} onClick={editUserInfo} />
            </View>
            <View className='text-[12px]'>18888888888</View>
          </View>
        </View>
        <View className='mt-[50px]'>
          <View className='text-center text-[#333] text-[20px]'>装修垃圾清运</View>
          <View className='text-center text-[#999] text-[14px] mt-[10px['>无害化处理，全程无忧，省心之选</View>
          <View className='w-[120px] h-[44px] bg-[#0091FF] rounded-[10px] flex items-center justify-center text-white mt-[20px] mx-[auto]' onClick={order}>立即预约</View>
        </View>
        <View className='mt-[40px] flex items-center'>
          <View className='flex flex-col items-center'>
            <Image className='w-[20px] h-[20px]' src={yuyueIcon}></Image>
            <View className='text-[14px] text-[#666] mt-[6px]'>清运预约</View>
          </View>
          <View className='flex flex-col items-center ml-[20px]'>
            <Image className='w-[20px] h-[20px]' src={dingdanIcon}></Image>
            <View className='text-[14px] text-[#666] mt-[6px]'>全部订单</View>
          </View>
        </View>
      </View>}
      {!isLogin && <View className='absolute top-[50%] w-full text-center'>
        <View className='text-[15px] mb-[10px]'>欢迎使用装修垃圾收运小程序</View>
        <Button
          className='w-[300px] h-[40px] bg-[#0091FF] rounded-[10px] flex items-center justify-center text-white'
          openType='getPhoneNumber'
          onGetPhoneNumber={onGetPhoneNumber}
        >
          <View className='btn'>微信授权登录</View>
        </Button>
      </View>}
      <View className='w-full text-[#999999] text-center text-[12px] absolute bottom-[30px]'>客服电话： 18888888888 （工作日 09:00-18:00）</View>
    </View>
  )
}

export default Home;