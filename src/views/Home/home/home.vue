<template>
  <div class="home">
    <div class="home_left">
      <div class="home_left_top">
        <div class="title" @click="clickmember">
          <span>会员充值报告</span>
          <i class="el-icon-arrow-right"></i>
        </div>
        <ul class="calendar">
          <li
            v-for="(item,index) in weekDayArr"
            :key="index"
            :class="[actives==index?'actives':'']"
          >
            <span>{{item.name}}</span>
            <span>{{item.adate}}</span>
          </li>
        </ul>
        <div id="myChart" :style="{width: '100%', height: '200px'}"></div>
      </div>
      <div class="home_left_bottom">
        <div class="record" @click="clickRecord">
          <div class="title">
            <span>访问记录</span>
            <i class="el-icon-arrow-right"></i>
          </div>
          <ul class="recordlist">
            <li v-for="(item,index) in visit" :key="index">
              <div>
                <span>{{item.username}}</span>
                <span>{{item.last_login}}</span>
              </div>
              <span>{{status[item.vip_level]}}</span>
            </li>
          </ul>
          <div class="total">
            <span>
              今日访问量：
              <span>{{censusTotal.visit_today_count}}次</span>
            </span>
            <span>
              历史访问量：
              <span>{{censusTotal.history_total_count}}次</span>
            </span>
          </div>
        </div>
        <div class="enterprise">
          <div class="title" @click="clickCompany">
            <span>认证企业</span>
            <i class="el-icon-arrow-right"></i>
          </div>
          <ul class="enterpriselist">
            <li v-for="(item,index) in company" :key="index">
              <div
                class="logo"
                :style="{backgroundColor:index==0?'#a8d4f6':index==1?'#F6C4A8':index==2?'#B2A8F6':'#a8d4f6'}"
              >
                <img src="@/assets/images/architec.png" alt />
              </div>
              <div class="info">
                <span>{{item.company_name}}</span>
                <span>认证时间：2{{item.certify_time}}</span>
              </div>
            </li>
          </ul>
          <div class="total">
            <span>
              平台认证企业：
              <span>共{{censusTotal.certified_enterprise_count}}家</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="home_right">
      <div class="home_right_top">
        <div class="pietotal">
          <div class="items" v-for="(item,index) in pietotalList" :key="index">
            <div class="number">
              <p>{{item.title}}</p>
              <div class="ratio">
                <span>
                  {{item.num}}{{index == 0 ? '个' : '人'}}
                  <span v-if="item.ratio">{{item.ratio}}%</span>
                </span>
              </div>
              <span>本月事件</span>
            </div>
            <div id="examine" style="width:46%;height:150px" v-if="index == 0"></div>
            <div id="echarts" style="width:46%;height:150px" v-if="index == 1"></div>
          </div>
        </div>
        <div class="pietotal">
          <div class="items" v-for="(item,index) in linetotalList" :key="index">
            <div class="number">
              <p>{{item.title}}</p>
              <div class="ratio">
                <span>
                  {{item.num}}{{index == 0 ? '人' : ''}}
                  <span v-if="item.ratio">{{item.ratio}}%</span>
                </span>
              </div>
              <span>本月事件</span>
            </div>
            <img
              :src="index == 0 ? require('@/assets/images/line2.png') :require('@/assets/images/line1.png')"
              alt
            />
          </div>
        </div>
      </div>
      <div class="home_right_bottom">
        <div class="title" @click="clickexamine">
          <span>最近待审核</span>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="main">
          <div
            class="items"
            v-for="(item,index) in stayList"
            :key="index"
            @click="clickExamineItems(item)"
          >
            <div
              class="date"
              :style="{background:item.type == 1?'rgba(59, 109, 238, 0.1)':item.type == 2?'rgba(255,130,0, 0.1)':'rgba(0,179,107, 0.1)',color:item.type == 1?'#3b6dee':item.type == 2?'#FF8200':'#00B36B'}"
            >
              <span>{{item.today_date}}</span>
              <span>{{item.today_number}}</span>
            </div>
            <div class="bidder">
              <span>{{item.title}}</span>
              <div class="address">
                <i class="el-icon-location-outline"></i>
                <span>{{item.city}}·{{item.area}}</span>
              </div>
            </div>
            <div class="types">
              <div class="status">
                <div
                  :style="{background:item.type == 1?'#3b6dee':item.type == 2?'#FF8200':'#00B36B'}"
                ></div>
                <span
                  :style="{color:item.type == 1?'#3b6dee':item.type == 2?'#FF8200':'#00B36B'}"
                >{{item.type == 1 ? '招标':item.type == 2?'需求':'认证' }}</span>
              </div>
              <div class="ctime">
                <i class="el-icon-time"></i>
                <span>{{item.ctime}}</span>
              </div>
            </div>
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
      nowDate: "",
      lastDate: "",
      actives: 0,
      weekDayArr: [], //日历表
      pietotalList: [
        { title: "审核总量", num: 0, ratio: "0" },
        { title: "会员总数", num: 0, ratio: "0" },
      ],
      linetotalList: [
        { title: "注册用户总数", num: 0, ratio: "0" },
        { title: "会员总收入", num: 0, ratio: "0" },
      ],
      stayList: [], //最近待审核数据
      clen: 7,
      company: [], //认证企业
      visit: [], //访问记录
      censusTotal: {}, //首页统计总数汇总
      status: {
        0: "普通用户",
        1: "内测会员",
        2: "VIP会员",
        3: "游客",
      },
    };
  },
  methods: {
    // 折线图
    drawLine() {},
    drawPie() {
      let echarts = this.$echarts.init(document.getElementById("echarts"));
      let examine = this.$echarts.init(document.getElementById("examine"));
      let user =
        (this.censusTotal.this_month_user_count / this.censusTotal.user_count).toFixed(2) *
        100;
      let hand =
        (this.censusTotal.this_month_hand / this.censusTotal.hand).toFixed(2) * 100;
      echarts.setOption({
        title: {
          text: user + "%",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#FF8300",
            fontSize: "18",
          },
        },
        color: ["rgba(255,129,0, .1)"],
        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["50%", "66%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            data: [
              {
                value: this.censusTotal.this_month_user_count,
                name: "01",
                itemStyle: {
                  normal: {
                    color: "#FF8200",
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: "02",
                value: this.censusTotal.user_count,
              },
            ],
          },
        ],
      });
      examine.setOption({
        title: {
          text: hand + "%",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#00B36B",
            fontSize: "18",
          },
        },
        color: ["rgba(26,186,122, .1)"],
        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["50%", "66%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            data: [
              {
                value: this.censusTotal.this_month_hand,
                name: "01",
                itemStyle: {
                  normal: {
                    color: "#00B36B",
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: "02",
                value:
                  this.censusTotal.hand == this.censusTotal.this_month_hand
                    ? 0
                    : this.censusTotal.hand,
              },
            ],
          },
        ],
      });
    },
    // 日期格式处理
    formatDate(date) {
      var day = date.getDate();
      return day;
    },
    // 时间递增
    addDate(date, n) {
      date.setDate(date.getDate() + n);
      return date;
    },
    // 处理时间形成新的数组
    setDate(date) {
      var week = date.getDay() - 1;
      date = this.addDate(date, week * -1);
      for (var i = 0; i < this.clen; i++) {
        this.weekDayArr.push({
          adate: this.formatDate(i == 0 ? date : this.addDate(date, 1)),
          name:
            i == 0
              ? "周一"
              : i == 1
              ? "周二"
              : i == 2
              ? "周三"
              : i == 3
              ? "周四"
              : i == 4
              ? "周五"
              : i == 5
              ? "周六"
              : "周日",
        });
      }
    },
    // 点击跳转会员充值报告
    clickmember() {
      this.$router.push("/memberRecharge");
    },
    // 首页统计接口
    getindexStatistics() {
      this.$axiosGet("/statistics/indexStatistics", {}).then((res) => {
        this.censusTotal = res.data.total;
        this.pietotalList[0].num = this.censusTotal.hand;
        this.pietotalList[0].ratio = this.censusTotal.hand_rate;
        this.pietotalList[1].num = this.censusTotal.user_count;
        this.pietotalList[1].ratio = this.censusTotal.user_rate;
        this.linetotalList[0].num = this.censusTotal.reg_user_count;
        this.linetotalList[0].ratio = this.censusTotal.reg_user_rate;
        this.linetotalList[1].num =
          unitConvert(this.censusTotal.user_income).num +
          unitConvert(this.censusTotal.user_income).unit;
        this.linetotalList[1].ratio = this.censusTotal.user_income_rate;
        this.drawPie();
      });
    },
    // 跳转认证企业
    clickCompany() {
      this.$router.push({ name: "Attestation" });
    },
    // 跳转访问记录
    clickRecord() {
      this.$router.push({ name: "Record", query: { type: 1 } });
    },
    // 获取访问记录
    getindexVisitRecord() {
      this.$axiosGet("/statistics/indexVisitRecord", {}).then((res) => {
        this.visit = res.data.visit;
      });
    },
    // 获取认证企业
    getindexCertifyCompany() {
      this.$axiosGet("/statistics/indexCertifyCompany", {}).then((res) => {
        this.company = res.data;
      });
    },
    // 跳转待审核
    clickexamine() {
      this.$router.push({ name: "Bidding" });
    },
    // 跳转审核详情页
    clickExamineItems(item) {
      this.$router.push({
        name: "Detail",
        query: { type: item.type, id: item.id },
      });
    },
    // 待审核招标数据
    getContent() {
      this.$axiosGet("/statistics/indexNoCheckContent", {}).then((res) => {
        if (res.data.length > 0) {
          this.stayList.push(res.data[0]);
        }
        // 待审核需求数据
        this.getRequire();
      });
    },
    // 待审核需求数据
    getRequire() {
      this.$axiosGet("/statistics/indexNoCheckRequire", {}).then((res) => {
        if (res.data.length > 0) {
          this.stayList.push(res.data[0]);
          this.stayList.push(res.data[1]);
        }
        // 待审核认证数据
        this.getCompany();
      });
    },
    // 待审核认证数据
    getCompany() {
      this.$axiosGet("/statistics/indexNoCheckCompany", {}).then((res) => {
        if (res.data.length > 0) {
          this.stayList.push(res.data[0]);
        }
      });
    },
    // 折线图
    getWeekStatics() {
      console.log(this.weekDayArr[this.actives]);
      var day = new Date();
      let today_time =
        day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
      this.$axiosGet("/statistics/userChargeWeekStatics", { today_time }).then(
        (res) => {
          let myChart = this.$echarts.init(document.getElementById("myChart"));
          // 绘制图表
          myChart.setOption({
            tooltip: {
              show: true, // 是否显示提示框组件
              trigger: "axis", // 触发类型（'item'，数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用；'axis'，坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用；'none'，不触发。）
              showContent: true, // 是否显示提示框浮层，默认显示
              alwaysShowContent: false, // 是否永远显示提示框内容，默认情况下在移出可触发提示框区域后一定时间后隐藏
              triggerOn: "mousemove",
              confine: true, // 是否将 tooltip 框限制在图表的区域内
              backgroundColor: "#1E4FA6", // 提示框浮层的背景颜色
              padding: 5, // 提示框浮层内边距，单位px
              textStyle: {
                color: "#FFF", // 文字的颜色
                fontStyle: "normal", // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体）
                fontWeight: "normal", // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
                fontSize: "14", // 文字字体大小
                lineHeight: "50", // 行高
              },
            },
            grid: {
              x: 30,
              y: 10,
              x2: 30,
              y2: 30,
            },
            xAxis: {
              type: "category",
              data: res.data.x,
            },
            yAxis: {
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
              // 坐标轴轴线
              axisLine: {
                show: false,
              },
              // 刻度标签
              axisLabel: {
                show: false,
              },
            },
            series: [
              {
                data: res.data.count_y,
                type: "line",
                smooth: true,
                showSymbol: false,
                areaStyle: {
                  normal: {
                    color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "rgba(59, 109, 238, 0.2)",
                      },
                      {
                        offset: 1,
                        color: "rgba(59, 109, 238, 0.2)",
                      },
                    ]),
                  },
                },
              },
            ],
          });
        }
      );
    },
  },
  created() {
    var date = new Date();
    this.actives = date.getDay() - 1;
    this.setDate(new Date());
    this.$nextTick(() => {
      // 首页折线图
      this.drawLine();
      // 首页圆环图
      this.drawPie();
      // 首页统计
      this.getindexStatistics();
    });
    // 获取访问记录
    this.getindexVisitRecord();
    // 获取认证企业
    this.getindexCertifyCompany();
    // 待审核招标数据
    this.getContent();
    // 折线图
    this.getWeekStatics();
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
@import "./Home.less";
</style>