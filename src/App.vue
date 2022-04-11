<template>
  <div class="home">
    <el-container style="height: 100%" v-if="path != '/'">
      <el-aside width="350px" height="100%">
        <div class="aside_title">
          <img src="./assets/images/aiztb_icon2.png" alt class="aside_img" />
          <span>爱招投标后台管理平台</span>
        </div>
        <el-menu
          :default-active="path"
          class="el-menu-vertical-demo"
          background-color="#fff"
          text-color="#000A12"
          active-text-color="#3B6DEE"
          router
        >
          <!-- :disabled="index != 2 && index != 4" -->
          <el-menu-item
            :index="item.path"
            v-for="(item, index) in menuList"
            :key="index"
            @click.native="menuClick(index)"
          >
            <img :src="selectIndex == index ? item.url_select : item.url" alt class="menu_img" />
            <span class="menu_text">{{ item.text }}</span>
            <i class="el-icon-arrow-right"></i>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left_main">
            <el-badge :value="3" class="item">
              <i class="el-icon-message-solid"></i>
            </el-badge>
            <i class="el-icon-s-tools"></i>
          </div>
          <div class="right_main">
            <i class="el-icon-search"></i>
            <el-avatar
              size="large"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
            <p class="phone">cinghoo</p>
            <el-button plain @click="loginOut">退出登录</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <router-view v-else />
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          text: "首页",
          url: require("./assets/images/home.png"),
          path: "/Home",
          url_select: require("./assets/images/home_select.png"),
        },
        {
          text: "数据中心",
          url: require("./assets/images/data.png"),
          url_select: require("./assets/images/data_select.png"),
          path: "/Data",
        },
        {
          text: "会员中心",
          url: require("./assets/images/member.png"),
          url_select: require("./assets/images/member_select.png"),
          path: "/Member",
        },
        {
          text: "充值金额",
          url: require("./assets/images/money.png"),
          path: "/Price",
          url_select: require("./assets/images/money_select.png"),
        },
        {
          text: "审核中心",
          url: require("./assets/images/examine.png"),
          url_select: require("./assets/images/examine_select.png"),
          path: "/Examine",
        },
      ],
      selectIndex: 0,
      path: "",
    };
  },
  methods: {
    menuClick(e) {
      console.log(e);
      this.selectIndex = e;
    },
    // 退出登录
    loginOut() {
      this.$confirm("确定退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axiosPost("/user/logout", {}).then((res) => {
            if (res.data.code == 200) {
              this.$router.push({
                name: "Login",
                params: {},
              });
              window.sessionStorage.setItem("access_token", "");
              this.path = this.$route.path;
            }
          });
        })
        .catch(() => {
          return;
        });
    },
  },
  created() {
    this.path = this.$route.path;
    switch (this.path) {
      case "/Home":
        this.selectIndex = 0;
        break;
      case "/Data":
        this.selectIndex = 1;
        break;
      case "/Member":
        this.selectIndex = 2;
        break;
      case "/Price":
        this.selectIndex = 3;
        break;
      case "/Examine":
        this.selectIndex = 4;
        break;
      case "/Detail":
        this.selectIndex = 4;
        break;

      default:
        break;
    }
  },
  updated() {
    this.path = this.$route.path;
  },
};
</script>

<style lang="less">
// @import "./views/Home/Home.less";
html,
body,
.home {
  /*统一设置高度为100%*/
  height: 100%;
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
}

.home {
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
