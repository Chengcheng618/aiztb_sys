<template>
  <div class="examine">
    <div class="meun">
      <el-menu
        :default-active="active"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          :index="item.id"
          v-for="(item, index) in menuList"
          :key="index"
        >{{ item.title }}</el-menu-item>
      </el-menu>
    </div>

    <div class="table">
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
        border
      >
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column label="企业名称" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.company_name">{{scope.row.company_name}}</span>
            <i class="el-icon-minus" v-else></i>
          </template>
        </el-table-column>
        <el-table-column label="审核类型" align="center">
          <template slot-scope="scope">
            <span>
              {{
              scope.row.type == 0 && active == 1
              ? "招标发布"
              : scope.row.type == 0 && active == 3
              ? "企业认证"
              : "需求发布"
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="用户级别" align="center">
          <template slot-scope="scope">
            <span>{{ vip_level[scope.row.vip_level] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ctime" label="提交申请时间" align="center">
          <template slot-scope="scope">
            <span
              :style="{
                color:
                  scope.row.ctime == '' || scope.row.certify_insert_time == ''
                    ? '#ccc'
                    : '',
              }"
            >
              {{
              scope.row.ctime == "" || scope.row.certify_insert_time == ""
              ? "无"
              : scope.row.ctime || scope.row.certify_insert_time
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="审核标识" align="center">
          <template slot-scope="scope">
            <span v-if="active != '3'">
              {{
              status[scope.row.status]
              }}
            </span>
            <span v-else>
              {{
              statuss[scope.row.company_verify_status]
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div
              class="startbtn"
              :class="[scope.row.status == 0?'startbtn':'activelook']"
              @click="startBtn(scope.row)"
              v-if="active != '3'"
            >{{scope.row.status == 0?'开始审核':'查看'}}</div>
            <div
              :class="[scope.row.company_verify_status == 1?'startbtn':'activelook']"
              @click="startBtn(scope.row)"
              v-else
            >{{scope.row.company_verify_status == 1?'开始审核':'查看'}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pages" v-if="total > 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        { id: "1", title: "招标发布" },
        { id: "2", title: "需求发布" },
        { id: "3", title: "企业认证" },
      ],
      active: "1",
      tableData: [],
      total: 1,
      pageNum: 1,
      vip_level: {
        0: "普通用户",
        1: "内测会员",
        2: "正式会员",
      },
      status: {
        0: "待审核",
        1: "审核成功",
        2: "审核失败",
      },
      statuss: {
        1: "待审核",
        2: "审核成功",
        3: "审核失败",
      },
    };
  },
  methods: {
    // 选择表格项
    startBtn(row) {
      this.$router.push({
        name: "Detail",
        query: { type: this.active, id: row.id },
      });
    },
    getfun() {
      switch (this.active) {
        case "1":
          this.getList("/content/list");
          this.getpageInfo("/content/pageInfo");
          break;
        case "2":
          this.getList("/require/list");
          this.getpageInfo("/require/pageInfo");
          break;
        case "3":
          this.getList("/company/list");
          this.getpageInfo("/company/pageInfo");
          break;

        default:
          break;
      }
    },
    // 分页按钮点击
    currentChange(e) {
      this.pageNum = e;
      this.getfun();
    },
    // tab切换
    handleSelect(e) {
      this.active = e;
      this.getfun();
    },
    // 招标列表
    getList(url) {
      let params = {
        page: this.pageNum,
        num: 10,
      };
      this.$axiosGet(url, params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data;
        }
      });
    },
    // 列表总数
    getpageInfo(url) {
      this.$axiosGet(url, {}).then((res) => {
        if (res.code == 200) {
          this.total = res.data;
        }
      });
    },
  },
  created() {
    // this.active = window.sessionStorage.getItem("type");
    if (this.$route.params.type) {
      this.active = this.$route.params.type;
    }
    this.getfun();
  },
};
</script>

<style lang="less" scoped>
.examine {
  .meun {
    margin-bottom: 30px;
  }
  .table {
    .startbtn {
      background: linear-gradient(180deg, #7fb1fb 0%, #3b6dee 100%);
      box-shadow: 0px 4px 4px 0px rgba(86, 139, 243, 0.31);
      border-radius: 5px;
      margin: 0 auto;
      color: #fff;
      padding: 2px 0;
      cursor: pointer;
      width: 100px;
    }
    .activelook {
      color: #3b6dee;
      background: transparent;
      box-shadow: 0 0px 0px #ccc;
      cursor: pointer;
    }
    margin-bottom: 60px;
  }
  .pages {
    display: flex;
    justify-content: center;
  }
}
/deep/.el-menu.el-menu--horizontal {
  border: none;
}
/deep/.el-menu-item {
  color: #000a12;
  font-size: 18px;
  padding: 0 30px;
}
/deep/.el-menu-item.is-active {
  color: #386dee !important;
}
</style>