import { View } from "@tarojs/components"
import classNames from "classnames";

export interface Props {
  item: any
}

const OrderItem = (props: Props) => {
  const { item } = props;

  const formatPayStatus = (status) => {
    let payText = '';
    switch(status) {
      case 0: payText = '待支付'; break;
      case 10: payText = '已取消'; break;
      case 20: payText = '已支付'; break;
      case 30: payText = '待退费'; break;
      case 40: payText = '已完成'; break;
      default: break
    }
    return payText;
  }

  return (
    <View className="py-[20px] px-[15px] font-PF text-333 text-[14px] leading-[20px] mb-[20px]">
      <View className="font-medium text-[18px] leading-[25px]">{item?.residentialName}</View>
      <View className="mt-[10px]">订单编号：{item?.orderCode}</View>
      <View className="mt-[10px] flex items-center">
        <View>订单状态：</View>
          <View className={classNames({"text-[#7ED321]": item?.payStatus === 20, "text-[#FF6700]": item?.payStatus === 0 })}>{ formatPayStatus(item?.payStatus) }</View>
      </View>
      <View className="mt-[10px]">期望清运时间：{item?.clearDate + ' ' + item?.clearTime}</View>
      <View className="mt-[10px]">订单金额：¥{item?.orderPrice}</View>
    </View>
  )
}

export default OrderItem;