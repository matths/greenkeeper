xtag.register('x-avatar', {
	content: '<img src="">',
	lifecycle: {
		created: function () {
			this.xtag.img = this.querySelector('img');
		}
	}
});

xtag.register('x-task', {
	content: '<div><h2></h2><p></p></div><div class="avatar-container"></div>',
	lifecycle: {
		created: function () {
			this.xtag.title = this.querySelector('h2');
			this.xtag.description = this.querySelector('p');
			this.xtag.avatars = this.querySelector('div.avatar-container');
		}
	},
	accessors: {
		title: {
            attribute: {
            },
			set: function (value) {
        	    this.xtag.title.textContent = value;
        	}
		},
        description: {
            attribute: {
            },
            set: function (value) {
                this.xtag.description.textContent = value;
            }
        },
	},
	methods: {
		buildUsers: function (users) {
			var self = this.xtag.avatars;
            $.each(users, function(key, value) {
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
            this.xtag.latesttasks = this.querySelector('x-latesttasks');
            this.xtag.taskloop = this.querySelector('x-taskloop');
            this.initialFetch();
		}
	},
    methods: {
        initialFetch: function () {
        	var self = this;
            $.getJSON("http://127.0.0.1:8000/api.json", function (data) {
//			$.getJSON("http://greenkeeper.eu-gb.mybluemix.net/tasks", function (data) {
                $.each(data, function(key, value) {
                    var el = $('<x-task></x-task>');
                    el.attr('title', value.title);
                    el.attr('description', value.description);
                    el.get(0).buildUsers(value.users);

                    if (value.event == "flame") {
                	    $(self.xtag.latesttasks).append(el);
                	} else {
            		    $(self.xtag.taskloop).append(el);
            		}
                });
            });

        }
    }
});