/**
 * @fileoverview 首页js
 * @version 1.0 | 2016-05-22 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * */

requirejs(['$','common/view'],function($,View){

	/**
	 * result格式如下：
	 * {
	 *      user: {...}, //没有则是null,并跳转登录页
	 * 		urlsearch: {...} //没有则是{}
	 * 		LoadingControl: 整个页面平铺loading控制器 LoadingControl.show()		LoadingControl.hide()
	 * }
	 */
	View.register(function(result){

		console.log(result);

        //自己做其他操作
        $('#username').html(result.user.name);
	},{
        needLogin: true
    });
});
