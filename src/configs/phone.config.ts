/**
 * 国际化手机号正则
 */
export const PhoneRegExp = {
  '213': /^(\+?213|0)(5|6|7)\d{8}$/,
  '963': /^(!?(\+?963)|0)?9\d{8}$/,
  '966': /^(!?(\+?966)|0)?5\d{8}$/,
  '1': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
  '420': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  '49': /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
  '45': /^(\+?45)?(\d{8})$/,
  '30': /^(\+?30)?(69\d{8})$/,
  '61': /^(\+?61|0)4\d{8}$/,
  '44': /^(\+?44|0)7\d{9}$/,
  '852': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
  '91': /^(\+?91|0)?[789]\d{9}$/,
  '64': /^(\+?64|0)2\d{7,9}$/,
  '27': /^(\+?27|0)\d{9}$/,
  '26': /^(\+?26)?09[567]\d{7}$/,
  '34': /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
  '358': /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
  '33': /^(\+?33|0)[67]\d{8}$/,
  '972': /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/,
  '36': /^(\+?36)(20|30|70)\d{7}$/,
  '39': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
  '81': /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,
  'ms-MY':
    /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
  '47': /^(\+?47)?[49]\d{7}$/,
  '32': /^(\+?32|0)4?\d{8}$/,
  '48': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
  '55': /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
  '351': /^(\+?351)?9[1236]\d{7}$/,
  '7': /^(\+?7|8)?9\d{9}$/,
  '3816': /^(\+3816|06)[- \d]{5,9}$/,
  '90': /^(\+?90|0)?5\d{9}$/,
  '84': /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
  '86': /^(\+?0?86\-?)?1[345789]\d{9}$/,
  '886': /^(\+?886\-?|0)?9\d{8}$/,
};

/**
 * 万用正则
 */
export const NormalRegExp = /^[0-9]{5,15}$/;
