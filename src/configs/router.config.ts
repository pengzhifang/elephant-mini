
/**
 * 页面地址配置
 */
export const routerPath = {
  /**
   * 统一入口页
   */
  index: '/pages/index/index',
  /**
   * 首页
   */
  home: '/pages/home/index',
};

/**
 * 页面类型
 */
export enum PageType {

  /**
   * 首页
   */
  home = '0',
  /**
   * 留资页
   */
  drainage = '1',
  /**
   * 拼团
   */
  collage = '2',
  /**
   * 公开课
   */
  activity = '3',
  /**
   * 推荐有奖
   */
  share = '4'
}
