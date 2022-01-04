<template>
  <div class="member">
    <div class="census">
      <p v-for="(item, index) in censusList" :key="index">
        {{ item.title }}：{{ item.num }}（人）
      </p>
      <el-button round @click="dialogFormVisible = true"
        >添加内测会员</el-button
      >
    </div>
    <div class="operation" :class="{ activeOper: activeOper }">
      <div
        v-for="(item, index) in operationList"
        :key="index"
        class="items"
        style="color: #b8b8b8"
      >
        <i :class="item.class"></i>
        <span>{{ item.title }}</span>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="{
        background: '#E2ECFF',
        color: '#3B6DEE',
        'text-align': 'center',
      }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column label="ID" align="center">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="username" label="昵称" align="center">
        <template slot-scope="scope">
          <i class="el-icon-minus" v-if="scope.row.username == ''"></i>
          <span v-else>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="绑定手机号" align="center">
      </el-table-column>
      <el-table-column label="内测绑定" align="center">
        <template slot-scope="scope">
          <i
            :class="scope.row.is_nei != 0 ? 'el-icon-check' : 'el-icon-minus'"
          ></i>
        </template>
      </el-table-column>
      <el-table-column label="会员有效期至" align="center">
        <template slot-scope="scope">
          <i class="el-icon-minus" v-if="scope.row.expire == '0'"></i>
          <span v-else>{{
            scope.row.expire == "1" ? "终身" : scope.row.expire
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="vip_level" label="全部" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ vip_level[scope.row.vip_level] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <div style="color: #5074d4">
            <span>{{ scope.row.status == 0 ? "禁用" : "开启" }}</span>
            <span>删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pages">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>

    <!-- 添加内测会员弹框 -->
    <el-dialog
      title="添加内测会员"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      @close="close"
    >
      <div class="dialog_input" v-if="!addSuccess">
        <p>绑定手机号</p>
        <el-input placeholder="请输入内容" v-model="dialogI" clearable>
        </el-input>
        <i class="el-icon-close" v-if="addTips.code == 400"></i>
      </div>
      <div v-else class="Success_inp">
        <i class="el-icon-success"></i>
        <span>已添加成功</span>
      </div>
      <p class="tips">{{ addTips.data }}</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{
          addSuccess ? "关 闭" : "取 消"
        }}</el-button>
        <el-button @click="Clickadd">{{
          addSuccess ? "继续添加" : "添 加"
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      censusList: [
        {
          num: 0,
          title: "VIP会员",
        },
        {
          num: 0,
          title: "内测会员",
        },
        {
          num: 0,
          title: "注册用户",
        },
        {
          num: 0,
          title: "游客",
        },
      ],
      operationList: [
        {
          class: "el-icon-unlock",
          title: "批量开启",
        },
        {
          class: "el-icon-remove-outline",
          title: "批量禁用",
        },
        {
          class: "el-icon-delete",
          title: "批量删除",
        },
      ],
      tableData: [],
      dialogFormVisible: false,
      dialogI: "",
      vip_level: {
        0: "注册用户",
        1: "内测会员",
        2: "VIP会员",
        3: "游客",
      },
      activeOper: true, //批量模块颜色
      addTips: "", //添加文字颜色
      addSuccess: false,
    };
  },
  methods: {
    // 用户列表
    getList() {
      let params = {
        page: 1,
        num: 10,
      };
      this.$axiosGet("/user/list", params).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.tableData = res.data;
        }
      });
    },
    // 用户数据统计
    getTotal() {
      this.$axiosGet("/user/total", {}).then((res) => {
        this.censusList[0].num = res.data.vip;
        this.censusList[1].num = res.data.nei_vip;
        this.censusList[2].num = res.data.user;
        this.censusList[3].num = res.data.vistor;
      });
    },
    // 添加内测用户
    Clickadd() {
      this.$axiosPost("/user/beta", { mobile: this.dialogI }).then((res) => {
        this.addTips = res.data;
        this.addSuccess = res.data.code == 200 ? true : false;
      });
    },
    // 表格选择按钮
    handleSelectionChange(val) {
      this.activeOper = val.length > 0 ? false : true;
    },
    // 关闭弹框事件
    close() {
      this.dialogI = "";
      this.addSuccess = false;
      this.addTips = "";
    },
  },
  created() {
    this.getList();
    // 用户数据统计
    this.getTotal();
  },
};
</script>

<style lang="less" scoped>
.member {
  .census {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #d4e4ff;
    border-radius: 10px;
    padding-left: 27px;
    font-size: 16px;
    font-weight: 600;
    color: #3b6dee;
    .el-button {
      margin: 0 14px 0 100px;
      background: linear-gradient(180deg, #7fb1fb 0%, #3b6dee 100%);
      color: #fff;
    }
    p {
      flex: 1;
    }
  }
  .operation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 12px 14px 12px 0;
    .items {
      margin-left: 26px;
      span {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        margin-left: 5px;
      }
      i {
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
}
.cell {
  span {
    cursor: pointer;
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
}
// 分页
.pages {
  margin-top: 19px;
  display: flex;
  justify-content: center;
}
// 弹框
.dialog_input {
  display: flex;
  align-items: center;
  p {
    width: 26%;
    // font-size: 21px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.85);
    margin-right: 16px;
  }
  /deep/ .el-input__inner {
    border-radius: 10px;
    border: 1px solid #1e87f0;
  }
  i {
    font-size: 24px;
    color: #fa5151;
    font-weight: bold;
    margin-left: 16px;
  }
}
/deep/ .el-dialog {
  width: 25%;
  border-radius: 17px;

  .el-dialog__header {
    background: linear-gradient(180deg, #7fb1fb 0%, #3b6dee 100%);
    border-radius: 17px 17px 0px 0px;
    text-align: center;
    padding: 15px;
    .el-dialog__title {
      font-size: 20px;
      font-weight: 600;
      color: #ffffff;
    }
  }
  .el-dialog__body {
    padding: 15% 8% 10%;
  }
  .el-dialog__footer {
    padding: 0 8% 5%;

    .dialog-footer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .el-button {
      background: linear-gradient(180deg, #7fb1fb 0%, #3b6dee 100%);
      border-radius: 10px;
      padding: 12px 40px;
      color: #fff;
    }
  }
  .tips {
    color: #fa5151;
    text-align: center;
  }
}
.activeOper {
  i,
  span {
    color: #b8b8b8 !important;
  }
}
.el-icon-check {
  color: #3b6dee;
  font-weight: 700;
}
.Success_inp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  i {
    font-size: 50px;
    color: #07c160;
    margin-bottom: 12px;
  }
  span {
    font-size: 20px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>