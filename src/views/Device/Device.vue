<template>
	<div class="alarm-wrapper">
		<header>
			<div class="left">
				<div class="small" @click="handleCreateClick">+ 新建</div>
				<a class="small export" href="http://testa.shenim.cn/api/v1/equipmentExport">导出</a>
				<div class="small" @click="isImportShow = true">导入</div>
				<div class="small" @click="handleSetParamClick">报警参数设置</div>
			</div>
			<div class="right">
				<div class="input-wrapper">
					<i class="search-icon"></i>
					<input class="search" type="text" v-model="search" placeholder="请输入关键字" />
				</div>
				<div class="confirm" @click="searchDevice">确认</div>
			</div>
		</header>
		<main>
			<header>
				<span>挂牌编号</span>
				<span>SN码</span>
				<span>地址</span>
				<div class="state">
					<div class="top">状态</div>
					<div class="bottom">
						<span>停用</span>
						<span>正常</span>
						<span>撞到</span>
						<span>非法用水</span>
						<span>水压异常</span>
						<span>电压异常</span>
						<span>事件时间</span>
					</div>
				</div>
				<span class="people">责任人</span>
				<span class="people">联系方式</span>
				<span class="operation">操作</span>
			</header>
			<ul class="alarmList-wrapper">
				<li v-for="(item, index) in alarmList" :key="index">
					<span>{{ item.listing_number }}</span>
					<span>{{ item.sn }}</span>
					<span>{{ item.address }}</span>
					<span style="width: 5.5vw">{{ item.stopUse }}</span>
					<span style="width: 5.5vw">{{ item.normal }}</span>
					<span style="width: 5.5vw">{{ item.knockDown }}</span>
					<span style="width: 5.5vw">{{ item.illegalWaterUse }}</span>
					<span style="width: 5.5vw">{{ item.abnormalWaterPressure }}</span>
					<span style="width: 5.5vw">{{ item.abnormalVoltage }}</span>
					<span style="width: 6vw">{{ item.eventTime }}</span>
					<span style="width: 6.8vw">{{ item.responsible }}1</span>
					<span style="width: 6.8vw">{{ item.phone }}</span>
					<div class="operation">
						<div class="modify" @click="handleModifyClick(item)">修改</div>
						<div class="alarm-modify" @click="handleParamClick(item.id)">报警参数管理</div>
					</div>
				</li>
			</ul>
		</main>
		<div class="pagination">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper"
			 :total="total">
			</el-pagination>
		</div>

		<!-- 报警参数设置 -->
		<el-dialog title="报警参数设置" :visible.sync="isSleepShow" width="40.1%" custom-class="sleep-wrapper">
			<div class="param">
				<span>参数</span>
				<el-select popper-class="select" v-model="parameter" placeholder="请选择参数">
					<el-option v-for="item in paramList" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="param-value param">
				<span>参数值</span>
				<input type="text" v-model="parameter_value" placeholder="请输入内容">
			</div>
			<div class="permission-wrapper">
				<span>消防栓</span>
				<el-transfer v-model="value" :data="data"></el-transfer>
			</div>
			<div class="confirm" @click="setParams">确定</div>
		</el-dialog>
		<!-- 新建 -->
		<el-dialog :close-on-click-modal="false" :title="title" :visible.sync="isCreateShow" width="37.78%" custom-class="create-wrapper" @close="handClose">
			<ul>
				<li>
					<span>挂牌编号</span>
					<input type="text" v-model.trim="listing_number" placeholder="请输入内容" >
				</li>
				<li>
					<span>SN码</span>
					<input type="text" v-model.trim="sn" placeholder="请输入内容" >
				</li>
				<li>
					<span>状态</span>
					<el-select popper-class="select" v-model="status" >
						<el-option
								v-for="item in statusList"
								:key="item.id"
								:label="item.name"
								:value="item.id"
						>
						</el-option>
					</el-select>
				</li>
				<li>
					<span>省份</span>
					<el-select popper-class="select" v-model="province" >
						<el-option
								v-for="item in arr"
								:key="item.name"
								:label="item.name"
								:value="item.name"
						>
						</el-option>
					</el-select>
				</li>
				<li>
					<span>城市</span>
					<el-select popper-class="select" v-model="city">
						<el-option
								v-for="item in cityArr"
								:key="item.name"
								:label="item.name"
								:value="item.name"
						>
						</el-option>
					</el-select>
				</li>
				<li>
					<span>区域</span>
					<el-select popper-class="select" v-model="city">
						<el-option
								v-for="item in cityArr"
								:key="item.name"
								:label="item.name"
								:value="item.name"
						>
						</el-option>
					</el-select>
				</li>
				<li>
					<span>责任人</span>
					<input type="text" v-model.trim="responsible" placeholder="请输入内容" >
				</li>				<li>					<span>详细地址</span>					<input type="text" v-model.trim="address" placeholder="请输入内容" >				</li>
				<li>
					<span>经度</span>
					<input type="text" v-model.trim="longitude" placeholder="请输入内容" >
				</li>
				<li>
					<span>维度</span>
					<input type="text" v-model.trim="latitude" placeholder="请输入内容" >
				</li>
				
				<!--<li v-for="(item, index) in createList" :key="index">
					<span>{{ item.name }}</span>
					<input type="text" v-model.trim="item.value" placeholder="请输入内容" @keyup.enter="setMapCenter(item.name)" />
				</li>-->
				<div class="map" id="amap"></div>
			</ul>
			<div class="confirm" @click="addDevice">确定</div>
		</el-dialog>
		<!-- 报警参数设置 -->
		<el-dialog title="报警参数修改" :visible.sync="isModifyParamShow" width="33%" custom-class="params-wrapper" @close="handCloseParam">
			<ul>
				<li class="two">
					<span>电压参数</span>
					<div class="right">
						<input type="text" placeholder="输入电压上限" v-model="singleParamList.voltage_uper">
						<input type="text" placeholder="输入电压下限" v-model="singleParamList.voltage_lower">
					</div>

				</li>
				<li class="two">
					<span>水压参数</span>
					<div class="right">
						<input type="text" placeholder="输入水压上限" v-model="singleParamList.water_uper">
						<input type="text" placeholder="输入水压下限" v-model="singleParamList.water_lower">
					</div>
				</li>
				<li>
					<span>瞬时流量上线</span>
					<div class="right">
						<input type="text" placeholder="输入瞬时流量上线" v-model="singleParamList.curflow">
					</div>
				</li>
				<li>
					<span>累计流量</span>
					<div class="right">
						<input type="text" placeholder="输入累计流量" v-model="singleParamList.accflow">
					</div>
				</li>
				<li>
					<span>开关量</span>
					<div class="right">
						<input type="text" placeholder="输入开关量" v-model="singleParamList.switch_val">
					</div>
				</li>
				<li>
					<span>休眠周期</span>
					<div class="right">
						<input type="text" placeholder="输入休眠周期" v-model="singleParamList.sleep_cycle">
					</div>
				</li>
				<li>
					<span>采集周期</span>
					<div class="right">
						<input type="text" placeholder="输入采集周期" v-model="singleParamList.collection_cycle">
					</div>
				</li>
			</ul>
			<div class="confirm" @click="modifyParam">确定</div>
		</el-dialog>
		<!-- 导入 -->
		<el-dialog title="导入" :visible.sync="isImportShow" width="21.1%" custom-class="import-wrapper">
			<main>
				<div class="input-wrapper">
					<input class="file" type="file" @change="getFile($event)" />
					<div class="mask">
						<img src="@/assets/device/add.png" alt="">
					</div>
				</div>
				<div class="download-model">
					<div class="download">
						<img src="@/assets/device/upload.png" alt="">
					</div>
					<a href="http://testa.shenim.cn/api/v1/equipmentExport?is_template=true">下载模板</a>
				</div>
			</main>
			<div class="confirm" @click="uploadFile">确定</div>
		</el-dialog>
	</div>
