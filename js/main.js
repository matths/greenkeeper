xtag.register('x-avatar', {
	content: '<img src="">',
	lifecycle: {
		created: function () {
			this.xtag.img = this.querySelector('img');
			this.xtag.img.src = "bla.png";
		}
	}
});

xtag.register('x-task', {
	lifecycle: {
		created: function () {
			this.xtag.avatar = this.querySelector('x-avatar');
		}
	},
	methods: {
		buildUsers: function (users) {
			var self = this;
            $.each(users, function(key, value) {
	            var el = $('<x-avatar></x-avatar>');
	            el.attr('title', value.title);
	            el.get(0).xtag.img.src = value.avatar;
                $(self).append(el);
			});
		}
	}
});

xtag.register('x-latesttasks', {
	lifecycle: {
		created: function () {
            this.fetch();
		}
	},
    methods: {
        fetch: function () {
        	var self = this;
            $.getJSON("http://127.0.0.1:8000/api.json", function (data) {
                $.each(data, function(key, value) {
                    var el = $('<x-task></x-task>');
                    el.attr('title', value.title);
                    el.get(0).buildUsers(value.users);
                    $(self).append(el);
                });
            });

        }
    }
});
