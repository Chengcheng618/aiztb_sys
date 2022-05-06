<template>
  <div class="detail">
    <el-page-header
      @back="goBack"
      :content="
        type == 3
          ? '企业认证'
          : type == 1
          ? '招标发布'
          : type == 2
          ? '需求发布'
          : ''
      "
    ></el-page-header>
    <div class="reason" v-if="biddingList.status == 2">
      <div class="title">
        <div class="name">
          <div></div>
          <span>审核状态：</span>
        </div>
      </div>
      <div class="mian">
        <span>失败原因：</span>
        <span>{{biddingList.reason}}</span>
      </div>
    </div>
    <div class="bidding" v-if="type == '1'">
      <!-- 标题 -->
      <div class="title">
        <div class="name">
          <div></div>
          <span>发布内容：</span>
        </div>
      </div>
      <div class="content">
        <div class="items">
          <span>发布单位：</span>
          <span>{{ biddingList.bidder }}</span>
        </div>
        <div class="items">
          <span>单位类型：</span>
          <span>
            {{
            biddingList.bidder_type == 0 ? "招标方" : "代理机构"
            }}
          </span>
        </div>
        <div class="items">
          <span>招标标题：</span>
          <span>{{ biddingList.title }}</span>
        </div>
        <div class="items">
          <span>招标金额：</span>
          <span>{{ biddingList.price }}万元</span>
        </div>
        <div class="items">
          <span>所属地区：</span>
          <span>
            {{ biddingList.full_area }}{{ biddingList.full_city
            }}{{ biddingList.full_district }}
          </span>
        </div>
        <div class="items">
          <span>行业类型：</span>
          <span>{{ biddingList.industry }}</span>
        </div>
        <div class="items">
          <span>上传附件：</span>
          <i class="el-icon-paperclip"></i>
        </div>
        <div class="items">
          <span>招标内容：</span>
          <span>{{ biddingList.content }}</span>
        </div>
      </div>
      <div class="title">
        <div class="name">
          <div></div>
          <span>联系人信息：</span>
        </div>
      </div>
      <div class="account">
        <div class="top">
          <div>
            <span>联系人：</span>
            <span>{{ biddingList.contact }}</span>
          </div>
          <div>
            <span>联系电话：</span>
            <span>{{ biddingList.contact_number }}</span>
          </div>
        </div>
        <div class="bottom">
          <span>发布时间：</span>
          <span>{{ biddingList.ctime }}</span>
        </div>
      </div>
    </div>
    <div class="demand" v-if="type == '2'">
      <!-- 标题 -->
      <div class="title">
        <div class="name">
          <div></div>
          <span>采购发布：</span>
        </div>
      </div>
      <div class="content">
        <div class="items">
          <span>采购名称：</span>
          <span>{{ biddingList.title }}</span>
        </div>
        <div class="items">
          <span>采购内容：</span>
          <span>{{ biddingList.content }}</span>
        </div>
        <div class="items">
          <span>预算金额：</span>
          <span>{{ biddingList.price }}万元</span>
        </div>
        <div class="items">
          <span>所属地区：</span>
          <span>
            {{ biddingList.full_area }}{{ biddingList.full_city
            }}{{ biddingList.full_district }}
          </span>
        </div>
        <div class="items">
          <span>详细地址：</span>
          <span>{{ biddingList.address }}</span>
        </div>
        <div class="items">
          <span>所属行业：</span>
          <span>{{ biddingList.industry }}</span>
        </div>
        <div class="items">
          <span>截止日期：</span>
          <span>{{ biddingList.end_time }}</span>
        </div>
      </div>
      <!-- 标题 -->
      <div class="title">
        <div class="name">
          <div></div>
          <span>联系人信息：</span>
        </div>
      </div>
      <div class="content">
        <div class="items">
          <span>联系人：</span>
          <span>{{ biddingList.contact }}</span>
        </div>
        <div class="items">
          <span>联系电话：</span>
          <span>{{ biddingList.contact_number }}</span>
        </div>
        <div class="items">
          <span>发布时间：</span>
          <span>{{ biddingList.start_time }}</span>
        </div>
      </div>
    </div>
    <div class="container" v-if="type == '3'">
      <div class="left">
        <!-- 标题 -->
        <div class="title">
          <div class="name">
            <div></div>
            <span>识别内容：</span>
          </div>
        </div>
        <div class="Input">
          <div class="items">
            <span>企业名称：</span>
            <span>{{ biddingList.company_name }}</span>
          </div>
          <div class="items">
            <span>统一社会信用代码：</span>
            <span>{{ biddingList.social_credit_code }}</span>
          </div>
          <div class="items">
            <span>注册资本：</span>
            <span>{{ biddingList.registered_funds }}</span>
          </div>
          <div class="items">
            <span>类型：</span>
            <span>{{ biddingList.company_type }}</span>
          </div>
          <div class="items">
            <span>注册时间：</span>
            <span>{{ biddingList.build_time }}</span>
          </div>
          <div class="items">
            <span>法人代表：</span>
            <span>{{ biddingList.legal_person }}</span>
          </div>
          <div class="items">
            <span style="min-width: 80px;display: inline-block">经营范围：</span>
            <span>{{ biddingList.business }}</span>
          </div>
          <div class="items">
            <span>地址：</span>
            <span>{{ biddingList.address }}</span>
          </div>
        </div>
        <!-- 管理员信息 -->
        <div class="title">
          <div class="name">
            <div></div>
            <span>管理员信息：</span>
          </div>
        </div>
        <div class="manage">
          <div class="items">
            <span>企业管理员：</span>
            <span>{{ biddingList.contact }}</span>
          </div>
          <div class="items">
            <span>管理员电话：</span>
            <span>{{ biddingList.contact_number }}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <span class="title">营业执照：</span>
        <div class="license">
          <el-image :src="biddingList.licence" :preview-src-list="srcList"></el-image>
        </div>
        <span class="title">法人证件照：</span>
        <div class="card">
          <el-image :src="biddingList.id_card_frontend" :preview-src-list="srcList"></el-image>
          <el-image :src="biddingList.id_card_backend" :preview-src-list="srcList"></el-image>
        </div>
        <div class="ctime">
          <span>认证时间：{{ biddingList.certify_time }}</span>
        </div>
      </div>
    </div>
    <div class="btns" v-if="biddingList.status == 0 || biddingList.company_verify_status == 1">
      <el-button @click="approved(2)">审核未通过</el-button>
      <el-button @click="approved(1)">审核通过</el-button>
    </div>
    <!-- 审核通过 -->
    <el-dialog
      :visible.sync="dialogFormVisible"
      :show-close="false"
      :title="approveType == 2 ? '审核未通过原因' : ''"
    >
      <div class="sucessAdd" v-if="approveType == 1">
        <div class="Success_inp">
          <i class="el-icon-success"></i>
          <span>审核已通过</span>
        </div>
      </div>
      <div class="sucessEdit" v-else>
        <span class="dialogtitle">
          审核未通过原因
          <span>*</span>
        </span>
        <el-input type="textarea" :rows="6" placeholder="请输入审核未通过的原因" v-model="textarea"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返回</el-button>
        <el-button
          @click="clicksure"
          :style="{ opacity: approveType == 2 && textarea == '' ? '0.4' : '' }"
          :disabled="approveType == 2 && textarea == '' ? true : false"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      type: "", // 类型
      biddingList: {}, //招标详情数据
      dialogFormVisible: false, //审核弹框
      approveType: 0, //区分点击的审核状态
      textarea: "", //文本框
      params: {},
      srcList: [],
    };
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    getdetail(url) {
      this.$axiosGet(url, { id: this.id }).then((res) => {
        console.log(res.data.status);
        if (res.code == 200) {
          this.biddingList = res.data;
          this.srcList = [
            this.biddingList.licence,
            this.biddingList.id_card_frontend,
            this.biddingList.id_card_backend,
          ];
          console.log(this.srcList);
        }
      });
    },
    clicksure() {
      if (this.approveType == 2) {
        switch (this.type) {
          case "1":
            this.params = {
              ids: this.id,
              status: 2,
              reason: this.textarea,
            };
            this.getcheck("/content/check");
            break;
          case "2":
            this.params = {
              ids: this.id,
              status: 2,
              reason: this.textarea,
            };
            this.getcheck("/require/check");
            break;
          case "3":
            this.params = {
              id: this.id,
              type: 3,
              reason: this.textarea,
            };
            this.getcheck("/company/verify");
            break;

          default:
            break;
        }
      }
      this.dialogFormVisible = false;
    },
    // 审核通过
    approved(e) {
      this.approveType = e;
      switch (this.type) {
        case "1":
          if (e == 1) {
            this.params = {
              ids: this.id,
              status: 1,
            };
            this.getcheck("/content/check");
          } else {
            this.dialogFormVisible = true;
          }
          break;
        case "2":
          if (e == 1) {
            this.params = {
              ids: this.id,
              status: 1,
            };
            this.getcheck("/require/check");
          } else {
            this.dialogFormVisible = true;
          }
          break;
        case "3":
          if (e == 1) {
            this.params = {
              id: this.id,
              type: 2,
            };
            this.getcheck("/company/verify");
          } else {
            this.dialogFormVisible = true;
          }
          break;

        default:
          break;
      }
    },
    getcheck(url) {
      this.$axiosPost(url, this.params).then((res) => {
        if (res.data.code == 200) {
          if (this.approveType == 1) {
            this.dialogFormVisible = true;
          }
          this.$router.go(-1);
        }
      });
    },
    clickimg() {
      console.log(111);
    },
  },
  mounted() {
    this.type = Number(this.$route.query.type);
    this.id = this.$route.query.id;
    switch (this.type) {
      case 1:
        this.getdetail("/content/detail");
        break;
      case 2:
        this.getdetail("/require/detail");
        break;
      case 3:
        this.getdetail("/company/detail");

        break;

      default:
        break;
    }
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .name {
    position: relative;
    display: flex;
    justify-content: center;

    > div {
      width: 100px;
      height: 10px;
      background: #3b6dee;
      border-radius: 8px;
      opacity: 0.15;
      position: absolute;
      bottom: -1px;
    }
    span {
      font-size: 18px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
.container {
  display: flex;
  margin: 40px 0;
  .left {
    min-width: 400px;
    padding-right: 60px;

    .Input {
      margin: 20px 0 40px;
      .items {
        display: flex;
        // align-items: center;
        span {
          // display: inline-block;
          font-size: 16px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.85);
          line-height: 40px;
        }
      }
    }
    .manage {
      margin-top: 10px;
      .items {
        font-size: 16px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        line-height: 40px;
      }
    }
  }
  .right {
    .title {
      font-size: 18px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }
    .license {
      width: 576px;
      height: 385px;
      margin: 10px 0 20px;
    }
    .card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0;
    }
  }
}
.btns {
  display: flex;
  justify-content: center;
  .el-button {
    background: linear-gradient(180deg, #7fb1fb 0%, #3b6dee 100%);
    color: #fff;
    width: 150px;
    border: none;
    &:first-child {
      background: linear-gradient(180deg, #ffec7d 0%, #f89211 100%);
    }
  }
}
.bidding {
  margin: 28px 0 0 20px;
  .content {
    margin-bottom: 28px;
    .items {
      line-height: 40px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .account {
    width: 30%;
    line-height: 40px;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 40px;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
}
.demand {
  margin: 28px 0;
  .content {
    margin: 20px 0;
    .items {
      line-height: 40px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
/deep/ .el-dialog {
  width: 25%;
  border-radius: 17px;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    // padding: 15% 8% 5%;
  }

  .dialog-footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // padding-top: 20%;
  }

  .el-button {
    background: linear-gradient(180deg, #7fb1fb 0%, #3b6dee 100%);
    border-radius: 10px;
    padding: 12px 40px;
    color: #fff;
  }

  .tips {
    color: #fa5151;
    text-align: center;
  }
}
.sucessAdd {
  padding: 15% 8% 8%;
  .Success_inp {
    display: flex;
    flex-direction: column;
    align-items: center;
    i {
      font-size: 50px;
      color: #07c160;
      margin-bottom: 12px;
    }
    span {
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
.sucessEdit {
  .dialogtitle {
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    > span {
      color: #e02020;
    }
  }
  .el-textarea {
    border: 1px solid #dedede;
  }
}
/deep/.el-textarea {
  border: 1px solid #dedede !important;
}
/deep/.el-textarea__inner {
  border-radius: 0;
  resize: none;
  outline: none;
}

.reason {
  margin: 28px 0 0 20px;
  .mian {
    padding-top: 20px;
  }
}
</style>