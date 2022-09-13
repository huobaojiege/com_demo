/**
 * 防抖函数
 * @param func 需要被防抖的函数
 * @param delay 防抖的时间，毫秒数
 */
export function debounce(func: Function, delay: number) {
  let timer: number = 0;
  return function (args: any) {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      func(args);
      timer = 0;
    }, delay);
  };
}

/**
 * 全英文校验
 */
export function notChinese(value: string) {
  let pattern = /[^\x00-\xff]/g;
  if (pattern.test(value)) return false;
  return true;
}

/**
 * 判断对象是否为空
 */

export function isEmptyObject(obj: {}): boolean {
  return !obj || Object.keys(obj).length === 0;
}

/**
 *
 * 对比两个数组内容是否一致
 * @param arr1 数组1
 * @param arr2 数组2
 */
export function checkArray(arr1: any[], arr2: any[]) {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    if (arr2.length !== arr1.length) {
      return false;
    } else {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return false;
        }
      }
      return true;
    }
  } else {
    return false;
  }
}

/**
 *
 * 对比两个对象的属性内容是否一致
 * @param obj1 数组1
 * @param obj2 数组2
 */

export function checkObject(obj1: any, obj2: any, keys: string[]) {
  for (const k of keys) {
    if (obj1[k] != obj2[k]) {
      return false;
    }
  }
  return true;
}

/**
 * 解析URL参数
 *  假设目前位于 https://****com/index?id=154513&age=18;
 * getSearchParams(); // {id: "154513", age: "18"}
 */
export const getSearchParams = () => {
  const searchPar = new URLSearchParams(window.location.search);
  const paramsObj: { [key: string]: any } = {};
  for (const [key, value] of searchPar.entries()) {
    paramsObj[key] = value;
  }
  return paramsObj;
};

/**
 * 获取地址栏参数
 */
export function GetQueryString(
  url: string,
  name: string,
  default_value: string
) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let uirval = url.split("?");
  if (uirval.length > 1) {
    var r = uirval[1].substr(0).match(reg);
    if (r != null) return r[2];
  }
  return default_value;
}

/**
 *   四舍五入保留2位小数，如：2，会在2后面补上00.即2.00
 */
export function toDecimal2(x: any) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var fa = Math.round(x * 100) / 100;
  var s = fa.toString();
  var rs = s.indexOf(".");
  if (rs < 0) {
    rs = s.length;
    s += ".";
  }
  while (s.length <= rs + 2) {
    s += "0";
  }
  return s;
}

/**
 *   金额转为大写金额
 */

