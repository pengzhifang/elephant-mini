import { CheckType } from './capctha.interface';

/**
 * 获取 openid 请求参数
 */
export interface GetOpenIdParams {
  /**
   * 临时 code
   */
  jsCode: string;
}

/**
 * 获取 openid 返回数据
 */
export interface GetOpenIdData {
  /**
   * openid
   */
  openid: string;
  /**
   * 小unionid
   */
  unionid: string;
}

/**
 * 获取手机区号编码返回数据
 */
export interface GetCountryCodeData {
  /**
   * id
   */
  id: number;
  /**
   * 区号编码
   */
  code: string;
  /**
   * 国家名称
   */
  country: string;
}

/**
 * 授权获取用户手机号的请求参数
 */
export interface GetPhoneNumberParams {
  /**
   * 密文
   */
  encryptedData: string;
  /**
   * 初始向量
   */
  iv: string;
  /**
   * openId
   */
  hlAppletOpenId: string;
  /**
   * 小程序类型(1有惠,2ctcsol)
   */
  appletType: AppletType;
}

/**
 * 小程序类型
 */
export enum AppletType {
  /**
   * 比邻有惠
   */
  youhui = 1,
  /**
   * 新东方国际中文
   */
  ctcsol = 2,
   /**
   * CTC题库引流
   */
  drainage = 3 
}

/**
 * 新增商机请求参数
 */
export interface AddClsClueParams {
  /**
   * 手机号
   */
  parentMobile: string;
  /**
   * 意向课程
   */
  intentionCourseType: IntentionCourseType | string;

  /**
   * 二级渠道编码
   */
  channelCodeTwo: string;

  /**
   * 推荐码
   */
  recommendCode?: string;
  /**
   * 微信号
   */
  wxNumber?: string;
  /**
   * 区号
   */
  countryCode?: string;
}

/**
 * 生成平台
 */
export enum ChannelWay {
  mini = 1,
  app = 2,
  ts = 3,
  cc = 4,
  css = 5,
}

/**
 * 意向课程
 */
export enum IntentionCourseType {
  /**
   * 其他
   */
  others = 0,
  /**
   * 藤校
   */
  tengxiao = 97,
  /**
   * 国际小学
   */
  guoji = 10,
  /**
   * 中文主修1v1
   */
  chinese1V1 = 99,
  /**
   * 自然拼读
   */
  zipin = 60,
}

/**
 * 根据手机号登录/注册请求参数
 */
export interface LoginOrRegisterByMobileParams {
  /**
   * 区号（带+号）
   */
  internationalAreaCode: string;
  /**
   * 手机号
   */
  mobile: string;
  /**
   * 商机渠道
   */
  ccChannel: string;
  /**
   * 小程序 openid
   */
  appletsOpenid?: string;
}

/**
 * 手机号授权登录请求参数
 */
export interface LoginByMobileAuthParams {
  /**
   * 手机号
   */
  mobile: string;
}

/**
 * 登录返回数据
 */
export interface LoginData {
  /**
   * 家长信息
   */
  parentInfo: ParentData;
  /**
   * 孩子信息
   */
  studentList: StudentItem[];
  /**
   * token
   */
  token: string;
  /**
   * 新用户标识
   */
  newUser: NewUser;
}

/**
 * 新用户
 */
export enum NewUser {
  /**
   * 新用户
   */
  isNew = 1,
  /**
   * 老用户
   */
  isOld = 0,
}

/**
 * 孩子数据
 */
export interface StudentItem {
  /**
   * 生日
   */
  birthday: string;
  /**
   * 头像
   */
  headImg: string;
  /**
   * 编码
   */
  stuNum: string;
  /**
   * 等级
   */
  level: number;
  /**
   * 性别
   */
  sex: Sex;
  /**
   * 中文名称
   */
  cnName: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 默认学生1是0否
   */
  active: number;
}

/**
 * 性别
 */
export enum Sex {
  /**
   * 男
   */
  man = 1,
  /**
   * 女
   */
  women = 2,
}

/**
 * 家长数据
 */
export interface ParentData {
  /**
   * 国家代码
   */
  countryCode: string;
  /**
   * 国家名称
   */
  countryName: string;
  /**
   * 州代码
   */
  stateCode: string;
  /**
   * 州名称
   */
  stateName: string;
  /**
   * 地区代码
   */
  regionCode: string;
  /**
   * 地区名称
   */
  regionName: string;
  /**
   * 头像
   */
  headImg: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 编码
   */
  parentNum: string;
  /**
   * 家长类型
   */
  type: ParentType;
  /**
   * 手机号
   */
  mobile: string;
  /**
   * 国际区号
   */
  internationalAreaCode: string;
  /**
   * 时区
   */
  timeZone: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 是否登录过0未登录1已登录
   */
  isLogin: number;
  /**
   * 创建时间
   */
  createDate: string;
  /**
   * 推荐码
   */
  promoCode: string;
}

export enum ParentType {
  /**
   * 父亲
   */
  father = 1,
  /**
   * 母亲
   */
  mother = 2,
}

/**
 * 通过 openid 登录请求参数
 */
export interface LoginByOpenidParams {
  /**
   * 应用appId (比邻外教app传BLING_APP, 比邻素养app传ATTAINMENT_APP,比邻好学传BLINGSTUDY_APP,其它传对应应用id)
   */
  appId: string | undefined;
  /**
   * 类型
   */
  type: OpenIdType;
  /**
   * 具体值
   */
  token: string;
}

/**
 * 类型
 */
export enum OpenIdType {
  /**
   * openId
   */
  openId = 1,
  /**
   * unionId
   */
  unionId = 2,
  /**
   * appleId
   */
  appleId = 3,
}



/**
 * 绑定 openid 请求参数
 */
export interface BindOpenidParams {
  /**
   * 小程序 openid
   */
  appId: string | undefined;
  /**
   * 类型
   */
  type: OpenIdType;
  /**
   * 具体值
   */
  token: string;
  /**
   * 家长编码
   */
  parentNum: string;
}
