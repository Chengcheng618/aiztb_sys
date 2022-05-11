<template>
  <div id="app">
    <el-container style="height: 100%" v-if="path != '/'">
      <el-aside width="320px" height="100%">
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
          @select="selectopen"
          :default-openeds="defaultOpenedsArray"
          @open="submenuOpen"
          @close="submenuClose"
        >
          <el-menu-item
            index="/Home"
            :class="[path == '/Home' || path == '/memberRecharge' || path == '/Record'?'is-active':'']"
          >
            <img
              :src="path == '/Home' || path == '/memberRecharge' || path == '/Record' ? require('./assets/images/home_select.png') :require('./assets/images/home.png')"
              alt
              class="menu_img"
            />
            <span class="menu_text">首页</span>
          </el-menu-item>
          <el-submenu index="数据中心" disabled>
            <template slot="title">
              <img
                :src="path == '/Userinfo'  || path == '/UserinfoDeatils'? require('./assets/images/data_select.png') :require('./assets/images/data.png')"
                alt
                class="menu_img"
              />
              <span class="menu_text">数据中心</span>
            </template>
            <el-menu-item index="/Userinfo" :class="[path == '/Userinfo'?'is-active':'']">
              <p>用户信息</p>
            </el-menu-item>
            <el-menu-item index="/Companyinfo" :class="[path == '/Companyinfo'?'is-active':'']">
              <p>企业信息</p>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/Member">
            <img
              :src="path == '/Member'? require('./assets/images/member_select.png') :require('./assets/images/member.png')"
              alt
              class="menu_img"
            />
            <span class="menu_text">会员中心</span>
          </el-menu-item>
          <el-menu-item index="/Price" disabled>
            <img
              :src="path == '/Price' ? require('./assets/images/money_select.png') :require('./assets/images/money.png')"
              alt
              class="menu_img"
            />
            <span class="menu_text">充值金额</span>
          </el-menu-item>
          <el-submenu index="审核中心">
            <template slot="title">
              <img
                :src="path == '/Bidding' || path == '/Demand' || path == '/Attestation' ? require('./assets/images/examine_select.png') :require('./assets/images/examine.png')"
                alt
                class="menu_img"
              />
              <span class="menu_text">审核中心</span>
              <div
                class="messageCount"
                style="margin-right:25px"
                :style="{visibility:!totalShow?'hidden':'visible'}"
              >{{CheckTotal}}</div>
            </template>
            <el-menu-item index="/Bidding">
              <p>招标发布</p>
              <div
                class="messageCount"
                :style="{visibility:contentNum==0?'hidden':'visible'}"
              >{{contentNum}}</div>
            </el-menu-item>
            <el-menu-item index="/Demand">
              <p>需求发布</p>
              <div
                class="messageCount"
                :style="{visibility:requireNum==0?'hidden':'visible'}"
              >{{requireNum}}</div>
            </el-menu-item>
            <el-menu-item index="/Attestation">
              <p>企业认证</p>
              <div
                class="messageCount"
                :style="{visibility:companyNum==0?'hidden':'visible'}"
              >{{companyNum}}</div>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header :style="{background:path=='/Home'?'rgba(255, 255, 255, 0.5)':'#f2f3f4'}">
          <div class="left_main">
            <el-badge
              :value="messageTotal"
              class="item"
              @click.native="clickNotice"
              :hidden="messageTotal == 0 ? true : false"
            >
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
        <el-main :style="{background:path=='/Home'?'#f0f0f0':'#fff'}">
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
      path: "",
      indexPath: "1",
      messageTotal: 0, // 铃铛消息条数
      contentNum: 0, //招标待审核数量
      requireNum: 0, //需求待审核数量
      companyNum: 0, //企业认证待审核数量
      CheckTotal: 0, //待审核总数
      defaultOpenedsArray: [], //当前打开的sub-menu数组
      totalShow: true, //是否显示汇总显示
    };
  },
  methods: {
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
    selectopen(e) {
      if (e == "/Home" || e == "/Data" || e == "/Member" || e == "Price") {
        this.defaultOpenedsArray = [];
      }
    },
    submenuOpen(e) {
      if (e == "审核中心") {
        this.totalShow = false;
      }
    },
    submenuClose(e) {
      if (e == "审核中心") {
        setTimeout(() => {
          if (this.CheckTotal == 0) {
            this.totalShow = false;
          } else {
            this.totalShow = true;
          }
        }, 500);
      }
    },
    // 跳转通知中心
    clickNotice() {
      this.$router.push({
        name: "noticeCenter",
      });
    },
    gettotal() {
      this.$axiosGet("/statistics/total", {}).then((res) => {
        if (res.code == 200) {
          this.messageTotal = res.data.no_hand;
        }
      });
    },
    getuncontentCheck() {
      this.$axiosGet("/content/unCheck", {}).then((res) => {
        this.contentNum = res.data;
      });
    },
    getunrequireCheck() {
      this.$axiosGet("/require/unCheck", {}).then((res) => {
        this.requireNum = res.data;
      });
    },
    getuncompanyCheck() {
      this.$axiosGet("/company/unCheck", {}).then((res) => {
        this.companyNum = res.data;
      });
    },
    getnoCheckTotal() {
      this.$axiosGet("/statistics/noCheckTotal", {}).then((res) => {
        this.CheckTotal = res.data.no_hand;
        if (this.CheckTotal == 0) {
          this.totalShow = false;
        }
      });
    },
  },
  created() {
    this.path = this.$route.path;
  },
  mounted() {
    this.gettotal();
    // 招标待审核
    this.getuncontentCheck();
    // 需求待审核
    this.getunrequireCheck();
    // 认证待审核
    this.getuncompanyCheck();
    // 待审核总数量
    this.getnoCheckTotal();
  },
  updated() {
    this.path = this.$route.path;
  },
};
</script>

