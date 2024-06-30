import { View } from "@tarojs/components"
import OrderItem from "./orderItem";
import { useEffect, useState } from "react";
import { OrderService } from "@/services/order.service";
import { useToast } from "@/hooks/useToast";
import { dateFormat } from "@/utils/utils";
import { useLoading } from "@/hooks/useLoading";

const orderService = new OrderService();

const OrderList = () => {
  const toast = useToast();
  const [showLoading, hideLoading] = useLoading();
  const [orderList, setOrderList] = useState<any>([]);

  useEffect(() => {
    getOrderList();
  }, [])

  const getOrderList = async() => {
    showLoading({
      title: '加载中',
      mask: true,
    });
    const res = await orderService.orderList({
      page: 1,
      size: 50
    });
    const { result, data, status, message } = res;
    if(result) {
      data.list?.map(item => {
        item.clearDate = dateFormat(new Date(item.clearDate))
      })
      setOrderList(data.list);
    } else {
      toast({
        title: `${status}: ${message}`,
        icon: 'none',
      });
    }
    hideLoading();
  }

  return (
    <View className="h-screen bg-[#F7F9FF] p-[15px]">
      {
        orderList?.map(item => {
          return (
            <OrderItem item={item} payCallBack={() => getOrderList()}></OrderItem>
          )
        })
      }
    </View>
  )
}

export default OrderList;