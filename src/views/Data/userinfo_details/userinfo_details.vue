<template>
  <div class="userinfo_details">
    <div class="goback">
      <el-page-header @back="goBack" content="个人信息" style="width:200px"></el-page-header>
    </div>
    <div class="main">
      <div class="basic">
        <div class="title">
          <div class="name">
            <div></div>
            <span>基本信息：</span>
          </div>
        </div>
        <ul>
          <li class="items" v-for="(item,index) in basicList" :key="index">
            <span>{{item.title}}：&nbsp;</span>
            <span
              :style="{color:index == 5 ? '#3B6DEE' :item.name == '无' ? '#ccc':'#000',cursor:index == 5 ?'pointer':''}"
              @click="clickinfo(index)"
            >{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="release">
        <div class="title">
          <div class="name">
            <div></div>
            <span>发布信息：</span>
          </div>
        </div>
        <div class="tabs">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
              :label="item"
              :name="String(index)"
              v-for="(item,index) in tabList"
              :key="index"
            >
              <!-- 招标发布 -->
              <el-collapse v-if="activeName == '0'" accordion>
                <el-collapse-item v-for="(item,index) in list" :key="index">
                  <template slot="title">
                    <div class="collapse_title">
                      <span>{{item.title}}</span>
                      <span>{{item.ctime}}</span>
                    </div>
                  </template>
                  <div class="collapse_main">
                    <span>内容：{{item.content}}</span>
                    <span>预算金额：{{item.price}}</span>
                    <span>所在地区：{{item.area}}-{{item.city}}</span>
                    <span>所属行业：{{item.industry}}</span>
                    <span>联 系 人：{{item.contact}}</span>
                    <span>联系电话：{{item.contact_number}}</span>
                    <span>发布日期：{{item.ctime}}</span>
                  </div>
                </el-collapse-item>
              </el-collapse>
              <!-- 需求发布 -->
              <el-collapse v-if="activeName == '1'" accordion>
                <el-collapse-item v-for="(item,index) in list" :key="index">
                  <template slot="title">
                    <div class="collapse_title">
                      <span>{{item.type == 1 ? '采购需求' : item.type == 2 ? '工程需求' : '服务需求'}}：{{item.title}}</span>
                      <span>{{item.start_time}}</span>
                    </div>
                  </template>
                  <div class="collapse_main">
                    <span>{{item.type == 1 ? '采购内容' : item.type == 2 ? '工程内容' : '服务内容'}}：{{item.content}}</span>
                    <span>预算金额：{{item.price}}</span>
                    <span>所在地区：{{item.area}}-{{item.city}}</span>
                    <span>所属行业：{{item.industry}}</span>
                    <span>联 系 人：{{item.contact}}</span>
                    <span>联系电话：{{item.contact_number}}</span>
                    <span>截止日期：{{item.end_time}}</span>
                    <span>采 购 方：{{item.user_name}}</span>
                    <span>发 布 人：{{item.user_name_publish}}</span>
                  </div>
                </el-collapse-item>
              </el-collapse>
              <!-- 动态发布 -->
              <el-collapse v-if="activeName == '2'" accordion>
                <el-collapse-item v-for="(item,index) in list" :key="index">
                  <template slot="title">
                    <div class="collapse_title">
                      <span>{{item.content}}</span>
                      <span>{{item.time}}</span>
                    </div>
                  </template>
                  <div class="collapse_main">
                    <div class="imgs">
                      <el-image
                        style="width: 100px; height: 100px"
                        :src="obj.url"
                        v-for="(obj,index) in item.img_url"
                        :key="index"
                        :preview-src-list="srcList"
                      ></el-image>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
              <!-- 主营项目 -->
              <el-collapse v-if="activeName == '3'" accordion>
                <el-collapse-item v-for="(item,index) in list" :key="index">
                  <template slot="title">
                    <div class="collapse_title">
                      <span>{{item.title}}</span>
                      <span>{{item.ctime}}</span>
                    </div>
                  </template>
                  <div class="collapse_main">
                    <span>内容：{{item.content}}</span>
                    <span>联 系 人：{{item.contact}}</span>
                    <span>联系电话：{{item.contact_number}}</span>
                    <div class="imgs">
                      <el-image
                        style="width: 100px; height: 100px"
                        :src="obj.url"
                        v-for="(obj,index) in item.pic_url"
                        :key="index"
                        :preview-src-list="mainList"
                      ></el-image>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
          </el-tabs>
          <div class="pages">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="pagesize"
              @current-change="currentChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { unitConvert } from "@/utils/money";

export default {
  data() {
    return {
      basicList: [
        { title: "ID", name: "" },
        { title: "昵称", name: "" },
        { title: "联系电话", name: "" },
        { title: "用户级别", name: "" },
        { title: "地址", name: "" },
        { title: "企业认证", name: "" },
        { title: "订阅位置", name: "" },
        { title: "订阅关键词", name: "" },
      ],
      tabList: ["招标发布", "需求发布", "动态发布", "主营项目"],
      activeName: "0",
      infoId: "", //当前用户id
      vip_level: {
        1: "普通用户",
        2: "内测会员",
        3: "VIP会员",
        4: "游客",
      },
      list: [], //发布信息列表
      srcList: [], //动态发布放大图片
      mainList: [], //主营项目放大图片
      total: 1, //页数
      pageNum: 1,
      pagesize: 6,
      company_member: [], //企业成员
      company_id: "", //公司id
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleClick(e) {
      this.activeName = e.name;
      switch (e.name) {
        case "0":
          this.getList("/user/getUserContentPublish");
          break;
        case "1":
          this.getList("/user/getUserRequirePublish");
          break;
        case "2":
          this.getList("/user/getUserMovementPublish");
          break;
        case "3":
          this.getList("/user/getUserMainBusinessPublish");
          break;

        default:
          break;
      }
    },
    // 获取发布信息列表
    getList(url) {
      let params = { id: this.infoId, page: this.pageNum, num: 6 };
      this.$axiosGet(url, params).then((res) => {
        for (const obj of res.data) {
          if (
            url == "/user/getUserContentPublish" ||
            url == "/user/getUserRequirePublish"
          ) {
            obj.price =
              unitConvert(obj.price).num + unitConvert(obj.price).unit;
          } else if (url == "/user/getUserMovementPublish") {
            for (const item of obj.img_url) {
              this.srcList.push(item.url);
            }
          } else if (url == "/user/getUserMainBusinessPublish") {
            for (const item of obj.pic_url) {
              this.mainList.push(item.url);
            }
          }
        }
        this.list = res.data;
        this.total = res.count;
      });
    },
    // 获取当前用户信息
    getuserinfo() {
      this.$axiosGet("/user/detail", { id: this.infoId }).then((res) => {
        this.basicList[0].name = res.data.userInfo.id;
        this.basicList[1].name = res.data.userInfo.username;
        this.basicList[2].name = res.data.userInfo.mobile
          ? res.data.userInfo.mobile
          : "无";
        this.basicList[3].name = this.vip_level[res.data.userInfo.vip_level];
        this.basicList[4].name = res.data.userInfo.address
          ? res.data.userInfo.address
          : "无";
        this.basicList[5].name = res.data.company.company_name;
        this.basicList[6].name = res.data.userInfo.province
          ? `${res.data.userInfo.province}-${res.data.userInfo.city}`
          : "无";
        this.basicList[7].name = res.data.keywords ? res.data.keywords : "无";
        this.company_id = res.data.company.id;
      });
    },
    // 翻页
    currentChange(e) {
      this.pageNum = e;
      switch (this.activeName) {
        case "0":
          this.getList("/user/getUserContentPublish");
          break;
        case "1":
          this.getList("/user/getUserRequirePublish");
          break;
        case "2":
          this.getList("/user/getUserMovementPublish");
          break;
        case "3":
          this.getList("/user/getUserMainBusinessPublish");
          break;

        default:
          break;
      }
    },
    // 企业认证跳转至认证页面
    clickinfo(e) {
      if (e == 5) {
        this.$router.push({
          name: "Detail",
          query: { id: this.company_id, type: 3 },
        });
      }
    },
  },
  created() {
    this.infoId = window.sessionStorage.getItem("ID");
    // 获取发布信息列表
    this.getList("/user/getUserContentPublish");
    // 获取当前用户信息
    this.getuserinfo();
  },
};
</script>

<style lang="less" scoped>
@import "./userinfo_details.less";
</style>