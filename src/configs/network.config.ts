import process from 'process';
/**
 * 请求地址
 */
export const host = process.env.TARO_APP_HOST;

/**
 * 测试环境用户隐私协议地址
 */
export const PRIVACY_TEST = 'https://i.t.blingo.cc/en/privacy-policy.html';

/**
 * 正式环境用户隐私协议地址
 */
export const PRIVACY = 'https://i.blingo.cc/en/privacy-policy.html';

/**
 * 测试环境下载地址
 */
export const DOWNLOAD_TEST = 'https://i.t.blingo.cc/en/blingo/download';

/**
 * 正式环境下载地址
 */
export const DOWNLOAD = 'https://i.blingo.cc/en/blingo/download';

/**
 * 测试环境用户协议
 */
export const USER_AGREEMENT_TEST =
  'https://i.t.blingo.cc/en/register-policy.html';

/**
 * 正式环境用户协议
 */
export const USER_AGREEMENT = 'https://i.blingo.cc/en/register-policy.html';

/**
 * 登录相关
 */
export const Login = {
  /**
   * 获取 openid
   * @link http://wiki.blingabc.com/pages/viewpage.action?pageId=2337582
   */
  getOpenid: host + '/mro/open-api/youhui/v3/jscode-session',
  /**
   * 获取手机号区号
   */
  getCountryCode: host + '/general/open-api/general/v1/countryCode',
  /**
   * 获取手机号
   * @link http://wiki.blingabc.com/pages/viewpage.action?pageId=2330022
   */
  getPhoneNumber: host + '/mro/open-api/applet/v1/login-wechat',
  /**
   * 新增商机
   * @link 
   */
  addClsClue: host + '/sale/user-api/clue/v3/third-clue',
  /**
   * 家长AppleId登录注册绑定
   * @link https://alidocs.dingtalk.com/i/nodes/mExel2BLV54bGvEYiZQwlLNYWgk9rpMq?corpId=dinga3d4c488dc6d0d3a35c2f4657eb6378f&utm_medium=im_card&iframeQuery=utm_medium%3Dim_card%26utm_source%3Dim&utm_scene=team_space&utm_source=im
   * @link http://wiki.blingabc.com/pages/viewpage.action?pageId=2338859
   */

  loginByAppleId: host + '/auth/open-api/user/v1/parent-appleId-login',
  /**
   * 手机号授权登录
   * @link http://wiki.blingabc.com/pages/viewpage.action?pageId=2330027
   */
  loginByMobileAuth: host + '/auth/open-api/user/retail/v1/parent-mobile',
  /**
   * 通过 openid 登录
   * @link http://wiki.blingabc.com/pages/viewpage.action?pageId=2338258
   */
  loginByOpenid: host + '/auth/open-api/user/v1/parent-token-login',
  /**
   * 通过手机号验证码登录
   * @link http://wiki.blingabc.com/pages/viewpage.action?pageId=1772592
   */
  /**
   * 中文token转换为比邻token
   * @link http://wiki.blingabc.com/pages/viewpage.action?pageId=2336475
   */
  convertToken: host + '/cms/open-api/v1/convert-token',

  /**
   * 绑定openid
   * @link http://wiki.blingabc.com/pages/viewpage.action?pageId=2338262
   */
  bindOpenid: host + '/auth/user-api/user/v1/parent-token-save',
};

/**
 * 题库相关
 */
export const Question = {
  /**
   * 答题数据统计
   */
  getAnswerStat: host + '/share-arc/user-api/answerstatistics/v1/data',
  /**
   * CTC考试日期
   */
  getTestDate: host + '/share-arc/user-api/answerstatistics/v1/test-date',

  /**
  * 错题本收藏夹题目列表
  */
  getErrorCollect: host + '/share-arc/user-api/errcollect/v1/page',

  /**
  * 错题本题目 && 答案解析 && 答题记录
  */
  getErrorCollectInfo: host + '/share-arc/user-api/errcollect/v1/err-page',
  /**
   * 答题页数据
   */
  getErrorCollectAnswerList: host + '/share-arc/user-api/errcollect/v1/answer-data',
  /**
  * 错题本收藏夹提交答案
  */
  answerComplete: host + '/share-arc/user-api/errcollect/v1/answer-complete',
  /**
  * 题库分类列表
  */
  getDirectoryList: host + '/share-arc/user-api/directory/v1/list',
  /**
  * 错题本收藏夹 取消收藏 移除题目
  */
  questionCancel: host + '/share-arc/user-api/errcollect/v1/cancle',
  /**
  * 错题本收藏夹 收藏
  */
  questionSave: host + '/share-arc/user-api/errcollect/v1/save',
  /**
  * 查询题目的收藏状态
  */
  getQuestionStatus: host + '/share-arc/user-api/errcollect/v1/status',
  /**
   * 专题练习/真题模拟-题目目录
   */
  getAppletDirectory: host + '/share-arc/user-api/applet/v1/directory',
   /**
   * 专题练习/真题模拟-题目目录
   */
  deleteAnswerRecord: host + '/share-arc/user-api/applet/v1/delete-record',

   /**
   * 专题练习/真题模拟-答题页题目
   */
   getExamQuestion: host + '/share-arc/user-api/applet/v1/directory-question',
   /** 
    * 专题练习/真题模拟-题目提交
    */
   examQuestionComplete: host + '/share-arc/user-api/applet/v1/answer-complete',
};