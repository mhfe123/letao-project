$(function(){

    var currentPage = 1;
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:currentPage,
                pageSize:5
            },
            success:function(data){
                console.log(data);
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
    // 给添加分类按钮注册单击事件
    $('.btn-add').on('click',function(){
        $('#addModal').modal('show');        
    });
    // 校验表单不能为空
    var $form = $('#form');
    $form.bootstrapValidator({
         //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'请输入一级分类'
                    }
                }
            }
        }
    });
    // 给表单注册校验成功事件,校验成功之后发送ajax请求,阻止表单默认提交事件
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$form.serialize(),
            success:function(data){
                console.log(data);
                if(data.success){
                    $('#addModal').modal('hide');
                    render();
                    // 重置表单样式
                    $form.data('bootstrapValidator').resetForm();
                    $form[0].reset();
                }
            }
        });
    })
});
