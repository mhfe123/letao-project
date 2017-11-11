$(function(){
    var currentPage = 1;
    var pageSize = 3;
    // 渲染页面
    function render(){
        $.ajax({
            type:'get',
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                console.log(data);
                var html = template('productTmp',data);
                $('tbody').html(html);
                // 渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,//指定bootstrap的版本，如果是3，必须指定
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total/data.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        });
    }
    render();
});