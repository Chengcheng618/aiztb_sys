export function strNumSize(tempNum) {
  var stringNum = tempNum.toString();
  var index = stringNum.indexOf(".");
  var newNum = stringNum;
  if (index != -1) {
    newNum = stringNum.substring(0, index);
  }
  return newNum.length;
}

export function unitConvert(num) {
  var m = {
    num: 0,
    unit: ""
  }
  var moneyUnits = ["元", "万元", "亿元", "万亿"];
  var dividend = 10000;
  var curentNum = num;
  let numTostr = num.toString()
  if(numTostr.includes('e+')) {
    //得到科学计数法之前的数字，和 10次方
    let numarr = numTostr.split('e+')
    m.num = numarr[0].substr(0,4)
    let formatNum = numarr[1]
    if(formatNum >= 12 && formatNum < 16) {
      m.unit = '兆'
    } else if(formatNum >= 16 && formatNum < 20) {
      m.unit = '京'
    } else if(formatNum >= 20 && formatNum < 24) {
      m.unit = '垓'
    } else if(formatNum >= 24 && formatNum < 28) {
      m.unit = '秭'
    } else {
      m.unit = '穰'
    }


  } else {
    //转换数字
    var curentUnit = moneyUnits[0];
    //转换单位
    for (var i = 0; i < 4; i++) {
      curentUnit = moneyUnits[i]
      if (strNumSize(curentNum) < 5) {
        break;
      }
      curentNum = curentNum / dividend
    }
    m.num = Number(curentNum).toFixed(0)
    m.unit = curentUnit
  }
  return m
}