import { View, Image, Input, Textarea } from "@tarojs/components";
import dingweiIcon from '@/images/icon_dingwei1.png';
import carIcon from '@/images/icon_qiche.png';
import photoIcon from '@/images/icon_xiangji.png';
import arrowIcon from '@/images/ico_more@2x.png';
import './index.scss'
import { OpenType, useNavigator } from "@/hooks/index";
import { routerPath } from "@/configs/router.config";

const AppointmentOrder = () => {
  const { navigate } = useNavigator();

  const confirm = () => {
    navigate({
      url: routerPath.submit,
      openType: OpenType.navigate,
      params: {  }
    });
  }

  return (
    <View className="w-screen min-h-screen bg-[#F7F9FF] px-[15px] pb-[20px] font-PF text-999">
      <View className="bg-white pl-[6px] pt-[18px] pb-[10px] flex items-center">
        <Image src={dingweiIcon} className="w-[78px] h-[92px] mr-[18px]"></Image>
        <View className="text-333">
          <View className="font-medium">华润橡树湾A区</View>
          <View className="mt-[2px] text-[12px]">所属物业：广州恒大物业</View>
          <View className="mt-[2px] text-[12px]">所属地区：广州市白云区XX街道</View>
          <View className="mt-[2px] text-[12px]">详细地址：西土城路86号</View>
        </View>
      </View>
      <View className="mt-[20px] pt-[10px] px-[15px] order-info">
        <View className="flex items-center justify-between">
          <View className="flex items-center">
            <View className="w-[3px] h-[12px] rounded-[2px] bg-[#0091FF]"></View>
            <View className="font-semibold text-333 ml-[5px]">联系人</View>
          </View>
          <Input className='text-right text-999 placeholder:font-PF placeholder:text-999' placeholder="请输入" />
        </View>
        <View className="mt-[30px] flex items-center justify-between">
          <View className="flex items-center">
            <View className="w-[3px] h-[12px] rounded-[2px] bg-[#0091FF]"></View>
            <View className="font-semibold text-333 ml-[5px]">联系方式</View>
          </View>
          <Input className='text-right text-999 placeholder:font-PF placeholder:text-999' placeholder="请输入11位手机号" />
        </View>
        <View className="mt-[30px] flex items-center justify-between">
          <View className="flex items-center">
            <View className="w-[3px] h-[12px] rounded-[2px] bg-[#0091FF]"></View>
            <View className="font-semibold text-333 ml-[5px]">期望清运时间</View>
          </View>
          <View className="flex items-center">
            <View>请选择</View>
            <Image src={arrowIcon} className="w-[15px] h-[15px] ml-[5px]"></Image>
          </View>
        </View>
        <View className="mt-[30px]">
          <View className="flex items-center">
            <View className="w-[3px] h-[12px] rounded-[2px] bg-[#0091FF]"></View>
            <View className="font-semibold text-333 ml-[5px]">车辆选择</View>
          </View>
          <View className="mt-[10px] pl-[20px] py-[15px]">
            <View className="text-center text-[18px] text-333 font-semibold">小型车</View>
            <View className="mt-[30px] flex items-center">
              <Image className="w-[106px] h-[82px] " src={carIcon}></Image>
              <View className="ml-[30px] text-center">
                <View className="text-999 text-[14px]">能装约80～100袋</View>
                <View className="text-999 text-[14px]">装修垃圾</View>
                <View className="text-[#0091FF] text-[18px] font-semibold">¥700</View>
                <View className="text-999 text-[12px] mt-[10px]">袋参考标准：75厘米*45厘米</View>
              </View>
            </View>
          </View>
        </View>
        <View className="mt-[30px]">
          <View className="flex items-center">
            <View className="w-[3px] h-[12px] rounded-[2px] bg-[#0091FF]"></View>
            <View className="font-semibold text-333 ml-[5px]">请拍照上传垃圾图片</View>
          </View>
          <View className="mt-[10px] w-[142px] h-[142px] flex items-center justify-center">
            <Image src={photoIcon} className="w-[40px] h-[35px]"></Image>
          </View>
        </View>
        <View className="mt-[30px]">
          <View className="flex items-center">
            <View className="w-[3px] h-[12px] rounded-[2px] bg-[#0091FF]"></View>
            <View className="font-semibold text-333 ml-[5px]">备注</View>
          </View>
          <Textarea className="w-full h-[52px] mt-[10px] border border-solid border-999 rounded-[10px] opacity-50"></Textarea>
        </View>
        <View className="h-[54px] mt-[30px] rounded-[10px] bg-[#0091FF] flex items-center justify-center text-white" onClick={confirm}>确认</View>
      </View>
    </View>
  )
}

export default AppointmentOrder;