<style lang="less">
html,
body,
#app {
  /*统一设置高度为100%*/
  height: 100%;
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
}

#app {
  height: 100%;

  .aside_title {
    display: flex;
    align-items: center;
    padding: 15px 0;
    background: #3b6dee;
    color: #fff;
    justify-content: center;

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
    box-shadow: 1px 0px 10px 0px rgba(59, 109, 238, 0.15);
    border-right: 1px solid #f0f0f0;

    .el-submenu {
      margin-bottom: 10px;
      box-shadow: unset !important;
      .el-submenu__title {
        font-size: 16px;
        display: flex;
        align-items: center;
      }
      // 选中激活样式
      .is-active {
        font-weight: 400 !important;
        color: #3b6dee !important;
        border-left: 4px solid #3b6dee !important;
        background: rgba(59, 109, 238, 0.1) !important;
        box-shadow: unset !important;
      }
      .el-menu {
        margin-top: 20px;
        .el-menu-item {
          p {
            text-align: center;
            // width: 200px;
            font-size: 16px !important;
            margin-left: 90px;
          }
        }
      }
    }

    .is-opened {
      box-shadow: unset !important;
    }

    .el-menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      margin-bottom: 10px;
      height: 60px;
      border-left: 4px solid transparent !important;
    }

    .el-menu-item:hover {
      background: rgba(59, 109, 238, 0.1) !important;
      color: #3b6dee !important;
    }
    .el-submenu__title:hover {
      background: rgba(59, 109, 238, 0.1) !important;
      color: #3b6dee !important;
    }
    .el-menu {
      border: none;
      height: 90%;
      // 选中激活样式
      .is-active {
        font-size: 18px !important;
        box-shadow: 1px 0px 10px 0px rgba(59, 109, 238, 0.15),
          0px 0px 10px 2px rgba(59, 109, 238, 0.15);
        border-left: 4px solid #3b6dee;
        color: #3b6dee !important;
      }
      .messageCount {
        width: 22px;
        height: 22px;
        background: #f44336;
        border-radius: 50%;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
      }
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
ul {
  padding: 0;
}
p {
  margin: 0;
}

// 招标发布全局样式
.examine,
.operation,
.userinfo {
  .search {
    .el-input__inner {
      border: none !important;
      height: 34px;
    }
  }
  .select_group {
    .el-input__inner {
      height: 36px;
    }
    .el-input__prefix {
      top: -1px;
    }
  }
}

// 详情点开图片放大预览
.detail {
  .license {
    .el-image {
      width: 576px;
      height: 385px;
    }
  }
  .card {
    .el-image {
      height: 179px;
      width: 48%;
    }
  }
}
.amap-logo,
.amap-copyright {
  display: none !important;
}
.custom-content-marker {
  width: 50px !important;
  height: 50px !important;
  background: rgba(59, 109, 238, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -40px;
  left: -20px;
  .close-btn {
    font-size: 15px;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
