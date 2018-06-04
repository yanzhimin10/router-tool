function Loading () {
	this.ref = 0;
	this.loading = null;

	this.show = function () {
		if (this.ref <= 0) {
			this.loading = this.vue.$loading({
	          lock: false,	//lock: true 在同步回调的时候会产生滑动条消失的bug,nextTick也无法避免; 另一种解决方式是: 用setTimeOut把回调时间设长一点
	          text: 'Loading',
	          spinner: 'el-icon-loading',
	          background: 'rgba(0, 0, 0, 0.7)'
	        });
	        this.ref = 1;
		}
		else{
			this.ref++;
		}
	}

	this.hide = function () {
		let vue = this;
		this.vue.$nextTick(function() {
			if (vue.ref > 0) {
				vue.ref--;
				if (vue.ref == 0) {
					vue.loading.close();
					vue.loading = null;
				};
			}
		});
	}

	this.setVue = function (vue) {
		this.vue = vue;
	}
}

export default new Loading();