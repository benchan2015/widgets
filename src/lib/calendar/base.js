var calendar = function(options) {
    this.options = options ? options : {};
    if (!this.options.el) {
        console.error('The el must be existed');
        return;
    }
    this.el = this.options.el;
    this.el.html('');
    this.html = '';
    this.currentDate = this.options.currentDate ? this.options.currentDate : new Date();
    
    this.date = {};
    this._initDate();
    this._initHTML();
    this._addBorder();
    this._bindEvent();
    this.isShow = false;

}
/*显示组件*/
calendar.prototype.show = function() {
    this.el.show();
    this.isShow = true;
}
/*隐藏组件*/
calendar.prototype.hide = function() {
    this.el.hide();
    this.isShow = false;
}
/*获取值*/
calendar.prototype.getValue = function() {
    return this.el.find('li.selected').attr('data-value')
}

/*初始化当前日期的信息*/
calendar.prototype._initDate = function() {
    //年
    this.date.year = this.currentDate.getFullYear();
    //月
    this.date.month = this.currentDate.getMonth() + 1;
    //日
    this.date.date = this.currentDate.getDate();
    //第一天星期几
    this.date.day = this.currentDate.getDay();
    //第一天星期几
    this.date.firstDay = new Date(this.date.year, this.date.month - 1, 1).getDay();
    //本月有多少天
    this.date.totalDays = new Date(this.date.year, this.date.month, 0).getDate();

    if (this.date.firstDay === 0) {
        this.date.firstDay = (42 - this.date.totalDays) - (42 - this.date.totalDays) % 7;
        if (this.date.firstDay === 0) {
            this.date.firstDay = 7;
        }
        this.date.firstDay = this.date.firstDay > 7 ? 7 : this.date.firstDay;

    }


}
/*初始化html*/
calendar.prototype._initHTML = function() {
    /*初始化头*/
    this.el.addClass('ben-calendar');
    this.html += '<ul> <li>SU</li> <li>MO</li> <li>TU</li> <li>WE</li><li>TH</li> <li>FR</li> <li>SA</li></ul>';
    this.el.append(this.html);
    this.el.find('li:lt(7)').addClass('head');
    this.html = '';
    this._getLastMonthInfo();
    /*初始化上个月*/
    for (var i = this.date.firstDay; i > 0; i--) {
        this.html += '<li class=" gray" >' + (this.lastMonthInfo.totalDays - i + 1) + '</li>';
    }
    /*初始化这个月*/
    for (var i = 1; i <= this.date.totalDays; i++) {
        var _day = i;
        if (i < 10) {
            _day = '0' + i;
        }
        var _month = this.date.month;
        if (_month < 10) {
            _month = '0' + _month;
        }
      
            this.html += '<li data-clickCount="0" data-value=' + this.date.year + '/' + _month + '/' + _day + ' class="currentMonth">' + i + '</li>';
       

    }
    this.el.find('ul').append(this.html);
    this.html = '';

    /*初始化下个月*/
    var currentLiListLength = this.el.find('ul').find('li:gt(6)').length;
    if (currentLiListLength < 42) {
        var nextLength = 42 - currentLiListLength;
        var nextHtml = '';
        for (var i = 1; i <= nextLength; i++) {
            nextHtml += '<li class=" gray">' + i + '</li>'
        }
        this.el.find('ul').append(nextHtml);
    }

}
/*添加边框*/
calendar.prototype._addBorder = function() {
    this.el.find('ul').find('li:gt(6)').each(function() {
        if ($(this).index() % 7 === 0) {
            $(this).css({
                'border-left': '1px solid #eeeeee',
                'border-right': '1px solid #eeeeee'
            })
        } else {
            $(this).css({
                'border-right': '1px solid #eeeeee'
            })
        }
        $(this).css({
            'border-bottom': '1px solid #eeeeee'
        })

    });
}
/*获取上个月的信息*/
calendar.prototype._getLastMonthInfo = function() {
    this.lastMonthInfo = {};
    if (this.date.month === 1) {
        this.lastMonthInfo.year = +this.date.year - 1;
        this.lastMonthInfo.month = 12;
    } else {
        this.lastMonthInfo.year = this.date.year;
        this.lastMonthInfo.month = this.date.month - 1;
    }
    //本月有多少天
    this.lastMonthInfo.totalDays = new Date(this.lastMonthInfo.year, this.lastMonthInfo.month, 0).getDate();
}
calendar.prototype._bindEvent = function() {
    var self = this;
    this.el.find('li.currentMonth').on('touchstart', function() {
        self.el.find('li.currentMonth').removeClass('selected');
        $(this).addClass('selected');
        self.selectedDate = $(this).attr('data-value');
    })
}
