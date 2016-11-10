/**
 * @fileoverview 页面入口
 *
 * 针对一般页面多数需要的操作，每次自行引用“碎片化”组件太麻烦，所以这里做统一封装进行处理。
 * 使用见page/demo.js
 *
 * 暂时开放的功能有：
 *      urlsearch: {...} //url参数。没有则是{}
 *      LoadingControl: 整个页面平铺loading控制器 LoadingControl.show()		LoadingControl.hide()
 *
 * @version 1.0 | 2016-11-02 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * */
define(['$','libstr/getUrlArgs'],function($,GetUrlArgs){

	var LoadingControl = (function(){
		var loading = null;
		return {
			show: function(){
				if(loading == null){
					loading = $('<div class="g-full-loading"></div>').appendTo('body').show();
				}else{
					loading.show();
				}
			},
			hide: function(){
				loading && loading.hide();
			}
		};
	})();

	return {
		/**
		 * 注册一个页面
		 * @param {Function} *pagefun 页面执行方法
		 * @param {Object} opt 配置。详细说明见conf
		 */
		register: function(pagefun,opt){

			//数据获取
			var result = {
				urlsearch: GetUrlArgs().data, //url参数 {Json}
				LoadingControl: LoadingControl
			};

			pagefun(result);

		}
	};
});
