var datetime = function(options) {
        this.options = options ? options : {};
        if (!this.options.el) {
            console.error('The el must be existed');
            return;
        }
        this.el = this.options.el;
        this.platform = this.options.platform ? this.options.platform : 'pc';
        this.eventType = this.platform === 'pc' ? "click" : 'touchstart';
        this.el.html('');
        this.currentDate = new Date().Format('yyyy/MM/dd');
        this._initHTML();
        this._bindEvent();

        //calendar.call(this, options);
    }
    //datetime.prototype = Object.create(calendar.prototype);
datetime.prototype._initHTML = function() {
    this.el.addClass('ben-datetime');
    var html = '<div class="ben-datetime-top">' + '<a class="left"><img src="../../images/arrow_left.png" /></a><a class="center">2015-11</a><a class="right"><img src="../../images/arrow_right.png" /></a>'
    '+</div>';
    this.el.append(html);

    html = "<ul><li></li><li></li><li></li></ul>";
    this.el.append(html);
    this.preMonth = this.el.find('li:eq(0)');
    this.currentMonth = this.el.find('li:eq(1)');
    this.nextMonth = this.el.find('li:eq(2)');
    this._createCalendar();


    //calendar.prototype._initHTML.call(this);

};
datetime.prototype._createCalendar = function() {
    this.el.find('a.center').html(this.currentDate.replace(/\//gi, '-').substring(0, this.currentDate.lastIndexOf('/')));

    new calendar({
        el: this.preMonth,
        currentDate: new Date(getPreMonth(this.currentDate)),
        platform: this.platform
    });
    new calendar({
        el: this.currentMonth,
        currentDate: new Date(this.currentDate),
        platform: this.platform
    });
    new calendar({
        el: this.nextMonth,
        currentDate: new Date(getNextMonth(this.currentDate)),
        platform: platform
    });
};
datetime.prototype._bindEvent = function() {
    var self = this;
    this.el.find('img:eq(0)').on(this.eventType, function() {
        self.el.find('>ul:eq(0)').animate({
            'margin-left': '-200%'
        }, 500, function() {
            self.el.find('>ul:eq(0)').find('>li:eq(2)').remove().prependTo(self.el.find('>ul:eq(0)'));;
            self.el.find('>ul:eq(0)').css({
                'margin-left': '-100%'
            });
            self.currentDate = getPreMonth(self.currentDate);
            self._createCalendar();
        })
    })
    this.el.find('img:eq(1)').on(this.eventType, function() {
        self.el.find('>ul:eq(0)').animate({
            'margin-left': '0%'
        }, 500, function() {
            self.el.find('>ul:eq(0)').find('>li:eq(0)').remove().appendTo(self.el.find('>ul:eq(0)'));;
            self.el.find('>ul:eq(0)').css({
                'margin-left': '-100%'
            });
            self.currentDate = getNextMonth(self.currentDate);
            self._createCalendar();
        })
    })
}
