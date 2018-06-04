<template>
	<div class="block">
		<span class="demonstration">请选择时间段</span>
		<el-date-picker
		  v-model="value5"
		  type="datetimerange"
		  :picker-options="pickerOptions2"
		  range-separator="to"
		  start-placeholder="start date"
		  end-placeholder="end date">
		</el-date-picker>
		<br>
		<br>
		<el-table
		  :method="tableData"
		  stripe
		  max-height=400
		  style="width: 100%">
		  <el-table-column
		    prop="name"
	        label="名称"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="version"
	        label="版本号"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="time_4g"
	        label="切换4g次数"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="time_fiber"
	        label="切换光纤次数"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="flow_4g"
	        label="4g流量"
	        width="180">
	      </el-table-column>
	    </el-table>
    </div>
</template>

<script>
	export default{
		data() {
			return {
				tableData: [/*{
					name: 'jjc',
					version: 'jjcc',
					time_4g: 'jjccc',
					time_fiber: 'jjcccc',
					flow_4g: 'jjccccc',
				}*/], 
				pickerOptions2: {
					shortcuts: [{
						text: '最近7天',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime()- 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近14天',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime()- 3600 * 1000 * 24 * 14);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近30天',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime()- 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				value5: ''
			};
		},
		created: function () {
			//获取数据，动态添加表
			//this.tableData = data
		},
		updated: function () {
			//获取改变的时间段去查询数据
			console.log(this.value5)
		}
	};
</script>