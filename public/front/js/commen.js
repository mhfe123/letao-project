
// 区块滚动功能
mui('.mui-scroll-wrapper').scroll({
    indicators: false, //是否显示滚动条
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

// 轮播图自动轮播功能
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});


// 封装一个对象tools用来储存一些自己封装的工具
var tools = {
  getParamObj:function(){
    // dom中有一个内置对象,location对应了浏览器的地址栏
    // 通过location.search可以获取地址栏的参数
    var search = location.search;
    // 如果地址栏中有中文,需要对地址进行解码,decodeURI方法
    search = decodeURI(search);


    // 需要将得到的值中?切掉,并且得到key和key对应的值
    // 截取开始到结束的值,不包含结束的值,slice,substring;slice 可以传负数,
    search = search.slice(1);
    // 把search的内容转换成对象,方便获取参数
    // 地址栏参数格式key1=value1&key2=value2,所以先通过&分割成一个数组,然后再通过=分割
    var arr = search.split('&');
    var obj = {};
    // 遍历这个数组,把数组每一项通过=分割成obj的键和值
    for(var i = 0; i < arr.length;i++){
      var k = arr[i].split('=')[0];
      var v = arr[i].split('=')[1];
      obj[k] = v;
    }
    return obj;
  },
  getParam:function(key){
    return this.getParamObj()[key];
  },
  // 检验用户是否登录
  checkLogin:function(data){
    if(data.error == 400){
      // 跳转登录页面,并且要携带跳转过来的页面的地址,登录后再跳转回去
      location.href = "login.html?retUrl=" + location.href; 
    }
  }
}