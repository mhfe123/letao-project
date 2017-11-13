$(function(){
    // 需求
    // 1.获取搜索的历史记录,将其渲染到页面上
    localStorage.setItem('search-history','["ls","zs","ww","zw","zw"]');
    function getHistory(){
        var history = localStorage.getItem('search-history') || '[]';
        // 转换成数组返回
        return JSON.parse(history);
    }

    var i = getHistory();
    console.log(i);
    // 渲染获取的搜索历史
    function render(){
        var arr = getHistory();
        // 使用模板渲染出来
        console.log({arr:arr});
        var html = template('tmp',{arr:arr});
        $('.searchHistory').html(html);
    }
    render();

    // 清空历史记录
    $('.searchHistory').on('click','.btn_empty',function(){
        mui.confirm("你确定要清空历史记录吗?","温馨提示",["取消","确定"],function(e){
        //    如果是1证明是确定删除
            if(e.index ==1){
                localStorage.removeItem('search-history');
                // 重新渲染页面
                render();
            }
        });
    });
    // 删除操作
    $('.searchHistory').on('click', '.btn-delete', function () {
        mui.confirm("你确定要删除这条记录吗?", "温馨提示", ["否", "是"], function (e) {
            //    如果是1证明是确定删除
            if (e.index == 1) {
                // 获取这个的下标
                var index = $(this).data('index');
                var arr = getHistory();
                // 删除对应数组对应的下标的值
                arr.splice(index,1);

                localStorage.setItem('search-history',JSON.stringify(arr));
                // 重新渲染页面
                render();
            }
        });
    });

    // 增加操作
    $('.searchbar button').on('click',function(){
        // 清除两边空格
        var key = $('.searchbar input').val().trim();
        // 清空原先的记录
        $('.searchbar input').val('');
        if(key == ''){
            mui.toast('请输入搜索的内容');
            return false;
        }
        // 获取历史记录
        var arr = getHistory();
        // 添加到历史记录的第一个
    });

});