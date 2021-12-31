<template>
  <div class="member">
    <div class="census">
      <p v-for="(item, index) in censusList" :key="index">
        {{ item.title }}：{{ item.num }}（人）
      </p>
      <el-button round>添加内测会员</el-button>
    </div>
    <div class="operation">
      <div v-for="(item, index) in operationList" :key="index" class="items">
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
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column label="ID" align="center">
        <template slot-scope="scope">{{ scope.row.ID }}</template>
      </el-table-column>
      <el-table-column prop="name" label="昵称" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="绑定手机号" align="center">
      </el-table-column>
      <el-table-column label="内测绑定" align="center">
        <template slot-scope="scope">
          <i :class="scope.row.test ? 'el-icon-check' : 'el-icon-minus'"></i>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="会员有效期至" align="center">
      </el-table-column>
      <el-table-column prop="all" label="全部" align="center" width="200">
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template>
          <div>
            <span>编辑</span>
            <span>禁用</span>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      censusList: [
        {
          num: 218,
          title: "VIP会员",
        },
        {
          num: 783,
          title: "内测会员",
        },
        {
          num: 619,
          title: "注册用户",
        },
        {
          num: 899,
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
        {
          class: "el-icon-download",
          title: "下载",
        },
      ],
      tableData: [
        {
          ID: "bub1245",
          name: "王小虎",
          phone: "18628694236",
          test: true,
          date: "2022.12.18",
          all: "内测会员",
        },
        {
          ID: "bub1245",
          name: "王小虎",
          phone: "18628694236",
          test: true,
          date: "2022.12.18",
          all: "内测会员",
        },
        {
          ID: "bub1245",
          name: "王小虎",
          phone: "18628694236",
          test: false,
          date: "2022.12.18",
          all: "内测会员",
        },
        {
          ID: "bub1245",
          name: "王小虎",
          phone: "18628694236",
          test: true,
          date: "2022.12.18",
          all: "内测会员",
        },
      ],
    };
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
    }
  }
}
.cell {
  span {
    color: #5074d4;
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
}
// 分页
.pages{
    margin-top: 19px;
    display: flex;
    justify-content: center;
}
</style>