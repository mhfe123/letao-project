$(function(){
    
    // 获取验证码
    $('.btn-vCode').on('click',function(e){
        e.preventDefault();
        // 只要一点击就要禁用这个按钮
        var $this = $(this);
        $(this).addClass('disabled').prop('disabled',true).text('正在发生中...');
        $.ajax({
            type:'get',
            url:'/user/vCode',
            success:function(data){
                console.log(data.vCode);
                // 开启倒计时,让用户几十秒后可以再次点击
                var count = 10;
                var timer = setInterval(function(){
                    count--;
                    $this.text(count + '秒后再次发送');
                    // 当count等于0的时候恢复
                    if(count <= 0){
                        $this.removeClass('disabled').prop('disabled',false).text('获取验证码');
                        // 清除定时器
                        clearInterval(timer);
                    }
                },1000);
            }
        });
    });

    // 点击注册,获取表单,
    // 对表单数据进行验证,
    // 验证成功后发送ajax,
    // 注册成功后跳转到登录页
    $('.btn-register').on('click',function(){
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();
        var repassword = $('[name="repassword"]').val();
        var tell = $('[name="tell"]').val();
        var vCode = $('[name="vCode"]').val();
        if(!username){
            mui.toast('请输入用户名');
            return false;
        }
        if(!password){
            mui.toast('请输入密码');
            return false;
        }
        if(!repassword){
            mui.toast('请输入确认密码');
            return false;
        }
        if(password != repassword){
            mui.toast('两次密码不一致');
            return false;
        }
        if(!tell){
            mui.toast('请输入手机号');
            return false;
        }
        // 正则检验手机号,如果不通过
        if(!/^1[34578]\d{9}$/.test(tell)){
            mui.toast('请输入正确的手机号')
            return false;
        }
        if(!vCode){
            mui.toast('请输入验证码');
            return false;
        }
        $.ajax({
            type:'post',
            url:'/user/register',
            data:{
                username:username,
                password:password,
                mobile:tell,
                vCode:vCode
            },
            success:function(data){
                if(data.success){
                    mui.toast('恭喜你注册成功,一秒后跳转登录页面');
                    setTimeout(function(){
                        location.href = 'login.html';
                    },1000);
                }else {
                    mui.toast(data.message);
                }     

            }
        });
    });
});