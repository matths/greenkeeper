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
	content: '<x-avatar user="">',
	lifecycle: {
		created: function () {
			this.xtag.img = this.querySelector('x-avatar');
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
            $.getJSON("http://127.0.0.1:8000/api.json", function (data) {
                var self = $(this);
                $.each(data, function(key, value) {
                    var el = $('<x-task></x-task>');
                    el.attr('title', value.title);
                    self.htmlConent = self.htmlConent + el;
                });
            });

        }
    }
});
