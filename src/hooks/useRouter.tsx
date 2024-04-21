import Taro from '@tarojs/taro';
import { useCallback, useMemo, useRef } from 'react';

/**
 * 路由参数
 */
export interface RouterParams {
  /**
   * 路由
   */
  url: string;
  /**
   * 路由参数
   * @default {}
   */
  params?: Record<string, any>;
  /**
   * 跳转延迟
   * @default 0 '无延迟'
   */
  duration?: number;
  /**
   * 跳转类型
   * @default 'navigate'
   */
  openType?: OpenType;
}

/**
 * 路由跳转类型
 */
export enum OpenType {
  /**
   * 保留当前页面，跳转到应用内的某个页面
   */
  navigate = 'navigate',
  /**
   * 关闭当前页面，跳转到应用内的某个页面
   */
  redirect = 'redirect',
  /**
   * 关闭所有页面，打开到应用内的某个页面
   */
  reLaunch = 'reLaunch',
  /**
   * 关闭当前页面，返回上一页面
   */
  back = 'back',
  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   */
  switch = 'switch',
}

/**
 * 路由操作对象
 */
export interface RouterActions {
  /**
   * 路由跳转
   * @param options 路由跳转参数
   */
  navigate: (options: RouterParams) => void;
}

/**
 * 路由最大深度
 * @description 要控制路由层级的原因：路由层级超过10层之后就会有[问题](https://taro-club.jd.com/topic/53/navigator%E5%A4%A7%E4%BA%8E-10-%E5%B1%82%E5%90%8E-%E8%87%AA%E5%8A%A8-redirect)
 */
const MAX_ROUTER_LENGTH = 10;

/**
 * 路由钩子
 * @description 路由跳转时请务必使用此钩子! 此钩子可以规避副作用!
 * @param delay 跳转间隔, 用于节流, 默认: `500`, 单位 `ms`
 * @returns 路由操作实例
 * @example
 * const { navigate } = useNavigator();
 * navigate(options);
 */
export const useRouter = (delay = 500) => {
  /**
   * 存放路由地址, 处理层级
   */
  const routes = useRef<{ url: string }[]>([]);

  /**
   * 存放跳转间隔
   */
  const delayTime = useRef(delay);

  /**
   * 用于节流, 避免路由跳转短时间内多次点击
   */
  const lastTime = useRef(-1);

  /**
   * 校验并处理路由栈深度
   * @param url 路由地址
   */
  const verifyRouteLength = useCallback(
    (url?: string) => {
      const pageList = Taro.getCurrentPages();
      if (pageList.length > MAX_ROUTER_LENGTH - 2) {
        routes.current.pop();

        // 仅在传入的时候入栈
        if (url) routes.current.push({ url });
      }
    },
    [Taro, routes],
  );

  /**
   * 转化路由参数
   * @param data 路由参数对象
   */
  const parse = useCallback((data: Record<string, any>) => {
    const tempArr: string[] = [];

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        tempArr.push(key + '=' + encodeURIComponent(data[key]));
      }
    }
    return tempArr.join('&');
  }, []);

  /**
   * 路由跳转核心
   * @param openType 路由跳转类型
   * @param url 跳转地址, 携带参数
   */
  const to = useCallback(
    (openType: OpenType, url: string) => {
      const routeUrl = { url };

      switch (openType) {
        case OpenType.back:
          verifyRouteLength();
          Taro.navigateBack({ delta: 1 });
          break;
        case OpenType.reLaunch:
          Taro.reLaunch(routeUrl);
          break;
        case OpenType.redirect:
          verifyRouteLength(url);
          Taro.redirectTo(routeUrl);
          break;
        case OpenType.switch:
          Taro.switchTab(routeUrl);
          break;
        case OpenType.navigate:
        default:
          verifyRouteLength(url);
          Taro.navigateTo(routeUrl);
          break;
      }
    },
    [Taro, verifyRouteLength],
  );

  const actions = useMemo<RouterActions>(() => {
    return {
      navigate(options) {
        const nowTime = +new Date();
        // 节流
        if (nowTime - lastTime.current > delayTime.current) {
          lastTime.current = nowTime;

          const {
            url,
            params = {},
            openType = OpenType.navigate,
            duration = 0,
          } = options;

          const queryParams = parse(params); // 返回可能为空字符串
          const routerPath = `${url}${queryParams ? '?' + queryParams : ''}`;

          if (duration > 0) {
            // 延迟跳转
            setTimeout(() => to(openType, routerPath), duration);
          } else {
            // 直接跳转
            to(openType, routerPath);
          }
        }
      },
    };
  }, [delayTime, lastTime, to]);

  return actions;
};
