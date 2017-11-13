$(function(){
    
    // 渲染最开始的页面
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        success: function (data) {
            console.log(data);
            var html = template('tmp-l',data);
            $('.lt-category-l ul').html(html);
            renderSecond(data.rows[0].id);
        }
    });

    // 渲染二级分类
    function renderSecond(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(data){
                console.log(data);
                var html = template('tmp-r',data);
                $('.lt-category-r ul').html(html);
            }
        });
    }

    // 添加单击事件,点击左侧列表右边渲染相应的内容
    $('.lt-category-l ul').on('click','li',function(){
        $(this).addClass('now').siblings().removeClass('now');
        var id = $(this).data('id');
        renderSecond(id);
    });
    // 如果右侧数据过多的时候,切换左侧导航栏右侧滑动之后的部分不会自动回到顶部,
    // 获取第二个滚动实例,让他滚动到顶部
    var temp = mui('.mui-scroll-wrapper').scroll()[1];
    temp.scrollTo(0,0,500);
});