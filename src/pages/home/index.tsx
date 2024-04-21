import { View, Text, Image, ScrollView } from '@tarojs/components'
import './index.scss'
import banner1 from './images/banner1.jpg';
import banner2 from './images/banner2.jpg';
import banner3 from './images/banner3.jpg';
import { iconMore } from '@/images/index';
import TabBar from '@/components/tab-bar/tab-bar';
import { routerPath } from '@/configs/router.config';
import { OpenType, useNavigator } from '@/hooks/index';
const Home = () => {
  const { navigate } = useNavigator();

  /**
   * 跳转资料页 咨询页
   * @param type material资料 guidance咨询
   */
  const toMaterial = (type) => {
    // navigate({
    //   url: routerPath.material,
    //   openType: OpenType.navigate,
    //   params: {type: type}
    // });
  }

   /**
   * 跳转留资页
   * @param type 'test'试听课 'default'直通车 'interview' 面试课
   */
  const toDrainage = (type) => {
    // navigate({
    //   url: routerPath.drainage,
    //   openType: OpenType.navigate,
    //   params: {from: type}
    // });
  }
  return (
    <View className='home w-screen overflow-hidden px-[15px] bg-[#F6F8FB] pb-[110px]'>
        <View className='w-full' onClick={()=>toDrainage('test')}>
          <Image className='w-full h-[1.9rem] rounded-[12px]' src={banner1} />
        </View>
        <View className='w-full mt-[20px]'>
          <View className='text-[18px] text-[#3A4961] font-PF font-semibold'>课程</View>
          <View className='w-full mt-[10px] flex justify-between'>
            <Image onClick={()=>toDrainage('interview')}  className='banner-width rounded-[8px] h-[92px]' src={banner2} />
            <Image onClick={()=>toDrainage('default')} className='banner-width rounded-[8px] h-[92px] ml-[10px]' src={banner3} />
          </View>
        </View>
        <View className='bg-white w-full px-[15px] py-[20px] rounded-[12px] mt-[20px]'>
          <View className='w-full flex justify-between h-[40px] items-center border-b border-[#F6F8F9]'>
            <View className='text-[18px] text-[#3A4961] font-PF font-semibold'>备考资料</View>
            <View className='flex items-center font-PF text-[#999] text-[12px]' onClick={()=> toMaterial('material')}>更多<Image className='w-[16px] h-[16px]' src={iconMore} /></View>
          </View>
          <View className='font-PF text-[16px] text-[[#3A4961] mt-[15px]'>备考资料（HSK一级词汇）</View>
          <View className='font-PF text-[16px] text-[[#3A4961] mt-[15px]'>备考资料（常用英文句子）</View>
          <View className='font-PF text-[16px] text-[[#3A4961] mt-[15px]'>备考资料（中国文化知识）</View>
        </View>
        <View className='bg-white w-full px-[15px] py-[20px] rounded-[12px] mt-[20px] mb-[15px]'>
          <View className='w-full flex justify-between h-[40px] items-center border-b border-[#F6F8F9]'>
            <View className='text-[18px] text-[#3A4961] font-PF font-semibold'>就业咨询</View>
            <View className='flex items-center font-PF text-[#999] text-[12px]' onClick={()=> toMaterial('guidance')}>更多<Image className='w-[16px] h-[16px]' src={iconMore} /></View>
          </View>
          <View className='font-PF text-[16px] text-[[#3A4961] mt-[15px]'>国际中文老师前景</View>
          <View className='font-PF text-[16px] text-[[#3A4961] mt-[15px]'>2023国际中文教育大会</View>
          <View className='font-PF text-[16px] text-[[#3A4961] mt-[15px]'>新东方比邻中文招聘</View>
        </View>
      
      <TabBar selected='home' />
    </View>
  )
}

export default Home;