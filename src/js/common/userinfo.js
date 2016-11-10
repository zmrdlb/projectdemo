/**
 * @fileoverview 当前登陆用户信息处理
 * @version 1.0 | 2016-05-22 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * */

define(['common/config','common/model'],function(Config,Model){
	var _userinfo = null;

	var that = {};

	/**
	 * 获取当前登录用户信息，如果未登录或登录失效，则跳转登录页
	 * @param {Function} callback 用户信息获取成功后的回调
	 */
	that.get = function(callback){
		if(_userinfo == null){
			Model.userinfo({
				success: function(data){
					_userinfo = data;
					callback(_userinfo);
				}
			});
		}else{
			callback(_userinfo);
		}
	};

	return that;
});
