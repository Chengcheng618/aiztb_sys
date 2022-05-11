<template>
  <div class="userinfo_details">
    <div class="goback">
      <el-page-header @back="goBack" content="企业详情" style="width:200px"></el-page-header>
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
            <span v-if="index != 8" :style="{color:item.name == '无' ? '#ccc':'#000'}">{{item.name}}</span>
            <div v-else>
              <span
                v-for="(obj,index) in company_member"
                :key="index"
                style="color:#3B6DEE;cursor: pointer;"
                @click="clickmember(obj.id)"
              >
                {{obj.username}}
                <span v-if="index != company_member.length-1" style="color:#000">、</span>
              </span>
            </div>
            <span
              v-if="index == 2 || index == 7"
              style="color:#3B6DEE;margin-left:10px;cursor: pointer;"
              @click="clicklook(index)"
            >{{index == 2?'查看':'查看详情'}}</span>
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
        { title: "企业名称", name: "" },
        { title: "管理员ID", name: "" },
        { title: "管理员昵称", name: "" },
        { title: "管理员电话", name: "" },
        { title: "管理员用户级别", name: "" },
        { title: "地址", name: "" },
        { title: "所属行业", name: "" },
        { title: "认证时间", name: "" },
        { title: "企业成员", name: "" },
      ],
      tabList: ["招标发布", "需求发布", "动态发布", "主营项目", "变更信息"],
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
      type: 0, //个人或者企业区分
      company_member: [], //企业成员
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
    // 获取当前企业信息
    getcompanyinfo() {
      this.$axiosGet("/statistics/getDataCenterCompanyDetail", {
        id: this.infoId,
      }).then((res) => {
        console.log(res.data);
        this.basicList[0].name = res.data.company.company_name;
        this.basicList[1].name = res.data.company.company_user_id;
        this.basicList[2].name = res.data.company.username;
        this.basicList[3].name = res.data.company.mobile;
        this.basicList[4].name = res.data.company.vip_level;
        this.basicList[5].name = res.data.company.address;
        this.basicList[6].name = res.data.company.industry
          ? res.data.company.industry
          : "无";
        this.basicList[7].name = res.data.company.certify_time;
        this.company_member = res.data.company_member;
        window.sessionStorage.setItem("company_ID", res.data.company.id);
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
    // 企业成员跳转
    clickmember(id) {
      this.$router.push({
        name: "UserinfoDeatils",
      });
      window.sessionStorage.setItem("ID", id);
    },
    // 查看信息点击
    clicklook(e) {
      console.log(e);
      if (e == 2) {
        let id = this.basicList[1].name;
        this.$router.push({
          name: "UserinfoDeatils",
        });
        window.sessionStorage.setItem("ID", id);
      } else {
        let id = window.sessionStorage.getItem("company_ID");
        this.$router.push({
          name: "Detail",
          query: { id, type: 3 },
        });
      }
    },
  },
  created() {
    this.infoId = window.sessionStorage.getItem("company_ID");
    // 获取发布信息列表
    // this.getList("/user/getUserContentPublish");
    // 获取当前企业信息
    this.getcompanyinfo();
  },
};
</script>

<style lang="less" scoped>
@import "../userinfo_details/userinfo_details";
</style>