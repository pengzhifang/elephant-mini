import { BaseService } from '.';
import { Order } from '../configs';

/**
 * 迪昂丹相关
 */
export class OrderService extends BaseService {
  constructor() {
    super();
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
}
