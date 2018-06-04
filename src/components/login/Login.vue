<template>
	<div>
		<el-row >
			<el-col :span="24">
				<div class="login_head grid-content bg-purple-dark">
					<span >WELI AD TOOLS</span>
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

		<!-- <el-form ref="form" :model="form" label-width="80px" style="width: 80%;margin:auto;">
			<el-form-item label="Email" style="margin-left: 27%">
				<el-input v-model="form.Email" style="width: 53%;"></el-input>
			</el-form-item>
			<el-form-item label="Password" style="margin-left: 27%">
				<el-input v-model="form.Password" style="width: 53%"></el-input>
			</el-form-item>
			
			<el-form-item style="margin-left: 35%">
				<el-button type="primary" style="background-color: white;font-size: 14px;
				color: #606266;">Register</el-button>
				<el-button @click="onSubmit" style="background-color: rgba(63,158,255);color: white">Login</el-button>
			</el-form-item>
		</el-form> -->

		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm"style="width: 80%;margin:auto;"> 
			<el-form-item label="Email" prop="Email" style="margin-left: 27%">
				<el-input v-model="ruleForm.Email" style="width: 53%;"></el-input>
			</el-form-item>

			<el-form-item label="Password" prop="Password" style="margin-left: 27%">
				<el-input v-model="ruleForm.Password" style="width: 53%;"></el-input>
			</el-form-item>

			<el-form-item style="margin-left: 35%">
				<el-button type="primary" class="login_registerButton">Register</el-button>
				<el-button @click="submitForm('ruleForm','info')" class="login_loginButton">Login</el-button>
			</el-form-item>
		</el-form>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',

				ruleForm: {
					Email: '',
					Password: ''
					
				},
				rules: {
					Email: [
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
					// this.$refs[formName].validate((valid) => {
					// 	if (valid) {
					// 		alert('submit!');
					// 	} else {
					// 		console.log('error submit!!');
					// 		return false;
					// 	}
					// });
					let pathMap = {
						info:'info',
					}
					let dest = pathMap[key];
					if (dest) {

						const _this = this;
						this.$net.login(this.ruleForm.Email,this.ruleForm.Password,function(dataStatus) {
							if(dataStatus == 0) {
								alert('登录成功');
								_this.$router.push({name:dest});
							} else if(dataStatus == -1) {
								alert('用户名不存在');
								return false;
							} else if(dataStatus == -2) {
								alert('密码错误');
								return false;
							} else if(dataStatus == -100) {
								alert('网络异常');
								return false;
							} else if(dataStatus == -101) {
								alert('数据库异常');
								return false;
							}
						});
						// this.$router.push({name:dest});
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