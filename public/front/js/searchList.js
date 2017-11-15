$(function(){
    //需求
    //1.获取地址栏的数据,并将获取的关键词显示到输入框中
    // 并且根据传过来的关键词渲染产品列表
     var key = tools.getParam('key');
     $('.searchbar input').val(key);

    //  根据地址栏获得的key 的值渲染页面
    function render(){
        // 渲染页面的时候,如果有now的状态,就发送排序参数,按照箭头的升序降序传输数据值
        // 得到有now状态的属性是哪个
        var type = $('.lt-order a[data-type].now').data('type');
        // 得到对应的升降序的值
        var value = $('.lt-order a[data-type].now').find('span').hasClass('fa-angle-down')?2:1;
        // 定义一个对象用来保存要上传的数据
        var obj = {
            proName:key,
            page:1,
            pageSize:100
        }
        // 当type有值得时候就把type添加到对象中一块用ajax发送给服务器,否则不发送
        if(type){
            obj[type] = value;
        }
        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:obj,
            success:function(data){
                console.log(data);
                // 因为本地读取速度太快,制造人工延迟
                $('.lt-product').html('<div class="loading"></div>');
                setTimeout(function(){
                    var html = template('tmp',data);
                    $('.lt-product').html(html);
                },1000);
            }
        });
    }
    render();
    // 点击搜索按钮的时候,获取到key的值,清空排序条件,重新渲染页面
    $('.searchbar button').on('click',function(){
        console.log(1);
        key = $('.searchbar input').val().trim();
        if(key == ''){
            mui.toast('请输入搜索内容');
            return false;
        }
        $('.lt-order a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        // 渲染没完成之前添加一个加载的动画效果
        // $('.lt-product').html('<div class="loading"></div>');
        // 重新渲染
        render();
    });
    // 排序功能
    $('.lt-order [data-type]').on('click',function(){
        // 如果有这个类就改变箭头的状态
        if($(this).hasClass('now')){
            $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        }else {
            // 如果没有这个类就添加这个类,并且所有箭头都改为向下状态
            $(this).addClass('now').siblings().removeClass('now');
            $('.lt-order a').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        // 排序之后重新渲染页面

         // 渲染没完成之前添加一个加载的动画效果
        //  $('.lt-product').html('<div class="loading"></div>');
        render();
        
    });

});