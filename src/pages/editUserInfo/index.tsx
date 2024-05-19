import { View, Image, Input, Text } from "@tarojs/components";
import navigationBarBg from '@/images/image_dingbu.png';
import tipsIcon from '@/images/icon_gantanhao.png'
import { OpenType, useNavigator } from "@/hooks/index";
import { routerPath } from "@/configs/router.config";

const EditUserInfo = () => {
  const { navigate } = useNavigator();
  
  const confrim = () => {
    navigate({
      url: routerPath.home,
      openType: OpenType.navigate,
      params: {  }
    });
  }

  return (
    <View className='w-screen h-screen p-[20px] bg-[#F6F8FB] font-PF'>
      {/* <Image className="absolute top-0 left-0 w-full z-[1]" src={navigationBarBg} /> */}
      <Input className='' placeholder="请输入姓名" />
      <View className="flex mt-[20px]">
        <Image src={tipsIcon} className="w-[12px] h-[12px] mr-[9px] mt-[5px] flex-shrink-0"></Image>
        <Text className="text-[#999] text-[14px]">为方便司机联系，请填写姓名或类似“XX先生/女士”称呼</Text>
      </View>
      <View className="w-[90%] h-[54px] rounded-[10px] bg-[#0091FF] flex items-center justify-center text-white absolute bottom-[30px]" onClick={confrim}>确认</View>
    </View>
  )
}

export default EditUserInfo;