</template>

<script>
	import chinaArea from "../../components/chinaArea";
	import axios from 'axios';
	import arrAll from "../../components/proviceData";
	import AMapLoader from "@amap/amap-jsapi-loader";
	import echarts from "echarts";

	export default {
		name: "Device",
		data() {
			return {
				arr: arrAll,
				cityArr: [],
				districtArr: [],
				statusList:[
					{
						name:0,
						id:0
					},
					{
						name:1,
						id:1
					},
				],
				createList: [
					{
						name: "挂牌编号",
						value: "",
					},
					{
						name: "SN码",
						value: "",
					},
					{
						name: "状态",
						value: "",
					},
					{
						name: "省份",
						value: "",
					},
					{
						name: "城市",
						value: "",
					},
					{
						name: "区域",
						value: "",
					},
					{
						name: "责任人",
						value: "",
					},
					{
						name: "经度",
						value: "",
					},
					{
						name: "维度",
						value: "",
					},
				],
				options: {
					amap: {
						viewMode: "3D",
						center: [114.05571, 22.52245],
						zoom: 12,
						resizeEnable: true,
						mapStyle: "amap://styles/a16a47c4d16c0ba993e9d72f6a46b8b9",
						renderOnMoving: true,
						echartsLayerZIndex: 2019,
					},
					tooltip: {
						trigger: "item",
					},
					animation: false,
					series: [],
				},
				search: "",
				equipment_id: '',
				isModifyParamShow: false,
				paramList: [
						{
						label: '电压上限',
						value: 'voltage_uper'
					},
					{
						label: '电压下限',
						value: 'voltage_lower'
					},
					{
						label: '水压上限',
						value: 'water_uper'
					},
					{
						label: '水压下限',
						value: 'water_lower'
					},
					{
						label: '瞬时流量上限',
						value: 'curflow'
					},
					{
						label: '累计流量',
						value: 'accflow'
					},
					{
						label: '开关量',
						value: 'switch_val'
					},
					{
						label: '休眠周期',
						value: 'sleep_cycle'
					},
					{
						label: '采集周期',
						value: 'collection_cycle'
					},

				],
				parameter: '',
				parameter_value: '',
				singleParamList: {
					voltage_uper: '',
					voltage_lower: '',
					water_uper: '',
					water_lower: '',
					curflow: '',
					accflow: '',
					switch_val: '',
					sleep_cycle: '',
					collection_cycle: '',
				},
				currentModifyId: '',
				title: '新建',
				canAdd: true,
				isModify: false,
				pageSize: 15,
				total: 0,
				currentPage: 1,
				data: [],
				value: [],
				isImportShow: false,
				isCreateShow: false,
				isSleepShow: false,
				alarmList: [],
				addArr: [],
				chart: null,
				mapInstance: null,
				province:'',
				city:'',
				area:'',
				listing_number:'',
				sn:'',
				status:'',
				responsible:'',
				longitude:'',
				latitude:'',
				address:''
			};
		},
		components: {
			chinaArea
		},
		methods: {
			setMapCenter(item) {
				console.log(item);
				if (item === '经度' || item === '维度') {
					//this.options.amap.center =[114.24771, 22.71986]
					this.options.amap.center = [this.createList[7].value, this.createList[8].value]
					this.chart.setOption(this.options);
				}
			},
			getStatusList(){
				this.$get('/api/v1/equipmentStatus').then(res=>{
					console.log(res);
				})
			},
			handleCreateClick() {
				this.getStatusList()
				this.isCreateShow = true;
				AMapLoader.load({
					"key": "852b4331fa1629f5c4722b5cab98a8c6", // 申请好的Web端开发者Key，首次调用 load 时必填
					"version": "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
					"plugins": [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
					"AMapUI": { // 是否加载 AMapUI，缺省不加载
						"version": '1.1', // AMapUI 缺省 1.1
						"plugins": [], // 需要加载的 AMapUI ui插件
					},
				}).then((AMap) => {
					this.chart = echarts.init(document.getElementById("amap"));
					this.chart.setOption(this.options);
					this.mapInstance = this.chart.getModel().getComponent("amap").getAMap();
					this.mapInstance.on('click',(e)=>{
						this.latitude = e.lnglat.lat
						this.longitude = e.lnglat.lng
					})
				}).catch(e => {
					console.log(e);
				})
			},
			handleSetParamClick() {
				this.isSleepShow = true
				this.$get('/api/v1/equipmentSelect').then(res => {
					res.data.forEach(item => {
						item.key = item.id;
						item.label = item.sn
					})
					this.data = res.data
				})
			},
			searchDevice() {
				this.$get("/api/v1/equipment", {
					screen: this.search
				}).then((res) => {
					this.alarmList = res.data;
					const data = []
					res.data.forEach((item) => {
						const obj = {
							key: item.id,
							label: item.sn
						}
						data.push(obj)
					})
					this.data = data
				});
			},
			uploadFile() {
				const formData = new FormData();
				formData.append('file', document.querySelector('input[type=file]').files[0])
				this.$post('/api/v1/equipmentImport', formData).then(res => {

				})
				console.log(document.querySelector('input[type=file]').files[0]);
			},
			getFile(event) {
				var file = event.target.files;
				for (var i = 0; i < file.length; i++) {
					//    上传类型判断
					var imgName = file[i].name;
					var idx = imgName.lastIndexOf(".");
					if (idx !== -1) {
						var ext = imgName.substr(idx + 1).toUpperCase();
						ext = ext.toLowerCase();
						if (ext !== 'pdf' && ext !== 'doc' && ext !== 'docx') {

						} else {
							this.addArr.push(file[i]);
						}
					} else {

					}
				}
			},
			handCloseParam() {
				for (let i in this.singleParamList) {
					this.singleParamList[i] = ''
				}
			},
			clearInput() {
				this.isCreateShow = false;
				this.isModify = false;
				this.name = "";
				this.value = "";
				this.remarks = "";
			},
			handleParamClick(id) {
				this.equipment_id = id
				this.isModifyParamShow = true
				this.$get('/api/v1/equipmentAlarmSettings', {
					equipment_id: id
				}).then(res => {
					const keys = Object.keys(this.singleParamList)
					keys.forEach((item) => {
						if (item in res.data) {
							this.singleParamList[item] = res.data[item]
						}
					})
				})
			},
			modifyParam() {
				this.$put('/api/v1/equipmentAlarmSettings', {
					equipment_id: this.equipment_id,
					voltage_uper: this.singleParamList.voltage_uper,
					voltage_lower: this.singleParamList.voltage_lower,
					water_uper: this.singleParamList.water_uper,
					water_lower: this.singleParamList.water_lower,
					curflow: this.singleParamList.curflow,
					accflow: this.singleParamList.accflow,
					switch_val: this.singleParamList.switch_val,
					sleep_cycle: this.singleParamList.sleep_cycle,
					collection_cycle: this.singleParamList.collection_cycle,
				}).then(res => {
					this.isModifyParamShow = false
				})

			},
			setParams() {
				this.$post('/api/v1/equipmentAlarmSettingsAll', {
					parameter: this.parameter,
					parameter_value: this.parameter_value,
					equipment_id: this.value
				}).then(res => {
					this.isSleepShow = false
				})
			},
			handClose() {
				this.title = '新建'
				this.isModify = false;
				this.createList[0].value = ''
				this.createList[1].value = ''
				this.createList[2].value = ''
				this.createList[3].value = ''
				this.createList[4].value = ''
				this.createList[5].value = ''
				this.createList[6].value = ''
				this.createList[7].value = ''
				this.createList[8].value = ''
			},
			handleModifyClick(item) {
				this.currentModifyId = item.id
				this.createList[0].value = item.listing_number
				this.createList[1].value = item.sn
				this.createList[2].value = item.status
				this.createList[3].value = item.province
				this.createList[4].value = item.city
				this.createList[5].value = item.area
				this.createList[6].value = item.responsible
				this.createList[7].value = item.longitude
				this.createList[8].value = item.latitude
				this.title = '修改'
				this.isModify = true;
				this.isCreateShow = true;
			},
			modifyDevice() {
				this.$put("/api/v1/equipment", {
						listing_number: this.createList[0].value,
						sn: this.createList[1].value,
						status: this.createList[2].value,
						province: this.createList[3].value,
						city: this.createList[4].value,
						area: this.createList[5].value,
						responsible: this.createList[6].value,
						longitude: this.createList[7].value,
						latitude: this.createList[8].value,
						id: this.currentModifyId
					})
					.then((res) => {
						this.isCreateShow = false;
						this.getDeviceList()
					})
					.catch((err) => {
						this.isCreateShow = false;
					});
			},
			handleCurrentChange(val) {
				this.getDeviceList(val);
			},
			addDevice() {
				if (this.isModify) {
					this.modifyDevice();
				} else {
					if (!this.canAdd) return;
					this.canAdd = false;
					this.$post("/api/v1/equipment", {
							listing_number: this.createList[0].value,
							sn: this.createList[1].value,
							status: this.createList[2].value,
							province: this.createList[3].value,
							city: this.createList[4].value,
							area: this.createList[5].value,
							responsible: this.createList[6].value,
							longitude: this.createList[7].value,
							latitude: this.createList[8].value,
						})
						.then((res) => {
							this.canAdd = true;
							this.isCreateShow = false;
						})
						.catch((err) => {
							this.canAdd = true;
							this.isCreateShow = false;
						});
				}
			},
			getDeviceList(page, search) {
				let url = "/api/v1/equipment";
				if (page) {
					url = url + `?page=${page}`;
				}
				this.$get(url).then((res) => {
					this.alarmList = res.data;
					const data = []
					res.data.forEach((item) => {
						const obj = {
							key: item.id,
							label: item.sn
						}
						data.push(obj)
					})
					this.data = data
				});
			},
		},
		mounted() {
			this.getDeviceList();
		},
		destroyed() {
			this.mapInstance.destroy();
		},
	};
</script>

<style lang="scss" scoped>
	.alarm-wrapper {
		position: relative;
		padding: 3.2vh 2.4vw 0 2.4vw;
		height: 92.9vh;

		>header {
			display: flex;
			margin-bottom: 2.4vh;
			font-size: 0.7vw;
			justify-content: space-between;

			.left {
				display: flex;
				margin-bottom: 1.6vh;

				>div {
					height: 3.7vh;
					line-height: 3.7vh;
					text-align: center;
					background-color: #122a38;
					border: 1px solid #1b647b;
					border-radius: 0.2vw;
					margin-right: 0.4vw;
					cursor: pointer;
				}

				.export {
					height: 3.7vh;
					line-height: 3.7vh;
					text-align: center;
					background-color: #122a38;
					border: 1px solid #1b647b;
					border-radius: 0.2vw;
					margin-right: 0.4vw;
					cursor: pointer;
				}

				.small {
					width: 6.5vw;
				}

				.big {
					width: 8.3vw;
				}
			}

			.right {
				display: flex;

				.input-wrapper {
					position: relative;
					width: 12.4vw;
					height: 3.7vh;
					margin-right: 0.8vw;

					input {
						color: #b3b3b3;
						background-color: #0f1f24;
						padding-left: 0.7vw;
						outline: none;
						width: 100%;
						border: 1px solid #1e6f85;
						height: 3.7vh;
					}

					.search-icon {
						position: absolute;
						background-image: url("~@/assets/alarm/search.png");
						background-size: 100% 100%;
						right: 0.5vw;
						top: 50%;
						transform: translateY(-50%);
						width: 0.9vw;
						height: 0.9vw;
					}
				}

				.confirm {
					width: 5.9vw;
					height: 3.7vh;
					line-height: 3.7vh;
					text-align: center;
					background-color: #1e4b6d;
					border: 1px solid #17fff3;
					font-size: 0.7vw;
					cursor: pointer;
				}
			}
		}

		main {
			>header {
				display: flex;
				font-size: 0.9vw;
				height: 7.5vh;

				.state {
					width: 39vw;
					border-right: 1px solid #303f42;

					.top {
						text-align: center;
						border-bottom: 1px solid #303f42;
						height: 50%;
					}

					.bottom {
						display: flex;
						justify-content: space-between;
						font-size: 0.7vw;
						height: 50%;

						>span {
							text-align: center;
							border-right: 1px solid #303f42;
							display: flex;
							flex: 1;
							align-items: center;
							justify-content: center;

							&:last-child {
								border: none;
							}
						}
					}
				}

				.water-gage {
					border-right: 1px solid #303f42;

					.top {
						text-align: center;
						border-bottom: 1px solid #303f42;
						height: 50%;
					}

					.bottom {
						display: flex;
						justify-content: space-between;
						height: 50%;
						font-size: 0.7vw;

						>span {
							text-align: center;
							border-right: 1px solid #303f42;
							display: flex;
							align-items: center;
							justify-content: center;

							&:last-child {
								border: none;
							}
						}
					}
				}

				>span {
					border-right: 1px solid #303f42;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;

					&:last-child {
						border: none;
					}

					&:nth-child(1) {
						width: 6.6vw;
					}

					&:nth-child(2) {
						width: 6.6vw;
					}

					&:nth-child(3) {
						width: 14.8vw;
					}

					&.people {
						width: 6.8vw;
					}

					&.operation {
						width: 14.4vw;
					}
				}
			}

			.alarmList-wrapper {
				font-size: 0.7vw;

				>li {
					display: flex;
					align-items: center;
					height: 4.2vh;

					&:nth-child(even) {
						background-color: #29393e;
					}

					span {
						display: inline-block;
						text-align: center;

						&:nth-child(1) {
							width: 6.6vw;
						}

						&:nth-child(2) {
							width: 6.6vw;
						}

						&:nth-child(3) {
							width: 14.8vw;
						}
					}

					.operation {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 14.4vw;
						font-size: 0.6vw;

						.modify {
							cursor: pointer;
							width: 4.5vw;
							height: 1.3vw;
							line-height: 1.3vw;
							background-color: #00a5a5;
							text-align: center;
							border-radius: 0.1vw;
							margin-right: 0.5vw;
						}

						.alarm-modify {
							cursor: pointer;
							width: 7.5vw;
							height: 1.3vw;
							line-height: 1.3vw;
							background-color: #00a5a5;
							text-align: center;
							border-radius: 0.1vw;
						}
					}
				}
			}
		}

		.pagination {
			position: absolute;
			bottom: 9vh;
			left: 50%;
			transform: translateX(-50%);
		}

		.sleep-wrapper {
			.el-dialog__body {
				padding-top: 0;
				padding-right: 0;

				.param {
					display: flex;
					align-items: center;
					color: #fff;
					margin-bottom: 1vh;

					.el-select {
						width: 14.8vw;
						margin-left: 0.8vw;
						border-radius: 0;

						input {
							border-radius: 0;
						}
					}

					span {
						margin-right: 0.6vw;
					}

					input {
						width: 14.8vw;
						height: 3.7vh;
						padding-left: 0.6vw;
						color: #fff;
						background: #172f3b;
						border: 1px solid #1e6f85;
						outline: none;
					}
				}

				.permission-wrapper {
					color: #fff;
					margin-bottom: 2.3vh;
				}

				.confirm {
					width: 4.7vw;
					height: 3.7vh;
					margin: 0 auto;
					background: #1e4d70;
					color: #fff;
					border-radius: 0.1vw;
					text-align: center;
					line-height: 3.7vh;
					cursor: pointer;
				}
			}
		}

		.create-wrapper {
			.el-dialog__body {
				ul {
					display: flex;
					flex-wrap: wrap;
					font-size: 0.7vw;
					margin-bottom: 1.8vh;

					>li {
						display: flex;
						flex-direction: column;
						margin-right: 2vw;
						margin-bottom: 1.2vh;
						.el-select {
							width: 14.8vw;

							input {
								border-radius: 0;
							}
							::v-deep .el-input__inner {
								border-radius: 0;
							}

						}

						span {
							color: #fff;
						}

						input {
							margin-top: 0.5vh;
							width: 14.8vw;
							height: 3.7vh;
							padding-left: 0.6vw;
							color: #fff;
							background: #172f3b;
							border: 1px solid #1e6f85;
							border-radius: 0;
							outline: none;
						}
					}

					.map {
						width: 31.8vw;
						height: 11.9vw;
					}
				}

				.confirm {
					width: 4.7vw;
					height: 3.7vh;
					margin: 0 auto;
					background: #1e4d70;
					border-radius: 0.1vw;
					color: #fff;
					text-align: center;
					line-height: 3.7vh;
					cursor: pointer;
				}
			}
		}

		.params-wrapper {
			.el-dialog__body {
				ul {
					font-size: 0.7vw;
					margin-bottom: 1.8vh;

					>li {
						position: relative;
						display: flex;
						align-items: center;
						margin-bottom: 3.2vh;

						input {
							margin-top: 0.5vh;
							width: 18vw;
							height: 3.7vh;
							padding-left: 0.6vw;
							color: #fff;
							background: #172f3b;
							border: 1px solid #134a55;
							outline: none;
						}

						&.two {
							.right {
								display: flex;
								justify-content: space-between;
								width: 18vw;
							}

							input {
								width: 8.5vw;
							}
						}

						span {
							color: #fff;
						}

						.right {
							position: absolute;
							left: 7vw;
						}

					}
				}

				.confirm {
					width: 4.7vw;
					height: 3.7vh;
					margin: 0 auto;
					background: #1e4d70;
					border-radius: 0.1vw;
					color: #fff;
					text-align: center;
					line-height: 3.7vh;
					cursor: pointer;
				}
			}
		}

		.import-wrapper {
			.el-dialog__body {
				main {
					margin-bottom: 2vh;

					.input-wrapper {
						width: 15.2vw;
						height: 10.4vw;
						position: relative;
						margin: 0 auto;
						border: 1px solid #1e6f85;

						input {
							opacity: 0;
							width: 100%;
							height: 100%;
							position: absolute;
							left: 0;
							cursor: pointer;
						}

						.mask {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 100%;
							height: 100%;
						}
					}

					.download-model {
						cursor: pointer;
						color: #fff;
						font-size: 0.6vw;
						margin-top: 1.5vh;
						margin-left: 1.5vw;
						display: inline-flex;
						align-items: center;

						.download {
							margin-right: 0.6vw;
						}
					}
				}


				.confirm {
					width: 4.7vw;
					height: 3.7vh;
					margin: 0 auto;
					background: #1e4d70;
					border-radius: 0.1vw;
					color: #fff;
					text-align: center;
					line-height: 3.7vh;
					cursor: pointer;
				}
			}
		}
	}
</style>
<style>
</style>
<style src="../../assets/style/element.css">
</style>
