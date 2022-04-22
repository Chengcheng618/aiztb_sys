<template>
  <div class="recharge">
    <div class="goback">
      <el-page-header @back="goBack" content="会员充值收入"></el-page-header>
      <ul class="total">
        <li>
          <span>今日充值金额：</span>
          <p>
            <span>2139</span>
            <span>元</span>
          </p>
        </li>
        <li>
          <span>今日充值人数：</span>
          <p>
            <span>12</span>
            <span>人</span>
          </p>
        </li>
        <li>
          <span>总充值金额：</span>
          <p>
            <span>261710</span>
            <span>元</span>
          </p>
        </li>
        <li>
          <span>总充值人数：</span>
          <p>
            <span>1989</span>
            <span>人</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="centerDiv">
      <div class="Chart">
        <div class="linechart">
          <div class="title">
            <span class="name">月度数据</span>
            <el-select v-model="value" placeholder="时间线">
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
              <i class="el-icon-more"></i>
            </div>
            <div style="position:relative">
              <div id="people" style="width:100%;height:150px"></div>
              <p class="centerText">
                <span>日充值</span>
                <span>1.2%</span>
              </p>
            </div>
          </div>
          <div class="items">
            <div class="title">
              <span class="name">会员充值金额</span>
              <i class="el-icon-more"></i>
            </div>
            <div style="position:relative">
              <div id="money" style="width:100%;height:150px"></div>
              <p class="centerText">
                <span>日充值</span>
                <span>16%</span>
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
          <div id="container" style="width: 100%;height: 280px">
            <el-amap vid="amap" class="amap" :plugin="plugin">
              <el-amap-marker
                vid="component-marker"
                v-for="(item,index) in marker"
                :key="index"
                :position="item.position"
                :content="markerContent"
              />
            </el-amap>
          </div>
        </div>
        <div class="ranking"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../utils/mapData.js";

export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "1个月",
        },
        {
          value: "选项2",
          label: "3个月",
        },
        {
          value: "选项3",
          label: "6个月",
        },
        {
          value: "选项4",
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
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 折线图加载
    getline() {
      let echarts = this.$echarts.init(document.getElementById("echarts"));
      echarts.setOption({
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["人数"],
        },
        grid: {
          x: 30,
          y: 40,
          x2: 10,
          y2: 30,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          splitLine: {
            show: true,
          },
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
        ],
      });
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
                value: 586,
              },
              {
                name: "今日充值人数",
                value: 320,
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
                value: 586,
              },
              {
                name: "今日充值金额",
                value: 320,
              },
            ],
          },
        ],
      });
    },
  },
  mounted() {
    this.getline();
    this.getpie();
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