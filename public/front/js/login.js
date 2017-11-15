$(function(){
    // 需求
    // 输入不能为空
    //验证


    $('.btn-login').on('click',function(){
        console.log(1);
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();
        if(!username){
            mui.toast('请输入用户名');
            return false;
        }
        if(!password){
            mui.toast('请输入密码');
            return false;
        }
        // 发送ajax请求
        $.ajax({
            type:"post",
            url:'/user/login',
            data:{
                username:username,
                password:password
            },
            success:function(data){
                console.log(data);
                
                if(data.success){
                    // 如果有这个参数就跳转,没有就跳会员中心
                    // 截取后边那一段地址
                    var search = location.search;
                    if(search.indexOf('retUrl')==-1){
                        location.href = 'user.html';
                    }else {
                        search = search.replace('?retUrl=','');
                        location.href = search;
                    }
                }else if(data.error){
                    mui.toast(data.message);
                }
            }
        });
    });
});