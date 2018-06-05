<template>
	<div>
		Logi
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		created() {
			const _this = this;
			setTimeout(function() {
				_this.refresh()
			}, 500)
		},
		methods: {
			refresh() {
				// this.updateRouterStatus();
				this.getRouterStatus();
				// this.updateRouterSetting();
				// this.getRouterSetting();
			},
			login() {
				this.$net.login("root", 123, function(status) {
					console.log(status);
				});
			},
			updateRouterStatus() {
				const _this = this;
				let info = {
					mac_address: "A1-2",
			    version: "1.0",
			    to_4g_count: 10,
			    to_eth_count: 3,
			    flow_4g: 233,
				}

				_this.$activity.show();
				_this.$net.updateRouterStatus(info, function(status) {
					_this.$activity.hide();
					console.log(status);
				});
			},
			getRouterStatus() {
				const _this = this;
				let info = {
					startDate: "2018=06-03",
					endDate: "2018-06-04",
				}
				_this.$activity.show();
				_this.$net.getRouterStatus(info, function(status, dataList) {
					_this.$activity.hide();
					console.log(status, dataList);
				});
			},
			updateRouterSetting() {
				const _this = this;
				let info = {
					mac_address: "A1-1",
					name: "Router1",
					flow_4g: "300",
				}
				_this.$activity.show();
				_this.$net.updateRouterSetting(info, function(status, dataList) {
					_this.$activity.hide();
					console.log(status);
				});
			},
			getRouterSetting() {
				const _this = this;
				_this.$activity.show();
				_this.$net.getRouterSetting(function(status, dataList) {
					_this.$activity.hide();
					console.log(status, dataList);
					// _this.removeRouterSetting(dataList[0]);
				});
			},
			removeRouterSetting(info) {
				const _this = this;
				_this.$activity.show();
				_this.$net.removeRouterSetting(info, function(status, dataList) {
					_this.$activity.hide();
					console.log(status);
				});
				
			},
		}
	}
</script>

<style>
</style>