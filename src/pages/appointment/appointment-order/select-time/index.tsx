import { View, Image } from "@tarojs/components";
import closeIcon from '@/images/close.png';
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useToast } from "@/hooks/useToast";
import { OrderService } from "@/services/order.service";
import { dateFormat } from "@/utils/utils";

export interface Props {
  changeShow: (value?) => void
}

const orderService = new OrderService();

const SelectTime = (props: Props) => {
  const { changeShow } = props;
  const [clearDateList, setClearDateList] = useState([
    { name: '', val: '', valStr: '' }
  ])
  const [clearTimeList, setClearTimeList] = useState<any>([])
  const [clearDateInfo, setClearDateInfo] = useState({
    clearDate: '',
    clearTime: ''
  })
  const toast = useToast();

  useEffect(() => {
    let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    let date1 = tomorrow.getDate();

    // 获取后天的年月日
    let afterTomorrow = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
    let date2 = afterTomorrow.getDate();
    setClearDateList([
      { name: `${date1}日（明天）`, val: `${date1}日`, valStr: dateFormat(tomorrow) },
      { name: `${date2}日（后天）`, val: `${date2}日`, valStr: dateFormat(afterTomorrow)},
    ])
    getGeneralConfig();
  }, [])
  
  const getGeneralConfig = async () => {
    const res = await orderService.getGeneralConfig({
      code: 'hello'
    });
    const { result, data, status, message } = res;
    if(result) {
      setClearTimeList(data || []);
    } else {
      toast({
        title: `${status}: ${message}`,
        icon: 'none',
      });
    }
  }

  const selectDate = (item) => {
    setClearDateInfo({
      ...clearDateInfo,
      clearDate: item.valStr
    })
  }

  const selectTime = (val) => {
    setClearDateInfo({
      ...clearDateInfo,
      clearTime: val
    })
  }

  const confirm = () => {
    if(!clearDateInfo.clearDate) {
      toast({ title: '请选择清运日期', icon: 'none', mask: true });
      return;
    }
    if(!clearDateInfo.clearTime) {
      toast({ title: '请选择清运时段', icon: 'none', mask: true });
      return;
    }
    changeShow(clearDateInfo)
  }

  return (
    <View className='bg-[rgba(0,0,0,0.5)] w-screen h-screen fixed top-0 left-0 z-40'>
      <View className='absolute bottom-0 left-0 w-full bg-white rounded-t-[20px] p-[20px] max-h-[400px] overflow-y-auto'>
        <View className="flex items-center">
          <View className="flex-1 text-center text-333 font-semibold">清运时间选择</View>
          <Image src={closeIcon} className="w-[20px] h-[20px]" onClick={() => { changeShow() }}></Image>
        </View>
        <View className="flex items-center mt-[20px]">
          <View>清运日期：</View>
          {
            clearDateList.map(x => {
              return (
                <View
                  className={classNames("px-[10px] py-[5px] rounded-[8px] border border-solid border-[#999] mr-[10px]", { 'bg-[#0091FF] text-white border-transparent': x.valStr === clearDateInfo.clearDate })}
                  onClick={() => selectDate(x)}>{x.name}</View>
              )
            })
          }
        </View>
        <View className="flex items-start mt-[20px]">
          <View>清运时段：</View>
          <View>
            {
              clearTimeList.map(x => {
                return (
                  <View
                    className={classNames("px-[10px] py-[5px] rounded-[8px] border border-solid border-[#999] mb-[10px]", { 'bg-[#0091FF] text-white border-transparent': x.name === clearDateInfo.clearTime })}
                    onClick={() => selectTime(x.name)}>{x.name}</View>
                )
              })
            }
          </View>
        </View>
        <View className="mt-[30px] w-full h-[54px] rounded-[10px] bg-[#0091FF] flex items-center justify-center text-white" onClick={confirm}>确定</View>
      </View>
    </View>
  )
}

export default SelectTime;