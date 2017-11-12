/**
 * Created by HUCC on 2017/11/8.
 */
$(function () {


  //登录表单校验
  //1. 用户名不能为空
  //2. 用户密码不能为空
  //3. 密码的长度是6-12位

  //获取到表单
  var $form = $("form");

  //调用bootstrapValidator 校验表单
  $form.bootstrapValidator({
    //配置校验时的小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //规则
    fields: {
      //对应了表单中的name属性
      username: {
        //写username所有的校验规则
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          callback:{
            message:"用户名错误"
          }
        }
      },
      password: {
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度是6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }

      }
    }
  });


  //给表单注册一个校验成功事件 success.form.bv
  $form.on("success.form.bv", function (e) {
    //阻止默认行为
    e.preventDefault();

    //使用ajax发送登录请求
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      success:function (data) {

        if(data.success){
          //跳转到首页
          location.href = "index.html";
        }

        if(data.error === 1000){
          //alert("用户名不存在")
          //使用updateStatus方法，主动把username这个字段变成校验失败
          //第一个参数：字段名  表单中的name属性
          //第二个参数：INVALID :校验失败
          //第三个参数：配置提示消息
          $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }

        if(data.error === 1001){
          //手动让密码校验失败
          $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }

      }
    });
  });

  //表单重置功能
  $("[type='reset']").on("click", function () {

    //获取到validator对象，调用resetForm方法
    $form.data("bootstrapValidator").resetForm();

  });

});