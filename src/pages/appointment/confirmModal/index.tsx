import { View, Image } from "@tarojs/components";
import modalBg from '@/images/modal_bg.png';
import { OpenType, useNavigator } from "@/hooks/index";
import { routerPath } from "@/configs/router.config";

const ConfirmModal = () => {
  const { navigate } = useNavigator();

  const confirm = () => {
    navigate({
      url: routerPath.appointmentOrder,
      openType: OpenType.navigate,
      params: {  }
    });
  }

  return (
    <View className='fixed left-0 top-0 w-screen h-screen flex flex-col justify-center items-center bg-rgba02'>
      <View className='w-[230px] h-[230px] p-[20px] bg-white rounded-[10px] relative font-PF text-[#999]'>
        <Image src={modalBg} className='w-full h-[72px] absolute top-0 left-0 z-0'></Image>
        <View className="relative z-1">
          <View className="text-center text-[#333] font-medium">信息确认</View>
          <View className="mt-[20px] font-medium text-center">华润橡树湾A区</View>
          <View className="mt-[10px] text-[12px]">所属物业：广州恒大物业</View>
          <View className="mt-[5px] text-[12px]">所属地区：广州市白云区XX街道</View>
          <View className="mt-[5px] text-[12px]">详细地址：西土城路86号</View>
          <View className="mt-[22px] flex items-center">
            <View className="w-[85px] h-[36px] rounded-[4px] border border-solid border-[#0091FF] flex items-center justify-center text-[14px] font-semibold text-[#0091FF]">取消</View>
            <View className="w-[85px] h-[36px] rounded-[4px] bg-[#0091FF] flex items-center justify-center ml-[20px] text-[14px] text-white font-semibold" onClick={confirm}>确认</View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ConfirmModal;