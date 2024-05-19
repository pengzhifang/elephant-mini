import { Input, View, Image } from "@tarojs/components";
import dingweiIcon from  '../home/images/icon_dingwei.png';
import ConfirmModal from './confirmModal'
import { useState } from "react";

const Appointment = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <View className="w-screen h-screen bg-[#F7F9FF] p-[15px] font-PF text-[#999]">
      <View className="w-full h-full px-[15px] py-[20px] bg-white rounded-[14px] shadow-shadow1">
        <View className="text-[14px] font-medium mb-[15px]">目前仅开通广州市，其他区域敬请期待</View>
        <View className="relative">
          <Input className='h-[52px] rounded-[10px] border border-solid border-[#999] opacity-50 pl-[15px]' placeholder="请输入小区名进行检索" />
          <View className="w-[1px] h-[19px] bg-[#999] absolute right-[56px] top-1/2 transform -translate-y-1/2 opacity-50"></View>
          <View className="absolute right-[15px] top-1/2 transform -translate-y-1/2 text-center">
            <Image src={dingweiIcon} className="w-[11px] h-[15px] mb-[2px]"></Image>
            <View className="text-[12px]">定位</View>
          </View>
        </View>
        <View className="h-[54px] rounded-[10px] mt-[50px] bg-[#0091FF] flex items-center justify-center text-[18px] text-white font-semibold">确定</View>
        <View className='w-full text-[#999999] text-center text-[12px] absolute bottom-[30px]'>客服电话： 18888888888 （工作日 09:00-18:00）</View>
      </View>
      {showConfirm && <ConfirmModal></ConfirmModal>}
    </View>
  )
}

export default Appointment;