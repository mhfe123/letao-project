/**
 * Created by HUCC on 2017/11/10.
 */
$(function () {

  //分页渲染
  var currentPage = 1;
  var pageSize = 5;

  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (data) {
        //console.log(data);

        $("tbody").html( template("tpl", data) );

        //渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(data.total/pageSize),
          onPageClicked:function (a,b,c, page) {
            currentPage = page;
            render();
          }
        });
      }
    });
  }
  render();



  //添加二级分类
  //弹出模态框
  $(".btn_add").on("click", function () {
    $("#addModal").modal("show");


    //发送ajax请求，获取所有的一级分类的数据，动态的渲染到ul中
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      success:function(data){
        console.log(data);
        $(".dropdown-menu").html( template("tpl2", data) );

      }
    });

  });


  //要给下拉框中所有的a标签注册点击事件（委托事件）
  $(".dropdown-menu").on("click", "a", function () {
    //获取到当前a标签的内容，设置给谁

    $(".dropdown-text").text( $(this).text() );

    //修改input框的value, 获取到自定义属性id
    $("#categoryId").val( $(this).data("id") );

    //让categoryId校验成功
    $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");

  });



  //初始化文件上传
  $("#fileupload").fileupload({
    dataType:"json",
    //文件上传完成时，会执行的回调函数，通过这个函数就能获取到图片的地址
    //第二个参数就有上传的结果 data.result
    done:function (e, data) {
      //console.log("图片上传完成拉");
      //console.log(data);
      //console.log(data.result.picAddr);
      $(".img_box img").attr("src", data.result.picAddr);
      //把图片的地址放到隐藏域中
      $("#brandLogo").val( data.result.picAddr );

      //让brandLogo校验成功
      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });



  //表单校验
  var $form = $("form");
  $form.bootstrapValidator({
    //设置不校验的内容，所有的都校验
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类的名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片"
          }
        }
      },
    }
  });


  //注册成功事件
  $form.on("success.form.bv", function (e) {
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$form.serialize(),
      success:function (data) {
        if(data.success){

          //关闭模态框
          $("#addModal").modal("hide");

          //重新渲染第一页
          currentPage = 1;
          render();

          //内容清掉
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm();
          $(".dropdown-text").text("请选择一级分类");
          $(".img_box img").attr("src", "images/none.png");
          $("#categoryId").val("");
          $("#brandLogo").val("");

        }
      }
    });

  });


});