<template>
  <div class="recharge">
    <div class="goback">
      <el-page-header @back="goBack" content="会员充值收入" style="width:200px"></el-page-header>
      <ul class="total">
        <li v-for="(item,index) in totalList" :key="index">
          <span>{{item.title}}：</span>
          <p>
            <span>{{item.num}}</span>
            <span>{{index == 0 || index == 2 ? '' :'人'}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="centerDiv">
      <div class="Chart">
        <div class="linechart">
          <div class="title">
            <span class="name">月度数据</span>
            <el-select v-model="value" placeholder="时间线" @change="selectChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div id="echarts" style="width:100%;height:300px"></div>
        </div>
        <div class="piechart">
          <div class="items">
            <div class="title">
              <span class="name">会员充值人数</span>
            </div>
            <div style="position:relative">
              <div id="people" style="width:100%;height:150px"></div>
              <p class="centerText">
                <span>日充值</span>
                <span>{{user}}%</span>
              </p>
            </div>
          </div>
          <div class="items">
            <div class="title">
              <span class="name">会员充值金额</span>
            </div>
            <div style="position:relative">
              <div id="money" style="width:100%;height:150px"></div>
              <p class="centerText">
                <span>日充值</span>
                <span>{{income}}%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="Map">
        <div class="title">
          <span class="name">充值地区分布情况</span>
        </div>
        <div class="place">
          <div id="container" style="width: 100%;height: 260px">
            <!-- <el-amap vid="amap" class="amap" :plugin="plugin">
              <el-amap-marker
                vid="component-marker"
                v-for="(item,index) in marker"
                :key="index"
                :position="item.position"
                :content="markerContent"
              />
            </el-amap>-->
          </div>
          <div class="mapTabs">
            <span>图例</span>
            <div @click="clickrecharge(1)">历史充值</div>
            <div @click="clickrecharge(2)">今日充值</div>
          </div>
        </div>
        <div class="ranking">
          <el-table
            :data="chargeareaList"
            style="width: 100%"
            :header-cell-style="{
              background: '#E2ECFF',
              color: '#3B6DEE',
              'text-align': 'center',
              padding:'3px 0'
            }"
            border
          >
            <el-table-column prop="id" label="排名"></el-table-column>
            <el-table-column prop="area" label="地区"></el-table-column>
            <el-table-column prop="charge_count" label="充值人数"></el-table-column>
            <el-table-column prop="charge_money" label="充值金额"></el-table-column>
          </el-table>
          <span @click="clickmore" v-if="chargeareaList.length == 5">查看更多</span>
        </div>
      </div>
    </div>
    <div class="partTable">
      <el-table
        :data="charge"
        style="width: 100%"
        :header-cell-style="{
          background: '#E2ECFF',
          color: '#3B6DEE',
          'text-align': 'center',
        }"
        border
      >
        <el-table-column prop="user_id" label="ID"></el-table-column>
        <el-table-column prop="username" label="昵称"></el-table-column>
        <el-table-column prop="mobile" label="联系方式"></el-table-column>
        <el-table-column prop="actual_price" label="充值金额"></el-table-column>
        <el-table-column prop="success_time" label="充值时间"></el-table-column>
        <el-table-column prop="vip_expire" label="到期时间"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini" class="lookInfo">查看信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span>查看更多</span>
    </div>
  </div>
</template>

<script>
import "@/utils/china.js";
import { unitConvert } from "@/utils/money";

