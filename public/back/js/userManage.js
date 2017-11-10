$(function(){
    var currentPage = 1;
    // var pageSize = 5;
    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:currentPage,
                // pagesize:pageSize
            },
            success:function(data){
                // console.log(data);
                var html = template('tmp',data);
                $('tbody').html(html);
    
                // 渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,//指定bootstrap的版本，如果是3，必须指定
                    currentPage:currentPage,//指定当前页
                    totalPages:Math.ceil(data.total/data.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                });

            }
        });
    }
    render();
    // 启用禁用功能
    $('tbody').on('click','.btn',function(){
        $('#userManage').modal('show');
        var id = $(this).parent().data('id');
        var isDelete = $(this).hasClass('btn-danger')?0:1;
        $('.btn-edit').on('click',function(){
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(data){
                    console.log(data);
                    if(data.success){
                        $('#userManage').modal('hide');
                        render();
                    }
                }
            })
        })
        
    })
});