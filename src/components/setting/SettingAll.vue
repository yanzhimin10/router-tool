<template>
   <div>
		<el-table
		  :data="tableData"
		  max-height = 500
		  style="width: 100%">
		  <el-table-column
		    prop="id"
		    label="序列号"
		    width="100">
		  </el-table-column>
		  <el-table-column
		    prop="mac_address"
		    label="mac地址"
		    width="150">
		  </el-table-column>
		  <el-table-column
		    prop="name"
		    label="name"
		    width="150">
		  </el-table-column>
		  <el-table-column
		    prop="flow_4g"
		    label="总流量"
		    width="150">
		  </el-table-column>
		  <el-table-column
		    prop="note"
		    label="备注"
		    width="150">
		  </el-table-column>
		  <el-table-column
		    label="操作"
		    width="200">
		    <template slot-scope="scope">
		      <el-button type="text" @click="dialogFormVisible = true, handleClick(scope.row)">查看</el-button>
		      <el-button type="text" @click="deleteinfo(scope.row)">删除</el-button>
		    </template>
		  </el-table-column>
		</el-table>

		<el-dialog title="修改" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		  	<el-form-item label="mac地址" :label-width="formLabelWidth">
		      <el-input v-model="form.mac_address" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="name" :label-width="formLabelWidth">
		      <el-input v-model="form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="总流量" :label-width="formLabelWidth">
		      <el-input v-model="form.flow_4g" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="备注" :label-width="formLabelWidth">
		      <el-input v-model="form.note" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		  	<el-button @click="dialogFormVisible = false">取 消</el-button>
		  	<el-button type="primary" @click="dialogFormVisible = false, changeinfo()">确 定</el-button>
		  </div>
		</el-dialog>
   </div>
</template>

<script>
	export default {
		data() {
			return {
			  tableData: [],
			  dialogFormVisible: false,
			  formLabelWidth: '120px',
			  form: {
			  	mac_address: '',
			  	name: '',
			  	flow_4g: '',
			  	note: '',
			  	_id: ''
			  }
		    };
		},

		methods: {
			handleClick(row) {
				this.form.mac_address = row.mac_address;
				this.form.name = row.name;
				this.form.flow_4g = row.flow_4g;
				this.form.note = row.note;
				this.form._id = this.tableData[row.id-1]._id;
			},

			changeinfo() {
				this.$net.updateRouterSetting(this.form, function(getstatus) {
                    console.log(getstatus);
				});
				const self = this;
				this.$net.getRouterSetting(function(getstatus,getdata) {
				    self.tableData = getdata;
			    });
			},

			deleteinfo(row) {
				this.$net.removeRouterSetting(this.tableData[row.id-1], function(getstatus){
					console.log(getstatus);
				});
				const self = this;
				this.$net.getRouterSetting(function(getstatus,getdata) {
				    self.tableData = getdata;
			    });
			}
		},

		created: function () {
            const self = this;
			this.$net.getRouterSetting(function(getstatus,getdata) {
				console.log(getdata);
				for (let i=0 ; i<getdata.length ; i++){
					self.tableData.push(getdata[i]);
					self.tableData[i].id = i+1;
					console.log(self.tableData[i]._id);
				}
			});
		},

		update: function () {
            
		}
	};
</script>