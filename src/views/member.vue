<template>
  <div class="member">
    <div class="census">
      <p
        v-for="(item, index) in censusList"
        :key="index"
        @click="levelClick(index)"
      >{{ item.title }}：{{ item.num }}（人）</p>
      <el-button round @click="dialogFormVisible = true">添加内测会员</el-button>
    </div>
    <div class="operation" :class="{ activeOper: activeOper }">
      <div class="search">
        <img src="../assets/images/search_high.png" alt />
        <el-input v-model="input" placeholder="请输入内容" clearable @input="inputClick"></el-input>
        <div class="searchBtn" @click="searchClick">搜索</div>
      </div>
      <div class="batch">
        <div
          v-for="(item, index) in operationList"
          :key="index"
          class="items"
          style="color: #b8b8b8"
          @click="alldelete(index)"
        >
          <i :class="item.class"></i>
          <span>{{ item.title }}</span>
        </div>
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
      border
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
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
        <template slot-scope="scope">
          <span v-if="scope.row.mobile">{{scope.row.mobile}}</span>
          <i class="el-icon-minus" v-else></i>
        </template>
      </el-table-column>
      <el-table-column label="内测绑定" align="center">
        <template slot-scope="scope">
          <i :class="scope.row.is_nei != 0 ? 'el-icon-check' : 'el-icon-minus'"></i>
        </template>
      </el-table-column>
      <el-table-column label="会员有效期至" align="center">
        <template slot-scope="scope">
          <i class="el-icon-minus" v-if="scope.row.expire == '0'"></i>
          <span v-else>
            {{
            scope.row.expire == "1" ? "终身" : scope.row.expire
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="vip_level" label="用户等级" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ vip_level[scope.row.vip_level] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <div style="color: #5074d4">
            <span>{{ scope.row.status == 0 ? "禁用" : "开启" }}</span>
            <span @click="Clickdelete(scope.row)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pages" v-if="total > 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      ></el-pagination>
    </div>

    <!-- 添加内测会员弹框 -->
    <el-dialog title="添加内测会员" :visible.sync="dialogFormVisible" :show-close="false" @close="close">
      <div class="dialog_input" v-if="addSuccessT == '添加'">
        <p>绑定手机号</p>
        <el-input placeholder="请输入内容" v-model="dialogI" clearable></el-input>
        <i class="el-icon-close" v-if="addTips.code == 400"></i>
      </div>
      <div v-else class="Success_inp">
        <i class="el-icon-success"></i>
        <span>已添加成功</span>
      </div>
      <p class="tips">{{ addTips.data }}</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ addSuccessT == "继续添加" ? "关 闭" : "取 消" }}</el-button>
        <el-button @click="Clickadd">{{ addSuccessT }}</el-button>
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
          title: "全部",
        },
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
        1: "注册用户",
        2: "内测会员",
        3: "VIP会员",
        4: "游客",
      },
      activeOper: true, //批量模块颜色
      addTips: "", //添加文字颜色
      total: 1, //列表条数
      addSuccessT: "添加",
      pageNum: 1, //当前页数
      ids: "",
      input: "", //搜索值
      levels: "", //用户级别
      sName: "", //搜索值
    };
  },
  methods: {
    // 用户列表
    getList() {
      let params = {
        page: this.pageNum,
        num: 10,
        vip_level: this.levels,
        keywords: this.sName,
      };
      this.$axiosGet("/user/list", params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.total = res.count;
        }
      });
    },
    // 用户数据统计
    getTotal() {
      this.$axiosGet("/user/total", {}).then((res) => {
        this.censusList[0].num =
          res.data.vip + res.data.nei_vip + res.data.user + res.data.vistor;
        this.censusList[1].num = res.data.vip;
        this.censusList[2].num = res.data.nei_vip;
        this.censusList[3].num = res.data.user;
        this.censusList[4].num = res.data.vistor;
      });
    },
    // 添加内测用户
    Clickadd() {
      this.$axiosPost("/user/beta", { mobile: this.dialogI }).then((res) => {
        console.log(res.data);
        this.addTips = res.data;
        this.addSuccessT = res.data.code == 200 ? "继续添加" : "添加";
      });
      if (this.addSuccessT == "继续添加") {
        this.addSuccess = false;
      } else {
        this.addSuccess = true;
      }
    },
    // 表格选择按钮
    handleSelectionChange(val) {
      let arr = [];
      this.activeOper = val.length > 0 ? false : true;
      for (const obj of val) {
        arr.push(obj.id);
      }
      arr = arr.join(",");
      this.ids = arr;
    },
    // 关闭弹框事件
    close() {
      this.dialogI = "";
      this.addSuccess = false;
      this.addTips = "";
    },
    currentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    // 单个删除
    Clickdelete(row) {
      console.log(row);
      this.$confirm("确定删除该用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.Idsdelete(row.id);
        })
        .catch(() => {
          return;
        });
    },
    // 删除封装
    Idsdelete(ids) {
      let params = {
        status: 2,
        ids,
      };
      this.$axiosPost("/user/updateStatus", params).then((res) => {
        if (res.data.code == 200) {
          this.getList();
        }
      });
    },
    // 批量删除
    alldelete(index) {
      if (!this.activeOper && index == 2) {
        this.Idsdelete(this.ids);
      }
    },
    // 搜索
    searchClick() {
      this.sName = this.input;
      this.getList();
    },
    // 搜索输入事件
    inputClick(e) {
      this.input = e;
      // 点击清空后自动调取函数
      if (this.input == "") {
        this.sName = "";
        this.getList();
      }
    },
    // 会员级别点击过滤
    levelClick(index) {
      switch (index) {
        case 0:
          this.levels = "";
          break;
        case 1:
          this.levels = 3;
          break;
        case 2:
          this.levels = 2;
          break;
        case 3:
          this.levels = 1;
          break;
        case 4:
          this.levels = 4;
          break;
      }
      this.getList();
    },
  },
  created() {
    this.getList();
    // 用户数据统计
    this.getTotal();
    window.sessionStorage.setItem("type", 0);
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
    width: auto;
    min-width: 1000px;

    .el-button {
      margin: 10px 14px 10px 100px;
      background: linear-gradient(180deg, #7fb1fb 0%, #3b6dee 100%);
      color: #fff;
    }

    p {
      // flex: 1;
      cursor: pointer;
      width: auto;
      min-width: 100px;
    }
  }

  .operation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px 12px 0;
    cursor: pointer;
    width: auto;
    min-width: 1000px;
    .batch {
      display: flex;
      align-items: center;
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

    .search {
      display: flex;
      align-items: center;
      width: 442px;
      height: 36px;
      background: #ffffff;
      border-radius: 18px;
      border: 1px solid #e4e4e4;
      img {
        width: 31px;
        height: 34px;
        padding-left: 11px;
      }
      .el-input {
        height: 34px;
      }
      .searchBtn {
        border-left: 1px solid #e4e4e4;
        width: 50px;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 9px;
        color: #000a12;
        line-height: 29px;
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
  margin-top: 40px;
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

