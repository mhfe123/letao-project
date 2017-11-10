$(function(){
    // 关闭进度条的进度环
    NProgress.configure({ showSpinner: false });
    // 当ajax发送请求开始的时候就开始进度条
    // ajax的全局函数
    $(document).ajaxStart(function(){
        NProgress.start();
    });
    // 当ajax结束的时候结束进度条
    $(document).ajaxStop(function(){
        NProgress.done();
    })

    // 当页面加载的时候,要验证是否处于登录状态,如果处于登录状态则不做改变,不过不是,就跳转回登录页面
    // 非登录页才可以发送ajax请求,登录页面不需要再跳转
    if(location.href.indexOf('login.html') == -1){
        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            success:function(data){
                if(data.error == 400){
                    location.href = 'login.html';
                }
            }
        })
    }

    //侧边栏的二级分类的显示与隐藏
    $('.child').prev().on('click',function(){
        $(this).next().slideToggle();
    })
    // 首页侧边栏显示与隐藏功能
    $('.menu').on('click',function(){
        $('.lf_aside').toggleClass('active');
        $('.rt_main').toggleClass('active');
    })

    // 退出功能
    $('#loginoutMD').on('click',function(){
        $('.modal').modal('show');

        //当点击退出的时候给退出注册单击事件,清空登录信息并跳转登录页面
        // on注册事件不会覆盖
        // off()解绑所有事件
        // off('click')只解绑click事件
        // off('click','**')解绑委托的事件
        $('.exit').off().on('click',function(){
            //向服务器发送请求,让服务器删除保存的session登录信息
            console.log(1);
            $.ajax({
                type:'get',
                url:'/employee/employeeLogout',
                success:function(data){
                    console.log(data);
                    if(data.success){
                        location.href = 'login.html';
                    }
                }
            })
        })
    })
});