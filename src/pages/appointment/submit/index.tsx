import { View, Image } from "@tarojs/components";
import carIcom from '@/images/icon_car.png';
import completeIcom from '@/images/icon_wancheng.png';
import { useEffect, useState } from "react";
import { OpenType, useNavigator, useToast } from "@/hooks/index";
import { routerPath } from "@/configs/router.config";
import { useLoad, useRouter, useUnload } from "@tarojs/taro";
import { OrderService } from "@/services/order.service";
import { storage } from "@/services/storage.service";
import Taro from "@tarojs/taro";

const orderService = new OrderService();

const Submit = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false); // 订单是否失效
  const { navigate } = useNavigator();
  const toast = useToast();
  const { params } = useRouter();
  const [payInfo, setPayInfo] = useState<any>();
  const [cutdownTime, setCutdownTime] = useState<any>();

  useEffect(() => {
    if (params.orderCode) {
      payOrder(params.orderCode);
      let countDownDate = new Date().getTime() + 30 * 60000; //设置半小时倒计时

      let x = setInterval(function () {

        let now = new Date().getTime(); //获取当前的时间
        let distance = countDownDate - now; //计算剩余的时间

        // let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) > 9? Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) : '0' + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000) > 9? Math.floor((distance % (1000 * 60)) / 1000) : '0' + Math.floor((distance % (1000 * 60)) / 1000);

        setCutdownTime(minutes + ":" + seconds)
        if (distance < 0) { // 如果倒计时结束
          clearInterval(x); // 停止倒计时
          setCutdownTime('00:00');
          setIsInvalid(true);
        }
      }, 1000);
    }
  }, [params])

  const payOrder = async (orderCode) => {
    const res = await orderService.orderPay({
      orderCode,
      openId: storage.getOpenid()
    });
    const { result, data, status, message } = res;
    if (result) {
      setPayInfo(data);
    } else {
      toast({
        title: `${status}: ${message}`,
        icon: 'none',
      });
    }
  }

  const weixinPay = () => {
    const { timeStamp, nonceStr, packageValue, signType, paySign } = payInfo;
    Taro.requestPayment({
      timeStamp,
      nonceStr,
      signType,
      paySign,
      package: packageValue,
      success: (res) => {
        console.log('pay success', res)
        setIsPaid(true);
      },
      fail: (res) => {
        console.log('pay fail', res)
      }
    })
  }

  const toHome = () => {
    navigate({
      url: routerPath.home,
      openType: OpenType.navigate,
      params: {}
    });
  }

  useLoad(() => {
    Taro.enableAlertBeforeUnload({
      message: '确定要退出吗',
      success: () => {
        console.log(1111);
      },
      fail: () => {
        console.log(2222);
      },
    })
  })

  useUnload(() => {
    console.log('useUnload');
    navigate({
      url: routerPath.orderList,
      openType: OpenType.reLaunch,
      params: {}
    });
  })

  return (
    <View className="w-full h-screen font-PF">
      {!isPaid && !isInvalid && <View className="mt-[80px]">
        <Image className="block w-[80px] h-[70px] mx-auto" src={carIcom} />
        <View className="mt-[20px] mx-auto text-center w-3/4 font-medium text-999 text-[18px]">支付后会有工作人员联系您，安排详细清运时间和事项</View>
        <View className="text-[14px] text-999 text-center mt-[120px]">订单有效期  {cutdownTime}</View>
        <View className="mx-[15px] h-[54px] mt-[20px] rounded-[10px] bg-[#0091FF] flex items-center justify-center text-white text-[18px]" onClick={weixinPay}>去支付</View>
      </View>}
      {isPaid && <View className="mt-[90px]">
        <Image className="block w-[50px] h-[50px] mx-auto" src={completeIcom} />
        <View className="mt-[10px] text-[18px] text-999 text-center">已支付</View>
        <View className="mt-[20px] text-[14px] text-999 text-center">稍后会有工作人员联系您，请注意接听</View>
        <View className="mx-[15px] h-[54px] mt-[20px] rounded-[10px] bg-[#0091FF] flex items-center justify-center text-white text-[18px]" onClick={toHome}>返回首页</View>
      </View>}
      {!isPaid && isInvalid && <View className="mt-[90px]">
        <Image className="block w-[80px] h-[70px] mx-auto" src={carIcom} />
        <View className="mt-[20px] mx-auto text-center w-3/4 font-medium text-999 text-[18px]">订单已失效，请重新下单</View>
        <View className="mx-[15px] h-[54px] mt-[20px] rounded-[10px] bg-[#0091FF] flex items-center justify-center text-white text-[18px]" onClick={toHome}>返回首页</View>
      </View>}
    </View>
  )
}

export default Submit