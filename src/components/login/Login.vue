<template>
	<div>
		<el-row >
			<el-col :span="24">
				<div class="login_head grid-content bg-purple-dark">
					<span >ROUTER TOOLS</span>
				</div>
			</el-col>
		</el-row>
		<el-row >
			<el-col :span="24">
				<div class="login_head2 grid-content bg-purple-dark" style="">
					<span >Please sign in</span>
				</div>
			</el-col>
		</el-row>

		<!-- 表单部分 -->

		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm"style="width: 80%;margin:auto;"> 
			<el-form-item label="Username" prop="Username" style="margin-left: 27%">
				<el-input v-model="ruleForm.Username" style="width: 53%;"></el-input>
			</el-form-item>

			<el-form-item label="Password" prop="Password" style="margin-left: 27%">
				<el-input v-model="ruleForm.Password" type="password" style="width: 53%;"></el-input>
			</el-form-item>

			<el-form-item style="margin-left: 40%">
				<el-button @click="submitForm('ruleForm','info')" type="primary">Login</el-button>
			</el-form-item>

		</el-form>

		<div style="margin: auto;text-align: center;color: red">
			<span v-show="warnMsg_userLose">用户名不存在</span>
			<span v-show="warnMsg_pwdWrong">密码错误</span>
			<span v-show="warnMsg_netError">网络异常</span>
			<span v-show="warnMsg_dataBaseError">数据库异常</span>
		</div>
		
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',

				warnMsg_userLose: false,
				warnMsg_pwdWrong: false,
				warnMsg_netError: false,
				warnMsg_dataBaseError: false,

				ruleForm: {
					Username: '',
					Password: ''
					
				},
				rules: {
					Username: [
					{ required: true, message: '请输入邮箱'}
						// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
						],

						Password: [
						{ required: true, message: '请输入密码'}
						// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
						]
					}
				};
			},
			methods: {
				handleSelect(key, keyPath) {
					console.log(key, keyPath);
				},
				submitForm(formName,key) {
					
					let pathMap = {
						info:'info',
					}
					let dest = pathMap[key];
					if (dest) {

						const _this = this;
						if (this.ruleForm.Username && this.ruleForm.Password) {
							this.$activity.show();
							this.$net.login(this.ruleForm.Username,this.ruleForm.Password,function(dataStatus) {
								_this.$activity.hide();

								_this.warnMsg_userLose=false;
								_this.warnMsg_pwdWrong=false;
								_this.warnMsg_netError=false;
								_this.warnMsg_dataBaseError=false;

								if(dataStatus == 0) {
									_this.$router.push({name:dest});
								} else if(dataStatus == -1) {
									_this.warnMsg_userLose=true;
								} else if(dataStatus == -2) {
									_this.warnMsg_pwdWrong=true;
								} else if(dataStatus == -100) {
									_this.warnMsg_netError=true;
								} else if(dataStatus == -101) {
									_this.warnMsg_dataBaseError=true;
								}
							});
						} 

					};
				}
			}
		}

	</script>

	<style >

	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 0px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 0px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.login_head {
		background-color: rgb(68,67,66);text-align: center;color: white;line-height: 40px;
	}

	.login_head2 {
		background-color: white;text-align: center;color: rgb(36,48,61);line-height: 40px;font-weight: bold;
	}
	.login_loginButton {
		background-color: rgba(63,158,255);color: white
	}
	.login_registerButton {
		background-color: white;font-size: 14px;
		color: #606266;
	}
</style>