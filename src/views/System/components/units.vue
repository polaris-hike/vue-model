<template>
  <div class="dictionary">
    <header>
      <span>名称</span>
      <!--<span>Logo</span>
      <span>照片</span>-->
      <span>简称</span>
      <span>地址</span>
      <span>电话</span>
      <span>邮箱</span>
      <span>网址</span>
     <!-- <span>排序</span>-->
      <span>备注</span>
      <span>操作</span>
    </header>
    <ul class="userList-wrapper">
        <table-component
          v-for="item in data1"
          :list="item"
          @handleDelete="handleDelete"
          @modify="modify"
        ></table-component>
       <!-- <div class="operation">
          <div class="amend">修改</div>
          <div class="freeze">删除</div>
        </div>-->
      <!-- <li v-for="(item, index) in alarmList" :key="index">
                <span>{{ item.name }}</span>
                <span>{{ item.remarks }}</span>
                <div class="operation">
                    <div class="amend" @click="handleModifyClick(item)">修改</div>
                    <div class="freeze" @click="deleteAlarm(item.id)">删除</div>
                </div>
            </li> -->
    </ul>
    <div @click="handleCreateClick" class="create">+ 新建</div>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 新增弹窗 -->
    <el-dialog
      :title="title"
      :visible.sync="isCreateShow"
      :close-on-click-modal="false"
      width="37.6%"
      custom-class="create-wrapper"
      @close="handClose"
    >
      <ul>
        <li>
          <span>名称</span>
          <input type="text" v-model="unitObj.name" placeholder="请输入内容" />
        </li>
        <li>
          <span>简称</span>
          <input type="text" v-model="unitObj.short_name" placeholder="请输入内容" />
        </li>
        <li>
          <span>地址</span>
          <input type="text" v-model="unitObj.address" placeholder="请输入内容" />
        </li>
        <li>
          <span>电话</span>
          <input type="text" v-model="unitObj.phone" placeholder="请输入内容" />
        </li>
        <li>
          <span>邮箱</span>
          <input type="text" v-model="unitObj.email" placeholder="请输入内容" />
        </li>
        <li>
          <span>网址</span>
          <input type="text" v-model="unitObj.website" placeholder="请输入内容" />
        </li>
        <li>
          <span>排序</span>
          <input type="text" v-model="unitObj.sort" placeholder="请输入内容" />
        </li>
        <li>
          <span>备注</span>
          <textarea
                  name=""
                  v-model="unitObj.remark"
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="请输入内容"
          ></textarea>
        </li>
        <li>
          <span>logo</span>
          <div class="input-wrapper">
            <input class="file" type="file" @change="getFile($event,'logo')" />
            <img v-show="isLogoShow"  :src="'http://testa.shenim.cn/'+ unitObj.logo" alt="">
            <div class="mask">
              <img src="@/assets/device/add.png" alt="">
            </div>
          </div>
        </li>
        <li>
          <span>照片</span>
          <div class="input-wrapper">
            <input  class="file" type="file" @change="getFile($event,'picture')" />
            <img v-show="isPictureShow"  :src="'http://testa.shenim.cn/'+unitObj.photo" alt="">
            <div class="mask">
              <img src="@/assets/device/add.png" alt="">
            </div>
          </div>
        </li>
      </ul>
      <div class="confirm" @click="createAlarm">确定</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "units",
  data() {
    return {
      isPictureShow:false,
      isLogoShow:false,
      logo:'',
      picture:'',
      data1: [],
      pageSize: 15,
      total: 0,
      currentPage: 1,
      title: "新增",
      name: "",
      remarks: "",
      alarmList: [
        {
          name: "1",
          remarks: "2"
        },
        {
          name: "1",
          remarks: "2"
        }
      ],
      isCreateShow: false,
      isModify: false,
      canSendAddData: true,
      currentId: "",
      canDelete: true,
      unitObj:{
        name:'',
        short_name:'',
        address:'',
        phone:'',
        email:'',
        website:'',
        logo:'',
        photo:'',
        sort:'',
        remark:''
      }
    };
  },
  methods: {
    getFile(e,pictureType) {
      e = e || window.event;
      let files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0], files[0].type, files[0].name,pictureType);
    },
    createImage(file, type, name,pictureType){
      const size = Math.floor(file.size / 1024);
      const imgType = name.split('.').pop();
      if (imgType !== 'jpg' && imgType !== 'gif' && imgType !== 'png') {
        this.$message.error('图片仅支持JPG、PNG、GIF格式');
        return
      }
      if (imgType === 'gif' && size >= 1024) {
        this.$message.error('请上传不超过1Mb的gif图片');
        return
      }
      if ( (imgType !== 'jpg' || imgType !== 'png') && size >= 2048) {
        this.$message.error('图片不能大于2MB');
        return
      }
      const formData = new FormData()
      formData.append('file', file);
      this.$post('/api/v1/companyUploadImage', formData).then((res) => {
        if (res.code === 200) {
          if(pictureType === 'logo'){
            this.isLogoShow = true
            this.unitObj.logo = res.data.file_name
          }else{
            this.isPictureShow = true
            this.unitObj.photo = res.data.file_name
          }
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    modify(list){
      for(let i in list){
        if(i in this.unitObj){
          this.unitObj[i] = list[i]
        }
      }
      this.isModify = true;
      this.isCreateShow = true;
      this.title = "修改";
      this.currentId = list.id;
    },
    clearInput() {
      this.isCreateShow = false;
      this.isModify = false;
      this.name = "";
      this.remarks = "";
    },
    modifyAlarm() {
      this.$put("/api/v1/company", {
        ...this.unitObj,
        id: this.currentId,
      }).then(res => {
        this.getAlarmListData();
        this.clearInput();
      });
    },
    handleDelete(list) {
      if (!this.canDelete) return;
      this.canDelete = false;
      this.$del("/api/v1/company", {
        id:list.id
      })
        .then(res => {
          this.canDelete = true;
          this.getAlarmListData();
        })
        .catch(err => {
          this.canDelete = true;
        });
    },
    handleCurrentChange(val) {
      this.getAlarmListData(val);
    },
    handleCreateClick() {
      this.isCreateShow = true;
    },
    createAlarm() {
      if (this.isModify) {
        this.modifyAlarm();
      } else {
        if (!this.canSendAddData) return;
        this.canSendAddData = false;
        this.$post("/api/v1/company", {
          ...this.unitObj
        })
          .then(res => {
            this.canSendAddData = true;
            this.getAlarmListData();
            this.clearInput();
          })
          .catch(err => {
            this.canSendAddData = true;
          });
      }
    },
    handClose() {
      for(let i in this.unitObj){
        this.unitObj[i] = ''
      }
    },
    setDataIsShow(data){
      this.$set(data,'isChildrenShow',true)
      if(data.children.length !== 0){
        for(let i of data.children){
          this.setDataIsShow(i)
        }
      }else{
        return
      }
    },
    getAlarmListData(page) {
      let url = "/api/v1/company";
      if (page) {
        url = url + `?page=${page}`;
      }
      this.$get(url).then(res => {
        for(let i of res.data){
          this.setDataIsShow(i)
        }
        console.log(res.data);
        this.data1 = res.data;
        this.total = res.meta.total;
        this.currentPage = res.meta.current_page;
        this.pageSize = res.meta.per_page;
      });
    }
  },
  mounted() {
    this.getAlarmListData();
  }
};
</script>

<style lang="scss" scoped>
.dictionary {
  position: relative;
  padding: 8.7vh 5.7vw 3vh 5.8vw;
  > header {
    display: flex;
    justify-content: space-around;
    margin-bottom: 2.9vh;
    font-size: 0.9vw;
    > span {
      display: inline-block;
      border-right: 1px solid #303f42;
      text-align: center;
      flex: 1;
      &:last-child {
        border: none;
      }
    }
  }
  .userList-wrapper {
    font-size: 0.7vw;
    > li {
      display: flex;
      align-items: center;
      height: 4.2vh;
      &:nth-child(even) {
        background-color: #29393e;
      }
      > span {
        display: inline-block;
        text-align: center;
        flex: 1;
      }
      .operation {
        display: flex;
        justify-content: center;
        flex: 1;
        > div {
          cursor: pointer;
        }
        .amend {
          width: 3.1vw;
          height: 1.3vw;
          line-height: 1.3vw;
          background-color: #00a5a5;
          text-align: center;
          margin-right: 0.4vw;
        }
        .reset {
          width: 4.2vw;
          height: 1.3vw;
          line-height: 1.3vw;
          background-color: #d8a932;
          text-align: center;
          margin-right: 0.4vw;
        }
        .freeze {
          width: 3.1vw;
          height: 1.3vw;
          line-height: 1.3vw;
          background-color: #d84e4e;
          text-align: center;
        }
      }
    }
  }
  .create {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.2vw;
    height: 1.7vw;
    position: absolute;
    top: 1.5vw;
    left: 1.7vw;
    font-size: 0.7vw;
    background-color: #25a9cc;
    cursor: pointer;
  }
  .pagination {
    position: absolute;
    bottom: 3vh;
    left: 50%;
    transform: translateX(-50%);
  }
  .create-wrapper {
    .el-dialog__body {
      ul {
        display: flex;
        flex-wrap: wrap;
        font-size: 0.7vw;
        margin-bottom: 1.8vh;
        li {
          display: flex;
          flex-direction: column;
          margin-bottom: 1vw;
          margin-right: 2vw;
          width: 14.8vw;
          span {
            margin-bottom: 0.4vw;
            color: #fff;
          }
          input {
            width: 14.8vw;
            height: 3.7vh;
            padding-left: 0.6vw;
            color: #fff;
            background: #172f3b;
            border: 1px solid #134a55;
            outline: none;
          }
          textarea {
            height: 9vh;
            color: #fff;
            background: #172f3b;
            border: 1px solid #134a55;
            padding-left: 0.6vw;
            outline: none;
          }
          .input-wrapper {
            width: 14.8vw;
            height: 6vw;
            position: relative;
            border: 1px solid #1e6f85;

            input {
              opacity: 0;
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              cursor: pointer;
              z-index: 1;
            }
            >img {
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              z-index: 0;
            }

            .mask {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
              img {
              }
            }
          }
        }
      }
      .confirm {
        width: 4.7vw;
        height: 1.7vw;
        margin: 0 auto;
        background: #1e4d70;
        border-radius: 0.1vw;
        text-align: center;
        line-height: 1.7vw;
        cursor: pointer;
        color: #fff;
      }
    }
  }
}
</style>
