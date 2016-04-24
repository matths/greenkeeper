xtag.register('x-avatar', {
    content: '<img src="">',
    lifecycle: {
        created: function () {
            this.xtag.img = this.querySelector('img');
        }
    }
});

xtag.register('x-task', {
    content: "<div><a href=''><h2></h2><p></p><h3></h3><button class='action' id='btncheckin'></button></a></div>",
    lifecycle: {
        created: function () {
            this.xtag.link = this.querySelector('a');
            this.xtag.title = this.querySelector('h2');
            this.xtag.description = this.querySelector('p');
            this.xtag.project = this.querySelector('h3');
        }
    },
    methods: {
        setValues: function (task) {
            this.xtag.link.href = "http://lizu.net:5000/task/checkin/" + task.id;
            this.xtag.title.textContent = task.title;
            this.xtag.description.textContent = task.description;
            this.xtag.project.textContent = task.project + " | " + task.client;
        }
    }
});


xtag.register('x-streamitem', {
    content: '<div><div class="event"></div><div class="text-box"><h2></h2><p></p></div></div><div class="avatar-container"></div><h3></h3>',
    lifecycle: {
        created: function () {
            this.xtag.event = this.querySelector('div.event');
            this.xtag.title = this.querySelector('h2');
            this.xtag.description = this.querySelector('p');
            this.xtag.avatars = this.querySelector('div.avatar-container');
            this.xtag.moment = this.querySelector('h3');
        }
    },
    accessors: {
        title: {
            attribute: {},
            set: function (value) {
                this.xtag.title.textContent = value;
            }
        },
        description: {
            attribute: {},
            set: function (value) {
                this.xtag.description.textContent = value;
            }
        },
        moment: {
            attribute: {},
            set: function (value) {
                this.xtag.moment.textContent = value;
            }
        },
        event: {
            attribute: {},
            set: function (value) {
                var color = '#58c000';
                if (value == 'flame') {
                    color = '#e10000';
                }
                $(this.xtag.event).css('background-color', color);
            }
        },
    },
    methods: {
        buildUsers: function (users) {
            var self = this.xtag.avatars;
            $.each(users, function (key, value) {
                var el = $('<x-avatar></x-avatar>');
                el.get(0).xtag.img.src = "img/" + value.avatar;
                $(self).append(el);
            });
        }
    }
});

xtag.register('x-usertask', {
    lifecycle: {
        created: function () {
            this.xtag.title = this.querySelector('h2');
            this.xtag.moment = this.querySelector('span');
            this.xtag.description = this.querySelector('p');
            this.xtag.img = this.querySelector('img');
            this.initialFetch();
        }
    },
    methods: {
        initialFetch: function () {
            var self = this;
            $.getJSON("http://lizu.net:5000/currentStreamItem/cb5847ff-ee2b-e860-7bdd-e6ce96481e74", function(data) {
                self.xtag.title.textContent = data.title;
                self.xtag.moment.textContent = data.moment;
                self.xtag.description.textContent = data.description;
                self.xtag.img.src = "img/" + data.users[0].avatar;
                $('.action').hide();
                if (data.event == "none") {
                    $('#btncheckin').css('display', 'block');
                }
                else if (data.event == "flame") {
                    $('#btnunflame').css('display', 'block');
                }
                else {
                    $('#btncheckout, #btnflame').css('display', 'block');
                }
            });
        }
    }
});

xtag.register('x-tasks', {
    lifecycle: {
        created: function () {
            this.xtag.tasks = $(this.querySelector('x-tasks'));
            this.initialFetch();
        }
    },
    methods: {
        initialFetch: function () {
            var self = this;
            $.getJSON("http://lizu.net:5000/tasks", function (data) {
                $.each(data, function (key, task) {
                    var el = $('<x-task></x-task>');
                    el.get(0).setValues(task);
                    $(self).append(el);
                });
            });
        }
    }
});

xtag.register('x-searchmodal', {
    lifecycle: {
        created: function () {
            this.xtag.searchmodal = $(this);
            this.xtag.searchForm = this.querySelector('form');
            this.xtag.searchInput = this.querySelector('input');
            var self = this;
            self.xtag.searchmodal.slideToggle("slow");
            $('#btnsearch').click(function() {
                self.xtag.searchmodal.slideToggle();
            });
            $(this.xtag.searchForm).submit(function (e) {
                e.preventDefault();
                $.get("http://lizu.net:5000/search/" + $(self.xtag.searchInput).val(), function (data) {
                    $('x-app').get(0).xtag.app.fillTasks(data);
                });
            });
        }
    }
});

xtag.register('x-app', {
    lifecycle: {
        created: function () {
            this.xtag.app = this;
            this.xtag.latesttasks = $(this.querySelector('x-latesttasks'));
            this.xtag.taskloop = $(this.querySelector('x-taskloop'));
            this.xtag.usertask = $(this.querySelector('x-usertask'));
            this.initialFetch();
        }
    },
    methods: {
        initialFetch: function () {
            var self = this;
            // $.getJSON("http://127.0.0.1:8000/frontend/api.json", function (data) {
            $.getJSON("http://lizu.net:5000/stream", function (data) {
                self.fillTasks(data);
            });
        },
        initSlider: function (self) {
            var itemsToShow = $(document).width() > 1024 ? 6 : 3;
            self.xtag.taskloop.css("height", 0 + "px");
            var height = $(document).height() - $('header').height() - self.xtag.latesttasks.height() - self.xtag.usertask.height() - $('.x-app>h2').outerHeight(true);
            var itemHeight = parseInt((height + 0.5) / itemsToShow);
            $(">div", self.xtag.taskloop).css("height", itemHeight + "px");
            $(">div", self.xtag.taskloop).css("overflow", "hidden");
            height = itemHeight * itemsToShow;
            self.xtag.taskloop.css("height", height + "px");
            if (typeof self.xtag.taskloop.slick != "undefined") {
                self.xtag.taskloop.slick({
                    slidesToShow: itemsToShow,
                    slidesToScroll: 1,
                    vertical: true,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    arrows: false,
                    pauseOnHover: false
                });
            }
        },
        fillTasks: function(data) {
            var self = this;
            $.each(data, function (key, value) {
                var el = $('<x-streamitem></x-streamitem>');
                el.attr('title', value.title);
                el.attr('description', value.description);
                el.attr('moment', value.moment);
                el.attr('event', value.event);
                el.get(0).buildUsers(value.users);

                if (value.event == "flame" && self.xtag.latesttasks != null) {
                    self.xtag.latesttasks.append(el);
                } else {
                    var el = $("<div></div>").append(el);
                    self.xtag.taskloop.append(el);
                }
            });
            self.initSlider(self);
        }
    }
});