<template>
  <div class="userinfo_details">
    <div class="goback">
      <el-page-header @back="goBack" content="个人信息" style="width:200px"></el-page-header>
    </div>
    <div class="main">
      <div class="basic">
        <div class="title">
          <div class="name">
            <div></div>
            <span>基本信息：</span>
          </div>
        </div>
        <ul>
          <li class="items" v-for="(item,index) in basicList" :key="index">
            <span>{{item.title}}：</span>
            <span :style="{color:index == 5 ? '#3B6DEE' :'#000'}">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="release">
        <div class="title">
          <div class="name">
            <div></div>
            <span>发布信息：</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basicList: [
        { title: "ID", name: "v124" },
        { title: "昵称", name: "v124" },
        { title: "联系电话", name: "v124" },
        { title: "用户级别", name: "v124" },
        { title: "地址", name: "v124" },
        { title: "企业认证", name: "v124" },
        { title: "订阅位置", name: "v124" },
        { title: "订阅关键词", name: "v124" },
      ],
      tabList: ["招标发布", "需求发布", "动态发布", "主营项目"],
      activeName: 0,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleClick(e) {
      console.log(e);
      this.activeName = e;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./userinfo_details.less";
</style>