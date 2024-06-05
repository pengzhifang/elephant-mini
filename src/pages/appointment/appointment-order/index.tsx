import { View, Image, Input, Textarea } from "@tarojs/components";
import dingweiIcon from '@/images/icon_dingwei1.png';
import carIcon from '@/images/icon_qiche.png';
import photoIcon from '@/images/icon_xiangji.png';
import arrowIcon from '@/images/ico_more@2x.png';
import closeIcon from '@/images/close.png';
import './index.scss'
import { OpenType, useNavigator, useToast } from "@/hooks/index";
import { routerPath } from "@/configs/router.config";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";
import SelectTime from "./select-time";
import { storage } from "@/services/storage.service";
import { OrderService } from "@/services/order.service";

const orderService = new OrderService();

const AppointmentOrder = () => {
  const userInfo = storage.getUserInfo();
  const { navigate } = useNavigator();
  const { params } = useRouter();
  const toast = useToast();
  const [imageUrlArr, setImageUrlArr] = useState<any>([]);
  const [showSelectTime, setShowSelectTime] = useState<boolean>(false);
  const [addressInfo, setAddressInfo] = useState<any>();
  const [orderInfo, setOrderInfo] = useState<any>({
    nickname: userInfo?.name,
    mobile: userInfo?.mobile,
    clearDate: '',
    clearTime: '',
    userRemark: ''
  });

  useEffect(() => {
    setAddressInfo({
      name: decodeURIComponent(params.name!),
      propertyManagementName: decodeURIComponent(params.propertyManagementName!),
      cityName: decodeURIComponent(params.cityName!),
      areaName: decodeURIComponent(params.areaName!),
      townName: decodeURIComponent(params.townName!),
      address: decodeURIComponent(params.address!),
    })
  }, [params])

  const changeUserInfo = (event, type) => {
    switch (type) {
      case 'nickname':
        setOrderInfo({
          ...orderInfo,
          nickname: event.target.value
        });
        break;
      case 'mobile':
        setOrderInfo({
          ...orderInfo,
          mobile: event.target.value
        });
        break;
      case 'userRemark':
        setOrderInfo({
          ...orderInfo,
          userRemark: event.target.value
        });
        break;
      default: break;
    }
  }

  const confirm = async() => {
    const { nickname, mobile, clearDate, clearTime, userRemark } = orderInfo;
    if(!params.id || !nickname || !mobile || !clearDate || !clearTime) {
      toast({ title: '请完善预约信息', icon: 'none', mask: true });
      return;
    }
    const res = await orderService.createOrder({
      userCode: userInfo.userCode,
      nickname,
      mobile,
      residentialManagementId: params.id,
      clearDate,
      clearTime,
      carType: 1, // 车辆类型(1小型车,2中型车)-本次暂定小型车
      rubbishImgs: imageUrlArr.join(','),
      userRemark
    });
    const { result, data, status, msg } = res;
    if(result) {
      navigate({
        url: routerPath.submit,
        openType: OpenType.navigate,
        params: {
          orderCode: data
        }
      });
    } else {
      toast({
        title: `${status}: ${msg}`,
        icon: 'none',
      });
    }
  }

  const chooseImage = () => {
    Taro.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {
        console.log(res);
        const { tempFiles } = res;
        // setImageUrlArr([...imageUrlArr, tempFiles[0].tempFilePath]);
        let url = process.env.TARO_APP_ENVIRONMENT === 'development'? 'https://api.t.daxiangqingyun.com/open-api/file/v1/upload' : 'https://api.daxiangqingyun.com/open-api/file/v1/upload';
        Taro.uploadFile({
          url,
          filePath: tempFiles[0].tempFilePath, // 微信临时文件路径
          name: 'file', // 后台定义的参数名
          header: {
            'content-type': 'multipart/form-data'
          },
          success: function(res) {
            const data: any = res.data;
            
            // 上传成功后的操作
            setImageUrlArr([...imageUrlArr, data.includes('http')? data.replace('http', 'https') : data]);
          },
          fail: function(err) {
            console.log(err)
            // 上传失败后的操作
          }
    })
      }
    })
  }

  const deleteImage = (index) => {
    imageUrlArr.splice(index, 1);
    setImageUrlArr([...imageUrlArr]);
  }

  const handleSelectTimeShow = (val?) => {
    setShowSelectTime(false);
    if (val) {
      setOrderInfo({
        ...orderInfo,
        clearDate: val.clearDate,
        clearTime: val.clearTime
      })
    }
  }

  return (
    <View className="w-screen min-h-screen bg-[#F7F9FF] px-[15px] pb-[20px] font-PF text-999">
      <View className="bg-white pl-[6px] pt-[18px] pb-[10px] flex items-center rounded-[15px]">
        <Image src={dingweiIcon} className="w-[78px] h-[92px] mr-[18px]"></Image>
        <View className="text-333">
          <View className="font-medium">{addressInfo?.name}</View>
          <View className="mt-[2px] text-[12px]">所属物业：{addressInfo?.propertyManagementName}</View>
          <View className="mt-[2px] text-[12px]">所属地区：{addressInfo?.cityName + addressInfo?.areaName + addressInfo?.townName}</View>
          <View className="mt-[2px] text-[12px]">详细地址：{addressInfo?.address}</View>
        </View>
      </View>
      <View className="mt-[20px] pt-[10px] pb-[30px] px-[15px] order-info bg-white rounded-[15px]">
        <View className="flex items-center justify-between">
          <View className="flex items-center">
            <View className="w-[3px] h-[12px] rounded-[2px] bg-[#0091FF]"></View>
            <View className="font-semibold text-333 ml-[5px]">联系人</View>
          </View>
          <Input className='text-right text-999 placeholder:font-PF placeholder:text-999' placeholder="请输入" value={orderInfo?.nickname} onInput={(event: any) => changeUserInfo(event, 'nickname')} />
        </View>
        <View className="mt-[30px] flex items-center justify-between">
          <View className="flex items-center">
            <View className="w-[3px] h-[12px] rounded-[2px] bg-[#0091FF]"></View>
            <View className="font-semibold text-333 ml-[5px]">联系方式</View>
          </View>
          <Input className='text-right text-999 placeholder:font-PF placeholder:text-999' placeholder="请输入11位手机号" value={orderInfo?.mobile} onInput={(event: any) => changeUserInfo(event, 'mobile')} />
        </View>
        <View className="mt-[30px] flex items-center justify-between">
          <View className="flex items-center">
            <View className="w-[3px] h-[12px] rounded-[2px] bg-[#0091FF]"></View>
            <View className="font-semibold text-333 ml-[5px]">期望清运时间</View>
          </View>
          <View className="flex items-center" onClick={() => { setShowSelectTime(true); }}>
            <View>{orderInfo.clearDate ? orderInfo.clearDate + ' ' + orderInfo.clearTime : '请选择'}</View>
            <Image src={arrowIcon} className="w-[15px] h-[15px] ml-[5px]"></Image>
          </View>
        </View>
        <View className="mt-[30px]">
          <View className="flex items-center">
            <View className="w-[3px] h-[12px] rounded-[2px] bg-[#0091FF]"></View>
            <View className="font-semibold text-333 ml-[5px]">车辆选择</View>
          </View>
          <View className="mt-[10px] pl-[20px] py-[15px] rounded-[8px] bg-[#F7F9FF]">
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
      </View>
      <View className="bg-white mt-[20px] p-[15px] rounded-[15px]">
        <View className="flex items-center">
          <View className="w-[3px] h-[12px] rounded-[2px] bg-[#0091FF]"></View>
          <View className="font-semibold text-333 ml-[5px]">请拍照上传垃圾图片</View>
        </View>
        <View className="flex items-center">
          {imageUrlArr.map((x, index) => {
            return (
              <View className="mt-[10px] w-[142px] h-[142px] flex items-center justify-center rounded-[8px] bg-[#F7F9FF] mr-[10px] relative">
                <Image src={x} className="w-[40px] h-[35px]"></Image>
                <Image src={closeIcon} className="w-[20px] h-[20px] absolute top-[-5px] right-[-5px]" onClick={() => { deleteImage(index) }}></Image>
              </View>
            )
          })}
          {imageUrlArr.length < 3 && <View className="mt-[10px] w-[142px] h-[142px] flex items-center justify-center rounded-[8px] bg-[#F7F9FF]" onClick={chooseImage}>
            <Image src={photoIcon} className="w-[40px] h-[35px]"></Image>
          </View>}
        </View>
      </View>
      <View className="bg-white mt-[20px] p-[15px] rounded-[15px]">
        <View className="flex items-center">
          <View className="w-[3px] h-[12px] rounded-[2px] bg-[#0091FF]"></View>
          <View className="font-semibold text-333 ml-[5px]">备注</View>
        </View>
        <Textarea className="h-[52px] mt-[10px] border border-solid border-999 rounded-[10px] opacity-50 p-[5px]" value={orderInfo?.userRemark} onInput={(event: any) => changeUserInfo(event, 'userRemark')}></Textarea>
      </View>
      <View className="h-[54px] mt-[30px] rounded-[10px] bg-[#0091FF] flex items-center justify-center text-white" onClick={confirm}>确认</View>
      {
        showSelectTime && <SelectTime changeShow={handleSelectTimeShow} />
      }
    </View>
  )
}

export default AppointmentOrder;