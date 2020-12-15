<template>
  <div class="tem">
    <div class="tem-p">
      <div><img src="@/assets/index/down.png" alt=""> <span>{{ list.name }}</span></div>
      <div>
        <span>{{ list.short_name }}</span>
      </div>
      <div>
        <span>{{ list.address }}</span>
      </div>
      <div>
        <span>{{ list.phone }}</span>
      </div>
      <div>
        <span>{{ list.email }}</span>
      </div>
      <div>
        <span>{{ list.website }}</span>
      </div>
      <div>
        <span>{{ list.remark }}</span>
      </div>
       <div class="operation">
         <div class="amend" @click="modify(list)">修改</div>
         <div class="freeze" @click="handleDelete(list)">删除</div>
       </div>
    </div>
    <div class="tem-c">
      <!-- 子组件 -->
      <table-component
        v-for="itemc in list.children"
        :list="itemc"
        @handleDelete="handleDelete"
        @modify="modify"
      ></table-component>
    </div>
  </div>
</template>

<script>
export default {
  name: "tableComponent",
  props: ["list"],
  computed: {
    //计算属性
    isFolder() {
      //判断数据有没有子集，此效果中暂没用到，有需要的可以看下具体使用方式
      return this.list.child && this.list.child.length > 0;
    }
  },
  methods: {
    handleDelete(list){
      this.$emit('handleDelete',list)
    },
    modify(list){
      this.$emit('modify',list)
    },
    /* 展开折叠操作 */
    toggleClick(event) {
      event.stopPropagation(); //阻止冒泡
      var _this = $(event.currentTarget); //点击的对象
      if (
        _this
          .parent()
          .next()
          .is(":visible")
      ) {
        _this
          .parent()
          .next()
          .slideUp();
      } else {
        _this
          .parent()
          .next()
          .slideDown();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tem-p {
  display: flex;
  clear: both;
  height: 4.2vh;
  line-height: 4.2vh;
}
.tem-p > div {
  width: 7.9vw;
  //flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  height: 100%;
}
.tem-p > div:first-of-type {
  text-align: left;
  overflow-x: auto;
  img {
    width: 0.5vw;
    height: 0.5vw;
  }
  &::-webkit-scrollbar {/*滚动条整体样式*/

    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/

    height: 3px;

  }

  &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/

    border-radius: 10px;

    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);

    background: #535353;

  }

  &:-webkit-scrollbar-track {/*滚动条里面轨道*/

    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);

    border-radius: 10px;

    background: #EDEDED;

  }
}

.tem > .tem-c .tem-p > div:first-of-type {
  padding-left: 30px;
}
.tem > .tem-c .tem-c .tem-p > div:first-of-type {
  padding-left: 60px;
}
/*.tem > .tem-c .tem-p > div:first-of-type {
  padding-left: 30px;
}
.tem > .tem-c .tem-c .tem-p > div:first-of-type {
  padding-left: 60px;
}
.tem > .tem-c .tem-c .tem-c .tem-p > div:first-of-type {
  padding-left: 90px;
}
.tem > .tem-c .tem-c .tem-c .tem-c .tem-p > div:first-of-type {
  padding-left: 120px;
}
.tem > .tem-c .tem-c .tem-c .tem-c .tem-c .tem-p > div:first-of-type {
  padding-left: 150px;
}*/
.lastChild {
  background: #f8f8f8;
}
.isred {
  color: red;
}
.isgreen {
  color: green;
}
.operation {
  display: flex;
  align-items: center;
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
</style>
