import { View, Image, Input, Text } from "@tarojs/components";
import navigationBarBg from '@/images/image_dingbu.png';
import tipsIcon from '@/images/icon_gantanhao.png'
import { OpenType, useNavigator, useToast } from "@/hooks/index";
import { routerPath } from "@/configs/router.config";
import { useState } from "react";
import Taro from "@tarojs/taro";
import { LoginService } from "@/services/login.service";
import { storage } from "@/services/storage.service";

const loginService = new LoginService();

const EditUserInfo = () => {
  const userInfo = storage.getUserInfo();
  const { navigate } = useNavigator();
  const toast = useToast();
  const [userName, setUserName] = useState(userInfo.name);
  
  const confrim = async () => {
    if(!userName) {
      toast({ title: '请输入姓名', icon: 'none', mask: true });
      return;
    }
    
    const res = await loginService.updateUserInfo({
      userCode: userInfo.userCode,
      name: userName
    });
    const { result, status, message } = res;
    if(result) {
      const res1 = await loginService.getUserInfo();
      const { result: result1, data: data1, status: status1, message: msg1 } = res1;
      if(result1) {
        toast({
          title: `更新成功`,
          icon: 'none',
        });
        storage.setUserInfo(data1);
        navigate({
          url: routerPath.home,
          openType: OpenType.navigate,
          params: {  }
        });
      } else {
        toast({
          title: `${status1}: ${msg1}`,
          icon: 'none',
        });
      }
    }  else {
      toast({
        title: `${status}: ${message}`,
        icon: 'none',
      });
    }
  }

  const changeUserName = (event) => {
    setUserName(event.target.value);
  }

  return (
    <View className='w-screen h-screen p-[20px] bg-[#F6F8FB] font-PF'>
      {/* <Image className="absolute top-0 left-0 w-full z-[1]" src={navigationBarBg} /> */}
      <Input className='' placeholder="请输入姓名" value={userName} onInput={(event:any) => changeUserName(event)} />
      <View className="flex mt-[20px]">
        <Image src={tipsIcon} className="w-[12px] h-[12px] mr-[9px] mt-[5px] flex-shrink-0"></Image>
        <Text className="text-999 text-[14px]">为方便司机联系，请填写姓名或类似“XX先生/女士”称呼</Text>
      </View>
      <View className="w-[90%] h-[54px] rounded-[10px] bg-[#0091FF] flex items-center justify-center text-white absolute bottom-[30px]" onClick={confrim}>确认</View>
    </View>
  )
}

export default EditUserInfo;