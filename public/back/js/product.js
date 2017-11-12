$(function(){
    var currentPage = 1;
    var pageSize = 5;
    var $form = $('#form');
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
    // 点击添加商品打开模态框
    $('.btn-add').on('click',function(){
        $('#proModal').modal('show');
        // 打开模态框的时候渲染二级分类
        $.ajax({
            type:'get',
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            success:function(data){
                console.log(data);
                var html = template('category2',data);
                $('.dropdown-menu').html(html);
            }
        });
    });
    // 给下拉菜单中a注册单击事件,选中后更改显示,并且把id传给input
    $('.dropdown-menu').on('click','a',function(){
        $('#text').text($(this).text());
        $('#brandId').val($(this).parent().data('id'));
        // input有值的时候要将他的校验状态改为通过
        $form.data('bootstrapValidator').updateStatus('brandId','VALID');
    });
    // 初始化上传图片
    $('#fileupload').fileupload({
        dataType:'json',
        done:function(e,data){
            console.log(data);
            if($('.img-box').find('img').length >= 3) {
                // 如果大于三张图就不上传
                return false;
            }
            // 每次上传往img-box追加图片
            $('.img-box').append('<img src="'+ data.result.picAddr+'" width="100" height="100" alt="" data-src="'+data.result.picAddr+'" data-name="'+data.result.picName+'">')
            // 图片校验
            // 判断img数量是否为3,如果是,讲校验状态改为通过,否,改为失败
            if($('.img-box').find('img').length==3){
                $form.data('bootstrapValidator').updateStatus('productLogo','VALID');
            }else{
                $form.data('bootstrapValidator').updateStatus('productLogo','INVALID');
            }
        }
    });
    // 表单校验
    $form.bootstrapValidator({
        excluded: [],
        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:"请选择二级分类"
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入商品名称"
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:"请输入商品描述"
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:"请输入库存数量"
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:'请输入正确的数字'
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:"请输入尺寸"
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: "请输入正确的尺码（比如：30-50）"
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:"请输入原价"
                    }     
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:"请输入价格"
                    }
                }
            },
            productLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传三张图片"
                    }
                }
            }
        }
    });
    // 表单校验完成注册表单校验完成事件
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        // 发送ajax请求
        // 图片上传有格式要求需要拼接字符串
        var data = $form.serialize();
        // 获取img-box下的所以图片获取picName和picAddr,拼接到data中
        var $img = $('.img-box img');
        data += "&picName1="+$img[0].dataset.name+"&picAddr1="+$img[0].dataset.src;
        data += "&picName1="+$img[1].dataset.name+"&picAddr1="+$img[1].dataset.src;
        data += "&picName1="+$img[2].dataset.name+"&picAddr1="+$img[2].dataset.src;
        $.ajax({
            type:'post',
            url:"/product/addProduct",
            data:data,
            success:function(data){
                console.log(data);
                if(data.success){
                    // 关闭模态框,重置表单,重新渲染第一页
                    $('#proModal').modal('hide');
                    currentPage = 1;
                    render();
                    $form.data('bootstrapValidator').resetForm();
                    $form[0].reset();
                    $('#brandId').val('');
                    $('#productLogo').val('');
                    $('.img-box img').remove();
                    $('#text').text('请选择二级分类');
                }
            }
        })
    })
});