$(function(){
    var currentPage = 1;
    var pageSize = 3;
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
        }
    });
});