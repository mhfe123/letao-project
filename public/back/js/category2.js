$(function(){
    // 渲染页面及分页
    var currentPage = 1;
    var pageSize = 5;
    var $form =$("#form");
    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                console.log(data);
                var html = template('tmp',data);
                $('tbody').html(html);
                // 分页渲染
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
    // 添加分类
    // 单击按钮弹出模态框
    $('.btn-add').on('click',function(){
        $('#addModal2').modal('show');
        // 打开模态框,将一级分类渲染到页面上
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(data){
                console.log(data);
                var html = template('category',data);
                $('.dropdown-menu').html(html);
            }
        });
    });
    // 给下拉菜单中的a添加单击事件,当单击的时候,把a的内容显示出来,并且把id放到隐藏的input中
    $('.dropdown-menu').on('click','a',function(){
        $('#text').text($(this).text());
        $('#categoryId').val($(this).parent().attr('id'));
        // 将表单校验状态改为通过
        $form.data('bootstrapValidator').updateStatus('categoryId','VALID');
    });
    // 初始化文件上传
    $('#fileupload').fileupload({
        dataType:'json',
        done:function(e,data){
            console.log(data);
            $('.img-box img').attr('src',data.result.picAddr);
            $('#brandLogo').val(data.result.picAddr);
            // 将表单校验状态改为通过
            $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    });

    // 添加表单校验事件
    
    $form.bootstrapValidator({
        excluded:[],
          //小图标
          feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            // 内容不能为空
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'请选择一级分类'
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:'请输入二级分类'
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:'请上传图片'
                    }
                }
            }
        }
    });
    // 表单校验成功注册成功事件
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            success:function(data){
                console.log(data);
                if(data.success){
                    currentPage = 1;
                    render();
                    $('#addModal2').modal('hide');
                    // 重置表单
                    $form.data('bootstrapValidator').resetForm();
                    $form[0].reset();
                    $('#categoryId').val('');
                    $('.img-box img').attr('src','images/none.png');
                    $('#brandLogo').val('');
                    $('#text').text('请选择一级分类');
                }
            }
        })
    })
    
});