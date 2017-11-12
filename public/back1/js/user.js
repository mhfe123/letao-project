/**
 * Created by HUCC on 2017/11/10.
 */

$(function () {

  //发送ajax请求，获取到用户的数据
  //结合模板引擎，把数据渲染到页面
  var currentPage = 1;//记录当前页
  var pageSize = 5;//记录每页的数量

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        console.log(data);
        var html = template("tpl", data);
        $("tbody").html(html);


        //渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//指定bootstrap的版本，如果是3，必须指定
          currentPage: currentPage,//指定当前页
          totalPages: Math.ceil(data.total / pageSize),//指定总页数
          size: "small",//设置控件的大小
          onPageClicked: function (a, b, c, page) {
            //page指的是点击的页码,修改了当前页
            currentPage = page;
            //重新渲染
            render();
          }
        });
      }
    })
  }

  render();


  //禁用启用功能，需要注册委托事件
  $("tbody").on("click", ".btn", function () {

    //弹出模态框
    $("#userModal").modal("show");

    //获取到当前按钮对应的id
    var id = $(this).parent().data("id");
    //获取是禁用还是启用, 如果是禁用按钮，发送0，否则发送1
    var isDelete = $(this).hasClass("btn-danger")?0:1;

    $(".btn_edit").off().on("click", function () {
      //发送ajax请求
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function (data) {
          if(data.success){

            //操作成功
            //模态框关闭
            $("#userModal").modal("hide");
            //重新渲染
            render();

          }
        }
      });
    });

  });




});