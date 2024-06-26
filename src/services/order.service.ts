import { BaseService } from '.';
import { Order } from '../configs';

/**
 * 订单相关
 */
export class OrderService extends BaseService {
  constructor() {
    super();
  }

  /**
   * 获取通用配置信息
   * @param params 请求参数
   */
  getGeneralConfig(params: any) {
    return this.get<string>(
      Order.getGeneralConfig,
      params,
    );
  }

  /**
   * 获取小区信息
   * @param params 请求参数
   */
  getResidential(params: any) {
    return this.post<string>(
      Order.getResidential,
      params,
    );
  }

  /**
   * 下单
   * @param params 请求参数
   */
  createOrder(params: any) {
    return this.post<string>(
      Order.createOrder,
      params,
    );
  }

  /**
   * 订单支付
   * @param params 请求参数
   */
  orderPay(params: any) {
    return this.post<any>(
      Order.orderPay,
      params,
    );
  }

  /**
   * 订单取消
   * @param params 请求参数
   */
  orderCancel(params: any) {
    return this.post<any>(
      Order.orderCancel,
      params,
    );
  }

  /**
   * 订单列表
   * @param params 请求参数
   */
  orderList(params: any) {
    return this.post<any>(
      Order.orderList,
      params,
    );
  }

  /**
   * 获取街道价格配置信息
   * @param params 请求参数
   */
  orderPriceDetail(params: any) {
    return this.get<string>(
      Order.orderPriceDetail,
      params,
    );
  }
}
