import { View } from "@tarojs/components"

const OrderItem = () => {
  return (
    <View className="py-[20px] px-[15px] font-PF text-333 text-[14px] leading-[20px] mb-[20px]">
      <View className="font-medium text-[18px] leading-[25px]">华润橡树湾A区</View>
      <View className="mt-[10px]">订单编号：228736393939030</View>
      <View className="mt-[10px] flex items-center">
        <View>订单状态：</View>
          <View className="text-[#7ED321]">已支付</View>
      </View>
      <View className="mt-[10px]">期望清运时间：26日（明天）08:00-08:30</View>
      <View className="mt-[10px]">订单金额：¥700</View>
    </View>
  )
}

export default OrderItem;