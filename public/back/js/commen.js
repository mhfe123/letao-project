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
});