export function convertCurrency(money: any) {
  //汉字的数字
  var cnNums = new Array(
    "零",
    "壹",
    "贰",
    "叁",
    "肆",
    "伍",
    "陆",
    "柒",
    "捌",
    "玖"
  );
  //基本单位
  var cnIntRadice = new Array("", "拾", "佰", "仟");
  //对应整数部分扩展单位
  var cnIntUnits = new Array("", "万", "亿", "兆");
  //对应小数部分单位
  var cnDecUnits = new Array("角", "分", "毫", "厘");
  //整数金额时后面跟的字符
  var cnInteger = "整";
  //整型完以后的单位
  var cnIntLast = "元";
  //最大处理的数字
  var maxNum = 999999999999999.9999;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = "";
  //分离金额后用的数组，预定义
  var parts;
  if (money == "") {
    return "";
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    //超出最大处理数字
    return "";
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  //转换为字符串
  money = money.toString();
  if (money.indexOf(".") == -1) {
    integerNum = money;
    decimalNum = "";
  } else {
    parts = money.split(".");
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == "0") {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        //归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  //小数部分
  if (decimalNum != "") {
    var decLen = decimalNum.length;
    for (var ia = 0; ia < decLen; ia++) {
      var ns = decimalNum.substr(ia, 1);
      if (ns != "0") {
        chineseStr += cnNums[Number(ns)] + cnDecUnits[ia];
      }
    }
  }
  if (chineseStr == "") {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == "") {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

/**
 * 千分位分隔符
 */
export function thouSepar(s: any = 0) {
  var noNegative = true; //默认是正值。
  s = parseFloat(s + "").toFixed(2);
  s = s + ""; //转换成字符串
  if (parseFloat(s) < 0) {
    //是负数
    s = Math.abs(s).toFixed(2) + "";
    noNegative = false;
  }
  var zheng = s.split(".")[0];
  var dian = s.split(".")[1];
  //将整数部分，利用字符串的charAt() 方法，转换成数组。
  var zhengArr = [];
  for (let i = 0; i < zheng.length; i++) {
    zhengArr.push(zheng.charAt(i));
  }
  zhengArr = zhengArr.reverse();
  var t = "";
  for (let i = 0; i < zhengArr.length; i++) {
    if (i % 3 == 2 && i != zhengArr.length - 1) {
      //为第三位，并且并不是最后了。如123456时，6并不加,
      t += zhengArr[i] + ",";
    } else {
      t += zhengArr[i] + ""; //加上空格
    }
  }
  return (noNegative ? "" : "-") + t.split("").reverse().join("") + "." + dian;
}

/**
 * 金额格式化
 */
//  {number} number：要格式化的数字
//  {number} decimals：保留几位小数
//  {string} dec_point：小数点符号
//  {string} thousands_sep：千分位符号
// 示例：

// moneyFormat(10000000) // 10,000,000.00
// moneyFormat(10000000, 3, '.', '-') // 10-000-000.000

export const moneyFormat = (
  number: number | string,
  decimals: number,
  dec_point: string,
  thousands_sep: string
) => {
  number = (number + "").replace(/[^0-9+-Ee.]/g, "");
  const n = !isFinite(+number) ? 0 : +number;
  const prec = !isFinite(+decimals) ? 2 : Math.abs(decimals);
  const sep = typeof thousands_sep === "undefined" ? "," : thousands_sep;
  const dec = typeof dec_point === "undefined" ? "." : dec_point;
  let s: any = "";
  const toFixedFix = function (n: any, prec: any) {
    const k = Math.pow(10, prec);
    return "" + Math.ceil(n * k) / k;
  };
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  const re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
};

/**
 * 超过多少字符显示胜率号 默认处理为15
 */
export function ellipsisHandle(val: string, handleLength: number = 15) {
  if (val && val.length > 0) {
    if (val.length <= handleLength) {
      return val;
    } else {
      return `${val.slice(0, handleLength)}...`;
    }
  } else {
    return "";
  }
}

// 浮点型数据处理

/**
 * 加
 */
export function Numberadd(a: number, b: number): number {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return (
    (e = Math.pow(10, Math.max(c, d))), (Numbermul(a, e) + Numbermul(b, e)) / e
  );
}
/**
 * 减
 */

export function Numbersub(a: number, b: number): number {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return (
    (e = Math.pow(10, Math.max(c, d))), (Numbermul(a, e) - Numbermul(b, e)) / e
  );
}

/**
 * 乘
 */
export function Numbermul(a: number, b: number): number {
  var c = 0,
    d = a.toString(),
    e = b.toString();
  try {
    c += d.split(".")[1].length;
  } catch (f) {
    // //console.error("___", f);
  }
  try {
    c += e.split(".")[1].length;
  } catch (f) {
    // //console.error("___", f);
  }
  return (
    (Number(d.replace(".", "")) * Number(e.replace(".", ""))) / Math.pow(10, c)
  );
}

/**
 * 除
 */

export function Numberdiv(a: number, b: number): number {
  var c,
    d,
    e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) {
    // //console.error("___", g);
  }
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) {
    // //console.error("___", g);
  }
  return (
    (c = Number(a.toString().replace(".", ""))),
    (d = Number(b.toString().replace(".", ""))),
    Numbermul(c / d, Math.pow(10, f - e))
  );
}

/**
 * 校验数据类型
 */
//  typeOf('树哥')  // string
//  typeOf([])  // array
//  typeOf(new Date())  // date
//  typeOf(null) // null
//  typeOf(true) // boolean
//  typeOf(() => { }) // function
export function typeOf(obj: any) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

/**
 * 校验数据类型
 * str 待转换的字符串
 * type 1-全大写 2-全小写 3-首字母大写
 *
 * turnCase('vue', 1) // VUE
 * turnCase('REACT', 2) // react
 * turnCase('vue', 3) // Vue
 */
export const turnCase = (str: string, type: number) => {
  switch (type) {
    case 1:
      return str.toUpperCase();
    case 2:
      return str.toLowerCase();
    case 3:
      //return str[0].toUpperCase() + str.substr(1).toLowerCase() // substr 已不推荐使用
      return str[0].toUpperCase() + str.substring(1).toLowerCase();
    default:
      return str;
  }
};

/**
 * 校验数据类型
 */
//  const responseList = [
//   { id: 1, name: '树哥' },
//   { id: 2, name: '黄老爷' },
//   { id: 3, name: '张麻子' },
//   { id: 1, name: '黄老爷' },
//   { id: 2, name: '张麻子' },
//   { id: 3, name: '树哥' },
//   { id: 1, name: '树哥' },
//   { id: 2, name: '黄老爷' },
//   { id: 3, name: '张麻子' },
// ]

// uniqueArrayObject(responseList, 'id')
// [{ id: 1, name: '树哥' },{ id: 2, name: '黄老爷' },{ id: 3, name: '张麻子' }]

export const uniqueArrayObject = (
  arr: Array<{ [key: string]: any }> = [],
  key = "id"
) => {
  if (arr.length === 0) return;
  let list = [];
  const map: {
    [key: string]: any;
  } = {};
  arr.forEach((item) => {
    if (!map[item[key]]) {
      map[item[key]] = item;
    }
  });
  list = Object.values(map);

  return list;
};

/**
 * 滚动到页面顶部
 */
export const scrollToTop = () => {
  const height = document.documentElement.scrollTop || document.body.scrollTop;
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, height - height / 8);
  }
};

/**
 * 滚动到元素位置
 */
//  smoothScroll('#target');
// 平滑滚动到 ID 为 target 的元素
export const smoothScroll = (element: string) => {
  document.querySelector(element).scrollIntoView({
    behavior: "smooth",
  });
};
