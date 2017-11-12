/**
 * Created by HUCC on 2017/11/10.
 */
$(function () {

  //发送ajax，获取一级分类的数据
  var currentPage = 1;
  var pageSize = 5;

  //渲染功能
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        console.log(data);

        $("tbody").html(template("tpl", data));

        //初始化分页的控件
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(data.total / pageSize),
          onPageClicked: function (a, b, c, page) {
            //修改成当前页
            currentPage = page;
            //重新渲染
            render();
          }
        });

      }
    })
  }
  render();



  //添加，显示模态框
  $(".btn_add").on("click", function () {

    $("#addModal").modal("show");

  });

  //表单校验
  var $form = $("form");
  $form.bootstrapValidator({
    //小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验规则
    fields:{
      categoryName:{

        validators:{
          //非空
          notEmpty:{
            message:"请输入一级分类"
          }
        }

      }
    }
  });

  //注册表单校验成功事件，成功之后，发送ajax请求
  $form.on("success.form.bv", function (e) {
    //阻止默认提交
    e.preventDefault();

    //使用ajax进行提交
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$form.serialize(),
      success:function (data) {
        if(data.success){
          //隐藏模态框
          $("#addModal").modal("hide");
          //重新渲染第一页，因为添加的最新的数据在第一页
          currentPage = 1;
          render();

          //重置模态框，方便下一次使用
          //获取到表单校验的实例,重置校验的样式
          $form.data("bootstrapValidator").resetForm();
          //重置表单的数据
          // DOM对象   jquery对象
          // DOM对象与jquery对象之间的方法不能混着用。
          // var div = document.getElementById("box");
          // $(div).html();

          //jquery对象其实就是dom对象的一个封装。 jquery对象是一个伪数组，内部存放的是DOM对象
          $form[0].reset();

        }
      }
    });

  });





});