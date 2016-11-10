/**
 * @fileoverview 公共配置
 * @version 1.0 | 2016-11-02 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * */

define(function(){
	/**
     * 接口域名或其他域名配置
     *
     * 页面url:
     *      http://web.dev.net/* 访问开发环境接口
     *      http://web.qa.net/* 访问测试环境接口
     *      http://med.net/* 访问生产环境接口
     */
    var orginarr = (function () {
        var host = location.host;
        if (/dev/.test(host)) {
		    return ['http://inter.dev.net','http://login.dev.net'];
        } else if(/qa/.test(host)) {
            return ['http://inter.qa.net','http://login.qa.net'];
        } else {
            return ['http://inter.net','http://login.net'];
        }
    })();

    return {
    	//接口域名
    	modelorgin: orginarr[0],
    	//登录页面域名
    	loginorgin: orginarr[1],
		//登陆页面url
		loginurl: orginarr[1]+'/login'
    };
});
