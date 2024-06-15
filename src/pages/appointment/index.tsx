import { Input, View, Image } from "@tarojs/components";
import dingweiIcon from  '@/images/icon_dingwei.png';
import ConfirmModal from './confirmModal'
import { useEffect, useState } from "react";
import arrowIcon from '@/images/ico_more@2x.png';
import Taro, { requirePlugin, useDidShow } from "@tarojs/taro";
import { useToast } from "@/hooks/useToast";
import { OrderService } from "@/services/order.service";

const orderService = new OrderService();

const Appointment = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [addressInfo, setAddressInfo] = useState<any>();
  const chooseLocation = requirePlugin('chooseLocation');
  const toast = useToast();

  useDidShow(() => {
    const location = chooseLocation.getLocation();
    console.log(location, '选取地址location');
    location && setAddressInfo(location);
  })

  const locateSelect = () => {
    const key = 'TWLBZ-TRYYT-2HNXL-V54U2-EL72E-3RFDA'; //使用在腾讯位置服务申请的key
    const referer = 'elephant-mini'; //调用插件的app的名称
    const category = '生活服务,家政服务';

    Taro.navigateTo({
      url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&category=${category}`
    });
  }

  const confirm = async () => {
    if(!addressInfo) {
      toast({
        title: '请选择地址',
        icon: 'none',
      });
      return;
    }
    const res = await orderService.getResidential({
      name: addressInfo.name
    });
    const { result, data, status, msg } = res;
    if(result) {
      if(data.length > 0) {
        const obj:any = data[0];
        setAddressInfo({
          ...addressInfo,
          ...obj
        })
        setShowConfirm(true);
      } else {
        toast({
          title: '该地址暂未开通，敬请期待～',
          icon: 'none',
        });
      }
    } else {
      toast({
        title: `${status}: ${msg}`,
        icon: 'none',
      });
    }
  }

  return (
    <View className="w-screen h-screen bg-[#F7F9FF] p-[15px] font-PF text-999">
      <View className="w-full h-full px-[15px] py-[20px] bg-white rounded-[14px] shadow-shadow1">
        <View className="text-[14px] font-medium mb-[15px]">目前仅开通广州市，其他区域敬请期待</View>
        <View className="relative" onClick={locateSelect}>
          <Input className='h-[52px] text-999 rounded-[10px] border border-solid border-999 pl-[15px]' value={addressInfo?.name} placeholder="请选择地址" />
          {/* <View className="w-[1px] h-[19px] bg-999 absolute right-[56px] top-1/2 transform -translate-y-1/2 opacity-50"></View> */}
          <View className="absolute right-[15px] top-1/2 transform -translate-y-1/2 text-center" onClick={locateSelect}>
            {/* <Image src={dingweiIcon} className="w-[11px] h-[15px] mb-[2px]"></Image>
            <View className="text-[12px]">定位</View> */}
            <Image src={arrowIcon} className="w-[15px] h-[15px]"></Image>
          </View>
        </View>
        <View className="h-[54px] rounded-[10px] mt-[50px] bg-[#0091FF] flex items-center justify-center text-[18px] text-white font-semibold" onClick={confirm}>确定</View>
        <View className='w-full text-999 text-center text-[12px] absolute bottom-[30px]'>客服电话： 13829707597 （工作日 09:00-18:00）</View>
      </View>
      {showConfirm && <ConfirmModal addressInfo={addressInfo} setShowConfirm={setShowConfirm}></ConfirmModal>}
    </View>
  )
}

export default Appointment;