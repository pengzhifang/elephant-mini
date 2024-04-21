import { View } from '@tarojs/components';
import './tip-modal.scss';

export interface Props {
  /** 标题 */
  title?: string,
  /** 副标题 */
  subTitle?: string,
  /** 取消按钮文案 */
  cancelText?: string,
  /** 确认按钮文案 */
  confirmText?: string,
   /** 取消 */
  onCancel: () => void
  /** 确认 */
  onConfirm: () => void
}

const TipModal = (props: Props) => {
  const { title = '提示', subTitle, cancelText = '取消', confirmText = '确认', onCancel, onConfirm } = props;
  return (
    <View className='fixed left-0 top-0 w-screen h-screen flex flex-col justify-center items-center bg-rgba02'>
      <View className='modal-width h-auto py-[0.3rem] bg-white rounded-[12px]'>
        <View className='font-PF text-[#3A4961] text-[18px] font-semibold text-center'>{title}</View>
        <View className='mt-[0.2rem] font-PF text-[#3A4961] text-[16px] text-center'>{subTitle}</View>
        <View className='mt-[0.3rem] w-full px-[0.3rem] flex justify-between items-center'>
          <View onClick={onCancel} className='w-[0.9rem] h-[0.34rem] leading-[0.3rem] text-center rounded-[16px] border border-solid border-[#EBEBEB] font-PF text-[14px] text-[#3A4961]'>{cancelText}</View>
          <View onClick={onConfirm} className='w-[0.9rem] h-[0.34rem] leading-[0.3rem] text-center rounded-[16px] border border-solid gradient-blue font-PF text-[14px] text-white'>{confirmText}</View>
        </View>
      </View>
    </View>
  )

}
export default TipModal;