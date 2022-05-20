<template>
  <div class="center">
    <p class="title">通知中心</p>
    <div class="main">
      <el-collapse accordion>
        <el-collapse-item v-for="(item,index) in noticeList" :key="index">
          <template slot="title">
            <div class="items_title">
              <span>小程序“爱招投标”的用户意见反馈信息</span>
              <span>{{item.ctime}}</span>
            </div>
          </template>
          <div class="in_main">
            <div>
              <p>小程序用户{{item.ctime}}发来意见反馈</p>
              <p>问题和意见：{{item.text}}</p>
              <p>联系方式：{{item.phone?item.phone:'无'}}</p>
            </div>
            <div class="imgs">
              <el-image
                style="width: 100px; height: 100px"
                :src="obj.url"
                v-for="(obj,index) in item.pic_url"
                :key="index"
                :preview-src-list="srcList"
              ></el-image>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="pages">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 1,
      noticeList: [], //消息提示列表
      srcList: [], //大图预览数组
      pageNum: 1,
    };
  },
  methods: {
    getlist() {
      let params = {
        page: this.pageNum,
        num: 10,
      };
      this.$axiosGet("/userfeedback/list", params).then((res) => {
        if (res.code == 200) {
          for (const obj of res.data) {
            for (const item of obj.pic_url) {
              this.srcList.push(item.url);
            }
          }
          this.noticeList = res.data;
          this.total = res.count;
        }
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getlist();
    },
  },
  mounted() {
    this.getlist();
  },
};
</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  line-height: 33px;
}
.main {
  margin-top: 16px;
  .items_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 93%;
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 29px;
  }
  .in_main {
    font-size: 16px;
    color: rgba(184, 184, 184, 0.85);
    line-height: 29px;
  }
  .imgs {
    margin-top: 7px;
    .el-image {
      margin-right: 50px;
      border-radius: 8px;
    }
  }
}
.pages {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
}
/deep/.el-collapse {
  border: none;
  .el-collapse-item {
    padding: 0 24px;
  }
  .el-collapse-item__content {
    padding-bottom: 20px;
  }
  // > .is-active {
  //   background: #ffffff;
  //   box-shadow: 0px 0px 5px 5px rgba(186, 189, 199, 0.25);
  // }
}
</style>