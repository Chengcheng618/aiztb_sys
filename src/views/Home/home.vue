<template>
  <div class="home">
    <div class="home_left">
      <div class="home_left_top">
        <div class="title">
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
        <div class="record">
          <div class="title">
            <span>访问记录</span>
            <i class="el-icon-arrow-right"></i>
          </div>
          <ul class="recordlist">
            <li v-for="(item,index) in recordlist" :key="index">
              <div>
                <span>{{item.title}}</span>
                <span>{{item.ctime}}</span>
              </div>
              <span>{{item.status}}</span>
            </li>
          </ul>
          <div class="total">
            <span>
              今日访问量：
              <span>265次</span>
            </span>
            <span>
              历史访问量：
              <span>2650000次</span>
            </span>
          </div>
        </div>
        <div class="enterprise">
          <div class="title">
            <span>认证企业</span>
            <i class="el-icon-arrow-right"></i>
          </div>
          <ul class="enterpriselist">
            <li v-for="(item,index) in enterpriselist" :key="index">
              <div
                class="logo"
                :style="{backgroundColor:index==0?'#a8d4f6':index==1?'#F6C4A8':index==2?'#B2A8F6':'#a8d4f6'}"
              >
                <img src="../../assets/images/architec.png" alt />
              </div>
              <div class="info">
                <span>{{item.title}}</span>
                <span>认证时间：2{{item.ctime}}</span>
              </div>
            </li>
          </ul>
          <div class="total">
            <span>
              平台认证企业：
              <span>共20家</span>
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
                <span>{{item.num}}{{index == 0 ? '个' : '人'}}</span>
                <span>+{{item.ratio}}%</span>
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
                <span>{{item.num}}{{index == 0 ? '人' : '万'}}</span>
                <span>+{{item.ratio}}%</span>
              </div>
              <span>本月事件</span>
            </div>
            <img
              :src="index == 0 ? require('../../assets/images/line2.png') :require('../../assets/images/line1.png')"
              alt
            />
          </div>
        </div>
      </div>
      <div class="home_right_bottom">
        <div class="title">
          <span>最近待审核</span>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="main">
          <div class="items" v-for="(item,index) in stayList" :key="index">
            <div
              class="date"
              :style="{background:item.status == 1?'rgba(59, 109, 238, 0.1)':item.status == 2?'rgba(255,130,0, 0.1)':'rgba(0,179,107, 0.1)',color:item.status == 1?'#3b6dee':item.status == 2?'#FF8200':'#00B36B'}"
            >
              <span>{{item.week}}</span>
              <span>{{item.days}}</span>
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
                  :style="{background:item.status == 1?'#3b6dee':item.status == 2?'#FF8200':'#00B36B'}"
                ></div>
                <span
                  :style="{color:item.status == 1?'#3b6dee':item.status == 2?'#FF8200':'#00B36B'}"
                >{{item.status == 1 ? '招标':item.status == 2?'需求':'认证' }}</span>
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
export default {
  data() {
    return {
      nowDate: "",
      lastDate: "",
      actives: 0,
      weekDayArr: [], //日历表
      // 访问记录
      recordlist: [
        { title: "花和尚", ctime: "2020年1月21号", status: "游客" },
        { title: "浪里白条", ctime: "2020年1月21号", status: "注册用户" },
        { title: "及时雨", ctime: "2020年1月21号", status: "内测会员" },
        { title: "九纹龙", ctime: "2020年1月21号", status: "VIP会员" },
      ],
      // 认证企业
      enterpriselist: [
        { title: "UWJH网站", ctime: "2020年1月12日" },
        { title: "map公司", ctime: "2020年1月12日" },
        { title: "KKL网站", ctime: "2020年1月12日" },
        { title: "lo-hsh公司", ctime: "2020年1月12日" },
      ],
      pietotalList: [
        { title: "审核总量", num: 913, ratio: "4.12" },
        { title: "会员总数", num: 1286, ratio: "4.12" },
      ],
      linetotalList: [
        { title: "注册用户总数", num: 1320, ratio: "1.12" },
        { title: "会员总收入", num: 123, ratio: "2.12" },
      ],
      stayList: [
        {
          week: "周三",
          days: "12",
          title: "上海教育局办公耗材招标采购",
          city: "上海",
          area: "宏普市",
          status: 1,
          ctime: "2022-01-12  14:23",
        },
        {
          week: "周三",
          days: "12",
          title: "挖掘机租赁公司项目合作",
          city: "上海",
          area: "宏普市",
          status: 2,
          ctime: "2022-01-12  14:23",
        },
        {
          week: "周三",
          days: "12",
          title: "公司2023年会酒水供应需求",
          city: "上海",
          area: "宏普市",
          status: 1,
          ctime: "2022-01-12  14:23",
        },
        {
          week: "周三",
          days: "12",
          title: "晓鸥的企业认证",
          city: "上海",
          area: "宏普市",
          status: 3,
          ctime: "2022-01-12  14:23",
        },
      ],
      clen: 7,
    };
  },
  methods: {
    // 折线图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
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
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
            data: [820, 932, 901, 934, 100, 1330, 2300],
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
    },
    drawPie() {
      let echarts = this.$echarts.init(document.getElementById("echarts"));
      let examine = this.$echarts.init(document.getElementById("examine"));
      echarts.setOption({
        title: {
          text: "50%",
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
                value: 50,
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
                value: 50,
              },
            ],
          },
        ],
      });
      examine.setOption({
        title: {
          text: "80%",
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
                value: 80,
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
                value: 20,
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
  },
  created() {
    var date = new Date();
    this.actives = date.getDay() - 1;
    this.setDate(new Date());
  },
  mounted() {
    // 首页折线图
    this.drawLine();
    // 首页圆环图
    this.drawPie();
  },
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  justify-content: space-between;
  height: 95%;
  padding-top: 10px;
  > div {
    width: auto;
    min-width: 710px;
  }
  .title {
    font-size: 20px;
    font-weight: 600;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    i {
      color: #000;
      font-weight: bold;
    }
  }
  .home_left {
    margin-right: 29px;
    .home_left_top {
      height: auto;
      min-height: 300px;
      padding: 33px;
      background: #fff;
      box-shadow: 0px 2px 22px 0px rgba(0, 0, 0, 0.03);
      border-radius: 14px;
      margin-bottom: 30px;
      .calendar {
        display: flex;
        align-items: center;
        justify-content: space-around;
        li {
          list-style: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          span {
            font-size: 16px;
            font-weight: 300;
            color: #333333;
            line-height: 24px;
            &:last-child {
              font-weight: 400;
              font-size: 14px;
            }
          }
        }
        .actives {
          background: rgba(59, 109, 238, 0.2);
          border-radius: 25px;
          padding: 12px 9px;
        }
      }
    }
    .home_left_bottom {
      display: flex;
      justify-content: space-between;
      height: auto;
      min-height: 300px;
      > div {
        background: #fff;
        box-shadow: 0px 2px 22px 0px rgba(0, 0, 0, 0.03);
        border-radius: 14px;
        width: auto;
        min-width: 280px;
        padding: 32px 26px 10px;
      }
      .recordlist {
        li {
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          &:last-child {
            margin-bottom: 0px;
          }
          div {
            display: flex;
            flex-direction: column;
            span {
              font-size: 16px;
              font-weight: 700;
              color: #333333;
              line-height: 26px;
              &:last-child {
                font-size: 12px;
                font-weight: 400;
                color: #333333;
              }
            }
          }
          > span {
            font-size: 16px;
            font-weight: 700;
            color: #00b36b;
            line-height: 30px;
          }
        }
      }
      .total {
        font-size: 12px;
        display: flex;
        flex-direction: column;
        span {
          line-height: 20px;
          color: #999999;
          > span {
            color: #333;
          }
        }
      }
      .enterpriselist {
        li {
          list-style: none;
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          .logo {
            width: 47px;
            height: 47px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 30px;
            img {
              width: 30px;
              height: 30px;
            }
          }
          .info {
            display: flex;
            flex-direction: column;
            span {
              font-size: 16px;
              font-weight: 700;
              color: #333333;
              line-height: 26px;
              &:last-child {
                font-size: 12px;
                font-weight: 400;
                color: #333333;
              }
            }
          }
        }
      }
    }
  }
  .home_right {
    .home_right_top {
      height: auto;
      min-height: 300px;
      margin-bottom: 30px;
      .pietotal {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:last-child {
          margin-top: 30px;
        }
        .items {
          width: auto;
          min-width: 310px;
          height: auto;
          min-height: 163px;
          background: #fff;
          box-shadow: 0px 2px 22px 0px rgba(0, 0, 0, 0.03);
          border-radius: 14px;
          padding: 10px 0 10px 31px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .number {
            display: flex;
            flex-direction: column;
            p {
              font-size: 18px;
              font-weight: 400;
              color: #333333;
              margin-bottom: 20px;
            }
            span {
              font-size: 14px;
              font-weight: 400;
              color: #333333;
              line-height: 21px;
              margin-top: 14px;
              display: inline-block;
            }
            .ratio {
              position: relative;
              span {
                font-size: 40px;
                font-weight: 500;
                color: #333333;
                line-height: 26px;
                &:last-child {
                  font-size: 14px;
                  font-weight: 400;
                  color: #00b36f;
                  position: absolute;
                  top: -30px;
                  right: -25px;
                }
              }
            }
          }
          img {
            width: 38%;
            height: 100px;
            padding-right: 20px;
          }
        }
      }
    }
    .home_right_bottom {
      background: #fff;
      box-shadow: 0px 2px 22px 0px rgba(0, 0, 0, 0.03);
      border-radius: 14px;
      padding: 32px 26px 20px;
      .title {
        margin-bottom: 20px;
      }
      .main {
        .items {
          display: flex;
          align-items: center;
          margin-bottom: 17px;
          &:last-child {
            margin-bottom: 0;
          }
          .date {
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 20px;
            font-size: 16px;
            font-weight: 400;
            padding: 16px 10px 14px;
          }
          .bidder {
            flex: 1;
            margin-left: 14px;
            > span {
              font-size: 20px;
              font-weight: 600;
              color: #333333;
              line-height: 30px;
            }
            .address {
              font-size: 14px;
              font-weight: 400;
              color: #333333;
              line-height: 21px;
              margin-top: 10px;
              i {
                font-size: 16px;
                margin-right: 5px;
              }
            }
          }
          .types {
            display: flex;
            flex-direction: column;
            .status {
              display: flex;
              align-items: center;
              font-size: 20px;
              font-weight: 400;
              line-height: 30px;
              margin-left: auto;
              div {
                width: 7px;
                height: 7px;
                border-radius: 50%;
                margin-right: 7px;
              }
            }
            .ctime {
              font-size: 14px;
              font-weight: 400;
              color: #333333;
              line-height: 21px;
              margin-top: 10px;
              i {
                font-size: 16px;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>