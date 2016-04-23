xtag.register('x-avatar', {
    content: '<img src="">',
    lifecycle: {
        created: function () {
            this.xtag.img = this.querySelector('img');
        }
    }
});

xtag.register('x-task', {
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

xtag.register('x-latesttasks', {
    lifecycle: {
        created: function () {
        }
    },
});

xtag.register('x-taskloop', {
    lifecycle: {
        created: function () {
        }
    },
});

xtag.register('x-app', {
    lifecycle: {
        created: function () {
            this.xtag.latesttasks = $(this.querySelector('x-latesttasks'));
            this.xtag.taskloop = $(this.querySelector('x-taskloop'));
            this.initialFetch();
        }
    },
    methods: {
        initialFetch: function () {
            var self = this;
            // $.getJSON("http://127.0.0.1:8000/frontend/api.json", function (data) {
                $.getJSON("http://lizu.net:5000/stream", function (data) {
                $.each(data, function (key, value) {
                    var el = $('<x-task></x-task>');
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
            });
        },
        initSlider: function (self) {
                var itemsToShow = $(document).width() > 1024 ? 6 : 4;
                self.xtag.taskloop.css("height", 0 + "px");
                var height = $(document).height() - $('header').height() - self.xtag.latesttasks.height() - $('x-app>h2').outerHeight(true);
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
        }
    }
});