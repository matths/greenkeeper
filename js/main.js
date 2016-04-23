xtag.register('x-avatar', {
	content: '<img src="">',
	lifecycle: {
		created: function () {
			this.xtag.img = this.querySelector('img');
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
			this.xtag.tasks = xtag.queryChildren(this, 'x-card');
		}
	}
});
