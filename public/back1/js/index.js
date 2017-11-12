/**
 * Created by HUCC on 2017/11/8.
 */
$(function () {

  var myChart = echarts.init(document.querySelector(".pic_left"));

  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 1499, 800, 2000, 1300, 1600]
    }]
  };

  myChart.setOption(option);


  var myChart1 = echarts.init(document.querySelector(".pic_right"));
  var option1 = {
    title : {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['阿迪','耐克','李宁','乔丹','安踏']
    },
    series : [
      {
        name: '销售情况',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'阿迪'},
          {value:310, name:'耐克'},
          {value:234, name:'李宁'},
          {value:135, name:'乔丹'},
          {value:1548, name:'安踏'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  myChart1.setOption(option1);


});