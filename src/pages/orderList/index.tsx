import { View } from "@tarojs/components"
import OrderItem from "./orderItem";
import { useEffect, useState } from "react";
import { OrderService } from "@/services/order.service";
import { useToast } from "@/hooks/useToast";
import { dateFormat } from "@/utils/utils";

const orderService = new OrderService();

const OrderList = () => {
  const toast = useToast();
  const [orderList, setOrderList] = useState<any>([]);

  useEffect(() => {
    getOrderList();
  }, [])

  const getOrderList = async() => {
    const res = await orderService.orderList({
      page: 1,
      size: 20
    });
    const { result, data, status, msg } = res;
    if(result) {
      data.list?.map(item => {
        item.clearDate = dateFormat(new Date(item.clearDate))
      })
      setOrderList(data.list);
    } else {
      toast({
        title: `${status}: ${msg}`,
        icon: 'none',
      });
    }
  }

  return (
    <View>
      {
        orderList?.map(item => {
          return (
            <OrderItem item={item}></OrderItem>
          )
        })
      }
    </View>
  )
}

export default OrderList;