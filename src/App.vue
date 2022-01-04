<template>
  <div id="aside">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        { text: "首页", url: require("./assets/images/home.png"), id: "1" },
        {
          text: "数据中心",
          url: require("./assets/images/data.png"),
          id: "2",
        },
        {
          text: "会员中心",
          url: require("./assets/images/member.png"),
          id: "3",
        },
        {
          text: "充值金额",
          url: require("./assets/images/money.png"),
          id: "4",
        },
        {
          text: "审核中心",
          url: require("./assets/images/examine.png"),
          id: "5",
        },
      ],
      path: "",
    };
  },
  methods: {
    menuClick() {
      // console.log(1111);
    },
  },
  created() {
    this.path = this.$route.name;
  },
};
</script>

<style lang="less">
// @import "./views/Home/Home.less";
html,
body,
#aside {
  /*统一设置高度为100%*/
  height: 100%;
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
}
.el-menu {
  border: none;
  height: 90%;
}

// 选中激活样式
.is-active {
  font-weight: 700;
  font-size: 18px !important;
  box-shadow: 1px 0px 10px 0px rgba(59, 109, 238, 0.15),
    0px 0px 10px 2px rgba(59, 109, 238, 0.15);
  border-left: 4px solid #3b6dee;
}

#aside {
  height: 100%;

  .aside_title {
    display: flex;
    align-items: center;
    padding: 15px 50px;
    background: #3b6dee;
    color: #fff;

    .aside_img {
      width: 50px;
      height: 50px;
    }

    span {
      font-size: 18px;
      font-weight: 500;
      color: #ffffff;
      line-height: 28px;
      text-shadow: 1px 0px 10px rgba(59, 109, 238, 0.15);
    }
  }

  .el-aside {
    margin-right: 5px;
    box-shadow: 1px 0px 10px 0px rgba(59, 109, 238, 0.15);

    .el-menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      margin-bottom: 10px;
      height: 60px;
    }

    .el-menu-item:hover {
      background: #ffffff !important;
      // box-shadow: 1px 0px 10px 0px rgba(59, 109, 238, 0.15), 0px 0px 10px 2px rgba(59, 109, 238, 0.15) !important;
    }
  }

  .menu_img {
    width: 40px;
    height: 40px;
    margin: 0 40px 0 36px;
  }

  .menu_text {
    display: inline-block;
    width: 100px;
    flex: 1;
  }
}

.el-header {
  background: #f2f3f4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 58px 0 40px !important;

  .left_main {
    display: flex;
    align-items: center;
    i {
      color: #8ca0b3;
      font-size: 20px;

      &:last-child {
        margin-left: 20px;
      }
    }
  }

  .item {
    width: 20px;
  }

  .right_main {
    display: flex;
    align-items: center;

    .phone {
      margin: 0 25px 0 9px;
      font-size: 14px;
      font-weight: 500;
      color: #8ca0b3;
    }

    .el-button {
      border: 1px solid #1e87f0;
      padding: 9px 30px;
      background: transparent;
      color: #0b096d;
    }

    i {
      color: #8ca0b3;
      font-size: 20px;
      margin-right: 20px;
    }
  }
}
.el-main {
  padding: 14px 58px 0 40px !important;
}
</style>
