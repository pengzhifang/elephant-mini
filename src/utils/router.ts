import Taro from '@tarojs/taro';

interface RouterParams {
  url: string;
  params?: object;
  duration?: number;
  openType?: 'navigate' | 'redirect' | 'reLaunch' | 'back' | 'switch';
}

export class Router {
  static routes: Array<any> = [];
  static MAX_LENGTH = 10; // 要控制路由层级的原因：路由层级超过10层之后就会有问题:https://taro-club.jd.com/topic/53/navigator%E5%A4%A7%E4%BA%8E-10-%E5%B1%82%E5%90%8E-%E8%87%AA%E5%8A%A8-redirect
  static boundaryRouter = {};
  static _lastTime = 0;
  static instance = null as any;
  tranferPage = { url: '/pages/transfer/transfer' }; // 中转页地址
  constructor() {
    if (!Router.instance) {
      Router.instance = this;
    }
    return Router.instance;
  }

  navigate(option: RouterParams) {
    const _nowTime = +new Date();
    if (_nowTime - Router._lastTime > 500 || !Router._lastTime) {
      Router._lastTime = _nowTime;
      this.push(option);
    }
  }

  protected push(option: RouterParams) {
    const path = option.url;
    let url = path;
    const { params = {}, openType = 'navigate', duration = 0 } = option;
    const queryParams = this.parse(params);
    url = `${url}${queryParams && '?' + queryParams}`;
    if (duration) {
      setTimeout(() => {
        this.to(openType, url);
      }, duration);
    } else {
      this.to(openType, url);
    }
  }

  to(openType: string, url: string) {
    const obj = { url };
    if (openType === 'redirect') {
      this.redirectedTo(obj);
    } else if (openType === 'reLaunch') {
      // 关闭所有页面，打开到应用内的某个页面
      Taro.reLaunch(obj);
    } else if (openType === 'back') {
      this.navigateBack();
    } else if (openType === 'switch') {
      Taro.switchTab({
        url,
      });
    } else {
      this.navigateTo(obj);
    }
  }

  redirectedTo(obj) {
    const objClone = JSON.parse(JSON.stringify(obj));
    const TaroPages = Taro.getCurrentPages();
    if (TaroPages.length > Router.MAX_LENGTH - 2) {
      Router.routes.pop();
      Router.routes.push(objClone);
      Taro.redirectTo(obj);
    } else {
      Taro.redirectTo(obj);
    }
  }

  navigateBack() {
    const TaroPages = Taro.getCurrentPages();
    if (TaroPages.length > Router.MAX_LENGTH - 2) {
      Router.routes.pop();
    }
    Taro.navigateBack({ delta: 1 });
  }

  protected navigateTo(obj) {
    const objClone = JSON.parse(JSON.stringify(obj));
    const TaroPages = Taro.getCurrentPages();
    if (TaroPages.length < Router.MAX_LENGTH - 2) {
      Taro.navigateTo(obj);
      return;
    }
    Router.routes.push(objClone);
    // if (TaroPages.length === Router.MAX_LENGTH - 2) {
    //   const route = TaroPages[Router.MAX_LENGTH - 3];
    //   const url = `/${route['route']}`;
    //   const params = route['options'];
    //   Router.boundaryRouter = { url, params };
    //   Taro.redirectTo(JSON.parse(JSON.stringify(this.tranferPage)));
    // } else if (TaroPages.length > Router.MAX_LENGTH - 2) {
    //   Taro.redirectTo(obj);
    // }
  }

  protected parse(data) {
    const tempArr: any = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        tempArr.push(key + '=' + encodeURIComponent(data[key]));
      }
    }
    return tempArr.join('&');
  }
}
