 function showMyInfo() {
     var style = " text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:1.3em";
     console.log("%cAuthor:Chenbin", style);
     console.log("%cHomepage:http://github.com/benchan2015", style);
     console.log("%cEmail:421416050@qq.com", style);
     console.log("%cQQ:421416050", style);
     console.log("%cRemark:This demo only shows the current month's calendar,it depends on jquery", style);
 }
 // 对Date的扩展，将 Date 转化为指定格式的String
 // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
 // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 // 例子： 
 // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
 // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
 Date.prototype.Format = function(fmt) { //author: meizz 
         var o = {
             "M+": this.getMonth() + 1, //月份 
             "d+": this.getDate(), //日 
             "h+": this.getHours(), //小时 
             "m+": this.getMinutes(), //分 
             "s+": this.getSeconds(), //秒 
             "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
             "S": this.getMilliseconds() //毫秒 
         };
         if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
         for (var k in o)
             if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
         return fmt;
     }
     /**
      * 获取上一个月
      *
      * @date 格式为yyyy-mm-dd的日期，如：2014/01/25
      */
 function getPreMonth(date) {
     var arr = date.split('/');
     var year = arr[0]; //获取当前日期的年份
     var month = arr[1]; //获取当前日期的月份
     var day = arr[2]; //获取当前日期的日
     var days = new Date(year, month, 0);
     days = days.getDate(); //获取当前日期中月的天数
     var year2 = year;
     if (month.substring(0, 1) === '0') {
         month = month.substring(1, 2);
     }
     var month2 = parseInt(month) - 1;
     if (month2 == 0) {
         year2 = parseInt(year2) - 1;
         month2 = 12;
     }
     var day2 = day;
     var days2 = new Date(year2, month2, 0);
     days2 = days2.getDate();
     if (day2 > days2) {
         day2 = days2;
     }
     if (month2 < 10) {
         month2 = '0' + month2;
     }
     var t2 = year2 + '/' + month2 + '/' + day2;
     return t2;
 }

 /**
  * 获取下一个月
  *
  * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
  */
 function getNextMonth(date) {
     var arr = date.split('/');
     var year = arr[0]; //获取当前日期的年份
     var month = arr[1]; //获取当前日期的月份
     var day = arr[2]; //获取当前日期的日
     var days = new Date(year, month, 0);
     days = days.getDate(); //获取当前日期中的月的天数
     var year2 = year;
     var month2 = parseInt(month) + 1;
     if (month2 == 13) {
         year2 = parseInt(year2) + 1;
         month2 = 1;
     }
     var day2 = day;
     var days2 = new Date(year2, month2, 0);
     days2 = days2.getDate();
     if (day2 > days2) {
         day2 = days2;
     }
     if (month2 < 10) {
         month2 = '0' + month2;
     }

     var t2 = year2 + '/' + month2 + '/' + day2;
     return t2;
 }