export default {
  data() {
    return {
      options: [
        {
          value: "1",
          label: "1个月",
        },
        {
          value: "2",
          label: "3个月",
        },
        {
          value: "3",
          label: "6个月",
        },
        {
          value: "4",
          label: "12个月",
        },
      ],
      value: "",
      VIPlist: ["会员充值人数", "会员充值金额"],
      position: [104.397795, 31.127449], // 定位
      plugin: [
        // 这里放扩展的插件
        {
          pName: "Scale", // 比例尺
          events: {
            init(instance) {
              console.log(instance);
            },
          },
        },
      ],
      markerContent: "",
      marker: [
        { position: [104.076452, 30.651696], count: 52 },
        { position: [104.076452, 30.651696], count: 52 },
      ],
      charge: [], //充值情况
      censusTotal: {},
      totalList: [
        { title: "今日充值金额", num: 2139 },
        { title: "今日充值人数", num: 2139 },
        { title: "总充值金额", num: 2139 },
        { title: "总充值人数", num: 2139 },
      ],
      newPosition: [], //充值地区气泡
      chargeareaList: [], //充值地区数组
      today_time: "", //当天时间
      is_history: "", //是否为历史充值
      censusTotal: {}, //统计总数汇总
      user: "", //会员充值人数百分比
      income: "", //会员充值金额百分比
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 饼图加载
    getpie() {
      let people = this.$echarts.init(document.getElementById("people"));
      let money = this.$echarts.init(document.getElementById("money"));
      people.setOption({
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 70,
          top: "center",
          itemWidth: 12,
          itemHeight: 12,
        },
        // 系列列表
        series: [
          {
            name: "圆环图系列名称", // 系列名称
            type: "pie", // 系列类型
            center: ["25%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
            radius: ["80%", "70%"], // 饼图的半径，数组的第一项是内半径，第二项是外半径。[ default: [0, '75%'] ]
            hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效果。[ default: true ]
            color: ["#1E87F0", "#FAA059"], // 圆环图的颜色
            label: {
              // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等.
              normal: {
                show: false, // 是否显示标签[ default: false ]
                position: "outside", // 标签的位置。'outside'饼图扇区外侧，通过视觉引导线连到相应的扇区。'inside','inner' 同 'inside',饼图扇区内部。'center'在饼图中心位置。
                formatter: "{b} : {c}次", // 标签内容
              },
            },
            data: [
              {
                name: "总充值人数",
                value: this.censusTotal.user_count,
              },
              {
                name: "今日充值人数",
                value: this.censusTotal.this_month_user_count,
              },
            ],
          },
        ],
      });
      money.setOption({
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 70,
          top: "center",
          itemWidth: 12,
          itemHeight: 12,
        },
        // 系列列表
        series: [
          {
            name: "圆环图系列名称", // 系列名称
            type: "pie", // 系列类型
            center: ["25%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
            radius: ["80%", "70%"], // 饼图的半径，数组的第一项是内半径，第二项是外半径。[ default: [0, '75%'] ]
            hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效果。[ default: true ]
            color: ["#1E87F0", "#FAA059"], // 圆环图的颜色
            label: {
              // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等.
              normal: {
                show: false, // 是否显示标签[ default: false ]
                position: "outside", // 标签的位置。'outside'饼图扇区外侧，通过视觉引导线连到相应的扇区。'inside','inner' 同 'inside',饼图扇区内部。'center'在饼图中心位置。
                formatter: "{b} : {c}次", // 标签内容
              },
            },
            data: [
              {
                name: "总充值金额",
                value: this.censusTotal.user_income,
              },
              {
                name: "今日充值金额",
                value: this.censusTotal.this_month_user_income,
              },
            ],
          },
        ],
      });
    },
    // 会员收入详细统计
    getuserChargeIncome() {
      this.$axiosGet("/statistics/userChargeIncome", {}).then((res) => {
        this.censusTotal = res.data.total;
        this.totalList[0].num =
          unitConvert(this.censusTotal.today_charge_money).num +
          unitConvert(this.censusTotal.today_charge_money).unit;
        this.totalList[1].num = this.censusTotal.today_charge_count;
        this.totalList[2].num =
          unitConvert(this.censusTotal.charge_money).num +
          unitConvert(this.censusTotal.charge_money).unit;
        this.totalList[3].num = this.censusTotal.charge_count;
      });
    },
    // 会员充值详细列表
    getuserChargeIncomeList() {
      this.$axiosGet("/statistics/userChargeIncomeList", {}).then((res) => {
        this.charge = res.data;
      });
    },
    // 会员充值月份统计
    getChargeMonth(type) {
      this.$axiosGet("/statistics/userChargeMonth", { type }).then((res) => {
        let echarts = this.$echarts.init(document.getElementById("echarts"));
        echarts.setOption({
          grid: {
            x: 80,
            y: 40,
            x2: 30,
            y2: 30,
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            splitLine: {
              show: true,
            },
            data: res.data.x,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: res.data.number_y,
              type: "line",
              smooth: true,
            },
          ],
        });
      });
    },
    // 折线图时间切换
    selectChange(e) {
      this.getChargeMonth(e);
      if (e == "4") {
        this.value = "";
      }
    },
    // 会员充值地区历史今日
    getChargeArea(time, color) {
      this.$axiosGet("/statistics/userChargeArea", { time }).then((res) => {
        this.chargeareaList = res.data;
        if (res.data.length > 0) {
          for (const obj of res.data) {
            obj.charge_money =
              unitConvert(obj.charge_money).num +
              unitConvert(obj.charge_money).unit;
            fetch(
              "https://restapi.amap.com/v3/geocode/geo?key=2cf1c8c0f45e51c4ecb509171975734a&address=" +
                obj.area,
              {
                methods: "get",
              }
            )
              .then((response) => response.json())
              .then((res) => {
                this.newPosition.push({
                  value: res.geocodes[0].location.split(","),
                  name: obj.area,
                  count: obj.charge_count,
                });
                this.getMapOpt(this.newPosition, color);
              });
          }
        } else {
          this.newPosition = [];
          this.getMapOpt(this.newPosition);
        }
      });
    },
    getMapOpt(data, color) {
      let map = this.$echarts.init(document.getElementById("container"));
      map.setOption({
        geo: [
          {
            // 地理坐标系组件
            map: "china",
            roam: false, // 可以缩放和平移
            aspectScale: 0.8, // 比例
            layoutCenter: ["50%", "50%"], // position位置
            layoutSize: 380, // 地图大小，保证了不超过 370x370 的区域
            label: {
              // 图形上的文本标签
              normal: {
                show: true,
                textStyle: {
                  color: "rgba(0, 0, 0, 0.9)",
                  fontSize: "8",
                },
              },
            },
            itemStyle: {
              // 图形上的地图区域
              normal: {
                borderColor: "rgba(0,0,0,0.2)",
                areaColor: "#D1E2FF",
              },
            },
          },
        ],
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo",
            geoIndex: 0,
            roam: true, // 鼠标是否可以缩放
            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: true,
              },
            },
            data: data,

            itemStyle: {
              normal: {
                color: color,
                label: {
                  show: true,
                  position: "inside",
                  textStyle: {
                    color: "#fff",
                    fontSize: "11",
                  },
                  formatter: function (params) {
                    return params.data.count;
                  },
                },
              },
            },
            symbolSize: [37, 37],
            symbol: "pin",
          },
        ],
      });
    },
    // 历史充值今日充值切换
    clickrecharge(e) {
      this.is_history = e;
      if (e == 1) {
        // 历史充值
        this.getChargeArea("", "#3B6DEE");
      } else {
        this.getChargeArea(this.today_time, "#FAA059");
      }
    },
    // 充值地区分布情况更多
    clickmore() {
      this.$router.push({
        name: "Record",
        query: { type: 2, time: this.is_history == 1 ? "" : this.today_time },
      });
    },
    // 圆环图数据获取
    gettotal() {
      this.$axiosGet("/statistics/indexStatistics", {}).then((res) => {
        this.censusTotal = res.data.total;
        this.user =
          (
            this.censusTotal.this_month_user_count / this.censusTotal.user_count
          ).toFixed(2) * 100;
        this.income =
          (
            this.censusTotal.this_month_user_income /
            this.censusTotal.user_income
          ).toFixed(2) * 100;
        this.getpie();
      });
    },
  },
  created() {
    var day = new Date();
    this.today_time =
      day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
    // 会员收入详细统计
    this.getuserChargeIncome();
    // 会员充值详细列表
    this.getuserChargeIncomeList();
    // 会员充值月份统计
    this.getChargeMonth();
    // 会员充值地区历史今日
    this.getChargeArea();
    this.$nextTick(() => {
      // 圆环图数据
      this.gettotal();
    });
  },
  mounted() {
    this.markerContent = `
     <div class="custom-content-marker">
       <div class="close-btn">52</div>
     </div>
    `;
  },
};
</script>

<style lang="less" scoped>
@import "./memberRecharge.less";
</style>