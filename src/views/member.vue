




<template>
  <div></div>
</template>

<script>
// import Member from "./member";
export default {
  data() {
    return {
      menuList: [
        { text: "首页", url: require("../assets/images/home.png"), path: "" },
        {
          text: "数据中心",
          url: require("../assets/images/data.png"),
          path: "",
        },
        {
          text: "会员中心",
          url: require("../assets/images/member.png"),
          path: "/Home",
        },
        {
          text: "充值金额",
          url: require("../assets/images/money.png"),
          path: "",
        },
        {
          text: "审核中心",
          url: require("../assets/images/examine.png"),
          path: "",
        },
      ],
    };
  },
  components: {
    // Member,
  },
  methods: {
    
  },
};
</script>

<style lang="less">
// @import "./views/Home/Home.less";

</style>