import { useToast } from "@/hooks/useToast";
import { OrderService } from "@/services/order.service";
import { storage } from "@/services/storage.service";
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro";
import classNames from "classnames";

export interface Props {
  item: any;
  payCallBack: () => void;
}

const orderService = new OrderService();

const OrderItem = (props: Props) => {
  const { item, payCallBack } = props;
  const toast = useToast();

  const formatPayStatus = (status) => {
    let payText = '';
    switch(status) {
      case 0: payText = '待支付'; break;
      case 10: payText = '已取消'; break;
      case 11: payText = '已取消'; break;
      case 20: payText = '已支付'; break;
      case 30: payText = '待退费'; break;
      case 40: payText = '待派车'; break;
      case 50: payText = '已完成'; break;
      case 51: payText = '已退费'; break;
      default: break
    }
    return payText;
  }

  const payOrder = async (orderOption: any) => {
    const res = await orderService.orderPay({
      orderCode: orderOption.orderCode,
      openId: storage.getOpenid()
    });
    const { result, data, status, msg } = res;
    if (result) {
      const { timeStamp, nonceStr, packageValue, signType, paySign } = data;
      Taro.requestPayment({
        timeStamp,
        nonceStr,
        signType,
        paySign,
        package: packageValue,
        success: (res) => {
          console.log('pay success', res);
          payCallBack();
        },
        fail: (res) => {
          console.log('pay fail', res);
          payCallBack();
        }
      })
    } else {
      toast({
        title: `${status}: ${msg}`,
        icon: 'none',
      });
    }
  }

  return (
    <View className="py-[20px] px-[15px] bg-white font-PF text-333 text-[14px] leading-[20px] mb-[20px] rounded-[14px]">
      <View className="font-medium text-[18px] leading-[25px]">{item?.residentialName}</View>
      <View className="mt-[10px]">订单编号：{item?.orderCode}</View>
      <View className="mt-[10px] flex items-center">
        <View>订单状态：</View>
          <View className={classNames({"text-[#FF6700]": item?.payStatus === 0, "text-999": item?.payStatus === 10, "text-[#7ED321]": item?.payStatus === 20, "text-666": item?.payStatus === 50 })}>{ formatPayStatus(item?.payStatus) }</View>
      </View>
      <View className="mt-[10px]">期望清运时间：{item?.clearDate + ' ' + item?.clearTime}</View>
      <View className="mt-[10px]">订单金额：¥{item?.orderPrice}</View>
      {item?.payStatus === 0 && <View className="flex justify-end mt-[10px]">
        <View className="w-[100px] py-[10px] rounded-[10px] bg-[#0091FF] flex items-center justify-center text-white" onClick={() => { payOrder(item) }}>支付</View>
      </View>}
    </View>
  )
}

export default OrderItem;