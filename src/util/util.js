
/****************内部函数*****************/
function dealDate(a) {
  return a < 10 ? '0' + a : a
}
/****************************************/

let util = {
  //年月日
  formatDate(time) {
    var dd
    if (time == null) //当前日期
      dd = new Date()
    else
      dd = new Date(time)
    var y = dd.getFullYear()
    var m = dd.getMonth() + 1
    var d = dd.getDate()
    m = dealDate(m)
    d = dealDate(d)
    return y + '-' + m + '-' + d
  },

  //月-日-时-分
  formatDate1(time) {
    var dd = new Date(time)
    var m = dealDate(dd.getMonth() + 1)
    var d = dealDate(dd.getDate())
    var h = dealDate(dd.getHours())
    var min = dealDate(dd.getMinutes())
    return m + '-' + d + ' ' + h + ':' + min
  },

  getPassDate(passDay, time) { //默认从当前日期开始算
    let dd
    if (time)
      dd = new Date(time);
    else
      dd = new Date();
    dd.setDate(dd.getDate() + passDay);
    dd = this.formatDate(dd);
    return dd;
  },

  getCookie(name) {
    if (document.cookie.length > 0) {
      var start = document.cookie.indexOf(name + '=')
      if (start !== -1) {
        start = start + name.length + 1
        var end = document.cookie.indexOf(';', start)
        if (end === -1) end = document.cookie.length
        return unescape(document.cookie.substring(start, end))
      }
    }
    return ''
  },

  //名字  值   过期时间(秒)
  setCookie(name, value, seconds) {
    seconds = seconds || 0
    var expires = ''
    if (seconds !== 0) {
      var date = new Date()
      date.setTime(date.getTime() + (seconds * 1000))
      expires = '; expires=' + date.toGMTString()
    }
    document.cookie = name + '=' + escape(value) + expires + '; path=/'
  },
   
  delAllCookie() {
    var myDate = new Date();
    myDate.setTime(-1000); //设置时间    
    var data = document.cookie;
    var dataArray = data.split("; ");
    for (var i = 0; i < dataArray.length; i++) {
      var varName = dataArray[i].split("=");
      document.cookie = varName[0] + "=''; expires=" + myDate.toGMTString();
    }
  },

  //localStorage删除指定键对应的值
  deleteStorageItem(storageInfo) {
    for (let i = 0, len = storageInfo.length; i < len; i++) {
      window.localStorage.removeItem(storageInfo[i]);
    }
  },

  //字符串去掉前后空格
  trim(str) {
    return String(str).replace(/(^\s*)|(\s*$)/g, "");
  },


  //去掉字符前后空格且判断字符串长度（区分中文和英文）
  strLen(str) {
    str = str.replace(/(^\s*)|(\s*$)/g, "")
    var len = 0;
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      //单字节加1 
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        len++;
      } else {
        len += 2;
      }
    }
    return len;
  },

  handleSessionExpired (vue, callback) {
    vue.$alert('Your login status has expired, please relogin.', 'Session Expire', {
      confirmButtonText: 'Confirm',
      showClose: false,
      callback: action => {
        if (callback) {
          callback();
        };
        vue.$router.replace({name:"login"});
      }
    });
    return 0
  },

  handleError (vue, error, callback) {
    if (error) {
      let title = "Error";
      let msg = error.error_user_msg || error.message || error.code || "Unknown error."
      vue.$alert(msg, title, {
        confirmButtonText: 'Confirm',
        type: "error",
        callback: action => {
          if (callback) {
            callback();
          };
        }
      });
      return 0;
    };
  },

  clone (object) {
    if (typeof(object) == 'object') {
      let ret;
      if (typeof Array.isArray === "function" && Array.isArray(object)) {
        ret = [];
      }
      else {
        ret = {};
      }
      for (let key in object){
        let value = object[key];
        if (typeof(value) == 'object') {
          ret[key] = this.clone(value);
        }
        else{
          ret[key] = value;
        }
      }
      return ret;
    };
  },

  isValidNumber(number) {
    if (number == "" || number == null) return false;
    let pattern = "^[0-9]+(\\.[0-9]+)?$"; //正实数
    let regex = new RegExp(pattern);
    return regex.test(number);
  },
}


export default util;
