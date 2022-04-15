<template>
  <div class="center">
    <p class="title">通知中心</p>
    <div class="main">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <div class="items_title">
              <span>小程序“爱招投标”的用户意见反馈信息</span>
              <span>2022-03-18</span>
            </div>
          </template>
          <div class="in_main">
            <div>
              <p>小程序用户2022-3-18 21:34:08发来意见反馈</p>
              <p>问题和意见：首页数据信息查找不到想要的信息，感觉数据不全面，别的平台上都能查到的项目，在你们平台搜都搜不出来。还有那个生意圈的信息实在是太少了，建议多找点企业合作，提高用户可用性。</p>
              <p>联系方式：18900008888</p>
            </div>
            <div class="imgs">
              <el-image
                style="width: 100px; height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                :preview-src-list="srcList"
              ></el-image>
              <el-image
                style="width: 100px; height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                :preview-src-list="srcList"
              ></el-image>
              <el-image
                style="width: 100px; height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                :preview-src-list="srcList"
              ></el-image>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
    };
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
  > .is-active {
    background: #ffffff;
    box-shadow: 0px 0px 5px 5px rgba(186, 189, 199, 0.25);
  }
}
</style>