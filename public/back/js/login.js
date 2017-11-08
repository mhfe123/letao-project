$(function(){
    //检验登录表单
    //1.登录名密码不能为空
    //2.密码长度6-12

    //获取表单
    var $form = $('form');
    // 调用bootstrapValidator校验表单
    $form.bootstrapValidator({
        //配置校验时候的小图标
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 配置规则
        fields:{
            // 对应表单中的name属性
            username:{
                // 对应的规则
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码长度6-12位'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    });
    // 当校验成功之后给form注册success.form.bv一个发送ajax请求
    $form.on('success.form.bv',function(e){
        // 阻止表单的默认跳转事件
        e.preventDefault();
        // 使用ajax发送数据检验是否登录成功
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$form.serialize(),
            success:function(data){
                console.log(data);
                // 根据返回的数据,如果成功就跳转首页
                if(data.success){
                    location.href = 'index.html';
                }
                if(data.error == 1000){
                    // console.log('用户名不存在');
                    // 使用updateStatus方法,主动把校验状态变成失败
                    // 参数1:要校验的字段名字-表单的name属性
                    // 参数2:要改变成哪种校验状态 INVALID 校验失败
                    //                         NOT_VALIDATED 未校验的
                    //                         VALIDATING 校验中
                    //                         VALID 校验成功
                    // 参数3:需要执行哪一条校验规则
                    // $form.data('bootstrapValidator')获取表单校验的实例,然后通过实例化对象运用他的一些方法
                    $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }
                if(data.error == 1001){
                    // console.log('密码错误');
                    $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
            }
        });
    });
    // 表单重置
    $('[type="reset"]').on('click',function(){
        // 获取validator对象,调用resetForm方法
        $form.data('bootstrapValidator').resetForm();
    })

});