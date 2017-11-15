$(function(){
    // 渲染页面
    // 获取到产品的id
    var productId = tools.getParam('productId');
    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetail',
            data:{
                id:productId
            },
            success:function(data){
                console.log(data);
                var html = template('tmp',data);
                $('.mui-scroll').html(html);
                // 重新初始化轮播图
                mui('.mui-slider').slider({
                    interval:1000
                });
                // 动态添加的数字输入框需要手动启动事件
                mui('.mui-numbox').numbox();
                // 给尺码按钮添加单击事件
                $('.size').on('click','span',function(){
                    $(this).toggleClass('now').siblings().removeClass('now');
                })
            }
        });
    }
    render();
    // 添加购物车
    $('.btn-addCar').on('click',function(){
        //得到需要发送的数据
        // 尺码
        var size = $('.size span.now').html();
        if(!size){
            mui.toast("请选择商品的尺码");
            return false;
        }
        // 库存
        var num = $('.mui-numbox input').val();
        // 发送ajax请求
        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
                size:size,
                productId:productId,
                num:num
            },
            success:function(data){
                // console.log(data);
                tools.checkLogin(data);
                if(data.success){
                    // 添加成功,提示添加成功是否去购物车或者继续浏览
                    mui.confirm('添加商品成功','温馨提示',['去购物车','继续浏览'],function(e){
                        if(e.index == 0){
                            location.href = 'cart.html';
                        }
                    });
                }
            }
        });
    });
});